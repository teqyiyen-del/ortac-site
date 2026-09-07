import { Stamp, Handshake, Building2, History } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import PageHero from "@/components/shared/PageHero";
import { BASIS, OPENING, WHERE } from "@/lib/about";
import { CHAIN, COUNTRY_NAME, type CountrySlug } from "@/lib/brand";

/* /lab/hakkimizda-yon · girişe dört yeni yön.
 *
 * Müşteri: "hakkımızda sayfasından da pek bişi anlamadım, çok ilgimi çekmedi."
 * Beğenilen tek şey HA1'in dayanak listesiydi; dördü de o grameri koruyor
 * (ikon/ölçü · kısa başlık · tek cümle · ayraçlı satır) ve dördü de onu başka
 * bir omurgaya asıyor: sayı · çizgi · sahne · tipografi.
 *
 * VİZYON VE MİSYON DÖRDÜNDE DE BİREBİR AYNI. about.ts'in kendi kuralı:
 * firmanın resmî ifadesi, yeniden yazılmaz. Değişen tek şey durduğu yer.
 *
 * UYDURMA OLGU YOK. Ekrandaki her sayı ve her ad ya bir diziden sayılıyor
 * (üç ülke, beş halka) ya da about.ts'te doğrulanmış hâlde duruyor. Kuruluş
 * yılı, çalışan/müşteri sayısı, lisans numarası ve adres SWAP: ile boş, o
 * yüzden hiçbir yönde geçmiyor.
 */

const ICON = { stamp: Stamp, handshake: Handshake, office: Building2, history: History } as const;

/** BASIS.cards sırası sabit ve dört yön de bu sıraya bağlı. */
const [LISANS, IFZA, OFIS, GECMIS] = BASIS.cards;

/* Sitenin kanonik okunuşu "KKTC, İngiltere ve Dubai" ve bu dize sitede
   yirmi dört yerde aynı sırayla geçiyor. WHERE.countries batıdan doğuya
   dizili (İngiltere önce) çünkü o sıra sahnedeki üç işaretin dizilişi; cümle
   ondan üretilirse aynı liste sitede iki farklı sırayla okunur. SAYI yine
   diziden geliyor, yani bir ülke eklendiğinde rakam eskimiyor. */
const ULKE_SIRA: CountrySlug[] = ["kktc", "ingiltere", "dubai"];
const ULKELER = ULKE_SIRA.map((s) => COUNTRY_NAME[s]);
const ULKE_CUMLE = `${ULKELER.slice(0, -1).join(", ")} ve ${ULKELER[ULKELER.length - 1]}`;

function ikonu(ad: string) {
  return ICON[ad as keyof typeof ICON] ?? Stamp;
}

/* Vizyon ve misyon. Tek bileşen, dört kap: `v` yalnızca CSS'in hangi
   yerleşimi seçeceğini söylüyor, metne dokunmuyor. */
function Beyan({ v }: { v?: "ed" }) {
  return (
    <div className="hyn-beyan" data-v={v}>
      {[OPENING.vision, OPENING.mission].map((b, i) => (
        <FadeUp key={b.t} delay={0.08 + i * 0.08}>
          <h3>{b.t}</h3>
          <p>{b.s}</p>
        </FadeUp>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════ YÖN 1 · LEVHA ════
   Teşhis: giriş şeridinin 786 karakterinde tek bir sayı, tarih ya da isim
   yok. Bu yön girişi ölçülebilir olanla açıyor; anlatı ölçünün ARDINDAN
   geliyor, önünden değil. */

/** Levha satırları. Sayılar dizilerden okunuyor: bir ülke ya da bir halka
 *  eklenince rakam kendiliğinden güncelleniyor, elle yazılan sayı eskimiyor. */
type LevhaSatir = { n: string; tip?: "ad"; t: string; s: string };
const LEVHA: LevhaSatir[] = [
  {
    n: String(WHERE.countries.length),
    t: "ülke",
    s: `${ULKE_CUMLE}. Üçünde de kendi ofisimiz var ve üçünü de kendimiz yürütüyoruz.`,
  },
  {
    n: String(CHAIN.length),
    t: "halkalı zincir",
    s: `${CHAIN.map((c) => c.label).join(", ")}. Zincirin tamamı aynı ekipte.`,
  },
  /* "30 yıllık" müşterinin kendi düzeltmesiyle sitedeki resmî ifade
     (about.ts · BASIS). Buradan bir KURULUŞ YILI türetilmedi: 2026-30=1996
     aritmetik olarak doğru, olgu olarak uydurma. */
  { n: "30", t: "yıllık kurumsal geçmiş", s: GECMIS.s },
  { n: "IFZA", tip: "ad", t: "resmî iş ortağı", s: IFZA.s },
  { n: "Murat Ortaç", tip: "ad", t: "Certified Accountant", s: LISANS.s },
];

export function YonLevha() {
  return (
    <>
      <PageHero
        crumb="Hakkımızda"
        /* Nokta ile biten bir CÜMLE, soru değil: sitedeki öteki on dokuz
           hero'nun grameri bu. Rakam h1'in içinde, yani ilk ekranda. */
        title="Üç ülke, beş halka, tek ekip."
        accent="tek ekip."
        lead="Vergi, muhasebe ve şirket kuruluşu. Anlatmadan önce sayılabilir olanı sayıyoruz."
      />

      <section className="sec-pad hyn-sec">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={BASIS.heading} accent={BASIS.accent} className="h2" />
            <FadeUp delay={0.2}>
              {/* BOŞ OLAN LEAD DOLUYOR (about.ts · BASIS.lead === ""). Yerine
                  giden cümle yeni değil: açılış paragrafının kanıtı tanıtan
                  ikinci cümlesi, bugün kanıttan üç ekran önce duruyor. */}
              <p className="sec-lead">{OPENING.body[1]}</p>
            </FadeUp>
          </div>

          {/* Aktarım durak sırasını CSS'ten alıyor (lab-habyon.css · nth-child),
              satır içi stilden değil: sözleşmenin bütün değerleri tek blokta
              dursun, "reduce altında ne oluyor" tek bakışta okunsun. */}
          <ul className="hyn-levha akt">
            {LEVHA.map((r, i) => (
              <FadeUp key={r.t} delay={0.08 + i * 0.05}>
                <li className="hyn-lev akt-durak">
                  <div>
                    <p className="hyn-lev-n" data-tip={r.tip}>
                      {r.n}
                    </p>
                    <p className="hyn-lev-t">{r.t}</p>
                  </div>
                  <p className="hyn-lev-s">{r.s}</p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-pad hyn-sec" data-alt="">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="h2" />
          </div>
          <FadeUp delay={0.12}>
            <p className="hyn-ed-p hyn-blok">{OPENING.body[0]}</p>
          </FadeUp>
          <Beyan />
        </div>
      </section>
    </>
  );
}

/* ═════════════════════════════════════════════════════════ YÖN 2 · SIRA ════
   Açılış paragrafının düzyazı hâli SİLİNDİ, çizim hâli kaldı: "uzayan bir
   sıra" cümlesi zaten bir eksen tarif ediyor, sayfa onu bir kez yazıp bir kez
   daha çizmek yerine yalnızca çiziyor.

   Dayanaklar ayrı bir bölüm DEĞİL, durakların notu: lisans "Muhasebe & Vergi"
   durağının, IFZA "Kuruluş" durağının altında. Aynı olguyu iki yerde basmak
   bugünkü sayfanın hastalığı; bu yön onu kaynağında çözüyor. */

/** Hangi durak hangi dayanağı taşıyor. Anahtar CHAIN.key, yani sıra değişse
 *  de eşleşme bozulmuyor. */
const DURAK_KANIT: Record<string, { icon: string; s: string }> = {
  kurulus: { icon: IFZA.icon, s: IFZA.s },
  muhasebe: { icon: LISANS.icon, s: LISANS.s },
};

export function YonSira() {
  return (
    <>
      <PageHero
        crumb="Hakkımızda"
        title="Şirket kurmak bir işlem değil, bir sıra."
        accent="bir sıra."
        lead="Tescil, banka, defter, beyan, uyum ve yenileme. Bu sıranın tamamını biz yürütüyoruz."
      />

      <section className="sec-pad hyn-sec">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text="Sıranın tamamı" accent="tamamı" className="h2" />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                {ULKE_CUMLE}: üçünde de aynı sıra işliyor. Değişen, o ülkenin kuralları.
              </p>
            </FadeUp>
          </div>

          {/* Ray bir AYRAÇ, şerit değil: durakların arasından geçiyor, hiçbir
              kutunun kenarına yapışmıyor (docs/tuzaklar.md · kural 4). */}
          <div className="hyn-eksen akt">
            <span className="hyn-ray" aria-hidden="true" />
            {CHAIN.map((s, i) => {
              const kanit = DURAK_KANIT[s.key];
              const Icon = kanit ? ikonu(kanit.icon) : Stamp;
              return (
                <FadeUp key={s.key} delay={0.08 + i * 0.06} className="hyn-durak">
                  <span className="hyn-dot akt-durak" aria-hidden="true" />
                  <span className="hyn-durak-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <b className="hyn-durak-t">{s.label}</b>
                  <span className="hyn-durak-l">{s.line}</span>
                  {kanit ? (
                    <span className="hyn-kanit">
                      <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                      <span>{kanit.s}</span>
                    </span>
                  ) : null}
                </FadeUp>
              );
            })}
          </div>

          {/* Bu iki olgu hiçbir durağa ait değil, sıranın tamamına ait. */}
          <div className="hyn-ayak">
            {[OFIS, GECMIS].map((c) => (
              <FadeUp key={c.t}>
                <b>{c.t}</b>
                <span>{c.s}</span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-pad hyn-sec" data-alt="">
        <div className="container-o">
          <div className="sec-head">
            {/* "Kim olduğumuz" başlığı bu yönde YOK: o başlığın altındaki
                düzyazı eksene dönüştü. Kalan başlık vizyon ile misyonun
                gerçekten cevapladığı soruyu soruyor. */}
            <SplitWords as="h2" text="Neyi hedefliyoruz" accent="hedefliyoruz" className="h2" />
          </div>
          <Beyan />
        </div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════════ YÖN 3 · SAHNE ════
   Sitenin kendi kart reçetesi (.hx-card + .hx-stage) hero'nun altına, TEK ve
   BÜYÜK olarak taşınıyor. /hakkimizda'nın ölçülmüş teşhisi kart duvarıydı
   (altı 3'lü ızgara + bir 4'lü); bu yönün cevabı kart eklemek değil, sayfanın
   girişini tek karta indirmek.

   SAHNE BİR İDDİA DEĞİL, SAYFADA ZATEN YAZAN ŞEYİN ÇİZİMİ: bir lisans, ondan
   çıkan üç kablo, üç ofis. Üçü de about.ts'te doğrulanmış. */

function Sahne() {
  return (
    <svg
      className="hyn-svg"
      viewBox="0 0 900 400"
      role="img"
      aria-label="Ortada bir muhasebe lisansı, ondan üç kabloyla ayrılan üç ofis: KKTC, İngiltere ve Dubai."
    >
      {/* lisans kartı */}
      <rect x="320" y="36" width="260" height="124" rx="16" fill="#111111" stroke="#262626" />
      {/* mühür · dönen halka aria-hidden değil, svg'nin tamamı zaten role=img */}
      <circle cx="372" cy="98" r="24" fill="none" stroke="#5c9eeb" strokeWidth="1.6" />
      <circle
        className="hyn-muhur"
        cx="372"
        cy="98"
        r="32"
        fill="none"
        stroke="#307fe2"
        strokeWidth="1.4"
        strokeDasharray="3 8"
      />
      <rect x="418" y="82" width="130" height="10" rx="5" fill="rgba(255,255,255,0.30)" />
      <rect x="418" y="104" width="86" height="10" rx="5" fill="rgba(255,255,255,0.16)" />

      {/* kablolar · önce sabit iz, üstünde ilerleyen kısa çizgi */}
      {[
        { d: "M450 160 V196 Q450 208 438 208 H162 Q150 208 150 220 V252", c: "hyn-hat-a" },
        { d: "M450 160 V252", c: "hyn-hat-b" },
        { d: "M450 160 V196 Q450 208 462 208 H738 Q750 208 750 220 V252", c: "hyn-hat-c" },
      ].map((w) => (
        <g key={w.c}>
          <path d={w.d} fill="none" stroke="#262626" strokeWidth="1.4" />
          <path
            className={w.c}
            d={w.d}
            pathLength="100"
            fill="none"
            stroke="#5c9eeb"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* üç ofis */}
      {[
        { x: 150, ad: COUNTRY_NAME.kktc },
        { x: 450, ad: COUNTRY_NAME.ingiltere },
        { x: 750, ad: COUNTRY_NAME.dubai },
      ].map((o) => (
        <g key={o.ad}>
          <rect
            x={o.x - 56}
            y="252"
            width="112"
            height="68"
            rx="12"
            fill="#111111"
            stroke="#262626"
          />
          {[0, 1, 2].map((c) =>
            [0, 1].map((r) => (
              <rect
                key={`${c}-${r}`}
                x={o.x - 34 + c * 24}
                y={272 + r * 22}
                width="14"
                height="12"
                rx="3"
                fill={r === 0 ? "rgba(48,127,226,0.55)" : "rgba(255,255,255,0.12)"}
              />
            )),
          )}
          <text x={o.x} y="350" textAnchor="middle">
            {o.ad}
          </text>
        </g>
      ))}

      {/* zemin · iki şeyin arasında duran 1 piksellik ayraç */}
      <line x1="54" y1="320" x2="846" y2="320" stroke="#262626" strokeWidth="1" />
    </svg>
  );
}

export function YonSahne() {
  return (
    <>
      <PageHero
        crumb="Hakkımızda"
        title="Bir lisans, üç ofis, tek zincir."
        accent="tek zincir."
        lead="Kuruluştan aylık deftere kadar bütün zinciri aynı ekip yürütüyor."
      />

      <section className="sec-pad hyn-sec">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={BASIS.heading} accent={BASIS.accent} className="h2" />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{OPENING.body[1]}</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="hyn-kart">
            <div className="hx-card">
              <div className="hx-stage hyn-sahne">
                <Sahne />
              </div>
              <div className="hyn-kart-govde">
                <p className="hyn-kicker">Dayanak</p>
                <ul className="hyn-liste">
                  {BASIS.cards.map((c) => {
                    const Icon = ikonu(c.icon);
                    return (
                      <li key={c.t}>
                        <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                        <b>{c.t}</b>
                        <span>{c.s}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="sec-pad hyn-sec" data-alt="">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="h2" />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{OPENING.lead}</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.12}>
            <p className="hyn-ed-p hyn-blok">{OPENING.body[0]}</p>
          </FadeUp>
          <Beyan />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════ YÖN 4 · MANŞET ════
   Tek sütun, büyük tipografi, ızgara yok, kart yok, sahne yok. Sayfanın
   bugünkü hâlinde göz aynı ekranda üç ayrı ritimle karşılaşıyor; burada tek
   bir okuma yönü var.

   Kendi hero'su var: PageHero'nun iki sütunlu kalibrasyonu bu yönün tezini
   bozuyor. Ölçüler yine sitenin kendi belirteçlerinden. */
export function YonManset() {
  return (
    <>
      <section className="sec-pad hyn-sec">
        <div className="container-o">
          <div className="hyn-ed">
            <p className="hyn-ed-crumb">Hakkımızda</p>
            <SplitWords
              as="h1"
              text="Kurulmak bir gün sürer, ayakta kalmak her ay."
              accent="ayakta kalmak her ay."
              base={0.1}
              className="hyn-ed-h1"
            />
            <FadeUp delay={0.26}>
              {/* Olgular ilk ekranda: üç ülke, kendi ofis, kendi lisans. */}
              <p className="hyn-ed-lead">
                {ULKE_CUMLE}. Üçünde de kendi ofisimiz ve kendi muhasebe lisansımız var.
              </p>
            </FadeUp>
            <FadeUp delay={0.34}>
              <p className="hyn-ed-p">{OPENING.body[0]}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="sec-pad hyn-sec" data-alt="">
        <div className="container-o">
          <div className="hyn-ed">
            <div className="sec-head">
              <SplitWords as="h2" text={BASIS.heading} accent={BASIS.accent} className="h2" />
            </div>
            <ol className="hyn-ed-list akt">
              {BASIS.cards.map((c, i) => (
                <FadeUp key={c.t} delay={0.06 + i * 0.06}>
                  <li>
                    <span className="hyn-ed-n akt-durak" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="hyn-ed-t">{c.t}</h3>
                      <p className="hyn-ed-s">{c.s}</p>
                    </div>
                  </li>
                </FadeUp>
              ))}
            </ol>
            <Beyan v="ed" />
          </div>
        </div>
      </section>
    </>
  );
}
