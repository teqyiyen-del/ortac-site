import { ACCOUNTING_DUBAI as C, yearLanes, type YearLane } from "@/lib/accountingDubai";
import { MtHead, MtWhyFold, mtCaption, mtConditionalIds } from "@/components/lab/MtakvimShared";
import {
  MTZ_AXIS,
  MTZ_MONTHS,
  MtzAxisSplit,
  MtzRhythmFold,
  mtzFreq,
} from "@/components/lab/CalMTShared3";

/* ============================================================================
   MT8 · AYIN ÜÇ AĞIRLIĞI — yıl sırayla değil, ağırlığa göre diziliyor

   ---------------------------------------------------------------------------
   FİKİR: MATRİSİN SÖYLEMEK İSTEDİĞİ ŞEY ZATEN ÜÇ ÇEŞİT AY

   Bugünkü matriste on iki sütun var ama on iki farklı ay yok. Üç şeridi üst
   üste koyup her sütuna bakınca yalnızca ÜÇ desen çıkıyor: sekiz ayda tek
   kalem, üç ayda iki kalem, bir ayda üç kalem. Matris bunu söyleyebiliyor ama
   ancak ziyaretçi üç satırı gözüyle hizalarsa — 36 kutunun asıl işi bu ve
   ziyaretçi bu işi kendi yapmak zorunda.

   Bu aday hizalamayı ziyaretçiden alıp veriye yaptırıyor. On iki ay, üzerine
   düşen kalemlere göre gruplanıyor; gruplar hafiften ağıra diziliyor. Ekranda
   üç kart var ve üçü bir merdiven: birinci kartta bir satır, ikincide iki,
   üçüncüde üç. İşin yıl içinde nasıl yığıldığı kartın YÜKSEKLİĞİ oluyor.

   GRUPLAMA UYDURMA DEĞİL: her ayın hangi kalemleri taşıdığı months
   dizilerinden okunuyor, grup sayıları da listelerin uzunluğundan geliyor.
   Kalem sıklığı değişirse kart sayısı da, kartların içi de değişir.

   ---------------------------------------------------------------------------
   DÖRT GÜRÜLTÜ KAYNAĞINDAN HANGİSİNİ NASIL ÇÖZÜYOR

   1 · DÖRT OKUMA BİÇİMİ → ikiye. Yüzeyde tek biçim (üç kart), gerisi aynı
       biçimdeki kapıların arkasında.

   2 · 59 NESNE / 18 BOŞ KUTU → BOŞ KUTU KAVRAMI ORTADAN KALKIYOR. Üç grup on
       iki ayı TAM OLARAK bölüyor: her ay bir ve yalnız bir kartta geçiyor.
       Yani "bu ayda bu kalem yok" diyen bir nesne yok, çünkü ay zaten kendi
       grubunda duruyor. 36 kutu → 3 kart + 12 ay etiketi + 6 kalem satırı.

   3 · YANLIŞ AY EKSENİ → eksen zaten kalktı; ay bir konum değil bir ETİKET
       oldu. Sayılar da adsız değil: her kartın ay listesinin başında ekseni
       adlandıran cümle duruyor (MTZ_AXIS).

   4 · EKSEN KARIŞMASI → oran tablosu kendi sorusunun altına iniyor
       (MtzAxisSplit).

   ---------------------------------------------------------------------------
   İÇERİK NEREYE GİTTİ

     · on iki ayın hepsi                  → yüzeyde, hepsi tek tek yazılı
     · hangi ayda hangi kalem             → yüzeyde, kartın içinde
     · sıklık ("her ay", "3 ayda bir")    → yüzeyde, kalem satırının yanında
     · KDV'nin herkeste doğmadığı         → yüzeyde, kelimeyle ("koşullu")
     · üç gerekçe cümlesi                 → MtzRhythmFold
     · kuruluşta açılan üç kayıt          → MtWhyFold
     · oran tablosu + şerhleri            → MtzAxisSplit
     · teslim tarihi ve mali yıl şerhi    → yüzeyde

   NEYİ FEDA EDİYOR: yılın SIRASI. Aylar ağırlığa göre dizildiği için "önce şu,
   sonra bu" hissi yok; 1. ay ile 12. ay yan yana düşmüyor. Karşılığında
   ziyaretçinin gerçek sorusuna ("beni ne bekliyor") tek bakışta cevap var:
   on iki ayın sekizi tek kalem, biri üç kalem.
   ========================================================================= */

type Weight = {
  /** Bu desene sahip aylar — sırayla. */
  months: number[];
  /** O aylarda çıkan kalemler; kart yüksekliği bu listenin uzunluğu. */
  lanes: YearLane[];
};

/**
 * On iki ayı, üzerine düşen kalemlere göre gruplar. Hafiften ağıra sıralı.
 *
 * Gruplar veriden çıkıyor: iki ay aynı kalemleri taşıyorsa aynı grupta.
 * Sayı elle yazılmıyor, `months.length` okunuyor.
 */
function weights(lanes: YearLane[]): Weight[] {
  const byKey = new Map<string, Weight>();

  for (const m of MTZ_MONTHS) {
    const hit = lanes.filter((l) => l.months.includes(m));
    /* Anahtar kalem kimliklerinden: aynı deseni taşıyan aylar buluşuyor. */
    const key = hit.map((l) => l.id).join("|");
    const found = byKey.get(key);
    if (found) found.months.push(m);
    else byKey.set(key, { months: [m], lanes: hit });
  }

  return [...byKey.values()].sort((a, b) => a.lanes.length - b.lanes.length);
}

export default function CalMT8() {
  const lanes = yearLanes();
  const cond = mtConditionalIds();
  const groups = weights(lanes);

  return (
    <section id="mt8" className="mtx-sec">
      <div className="container-o">
        <MtHead />

        <div className="mtx-body">
          <h3 className="mtz-sub">{C.calendar.stripTitle}</h3>
          {/* Okuma anahtarı bir lejant değil bir cümle: kartın ne olduğunu
              söylüyor, kutunun rengini çözmüyor. Sayı da veriden — kaç desen
              varsa o kadar kart var. */}
          {/* Okuma anahtarı bir lejant değil bir cümle: kartın ne olduğunu
              söylüyor, kutunun rengini çözmüyor. Desen sayısı veriden geliyor.
              Ekseni adlandıran ifade de burada, TEK KEZ — üç kartın üstünde üç
              kez tekrarlansaydı aynı cümleyi üç nesne hâline getirirdik. */}
          <p className="mtz-line">
            On iki ay {groups.length === 3 ? "üç" : groups.length} desene ayrılıyor; ay
            numaraları {MTZ_AXIS} demek. Kart uzadıkça o ayda iş artıyor.
          </p>

          <div className="mt8-steps">
            {groups.map((g) => (
              <div className="mt8-step" key={g.months.join("-")}>
                <p className="mt8-cnt">
                  <b className="mt8-n">{g.months.length}</b>
                  <span className="mt8-of">ay böyle geçiyor</span>
                </p>

                {/* Aylar tek tek yazılı — on iki sayının hepsi ekranda, ama
                    on iki sütun değil üç küme hâlinde. Hiçbir ay iki kartta
                    birden geçmiyor, hiçbir ay eksik değil. */}
                <ul className="mt8-months">
                  {g.months.map((m) => (
                    <li className="mt8-m" key={m}>
                      {m}
                    </li>
                  ))}
                </ul>

                {/* Kartın gövdesi: o ayda ne çıkıyor. Birinci kartta bir
                    satır, sonuncuda üç — merdiven bu. */}
                <ul className="mt8-items">
                  {g.lanes.map((l) => (
                    <li className="mt8-it" key={l.id}>
                      <span className="mt8-it-n">{l.label}</span>
                      <span className="mt8-it-f">{mtzFreq(l)}</span>
                      {cond.has(l.id) && <span className="mt8-if">koşullu</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mtx-note">{mtCaption("Kartlar")}</p>

          <div className="mtx-folds">
            <MtWhyFold />
            <MtzRhythmFold lanes={lanes} />
          </div>

          <MtzAxisSplit />
        </div>
      </div>
    </section>
  );
}
