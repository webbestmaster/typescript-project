const js = require("@eslint/js");
const eslintConfigPrettier = require("eslint-config-prettier");

// eslint-disable-next-line unicorn/prefer-module
module.exports = [
    // js.configs.all,
    js.configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            "one-var": [
                2,
                {
                    "var": "always",
                    "let": "never",
                    "const": "never",
                },
            ],
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
