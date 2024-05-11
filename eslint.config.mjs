import js from "@eslint/js";
import  eslintConfigPrettier from "eslint-config-prettier";

export default [
    js.configs.all,
    // js.configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            // "one-var": [
            //     2,
            //     {
            //         "var": "always",
            //         "let": "never",
            //         "const": "never",
            //     },
            // ],
        },
    },
    {
        ignores: [
            // Dist
            "dist/*",
            "dist-server/*",

            // Npm
            "node_modules/*",

            // Report
            "coverage-ts/*",
            "tsc-check/*",
            "coverage/*",

            // Style's d.ts
            "*.scss.d.ts",
            "*.css.d.ts",

            // Test
            "test-backstop/*",

            // Static site
            "static-site/*",

            // Storybook
            "storybook-static/*",
        ],
    },
];
