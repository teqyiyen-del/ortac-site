"use client";

/* LAB · /lab/sss — SSS için üç aday (25.09.2026).
   Burak: "cevap kısmı siyah üzerinde … uymuyor sitenin geri kalanıyla …
   aynısını beyaza çevirmek de bir çözüm değil, daha farklı bir SSS deneyebiliriz."
   Üçü de açık zeminde, sitenin kutu diliyle (1 px çizgi, --r-md). Veri ana
   sayfa SSS'sinin kopyası (HomeFaq.tsx · FAQ); konu rengi ölçülü: vergi amber,
   banka yeşil, kuruluş ve oturum mavi. Sınıflar .lss- (css/lab-surec-sss.css). */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  CircleHelp,
  IdCard,
  Landmark,
  Plus,
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
const EASE = [0.22, 1, 0.36, 1] as const;

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

/* ------------------------------------------------------------ S1 · açılır kutular
   Sitenin açılır dili (sektör sayfasındaki eksenler, muhasebe kalemleri):
   her soru kendi kutusu, açılan kutu açık maviye döner ve cevabı içinde taşır.
   Solda başlık ve açık renkli "sorunuz yok mu" kutusu. */
export function SssS1() {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();
  const base = useId();
  return (
    <div className="lss lss-s1">
      <div className="lss-s1-side">
        <p className="lss-lead">Karar öncesinde en çok sorulan altı başlık.</p>
        <Ask />
      </div>
      <ul className="lss-s1-list">
        {FAQ.map((it, i) => {
          const on = open === i;
          return (
            <li key={it.q} className="lss-s1-item" data-open={on ? "" : undefined}>
              <button
                type="button"
                className="lss-s1-q"
                aria-expanded={on}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <TopicMark id={it.topic} />
                <span className="lss-s1-qt">{it.q}</span>
                <Plus className="lss-s1-x" size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    id={`${base}-${i}`}
                    className="lss-s1-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
                  >
                    <div className="lss-s1-ain">
                      <p>{it.a}</p>
                      <GoLink it={it} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
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

/* ------------------------------------------------------------ S3 · konu sekmeleri
   Üstte dört konu hapı (renkli simge + soru sayısı). Seçili konunun soruları
   altta, cevaplarıyla açık. Sağ sütunda "sorunuz yok mu". */
export function SssS3() {
  const ids = Object.keys(TOPICS) as TopicId[];
  const [tab, setTab] = useState<TopicId>("vergi");
  const reduced = useReducedMotion();
  const items = FAQ.filter((f) => f.topic === tab);
  return (
    <div className="lss lss-s3">
      <div className="lss-s3-tabs" role="tablist" aria-label="Konular">
        {ids.map((id) => {
          const n = FAQ.filter((f) => f.topic === id).length;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className="lss-s3-tab"
              onClick={() => setTab(id)}
            >
              <TopicMark id={id} size={15} />
              {TOPICS[id].label}
              <i>{n}</i>
            </button>
          );
        })}
      </div>
      <div className="lss-s3-body">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={tab}
            className="lss-s3-list"
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: reduced ? 0 : 0.26, ease: EASE }}
          >
            {items.map((it) => (
              <li key={it.q} className="lss-s3-item">
                <h3 className="lss-s3-q">{it.q}</h3>
                <p className="lss-s3-a">{it.a}</p>
                <GoLink it={it} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <Ask />
      </div>
    </div>
  );
}
