/*
 * EXAMPLE ONLY — do not blindly replace your existing eslint.config.mjs.
 * Your project already has eslint-config-next and ESLint 9 installed.
 * Adapt this to the exact exports supported by your installed Next.js version.
 */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
