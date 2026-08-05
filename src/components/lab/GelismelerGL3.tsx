"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe2 } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { TimelineRow, UpdateFilter, UpdateFilterOption } from "@/lib/resources";

/* ============================================================================
   GL3 · MANŞET — çerçeveyi bırakıp tipografiye geçen cevap
   ============================================================================

   "Isınamadım" cümlesinin bir okuması da şu olabilir: sorun kartın ölçüsü
   değil, kartın KENDİSİ. Bu adayda çerçeve, zemin, gölge yok. Kayıtları
   birbirinden ayıran şey boşluk ve tipografik ölçek.

   Yükü tarih taşıyor: solda büyük, tabular rakamlı bir gün numarası ve
   altında ay kısaltması. O rakam ÜLKENİN RENGİNDE. 30px'lik bir sayı renk
   için fazlasıyla geniş bir yüzey — rozet boyunda bir lekeden çok daha
   uzaktan okunuyor, üstelik kontrast ölçmesi de kolay.

   Ay başlığı ekranın kendi ritmini kuruyor: soluk, büyük, punto olarak
   başlıklardan iri. Sayfayı kaydırırken aylar birer durak gibi geçiyor.

   NEYİ FEDA EDİYOR: kartın kendisini. Çerçeve olmayınca kaydın nerede
   başlayıp bittiği yalnızca boşlukla belli oluyor; bu, yoğun listelerde
   (bir ayda sekiz kayıt) bugünkü kartlı düzenden daha zayıf bir sınır.
   Tıklanabilir alanın sınırı da yalnızca üstüne gelince beliriyor.

   ÜLKE RENGİ: büyük gün rakamı + künye satırındaki ülke adı. Bayrak ve
   yazılı ad künyede duruyor, yani renk tek taşıyıcı değil.
   ========================================================================= */

type Props = {
  rows: TimelineRow[];
  filters: UpdateFilterOption[];
  draftBadge: string;
};

function splitDay(dayLabel: string): [string, string] {
  const parts = dayLabel.split(" ");
  return [parts[0] ?? dayLabel, parts.slice(1).join(" ")];
}

export default function GelismelerGL3({ rows, filters, draftBadge }: Props) {
  const [sel, setSel] = useState<UpdateFilter>("hepsi");
  const groupName = useId();

  const visible = rows.filter((r) => r.shownIn.includes(sel));

  const months: { key: string; label: string; items: TimelineRow[] }[] = [];
  for (const r of visible) {
    const last = months[months.length - 1];
    if (last?.key === r.monthKey) last.items.push(r);
    else months.push({ key: r.monthKey, label: r.monthLabel, items: [r] });
  }

  const countOfFilter = (f: UpdateFilter) => rows.filter((r) => r.shownIn.includes(f)).length;
  const selLabel = filters.find((f) => f.id === sel)?.label ?? "";

  return (
    <div className="gl3">
      {/* Süzgeç de çerçevesiz: yalnızca bayrak diski + ad, seçili olan koyu.
          Sayfada kutu yoksa süzgecin kutusu da olmamalı. */}
      <fieldset className="gl3-pick">
        <legend className="gl3-hid">Ülke seçin</legend>
        <div className="gl3-pick-g">
          {filters.map((f) => (
            <label key={f.id} className="gl3-pick-o">
              <input
                type="radio"
                className="gl3-pick-r"
                name={groupName}
                value={f.id}
                checked={sel === f.id}
                onChange={() => setSel(f.id)}
              />
              <span className="gl3-pick-b">
                <span className="gl3-pick-ic" aria-hidden="true">
                  {f.flag ? <Flag country={f.flag} /> : <Globe2 size={14} strokeWidth={1.9} />}
                </span>
                {f.label}
                <i>{countOfFilter(f.id)}</i>
              </span>
            </label>
          ))}
        </div>
        <p className="gl3-live" aria-live="polite">
          {visible.length === 0
            ? `${selLabel} için kayıt yok.`
            : `${selLabel}: ${visible.length} kayıt.`}
        </p>
      </fieldset>

      {months.length === 0 ? (
        <p className="gl3-none">Seçilen ülkede henüz kayıt yok.</p>
      ) : (
        months.map((m) => (
          <section key={m.key} className="gl3-mo">
            <h2 className="gl3-mo-h">
              <span className="gl3-mo-t">{m.label}</span>
              <span className="gl3-mo-r" aria-hidden="true" />
              <span className="gl3-mo-n">{m.items.length}</span>
            </h2>

            <ol className="gl3-list">
              {m.items.map((r) => {
                const [dd, mmm] = splitDay(r.dayLabel);
                return (
                  <li key={r.id} className="gl3-item">
                    <details className="gl3-d" data-c={r.country}>
                      <summary className="gl3-sum">
                        {/* Büyük gün rakamı ülkenin renginde: bu adayın renk
                            taşıyıcısı bir rozet değil, tipografinin kendisi. */}
                        <time className="gl3-when" dateTime={r.date}>
                          <b className="gl3-dd">{dd}</b>
                          <i className="gl3-mm">{mmm}</i>
                        </time>

                        <span className="gl3-body">
                          <span className="gl3-kick">
                            <span className="gl3-flag" aria-hidden="true">
                              {r.flag ? (
                                <Flag country={r.flag} />
                              ) : (
                                <Globe2 size={11} strokeWidth={2} />
                              )}
                            </span>
                            <span className="gl3-ctry">{r.countryLabel}</span>
                            <span className="gl3-sep" aria-hidden="true" />
                            <span className="gl3-ch">{r.channelLabel}</span>
                            {r.draft && <span className="gl3-seed">{draftBadge}</span>}
                          </span>

                          <h3 className="gl3-t">{r.title}</h3>
                          <p className="gl3-l">{r.line}</p>
                        </span>

                        <span className="gl3-x" aria-hidden="true">
                          <ChevronDown size={16} strokeWidth={2.2} />
                        </span>
                      </summary>

                      <div className="gl3-more">
                        <dl className="gl3-kv">
                          <div>
                            <dt>Tarih</dt>
                            <dd>
                              <time dateTime={r.date}>{r.dateLabel}</time>
                            </dd>
                          </div>
                          <div>
                            <dt>Kimi ilgilendiriyor</dt>
                            <dd>{r.who}</dd>
                          </div>
                          {r.effectiveFrom && r.effectiveLabel && (
                            <div>
                              <dt>Yürürlük</dt>
                              <dd>
                                <time dateTime={r.effectiveFrom}>{r.effectiveLabel}</time>
                              </dd>
                            </div>
                          )}
                          {r.action && (
                            <div>
                              <dt>Yapılması gereken</dt>
                              <dd>{r.action}</dd>
                            </div>
                          )}
                        </dl>

                        {r.covers && r.covers.length > 0 && (
                          <ul className="gl3-q">
                            {r.covers.map((q) => (
                              <li key={q}>{q}</li>
                            ))}
                          </ul>
                        )}

                        {(r.source || r.related) && (
                          <div className="gl3-foot">
                            {r.source && (
                              <a
                                href={r.source.url}
                                className="gl3-src"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Kaynak: {r.source.name}
                                <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                              </a>
                            )}
                            {r.related && (
                              <SmartLink href={r.related.href} className="gl3-rel">
                                {r.related.label}
                              </SmartLink>
                            )}
                          </div>
                        )}
                      </div>
                    </details>
                  </li>
                );
              })}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}
