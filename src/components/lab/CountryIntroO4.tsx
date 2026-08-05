import Image from "next/image";
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
import { COUNTRY_PHOTO } from "@/lib/media";
import type { Country } from "@/lib/store";

/* ADAY O4 (.co4-) — "ZEMİN": O3'ün içeriği, K2'nin kalıbı.
 *
 * ==========================================================================
 * NEDEN VAR — MÜŞTERİNİN CÜMLESİ
 *
 * "yine en iş görür olanı o3 gibi duruyor ama her şey çok yazı olarak duruyor
 * ve ne görsel var ne bişi o yüzden aşırı sıkıcı. bence muhasebe tarafında
 * şimdi k2 yaptık ya arkası görsel üstüne yazı yazıyoruz bence onu buraya
 * uyarlayabiliriz."
 *
 * Yani karar iki parçalı: O3'ün FİKRİ kalıyor, O3'ün YÜZEYİ değişiyor.
 * O4 = O3'ün içeriği (solda pros, sağda watchouts, ikisi aynı puntoda) +
 * K2'nin yüzeyi (fotoğraf bölümün zemini, üstünde ölçülmüş bir perde).
 *
 * K2'DEN ALINAN ÜÇ ŞEY:
 *   1. Fotoğraf komşu değil ZEMİN — kartın arkasına geçiyor, metin üstünde.
 *   2. Perde fotoğrafa göre değil EN KÖTÜ İHTİMALE göre seçiliyor: kare
 *      değişse bile (media.ts · SWAP:STOCK_PHOTOS) kontrast yeniden
 *      ölçülmüyor. Sayılar css/lab-co4.css'in başında.
 *   3. İkonun kabı yok — koyu zeminde açık renkli bir pul, sütunu kutuya
 *      çevirir. Glif doğrudan --blue-500.
 *
 * ==========================================================================
 * "İKİ HERO" RİSKİ — DÖRT TURDUR ÇARPILAN DUVAR VE BU SEFERKİ CEVAP
 *
 * Müşterinin ilk itirazı "şuan sayfada 2 tane hero varmış gibi duruyor"du ve
 * sebebi ölçülmüştü: sorun punto değil ZEMİNDİ. Hero gece rengi + ızgara +
 * glow; bölüm de aynı dili konuşunca sayfa iki kez aynı şekle giriyordu.
 * O1/O2/O3 bu yüzden beyaza kuruldu. O4 koyu bir zemin getiriyor, yani riski
 * geri çağırıyor — ve beş ayrı kolla ayrışıyor. Ölçümü css dosyasının başında,
 * özeti:
 *
 *   1. MADDE   hero'nun zemini VEKTÖR (düz #080808 + CSS ızgara + mavi glow),
 *              O4'ünki FOTOĞRAF. Sayfada fotoğraf taşıyan tek koyu yüzey bu.
 *   2. YAYILIM hero kenardan kenara, yarıçapı 0, nav'a değiyor. O4 container-o
 *              içinde, --r-panel yuvarlaklığında; solunda ve sağında 1440'ta
 *              152'şer piksel beyaz duruyor. Koyu alan hiçbir ekran kenarına
 *              değmiyor — "buraya koyulmuş bir part".
 *   3. PUNTO   hero 58px (1440), O4 29px. Yarısı.
 *   4. IŞIK    hero'nun başlığının arkasında mavi bir glow var; O4'te glow yok,
 *              ızgara yok, mavi yalnızca 17 piksellik ikon gliflerinde.
 *   5. BOY     hero 890px; O4'ün koyu kartı ondan belirgin kısa (ölçüm sayfada).
 *
 * İki tur önce kalkan sürüm de koyuydu ve reddedilmişti — ama o, hero'nun
 * kalıbının tekrarıydı: tam genişlik + gece zemin + ızgara + glow. Buradaki
 * fark taklit ile alıntı arasındaki fark.
 *
 * ==========================================================================
 * FOTOĞRAF
 *
 * lib/media.ts · COUNTRY_PHOTO[country]; yeni adres yazılmadı. Kare açılıp
 * bakıldı: Dubai — alacakaranlıkta Burj Khalifa merkezde, önünde Şeyh Zayed
 * yolunun katlı kavşağı, gökyüzü turuncudan turkuaza dönüyor (1400×933).
 * ⚠ Bir Unsplash kimliğinin arkasındaki kare değişebiliyor (media.ts'teki
 * uyarı, bu depoda bir kez yaşandı) — perde tam bu yüzden karenin kendisine
 * değil, "kare saf beyaz olsaydı" ihtimaline göre ayarlandı.
 *
 * Kare DEKOR: alt="" ve kartın altında temsilî olduğunu söyleyen künye satırı.
 * Cümle C5'ten birebir; ülke sayfası bu fotoğrafı zaten böyle işaretliyor.
 * unoptimized, çünkü next.config.ts'te images.remotePatterns tanımlı değil.
 *
 * ==========================================================================
 * UYDURMA YOK
 *
 * Ekrandaki her başlık ve her cümle countryContent.ts'ten. Yazılmış tek metin
 * iki sütun etiketi ve sağ sütunun giriş cümlesi — üçü de O3'ten birebir,
 * yani adaylar arasında içerik farkı yok, yalnızca yüzey farkı var.
 * Dubai'nin pros[0]'ındaki yıldız ve şerhi olduğu gibi duruyor; "şarta bağlı"
 * rozeti O3'teki gibi yıldızı işaret ediyor.
 *
 * Hareket yalnızca FadeUp. useReducedMotion yok (bu depoda beş ayrı kalıpta
 * hidrasyon hatası çıkardı), süregiden animasyon yok; sunucu bileşeni.
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

export default function CountryIntroO4({ country, name }: { country: Country; name: string }) {
  const { pros, watchouts } = COUNTRY_CONTENT[country];

  return (
    <section className="co4">
      <div className="container-o">
        <figure className="co4-fig">
          <div className="co4-card">
            {/* Zemin. Fotoğraf ve perde AYNI kapta duruyor: dar ekranda kap
                kartın tamamını değil üst bandını kaplıyor (gerekçe CSS'te,
                "mobil" başlığı) ve perdenin alt ucu --night'a bağlanıyor —
                yani ikisi birlikte iniyor, arada dikiş kalmıyor. */}
            <div className="co4-bg" aria-hidden="true">
              <Image
                src={COUNTRY_PHOTO[country]}
                alt=""
                fill
                sizes="(min-width: 1240px) 1136px, 100vw"
                className="co4-img"
                unoptimized
              />
              <span className="co4-scrim" />
            </div>

            {/* ---- açık pencere + başlık ----
                Başlık bandın ALT ucuna yaslı, üstünde kalan boşluk boş değil:
                perdenin en açık yeri orası ve fotoğraf oradan görünüyor.
                Yani "arkada görsel var" bir his değil, ayrılmış bir alan. */}
            <div className="co4-head">
              <FadeUp y={16}>
                <p className="co4-kicker">Genel bakış</p>
                <h2 className="co4-h">{name} ne veriyor?</h2>
              </FadeUp>
            </div>

            <div className="co4-body">
              {/* ------------------------------------- sol · verdikleri */}
              <div className="co4-side">
                <ul className="co4-list">
                  {pros.map((p, i) => {
                    const Icon = (p.icon && PRO_ICON[p.icon]) || Check;
                    return (
                      <li key={p.title}>
                        <FadeUp delay={0.12 + i * 0.06} y={14} className="co4-row">
                          <span className="co4-ic" aria-hidden="true">
                            <Icon size={17} strokeWidth={2.1} />
                          </span>
                          <div className="co4-txt">
                            <h3 className="co4-t">
                              {p.title}
                              {isConditional(p.title, p.line) && (
                                <span className="co4-flag">şarta bağlı</span>
                              )}
                            </h3>
                            <p className="co4-p">{p.line}</p>
                          </div>
                        </FadeUp>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* ---------------------------------- sağ · karşılığında
                  O3'teki gibi ikonsuz: watchouts verisinde ikon alanı yok ve
                  uydurmak, uyarıya olmayan bir kategori eklemek olurdu.
                  Sütunu ayıran şey renk değil — bir tık daha koyu bir perde
                  katı ve 1px saç teli çizgi. */}
              <aside className="co4-cost">
                <FadeUp delay={0.1} y={16}>
                  <p className="co4-kicker">Karşılığında</p>
                  <p className="co4-costlead">
                    Bunlar ülkenin bedeli. Kuruluş kararı ikisi birlikte okunarak
                    veriliyor.
                  </p>
                </FadeUp>

                <ul className="co4-clist">
                  {watchouts.map((w, i) => (
                    <li key={w.title}>
                      <FadeUp delay={0.18 + i * 0.07} y={14}>
                        <h3 className="co4-ct">{w.title}</h3>
                        <p className="co4-cp">{w.line}</p>
                      </FadeUp>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>

          {/* Künye kartın DIŞINDA, beyazın üstünde — C5'teki gerekçeyle aynı:
              fotoğrafın üstüne binen bir uyarı, uyarı olmaktan çıkıyor. */}
          <figcaption className="co4-cap">
            Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
