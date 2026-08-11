import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { TEAM_PHOTO } from "@/lib/media";
import { OPENING, WHERE } from "@/lib/about";

/* ============================================================================
   ADAY 3 · SAHNE — ÜÇ bölüm · ad alanı .hk3-

   -------------------------------------------------------------- CEVABI NE
   Müşterinin sorusunun içinde cevaplanmamış bir soru daha var: "vizyon misyon
   gerçekten ayrı bir blok mu hak ediyor". Bu aday ona EVET diyor ve bölünmeyi
   sonuna kadar götürüyor:

     A  Kim olduğumuz      fotoğraf + iki paragraf
     B  Vizyon ve misyon   firmanın resmî beyanı, kutusuz, beyan ölçeğinde
     C  Üç ülke, tek zincir  bento DEĞİL, bir SAHNE

   ------------------------------------------------- BENTO NEDEN SAHNEYE DÖNDÜ
   Teşhis şunu söylüyor: bugünkü bento sayfanın alt bölümlerinin dizini ve o
   dizinin bağlantıları müşterinin isteğiyle kaldırıldı. Aday 2 dizini kabul
   edip ona bir başlık veriyor. Bu aday dizini BIRAKIYOR: bir bölüm başlığı
   ancak kendi işini yapan bir içeriğe verilir.

   Yerine gelen şey açılışın kendi cümlesinin resmi. OPENING.lead'in ilk
   cümlesi "Üç ülkede çalışan tek bir ekip" ve WHERE.lead "zincir de aynı"
   diyor; sayfada bu iki cümlenin GÖRSEL karşılığı hiç yok. Sahne tam olarak
   onu çiziyor: tek bir yay (zincirin beş halkası üstünde), altında üç ülke
   diski ve her diski yaya bağlayan birer ince askı.

   SAYAÇ YOK. Üç aday içinde rakam basmayan tek aday bu ve bilerek: sahnede
   üç disk ve beş halka zaten sayılabiliyor. Sektörler (6) ve dayanaklar (4)
   bu bölüme hiç girmiyor; ikisi de sayfanın 4 ve 6. bölümlerinde
   açıklamalarıyla duruyor ve buraya bir rakam olarak taşınmaları tam olarak
   dizin davranışı olurdu.

   ------------------------------------------- HANGİ ANA SAYFA KALIBI VE NEDEN
   Seçilen kalıp: ThreeCountries (ana sayfa · §3 · .uk3- ad alanı). Beş kalıp
   arasından bu seçildi çünkü tek yaptığı iş bu: BİRDEN ÇOK ŞEYİ TEK BİR
   EKSENE oturtup "bunlar farklı yerlerdeki aynı şey" demek. TrustLayer dört
   ayrı iddiayı yan yana koyuyor (bu bölümün tek iddiası var), HomeServices
   bir hizmet menüsü, Chain bir zaman ekseni, Profiles altı sektör kartı.

   Kalıptan alınanlar geometrinin kendisi: karesel Bézier kubbe (M0 → Q orta →
   1000), altında iki sönük kopya (biraz aşağıda ve biraz daha düz, yoksa iç
   içe kemer okunuyor), sütun merkezleri 1/6 · 1/2 · 5/6 ve daireye kırpılmış
   bayrak diski. Kalıptan ALINMAYAN: yerinde açılan kıyas paneli. Sahne bir
   menü değil, bir cümle; tıklanacak bir şey taşımıyor.

   SIRA ANA SAYFAYLA AYNI DEĞİL. Ana sayfada sıra editoryal (İngiltere ·
   Dubai · KKTC — ortadaki en çok anlatılan ülke). Burada about.ts'in kendi
   sırası korundu (WHERE.countries) çünkü sayfanın 2. bölümü de o sırayı
   basıyor; aynı sayfada iki ülke dizisinin iki farklı sırada çıkması,
   ziyaretçinin kurduğu eşlemeyi bozardı.

   ------------------------------------------------- YENİ YAZILAN TEK METİN
   C bölümünün başlığı ("Üç ülke, tek zincir") ve altındaki tek satırlık
   çizim künyesi. Başlık yeni bir olgu getirmiyor: WHERE.lead'in ("Üçünde de
   kendi ofisimiz var... zincir de aynı") ve OPENING.body[0]'ın ("bu sıranın
   tamamını üstleniyor: KKTC, İngiltere ve Dubai'de, aynı ekiple") zaten
   yazdığı şeyin başlık boyu karşılığı. Künye satırı ise firma hakkında değil,
   ÇİZİM hakkında konuşuyor. B bölümünün başlığı bir etiket, giriş cümlesi
   ise about.ts'te zaten duran OPENING.statementNote.

   ------------------------------------------------------------------ HAREKET
   Sayfada tek sahne olduğu için hareket zengin olabiliyor (kural: çok karolu
   düzende minimal, tek sahnede zengin). Dört mekanik, dört periyot:

     9,11 s   yay boyunca giden ışık (stroke-dashoffset, pathLength=1000)
     19,13 s  üç disk sırayla, halkası bir tık parlıyor
     23,30 s  beş halka düğümü sırayla
     26,30 s  beyan bloğundaki saç teli boyunca geçen ışık

   Yüzde birlikleri (911 · 1913 · 2330 · 2630) birbirinin ve listedeki hiçbir
   periyodun katı ya da böleni değil (liste seçim anında 86, tur sonunda 101). Hepsi saf CSS ve yalnızca transform,
   opacity, stroke-dashoffset ile box-shadow üzerinde; okunan hiçbir metnin
   rengine yazılmıyor. Tanımların tamamı no-preference kapısının içinde.

   İmleç sahneye gelince ışık duruyor, sekiz nesne birden yanıyor.

   ------------------------------------------------------------- DAR EKRAN
   680 pikselin altında yay GİZLENİYOR ve iki liste normal akışa dönüyor:
   halkalar dikey bir raya, ülkeler üç sütuna. DOM DEĞİŞMİYOR, yalnızca
   yerleşim. İki ayrı işaretleme yazıp birini gizlemek aynı metni iki kez
   basardı; bu depoda ekran okuyucu ile ekranın ayrışması tekrar eden bir
   hataydı.
   ========================================================================= */

/* ---------------------------------------------------------------- geometri
   Yayın yüksekliği viewBox'ın yüksekliğiyle AYNI birimde: preserveAspectRatio
   "none" yalnızca yatayda geriyor, yani viewBox'taki y birimi ile kabın
   yüzdesi birebir eşleşiyor. Konumlar bu yüzden yüzde olarak veriliyor;
   kabın boyu değişince (dar ekranda) her şey birlikte ölçekleniyor.

   Sabitler ana sayfanın yayından türetildi (BAND 112 · BASE_Y 82 · RISE 43),
   yalnızca sahne daha uzun olduğu için ölçek büyütüldü. */
const VB_W = 1000;
const VB_H = 260;
const BASE = 100;
const RISE = 44;
/** yayın p noktasındaki yüksekliği — karesel Bézier, x'te doğrusal */
const arcY = (p: number) => BASE - 4 * RISE * p * (1 - p);
/** viewBox birimini kabın yüzdesine çevirir */
const pct = (v: number) => `${((v / VB_H) * 100).toFixed(3)}%`;

/* Yay ve altındaki iki sönük sıra. Her sıra biraz aşağıda (dy) ve biraz daha
   düz (k): yalnızca kaydırılmış kopyalar olsalardı iç içe kemerler okunurdu.
   Ana sayfadaki ARC_ROWS ile aynı mantık, aynı oranlar. */
const ARC_ROWS = [
  { dy: 0, k: 1, o: 1 },
  { dy: 13, k: 0.84, o: 0.34 },
  { dy: 28, k: 0.68, o: 0.17 },
].map((r) => {
  const y0 = BASE + r.dy;
  return { ...r, d: `M0 ${y0}Q${VB_W / 2} ${y0 - 2 * RISE * r.k} ${VB_W} ${y0}` };
});

const ARC_MAIN = ARC_ROWS[0].d;

/* Beş halkanın yay üstündeki yeri. Uçlardan 8 birim içeride başlıyor ki ilk
   ve son düğüm kabın kenarına yapışmasın; aradaki dört adım eşit. */
const HALKA_P = [0.08, 0.29, 0.5, 0.71, 0.92];

/* Üç ülkenin sütun merkezleri — ana sayfanınkiyle aynı: 1/6, 1/2, 5/6. */
const ULKE_P = [1 / 6, 1 / 2, 5 / 6];

/** disklerin üst kenarı; askılar buraya kadar iniyor */
const DISK_TOP = 168;

export default function HakAkis3Sahne() {
  return (
    <>
      {/* ================= A · KİM OLDUĞUMUZ ================= */}
      <div className="hk3a sec-pad">
        <div className="container-o">
          <div className="hk3a-ust">
            <FadeUp className="hk3a-figw" y={20}>
              <figure className="hk3a-fig">
                <span className="hk3a-ph">
                  <Image
                    src={TEAM_PHOTO}
                    alt=""
                    fill
                    sizes="(min-width: 980px) 46vw, 100vw"
                    className="hk3a-img"
                    unoptimized
                  />
                </span>
                <figcaption className="hk3a-note">{OPENING.photoNote}</figcaption>
              </figure>
            </FadeUp>
            <div className="hk3a-body">
              <SplitWords
                as="h2"
                text={OPENING.heading}
                accent={OPENING.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.18}>
                <p className="hk3a-lead">{OPENING.lead}</p>
              </FadeUp>
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                  <p className="hk3a-p">{p}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= B · VİZYON VE MİSYON =================
          KUTU YOK. Bugün bu iki cümle iki beyaz kartın içinde ve kartlar
          bentonun karolarıyla aynı rütbede duruyor. Kendi bölümüne çıkınca
          kutuya da gerek kalmıyor: iki beyan, üstlerinde birer saç teli,
          punto bir kademe büyük. Bölüm başlığı bir etiket, giriş cümlesi
          about.ts'te zaten duran OPENING.statementNote.

          Zemin gri: A ve C beyaz, B gri. Sayfanın kendi zemin ritmi zaten
          böyle çalışıyor ve iki bölüm arka arkaya aynı zeminle gelmiyor. */}
      <div className="hk3b sec-pad">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="Vizyon ve misyon"
              accent="misyon"
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{OPENING.statementNote}</p>
            </FadeUp>
          </div>

          {/* <dl> gerçekten doğru yapı: iki terim, iki tanım. FadeUp'ın kendi
              <div>'i sarmalayıcı hücre oluyor (dl > div > dt + dd — HTML5'te
              geçerli); ayrıca bir kap eklenseydi (dl > div > div > dt) yapı
              geçersiz olurdu.

              SAÇ TELİ ::before ile basılıyor, ayrı bir <span> ile değil: aynı
              sebep. dt ve dd'nin yanına kardeş bir <span> koymak <dl> içinde
              geçersiz işaretleme olurdu. */}
          <dl className="hk3-beyan">
            {[OPENING.vision, OPENING.mission].map((s, i) => (
              <FadeUp className="hk3-beyan-r" key={s.t} delay={0.12 + i * 0.08}>
                <dt>{s.t}</dt>
                <dd>{s.s}</dd>
              </FadeUp>
            ))}
          </dl>
        </div>
      </div>

      {/* ================= C · ÜÇ ÜLKE, TEK ZİNCİR ================= */}
      <div className="hk3c sec-pad">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="Üç ülke, tek zincir"
              accent="tek zincir"
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Üstteki yay zincirin kendisi; altındaki üç disk aynı zincirin yürüdüğü
                ülkeler.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} y={16}>
            <div className="hk3-sahne">
              {/* Yay, askılar ve ışık. Çizimin tamamı dekoratif: taşıdığı
                  bilgi (beş halkanın adı, üç ülkenin adı) hemen üstündeki
                  iki listede yazıyla duruyor.

                  pathLength="1000" ışık için ŞART: gerçek yol uzunluğu
                  tarayıcıya göre birkaç birim oynuyor ve dasharray'i sabit
                  bir sayıyla yazmak ışığın boyunu tarayıcıya bırakırdı.

                  vector-effect="non-scaling-stroke": preserveAspectRatio
                  "none" yatayda geriyor, düzeltilmezse çizgi kalınlığı
                  ekran genişliğine göre değişirdi. */}
              <svg
                className="hk3-yay"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                {ARC_ROWS.map((r) => (
                  <path
                    key={r.dy}
                    d={r.d}
                    fill="none"
                    stroke="var(--blue-500)"
                    strokeWidth="1.5"
                    strokeOpacity={r.o * 0.55}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {ULKE_P.map((p) => (
                  <line
                    key={p}
                    x1={p * VB_W}
                    y1={arcY(p)}
                    x2={p * VB_W}
                    y2={DISK_TOP}
                    stroke="var(--blue-500)"
                    strokeWidth="1.2"
                    strokeOpacity="0.34"
                    strokeDasharray="3 5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <path
                  className="hk3-isik"
                  d={ARC_MAIN}
                  pathLength={1000}
                  fill="none"
                  stroke="var(--blue-700)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Beş halka. <ol> çünkü sıra gerçek: zincirin adımları.
                  Düğüm yayın üstüne oturuyor, ad düğümün üstünde. */}
              <ol className="hk3-halkalar">
                {CHAIN.map((s, i) => (
                  <li
                    key={s.key}
                    style={
                      {
                        "--p": `${(HALKA_P[i] * 100).toFixed(3)}%`,
                        "--y": pct(arcY(HALKA_P[i])),
                        "--i": i,
                      } as React.CSSProperties
                    }
                  >
                    <b>{s.label}</b>
                    <span className="hk3-dugum" aria-hidden="true" />
                  </li>
                ))}
              </ol>

              {/* Üç ülke. <ul> çünkü aralarında sıra ilişkisi yok.
                  BAYRAK TUZAĞI: Flag width/height taşımayan çıplak bir
                  <svg viewBox="0 0 60 40"> döndürüyor ve kabı ölçülmezse
                  300 x 150'ye açılıyor; bu depoda iki sayfa tam bu yüzden
                  bozuldu. .hk3-disk sabit piksel + overflow:hidden. */}
              <ul className="hk3-ulkeler" style={{ "--top": pct(DISK_TOP) } as React.CSSProperties}>
                {WHERE.countries.map((c, i) => (
                  <li
                    key={c.slug}
                    style={
                      { "--p": `${(ULKE_P[i] * 100).toFixed(3)}%`, "--i": i } as React.CSSProperties
                    }
                  >
                    <span className="hk3-disk" aria-hidden="true">
                      <Flag country={c.slug} />
                    </span>
                    <b>{COUNTRY_NAME[c.slug]}</b>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
