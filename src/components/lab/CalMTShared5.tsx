import {
  ACC_TAX_NOTE,
  ACC_TAX_ROWS,
  ACCOUNTING_DUBAI as C,
  accountingItems,
  type YearLane,
} from "@/lib/accountingDubai";
import AskCta from "@/components/shared/AskCta";
import {
  MTW_AXIS,
  MTW_MONTHS,
  mtwConditional,
  mtwCount,
  mtwFreq,
  mtwIsEvery,
  mtwLanes,
  mtwMonthsText,
} from "@/components/lab/CalMTShared4";

/* ============================================================================
   LAB · MUHASEBE TAKVİMİ — BEŞİNCİ TURUN ORTAK PARÇALARI (MT13 · MT14 · MT15)
   Ad alanı .mty-

   Üçü de MT11'den türedi ve müşterinin dört düzeltmesini taşıyor. Bu dosyada
   duran şey ÜÇÜNDE AYNI olan kısım; adaylar yalnız dördün NASIL çözüldüğünde
   ayrışıyor (kayıtların yeri, cevabın biçimi, kapı sayısı).

   ÜÇÜNDE AYNI:
     · MAVİNİN DİLİ — MT10'dan taşındı. Mavi bir yüzey değil işaret; oluk yok,
       yarıçap 2px, boş ay çizilmiyor, konum gerçek ay konumu (bkz. MtyTrack).
     · KAPI BİÇİMİ — tek biçim, rozetli (bkz. MtyDoor). Bölümde ikinci bir
       kapı dili yok.
     · KAPI İÇERİĞİ — aynı (MtyDoors). Kıyas yüzeyde yapılıyor.

   VERİ ÜRETİLMİYOR. Her sayı ve her ay accountingDubai.ts'ten okunuyor; bu
   dosyada elle yazılmış tek bir rakam yok.
   ========================================================================= */

/* ------------------------------------------------------------------ olgular

   MT11'in çapası "17 kez"di ve müşteri hem ilgi çekici hem mantıklı bulmadı.
   Bölümün kendi sorusu zaten AY soruyor ("İlk 12 ayda iş hangi aylarda
   çıkıyor?"), o yüzden cevap da ay ekseninden çıkarılıyor: hangi ayda kaç
   kalem doğuyor. 17 kaybolmuyor, dağılımın toplamı olarak duruyor. */

export type MtyFacts = {
  /** Her ayın yükü; index 0 = 1. ay. */
  load: number[];
  /** En az bir kalem doğan ay sayısı. */
  busy: number;
  /** Toplam iş sayısı (12 + 4 + 1 = 17). */
  total: number;
  /** Yük dağılımı: kaç ayda kaç kalem. Çoktan aza değil, azdan çoka. */
  split: { ay: number; kalem: number }[];
  /** En yoğun ayın yükü ve hangi ay(lar) olduğu. */
  peak: number;
  peakMonths: number[];
};

export function mtyFacts(lanes: YearLane[]): MtyFacts {
  const load = MTW_MONTHS.map((m) => lanes.filter((l) => l.months.includes(m)).length);
  const busy = load.filter((n) => n > 0).length;
  const total = load.reduce((a, n) => a + n, 0);

  const say = new Map<number, number>();
  for (const n of load) if (n > 0) say.set(n, (say.get(n) ?? 0) + 1);
  const split = [...say.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([kalem, ay]) => ({ ay, kalem }));

  const peak = Math.max(...load, 0);
  const peakMonths = load.map((n, i) => (n === peak ? i + 1 : 0)).filter(Boolean);

  return { load, busy, total, split, peak, peakMonths };
}

/** "8 ayda 1 kalem · 3 ayda 2 kalem · 1 ayda 3 kalem" — dağılım, veriden. */
export function mtySplitText(f: MtyFacts): string {
  return f.split.map((s) => `${s.ay} ayda ${s.kalem} kalem`).join(" · ");
}

/** "en yoğunu 12. ay" — birden fazla tepe ay olursa hepsi yazılıyor. */
export function mtyPeakText(f: MtyFacts): string {
  return `en yoğunu ${f.peakMonths.join(". ve ")}. ay`;
}

/** Cevabın kelime hâli. Sayı 12'ye eşitse "hepsinde", değilse gerçek sayı:
 *  bir kalemin sıklığı değişirse cümle sessizce yanlış kalmasın. */
export function mtyBusyWord(f: MtyFacts): string {
  return f.busy >= MTW_MONTHS.length ? "Hepsinde" : `${f.busy} ayda`;
}
export function mtyBusyText(f: MtyFacts): string {
  return f.busy >= MTW_MONTHS.length
    ? "on iki ayın hepsinde"
    : `on iki ayın ${f.busy} ayında`;
}

/** Kuruluşta açılan kayıtların ayı — UYDURULMUYOR, afterSetup.ts'teki iki
 *  kayıt kaleminin kendi `months` dizisinden geliyor (ikisi de 1. ay). */
export function mtySetupMonths(): number[] {
  const ids = new Set(["kurumlar-vergisi-kaydi", "kdv-kaydi"]);
  const ms = accountingItems()
    .filter((i) => ids.has(i.id))
    .flatMap((i) => i.months);
  return [...new Set(ms)].sort((a, b) => a - b);
}

/** Tepe ayın ray üstündeki konumu (yüzde). MT14 kılavuz çizgisini oraya
 *  çiziyor; sayı veriden, elle yazılmıyor. */
export function mtyPeakX(f: MtyFacts): string {
  const m = f.peakMonths[f.peakMonths.length - 1] ?? MTW_MONTHS.length;
  return `${((m - 0.5) / MTW_MONTHS.length) * 100}%`;
}

/* --------------------------------------------------------------------- ray */

/** Eksen bir kez çiziliyor ve bütün satırlar onu paylaşıyor. Üç etiket de
 *  rayın gerçek bir noktasına çapalı; havada duran kelime yok. */
export function MtyAxis() {
  return (
    <div className="mty-axis" aria-hidden="true">
      <span className="mty-axis-n">{MTW_AXIS}</span>
      <span className="mty-axis-l">
        <i style={{ "--x": "0%" } as React.CSSProperties}>Lisans</i>
        <i style={{ "--x": "50%" } as React.CSSProperties}>6. ay</i>
        <i style={{ "--x": "100%" } as React.CSSProperties}>12. ay</i>
      </span>
    </div>
  );
}

/**
 * MAVİNİN TAŞINDIĞI YER.
 *
 * MT11'de burada oranlı bir DOLGU vardı: gri oluk + pill yarıçaplı düz çubuk.
 * Oran okunuyordu, konum okunmuyordu; ay listesi bu yüzden ayrıca yazıyla
 * tekrarlanıyordu. MT10'un dili: mavi bir işaret, oluk yok, yarıçap 2px, boş
 * ay hiç çizilmiyor. Her ay olan kalem 12 çentikli TEK çubuk (çentik maske,
 * boya değil — işaretin yeri animasyon boyunca kaymıyor), seyrek kalem gerçek
 * ay konumlarında kareler. Oran zaten geliyor: uzunluk 12/12, 4/12, 1/12.
 */
export function MtyTrack({ months }: { months: number[] }) {
  const every = months.length >= MTW_MONTHS.length;
  return (
    <span className="mty-track" aria-hidden="true">
      {every ? (
        <span className="mty-bar" style={{ "--n": months.length } as React.CSSProperties} />
      ) : (
        months.map((m) => (
          <span
            key={m}
            className="mty-dot"
            style={
              { "--x": `${((m - 0.5) / MTW_MONTHS.length) * 100}%` } as React.CSSProperties
            }
          />
        ))
      )}
    </span>
  );
}

/** Satırın adı: kalem + sıklık + (varsa) "gerekli ise" etiketi. */
export function MtyKey({ lane, door = false }: { lane: YearLane; door?: boolean }) {
  const kosul = mtwConditional(lane);
  return (
    <span className="mty-key">
      <b>{lane.label}</b>
      <span>{mtwFreq(lane)}</span>
      {kosul && (
        <em className="mtw-tag" data-tone="night">
          {kosul}
        </em>
      )}
      {/* MT15'te satırın kendisi kapı; işaret adın yanında duruyor. */}
      {door && <span className="mty-lane-i" aria-hidden="true" />}
    </span>
  );
}

/** Rakam ile çizim aynı diziden çıkıyor, ikisi çelişemez. */
export function MtyCount({ n, unit = "kez" }: { n: number; unit?: string }) {
  return (
    <span className="mty-count">
      {n}
      <span>&nbsp;{unit}</span>
    </span>
  );
}

/* ------------------------------------------------------- kuruluş kayıtları

   Müşteri: "kuruluşun hemen ardından açılan kayıtlar … siyah kısmın içine
   entegre edebiliriz ya da üstüne; sitede live kısımda en üstte başlıyordu,
   akış olarak çok daha doğru hissettiriyordu." Kalıp üçünde aynı: numaralı
   satır, başlık görünür, gerekçe bir tık uzakta. Değişen yalnız ZEMİN ve
   NEREDE durduğu. */
export function MtyRecords({
  tone = "day",
  lay,
}: {
  tone?: "day" | "night";
  /** `row`: geniş ekranda üç kayıt yan yana (kartın üstünde ikinci bir metin
   *  duvarı doğmasın diye) — MT13, gündüz zemin, başlık satırı yatay kalıyor.
   *  `sutun`: MT16. Aynı üçlü kartın İÇİNDE yan yana. Farkı yalnız yerleşim
   *  değil, satır başının yönü: sütunda numara ile artı işareti üst satıra
   *  çıkıyor, başlık ALT satırda sütunun tamamını kullanıyor. Ölçüldü —
   *  yatay başta başlığa kalan genişlik sütun genişliğinin ~%76'sı, iki
   *  satırlı başta ~%100'ü; en uzun başlık ("Kurumlar vergisi kaydı ve TRN")
   *  ancak böyle tek satırda kalıyor. */
  lay?: "row" | "sutun";
}) {
  return (
    <ol className="mty-recs" data-tone={tone} data-lay={lay}>
      {C.why.points.map((p, i) => (
        <li key={p.title}>
          <details className="mty-rec">
            <summary>
              <span className="mty-rec-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <b className="mty-rec-t">{p.title}</b>
              <span className="mty-rec-i" aria-hidden="true" />
            </summary>
            <div className="mty-rec-b">
              <p>{p.line}</p>
              {p.more && <p>{p.more}</p>}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------------- kapı

   TEK KAPI BİÇİMİ, dördüncü turun anatomisi + ROZET. Müşteri kapıların "çok
   yazı yazı" durduğunu söyledi; kapının kendisi de bunun bir parçasıydı (iki
   satır metin, bir daire). Rozet içeride kaç kalem olduğunu önden söylüyor ve
   sayı veriden geliyor.

   Native <details>: klavye, ekran okuyucu, sayfa içi arama ve yazdırma hazır
   geliyor; JS yok, yani hidratasyon tuzağı (tuzak A) bu bölümde hiç doğmuyor.
   Kapalı içerik DOM'da kalıyor, aranabilir kalıyor. */
export function MtyDoor({
  n,
  title,
  hint,
  children,
}: {
  n: number;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <details className="mty-door">
      <summary>
        <span className="mty-door-n" aria-hidden="true">
          {n}
        </span>
        <span className="mty-door-t">
          <b>{title}</b>
          <span>{hint}</span>
        </span>
        <span className="mty-door-i" aria-hidden="true" />
      </summary>
      <div className="mty-door-b">{children}</div>
    </details>
  );
}

/** Ritim gövdesi: üç paragraf değil üç blok. Ad + sıklık + yılın on iki
 *  kutusu + gerekçe. Izgara dördüncü turdan aynen (.mtw-grid / .mtw-cell):
 *  375 pikselde ölçülmüştü, yatay kaydırma yok, dolu kutu 7,14:1. */
function MtyRhythm({ lanes }: { lanes: YearLane[] }) {
  return (
    <ul className="mty-rit">
      {lanes.map((l) => (
        <li key={l.id}>
          <p className="mty-rit-h">
            <b>{l.label}</b>
            <span>
              {mtwFreq(l)} · {mtwCount(l)} kez
            </span>
          </p>
          {/* Izgaranın ekseni adlandırılmadan basılmıyor: tabandaki adsız
              "1 … 12" dizisi takvim ayı sanılıyordu. */}
          <p className="mtw-lane-a">{MTW_AXIS}</p>
          <ul className="mtw-grid" aria-hidden="true">
            {MTW_MONTHS.map((m) => (
              <li key={m} className="mtw-cell" data-on={l.months.includes(m) ? "1" : undefined}>
                {m}
              </li>
            ))}
          </ul>
          {/* Izgara aria-hidden, o yüzden ay listesi burada YAZIYLA duruyor —
              dördüncü turun kapısındaki cümlenin birebir aynısı. */}
          <p className="mty-rit-c">
            {l.caption}
            {!mtwIsEvery(l) && ` (${MTW_AXIS}: ${mtwMonthsText(l)})`}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Vergi gövdesi: DEĞER ÖNCE künye tahtası. Eski hâl etiket-önce bir tanım
 *  listesiydi ve beş satır beş cümle gibi duruyordu. Satır sayısı, değerler
 *  ve şerhler aynı; şerh değerden hiçbir hâlde ayrılmıyor. */
function MtyTax() {
  return (
    <>
      <div className="mty-figs">
        {ACC_TAX_ROWS.map((r) => (
          <div className="mty-fig" key={r.label}>
            <p className="mty-fig-k">{r.label}</p>
            <p className="mty-fig-v">{r.value}</p>
            {r.note && <p className="mty-fig-n">{r.note}</p>}
          </div>
        ))}
      </div>
      <div className="mty-cta">
        <p>{ACC_TAX_NOTE}</p>
        <AskCta label="Kendi durumumu sorayım" />
      </div>
    </>
  );
}

/**
 * Bölümün kapı arkası. Üç adayda da AYNI içerik.
 *
 * `rhythm=false` yalnız MT15 için: orada ritim üç satırın kendi kapılarına
 * dağıldı, yani içerik yerinde ama kapının yeri değişti. Silinmedi.
 * Kuruluş kayıtlarının kapısı üçünde de YOK: müşteri onları yüzeye çıkarttı.
 */
export function MtyDoors({ rhythm = true }: { rhythm?: boolean }) {
  const lanes = mtwLanes();

  return (
    <div className="mty-doors">
      {rhythm && (
        <MtyDoor
          n={lanes.length}
          title={C.calendar.rhythmTitle}
          hint="Her kalemin yılı, gerekçesi ve tam ay listesi"
        >
          <MtyRhythm lanes={lanes} />
        </MtyDoor>
      )}

      <MtyDoor
        n={ACC_TAX_ROWS.length}
        title={C.taxFrame.title}
        hint="Kurumlar vergisi, beyan süresi, KDV, serbest bölge, kişisel gelir vergisi"
      >
        <MtyTax />
      </MtyDoor>
    </div>
  );
}
