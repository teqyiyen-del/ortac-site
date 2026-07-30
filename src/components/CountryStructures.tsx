"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Circle,
  Globe,
  ListChecks,
  Store,
  TriangleAlert,
  Users,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent, Structure } from "@/lib/countryContent";

/* Bu bölüm iki tur geçirdi. İlk hâli iki uzun kart + şematik bir Dubai
   haritasıydı; kıyas diye bir şey yoktu, iki paragraf okuma egzersizi vardı.
   İkinci hâli düz bir kıyas tablosuydu: hizalama sorunu çözüldü ama karşılığı
   ödendi — dört satırın dördü de aynı anda açıktı ve bölüm dümdüz yazıdan
   ibaret hissettiriyordu. Sayfayı kaydıran biri orada durmayacaksa dört satır
   metin görmesin.

   Üçüncü hâlin iki iddiası var:

   1) KIYAS ÇİZİLİYOR, YAZILMIYOR. İki seçeneğin başlığında aynı çerçeveyi
      kullanan iki şema var: dış hat BAE. Serbest bölgede şirket ülkenin
      içindeki kendi çitli alanında duruyor ve mavi ok sınırı geçip dışarı
      çıkıyor; iç pazara giden bağ kesik ve soluk. Mainland'de aynı çerçevenin
      tamamı mavi, mavi ok sınırın içinde kalıp iç pazara gidiyor, dışarı giden
      bağ kesik. Yani iki çizim birbirinin aynası ve fark tek bir şeyde:
      okun hangi tarafa gittiği. Kıyasın kendisi bu.

      Şemalar aynı zamanda "Dikkat edin" satırının özünü taşıyor: serbest
      bölgede iç pazara giden bağın kesik olması, o satır kapalıyken bile
      kısıtın ekranda durması demek. Uyarıyı saklamıyoruz, resmediyoruz.

   2) ÖZET ÖNDE, DETAY TALEP ÜZERİNE. Açılışta yalnız iki şema, iki isim ve en
      ayırt edici iki satır (kime satarsınız / tipik iş modeli) duruyor. Kalan
      uygunluk maddeleri ve uyarılar tek bir "Detayları göster" düğmesinin
      arkasında. Düğme kapalıyken bile içeride ne olduğunu ikonuyla söylüyor —
      gizli olan ulaşılamaz değil, sadece istenmeden basılmıyor.

   Karar kuralı yerinde: başlığın sağındaki yarım genişlikte, bölümün ikinci
   en görünür ögesi. Müşteri girişi olarak onu beğendi, dokunulmadı; yalnızca
   iki dalına şemalardaki ikonların aynısı kondu ki kural ile çizim aynı dili
   konuşsun. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Karar kuralının iki dalı. data.rule cümlesinin içindeki koşulları tek tek
   okunur hale getiriyor; içerik oradan geliyor, burada yeni bir iddia yok.
   Sıra options dizisiyle aynı olmak zorunda: 0 = serbest bölge, 1 = mainland.
   Bileşen zaten Dubai'ye özel (structures yalnızca Dubai'de tanımlı), o yüzden
   bu eşleşme veriye değil bileşene ait bir sunum kararı.
   Icon alanı şemalardaki düğümlerle bilerek aynı: dünya = BAE dışı,
   dükkân = BAE içi. */
const BRANCHES = [
  { when: "Müşteriniz BAE dışında", Icon: Globe },
  { when: "Müşteriniz BAE içinde", Icon: Store },
];

/* Açılışta görünen satırlar. fit[0] ve fit[1] iki seçenekte de aynı soruyu
   cevapladığı için kendi satırlarını alıyor; ikisi de seçimi gerçekten
   ayrıştıran sorular, o yüzden özet katmanında bunlar duruyor. Geri kalan
   maddeler tek satırda rozet olarak toplanıp detaya iniyor, çünkü oradan
   sonrası iki tarafta birebir örtüşmüyor ve zorlama bir eşleştirme tabloyu
   yanlış okutur. */
const ROWS: {
  label: string;
  Icon: typeof Users;
  pick: (o: Structure) => string | undefined;
}[] = [
  { label: "Kime satarsınız", Icon: Users, pick: (o) => o.fit[0] },
  { label: "Tipik iş modeli", Icon: Briefcase, pick: (o) => o.fit[1] },
];

/* line iki cümle taşıyor: önce lisansın bağlı olduğu otorite, sonra bir
   bağlam cümlesi. İkisini ayırıyoruz çünkü dar ekranda sütun genişliği
   ~175px'e düşüyor ve ikinci cümle başlığı beş satıra çıkarıyor — orada
   yalnız birincisi kalıyor (bkz. .stx-h-l2). Mobilde kaybolan bağlamı şema
   zaten çiziyor, o yüzden bu kırpma bir bilgi kaybı değil. */
function splitLine(line: string) {
  const [first, ...rest] = line.split(". ");
  /* nokta ayrı basılıyor (cümlenin sonu bizde), tek cümlelik bir line
     gelirse çift nokta çıkmasın */
  return { head: first.replace(/\.$/, ""), tail: rest.join(". ") };
}

/* ---- şemalar ----
   Ortak dil ProSchema.tsx ile aynı: sadece geometri, tek mavi, içine
   yerleştirilmiş lucide glifleri (bir <svg> çocuğu geçerli SVG). Renk paleti
   .gv2-* sınıflarından geliyor, yani bu iki çizim sitedeki diğer şemalarla
   aynı kalemle çizilmiş oluyor — yeni bir görsel dil açmıyoruz.

   İki çizim aynı viewBox'ı, aynı çerçeveyi ve aynı düğüm koordinatlarını
   paylaşıyor. Bilerek: yan yana durduklarında göz sadece değişen şeyi
   görsün, iki farklı resmi çözmeye çalışmasın. */
const VB = "0 0 128 92";

/** ok başı — ProSchema'daki ArrowR ile aynı, ölçeği bu viewBox'a göre biraz küçük */
function Arrow({ x, y, blue }: { x: number; y: number; blue?: boolean }) {
  return (
    <path
      d={`M${x} ${y - 4} L${x + 5.8} ${y} L${x} ${y + 4} Z`}
      className={blue ? "gv2-ah gv2-ah-b" : "gv2-ah"}
    />
  );
}

/** Serbest bölge: ülkenin içinde kendi çitiyle bir alan, satış sınırın dışına. */
function FigFree() {
  return (
    <svg viewBox={VB} className="stx-fig" focusable="false" aria-hidden="true">
      {/* BAE — iki çizimde de aynı dikdörtgen, aynı yerde */}
      <rect x="2" y="6" width="84" height="80" rx="16" className="stx-fr" />

      {/* serbest bölge: ülkenin içinde ama kendi çiti olan alan */}
      <rect x="8" y="22" width="42" height="42" rx="11" className="gv2-halo" />
      <rect
        x="8"
        y="22"
        width="42"
        height="42"
        rx="11"
        className="gv2-line-b gv2-dash"
        fill="none"
      />

      <rect x="13" y="32" width="32" height="22" rx="8" className="gv2-box-b" />
      <Building2 x={21} y={35} width={16} height={16} strokeWidth={2.1} className="gv2-ic-b" />

      {/* ana yön: iki çiti de geçip dışarı */}
      <path d="M45 43 C 64 43, 68 26, 88 26" className="gv2-line-b stx-flow" />
      <Arrow x={88} y={26} blue />
      <circle cx="111" cy="26" r="14" className="gv2-box-b" />
      <Globe x={104} y={19} width={14} height={14} strokeWidth={2.1} className="gv2-ic-b" />

      {/* iç pazar aynı kolaylıkta değil: kesik ve soluk. "Dikkat edin"
          satırının özü, o satır kapalıyken de ekranda kalsın diye. */}
      <path d="M29 54 V70 H50" className="gv2-line gv2-dash gv2-faint" />
      <Arrow x={50} y={70} />
      <rect x="57" y="58" width="22" height="24" rx="8" className="gv2-box" />
      <Store x={61} y={63} width={14} height={14} strokeWidth={2.1} className="gv2-ic-m" />
    </svg>
  );
}

/** Mainland: aynı çerçevenin tamamı sizin sahanız, satış sınırın içinde. */
function FigMain() {
  return (
    <svg viewBox={VB} className="stx-fig" focusable="false" aria-hidden="true">
      {/* aynı dikdörtgen, bu kez baştan sona mavi: iç pazarın tamamı açık */}
      <rect x="2" y="6" width="84" height="80" rx="16" className="gv2-box-b" />

      <rect x="13" y="32" width="32" height="22" rx="8" className="gv2-chip-w" />
      <Building2 x={21} y={35} width={16} height={16} strokeWidth={2.1} className="gv2-ic-b" />

      {/* ana yön: sınırın içinde kalıyor */}
      <path d="M29 54 V70 H50" className="gv2-line-b stx-flow" />
      <Arrow x={50} y={70} blue />
      <rect x="57" y="58" width="22" height="24" rx="8" className="gv2-chip-w" />
      <Store x={61} y={63} width={14} height={14} strokeWidth={2.1} className="gv2-ic-b" />

      {/* dışarısı kapalı değil, ama bu yapıyı kurma sebebiniz o değil */}
      <path d="M45 43 C 64 43, 68 26, 88 26" className="gv2-line gv2-dash gv2-faint" />
      <Arrow x={88} y={26} />
      <circle cx="111" cy="26" r="14" className="stx-fr" />
      <Globe x={104} y={19} width={14} height={14} strokeWidth={2.1} className="gv2-ic-m" />
    </svg>
  );
}

/* BRANCHES ile aynı sıra sözleşmesi: 0 = serbest bölge, 1 = mainland. */
const FIGS = [FigFree, FigMain];

export default function CountryStructures({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* Başlangıçta hiçbir sütun seçili değil. Varsayılan bir seçim koymak
     ziyaretçi daha soruyu okumadan bir yapıyı önermek olurdu; tablo nötr
     başlasın, seçimi kullanıcı yapsın. Aynı sütuna tekrar tıklamak seçimi
     kaldırıyor. */
  const [picked, setPicked] = useState<number | null>(null);
  /* Detay katmanı kapalı açılıyor — bölümün tek amacı bu. */
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const moreId = useId();

  /* fit dizisinin ilk iki maddesi özet katmanında; kalanı detayda.
     Veri kısalırsa satır hiç basılmıyor. */
  const hasExtras = data.options.some((o) => o.fit.length > 2);

  return (
    <section id="yapi" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="stx-top">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text={data.title}
              accent="serbest bölge mi, mainland mi?"
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{data.lead}</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.26}>
            <aside className="stx-rule">
              <span className="stx-rule-k">Karar kuralı</span>
              <p className="stx-rule-t">{data.rule}</p>
              <ul className="stx-map">
                {data.options.map((o, idx) => {
                  const Branch = BRANCHES[idx];
                  return (
                    <li key={o.name}>
                      {Branch ? (
                        <Branch.Icon size={15} strokeWidth={2.2} aria-hidden="true" />
                      ) : (
                        <span />
                      )}
                      <span className="stx-map-if">{Branch?.when}</span>
                      <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                      <span className="stx-map-then">{o.name}</span>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <div className="stx-tbl">
            {/* tablo başlığı: sol üst köşe boş kalmasın diye ızgaranın ne
                olduğunu söyleyen küçük bir etiket taşıyor */}
            <div className="stx-corner">Kıyas</div>
            {data.options.map((o, idx) => {
              const on = picked === idx;
              const { head, tail } = splitLine(o.line);
              const Fig = FIGS[idx] ?? FigFree;
              return (
                <button
                  key={o.name}
                  type="button"
                  className="stx-h"
                  aria-pressed={on}
                  data-on={on || undefined}
                  onClick={() => setPicked(on ? null : idx)}
                >
                  <Fig />
                  <span className="stx-h-n">{o.name}</span>
                  <span className="stx-h-l">
                    {head}.{tail ? <span className="stx-h-l2"> {tail}</span> : null}
                  </span>
                  <span className="stx-h-cta">
                    {on ? (
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <Circle size={12} strokeWidth={2.4} aria-hidden="true" />
                    )}
                    {on ? "Durumunuz bu" : "Durumum bu"}
                  </span>
                </button>
              );
            })}

            {ROWS.map(({ label, Icon, pick }) => (
              /* display:contents — satırın üç hücresi doğrudan ızgaraya
                 düşsün, araya kutu girmesin */
              <div key={label} style={{ display: "contents" }}>
                <div className="stx-lb">
                  <Icon size={15} strokeWidth={2.2} aria-hidden="true" />
                  {label}
                </div>
                {data.options.map((o, idx) => (
                  <div key={o.name} className="stx-c" data-on={picked === idx || undefined}>
                    {pick(o)}
                  </div>
                ))}
              </div>
            ))}

            {/* Detay katmanı. Sarmalayıcı ızgaranın tamamını kaplıyor ve içeride
                üst ızgaranın sütun izlerini birebir tekrar ediyor; böylece
                açıldığında hücreler yukarıdaki satırlarla aynı hizada duruyor
                ama yükseklik tek bir kutuda animasyon edilebiliyor. */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="more"
                  id={moreId}
                  className="stx-more"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {hasExtras && (
                    <div style={{ display: "contents" }}>
                      <div className="stx-lb">
                        <ListChecks size={15} strokeWidth={2.2} aria-hidden="true" />
                        Ayrıca size uyuyorsa
                      </div>
                      {data.options.map((o, idx) => (
                        <div
                          key={o.name}
                          className="stx-c"
                          data-on={picked === idx || undefined}
                        >
                          <span className="stx-chips">
                            {o.fit.slice(2).map((f) => (
                              <span key={f} className="stx-chip">
                                <Check size={11} strokeWidth={3.4} aria-hidden="true" />
                                {f}
                              </span>
                            ))}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* dikkat satırı seçimden bağımsız: detay açıldığında iki
                      tarafın uyarısı da görünür, seçili olmayan taraf
                      saklanmıyor */}
                  <div style={{ display: "contents" }}>
                    <div className="stx-lb stx-lb-warn">
                      <TriangleAlert size={15} strokeWidth={2.2} aria-hidden="true" />
                      Dikkat edin
                    </div>
                    {data.options.map((o) => (
                      <div key={o.name} className="stx-c stx-c-warn">
                        <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                        {o.watch}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tek kontrol, tablonun altında. Sağdaki ipucu kapalıyken bile
                içeride ne olduğunu söylüyor; uyarı gliflerini amber tutuyoruz
                ki "gizlenen şeyin içinde bir kısıt var" ilk bakışta okunsun. */}
            <button
              type="button"
              className="stx-more-t"
              aria-expanded={open}
              aria-controls={open ? moreId : undefined}
              onClick={() => setOpen((v) => !v)}
            >
              <ChevronDown size={15} strokeWidth={2.4} aria-hidden="true" />
              <span className="stx-more-l">
                {open ? "Detayları gizle" : "Detayları göster"}
              </span>
              <span className="stx-more-h">
                {hasExtras && (
                  <span className="stx-more-hi">
                    <ListChecks size={13} strokeWidth={2.2} aria-hidden="true" />
                    <span className="stx-more-hw">uygunluk maddeleri</span>
                  </span>
                )}
                <span className="stx-more-hi stx-more-warn">
                  <TriangleAlert size={13} strokeWidth={2.2} aria-hidden="true" />
                  <span className="stx-more-hw">dikkat edilecekler</span>
                </span>
              </span>
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
