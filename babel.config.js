module.exports = {
    presets: ['@vue/app'],
    plugins: [
        'dynamic-import-node',
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk',
            },
        ],
    ],
    env: {
        test: {
            plugins: ['require-context-hook'],
        },
    },
};
