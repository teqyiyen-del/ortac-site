/* ============================================================================
   ADAY 3 · "EŞLEŞME" — muhasebe hero sahnesi denemesi
   CSS: src/app/css/lab-mhd.css · ad alanı .mhd-

   ---------------------------------------------------------------- FİKİR
   Diğer iki aday muhasebenin ÜRETTİĞİ şeyi çiziyor. Bu aday KONTROL EDİLDİĞİNİ
   çiziyor: solda banka ekstresi, sağda defter, aralarında satır satır kurulan
   eşleşmeler. Bir muhasebe hizmetinde müşterinin gerçekten satın aldığı şey
   çıktı değil, birinin bakıyor olması.

   TEK CÜMLE: "defter ile banka aynı şeyi söylüyor."

   NEDEN BAĞLAR DÜZ DEĞİL ÇAPRAZ: bir ekstre satırı ile bir defter kaydı aynı
   sırada durmaz. Paralel yedi çizgi bir tablo olurdu ve tablo eşleştirme
   demez; üç çaprazlama, hiçbir şeyi karıştırmadan "bunlar tek tek bulundu"
   diyor.

   TURUN HİKÂYESİ VAR — hareket süs değil, olay: altı satır sırayla
   eşleşiyor, biri AÇIKTA KALIYOR, imleç geri dönüp onu buluyor, son bağ
   kurulunca imleç ekstre tarafından defter tarafına geçiyor. Kapanış bu:
   iki taraf artık aynı yerde.

   DÖRT ŞİKÂYETE KARŞILIK
   · "aksiyon yok"    → turun %49'unda bir bağ ÇİZİLİYOR, kalan kısmında imleç
                        yürüyor. Canlı sahnede iki olay arasında 5 saniye
                        hiçbir şey olmuyordu; burada boş kare yok. Üstelik
                        hareket eden mavi kütle tuvalin ortasında ve
                        gerçekten yer değiştiriyor, yerinde titremiyor.
   · "anlatmıyor"     → sahnenin bir OLAYI var (açıkta kalan satır bulunuyor),
                        yani izleyen kişi bir şeyin OLDUĞUNU görüyor, dekor
                        değil.
   · "çok basic"      → iki nesne birbirinden farklı: ekstrenin dolu üst bandı
                        var, defterin sağ kenarında DİKİŞLİ SIRT var. Aradaki
                        alan boş değil, bağlarla örülüyor.
   · "bir şey yanlış" → iki eşit kütle, aynı hizada, aralarında iş yapan bir
                        boşluk. Canlı sahnenin küçük ve boş kalan sağ kartı
                        gibi bir yama yok.

   NEYİ FEDA EDİYOR: etkileşim yok. Ve konu diğer ikisinden DAR — sahne
   muhasebenin çıktısını değil tek bir işini anlatıyor; "ne alıyorum"
   sorusunun cevabı burada yok.

   RAKAM YOK: bütün satırlar boş blok. Bir eşleşme "şu tutar şu tutara denk"
   demiyor, "bu satırın karşılığı bulundu" diyor.

   ------------------------------------------------------------------ HAREKET
   Tek periyot: 37 saniye, 8 öğe (yedi bağ + imleç). 37 asal; sitedeki
   sürekli periyotların (60·42·34·29·26·23·20·19·17·15·13·11) hiçbiriyle
   ortak böleni yok, hero zemininin 60s ve 26s döngüleriyle de yok.

   DURUŞ HÂLİ (reduce): animasyon hiç tanımlanmıyor. Yedi bağın yedisi de
   çizili, imleç açıkta kalmış satırın üstünde duruyor. Kare eksik değil:
   "hepsi eşleşti, sonuncusu da".
   ========================================================================= */

const VB = "0 0 560 420";

/* Satırların y ekseni ikisinde de aynı — iki belge aynı hizada duruyor,
   yani karşılaştırma göz için mümkün. Adım 28. */
const ROWS = [140, 168, 196, 224, 252, 280, 308];

/* Kalem adlarının genişlikleri eşit DEĞİL ve iki belgede farklı: eşit
   olsalardı iki tablo gibi okunurdu, oysa bunlar iki ayrı kaynaktan gelen
   iki ayrı liste. */
const LW = [60, 48, 66, 54, 62, 50, 58];
const RW = [56, 64, 50, 60, 48, 66, 54];

/* EŞLEŞMELER — [ekstre satırı, defter satırı]. Üçü çapraz, dördü düz.
   Son çift (indeks 6) AÇIKTA KALAN: turun sonunda, ayrı bir keyframe
   kümesiyle ve mavi başlayıp nötre oturarak kuruluyor. */
const PAIRS: [number, number][] = [
  [0, 0],
  [1, 2],
  [2, 1],
  [3, 3],
  [4, 5],
  [6, 4],
  [5, 6],
];

/* Bağın yolu. Kontrol noktaları uçlara yakın (250 ve 302, uçlar 212 ve 340):
   eğri belgelerin kenarından DİK çıkıp dik giriyor, yani iki satırı birbirine
   bağlayan bir tel gibi okunuyor, rastgele bir yay gibi değil. */
const link = (yL: number, yR: number) => `M212 ${yL} C250 ${yL} 302 ${yR} 340 ${yR}`;

/* İmlecin uğrak sırası: eşleşen ekstre satırları, sonra açıkta kalan.
   Değerler markup'taki y=280'e GÖRE kayma; CSS'teki keyframe bu diziden
   üretildi ve iki yer birbirine bağlı (biri değişirse öteki de değişmeli). */

export default function MhEslesme() {
  return (
    <div className="mhd-wrap" aria-hidden="true">
      <svg viewBox={VB} className="mhd" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="mhdDots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle className="mhd-dot" cx="20" cy="20" r="1" />
          </pattern>
          <radialGradient id="mhdFadeG" cx="50%" cy="50%" r="64%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.58" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="mhdFade">
            <rect width="560" height="420" fill="url(#mhdFadeG)" />
          </mask>
          {/* Işık tam ortada, yani iki belgenin arasındaki boşlukta: sahnenin
              öznesi belgeler değil, aralarında kurulan bağ. */}
          <radialGradient id="mhdGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#2f6fc4" stopOpacity="0.28" />
            <stop offset="0.55" stopColor="#2f6fc4" stopOpacity="0.09" />
            <stop offset="1" stopColor="#2f6fc4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="560" height="420" fill="url(#mhdDots)" mask="url(#mhdFade)" />
        <circle cx="276" cy="220" r="230" fill="url(#mhdGlow)" />

        {/* ============================ SOL · BANKA EKSTRESİ ============
            Dolu üst bant bir banka dökümünün en tanınabilir şeridi.
            Belgeler y 48..346 arası: tuvalin dikey %71'i. İlk denemede
            74..346 idi ve çizim panelin içinde yukarıdan sarkıyordu —
            "bir şeyler yanlış" hissini besleyen türden bir boşluk. */}
        <rect className="mhd-face" x="36" y="48" width="168" height="298" rx="6" />
        <rect className="mhd-band" x="36" y="48" width="168" height="16" rx="6" />
        <rect className="mhd-band-cut" x="36" y="58" width="168" height="6" />
        <rect className="mhd-ink" x="52" y="80" width="62" height="10" rx="5" />
        <rect className="mhd-dim" x="52" y="98" width="40" height="7" rx="3.5" />
        <path className="mhd-rule" d="M52 124 H192" />
        <path className="mhd-rule" d="M148 124 V332" />
        <path className="mhd-hair" d={ROWS.map((y) => `M52 ${y + 16} H192`).join(" ")} />
        {ROWS.map((y, i) => (
          <g key={`l${y}`}>
            <rect className="mhd-dim" x="52" y={y} width={LW[i]} height="9" rx="4.5" />
            <rect className="mhd-dim" x="154" y={y} width="38" height="9" rx="4.5" />
          </g>
        ))}

        {/* ============================ SAĞ · DEFTER ====================
            Sağ kenarda DİKİŞLİ SIRT: ekstre bir çıktı, defter bir cilt.
            İki nesneyi ayıran şey bu detay. */}
        <rect className="mhd-face" x="348" y="48" width="168" height="298" rx="6" />
        <path className="mhd-rule" d="M500 48 V346" />
        {[78, 134, 190, 246, 302].map((y) => (
          <rect key={`s${y}`} className="mhd-stitch" x="503" y={y} width="10" height="14" rx="3" />
        ))}
        <rect className="mhd-ink" x="364" y="80" width="62" height="10" rx="5" />
        <rect className="mhd-dim" x="364" y="98" width="40" height="7" rx="3.5" />
        <path className="mhd-rule" d="M364 124 H492" />
        <path className="mhd-rule" d="M448 124 V332" />
        <path className="mhd-hair" d={ROWS.map((y) => `M364 ${y + 16} H492`).join(" ")} />
        {ROWS.map((y, i) => (
          <g key={`r${y}`}>
            <rect className="mhd-dim" x="364" y={y} width={RW[i]} height="9" rx="4.5" />
            <rect className="mhd-dim" x="454" y={y} width="38" height="9" rx="4.5" />
          </g>
        ))}

        {/* ---- UÇLAR ----
            Her satırın iki belgedeki karşılığı. Bağ kurulmadan önce de
            duruyorlar: boşluk boş değil, bağlanmayı bekleyen bir alan.
            Ortak düğüm sözlüğünün bu çizimdeki hâli. */}
        <path
          className="mhd-port"
          d={ROWS.map((y) => `M204 ${y + 4.5} H212 M340 ${y + 4.5} H348`).join(" ")}
        />

        {/* ---- BAĞLAR ----
            pathLength="1": yedi yol farklı uzunlukta ama stroke-dashoffset
            hepsinde aynı ölçekte çalışıyor, yani yedisi de aynı hızda
            çiziliyor. Varsayılan hâlleri ÇİZİLİ — kesikli desen yalnızca
            no-preference altında tanımlanıyor, o yüzden hareket kapalıyken
            duruş karesi tam. */}
        {/* Altı bağ tek bir grupta ve grubun içinde <path>'ten başka bir şey
            yok: CSS'teki sıra nth-of-type ile okunuyor, yani sayaç çizimin
            geri kalanındaki onlarca <path>'e bağlı değil. Grubun kendi stili
            yok, yalnızca sayaç kabı. Altı ayrı keyframe kümesi gerekiyor
            çünkü eşit gecikmeli tek bir küme her bağın SÖNME anını da
            kaydırırdı — gerekçe lab-mhd.css'te. */}
        <g className="mhd-links">
          {PAIRS.slice(0, 6).map(([a, b]) => (
            <path
              key={`p${a}-${b}`}
              className="mhd-link"
              pathLength="1"
              d={link(ROWS[a] + 4.5, ROWS[b] + 4.5)}
            />
          ))}
        </g>
        {/* Açıkta kalan satır. Ayrı sınıf, ayrı keyframe: geç kuruluyor ve
            mavi başlayıp nötre oturuyor — "bulundu, sonra sıradanlaştı". */}
        <path
          className="mhd-link mhd-late"
          pathLength="1"
          d={link(ROWS[PAIRS[6][0]] + 4.5, ROWS[PAIRS[6][1]] + 4.5)}
        />

        {/* ---- İMLEÇ ----
            Çizimin tek mavi maddesi ve tek anlamı: "şu anda bakılan satır".
            İki parça: satırın tutar bloğunu örten dolu blok ve sol kenardaki
            ok ucu. Tek parça denendi ve 38×9'luk bir blok 560 birimlik tuvalde
            gözden kaçıyordu — canlı sahnenin "aksiyon yok" sorununun aynısı.
            Ok ucu maviyi ikiye katlamadan iki kat görünür yapıyor: ikisi tek
            bir işaret, sayfanın kenarından satıra uzanan bir imleç.

            Markup'taki yeri AÇIKTA KALAN satır (y 280) — hareket kapalıyken
            duruş hâli orası olsun diye. Tur boyunca CSS onu diğer satırlara
            taşıyor ve bütün kaymalar bu satıra göre. */}
        <g className="mhd-cursor">
          <path className="mhd-caret" d="M38 280 l9 4.5 l-9 4.5 z" />
          <rect className="mhd-cursor-bar" x="154" y="280" width="38" height="9" rx="4.5" />
        </g>

        {/* ---- İKİ KELİME ---- */}
        <path className="mhd-stem" d="M120 354 V370 M432 354 V370" />
        <text className="mhd-word" x="120" y="390" textAnchor="middle">
          banka
        </text>
        <text className="mhd-word" x="432" y="390" textAnchor="middle">
          defter
        </text>
      </svg>
    </div>
  );
}
