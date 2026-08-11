import Image from "next/image";
import {
  Building2,
  Boxes,
  ChartCandlestick,
  Code2,
  Compass,
  Handshake,
  History,
  Stamp,
  Stethoscope,
  Target,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import CountUp from "@/app/hakkimizda/CountUp";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { TEAM_PHOTO } from "@/lib/media";
import { BASIS, FOR_WHOM, OPENING, SUMMARY, WHERE, type SummaryKey } from "@/lib/about";

/* ============================================================================
   TABAN — bugün /hakkimizda sayfasının 1. bölümünde ne varsa o.
   Ad alanı: sarmalayıcı .hkl-taban, İÇERİDE CANLI SINIFLAR (.ab-*).

   ---------------------------------------------------- NEDEN CANLI SINIFLAR
   Bir taban bloğunun tek işi "bugün ekranda ne var" sorusuna cevap vermek.
   Kendi kopya CSS'ini yazsaydım, canlı sayfada yarın yapılan bir düzeltme
   buraya yansımaz ve taban sessizce yalan söylemeye başlardı; üç adayın
   tamamı yanlış bir ölçüte göre kıyaslanırdı. O yüzden bu blok canlı
   hakkimizda.css'i OKUYOR ve tek satır bile yeniden tanımlamıyor.

   BEDELİ BİR KEZ ÖDENDİ VE KAYDA GEÇTİ: önceki lab turunda (hakkimizda-bento)
   taban aynı şekilde canlı sınıflara bağlıydı, kazanan canlıya taşınırken o ad
   alanı hakkimizda.css'ten silindi ve taban biçimsiz kaldı; bayraklar kabını
   kaybedip 300 x 150'ye açıldı. Bu turda aynı tuzağa karşı lab-hak.css'te
   TEK BİR SİGORTA var: .hkl-taban içindeki her <svg> kabına sığdırılıyor.
   Sigorta biçim vermiyor, yalnızca kaza büyüklüğünü sınırlıyor.

   ------------------------------------------------------------- NE KOPYALANDI
   İşaretleme /hakkimizda sayfasından birebir alındı: aynı sıra, aynı sınıflar,
   aynı FadeUp gecikmeleri. Değişen tek şey <section> yerine <div> olması
   (lab sayfası bölümü kendi kabında basıyor) ve h2'nin h3'e inmesi
   (lab sayfasının kendi başlık hiyerarşisi bozulmasın diye).
   ========================================================================= */

const ICONS: Record<string, LucideIcon> = {
  stamp: Stamp,
  handshake: Handshake,
  office: Building2,
  history: History,
  team: UsersRound,
};

const SECTOR_ICONS: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
};

const AD = Object.fromEntries(SUMMARY.map((s) => [s.k, s.label])) as Record<
  SummaryKey,
  string
>;
const AD_DAYANAK = "dayanak";

export default function HakAkisTaban() {
  return (
    <div className="hkl-taban sec-pad">
      <div className="container-o">
        <div className="ab-open">
          <FadeUp className="ab-open-figw" y={20}>
            <figure className="ab-open-fig">
              <span className="ab-open-ph">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 980px) 48vw, 100vw"
                  className="ab-open-img"
                  unoptimized
                />
              </span>
              <figcaption className="ab-open-note">{OPENING.photoNote}</figcaption>
            </figure>
          </FadeUp>

          <div className="ab-open-body">
            <SplitWords
              as="h2"
              text={OPENING.heading}
              accent={OPENING.accent}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.18}>
              <p className="ab-open-lead">{OPENING.lead}</p>
            </FadeUp>
            {OPENING.body.map((p, i) => (
              <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                <p className="ab-open-p">{p}</p>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="ab-vm">
          {[
            { s: OPENING.vision, Icon: Compass },
            { s: OPENING.mission, Icon: Target },
          ].map(({ s, Icon }, i) => (
            <FadeUp key={s.t} delay={0.12 + i * 0.08}>
              <article className="ab-vm-card">
                <span className="ab-vm-ic" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                <h3>{s.t}</h3>
                <p>{s.s}</p>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <p className="ab-vm-note">{OPENING.statementNote}</p>
        </FadeUp>

        <div className="ab-bento akt">
          <FadeUp className="ab-bento-w ab-bento-dar" delay={0.1} y={18}>
            <article className="ab-kn ab-kn-dark">
              <span className="ab-kn-t">
                <CountUp className="ab-kn-n" to={WHERE.countries.length} />
                <span className="ab-kn-l">{AD.where}</span>
              </span>
              <ul className="ab-kn-geo">
                {WHERE.countries.map((c) => (
                  <li key={c.slug}>
                    <span className="ab-kn-disk akt-durak" aria-hidden="true">
                      <Flag country={c.slug} />
                    </span>
                    <b>{COUNTRY_NAME[c.slug]}</b>
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>

          <FadeUp className="ab-bento-w ab-bento-genis" delay={0.18} y={18}>
            <article className="ab-kn">
              <span className="ab-kn-t">
                <CountUp className="ab-kn-n" to={CHAIN.length} />
                <span className="ab-kn-l">{AD.chain}</span>
              </span>
              <div className="ab-kn-zincir">
                <span className="ab-kn-iz" aria-hidden="true">
                  <span className="ab-kn-hat akt-durak" />
                  <span className="ab-kn-glint" />
                </span>
                <ol className="ab-kn-halkalar">
                  {CHAIN.map((s) => (
                    <li className="ab-kn-halka" key={s.key}>
                      <span className="ab-kn-dugum akt-durak" aria-hidden="true" />
                      <b>{s.label}</b>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </FadeUp>

          <FadeUp className="ab-bento-w ab-bento-genis" delay={0.26} y={18}>
            <article className="ab-kn">
              <span className="ab-kn-t">
                <CountUp className="ab-kn-n" to={FOR_WHOM.sectors.length} />
                <span className="ab-kn-l">{AD.sectors}</span>
              </span>
              <ul className="ab-kn-sekt">
                {FOR_WHOM.sectors.map((s) => {
                  const Icon = SECTOR_ICONS[s.slug];
                  return (
                    <li key={s.slug} className="ab-kn-cip akt-durak">
                      <span aria-hidden="true">
                        {Icon && <Icon size={16} strokeWidth={1.8} />}
                      </span>
                      <b>{s.label}</b>
                    </li>
                  );
                })}
              </ul>
            </article>
          </FadeUp>

          <FadeUp className="ab-bento-w ab-bento-dar" delay={0.34} y={18}>
            <article className="ab-kn ab-kn-dark">
              <span className="ab-kn-t">
                <CountUp className="ab-kn-n" to={BASIS.cards.length} />
                <span className="ab-kn-l">{AD_DAYANAK}</span>
              </span>
              <ul className="ab-kn-dayanak">
                {BASIS.cards.map((c) => {
                  const Icon = ICONS[c.icon];
                  return (
                    <li key={c.t}>
                      <span className="ab-kn-mim akt-durak" aria-hidden="true">
                        {Icon && <Icon size={16} strokeWidth={1.8} />}
                      </span>
                      <b>{c.t}</b>
                    </li>
                  );
                })}
              </ul>
            </article>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
