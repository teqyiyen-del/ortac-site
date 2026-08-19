import {
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  Quote as QuoteMark,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import { brandKeyForName } from "@/lib/brands";
import { CHAIN, PARTNERS, STANCE_LIMITS, type CountrySlug } from "@/lib/brand";
import { OFFICES, isLiveChannel, linksOf } from "@/lib/offices";
import {
  BASIS,
  CONTACT,
  HERO,
  HOW,
  IDENTITY,
  OPENING,
  QUOTE,
  WHERE,
  partnerTypes,
  structureOf,
} from "@/lib/about";

/* ADAY C · CEPHE — /hakkimizda sıfırdan, "üç ofis" ekseninde.
 *
 * Tez: ziyaretçinin sorusu "bu firma kim" değil, "benim ülkemde bu firmanın
 * eli var mı". Sayfa bu yüzden coğrafyayla açılıyor ve omurgası bir OFİS
 * DEFTERİ: üç ofisin gerçek adresi, telefonu ve e-postası (lib/offices.ts,
 * kaynağı müşterinin kendisi, bugüne kadar /hakkimizda'da hiç basılmadı).
 *
 * Kart ızgarası bilerek yok: canlı sayfanın dokuz kartı aynı kompozisyonu
 * (kuyulu ikon + h3 + p) üç ayrı bölümde tekrarlıyordu. Buradaki altı bölümün
 * altısı ayrı bir nesne: cephe çizimi · defter satırı · dikey zincir ·
 * mavi kâğıt beyan · ince çizgili iddia kaydı · tek kapanış.
 *
 * FOTOĞRAF YOK. Ekip karesi de ülke kareleri de stok; ikisinin künyesi de
 * müşteri isteğiyle kalktı, yani şerhsiz birer görsel iddia olarak kalıyordu.
 * Bu aday görseli çizime çeviriyor, o borcu tamamen kapatıyor.
 * Sektör bölümü de yok: "kimlerle" ayrı bir sorunun cevabı ve kendi sayfaları
 * var; bu aday tek soruya odaklanıyor.
 */

/* Ülke başına ORTAC'ın kendi durumu. WHERE.countries batıdan doğuya diziliyor,
   OFFICES ise sitenin her yerindeki sırayı (Dubai önce) izliyor; defter
   OFFICES'i basıyor ve satırını buradan buluyor. */
function whereOf(slug: CountrySlug) {
  return WHERE.countries.find((c) => c.slug === slug);
}

/* Tek kurum. Canlı sayfadaki çözümün aynısı ve bilerek: marka kayıt defterinde
   karşılığı olan TAM LOGOSUYLA çıkıyor, olmayan düz adıyla. Rol metni yok,
   çünkü türü bir üstteki grup başlığı zaten söylüyor. */
function PartnerMark({ name }: { name: string }) {
  const key = brandKeyForName(name);
  return (
    <li className="hac-pm">
      {key ? <BrandChip brand={key} optical={15} /> : <b className="hac-pmn">{name}</b>}
    </li>
  );
}

/* ---------------------------------------------------------------- CEPHE ÇİZİMİ
   Hero'nun sağ sütunu. ÜÇ KAPI AYNI KAPI ve bu tembellik değil, sayfanın tezi:
   aynı standart üç ülkede de yürüyor, değişen tek şey kapının üstündeki
   bayrak. Küre bir tur denendi ve kaldırıldı (kırılgandı, bilgi eklemiyordu);
   bu çizim coğrafya değil KAPI gösteriyor, yani aynı hataya düşmüyor.

   Kapı bir mimari görünüş olarak çizildi: kasa, üstte aydınlık vasistas, iki
   kanat, eşik. Ölçüler kendi 120x150 viewBox'ında, kabın genişliğine göre
   esniyor. Hareket tamamen CSS'te (.hac-lite) — render ağacında hiçbir
   hareket değeri okunmuyor (tuzak A). */
function Kapi() {
  return (
    <svg className="hac-svg" viewBox="0 0 120 150" aria-hidden="true" focusable="false">
      {/* kasa */}
      <rect x="22" y="30" width="76" height="112" rx="5" className="hac-frame" />
      {/* vasistas — kapının aydınlık parçası, tek hareketli yüzey */}
      <rect x="30" y="38" width="60" height="24" rx="2" className="hac-lite" />
      <path d="M60 38 V62" className="hac-mullion" />
      {/* iki kanat */}
      <path d="M30 70 H90" className="hac-mullion" />
      <path d="M60 70 V142" className="hac-mullion" />
      <rect x="36" y="80" width="18" height="34" rx="2" className="hac-panel" />
      <rect x="66" y="80" width="18" height="34" rx="2" className="hac-panel" />
      {/* kollar */}
      <circle cx="55" cy="106" r="2.1" className="hac-knob" />
      <circle cx="65" cy="106" r="2.1" className="hac-knob" />
      {/* eşik */}
      <rect x="14" y="142" width="92" height="5" rx="2" className="hac-sill" />
    </svg>
  );
}

/* Hero sahnesi. PageHero sarmalayıcı basmıyor ("sahne kendi kabını taşır"),
   o yüzden panel, kenarlık, telefonda gizlenme ve ölçü CSS'te bu ad altında. */
const CEPHE = (
  <div className="hac-art">
    <div className="hac-art-grid">
      {OFFICES.map((o, i) => (
        <div className="hac-unit" key={o.country} style={{ "--hac-i": i } as React.CSSProperties}>
          <span className="hac-tag">
            {/* Flag ölçüsüz <svg> döndürüyor; kabı SABİT px + overflow:hidden
                olmak zorunda, yoksa 300x150'ye şişiyor (tuzak H). */}
            <span className="hac-flag hac-flag-s">
              <Flag country={o.country} />
            </span>
            <b>{o.label}</b>
          </span>
          <Kapi />
        </div>
      ))}
    </div>
    {/* Üç kapının altındaki TEK çizgi: aynı zemin, aynı ekip. Üstünde yavaş
        bir ışık geziyor (CSS · hacRun) — "tek ekip" iddiasının görsel
        karşılığı ve hero'nun sürekli hareketi. */}
    <div className="hac-base" />
  </div>
);

export default function AboutSayfaC() {
  const partnerGroups = partnerTypes(PARTNERS);

  /* Künyenin dolu satırları. "Ülkeler" ELENDİ: üç ülkeyi defterin kendisi
     zaten adıyla, adresiyle ve bayrağıyla yazıyor; künyede dördüncü kez
     tekrarı bilgi değil gürültü. Boş satırlar (kuruluş yılı, lisans numarası,
     ofis adresleri) zaten değeri olmadığı için düşüyor. */
  const idRows = IDENTITY.rows.filter((r) => r.value !== "" && r.label !== "Ülkeler");

  return (
    <>
      <PageHero
        crumb={HERO.crumb}
        title={HERO.title}
        accent={HERO.accent}
        lead={HERO.lead}
        art={CEPHE}
      />

      {/* ==================================================================
          1 · OFİS DEFTERİ
          Sayfanın omurgası ve en yeni malzemesi. Üç kart yerine üç SATIR:
          solda kimlik, ortada adres ve kanallar, sağda o ofisin ne yürüttüğü.
          Defter bir <ol>, çünkü sıra anlamlı (sitenin her yerindeki sıra).
          ================================================================== */}
      <section className="hac-off sec-pad">
        <div className="container-o">
          <div className="hac-head">
            <SplitWords
              as="h2"
              text={WHERE.heading}
              accent={WHERE.accent}
              className="h2"
              style={{ color: "#ffffff" }}
            />
            <FadeUp delay={0.16}>
              <p className="hac-lead-d">{WHERE.lead}</p>
            </FadeUp>
          </div>

          {/* Sarmalayıcı, telin yeri. Tel <ol>'un çocuğu OLAMAZ (orada yalnız
              <li> durabilir), o yüzden defter bir kap içinde. */}
          <div className="hac-regw">
            <span className="hac-thread" aria-hidden="true">
              <span className="hac-thread-run" />
            </span>

            <ol className="hac-reg">
              {OFFICES.map((o, i) => {
                const w = whereOf(o.country);
                const phones = linksOf(o.contact.phone);
                const mail = o.contact.email;
                return (
                  <li className="hac-row" key={o.country}>
                    <FadeUp className="hac-rowg" delay={0.08 + i * 0.08} y={18}>
                      {/* --- kimlik --- */}
                      <div className="hac-idc">
                        <span className="hac-flag">
                          <Flag country={o.country} />
                        </span>
                        <span className="hac-cn">{o.label}</span>
                        {o.city !== "" && <span className="hac-city">{o.city}</span>}
                      </div>

                      {/* --- adres ve kanallar ---
                          Değerlerin tamamı lib/offices.ts'ten. Boş olan hiç
                          basılmıyor: yarım doldurulmuş bir kanal (görünen
                          numara, çalışmayan bağlantı) hiç olmayandan kötü. */}
                      <div className="hac-adc">
                        <p className="hac-addr">
                          <MapPin size={15} strokeWidth={1.9} aria-hidden="true" />
                          {o.address}
                        </p>
                        <div className="hac-ch">
                          {phones.map((p) => (
                            <a href={p.href} className="hac-chl" key={p.href}>
                              <Phone size={14} strokeWidth={1.9} aria-hidden="true" />
                              {p.value}
                            </a>
                          ))}
                          {isLiveChannel(mail) && (
                            <a href={mail.href} className="hac-chl">
                              <Mail size={14} strokeWidth={1.9} aria-hidden="true" />
                              {mail.value}
                            </a>
                          )}
                        </div>
                      </div>

                      {/* --- bu ofis ne yürütüyor ---
                          `line` yalnızca ORTAC'ın o ülkedeki durumunu
                          anlatıyor (about.ts · WHERE). Ülkenin künyesi
                          (fiyat, süre, kime uygun) BİLEREK yok: onu /ulkeler
                          ve ülke sayfaları anlatıyor, burada tekrarı iki
                          sayfayı aynı sayfa yapardı. Tek istisna `structure`,
                          çünkü o "bu ofis ne tescil ediyor" sorusunun
                          cevabı. */}
                      <div className="hac-doc">
                        {w && <p className="hac-line">{w.line}</p>}
                        {/* Gerçek etiket/değer ilişkisi, o yüzden <dl>. Blok
                            seviyesinde olmak zorunda; bu yüzden satırın üç
                            sütunu da <span> değil <div>. */}
                        <dl className="hac-meta">
                          <dt>Kurulan yapı</dt>
                          <dd>{structureOf(o.country)}</dd>
                          {o.legal !== "" && (
                            <>
                              <dt>Tüzel kişilik</dt>
                              <dd>{o.legal}</dd>
                            </>
                          )}
                        </dl>
                        {w && (
                          <SmartLink href={w.href} className="hac-go">
                            Ülke sayfası
                            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                          </SmartLink>
                        )}
                      </div>
                    </FadeUp>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2 · TEK EKİP
          Coğrafyanın karşı ağırlığı: üç ofis ayrı yerlerde ama iş tek elde.
          Solda düzyazı (OPENING), sağda zincir DİKEY bir yükselti olarak.
          Canlı sayfanın yatay numaralı rayıyla aynı şey değil: orada zincir
          bir bölüm başlığıydı, burada metnin yanındaki kanıt.
          ================================================================== */}
      <section className="hac-team sec-pad">
        <div className="container-o">
          <div className="hac-tg">
            <div className="hac-prose">
              <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="h2" />
              <FadeUp delay={0.16}>
                <p className="hac-lead">{OPENING.lead}</p>
              </FadeUp>
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.24 + i * 0.08}>
                  <p className="hac-p">{p}</p>
                </FadeUp>
              ))}
            </div>

            <FadeUp className="hac-cw" delay={0.2} y={20}>
              {/* Beyaz kart gövdesi + içinde gece çizim paneli: sitenin kendi
                  kalıbı (globals · .hx-card / .hx-stage). Ad alanı ayrı
                  tutuldu ki labdaki bir deneme paylaşılan kuralı ezmesin. */}
              <div className="hac-card">
                <div className="hac-stage">
                  <div className="hac-riser">
                    <span className="hac-riser-run" aria-hidden="true" />
                    <ol className="hac-rlist">
                      {CHAIN.map((c, i) => (
                        <li className="hac-node" key={c.key} style={{ "--hac-i": i } as React.CSSProperties}>
                          <span className="hac-num">{i + 1}</span>
                          <span className="hac-nb">
                            <b>{c.label}</b>
                            <span>{c.line}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="hac-cbody">
                  <h3 className="hac-ct">{HOW.heading}</h3>
                  <p className="hac-cl">{HOW.lead}</p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Üç ilke: KART DEĞİL, kayıt. Kart kabuğu (kuyulu ikon + h3 + p)
              canlı sayfada üç ayrı bölümde tekrarlanıyordu; burada ayrım
              kutuda değil çizgide. */}
          <dl className="hac-pr">
            {HOW.principles.map((p, i) => (
              <FadeUp className="hac-pri" key={p.t} delay={0.1 + i * 0.06} y={14}>
                <dt>{p.t}</dt>
                <dd>{p.s}</dd>
              </FadeUp>
            ))}
          </dl>
        </div>
      </section>

      {/* ==================================================================
          3 · BEYAN · mavi kâğıt
          Müşterinin şikâyeti buraya: "vizyon misyon kısımları çok sönük
          kalmış." Sönüklüğün ölçülebilir bir sebebi vardı: iki beyan, beyaz
          zeminde 1px #e6e6e6 kenarlıklı (beyazla 1,16:1) iki kutunun içinde
          duruyordu. Burada kutu yok, ZEMİN var; punto da bir kademe büyük.
          Mavi kâğıt uydurulmadı: alıntı bandı zaten bu kâğıtta ve gerekçesi
          birebir aynı (hakkimizda.css · 3). Beyan ile alıntı yan yana, çünkü
          ikisi de firmanın kendi sesi.
          ================================================================== */}
      <div className="hac-say">
        <div className="container-o">
          <div className="hac-sg">
            <div className="hac-vm">
              {[OPENING.vision, OPENING.mission].map((s, i) => (
                <FadeUp key={s.t} delay={0.08 + i * 0.1}>
                  <p className="hac-vk">{s.t}</p>
                  <p className="hac-vs">{s.s}</p>
                </FadeUp>
              ))}
            </div>

            <FadeUp className="hac-qw" delay={0.22} y={18}>
              <figure className="hac-quote">
                <QuoteMark className="hac-qm" size={34} strokeWidth={1.9} aria-hidden="true" />
                <blockquote>{QUOTE.text}</blockquote>
                <figcaption>
                  <b>{QUOTE.who}</b>
                  <span>{QUOTE.role}</span>
                  {/* SWAP:QUOTE_SOURCE — yayın adı ve tarihi gelince künye
                      kendiliğinden uzuyor; boşken hiç basılmıyor. */}
                  {QUOTE.source !== "" && <span>{QUOTE.source}</span>}
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ==================================================================
          4 · DAYANAK
          Dört iddia, dört kart DEĞİL: iki sütunlu bir kayıt. Solda iddia,
          sağda dışarıdan sorulabilir kanıtı, arada tek bir tel. Ardından
          birlikte çalışılan kurumlar ve taahhüt sınırları; üçü aynı bölümde,
          çünkü üçü de aynı soruya bakıyor: neye güveniyoruz, nerede duruyoruz.
          ================================================================== */}
      <section className="hac-basis sec-pad">
        <div className="container-o">
          <div className="hac-head hac-head-l">
            <SplitWords as="h2" text={BASIS.heading} accent={BASIS.accent} className="h2" />
            <FadeUp delay={0.16}>
              <p className="hac-lead">{BASIS.lead}</p>
            </FadeUp>
          </div>

          <dl className="hac-claims">
            {BASIS.cards.map((c, i) => (
              <FadeUp className="hac-claim" key={c.t} delay={0.08 + i * 0.06} y={14}>
                <dt>{c.t}</dt>
                <dd>{c.s}</dd>
              </FadeUp>
            ))}
          </dl>

          {/* Kurumlar türe göre. Gruplama ve sıra about.ts · partnerTypes'ta;
              satırlar rol metni taşımıyor, yalnız markanın kendi logosu. */}
          <div className="hac-part">
            <FadeUp>
              <h3 className="hac-pt">{BASIS.partners.t}</h3>
              <p className="hac-ps">{BASIS.partners.s}</p>
            </FadeUp>
            <dl className="hac-ptypes">
              {partnerGroups.map((g, i) => (
                <FadeUp className="hac-ptype" key={g.type} delay={0.1 + i * 0.05} y={12}>
                  <dt>{g.type}</dt>
                  <dd>
                    <ul className="hac-pmarks">
                      {g.names.map((n) => (
                        <PartnerMark key={n} name={n} />
                      ))}
                    </ul>
                  </dd>
                </FadeUp>
              ))}
            </dl>
          </div>

          {/* Taahhüt sınırları AÇIKTA. <details> arkasına konmuyor: bu sayfada
              iki kez denendi, ikisinde de "hiç yazmıyor" geri bildirimi geldi
              (vizyon-misyon ve tam olarak bu blok). */}
          <div className="hac-lim">
            <FadeUp>
              <h3 className="hac-pt">{HOW.limits.t}</h3>
              <p className="hac-ps">{HOW.limits.s}</p>
            </FadeUp>
            <dl className="hac-limits">
              {STANCE_LIMITS.map((l, i) => (
                <FadeUp className="hac-limit" key={l.title} delay={0.1 + i * 0.06} y={12}>
                  <dt>{l.title}</dt>
                  <dd>{l.line}</dd>
                </FadeUp>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5 · ÇIKIŞ
          Sayfa BİR KEZ kapanıyor. Canlı sayfa arka arkaya iki kapanış
          çağrısıyla bitiyor (kendi temas bölümü + FinalCta) ve aradaki tek
          fark düğmenin metni. Burada tek çıkış var; künye de onun yanında,
          sesi kısık bir kayıt olarak duruyor — açılışta değil, dipnotta.
          ================================================================== */}
      <section className="hac-out">
        <div className="container-o">
          <div className="hac-og">
            <div className="hac-oc">
              <SplitWords
                as="h2"
                text={CONTACT.heading}
                accent={CONTACT.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.16}>
                <p className="hac-lead-d">{CONTACT.lead}</p>
              </FadeUp>
              <FadeUp delay={0.24}>
                <span className="hac-cta">
                  <AskCta label={CONTACT.ctaLabel} tone="solid" />
                </span>
              </FadeUp>
            </div>

            <FadeUp className="hac-kw" delay={0.22} y={16}>
              <p className="hac-kh">
                <Building2 size={15} strokeWidth={1.9} aria-hidden="true" />
                {IDENTITY.heading}
              </p>
              <dl className="hac-kunye">
                {idRows.map((r) => (
                  <div className="hac-krow" key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
