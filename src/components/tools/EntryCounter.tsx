"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { CalendarClock } from "lucide-react";
import { AFTER_SETUP } from "@/lib/afterSetup";
import { addDays, daysBetween, formatDate, parseInputDate, todayKey } from "@/lib/tools/date";

/* ============================================================================
   OTURUM İZNİ GİRİŞ SAYACI
   ============================================================================

   NE HESAPLIYOR
   BAE oturum izni kendiliğinden devam etmiyor: belirli aralıklarla ülkeye
   giriş yapılmadığında düşüyor ve sayaç her girişte sıfırlanıyor. Araç tek bir
   şey yapıyor — son giriş tarihine aralığı ekleyip son günü söylüyor.

   SAYILAR NEREDEN GELİYOR
   Tek kaynak AFTER_SETUP.dubai.entry. Yatırımcı oturumunda 365, çalışan
   oturumunda 182 gün — ikisi de müşterinin kendi dokümanından gelen ve
   afterSetup.ts'te `days` alanında duran değerler. Bu dosyada tek bir sabit
   gün sayısı YOK; veri değişirse araç kendiliğinden değişiyor. Aynı sebeple
   seçeneklerin adı ve altındaki açıklama da veriden basılıyor, burada yeniden
   yazılmıyor.

   NEDEN "BUGÜN" GEÇ GELİYOR
   Son tarihin kendisi bugünü bilmeden hesaplanıyor (son giriş + aralık), o
   yüzden sunucuda da basılabiliyor. "Kaç gün kaldı" ise bugüne bağlı ve bugün
   sunucuda okunamaz: sayfa önceden üretilmişse sunucunun günü ile ziyaretçinin
   günü ayrılır, React de hidrasyon uyuşmazlığı verir.

   Çözüm useSyncExternalStore: sunucu anlık görüntüsü null, istemci anlık
   görüntüsü bugünün tarihi. Sunucu HTML'i ile tarayıcının ilk render'ı birebir
   aynı oluyor, kalan gün satırı hidrasyondan hemen sonra geliyor. useEffect +
   setState ile de olurdu ama o, effect içinde senkron setState demek — depo
   bunu lint hatası sayıyor (react-hooks/set-state-in-effect) ve haklı: bu bir
   dış sistemden okuma, bir yan etki değil.
   ========================================================================= */

const ENTRY = AFTER_SETUP.dubai?.entry ?? null;

/* Kaynak hiç değişmiyor (gün ortasında sayfayı güncellemek istemiyoruz),
   o yüzden abonelik boş bir çıkış işlevi dönüyor. */
const noSubscribe = () => () => {};
const serverToday = () => null;

/** Kalan güne göre üç durum. Renk CSS'te; burada yalnızca ad ve cümle var.
 *  Hüküm kurmuyoruz: süre geçtiğinde "izniniz düştü" demiyoruz, aralığın
 *  aşıldığını söylüyoruz — gerçek durum göç idaresinin kendi kaydında. */
function statusOf(remaining: number): { key: "ok" | "yakin" | "gecti"; line: string } {
  if (remaining < 0) return { key: "gecti", line: `Aralık ${Math.abs(remaining)} gün önce doldu.` };
  if (remaining === 0) return { key: "yakin", line: "Son gün bugün." };
  if (remaining <= 60) return { key: "yakin", line: `${remaining} gün kaldı.` };
  return { key: "ok", line: `${remaining} gün kaldı.` };
}

export default function EntryCounter() {
  const uid = useId();
  const [rowIndex, setRowIndex] = useState(0);
  const [value, setValue] = useState("");
  /* null = sunucu render'ı; bugün yalnızca tarayıcıda biliniyor */
  const today = parseInputDate(
    useSyncExternalStore(noSubscribe, todayKey, serverToday) ?? "",
  );

  /* Veri gelmeden bölüm hiç çıkmıyor — boş bir form göstermek, kuralın
     yokmuş gibi okunmasına yol açardı. */
  if (!ENTRY || ENTRY.rows.length === 0) return null;

  const row = ENTRY.rows[Math.min(rowIndex, ENTRY.rows.length - 1)];
  const last = parseInputDate(value);
  const due = last ? addDays(last, row.days) : null;
  const remaining = due && today ? daysBetween(today, due) : null;
  const status = remaining === null ? null : statusOf(remaining);

  return (
    <div className="tl-app">
      <div className="tl-form">
        <fieldset className="tl-fs">
          <legend className="tl-legend">Oturum tipi</legend>
          <div className="tl-radios">
            {ENTRY.rows.map((r, i) => (
              <label key={r.who} className="tl-radio" data-on={i === rowIndex ? "" : undefined}>
                <input
                  type="radio"
                  name={`${uid}-type`}
                  checked={i === rowIndex}
                  onChange={() => setRowIndex(i)}
                />
                <span className="tl-radio-t">{r.who}</span>
                <span className="tl-radio-h">{r.short}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-date`}>
            BAE&apos;ye son giriş tarihiniz
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
            Pasaportunuzdaki en son BAE giriş damgasının tarihi.
          </p>
        </div>
      </div>

      {/* Sonuç düğümü her zaman DOM'da: aria-live bölgesinin sonradan
          eklenmesi, ekran okuyucuların ilk sonucu duyurmamasına yol açıyor. */}
      <div className="tl-out" role="status" aria-live="polite" data-state={status?.key}>
        {!last || !due ? (
          <p className="tl-out-empty">
            Tarihi girin; {row.days} günlük aralığın son gününü buraya yazacağız.
          </p>
        ) : (
          <>
            <span className="tl-out-k">En geç bu tarihe kadar BAE&apos;ye girmelisiniz</span>
            <strong className="tl-big">
              <CalendarClock size={22} strokeWidth={2} aria-hidden="true" />
              {formatDate(due)}
            </strong>
            <span className="tl-sub">
              {row.who} · {row.days} gün · son giriş {formatDate(last)}
              {status ? ` · ${status.line}` : ""}
            </span>
          </>
        )}
      </div>

      <p className="tl-note">{row.line}</p>
      <p className="tl-note">{ENTRY.note}</p>
    </div>
  );
}
