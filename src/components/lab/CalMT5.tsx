import {
  ACCOUNTING_DUBAI as C,
  yearLanes,
} from "@/lib/accountingDubai";
import {
  MtHead,
  MtTaxFold,
  MtWhyFold,
  mtCaption,
  mtConditionalIds,
} from "@/components/lab/MtakvimShared";

/* ============================================================================
   MT5 · TETİKLEYİCİ SIRASI — ayın numarası değil, işi doğuran olay

   HANGİ VARSAYIMI KIRIYOR: reddedilen üçünün ortak ekseni AY'dı. MT1 ayları
   sütun yaptı, MT2 "kaçıncı ayındasınız" diye sordu, MT3 ayları satırın içine
   sakladı — üçü de 1–12 ekseninin doğru eksen olduğunu varsaydı.

   Oysa teşhisin kendi cümlesi şunu söylüyor: ay ekseni bir TUZAK. Ekrandaki
   1–12 takvim ayı değil, kuruluştan itibaren sayılan aylar; bunu ancak altındaki
   150 karakterlik şerhi okuyan anlıyor. Yanlış eksen daha iyi çizilerek
   düzelmiyor — değiştirilerek düzeliyor.

   DOĞRU EKSEN OLAY: her iş bir ayda değil, bir olaydan sonra doğuyor. Lisans
   çıkıyor → kayıtlar açılıyor. Ay kapanıyor → defter işleniyor. Çeyrek bitiyor →
   KDV beyanı doğuyor (kaydınız varsa). Mali yıl kapanıyor → tablolar ve beyan.
   Bu sırada tek bir sayı yok, dolayısıyla yanlış okunacak bir sayı da yok.

   TETİKLEYİCİ CÜMLESİ UYDURMA DEĞİL, ŞERİDİN KENDİ VERİSİNİN OKUNUŞU: aylık
   muhasebenin months dizisi on iki ay (her ay), KDV beyannamesininki dört
   dönem (her çeyrek), yıl sonununki tek ay (yıl kapanınca). TRIGGER haritası
   bu üç olguyu kelimeye çeviriyor, yeni bir takvim iddiası eklemiyor.

   BÖLÜM İKİYE AYRILIYOR: teşhisin ikinci maddesi eksen karışmasıydı — oran
   tablosu "ne zaman"ın altında duruyor ama "neye göre" sorusuna cevap veriyor.
   Burada iki soru artık iki ayrı yerde: yukarısı sıra, aşağısı çerçeve, ve
   aradaki cümle ayrımı açıkça söylüyor. Tablo silinmedi, yeri düzeltildi.

   NEYİ FEDA EDİYOR: yoğunluk. 12. ayda üç kalemin üst üste bindiği artık hiçbir
   yerde görünmüyor; sıra bunu söyleyemiyor, ancak açılır bloktaki ay listeleri
   söylüyor. Yılın "şekli" de yok — sıra bir ritim değil bir zincir gösteriyor.
   ========================================================================= */

/**
 * Şeridin verisinin kelimeye çevrilmiş hâli. Anahtar = afterSetup.ts'teki
 * kalem id'si, değer = o kalemi DOĞURAN olay.
 *
 * Yeni takvim iddiası YOK: üçü de o kalemin kendi months dizisinin okunuşu
 * (12 ay → her ay kapanışında, 4 dönem → her çeyrek sonunda, tek ay → mali yıl
 * kapanışında). Id kaynakta değişirse satır sessizce düşmesin diye aşağıda
 * yedeği var (bkz. `trigger`).
 */
const TRIGGER: Record<string, string> = {
  "aylik-muhasebe": "Ay kapanınca",
  "kdv-beyannamesi": "Çeyrek bitince",
  "yil-sonu": "Mali yıl kapanınca",
};

export default function CalMT5() {
  const lanes = yearLanes();
  const cond = mtConditionalIds();

  /* Yedek: eşleşmeyen kalemde ay listesini olduğu gibi basıyoruz — sessizce
     boş bir tetikleyici göstermektense veriyi göstermek doğru. */
  const trigger = (id: string, months: number[]) =>
    TRIGGER[id] ?? `${months.join(", ")}. aylarda`;

  return (
    <section id="mt5" className="mtx-sec">
      <div className="container-o">
        <MtHead />

        <div className="mtx-body">
          <ol className="mt5-flow">
            {/* 1 · Başlangıç. Bölümün başlığı önce "ne zaman başlıyor" diye
                soruyor; sıranın ilk halkası tam olarak o cevap. */}
            <li className="mt5-step">
              <span className="mt5-top">
                <i className="mt5-dot" aria-hidden="true" />
                <span className="mt5-trig">Lisans çıkınca</span>
              </span>
              <span className="mt5-name">Kayıtlar açılıyor</span>
              {/* slice(1): ilk madde ("Kayıt tutmak yasal zorunluluk") bir
                  KAYIT değil bir kural — kuruluşta açılan iki kayıt diğer
                  ikisi. Kural aşağıdaki açılır blokta olduğu gibi duruyor. */}
              <span className="mt5-line">
                {C.why.points
                  .slice(1)
                  .map((p) => p.title)
                  .join(" · ")}
              </span>
            </li>

            {/* 2-4 · Tekrar eden üç iş. Tetikleyici olay, ad ve gerekçe
                yearLanes()'ten; hiçbiri elle yazılmıyor. */}
            {lanes.map((l) => (
              <li className="mt5-step" key={l.id}>
                <span className="mt5-top">
                  <i className="mt5-dot" aria-hidden="true" />
                  <span className="mt5-trig">{trigger(l.id, l.months)}</span>
                  {/* Koşul rozet değil kelime: kalem herkeste doğmuyorsa bunu
                      renkle değil yazıyla söylüyoruz. */}
                  {cond.has(l.id) && <span className="mt5-if">koşullu</span>}
                </span>
                <span className="mt5-name">{l.label}</span>
                <span className="mt5-line">{l.caption}</span>
              </li>
            ))}
          </ol>

          {/* Sırada ay numarası yok, olay var — şerh de onu niteliyor. */}
          <p className="mtx-note">
            {mtCaption("Bu sıra", "işin hangi olaydan sonra çıktığını")}
          </p>

          <div className="mtx-folds">
            <MtWhyFold />

            {/* Bu kapı YALNIZCA ay listesini taşıyor. Gerekçe cümleleri
                yukarıda, sıranın kendi satırlarında duruyor; ikisini birden
                basmak aynı cümleyi iki kez okutmak olurdu. Sayılar silinmiyor,
                katmanlanıyor — isteyen açıp görüyor. */}
            <details className="mtx-fold">
              <summary>
                Sıra hangi aylara denk geliyor?
                <span className="mtx-x" aria-hidden="true" />
              </summary>
              <ul className="mtx-caps">
                {lanes.map((l) => (
                  <li key={l.id}>
                    <b>{l.label}</b> —{" "}
                    {l.months.length >= 12
                      ? "on iki ayın hepsi"
                      : `${l.months.join(", ")}. aylar`}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* AYRIM. Buraya kadarki her şey "ne zaman"ı anlatıyor; oran tablosu
              başka bir soruya cevap veriyor ve bugün aynı başlığın altında
              durduğu için bölüm teknik görünüyor. Çizgi ve cümle bunu ayırıyor;
              tablo hâlâ burada, yalnızca artık kendi sorusunun altında. */}
          <div className="mt5-split">
            <p className="mt5-split-n">
              Buraya kadarı <b>ne zaman</b>. Oranlar ve eşikler ayrı bir soru:
            </p>
            <MtTaxFold />
          </div>
        </div>
      </div>
    </section>
  );
}
