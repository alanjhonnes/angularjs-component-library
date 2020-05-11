/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

const robotsTxtOptions = {
	policy: [{
			userAgent: '*',
			allow: ['']
		},
		{
			userAgent: 'Googlebot',
			allow: ['']
		},
		{
			userAgent: 'Googlebot-Image',
			allow: ['']
		},
		{
			userAgent: 'Mediapartners-Google',
			allow: ['']
		},
		{
			userAgent: 'Adsbot-Google',
			allow: ['']
		}
	]
};

//const main = ['core-js', 'whatwg-fetch', 'jquery', './src/index.ts'];

module.exports = {
	externals: {
		gsap: 'gsap',
		TweenMax: 'TweenMax',
		ScrollMagic: 'ScrollMagic',
		Gumshoe: 'gumshoe'
	},
	context: process.cwd(), // to automatically find tsconfig.json
	entry: {
		index: './src/index.ts',
		faq: ['./src/faq.ts']
	},
	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name].js'
	},
	plugins: [
		new RobotstxtPlugin(robotsTxtOptions),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			useTypescriptIncrementalApi: true,
			memoryLimit: 4096
		}),
		new HtmlWebpackPlugin({
			hash: true,
			inject: true,
			filename: 'index.html',
			template: 'src/index.html',
			chunks: ['index'],
			minify: {
				removeComments: true,
				collapseWhitespace: false,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		new HtmlWebpackPlugin({
			hash: true,
			inject: true,
			filename: 'faq.html',
			template: 'src/faq.html',
			chunks: ['faq'],
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		new ExtractCssChunks({})
	],
	module: {
		rules: [{
				test: /.ts?$/,
				use: [{
					loader: 'ts-loader',
					options: {
						// transpileOnly: true
					}
				}]
			},
			{
				test: /\.scss$/i,
				use: [ExtractCssChunks.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.css$/i,
				use: [ExtractCssChunks.loader, 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif|webp)$/,
				use: [
					'file-loader'
					// {
					//     loader: 'image-webpack-loader',
					//     options: {
					//         bypassOnDebug: true, // webpack@1.x
					//         disable: true, // webpack@2.x and newer
					//     },
					// },
				]
			},
			{
				test: /\.(glb|eot|ttf|woff|ico|xml|webmanifest)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'assets'
					}
				}]
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					attrs: [
						':srcset',
						'img:src',
						'audio:src',
						'video:src',
						'track:src',
						'embed:src',
						'source:src',
						'input:src',
						'object:data',
						':data-image',
						':src',
						'link:href'
						// 'meta:content'
					]
				}
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
