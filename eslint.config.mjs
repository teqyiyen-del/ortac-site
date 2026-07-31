import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    /* Dev sunucusu çalışırken alınan üretim derlemesinin çıktısı
       (next.config.ts → NEXT_DIST_DIR). Varsayılan ".next/**" bunu
       kapsamıyor ve derlenmiş paketler lint'e girip binlerce sahte hata
       üretiyor. */
    ".next-build/**",
  ]),
]);

export default eslintConfig;
