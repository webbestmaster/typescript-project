// eslint-disable-next-line unicorn/prefer-module
module.exports = [
    {
        rules: {
            curly: ["error", "multi"],
        },
        // eslint-disable-next-line sort-keys
        ignores: [
            // Dist
            "dist/**/*",
            "dist-server/**/*",

            // Npm
            "node_modules/**/*",

            // Report
            "coverage-ts/**/*",
            "tsc-check/**/*",
            "coverage/**/*",

            // Style's d.ts
            "*.scss.d.ts",
            "*.css.d.ts",

            // Test
            "test-backstop/**/*",

            // Static site
            "static-site/**/*",

            // Storybook
            "storybook-static/**/*",
        ],
    },
];
