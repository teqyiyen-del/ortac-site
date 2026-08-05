import { ACCOUNTING_DUBAI as C, yearLanes } from "@/lib/accountingDubai";
import { MtHead, MtWhyFold, mtCaption, mtConditionalIds } from "@/components/lab/MtakvimShared";
import {
  MTZ_AXIS,
  MTZ_MONTHS,
  MtzAxisSplit,
  MtzRhythmFold,
  mtzAltText,
  mtzFreq,
  mtzIsEvery,
} from "@/components/lab/CalMTShared3";

/* ============================================================================
   MT9 · DUVAR TAKVİMİ — sabit bir kez söyleniyor, takvim yalnızca istisnaları
   gösteriyor

   ---------------------------------------------------------------------------
   FİKİR: TEKRAR EDEN ŞEY ÇİZİLMEZ, SÖYLENİR

   Bugünkü matriste aylık muhasebe on iki kutu kaplıyor. On iki kutu tek bir
   olgu söylüyor: "her ay". Bu olgunun görsel bir karşılığı yok — bir cümle
   onu daha kısa, daha net ve daha az yer kaplayarak söylüyor. Kutuya
   yalnızca DEĞİŞEN şey girmeli.

   O yüzden burada iki katman var: ızgaranın üstünde her ay tekrar eden iş bir
   cümle olarak duruyor; ızgaranın içinde yalnızca o aya ÖZEL olan iş yazılı.
   Böylece on iki hücrenin sekizi sessiz, dördü dolu — ve yılın şekli
   ("üç sakin ay, sonra bir yoğun ay, en sonda hepsi bir arada") tek bakışta
   okunuyor.

   NEDEN IZGARA, NEDEN ÇİZGİ DEĞİL: müşterinin sorusu "beni ay ay ne bekliyor".
   Duvar takvimi bu sorunun herkesin bildiği nesnesi; okunması öğrenilmiyor.
   Hücrenin içinde kalemin ADI yazılı olduğu için çözülecek bir renk kodu da,
   bir lejant da yok.

   ---------------------------------------------------------------------------
   DÖRT GÜRÜLTÜ KAYNAĞINDAN HANGİSİNİ NASIL ÇÖZÜYOR

   1 · DÖRT OKUMA BİÇİMİ → ikiye. Yüzeyde tek nesne (takvim) ve altında aynı
       biçimde kapılar.

   2 · 59 NESNE / 18 BOŞ KUTU → 36 kutu 12 hücreye iniyor, çünkü üç şerit üst
       üste değil İÇ İÇE. Boş kutu kalmadı: sessiz hücre "burada bir şey yok"
       demiyor, "bu ay yalnızca her-ay-olan iş var" diyor ve o iş ızgaranın
       üstünde yazılı. Sessiz hücre kesikli çerçeveyle duruyor — renk kodu
       değil, doluluğun kendisi.

   3 · YANLIŞ AY EKSENİ → hücrenin içinde sayı yalnız durmuyor, birimiyle
       birlikte duruyor ("3. ay") ve ızgaranın üstünde eksen adlandırılıyor
       (MTZ_AXIS). Bugünkü şeritte "3" yazıyor ve mart sanılıyor.

   4 · EKSEN KARIŞMASI → oran tablosu kendi sorusunun altına iniyor
       (MtzAxisSplit).

   ---------------------------------------------------------------------------
   İÇERİK NEREYE GİTTİ

     · her ay tekrar eden iş              → yüzeyde, ızgaranın üstünde cümle
     · on iki ayın hepsi                  → yüzeyde, hücre hücre
     · hangi ayda hangi kalem             → yüzeyde, hücrenin içinde adıyla
     · sıklık                             → yüzeyde, iki cümlede TEK KEZ
     · KDV'nin herkeste doğmadığı         → yüzeyde, kelimeyle ("koşullu")
     · üç gerekçe cümlesi + ay listeleri  → MtzRhythmFold
     · kuruluşta açılan üç kayıt          → MtWhyFold
     · oran tablosu + şerhleri            → MtzAxisSplit
     · teslim tarihi ve mali yıl şerhi    → yüzeyde

   NEYİ FEDA EDİYOR: yer. Üç adayın en uzunu bu — on iki hücre telefonda iki
   sütuna dizildiğinde altı satır ediyor. Sayfada kapladığı alan bugünkü
   şeritten az ama MT7 ve MT8'den fazla. Karşılığında "ay ay ne bekliyor"
   sorusuna hiçbir yorum gerektirmeden cevap veriyor.
   ========================================================================= */

export default function CalMT9() {
  const lanes = yearLanes();
  const cond = mtConditionalIds();

  /* İki katman, tek kaynak: her ay tekrar edenler cümleye, geri kalanlar
     hücreye gidiyor. Ayrım elle yapılmıyor (mtzIsEvery). */
  const every = lanes.filter(mtzIsEvery);
  const some = lanes.filter((l) => !mtzIsEvery(l));

  return (
    <section id="mt9" className="mtx-sec">
      <div className="container-o">
        <MtHead />

        <div className="mtx-body">
          <h3 className="mtz-sub">{C.calendar.stripTitle}</h3>

          {/* KATMAN 1 — SABİT. On iki kutunun yerine bir cümle. */}
          <p className="mt9-const">
            <span className="mt9-const-k">Her ay, istisnasız</span>
            {every.map((l) => (
              <span className="mt9-const-v" key={l.id}>
                {l.label}
              </span>
            ))}
          </p>

          {/* KATMAN 2 — İSTİSNALAR. Aynı kural bir kez daha: NE olduğu cümlede,
              NEREDE olduğu ızgarada. Sıklık ve koşulluluk burada tek kez
              yazılıyor — hücrelerde dört kez tekrarlansaydı "3 ayda bir" ifadesi
              takvimin zaten gösterdiği şeyi dört ayrı nesne hâlinde söylerdi.
              Ekseni adlandıran ifade de aynı cümlede. */}
          <p className="mt9-ax">
            Buna eklenenler ({MTZ_AXIS}):{" "}
            {some.map((l, i) => (
              <span key={l.id}>
                {i > 0 && " · "}
                <b className="mt9-ax-n">{l.label}</b> {mtzFreq(l)}
                {cond.has(l.id) && ", koşullu"}
              </span>
            ))}
          </p>

          <ol className="mt9-grid" aria-label={mtzAltText(lanes)}>
            {MTZ_MONTHS.map((m) => {
              const hit = some.filter((l) => l.months.includes(m));
              return (
                <li
                  className="mt9-cell"
                  key={m}
                  /* Doluluk bir renk kodu değil, hücrenin kendi durumu:
                     dolu hücre çerçeveli, sessiz hücre kesikli. Çözülecek
                     bir anahtar yok, çünkü kalemin adı zaten içinde. */
                  data-full={hit.length > 0 ? "1" : "0"}
                >
                  <b className="mt9-n">
                    {m}
                    <span className="mt9-u">. ay</span>
                  </b>
                  {/* Hücrede yalnızca AD var. Sıklık ve koşulluluk yukarıda,
                      tek kez. Takvimin işi "nerede" sorusuna cevap vermek. */}
                  {hit.map((l) => (
                    <span className="mt9-t" key={l.id}>
                      {l.label}
                    </span>
                  ))}
                </li>
              );
            })}
          </ol>

          <p className="mtx-note">{mtCaption("Takvim")}</p>

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
