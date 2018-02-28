const fetch = require("node-fetch");
const fs = require("fs");
const { introspectionQuery } = require("graphql");

fetch(`http://localhost:3030/graphql`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		query: introspectionQuery
	})
})
	.then(result => result.json())
	.then(result => {
		fs.writeFile(
			"./tests/e2e/mock/schema.json",
			JSON.stringify(result.data, null, 2),
			err => {
				if (err) console.error("Error writing schema file", err);
				console.log("Schema successfully extracted!");
			}
		);
	})
	.catch(console.error);
