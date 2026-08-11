"use client";

import { ArrowRight, Check, Info } from "lucide-react";
import CountUp from "@/components/shared/CountUp";
import SmartLink from "@/components/shared/SmartLink";
import { AfBayrak, AfCips } from "@/components/lab/FiyatAlanParca";
import {
  LINE_NOTE,
  NEEDS,
  SCOPE,
  extraFor,
  money,
  needAmount,
  type Need,
  type NeedKey,
} from "@/components/lab/fiyatKart";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS } from "@/lib/brand";

/* ============================================================================
   LAB · ADAY 3 · "CETVEL" · .af3-

   İÇERİK KARARI — EN ÖNEMLİ DETAY RAKAM DEĞİL, RAKAMIN SINIRI
   "$3.900'dan başlar" cümlesinin bütün ağırlığı "başlar"da ve bugün ekranda
   o sözcüğün karşılığı yok. Daha kötüsü: banka, muhasebe ve vizenin AYRI
   FİYATLANDIĞI bilgisi çiplerin arkasında gizli — çipe basmayan ziyaretçi
   üç kalemin varlığını hiç görmüyor.
     GELEN  dört kalemin üç ülkedeki tutarı, hepsi açık ve seçimden bağımsız;
            kuruluş kaleminin ülkeye göre değişen kapsam cümlesi (SCOPE);
            satırın kendi dürüst dipnotu, yalnız ilgili hücrede (12 hücrenin 3'ü)
     GİDEN  "Detaylı fiyat" düğmesi (üçün ikisinde zaten ölü bağlantıydı)
   Çipin işi değişti: kalem AÇMIYOR, kalemi TOPLAMA KATIYOR. Bilgi etkileşimin
   arkasında değil, etkileşim bilginin üstünde.

   DİPNOTLAR NEDEN BURADA KALABİLDİ
   Müşteri ana sayfada "her ülkeye bir uyarı" kalıbını kapatmıştı ("aşırı
   dikkat çekiyor"). Burada dipnot ülkeye değil HÜCREYE bağlı: on iki hücrenin
   üçünde var, ikisi vize satırında biri banka satırında. Yani ekranda bir
   uyarı deseni değil, üç ayrı olgu var. Renk, simge ve amber kutu yok; düz
   gri alt satır.

   KONTRAST — KÜÇÜK PUNTO MAVİDEN TAMAMEN ÇIKIYOR
   Üç katman: mavi sahne (yalnız >=22px kalın ve >=24px metin, 3,99:1 → 3:1
   eşiği geçer), tam genişlikte beyaz şerit (matrisin tamamı, 20,03:1 ve
   6,69:1) ve mavi taban (yalnız beyaz düğmeler). Kısıt gizlenmiyor,
   yerleşime çevriliyor.
   ========================================================================= */

type Satir = {
  key: "kurulus" | NeedKey;
  label: string;
  /** ekrandaki tutar; kuruluş satırı FACTS'ten, ötekiler PRICING'ten */
  deger: (c: (typeof COUNTRY_ORDER)[number]) => { txt: string; na: boolean };
  alt: (c: (typeof COUNTRY_ORDER)[number]) => string | undefined;
  secili: boolean;
};

export default function FiyatAlan3({
  on,
  toggle,
  picked,
}: {
  on: Record<NeedKey, boolean>;
  toggle: (k: NeedKey) => void;
  picked: Need[];
}) {
  /* Satır dizisi veriden kuruluyor, elle yazılmıyor: NEEDS'e bir kalem
     eklendiğinde matris kendiliğinden dördüncü satırı basar. */
  const satirlar: Satir[] = [
    {
      key: "kurulus",
      label: "Şirket kuruluşu",
      deger: (c) => ({ txt: FACTS[c].fromLabel, na: false }),
      alt: (c) => SCOPE[c],
      secili: true,
    },
    ...NEEDS.map<Satir>((n) => ({
      key: n.key,
      label: n.line,
      deger: (c) => {
        const a = needAmount(n.key, c);
        /* İngiltere'de vize kalemi 0. Sıfır bir fiyat değil bir kapsam
           bilgisi — canlı bölümdeki davranışın aynısı. */
        return a > 0 ? { txt: money(a), na: false } : { txt: "kapsam dışı", na: true };
      },
      alt: (c) => LINE_NOTE[n.key][c],
      secili: on[n.key],
    })),
  ];

  return (
    <section className="af3" aria-labelledby="af3-bas">
      {/* ------------------------------------------------------ mavi sahne */}
      <div className="afx-sec af3-sahne">
        <span className="afx-isik af3-isik" aria-hidden="true" />

        <div className="afx-in container-o">
          <h2 id="af3-bas" className="h2 af3-bas">
            Rakamlar, ihtiyacınıza göre.
          </h2>

          <div className="af3-cips">
            <AfCips aday="Aday 3 · Cetvel" on={on} toggle={toggle} />
          </div>

          <p className="sr-only" aria-live="polite">
            {COUNTRY_ORDER.map(
              (c) => `${COUNTRY_NAME[c]} ${FACTS[c].from + extraFor(picked, c)} dolar`,
            ).join(", ")}
          </p>

          <div className="af3-tot">
            {COUNTRY_ORDER.map((c) => (
              <div key={c} className="af3-totcol">
                <div className="af3-ad">
                  <AfBayrak c={c} />
                  <h3>{COUNTRY_NAME[c]}</h3>
                </div>
                <div className="af3-say">
                  <CountUp
                    value={FACTS[c].from + extraFor(picked, c)}
                    fontSize={52}
                    color="#ffffff"
                  />
                </div>
                <div className="af3-haplar">
                  <span className="afx-hap">{FACTS[c].days}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------- beyaz şerit */}
      <div className="af3-serit">
        <div className="container-o">
          {/* Açıklama <caption> DEĞİL, tablonun DIŞINDA bir paragraf.
              Ölçüldü: caption tablonun kutusuna ait, yani min-width:620px'i o da
              alıyor ve 375 pikselde cümlenin sağı kayan kabın içinde kalıyordu —
              okumak için tabloyu sürüklemek gerekiyordu. Dışarı alınınca kap
              genişliğinde sarıyor; tabloyla bağı aria-describedby ile kuruldu,
              yani ekran okuyucuda hiçbir şey kaybolmuyor. */}
          <p className="af3-aciklama" id="af3-aciklama">
            Dört kalemin üç ülkedeki tutarı. Kuruluş her zaman toplama dahil;
            işaretli satırlar yukarıdaki toplamlara ekleniyor.
          </p>

          {/* AGENTS.md · C: overflow-x:auto olan kap position:relative. */}
          <div className="af3-tw">
            <table className="af3-tablo" aria-describedby="af3-aciklama">
              <thead>
                <tr>
                  <th scope="col">Kalem</th>
                  {COUNTRY_ORDER.map((c) => (
                    <th key={c} scope="col">
                      <span className="af3-th-ulke">
                        <AfBayrak c={c} />
                        {COUNTRY_NAME[c]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {satirlar.map((s) => (
                  <tr key={s.key} data-on={s.secili}>
                    <th scope="row">
                      {s.label}
                      {s.secili ? (
                        <span className="af3-onay">
                          <Check size={13} strokeWidth={2.6} />
                          {s.key === "kurulus" ? "her zaman dahil" : "toplama dahil"}
                        </span>
                      ) : null}
                    </th>
                    {COUNTRY_ORDER.map((c) => {
                      const v = s.deger(c);
                      const alt = s.alt(c);
                      return (
                        <td key={c}>
                          <span className="af3-v" data-na={v.na}>
                            {v.txt}
                          </span>
                          {alt ? <span className="af3-alt">{alt}</span> : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="af3-serit-alt">
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
      </div>

      {/* ------------------------------------------------------ mavi taban */}
      <div className="af3-taban">
        <div className="container-o af3-cikislar">
          {COUNTRY_ORDER.map((c) => (
            <SmartLink key={c} href={`/basla?ulke=${c}`} className="afx-dugme">
              {COUNTRY_NAME[c]} için başlat
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
