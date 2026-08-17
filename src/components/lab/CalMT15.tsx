import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";
import { MtHead } from "@/components/lab/MtakvimShared";
import {
  MTW_AXIS,
  MtwNote,
  mtwAlt,
  mtwIsEvery,
  mtwLanes,
  mtwMonthsText,
} from "@/components/lab/CalMTShared4";
import {
  MtyAxis,
  MtyCount,
  MtyDoors,
  MtyKey,
  MtyTrack,
  mtyBusyText,
  mtyFacts,
  mtyPeakText,
  mtySetupMonths,
  mtySplitText,
} from "@/components/lab/CalMTShared5";

/* ============================================================================
   MT15 · TEK EKSEN — kuruluş da takvimin içinde, her satır kendi kapısı

   Dört düzeltmenin bu adaydaki çözümü:

   d) KAYITLAR RAYIN SIFIRINCI SATIRI. Müşterinin "entegre et" seçeneğinin en
      ileri hâli: üç kayıt kartın içinde bir blok değil, takvimin İLK SATIRI.
      İşareti uydurma değil — afterSetup.ts'te kurumlar vergisi kaydı ve KDV
      kaydı kalemlerinin `months` dizisi 1. ay diyor (mtySetupMonths), ikisinin
      fiyat birimi de "tek seferlik". Yani ray dört satır: bir kez olan, sonra
      tekrar eden üçü. Tek eksen, tek gramer, hizalanacak ikinci nesne yok.

   c) CEVAP ÇİZİMİN KENDİSİ. Büyük rakam da büyük kelime de yok: soru rayın
      başlığı, dağılım tek satır. Yüzeyde duran nesne üç adayın en azı;
      "17" ve yoğunluk o satırın içinde duruyor, kaybolmuyor.

   a) MAVİ MT10'UN DİLİNDE. Ayrıntı CalMTShared5 · MtyTrack.

   b) RİTİM KAPISI DAĞILDI. Üç açılır blok yerine: her satır kendi kapısı
      (gerekçe ve tam ay listesi kendi satırının altında), kuruluş kayıtları
      da kendi satırının altında. Aşağıda tek kapı kalıyor, o da vergi
      çerçevesi — yani başka bir eksen. Kapı içinde kapı yok: satır kapısının
      gövdesi düz metin, ikinci bir <details> açmıyor.

   HAREKET: çentiklerin altından geçen tek ışık, 23.099s. Saf CSS.
   ========================================================================= */

export default function CalMT15() {
  const lanes = mtwLanes();
  const f = mtyFacts(lanes);
  const setup = mtySetupMonths();

  return (
    <section className="mtx-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <MtHead />

        <div className="mtw-body">
          <div className="mty-card">
            <div className="mty-hd">
              <p className="mty-q">{C.calendar.stripTitle}</p>
              <p className="mty-al">
                Lisanstan sonraki {mtyBusyText(f)} en az bir kalem doğuyor.
                Toplam <b>{f.total} iş</b>: {mtySplitText(f)}; {mtyPeakText(f)}.
                Satıra dokunun, o kalemin gerekçesi ve tam ay listesi açılsın.
              </p>
            </div>

            <div
              className="mty-rail"
              style={{ "--mty-dur": "23.099s" } as React.CSSProperties}
            >
              <p className="sr-only">{mtwAlt(lanes)}</p>

              <MtyAxis />

              <ol className="mty-rows">
                {/* SIFIRINCI SATIR — kuruluşta açılan kayıtlar. Aynı eksende,
                    aynı gramerde: ad, işaret, sayı. */}
                <li>
                  <details className="mty-lane">
                    <summary className="mty-key-row">
                      <span className="mty-key">
                        <b>{C.why.title}</b>
                        <span>tek seferlik</span>
                        <span className="mty-lane-i" aria-hidden="true" />
                      </span>
                      <MtyTrack months={setup} />
                      <MtyCount n={C.why.points.length} unit="kayıt" />
                    </summary>
                    <div className="mty-lane-b">
                      {C.why.points.map((p) => (
                        <p key={p.title}>
                          <b>{p.title}.</b> {p.line} {p.more}
                        </p>
                      ))}
                    </div>
                  </details>
                </li>

                {lanes.map((l) => (
                  <li key={l.id}>
                    <details className="mty-lane">
                      <summary className="mty-key-row">
                        <MtyKey lane={l} door />
                        <MtyTrack months={l.months} />
                        <MtyCount n={l.months.length} />
                      </summary>
                      <div className="mty-lane-b">
                        <p>{l.caption}</p>
                        <p>
                          <b>{MTW_AXIS}:</b>{" "}
                          {mtwIsEvery(l) ? "on ikisi de" : mtwMonthsText(l)}
                        </p>
                      </div>
                    </details>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <MtwNote subject="Ray" />
        </div>

        {/* Ritim içeriği satırlara dağıldı; aşağıda yalnız vergi çerçevesi. */}
        <MtyDoors rhythm={false} />
      </div>
    </section>
  );
}
