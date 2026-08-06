import { Boxes, Globe2, Link2, Stamp, type LucideIcon } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { BASIS, FOR_WHOM, HOW, OPENING, WHERE, structureOf } from "@/lib/about";
import { ABOUT_ICON, SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 1 · "KARO"
   Biçim: src/app/css/lab-hb1.css (ad alanı .hb1-)

   ------------------------------------------------------------------- FİKİR
   Ana sayfa bentosunun IZGARASINI olduğu gibi alıyor: altı sütun, bir geniş
   (4), bir uzun (2×2), iki normal (2); ikisi koyu, ikisi açık. Karoların içi
   değişiyor, geometri değişmiyor.

   ------------------------------------------- ANA SAYFA BENTOSUNDAN NE ALDI
   Dört şeyi birden, ve bu adayın tamamı zaten bu dört şey:

     1) EŞİT OLMAYAN HÜCRE. Bugünkü hakkımızda bentosu iki artı bir hücre ve
        üçü de aynı ağırlıkta; ızgarada hangisinin önce okunacağını söyleyen
        hiçbir şey yok. Burada geniş karo baştan lider, uzun karo dikey çapa,
        iki normal karo destek.
     2) TON. İki karo siyah. Beyaz bir bölümün üstünde dört beyaz hücre tek
        bir levha gibi okunuyor; ana sayfanın kendi CSS'inde de bu not düşülü.
     3) HER KARONUN KENDİ MEKANİĞİ. Ana sayfada bir sohbet, bir durum çubuğu,
        bir tik listesi ve bir onarım oku var. Burada bir ray, bir ülke
        panosu, bir sektör ızgarası ve bir dayanak listesi.
     4) KARO BİR ŞEY SAYMIYOR, BİR ŞEY GÖSTERİYOR. Bugünkü bentonun üç manşeti
        üç rakam (3 · 5 · 6) ve rakam bir iddia değil: "3 ülke" firma hakkında
        hiçbir şey söylemiyor. Burada manşet bir cümle, rakam dipnotta.

   -------------------------------------- ANA SAYFANIN BENTO KARTINI KULLANAN
   Uzun karo (ÜLKE) doğrudan TrustLayer'daki "Tek muhatap" karosunun
   iskeletidir: işaret → başlık → tek satır → CANLI PANO → dipnot. Oradaki
   pano bir sohbet, buradaki üç ülke. Canlı bileşen import EDİLMİYOR; ad alanı
   ayrı bir lab kopyası kuruldu, yoksa labdaki bir deneme ana sayfayı
   değiştirebilirdi.

   ---------------------------------------------------------- NEYİ FEDA EDİYOR
   Yenilik. Ana sayfada olan ızgara ikinci kez, bir sayfa aşağıda görünüyor:
   iki bölümü arka arkaya okuyan ziyaretçi "aynı şeyi ikinci kez gördüm"
   diyebilir. İkinci bedel manşet rakamları: sayaç bu adayda yok, üç sayı
   dipnota indi.

   ------------------------------------------------------------------ İÇERİK
   Tek bir iddia bu dosyada yazılmadı. Başlıklar, satırlar ve nesnelerin
   tamamı lib/about.ts ile lib/brand.ts'ten okunuyor; sayılar da dizilerin
   uzunluğu. Yeni rakam, yıl, kişi ya da müşteri sayısı yok.

   Kaynak metinlerin bir kısmında uzun tire geçiyor (OPENING.body[0],
   FOR_WHOM.lead). Bunlar firmanın onaylanmış metni ve OLDUĞU GİBİ basılıyor:
   labda yeniden yazmak, canlı sayfayla ayrışan ikinci bir kopya üretirdi.

   ------------------------------------------------------------------ HAREKET
   Üç mekanik, on sonsuz animasyon, hepsi saf CSS. Bileşen SUNUCU bileşeni ve
   öyle kalmalı: bu depoda useReducedMotion ile render edilen ağacı değiştirme
   hatası beş ayrı kalıpta hidrasyon uyarısı çıkardı. Bir CSS medya sorgusu
   sunucu ile istemci arasında ayrım yaratmıyor. Bütçe ve gerekçe CSS'te.
   ========================================================================= */

/* BU DOSYADA YAZILAN TEK METİN, ve bir olgu iddiası taşımıyor: bölümün
   sorduğu soru. Müşterinin cümlesi bire bir buydu — "ne bizim olayımız diye
   girişip anlatırız". Cevap zaten aşağıda, firmanın kendi paragrafında. */
const ASK = "Ne bizim olayımız?";
const ASK_ACCENT = "olayımız?";

/* Dipnottaki rakamın neyi saydığı. Rakamın KENDİSİ burada yok — o diziden
   geliyor, elle yazılmıyor. */
const UNITS = { where: "ülke", chain: "halka", sectors: "sektör", basis: "dayanak" };

export default function AboutBentoKaro() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={ASK}
            accent={ASK_ACCENT}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          {/* Bölümün girişi firmanın kendi cümlesi. Canlıya alınırsa bu
              paragraf "Kim olduğumuz" bölümünden BURAYA TAŞINIR, kopyalanmaz:
              aynı paragrafın iki bölümde birden durması, müşterinin bugünkü
              bento için söylediği "öylesine yapılmış" hissinin kaynağıdır. */}
          <FadeUp delay={0.2}>
            <p className="sec-lead">{OPENING.body[0]}</p>
          </FadeUp>
        </div>

        <div className="hb1">
          {/* ==================================== GENİŞ KARO · ZİNCİR (açık) */}
          <FadeUp delay={0.1} y={18} className="hb1-tile hb1-tile-wide">
            <Head Icon={Link2} title={HOW.heading} line={HOW.lead} />

            {/* Beş halka bir ray üzerinde. Geniş karonun geniş olma sebebi bu
                liste: beş ad ancak yan yana okunduğunda bir SIRA gibi
                görünüyor, alt alta dizildiğinde bir menü gibi. */}
            <div className="hb1-rail">
              <ol className="hb1-links">
                {CHAIN.map((s, i) => (
                  <li key={s.key} className="hb1-link">
                    <span className="hb1-node" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b>{s.label}</b>
                    <span>{s.line}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Foot Icon={Link2} n={CHAIN.length} unit={UNITS.chain} />
          </FadeUp>

          {/* ============================== UZUN KARO · ÜLKE (koyu, 2 satır)
              ANA SAYFANIN BENTO KARTI. TrustLayer'daki "Tek muhatap" karosuyla
              aynı iskelet: işaret, başlık, tek satır, canlı pano, dipnot. */}
          <FadeUp delay={0.18} y={18} className="hb1-tile hb1-tile-tall hb1-tile-dark">
            <Head Icon={Globe2} title={WHERE.heading} line={WHERE.lead} />

            <ul className="hb1-board">
              {WHERE.countries.map((c) => (
                <li key={c.slug} className="hb1-row">
                  {/* Bayrağın kabı SABİT PİKSEL. `Flag` width/height taşımayan
                      çıplak bir <svg> döndürüyor; kap ölçülmezse 300 × 150'ye
                      açılıyor ve hakkımızda sayfası bir kez tam bu yüzden
                      çöktü. Kural CSS'te (.hb1-flag) ve dört satırı da şart. */}
                  <span className="hb1-flag" aria-hidden="true">
                    <Flag country={c.slug} />
                  </span>
                  <span className="hb1-rowtext">
                    <b>{COUNTRY_NAME[c.slug]}</b>
                    {/* Yapı künyesi brand.ts · FACTS'ten okunuyor; about.ts'e
                        kopyalanmadı ki iki yerde iki farklı yapı yazma
                        ihtimali hiç doğmasın. */}
                    <span>{structureOf(c.slug)}</span>
                    {/* Ülkenin kendi cümlesi. Panoyu dolduran şey bu: ad ile
                        yapı künyesi tek başına üç kısa satır bırakıyor ve uzun
                        karo yarım kalmış görünüyordu. */}
                    <i>{c.line}</i>
                  </span>
                </li>
              ))}
            </ul>

            <Foot Icon={Globe2} n={WHERE.countries.length} unit={UNITS.where} />
          </FadeUp>

          {/* ================================== NORMAL KARO · SEKTÖR (koyu) */}
          <FadeUp delay={0.26} y={18} className="hb1-tile hb1-tile-dark">
            <Head Icon={Boxes} title={FOR_WHOM.heading} line={FOR_WHOM.lead} />

            {/* Altı ikon sayfanın sektör bölümündekilerle AYNI. Aynı sektörün
                iki blokta iki farklı glifle çıkması, ziyaretçinin kurduğu
                görsel eşlemeyi bozuyor. Etiket de yazıyor: altı soyut ikon tek
                başına "hangi sektörler" sorusunu cevaplamıyor. */}
            <ul className="hb1-secs">
              {FOR_WHOM.sectors.map((s) => {
                const Icon = SECTOR_ICON[s.slug];
                return (
                  <li key={s.slug} className="hb1-sec">
                    <span className="hb1-secic" aria-hidden="true">
                      {Icon ? <Icon size={15} strokeWidth={1.9} /> : null}
                    </span>
                    <b>{s.label}</b>
                  </li>
                );
              })}
            </ul>

            <Foot Icon={Boxes} n={FOR_WHOM.sectors.length} unit={UNITS.sectors} />
          </FadeUp>

          {/* ================================= NORMAL KARO · DAYANAK (açık)
              IZGARANIN DİNLENME NOKTASI. Bu karoda ambiyans hareketi yok ve bu
              bilinçli: dört mekanik aynı anda kıpırdarsa hiçbiri okunmuyor.
              İmleç gelince o da canlanıyor. */}
          <FadeUp delay={0.34} y={18} className="hb1-tile">
            <Head Icon={Stamp} title={BASIS.heading} line={BASIS.lead} />

            <ul className="hb1-basis">
              {BASIS.cards.map((c) => {
                const Icon = ABOUT_ICON[c.icon] ?? Stamp;
                return (
                  <li key={c.t} className="hb1-b">
                    <span className="hb1-bic" aria-hidden="true">
                      <Icon size={12} strokeWidth={2.2} />
                    </span>
                    {c.t}
                  </li>
                );
              })}
            </ul>

            <Foot Icon={Stamp} n={BASIS.cards.length} unit={UNITS.basis} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- parçalar */

/* Karonun üst üçlüsü. Dördünde de aynı sırada: işaret, başlık, tek satır.
   Ana sayfadan alınan asıl şey bu iskelet — dört ayrı iddia tek bir dille
   konuşuyor. Koyu / açık ayrımı BURADA DEĞİL, CSS'te (.hb1-tile-dark
   torunlarını boyuyor): koşullu sınıf yazmak sunucu ile istemci arasında
   ayrım riski demek ve bu depoda o riskin bedeli ödendi. */
function Head({ Icon, title, line }: { Icon: LucideIcon; title: string; line: string }) {
  return (
    <>
      <span className="hb1-ic" aria-hidden="true">
        <Icon size={18} strokeWidth={1.9} />
      </span>
      <h3 className="hb1-title">{title}</h3>
      <p className="hb1-line">{line}</p>
    </>
  );
}

/* Dipnot. BUGÜNKÜ BENTONUN MANŞETİ BURAYA İNDİ: rakam silinmedi, rütbesi
   düştü. Sayı elle yazılmıyor, dizinin uzunluğu. */
function Foot({ Icon, n, unit }: { Icon: LucideIcon; n: number; unit: string }) {
  return (
    <span className="hb1-foot">
      <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
      <b>{n}</b> {unit}
    </span>
  );
}
