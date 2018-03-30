// see http://vuejs-templates.github.io/webpack for documentation.
const { resolve } = require("path");
const { NODE_ENV } = process.env;

module.exports = {
	build: {
		env: require("./prod.env"),
		index: resolve(__dirname, "../dist/index.html"),
		assetsRoot: resolve(__dirname, "../dist"),
		assetsSubDirectory: "static",
		assetsPublicPath: "/",
		devtool: "source-map",
		productionSourceMap: true,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ["js", "css"]
	},
	dev: {
		env: NODE_ENV === "test" ? require("./test.env") : require("./dev.env"),
		port: NODE_ENV === "test" ? 8042 : 8080,
		autoOpenBrowser: NODE_ENV !== "test",
		devtool: NODE_ENV === "test" ? "inline-source-map" : "source-map",
		assetsSubDirectory: "static",
		assetsPublicPath: "/",
		proxyTable: {},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	}
};
