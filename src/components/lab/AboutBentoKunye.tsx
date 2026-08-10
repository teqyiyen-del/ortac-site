import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { BASIS, FOR_WHOM, SUMMARY, WHERE } from "@/lib/about";
import { ABOUT_ICON, SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 7 · "KÜNYE"
   Biçim: src/app/css/lab-hb7.css (ad alanı .hb7-)

   ------------------------------------------------------------------- FİKİR
   Bento bir künye levhası dizisi. Her karo YALNIZCA NE OLDUĞUNU söylüyor:
   bir sayı, bir isim ve o ismin saydığı şeylerin kendi adları. Cümle yok,
   açıklama yok, dipnot yok; sayfanın hiçbir paragrafı burada bir kez daha
   okunmuyor.

   ------------------------------------------------------- NEDEN BU TUR VAR
   Bir önceki tur bentoyu 0 ile 4 karaktere indirdi ve müşteri onu reddetti:
   "hakkımızda bentosu içinde yazıyı azalt görsel takıl dedimde bokunu
   çıkartıp bomboş bişi yapmışsın." Aynı müşteri bir tur önce de 1.187 ile
   1.625 karakterlik adayları "fazla bilgi" diye işaretlemişti. İki cümle
   birlikte okununca hedef net: bento ANLATMAYACAK ama BOŞ da olmayacak.

   Bu adayın cevabı en dolaysız olanı: ETİKET GERİ GELİYOR, PARAGRAF GELMİYOR.
   Aday 4 "Akış" ile aynı iskelet, aynı geometri, aynı iki katmanlı hareket;
   tek fark nesnelerin artık adı var. Kıyas böylece tek değişkene iniyor:
   etiketin kendisi. Aday 4 sayfada "ex" olarak durduğu için ikisi yan yana
   okunabiliyor.

   ------------------------------------------- ANA SAYFA BENTOSUNDAN NE ALDI
   Geometri ve ton: altı sütun, eşit olmayan hücreler (2 · 4 / 4 · 2), iki koyu
   iki açık, koyular köşegende. Almadığı şey yine ANATOMİ: oradaki karo
   "işaret → başlık → satır → pano → dipnot" diye kurulu; burada başlık bir
   künye satırına indi (sayı + isim) ve açıklama satırı hiç yok.

   ------------------------------------------------------------------ HAREKET
   Aday 4'ün iki katmanı bilerek aynen korundu (gerekçe yukarıda: değişken tek
   olsun). Yalnızca periyotlar değişti, çünkü ikisi aynı sayfada aynı anda
   dönüyor: parıltı 13,1 s, aktarım dalgası 10,9 s.

   -------------------------------------------------------------- İÇERİK SINIRI
   Ekrandaki her kelime veriden geliyor: ülke adları COUNTRY_NAME, halka adları
   brand.ts · CHAIN, sektör adları about.ts · FOR_WHOM, künye isimleri
   about.ts · SUMMARY. Sayılar dizi uzunluğu. Elle yazılan TEK kelime
   "dayanak" ve o da bir iddia değil, BASIS.heading'in ("Neye dayanarak
   çalışıyoruz") tek kelimelik karşılığı; dört dayanağın kendi başlıkları
   buraya KOPYALANMADI çünkü sayfanın 4. bölümü onları zaten açıklamasıyla
   basıyor.
   ========================================================================= */

/* Künye isimleri about.ts'ten. Ekranda görünüyorlar, o yüzden burada
   yazılmıyorlar: bir gün "sektör" başka bir kelimeye dönerse iki yerde
   değişmesi gerekmesin. */
const AD = Object.fromEntries(SUMMARY.map((s) => [s.k, s.label]));

/* BASIS'in tek kelimelik karşılığı. SUMMARY'de dayanaklar için bir satır yok
   (o dizi bentonun üç sayısını taşıyor) ve BASIS.heading bir künye satırına
   sığmayacak kadar uzun. */
const AD_DAYANAK = "dayanak";

export default function AboutBentoKunye() {
  const nUlke = WHERE.countries.length;
  const nHalka = CHAIN.length;
  const nSektor = FOR_WHOM.sectors.length;
  const nDayanak = BASIS.cards.length;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* `akt` KABIN üstünde: aktarım kalıbı turu kabın hover'ında
            duraklatıyor, tek tek durakların değil. Değişkenler de burada;
            duraklar onları miras alıyor (bkz. lab-hb7.css · HAREKET). */}
        <div className="hb7 akt">
          {/* ===================================== 1 · ÜLKE (koyu, dar) */}
          <FadeUp className="hb7-w hb7-w-dar" y={18} delay={0.06}>
            <article className="hb7-t hb7-t-dark">
              <span className="hb7-k">
                <b className="hb7-no">{nUlke}</b>
                <span>{AD.where}</span>
              </span>
              <ul className="hb7-ulke">
                {WHERE.countries.map((c) => (
                  <li key={c.slug}>
                    {/* BAYRAK TUZAĞI: `Flag` width/height taşımayan çıplak bir
                        <svg viewBox="0 0 60 40"> döndürüyor; kabı ölçülmezse
                        300 × 150'ye açılıyor ve hakkımızda sayfası bir kez tam
                        bu yüzden çöktü. .hb7-disk'in ölçü satırları şart. */}
                    <span className="hb7-disk akt-durak" aria-hidden="true">
                      <Flag country={c.slug} />
                    </span>
                    <b>{COUNTRY_NAME[c.slug]}</b>
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>

          {/* ==================================== 2 · ZİNCİR (açık, geniş)
              Rayın geniş karoda olmasının sebebi hem hareket hem AD: dalga en
              uzun yolu burada alıyor ve beş halkanın adı ancak bu genişlikte
              yan yana okunuyor. */}
          <FadeUp className="hb7-w hb7-w-genis" y={18} delay={0.12}>
            <article className="hb7-t">
              <span className="hb7-k">
                <b className="hb7-no">{nHalka}</b>
                <span>{AD.chain}</span>
              </span>
              <div className="hb7-zincir">
                <span className="hb7-iz" aria-hidden="true">
                  <span className="hb7-hat akt-durak" />
                  {/* Sürekli katman. Aktarım dalgasından bağımsız ve ondan ayrı
                      bir periyotta: ikisi senkron olsaydı tek bir nabız gibi
                      okunurdu. */}
                  <span className="hb7-glint" />
                </span>
                {CHAIN.map((s) => (
                  <span key={s.key} className="hb7-halka">
                    <span className="hb7-dugum akt-durak" aria-hidden="true" />
                    <b>{s.label}</b>
                  </span>
                ))}
              </div>
            </article>
          </FadeUp>

          {/* =================================== 3 · SEKTÖR (açık, geniş)
              İkonlar sayfanın sektör bölümündekilerle AYNI glif. Aynı sektörün
              iki blokta iki farklı işaretle çıkması, ziyaretçinin kurduğu
              görsel eşlemeyi bozar. */}
          <FadeUp className="hb7-w hb7-w-genis" y={18} delay={0.18}>
            <article className="hb7-t">
              <span className="hb7-k">
                <b className="hb7-no">{nSektor}</b>
                <span>{AD.sectors}</span>
              </span>
              <div className="hb7-sekt">
                {FOR_WHOM.sectors.map((s) => {
                  const Icon = SECTOR_ICON[s.slug];
                  return (
                    <span key={s.slug} className="hb7-cip akt-durak">
                      <span aria-hidden="true">
                        {Icon ? <Icon size={16} strokeWidth={1.8} /> : null}
                      </span>
                      <b>{s.label}</b>
                    </span>
                  );
                })}
              </div>
            </article>
          </FadeUp>

          {/* ==================================== 4 · DAYANAK (koyu, dar)
              Tek karo ki nesnelerinin adı YOK. Dört dayanağın başlığı sayfanın
              4. bölümünde açıklamasıyla duruyor; buraya kopyalanması tam olarak
              müşterinin kaldırttığı tekrar olurdu. Künye satırı karonun ne
              olduğunu zaten söylüyor. */}
          <FadeUp className="hb7-w hb7-w-dar" y={18} delay={0.24}>
            <article className="hb7-t hb7-t-dark">
              <span className="hb7-k">
                <b className="hb7-no">{nDayanak}</b>
                <span>{AD_DAYANAK}</span>
              </span>
              <div className="hb7-muhur" aria-hidden="true">
                {BASIS.cards.map((c) => {
                  const Icon = ABOUT_ICON[c.icon];
                  return (
                    <span key={c.t} className="hb7-mim akt-durak">
                      {Icon ? <Icon size={17} strokeWidth={1.7} /> : null}
                    </span>
                  );
                })}
              </div>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
