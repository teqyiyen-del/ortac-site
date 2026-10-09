"use client";

/* DİLİ YOLDAN OKUYAN KANCA (10.10.2026). İstemci bileşeni dili prop zinciriyle
   değil adresten öğreniyor: /en ve altı İngilizce, gerisi Türkçe (diller.ts ·
   dilOku). Menü ve alt bilgi 28 sayfadan çağrılıyor; hepsine `dil` geçirmek
   yerine tek kanca. Sunucuda da aynı değeri veriyor (usePathname durağan
   sayfada derleme anında yolu biliyor), yani hidratasyon farkı yok.
   Sunucu bileşenleri kanca çağıramaz: onlara `dil` prop olarak verilir
   (ör. home/Profiles). */
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { dilOku, type Dil } from "@/lib/i18n/diller";
import { cevirici, type Cevir, type Sozluk } from "@/lib/i18n/cevir";

export function useDil(): Dil {
  return dilOku(usePathname() ?? "");
}

/** bileşenin sözlüğüyle çeviri işlevi; Türkçe sayfada kimlik */
export function useCeviri(...sozlukler: Sozluk[]): { dil: Dil; c: Cevir } {
  const dil = useDil();
  // sözlükler modül sabiti: kimlikleri değişmiyor
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const c = useMemo(() => cevirici(dil, ...sozlukler), [dil]);
  return { dil, c };
}
