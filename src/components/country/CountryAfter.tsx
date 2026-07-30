"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Info, PlaneLanding, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import {
  AFTER_SETUP,
  INCLUSION_LABEL,
  RHYTHM_LABEL,
  RHYTHM_ORDER,
  type AfterSetup,
  type Inclusion,
} from "@/lib/afterSetup";
import type { Country } from "@/lib/store";

/* Kuruluş sonrası yükümlülükler.
 *
 * Bölümün derdi tek bir soru: "şirketi kurdum, bundan sonra bana ne çıkıyor?"
 * İçerik bu soruya doğru cevabı veriyor — sekiz kalem, ritimleri, ilk yıl
 * hesabı, oturum kuralı. Sorun içerikte değildi: hepsi aynı anda açıktı.
 * Bölümü kaydırıp geçen biri, burada duracak niyeti olmasa bile sekiz satırlık
 * çizelgeyi, on iki aylık şeridi ve dört kalemlik hesabı baştan sona görüyordu.
 * Bu, cevap vermek değil, her şeyi önüne yığmak.
 *
 * O yüzden bölüm artık İKİ KADEMELİ okunuyor:
 *
 *  KADEME 1 — özet. Ne olduğu, ilk yıl toplamı (9.820 USD çapası) ve kaç
 *  kalemin toplamın içinde / dışında olduğu. Bu kadarı birkaç saniyede
 *  okunuyor ve "bana ne çıkıyor" sorusunu tek başına cevaplıyor.
 *
 *  KADEME 2 — detay, talep üzerine. İki ayrı açılır bölge var, çünkü kapalı
 *  hâlde okuyucunun aklına gelen iki farklı soru var ve tek düğme ikisini de
 *  aynı torbaya koyardı:
 *    · "9.820 nereden çıkıyor?"  → hesabın dökümü + toplamın dışındakiler
 *    · "peki hangi işler var?"   → sekiz kalemlik ritim çizelgesi
 *
 * Detay SİLİNMEDİ ve DOM'dan da çıkmıyor: açılır bölgeler yüksekliği
 * kırpılarak kapanıyor, içerideki kalemler yerinde duruyor. Bunun iki sebebi
 * var — arama motoru bölümün bilgi derinliğini görmeye devam ediyor, ve açma
 * kapama sırasında içerik yeniden kurulmadığı için açtığınız bir kalem
 * kapatıp açınca da açık kalıyor. Kapalıyken `inert` veriliyor, yani klavye
 * ve ekran okuyucu görünmeyen içeriğe düşmüyor.
 *
 * Dürüstlük noktası kademeye kurban edilmedi: koşullu kalemlerin toplamın
 * DIŞINDA olduğu, döküm hiç açılmasa bile özet hâlde yazıyor. Bir kişinin
 * "9.820 her şey dahil" diye anlaması, açmadığı için olmamalı.
 *
 * Şimdilik yalnızca Dubai. Veri olmayan ülkede bölüm hiç çıkmıyor; boş bir
 * iskelet basmak "burada yükümlülük yok" gibi okunurdu.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const nf = new Intl.NumberFormat("tr-TR");
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/* Yığın çubuğun tonları. Koyu yüzeyde alfa kullanılmıyor, dördü de opak;
   tek bir mavinin dört basamağı olduğu için çubuk çok renkli görünmüyor. */
const SEG = ["#1b56a8", "#307fe2", "#5c9eeb", "#cadff9"];

/* Ülke verisi yoksa hiç kurulmasın diye kanca kullanan kısım ayrı bileşende:
   erken `return null` ile kanca kuralları aynı gövdede yan yana duramaz. */
export default function CountryAfter({ country }: { country: Country }) {
  const data = AFTER_SETUP[country];
  if (!data) return null;
  return <After d={data} />;
}

/**
 * Kapanabilir bölge.
 *
 * `AnimatePresence` ile yazılsaydı kapalı hâlde içerik DOM'dan silinirdi;
 * burada bilerek silinmiyor (bkz. dosya başı). Yükseklik 0'a inip
 * `overflow:hidden` ile kırpılıyor, kapalıyken `inert` konuyor.
 */
function Fold({
  id,
  open,
  reduce,
  children,
}: {
  id: string;
  open: boolean;
  reduce: boolean | null;
  children: ReactNode;
}) {
  return (
    <motion.div
      id={id}
      className="aft-fold"
      initial={false}
      animate={{ height: open ? "auto" : 0 }}
      transition={{ duration: reduce ? 0 : 0.44, ease: EASE }}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="aft-fold-in">{children}</div>
    </motion.div>
  );
}

/** Açma düğmesi. Tek biçim, iki zemin: gece paneli ve beyaz sayfa. */
function MoreBtn({
  id,
  controls,
  open,
  tone,
  title,
  hint,
  onClick,
}: {
  id: string;
  controls: string;
  open: boolean;
  tone: "night" | "line";
  title: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      id={id}
      className="aft-more"
      data-tone={tone}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
    >
      <span className="aft-more-t">
        <b>{title}</b>
        <span>{hint}</span>
      </span>
      <span className="aft-more-i" aria-hidden="true">
        <ChevronDown size={18} strokeWidth={2.2} />
      </span>
    </button>
  );
}

function After({ d }: { d: AfterSetup }) {
  const reduce = useReducedMotion();
  const uid = useId();

  /* Üç ayrı açık/kapalı durumu var ve hiçbiri ötekini kapatmıyor: biri
     dökümü açıp çizelgeyi de açmak isterse ikisi birden dursun. Akordiyonu
     "tek seferde tek panel" yapmak burada yardımcı olmaz, kullanıcıyı
     kapattığı şeyi yeniden aramaya zorlar. */
  const [open, setOpen] = useState<string | null>(null);
  const [showCalc, setShowCalc] = useState(false);
  const [showItems, setShowItems] = useState(false);

  /* Veri dosyası PDF sırasını koruyor (muhasebeci karşılaştırarak okusun
     diye), ekran sırası ritme göre. sort kararlı olduğu için aynı ritim
     içinde PDF sırası bozulmuyor. */
  const items = useMemo(
    () =>
      [...d.items].sort(
        (a, b) => RHYTHM_ORDER.indexOf(a.rhythm) - RHYTHM_ORDER.indexOf(b.rhythm),
      ),
    [d.items],
  );

  const counts = useMemo(() => {
    const c: Record<Inclusion, number> = {
      ornekte: 0,
      "gerekli-ise": 0,
      "istege-bagli": 0,
    };
    for (const it of d.items) c[it.inclusion] += 1;
    return c;
  }, [d.items]);

  /* Toplam veride yazmıyor, burada toplanıyor: veri satırı değişince rakam
     kendiliğinden düzeliyor, iki yerde birden güncellemek gerekmiyor. */
  const total = d.firstYear.lines.reduce((a, l) => a + l.usd, 0);
  const outside = items.filter((i) => i.inclusion !== "ornekte");

  const calcId = `${uid}-calc`;
  const itemsId = `${uid}-items`;

  return (
    <section
      id="kurulus-sonrasi"
      className="sec-pad"
      style={{ background: "var(--white)" }}
    >
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={d.title}
            accent={d.accent}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{d.lead}</p>
          </FadeUp>
        </div>

        {/* --------------------------------------------------------------
            KADEME 1 — özet çapa.
            Bölümün en başına alındı çünkü artık cevabın kendisi bu: bir
            rakam, iki sayaç ve toplamın neyi kapsamadığı. Kaydırıp geçen
            kişi bu paneli görüp devam edebiliyor.
            -------------------------------------------------------------- */}
        <FadeUp delay={0.22} y={20}>
          <div className="aft-sum">
            <div className="aft-anchor">
              <div className="aft-anchor-txt">
                <p className="aft-sum-k">{d.firstYear.kicker}</p>
                <h3 className="aft-sum-t">{d.firstYear.title}</h3>
                <p className="aft-sum-l">{d.firstYear.lead}</p>
              </div>

              <p className="aft-anchor-v">
                <span className="aft-anchor-num">
                  {nf.format(total)}
                  <em>USD</em>
                </span>
                <span className="aft-anchor-s">+ KDV · ilk 12 ay</span>
              </p>
            </div>

            {/* Kaç kalem içeride, kaç kalem dışarıda. Bu iki sayı özetin
                dürüstlük yükünü taşıyor; döküm hiç açılmasa da görünüyor. */}
            <ul className="aft-facts">
              <li data-tone="in">
                <b>{counts.ornekte} kalem</b>
                <span>bu toplamın içinde</span>
              </li>
              <li data-tone="out">
                <b>{outside.length} kalem</b>
                <span>toplamın dışında, koşullu</span>
              </li>
            </ul>

            <p className="aft-anchor-note">{d.firstYear.anchorNote}</p>

            <MoreBtn
              id={`${uid}-calc-b`}
              controls={calcId}
              open={showCalc}
              tone="night"
              title="Bu toplam nasıl çıkıyor?"
              hint="Dört satırlık döküm ve toplamın dışında kalan kalemler"
              onClick={() => setShowCalc((v) => !v)}
            />

            <Fold id={calcId} open={showCalc} reduce={reduce}>
              {/* Toplamın oluşumu: dört parça sırayla üst üste biniyor.
                  Animasyon `whileInView` değil açılışa bağlı — kapalıyken de
                  ekranda sayılıp bir kereye mahsus hakkı tükenmesin diye. */}
              <div className="aft-bar" aria-hidden="true">
                {d.firstYear.lines.map((l, i) => {
                  const pct = (l.usd / total) * 100;
                  return (
                    <motion.span
                      key={l.id}
                      className="aft-seg"
                      style={{ background: SEG[i % SEG.length] }}
                      initial={false}
                      animate={{ width: showCalc ? `${pct}%` : "0%" }}
                      transition={{
                        duration: reduce ? 0 : 0.55,
                        ease: EASE,
                        delay: reduce || !showCalc ? 0 : 0.14 + i * 0.09,
                      }}
                    />
                  );
                })}
              </div>

              <ol className="aft-rows">
                {d.firstYear.lines.map((l, i) => (
                  <li key={l.id} className="aft-row">
                    <i
                      className="aft-dot"
                      style={{ background: SEG[i % SEG.length] }}
                      aria-hidden="true"
                    />
                    <span className="aft-row-k">
                      <b>{l.label}</b>
                      <span>{l.qty}</span>
                    </span>
                    <span className="aft-row-v">{nf.format(l.usd)} USD</span>
                  </li>
                ))}
                <li className="aft-row aft-row-sum">
                  <i aria-hidden="true" />
                  <span className="aft-row-k">
                    <b>1 yıl sonunda toplam</b>
                    <span>+ KDV</span>
                  </span>
                  <span className="aft-row-v">{nf.format(total)} USD</span>
                </li>
              </ol>

              <p className="aft-total-n">
                Yeni kurulmuş, standart faaliyet gösteren bir şirket için örnek
                hesap. Kendi rakamınız faaliyetinize, lisansınıza ve işlem
                hacminize göre değişir.
              </p>

              {/* Koşullu kalemler toplamın DIŞINDA, ve burada bilerek bir ara
                  toplam yazmıyor: hepsini toplamak, hepsi doğacakmış gibi bir
                  rakam üretirdi. */}
              <div className="aft-out">
                <p className="aft-out-h">
                  <TriangleAlert size={16} strokeWidth={2.2} aria-hidden="true" />
                  Bu toplama dahil değil
                </p>
                <ul className="aft-out-list">
                  {outside.map((o) => (
                    <li key={o.id} data-inc={o.inclusion}>
                      <span className="aft-out-t">
                        <b>{o.title}</b>
                        <span>
                          {RHYTHM_LABEL[o.rhythm].toLocaleLowerCase("tr-TR")} ·{" "}
                          {o.price.qualifier ? `${o.price.qualifier} ` : ""}
                          {nf.format(o.price.usd)} USD
                          {o.price.plusVat ? " + KDV" : ""}
                          {o.price.unit === "kişi başı" ? " / kişi" : ""}
                        </span>
                      </span>
                      <span className="aft-out-f">
                        {INCLUSION_LABEL[o.inclusion].short}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="aft-out-note">{d.firstYear.outNote}</p>
              </div>
            </Fold>
          </div>
        </FadeUp>

        {/* --------------------------------------------------------------
            KADEME 2 — sekiz kalemlik çizelge, talep üzerine.
            Bölümün en hacimli parçası buydu; artık tek satırlık bir düğmenin
            arkasında duruyor. Merak eden açıyor, geçen kişi geçiyor.
            -------------------------------------------------------------- */}
        <FadeUp delay={0.2} y={18}>
          <div className="aft-disc">
            <MoreBtn
              id={`${uid}-items-b`}
              controls={itemsId}
              open={showItems}
              tone="line"
              title={`${items.length} yükümlülüğün tamamı ve 12 aylık ritmi`}
              hint={d.itemsHint}
              onClick={() => setShowItems((v) => !v)}
            />

            <Fold id={itemsId} open={showItems} reduce={reduce}>
              {/* Okuma anahtarı listeden ÖNCE: satırlardaki renk rozetleri
                  ancak bu anahtar okunduktan sonra bir şey ifade ediyor. */}
              <ul className="aft-legend">
                {(Object.keys(INCLUSION_LABEL) as Inclusion[]).map((k) => (
                  <li key={k} className="aft-leg" data-inc={k}>
                    <i aria-hidden="true" />
                    <span className="aft-leg-t">
                      <b>{INCLUSION_LABEL[k].short}</b>
                      {INCLUSION_LABEL[k].long}
                    </span>
                    <span className="aft-leg-n">{counts[k]} kalem</span>
                  </li>
                ))}
              </ul>

              <div className="aft-tbl">
                <div className="aft-thead" aria-hidden="true">
                  <span className="aft-thead-l">Yükümlülük</span>
                  <span className="aft-months aft-months-h">
                    {MONTHS.map((m) => (
                      <span key={m} className="aft-mh">
                        {m}
                      </span>
                    ))}
                  </span>
                  <span className="aft-thead-p">Ücret</span>
                  <span />
                </div>
                <p className="aft-thead-c" aria-hidden="true">
                  Şerit ilk 12 ayı gösteriyor: dolu kare, o ay iş çıktığı
                  anlamına geliyor.
                </p>

                <ul className="aft-list">
                  {items.map((it) => {
                    const on = open === it.id;
                    const hasBody = Boolean(it.scope?.length || it.note);
                    return (
                      <li key={it.id} className="aft-item" data-inc={it.inclusion}>
                        <button
                          type="button"
                          className="aft-top"
                          id={`${uid}-b-${it.id}`}
                          aria-expanded={on}
                          onClick={() => setOpen(on ? null : it.id)}
                        >
                          <span className="aft-main">
                            <span className="aft-chip">
                              {RHYTHM_LABEL[it.rhythm]}
                            </span>
                            <span className="aft-name">
                              <b>{it.title}</b>
                              {it.en && <i>{it.en}</i>}
                            </span>
                            <span className="aft-flag">
                              {INCLUSION_LABEL[it.inclusion].short}
                            </span>
                          </span>

                          {/* şerit yalnızca görsel: ritmi zaten soldaki rozet yazıyor */}
                          <span className="aft-months" aria-hidden="true">
                            {MONTHS.map((m) => (
                              <span
                                key={m}
                                className="aft-m"
                                data-on={it.months.includes(m) || undefined}
                              />
                            ))}
                          </span>

                          <span className="aft-price">
                            <b>
                              {it.price.qualifier && <em>{it.price.qualifier} </em>}
                              {nf.format(it.price.usd)} USD
                            </b>
                            <span>
                              {it.price.plusVat ? "+ KDV · " : ""}
                              {it.price.unit}
                            </span>
                          </span>

                          <span className="aft-chev" aria-hidden="true">
                            <ChevronDown size={17} strokeWidth={2.2} />
                          </span>
                          <span className="sr-only">
                            {on ? "Detayı kapat" : "Detayı aç"}
                          </span>
                        </button>

                        {/* Kalem gövdeleri hâlâ AnimatePresence ile: sekiz
                            kalemin sekiz gövdesi kapalıyken de DOM'da dursaydı
                            çizelgeyi açan kişi bu kez o yükü taşırdı. */}
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              key="body"
                              className="aft-wrap"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: reduce ? 0 : 0.34,
                                ease: EASE,
                              }}
                            >
                              <div className="aft-body">
                                <p className="aft-body-l">{it.line}</p>

                                {it.scope && it.scope.length > 0 && (
                                  <div className="aft-scope">
                                    <p className="aft-scope-h">Kapsam</p>
                                    <ul>
                                      {it.scope.map((s) => (
                                        <li key={s}>{s}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {it.note && (
                                  <p className="aft-note">
                                    <Info
                                      size={15}
                                      strokeWidth={2.1}
                                      aria-hidden="true"
                                    />
                                    <span>{it.note}</span>
                                  </p>
                                )}

                                {!hasBody && (
                                  <p className="aft-note">
                                    <Info
                                      size={15}
                                      strokeWidth={2.1}
                                      aria-hidden="true"
                                    />
                                    <span>
                                      Bu kalem herkes için doğmuyor. Gerekip
                                      gerekmediğini görüşmede netleştiriyoruz.
                                    </span>
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Fold>
          </div>
        </FadeUp>

        {/* --------------------------------------------------------------
            Oturum giriş kuralı — kapanmadı, açık kaldı.
            Kısa (iki satır) ve değeri yüksek: bu kuralı bilmediği için
            oturumunu kaybeden kişi, düğmenin arkasına konsaydı hiç okumazdı.
            -------------------------------------------------------------- */}
        <FadeUp delay={0.2} y={20}>
          <div className="aft-entry">
            <div className="aft-entry-side">
              <p className="aft-entry-k">
                <PlaneLanding size={16} strokeWidth={2.1} aria-hidden="true" />
                {d.entry.kicker}
              </p>
              <h3 className="aft-entry-t">{d.entry.title}</h3>
              <p className="aft-entry-l">{d.entry.lead}</p>
            </div>

            {/* Kapanış uyarısı yan sütunun içinde DEĞİL: tek sütuna düşen
                ekranda oraya konursa, anlattığı çubuklardan önce okunuyordu.
                Ayrı ızgara hücresi olarak durunca dar ekranda çubukların
                altına, geniş ekranda yine solda metnin altına iniyor. */}
            <ul className="aft-entry-rows">
              {d.entry.rows.map((r) => {
                /* İki çubuk aynı eksende: en uzun aralık %100, ötekiler ona
                   oranlanıyor. Farkın kendisi görsel oluyor. */
                const max = Math.max(...d.entry.rows.map((x) => x.days));
                const pct = (r.days / max) * 100;
                return (
                  <li key={r.who} className="aft-erow">
                    <p className="aft-ewho">
                      <b>{r.who}</b>
                      <span>{r.short}</span>
                    </p>
                    <div className="aft-etrack" aria-hidden="true">
                      <motion.span
                        className="aft-efill"
                        initial={{ width: reduce ? `${pct}%` : "0%" }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                        transition={{
                          duration: reduce ? 0 : 0.68,
                          ease: EASE,
                          delay: reduce ? 0 : 0.1,
                        }}
                      >
                        <i className="aft-eflag">{r.days} gün</i>
                      </motion.span>
                    </div>
                    <p className="aft-eline">{r.line}</p>
                  </li>
                );
              })}
            </ul>

            <p className="aft-entry-note">{d.entry.note}</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="aft-foot">{d.footnote}</p>
          <div className="aft-foot-cta">
            <AskCta />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
