import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { COUNTRY_PHOTO } from "@/lib/media";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import type { Country } from "@/lib/store";

/* KONUYA GİRİŞ (.cin-) — ülke sayfasında hero ile yapı seçimi arasındaki bölüm.
 *
 * NEDEN BURADA
 * Bu, sayfada BİLEREK boşaltılmış bir aralık. Hero'nun hemen altında önce dört
 * rakamlı bir şerit vardı (sayfa "burası neden" demeden rakamla konuşmaya
 * başlıyordu), sonra "…'de karıştırılan üç şey" bloğu (ziyaretçi ülkeyi
 * tanımadan üç uyarıyla karşılaşıyordu). İkisi de kaldırıldı; gerekçeleri
 * app/ulke/[slug]/page.tsx içinde, bu bölümün çağrıldığı yerin hemen üstünde
 * duruyor. Boşluk, o iki hatanın YERİNE bir şey koymak için bırakıldı.
 *
 * O yüzden bu bölümde OLMAYACAK iki şey var ve bu bir üslup tercihi değil,
 * yukarıdaki iki kararın devamı:
 *   · rakam şeridi yok — burada tek bir sayı, oran, süre veya tutar geçmiyor;
 *   · uyarı / çekince bloğu yok — FACTS[c].limit ve countryContent.watchouts
 *     bu bileşenin okuduğu alanlar arasında değil. Kısıt kaybolmuyor: dürüst
 *     sınır zaten hero'nun güven satırında (PageHero · trust · FACTS.limit)
 *     ve aşağıda kendi bağlamlarında duruyor.
 *
 * BÖLÜMÜN İŞİ
 * Ziyaretçiyi yapı seçimine hazırlamak: ülkenin NE olduğu ve KİME yaradığı
 * iki satırda geçsin, sonra karar bölümü başlasın. Anlatım değil giriş —
 * o yüzden iki künye satırından uzun değil.
 *
 * METİN NEREDEN GELİYOR (bileşende elle yazılmış tek bir iddia yok)
 *   · "Kurulan yapı" → lib/brand.ts · FACTS[c].structure
 *   · "Kimin için"   → lib/countryContent.ts · fitTable, yalnızca ok:true
 *                       satırların `profile` etiketi
 * İkisi de bu sayfada başka bir yerde BASILMIYOR. Seçim buna göre yapıldı:
 *   · c.intro hero'nun lead'i, c.pros CountryPros, c.tagline MoneyHome,
 *     FACTS.limit hero'nun güven satırı — hepsi elendi, tekrar olurdu.
 *   · FACTS.forWhom de elendi: İngiltere ve KKTC hero'sunda vektör sahnenin
 *     içinde zaten yazıyor (PageHero · CountryScene), yani aynı virgüllü
 *     liste tek ekranda iki kez okunurdu.
 * fitTable'ın burada önizlenmesi tekrar değil devamlılık: aynı veri sayfanın
 * çok aşağısında, "…kimin işine yarar?" bölümünde gerekçeleriyle ve
 * seçilebilir hâlde açılıyor. Burada yalnızca etiketler geçiyor.
 *
 * FOTOĞRAF
 * Sayfanın ilk ve tek gerçek fotoğrafı. Kaynağı lib/media.ts · COUNTRY_PHOTO,
 * yani sitenin geri kalanıyla aynı havuz — buraya yeni bir adres yazılmadı.
 * Fotoğraf bölümün KANITI DEĞİL ATMOSFERİ: yanındaki iki künye satırı kendi
 * başına ayakta duruyor, kare silinse bölüm bilgi kaybetmez.
 *   · alt="" ve kabı aria-hidden — dekor, bilgi taşımıyor.
 *   · Künye satırı (.cin-note) bir iddia değil, iddianın reddi: elimizde
 *     firmanın kendi çekimi yok, stok bir kareyi kendi ofisi gibi göstermek
 *     bu sitenin baştan sona reddettiği şey olurdu. Aynı cümlenin çoğul hâli
 *     /hakkimizda'da yaşıyor (lib/about.ts · WHERE.photoNote); oradan import
 *     edilmedi çünkü orada üç kare var, burada bir tane.
 *   · KKTC'nin karesi bugün bir Akdeniz kıyısı ve Girne'nin kendisi DEĞİL
 *     (media.ts'te "stand-in for Girne" notu duruyor). Bölüm bunu kaldırıyor
 *     çünkü kare zaten bir yer iddiası taşımıyor; müşterinin kendi çekimi
 *     geldiğinde media.ts'teki tek satır değişecek, burası değişmeyecek.
 *   · unoptimized: next.config.ts'te images.remotePatterns tanımlı değil.
 *     Depodaki diğer uzak görseller de (blog, hakkimizda, sektör) aynı
 *     şekilde basılıyor.
 *
 * HAREKET
 * Bölümde süregiden animasyon yok; açılış hareketi FadeUp/SplitWords ile,
 * yani sitenin geri kalanıyla aynı. useReducedMotion KULLANILMIYOR — bu depoda
 * dört ayrı kalıpta hidrasyon hatası çıkardı. Bileşen bu sayede sunucu
 * bileşeni olarak kalıyor.
 */

/* fitTable'ın "evet" satırları: profil etiketleri, sırasıyla. Sayfanın
   aşağısındaki fit bölümü aynı diziyi gerekçeleriyle açıyor; burada yalnızca
   ilk dördü geçiyor ki giriş bir listeye dönüşmesin. Üç ülkede de en az dört
   ok:true satır var, yani dilim hiçbir ülkede boş kalmıyor. */
const WHO_MAX = 4;

export default function CountryIntro({ country, name }: { country: Country; name: string }) {
  const facts = FACTS[country];
  const who = COUNTRY_CONTENT[country].fitTable
    .filter((row) => row.ok)
    .slice(0, WHO_MAX)
    .map((row) => row.profile);

  return (
    <section className="cin sec-pad">
      <div className="container-o">
        <div className="cin-grid">
          {/* Metin DOM'da önce: fotoğraf dekor olduğu için okuma sırası
              başlıkla başlamalı. Masaüstünde de solda kalıyor, yani görsel
              sıra ile DOM sırası ayrışmıyor. */}
          <div className="cin-text">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={`${name}, kısaca.`}
                accent="kısaca."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>

            <FadeUp delay={0.18}>
              <dl className="cin-keys">
                <div className="cin-key">
                  <dt className="cin-k">Kurulan yapı</dt>
                  <dd className="cin-v">{facts.structure}</dd>
                </div>

                <div className="cin-key">
                  <dt className="cin-k">Kimin için</dt>
                  <dd className="cin-v">
                    <ul className="cin-who">
                      {who.map((profile) => (
                        <li key={profile} className="cin-who-i">
                          {profile}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </FadeUp>
          </div>

          <FadeUp delay={0.26} className="cin-figw">
            <figure className="cin-fig">
              <span className="cin-ph" aria-hidden="true">
                <Image
                  src={COUNTRY_PHOTO[country]}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 46vw, 100vw"
                  className="cin-img"
                  unoptimized
                />
              </span>
              <figcaption className="cin-note">
                Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil.
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
