"use client";

import { useId, useState } from "react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { BASLANGIC, ihtiyac, SORULAR, type Cevap } from "@/lib/muhasebeIhtiyac";

/* ============================================================================
   /lab/muhasebe-ihtiyac · "BANA HANGİ HİZMETLER GEREKİYOR?" SOL PANEL ADAYLARI
   CSS: css/lab-ihtiyac.css (.lih-)

   18.09.2026 · Burak: "sağdan iconları kaldırmışsın aslında bana kalabalık
   gelen biraz daha sol taraftı kral, oraya daha farklı yaklaşım gerekiyor
   sanırım. uygunluk testindeki tasarım buraya uymadı galiba. bunun için labda
   3 farklı şey denesene."

   SAĞ PANEL ÜÇÜNDE DE AYNI ve canlıdakinin sadeleştirilmiş kopyası (rozet ·
   ad · tutar). Denenen tek şey SOL TARAF:

     I1 · TEK SORU        18.09.2026'da CANLIYA ALINDI ve bu dosyadan
                          çıkarıldı; lab sayfasında "Taban" olarak canlı
                          bileşen basılıyor (AccountingNeeds). Seçildiği
                          hâl: ikonlu seçenekler, hiçbiri seçili gelmiyor,
                          üstüne gelince siyah / seçilince mavi, dört
                          cevaptan sonra I3'ün ayar satırlarıyla özet.
     I2 · CÜMLE           form değil CÜMLE: "Şirketim … kurulu, … . Yıllık
                          cirom … , KDV kaydım … ." Boşluklar açılır menü.
                          Ekranda dört kutu değil dört kelime var.
     I3 · AYAR SATIRLARI  dört satır: solda soru, sağda küçük segment düğme.
                          İkon yok, disk yok; ayar ekranı sakinliği.

   Kurallar ve sonuçlar lib/muhasebeIhtiyac.ts'ten; lab yeni kural yazmıyor.
   Üç adayın da state'i kendi içinde: biri değişince öteki değişmiyor, kıyas
   aynı ekranda yapılabilsin. */

const SIRA = ["bolge", "durum", "ciro", "kdv"] as const;
type Anahtar = (typeof SIRA)[number];

const nf = new Intl.NumberFormat("tr-TR");

const HUKUM_ETIKET = {
  gerekli: "Gerekli",
  bagli: "Duruma bağlı",
  gerekmiyor: "Gerekmiyor",
} as const;

/* Sağ panel · üç adayda ortak. `c` verilmezse (I1'in yarım kalan hâli)
   kalemler görünüyor ama hüküm yok: liste boş kalmıyor, sayfada yer
   değiştirmiyor, yalnız "bekliyor" diyor. */
function Sonuc({ c }: { c?: Cevap }) {
  const satirlar = ihtiyac(c ?? BASLANGIC);
  const gerekli = satirlar.filter((s) => s.hukum === "gerekli").length;
  return (
    <div className="lih-sonuc">
      <p className="lih-ozet" aria-live="polite">
        {c ? (
          <>
            <b className="data">{gerekli}</b> kalem gerekli
          </>
        ) : (
          "Dört soruyu cevaplayın, liste burada çıksın"
        )}
      </p>
      <ul className="lih-liste">
        {satirlar.map((s) => (
          <li key={s.kalem.id} data-hukum={c ? s.hukum : "bekliyor"}>
            <span className="lih-rozet">{c ? HUKUM_ETIKET[s.hukum] : "—"}</span>
            <span className="lih-ad">{s.kalem.title}</span>
            <span className="lih-tutar data">{nf.format(s.kalem.price.usd)} USD</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Baslik({ n, ad }: { n: string; ad: string }) {
  return (
    <div className="sec-head">
      <SplitWords as="h2" text="Bana hangi hizmetler gerekiyor?" accent="hangi hizmetler gerekiyor?" className="h2" />
      <FadeUp delay={0.2}>
        <p className="sec-lead">
          {n} · {ad}
        </p>
      </FadeUp>
    </div>
  );
}

/* ============================================================== I2 · CÜMLE
   Boşluk bileşeni MODÜL DÜZEYİNDE: bileşenin içinde tanımlanınca her
   çizimde yeni bir tip üretiliyor ve <select> state'i sıfırlanıyordu
   (eslint · "Cannot create components during render"). */
function Bosluk({
  k,
  kok,
  c,
  onSec,
}: {
  k: Anahtar;
  kok: string;
  c: Cevap;
  onSec: (k: Anahtar, v: string) => void;
}) {
  return (
    <span className="lih-bosluk">
      <select
        id={`${kok}-${k}`}
        value={c[k]}
        onChange={(e) => onSec(k, e.target.value)}
        aria-label={SORULAR[k].soru}
      >
        {SORULAR[k].secenekler.map((o) => (
          <option key={o.id} value={o.id}>
            {o.etiket}
          </option>
        ))}
      </select>
    </span>
  );
}

export function IhtiyacI2() {
  const [c, setC] = useState<Cevap>(BASLANGIC);
  const kok = useId();
  const sec = (k: Anahtar, v: string) => setC((x) => ({ ...x, [k]: v }) as Cevap);
  const Sec = (k: Anahtar) => <Bosluk k={k} kok={kok} c={c} onSec={sec} />;

  return (
    <section className="sec-pad svm-sec">
      <div className="container-o">
        <Baslik n="I2" ad="form değil cümle" />
        <FadeUp delay={0.1}>
          <div className="lih-kart">
            <div className="lih-sol">
              <p className="lih-cumle">
                Şirketim {Sec("bolge")} kurulu ve {Sec("durum")}. Yıllık ciro {Sec("ciro")}, KDV kaydım{" "}
                {Sec("kdv")}.
              </p>
              <p className="lih-ipucu">Altı çizili yerlere dokunup değiştirin.</p>
            </div>
            <Sonuc c={c} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ===================================================== I3 · AYAR SATIRLARI */
export function IhtiyacI3() {
  const [c, setC] = useState<Cevap>(BASLANGIC);
  const kok = useId();
  return (
    <section className="sec-pad svm-sec">
      <div className="container-o">
        <Baslik n="I3" ad="ayar satırları, ikonsuz" />
        <FadeUp delay={0.1}>
          <div className="lih-kart">
            <div className="lih-sol">
              <ul className="lih-satirlar">
                {SIRA.map((k) => (
                  <li key={k}>
                    <span className="lih-etiket">{SORULAR[k].soru}</span>
                    <span className="lih-segment">
                      {SORULAR[k].secenekler.map((o) => (
                        <label key={o.id} data-on={c[k] === o.id ? "" : undefined}>
                          <input
                            type="radio"
                            name={`${kok}-${k}`}
                            value={o.id}
                            checked={c[k] === o.id}
                            onChange={() => setC((x) => ({ ...x, [k]: o.id }) as Cevap)}
                          />
                          {o.etiket}
                        </label>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Sonuc c={c} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
