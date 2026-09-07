import type { Metadata } from "next";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import {
  AboutDayanak,
  AboutGovde,
  AboutInsan,
  AcilisHero,
} from "@/components/lab/AboutAcilis";
import { OPENING } from "@/lib/about";

/* /lab/hakkimizda-acilis — hakkımızda sayfasının GİRİŞİ.
   Kapsam: hero'dan vizyon/misyonun sonuna kadar. Canlı sayfaya bağlı değil. */

export const metadata: Metadata = {
  title: "Hakkımızda açılışı · aday kurgular | Ortac Global",
  robots: { index: false, follow: false },
};

/* Vizyon ve misyon İKİ ADAYDA DA BİREBİR AYNI ve bilerek aşağıda.
   about.ts'in kendi kuralı: firmanın resmî ifadesi, yeniden yazılmaz.
   Değişen tek şey yeri — bugün girişin yükünü onlar taşıyor. */
function Beyan() {
  return (
    <section className="sec-pad lhb-sec">
      <div className="container-o">
        <div className="ab-vm">
          {[OPENING.vision, OPENING.mission].map((v, i) => (
            <FadeUp key={v.t} delay={0.1 + i * 0.08}>
              <div className="ab-vm-card">
                <h3>{v.t}</h3>
                <p>{v.s}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- ADAY HA1 */
function AdayHA1() {
  return (
    <>
      <AcilisHero tip="dayanak" />
      <AboutDayanak />
      <AboutGovde />
      <Beyan />
    </>
  );
}

/* ---------------------------------------------------------------- ADAY HA2 */
function AdayHA2() {
  return (
    <>
      <AcilisHero tip="insan" />
      <AboutInsan />
      <AboutGovde />
      <Beyan />
    </>
  );
}

/* ---------------------------------------------- BUGÜNKÜ HÂLİ, KARŞILAŞTIRMA
   Adaylar yan yana görülemezse "daha iyi mi" sorusu cevaplanamıyor. Bugünkü
   giriş de aynı sayfada, aynı ölçekte basılıyor: hero (soru h1) + tek satırlık
   lead + "Kim olduğumuz" + iki paragraf + vizyon/misyon. */
function Bugun() {
  return (
    <>
      <section className="ph phg" style={{ paddingBlock: "clamp(90px, 11vw, 130px) clamp(56px, 7vw, 84px)" }}>
        <div className="container-o">
          <p className="ph-crumb">Ana sayfa · Hakkımızda</p>
          <h1 className="ph-title">Ortac Global kimdir?</h1>
          <p className="ph-lead">
            Vergi, muhasebe ve şirket kuruluşunda uluslararası danışmanlık: KKTC, İngiltere ve
            Dubai.
          </p>
        </div>
      </section>
      <section className="sec-pad lhb-sec">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text="Kim olduğumuz" accent="olduğumuz" className="h2" />
            <FadeUp delay={0.2}>
              <p className="sec-lead">Üç ülkede çalışan tek bir ekip.</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <p className="lhb-govde">
              Şirket kurmak tek bir işlem değil: tescil, banka hesabı, defter, beyan, uyum ve lisans
              yenilemesi diye uzayan bir sıra. Ortac Global bu sıranın tamamını üstleniyor: KKTC,
              İngiltere ve Dubai&apos;de, aynı ekiple ve Türkçe.
            </p>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="lhb-govde" style={{ marginTop: 16 }}>
              Bunun arkasında üç somut dayanak var: kendi muhasebe lisansımız, Dubai serbest
              bölgesiyle resmî iş ortaklığımız ve üç ülkenin üçünde de kendi ofisimiz.
            </p>
          </FadeUp>
        </div>
      </section>
      <Beyan />
    </>
  );
}

const ADAYLAR = [
  {
    id: "Aday HA1",
    ad: "Dayanak",
    kunye: "Hero bir iddia. Dört doğrulanabilir dayanak beşinci ekrandan ikinci ekrana çıkıyor, kart ızgarası yerine listeye dönüyor.",
    Bolum: AdayHA1,
  },
  {
    id: "Aday HA2",
    ad: "İnsan",
    kunye: "Sayfadaki tek doğrulanmış insan girişte: fotoğraf, yönetici ortak ve künye tek panelde. Fotoğraf hâlâ yer tutucu.",
    Bolum: AdayHA2,
  },
  {
    id: "bugün",
    ad: "Bugünkü giriş",
    kunye: "Karşılaştırma için. Soru h1, tek satır lead, iki paragraf, vizyon/misyon.",
    Bolum: Bugun,
  },
];

export default function HakkimizdaAcilisLab() {
  return (
    <main>
      {ADAYLAR.map(({ id, ad, kunye, Bolum }) => (
        <div key={id}>
          <div className="lhb-kunye-lab">
            <span>{id}</span>
            <h2>{ad}</h2>
            <p>{kunye}</p>
          </div>
          <Bolum />
          <hr style={{ margin: 0, border: 0, borderTop: "1px solid var(--border)" }} />
        </div>
      ))}
    </main>
  );
}
