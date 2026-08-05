import FadeUp from "@/components/shared/FadeUp";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY O2 (.co2-) — "BAŞAT": beyaza konmuş tek kart; en güçlü avantaj
 * manşet ölçüsünde, kalanlar altında bir şerit hâlinde.
 *
 * ==========================================================================
 * FİKİR — GENEL BAKIŞIN BİR MANŞETİ OLUR
 *
 * O1 dört avantajı eşit ağırlıkta veriyor; O2 tam tersini savunuyor. Bir
 * ülkeye "genel bakış" atan kişi dört maddeyi tartmıyor, tek bir şey
 * öğreniyor ve gerisini onun etrafına diziyor. Dubai'de o tek şey kurumlar
 * vergisi, İngiltere'de ziyaret şartının olmaması, KKTC'de Türkiye'ye
 * yakınlık — ve veri zaten bu sırada yazılmış. Bu aday o sırayı bir iddia
 * hâline getiriyor: `pros[0]` manşet, `pros[1..]` destek.
 *
 * ==========================================================================
 * AVANTAJ TEKRARI ÇELİŞKİSİ — DEVRALMA, BÖLÜŞME DEĞİL
 *
 * O1 ile aynı çözüm: `title` ve `line` burada tam hâliyle basılıyor,
 * aşağıdaki CountryPros bento'su kalkıyor, boşalan slot bugüne kadar hiçbir
 * yerde basılmamış olan `countryContent.watchouts`a veriliyor. Gerekçe
 * CountryIntroO1'in başında uzun uzun yazılı, burada tekrar edilmiyor.
 *
 * ==========================================================================
 * YILDIZ — MANŞETİN EN BÜYÜK RİSKİ VE NASIL KAPATILDIĞI
 *
 * Dubai'nin `pros[0]`'ı "Kurumlar vergisi %0*" ve o yıldız gerçek bir şart
 * taşıyor. Bir iddiayı manşet puntosuna çıkarmak, şerhini küçültme baskısı
 * yaratır; burada tersi yapıldı:
 *   · yıldız başlığın parçası, ayrı bir glif olarak İNCELTİLMEDİ, silinmedi;
 *   · "şarta bağlı" rozeti manşetin YANINDA, altında değil — punto düşmeden
 *     önce görülüyor;
 *   · `line` (şerhin kendisi: "Yıldız önemli: şart ihlalinde standart oran
 *     uygulanır.") manşetin hemen altında, kartın en geniş metni.
 * Yani manşet büyüdükçe şerh de büyüyor. Yeni bir oran, süre veya koşul
 * cümlesi ÜRETİLMEDİ; ekrandaki her kelime countryContent.ts'ten.
 *
 * Şartlılık metinden okunuyor (yıldız ya da "şart" geçen cümle), ikon
 * anahtarından değil — kural CountryPros'tan birebir.
 *
 * ==========================================================================
 * HERO'YU TEKRAR ETMEME
 *
 * Manşet puntosu bu turun en büyüğü, o yüzden risk de en yüksek burada.
 * İki şey tutuyor: zemin beyaz (dört turdur ölçülen ayırt edici) ve manşet
 * hero başlığının %69'unu geçmiyor (ölçüm css/lab-co2.css'in başında).
 * Ayrıca hero ülkenin ADINI söylüyor, bu kart bir OLGUYU — aynı cümle iki
 * kez geçmiyor.
 *
 * Hareket yalnızca FadeUp; useReducedMotion yok, süregiden animasyon yok.
 */

const isConditional = (title: string, line: string) =>
  title.includes("*") || /şart/i.test(line);

export default function CountryIntroO2({ country, name }: { country: Country; name: string }) {
  const pros = COUNTRY_CONTENT[country].pros;
  const [lead, ...rest] = pros;

  /* Veri boşsa bölüm hiç çıkmasın: boş bir manşet kabı "burada avantaj yok"
     diye okunur. Üç ülkede de dolu, ama tip güvenliği bunu bilmiyor. */
  if (!lead) return <></>;

  return (
    <section className="co2">
      <div className="container-o">
        <div className="co2-card">
          {/* ------------------------------------------------- manşet */}
          <FadeUp y={18} className="co2-lead">
            <p className="co2-kicker">
              {name} · genel bakış
            </p>

            <div className="co2-headline">
              <h2 className="co2-h">{lead.title}</h2>
              {isConditional(lead.title, lead.line) && (
                <span className="co2-flag">şarta bağlı</span>
              )}
            </div>

            {/* Şerhin kendisi. Manşetle arasına başka hiçbir şey girmiyor. */}
            <p className="co2-sub">{lead.line}</p>
          </FadeUp>

          {/* -------------------------------------------- destek şeridi */}
          {rest.length > 0 && (
            <ul className="co2-rest">
              {rest.map((p, i) => (
                <li className="co2-item" key={p.title}>
                  <FadeUp delay={0.16 + i * 0.07} y={14}>
                    <h3 className="co2-t">
                      {p.title}
                      {isConditional(p.title, p.line) && (
                        <span className="co2-flag co2-flag-sm">şarta bağlı</span>
                      )}
                    </h3>
                    <p className="co2-p">{p.line}</p>
                  </FadeUp>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
