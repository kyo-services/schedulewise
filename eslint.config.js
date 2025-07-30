import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: [
			"**/dist/**",
			"**/node_modules/**",
			"*.config.js",
			"*.config.cjs",
			"commitlint.config.cjs",
			"jest.config.cjs",
			"eslint.config.js"
		],
	},
	{
		files: ["src/**/*.ts", "!src/**/*.test.ts", "!src/__tests__/**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.test.json"],
				ecmaVersion: 2022,
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		rules: {
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/no-require-imports": "error",
			"no-undef": "off",
		},
	},
	{
		files: ["src/**/*.test.ts", "src/__tests__/**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.test.json"],
				ecmaVersion: 2022,
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"no-undef": "off",
		},
	},
];
