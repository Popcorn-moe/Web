const { buildClientSchema } = require("graphql");
const introspectionResult = require("./schema.json");
const { addMockFunctionsToSchema } = require("graphql-tools");
const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const { graphql } = require("graphql");
const mocks = require("./mocks");
const faker = require("faker");
const { join } = require("path");

const schema = buildClientSchema(introspectionResult);

addMockFunctionsToSchema({ schema, mocks });

const app = express();
app.use(express.static(join(__dirname, "static")));
app.use(
	cors({
		origin: ["http://localhost:8042"],
		credentials: true
	})
);

app.use((req, res, next) => {
	faker.seed(123);
	next();
});
app.use("/graphql", graphqlHTTP({ schema }));

app.listen(3029);

process.on("SIGTERM", () => process.exit(0));
