const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	AUTH_URL: `"${process.env.AUTH_URL || "http://localhost:3031"}"`,
	API_URL: `"${process.env.API_URL || "http://localhost:3030"}"`
});
