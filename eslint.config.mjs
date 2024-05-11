import eslintJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import typescriptEslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

export default [
    eslintJs.configs.all,
    // js.configs.recommended,
    ...typescriptEslint.configs.all,
    // ...jest.configs.all,
    sonarjs.configs.recommended,
    eslintConfigPrettier,
    // {
    //     "plugins": {
    //         sonarjs: sonarjs,
    //     }
    // },
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
            "globals": {
                "JSX": true,
                "require": true,
                "module": true,
                "console": true
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
