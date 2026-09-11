import {
  CalendarClock, MapPin, Percent, Receipt, UserRound, type LucideIcon,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import {
  ACC_TAX_ICON, ACC_TAX_NOTE, ACC_TAX_ROWS, ACCOUNTING_DUBAI as C,
  accountingItems, frequencyLabel, yearLanes,
  type AccTaxIcon, type YearLane,
} from "@/lib/accountingDubai";
import { INCLUSION_LABEL } from "@/lib/afterSetup";

const TAX_ICON: Record<AccTaxIcon, LucideIcon> = {
  percent: Percent, pin: MapPin, clock: CalendarClock,
  receipt: Receipt, person: UserRound,
};

const AXIS = "lisanstan sonra kaçıncı ay";
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/* Yardımcıların hepsi veriden türüyor; elle yazılmış rakam yok.

   11.09.2026 · ÜÇ YARDIMCI SİLİNDİ: splitText · peakText · busyText. Üçü de
   yalnız .kmt-al istatistik cümlesini kuruyordu ("İş on iki ayın hepsinde
   çıkıyor. Toplam 17 iş: 8 ayda 1 kalem · 3 ayda 2 kalem…") ve o cümle
   müşterinin isteğiyle kalktı (aşağıda). facts() da yalnız tepe ayını
   döndürecek kadar kısaldı: busy · total · split yalnız o cümlenin
   malzemesiydi. Cümlenin dayandığı hesap git'te (bu dosya, 895afc8). */
function peakMonths(lanes: YearLane[]) {
  const load = MONTHS.map((m) => lanes.filter((l) => l.months.includes(m)).length);
  const peak = Math.max(...load, 0);
  return load.map((n, i) => (n === peak ? i + 1 : 0)).filter(Boolean);
}
/* Rayın tepe çizgisi (.kmt-rail[data-peak] … ::after) en yoğun ayın ortasına
   düşüyor; tepe birden çok aysa sonuncusu. */
const peakX = (peaks: number[]) =>
  `${(((peaks.at(-1) ?? MONTHS.length) - 0.5) / MONTHS.length) * 100}%`;
const CONDITIONAL = new Set(
  accountingItems().filter((i) => i.inclusion === "gerekli-ise").map((i) => i.id),
);
const laneAlt = (lanes: YearLane[]) =>
  `Lisanstan sonraki on iki ay. ${lanes.map((l) =>
    l.months.length >= MONTHS.length
      ? `${l.label}: on iki ayın hepsi`
      : `${l.label}: ${l.months.join(", ")}. aylar`).join(". ")}.`;

export default function AccountingCalendar() {
  const lanes = yearLanes();

  return (
    <>
      <FadeUp delay={0.06} className="kmt-body">
        <div className="kmt-card">
          {/* ------------------------------------------------ KALDIRILDI (11.09.2026)
              Kartın başında iki blok vardı ve ikisi de müşterinin cümlesiyle
              gitti: "orayı çok daha sadeleştirmek lazım, özellikle direkt
              girişindeki 1-2-3 kısmı çok göz yoruyor, bide ilk 12 ayda
              başlığının altındaki açıklama fln."

                · PERDE 1 · h3#neden.kmt-act "Kuruluşun hemen ardından açılan
                  kayıtlar" + ol.kmt-recs (01-02-03 açılır kayıtları,
                  C.why.points)
                · .kmt-al · başlığın altındaki istatistik cümlesi
                · .kmt-act2 · perde 2'nin sarmalayıcısı; tek işi perde 1'den
                  bir çizgiyle ayrılmaktı ("ilk 12 ayda diye başlayan cümlenin
                  üstünde de çizgi kalmış onu kaldır"). Ayıracak bir şey
                  kalmayınca sarmalayıcı da gitti. Lab onun çizgisini,
                  dolgusunu ve boşluğunu CSS'le sıfırlamıştı; sarmalayıcının
                  kaynaktan kalkması yerleşimi değiştirmedi (ölçüldü: lab'in
                  #takvim'i öncesi ve sonrası 806,6 px @1440 · 830 px @390,
                  öğe kutuları ve hesaplanmış stiller birebir).

              /lab/muhasebe'de üçü CSS ile (display: none) gizleniyordu, çünkü
              bileşen canlıda da kullanılıyordu ve karar verilmemişti. Karar
              verildi (sayfa canlıya alındı), yani gizlemek yerine KAYNAKTAN
              çıktılar: DOM'da, sunucu yükünde ve erişilebilirlik ağacında
              artık yoklar. İçerik silinmedi: C.why accountingDubai.ts'te
              "OKUNMUYOR" notuyla duruyor (blog malzemesi). Bileşenin iki
              okuyucusu vardı (/dubai/muhasebe ve /lab/muhasebe; tarandı) ve
              lab zaten bu üçünü basmıyordu, yani lab'in görüntüsü değişmedi. */}
          <div className="kmt-hd">
            <h3 className="kmt-q">{C.calendar.stripTitle}</h3>
          </div>

          <div className="kmt-rail" data-peak=""
            style={{ "--kmt-dur": "16.993s", "--pk": peakX(peakMonths(lanes)) } as React.CSSProperties}>
            {/* Çizim aria-hidden; cümle ayrı bir düğüm (tuzak G). */}
            <p className="sr-only">{laneAlt(lanes)}</p>

            <div className="kmt-axis" aria-hidden="true">
              <span className="kmt-axis-n">{AXIS}</span>
              <span className="kmt-axis-l">
                <i style={{ "--x": "0%" } as React.CSSProperties}>Lisans</i>
                <i style={{ "--x": "50%" } as React.CSSProperties}>6. ay</i>
                <i style={{ "--x": "100%" } as React.CSSProperties}>12. ay</i>
              </span>
            </div>

            <ol className="kmt-rows">
              {lanes.map((l) => (
                <li key={l.id}>
                  <div className="kmt-key-row">
                    <span className="kmt-key">
                      <b>{l.label}</b>
                      <span>{frequencyLabel(l.months.length)}</span>
                      {CONDITIONAL.has(l.id) && (
                        <em className="kmt-tag" data-tone="night">
                          {INCLUSION_LABEL["gerekli-ise"].short.toLocaleLowerCase("tr-TR")}
                        </em>
                      )}
                    </span>
                    <span className="kmt-track" aria-hidden="true">
                      {l.months.length >= MONTHS.length ? (
                        <span className="kmt-bar"
                          style={{ "--n": l.months.length } as React.CSSProperties} />
                      ) : (
                        /* `--m` yalnız hareket için: nabız gecikmesi ay
                           numarasından türüyor, böylece kareler soldan sağa
                           sırayla yanıyor ve dalga rayın kendi yönüyle aynı
                           yöne akıyor. Konumu hâlâ `--x` veriyor. */
                        l.months.map((m) => (
                          <span key={m} className="kmt-dot" style={{
                            "--x": `${((m - 0.5) / MONTHS.length) * 100}%`,
                            "--m": m,
                          } as React.CSSProperties} />
                        ))
                      )}
                    </span>
                    <span className="kmt-count">
                      {l.months.length}<span>&nbsp;kez</span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* KALDIRILDI · .kmt-note (C.calendar.caption). Müşteri: "bide 'Kart işin
            hangi ay çıktığını gösteriyor…' bu yazıyı kaldır." Alan
            accountingDubai.ts'te DURUYOR, gerekçesi orada yazılı. */}
      </FadeUp>

      {/* VERGİ ÇERÇEVESİ · AÇILIR KAPANIR, İKONLAR İÇERİDE DURUYOR.

          İki tur önce bu blok bir <details> kapısıydı; geçen tur müşteri
          "dikkat çekici durmuyor" deyince tamamen açıldı ve ikon kareleri
          eklendi. Bu tur kapı geri geldi ("şu 2. görselde attığım kısmı
          açılır kapanır yapabilirsin ya") — ama İKONLAR KALDI, yani geri
          dönülen şey görünürlük değil yalnızca yer kaplama. Beş satır
          açıldığında hâlâ ikon kareli künye tahtası.

          Native <details>: klavye, ekran okuyucu, sayfa içi arama ve
          yazdırma hazır geliyor, JS yok — yani hidratasyon tuzağı (tuzak A)
          bu bölümde hiç doğmuyor. Kapalı içerik DOM'da kalıyor.

          BAŞLIK <summary> İÇİNDE AMA <h3> OLARAK: #vergi-cercevesi çapası
          sayfanın kendi bölüm haritasından ve iç bağlantılardan geliyor,
          kapı yüzünden kaybolamaz.

          KAPALI GELİYOR (`open` YOK). Bir tur açık bırakılmıştı, gerekçe
          şuydu: şerhler ("otomatik muafiyet yok") üstündeki değeri niteliyor
          ve bir değerin çıplak basılması STANCE_LIMITS'in yasakladığı şey.
          O gerekçe KAPALI GELMEYİ ENGELLEMİYOR ve yanlış okunmuştu: kural
          "değer her zaman görünsün" değil, "değer şerhi olmadan görünmesin".
          Kapı kapandığında ikisi BİRLİKTE gizleniyor, yani çıplak değer
          hiçbir hâlde ekranda olmuyor. Müşteri de zaten bunu istemişti:
          "burayı açılır kapanır yap derken başlangıçta kapalı gelicek olarak
          istedim aslında." */}
      <FadeUp delay={0.14}>
        <details className="kmt-frame">
          <summary className="kmt-frame-s">
            <h3 id={C.taxFrame.id} className="kmt-frame-h">{C.taxFrame.title}</h3>
            <span className="kmt-frame-i" aria-hidden="true" />
          </summary>
          <ul className="kmt-figs">
            {ACC_TAX_ROWS.map((r) => {
              const Icon = TAX_ICON[ACC_TAX_ICON[r.label] ?? "pin"];
              return (
                <li className="kmt-fig" key={r.label}>
                  <span className="kmt-fig-ic" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.9} />
                  </span>
                  <p className="kmt-fig-k">{r.label}</p>
                  <p className="kmt-fig-v">{r.value}</p>
                  {r.note && <p className="kmt-fig-n">{r.note}</p>}
                </li>
              );
            })}
          </ul>
          <div className="kmt-frame-cta">
            <p>{ACC_TAX_NOTE}</p>
            <AskCta label="Kendi durumumu sorayım" />
          </div>
        </details>
      </FadeUp>
    </>
  );
}