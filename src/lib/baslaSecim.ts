import { DUBAI_VARSAYILAN, dubaiSecimOku, type DubaiSecim } from "@/lib/dubaiFiyat";
import { KKTC_VARSAYILAN, type KktcSecim } from "@/lib/kktcFiyat";

/* KURULUM PENCERESİNE TAŞINAN SEÇİM (07.10.2026)
   Pencere iki ülkede açılıyor (Dubai, KKTC). Fiyat panelindeki "başlayın"
   düğmesi seçimi adresle taşıyor; ülke sayfasındaki "Hemen Başla" ise
   yalnız ülkeyi (varsayılan seçimle). İkisinde de pencere ikinci adımdan,
   seçili açılıyor. */
export type BaslaOnceden = { ulke: "dubai"; dubai: DubaiSecim } | { ulke: "kktc"; kktc: KktcSecim };

/** panelden pencereye: /basla?ulke=kktc&adres=1&muh=aktif */
export function kktcBaslaHref(x: KktcSecim): string {
  return `/basla?ulke=kktc&adres=${x.adres ? "1" : "0"}&muh=${x.muhasebe}`;
}

export function baslaOku(q: Record<string, string | string[] | undefined>): BaslaOnceden | null {
  if (q.ulke === "kktc")
    return { ulke: "kktc", kktc: { adres: q.adres !== "0", muhasebe: q.muh === "pasif" ? "pasif" : "aktif" } };
  const d = dubaiSecimOku(q);
  return d ? { ulke: "dubai", dubai: d } : null;
}

/** sorgusuz "Hemen Başla": bulunulan sayfa bir ülke sayfasıysa o ülke, varsayılan seçimle */
export function baslaSayfadan(yol: string): BaslaOnceden | null {
  if (yol === "/kktc" || yol.startsWith("/kktc/")) return { ulke: "kktc", kktc: KKTC_VARSAYILAN };
  if (yol === "/dubai" || yol.startsWith("/dubai/")) return { ulke: "dubai", dubai: DUBAI_VARSAYILAN };
  return null;
}
