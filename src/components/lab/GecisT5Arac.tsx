import { ArrowRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { isLive } from "@/lib/routes";
import { LIVE_TOOLS } from "@/lib/tools/catalog";
import type { Country } from "@/lib/store";

/* ADAY T5 (.gc5-) — TÜR: İŞLEVSEL
 *
 * ==========================================================================
 * BU ARALIĞA VERDİĞİ İŞ
 *
 * Aralık okutmuyor, ÇALIŞTIRIYOR. Hero bittiğinde ziyaretçiye sayfanın
 * yapamadığı bir şey uzatılıyor: kendi durumunu girip cevap alabileceği bir
 * araç. Sitede bu araçlar zaten yazılmış ve yayında; ülke sayfası bugün
 * hiçbirine kapı açmıyor.
 *
 * Türün ayrımı burada: öteki beş aday sayfanın İÇİNDE bir şey yapıyor, bu
 * aday sayfanın DIŞINA bir kapı açıyor. Aralığın işi "geçiş" olduğuna göre,
 * geçişin bir yerde başka bir yöne de çıkabilmesi tutarlı bir seçenek.
 *
 * ==========================================================================
 * LİSTE ELLE YAZILMADI — ROTANIN CANLILIĞINDAN TÜRÜYOR
 *
 * Kapılar `LIVE_TOOLS`'tan geliyor ve iki süzgeçten geçiyor:
 *   1) isLive(href) — lib/routes.ts'in kendi kaydı. Bu ZORUNLU: katalogda
 *      "live" yazan altı araç var ama site içi dolaşımda yalnızca uygunluk
 *      testi açık (müşterinin kararı: "live olarak sadece uygunluk testi
 *      kalsın şimdilik"). Süzgeç olmasaydı bölüm SmartLink yüzünden beş
 *      sönük, tıklanamaz kutu basardı — yani bir kapı bölümü kapı basmazdı.
 *   2) ülke eşleşmesi — aracın `country` alanı bu ülke ya da "hepsi".
 *
 * Yani bugün Dubai'de tek kapı çıkıyor. Yarın başka bir araç yayına
 * alındığında bu bölüm kendiliğinden büyüyor, burada tek satır
 * değişmiyor. Hiçbir araç yayında değilse bölüm hiç basılmıyor.
 *
 * BAŞLIK, KÜNYE VE AÇIKLAMA aracın kendi kaydından (catalog.ts · title /
 * meta / is). Buraya tanıtım cümlesi yazılmadı.
 *
 * NE OLMADIĞI (`isNot`) BURADA BASILMIYOR ve bu bir eksik değil, yer kararı:
 * o alan aracın KENDİ SAYFASINDA başlığın hemen altında duruyor ve kataloğun
 * kuralı da onu oraya bağlıyor. Bir aralıkta iki cümlelik çekince metni,
 * bölümü bir nefes olmaktan çıkarıp uyarı kutusuna çevirirdi.
 *
 * ==========================================================================
 * HAREKET
 *
 * Ekranda tek bir şey var → "olabildiğince fazla". İki sürekli hareket:
 * kapının üzerinden geçen ışık (7.2 s, sonsuz) ve okun kendi salınımı
 * (2.6 s). Üstüne gelince ok salınımı bırakıp sağa yerleşiyor ve kapı
 * kalkıyor — yani bekleyen hareket, niyet belirince yerini tepkiye
 * bırakıyor.
 */

export default function GecisT5Arac({ country }: { country: Country; name: string }) {
  const doors = LIVE_TOOLS.filter(
    (t) => isLive(t.href) && (t.country === country || t.country === "hepsi"),
  );
  if (doors.length === 0) return null;

  return (
    <section className="gc5">
      <div className="container-o">
        <div className="gc5-in">
          <p className="gc5-kicker">Okumadan önce</p>

          <ul className="gc5-list">
            {doors.map((t) => (
              <li key={t.id} className="gc5-item">
                <SmartLink href={t.href} className="gc5-door">
                  <span className="gc5-txt">
                    <span className="gc5-t">{t.title}</span>
                    <span className="gc5-meta">{t.meta}</span>
                    <span className="gc5-is">{t.is}</span>
                  </span>
                  <span className="gc5-go" aria-hidden="true">
                    <ArrowRight size={16} strokeWidth={2.1} />
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
