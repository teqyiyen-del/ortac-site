"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe2 } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { TimelineRow, UpdateFilter, UpdateFilterOption } from "@/lib/resources";

/* ============================================================================
   GL2 · IZGARA — dikey ekseni bırakıp yatay alanı kullanan cevap
   ============================================================================

   Bugünkü tasarımın en pahalı kararı şu: sayfanın solunda 96px'lik bir tarih
   sütunu, sağında tek sıra kart. Geniş ekranda kartın sağında yüzlerce piksel
   boş duruyor ve yirmi iki kayıt bunun bedelini dikey olarak ödüyor.

   Bu aday ayı bir BLOK yapıyor: ay başlığı tam genişlikte bir bant, altında
   kayıtlar ızgarada. "Temmuz'da dört şey oldu" cümlesi ekranda tek bakışta
   görünüyor — çünkü Temmuz gerçekten dört karolu bir blok.

   Tarih karonun içinde takvim yaprağı gibi duruyor (gün büyük, ay küçük);
   ülkenin rengi bu yaprağın zeminini ve madalyonun halkasını tutuyor.

   NEYİ FEDA EDİYOR: kesintisiz dikey eksen ve tek sıra okuma. Izgarada sıra
   soldan sağa akıyor, yani "yukarıdan aşağı tek çizgi" hissi gidiyor. Bir
   karo açılınca da o satır uzuyor, komşuları yerinde kalıyor — hareket
   bugünkü listeden daha zıplak.

   ÜLKE RENGİ: takvim yaprağının zemini + madalyon halkası + ülke adının
   rengi. Bayrak ve yazılı ad her karoda duruyor.
   ========================================================================= */

type Props = {
  rows: TimelineRow[];
  filters: UpdateFilterOption[];
  draftBadge: string;
};

/** "28 Tem" → ["28", "Tem"]. Ayrım sunucudaki `dayLabel`in biçiminden geliyor;
    beklenmedik bir biçimde ikinci parça boş kalır, gün yine basılır. */
function splitDay(dayLabel: string): [string, string] {
  const parts = dayLabel.split(" ");
  return [parts[0] ?? dayLabel, parts.slice(1).join(" ")];
}

export default function GelismelerGL2({ rows, filters, draftBadge }: Props) {
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
    <div className="gl2">
      {/* Süzgeç burada altı çizili sekme dili: ızgaranın kendisi zaten kutulu,
          üstüne bir kutu daha koymak sayfayı kutu yığınına çeviriyordu. */}
      <fieldset className="gl2-pick">
        <legend className="gl2-hid">Ülke seçin</legend>
        <div className="gl2-pick-g">
          {filters.map((f) => (
            <label key={f.id} className="gl2-pick-o">
              <input
                type="radio"
                className="gl2-pick-r"
                name={groupName}
                value={f.id}
                checked={sel === f.id}
                onChange={() => setSel(f.id)}
              />
              <span className="gl2-pick-b">
                <span className="gl2-pick-ic" aria-hidden="true">
                  {f.flag ? <Flag country={f.flag} /> : <Globe2 size={14} strokeWidth={1.9} />}
                </span>
                {f.label}
                <i>{countOfFilter(f.id)}</i>
              </span>
            </label>
          ))}
        </div>
        <p className="gl2-live" aria-live="polite">
          {visible.length === 0
            ? `${selLabel} için kayıt yok.`
            : `${selLabel}: ${visible.length} kayıt.`}
        </p>
      </fieldset>

      {months.length === 0 ? (
        <p className="gl2-none">Seçilen ülkede henüz kayıt yok.</p>
      ) : (
        months.map((m) => (
          <section key={m.key} className="gl2-mo">
            <div className="gl2-mo-h">
              <h2 className="gl2-mo-t">{m.label}</h2>
              <span className="gl2-mo-n">{m.items.length} kayıt</span>
            </div>

            <ul className="gl2-grid">
              {m.items.map((r) => {
                const [dd, mmm] = splitDay(r.dayLabel);
                return (
                  <li key={r.id} className="gl2-cell">
                    <details className="gl2-t" data-c={r.country}>
                      <summary className="gl2-sum">
                        <span className="gl2-head">
                          {/* Takvim yaprağı: gün büyük, ay küçük. Ülkenin
                              rengi burada zemin olarak duruyor — karonun
                              KENDİ kenarı nötr kalıyor, renk kenara değil
                              içeriye giriyor. */}
                          <time className="gl2-day" dateTime={r.date}>
                            <b>{dd}</b>
                            <i>{mmm}</i>
                          </time>
                          <span className="gl2-med" aria-hidden="true">
                            {r.flag ? <Flag country={r.flag} /> : <Globe2 size={15} strokeWidth={2} />}
                          </span>
                        </span>

                        <span className="gl2-ctry">{r.countryLabel}</span>
                        <h3 className="gl2-title">{r.title}</h3>

                        <span className="gl2-tags">
                          <span className="gl2-tone" data-tone={r.channel}>
                            {r.channelLabel}
                          </span>
                          {r.draft && <span className="gl2-seed">{draftBadge}</span>}
                          <span className="gl2-x" aria-hidden="true">
                            <ChevronDown size={15} strokeWidth={2.2} />
                          </span>
                        </span>
                      </summary>

                      <div className="gl2-more">
                        <p className="gl2-line">{r.line}</p>
                        <dl className="gl2-kv">
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
                          <ul className="gl2-q">
                            {r.covers.map((q) => (
                              <li key={q}>{q}</li>
                            ))}
                          </ul>
                        )}

                        {(r.source || r.related) && (
                          <div className="gl2-foot">
                            {r.source && (
                              <a
                                href={r.source.url}
                                className="gl2-src"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Kaynak: {r.source.name}
                                <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                              </a>
                            )}
                            {r.related && (
                              <SmartLink href={r.related.href} className="gl2-rel">
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
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
