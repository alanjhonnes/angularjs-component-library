/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const main = [
    './src/index.ts'
];

module.exports = {
    context: process.cwd(), // to automatically find tsconfig.json
    entry: {
        main
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "/",
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
        new ExtractCssChunks({}),
    ],
    module: {
        rules: [
            {
                test: /.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                                outDir: './dist',
                                "declaration": true,                   /* Generates corresponding '.d.ts' file. */
                                "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
                                "sourceMap": true,                     /* Generates corresponding '.map' file. */
                            }
                        }
                    }
                ]
            },
            {
				test: /\.scss$/i,
				use: [
					'style-loader',
					ExtractCssChunks.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/i,
				use: [ExtractCssChunks.loader, 'css-loader']
			},
            {
                test: /\.(png|svg|jpg|gif|glb)$/,
                use: [
                    {
                        loader: 'file-loader', options: { outputPath: 'assets', }
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: 'inline-source-map',
    devServer: {
        clientLogLevel: 'warning',
        open: false,
        historyApiFallback: true,
        stats: 'errors-only',
        host: '0.0.0.0',
        port: 8080,
    }
};
