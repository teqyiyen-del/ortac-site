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
import { BrandBadge } from "@/components/shared/BrandMark";
import { BRANDS, type BrandKey } from "@/lib/brands";
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

/* ---- dossier in, corporate account out ----
   Hangi bankalarla çalıştığımız artık yazıyla değil işaretle: kartın metni
   "Wio ve Mashreq NeoBiz" diyorsa çizimde de o iki plaka duruyor. Liste
   ülkenin kendi verisinden (`pros[].brands`) geliyor, burada sabit değil. */
function FigBank({ brands }: { brands: BrandKey[] }) {
  const list = brands.length ? brands.slice(0, 4) : (["wio", "mashreq"] as BrandKey[]);
  /* dört bankada 2 × 2 (07.10.2026 · ENBD ve FAB eklendi); hücre dar olduğu
     için kısa ad. İki bankada eskisi gibi alt alta, tam ad. */
  const KISA: Partial<Record<BrandKey, string>> = { wio: "Wio", mashreq: "Mashreq", emiratesnbd: "ENBD", fab: "FAB" };
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
        const y = dort ? 64 + Math.floor(i / 2) * 34 : 66 + i * 34;
        return (
          <g key={b}>
            <rect x={x} y={y} width={dort ? 94 : 194} height="28" rx="9" className="gv2-box" />
            <BrandBadge brand={b} x={x + 6} y={y + 4} size={20} radius={6} />
            <text x={x + 34} y={y + 18} className="gv2-t9">
              {dort ? (KISA[b] ?? BRANDS[b].title) : BRANDS[b].title}
            </text>
          </g>
        );
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
function FigYakin() {
  const [ix, iy] = NOKTA.istanbul;
  const [ax, ay] = NOKTA.ankara;
  const [lx, ly] = NOKTA.lefkosa;
  return (
    <Fig>
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
    </Fig>
  );
}

/* ---- the whole process sits inside one dashed boundary: remote ---- */
/* `etiket` / `Ikon` (27.09.2026): KKTC'nin kartı artık "uzaktan kuruluş"
   değil "tek ziyaret, gerisi bizde" (teyit · KKTC 51); aynı üç adım,
   rozet "Bizde". */
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
  const list = (brands.length ? brands : (["stripe", "paypal", "wise"] as BrandKey[])).slice(0, 4);
  /* 07.10.2026 · dört kanal sığsın diye (Amazon Payment Services, Network
     International uzun adlar): soldaki kart daraldı (72), sağdaki kutular
     genişledi (204), satır 28. Raylar kartın ortasından (y 76) açılıyor. */
  const h = 28;
  const bosluk = list.length === 4 ? 6 : 10;
  const toplam = list.length * h + (list.length - 1) * bosluk;
  const ilk = 76 - toplam / 2;
  const ys = list.map((_, i) => ilk + i * (h + bosluk));

  return (
    <Fig>
      <rect x="4" y="44" width="72" height="64" rx="13" className="gv2-box-b" />
      <rect x="15" y="57" width="22" height="16" rx="5" className="gv2-chip-w gv2-cip" />
      <path d="M26 57 V73" className="gv2-line-b gv2-cip-l" />
      <rect x="15" y="86" width="30" height="6" rx="3" className="gv2-bar-b" />
      <rect x="50" y="86" width="14" height="6" rx="3" className="gv2-bar-b gv2-faint" />

      {ys.map((y) => {
        const mid = y + h / 2;
        const d = Math.abs(mid - 76) < 1 ? "M76 76 H102" : `M76 76 C 90 76, 90 ${mid}, 102 ${mid}`;
        return <path key={`r${y}`} d={d} className="gv2-line-b gv2-flow" />;
      })}
      {ys.map((y) => (
        <ArrowR key={`a${y}`} x={102} y={y + h / 2} blue />
      ))}

      {list.map((b, i) => (
        <g key={b}>
          <rect x="112" y={ys[i]} width="204" height={h} rx="9" className="gv2-box" />
          <BrandBadge brand={b} x={118} y={ys[i] + 4} size={20} radius={6} />
          <text x={146} y={ys[i] + 18} className="gv2-t9">
            {BRANDS[b].title}
          </text>
        </g>
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
