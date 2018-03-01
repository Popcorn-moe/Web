const merge = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = merge(devEnv, {
	API_URL: process.env.API_URL
		? `'${process.env.API_URL}'`
		: "'http://localhost:3029'",
	NODE_ENV: '"test"'
});
