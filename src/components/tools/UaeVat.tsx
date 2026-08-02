"use client";

import { useId, useState } from "react";
import { ESTIMATE_NOTE, UAE_VAT, needsConfirm, ruleOf } from "@/lib/tools/rates";
import { formatAmount, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   BAE KDV HESAPLAYICI
   ============================================================================

   NE YAPIYOR
   Tek bir çevirim: KDV hariç tutardan KDV'li tutara ya da tersi. Belgenin
   istediği araç da tam olarak bu — "%5 KDV, dâhil/hariç hesap" (s.6).

   NEDEN İKİ YÖN BİRDEN
   Çünkü ziyaretçinin elindeki tutar bazen matrah, bazen tahsil ettiği toplam.
   Yönü yanlış anlayan bir hesap, %5'lik bir vergide %0,24'lük bir sapma
   yaratıyor ve fatura tutmuyor. Tek yönlü bir araç, kullanıcının işini yarım
   yapıp hatayı ona bırakırdı.

   YÖN SEÇİMİ AÇILIR MENÜ DEĞİL
   İki seçenek de ekranda görünüyor (sitenin bu turdaki kararı; aynı kalıp
   iletişim sayfasında ve belge listesinde). İki şıklı bir açılır menü, seçimi
   görünmez yapıp yanlış yönde hesaplama riskini artırıyor.

   SAYILAR NEREDEN
   lib/tools/rates.ts · UAE_VAT (SWAP:TOOL_RATES). Bu dosyada oran sabiti yok.
   Kural cümlesi de yeniden yazılmıyor, countryContent.ts'ten aynen basılıyor.

   KAYIT EŞİĞİ NEDEN HESAPLANMIYOR
   Eşik kuralı ekranda yazıyor ama araç "kayıt zorunluluğunuz var" demiyor.
   Eşiğe hangi tutarların girdiği (vergiye tabi tedarik) faaliyete göre
   değişiyor; ziyaretçinin yazdığı tek bir tutardan bu çıkarılamaz. Söyleseydik
   araç bilmediği bir şeyi iddia etmiş olurdu.
   ========================================================================= */

type Mode = "haric" | "dahil";

const MODES: { key: Mode; label: string; hint: string }[] = [
  { key: "haric", label: "Tutar KDV hariç", hint: "Elinizdeki rakam matrah" },
  { key: "dahil", label: "Tutar KDV dâhil", hint: "Elinizdeki rakam toplam" },
];

const RULE = ruleOf(UAE_VAT.rate);
const CONFIRM = needsConfirm(UAE_VAT.rate, UAE_VAT.registration);

export default function UaeVat() {
  const uid = useId();
  const [mode, setMode] = useState<Mode>("haric");
  const [value, setValue] = useState("");

  const amount = parseAmount(value);
  const r = UAE_VAT.rate.value;

  /* İki yön tek yerde: hariçse matrah girilen tutar, dâhilse toplam girilen
     tutar. Aradaki fark bölme yönü — ayrı iki hesap yazmak, birini güncelleyip
     ötekini unutmanın en kısa yolu olurdu. */
  const net = amount === null ? 0 : mode === "haric" ? amount : amount / (1 + r);
  const vat = net * r;
  const gross = net + vat;

  return (
    <div className="tl-app">
      <div className="tl-form">
        <fieldset className="tl-fs">
          <legend className="tl-legend">Girdiğiniz tutar</legend>
          <div className="tl-radios">
            {MODES.map((m) => (
              <label key={m.key} className="tl-radio" data-on={m.key === mode ? "" : undefined}>
                <input
                  type="radio"
                  name={`${uid}-mode`}
                  checked={m.key === mode}
                  onChange={() => setMode(m.key)}
                />
                <span className="tl-radio-t">{m.label}</span>
                <span className="tl-radio-h">{m.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-amount`}>
            Tutar <span className="tl-label-x">({UAE_VAT.currency})</span>
          </label>
          <input
            id={`${uid}-amount`}
            className="tl-input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="10.000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby={`${uid}-help`}
          />
          <p id={`${uid}-help`} className="tl-help">
            Binlik ayracı nokta, ondalık virgül: <b>10.000,50</b>.
          </p>
        </div>
      </div>

      <div className="tl-out" role="status" aria-live="polite">
        {amount === null ? (
          <p className="tl-out-empty">
            Tutarı yazın; matrah, KDV ve toplam üç satır hâlinde çıksın.
          </p>
        ) : (
          <>
            <span className="tl-out-k">
              {mode === "haric" ? "KDV dâhil toplam" : "KDV hariç matrah"}
            </span>
            <strong className="tl-big">
              {formatAmount(mode === "haric" ? gross : net, 2)} {UAE_VAT.currency}
            </strong>
            <span className="tl-sub">
              {UAE_VAT.rate.label} oranıyla hesaplanan KDV: <b>{formatAmount(vat, 2)}</b>{" "}
              {UAE_VAT.currency}
            </span>
          </>
        )}
      </div>

      {amount !== null && (
        <table className="tl-tab">
          <caption className="sr-only">KDV dökümü</caption>
          <thead>
            <tr>
              <th scope="col">Satır</th>
              <th scope="col">Tutar ({UAE_VAT.currency})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Matrah (KDV hariç)</th>
              <td>{formatAmount(net, 2)}</td>
            </tr>
            <tr>
              <th scope="row">KDV {UAE_VAT.rate.label}</th>
              <td>{formatAmount(vat, 2)}</td>
            </tr>
            <tr data-sum="">
              <th scope="row">Toplam (KDV dâhil)</th>
              <td>{formatAmount(gross, 2)}</td>
            </tr>
          </tbody>
        </table>
      )}

      {RULE && (
        <div className="tl-ct">
          <span className="tl-ct-k">Kayıt eşiği</span>
          <p className="tl-ct-rule">
            {RULE.label} {RULE.value}
          </p>
          {RULE.note && <p className="tl-ct-out">{RULE.note}</p>}
          <p className="tl-ct-out">
            Bu araç kayıt zorunluluğunuz olup olmadığını söylemiyor: eşiğe hangi tutarların girdiği
            faaliyetinize bağlı.
          </p>
        </div>
      )}

      {CONFIRM && (
        <p className="tl-warn">
          Oran ve eşik <b>teyit bekliyor</b>: {UAE_VAT.rate.label} oranı ve{" "}
          {UAE_VAT.registration.label} kayıt eşiği depodaki vergi tablosundan alındı, mali müşavir
          onayından geçmedi.
        </p>
      )}

      <p className="tl-note">{ESTIMATE_NOTE}</p>
    </div>
  );
}
