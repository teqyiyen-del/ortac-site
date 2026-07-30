"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Fingerprint, FileBadge, IdCard, Landmark, type LucideIcon } from "lucide-react";
import { BRANDS, type BrandKey } from "@/lib/brands";

/* ============================================================================
   DUBAI HERO KARTI — "DOSYA"  (aday H2)

   ————————————————————————————————————————————————————————————————
   1. BU SAYFAYA KİM GELİYOR?
   ————————————————————————————————————————————————————————————————
   Türkiye'den, Dubai'de şirket kurmayı düşünen ama henüz karar vermemiş biri.
   E-ticaretçi, yazılımcı, ajans sahibi, danışman. Buraya gelmeden önce
   "Dubai'de 3 günde şirket, sıfır vergi" diyen on tane reklam görmüş.
   Yani buraya BİLGİSİZLİKLE değil, ŞÜPHEYLE geliyor. Kafasındaki soru
   "serbest bölge nedir" değil; "bu gerçek mi, yoksa bu da mı hava?"

   Bu teşhis her şeyi belirliyor. Şüpheyle gelen birine daha çok iddia
   göstermek şüpheyi büyütür. Ona kanıt göstermek gerekir.

   ————————————————————————————————————————————————————————————————
   2. ÜÇ SANİYEDE KARTIN İŞİ NE?
   ————————————————————————————————————————————————————————————————
   Üç saniye bir cümleye ancak yetiyor; bir şey ANLATMAK için yeterli değil.
   Zaten anlatmanın yeri de burası değil, sayfanın aşağısı. O yüzden kart
   anlatmıyor, GÖSTERİYOR: kurulumun sonunda ortaya çıkan somut nesneyi.

   Ziyaretçinin üç saniyede alması istenen tek cümle şu:
   "Bu iş bitince elimde IFZA lisansı olacak — ve iki şey daha var."

   ————————————————————————————————————————————————————————————————
   3. HANGİ SORUYU KAPATIYOR, AŞAĞIDA NEDEN YOK?
   ————————————————————————————————————————————————————————————————
   Kapattığı soru: "Ben bu paranın ve çabanın karşılığında ELİME NE ALIYORUM?"

   Sayfanın aşağısını tek tek geçtim: yapı seçenekleri, avantajlar, vergi,
   ödeme altyapısı, fiyat, süreç adımları, gereken evrak, kuruluş sonrası,
   uygunluk tablosu, SSS. Hiçbiri bu soruyu cevaplamıyor. En yakını "gereken
   evrak" bölümü — ama o SENİN VERECEĞİN evrakı listeliyor, sana verileni
   değil. Çıktının kendisi bir NESNE olarak sayfanın hiçbir yerinde yok.
   Boşluk tam orada; kart o boşluğu dolduruyor.

   Neden hero'ya ait: sol sütun iddiayı kuruyor ("Dubai'de şirket kurmak.").
   İddianın yanında kanıt yoksa hero bir reklamdır. Bu kart, vaadin yanına
   konan makbuz. Ayrıca hero, sayfada ziyaretçinin şüphesinin en yüksek
   olduğu tek yer — kanıt en çok orada işe yarıyor, on ekran aşağıda değil.

   ————————————————————————————————————————————————————————————————
   4. NEDEN "ÜÇ KUTU" DEĞİL DE DOSYA?
   ————————————————————————————————————————————————————————————————
   Aynı üç çıktı daha önce yan yana üç kutu olarak denendi ve müşteri haklı
   olarak "tarif ettiğimi birebir yaptın" dedi. Üç kutu bir liste; liste
   okunur, nesne görülür. Buradaki form bir dosya: üstte tek bir belge açık
   duruyor, diğer ikisi arkasından kenarıyla görünüyor.

   Bu form müşterinin kendi mantığının fiziksel hâli — "SSS akordiyon olur ya,
   sadece soruları görürsün, üstüne basınca cevap çıkar". Dosya da öyle: bir
   anda tek belge okunuyor, ötekilerin VAR OLDUĞU görülüyor ama içeriği
   ekranı doldurmuyor. Sekmeye basan istediğini öne alıyor.

   ————————————————————————————————————————————————————————————————
   5. BEYAZ NEDEN VAR, NEDEN BU KADAR?
   ————————————————————————————————————————————————————————————————
   İlk denemede kart baştan sona beyazdı ve "çok beyazlık, çok yazı" dedi.
   Burada beyazın bir GEREKÇESİ var: kağıt beyazdır. Beyaz olan tek büyük
   şey öndeki belge, yani kartın konusu. Arkadaki iki belge bilerek koyu —
   gerçekçi değil ama doğru: hem beyaz bütçesini koruyor hem de "şu an
   odaktaki tek şey bu" bilgisini taşıyor.

   Daha önemlisi: beyaz yüzeyde HİÇ YAZI YOK. Belgenin üstündeki her şey
   şekil (başlık çubuğu, satırlar, mühür). Bütün metin koyu tarafta duruyor.
   "Çok beyaz + çok yazı" şikayetinin ikinci yarısı böylece hiç doğmuyor.

   ————————————————————————————————————————————————————————————————
   6. NE SÖYLEMİYOR (STANCE_LIMITS)
   ————————————————————————————————————————————————————————————————
   Gün sayısı yok, fiyat yok. Üçüncü belge bilerek "kurumsal hesap" değil,
   "banka başvuru dosyası": bizim ürettiğimiz çıktı gerçekten o. Hesabı banka
   açıyor, kararı banka veriyor — bu hem alt satırda yazılı ("Onay bankanın")
   hem de çizimde: ilk iki belgede mühür/tik dolu, banka dosyasında halka
   kesikli ve boş. Görsel, metinden önce doğruyu söylüyor.

   Çizimler kasıtlı olarak soyut: uydurma numara, uydurma resmî damga, gerçek
   bir belgenin taklidi yok. Sadece "belge", "kimlik kartı", "form" siluetleri.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Sekme kendiliğinden ilerlerken bir belgenin okunma süresi. Kısa metin için
   4.2s cömert; ziyaretçi okumayı bitirmeden sıradaki gelmiyor. */
const DWELL_MS = 4200;

/* Belgenin altındaki küçük işaretler. İki türü var ve ikisi de aynı görünüyor,
   çünkü ikisi de aynı işi yapıyor: iddiayı bir kuruma ya da somut bir şarta
   bağlamak. `brand` gerçek bir kurumu gösteriyor (kayıt defterinden),
   `note` ise markası olmayan ama kanıt değeri olan bir olguyu. */
type Chip =
  | { kind: "brand"; brand: BrandKey; label: string }
  | { kind: "note"; icon: LucideIcon; label: string };

type Item = {
  key: string;
  /* sekmede duran tek kelime — kartın "içindekiler" satırı */
  tab: string;
  icon: LucideIcon;
  title: string;
  /* çıktının şartı ya da kaynağı; tek kısa satır */
  meta: string;
  chips: Chip[];
  art: React.ReactNode;
};

/* --------------------------------------------------------------- çizimler */
/* Üçü de aynı 196×132 kutuda ama SİLUETLERİ farklı: biri sayfa, biri kart,
   biri form. Fark kasıtlı — üç ayrı nesne olduğu, okumadan önce anlaşılsın.
   Hiçbirinde harf yok; metin koyu tarafta. */

function ArtLicence() {
  return (
    <svg
      className="kan-art"
      viewBox="0 0 196 132"
      aria-hidden="true"
      focusable="false"
    >
      {/* üst bant: otorite alanı */}
      <rect x="16" y="14" width="30" height="10" rx="3" fill="#e8f1fd" />
      <rect x="52" y="16" width="24" height="6" rx="3" fill="#ededed" />
      {/* başlık çubuğu — sayfadaki en koyu şey, "başlık burada" der */}
      <rect x="16" y="36" width="104" height="9" rx="4.5" fill="#1c1c1c" />
      <rect x="16" y="55" width="142" height="6" rx="3" fill="#e6e6e6" />
      <rect x="16" y="68" width="112" height="6" rx="3" fill="#e6e6e6" />
      <rect x="16" y="81" width="130" height="6" rx="3" fill="#e6e6e6" />
      {/* imza satırı */}
      <rect x="16" y="105" width="52" height="6" rx="3" fill="#efefef" />
      {/* mühür: DOLU halka + tik. Lisans verilmiş bir şey, kesinliği var. */}
      <circle cx="152" cy="102" r="19" fill="#e8f1fd" />
      <circle cx="152" cy="102" r="13.5" fill="none" stroke="#307fe2" strokeWidth="1.5" />
      <path
        d="M146 102.4 l4.3 4.3 L159 97.6"
        fill="none"
        stroke="#307fe2"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArtId() {
  return (
    <svg
      className="kan-art"
      viewBox="0 0 196 132"
      aria-hidden="true"
      focusable="false"
    >
      {/* kartın kendisi kağıdın içinde duruyor: beyaz sayfa çerçeve kalıyor,
          nesne bir SAYFA değil bir KART olduğunu siluetiyle söylüyor */}
      <rect x="17" y="19" width="162" height="95" rx="10" fill="#f5f5f5" stroke="#e6e6e6" />
      {/* fotoğraf alanı */}
      <rect x="30" y="33" width="37" height="47" rx="5" fill="#dedede" />
      <circle cx="48.5" cy="49" r="7.6" fill="#c7c7c7" />
      <path d="M35 74 C35 63.5 42 59 48.5 59 C55 59 62 63.5 62 74 Z" fill="#c7c7c7" />
      <rect x="80" y="34" width="70" height="8" rx="4" fill="#1c1c1c" />
      <rect x="80" y="51" width="56" height="5.5" rx="2.75" fill="#dedede" />
      <rect x="80" y="63" width="64" height="5.5" rx="2.75" fill="#dedede" />
      <rect x="80" y="75" width="44" height="5.5" rx="2.75" fill="#dedede" />
      {/* akıllı kart çipi — bir kimliği tek başına ele veren detay */}
      <rect x="30" y="88" width="21" height="15" rx="3" fill="#e0b567" />
      <rect x="30" y="94.5" width="21" height="1.4" fill="#cf9f4a" />
      <rect x="40" y="88" width="1.4" height="15" fill="#cf9f4a" />
      <rect x="60" y="92" width="88" height="6" rx="3" fill="#e6e6e6" />
      <rect x="60" y="103" width="60" height="5" rx="2.5" fill="#ededed" />
    </svg>
  );
}

function ArtBankFile() {
  return (
    <svg
      className="kan-art"
      viewBox="0 0 196 132"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="16" y="14" width="86" height="8" rx="4" fill="#1c1c1c" />
      {/* üç tamamlanmış satır: dosyanın bizde biten kısmı */}
      {[38, 58, 78].map((y) => (
        <g key={y}>
          <rect x="16" y={y} width="14" height="14" rx="4" fill="#e6f6ec" />
          <path
            d={`M20 ${y + 7.2} l2.9 2.9 L26.5 ${y + 4.4}`}
            fill="none"
            stroke="#1e8a54"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="38" y={y + 4} width="84" height="6" rx="3" fill="#e6e6e6" />
        </g>
      ))}
      <rect x="16" y="102" width="58" height="6" rx="3" fill="#efefef" />
      {/* KESİKLİ ve BOŞ halka: onay henüz yok, ve verecek olan biz değiliz.
          Lisanstaki dolu mührün bilerek zıddı. */}
      <circle cx="152" cy="98" r="18" fill="#f7f7f7" />
      <circle
        cx="152"
        cy="98"
        r="18"
        fill="none"
        stroke="#d4d4d4"
        strokeWidth="1.5"
        strokeDasharray="4 4.5"
      />
      <circle cx="145" cy="98" r="2.1" fill="#bdbdbd" />
      <circle cx="152" cy="98" r="2.1" fill="#bdbdbd" />
      <circle cx="159" cy="98" r="2.1" fill="#bdbdbd" />
    </svg>
  );
}

/* ------------------------------------------------------------------ içerik */
/* Üç çıktı, üç satır metin. Fazlası yok: kartın işi listelemek değil,
   ziyaretçiye "bunlar gerçekten oluyor" dedirtmek. */
const ITEMS: Item[] = [
  {
    key: "lisans",
    tab: "Lisans",
    icon: FileBadge,
    title: "Ticaret lisansı",
    meta: "Serbest bölge, faaliyet kodlarıyla",
    /* IFZA burada süs değil kanıt: resmî iş ortağı olduğumuz kurum, ve
       lisansı düzenleyen taraf. Marka işareti kayıt defterinden (brands.ts)
       geliyor; resmî vektör gelene kadar baş harfle çıkıyor. */
    chips: [{ kind: "brand", brand: "ifza", label: "IFZA" }],
    art: <ArtLicence />,
  },
  {
    key: "kimlik",
    tab: "Kimlik",
    icon: IdCard,
    title: "Emirates ID",
    /* Sitenin kendi cümlesiyle aynı: "Ortak vizesi ve Emirates ID süreç
       içinde alınır" (countryContent.ts). Kimlik tek başına bir ürün değil,
       oturumun çıktısı — ziyaretçinin en sık karıştırdığı şey bu. */
    meta: "Yatırımcı vizesiyle birlikte",
    /* Markası olmayan ama en sert kısıt: FACTS.dubai.limit. Hero'nun sol
       sütununda da yazıyor; burada işaret olarak duruyor ki "gelmeden olur"
       beklentisi kartın içinde kırılsın. */
    chips: [{ kind: "note", icon: Fingerprint, label: "Biyometri BAE'de" }],
    art: <ArtId />,
  },
  {
    key: "banka",
    tab: "Banka",
    icon: Landmark,
    /* "Kurumsal hesap" DEĞİL. Bizim ürettiğimiz çıktı dosyanın kendisi;
       hesabı banka açıyor. STANCE_LIMITS'in birinci maddesi. */
    title: "Banka başvuru dosyası",
    meta: "Onay bankanın",
    /* Kısa etiketler görünürlük için; kayıt defterindeki tam ad (Wio Business,
       Mashreq NeoBiz) title attribute'unda duruyor. brands.ts'e dokunulmadı. */
    chips: [
      { kind: "brand", brand: "wio", label: "Wio" },
      { kind: "brand", brand: "mashreq", label: "Mashreq" },
    ],
    art: <ArtBankFile />,
  },
];

/* İşaret çipi — beyaz plaka + işaret + kısa ad. Paylaşılan BrandChip'i
   kullanmak yerine yerel bir kopyası var: .bm- ölçüleri açık zemin için
   ayarlı, burada plaka koyu kartın üstünde tek başına duruyor ve bir tık
   küçük olması gerekiyor. Marka verisinin kaynağı yine tek: BRANDS. */
function ChipMark({ chip }: { chip: Chip }) {
  if (chip.kind === "note") {
    const Icon = chip.icon;
    return (
      <span className="kan-mk">
        <span className="kan-mk-p" aria-hidden="true">
          <Icon size={13} strokeWidth={2} />
        </span>
        <span className="kan-mk-n">{chip.label}</span>
      </span>
    );
  }

  const b = BRANDS[chip.brand];
  const hasPath = "path" in b && !!b.path;

  return (
    <span className="kan-mk" title={b.title}>
      <span className="kan-mk-p" aria-hidden="true">
        {hasPath ? (
          <svg width="15" height="15" viewBox="0 0 24 24" focusable="false">
            <path d={b.path} fill={b.hex} />
          </svg>
        ) : (
          <b>{"mono" in b ? b.mono : "?"}</b>
        )}
      </span>
      <span className="kan-mk-n">{chip.label}</span>
    </span>
  );
}

export default function HeroH2() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  /* iki ayrı duraklatma sebebi: fare kartın üstünde (geçici) ve kullanıcı
     bir sekmeye bastı (kalıcı). İkincisi kalıcı, çünkü sekmeye basmak
     "ben seçiyorum" demektir; iki saniye sonra kartın onu geri alması
     kullanıcının kararını çöpe atar. */
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    if (reduced || hovered || taken) return;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % ITEMS.length),
      DWELL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced, hovered, taken]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setTaken(true);
  }, []);

  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      className="kan"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span className="kan-k">Kuruluş bittiğinde elinizde</span>

      <div className="kan-body">
        {/* ---- dosya: üç belge üst üste, öndeki açık ---- */}
        <div className="kan-stack">
          {ITEMS.map((it, i) => {
            /* konum = kaçıncı sıradasın: 0 önde, 1 ve 2 arkada. Modülo
               sayesinde döngü hep aynı yönde ilerliyor, geri sıçrama yok. */
            const pos = (i - active + ITEMS.length) % ITEMS.length;
            return (
              <div key={it.key} className="kan-sheet" data-pos={pos}>
                {it.art}
              </div>
            );
          })}
        </div>

        {/* ---- açık belgenin adı ---- */}
        <div className="kan-panel">
          {ITEMS.map((it, i) => (
            <div
              key={it.key}
              className="kan-p"
              data-on={i === active}
              aria-hidden={i !== active}
            >
              <b className="kan-t">{it.title}</b>
              <span className="kan-m">{it.meta}</span>
              <span className="kan-mks">
                {it.chips.map((c) => (
                  <ChipMark key={c.label} chip={c} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- içindekiler: üç kelime, basınca o belge öne gelir ---- */}
      <div className="kan-tabs">
        {ITEMS.map((it, i) => {
          const Icon = it.icon;
          return (
            <button
              key={it.key}
              type="button"
              className="kan-tab"
              data-on={i === active}
              aria-pressed={i === active}
              onClick={() => pick(i)}
            >
              <Icon size={14} strokeWidth={1.9} aria-hidden="true" />
              {it.tab}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
