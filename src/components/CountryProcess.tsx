"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* Süreç bölümü artık akordiyon: başlıklar açık, açıklamalar kapalı.

   Neden değişti. Dubai listesi beş genel adımdan yediye çıktı (isim, faaliyet,
   kuruluş tipi, tescil, lisans, medical fitness + Emirates ID, GSM + banka).
   Önceki kurgu her adımı aynı anda tam metniyle basıyordu: başlık, bir cümlelik
   açıklama, gün etiketi ve sorumlu rozeti, yedi kez alt alta. Beş adımda bile
   uzun olan sütun yedide okunmaz bir duvar oluyordu — üstelik bölümün asıl işi
   "kim ne yapıyor"u göstermek, yedi paragrafı birden okutmak değil.

   Yeni kural, SSS'nin kuralıyla aynı: ziyaretçi listeyi tarar, ilgilendiği
   adıma basar, açıklama orada açılır. Kapalı satırda yalnızca iki şey var —
   adımın adı ve topun kimde olduğu — ki zaten sayfayı kaydırıp geçen birinin
   alacağı bilgi bu. Süre etiketi bilerek panelin içinde: yedi satırın yedisinde
   birden görünmesi gerekmiyor ve açık panel tek olduğu için "ilk görüşme"nin
   üç adımda tekrarı da göze batmıyor.

   Sahne kartı (SETUP_SCENES) buradan kalktı, bilerek. Sahne kümesi beş çizim ve
   adım sırasına göre indeksleniyor; Dubai'nin altıncı ve yedinci adımında
   karşılığı olmadığı için kart boşalıyor, 560x330'luk siyah panel bir anda
   180px'lik boş kutuya düşüyordu. "Kuruluş tipinin seçilmesi"nin çizimi de yok.
   Var olmayan çizimi uydurmak yerine kart, adım adım değişmeyen tek bir özete
   dönüştü: işin kaç adımının kimde olduğu. Çizimler ana sayfada (ProcessScroll)
   kullanılmaya devam ediyor, kimsesiz kalmadılar.

   Otomatik ilerleyen zamanlayıcı da kalktı. 3,6 saniyede bir kendiliğinden adım
   değiştiren bir panel, "detay talep üzerine" ilkesinin tam tersi: okuyucu
   istemeden içerik değiştiriyordu. Artık hiçbir şey kendi başına hareket
   etmiyor, dolayısıyla ne IntersectionObserver ne de "ziyaretçi devraldı"
   sayacı gerekiyor.

   Bileşenin dışa bakan sözleşmesi aynı: { steps, title }. Üç ülke de bu
   bileşeni değiştirmeden kullanıyor, adım sayısı kaç olursa olsun. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Özet kartındaki sıra akış sırası değil: önce "Sizde" geliyor çünkü
   ziyaretçinin bu bölümde sorduğu ilk şey kendi üzerine ne düştüğü. */
const WHO_ORDER = ["siz", "ortac", "otorite"] as const;

export default function CountryProcess({
  steps,
  title,
}: {
  steps: Step[];
  title: string;
}) {
  const reduced = useReducedMotion();
  /* aria-controls / aria-labelledby gerçek ve benzersiz id istiyor; useId'in
     ürettiği değerde noktalama var, seçicilere girmesin diye temizleniyor */
  const uid = `cpr${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  /* İlk adım açık başlıyor. Hepsi kapalı da olabilirdi (SSS öyle) ama orada
     soru kendi kendini anlatıyor; burada açık duran ilk panel, satırların
     tıklanabilir olduğunu tek bakışta öğretiyor. null = hepsi kapalı, bu da
     geçerli bir durum: açık olana ikinci kez basmak onu kapatıyor. */
  const [open, setOpen] = useState<number | null>(0);

  /* Yükün dağılımı veriden sayılıyor, elle yazılmıyor: adım listesi değiştiğinde
     (Dubai'de beşten yediye çıktığı gibi) özetin yanlış kalması imkânsız.
     Sıfır olan taraf listeden düşüyor — "0 adım Otoritede" diye bir bilgi yok. */
  const load = WHO_ORDER.map((who) => ({
    who,
    count: steps.filter((s) => s.who === who).length,
  })).filter((row) => row.count > 0);

  if (steps.length === 0) return null;

  return (
    <section id="surec" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="cpr">
          <div className="cpr-aside">
            <SplitWords
              as="h2"
              text={title}
              accent="adım adım."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="cpr-lead">
                Adım başlıkları ve topun kimde olduğu burada. Ayrıntısını merak
                ettiğiniz adıma basın, açıklaması altında açılsın.
              </p>
            </FadeUp>

            <FadeUp delay={0.28}>
              {/* Bölümün özeti: kaç adım var ve kaçı kimde. Ziyaretçi listeyi hiç
                  açmadan geçse bile buradan çıkacağı sonuç doğru olur. */}
              <div className="cpr-sum">
                <p className="cpr-sum-t">Toplam {steps.length} adım</p>
                <p className="cpr-sum-s">Her adımda işi kimin yürüttüğü belli.</p>

                <div className="cpr-bar" aria-hidden="true">
                  {load.map((row) => (
                    <span
                      key={row.who}
                      data-who={row.who}
                      style={{ flexGrow: row.count }}
                    />
                  ))}
                </div>

                <ul className="cpr-legend">
                  {load.map((row) => (
                    <li key={row.who}>
                      <i data-who={row.who} aria-hidden="true" />
                      <b>{row.count} adım</b>
                      <span>{WHO_LABEL[row.who]}</span>
                    </li>
                  ))}
                </ul>

                {/* Kalması şart olan cümle: liste "teslim"e kadar yürüdüğü için
                    garanti edilmeyen şey sözle söylenmeli, bir onay işaretinin
                    yokluğuyla ima edilerek değil. */}
                <p className="cpr-note">
                  Süreler tipik aralıktır. Kurum ve banka kararları ilgili
                  kuruluşlara aittir; sonuç ve süre garanti edilmez.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Gecikmeler okuma sırasını izliyor: başlık, giriş (0.2), liste
              (0.24), özet kartı (0.28). Liste özetten önce geliyor çünkü asıl
              içerik o; özet kartı en son oturuyor. */}
          <FadeUp delay={0.24} className="cpr-listwrap">
            <div className="cpr-list">
              {steps.map((s, i) => {
                const on = open === i;
                const btnId = `${uid}-t${i}`;
                const panelId = `${uid}-p${i}`;
                return (
                  <div className="cpr-item" key={s.title} data-on={on || undefined}>
                    {/* h3, çünkü liste ekran okuyucuda h2'nin altında gezinilebilir
                        bir başlık yığını olmalı — düz butonlar öyle değil */}
                    <h3 className="cpr-h">
                      <button
                        type="button"
                        id={btnId}
                        className="cpr-btn"
                        aria-expanded={on}
                        aria-controls={panelId}
                        onClick={() => setOpen(on ? null : i)}
                      >
                        <span className="cpr-no">{String(i + 1).padStart(2, "0")}</span>
                        <span className="cpr-title">{s.title}</span>
                        <span className="cpr-who" data-who={s.who}>
                          {WHO_LABEL[s.who]}
                        </span>
                        <ChevronDown
                          className="cpr-chev"
                          size={18}
                          strokeWidth={2.1}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {on && (
                        /* Yükseklik animasyonu: panel içeriği ülkeye göre farklı
                           uzunlukta, sabit bir yükseklik veremeyiz. reduced
                           motion'da süre sıfır — açılış anında oluyor, hareket
                           yok ama düzen de bozulmuyor. */
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          className="cpr-panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
                        >
                          <div className="cpr-panel-in">
                            <p className="cpr-line">{s.line}</p>
                            <p className="cpr-timing">
                              <span>Ne zaman</span>
                              <b>{s.timing}</b>
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
