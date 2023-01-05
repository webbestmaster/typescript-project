const styleLoader = {
    loader: 'style-loader',
    options: {attributes: {class: 'my-css-module'}},
};

module.exports = {
    'stories': ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    'addons': ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    'framework': '@storybook/react',
    'core': {
        'builder': 'webpack5',
    },
    webpackFinal: async (config, {configType}) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                styleLoader,
                'css-modules-typescript-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: {
                            localIdentName: '[local]----[hash:6]',
                        },
                    },
                },
                {loader: 'sass-loader', options: {sourceMap: true}},
            ],
        });

        return config;
    },
};
