"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Building2, Check, FileStack, Landmark, Minus, Store } from "lucide-react";
import { BrandBadge } from "@/components/shared/BrandMark";
import { payGroupsFor } from "@/lib/sectors";
import type { Country } from "@/lib/store";

/* ============================================================================
   SEKTÖR SAHNELERİ — /sektorler/[sektor] sayfasının çizimleri

   NEDEN VAR: sektör iç sayfası doğru şeyleri söylüyordu ama tek bir şey bile
   göstermiyordu; ana sayfadaki sektör kartlarında (Profiles.tsx) küçük bir
   pencere sektörü canlandırırken iç sayfa baştan sona metin duvarıydı. "O
   hava" iç sayfaya taşınırken ölçek değişti: karttaki pencere bir ima, buradaki
   sahne bir ŞEMA. Kartta "bir şeyler oluyor" yeterliydi, burada her çizim tek
   bir cümle söylemek zorunda — süs koymuyoruz.

   DİL NEREDEN GELİYOR: home/ServiceScenes.tsx (.svx) ve scenes/SetupScenes.tsx
   (.sv-dark). Buradaki .sxv-* sınıfları o ailenin değerlerini birebir taşıyor
   (aynı kutu dolguları, aynı tek mavi, koyu yüzeyde alfa yok). Sınıflar yine de
   kopyalandı, ortak kullanılmadı: bu sayfanın CSS'i kendi dosyasında
   (app/css/sektor.css) ve globals.css'e dokunulmuyor. Değer tablosu orada, bu
   dosyanın üstünde değil.

   NE ÇİZİLMEZ: sitenin geri kalanındaki kural burada da geçerli. Hiçbir sahne
   banka onayı, otorite kararı veya kesin süre ima etmiyor. Gösterilen şey ya
   bizim yaptığımız iş, ya bir ülkenin değişmeyen çerçevesi, ya da açıkça kapalı
   olan bir kapı. "Onaylandı" hiçbir karede geçmiyor.

   HAREKET: iki katman. Giriş (whileInView, bir kez) ve rayda dolaşan darbe
   (repeat: Infinity). useReducedMotion açıksa ikisi de kapanıyor ve sahne son
   karesinde duruyor — markup iki durumda da aynı, yalnızca süreler sıfırlanıyor
   ve darbeler hiç basılmıyor.

   ---------------------------------------------------------------------------
   İKİNCİ SEKTÖR EKLENDİĞİNDE NE YAPILACAK

   Eşleme SetupScenes'teki SCENE_BY_KIND desenini izliyor: sahne SEKTÖR
   ANAHTARINA bağlı, sıraya değil. sectors.ts'e ikinci bir sektör girdiğinde:

   1. Hiçbir şey yapmasanız da sayfa boş kutu göstermiyor. Bilinmeyen sektör
      SceneThreeCountries'e düşüyor (aynı dosya, üç ülke, üç farklı çerçeve) —
      hangi sektör olursa olsun doğru bir cümle.
   2. Ülke sahneleri zaten sektörden bağımsız: "Dubai'de kararı müşterinin yeri
      verir", "İngiltere uzaktan tamamlanır", "KKTC'de kartla tahsilat kapalı"
      üç sektörde de aynı olgular. Yeni sektör bunları bedavaya alıyor.
   3. Sektöre özgü bir şey söylemek istiyorsanız SECTOR_SCENES kaydına bir satır
      ekleyin. `hero` o sektörün büyük paneli — çizim ve altındaki cümle TEK bir
      nesnede ({ Scene, caption }), çünkü ikisi ayrı tabloda dursa biri
      güncellenip öteki unutulabiliyor. `countries` ise yalnızca DEĞİŞTİRMEK
      istediğiniz ülkeler; kısmi kayıt, yazmadığınız ülke varsayılanı kullanmaya
      devam eder.

   Kayıt dışında hiçbir dosyaya dokunmak gerekmiyor: page.tsx sahneyi anahtarla
   istiyor, adıyla değil.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

/* ---------------------------------------------------------------- yardımcı */

/** Rayda ilerleyen tek darbe. reduce açıkken hiç basılmıyor. */
function Pulse({
  x1,
  x2,
  y,
  delay = 0,
}: {
  x1: number;
  x2: number;
  y: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.circle
      r="3.2"
      cy={y}
      className="sxv-dot"
      initial={{ cx: x1, opacity: 0 }}
      whileInView={{ cx: [x1, x2], opacity: [0, 1, 1, 0] }}
      viewport={VIEW}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      }}
    />
  );
}

/** Aşağıyı gösteren küçük ok ucu — marker yerine düz üçgen (id çakışması yok). */
function ArrowDown({ x, y }: { x: number; y: number }) {
  return <path d={`M${x - 4.4} ${y - 7} L${x + 4.4} ${y - 7} L${x} ${y} Z`} className="sxv-ah-b" />;
}

/** Sağı gösteren küçük ok ucu. */
function ArrowRight({ x, y }: { x: number; y: number }) {
  return <path d={`M${x - 7} ${y - 4.4} L${x} ${y} L${x - 7} ${y + 4.4} Z`} className="sxv-ah-b" />;
}

/* ============================================================================
   1 · BÜYÜK SAHNE — yazılım: paranın nereden geçtiği

   Sayfanın ilk bölümünün başlığı zaten bunu söylüyor ("Yazılımda kuruluşu
   belirleyen şey, paranın nereden geçtiği"), sahne o cümlenin şeması. Üç
   sütun tek bir iddiayı taşıyor: satış her yerden gelir, tahsilat bir kanaldan
   geçer, kanal da şirketin hesabına bağlanır. Ortadaki sütunda gerçek marka
   işaretleri var — soyut bir vektör "kart tahsilatı" demez, Stripe der.
   ========================================================================= */

/* Satış tarafı bilerek üç satır: yazılımda tahsilatı belirleyen üç ayrı yol
   bu. Üçünün de ortada TEK bir kanala akması kasıtlı — satış kanalı ile
   tahsilat kanalı arasında bire bir eşleşme yok, olduğunu ima etmek yanlış
   olurdu. */
const SELL_ROWS = [
  { t: "Web ve SaaS", s: "abonelik" },
  { t: "Uygulama mağazası", s: "mağaza tahsil eder" },
  { t: "Kurumsal satış", s: "sözleşme ve fatura" },
];

function SceneSoftwareMoney() {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  return (
    <svg
      viewBox="0 0 640 236"
      className="sxv"
      role="img"
      aria-label="Yazılımda tahsilat akışı: satış kanalları tek bir tahsilat kanalından geçip şirketin iş hesabına bağlanıyor"
    >
      <text x="0" y="16" className="sxv-lbl">
        satış kanalı
      </text>
      <text x="236" y="16" className="sxv-lbl">
        tahsilat
      </text>
      <text x="500" y="16" className="sxv-lbl">
        şirket ve hesap
      </text>

      {/* --- sol: nereden satıyorsunuz --- */}
      {SELL_ROWS.map((r, i) => {
        const y = 34 + i * 58;
        return (
          <motion.g
            key={r.t}
            initial={{ opacity: 0, x: reduce ? 0 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: t(0.45), delay: t(0.08 + i * 0.1), ease: EASE }}
          >
            <rect x="0" y={y} width="168" height="48" rx="12" className="sxv-box" />
            <text x="16" y={y + 20} className="sxv-t">
              {r.t}
            </text>
            <text x="16" y={y + 37} className="sxv-s">
              {r.s}
            </text>
          </motion.g>
        );
      })}

      {/* üç satır tek omurgaya toplanıyor, oradan tek ray tahsilata gidiyor */}
      <path d="M168 58 H204 M168 116 H204 M168 174 H204" className="sxv-line" />
      <path d="M204 58 V174" className="sxv-line" />
      <path d="M204 116 H228" className="sxv-line-b sxv-flow" />
      <ArrowRight x={236} y={116} />
      <Pulse x1={170} x2={202} y={116} />

      {/* --- orta: tahsilat kanalı, gerçek işaretlerle --- */}
      <motion.g
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: t(0.5), delay: t(0.24), ease: EASE }}
      >
        <rect x="236" y="34" width="208" height="176" rx="14" className="sxv-box" />

        <rect x="248" y="46" width="184" height="44" rx="10" className="sxv-box-2" />
        <BrandBadge brand="stripe" x={258} y={55} size={26} radius={8} />
        <text x="294" y="66" className="sxv-t">
          Stripe
        </text>
        <text x="294" y="82" className="sxv-s">
          kart, abonelik
        </text>

        <rect x="248" y="98" width="184" height="44" rx="10" className="sxv-box-2" />
        <BrandBadge brand="paypal" x={258} y={107} size={26} radius={8} />
        <text x="294" y="118" className="sxv-t">
          PayPal
        </text>
        <text x="294" y="134" className="sxv-s">
          kart, cüzdan
        </text>

        {/* Mağazanın markası yok: Apple ve Google işaretlerini basmıyoruz, o
            kanalı biz kurmuyoruz. Nötr bir ikon, doğru olan. */}
        <rect x="248" y="150" width="184" height="44" rx="10" className="sxv-box-2" />
        <rect x="258" y="159" width="26" height="26" rx="8" className="sxv-chip-b" />
        <Store x={263} y={164} width={16} height={16} strokeWidth={1.9} className="sxv-ic-b" />
        <text x="294" y="170" className="sxv-t">
          Mağaza tahsilatı
        </text>
        <text x="294" y="186" className="sxv-s">
          dönemsel ödeme
        </text>
      </motion.g>

      {/* Ray tahsilat kutusunun ORTASINDAN çıkıyor, üçüncü satırın hizasından
          değil: hizadan çıkınca "yalnızca mağaza tahsilatı hesaba gidiyor" gibi
          okunuyordu. Dirsek yapıp hesap kutusunun hizasına iniyor. */}
      <path d="M444 122 H470 V174 H492" className="sxv-line-b sxv-flow" />
      <ArrowRight x={500} y={174} />
      <Pulse x1={472} x2={490} y={174} delay={0.45} />

      {/* --- sağ: şirket ve hesap --- */}
      <motion.g
        initial={{ opacity: 0, x: reduce ? 0 : 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEW}
        transition={{ duration: t(0.5), delay: t(0.4), ease: EASE }}
      >
        <rect x="500" y="34" width="140" height="76" rx="12" className="sxv-box-b" />
        <Building2 x={516} y={50} width={16} height={16} strokeWidth={1.9} className="sxv-ic-b" />
        <text x="516" y="84" className="sxv-t">
          Şirketiniz
        </text>
        <text x="516" y="100" className="sxv-s">
          kurulduğu ülke
        </text>

        <path d="M570 110 V134" className="sxv-line" />
        <ArrowDown x={570} y={134} />

        <rect x="500" y="134" width="140" height="76" rx="12" className="sxv-box" />
        <Landmark x={516} y={150} width={16} height={16} strokeWidth={1.9} className="sxv-ic-b" />
        <text x="516" y="184" className="sxv-t">
          İş hesabı
        </text>
        <text x="516" y="200" className="sxv-s">
          çoklu para birimi
        </text>
      </motion.g>
    </svg>
  );
}

/* ============================================================================
   2 · BÜYÜK SAHNE, YEDEK — sektörü bilinmeyen sayfa için

   Kayıtta karşılığı olmayan bir sektör bu sahneye düşüyor. Boş bir kutu
   göstermektense sektörden bağımsız doğru bir şey göstermek daha iyi: aynı
   kuruluş dosyası üç ülkede üç ayrı biçim alıyor. Üç satırdaki cümleler ülke
   olgusu, sektör iddiası değil — o yüzden hangi sektöre düşerse düşsün yanlış
   olmuyor.
   ========================================================================= */

const COUNTRY_FRAMES = [
  { name: "Dubai", line: "serbest bölge mi, mainland mi" },
  { name: "İngiltere", line: "uzaktan tescil, kâr kurumlar vergisine tabi" },
  { name: "KKTC", line: "kartla tahsilat kapalı" },
];

function SceneThreeCountries() {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  return (
    <svg
      viewBox="0 0 640 232"
      className="sxv"
      role="img"
      aria-label="Aynı kuruluş dosyası üç ülkede üç ayrı çerçeveye giriyor"
    >
      <motion.g
        initial={{ opacity: 0, x: reduce ? 0 : -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEW}
        transition={{ duration: t(0.5), ease: EASE }}
      >
        <rect x="0" y="64" width="190" height="104" rx="14" className="sxv-box-b" />
        <FileStack x={24} y={86} width={18} height={18} strokeWidth={1.9} className="sxv-ic-b" />
        <text x="24" y="128" className="sxv-t">
          Kuruluş dosyası
        </text>
        <text x="24" y="146" className="sxv-s">
          faaliyet, ekip, tahsilat
        </text>
      </motion.g>

      <path d="M190 116 H222" className="sxv-line-b sxv-flow" />
      <path d="M222 46 V186" className="sxv-line" />
      <path d="M222 46 H254 M222 116 H254 M222 186 H254" className="sxv-line" />
      <Pulse x1={192} x2={220} y={116} />

      {COUNTRY_FRAMES.map((c, i) => {
        const y = 18 + i * 70;
        return (
          <motion.g
            key={c.name}
            initial={{ opacity: 0, x: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: t(0.45), delay: t(0.18 + i * 0.12), ease: EASE }}
          >
            <ArrowRight x={262} y={y + 28} />
            <rect x="262" y={y} width="378" height="56" rx="12" className="sxv-box" />
            <rect x="278" y={y + 18} width="4" height="20" rx="2" className="sxv-bar-b" />
            <text x="294" y={y + 25} className="sxv-t">
              {c.name}
            </text>
            <text x="294" y={y + 43} className="sxv-s">
              {c.line}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ============================================================================
   3 · ÜLKE SAHNELERİ — her biri o ülkedeki TEK farkı çiziyor

   Üçü de sektörden bağımsız. Bunlar ülke olgusu: hangi sektörden gelirseniz
   gelin Dubai'de kararı müşterinizin yeri verir, İngiltere uzaktan tamamlanır,
   KKTC'de kartla yinelenen tahsilat kurulmaz. Bu yüzden varsayılan olarak üç
   ülkenin sahnesi bütün sektörlerde ortak; sektör kaydı isterse tek tek
   değiştirebiliyor.
   ========================================================================= */

/* ---- Dubai: kararı satış yaptığınız taraf veriyor ----
   Sayfada bu cümle zaten yazıyor (fit listesinin ilk maddesi). Sahne onu
   çiziyor çünkü bu bir KARŞILAŞTIRMA, sıra değil: iki seçenek aynı anda masada
   ve biri seçiliyor. Seçili olan serbest bölge, çünkü yazılım tarafında müşteri
   çoğunlukla BAE dışında — ama ikinci kart sönük değil, kapalı da değil; bir
   seçenek olarak duruyor. */
function SceneDubaiFork() {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  return (
    <svg
      viewBox="0 0 440 152"
      className="sxv"
      role="img"
      aria-label="Müşterinin yeri kuruluş tipini belirliyor: BAE dışına satışta serbest bölge, BAE içine satışta mainland"
    >
      <motion.g
        initial={{ opacity: 0, y: reduce ? 0 : -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: t(0.45), ease: EASE }}
      >
        <rect x="120" y="0" width="200" height="30" rx="15" className="sxv-chip-b" />
        <text x="220" y="20" className="sxv-tb" textAnchor="middle">
          Müşteriniz nerede?
        </text>
      </motion.g>

      <path d="M220 30 V40 M96 40 H344 M96 40 V43 M344 40 V43" className="sxv-line" />
      <ArrowDown x={96} y={50} />
      <ArrowDown x={344} y={50} />

      {/* seçilen taraf: mavi kutu, sağ altta tik */}
      <motion.g
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: t(0.45), delay: t(0.2), ease: EASE }}
      >
        <rect x="0" y="50" width="192" height="96" rx="14" className="sxv-box-b" />
        <text x="16" y="74" className="sxv-lbl">
          BAE dışına satıyorsanız
        </text>
        <text x="16" y="100" className="sxv-t">
          Serbest bölge
        </text>
        <text x="16" y="120" className="sxv-s">
          ticaret lisansı
        </text>
        <circle cx="168" cy="122" r="11" className="sxv-ok" />
        <Check x={161} y={115} width={14} height={14} strokeWidth={3.2} className="sxv-ic-ok" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: t(0.45), delay: t(0.32), ease: EASE }}
      >
        <rect x="248" y="50" width="192" height="96" rx="14" className="sxv-box" />
        <text x="264" y="74" className="sxv-lbl">
          BAE içine satıyorsanız
        </text>
        <text x="264" y="100" className="sxv-t">
          Mainland
        </text>
        <text x="264" y="120" className="sxv-s">
          yerel lisans
        </text>
      </motion.g>
    </svg>
  );
}

/* ---- İngiltere: kuruluşun hiçbir adımı yerinde değil ----
   Üç ülkenin ayrıştığı yer tam olarak burası: Dubai'de vize ve biyometri için
   gitmek gerekiyor, KKTC'de banka imzası yerinde atılıyor, İngiltere'de hiçbir
   adım yerinde değil. Sahnede her adımın yanındaki etiket "uzaktan" diyor;
   hiçbiri "onaylandı" demiyor — tescil kararı bizim değil. */
const UK_STEPS = ["Kimlik doğrulama", "Companies House tescili", "Kayıtlı adres ve HMRC"];

function SceneUkRemote() {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  return (
    <svg
      viewBox="0 0 440 152"
      className="sxv"
      role="img"
      aria-label="İngiltere kuruluş adımlarının hepsi uzaktan tamamlanıyor"
    >
      <text x="0" y="12" className="sxv-lbl">
        kuruluş adımları
      </text>

      <path d="M14 37 V125" className="sxv-line" />

      {UK_STEPS.map((step, i) => {
        const y = 18 + i * 44;
        return (
          <motion.g
            key={step}
            initial={{ opacity: 0, x: reduce ? 0 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: t(0.45), delay: t(0.1 + i * 0.14), ease: EASE }}
          >
            <circle cx="14" cy={y + 19} r="5" className="sxv-node-dot" />
            <rect x="28" y={y} width="412" height="38" rx="11" className="sxv-box" />
            <text x="46" y={y + 24} className="sxv-t">
              {step}
            </text>
            <rect x="336" y={y + 8} width="88" height="22" rx="11" className="sxv-chip-b" />
            <text x="380" y={y + 23} className="sxv-tb" textAnchor="middle">
              uzaktan
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ---- KKTC: hangi kapı açık, hangisi kapalı ----
   Bu sahne tek satır bile uydurmuyor: kanalların ikisi de PAY_MATRIX'ten
   okunuyor (payGroupsFor). Tablo değişirse sahne de değişir, elle güncellenmesi
   gereken bir liste yok. Kapalı kanallar gizlenmiyor, tam tersine sahnenin
   konusu onlar: bir yazılım şirketi için KKTC'nin tek belirleyici kısıtı bu ve
   ziyaretçi bunu aşağıdaki tabloya inmeden görüyor.

   İki kulvar yan yana duruyor, alt alta değil: sahne ülke başlığının YANINDA
   duran kısa bir şema ve yığılmış hâli o bloğu bir görsel boyu uzatıyordu.
   Yerleşim satır sayısından hesaplanıyor (sabit 2x2 değil): matrise bir satır
   eklenirse iki kutu birlikte uzuyor, taşma olmuyor. */
const CHIP_H = 30;
const CHIP_GAP = 7;
const BOX_PAD = 10;
const LANE_Y = 18;

function SceneKktcRails() {
  const reduce = useReducedMotion();
  const t = (v: number) => (reduce ? 0 : v);

  const groups = payGroupsFor("kktc");
  const open = groups.flatMap((g) => g.open);
  const shut = groups.flatMap((g) => g.shut);

  /* Kapalı kulvar iki sütun, açık kulvar tek sütun. İki kutu aynı boyda
     bitiyor: farklı boyda iki kutu "biri daha önemli" diye okunuyordu, oysa
     ikisi de aynı tablonun iki yüzü. */
  const boxRows = (n: number, cols: number) => Math.max(1, Math.ceil(n / cols));
  const boxHeight = (rows: number) => BOX_PAD * 2 + rows * CHIP_H + (rows - 1) * CHIP_GAP;
  const laneH = Math.max(boxHeight(boxRows(shut.length, 2)), boxHeight(boxRows(open.length, 1)));
  const height = LANE_Y + laneH + 27;

  return (
    <svg
      viewBox={`0 0 440 ${height}`}
      className="sxv"
      role="img"
      aria-label="KKTC'de açık ve kapalı tahsilat kanalları"
    >
      <text x="0" y="12" className="sxv-lbl">
        açık kanal
      </text>
      <text x="160" y="12" className="sxv-lbl">
        kapalı kanallar
      </text>

      {/* --- açık --- */}
      <rect x="0" y={LANE_Y} width="144" height={laneH} rx="13" className="sxv-box-b" />
      {open.map((r, i) => {
        const y = LANE_Y + BOX_PAD + i * (CHIP_H + CHIP_GAP);
        return (
          <motion.g
            key={r.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: t(0.4), delay: t(0.1), ease: EASE }}
          >
            {r.brand ? (
              <BrandBadge brand={r.brand} x={12} y={y + 5} size={20} radius={6} />
            ) : (
              <Landmark
                x={13}
                y={y + 7}
                width={17}
                height={17}
                strokeWidth={1.9}
                className="sxv-ic-b"
              />
            )}
            <text x="38" y={y + 20} className="sxv-t">
              {r.name}
            </text>
          </motion.g>
        );
      })}

      {/* --- kapalı: kesik kenarlık, sönük ad, eksi işareti --- */}
      <rect x="160" y={LANE_Y} width="280" height={laneH} rx="13" className="sxv-box-off" />
      {shut.map((r, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 170 + col * 132;
        const y = LANE_Y + BOX_PAD + row * (CHIP_H + CHIP_GAP);
        return (
          <motion.g
            key={r.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: t(0.4), delay: t(0.16 + i * 0.07), ease: EASE }}
          >
            <rect x={x} y={y} width="128" height={CHIP_H} rx="9" className="sxv-box-2" />
            {/* İşaret gri: renkli bir Stripe logosu, yanındaki eksiye rağmen
                "çalışıyor" diye okunuyor. globals.css'te aynı kural tahsilat
                tablosundaki işaretlere de uygulanıyor ([data-v="no"] > .bm-g) —
                bu SVG içindeki karşılığı. */}
            {r.brand && (
              <g className="sxv-off-mark">
                <BrandBadge brand={r.brand} x={x + 6} y={y + 5} size={20} radius={6} />
              </g>
            )}
            <text x={x + 32} y={y + 20} className="sxv-t sxv-t-off">
              {r.name}
            </text>
            <Minus
              x={x + 106}
              y={y + 8}
              width={14}
              height={14}
              strokeWidth={2.6}
              className="sxv-ic-dim"
            />
          </motion.g>
        );
      })}

      <text x="160" y={LANE_Y + laneH + 20} className="sxv-lbl">
        KKTC şirketiyle çalışmıyor
      </text>
    </svg>
  );
}

/* ============================================================================
   4 · KAYIT DEFTERİ — sahne sektör anahtarına bağlı, sıraya değil
   ========================================================================= */

type SceneFn = () => ReactElement;

/** Bir sahne ve altındaki tek cümle. İkisi hiçbir zaman ayrı taşınmıyor —
    ayrı iki tabloda dursalardı biri güncellenip öteki unutulduğunda sayfa
    yanlış çizimin altına doğru cümleyi basardı (bu bir kez oldu: kayıt
    anahtarı değişince yedek çizim, sektörün altyazısıyla çıktı). */
type Panel = { Scene: SceneFn; caption: string };

type SectorSceneSet = {
  /** giriş bölümündeki büyük sahne */
  hero: Panel;
  /** yalnızca varsayılandan AYRILAN ülkeler; yazılmayan ülke varsayılanı alır */
  countries?: Partial<Record<Country, Panel>>;
};

/* Altyazı sahnede yazan şeyi tekrar etmiyor, sahnenin NEDEN orada olduğunu
   söylüyor — çizim "ne", altyazı "ne anlama geliyor".

   Ülke altyazıları tek satıra sığacak uzunlukta: iki satırlık bir altyazı,
   yanındaki başlık bloğundan daha uzun bir panel demek ve bütün ülke bölümünü
   uzatıyor. Söylenecek şey zaten çizimde. */

/* Ülke sahneleri sektörden bağımsız olgular çizdiği için varsayılan burada,
   sektör kaydında değil. Yeni sektör hiçbir şey yazmadan üçünü de alıyor. */
const DEFAULT_COUNTRY_PANEL: Record<Country, Panel> = {
  dubai: { Scene: SceneDubaiFork, caption: "Kararı satış yaptığınız taraf veriyor." },
  ingiltere: { Scene: SceneUkRemote, caption: "Üç ülkede yerinde adım istemeyen tek kuruluş." },
  kktc: { Scene: SceneKktcRails, caption: "Kaynak: ödeme altyapısı tablosu." },
};

/* Kaydı olmayan sektörün düştüğü yer. Boş kutu yok. */
const FALLBACK_HERO: Panel = {
  Scene: SceneThreeCountries,
  caption: "Aynı kuruluş dosyası üç ülkede üç ayrı çerçeveye giriyor.",
};

const SECTOR_SCENES: Record<string, SectorSceneSet> = {
  "yazilim-ve-teknoloji": {
    hero: {
      Scene: SceneSoftwareMoney,
      caption:
        "Kod nerede yazılırsa yazılsın, kartı çeken altyapı şirketin hangi ülkede kurulduğuna bakıyor.",
    },
  },
};

/* ------------------------------------------------------------------ çıkışlar

   Bileşen olarak dışa veriliyorlar, fonksiyon olarak değil. Sebebi teknik:
   sayfa bir sunucu bileşeni ve bu dosya "use client"; sunucu tarafından
   çağrılan bir yardımcı fonksiyon istemci referansına dönüşür ve patlar.
   Aramayı bileşenin kendisi yapınca sınır sorunsuz geçiliyor. */

/** Giriş bölümündeki büyük sahne + altyazısı. Bilinmeyen sektör yedeğe düşer. */
export function SectorHeroScene({ slug }: { slug: string }) {
  const { Scene, caption } = SECTOR_SCENES[slug]?.hero ?? FALLBACK_HERO;

  return (
    <figure className="sxv-panel sxv-panel-lg">
      <div className="sxv-hold">
        <Scene />
      </div>
      <figcaption className="sxv-cap">{caption}</figcaption>
    </figure>
  );
}

/** Ülke bölümünün küçük şeması + altyazısı. */
export function SectorCountryScene({ slug, country }: { slug: string; country: Country }) {
  const { Scene, caption } =
    SECTOR_SCENES[slug]?.countries?.[country] ?? DEFAULT_COUNTRY_PANEL[country];

  return (
    <figure className="sxv-panel">
      <div className="sxv-hold">
        <Scene />
      </div>
      <figcaption className="sxv-cap">{caption}</figcaption>
    </figure>
  );
}
