import FadeUp from "@/components/shared/FadeUp";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   K3 · KÜNYE  —  "Bu işi kim yürütüyor?" adayı

   FİKİR: cevap bir kutu ızgarası değil, bir künye.

   Başlık bir soru soruyor ama bugün soruya doğrudan cevap veren tek bir
   cümle yok: sayfanın diğer bölümlerinin (kapsam, fiyat, özet) `lead`
   satırı var, bu bölümün yok. Ziyaretçi soruyu okuyup dört eşit kutuya
   bakıyor ve cevabı kendisi derliyor.

   Burada bölüm bir gazetenin künyesi gibi kuruluyor: üstte konuşan taraf —
   alıntı ve altında adı — sonra saç teli bir çizgi, çizginin altında dört
   madde numaralanmış ince sütunlar hâlinde. Kutu yok, kenarlık yok, zemin
   yok, ikon yok: dört madde künyenin künye satırları oluyor.

   BU AYNI ZAMANDA YÜKSEKLİK SORUNUNU KÖKÜNDEN KESİYOR. Dördüncü maddenin
   cümlesi 122 karakter, üçüncününki 71 — yani bir buçuk katı. 2×2 kutu
   ızgarasında bu fark kısa kutunun altında görünür bir delik açıyor
   (kutunun kenarlığı deliği çiziyor). Kenarlık kalkınca fark görünmüyor:
   metin sütunlarının farklı yerlerde bitmesi normal.

   METİN: dört maddenin başlığı ve cümlesi accountingDubai.ts'ten birebir,
   alıntı metni değişmedi. figure/blockquote/figcaption korundu: künyenin
   başındaki ad hâlâ "bu cümleyi söyleyen" anlamına geliyor.

   NEYİ FEDA EDİYOR: dört madde küçük punto ve gri — künyede olması gereken
   yerde, ama bugünkünden görsel olarak daha zayıf. Dört iddianın bölümün
   yıldızı olması isteniyorsa bu aday yanlış. İkonlar da gitti: tarama
   hızından kaybediyor, sakinlikten kazanıyor.
   ========================================================================= */

/** 01, 02, 03, 04 — künye satır numarası. */
const ord = (i: number) => String(i + 1).padStart(2, "0");

export default function KimK3() {
  return (
    <div className="kim3">
      <FadeUp delay={0.04}>
        <figure className="kim3-plate">
          <blockquote className="kim3-q">{C.ortac.quote.text}</blockquote>
          <figcaption className="kim3-who">
            <b>{C.ortac.quote.who}</b>
            <span>{C.ortac.quote.role}</span>
          </figcaption>
        </figure>
      </FadeUp>

      <FadeUp delay={0.1}>
        <ol className="kim3-terms">
          {C.ortac.facts.map((f, i) => (
            <li className="kim3-t" key={f.title}>
              {/* Numara okunacak bir bilgi değil, sırayı gösteren bir işaret;
                  ekran okuyucu <ol> sayesinde sırayı zaten söylüyor, iki kez
                  duyurmasın diye aria-hidden. */}
              <span className="kim3-t-n" aria-hidden="true">
                {ord(i)}
              </span>
              <b className="kim3-t-h">{f.title}</b>
              <span className="kim3-t-l">{f.line}</span>
            </li>
          ))}
        </ol>
      </FadeUp>
    </div>
  );
}
