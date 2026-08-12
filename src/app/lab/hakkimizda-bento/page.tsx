/* AboutBentoBase (taban bloğu) BİLEREK import EDİLMİYOR: canlı .ab-b* / .ab-bo*
   ad alanı Aday 7 canlıya taşınırken silindi, bileşen o sınıfları basıyor ve
   biçimsiz çıkıyor (üç bayrak da kabını kaybedip 300x150'ye şişerdi).
   Dosya yerinde duruyor, yalnızca çağrılmıyor. */
import AboutBentoKunye from "@/components/lab/AboutBentoKunye";
import AboutBentoSutun from "@/components/lab/AboutBentoSutun";
import AboutBentoLevha from "@/components/lab/AboutBentoLevha";
import AboutBentoKaro from "@/components/lab/AboutBentoKaro";
import AboutBentoBeyan from "@/components/lab/AboutBentoBeyan";
import AboutBentoYerinde from "@/components/lab/AboutBentoYerinde";
import AboutBentoAkis from "@/components/lab/AboutBentoAkis";
import AboutBentoOyma from "@/components/lab/AboutBentoOyma";
import AboutBentoMuhur from "@/components/lab/AboutBentoMuhur";

/* /hakkimizda · "Kim olduğumuz" bölümünün bentosu · 3. tur.
   Kural: etiket var, paragraf yok. 1. tur (Karo · Beyan · Yerinde) "iyi olmuş
   ama fazla bilgi", 2. tur (Akış · Oyma · Mühür) "bomboş" diye elendi; bu turun
   üçü o iki ucun arasında.
   ADAY 7 KÜNYE SEÇİLDİ ve canlıya alındı (/hakkimizda · 1. bölüm · .ab-kn-).
   Aşağıdaki blok adayın KARAR TURUNDAKİ hâli; canlı sürüm sonrasında üç tur daha
   aldı (ülke karosuna küre girdi, "diğerleriyle uyumsuz" denince geri alındı,
   ızgara ülke+sektör+dayanak / zincir olarak yeniden dengelendi).
   Bu sayfa canlı hiçbir şeye dokunmuyor. */

const CANDIDATES = [
  {
    id: "Aday 7",
    name: "Künye",
    kind: "Ana sayfanın ızgarası · etiket geri geldi",
    Section: AboutBentoKunye,
  },
  { id: "Aday 8", name: "Sütun", kind: "Dikey ızgara · dört ayrı mekanik", Section: AboutBentoSutun },
  { id: "Aday 9", name: "Levha", kind: "Afiş · yüzey kelimenin kendisi", Section: AboutBentoLevha },
];

const EX = [
  { id: "ex · Aday 1", name: "Karo", kind: "1. tur · ana sayfanın ızgarası", Section: AboutBentoKaro },
  { id: "ex · Aday 2", name: "Beyan", kind: "1. tur · gece · ton tersine", Section: AboutBentoBeyan },
  { id: "ex · Aday 3", name: "Yerinde", kind: "1. tur · yerinde kalıyor · sayaçlı", Section: AboutBentoYerinde },
  { id: "ex · Aday 4", name: "Akış", kind: "2. tur · tek makine · aktarım dalgası", Section: AboutBentoAkis },
  { id: "ex · Aday 5", name: "Oyma", kind: "2. tur · afiş · ızgara verinin kendisi", Section: AboutBentoOyma },
  { id: "ex · Aday 6", name: "Mühür", kind: "2. tur · ızgara yok · tek amblem", Section: AboutBentoMuhur },
];

/* Bu sayfanın kendi CSS'i yok: karar sayfası için ayrı bir stil dosyası açmak,
   karar verildiğinde silinecek bir dosya daha demek. */
const KICKER: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "5px 12px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue-900)",
};

const KICKER_EX: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#5c5c5c",
};

/* #307fe2, #e8f1fd kâğıdın üstünde 3,5:1 — grafik eşiğinin üstünde ve etiket
   11 punto KALIN, yani büyük metin eşiğini de geçiyor. */
const BADGE: React.CSSProperties = {
  display: "inline-block",
  marginLeft: 10,
  padding: "3px 9px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue-700)",
};

const CANLI_ID = "Aday 7";

export default function LabHakkimizdaBentoPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Hakkımızda bentosu · 3. tur
        </h1>
      </div>

      {CANDIDATES.map((c) => (
        <div key={c.id} data-blok={`${c.id} · ${c.name}`}>
          <div className="container-o" style={{ paddingTop: 40, marginTop: 32 }}>
            <b style={KICKER}>
              {c.id} · {c.name} · {c.kind}
              {c.id === CANLI_ID && <span style={BADGE}>seçildi · canlıda</span>}
            </b>
          </div>
          <c.Section />
        </div>
      ))}

      {/* ============================================================= ex */}
      <div className="container-o" style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
        <h2 className="h2" style={{ color: "var(--text-900)" }}>
          ex · önceki iki turun altı adayı
        </h2>
      </div>

      {EX.map((c) => (
        <div key={c.id} data-blok={c.id}>
          <div className="container-o" style={{ paddingTop: 40, marginTop: 32 }}>
            <b style={KICKER_EX}>
              {c.id} · {c.name} · {c.kind}
            </b>
          </div>
          <c.Section />
        </div>
      ))}

      <div style={{ paddingBottom: 72 }} />
    </main>
  );
}
