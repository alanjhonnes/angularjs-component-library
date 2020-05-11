const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
    stories: [
        '../src/**/*.stories.[tj]s',
    ],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-viewport/register',
    ],
    webpackFinal: (config, options) => {


        console.dir(config, { depth: null }) || config;

        config.plugins.unshift(new ExtractCssChunks({}));


        // Make whatever fine-grained changes you need
        const typescriptRules = config.module.rules[0];
        typescriptRules.test = /.ts?$/;
        typescriptRules.use = [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                }
            }
        ];

        config.module.rules.push({
            test: /\.scss$/i,
            use: [
                'style-loader',
                ExtractCssChunks.loader,
                'css-loader',
                'sass-loader'
            ]
        })

        console.log('config.resolve.extensions: ', config.resolve.extensions);

        config.resolve.extensions = ['.js', '.ts', '.json'];

        console.log('webpack-config: ', config);
        console.log('webpack-options: ', options);

        // Return the altered config
        return config;
    },
};
