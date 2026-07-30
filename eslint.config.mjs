import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * The README documented `npm run lint` long before anything could run it, and
 * most of what the v3 consolidation pass cleaned up by hand is exactly what this
 * catches automatically: unused imports left behind by a refactor, dead
 * variables, missing effect dependencies, `<img>` where next/image belongs.
 *
 * eslint-config-next 16 ships native flat configs, so these are spread directly
 * — no @eslint/eslintrc FlatCompat wrapper.
 */
const config = [
  { ignores: [".next/**", "node_modules/**", "public/**", "*.tsbuildinfo"] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // An unused variable is almost always a leftover. Underscore-prefixed
      // names are the deliberate escape hatch (unused callback params, mostly).
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default config;
