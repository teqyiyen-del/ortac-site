"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* ============================================================================
   BELGE KONTROL LİSTESİ
   ============================================================================

   NE YAPIYOR
   Ülke seçiliyor, kuruluş için ziyaretçiden istenen evrak işaretleniyor,
   liste düz metin olarak panoya kopyalanıyor. Aracın asıl çıktısı ekrandaki
   kutucuklar değil, o metin: ziyaretçi siteden ayrıldıktan sonra elinde kalan
   tek şey o.

   VERİ
   COUNTRY_CONTENT[ülke].docs — üç ülkenin üçünde de dolu ve tamamı metin.
   Bu araç tek bir sayı üretmiyor, dolayısıyla uydurulacak bir sayısı da yok.
   Grup başlıkları, ipuçları ve alttaki not da veriden basılıyor; burada
   yeniden yazılmış tek cümle yok.

   ÜLKE SAYFALARINDAKİ LİSTEYLE İLİŞKİSİ
   components/CountryDocs.tsx aynı veriyi ülke sayfasında gösteriyor. İkisi
   aynı şey değil: oradaki liste ülke sayfasının anlatısının parçası, tek
   ülkelik ve ekranda kalıyor. Buradaki üç ülkeyi tek yerde topluyor ve
   kopyalanabilir bir çıktı veriyor — Araçlar bölümünün ölçütü tam olarak bu.

   İŞARETLER ÜLKEYE BAĞLI
   `done` anahtarları ülke önekli. Ülke değişince işaretler sıfırlanmıyor,
   ilgili ülkenin işaretleri geri geliyor: üç ülkeyi karşılaştıran biri her
   dönüşte baştan işaretlemek zorunda kalmıyor.
   ========================================================================= */

const COUNTRIES: Country[] = ["dubai", "ingiltere", "kktc"];

export default function DocChecklist() {
  const uid = useId();
  const [country, setCountry] = useState<Country>("dubai");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const [fallback, setFallback] = useState("");

  useEffect(() => {
    if (copied !== "ok") return;
    const t = setTimeout(() => setCopied("idle"), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  const docs = COUNTRY_CONTENT[country].docs;
  const yours = docs.groups[0];
  const ours = docs.groups[1];

  const total = yours ? yours.items.length : 0;
  const count = yours ? yours.items.filter((_, i) => done[`${country}|${i}`]).length : 0;
  const pct = total > 0 ? count / total : 0;

  const buildText = () => {
    const lines = [`Ortac Global · ${COUNTRY_LABELS[country]} kuruluş belge listesi`, ""];
    if (yours) {
      lines.push(yours.title.toLocaleUpperCase("tr-TR"));
      yours.items.forEach((item, i) => {
        lines.push(`${done[`${country}|${i}`] ? "[x]" : "[ ]"} ${item}`);
      });
      lines.push("");
    }
    if (ours) {
      lines.push(`${ours.title.toLocaleUpperCase("tr-TR")} · Ortac yürütüyor`);
      for (const item of ours.items) lines.push(`- ${item}`);
      lines.push("");
    }
    lines.push(`Not: ${docs.note}`);
    return lines.join("\n");
  };

  const onCopy = async () => {
    const text = buildText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
      setFallback("");
    } catch {
      setCopied("fail");
      setFallback(text);
    }
  };

  if (!yours) return null;

  return (
    <div className="tl-app">
      <fieldset className="tl-fs">
        <legend className="tl-legend">Ülke</legend>
        <div className="tl-radios" data-cols="3">
          {COUNTRIES.map((c) => (
            <label key={c} className="tl-radio" data-on={c === country ? "" : undefined}>
              <input
                type="radio"
                name={`${uid}-country`}
                checked={c === country}
                onChange={() => setCountry(c)}
              />
              <span className="tl-radio-t">{COUNTRY_LABELS[c]}</span>
              <span className="tl-radio-h">{COUNTRY_CONTENT[c].tagline}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="tl-cols">
        <div className="tl-col">
          <span className="tl-side">Sizde</span>
          <h3 className="tl-ct-k tl-col-t">{yours.title}</h3>
          <p className="tl-help">{yours.hint}</p>

          <div className="tl-meter">
            <span className="tl-bar" aria-hidden="true">
              <i style={{ transform: `scaleX(${pct})` }} />
            </span>
            <span className="tl-count" role="status" aria-live="polite">
              {count === total ? "Listeniz hazır" : `${count}/${total} hazır`}
            </span>
          </div>

          <ul className="tl-list">
            {yours.items.map((item, i) => {
              const key = `${country}|${i}`;
              return (
                <li key={key} className="tl-item" data-done={done[key] ? "" : undefined}>
                  <label className="tl-tick">
                    <input
                      type="checkbox"
                      checked={!!done[key]}
                      onChange={() => setDone((d) => ({ ...d, [key]: !d[key] }))}
                    />
                    <span className="tl-tick-b" aria-hidden="true">
                      <Check size={12} strokeWidth={3.6} />
                    </span>
                    <span className="tl-tick-t">{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {ours && (
          <div className="tl-col tl-col-ours">
            <span className="tl-side tl-side-o">Bizde</span>
            <h3 className="tl-ct-k tl-col-t">{ours.title}</h3>
            <p className="tl-help">{ours.hint}</p>

            <ol className="tl-ours">
              {ours.items.map((item, i) => (
                <li key={`${i}|${item}`} className="tl-orow">
                  <span className="tl-on" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="tl-actions">
        <button type="button" className="tl-copy" onClick={onCopy}>
          {copied === "ok" ? (
            <Check size={16} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Copy size={16} strokeWidth={2.1} aria-hidden="true" />
          )}
          {copied === "ok" ? "Kopyalandı" : "Listeyi düz metin kopyala"}
        </button>
        <span className="tl-actions-s" role="status" aria-live="polite">
          {copied === "ok" && "Liste panoya kopyalandı."}
          {copied === "fail" && "Pano kullanılamadı; metin aşağıda, elle kopyalayabilirsiniz."}
        </span>
      </div>

      {copied === "fail" && (
        <label className="tl-fallback">
          <span className="sr-only">Kopyalanacak metin</span>
          <textarea readOnly rows={10} value={fallback} />
        </label>
      )}

      <p className="tl-note">{docs.note}</p>
    </div>
  );
}
