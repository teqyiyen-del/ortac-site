"use client";

import { ArrowRight, Info } from "lucide-react";
import CountUp from "@/components/shared/CountUp";
import SmartLink from "@/components/shared/SmartLink";
import { AfBayrak, AfCips } from "@/components/lab/FiyatAlanParca";
import { extraFor, type Need, type NeedKey } from "@/components/lab/fiyatKart";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS } from "@/lib/brand";

/* ============================================================================
   LAB · ADAY 1 · "LEVHA" · .af1-

   İÇERİK KARARI — EN AZ BİLGİ
   Bölüm üç soruya iniyor: hangi ülke, kaç para, ne kadar sürede. Ekrandan
   çıkanlar ve nereye gittikleri:
     · kalem listesi + tutarlar  → /dubai fiyat bölümü, /ulkeler kıyası
     · kapsam cümlesi (SCOPE)    → ülke sayfası
     · satır dipnotları          → ülke sayfası hero'su (PageHero, FACTS.limit)
     · "Detaylı fiyat" düğmesi   → zaten üçün İKİSİNDE ölü bağlantıydı
       (/ingiltere ve /kktc dolaşıma kapalı, SmartLink onları sönük span
        basıyor). Yani bu düğme bugün ekranda üç kez duruyor, bir kez
        çalışıyor. Silmenin bedeli düşünüldüğünden küçük.
     · bölüm alt metni (sec-lead) → başlık zaten aynı şeyi söylüyor

   ÇİPLER KALDI ama işleri daraldı: bir liste açmıyorlar, yalnızca rakamı ve
   kapsam hapını çeviriyorlar. Bölümün adı "ihtiyacınıza göre" ve o cümleyi
   ayakta tutan tek şey onlar.

   KONTRAST — MAVİNİN ÜSTÜNDE KÜÇÜK PUNTO YOK
   Zemin saf marka mavisi (#307fe2); beyaz metin orada 3,99:1 veriyor ve normal
   punto eşiği 4,5:1'in altında. Bu adayın cevabı zemini değiştirmek değil,
   MAVİNİN ÜSTÜNDE KÜÇÜK PUNTO BIRAKMAMAK:
     · >=24px veya >=18.66px kalın olan her şey mavide (3:1 eşiği, geçiyor)
     · küçük olan her şey beyaz hapta ya da beyaz kaidede (>=6,69:1)
   Süre ve kapsam bilgisi bu yüzden hap; uyarı ve çıkış bağlantısı bu yüzden
   kaide. Kısıt tasarımı bükmüyor, içeriği seçiyor.
   ========================================================================= */

export default function FiyatAlan1({
  on,
  toggle,
  picked,
}: {
  on: Record<NeedKey, boolean>;
  toggle: (k: NeedKey) => void;
  picked: Need[];
}) {
  return (
    <section className="af1" aria-labelledby="af1-bas">
      <div className="afx-sec af1-levha">
        {/* Koyulaştıran ışık. Metnin altında (z-index 0) ve tıklanamaz. */}
        <span className="afx-isik af1-isik" aria-hidden="true" />

        <div className="afx-in container-o">
          <h2 id="af1-bas" className="h2 af1-bas">
            Rakamlar, ihtiyacınıza göre.
          </h2>

          <div className="af1-cips">
            <AfCips aday="Aday 1 · Levha" on={on} toggle={toggle} />
          </div>

          {/* Rakamlar sayfa kaymadan değişiyor. Duyuru bölüm başına BİR kez;
              üç ülke için üç kez duyurulsaydı her tıklamada üç cümle okunurdu.
              Canlı bölümde de aynı kalıp var. */}
          <p className="sr-only" aria-live="polite">
            {COUNTRY_ORDER.map(
              (c) => `${COUNTRY_NAME[c]} ${FACTS[c].from + extraFor(picked, c)} dolar`,
            ).join(", ")}
          </p>

          <div className="af1-grid">
            {COUNTRY_ORDER.map((c) => {
              const total = FACTS[c].from + extraFor(picked, c);
              return (
                <div key={c} className="af1-col">
                  <div className="af1-ad">
                    <AfBayrak c={c} />
                    <h3>{COUNTRY_NAME[c]}</h3>
                  </div>

                  <div className="af1-tut">
                    <CountUp value={total} fontSize={64} color="#ffffff" />
                  </div>

                  {/* Küçük punto yalnızca beyaz hapta. İkinci hap seçimin
                      ekrandaki tek izi: kalem listesi olmadığı için "neyin
                      toplamı" sorusunu bu cevaplıyor. */}
                  <div className="af1-haplar">
                    <span className="afx-hap">{FACTS[c].days}</span>
                    <span className="afx-hap">
                      {picked.length === 0
                        ? "Kuruluş"
                        : `Kuruluş + ${picked.length} kalem`}
                    </span>
                  </div>

                  <div className="af1-act">
                    <SmartLink href={`/basla?ulke=${c}`} className="afx-dugme">
                      Kurulumu başlat
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </SmartLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tam genişlikte beyaz kaide: dürüstlük yükünün tamamı burada ve burada
          okunuyor. Mavide bu iki satır 3,99:1 olurdu. */}
      <div className="af1-kaide">
        <div className="container-o af1-kaide-in">
          <p className="afx-not">
            <Info size={15} strokeWidth={2.1} />
            Tutarlar tahminîdir. Nihai teklif faaliyet, yapı ve belgelere göre
            netleşir; resmî harçlar ile üçüncü taraf ücretleri değişebilir.
          </p>
          <SmartLink href="/ulkeler" className="afx-cikis">
            Üç ülkeyi ölçüt ölçüt karşılaştırın
            <ArrowRight size={15} strokeWidth={2.1} />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
