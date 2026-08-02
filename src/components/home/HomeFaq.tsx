"use client";

import SmartLink from "@/components/shared/SmartLink";
import { Fragment, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  IdCard,
  Landmark,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import { gtm } from "@/lib/gtm";

/* §14, altı soru: satın almayı fiilen durduran başlıklar.

   Sol sütun tek ve düz bir liste. Konu ara başlıkları kaldırıldı; altı soru
   kesintisiz alt alta diziliyor, aralarında grup ayracı yok. Konu bilgisi
   kaybolmuyor, sağdaki panelin tepesinde açılan cevabın etiketi olarak duruyor,
   yani aynı bilgi iki kez tekrar etmiyor. Sıralama hâlâ konuya göre: ilgili
   sorular birbirinin ardında kalıyor, sadece aradaki başlık satırı yok.

   Her cevap bir bağlantıyla bitiyor, bloğun altında da tek bir çıkış var. */

const EASE = [0.22, 1, 0.36, 1] as const;

type TopicId = "vergi" | "banka" | "kurulus" | "oturum";
type Topic = { label: string; icon: LucideIcon };
type Item = { topic: TopicId; q: string; a: string; to: string; toLabel: string };

/* yalnızca panel etiketi için: liste artık konuya bölünmüyor */
const TOPICS: Record<TopicId, Topic> = {
  vergi: { label: "Vergi ve uyum", icon: ReceiptText },
  banka: { label: "Banka ve tahsilat", icon: Landmark },
  kurulus: { label: "Kuruluş süreci", icon: Building2 },
  oturum: { label: "Oturum ve vize", icon: IdCard },
};

/* sıra kasıtlı: vergi sorusu satın almayı ilk durduran başlık, o yüzden listenin
   başında duruyor ve açılışta açık olan cevap o. Devamı konu komşuluğunu
   koruyor, iki vergi, iki banka, sonra kuruluş ve oturum */
const FAQ: Item[] = [
  {
    topic: "vergi",
    q: "Şirket kurarak otomatik vergi avantajı elde eder miyim?",
    a: "Hayır. Avantaj gerçek faaliyete, yönetime, mukimliğe, gelir türüne ve ilgili ülke kurallarına bağlıdır. Serbest bölge şirketi olmak tek başına muafiyet vermez; şartların sağlanması ve belgelenmesi gerekir.",
    to: "/uygunluk-testi",
    toLabel: "Durumunuza uygun mu, teste bakın",
  },
  {
    topic: "vergi",
    q: "Kuruluştan sonra ne yapmam gerekiyor?",
    a: "Defter tutma, dönemsel beyanlar, lisans yenilemesi ve varsa AML yükümlülükleri devam eder. Kategorideki firmaların çoğu ilk halkada bitiyor; ceza da, sorun da sonrasında çıkıyor.",
    to: "/dubai/muhasebe",
    toLabel: "Muhasebe ve vergi tarafına bakın",
  },
  {
    topic: "banka",
    q: "Banka hesabı açılacağı garanti mi?",
    a: "Hayır, hesabı banka açar ve karar bankanındır. Biz dosyayı bankanın istediği formatta hazırlar, görüşmeleri yürütür ve reddedilirse ikinci kuruma yeniden başvururuz. Kimseden kesin süre ya da kesin onay sözü almayın.",
    to: "/dubai/banka-hesabi",
    toLabel: "Banka ve ödeme sürecine bakın",
  },
  {
    topic: "banka",
    q: "Stripe ve PayPal her ülkede çalışıyor mu?",
    a: "Hayır. Dubai ve İngiltere şirketleriyle çalışıyor; KKTC şirketleri Stripe'ın resmî ülke listesinde yer almıyor ve PayPal da desteklemiyor. Kartla tahsilat ana kanalınızsa ülke seçimi buradan değişir.",
    /* "/araclar/odeme-altyapisi" diye bir sayfa hiç yazılmamıştı; adres
       app/[...yapim] yakalayıcısına düşüyordu. Matris bu turda /ulkeler'in
       "Para ve tahsilat" grubuna taşındı, bağlantı da oraya. */
    to: "/ulkeler#para-ve-tahsilat",
    toLabel: "Ödeme altyapısı matrisini açın",
  },
  {
    topic: "kurulus",
    q: "Hiç gitmeden şirket kurulur mu?",
    a: "İngiltere'de evet, süreç tamamen uzaktan yürür. Dubai'de tescil uzaktan tamamlanabilir; ancak vize, biyometri ve sağlık kontrolü için fiziken BAE'de bulunmanız gerekir. KKTC'de banka açılışında yerinde imza isteniyor.",
    to: "/dubai",
    toLabel: "Dubai sürecini inceleyin",
  },
  {
    topic: "oturum",
    q: "Şirket kurmak oturum hakkı veriyor mu?",
    a: "İngiltere'de vermiyor; göçmenlik ayrı bir süreçtir. Dubai'de şirket üzerinden oturum vizesi başvurusu yapılabiliyor. KKTC'de şirket kurmak tek başına oturum vermiyor.",
    to: "/dubai/oturum-vize",
    toLabel: "Oturum ve vize sürecine bakın",
  },
];

const QUESTION_COUNT = FAQ.length;

/* seçim değişince panel yeniden monte ediliyor, gelen cevap kendi açılışını
   oynuyor; hiçbir yerde yükseklik animasyonu yok */
function Answer({
  item,
  panelId,
  labelId,
}: {
  item: Item;
  panelId: string;
  labelId: string;
}) {
  const topic = TOPICS[item.topic];
  const Icon = topic.icon;

  return (
    <motion.div
      id={panelId}
      role="region"
      aria-labelledby={labelId}
      className="sss-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
    >
      <div className="sss-panel-head">
        <span className="sss-panel-topic">
          <Icon size={15} strokeWidth={2.1} aria-hidden="true" />
          {topic.label}
        </span>
        <h3 className="sss-panel-q">{item.q}</h3>
      </div>
      <div className="sss-rule" aria-hidden="true" />
      <p className="sss-a">{item.a}</p>
      <SmartLink href={item.to} className="link-arrow">
        {item.toLabel}
        <ArrowRight size={15} strokeWidth={2.1} />
      </SmartLink>
    </motion.div>
  );
}

export default function HomeFaq() {
  const [active, setActive] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  /* Tab zaten listeyi geziyor; oklar açık cevabı değiştirmeden odağı taşıyor,
     bir disclosure listesinden beklenen davranış bu */
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const from = btns.current.findIndex((el) => el === document.activeElement);
    if (from < 0) return;

    let next: number;
    if (e.key === "ArrowDown") next = (from + 1) % QUESTION_COUNT;
    else if (e.key === "ArrowUp") next = (from - 1 + QUESTION_COUNT) % QUESTION_COUNT;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = QUESTION_COUNT - 1;
    else return;

    e.preventDefault();
    btns.current[next]?.focus();
  }

  return (
    <section id="sss" className="sec-pad" style={{ background: "var(--paper)" }}>
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
            <p className="sec-lead">Satın almadan önce en çok takılınan altı başlık.</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.24}>
          {/* satır sayısı buradan veriliyor: panel grid-row: 1 / -1 ile listenin
              tamamına yayılabilsin diye satırlar açıkça tanımlı olmalı. Sondaki
              1fr satırı, panelin listeden uzun kaldığı durumda artan yüksekliği
              yutuyor, soru satırları gerilip birbirinden açılmıyor.

              sss-onpaper: bu bölümün zemini var(--paper), panelin ve hover
              dolgusunun taban rengi de var(--paper). İkisi aynı renge düştüğü
              için kart da hover geri bildirimi de görünmüyordu. Ülke sayfasında
              bölüm var(--white) olduğu için orada sorun yok, o yüzden temel
              kural değişmiyor, yalnızca paper zemine oturan liste bu sınıfı
              alıyor */}
          <div
            className="sss sss-onpaper"
            style={{ gridTemplateRows: `repeat(${QUESTION_COUNT}, auto) 1fr` }}
            onKeyDown={onKeyDown}
          >
            {FAQ.map((item, i) => (
              <Fragment key={item.q}>
                <button
                  type="button"
                  id={`sss-q-${i}`}
                  ref={(el) => {
                    btns.current[i] = el;
                  }}
                  className="sss-q"
                  data-on={active === i || undefined}
                  aria-expanded={active === i}
                  aria-controls={active === i ? `sss-a-${i}` : undefined}
                  onClick={() => setActive(i)}
                >
                  <span>{item.q}</span>
                  <ChevronRight
                    className="sss-chev"
                    size={17}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </button>
                {active === i && (
                  <Answer item={item} panelId={`sss-a-${i}`} labelId={`sss-q-${i}`} />
                )}
              </Fragment>
            ))}
          </div>
        </FadeUp>

        {/* blok için tek çıkış */}
        <FadeUp delay={0.28}>
          <div className="sss-cta">
            <div>
              <p className="sss-cta-t">Sorunuz listede yok mu?</p>
              {/* İkinci cümle ("Mali müşavir ve kuruluş danışmanı aynı
                  görüşmede cevap versin") olmayan bir görüşme kurgusunu tarif
                  ediyordu: firmanın masaya iki uzman çıkardığı böyle bir formatı
                  yok. Ücretsiz danışmanlık gerçek ve site genelinde aynı adla
                  duruyor, o yüzden ilk cümle aynen kaldı; blok da bir satır
                  kısalarak sadeleşti. */}
              <p className="sss-cta-l">Kendi durumunuzu ücretsiz danışmanlıkta sorun.</p>
            </div>
            <SmartLink
              href="/basla"
              className="btn btn-line"
              onClick={() => gtm("cta_meeting_click", { placement: "sss" })}
            >
              Sorularınızı sorun
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
