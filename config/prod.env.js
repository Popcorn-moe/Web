module.exports = {
	NODE_ENV: '"production"',
	AUTH_URL: process.env.AUTH_URL
		? `'${process.env.AUTH_URL}'`
		: "'http://localhost:3031'",
	API_URL: process.env.API_URL
		? `'${process.env.API_URL}'`
		: "'http://localhost:3030'"
};
