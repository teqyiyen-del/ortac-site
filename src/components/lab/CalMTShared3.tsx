import {
  ACCOUNTING_DUBAI as C,
  frequencyLabel,
  yearLanes,
  type YearLane,
} from "@/lib/accountingDubai";
import { MtTaxFold } from "@/components/lab/MtakvimShared";

/* ============================================================================
   LAB · MUHASEBE TAKVİMİ — ÜÇÜNCÜ TURUN ORTAK PARÇALARI (MT7 · MT8 · MT9)

   NEDEN AYRI DOSYA: MtakvimShared.tsx birinci ve ikinci turun ortak kabuğu ve
   altı aday ona bağlı. Oraya yeni parça eklemek, altı eski adayın çıktısını
   yanlışlıkla değiştirme riski demekti. Bu turun kendi ortak parçaları burada;
   eski dosyadan yalnızca OKUYORUZ (MtTaxFold), yazmıyoruz.

   ÜÇÜ DE AYNI DÖRT GÜRÜLTÜ KAYNAĞINI ÇÖZMEK ZORUNDA — teşhis dört madde
   sayıyor ve üçünün de dördüne cevabı olmalı. Üçünde ortak olan iki cevap
   burada duruyor:

     · 4. GÜRÜLTÜ (eksen karışması) → MtzAxisSplit. Oran tablosu bölümden
       silinmiyor, kendi sorusunun altına iniyor. Çizgi ve tek cümle ayırıyor.

     · İÇERİĞİN KORUNMASI → MtzRhythmFold. Şeridin üç gerekçe cümlesi ve ay
       listeleri hiçbir adayda silinmiyor; üçünde de aynı kapının arkasında,
       aynı biçimde duruyor. Kapı adı da verinin kendi başlığı
       (C.calendar.rhythmTitle), elle yazılmıyor.

   VERİ ÜRETİLMİYOR. Buradaki her sayı ve her ay accountingDubai.ts'ten (o da
   afterSetup.ts / countryContent.ts'ten) okunuyor.
   ========================================================================= */

/**
 * "Her ay olan" kalem ile "belirli aylarda olan" kalemi AYIRAN tek kural.
 *
 * Neden bir fonksiyon: üç adayın üçü de bu ayrımı kullanıyor ama üç ayrı
 * görsele çeviriyor — MT7 çizgiyi sürekli çubuk yapıyor, MT8 cümleyi kartın
 * her satırına koyuyor, MT9 sabiti ızgaranın üstünde bir kez söylüyor. Kural
 * üç yerde ayrı yazılsaydı biri sessizce veriden ayrılırdı.
 *
 * Eşik elle yazılmıyor: kalemin months dizisi yılın HER ayını içeriyorsa
 * süreklidir. Veri değişirse görsel de değişir.
 */
export function mtzIsEvery(lane: YearLane): boolean {
  return lane.months.length >= 12;
}

/** Yılın on iki ayı. Tek yerde duruyor ki üç aday aynı yılı çizsin. */
export const MTZ_MONTHS: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

/**
 * Ay ekseninin DOĞRU ETİKETİ.
 *
 * Teşhisin üçüncü maddesi: ekrandaki 1–12 takvim ayı değil, kuruluştan
 * itibaren sayılan aylar; bugün bunu ancak matrisin altındaki 150 karakterlik
 * şerhi okuyan anlıyor. Yani sorun sayıların kendisi değil, ADSIZ olmaları.
 * Üç adayda da eksen adını yanında taşıyor ve bu cümle o adın tek kaynağı.
 */
export const MTZ_AXIS = "lisanstan sonra kaçıncı ay";

/**
 * "Ne zaman" ile "neye göre" arasındaki sınır.
 *
 * TEŞHİSİN DÖRDÜNCÜ MADDESİ: oran tablosu (%0/%9, 375.000 AED) "hangi ay ne
 * oluyor" başlığının altında duruyor ama "neye göre" sorusuna cevap veriyor.
 * Bölümün en teknik görünen parçası bu ve konusu bile başka.
 *
 * ÇÖZÜM SİLMEK DEĞİL, TAŞIMAK: tablo bölümde kalıyor — beş satırın beşi,
 * şerhleriyle birlikte — ama artık kendi sorusunun altında ve arada bunu
 * söyleyen bir cümle var. Değer ile şerh yine ayrılamıyor (MtTaxFold).
 */
export function MtzAxisSplit() {
  return (
    <div className="mtz-split">
      <p className="mtz-split-n">
        Buraya kadarı <b>ne zaman</b>. Oranlar ve eşikler ayrı bir soru:
      </p>
      <MtTaxFold />
    </div>
  );
}

/**
 * Şeridin kelimeye çevrilmiş hâli — üç gerekçe cümlesi ve ay listeleri.
 *
 * KATMANLAMA BURADA OLUYOR, SİLME DEĞİL. Yüzeyde her kalemin adı ve sıklığı
 * duruyor; gerekçesi ("Kaydınız yoksa bu satır hiç doğmuyor") ve tam ay
 * listesi tek tıklamanın arkasında. Üç adayda da aynı kapı, aynı içerik.
 *
 * Ay listesi yalnızca HER AY OLMAYAN kalemlerde basılıyor: "1, 2, 3 … 12.
 * aylar" hiçbir şey söylemiyor, "her ay" zaten yüzeyde yazılı.
 */
export function MtzRhythmFold({ lanes = yearLanes() }: { lanes?: YearLane[] }) {
  return (
    <details className="mtx-fold">
      <summary>
        {C.calendar.rhythmTitle}
        <span className="mtx-x" aria-hidden="true" />
      </summary>
      <ul className="mtx-caps">
        {lanes.map((l) => (
          <li key={l.id}>
            <b>{l.label}</b> — {l.caption}
            {!mtzIsEvery(l) && ` (${MTZ_AXIS}: ${l.months.join(", ")})`}
          </li>
        ))}
      </ul>
    </details>
  );
}

/**
 * Görseli göremeyen ziyaretçinin okuduğu cümle. Üç adayın üçü de kendi
 * görselini bu cümleyle tarif ediyor; cümle veriden kuruluyor, elle
 * yazılmıyor.
 */
export function mtzAltText(lanes: YearLane[]): string {
  const parts = lanes.map((l) =>
    mtzIsEvery(l)
      ? `${l.label}: on iki ayın hepsi`
      : `${l.label}: ${l.months.join(", ")}. aylar`,
  );
  return `Lisanstan sonraki on iki ay. ${parts.join(". ")}.`;
}

/** Sıklık etiketi tek kaynaktan; üç adayda da aynı kelime çıksın. */
export function mtzFreq(lane: YearLane): string {
  return frequencyLabel(lane.months.length);
}
