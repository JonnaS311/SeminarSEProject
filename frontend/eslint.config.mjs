// eslint.config.js
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals:  {
        ...globals.browser,
        interact: "readonly",
      },
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-function-paren": ["error", "never"],

      // Buenas prácticas
      "no-unused-vars": "warn",
      "eqeqeq": ["error", "always"],
      "no-console": "warn",
      "curly": ["error", "all"],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-redeclare": "error",
      "no-var": "error",
      "prefer-const": "error",
      "consistent-return": "error",

      // Seguridad y robustez
      "default-case": "warn",
      "no-fallthrough": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",

      // Mejora de legibilidad
      "max-len": ["warn", { code: 100 }],
      "no-nested-ternary": "error",
      "no-magic-numbers": ["warn", { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }]
    },
  },
]);
