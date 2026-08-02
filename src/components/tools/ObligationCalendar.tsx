"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  AFTER_SETUP,
  INCLUSION_LABEL,
  RHYTHM_LABEL,
  type AfterItem,
  type Inclusion,
} from "@/lib/afterSetup";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { addMonths, formatMonth, parseInputDate } from "@/lib/tools/date";
import { ESTIMATE_NOTE } from "@/lib/tools/rates";

/* ============================================================================
   İLK 12 AY YÜKÜMLÜLÜK TAKVİMİ
   ============================================================================

   NE YAPIYOR
   Kuruluş tarihini alıyor, afterSetup.ts'teki yükümlülük ritmini gerçek ay
   adlarına oturtuyor. Ziyaretçi "3. ay" değil "Mart 2027" görüyor; not
   defterine geçirebileceği tek şey de bu.

   TUTAR NEDEN YOK
   afterSetup.ts'in başında çözülmemiş bir fiyat çelişkisi duruyor
   (SWAP:AFTER_PRICING): aynı hizmet orada 350 USD/ay, pricing.ts'te yıllık
   2.100 USD. İki rakam birbirini tutmadığı sürece aracın hiçbirini basmaması
   gerekiyor — bir hesap aracının teyitsiz rakam toplaması, aracı yanlış
   yapardı. Takvim yalnızca NE ZAMAN sorusunu cevaplıyor.

   TEK GERÇEK SON TARİH
   Kurumlar vergisi beyanının süresi countryContent.ts'te açık yazıyor:
   "Vergi döneminin bitiminden itibaren 9 ay içinde". Aydaki "9" bu cümleden
   REGEX'LE çekiliyor, buraya elle yazılmıyor — metin değişirse hesap da
   değişiyor, metin tanınmazsa hesap hiç gösterilmiyor ve yalnızca kuralın
   kendisi basılıyor. Sonuç ay hassasiyetinde veriliyor ("en geç Eylül 2028"):
   gün vermek, veride olmayan bir kesinlik uydurmak olurdu.

   AYLAR NEDEN TEMSİLÎ
   afterSetup.ts'in `months` alanı "mali yılın kuruluşla birlikte başladığı"
   varsayımıyla yazılmış — dosya bunu kendi yorumunda söylüyor. Araç aynı
   varsayımı ekranda da söylüyor, çıktının altında ve kopyalanan metinde.
   ========================================================================= */

const AFTER = AFTER_SETUP.dubai ?? null;

/* Beyan süresi cümlesi ve içindeki ay sayısı — ikisi de veriden. */
const CT_ROW =
  COUNTRY_CONTENT.dubai.tax.rows.find((r) => r.label === "Kurumlar vergisi beyanı") ?? null;
const CT_MONTHS = (() => {
  const m = CT_ROW?.value.match(/(\d+)\s*ay/);
  return m ? Number(m[1]) : null;
})();

/* Renk anahtarı.
 *
 * INCLUSION_LABEL'ın `long` alanı burada AYNEN kullanılamıyor: üç açıklamanın
 * üçü de "örnek hesap" ve "toplama girmez" diyor, yani afterSetup'ın ilk yıl
 * TUTAR tablosuna gönderme yapıyor. Bu araç tutar göstermiyor (dosya başındaki
 * SWAP:AFTER_PRICING notu), dolayısıyla o cümleler burada olmayan bir tabloya
 * işaret ederdi. Anlam korunuyor, çerçeve takvime çevriliyor: soru "toplama
 * giriyor mu" değil, "bu kalem herkeste doğuyor mu".
 *
 * `inc` anahtarları veriden; sözlük değişirse tsc burayı yakalar. */
const KEY: { inc: Inclusion; name: string; line: string }[] = [
  {
    inc: "ornekte",
    name: "Standart",
    line: "Yeni kurulmuş, standart faaliyet gösteren bir şirkette doğuyor.",
  },
  {
    inc: "gerekli-ise",
    name: INCLUSION_LABEL["gerekli-ise"].short,
    line: "Yalnızca şartlar oluşursa doğuyor; sizde doğmayabilir.",
  },
  {
    inc: "istege-bagli",
    name: INCLUSION_LABEL["istege-bagli"].short,
    line: "Kişi veya talep bazlı; kendiliğinden doğmuyor.",
  },
];

/** ordinal ay (1-12) → o ay düşen kalemler */
const BY_MONTH: AfterItem[][] = AFTER
  ? Array.from({ length: 12 }, (_, i) => AFTER.items.filter((it) => it.months.includes(i + 1)))
  : [];

export default function ObligationCalendar() {
  const uid = useId();
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const [fallback, setFallback] = useState("");

  /* "Kopyalandı" rozeti kalıcı olmasın; temizleme zorunlu, yoksa bileşen
     sökülünce açık kalan bir zamanlayıcı state güncellemeye çalışıyor. */
  useEffect(() => {
    if (copied !== "ok") return;
    const t = setTimeout(() => setCopied("idle"), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  if (!AFTER) return null;

  const start = parseInputDate(value);

  /* Mali yıl: kuruluş ayı + 11 ay. Gün taşımıyoruz — veri ay hassasiyetinde. */
  const end = start ? addMonths(start.y, start.m, 11) : null;
  const filing = end && CT_MONTHS !== null ? addMonths(end.y, end.m, CT_MONTHS) : null;

  const buildText = () => {
    if (!start || !end) return "";
    const lines = [
      "Ortac Global — Dubai · ilk 12 ay yükümlülük takvimi",
      `Kuruluş / mali yıl başlangıcı: ${formatMonth(start.y, start.m)}`,
      `Mali yıl sonu: ${formatMonth(end.y, end.m)}`,
      "",
    ];
    for (let i = 0; i < 12; i++) {
      const at = addMonths(start.y, start.m, i);
      lines.push(`${formatMonth(at.y, at.m)}`);
      for (const it of BY_MONTH[i]) {
        const cond = it.inclusion === "ornekte" ? "" : ` (${INCLUSION_LABEL[it.inclusion].short})`;
        lines.push(`  - ${it.title} · ${RHYTHM_LABEL[it.rhythm]}${cond}`);
      }
    }
    if (CT_ROW) {
      lines.push("", `Kurumlar vergisi beyanı: ${CT_ROW.value}`);
      if (filing) lines.push(`Yani en geç: ${formatMonth(filing.y, filing.m)}`);
    }
    lines.push(
      "",
      "Bu bir ön değerlendirmedir, teklif değildir. Aylık dağılım mali yılın",
      "kuruluşla başladığı varsayımına dayanıyor; kesin tarihler lisansınıza ve",
      "otoritenin takvimine göre değişir. Tutar içermez.",
    );
    return lines.join("\n");
  };

  const onCopy = async () => {
    const text = buildText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
      setFallback("");
    } catch {
      /* Pano izni yoksa (güvensiz bağlam, tarayıcı ayarı) araç sessizce
         başarısız olmuyor: metni seçilebilir bir kutuda önüne koyuyor. */
      setCopied("fail");
      setFallback(text);
    }
  };

  return (
    <div className="tl-app">
      <div className="tl-form">
        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-date`}>
            Kuruluş tarihi <span className="tl-label-x">(veya mali yıl başlangıcı)</span>
          </label>
          <input
            id={`${uid}-date`}
            className="tl-input"
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby={`${uid}-help`}
          />
          <p id={`${uid}-help`} className="tl-help">
            Takvim ay hassasiyetinde çalışıyor; günü dikkate almıyor.
          </p>
        </div>
      </div>

      <div className="tl-out" role="status" aria-live="polite">
        {!start || !end ? (
          <p className="tl-out-empty">
            Tarihi girin; ilk 12 ayın hangi ayında ne çıktığını ay adlarıyla listeleyeceğiz.
          </p>
        ) : (
          <>
            <span className="tl-out-k">Mali yılınız</span>
            <strong className="tl-big">
              {formatMonth(start.y, start.m)} – {formatMonth(end.y, end.m)}
            </strong>
          </>
        )}
      </div>

      {start && end && (
        <>
          <ol className="tl-cal">
            {BY_MONTH.map((items, i) => {
              const at = addMonths(start.y, start.m, i);
              return (
                <li key={i} className="tl-cal-row">
                  <span className="tl-cal-m">
                    <b>{formatMonth(at.y, at.m)}</b>
                    <em>{i + 1}. ay</em>
                  </span>
                  <span className="tl-cal-items">
                    {items.map((it) => (
                      <span key={it.id} className="tl-tag" data-inc={it.inclusion}>
                        {it.title}
                        <em>{RHYTHM_LABEL[it.rhythm]}</em>
                      </span>
                    ))}
                  </span>
                </li>
              );
            })}
          </ol>

          <ul className="tl-key">
            {KEY.map((k) => (
              <li key={k.inc} className="tl-key-i" data-inc={k.inc}>
                <i aria-hidden="true" />
                {/* Metin tek bir kapta: aksi hâlde kalın ad ile açıklama iki
                    ayrı esnek öğe oluyor ve uzun açıklama sarmalanamıyor. */}
                <span>
                  <b>{k.name}</b> — {k.line}
                </span>
              </li>
            ))}
          </ul>

          {CT_ROW && (
            <div className="tl-ct">
              <span className="tl-ct-k">Kurumlar vergisi beyanı</span>
              <p className="tl-ct-rule">{CT_ROW.value}</p>
              {filing && (
                <p className="tl-ct-out">
                  Mali yıl sonunuz <b>{formatMonth(end.y, end.m)}</b> olduğuna göre beyan için son
                  ay: <b>{formatMonth(filing.y, filing.m)}</b>
                </p>
              )}
            </div>
          )}

          <div className="tl-actions">
            <button type="button" className="tl-copy" onClick={onCopy}>
              {copied === "ok" ? (
                <Check size={16} strokeWidth={2.4} aria-hidden="true" />
              ) : (
                <Copy size={16} strokeWidth={2.1} aria-hidden="true" />
              )}
              {copied === "ok" ? "Kopyalandı" : "Takvimi düz metin kopyala"}
            </button>
            <span className="tl-actions-s" role="status" aria-live="polite">
              {copied === "ok" && "Takvim panoya kopyalandı."}
              {copied === "fail" && "Pano kullanılamadı; metin aşağıda, elle kopyalayabilirsiniz."}
            </span>
          </div>

          {copied === "fail" && (
            <label className="tl-fallback">
              <span className="sr-only">Kopyalanacak metin</span>
              <textarea readOnly rows={8} value={fallback} />
            </label>
          )}
        </>
      )}

      <p className="tl-note">
        Aylık dağılım, mali yılın kuruluşla birlikte başladığı varsayımına dayanıyor. Hangi kalemin
        sizin şirketinizde doğacağı faaliyetinize, lisansınıza ve işlem hacminize bağlı — bu yüzden
        koşullu kalemler ayrı işaretli.
      </p>
      <p className="tl-note">{AFTER.firstYear.outNote}</p>
      {/* Araç bir TARİH üretiyor, yani ekranda bir çıktı bırakıyor. Ortak
          ibare tek yerden geliyor (lib/tools/rates.ts · ESTIMATE_NOTE);
          hesaplayıcılarla aynı cümle, çünkü sınır da aynı. */}
      <p className="tl-note">{ESTIMATE_NOTE}</p>
    </div>
  );
}
