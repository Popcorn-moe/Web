const faker = require("faker");

module.exports = () => ({
	login: faker.name.findName(),
	group: "VIEWER",
	newsletter: true,
	avatar: faker.image.avatar(),
	email: faker.internet.email()
});
