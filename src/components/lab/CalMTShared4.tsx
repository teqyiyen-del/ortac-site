import {
  ACCOUNTING_DUBAI as C,
  frequencyLabel,
  yearLanes,
  type YearLane,
} from "@/lib/accountingDubai";
import { INCLUSION_LABEL } from "@/lib/afterSetup";
import { MtTaxFold, MtWhyList, mtConditionalIds } from "@/components/lab/MtakvimShared";

/* ============================================================================
   LAB · MUHASEBE TAKVİMİ — DÖRDÜNCÜ TURUN ORTAK PARÇALARI (MT10 · MT11 · MT12)
   Ad alanı .mtw-

   Bu turun kuralı müşterinin cümlesinden çıkan üçlü sözleşme:
   kalem sayısı SABİT, aynı anda görünen nesne AZALIR, fazlası bir tık uzakta.

   Ölçülen teşhis (canlı /dubai/muhasebe #takvim ile iki referans yan yana):

     bölüm            duran nesne   kapı arkası eleman   yüzey tonu
     zincir                    38                    0            7
     CountryAfter              46                  339           19
     takvim (taban)            91                   31           13

   Yani takvim bölümü daha ÇOK bilgi taşıdığı için karmaşık değil: CountryAfter
   üç katı bilgi taşıyor. Fark kapı oranında — CountryAfter yüzeydeki her bir
   nesneye karşılık 7,4 nesneyi kapının arkasında tutuyor, takvim 0,34. Bir de
   üst düzey blok sayısı: zincir 1, CountryAfter 4, takvim 11 eşit ağırlıklı
   blok. Karmaşa "çok bilgi" değil, "hepsi aynı anda ve hepsi aynı ağırlıkta".

   Üç adayın üçünde de bu dosyadaki iki şey ortak, çünkü kıyas ancak
   değişkenlerden biri sabitlenirse çalışır:
     · KAPI BİÇİMİ tek (MtwDoor). Bölümde ikinci bir kapı dili yok.
     · KAPI İÇERİĞİ aynı (MtwDoors). Adaylar yalnız YÜZEYDE ayrışıyor.

   VERİ ÜRETİLMİYOR. Her sayı ve her ay accountingDubai.ts'ten okunuyor.
   ========================================================================= */

/** Ay ekseninin adı. Taban şeritteki "1 … 12" adsız ve mart sanılıyor. */
export const MTW_AXIS = "lisanstan sonra kaçıncı ay";

/** Yılın on iki ayı; üç aday da aynı yılı çizsin diye tek yerde. */
export const MTW_MONTHS: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

/** Her ay olan kalem ile belirli aylarda olan kalemi ayıran tek kural.
 *  Eşik elle yazılmıyor: months dizisi yılın hepsini içeriyorsa süreklidir. */
export function mtwIsEvery(lane: YearLane): boolean {
  return lane.months.length >= 12;
}

/** Sıklık kelimesi tek kaynaktan (frequencyLabel), kutulardan sayılmış hâli. */
export function mtwFreq(lane: YearLane): string {
  return frequencyLabel(lane.months.length);
}

/** İlk 12 ayda o kalemin kaç kez doğduğu. Zincir'in kuralı: ekrandaki rakam
 *  ile ekrandaki çizim TEK diziden çıksın, ikisi ayrı düşemesin. */
export function mtwCount(lane: YearLane): number {
  return lane.months.length;
}

/** İlk 12 ayda toplam kaç kez iş çıkıyor (12 + 4 + 1 = 17). Toplam veride
 *  yazmıyor, burada toplanıyor: bir kalemin sıklığı değişirse rakam da
 *  değişir, iki yerde birden güncellenmez. */
export function mtwTotal(lanes: YearLane[]): number {
  return lanes.reduce((a, l) => a + l.months.length, 0);
}

/** Ay listesinin YAZIYLA hâli. Matrisin 12 kutusunun yerine geçen cümle:
 *  aynı olguyu taşıyor, on iki nesne yerine bir nesne tutuyor. */
export function mtwMonthsText(lane: YearLane): string {
  return mtwIsEvery(lane) ? "hepsi" : lane.months.join(" · ");
}

/** Görseli göremeyenin okuduğu cümle; veriden kuruluyor, elle yazılmıyor. */
export function mtwAlt(lanes: YearLane[]): string {
  const parts = lanes.map((l) =>
    mtwIsEvery(l) ? `${l.label}: on iki ayın hepsi` : `${l.label}: ${l.months.join(", ")}. aylar`,
  );
  return `Lisanstan sonraki on iki ay. ${parts.join(". ")}.`;
}

/** Hangi kalem herkeste doğmuyor. Kelime de uydurma değil, afterSetup.ts'in
 *  kendi etiketi (INCLUSION_LABEL["gerekli-ise"].short). */
const CONDITIONAL = mtConditionalIds();
export function mtwConditional(lane: YearLane): string | null {
  return CONDITIONAL.has(lane.id)
    ? INCLUSION_LABEL["gerekli-ise"].short.toLocaleLowerCase("tr-TR")
    : null;
}

/** Üç adayın da okuduğu tek şerit listesi. */
export function mtwLanes(): YearLane[] {
  return yearLanes();
}

/* ---------------------------------------------------------------- KAPI

   TEK KAPI BİÇİMİ. Tabanda iki ayrı kapı dili var (numaralı .svm-open ve düz
   .svm-drop) ve ikisi de aynı bölümde duruyor; ziyaretçi "bu ikisi neden
   farklı" sorusunu boşuna soruyor. Burada tek biçim var ve anatomisi
   CountryAfter'ın .aft-more düğmesinden alındı: kalın başlık + altında ne
   çıkacağını söyleyen bir satır + dönen daire.

   NEDEN NATIVE <details>: klavye, ekran okuyucu, sayfa içi arama ve
   yazdırma davranışı hazır geliyor; JavaScript yok, yani useReducedMotion
   hidratasyon tuzağı (tuzak A) bu bölümde hiç doğmuyor. Kapalı içerik
   DOM'da kalıyor, aranabilir kalıyor. */
export function MtwDoor({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <details className="mtw-door">
      <summary>
        <span className="mtw-door-t">
          <b>{title}</b>
          <span>{hint}</span>
        </span>
        <span className="mtw-door-i" aria-hidden="true" />
      </summary>
      <div className="mtw-door-b">{children}</div>
    </details>
  );
}

/**
 * Bölümün kapı arkası. Üç adayda da AYNI — kıyas yüzeyde yapılıyor.
 *
 * `rhythm=false` yalnız MT12 için: orada üç ritim kendi satır kapılarına
 * dağıldı, yani içerik yerinde ama kapının yeri değişti. Silinmedi.
 */
export function MtwDoors({ rhythm = true }: { rhythm?: boolean }) {
  const lanes = mtwLanes();

  return (
    <div className="mtw-doors">
      <MtwDoor title={C.why.title} hint="Üç kayıt, neden ve ne zaman açılıyor">
        <MtWhyList />
      </MtwDoor>

      {rhythm && (
        <MtwDoor
          title={C.calendar.rhythmTitle}
          hint="Üç kalemin gerekçesi ve tam ay listesi"
        >
          <ul className="mtx-caps">
            {lanes.map((l) => (
              <li key={l.id}>
                <b>{l.label}</b> {l.caption}
                {!mtwIsEvery(l) && ` (${MTW_AXIS}: ${l.months.join(", ")})`}
              </li>
            ))}
          </ul>
        </MtwDoor>
      )}

      <MtwDoor
        title={C.taxFrame.title}
        hint="Kurumlar vergisi, beyan süresi, KDV, serbest bölge, kişisel gelir vergisi"
      >
        <MtTaxFold bare />
      </MtwDoor>
    </div>
  );
}

/**
 * Kapıya GİRMEYEN şerh.
 *
 * CountryAfter'ın kuralı: kademelendirme metni azaltmak için var, dürüstlük
 * şerhini gizlemek için değil ("koşullu kalemler toplamın dışında" orada da
 * kapağın önünde duruyor). Buradaki iki iddia da yüzeyde kalıyor:
 * (a) görsel işin çıktığı ayı gösteriyor, teslim tarihini değil;
 * (b) mali yıl şirkete göre belirleniyor, burada kuruluşla başladığı
 *     varsayılıyor.
 */
export function MtwNote({ subject }: { subject: string }) {
  return (
    <p className="mtw-note">
      {subject} işin hangi ay çıktığını gösteriyor, teslim tarihini değil. Mali yıl
      şirketinize göre belirleniyor; burada kuruluşla başladığı varsayılıyor.
    </p>
  );
}
