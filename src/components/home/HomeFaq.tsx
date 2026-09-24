"use client";

import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import SssAkordeon, { type SssItem } from "@/components/shared/SssAkordeon";

/* §14, altı soru: satın almayı fiilen durduran başlıklar.

   Tek ve düz bir liste; konu ara başlığı yok, konu her sorunun başındaki
   renkli işarette. Sıralama hâlâ konuya göre: ilgili sorular birbirinin
   ardında kalıyor.

   Her cevap bir bağlantıyla bitiyor, bloğun altında da tek bir çıkış var.

   25.09.2026 · BLOK DEĞİŞTİ: sağdaki siyah cevap paneli gitti, yerine tam
   genişlikte açılır kutular (/lab/sss S1 · components/shared/SssAkordeon).
   Veri ve sıra aynı; konu artık her sorunun başındaki renkli işarette. */

/* sıra kasıtlı: vergi sorusu satın almayı ilk durduran başlık, o yüzden listenin
   başında duruyor ve açılışta açık olan cevap o. Devamı konu komşuluğunu
   koruyor, iki vergi, iki banka, sonra kuruluş ve oturum */
const FAQ: SssItem[] = [
  {
    topic: "vergi",
    q: "Şirket kurarak otomatik vergi avantajı elde eder miyim?",
    a: "Hayır. Avantaj gerçek faaliyete, yönetime, mukimliğe, gelir türüne ve ilgili ülke kurallarına bağlıdır. Serbest bölge şirketi olmak tek başına muafiyet vermez; şartların sağlanması ve belgelenmesi gerekir.",
    to: "/uygunluk-testi",
    toLabel: "Uygunluk testi",
  },
  {
    topic: "vergi",
    q: "Kuruluştan sonra ne yapmam gerekiyor?",
    a: "Defter tutma, dönemsel beyanlar, lisans yenilemesi ve varsa AML yükümlülükleri devam eder. Yükümlülükler kuruluşla bitmiyor; ceza riski de kuruluş sonrasında doğuyor.",
    to: "/dubai/muhasebe",
    toLabel: "Muhasebe ve vergi",
  },
  {
    topic: "banka",
    q: "Banka hesabı açılacağı garanti mi?",
    a: "Hayır, hesabı banka açar ve karar bankanındır. Biz dosyayı bankanın istediği formatta hazırlar, görüşmeleri yürütür ve reddedilirse ikinci kuruma yeniden başvururuz. Bu süreçte kesin süre ya da kesin onay taahhüdü verilemez.",
    to: "/dubai/banka-hesabi",
    toLabel: "Banka ve ödeme süreci",
  },
  {
    topic: "odeme",
    q: "Stripe ve PayPal her ülkede çalışıyor mu?",
    a: "Hayır. Dubai ve İngiltere şirketleriyle çalışıyor; KKTC şirketleri Stripe'ın resmî ülke listesinde yer almıyor ve PayPal da desteklemiyor. Kartla tahsilat ana kanalınızsa ülke seçimi buradan değişir.",
    /* "/araclar/odeme-altyapisi" diye bir sayfa hiç yazılmamıştı; adres
       app/[...yapim] yakalayıcısına düşüyordu. Matris bu turda /ulkeler'in
       "Para ve tahsilat" grubuna taşındı, bağlantı da oraya. */
    to: "/ulkeler#para-ve-tahsilat",
    toLabel: "Ödeme altyapısı matrisi",
  },
  {
    topic: "kurulus",
    q: "Hiç gitmeden şirket kurulur mu?",
    a: "İngiltere'de evet, süreç tamamen uzaktan yürür. Dubai'de tescil uzaktan tamamlanabilir; ancak vize, biyometri ve sağlık kontrolü için fiziken BAE'de bulunmanız gerekir. KKTC'de banka açılışında yerinde imza isteniyor.",
    to: "/dubai",
    toLabel: "Dubai süreci",
  },
  {
    topic: "oturum",
    q: "Şirket kurmak oturum hakkı veriyor mu?",
    a: "İngiltere'de vermiyor; göçmenlik ayrı bir süreçtir. Dubai'de şirket üzerinden oturum vizesi başvurusu yapılabiliyor. KKTC'de şirket kurmak tek başına oturum vermiyor.",
    to: "/dubai/oturum-vize",
    toLabel: "Oturum ve vize süreci",
  },
];

export default function HomeFaq() {
  return (
    <section id="sss" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Sık sorulanlar."
            accent="sorulanlar."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Karar öncesinde en çok sorulan altı başlık.</p>
          </FadeUp>
        </div>

        {/* Çıkış yazısı eskisi gibi "Sorularınızı sorun"; ülke sayfalarında
            "Görüşme planlayın". 23.09.2026 · "ücretsiz danışmanlık" hiçbir
            yerde yok (Burak). */}
        <SssAkordeon items={FAQ} placement="sss" cta="Sorularınızı sorun" />
      </div>
    </section>
  );
}
