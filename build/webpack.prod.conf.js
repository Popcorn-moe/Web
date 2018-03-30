"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const env = require("../config/prod.env");

const webpackConfig = merge(baseWebpackConfig, {
	mode: "production",
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true,
			usePostCSS: true
		})
	},
	devtool: config.build.productionSourceMap ? config.build.devtool : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath("js/[name].[chunkhash].js"),
		chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
	},
	optimization: {
		minimize: false,
		runtimeChunk: {
			name: "vendor"
		},
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /node_modules/,
					name: "vendor",
					chunks: "initial",
					minSize: 1
				}
			}
		}
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			"process.env": env
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap: config.build.productionSourceMap,
			parallel: true
		}),
		// extract css into its own file
		new MiniCssExtractPlugin({
			filename: utils.assetsPath("css/[name].[chunkhash].css"),
			chunkFilename: utils.assetsPath("css/[id].[chunkhash].css")
		}),
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin({
			cssProcessorOptions: config.build.productionSourceMap
				? { safe: true, map: { inline: false } }
				: { safe: true }
		}),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: config.build.index,
			template: "index.html",
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				minifyCSS: true,
				minifyJS: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: "dependency"
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "defer"
		}),
		// keep module.id stable when vendor modules does not change
		new webpack.HashedModuleIdsPlugin(),

		// copy custom static assets
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "../static"),
				to: config.build.assetsSubDirectory,
				ignore: [".*"]
			}
		]),
		new workboxPlugin.InjectManifest({
			swSrc: "./src/sw.js",
			swDest: "sw.js"
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: "static"
		})
	]
});

if (config.build.productionGzip) {
	const CompressionWebpackPlugin = require("compression-webpack-plugin");

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: new RegExp(
				"\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
			),
			threshold: 10240,
			minRatio: 0.8
		})
	);
}

module.exports = webpackConfig;
