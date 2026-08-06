import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import CountUp from "@/app/hakkimizda/CountUp";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { FOR_WHOM, OPENING, SUMMARY, WHERE, type SummaryKey } from "@/lib/about";
import { SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · TABAN — bugün /hakkimizda'da canlıda olan bento

   Bu dosya BİR ADAY DEĞİL, ölçü çubuğu. Kıyas ancak dördü aynı sayfada, aynı
   kapta, aynı genişlikte durursa dürüst olur.

   CANLI SINIFLARLA basılıyor (.ab-bento · .ab-b · .ab-bo-*), yani ekranda
   görünen şey birebir bugünkü blok — yeni bir CSS yazılmadı, canlı CSS
   YALNIZCA OKUNDU. src/app/hakkimizda/** ve src/app/css/hakkimizda.css bu
   turda hiç değişmedi; CountUp da import ediliyor, kopyalanmıyor.

   İşaretleme src/app/hakkimizda/page.tsx'teki 1. bölümün bento parçasının
   aynısı. Bir gün canlı blok değişirse bu kopya eskir; o yüzden dosyanın
   başında duruyor: burası bir KAYIT, bakılacak yer canlı sayfa.

   ---------------------------------------------------- BUGÜNKÜ BLOĞUN TEŞHİSİ
   Üç hücre, üçü de beyaz, üçü de bir rakam sayıyor ve üçünün de iskeleti aynı:
   sayı + etiket + o sayının saydığı nesnelerin listesi. Ana sayfa bentosunda
   ise dört karo eşit değil, ikisi siyah, her birinin kendi mekaniği var ve
   hiçbiri bir sayı saymıyor — her biri bir cümle söyleyip onu gösteriyor.
   Adayların üçü de bu farkın üstüne kuruldu.
   ========================================================================= */

/* --- canlı sayfadaki üç bento gövdesi, birebir --- */

function BentoWhere() {
  return (
    <ul className="ab-bo ab-bo-geo">
      {WHERE.countries.map((c) => (
        <li key={c.slug}>
          <span className="ab-bo-flag" aria-hidden="true">
            <Flag country={c.slug} />
          </span>
          <b>{COUNTRY_NAME[c.slug]}</b>
        </li>
      ))}
    </ul>
  );
}

function BentoSectors() {
  return (
    <ul className="ab-bo ab-bo-sec">
      {FOR_WHOM.sectors.map((s) => {
        const Icon = SECTOR_ICON[s.slug];
        return (
          <li key={s.slug}>
            <span className="ab-bo-ic" aria-hidden="true">
              {Icon ? <Icon size={16} strokeWidth={1.9} /> : null}
            </span>
            <b>{s.label}</b>
          </li>
        );
      })}
    </ul>
  );
}

function BentoChain() {
  return (
    <ol className="ab-bo ab-bo-chain">
      {CHAIN.map((s, i) => (
        <li key={s.key}>
          <span className="ab-bo-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <b>{s.label}</b>
        </li>
      ))}
    </ol>
  );
}

const BENTO: Record<SummaryKey, () => React.ReactElement> = {
  where: BentoWhere,
  sectors: BentoSectors,
  chain: BentoChain,
};

const COUNTS: Record<SummaryKey, number> = {
  where: WHERE.countries.length,
  chain: CHAIN.length,
  sectors: FOR_WHOM.sectors.length,
};

export default function AboutBentoBase() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* Bentonun hemen üstündeki satır. Bu blok bugün vizyon/misyon
            kartlarının kuyruğunda duruyor ve kendi başlığı yok — müşterinin
            "ayrı bi bento kısmı da yapabiliriz" cümlesinin sebebi de bu. */}
        <FadeUp>
          <p className="ab-vm-note">{OPENING.statementNote}</p>
        </FadeUp>

        <div className="ab-bento">
          {SUMMARY.map((s, i) => {
            const Body = BENTO[s.k];
            return (
              <FadeUp className="ab-bento-w" key={s.k} delay={0.1 + i * 0.08} y={18}>
                <div className="ab-b">
                  <span className="ab-b-t">
                    <CountUp className="ab-b-n" to={COUNTS[s.k]} />
                    <span className="ab-b-l">{s.label}</span>
                  </span>
                  <Body />
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
