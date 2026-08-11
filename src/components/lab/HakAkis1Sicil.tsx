import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountUp from "@/app/hakkimizda/CountUp";
import { CHAIN } from "@/lib/brand";
import { TEAM_PHOTO } from "@/lib/media";
import { BASIS, FOR_WHOM, OPENING, SUMMARY, WHERE, type SummaryKey } from "@/lib/about";

/* ============================================================================
   ADAY 1 · SİCİL — "ayırmaya gerek yok" · TEK bölüm · ad alanı .hk1-

   -------------------------------------------------------------- CEVABI NE
   Müşterinin sorusu "bentoyu ayrı bir section yapalım mı". Bu aday HAYIR
   diyor ve gerekçesi teşhisin kendisinden çıkıyor: bugünkü bento sayfanın
   2, 4, 5 ve 6. bölümlerinin bir DİZİNİ ve o dizinin bağlantıları bir tur
   önce müşterinin isteğiyle kaldırıldı ("bir yere yönlendiren bir tarzı fln
   olmasın... sadece sayı verelim"). Yani ekranda tıklanamayan bir içindekiler
   tablosu duruyor. Böyle bir bloğa KENDİ BAŞLIĞINI vermek onu terfi ettirmek
   olur: sayfada iki kez okunan on sekiz ad, ikinci okunuşunda bir bölüm
   rütbesi kazanır.

   Bu depoda aynı karar bir kez daha verildi ve tuttu: bir slot için altı tip
   denendi, kazanan "bölüm hiç olmasın" oldu. Sıfır seçeneği meşru.

   ---------------------------------------------------------- NE YAPILDI
   Bölüm TEK kalıyor, ama içindeki dört ayrı okuma modu üçe iniyor:

     1  kim olduğumuz   fotoğraf + iki paragraf          (bugünkü hâli)
     2  beyan           vizyon + misyon, KART DEĞİL kayıt satırı
     3  sicil rayı      dört rakam tek satırda, künye ölçeğinde

   BENTO ÖLÜYOR, RAKAMLAR YAŞIYOR. Karolardaki ON SEKİZ AD siliniyor (üç ülke
   adı, beş halka adı, altı sektör adı, dört dayanak başlığı); dördü de
   sayfanın devamında kendi bölümünde açıklamasıyla duruyor. Geriye yalnızca
   DÖRT RAKAM ve saydıkları şeyin adı kalıyor. Rakam bir dizin değil bir
   ölçü: "bu sayfada üç ülke, dört dayanak, beş halka ve altı sektör var."

   ANA SAYFA KALIBI KULLANILMADI ve bu adayın asıl tezi bu. Müşterinin
   "ana sayfadaki gibi bir şeylerle mi yapsak" sorusuna verdiği cevap şu:
   ana sayfanın kalıpları (ThreeCountries, HomeServices, Chain, TrustLayer,
   Profiles) KENDİ İÇERİĞİNİ taşıyan bölümler için tasarlandı. Bir dizine
   o kalıplardan birini giydirmek dizini içerik yapmaz, yalnızca uzatır.

   ------------------------------------------------------------ SIRA NEDEN BU
   Ray soldan sağa 3 · 4 · 5 · 6 okunuyor ve bu bir tasarım tercihi DEĞİL,
   sayfanın kendi bölüm sırası: ülkeler (2. bölüm), dayanaklar (4), zincir (5),
   sektörler (6). Rakamların artan sırada çıkması tesadüf ve kimse ona
   bakmıyor; sıra bozulursa ray sayfayı takip etmeyi bırakır.

   Rakamlar ELLE YAZILMIYOR, dizi uzunluğundan geliyor. Bir ülke ya da sektör
   eklendiğinde ray kendiliğinden düzeliyor.

   ------------------------------------------------------------------ HAREKET
   TEK mekanik, tek periyot: 14,09 s. Ray boyunca soldan sağa bir ışık
   geçiyor, dört işaret sırayla o ışığın altında bir tık parlıyor. Yüzde
   birliği (1409) asal ve listedeki hiçbir periyodun katı ya da böleni değil (liste seçim anında 86, tur sonunda 101).
   Tanımların tamamı prefers-reduced-motion: no-preference içinde.

   İmleç raya gelince ışık duruyor ve dört işaret birden yanıyor.
   ========================================================================= */

const AD = Object.fromEntries(SUMMARY.map((s) => [s.k, s.label])) as Record<
  SummaryKey,
  string
>;

/* Dört ölçü. Sıra = sayfanın bölüm sırası (2 · 4 · 5 · 6), rakam = dizi
   uzunluğu. "dayanak" tek elle yazılan kelime ve bir iddia değil,
   BASIS.heading'in ("Neye dayanarak çalışıyoruz") künye satırına sığan
   karşılığı; canlı bento da bir turdur aynı kelimeyi kullanıyor. */
const OLCU: { k: string; n: number; ad: string }[] = [
  { k: "ulke", n: WHERE.countries.length, ad: AD.where },
  { k: "dayanak", n: BASIS.cards.length, ad: "dayanak" },
  { k: "zincir", n: CHAIN.length, ad: AD.chain },
  { k: "sektor", n: FOR_WHOM.sectors.length, ad: AD.sectors },
];

export default function HakAkis1Sicil() {
  return (
    <div className="hk1 sec-pad">
      <div className="container-o">
        {/* ---- 1 · fotoğraf + iki paragraf ----
            Bugünkü düzenin aynısı ve bilerek: müşterinin bu parçaya bir
            itirazı yok, itiraz bentoya. Değiştirilmeyen şeyi değiştirmek
            kıyası bulandırırdı. */}
        <div className="hk1-ust">
          <FadeUp className="hk1-figw" y={20}>
            <figure className="hk1-fig">
              {/* alt="" ve dekoratif: kare bir Unsplash yer tutucusu
                  (media.ts · SWAP:TEAM_PHOTO), "işte ekibimiz" demiyor.
                  Altındaki künye satırı bunu yazıyla da söylüyor. */}
              <span className="hk1-ph">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 980px) 46vw, 100vw"
                  className="hk1-img"
                  unoptimized
                />
              </span>
              <figcaption className="hk1-note">{OPENING.photoNote}</figcaption>
            </figure>
          </FadeUp>

          <div className="hk1-body">
            <SplitWords
              as="h2"
              text={OPENING.heading}
              accent={OPENING.accent}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.18}>
              <p className="hk1-lead">{OPENING.lead}</p>
            </FadeUp>
            {OPENING.body.map((p, i) => (
              <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                <p className="hk1-p">{p}</p>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ---- 2 · beyan ----
            KART DEĞİL, KAYIT SATIRI. Bugün vizyon ve misyon iki beyaz kart
            ve o kartlar ekranda bentonun karolarıyla aynı rütbede duruyor;
            oysa biri firmanın resmî beyanı, diğeri bir sayaç. Burada ikisi
            tek bir kaydın iki satırı: solda etiket, sağda cümle, aralarında
            tek bir çizgi. Kutu kalkınca bölüm bir sütun gibi okunuyor.

            <dl> kullanıldı çünkü yapı gerçekten bu: iki terim, iki tanım.
            Sarmalayıcı <div> HTML5'te geçerli ve ızgara satırını taşıyor. */}
        <FadeUp delay={0.1}>
          <dl className="hk1-beyan">
            {[OPENING.vision, OPENING.mission].map((s) => (
              <div className="hk1-beyan-r" key={s.t}>
                <dt>{s.t}</dt>
                <dd>{s.s}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="hk1-beyan-not">{OPENING.statementNote}</p>
        </FadeUp>

        {/* ---- 3 · sicil rayı ----
            Bentonun yerine geçen tek satır. Dört işaret bir çizginin üstünde
            ve her işaretin altında rakam ile adı duruyor.

            SAYAÇ MARKUP'TA SON RAKAMI TAŞIYOR (CountUp): JS kapalıyken de
            doğru sayı görünüyor, sıfırlama yalnızca öge henüz saydamken
            yapılıyor. FadeUp'ın opacity 0 başlangıcı bunun için şart.

            <ul> yeterli: dört ölçü arasında bir sıra ilişkisi YOK, sıralı
            liste anlamı yanlış olurdu. Ekrandaki sıra sayfanın bölüm
            sırası ama bu bir numaralandırma değil. */}
        <FadeUp className="hk1-rayw" delay={0.22} y={16}>
          <div className="hk1-ray">
            <span className="hk1-hat" aria-hidden="true">
              <span className="hk1-isik" />
            </span>
            <ul className="hk1-l">
              {OLCU.map((o, i) => (
                <li className="hk1-i" key={o.k} style={{ "--i": i } as React.CSSProperties}>
                  <span className="hk1-nokta" aria-hidden="true" />
                  <CountUp className="hk1-n" to={o.n} />
                  <span className="hk1-ad">{o.ad}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
