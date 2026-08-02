"use client";

import { useId, useState } from "react";
import { ESTIMATE_NOTE, UAE_CT, needsConfirm, ruleOf } from "@/lib/tools/rates";
import { formatAmount, formatPercent, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   BAE KURUMLAR VERGİSİ HESAPLAYICI
   ============================================================================

   NE YAPIYOR
   Vergiye tabi kazancı iki dilime bölüyor — eşiğe kadarı ve eşiği aşan kısım —
   her birine kendi oranını uygulayıp toplamı ve efektif oranı yazıyor.

   SAYILAR NEREDEN
   Tek kaynak lib/tools/rates.ts · UAE_CT (SWAP:TOOL_RATES). Bu dosyada tek bir
   oran ya da eşik sabiti YOK. Aynı sebeple hesabın dayandığı KURAL da burada
   yeniden yazılmıyor: ruleOf() countryContent.ts'teki doğrulanmış satırı
   getiriyor ve ekrana aynen basılıyor. Gözden geçiren kişi kuralı ve sayıyı
   yan yana görüyor; ikisi ayrışırsa fark ediliyor.

   EFEKTİF ORAN NEDEN VAR
   Asıl işi yapan satır o. "%9" korkutucu bir sayı ama eşik altı %0 olduğu için
   gerçek yük her zaman daha düşük; 500.000 AED kazançta efektif oran %2,25.
   Belgenin "kaça mal olur korkusunu siler" dediği şeyin vergi tarafındaki
   karşılığı bu tek satır (belge s.4).

   SERBEST BÖLGE MUAFİYETİ HESABA GİRMİYOR
   Ve bu bir eksiklik değil, karar. countryContent.ts'in kendi cümlesi:
   "Serbest bölge şirketi olmak otomatik muafiyet vermiyor. %0 oranı, şartları
   sağlayan nitelikli serbest bölge mükellefinin nitelikli gelirinde geçerli."
   Yani muafiyet bir kutucukla açılıp kapanacak bir şey değil; bir kutucuk
   koysaydık araç, karşılığı olmayan bir "%0" sonucu üretirdi. Kuralın kendisi
   ekranda yazıyor, hesap standart oran üzerinden yürüyor.
   ========================================================================= */

const RULE = ruleOf(UAE_CT.upper);
const FZ_RULE = ruleOf({ ...UAE_CT.upper, repoRow: { country: "dubai", label: "Serbest bölge şirketi" } });
const CONFIRM = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);

export default function UaeCorporateTax() {
  const uid = useId();
  const [value, setValue] = useState("");

  const profit = parseAmount(value);

  /* Hesabın tamamı üç satır. Eşiğe kadarki kısım her zaman düşük oranla,
     yalnızca AŞAN kısım yüksek oranla — dilimli vergide sık yapılan hata
     tutarın tamamına yüksek oranı uygulamak. */
  const lowerBase = profit === null ? 0 : Math.min(profit, UAE_CT.threshold.value);
  const upperBase = profit === null ? 0 : Math.max(0, profit - UAE_CT.threshold.value);
  const tax = lowerBase * UAE_CT.lower.value + upperBase * UAE_CT.upper.value;
  const effective = profit && profit > 0 ? tax / profit : 0;

  return (
    <div className="tl-app">
      <div className="tl-form">
        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-profit`}>
            Vergiye tabi kazanç <span className="tl-label-x">({UAE_CT.currency})</span>
          </label>
          {/* type="number" değil: tarayıcının kendi ok tuşları ve yerel ayrım
              işareti davranışı, Türkçe binlik noktasıyla çakışıyor. Metin alanı
              + inputMode="decimal" mobilde de sayı klavyesi açıyor. */}
          <input
            id={`${uid}-profit`}
            className="tl-input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="500.000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby={`${uid}-help`}
          />
          <p id={`${uid}-help`} className="tl-help">
            Ciro değil, vergiye tabi kazanç. Binlik ayracı nokta, ondalık virgül:{" "}
            <b>500.000</b> beş yüz bin demek.
          </p>
        </div>

        {RULE && (
          <div className="tl-ct">
            <span className="tl-ct-k">Uygulanan kural</span>
            <p className="tl-ct-rule">{RULE.value}</p>
            {RULE.note && <p className="tl-ct-out">{RULE.note}</p>}
          </div>
        )}
      </div>

      <div className="tl-out" role="status" aria-live="polite">
        {profit === null ? (
          <p className="tl-out-empty">
            Kazancınızı yazın; eşiğin altı ve üstü ayrı hesaplanıp toplam vergi ve efektif oran
            çıksın.
          </p>
        ) : (
          <>
            <span className="tl-out-k">Hesaplanan kurumlar vergisi</span>
            <strong className="tl-big">
              {formatAmount(tax)} {UAE_CT.currency}
            </strong>
            <span className="tl-sub">
              {formatAmount(profit)} {UAE_CT.currency} kazanç üzerinden efektif oran{" "}
              <b>{formatPercent(effective, 2)}</b> — çünkü {UAE_CT.threshold.label} eşiğine kadarki
              kısma {UAE_CT.lower.label} uygulanıyor.
            </span>
          </>
        )}
      </div>

      {profit !== null && (
        <>
          <table className="tl-tab">
            <caption className="sr-only">Dilim dilim kurumlar vergisi hesabı</caption>
            <thead>
              <tr>
                <th scope="col">Dilim</th>
                <th scope="col">Matrah</th>
                <th scope="col">Oran</th>
                <th scope="col">Vergi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{UAE_CT.threshold.label} ve altı</th>
                <td>{formatAmount(lowerBase)}</td>
                <td>{UAE_CT.lower.label}</td>
                <td>{formatAmount(lowerBase * UAE_CT.lower.value)}</td>
              </tr>
              <tr>
                <th scope="row">Eşiği aşan kısım</th>
                <td>{formatAmount(upperBase)}</td>
                <td>{UAE_CT.upper.label}</td>
                <td>{formatAmount(upperBase * UAE_CT.upper.value)}</td>
              </tr>
              <tr data-sum="">
                <th scope="row">Toplam</th>
                <td>{formatAmount(profit)}</td>
                <td>{formatPercent(effective, 2)}</td>
                <td>{formatAmount(tax)}</td>
              </tr>
            </tbody>
          </table>
          <p className="tl-note">
            Vergi sonrası kalan: <b>{formatAmount(profit - tax)} {UAE_CT.currency}</b>. Tablodaki
            bütün tutarlar {UAE_CT.currency} cinsinden.
          </p>
        </>
      )}

      {FZ_RULE && (
        <p className="tl-note">
          <b>Serbest bölge:</b> {FZ_RULE.note ?? FZ_RULE.value} Bu yüzden hesap standart oran
          üzerinden yürüyor; muafiyeti bir kutucukla açmak, karşılığı olmayan bir sonuç üretirdi.
        </p>
      )}

      {CONFIRM && (
        <p className="tl-warn">
          Oran ve eşik <b>teyit bekliyor</b>: {UAE_CT.threshold.label} eşiği ve {UAE_CT.upper.label}{" "}
          oranı depodaki vergi tablosundan alındı, mali müşavir onayından geçmedi.
        </p>
      )}

      <p className="tl-note">{ESTIMATE_NOTE}</p>
    </div>
  );
}
