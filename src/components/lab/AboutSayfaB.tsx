import {
  Building2,
  History,
  Languages,
  LayoutDashboard,
  Users,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandChip } from "@/components/shared/BrandMark";
import { brandKeyForName } from "@/lib/brands";
import { BASIS, HERO, HOW, IDENTITY, OPENING, partnerTypes } from "@/lib/about";
import {
  CHAIN,
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PARTNERS,
  PAY_MATRIX,
  STANCE_A,
  STANCE_LIMITS,
  STANCE_Q,
  type Cell,
} from "@/lib/brand";

/* ADAY B · ZİNCİR — /hakkimizda sayfasının sıfırdan kurgusu.
   Tez: kim olduğumuz = uçtan uca ne yaptığımız. Sayfanın omurgası
   brand.ts · CHAIN; ziyaretçi zincirin başından sonuna yürüyor ve her
   halkada "bu adımı kim yapıyor, hangi ülkede" sorusunun cevabını görüyor.
   Ad alanı .hab- · biçim src/app/css/lab-hsayfa-b.css. */

/* Halka başına kanıt bloğunun etiketi. BU BEŞ DİZE BURADA YAZILDI, çünkü
   about.ts'te karşılıkları yok: bu adayın kanıt olarak kullandığı verilerin
   (PAY_MATRIX, STANCE_Q/A, FACTS.days, FACTS.limit) hiçbiri canlı
   /hakkimizda'da basılmıyor, dolayısıyla onları tanıtan bir etiket de hiç
   yazılmamış. Hiçbiri OLGU İDDİASI DEĞİL; altındaki verinin ne olduğunu
   söyleyen arayüz etiketleri. Aday onaylanırsa kalıcı yerleri about.ts. */
const PROOF_LABEL: Record<string, string> = {
  kurulus: "Üç ülke, üç tescil düzeni",
  banka: "Hangi kanal hangi ülkede açık",
  muhasebe: "İmzayı kim atıyor",
  uyum: "En sık gelen soru",
  oturum: "Her ülkenin dürüst sınırı",
};

/* İlke ikonları. about.ts `icon` alanını dize olarak taşıyor (o dosya JSX
   bilmiyor), eşleme burada kuruluyor. Canlı sayfadaki eşlemenin aynısı. */
const PRINCIPLE_ICON: Record<string, LucideIcon> = {
  team: Users,
  language: Languages,
  panel: LayoutDashboard,
};

/* PAY_MATRIX hücresinin ekran karşılığı. İşaretler brand.ts'in kendi
   açıklama satırından birebir alındı ("✓ var · – yok/ilgisiz · ✗
   desteklenmiyor"), yani sözlük veriyle aynı yerden geliyor.

   Sözcük ayrıca `aria-label` olarak hücreye yazılıyor: görsel olarak gizli
   <span> bu depoda üç kez erişilebilirlik ağacına çıkmadı (tuzaklar.md · G),
   o yüzden .sr-only yerine doğrudan etiket kullanılıyor. */
const CELL_GLYPH: Record<Cell, string> = { yes: "✓", no: "✗", none: "–" };
const CELL_WORD: Record<Cell, string> = {
  yes: "var",
  no: "desteklenmiyor",
  none: "yok veya ilgisiz",
};

/* ---------------------------------------------------------------- SAHNELER
   Halka başına bir gece çizim paneli. Beşi de aynı kutuya (300x168) çiziliyor
   ve beşinin de TEK sürekli animasyonu var; hepsi aynı periyodu (31,3 s)
   paylaşıp faz kaydırıyor. Neden aynı periyot: beş ayrı süre, sitedeki
   listeye beş yeni periyot ekler ve hepsinin birbirine asal olması gerekirdi
   (tuzaklar.md · K). Aynı periyot + farklı gecikme sitenin kendi kalıbı
   (shared/PageHero.tsx · Lite). Faz farkı CSS'te, gecikme kısayolun İÇİNDE
   yazılı (tuzak F: ayrı `animation-delay` CSSOM'da boş serileşiyor).

   Hareketin tamamı CSS'te ve `prefers-reduced-motion` kapısının arkasında;
   render ağacında hiçbir hareket değeri okunmuyor (tuzak A). */

/* 1 · Kuruluş — lisans levhası ve üstüne inen mühür halkası. */
function StageKurulus() {
  return (
    <svg viewBox="0 0 300 168" className="hab-svg" aria-hidden="true" focusable="false">
      <rect x="40" y="16" width="140" height="136" rx="9" className="hab-sheet" />
      <rect x="58" y="40" width="86" height="6" rx="3" className="hab-ink hab-ink-a" />
      <rect x="58" y="60" width="104" height="5" rx="2.5" className="hab-ink" />
      <rect x="58" y="76" width="92" height="5" rx="2.5" className="hab-ink" />
      <rect x="58" y="92" width="100" height="5" rx="2.5" className="hab-ink" />
      <rect x="58" y="108" width="70" height="5" rx="2.5" className="hab-ink" />
      <circle cx="212" cy="96" r="34" className="hab-seal" />
      <circle cx="212" cy="96" r="23" className="hab-seal-in" />
      <path d="M200 96 l8 9 16 -19" className="hab-seal-tick" />
    </svg>
  );
}

/* 2 · Banka & Ödeme — üç kanal tek hesapta birleşiyor, üçünde de birer paket
   yürüyor. Paketler `stroke-dashoffset` ile taşınıyor. */
function StageBanka() {
  const D = [
    "M14 30 H92 C126 30 126 84 160 84 H228",
    "M14 84 H228",
    "M14 138 H92 C126 138 126 84 160 84 H228",
  ];
  return (
    <svg viewBox="0 0 300 168" className="hab-svg" aria-hidden="true" focusable="false">
      {D.map((d) => (
        <path key={d} d={d} className="hab-wire" />
      ))}
      {D.map((d, i) => (
        <path key={`p${i}`} d={d} className={`hab-pkt hab-pkt-${i + 1}`} />
      ))}
      <rect x="228" y="54" width="58" height="60" rx="11" className="hab-box" />
      <rect x="244" y="72" width="26" height="5" rx="2.5" className="hab-ink hab-ink-a" />
      <rect x="244" y="86" width="18" height="5" rx="2.5" className="hab-ink" />
    </svg>
  );
}

/* 3 · Muhasebe & Vergi — defter ızgarası; son sütun sırayla doluyor, altta
   imza satırı. Sekiz çubuk aynı animasyonu farklı gecikmeyle çalıştırıyor. */
function StageMuhasebe() {
  /* Dört satır, üç sütun. Üçüncü sütun sırayla doluyor: kaydın nereye
     yazıldığı görünüyor, sayı uydurulmuyor (çubuklar yalnız çubuk). */
  const ROWS = [0, 1, 2, 3];
  const W3 = [56, 40, 50, 34];
  return (
    <svg viewBox="0 0 300 168" className="hab-svg" aria-hidden="true" focusable="false">
      <rect x="24" y="14" width="252" height="112" rx="8" className="hab-sheet" />
      <path d="M24 40 H276" className="hab-grid" />
      <path d="M110 14 V126 M186 14 V126" className="hab-grid" />
      {ROWS.map((r) => (
        <rect key={`a${r}`} x="40" y={54 + r * 18} width="54" height="6" rx="3" className="hab-ink" />
      ))}
      {ROWS.map((r) => (
        <rect key={`b${r}`} x="126" y={54 + r * 18} width="44" height="6" rx="3" className="hab-ink" />
      ))}
      {ROWS.map((r) => (
        <rect
          key={`c${r}`}
          x="202"
          y={54 + r * 18}
          width={W3[r]}
          height="6"
          rx="3"
          className={`hab-fill hab-fill-${r + 1}`}
        />
      ))}
      <path d="M24 146 H150" className="hab-grid" />
      <path d="M34 142 c10 -12 16 4 24 -2 c8 -6 10 8 20 0 c8 -6 14 6 22 2" className="hab-sign" />
    </svg>
  );
}

/* 4 · Uyum — kalkanın konturu sürekli çiziliyor, içinde üç denetim satırı. */
function StageUyum() {
  return (
    <svg viewBox="0 0 300 168" className="hab-svg" aria-hidden="true" focusable="false">
      <path
        d="M150 10 L226 38 V92 C226 124 188 148 150 158 C112 148 74 124 74 92 V38 Z"
        className="hab-shield"
      />
      <path
        d="M150 10 L226 38 V92 C226 124 188 148 150 158 C112 148 74 124 74 92 V38 Z"
        className="hab-shield-run"
      />
      <path d="M104 66 l8 9 16 -19" className="hab-check" />
      <rect x="140" y="60" width="60" height="6" rx="3" className="hab-ink" />
      <path d="M104 100 l8 9 16 -19" className="hab-check" />
      <rect x="140" y="94" width="48" height="6" rx="3" className="hab-ink" />
      <path d="M104 134 l8 9 16 -19" className="hab-check" />
      <rect x="140" y="128" width="54" height="6" rx="3" className="hab-ink" />
    </svg>
  );
}

/* 5 · Oturum & Vize — kimlik kartı ve üstünde yavaşça inen okuma şeridi. */
function StageOturum() {
  return (
    <svg viewBox="0 0 300 168" className="hab-svg" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="hab-id-clip">
          <rect x="34" y="26" width="232" height="116" rx="12" />
        </clipPath>
      </defs>
      <rect x="34" y="26" width="232" height="116" rx="12" className="hab-sheet" />
      <rect x="54" y="46" width="64" height="76" rx="8" className="hab-box" />
      <circle cx="86" cy="70" r="12" className="hab-ink-c" />
      <path d="M64 112 c4 -18 40 -18 44 0" className="hab-ink-c" />
      <rect x="136" y="50" width="102" height="7" rx="3.5" className="hab-ink hab-ink-a" />
      <rect x="136" y="70" width="80" height="6" rx="3" className="hab-ink" />
      <rect x="136" y="88" width="92" height="6" rx="3" className="hab-ink" />
      <rect x="136" y="106" width="64" height="6" rx="3" className="hab-ink" />
      <g clipPath="url(#hab-id-clip)">
        <rect x="34" y="0" width="232" height="20" className="hab-scan" />
      </g>
    </svg>
  );
}

const STAGE: Record<string, () => React.ReactElement> = {
  kurulus: StageKurulus,
  banka: StageBanka,
  muhasebe: StageMuhasebe,
  uyum: StageUyum,
  oturum: StageOturum,
};

/* ------------------------------------------------------------------ KANITLAR
   Her halkanın kanıt bloğu BAŞKA BİR ŞEKİL. Canlı sayfanın en somut
   şikâyeti "dokuz kart birebir aynı kompozisyon"du (kuyulu ikon + h3 + p);
   burada beş halkanın beşi ayrı biçim kullanıyor: künye satırları, matris,
   tek beyan, soru-cevap, sınır listesi. */

/* 1 · Kuruluş — üç ülkenin tescil düzeni ve tipik süresi. `days` alanı
   /hakkimizda'da bugün hiç basılmıyor. */
function ProofKurulus() {
  return (
    <>
      <ul className="hab-cty">
        {COUNTRY_ORDER.map((c) => (
          <li className="hab-cty-r" key={c}>
            {/* Kap SABİT px + overflow:hidden. Flag çıplak <svg> basıyor,
                width/height taşımıyor; serbest bir kapta 300x150'ye şişip
                sayfayı bozuyor (tuzaklar.md · H, bu depoda iki kez). */}
            <span className="hab-flag">
              <Flag country={c} />
            </span>
            <b className="hab-cty-n">{COUNTRY_NAME[c]}</b>
            <span className="hab-cty-s">{FACTS[c].structure}</span>
            <span className="hab-cty-d data">{FACTS[c].days}</span>
          </li>
        ))}
      </ul>
      {/* IFZA dayanağı tam olarak bu halkanın altında duruyor: serbest bölge
          başvurusu kuruluş halkasının kendisi. Canlı sayfada dört dayanak
          kartı tek bir ızgarada toplanmıştı ve hangi adıma ait oldukları
          görünmüyordu. */}
      <p className="hab-note">
        <b>{BASIS.cards[1].t}.</b> {BASIS.cards[1].s}
      </p>
    </>
  );
}

/* 2 · Banka & Ödeme — PAY_MATRIX. Sitenin en somut "hangi ülkede" cevabı ve
   /hakkimizda'da bugün hiç kullanılmıyor. KKTC'nin ✗'leri gizlenmiyor. */
function ProofBanka() {
  return (
    <>
      {/* overflow-x:auto olan kap position:relative — yoksa mutlak konumlu
          torunlar dışarı kaçıp belgeyi uzatıyor (tuzaklar.md · C). */}
      <div className="hab-mx-wrap">
        {/* Tablonun adı bölümün kendi etiketi. `aria-labelledby` ile alttaki
            sözlüğe bağlanmıyordu: o satır tablonun adı değil, işaretlerin
            karşılığı. */}
        <table className="hab-mx" aria-label={PROOF_LABEL.banka}>
          <thead>
            <tr>
              <th scope="col" className="hab-mx-h">
                Kanal
              </th>
              {COUNTRY_ORDER.map((c) => (
                <th scope="col" key={c} className="hab-mx-hc">
                  {COUNTRY_NAME[c]}
                </th>
              ))}
            </tr>
          </thead>
          {PAY_MATRIX.map((g) => (
            <tbody key={g.title}>
              <tr>
                {/* Her grup kendi <tbody>'si, o yüzden `rowgroup`: başlık
                    altındaki satırların tamamını kapsıyor. */}
                <th scope="rowgroup" colSpan={4} className="hab-mx-g">
                  {g.title}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row" className="hab-mx-r">
                    {r.name}
                  </th>
                  {COUNTRY_ORDER.map((c) => (
                    <td
                      key={c}
                      className="hab-mx-c"
                      data-v={r.cells[c]}
                      aria-label={CELL_WORD[r.cells[c]]}
                    >
                      <span aria-hidden="true">{CELL_GLYPH[r.cells[c]]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      {/* Sözlük: üç işaretin karşılığı. Sözcükler brand.ts'in kendi açıklama
          satırından geliyor, burada uydurulmadı. */}
      <p className="hab-legend">
        <span>
          <i aria-hidden="true">✓</i> var
        </span>
        <span>
          <i aria-hidden="true">–</i> yok veya ilgisiz
        </span>
        <span>
          <i aria-hidden="true">✗</i> desteklenmiyor
        </span>
      </p>
    </>
  );
}

/* 3 · Muhasebe & Vergi — tek beyan, büyük punto. Sayfanın en somut cümlesi
   bu: iddia değil, imzanın hangi sıfatla atıldığı. */
function ProofMuhasebe() {
  return (
    <div className="hab-say">
      <b className="hab-say-t">{BASIS.cards[0].t}</b>
      <p className="hab-say-s">{BASIS.cards[0].s}</p>
    </div>
  );
}

/* 4 · Uyum — firmanın resmî duruşu, soru ve cevap olarak. brand.ts'teki
   STANCE_Q / STANCE_A ikilisi bugün /hakkimizda'da hiç basılmıyor. */
function ProofUyum() {
  return (
    <div className="hab-qa">
      <p className="hab-q">{STANCE_Q}</p>
      <p className="hab-a">{STANCE_A}</p>
    </div>
  );
}

/* 5 · Oturum & Vize — üç ülkenin dürüst sınırı. `limit` alanı ülke başına bir
   tane ve brief'e göre asla atlanmıyor; /hakkimizda'da bugün hiç basılmıyor. */
function ProofOturum() {
  return (
    <ul className="hab-lim">
      {COUNTRY_ORDER.map((c) => (
        <li key={c}>
          <b>{COUNTRY_NAME[c]}</b>
          <span>{FACTS[c].limit}</span>
        </li>
      ))}
    </ul>
  );
}

const PROOF: Record<string, () => React.ReactElement> = {
  kurulus: ProofKurulus,
  banka: ProofBanka,
  muhasebe: ProofMuhasebe,
  uyum: ProofUyum,
  oturum: ProofOturum,
};

/* --------------------------------------------------------------- ORTAK MARKA
   Canlı sayfadaki kalıbın aynısı: satırda rol metni yok, yalnız logo. Rolü
   üstteki tür başlığı zaten söylüyor ve IFZA'nın rolündeki "· resmî iş
   ortağı" yarısı buraya sızarsa müşterinin kaldırdığı ayrım geri gelir. */
function Mark({ name }: { name: string }) {
  const key = brandKeyForName(name);
  return <li className="hab-pm">{key ? <BrandChip brand={key} optical={15} /> : <b>{name}</b>}</li>;
}

export default function AboutSayfaB() {
  const groups = partnerTypes(PARTNERS);
  /* Künye: değeri olmayan satır hiç basılmıyor. Kural about.ts'te yazılı ve
     burada da geçerli; bugün yedi satırın üçü dolu. */
  const idRows = IDENTITY.rows.filter((r) => r.value.trim() !== "");

  /* Kap YOK, parça (fragment) var: beş bölüm doğrudan sayfanın akışına
     giriyor. Sarmalayıcı bir <div> ekleseydik ya kuralsız bir sınıf adı
     (css-check tabanını bir artırırdı) ya da hiçbir işi olmayan bir DOM
     düğümü kalırdı. */
  return (
    <>
      {/* ================= A · KANCA =================
          Sayfanın en zayıf yeri bugün burasıydı: sitenin sekiz sayfası içinde
          en kısa (416 px) ve tek görselsiz hero. Bu aday hero'yu ayrı bir
          bileşene bırakmıyor, açılışı sayfanın kendi bölümü yapıyor: soru,
          tek cümlelik tanım, tezin iki paragrafı ve zincirin TAMAMI tek
          bakışta. Fotoğraf yok; ağırlık çizimden ve zeminden geliyor. */}
      <section className="sec-pad hab-hook">
        <div className="container-o">
          <div className="hab-hook-top">
            <div className="hab-hook-l">
              <span className="hab-crumb">{HERO.crumb}</span>
              <SplitWords
                as="h1"
                text={HERO.title}
                accent={HERO.accent}
                accentColor="var(--blue-500)"
                className="hab-h1"
              />
              <FadeUp delay={0.16}>
                <p className="hab-hook-lead">{HERO.lead}</p>
              </FadeUp>
            </div>

            {/* Tezin iki paragrafı. Birincisi bu adayın varlık sebebi:
                "şirket kurmak tek bir işlem değil ... bu sıranın tamamını
                üstleniyor". Sayfanın geri kalanı o sıranın kendisi. */}
            <div className="hab-hook-r">
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.24 + i * 0.08}>
                  <p className="hab-hook-p" data-first={i === 0 ? "" : undefined}>
                    {p}
                  </p>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* ZİNCİRİN HARİTASI. Yürümeden önce güzergâhın tamamı. Aşağıdaki
              beş bölüm bu rayın açılmış hâli, o yüzden numaralar birebir
              eşleşiyor. Ray boyunca sürekli bir ışık yürüyor (43,1 s). */}
          <div className="hab-map">
            <ol className="hab-map-l">
              {CHAIN.map((k, i) => (
                <li className="hab-map-i" key={k.key}>
                  <span className="hab-map-d" aria-hidden="true" />
                  <b className="hab-map-n data">{String(i + 1).padStart(2, "0")}</b>
                  <span className="hab-map-t">{k.label}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Zincirin tamamının KİMDE olduğu bir kez burada söyleniyor, her
              halkada tekrar edilmiyor. Canlı sayfanın ölçülen kusuru buydu:
              "taşerona vermiyoruz" üç ayrı yerde yazıyordu. Aşağıda o cevabı
              metin değil, kesintisiz omurga taşıyor. */}
          <ul className="hab-prin">
            {HOW.principles.map((p, i) => {
              const Icon = PRINCIPLE_ICON[p.icon] ?? Users;
              return (
                /* FadeUp <li>'nin İÇİNDE: <ul> yalnız <li> çocuğu kabul eder,
                   sarmalayıcı <div> araya girerse işaretleme geçersiz olur. */
                <li className="hab-prin-i" key={p.t}>
                  <FadeUp delay={0.2 + i * 0.07} y={14}>
                    <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                    <b>{p.t}</b>
                    <span>{p.s}</span>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= B · BEŞ HALKA =================
          Sayfanın gövdesi. Tek bir omurga yukarıdan aşağı kesintisiz iniyor;
          her halka o omurgada bir düğüm. Bölümler kart DEĞİL: kenarlık,
          zemin ve yuvarlaklık yok, dolayısıyla omurga bir kartın sol şeridi
          gibi okunmuyor (kural: kartlarda renkli ince sol/üst şerit yasak).
          Çizim paneli ile kanıt bloğu halkadan halkaya yer değiştiriyor. */}
      <section className="sec-pad hab-body">
        <div className="container-o">
          <div className="hab-head">
            <SplitWords as="h2" text={HOW.heading} accent={HOW.accent} className="h2" />
            <FadeUp delay={0.16}>
              <p className="sec-lead">{HOW.lead}</p>
            </FadeUp>
          </div>

          <div className="hab-links">
            {CHAIN.map((k, i) => {
              const Stage = STAGE[k.key];
              const Proof = PROOF[k.key];
              return (
                <div className="hab-l" key={k.key} data-i={i % 2 === 0 ? "a" : "b"}>
                  <div className="hab-l-rail" aria-hidden="true">
                    <span className="hab-node" />
                  </div>

                  <div className="hab-l-in">
                    <FadeUp y={18}>
                      <div className="hab-l-head">
                        <b className="hab-l-n data">{String(i + 1).padStart(2, "0")}</b>
                        <h3 className="hab-l-t">{k.label}</h3>
                        <p className="hab-l-s">{k.line}</p>
                      </div>
                    </FadeUp>

                    <div className="hab-l-body">
                      <FadeUp className="hab-l-stage" delay={0.12} y={18}>
                        <div className="hab-stage">{Stage ? <Stage /> : null}</div>
                      </FadeUp>

                      <FadeUp className="hab-l-proof" delay={0.2} y={18}>
                        <div>
                          <h4 className="hab-l-pl">{PROOF_LABEL[k.key]}</h4>
                          {Proof ? <Proof /> : null}
                        </div>
                      </FadeUp>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= C · KARŞI TARAF =================
          Zincirin her halkasında karşımızda bir kurum var. Canlı sayfada bu
          liste dayanak bölümünün kuyruğuydu; burada kendi zemininde ve
          zincirin hemen ardında duruyor, çünkü söylediği şey tam olarak
          "bu güzergâh boyunca kimlerle muhatap oluyoruz". */}
      <section className="sec-pad hab-ptn">
        <div className="container-o">
          <div className="hab-head">
            <SplitWords as="h2" text={BASIS.partners.t} accent="çalıştığımız" className="h2" />
            <FadeUp delay={0.16}>
              <p className="sec-lead">{BASIS.partners.s}</p>
            </FadeUp>
          </div>

          <dl className="hab-ptypes">
            {groups.map((g, i) => (
              <FadeUp className="hab-ptype" key={g.type} delay={0.14 + i * 0.05} y={12}>
                <dt>{g.type}</dt>
                <dd>
                  <ul className="hab-pmarks">
                    {g.names.map((n) => (
                      <Mark key={n} name={n} />
                    ))}
                  </ul>
                </dd>
              </FadeUp>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= D · ZİNCİRİN DIŞI =================
          Zincirin bir sonu var ve nerede bittiği yazılı. Kart ızgarası değil,
          üç numaralı satır: sayfada bu şekli başka hiçbir blok kullanmıyor.
          Hiçbiri bir tıklamanın arkasında değil (bu sayfada kapalı <details>
          bir kez denendi ve müşteri metni hiç görmedi). */}
      <section className="sec-pad hab-out">
        <div className="container-o">
          <div className="hab-head hab-head-d">
            <SplitWords
              as="h2"
              text={HOW.limits.t}
              accent="taahhüt etmiyoruz"
              accentColor="var(--blue-500)"
              className="h2"
            />
            <FadeUp delay={0.16}>
              <p className="sec-lead sec-lead-dark">{HOW.limits.s}</p>
            </FadeUp>
          </div>

          <ol className="hab-limits">
            {STANCE_LIMITS.map((l, i) => (
              /* FadeUp <li>'nin içinde, gerekçe yukarıdaki ilke listesiyle
                 aynı: <ol> yalnız <li> çocuğu kabul ediyor. */
              <li className="hab-limit" key={l.title}>
                <FadeUp delay={0.12 + i * 0.06} y={14}>
                  <b className="data">{String(i + 1).padStart(2, "0")}</b>
                  <h3>{l.title}</h3>
                  <p>{l.line}</p>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= E · KAPANIŞ =================
          Sayfa açtığı soruya dönüyor. Solda zincirin nereden geldiği (iki
          doğrulanmış olgu, kart değil ölçü satırı), sağda nereye gittiği:
          vizyon ve misyon.

          VİZYON VE MİSYON SAYFANIN SON SÖZÜ. Canlı sayfada ikisi ortada, iki
          birbirinin aynı beyaz kartta duruyordu ve müşterinin cümlesi
          "vizyon misyon kısımları çok sönük kalmış" idi. Burada kendi mavi
          levhalarında ve büyük puntoda; zemin --blue-900 çünkü marka mavisi
          #307fe2 üstünde beyaz metin 3,99:1 ile normal punto eşiğinin altına
          düşüyor, --blue-900 ise 7:1'in üstünde.

          Metinler firmanın kendi resmî ifadesi, tek harfi değişmedi. Bunu
          söyleyen şerh müşteri isteğiyle ekrandan kalktı; kural yalnızca
          about.ts'teki yorumda ve burada duruyor. */}
      <section className="sec-pad hab-close">
        <div className="container-o">
          <div className="hab-head">
            <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="h2" />
          </div>

          <div className="hab-close-g">
            <div className="hab-ground">
              {[BASIS.cards[2], BASIS.cards[3]].map((c, i) => {
                const Icon = i === 0 ? Building2 : History;
                return (
                  <FadeUp key={c.t} delay={0.12 + i * 0.08} y={14}>
                    <div className="hab-gr">
                      <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                      <h3>{c.t}</h3>
                      <p>{c.s}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>

            <FadeUp className="hab-vm" delay={0.18} y={20}>
              <div>
                {[OPENING.vision, OPENING.mission].map((s) => (
                  <div className="hab-vm-i" key={s.t}>
                    <h3 className="hab-vm-t">{s.t}</h3>
                    <p className="hab-vm-s">{s.s}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* KÜNYE TEK SATIR. Bu blok /hakkimizda'da üç kez yeniden çizildi ve
              üç kez itiraz aldı; ölçülen sorun biçim değil oran: 254 px'lik
              bir blok sayfanın en çok tartışılan yeriydi. Burada bir bölüm
              değil, kapanışın altındaki tek satırlık kayıt. */}
          <FadeUp delay={0.24}>
            <dl className="hab-col">
              {idRows.map((r) => (
                <div className="hab-col-i" key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* TEK ÇIKIŞ. Canlı sayfa arka arkaya iki kapanış çağrısıyla
              bitiyordu (8. bölüm + FinalCta, aradaki tek fark düğme metni). */}
          <FadeUp delay={0.3}>
            <div className="hab-cta">
              <AskCta />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
