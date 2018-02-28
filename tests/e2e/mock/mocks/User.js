const casual = require("casual");
const md5 = require("md5");

module.exports = () => {
	const email = casual.email.toLowerCase().trim();
	return {
		login: casual.name,
		group: "VIEWER",
		newsletter: true,
		avatar: `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,
		email
	};
};
