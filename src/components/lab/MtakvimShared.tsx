import AskCta from "@/components/shared/AskCta";
import {
  ACC_TAX_NOTE,
  ACC_TAX_ROWS,
  ACCOUNTING_DUBAI as C,
  accountingItems,
} from "@/lib/accountingDubai";

/* ============================================================================
   LAB · MUHASEBE TAKVİMİ — üç alternatifin ORTAK parçaları

   Neden ortak dosya: üç alternatifin farkı takvimin KENDİSİ. Başlık, kuruluş
   kayıtları ve vergi çerçevesi üçünde de aynı — üç kez yazılsalardı biri
   diğerinden sessizce ayrılırdı ve karşılaştırma bozulurdu.

   VERİ ÜRETİLMİYOR. Buradaki her cümle accountingDubai.ts'ten (o da
   afterSetup.ts / countryContent.ts'ten) okunuyor. Yeni tarih, oran, ceza,
   süre yok.
   ========================================================================= */

/** Başlıktaki aksanı renklendirir. SplitWords'ün lab'daki hareketsiz karşılığı:
 *  aynı görünüm, hidrasyon riski olan hiçbir şey yok. */
export function MtHead({
  note,
  lead = true,
  heading,
  accent,
}: {
  note?: string;
  lead?: boolean;
  /* MT6 bölümün SORUSUNU değiştiriyor — fikrin kendisi bu. Başlığı sabit
     bırakmak, alternatifi kendi iddiasıyla çelişir hâlde göstermek olurdu. */
  heading?: string;
  accent?: string;
}) {
  const { lead: leadText } = C.calendar;
  const h = heading ?? C.calendar.heading;
  const a = heading ? accent : (accent ?? C.calendar.accent);
  const head = a && h.includes(a) ? h.split(a) : [h, ""];

  return (
    <header>
      <h2 className="h2" style={{ color: "var(--text-900)" }}>
        {head[0]}
        {a && <span className="mtx-acc">{a}</span>}
        {head[1]}
      </h2>
      {/* `lead=false`: MT4'ün gövdesi zaten bu cümlenin genişletilmiş hâli.
          İkisi birden basılsaydı ziyaretçi aynı şeyi iki kez okurdu. */}
      {lead && <p className="mtx-lead">{leadText}</p>}
      {note && <p className="mtx-note">{note}</p>}
    </header>
  );
}

/**
 * Kuruluşta açılan üç kayıt — C.why.
 *
 * "Muhasebe ne zaman başlıyor" sorusunun cevabı zaten giriş cümlesinde açık
 * duruyor ("Kayıtlar lisansın hemen ardından açılıyor"). Tıklamanın arkasına
 * giden şey o cevap değil, üç kaydın ne olduğu.
 */
export function MtWhyFold() {
  return (
    <details className="mtx-fold">
      <summary>
        {C.why.title}
        <span className="mtx-x" aria-hidden="true" />
      </summary>
      <MtWhyList />
    </details>
  );
}

/**
 * Aynı üç kaydın kabuksuz hâli. MT4 hepsini TEK kapının arkasına koyuyor;
 * orada ikinci bir <details> açmak kapı içinde kapı olurdu.
 */
export function MtWhyList() {
  return (
    <ul className="mtx-why">
      {C.why.points.map((p) => (
        <li key={p.title}>
          <b>{p.title}</b>
          <span>{p.line}</span>
          {p.more && <span>{p.more}</span>}
        </li>
      ))}
    </ul>
  );
}

/**
 * Hangi kalemin HERKESTE doğmadığı. UYDURULMUYOR: afterSetup.ts'teki
 * `inclusion` alanından okunuyor ("gerekli-ise" = yalnızca şartlar oluşursa).
 *
 * Neden burada: üç yeni alternatifin üçü de bu ayrımı kullanıyor (MT4 cümlenin
 * içinde bir şerh, MT5 bir etiket, MT6 bölümün ekseni olarak) ve üç yerde ayrı
 * ayrı yazılsaydı biri veriden sessizce ayrılırdı.
 */
export function mtConditionalIds(): Set<string> {
  return new Set(
    accountingItems()
      .filter((i) => i.inclusion === "gerekli-ise")
      .map((i) => i.id),
  );
}

/**
 * Cümle içinde geçen kalem adının baş harfini küçültür — ama KISALTMAYA
 * DOKUNMAZ. "Aylık muhasebe" → "aylık muhasebe", "KDV beyannamesi" olduğu
 * gibi kalıyor: iki büyük harfle başlayan ad bir kısaltmadır ve küçültülürse
 * yanlış yazılmış olur.
 */
export function mtSoften(label: string): string {
  if (/^[A-ZÇĞİÖŞÜ]{2}/.test(label)) return label;
  return label.charAt(0).toLocaleLowerCase("tr") + label.slice(1);
}

/**
 * Vergi çerçevesi — countryContent.ts'ten beş satır.
 *
 * NEDEN AÇILIR BLOK: bölümün başlığı "hangi ay ne oluyor" diye soruyor; oran
 * tablosu "neye göre" sorusuna cevap veriyor. İkisi ayrı eksen ve bugün ikisi
 * de aynı anda ekranda duruyor — sayfanın teknik görünmesinin en büyük tek
 * sebebi bu.
 *
 * NE GİZLENMİYOR: satırın DEĞERİ ile onu niteleyen ŞERH birlikte duruyor. "%0"
 * hiçbir hâlde "otomatik muafiyet yok" olmadan ekrana çıkmıyor; ikisi birden
 * ya görünür ya değil.
 */
export function MtTaxFold({ bare = false }: { bare?: boolean }) {
  const body = (
    <>
      <dl className="mtx-tax">
        {ACC_TAX_ROWS.map((r) => (
          <div className="mtx-tax-row" key={r.label}>
            <dt>{r.label}</dt>
            <dd>
              <b className="mtx-tax-v">{r.value}</b>
              {r.note && <span className="mtx-tax-n">{r.note}</span>}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mtx-ctarow">
        <p>{ACC_TAX_NOTE}</p>
        <AskCta label="Kendi durumumu sorayım" />
      </div>
    </>
  );

  /* `bare`: MT3 kendi satır dilini kullanıyor, ikinci bir kutu istemiyor. */
  if (bare) return body;

  return (
    <details className="mtx-fold">
      <summary>
        {C.taxFrame.title}
        <span className="mtx-x" aria-hidden="true" />
      </summary>
      {body}
    </details>
  );
}

/**
 * Şeridin söyleyemediği iki şeyi söyleyen şerh — C.calendar.caption ile aynı
 * iki iddia, yalnızca ÖZNESİ alternatifin görseline göre değişiyor ("Kutular"
 * → "Sütunlar" / "Bu panel" / "Satırlar").
 *
 * İKİNCİ ARGÜMAN neden var: ikinci turun adaylarının bir kısmı AY göstermiyor.
 * MT4 sıklık söylüyor, MT5 olay söylüyor. "İşin hangi ay çıktığını gösteriyor"
 * cümlesi onlarda yanlış olurdu — şerhin doğru kalması için fiil de öznesiyle
 * birlikte değişiyor. İki iddia yine aynı, yalnızca neyi niteledikleri doğru.
 *
 * Kaldırılan ya da eklenen iddia yok:
 * (a) görsel işin çıktığı ayı gösteriyor, teslim tarihini değil;
 * (b) mali yıl şirkete göre belirleniyor, burada kuruluşla başladığı
 *     varsayılıyor.
 */
export function mtCaption(subject: string, shows = "işin hangi ay çıktığını") {
  return `${subject} ${shows} gösteriyor, teslim tarihini değil. Mali yıl şirketinize göre belirleniyor; burada kuruluşla başladığı varsayılıyor.`;
}
