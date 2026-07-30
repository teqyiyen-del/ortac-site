"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Info, PlaneLanding, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
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
 * Bu soruya düz bir hizmet listesi cevap vermiyor, çünkü listede sekiz kalem
 * yan yana duruyor ve hangisinin her ay, hangisinin yılda bir, hangisinin
 * hiç doğmayacağı görünmüyor. Sekiz kalemi tek tek okumak zorunda kalan
 * kişi, toplamı kafasında yanlış kuruyor.
 *
 * Onun yerine üç katman var:
 *
 *  1) Ritim çizelgesi. Her kalem bir satır, sağında ilk 12 ayın şeridi.
 *     Ritim ekranda elle boyanmıyor — kalemin `months` dizisinden çiziliyor,
 *     yani veri ile görsel aynı yerden besleniyor. Aylık muhasebe on iki
 *     dolu kare, KDV beyannamesi dört, lisans yenileme bir. Ritim okunuyor,
 *     okunması için sayı saymak gerekmiyor.
 *
 *  2) İlk yıl örnek hesabı. Bölümün çapası. Dört kalem bir yığın çubukta
 *     üst üste biniyor ve toplam çubuğun sonunda çıkıyor; "9.820" bir yerden
 *     düşen rakam değil, gözle takip edilen bir toplam.
 *
 *  3) Oturum giriş kuralı. Kendi bloğu, kendi görseli. Buraya karışmasının
 *     sebebi pratik: 365 ve 182 gün aynı eksende iki çubuk olarak çizilince
 *     "işçi oturumunda aralık yarı yarıya kısa" cümlesi okunmadan anlaşılıyor.
 *
 * Dürüstlük noktası veri seviyesinde tutuluyor: bir kalemin ilk yıl toplamına
 * girip girmediğini bileşen karar vermiyor, `inclusion` alanı söylüyor.
 * "Gerekli ise" olanlar toplamın altında, ayrı ve kesikli çerçeveli bir
 * defterde duruyor ve orada bilerek TOPLAM YAZMIYOR — koşullu kalemleri
 * toplamak, hepsi doğacakmış gibi bir rakam üretirdi.
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

function After({ d }: { d: AfterSetup }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const [open, setOpen] = useState<string | null>(null);

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
            Okuma anahtarı. Üç konumun ne demek olduğu listeden ÖNCE
            söyleniyor; satırlardaki renk rozetleri ancak bu anahtar
            okunduktan sonra bir şey ifade ediyor.
            -------------------------------------------------------------- */}
        <FadeUp delay={0.22} y={18}>
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
        </FadeUp>

        {/* --------------------------------------------------------------
            Ritim çizelgesi
            -------------------------------------------------------------- */}
        <FadeUp delay={0.26} y={18}>
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
              Şerit ilk 12 ayı gösteriyor: dolu kare, o ay iş çıktığı anlamına
              geliyor.
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
                        <span className="aft-chip">{RHYTHM_LABEL[it.rhythm]}</span>
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
                          {it.price.qualifier && (
                            <em>{it.price.qualifier} </em>
                          )}
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
                                <Info size={15} strokeWidth={2.1} aria-hidden="true" />
                                <span>{it.note}</span>
                              </p>
                            )}

                            {!hasBody && (
                              <p className="aft-note">
                                <Info size={15} strokeWidth={2.1} aria-hidden="true" />
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
        </FadeUp>

        {/* --------------------------------------------------------------
            Çapa: ilk yıl örnek hesabı
            -------------------------------------------------------------- */}
        <FadeUp delay={0.2} y={20}>
          <div className="aft-sum">
            <div className="aft-sum-h">
              <p className="aft-sum-k">{d.firstYear.kicker}</p>
              <h3 className="aft-sum-t">{d.firstYear.title}</h3>
              <p className="aft-sum-l">{d.firstYear.lead}</p>
            </div>

            <div className="aft-sum-grid">
              <div className="aft-sum-left">
                {/* Toplamın oluşumu: dört parça sırayla üst üste biniyor */}
                <div className="aft-bar" aria-hidden="true">
                  {d.firstYear.lines.map((l, i) => {
                    const pct = (l.usd / total) * 100;
                    return (
                      <motion.span
                        key={l.id}
                        className="aft-seg"
                        style={{ background: SEG[i % SEG.length] }}
                        initial={{ width: reduce ? `${pct}%` : "0%" }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                        transition={{
                          duration: reduce ? 0 : 0.62,
                          ease: EASE,
                          delay: reduce ? 0 : 0.12 + i * 0.1,
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
                </ol>
              </div>

              <div className="aft-total">
                <p className="aft-total-k">1 yıl sonunda toplam</p>
                <p className="aft-total-v">
                  {nf.format(total)}
                  <em>USD</em>
                </p>
                <p className="aft-total-s">+ KDV</p>
                <p className="aft-total-n">
                  Yeni kurulmuş, standart faaliyet gösteren bir şirket için
                  örnek hesap. Kendi rakamınız faaliyetinize, lisansınıza ve
                  işlem hacminize göre değişir.
                </p>
              </div>
            </div>

            {/* Dürüstlük noktası: koşullu kalemler toplamın DIŞINDA, ve
                burada bilerek bir ara toplam yazmıyor. */}
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
          </div>
        </FadeUp>

        {/* --------------------------------------------------------------
            Oturum giriş kuralı — kendi görsel yeri
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
            <SmartLink href="/basla" className="btn btn-solid">
              Mali müşavire danışın
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
