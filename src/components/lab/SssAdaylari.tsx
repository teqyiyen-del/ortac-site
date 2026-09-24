"use client";

/* LAB · /lab/sss — SSS adayları (25.09.2026).
   İKİNCİ TUR: S1 (açılır kutular) tam genişlikte CANLIYA geçti
   (components/shared/SssAkordeon). S3'ün konu sekmeleri blog filtresine
   taşındı ("kategorize mantığını bloğa taşıyabilirsin"). Burada yalnız S2
   yedek olarak duruyor: "bu da bir seçenek … Google'un daha rahat
   tarayabileceği bir sistem olabilir … ama tasarımı çok boğabilir."
   Burak: "cevap kısmı siyah üzerinde … uymuyor sitenin geri kalanıyla …
   aynısını beyaza çevirmek de bir çözüm değil, daha farklı bir SSS deneyebiliriz."
   Üçü de açık zeminde, sitenin kutu diliyle (1 px çizgi, --r-md). Veri ana
   sayfa SSS'sinin kopyası (HomeFaq.tsx · FAQ); konu rengi ölçülü: vergi amber,
   banka yeşil, kuruluş ve oturum mavi. Sınıflar .lss- (css/lab-surec-sss.css). */

import {
  ArrowRight,
  Building2,
  CircleHelp,
  IdCard,
  Landmark,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";

type TopicId = "vergi" | "banka" | "kurulus" | "oturum";
const TOPICS: Record<TopicId, { label: string; icon: LucideIcon; ton: "amber" | "yesil" | "mavi" }> = {
  vergi: { label: "Vergi ve uyum", icon: ReceiptText, ton: "amber" },
  banka: { label: "Banka ve tahsilat", icon: Landmark, ton: "yesil" },
  kurulus: { label: "Kuruluş süreci", icon: Building2, ton: "mavi" },
  oturum: { label: "Oturum ve vize", icon: IdCard, ton: "mavi" },
};
type Item = { topic: TopicId; q: string; a: string; to: string; toLabel: string };
const FAQ: Item[] = [
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
    topic: "banka",
    q: "Stripe ve PayPal her ülkede çalışıyor mu?",
    a: "Hayır. Dubai ve İngiltere şirketleriyle çalışıyor; KKTC şirketleri Stripe'ın resmî ülke listesinde yer almıyor ve PayPal da desteklemiyor. Kartla tahsilat ana kanalınızsa ülke seçimi buradan değişir.",
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

function TopicMark({ id, size = 16 }: { id: TopicId; size?: number }) {
  const t = TOPICS[id];
  const Icon = t.icon;
  return (
    <span className="lss-mark" data-ton={t.ton} aria-hidden="true">
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}

function Ask() {
  return (
    <div className="lss-ask">
      <span className="lss-ask-ic" aria-hidden="true">
        <CircleHelp size={20} strokeWidth={2} />
      </span>
      <div className="lss-ask-t">
        <b>Sorunuz listede yok mu?</b>
        <span>Kendi durumunuzu görüşmede sorabilirsiniz.</span>
      </div>
      <SmartLink href="/iletisim" className="btn btn-solid lss-ask-btn">
        Görüşme planlayın
        <ArrowRight size={16} strokeWidth={2.1} aria-hidden="true" />
      </SmartLink>
    </div>
  );
}

function GoLink({ it }: { it: Item }) {
  return (
    <SmartLink href={it.to} className="link-arrow lss-go">
      {it.toLabel}
      <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
    </SmartLink>
  );
}

/* ------------------------------------------------------------ S2 · açık kartlar
   Tıklama yok: altı soru altı kart, cevap kartın içinde her zaman açık. Konu
   işareti kartın başında, bağlantı dipte. Kartların altında "sorunuz yok mu". */
export function SssS2() {
  return (
    <div className="lss lss-s2">
      <ul className="lss-s2-grid">
        {FAQ.map((it) => (
          <li key={it.q} className="lss-s2-card">
            <p className="lss-s2-top">
              <TopicMark id={it.topic} />
              <span>{TOPICS[it.topic].label}</span>
            </p>
            <h3 className="lss-s2-q">{it.q}</h3>
            <p className="lss-s2-a">{it.a}</p>
            <GoLink it={it} />
          </li>
        ))}
      </ul>
      <Ask />
    </div>
  );
}
