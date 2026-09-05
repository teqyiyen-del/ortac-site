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

   ---------------------------------------------------------------------------
   BU TURDA EKLENEN İKİ SEÇİM

   Müşteri: "kurumlar vergisi hesaplama kısmını biraz düzgün yap, bi seçme
   şeyi olsun, Dubai şirket kuruluş sayfasındaki hesaplayıcı gibi." Oradaki
   yapılandırıcı (CountryPricing · .ip-) tek bir kutuya yazdırmıyor; seçim
   yaptırıyor ve sonucu yanında kuruyor.

   Buraya iki seçim girdi ve ikisi de YENİ VERİ GEREKTİRMİYOR — hesaplayıcıya
   girecek her sayının kaynağı hâlâ rates.ts:

     1) DÖNEM. Kazancını aylık düşünen çok kişi var ve araç yıllık istiyordu;
        "aylık" seçilince girilen tutar 12 ile çarpılıyor, o kadar. Çarpım
        ekranda da yazıyor, gizli bir dönüşüm yok. Bu bir varsayım ve öyle
        söyleniyor: on iki ayın eşit olduğu varsayılıyor.

     2) HAZIR TUTARLAR. Tek başına boş bir kutu, "ne yazsam" diye düşündürüp
        aracı hiç kullandırmıyordu. Çipler bir İDDİA DEĞİL, birer örnek
        girdi — hiçbiri "tipik kazanç" demiyor. Aralarında eşiğin kendisi
        (375.000) bilerek var: aracın anlattığı şeyi tek tıkla gösteren
        sayı o.

   SERBEST BÖLGE MUAFİYETİ HESABA GİRMİYOR
   Ve bu bir eksiklik değil, karar. countryContent.ts'in kendi cümlesi:
   "Serbest bölge şirketi olmak otomatik muafiyet vermiyor. %0 oranı, şartları
   sağlayan nitelikli serbest bölge mükellefinin nitelikli gelirinde geçerli."
   Yani muafiyet bir kutucukla açılıp kapanacak bir şey değil; bir kutucuk
   koysaydık araç, karşılığı olmayan bir "%0" sonucu üretirdi. Kuralın kendisi
   ekranda yazıyor, hesap standart oran üzerinden yürüyor.
   ========================================================================= */

/* Dönem seçenekleri. `kat` doğrudan çarpan: yıllıkta 1, aylıkta 12. Sayı
   burada tek bir yerde duruyor ki bileşenin içine ikinci bir 12 sızmasın. */
const DONEMLER = [
  { key: "yillik", label: "Yıllık", hint: "Bir mali yılın tamamı" },
  { key: "aylik", label: "Aylık", hint: "12 ile çarpılıp yıllığa çevrilir" },
] as const;
type Donem = (typeof DONEMLER)[number]["key"];

/* Örnek girdiler, iddia değil. Yıllık dizinin ortasındaki 375.000 eşiğin
   kendisi: tek tıkla "eşiğe kadar sıfır" durumu görünüyor. Aylık dizi onun
   12'ye bölünmüş yakın karşılıkları, yuvarlak sayılara oturtuldu. */
const HAZIR: Record<Donem, number[]> = {
  yillik: [250_000, 375_000, 500_000, 1_000_000, 2_000_000],
  aylik: [20_000, 31_250, 50_000, 100_000, 200_000],
};

const RULE = ruleOf(UAE_CT.upper);
const FZ_RULE = ruleOf({ ...UAE_CT.upper, repoRow: { country: "dubai", label: "Serbest bölge şirketi" } });
const CONFIRM = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);

export default function UaeCorporateTax() {
  const uid = useId();
  const [donem, setDonem] = useState<Donem>("yillik");
  const [value, setValue] = useState("");

  const girilen = parseAmount(value);
  const kat = donem === "aylik" ? 12 : 1;
  /* Hesabın tamamı YILLIK kazanç üzerinden; dönem yalnızca girdiyi çeviriyor. */
  const profit = girilen === null ? null : girilen * kat;

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
        {/* Dönem seçimi ve kural kutusu TEK SÜTUNDA. Ayrı ayrı ızgara
            hücresi olsalardı ikisi farklı satıra düşüyordu: sağdaki alan
            (kutu + hazır çipler + yardım satırı) birinci satırı yükseltiyor
            ve solda kural kutusuna kadar boş bir bant kalıyordu. Ölçüldü,
            ekran görüntüsünde görüldü. Sarmalayınca ikisi arka arkaya
            akıyor. */}
        <div className="tl-stack">
          <fieldset className="tl-fs">
          <legend className="tl-legend">1 · Kazanç dönemi</legend>
          <div className="tl-radios">
            {DONEMLER.map((d) => (
              <label key={d.key} className="tl-radio" data-on={d.key === donem ? "" : undefined}>
                <input
                  type="radio"
                  name={`${uid}-donem`}
                  checked={d.key === donem}
                  onChange={() => setDonem(d.key)}
                />
                <span className="tl-radio-t">{d.label}</span>
                <span className="tl-radio-h">{d.hint}</span>
              </label>
            ))}
          </div>
          </fieldset>

          {RULE && (
            <div className="tl-ct">
              <span className="tl-ct-k">Uygulanan kural</span>
              <p className="tl-ct-rule">{RULE.value}</p>
              {RULE.note && <p className="tl-ct-out">{RULE.note}</p>}
            </div>
          )}
        </div>

        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-profit`}>
            2 · {donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi kazanç{" "}
            <span className="tl-label-x">({UAE_CT.currency})</span>
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
          {/* Hazır tutarlar. Düğme, bağlantı değil: sayfayı değiştirmiyor,
              yalnızca kutuyu dolduruyor. Seçili olanı işaretliyoruz ki kişi
              kendi yazdığı sayıyla çipten geleni ayırt edebilsin. */}
          <div className="tl-hazir">
            <span className="tl-hazir-k">Hazır tutarlar</span>
            {HAZIR[donem].map((h) => (
              <button
                key={h}
                type="button"
                className="tl-hazir-b"
                data-on={girilen === h ? "" : undefined}
                onClick={() => setValue(formatAmount(h))}
              >
                {formatAmount(h)}
              </button>
            ))}
          </div>
          <p id={`${uid}-help`} className="tl-help">
            Ciro değil, vergiye tabi kazanç. Binlik ayracı nokta, ondalık virgül:{" "}
            <b>500.000</b> beş yüz bin demek.
          </p>
        </div>

      </div>

      <div className="tl-out" role="status" aria-live="polite">
        {profit === null ? (
          <p className="tl-out-empty">
            Kazancınızı yazın; eşiğin altı ve üstü ayrı hesaplanır, toplam vergi ile efektif oran
            gösterilir.
          </p>
        ) : (
          <>
            <span className="tl-out-k">Hesaplanan kurumlar vergisi</span>
            <strong className="tl-big">
              {formatAmount(tax)} {UAE_CT.currency}
            </strong>
            <span className="tl-sub">
              {donem === "aylik" && girilen !== null && (
                <>
                  Aylık {formatAmount(girilen)} × 12 ={" "}
                  <b>
                    {formatAmount(profit)} {UAE_CT.currency}
                  </b>{" "}
                  yıllık kazanç.{" "}
                </>
              )}
              {formatAmount(profit)} {UAE_CT.currency} kazanç üzerinden efektif oran{" "}
              <b>{formatPercent(effective, 2)}</b>, çünkü {UAE_CT.threshold.label} eşiğine kadarki
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

      {donem === "aylik" && (
        <p className="tl-note">
          <b>Aylık girdi bir varsayım taşıyor:</b> on iki ayın birbirine eşit olduğunu kabul
          ediyoruz. Vergi yılın tamamındaki vergiye tabi kazanç üzerinden hesaplanıyor; ayları
          değişkense yıllık toplamı yazmak daha doğru sonuç verir.
        </p>
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
