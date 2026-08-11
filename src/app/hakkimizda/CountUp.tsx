"use client";

import { useEffect, useRef } from "react";

/* ============================================================================
   SAYAÇ — bento kutucuklarındaki üç rakam
   Kullanan: src/app/hakkimizda/page.tsx · 1. bölüm

   Müşteri istedi: "direkt sayısal veri verelim sayaçlı şekilde gerekirse."

   ====================== HİDRASYON: BU DOSYANIN ASIL KONUSU ==================
   Bu depoda hareket tercihine göre RENDER EDİLEN AĞACI değiştirme hatası dört
   ayrı kalıpta çıktı (`if (reduce) return null`, `{!reduce && …}`, `initial`
   içinde koşullu değer, `initial={{ width: reduce ? … }}`). Hepsinin ortak
   sebebi aynı: sunucu bir ağaç basıyor, istemci başka bir ağaç bekliyor.

   BURADA O RİSK YAPISAL OLARAK YOK. Bileşenin döndürdüğü şey TEK ve
   DEĞİŞMEZ: son rakamı taşıyan bir <b>. Sunucu onu basıyor, istemcinin ilk
   render'ı birebir aynısını üretiyor, React hiçbir zaman ikinci kez render
   etmiyor (durum yok, prop sabit). Sayma işi React'in dışında, doğrudan
   düğümün textContent'i üzerinde yürüyor.

   Sonuçları:
     · JS kapalıyken sayfada DOĞRU RAKAM duruyor — çünkü markup'ta o var.
     · useReducedMotion KULLANILMIYOR. Hareket tercihi effect içinde, yani
       render'ın dışında okunuyor; okunan değer hiçbir zaman JSX'e girmiyor.
     · Hareket azaltılmışsa sayaç HİÇ ÇALIŞMIYOR ve rakam zaten son değerinde
       duruyor. Kapatılacak bir animasyon yok, geri alınacak bir şey yok.

   ------------------------------------------------- "3 → 0 → 3" ARIZASI VE ÇÖZÜMÜ
   Sayaç sıfırdan başlamak zorunda ama markup son rakamı taşıyor. Naif çözüm
   (effect'te hemen 0 yaz) ekranda bir kare "3" gösterip sonra sıfıra düşürür;
   bu bir animasyon değil, arıza gibi görünür.

   Çözüm: sıfırlama YALNIZCA görünmezken yapılıyor. Kutucuk FadeUp içinde ve
   FadeUp'ın başlangıç durumu opacity 0 — üstelik bu değer sunucu tarafında da
   basılıyor. Effect çalıştığında kutucuk ya hâlâ saydam ya da ekranın
   altında; iki durumda da sıfırlama görülmüyor. Hiçbiri geçerli değilse
   (nadir: kart açılışta zaten görünür durumdaysa) sayaç ÇALIŞMIYOR ve rakam
   olduğu gibi kalıyor. Görünen sayı her zaman doğru; tek değişen, sayarak mı
   geldiği.

   Görünürlük ölçümü render'ı etkilemiyor — effect içinde, DOM'dan okunuyor.
   ========================================================================= */

/* Sayma eğrisi sitenin geri kalanıyla aynı his: ease-out-quint
   (globals · --ease-out-quint · cubic-bezier(0.22, 1, 0.36, 1)). Hızlı
   başlıyor, son rakamlara yaklaşırken yavaşlıyor — rakam "yerine oturuyor". */
const easeOutQuint = (p: number) => 1 - Math.pow(1 - p, 5);

/** Ögenin ve bütün atalarının opaklığı çarpılıyor: FadeUp'ın saydamlığı
    çocukta computed style olarak GÖRÜNMÜYOR, ataya yazılı. */
function effectiveOpacity(node: HTMLElement): number {
  let o = 1;
  for (let n: HTMLElement | null = node; n && o > 0.02; n = n.parentElement) {
    const v = Number(getComputedStyle(n).opacity);
    if (!Number.isNaN(v)) o *= v;
  }
  return o;
}

export default function CountUp({
  to,
  className,
  duration = 1200,
}: {
  to: number;
  className?: string;
  /** ms — üç kutucukta da aynı, yani üç rakam aynı anda yerine oturuyor */
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Hareket tercihi BURADA okunuyor, render'da değil. Azaltılmışsa hiçbir
       şey yapılmıyor: rakam zaten son değerinde. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    /* Sıfırlamayı görebilecek durumda mıyız? Kutucuk saydamsa ya da ekranın
       altındaysa göremeyiz — sayaç ancak o zaman çalışıyor. */
    const box = el.getBoundingClientRect();
    const unseen = effectiveOpacity(el) < 0.05 || box.top >= window.innerHeight;
    if (!unseen) return;

    let raf = 0;
    el.textContent = "0";

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          el.textContent = String(Math.round(to * easeOutQuint(p)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      /* Eşik FadeUp'ınkiyle AYNI (viewport.margin "0px 0px -15% 0px"):
         rakam kutucukla birlikte beliriyor, ondan önce ya da sonra değil. */
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      /* Bileşen sökülürken rakam markup'takine geri dönüyor: React'in
         bildiği içerik hiç değişmedi, DOM da onunla aynı hâle geliyor. */
      el.textContent = String(to);
    };
  }, [to, duration]);

  /* tabular-nums CSS'te (bugün .ab-kn-n): sayarken hane genişliği değişirse
     etiket titrer. İki haneye çıkan bir sayıda (sektörler artarsa) fark görünür.
     Selektör adı bento Aday 7'ye (Künye) geçerken .ab-b-n'den değişti; kural
     kaybolmadı, ad alanı değişti. */
  return (
    <b className={className} ref={ref}>
      {to}
    </b>
  );
}
