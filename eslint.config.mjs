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
       üretiyor.

       KALIP OLDU, TEK AD DEĞİL. Burada bir tur boyunca yalnız ".next-build"
       yazılıydı ve bir lab turu kendi yalıtılmış sunucusunu ".next-lab" ile
       açtığında `npx eslint .` 228 sahte hata verdi. .gitignore aynı sorunu
       çoktan kalıpla çözmüş (51. satır, ".next-" öneki + joker) ve gerekçesi
       orada yazılı: "bir ajan .next-blogturu üretip gitignore'a eklemeyi
       unutabilir." Aynı gerekçe lint için de geçerli.

       NOT: bu yorumun içine gitignore satırını olduğu gibi yazmayın. Kalıp
       yıldız-eğik çizgiyle bitiyor ve o dizi blok yorumu erken kapatıyor;
       tam olarak bu yazılıp dosya sözdizimi hatası verdi. */
    ".next-*/**",
  ]),
]);

export default eslintConfig;
