/* ============================================================================
   TELEFON İÇİN SADE SAHNELER (08.10.2026)
   Burak: "mobilde çok küçük görünecek svg görselleri baştan sade bir formatta
   tekrar üret ve mobilde görüp anlaşılacak bir hâle getir."

   NEDEN. Masaüstü çizimleri geniş bir tuvale göre çizili ve telefonda
   küçülerek basılıyor. 375 px'te ölçüldü (yazının ekrandaki gerçek boyu):
     süreç sahneleri (SetupScenes · 560 birimlik tuval)   6,3 px
     para yolu (FlowScene)                                5,3 px
     ana sayfa hizmet sahneleri (kısa kartta küçük kare)  5 px altı
   Küçültmek çare değil; telefon için ayrı, sade bir sürüm gerekiyor.

   KURAL. Telefon sürümünde yazı 14 px'in altına inmiyor (etiket 13), bir
   sahnede en çok dört satır var, süs yok. Süreç ve para yolu HTML (yazı
   kabın genişliğinden bağımsız, hep aynı boyda); hizmet kareleri yazısız SVG.

   NASIL BASILIYOR. <Ikili> iki sürümü de basıyor; hangisinin görüneceğine
   CSS karar veriyor (css/mobil-deneme.css · .m-buyuk / .m-mini). Şimdilik
   telefon sürümü yalnız deneme işaretiyle açılıyor (?mobil=yeni).
   ========================================================================= */

import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  IdCard,
  Landmark,
  Layers,
  ListChecks,
  MapPin,
  Percent,
  ScrollText,
  ShieldCheck,
  Tag,
  type LucideIcon,
} from "lucide-react";

export function Ikili({ buyuk, mini }: { buyuk: ReactNode; mini: ReactNode }) {
  return (
    <>
      <span className="m-buyuk">{buyuk}</span>
      <span className="m-mini">{mini}</span>
    </>
  );
}

/* ------------------------------------------------------------ SÜREÇ SAHNESİ
   Dokuz adım türü (SetupScenes · SceneKind). İçerik masaüstü sahnesindeki
   kelimelerle aynı: örnek şirket Velocity Trading, örnek kişi Mert Kayacan;
   hiçbir satır bir banka ya da otorite kararını ima etmiyor. */
type Satir = { ad: string; deger?: string; ok?: boolean; secili?: boolean };
type Surec = {
  Ikon: LucideIcon;
  baslik: string;
  alt?: string;
  rozet?: { t: string; ton: "ok" | "mavi" };
  buyuk?: string;
  satirlar?: Satir[];
  dip?: string;
};

const SUREC: Record<string, Surec> = {
  name: { Ikon: Tag, baslik: "Aday şirket adı", buyuk: "Velocity Trading", rozet: { t: "Uygun", ton: "ok" }, dip: "Tescil otoritesine ön başvuru iletildi" },
  form: {
    Ikon: FileText,
    baslik: "Başvuru formu",
    satirlar: [
      { ad: "Ad Soyad", deger: "Mert Kayacan", ok: true },
      { ad: "Faaliyet", deger: "E-ticaret", ok: true },
      { ad: "Ülke", deger: "Türkiye", ok: true },
    ],
  },
  activity: {
    Ikon: Layers,
    baslik: "Faaliyet",
    satirlar: [{ ad: "E-ticaret", secili: true }, { ad: "Danışmanlık" }, { ad: "Ticaret ve dağıtım" }],
    dip: "Lisans sınıfı: ticari lisans",
  },
  jurisdiction: {
    Ikon: MapPin,
    baslik: "Kuruluş tipi",
    satirlar: [
      { ad: "Serbest bölge", deger: "Dışa satış", secili: true },
      { ad: "Mainland", deger: "İç pazara" },
      { ad: "Offshore", deger: "Varlık tutma" },
    ],
  },
  licence: {
    Ikon: ScrollText,
    baslik: "Tescil ve lisans",
    rozet: { t: "Onaylandı", ton: "ok" },
    satirlar: [
      { ad: "Faaliyet sınıfı", deger: "Ticari" },
      { ad: "Geçerlilik", deger: "1 yıl" },
    ],
  },
  identity: {
    Ikon: IdCard,
    baslik: "Kimlik kartı",
    alt: "Mert Kayacan",
    satirlar: [{ ad: "Sağlık kontrolü", ok: true }, { ad: "Biyometri", ok: true }, { ad: "Kimlik başvurusu", ok: true }],
  },
  registry: {
    Ikon: ListChecks,
    baslik: "Kayıtlar",
    satirlar: [
      { ad: "Kayıtlı adres", deger: "Tanımlandı", ok: true },
      { ad: "Vergi kaydı", deger: "Açıldı", ok: true },
    ],
  },
  bank: {
    Ikon: Landmark,
    baslik: "İş hesabı",
    alt: "Velocity Trading",
    satirlar: [
      { ad: "Banka dosyası", deger: "Hazırlandı", ok: true },
      { ad: "Hesap açılışı", deger: "Tamamlandı", ok: true },
    ],
  },
  handover: {
    Ikon: FileText,
    baslik: "Paneliniz",
    rozet: { t: "Teslim edildi", ton: "ok" },
    satirlar: [{ ad: "Tescil belgesi", ok: true }, { ad: "Vergi kaydı", ok: true }, { ad: "Ana sözleşme", ok: true }],
  },
};

export function MiniSurec({ tur }: { tur: string }) {
  const s = SUREC[tur];
  if (!s) return null;
  return (
    <div className="ms">
      <div className="ms-bas">
        <span className="ms-ic">
          <s.Ikon size={17} strokeWidth={1.9} />
        </span>
        <span className="ms-bas-t">
          <b>{s.baslik}</b>
          {s.alt && <i>{s.alt}</i>}
        </span>
        {s.rozet && !s.buyuk && (
          <span className="ms-pill" data-ton={s.rozet.ton}>
            <Check size={13} strokeWidth={3} />
            {s.rozet.t}
          </span>
        )}
      </div>
      {s.buyuk && (
        <div className="ms-buyuk">
          <b>{s.buyuk}</b>
          {s.rozet && (
            <span className="ms-pill" data-ton={s.rozet.ton}>
              <Check size={13} strokeWidth={3} />
              {s.rozet.t}
            </span>
          )}
        </div>
      )}
      {s.satirlar && (
        <ul className="ms-l">
          {s.satirlar.map((r) => (
            <li key={r.ad} data-secili={r.secili ? "" : undefined}>
              {r.ok && (
                <span className="ms-tik">
                  <Check size={12} strokeWidth={3.2} />
                </span>
              )}
              <span className="ms-ad">{r.ad}</span>
              {r.deger && <span className="ms-deger">{r.deger}</span>}
              {r.secili && !r.deger && <span className="ms-deger">Seçildi</span>}
            </li>
          ))}
        </ul>
      )}
      {s.dip && (
        <p className="ms-dip">
          <ArrowDown size={14} strokeWidth={2.2} />
          {s.dip}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- PARA YOLU
   FlowScene'in telefon sürümü: iki düğüm alt alta, arada giden ve dönen. */
export function MiniAkis({
  from,
  to,
  forward,
  back,
  para,
}: {
  from: { title: string; sub?: string };
  to: { title: string; sub?: string };
  forward: string;
  back?: string;
  para?: "forward" | "back";
}) {
  return (
    <div className="ms ms-akis">
      <div className="ms-dugum">
        <b>{from.title}</b>
        {from.sub && <i>{from.sub}</i>}
      </div>
      <div className="ms-oklar">
        <span data-para={para === "forward" ? "" : undefined}>
          <ArrowDown size={15} strokeWidth={2.4} />
          {forward}
        </span>
        {back && (
          <span data-para={para === "back" ? "" : undefined} data-geri="">
            <ArrowDown size={15} strokeWidth={2.4} />
            {back}
          </span>
        )}
      </div>
      <div className="ms-dugum" data-vurgu="">
        <b>{to.title}</b>
        {to.sub && <i>{to.sub}</i>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------ ANA SAYFA HİZMETLER
   Kısa kartın solundaki kare. Yazı yok: üç dört kalın biçim, hizmetin
   kendisi. Sınıflar büyük sahnelerinkiyle aynı (.svx-*, globals.css). */
const VB = "0 0 120 96";

function Kare({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={VB} className="svx mh" focusable="false" aria-hidden="true">
      {children}
    </svg>
  );
}

const HIZMET: Record<string, () => ReactNode> = {
  /* belge ve onay mührü */
  "sirket-kurulusu": () => (
    <Kare>
      <rect x="24" y="10" width="58" height="76" rx="11" className="svx-box" />
      <rect x="36" y="26" width="34" height="5.5" rx="2.75" className="svx-bar" />
      <rect x="36" y="39" width="26" height="5.5" rx="2.75" className="svx-bar" />
      <rect x="36" y="52" width="18" height="5.5" rx="2.75" className="svx-bar" />
      <circle cx="82" cy="68" r="17" className="svx-box-b" />
      <Check x={73} y={59} width={18} height={18} strokeWidth={2.8} className="svx-ic-b" />
    </Kare>
  ),
  /* aylık sütunlar, son ay mavi */
  muhasebe: () => (
    <Kare>
      <rect x="10" y="10" width="100" height="76" rx="12" className="svx-box" />
      {[
        [24, 34],
        [40, 26],
        [56, 40],
        [72, 30],
      ].map(([x, h]) => (
        <rect key={x} x={x} y={72 - h} width="11" height={h} rx="3.5" className="svx-bar-mid" />
      ))}
      <rect x="88" y="24" width="11" height="48" rx="3.5" className="svx-bar-b" />
    </Kare>
  ),
  /* yüzde halkası ve iki onay satırı */
  vergi: () => (
    <Kare>
      <rect x="8" y="22" width="46" height="52" rx="10" className="svx-box" />
      <rect x="17" y="34" width="10" height="10" rx="3" className="svx-chip-ok" />
      <rect x="32" y="37" width="14" height="4.5" rx="2.25" className="svx-bar" />
      <rect x="17" y="52" width="10" height="10" rx="3" className="svx-chip-ok" />
      <rect x="32" y="55" width="14" height="4.5" rx="2.25" className="svx-bar" />
      <circle cx="86" cy="48" r="25" className="svx-box-b" />
      <circle cx="86" cy="48" r="25" className="svx-ring" />
      <Percent x={74} y={36} width={24} height={24} strokeWidth={2.4} className="svx-ic-b" />
    </Kare>
  ),
  /* yapı: üstte tek kutu, altında üç dal */
  "kurumsal-danismanlik": () => (
    <Kare>
      <rect x="38" y="10" width="44" height="26" rx="8" className="svx-box-b" />
      <rect x="50" y="20" width="20" height="5.5" rx="2.75" className="svx-bar-b" />
      <path d="M60 36 V48 M20 60 V48 H100 V60 M60 48 V60" className="svx-line-b" />
      <rect x="6" y="60" width="28" height="24" rx="7" className="svx-box" />
      <rect x="46" y="60" width="28" height="24" rx="7" className="svx-box" />
      <rect x="86" y="60" width="28" height="24" rx="7" className="svx-box" />
    </Kare>
  ),
  /* banka hesabından üç kanala */
  "banka-hesabi": () => (
    <Kare>
      <rect x="6" y="24" width="50" height="48" rx="11" className="svx-box-b" />
      <Landmark x={20} y={37} width={22} height={22} strokeWidth={2} className="svx-ic-b" />
      <path d="M56 48 H82 M56 48 C 68 48, 68 22, 82 22 M56 48 C 68 48, 68 74, 82 74" className="svx-line-b" />
      <rect x="84" y="10" width="28" height="22" rx="7" className="svx-box" />
      <rect x="84" y="37" width="28" height="22" rx="7" className="svx-box" />
      <rect x="84" y="64" width="28" height="22" rx="7" className="svx-box" />
      <circle cx="98" cy="21" r="4.5" className="svx-bar-b" />
      <circle cx="98" cy="48" r="4.5" className="svx-bar-b" />
      <circle cx="98" cy="75" r="4.5" className="svx-bar-b" />
    </Kare>
  ),
  /* kalkan */
  "aml-uyum": () => (
    <Kare>
      <circle cx="60" cy="48" r="38" className="svx-halo" />
      <circle cx="60" cy="48" r="27" className="svx-box-b" />
      <ShieldCheck x={44} y={32} width={32} height={32} strokeWidth={2} className="svx-ic-b" />
      <path d="M6 48 H22 M98 48 H114" className="svx-line-b" />
    </Kare>
  ),
};

export function MiniHizmet({ slug }: { slug: string }) {
  const Ciz = HIZMET[slug];
  return Ciz ? <>{Ciz()}</> : null;
}

/* küçük ok: avantaj şeritlerinde ortak */
export function MiniOk() {
  return <ArrowRight size={14} strokeWidth={2.4} />;
}
