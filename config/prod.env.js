module.exports = {
	NODE_ENV: '"production"',
	AUTH_URL: `"${process.env.AUTH_URL || "https://auth.popcorn.moe"}"`,
	API_URL: `"${process.env.API_URL || "https://api.popcorn.moe"}"`
};
