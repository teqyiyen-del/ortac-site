"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe2 } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { TimelineRow, UpdateFilter, UpdateFilterOption } from "@/lib/resources";

/* ============================================================================
   GL1 · SİCİL — kartı tamamen kaldıran cevap
   ============================================================================

   Müşteri: "kart tasarımları tam ikna etmedi beni buranın tasarımına bi
   ısınamadım ya."

   Bu adayın cevabı: o zaman kart olmasın. Yirmi iki ayrı kutu yan yana
   dizilince göz her seferinde aynı çerçeveyi yeniden çiziyor; asıl bilgi
   (tarih · ülke · başlık) ise kutunun içinde küçülüyor. Burada kayıtlar tek
   bir panelin içinde saç teli çizgilerle ayrılmış SATIRLAR. Mevzuat listesi
   zaten bir sicil; biçim de öyle davranıyor.

   NEYİ FEDA EDİYOR: kapalı satırda tek satırlık kapsam metni (`line`) YOK.
   Görünen dört şey var — tarih, ülke, başlık, tür. Kapsam açılınca geliyor.
   Karşılığında yirmi iki kayıt tek ekrana yaklaşıyor ve ay başlıkları
   yapışkan olduğu için kaydırırken hangi aydasınız hep görünüyor.

   ÜLKE RENGİ: satır başındaki düğüm + ülke adının yazı rengi. Ülkenin ADI ve
   BAYRAĞI satırda duruyor, yani renk tek taşıyıcı değil.
   ========================================================================= */

type Props = {
  rows: TimelineRow[];
  filters: UpdateFilterOption[];
  draftBadge: string;
};

export default function GelismelerGL1({ rows, filters, draftBadge }: Props) {
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
    <div className="gl1">
      {/* Süzgeç panelin İÇİNDE, başlık çubuğu gibi: sicilin üstünde ayrı bir
          kutu daha olsaydı "az kutu" iddiası ilk satırda çürürdü. */}
      <div className="gl1-reg">
        <fieldset className="gl1-pick">
          <legend className="gl1-pick-h">Ülke</legend>
          <div className="gl1-pick-g">
            {filters.map((f) => (
              <label key={f.id} className="gl1-pick-o">
                <input
                  type="radio"
                  className="gl1-pick-r"
                  name={groupName}
                  value={f.id}
                  checked={sel === f.id}
                  onChange={() => setSel(f.id)}
                />
                <span className="gl1-pick-b">
                  <span className="gl1-pick-ic" aria-hidden="true">
                    {f.flag ? <Flag country={f.flag} /> : <Globe2 size={14} strokeWidth={1.9} />}
                  </span>
                  {f.label}
                  <i>{countOfFilter(f.id)}</i>
                </span>
              </label>
            ))}
          </div>
          <p className="gl1-live" aria-live="polite">
            {visible.length === 0
              ? `${selLabel} için kayıt yok.`
              : `${selLabel}: ${visible.length} kayıt.`}
          </p>
        </fieldset>

        {months.length === 0 ? (
          <p className="gl1-none">Seçilen ülkede henüz kayıt yok.</p>
        ) : (
          months.map((m) => (
            <section key={m.key} className="gl1-mo">
              {/* Yapışkan ay çubuğu: sicil uzun, kaydırırken "hangi ay"
                  sorusunun cevabı ekranda kalmalı. */}
              <h2 className="gl1-mo-h">
                <span className="gl1-mo-t">{m.label}</span>
                <span className="gl1-mo-n">{m.items.length}</span>
              </h2>

              <ol className="gl1-rows">
                {m.items.map((r) => (
                  <li key={r.id} className="gl1-row">
                    <details className="gl1-d">
                      <summary className="gl1-sum">
                        <time className="gl1-date" dateTime={r.date}>
                          {r.dayLabel}
                        </time>

                        {/* Ülke: düğüm + bayrak + ad. Üç işaretin ikisi
                            renkten bağımsız. */}
                        <span className="gl1-ctry" data-c={r.country}>
                          <span className="gl1-dot" aria-hidden="true" />
                          <span className="gl1-flag" aria-hidden="true">
                            {r.flag ? <Flag country={r.flag} /> : <Globe2 size={11} strokeWidth={2} />}
                          </span>
                          <span className="gl1-ctry-t">{r.countryLabel}</span>
                        </span>

                        <h3 className="gl1-t">{r.title}</h3>

                        <span className="gl1-tags">
                          <span className="gl1-tone" data-tone={r.channel}>
                            {r.channelLabel}
                          </span>
                          {r.draft && <span className="gl1-seed">{draftBadge}</span>}
                        </span>

                        <span className="gl1-x" aria-hidden="true">
                          <ChevronDown size={15} strokeWidth={2.2} />
                        </span>
                      </summary>

                      <div className="gl1-more">
                        <p className="gl1-line">{r.line}</p>
                        <dl className="gl1-kv">
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
                          <ul className="gl1-q">
                            {r.covers.map((q) => (
                              <li key={q}>{q}</li>
                            ))}
                          </ul>
                        )}

                        {(r.source || r.related) && (
                          <div className="gl1-foot">
                            {r.source && (
                              <a
                                href={r.source.url}
                                className="gl1-src"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Kaynak: {r.source.name}
                                <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                              </a>
                            )}
                            {r.related && (
                              <SmartLink href={r.related.href} className="gl1-rel">
                                {r.related.label}
                              </SmartLink>
                            )}
                          </div>
                        )}
                      </div>
                    </details>
                  </li>
                ))}
              </ol>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
