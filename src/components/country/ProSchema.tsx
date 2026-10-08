import {
  Check,
  Landmark,
  MapPin,
  MonitorSmartphone,
  UserRound,
  Wallet,
  Zap,
  FileText,
  FileCheck,
} from "lucide-react";
import { BRANDS, type Brand, type BrandKey } from "@/lib/brands";
import { GKRY_D, KKTC_D, NOKTA, TR_D } from "@/lib/geo/trKktc";

/* Schematic drawings for the country advantage cards.
   These are not ornament: each one draws the mechanism its card describes, so
   the card carries a claim and a picture of that claim instead of two
   paragraphs. Geometry only, one blue, lucide glyphs nested inside the SVG
   (a <svg> child is legal SVG, same trick FlowScene uses).

   The `kind` key comes from countryContent's `pros[].icon`. Two of those keys
   are shared by countries that mean different things by them (`pin` is
   "ofisimiz burada" in Dubai and "Türkiye'ye yakın" in KKTC; `badge` is
   recognition in the UK and a familiar commercial order in KKTC), so those two
   figures carry no words — only the shape that is true for both readings. */

const VB = "0 0 320 152";

function Fig({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={VB} className="gv2-svg" focusable="false" aria-hidden="true">
      {children}
    </svg>
  );
}

/* 25.09.2026 · RENK (R1, Burak onayladı). `ton` sınıfları (gv2-g yeşil,
   gv2-a amber, gv2-cip kart çipi) yalnız .advx[data-renk] altında kural
   taşıyor. Kural Burak'ın cümlesiyle: "ağırlık yine mavide … şart gibi ya da
   önemli notlar amber … parayla ilgili şeylere yeşil." Yani yeşil yalnız
   para (nitelikli gelir, banka hesabı), amber şart, altın yalnız gerçek
   nesnenin kendi rengi (çip); onay tiki MAVİ, onay para değil. Kural ve ölçüm
   css/advx-renk.css'te. */
type Ton = "g" | "a";
const ton = (t?: Ton) => (t ? ` gv2-${t}` : "");

function ArrowR({ x, y, blue, t }: { x: number; y: number; blue?: boolean; t?: Ton }) {
  return (
    <path
      d={`M${x} ${y - 4.4} L${x + 6.4} ${y} L${x} ${y + 4.4} Z`}
      className={(blue ? "gv2-ah gv2-ah-b" : "gv2-ah") + ton(t)}
    />
  );
}

/* FigPercent ("Gelir → Şart → Nitelikli gelir / Şart ihlalinde standart
   oran") 27.09.2026'da silindi: Dubai ve KKTC artık kendi vergi çizimini
   taşıyor (teyit · Dubai kuruluş 3, KKTC 5). */

/* ---- 27.09.2026 · Dubai vergisi: net kâr çubuğu, ilk 375.000 AED muaf ----
   Teyit (Dubai kuruluş 3): "%0 neredeyse imkânsız … vergi net kâr üzerinden,
   oran %9, ilk 375.000 AED muaf." Eski FigPercent'in "nitelikli gelir / şart
   ihlali" kapısı Dubai'de artık yanlış anlatım. Renk kuralı: muaf dilim
   para (yeşil), vergilenen dilim vergi (amber). Çubuk ölçeksiz: dilimlerin
   oranı temsilî, rakam yazıda. */
function FigVergiDubai() {
  return (
    <Fig>
      <text x="8" y="30" className="gv2-t9">
        Net kâr
      </text>
      <rect x="8" y="46" width="124" height="44" rx="12" className="gv2-box-b gv2-g" />
      <text x="70" y="73" textAnchor="middle" className="gv2-t9 gv2-tb gv2-g">
        %0
      </text>
      <rect x="138" y="46" width="174" height="44" rx="12" className="gv2-box gv2-a" />
      <text x="225" y="73" textAnchor="middle" className="gv2-t9 gv2-tb gv2-a">
        %9
      </text>
      <path d="M8 106 V116 M132 106 V116 M8 111 H132" className="gv2-line" />
      <text x="70" y="136" textAnchor="middle">
        İlk 375.000 AED
      </text>
      <path d="M138 106 V116 M312 106 V116 M138 111 H312" className="gv2-line" />
      <text x="225" y="136" textAnchor="middle">
        Üstü
      </text>
    </Fig>
  );
}

/* ---- 27.09.2026 · KKTC vergisi: aynı şirket, iki alıcı, iki sonuç ----
   Teyit (KKTC 2, 3, 5): KKTC dışı ve Serbest Liman içi satış %0; KKTC
   içindeki yerel şirkete satışta normal vergi kuralları. */
function FigVergiKktc() {
  return (
    <Fig>
      <rect x="4" y="56" width="76" height="42" rx="13" className="gv2-box" />
      <text x="42" y="82" textAnchor="middle" className="gv2-t9">
        Satış
      </text>
      <path d="M80 77 C 102 77, 102 48, 126 48" className="gv2-line-b gv2-flow gv2-g" />
      <ArrowR x={126} y={48} blue t="g" />
      <path d="M80 77 C 102 77, 102 106, 126 106" className="gv2-line gv2-a" />
      <ArrowR x={126} y={106} t="a" />
      <rect x="136" y="22" width="180" height="52" rx="12" className="gv2-box-b gv2-g" />
      <text x="150" y="42" className="gv2-g">
        KKTC dışı · Liman içi
      </text>
      <text x="150" y="62" className="gv2-t9 gv2-tb gv2-g">
        %0
      </text>
      <rect x="136" y="82" width="180" height="52" rx="12" className="gv2-box gv2-a" />
      <text x="150" y="102" className="gv2-a">
        KKTC içi yerel şirket
      </text>
      <text x="150" y="122" className="gv2-t9">
        Normal vergi
      </text>
    </Fig>
  );
}

/* ---- LOGO PLAKASI (07.10.2026) ----
   Burak: "hepsinin logolarını bul koy … boxların spacingleri bozulmuş, text
   uzunluğundan; fixle." Banka ve tahsilat çizimlerinde satır artık "küçük
   baş harf + ad" değil, açık bir plaka ve içinde markanın KENDİ LOGOSU
   (ad logonun içinde, ayrıca yazılmıyor; taşan yazı sorunu da böyle bitti).
   Kaynak sırası: dosya (public/brands) → tam logo (wordmark yolları, renkli
   varyant varsa o) → simge + ad → yalnız ad. İç SVG `meet` ile ortalıyor;
   logo plakaya sığacak kadar küçülüyor, oranı bozulmuyor. */
function LogoPlaka({ brand, x, y, w, h }: { brand: BrandKey; x: number; y: number; w: number; h: number }) {
  const b: Brand = BRANDS[brand];
  const ix = x + 10;
  const iy = y + 5;
  const iw = w - 20;
  const ih = h - 10;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#ffffff" />
      {b.dosya ? (
        <image href={b.dosya.src} x={ix} y={iy} width={iw} height={ih} preserveAspectRatio="xMidYMid meet" />
      ) : b.wordmark ? (
        <svg x={ix} y={iy} width={iw} height={ih} viewBox={b.wordmark.viewBox} preserveAspectRatio="xMidYMid meet">
          {(b.wordmark.renkli ?? b.wordmark.parts).map((p, i) => (
            <path key={i} d={p.d} fill={p.fill ?? "#1c1c1c"} />
          ))}
        </svg>
      ) : (
        <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" style={{ fill: "#1c1c1c", fontWeight: 700 }}>
          {b.title}
        </text>
      )}
    </g>
  );
}

/* ---- dossier in, corporate account out ----
   Hangi bankalarla çalıştığımız artık yazıyla değil işaretle: kartın metni
   "Wio ve Mashreq NeoBiz" diyorsa çizimde de o iki plaka duruyor. Liste
   ülkenin kendi verisinden (`pros[].brands`) geliyor, burada sabit değil. */
function FigBank({ brands }: { brands: BrandKey[] }) {
  const list = brands.length ? brands.slice(0, 4) : (["wio", "mashreq"] as BrandKey[]);
  /* dört bankada 2 × 2 (07.10.2026 · ENBD ve FAB eklendi), iki bankada alt
     alta; her hücre bir logo plakası */
  const dort = list.length > 2;
  return (
    <Fig>
      <rect x="4" y="46" width="58" height="62" rx="12" className="gv2-box" />
      <rect x="16" y="60" width="34" height="5" rx="2.5" className="gv2-bar" />
      <rect x="16" y="72" width="28" height="5" rx="2.5" className="gv2-bar" />
      <rect x="16" y="84" width="22" height="5" rx="2.5" className="gv2-bar" />
      <text x="33" y="126" textAnchor="middle">
        Dosya
      </text>

      <path d="M66 77 H80" className="gv2-line-b gv2-flow" />
      <ArrowR x={80} y={77} blue />

      <rect x="94" y="14" width="222" height="124" rx="16" className="gv2-box" />
      <Landmark x={108} y={26} width={16} height={16} strokeWidth={2.1} className="gv2-ic-b gv2-g" />
      <text x="132" y="39" className="gv2-t9">
        Kurumsal hesap
      </text>
      <path d="M102 54 H308" className="gv2-line" />

      {list.map((b, i) => {
        const x = dort ? 108 + (i % 2) * 100 : 108;
        /* dörtlüde plaka 33 yüksek: Mashreq ve FAB logoları dik, alçak plakada
           küçük kalıyordu */
        const y = dort ? 61 + Math.floor(i / 2) * 37 : 66 + i * 34;
        return <LogoPlaka key={b} brand={b} x={x} y={y} w={dort ? 94 : 194} h={dort ? 33 : 28} />;
      })}
    </Fig>
  );
}

/* ---- the residence card itself, the artefact you end up holding ---- */
function FigId() {
  return (
    <Fig>
      <rect x="40" y="20" width="240" height="112" rx="18" className="gv2-box" />
      <rect x="60" y="42" width="56" height="64" rx="12" className="gv2-fill-paper" />
      <UserRound x={74} y={60} width={28} height={28} strokeWidth={1.9} className="gv2-ic-m" />

      <rect x="132" y="46" width="86" height="9" rx="4.5" className="gv2-bar-b" />
      <rect x="132" y="64" width="118" height="6" rx="3" className="gv2-bar" />
      <rect x="132" y="78" width="94" height="6" rx="3" className="gv2-bar" />

      <rect x="132" y="94" width="30" height="22" rx="5" className="gv2-box-b gv2-cip" />
      <path d="M147 94 V116" className="gv2-line-b gv2-cip-l" />

      <circle cx="250" cy="104" r="16" className="gv2-box-b" />
      <Check x={242} y={96} width={16} height={16} strokeWidth={2.6} className="gv2-ic-b" />
    </Fig>
  );
}

/* ---- proximity / being on the ground. Deliberately wordless. ---- */
function FigPin() {
  return (
    <Fig>
      <rect x="4" y="12" width="312" height="128" rx="18" className="gv2-box" />
      <path d="M4 54 H316 M4 102 H316" className="gv2-line gv2-faint" />
      <path d="M92 12 V140 M234 12 V140" className="gv2-line gv2-faint" />
      <rect x="108" y="112" width="44" height="22" rx="5" className="gv2-fill-paper" />
      <rect x="248" y="20" width="38" height="26" rx="5" className="gv2-fill-paper" />

      <circle cx="160" cy="74" r="40" className="gv2-halo" />
      <circle cx="160" cy="74" r="40" className="gv2-line-b gv2-dash" fill="none" />

      <path d="M78 44 L 140 66" className="gv2-line gv2-dash" />
      <path d="M240 108 L 182 88" className="gv2-line gv2-dash" />
      <rect x="52" y="30" width="28" height="28" rx="9" className="gv2-box" />
      <rect x="236" y="96" width="28" height="28" rx="9" className="gv2-box" />

      <circle cx="160" cy="74" r="21" className="gv2-box-b" />
      <MapPin x={150} y={64} width={20} height={20} strokeWidth={2.1} className="gv2-ic-b" />
    </Fig>
  );
}

/* ---- TÜRKİYE'YE YAKIN · gerçek harita · 22.09.2026 ----
   Burak: "türkiyeye yakın şeyinde türkiyeyi daha güzel gösterip harita
   üzerinden anlatabilirsin … daha az ai slop". Önceki çizim (FigPin)
   soyut bir ızgara ve ortada bir iğneydi; neye yakın olduğunu göstermiyordu.
   Şimdi Natural Earth'ten üretilmiş gerçek kıyı çizgileri (lib/geo/trKktc):
   Türkiye beyaz kara, güney Kıbrıs silik, KKTC mavi. İstanbul ve Ankara'dan
   Lefkoşa'ya iki kesik yay; kart üstüne gelince akıyor (gv2-flow). Süre ya
   da mesafe yazılmıyor: kartın cümlesi söylüyor ("bir günlük yol"). */
function YakinIc() {
  const [ix, iy] = NOKTA.istanbul;
  const [ax, ay] = NOKTA.ankara;
  const [lx, ly] = NOKTA.lefkosa;
  return (
    <>
      <path d={TR_D} className="gv2-kara" />
      <path d={GKRY_D} className="gv2-kara-silik" />
      <path d={KKTC_D} className="gv2-kktc" />
      <path d={`M${ix} ${iy} Q ${ix + 18} ${ly - 30} ${lx - 3} ${ly - 4}`} className="gv2-line-b gv2-dash gv2-flow" />
      <path d={`M${ax} ${ay} Q ${ax + 26} ${ay + 44} ${lx + 1} ${ly - 5}`} className="gv2-line-b gv2-dash gv2-flow" />
      <circle cx={ix} cy={iy} r="3.6" className="gv2-knob" />
      <circle cx={ax} cy={ay} r="3.6" className="gv2-knob" />
      <circle cx={lx} cy={ly} r="4.4" className="gv2-fill-b" />
      <text x="196" y="76" textAnchor="middle" className="gv2-t9">
        Türkiye
      </text>
      <text x={lx + 30} y={ly + 4} className="gv2-tb">
        KKTC
      </text>
    </>
  );
}

/* ---- the whole process sits inside one dashed boundary: remote ---- */
/* `etiket` / `Ikon` (27.09.2026): KKTC'nin kartı artık "uzaktan kuruluş"
   değil "tek ziyaret, gerisi bizde" (teyit · KKTC 51); aynı üç adım,
   rozet "Bizde". */
function FigYakin() {
  return (
    <Fig>
      <YakinIc />
    </Fig>
  );
}

function FigRemote({
  etiket = "Uzaktan",
  Ikon = MonitorSmartphone,
}: {
  etiket?: string;
  Ikon?: typeof MonitorSmartphone;
}) {
  const chips = [
    { x: 26, label: "Başvuru", Icon: FileText },
    { x: 121, label: "Tescil", Icon: Landmark },
    { x: 216, label: "Belgeler", Icon: FileCheck },
  ];
  return (
    <Fig>
      <rect x="4" y="30" width="312" height="104" rx="20" className="gv2-halo-soft" />
      <rect
        x="4"
        y="30"
        width="312"
        height="104"
        rx="20"
        className="gv2-line-b gv2-dash"
        fill="none"
      />

      <path d="M106 86 H113" className="gv2-line" />
      <ArrowR x={113} y={86} />
      <path d="M201 86 H208" className="gv2-line" />
      <ArrowR x={208} y={86} />

      {chips.map(({ x, label, Icon }) => (
        <g key={label}>
          <rect x={x} y="62" width="78" height="48" rx="12" className="gv2-box" />
          <Icon
            x={x + 31}
            y={70}
            width={16}
            height={16}
            strokeWidth={2.1}
            className="gv2-ic-b"
          />
          <text x={x + 39} y="102" textAnchor="middle">
            {label}
          </text>
        </g>
      ))}

      <rect x="22" y="18" width="106" height="24" rx="12" className="gv2-box-b" />
      <Ikon
        x={34}
        y={23}
        width={14}
        height={14}
        strokeWidth={2.2}
        className="gv2-ic-b"
      />
      <text x="55" y="35" className="gv2-t9 gv2-tb">
        {etiket}
      </text>
    </Fig>
  );
}

/* ---- where this country sits on the cost scale. No figures printed. ---- */
function FigWallet() {
  return (
    <Fig>
      <rect x="58" y="22" width="118" height="34" rx="12" className="gv2-box-b" />
      <Wallet x={76} y={31} width={15} height={15} strokeWidth={2.1} className="gv2-ic-b" />
      <text x="99" y="44" className="gv2-t9 gv2-tb">
        Maliyet
      </text>
      <path d="M117 56 V70" className="gv2-line-b" />

      <rect x="16" y="76" width="288" height="16" rx="8" className="gv2-track" />
      <rect x="16" y="76" width="101" height="16" rx="8" className="gv2-bar-b" />
      <circle cx="117" cy="84" r="9" className="gv2-knob" />
      <circle cx="117" cy="84" r="3.4" className="gv2-fill-b" />

      <path
        d="M16 100 V106 M88 100 V106 M160 100 V106 M232 100 V106 M304 100 V106"
        className="gv2-line gv2-faint"
      />
      <text x="16" y="126">Düşük</text>
      <text x="304" y="126" textAnchor="end">
        Yüksek
      </text>
    </Fig>
  );
}

/* ---- your paperwork gets a tick on the other side. Wordless on purpose. ---- */
function FigBadge() {
  const rows = [26, 60, 94];
  return (
    <Fig>
      <rect x="4" y="26" width="106" height="100" rx="14" className="gv2-box" />
      <rect x="20" y="46" width="66" height="7" rx="3.5" className="gv2-bar" />
      <rect x="20" y="60" width="54" height="6" rx="3" className="gv2-bar" />
      <rect x="20" y="72" width="46" height="6" rx="3" className="gv2-bar" />
      <circle cx="86" cy="104" r="16" className="gv2-box-b" />
      <Check x={78} y={96} width={16} height={16} strokeWidth={2.6} className="gv2-ic-b" />

      <path d="M110 76 C 138 76, 138 42, 166 42" className="gv2-line-b gv2-flow" />
      <path d="M110 76 H166" className="gv2-line-b gv2-flow" />
      <path d="M110 76 C 138 76, 138 110, 166 110" className="gv2-line-b gv2-flow" />
      <ArrowR x={166} y={42} blue />
      <ArrowR x={166} y={76} blue />
      <ArrowR x={166} y={110} blue />

      {rows.map((y) => (
        <g key={y}>
          <rect x="176" y={y} width="140" height="32" rx="10" className="gv2-box" />
          <rect x="190" y={y + 8} width="16" height="16" rx="5" className="gv2-chip-b" />
          <Check
            x={192}
            y={y + 10}
            width={12}
            height={12}
            strokeWidth={2.8}
            className="gv2-ic-b"
          />
          <rect x="216" y={y + 13} width="84" height="6" rx="3" className="gv2-bar" />
        </g>
      ))}
    </Fig>
  );
}

/* ---- one card, several collection rails ----
   Rayların ucundaki anonim noktalar gitti: kart "Stripe, PayPal ve Wise"
   diyorsa ekranda o üç işaret duruyor. Kanal listesi ülkenin verisinden
   geliyor; ikiye düşerse çizim iki raya iniyor. */
function FigCard({ brands }: { brands: BrandKey[] }) {
  const list = (brands.length ? brands : (["stripe", "paypal"] as BrandKey[])).slice(0, 5);
  /* 07.10.2026 · beş kanala kadar (Stripe, PayPal, Binance, Amazon Payment
     Services, Network International). Satır sayısı arttıkça satır alçalıyor;
     raylar kartın ortasından (y 76) açılıyor. Her satır bir logo plakası. */
  const h = list.length >= 5 ? 24 : 28;
  const bosluk = list.length >= 5 ? 4 : list.length === 4 ? 6 : 10;
  const toplam = list.length * h + (list.length - 1) * bosluk;
  const ilk = 76 - toplam / 2;
  const ys = list.map((_, i) => ilk + i * (h + bosluk));

  return (
    <Fig>
      <rect x="30" y="44" width="72" height="64" rx="13" className="gv2-box-b" />
      <rect x="41" y="57" width="22" height="16" rx="5" className="gv2-chip-w gv2-cip" />
      <path d="M52 57 V73" className="gv2-line-b gv2-cip-l" />
      <rect x="41" y="86" width="30" height="6" rx="3" className="gv2-bar-b" />
      <rect x="76" y="86" width="14" height="6" rx="3" className="gv2-bar-b gv2-faint" />

      {ys.map((y) => {
        const mid = y + h / 2;
        const d = Math.abs(mid - 76) < 1 ? "M102 76 H128" : `M102 76 C 116 76, 116 ${mid}, 128 ${mid}`;
        return <path key={`r${y}`} d={d} className="gv2-line-b gv2-flow" />;
      })}
      {ys.map((y) => (
        <ArrowR key={`a${y}`} x={128} y={y + h / 2} blue />
      ))}

      {list.map((b, i) => (
        <LogoPlaka key={b} brand={b} x={138} y={ys[i]} w={152} h={h} />
      ))}
    </Fig>
  );
}

/* ---- registration lands early on the timeline ---- */
function FigZap() {
  const days = [40, 64, 88, 136, 160, 184, 208, 232, 256, 280];
  return (
    <Fig>
      <rect x="60" y="22" width="104" height="32" rx="12" className="gv2-box-b" />
      <Zap x={76} y={30} width={15} height={15} strokeWidth={2.1} className="gv2-ic-b" />
      <text x="98" y="43" className="gv2-t9 gv2-tb">
        Tescil
      </text>
      <path d="M112 54 V76" className="gv2-line-b" />

      <path d="M16 92 H304" className="gv2-line" />
      <path d="M16 92 H112" className="gv2-seg" />
      {days.map((x) => (
        <path key={x} d={`M${x} 98 V106`} className="gv2-line gv2-faint" />
      ))}

      <circle cx="16" cy="92" r="5" className="gv2-fill-b" />
      <circle cx="112" cy="92" r="8" className="gv2-knob" />
      <circle cx="112" cy="92" r="3.4" className="gv2-fill-b" />
      <circle cx="208" cy="92" r="5" className="gv2-dot" />
      <circle cx="304" cy="92" r="5" className="gv2-dot" />

      <text x="16" y="128">Başvuru</text>
      <text x="304" y="128" textAnchor="end">
        Teslim
      </text>
    </Fig>
  );
}

function FigGeneric() {
  const rows = [34, 68, 102];
  return (
    <Fig>
      <rect x="34" y="18" width="252" height="116" rx="16" className="gv2-box" />
      {rows.map((y) => (
        <g key={y}>
          <rect x="54" y={y} width="18" height="18" rx="6" className="gv2-chip-b" />
          <Check
            x={56}
            y={y + 2}
            width={14}
            height={14}
            strokeWidth={2.8}
            className="gv2-ic-b"
          />
          <rect x="84" y={y + 6} width="146" height="7" rx="3.5" className="gv2-bar" />
        </g>
      ))}
    </Fig>
  );
}

/* marka listesi isteyen iki çizim ayrı tutuluyor: kalanlar hiçbir zaman
   marka basmıyor, o yüzden prop da almıyorlar */
const FIGS: Record<string, () => React.JSX.Element> = {
  "vergi-dubai": FigVergiDubai,
  "vergi-kktc": FigVergiKktc,
  id: FigId,
  pin: FigPin,
  yakin: FigYakin,
  remote: () => <FigRemote />,
  "tek-ziyaret": () => <FigRemote etiket="Bizde" Ikon={UserRound} />,
  wallet: FigWallet,
  badge: FigBadge,
  zap: FigZap,
};

/* ============================================================================
   TELEFON SÜRÜMÜ · kısa şerit (08.10.2026)
   Burak: "avantajlarda görsel yine olsun ama çok daha ona göre ölçekli ve
   sadeleştirilmiş hâli olabilir." Aynı on iki çizimin özü, 320 × 88'lik bir
   şeritte: en çok iki üç büyük biçim, yazı 14 birim (telefonda ~13 px).
   Büyük çizimle AYNI sınıflar (gv2-*), yani renk kuralı da aynı. Hangisinin
   görüneceğine CSS karar veriyor (CountryPros · Ikili). */
const VBM = "0 0 320 88";

function Mini({ children, vb = VBM }: { children: React.ReactNode; vb?: string }) {
  return (
    <svg viewBox={vb} className="gv2-svg gv2-mini" focusable="false" aria-hidden="true">
      {children}
    </svg>
  );
}

function IkiKutu({ sol, sag }: { sol: [string, string]; sag: [string, string] }) {
  return (
    <Mini>
      <rect x="2" y="8" width="148" height="72" rx="14" className="gv2-box-b gv2-g" />
      <text x="76" y="42" textAnchor="middle" className="gv2-t9 gv2-tb gv2-g gv2-buyuk">
        {sol[0]}
      </text>
      <text x="76" y="65" textAnchor="middle" className="gv2-g">
        {sol[1]}
      </text>
      <rect x="158" y="8" width="160" height="72" rx="14" className="gv2-box gv2-a" />
      {/* uzun söz ("Normal vergi") büyük puntoda kutuya sığmıyor */}
      <text x="238" y="42" textAnchor="middle" className={`gv2-t9 gv2-tb gv2-a ${sag[0].length > 4 ? "gv2-orta" : "gv2-buyuk"}`}>
        {sag[0]}
      </text>
      <text x="238" y="65" textAnchor="middle" className="gv2-a">
        {sag[1]}
      </text>
    </Mini>
  );
}

/* logo plakaları · FERAH (ikinci tur). İlk hâli şeridi kenardan kenara
   dolduruyordu; Burak: "full logo dolu oldu, çok sıkıştı." Artık iki sıra ve
   kenarlarda pay var: dörtte 2 + 2, beşte 3 + 2 (alt sıra ortalı), ikide
   tek sıra. Şerit bu çizimde biraz uzun (320 × 104). */
function MiniLogolar({ brands }: { brands: BrandKey[] }) {
  const list = brands.slice(0, 5);
  const ust = list.length <= 2 ? list : list.slice(0, list.length === 4 ? 2 : 3);
  const alt = list.length <= 2 ? [] : list.slice(ust.length);
  const w = list.length === 5 ? 86 : 124;
  const h = 34;
  const bosluk = 12;
  const sira = (l: BrandKey[], y: number) => {
    const toplam = l.length * w + (l.length - 1) * bosluk;
    const x0 = (320 - toplam) / 2;
    return l.map((b, i) => <LogoPlaka key={b} brand={b} x={x0 + i * (w + bosluk)} y={y} w={w} h={h} />);
  };
  return (
    <Mini vb="0 0 320 104">
      {alt.length > 0 ? (
        <>
          {sira(ust, 12)}
          {sira(alt, 58)}
        </>
      ) : (
        sira(ust, 35)
      )}
    </Mini>
  );
}

function MiniUcAdim({ etiket, Ikon }: { etiket: string; Ikon: typeof MonitorSmartphone }) {
  const chips = [
    { x: 2, label: "Başvuru" },
    { x: 111, label: "Tescil" },
    { x: 220, label: "Belgeler" },
  ];
  return (
    <Mini>
      <rect x="2" y="2" width="112" height="28" rx="14" className="gv2-box-b" />
      <Ikon x={14} y={8} width={16} height={16} strokeWidth={2.2} className="gv2-ic-b" />
      <text x="38" y="21" className="gv2-t9 gv2-tb">
        {etiket}
      </text>
      {chips.map(({ x, label }) => (
        <g key={label}>
          <rect x={x} y="42" width="98" height="40" rx="12" className="gv2-box" />
          <text x={x + 49} y="67" textAnchor="middle" className="gv2-t9">
            {label}
          </text>
        </g>
      ))}
      <ArrowR x={102} y={62} blue />
      <ArrowR x={211} y={62} blue />
    </Mini>
  );
}

const MINI: Record<string, () => React.JSX.Element> = {
  "vergi-dubai": () => <IkiKutu sol={["%0", "İlk 375.000 AED"]} sag={["%9", "Üstü"]} />,
  "vergi-kktc": () => <IkiKutu sol={["%0", "KKTC dışına satış"]} sag={["Normal vergi", "KKTC içine satış"]} />,
  id: () => (
    <Mini>
      <rect x="60" y="6" width="200" height="76" rx="14" className="gv2-box" />
      <rect x="74" y="20" width="42" height="48" rx="10" className="gv2-fill-paper" />
      <UserRound x={83} y={32} width={24} height={24} strokeWidth={1.9} className="gv2-ic-m" />
      <rect x="128" y="24" width="70" height="8" rx="4" className="gv2-bar-b" />
      <rect x="128" y="40" width="92" height="6" rx="3" className="gv2-bar" />
      <rect x="128" y="54" width="26" height="18" rx="5" className="gv2-box-b gv2-cip" />
      <circle cx="232" cy="58" r="14" className="gv2-box-b" />
      <Check x={224} y={50} width={16} height={16} strokeWidth={2.6} className="gv2-ic-b" />
    </Mini>
  ),
  pin: () => (
    <Mini>
      <rect x="2" y="4" width="316" height="80" rx="16" className="gv2-box" />
      <path d="M2 32 H318 M2 60 H318 M92 4 V84 M228 4 V84" className="gv2-line gv2-faint" />
      <circle cx="160" cy="44" r="30" className="gv2-halo" />
      <circle cx="160" cy="44" r="30" className="gv2-line-b gv2-dash" fill="none" />
      <circle cx="160" cy="44" r="18" className="gv2-box-b" />
      <MapPin x={150} y={34} width={20} height={20} strokeWidth={2.1} className="gv2-ic-b" />
    </Mini>
  ),
  remote: () => <MiniUcAdim etiket="Uzaktan" Ikon={MonitorSmartphone} />,
  "tek-ziyaret": () => <MiniUcAdim etiket="Bizde" Ikon={UserRound} />,
  wallet: () => (
    <Mini>
      <rect x="62" y="2" width="110" height="28" rx="14" className="gv2-box-b" />
      <Wallet x={76} y={8} width={16} height={16} strokeWidth={2.1} className="gv2-ic-b" />
      <text x="100" y="21" className="gv2-t9 gv2-tb">
        Maliyet
      </text>
      <path d="M117 30 V40" className="gv2-line-b" />
      <rect x="6" y="42" width="308" height="14" rx="7" className="gv2-track" />
      <rect x="6" y="42" width="111" height="14" rx="7" className="gv2-bar-b" />
      <circle cx="117" cy="49" r="9" className="gv2-knob" />
      <text x="6" y="80">Düşük</text>
      <text x="314" y="80" textAnchor="end">
        Yüksek
      </text>
    </Mini>
  ),
  badge: () => (
    <Mini>
      <rect x="2" y="8" width="72" height="72" rx="13" className="gv2-box" />
      <rect x="14" y="22" width="44" height="6" rx="3" className="gv2-bar" />
      <rect x="14" y="34" width="34" height="6" rx="3" className="gv2-bar" />
      <circle cx="54" cy="60" r="13" className="gv2-box-b" />
      <Check x={47} y={53} width={14} height={14} strokeWidth={2.6} className="gv2-ic-b" />
      <path d="M78 44 H92" className="gv2-line-b gv2-flow" />
      <ArrowR x={92} y={44} blue />
      {[104, 178, 252].map((x) => (
        <g key={x}>
          <rect x={x} y="26" width="66" height="36" rx="11" className="gv2-box" />
          <rect x={x + 10} y="36" width="16" height="16" rx="5" className="gv2-chip-b" />
          <Check x={x + 12} y={38} width={12} height={12} strokeWidth={2.8} className="gv2-ic-b" />
          <rect x={x + 32} y="41" width="24" height="6" rx="3" className="gv2-bar" />
        </g>
      ))}
    </Mini>
  ),
  zap: () => (
    <Mini>
      <rect x="62" y="2" width="100" height="28" rx="14" className="gv2-box-b" />
      <Zap x={76} y={8} width={16} height={16} strokeWidth={2.1} className="gv2-ic-b" />
      <text x="100" y="21" className="gv2-t9 gv2-tb">
        Tescil
      </text>
      <path d="M112 30 V42" className="gv2-line-b" />
      <path d="M8 50 H312" className="gv2-line" />
      <path d="M8 50 H112" className="gv2-seg" />
      <circle cx="8" cy="50" r="5" className="gv2-fill-b" />
      <circle cx="112" cy="50" r="8" className="gv2-knob" />
      <circle cx="112" cy="50" r="3.4" className="gv2-fill-b" />
      <circle cx="312" cy="50" r="5" className="gv2-dot" />
      <text x="4" y="80">Başvuru</text>
      <text x="316" y="80" textAnchor="end">
        Teslim
      </text>
    </Mini>
  ),
};

function MiniGenel() {
  return (
    <Mini>
      {[2, 110, 218].map((x) => (
        <g key={x}>
          <rect x={x} y="22" width="100" height="44" rx="12" className="gv2-box" />
          <rect x={x + 12} y="35" width="18" height="18" rx="6" className="gv2-chip-b" />
          <Check x={x + 14} y={37} width={14} height={14} strokeWidth={2.8} className="gv2-ic-b" />
          <rect x={x + 38} y="41" width="48" height="6" rx="3" className="gv2-bar" />
        </g>
      ))}
    </Mini>
  );
}

export function ProSchemaMini({ kind, brands = [] }: { kind?: string; brands?: BrandKey[] }) {
  if (kind === "bank") return <MiniLogolar brands={brands.length ? brands : (["wio", "mashreq"] as BrandKey[])} />;
  if (kind === "card") return <MiniLogolar brands={brands.length ? brands : (["stripe", "paypal"] as BrandKey[])} />;
  /* Türkiye ve KKTC haritası zaten sade; yalnız tuvalin boş üst ve alt payı kırpılıyor */
  if (kind === "yakin")
    return (
      <svg viewBox="0 34 320 116" className="gv2-svg gv2-mini" focusable="false" aria-hidden="true">
        <YakinIc />
      </svg>
    );
  const Ciz = (kind && MINI[kind]) || MiniGenel;
  return <Ciz />;
}

export default function ProSchema({
  kind,
  brands = [],
}: {
  kind?: string;
  brands?: BrandKey[];
}) {
  if (kind === "bank") return <FigBank brands={brands} />;
  if (kind === "card") return <FigCard brands={brands} />;
  const Draw = (kind && FIGS[kind]) || FigGeneric;
  return <Draw />;
}
