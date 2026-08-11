import { useEffect, useRef, useState } from "react";
import { PRICING, TIER_INCLUDES } from "@/lib/pricing";
import type { Activity, Country, Tier } from "@/lib/store";

/* /lab/dubai-fiyat — üç adayın PAYLAŞTIĞI hesap ve kanca katmanı.
 *
 * NEDEN AYRI DOSYA: üç aday aynı sayıları basmak ZORUNDA. Tur brief'inin
 * kısıtı birebir buydu — "Adaylar canlının bugün bastığı sayıları bassın".
 * Formül lib/pricing.ts'te (o dosyaya bu turda dokunulmadı); burada yalnızca
 * o formülün çıktısını ekrana çevirirken üçünün de ihtiyaç duyduğu şeyler var.
 * Kopyalasaydım üç ayrı yuvarlama hatası yapma ihtimali üç katına çıkardı.
 *
 * BURADA FİYAT HESABI YOK. Tek istisna dfAddonPrice: canlı bileşenin hiç
 * hesaplamadığı bir sayıyı veriyor — SEÇİLMEYEN bir kalemin fiyatı. configure()
 * yalnızca seçilenleri satıra döküyor, oysa bu turun sorularından biri
 * "ziyaretçi çıkardığı kalemin ne kadar olduğunu görüyor mu". Görebilmesi için
 * seçilmemiş kalemin de fiyatı lazım ve o fiyat PRICING'ten okunuyor, elle
 * yazılmıyor.
 */

export const DF_TIERS: Tier[] = ["basic", "gold", "platinium"];

export const DF_ACTIVITIES: Activity[] = [
  "e-ticaret",
  "yazilim",
  "danismanlik",
  "gayrimenkul",
  "saglik",
  "finans",
];

/* Canlı bileşendeki biçimlendirmenin birebir aynısı (CountryPricing.tsx · money).
   tr-TR binlik ayıracı nokta veriyor: $5.400. Ayraç değişirse aday ile canlı
   yan yana konduğunda fark sayıda değil noktalamada görünür, o yüzden aynı
   çağrı kullanıldı. */
export const dfMoney = (n: number) => `$${n.toLocaleString("tr-TR")}`;

export type DfAddon = "bank" | "visa" | "accounting";

/* Bir ek hizmetin BİRİM fiyatı — pakete dahil olup olmadığına bakmadan.
   Vize kişi başı; ülkeye göre 0 olabilir (İngiltere perVisa = 0, o yüzden
   üç adayda da vize kontrolü hiç basılmıyor). */
export function dfAddonPrice(country: Country, a: DfAddon) {
  const p = PRICING[country];
  return a === "bank" ? p.bank : a === "accounting" ? p.annual : p.perVisa;
}

/* Paket bir kalemi zaten kapsıyor mu. TIER_INCLUDES'un ince kabuğu: vize
   sayısını boolean'a indiriyor ki üç aday da "dahil / değil" diye tek bir dille
   konuşsun. */
export function dfIncluded(tier: Tier, a: DfAddon) {
  const inc = TIER_INCLUDES[tier];
  return a === "bank" ? inc.bank : a === "accounting" ? inc.accounting : inc.visas > 0;
}

export const DF_ADDON_LABEL: Record<DfAddon, string> = {
  bank: "Banka hesabı desteği",
  visa: "Vize",
  accounting: "Yıllık muhasebe",
};

/* ---------------------------------------------------------------------------
   TUTAR DEĞİŞİM FARKI — "az önce ne kaybettiniz / ne eklediniz".

   HİDRATASYON: ilk render'da delta 0 ve seq 0, sunucuda da istemcide de.
   Değer yalnızca useEffect içinde değişiyor, yani render ağacında okunan
   hiçbir şey ilk turda ikiye ayrılmıyor (AGENTS.md · tuzak A).

   seq NEDEN VAR: CSS animasyonunu yeniden tetiklemenin tek temiz yolu düğümü
   değiştirmek. Çağıran taraf <span key={seq}> yazıyor, React elemanı söküp
   yeniden takıyor, animasyon baştan oynuyor. Alternatif (animation-name'i
   kaldırıp geri koymak, void offsetWidth okumak) hem düzen hesabı zorluyor hem
   de JS'e hareket kararı taşıyor. */
export function useDfDelta(total: number) {
  const prev = useRef(total);
  const [state, setState] = useState({ delta: 0, seq: 0 });
  useEffect(() => {
    if (prev.current === total) return;
    const d = total - prev.current;
    prev.current = total;
    setState((s) => ({ delta: d, seq: s.seq + 1 }));
  }, [total]);
  return state;
}

/* ---------------------------------------------------------------------------
   SAYAÇ — tutar zıplamıyor, sayıyor.

   Canlı bileşen bunu motion/react'in animate()'iyle yapıyor. Burada çıplak
   rAF kullanıldı çünkü aday sayfası zaten üç bileşen açıyor ve tek iş için
   animasyon kütüphanesi taşımanın karşılığı yok; ayrıca $50 tabanına yuvarlama
   canlıdakiyle aynı kalsın diye adım burada elle veriliyor.

   AZALTILMIŞ HAREKET: matchMedia YALNIZCA useEffect içinde okunuyor. Render
   ağacında bu bilgi hiç geçmiyor, yani sunucu ve istemci ilk turda aynı sayıyı
   basıyor. Tercih 'reduce' ise sayaç hiç çalışmıyor, değer tek adımda yerine
   oturuyor. */
export function useDfCount(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    /* AZALTILMIŞ HAREKET SÜREYİ SIFIRLIYOR, DALI DEĞİL. Önce erken çıkış +
       setShown(value) yazılmıştı; react-hooks/set-state-in-effect onu haklı
       olarak reddetti (efekt gövdesinde eşzamanlı setState zincirleme render
       üretiyor). Süre 0 olunca ilk kare k=1 veriyor ve değer aynı karede
       yerine oturuyor — setState'in tamamı rAF geri çağrısının içinde kalıyor. */
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    const dur = reduce ? 0 : 460;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      /* easeOutQuint — sitedeki --ease-out-quint ile aynı his */
      const e = 1 - Math.pow(1 - k, 5);
      const v = start + (value - start) * e;
      setShown(Math.round(v / 50) * 50);
      if (k < 1) raf = requestAnimationFrame(tick);
      else {
        from.current = value;
        setShown(value);
      }
    };
    raf = requestAnimationFrame(tick);
    /* EMNİYET ZİNCİRİ — rAF'ın hiç çalışmadığı hâller var ve bu turda bizzat
       ölçüldü: sayfa 0x0 gizli bir iframe içinde açılınca Chrome rAF'ı hiç
       tetiklemedi, tutar ekranda ESKİ DEĞERDE KALDI (fark pulu doğru sayıyı
       yazarken büyük rakam kıpırdamadı). Aynı durum arka plandaki sekmede de
       geçerli. Sayaç bir süs; TUTARIN KENDİSİ süs değil, o yüzden nihai değeri
       zamanlayıcı garanti ediyor. Zamanlayıcı arka planda kısılıyor ama
       çalışıyor, rAF hiç çalışmıyor.
       Canlı bileşen (CountryPricing · motion/react animate) aynı riski
       taşıyor ve bu emniyet zinciri orada YOK; kalem listesine yazıldı. */
    const guard = setTimeout(() => {
      from.current = value;
      setShown(value);
    }, dur + 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(guard);
    };
  }, [value]);
  return shown;
}
