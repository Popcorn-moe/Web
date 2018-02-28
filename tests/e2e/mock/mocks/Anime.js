const faker = require("faker");

module.exports = () => ({
	names: [faker.commerce.productName()],
	cover: "http://localhost:3029/cover.png",
	background: "http://localhost:3029/background.gif"
});
