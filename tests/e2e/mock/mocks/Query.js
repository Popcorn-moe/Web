const { MockList } = require("graphql-tools");

module.exports = () => ({
	animes(root, { limit }, context) {
		return new MockList(limit);
	},
	searchUser(root, { limit }, context) {
		return new MockList(limit);
	},
	searchAnime(root, { limit }, context) {
		return new MockList(limit);
	}
});
