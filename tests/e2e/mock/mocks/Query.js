const { MockList } = require("graphql-tools");

module.exports = () => ({
	animes(root, { limit }, context) {
		return new MockList(limit);
	},
	searchUser(root, { name, limit }, context) {
		if (name) return new MockList(limit);
		else return [];
	},
	searchAnime(root, { name, limit }, context) {
		if (name) return new MockList(limit);
		else return [];
	}
});
