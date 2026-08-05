import { ACCOUNTING_DUBAI as C, yearLanes } from "@/lib/accountingDubai";
import { MtHead, MtWhyFold, mtCaption, mtConditionalIds } from "@/components/lab/MtakvimShared";
import {
  MTZ_AXIS,
  MtzAxisSplit,
  MtzRhythmFold,
  mtzAltText,
  mtzFreq,
  mtzIsEvery,
} from "@/components/lab/CalMTShared3";

/* ============================================================================
   MT7 · YALNIZ İŞARETLER — matrisin kendisi düzeliyor, yerine bir şey konmuyor

   ÜÇÜNCÜ TURUN DERDİ: ikinci tur metni kısarak "sadeleştirdi" ve müşteri
   sonucu YOK ETME olarak okudu. Yani sorun görselin varlığı değildi; sorun
   görselin 59 nesneyle üç olgu söylemesiydi. Bu aday görseli SİLMİYOR,
   nesne sayısını düşürüyor.

   ---------------------------------------------------------------------------
   FİKİR: BOŞLUK BİR NESNE DEĞİL

   Bugünkü matriste 36 kutu var ve 18'i boş — ekranın yarısı "burada bir şey
   yok" demek için duruyor. Oysa "yok"un görsel karşılığı zaten var: hiçbir şey
   çizmemek. Şerit yalnızca İŞ OLAN yeri işaretliyor; olmayan ay çizilmiyor,
   çünkü çizilmemesi zaten cevabın kendisi.

   İKİNCİ İNDİRİM — SÜREN İŞ TEK İŞARET: aylık muhasebe on iki ayrı kutu değil,
   on iki ayı boydan boya geçen tek bir çubuk. Kural elle yazılmıyor
   (mtzIsEvery): kalemin months dizisi yılın her ayını içeriyorsa sürekli
   çiziliyor, içermiyorsa noktalarla. Veri değişirse çizim de değişir.

   Sayı: 36 kutu + 12 ay numarası + 2 lejant kutusu → 1 çubuk + 5 nokta +
   4 ay numarası. Aynı üç olgu, altıda bir nesne.

   ---------------------------------------------------------------------------
   DÖRT GÜRÜLTÜ KAYNAĞINDAN HANGİSİNİ NASIL ÇÖZÜYOR

   1 · DÖRT OKUMA BİÇİMİ → ikiye iniyor. Yüzeyde tek bir nesne var (şerit);
       geri kalan her şey aynı biçimdeki kapıların arkasında. Akordiyon,
       matris, lejant ve tablo artık dört ayrı dil konuşmuyor.

   2 · 59 NESNE / 18 BOŞ KUTU → yukarıdaki iki indirim. Boş kutu kalmadı,
       çünkü boşluk çizilmiyor.

   3 · YANLIŞ AY EKSENİ → sayı silinmedi, ADI YANINA YAZILDI. Ölçek satırının
       solunda ekseni adlandıran cümle duruyor (MTZ_AXIS) ve ölçekte on iki
       değil yalnızca DÖRT sayı var — hangi ayların bir anlamı varsa onlar
       (3 · 6 · 9 · 12). Bu dört sayı da elle yazılmıyor, her-ay-olmayan
       kalemlerin months dizilerinin birleşimi.

   4 · EKSEN KARIŞMASI → oran tablosu bölümde kalıyor ama kendi sorusunun
       altına iniyor (MtzAxisSplit).

   ---------------------------------------------------------------------------
   İÇERİK NEREYE GİTTİ — hiçbir yere, katmanlandı

     · üç kalemin adı ve sıklığı          → yüzeyde, şeridin solunda
     · KDV'nin herkeste doğmadığı         → yüzeyde, kelimeyle ("koşullu")
     · üç gerekçe cümlesi + ay listeleri  → MtzRhythmFold (tek tıklama)
     · kuruluşta açılan üç kayıt          → MtWhyFold (tek tıklama)
     · beş satırlık oran tablosu + şerh   → MtzAxisSplit (tek tıklama)
     · teslim tarihi ve mali yıl şerhi    → yüzeyde, hiçbir zaman kapının ardında

   LEJANT SİLİNDİ, İDDİASI SİLİNMEDİ: "iş var" işaretin kendisi oldu, "o kalem
   doğmuyor" ise KDV satırındaki "koşullu" kelimesi ve açılır bloktaki gerekçe
   cümlesi ("Kaydınız yoksa bu satır hiç doğmuyor").

   NEYİ FEDA EDİYOR: "kaç kalem" sayısı. Aralık ayında üç işaretin üst üste
   geldiği hizadan okunuyor ama bir sayıyla söylenmiyor; iki işareti olan ay
   ile üç işareti olan ay arasındaki fark ancak dikey hizaya bakarak görülüyor.
   ========================================================================= */

export default function CalMT7() {
  const lanes = yearLanes();
  const cond = mtConditionalIds();

  /* Ölçekte hangi sayılar görünecek: her-ay-olmayan kalemlerin aylarının
     birleşimi. Elle yazılmıyor — "her ay" olan kalemin ayları ölçeğe hiçbir
     şey katmıyor (on iki sayı, tek olgu), o yüzden dışarıda. */
  const scale = new Set(lanes.filter((l) => !mtzIsEvery(l)).flatMap((l) => l.months));

  return (
    <section id="mt7" className="mtx-sec">
      <div className="container-o">
        <MtHead />

        <div className="mtx-body">
          <h3 className="mtz-sub">{C.calendar.stripTitle}</h3>

          <div className="mt7-ribbon" role="img" aria-label={mtzAltText(lanes)}>
            {lanes.map((l) => (
              <div className="mt7-lane" key={l.id}>
                <p className="mt7-id">
                  <span className="mt7-name">{l.label}</span>
                  <span className="mt7-freq">{mtzFreq(l)}</span>
                  {/* Koşul rozet değil kelime: kalem herkeste doğmuyorsa bunu
                      renkle değil yazıyla söylüyoruz — renk yeniden bir
                      lejant demek olurdu. */}
                  {cond.has(l.id) && <span className="mt7-if">koşullu</span>}
                </p>

                {/* On iki sütunluk ray. Kutular yok; sütun yalnızca bir
                    KONUM. minmax(0, 1fr): `1fr`in otomatik minimumu bu depoda
                    üç yatay taşmanın sebebi oldu. */}
                <span className="mt7-track" aria-hidden="true">
                  {mtzIsEvery(l) ? (
                    /* Süren iş tek işaret: on iki kutu değil, on iki ayı
                       boydan boya geçen bir çubuk. */
                    <i className="mt7-bar" />
                  ) : (
                    l.months.map((m) => (
                      <i className="mt7-dot" key={m} style={{ gridColumn: m }} />
                    ))
                  )}
                </span>
              </div>
            ))}

            {/* ÖLÇEK — ekseni adlandıran cümle solda, sayılar sağda. Bugünkü
                şeritte on iki adsız sayı var ve hangi ay olduklarını ancak
                150 karakterlik şerh söylüyor. Burada sayılar dört tane ve
                adları yanlarında. */}
            <div className="mt7-axis">
              <p className="mt7-axis-l">{MTZ_AXIS}</p>
              <span className="mt7-scale">
                {[...scale]
                  .sort((a, b) => a - b)
                  .map((m) => (
                    <b className="mt7-tick" key={m} style={{ gridColumn: m }}>
                      {m}
                    </b>
                  ))}
              </span>
            </div>
          </div>

          <p className="mtx-note">{mtCaption("İşaretler")}</p>

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
