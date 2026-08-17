import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";
import { MtHead } from "@/components/lab/MtakvimShared";
import {
  MTW_AXIS,
  MtwDoors,
  MtwNote,
  mtwConditional,
  mtwCount,
  mtwFreq,
  mtwLanes,
  mtwMonthsText,
  mtwTotal,
} from "@/components/lab/CalMTShared4";

/* ============================================================================
   MT11 · ÜÇ SAYAÇ — yüzeydeki tek nesne bir SAYI

   Referans: /dubai'deki "kuruluştan sonra seni ne bekliyor" (CountryAfter).
   Ölçüm neden iyi olduğunu söylüyor: 46 duran nesne, ama kapıların arkasında
   339 eleman. Yüzey/derinlik oranı 7,4 — takvimde 0,34. Yani o bölüm bizden
   ÜÇ KAT fazla bilgi taşıyor ve yarısı kadar nesne gösteriyor.

   CountryAfter'dan alınan üç kural:
     1) BİR ÇAPA RAKAM. Orada "9.820 USD"; burada 17. Rakam veriden toplanıyor
        (12 + 4 + 1), elle yazılmıyor. Kaydırıp geçen biri tek bakışta
        "ilk yıl bu kadar kere iş çıkıyor" cevabını alıp gidebiliyor.
     2) MATRİS DEĞİL, ORANLI ÇUBUK. Orada 365'e karşı 182 iki çubukla
        anlatılıyor ve "iki katı" cümlesi hiç kurulmuyor. Burada 12 · 4 · 1
        aynı eksende üç çubuk: yığılma farkı okunuyor, sayılmıyor.
     3) DÜRÜSTLÜK ŞERHİ KAPIYA GİRMEZ. Orada "koşullu kalemler toplamın
        dışında" döküm hiç açılmasa da yazıyor. Burada KDV'nin herkeste
        doğmadığı ve "bu işin çıktığı ay, teslim tarihi değil" şerhi yüzeyde.

   MATRİS NEREYE GİTTİ: 36 kutu 3 satırlık YAZIYA döndü ("hepsi" / "3 · 6 · 9 ·
   12" / "12"). Aynı olgu, 36 nesne yerine 3 nesne — ve bölümün kendi sorusu
   ("hangi ay ne oluyor") yüzeyde cevapsız kalmıyor. Ay ekseninin adı sütun
   başlığında bir kez yazılı, on iki kez değil.

   HAREKET: gece panelinde üç çubuğun üstünden sırayla geçen tek ışık,
   21.283s. Saf CSS, reduce kapısı CSS'te.
   ========================================================================= */

export default function CalMT11() {
  const lanes = mtwLanes();
  const total = mtwTotal(lanes);
  const enCok = Math.max(...lanes.map(mtwCount), 1);

  return (
    <section className="mtx-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <MtHead />

        <div className="mtw-body">
          {/* Şeridin sorusu silinmiyor, panelin başlığı oluyor: aşağıdaki üç
              satır tam olarak bu soruya cevap veriyor. */}
          <p className="mtw-sub">{C.calendar.stripTitle}</p>

          <div className="mtw-anchor">
            <div className="mtw-anchor-head">
              <p className="mtw-anchor-k">İlk 12 ay</p>
              <p className="mtw-anchor-v">
                <span className="mtw-anchor-num">{total}</span>
                <span className="mtw-anchor-u">kez iş çıkıyor</span>
              </p>
              <p className="mtw-anchor-l">
                Üç kalem, üç ayrı sıklık. Hangisinin hangi ayda doğduğu aşağıdaki
                satırlarda yazılı.
              </p>
            </div>

            {/* Sütun başlığı bir kez: ekseni adlandıran cümle on iki kutunun
                üstünde değil, tek satırda duruyor. */}
            <p className="mtw-cols" aria-hidden="true">
              <span>Kalem</span>
              <span>Yılda kaç kez</span>
              <span>{MTW_AXIS}</span>
            </p>

            <ul className="mtw-meters">
              {lanes.map((l, i) => {
                const n = mtwCount(l);
                const kosul = mtwConditional(l);
                return (
                  <li
                    key={l.id}
                    className="mtw-meter"
                    /* Faz: üç çubuk aynı periyotta dönüyor, onları ayıran tek
                       şey bu. Zincir'in kuralı — üç ayrı efekt değil, panelin
                       içinde dolaşan tek dalga. Değer yalnız satır sırasına
                       bağlı, yani sunucu ile istemci aynı stili yazıyor. */
                    style={{ "--faz": `-${(i * 7.1).toFixed(1)}s` } as React.CSSProperties}
                  >
                    <p className="mtw-meter-k">
                      <b>{l.label}</b>
                      <span>{mtwFreq(l)}</span>
                      {kosul && <em className="mtw-tag" data-tone="night">{kosul}</em>}
                    </p>

                    {/* Çubuk yalnızca oranı taşıyor; sayı yanında GERÇEK metin
                        olarak duruyor. CountryAfter'ın kuralı: sayı çubuğun
                        içindeyken sunucudan gelen HTML'de görünmüyordu. */}
                    <span className="mtw-meter-t" aria-hidden="true">
                      <span
                        className="mtw-meter-f"
                        style={{ "--w": `${(n / enCok) * 100}%` } as React.CSSProperties}
                      />
                    </span>
                    <p className="mtw-meter-n">
                      {n}
                      <span>&nbsp;kez</span>
                    </p>

                    {/* Matrisin yazıya çevrilmiş hâli. Aynı months dizisi. */}
                    <p className="mtw-meter-m">{mtwMonthsText(l)}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <MtwNote subject="Satırlar" />
        </div>

        <MtwDoors />
      </div>
    </section>
  );
}
