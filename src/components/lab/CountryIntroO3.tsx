import {
  BadgeCheck,
  Check,
  CreditCard,
  IdCard,
  Landmark,
  MapPin,
  MonitorSmartphone,
  Percent,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* ADAY O3 (.co3-) — "DENGE": beyaza konmuş tek kart, iki taraf.
 * Solda ülkenin verdikleri, sağda karşılığında istedikleri.
 *
 * ==========================================================================
 * FİKİR — GENEL BAKIŞ BİR REKLAM DEĞİL
 *
 * O1 dört avantajı eşit veriyor, O2 birini manşet yapıyor; ikisi de yalnızca
 * artı tarafı gösteriyor. O3 şunu savunuyor: bir ülkeye "genel bakış" atmak
 * demek, o ülkeyi SEÇİP SEÇMEYECEĞİNİ anlayacak kadarını tek ekranda görmek
 * demek — ve bu, eksi taraf olmadan olmuyor. Kart iki sütun: solda `pros`,
 * sağda `watchouts`.
 *
 * Bu aynı zamanda sitenin kendi duruşu. countryContent.ts'in başındaki kural
 * birebir şöyle: "every downside is stated plainly rather than softened."
 * Bugün o kural veride yaşıyor ama ekranda yaşamıyor — aşağıya bakın.
 *
 * ==========================================================================
 * AVANTAJ TEKRARI ÇELİŞKİSİ — O3'ÜN ÇÖZÜMÜ EN RADİKALİ
 *
 * O1 ve O2 `pros`u devralıyor, aşağıdaki CountryPros bento'su kalkıyor ve
 * boşalan slot bugüne dek hiç basılmamış olan `watchouts`a gidiyor.
 *
 * O3 İKİSİNİ BİRDEN devralıyor. Yani aşağıdaki slot kapanıyor, açılmıyor:
 * sayfa hero → GENEL BAKIŞ → yapı seçimi → CountryOrtac → vergi diye
 * yürüyor ve arada avantaj/karşılık bölümü hiç olmuyor. Kazancı bir bölüm
 * eksilmesi; bedeli, avantajların ve karşılıkların bir daha hiç
 * derinleşmemesi — okuyucu bu kartta ne gördüyse o kadar.
 *
 * `watchouts` BUGÜN HİÇBİR BÖLÜM TARAFINDAN BASILMIYOR. Doğrulandı:
 * CountryPros yorumu "Kalemler silinmedi (countryContent.watchouts duruyor),
 * bu ızgaradan çıktı" diyor; countryContent.ts yorumu "Şu an hiçbir bölüm
 * bunu basmıyor … aynı kalemler kendi başlarına bir bölüm olarak geri
 * gelecek" diyor. Yani sağ sütun tekrar değil, ilk kez ekrana çıkan içerik.
 *
 * ==========================================================================
 * SAĞ SÜTUN NEDEN İKİNCİ SINIF DEĞİL
 *
 * "Karşılığında" paneli kâğıt zeminde ve avantajlardan dar, ama küçültülmüş
 * değil: başlıkları aynı puntoda, cümleleri aynı puntoda. Fark yalnızca
 * zeminde ve genişlikte, yani hiyerarşi var ama saklama yok. Renkli bir uyarı
 * şeridi de KULLANILMADI (müşterinin kararı) — sağ tarafı ayıran şey 1px
 * çizgi ve kâğıt zemin.
 *
 * İkonlar `pros[].icon` üzerinden, CountryPros'un haritasıyla AYNI. Kalkacak
 * bento'nun ikonografisi böylece ölmüyor, yukarı taşınıyor. `watchouts`ın
 * ikonu yok ve uydurulmadı: sağ sütun ikonsuz, tipografiyle duruyor.
 *
 * ==========================================================================
 * UYDURMA YOK
 *
 * Ekrandaki her başlık ve her cümle countryContent.ts'ten geliyor. Tek
 * yazılmış metin iki sütun etiketi ("{ülke} ne veriyor" / "Karşılığında") ve
 * onlar bir iddia değil, birer başlık. Dubai'nin yıldızı ve şerhi solda tam
 * hâliyle duruyor; şartlılık kuralı CountryPros'tan birebir.
 *
 * Hareket yalnızca FadeUp; useReducedMotion yok, süregiden animasyon yok.
 */

const PRO_ICON: Record<string, LucideIcon> = {
  percent: Percent,
  bank: Landmark,
  id: IdCard,
  pin: MapPin,
  remote: MonitorSmartphone,
  wallet: Wallet,
  badge: BadgeCheck,
  card: CreditCard,
  zap: Zap,
};

const isConditional = (title: string, line: string) =>
  title.includes("*") || /şart/i.test(line);

export default function CountryIntroO3({ country, name }: { country: Country; name: string }) {
  const { pros, watchouts } = COUNTRY_CONTENT[country];

  return (
    <section className="co3">
      <div className="container-o">
        <div className="co3-card">
          {/* ------------------------------------------- sol · verdikleri */}
          <div className="co3-side">
            <FadeUp y={16}>
              <p className="co3-kicker">Genel bakış</p>
              <h2 className="co3-h">{name} ne veriyor?</h2>
            </FadeUp>

            <ul className="co3-list">
              {pros.map((p, i) => {
                const Icon = (p.icon && PRO_ICON[p.icon]) || Check;
                return (
                  <li key={p.title}>
                    <FadeUp delay={0.12 + i * 0.06} y={14} className="co3-row">
                      <span className="co3-ic" aria-hidden="true">
                        <Icon size={17} strokeWidth={2.1} />
                      </span>
                      <div className="co3-txt">
                        <h3 className="co3-t">
                          {p.title}
                          {isConditional(p.title, p.line) && (
                            <span className="co3-flag">şarta bağlı</span>
                          )}
                        </h3>
                        <p className="co3-p">{p.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------------------------------------- sağ · karşılığında
              Kâğıt zemin. Sütun ikonsuz: watchouts verisinde ikon alanı yok
              ve uydurmak, uyarıya olmayan bir kategori eklemek olurdu. */}
          <aside className="co3-cost">
            <FadeUp delay={0.1} y={16}>
              <p className="co3-kicker co3-kicker-q">Karşılığında</p>
              <p className="co3-costlead">
                Bunlar ülkenin bedeli. Kuruluş kararı ikisi birlikte okunarak
                veriliyor.
              </p>
            </FadeUp>

            <ul className="co3-clist">
              {watchouts.map((w, i) => (
                <li key={w.title}>
                  <FadeUp delay={0.18 + i * 0.07} y={14}>
                    <h3 className="co3-ct">{w.title}</h3>
                    <p className="co3-cp">{w.line}</p>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
