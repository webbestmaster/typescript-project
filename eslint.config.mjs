import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default [
    js.configs.all,
    ...tseslint.configs.all,
    // js.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            "parserOptions": {
                "project": [
                    "./tsconfig.json",
                ],
                "ecmaVersion": 2020,
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true,
                },
            },
        },
    },
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
