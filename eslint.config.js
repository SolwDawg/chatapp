// eslint.config.js  (ESM vì package.json có "type": "module")
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default [
    // Bỏ qua thư mục build/runtime
    {
        ignores: [
            "node_modules/**",
            "vendor/**",
            "public/build/**",
            "storage/**",
        ],
    },

    // Cấu hình khuyến nghị cho JS
    js.configs.recommended,

    // Áp quy tắc cho React (JS/JSX) trong resources/js
    {
        files: ["resources/js/**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: {
                ...globals.browser,
                ...globals.node,
                route: "readonly", // nếu dùng Ziggy
            },
        },
        plugins: { react, "react-hooks": reactHooks, import: pluginImport },
        settings: { react: { version: "detect" } },
        rules: {
            // React
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // Import order (gọn gàng)
            "import/order": [
                "warn",
                {
                    "newlines-between": "always",
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                    ],
                },
            ],

            // Biến chưa dùng: cho phép biến/args bắt đầu bằng _
            "no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
        },
    },

    // Tắt rule xung đột với Prettier (format check bạn chạy riêng)
    prettier,
];
