import { CalendarCheck, ChartColumn, Landmark, Stamp } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* /dubai/muhasebe · #fayda ("Düzenli muhasebenin karşılığı") bölümüne üç aday.
   Biçim: src/app/css/lab-fayda.css · .fyb- Bento · .fys- Sahne · .fyt- Tek defter

   Müşteri: "düzenli muhasebenin avantajı tarzı kısım var ya orayı çok daha iyi
   yap, belki bentogrid gibi bişi yapabilirsin, iconları svg leri fln olan.
   burası için labda ayrı 3 yer dene, biri bento olsun biri iconlu fln olsun."

   METİN accountingDubai.ts · gains'ten geliyor: başlık, vurgu, giriş cümlesi ve
   dört kalemin BAŞLIKLARI bir kelimesi değişmeden. Değişen tek şey alt satırlar:
   canlı cümleler ortalama 95 karakter ve müşteri az yazı istiyor, o yüzden
   kısaltıldı. Kısaltma veri dosyasına YAZILMADI (canlı sayfa aynen duruyor),
   aşağıdaki KISA dizisinde duruyor ve her satırın yanında hangi cümleden
   türediği yazılı. YENİ İDDİA KURULMADI: dördünün de kaynağı canlı cümlenin
   kendisi, atılan kısım ya tekrar ya örnekleme.

   ÜÇ SUNUCU BİLEŞENİ. "use client" yok, useReducedMotion yok (tuzak A);
   sürekli hareketin tamamı CSS'te ve reduce kapısının arkasında. Tarayıcıya
   bu dosyadan JS inen tek şey sitenin kendi giriş kalıpları (FadeUp,
   SplitWords) — canlı bölüm de aynı ikisini kullanıyor.

   ÇİZİM KURALI (ProcessScroll.tsx başındaki kural): hiçbir sahne gerçek bir
   belgenin, bankanın ya da otoritenin taklidi değil. Sahnelerde firma adı,
   tutar, tarih, oran, rozet ve "onaylandı" gibi karar sözcüğü YOK; hepsi
   etiketsiz şematik. Sayı geçen tek yer on iki aylık ray ve orada da sayı
   yazılı değil, on iki kutu var. */

const G = ACCOUNTING_DUBAI.gains;

/* Kalemin ikonu veri dosyasındaki `icon` adından geliyor; eşleme canlı
   sayfadaki ICON haritasının dört satırlık dalı (book/receipt/… bu bölümde
   kullanılmıyor, gereksiz import açmıyoruz). */
const IC = [CalendarCheck, ChartColumn, Landmark, Stamp] as const;

/* KISALTILMIŞ MEKANİZMA CÜMLELERİ — hangisi neyden türedi:
   0 · canlı: "Hangi ay hangi kalemin doğduğu baştan belli; yukarıdaki şerit
       onu gösteriyor." → ikinci yarısı sayfanın kendi takvimine yapılan bir
       yönlendirme, bölümün cümlesi değil; düştü.
   1 · canlı: "Gelir-gider tablosu, bilanço ve nakit akışı aynı defterden
       çıkıyor; vergi için değil, kararlarınız için." → üç tablonun adı bir
       örnekleme; iddia "aynı defterden çıkıyor" ve "kararlarınız için".
   2 · canlı: "İstenen belgeler hep aynı: güncel mali tablolar ve dayanak
       kayıtları. Ay ay tutulunca ayrıca hazırlanmıyor." → iki cümlenin
       ilkindeki liste yine örnekleme; iddia "hep aynı" ve "ayrıca
       hazırlanmıyor".
   3 · canlı: "Nitelikli mükellefiyet otomatik gelmiyor; şartın sağlandığını
       kayıtlar gösteriyor." → yalnızca "şartın sağlandığını" kısaldı. */
const KISA = [
  "Hangi ay hangi kalemin doğduğu baştan belli.",
  "Aynı defterden çıkıyor: vergi için değil, kararlarınız için.",
  "İstenen belgeler hep aynı; ay ay tutulunca ayrıca hazırlanmıyor.",
  "Nitelikli mükellefiyet otomatik gelmiyor; şartı kayıtlar gösteriyor.",
];

/** başlık + giriş — üç adayda da birebir aynı, karşılaştırma yalnız gövdede */
function Bas() {
  return (
    <div className="sec-head">
      <SplitWords
        as="h2"
        text={G.heading}
        accent={G.accent}
        className="h2"
        style={{ color: "var(--text-900)" }}
      />
      <FadeUp delay={0.2}>
        <p className="sec-lead">{G.lead}</p>
      </FadeUp>
    </div>
  );
}

/* ============================================================================
   F1 · BENTO
   ========================================================================== */

/* Yıl rayı: on iki eş kutu ve üstünde ay ay sıçrayan tek işaret.
   NE ANLATIYOR: yılın on iki ayı var, işaret hiçbirini atlamıyor.
   NE ANLATMIYOR: hangi ayda ne doğduğunu. Kutuların hepsi AYNI — dolu/boş
   ayrımı yapılsaydı sayfanın gerçek takviminin (afterSetup · yearLanes)
   uydurma bir kopyası çıkardı. */
function YilRayi() {
  const aylar = Array.from({ length: 12 }, (_, i) => 10 + i * 25);
  return (
    <svg viewBox="0 0 320 130" className="fyb-svg" focusable="false" aria-hidden="true">
      <rect x="10" y="16" width="84" height="8" rx="4" className="svx-bar" />
      <path d="M10 34 H310" className="svx-line" />
      {aylar.map((x) => (
        <rect key={x} x={x} y="52" width="20" height="20" rx="6" className="svx-box" />
      ))}
      {/* işaret ilk kutunun üstünde duruyor; hareket onu 25'er piksel taşıyor */}
      <rect x="10" y="52" width="20" height="20" rx="6" fill="#307fe2" className="fyb-now" />
      <path d="M10 96 H310" className="svx-line" />
    </svg>
  );
}

/* Kayıttan mühre: üç kayıt satırı, tek yol, kapanan halka.
   NE ANLATIYOR: halkanın dayanağı solda duran kayıt. */
function KayitHalka() {
  return (
    <svg viewBox="0 0 340 130" className="fyb-svg" focusable="false" aria-hidden="true">
      {[16, 50, 84].map((y) => (
        <g key={y}>
          <rect x="12" y={y} width="96" height="30" rx="9" className="svx-box" />
          <rect x="24" y={y + 9} width="46" height="5" rx="2.5" className="svx-bar" />
          <rect x="24" y={y + 18} width="30" height="5" rx="2.5" className="svx-bar" />
        </g>
      ))}
      <path d="M118 65 H176" className="svx-line-b" />
      <path d="M176 60.6 L182.4 65 L176 69.4 Z" className="svx-ah-b" />
      <circle cx="120" cy="65" r="3.4" className="svx-dot fyb-dot" />
      <circle cx="252" cy="65" r="34" className="svx-ring" />
      <Stamp x={240} y={53} width={24} height={24} strokeWidth={1.9} className="svx-ic-b" />
    </svg>
  );
}

export function FaydaBento() {
  const [g0, g1, g2, g3] = G.items;
  const [I0, I1, I2, I3] = IC;
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <Bas />

        {/* Izgara dört karo: büyük (çizimli) · iki küçük (yazı) · geniş bant
            (çizim sağda). Ölçü farkı dekor değil: gösterilecek mekanizması
            olan iki kalem büyük yeri alıyor. */}
        <div className="fyb">
          <FadeUp className="fyb-k fyb-a" delay={0.06}>
            <div className="fyb-stage" aria-hidden="true">
              <YilRayi />
            </div>
            <div className="fyb-body">
              <span className="fyb-ic" aria-hidden="true">
                <I0 size={15} strokeWidth={2.1} />
              </span>
              <h3 className="fyb-t">{g0.title}</h3>
              <p className="fyb-p">{KISA[0]}</p>
            </div>
          </FadeUp>

          <FadeUp className="fyb-k fyb-b" delay={0.11}>
            <div className="fyb-body">
              <span className="fyb-ic" aria-hidden="true">
                <I1 size={15} strokeWidth={2.1} />
              </span>
              <h3 className="fyb-t">{g1.title}</h3>
              <p className="fyb-p">{KISA[1]}</p>
            </div>
          </FadeUp>

          <FadeUp className="fyb-k fyb-c" delay={0.16}>
            <div className="fyb-body">
              <span className="fyb-ic" aria-hidden="true">
                <I2 size={15} strokeWidth={2.1} />
              </span>
              <h3 className="fyb-t">{g2.title}</h3>
              <p className="fyb-p">{KISA[2]}</p>
            </div>
          </FadeUp>

          <FadeUp className="fyb-k fyb-d" delay={0.21}>
            <div className="fyb-d-in">
              <div className="fyb-body">
                <span className="fyb-ic" aria-hidden="true">
                  <I3 size={15} strokeWidth={2.1} />
                </span>
                <h3 className="fyb-t">{g3.title}</h3>
                <p className="fyb-p">{KISA[3]}</p>
              </div>
              <div className="fyb-stage" aria-hidden="true">
                <KayitHalka />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   F2 · SAHNE — dört kart, dört sahne

   Kartın kendisi sitenin kendi kartı: .hx-card > .hx-stage + .hx-body. Bu
   bileşen kart kromu yazmıyor, çağırıyor. Sahnelerin çizim sınıfları da
   globals.css'in .svx- dili; yeni renk tanımlanmadı.
   ========================================================================== */

/* 1 · takvim — panel içinde on iki ay, ilerleyen işaret */
function SahneTakvim() {
  const aylar = Array.from({ length: 12 }, (_, i) => 28 + i * 22);
  return (
    <svg viewBox="0 0 320 180" className="svx" focusable="false" aria-hidden="true">
      <rect x="12" y="24" width="296" height="132" rx="16" className="svx-box" />
      <rect x="28" y="44" width="92" height="7" rx="3.5" className="svx-bar" />
      <path d="M28 66 H292" className="svx-line" />
      {aylar.map((x) => (
        <rect key={x} x={x} y="92" width="17" height="17" rx="5" className="svx-box-2" />
      ))}
      <rect x="28" y="92" width="17" height="17" rx="5" fill="#307fe2" className="fys-now" />
      <path d="M28 126 H287" className="svx-line" />
    </svg>
  );
}

/* 2 · tablo — sütunlar ve altlarında ay ay yer değiştiren mavi çizgi.
   Sütun yükseklikleri ETİKETSİZ ve eksensiz: bir tablo şekli, bir veri
   değil. Sahnede tek bir rakam yok. */
function SahneTablo() {
  const boy = [30, 44, 26, 52, 38, 60, 34, 48, 42, 56, 32, 46];
  return (
    <svg viewBox="0 0 320 180" className="svx" focusable="false" aria-hidden="true">
      <rect x="24" y="26" width="84" height="7" rx="3.5" className="svx-bar" />
      <path d="M24 62 H296" className="svx-line" />
      <path d="M24 100 H296" className="svx-line" />
      {boy.map((h, i) => (
        <rect
          key={i}
          x={26 + i * 22}
          y={130 - h}
          width="14"
          height={h}
          rx="4"
          className="svx-bar-mid"
        />
      ))}
      <path d="M24 134 H296" className="svx-line" />
      <rect x="26" y="140" width="14" height="4" rx="2" fill="#307fe2" className="fys-col" />
    </svg>
  );
}

/* 3 · dosya — gelen talep soldan, hazır dosya sağda.
   Landmark ikonu jenerik: belirli bir bankanın adı, logosu ya da rengi yok
   (sitede aynı ikon aynı işle SceneBanking'de de duruyor). */
function SahneDosya() {
  return (
    <svg viewBox="0 0 320 180" className="svx" focusable="false" aria-hidden="true">
      <rect x="14" y="62" width="72" height="56" rx="12" className="svx-box" />
      <Landmark x={37} y={78} width={26} height={26} strokeWidth={1.9} className="svx-ic-b" />
      <path d="M92 90 H172" className="svx-line-b" />
      <path d="M172 85.6 L178.4 90 L172 94.4 Z" className="svx-ah-b" />
      <circle cx="94" cy="90" r="3.4" className="svx-dot fys-dot" />
      <rect x="186" y="40" width="120" height="100" rx="14" className="svx-box" />
      {[58, 84, 110].map((y) => (
        <g key={y}>
          <rect x="200" y={y} width="92" height="18" rx="6" className="svx-box-2" />
          <rect x="210" y={y + 6} width="44" height="5" rx="2.5" className="svx-bar" />
        </g>
      ))}
    </svg>
  );
}

/* 4 · mühür — soldaki kayıt, sağdaki kapanan halka.
   Halka DÖNMÜYOR; kesikleri kayıyor (.svx-flow ile aynı idiyom, çok daha
   yavaş). "Sonsuz dönen ikon" bu dosyada da yasak. */
function SahneMuhur() {
  return (
    <svg viewBox="0 0 320 180" className="svx" focusable="false" aria-hidden="true">
      <rect x="14" y="40" width="118" height="100" rx="14" className="svx-box" />
      {[58, 76, 94, 112].map((y, i) => (
        <rect
          key={y}
          x="28"
          y={y}
          width={[90, 72, 84, 64][i]}
          height="7"
          rx="3.5"
          className="svx-bar"
        />
      ))}
      <path d="M138 90 H170" className="svx-line-b" />
      <path d="M170 85.6 L176.4 90 L170 94.4 Z" className="svx-ah-b" />
      <circle
        cx="240"
        cy="90"
        r="42"
        strokeDasharray="4 7"
        className="svx-ring fys-ring"
      />
      <Stamp x={227} y={77} width={26} height={26} strokeWidth={1.9} className="svx-ic-b" />
    </svg>
  );
}

const SAHNE = [SahneTakvim, SahneTablo, SahneDosya, SahneMuhur] as const;

export function FaydaSahne() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <Bas />
        <div className="fys">
          {/* İKON KUYUSU BU ADAYDA YOK, BİLEREK: kalemin ikonu sahnenin
              kendisi. Kartın üstünde 230 piksellik bir çizim varken altına
              bir de 26 piksellik aynı ikonu koymak aynı şeyi iki kez
              söylemek olurdu. */}
          {G.items.map((g, i) => {
            const S = SAHNE[i];
            return (
              <FadeUp key={g.title} className="fys-k" delay={0.06 + i * 0.05}>
                <article className="hx-card">
                  <div className="hx-stage" aria-hidden="true">
                    <S />
                  </div>
                  <div className="hx-body fys-body">
                    <h3 className="fys-t">{g.title}</h3>
                    <p className="fys-p">{KISA[i]}</p>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   F3 · TEK DEFTER — tek büyük sahne + dört kısa satır

   Bölümün giriş cümlesi zaten bunu söylüyor: "Dördü de bir vaat değil, kaydın
   ay ay tutulmasının doğrudan sonucu." Yani dört kalem birbirinin EŞİ DEĞİL,
   AYNI SEBEBİN sonucu. Bento de dörtlü sahne de dördü eşit dört nesne olarak
   diziyor; burada sebep tek ve büyük, sonuçlar ondan dallanıyor.

   Hareket sitenin PAYLAŞILAN kalıbıyla (aktarim.css · .akt / .akt-durak):
   defter yanıyor, ışık dört dala sırayla geçiyor. Kalıbın kendi kuralı gereği
   burada tek satır mekanizma yok, yalnız sınıf var; değerler lab-fayda.css'te.
   ========================================================================== */

/* dalların bitiş yükseklikleri ve ikonları — dört kalemle aynı sırada */
const DAL = [
  { y: 62, sinif: "fyt-b1" },
  { y: 122, sinif: "fyt-b2" },
  { y: 182, sinif: "fyt-b3" },
  { y: 242, sinif: "fyt-b4" },
] as const;

function DefterSahne() {
  return (
    <svg
      viewBox="0 0 340 300"
      className="fyt-svg akt fyt-akt"
      focusable="false"
      aria-hidden="true"
    >
      {/* defter — tek sebep */}
      <rect
        x="16"
        y="42"
        width="100"
        height="216"
        rx="16"
        className="svx-box akt-durak fyt-defter"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="32"
          y={62 + i * 24}
          width={i % 2 === 0 ? 68 : 54}
          height="7"
          rx="3.5"
          className="svx-bar"
        />
      ))}
      {/* kaydın ay ay tutulması: defterin üstünden inen okuma çizgisi */}
      <rect x="24" y="54" width="84" height="2" rx="1" fill="#5c9eeb" className="fyt-tarama" />

      {DAL.map(({ y, sinif }) => (
        <path
          key={y}
          d={`M116 150 C 156 150, 166 ${y}, 206 ${y}`}
          fill="none"
          className={`svx-line akt-durak fyt-hat ${sinif}`}
        />
      ))}

      {DAL.map(({ y, sinif }, i) => {
        const Icon = IC[i];
        return (
          <g key={y}>
            <rect
              x="206"
              y={y - 24}
              width="118"
              height="48"
              rx="14"
              className={`svx-box akt-durak fyt-nod ${sinif}`}
            />
            <Icon
              x={222}
              y={y - 11}
              width={22}
              height={22}
              strokeWidth={1.9}
              className="svx-ic-b"
            />
            <rect x="256" y={y - 3} width="52" height="6" rx="3" className="svx-bar" />
          </g>
        );
      })}
    </svg>
  );
}

export function FaydaDefter() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <Bas />
        <div className="fyt">
          <FadeUp className="fyt-card" delay={0.06}>
            <div className="fyt-stage" aria-hidden="true">
              <DefterSahne />
            </div>
          </FadeUp>

          <div className="fyt-list">
            {G.items.map((g, i) => {
              const Icon = IC[i];
              return (
                <FadeUp key={g.title} delay={0.12 + i * 0.05}>
                  <div className="fyt-row">
                    <span className="fyt-ic" aria-hidden="true">
                      <Icon size={15} strokeWidth={2.1} />
                    </span>
                    <h3 className="fyt-t">{g.title}</h3>
                    <p className="fyt-p">{KISA[i]}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
