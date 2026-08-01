"use client";

/* ============================================================================
   ADAY I1 — İLETİŞİM SAYFASI · "TEK SORU"
   CSS: src/app/css/lab-i1.css · ad alanı .i1-

   NEDEN BU TASARIM
   İletişim sayfası kategoride hep aynı şey: solda on alanlık bir form, sağda
   bir harita, altta üç satır künye. O sayfa bir form doldurma ödevi; kimse
   heyecanlanmıyor, kimse doldurmuyor. Buradaki iddia bunun tersini denemek:
   sayfa bir form değil, konuşmanın ilk cümlesi.

   Ekranı kaplayan siyah bir tuvalde tek bir soru duruyor — "Nerede şirket
   kurmak istiyorsunuz?" — ve başka hiçbir şey yok. Ziyaretçi cevaplayınca soru
   değişiyor, verdiği cevap üstte bir kelimeye dönüşüyor. Üç cevaptan sonra form
   KENDİNİ KURUYOR: ad, e-posta, telefon. Yani ziyaretçi hiçbir noktada on
   alanlık bir tabloya bakmıyor, her seferinde tek bir şeye bakıyor.

   Cesaret buradan geliyor: sayfa boş açılıyor. Bir formun görsel ağırlığını
   sıfıra indirip yerine tek bir cümle koymak, "sizin için vaktimiz var"
   demenin en kısa yolu. Aynı zamanda işe de yarıyor — soru sırası zaten bir
   niteleme akışı: ülke, aşama, takvim. Form gönderildiğinde (uç nokta
   bağlandığında) karşı tarafta boş bir "merhaba" değil, üç cevaplı bir brief
   duruyor.

   EFEKTİF OLAN NE
   1. Klavye. 1-4 tuşları seçiyor, Backspace geri alıyor. Tuş kapakları
      ekranda görünüyor, yani öğretilmesi gerekmiyor. Fare kullanmadan üç soru
      üç saniye. Dinleyici yalnızca bölüm ekrandayken bağlanıyor ve input
      içinde yazarken devre dışı — sayfanın geri kalanını ele geçirmiyor.
   2. Cevap izi. Verilen cevaplar üstte tıklanabilir birer kelimeye dönüşüyor;
      birine basmak o soruya geri götürüyor. Geri gitmek için "önceki" aramak
      gerekmiyor, cevabın kendisi düğme.
   3. İlerleme rayı ve dev sıra numarası. Ziyaretçi kaç soru kaldığını sormak
      zorunda kalmıyor; sayfa boş dursa da bittiği belli.

   NEYİ UYDURMADIK
   · Çalışan bir form uç noktamız yok. Form görsel olarak tam kurulu ama
     gönder butonu DEVRE DIŞI ve sahte bir "mesajınız iletildi" ekranı YOK
     (SWAP:CONTACT_FORM). Çalışan tek çıkış AskCta — /basla'ya gidiyor.
   · Telefon, e-posta ve adres doğrulanmadı. "Doğrudan hat" bölümündeki
     değerler kesikli yer tutucu olarak duruyor (SWAP:CONTACT_INFO). Uydurma
     numara yazmaktansa boş kutu göstermek tercih edildi: yanlış numara
     tasarımdan daha pahalıya patlar.
   · Süre sözü verilmiyor. Üçüncü sorunun alt satırı bunu açıkça yazıyor:
     takvimi soruyoruz ama taahhüt etmiyoruz (STANCE_LIMITS).

   TAŞINIRKEN DİKKAT
   Bölümlere bilerek id verilmedi — aday sayfasında üç iletişim adayı yan yana
   duracak, id tek olmak zorunda. Kazanan canlıya girerken çapası eklenmeli.
   Bileşen prop almıyor: sayfanın gövdesi gibi davranıyor, bölüm yığını
   döndürüyor.
   ========================================================================= */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Building2,
  CalendarClock,
  CalendarDays,
  CalendarOff,
  CalendarRange,
  Compass,
  CornerDownLeft,
  Languages,
  LayoutPanelLeft,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import { FACTS, STANCE_LIMITS, type CountrySlug } from "@/lib/brand";

/* projedeki tek yumuşama eğrisi (--ease-out-quint'in JS karşılığı) */
const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------------------- sorular */

type Slot = "yer" | "asama" | "zaman";

type Opt = {
  id: string;
  label: string;
  note: string;
  /** bayrak diski — yalnızca ülke seçeneklerinde */
  country?: CountrySlug;
  /** bayrağı olmayan seçeneğin glifi */
  Icon?: LucideIcon;
};

type Question = {
  key: Slot;
  n: string;
  ask: string;
  /** ask içinde vurgulanacak alt dize — SplitWords'ün accent'iyle aynı mantık */
  accent: string;
  hint: string;
  opts: Opt[];
};

/* Üç soru, üçü de ziyaretçinin cevabını KENDİ İŞİNDEN bildiği türden. Hiçbiri
   "hizmet paketi seçin" demiyor: paket seçmek bizim işimiz, ziyaretçi nerede
   olduğunu ve ne zaman istediğini biliyor. Sıra da rastgele değil — ülke
   konuşmanın zeminini, aşama başlangıç noktasını, takvim de aciliyeti
   belirliyor. Dördüncü adım soru değil, formun kendisi. */
const QUESTIONS: Question[] = [
  {
    key: "yer",
    n: "01",
    ask: "Nerede şirket kurmak istiyorsunuz?",
    accent: "Nerede",
    hint: "Üç ülkede de operasyonumuz var. Emin değilseniz seçmeyin — hangisinin size uyduğunu birlikte bulmak da işin parçası.",
    opts: [
      { id: "dubai", label: "Dubai", note: FACTS.dubai.tag, country: "dubai" },
      { id: "ingiltere", label: "İngiltere", note: FACTS.ingiltere.tag, country: "ingiltere" },
      { id: "kktc", label: "KKTC", note: FACTS.kktc.tag, country: "kktc" },
      { id: "karasiz", label: "Henüz karar vermedim", note: "Üçünü birlikte karşılaştıralım", Icon: Compass },
    ],
  },
  {
    key: "asama",
    n: "02",
    ask: "Bugün hangi aşamadasınız?",
    accent: "hangi aşamadasınız?",
    hint: "Cevabınız konuşmanın nereden başlayacağını belirliyor. Sıfırdan anlatmakla kaldığınız yerden devam etmek aynı şey değil.",
    opts: [
      { id: "arastirma", label: "Araştırıyorum", note: "Önce maliyeti ve şartları görmek istiyorum", Icon: Search },
      { id: "karar", label: "Kurmaya karar verdim", note: "Süreci başlatalım", Icon: Rocket },
      { id: "mevcut", label: "Şirketim zaten var", note: "Muhasebe, banka veya uyum tarafı için", Icon: Building2 },
      { id: "soru", label: "Tek bir sorum var", note: "Kısa bir cevap yeterli", Icon: MessageSquare },
    ],
  },
  {
    key: "zaman",
    n: "03",
    ask: "Ne zaman başlamak istiyorsunuz?",
    accent: "Ne zaman",
    hint: "Takviminizi bilmek işi sıraya koymamıza yarıyor. Bu bir süre taahhüdü değil: resmî kurumların ve bankaların takvimi bizim kontrolümüzde değil.",
    opts: [
      { id: "bu-ay", label: "Bu ay", note: "Acelem var", Icon: CalendarClock },
      { id: "1-3-ay", label: "1-3 ay içinde", note: "Planlı ilerliyorum", Icon: CalendarRange },
      { id: "bu-yil", label: "Bu yıl içinde", note: "Zamanım var", Icon: CalendarDays },
      { id: "belirsiz", label: "Net bir tarihim yok", note: "Şimdilik bilgi topluyorum", Icon: CalendarOff },
    ],
  },
];

const TOTAL = QUESTIONS.length + 1; // üç soru + form adımı

/* Vurgulu kelimeleri bulmak SplitWords'teki yöntemin aynısı: kelimenin kaynak
   dizedeki karakter konumu hesaplanıyor, değişken kapanışla taşınmıyor.
   Kopyalanmasının sebebi, SplitWords'ün whileInView ile BİR KEZ çalışması —
   burada metin her soruda değişiyor, yani her seferinde yeniden oynaması
   gerekiyor. */
function words(text: string, accent: string) {
  const list = text.split(" ");
  const start = text.indexOf(accent);
  const end = start >= 0 ? start + accent.length : -1;

  return list.map((word, index) => {
    const at = list.slice(0, index).reduce((sum, w) => sum + w.length + 1, 0);
    return { word, index, on: start >= 0 && at >= start && at < end };
  });
}

/* ============================================================== 1 · TUVAL */

function Stage() {
  const reduce = useReducedMotion();
  const uid = useId();
  const stageRef = useRef<HTMLElement>(null);
  /* once:false — ziyaretçi aşağı inip geri döndüğünde klavye yine çalışsın */
  const inView = useInView(stageRef, { amount: 0.35 });

  const [answers, setAnswers] = useState<Partial<Record<Slot, string>>>({});
  const [at, setAt] = useState(0);

  const question = at < QUESTIONS.length ? QUESTIONS[at] : null;
  const answered = QUESTIONS.filter((q) => answers[q.key]).length;

  /* Cevaptan sonra nereye gidileceği tek kuralla belirleniyor: ilk boş soru,
     yoksa form. Böylece ziyaretçi izdeki bir kelimeye basıp eski cevabını
     değiştirdiğinde baştan üç soru cevaplamıyor — doğrudan forma dönüyor. */
  const commit = useCallback(
    (slot: Slot, id: string) => {
      const next = { ...answers, [slot]: id };
      const open = QUESTIONS.findIndex((q) => !next[q.key]);
      setAnswers(next);
      setAt(open === -1 ? QUESTIONS.length : open);
    },
    [answers],
  );

  const reset = useCallback(() => {
    setAnswers({});
    setAt(0);
  }, []);

  /* Klavye. Üç koruma var ve üçü de gerekli: bölüm ekranda değilken sayfanın
     rakam tuşlarını yemesin, form alanına yazarken "3" seçim yapmasın,
     kısayol tuşları (⌘/Ctrl) ele geçirilmesin. */
  useEffect(() => {
    if (!inView) return;

    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "Backspace") {
        if (at > 0) {
          event.preventDefault();
          setAt(at - 1);
        }
        return;
      }

      if (!question) return;
      const index = Number(event.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < question.opts.length) {
        event.preventDefault();
        commit(question.key, question.opts[index].id);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, at, question, commit]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="i1-stage" ref={stageRef}>
        {/* Dev sıra numarası. Kartların hepsi opak olduğu için yalnızca boş
            alanlarda görünüyor — süs değil, "kaçıncı sorudasınız" işareti. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={question ? question.n : "04"}
            className="i1-ghost"
            aria-hidden="true"
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -20 }}
            transition={{ duration: reduce ? 0.15 : 0.5, ease: EASE }}
          >
            {question ? question.n : "04"}
          </motion.span>
        </AnimatePresence>

        <div className="container-o i1-stage-in">
          <h1 className="sr-only">İletişim</h1>

          {/* --- üst şerit: etiket, sayaç, ilerleme rayı --- */}
          <div className="i1-top">
            <span className="i1-eyebrow">
              <span className="i1-dot" aria-hidden="true" />
              İletişim
            </span>
            <span className="i1-count data">
              {question ? question.n : "04"} <i aria-hidden="true">/</i> 0{TOTAL}
            </span>
          </div>

          <div className="i1-rail" role="presentation">
            <motion.span
              className="i1-rail-fill"
              initial={false}
              animate={{ scaleX: answered / QUESTIONS.length }}
              transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
            />
          </div>

          {/* --- cevap izi: verilen her cevap tıklanabilir bir kelime --- */}
          <div className="i1-trail" aria-label="Verdiğiniz cevaplar">
            <AnimatePresence initial={false}>
              {QUESTIONS.map((q, index) => {
                const value = answers[q.key];
                if (!value) return null;
                const opt = q.opts.find((o) => o.id === value);
                if (!opt) return null;

                return (
                  <motion.button
                    key={q.key}
                    type="button"
                    layout={!reduce}
                    className="i1-chip"
                    data-on={at === index}
                    onClick={() => setAt(index)}
                    initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                    transition={{ duration: reduce ? 0.15 : 0.35, ease: EASE }}
                  >
                    <span className="i1-chip-n">{q.n}</span>
                    {opt.label}
                    <RotateCcw size={13} strokeWidth={2.1} aria-hidden="true" />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* --- gövde: her seferinde tek bir şey --- */}
          <div className="i1-body" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={question ? question.key : "form"}
                className="i1-panel"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                transition={{ duration: reduce ? 0.15 : 0.34, ease: EASE }}
              >
                {question ? (
                  <>
                    <h2 className="i1-ask">
                      <span className="sr-only">{question.ask}</span>
                      <span aria-hidden="true">
                        {words(question.ask, question.accent).map(({ word, index, on }) => (
                          <span className="i1-wclip" key={index}>
                            <motion.span
                              className={on ? "i1-w-on" : undefined}
                              initial={{ y: reduce ? "0%" : "108%", opacity: 0 }}
                              animate={{ y: "0%", opacity: 1 }}
                              transition={{
                                duration: reduce ? 0.2 : 0.55,
                                ease: EASE,
                                delay: reduce ? 0 : index * 0.038,
                              }}
                            >
                              {word}
                            </motion.span>
                          </span>
                        ))}
                      </span>
                    </h2>

                    <p className="i1-hint">{question.hint}</p>

                    <div className="i1-opts">
                      {question.opts.map((opt, index) => (
                        <motion.button
                          key={opt.id}
                          type="button"
                          className="i1-opt"
                          data-on={answers[question.key] === opt.id}
                          onClick={() => commit(question.key, opt.id)}
                          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reduce ? 0.2 : 0.5,
                            ease: EASE,
                            delay: reduce ? 0 : 0.14 + index * 0.06,
                          }}
                        >
                          <span className="i1-key" aria-hidden="true">
                            {index + 1}
                          </span>

                          {opt.country ? (
                            <span className="i1-disc" aria-hidden="true">
                              <Flag country={opt.country} />
                            </span>
                          ) : (
                            <span className="i1-disc i1-disc-ic" aria-hidden="true">
                              {opt.Icon ? <opt.Icon size={19} strokeWidth={1.9} /> : null}
                            </span>
                          )}

                          <span className="i1-opt-t">
                            <b>{opt.label}</b>
                            <i>{opt.note}</i>
                          </span>

                          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  <ContactForm uid={uid} reduce={!!reduce} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- alt şerit: geri, sıfırla, klavye --- */}
          <div className="i1-foot">
            <div className="i1-foot-l">
              <button
                type="button"
                className="i1-ghostbtn"
                onClick={() => setAt(at - 1)}
                disabled={at === 0}
              >
                <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
                Geri
              </button>
              {answered > 0 && (
                <button type="button" className="i1-ghostbtn" onClick={reset}>
                  <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                  Baştan al
                </button>
              )}
            </div>

            <p className="i1-keys">
              {question ? (
                <>
                  <kbd>1</kbd>
                  <kbd>2</kbd>
                  <kbd>3</kbd>
                  <kbd>4</kbd>
                  <span>ile seçin</span>
                </>
              ) : (
                <>
                  <CornerDownLeft size={13} strokeWidth={2} aria-hidden="true" />
                  <span>son adım</span>
                </>
              )}
              <em aria-hidden="true">·</em>
              <kbd>⌫</kbd>
              <span>geri</span>
            </p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ---------------------------------------------------------------- 04 · form
   SWAP:CONTACT_FORM — Alanlar gerçek, gönderim DEĞİL. Çalışan bir uç noktamız
   olmadığı için:
   · <form> onSubmit yalnızca varsayılanı iptal ediyor, hiçbir yere istek
     gitmiyor ve hiçbir "teşekkürler" ekranı açılmıyor;
   · gönder butonu disabled ve neden kapalı olduğu altında yazıyor;
   · çalışan tek çıkış AskCta (/basla).
   Uç nokta bağlandığında değişecek yer yalnızca burası: butonun disabled'ı
   kalkar, onSubmit gerçek isteği yapar, altındaki not silinir. Yerleşimin
   geri kalanı olduğu gibi kalır. */
function ContactForm({ uid, reduce }: { uid: string; reduce: boolean }) {
  const fields = [
    { id: `${uid}-ad`, label: "Ad Soyad", type: "text", ph: "Adınız ve soyadınız", ac: "name", wide: false },
    { id: `${uid}-mail`, label: "E-posta", type: "email", ph: "ornek@sirketiniz.com", ac: "email", wide: false },
    { id: `${uid}-tel`, label: "Telefon", type: "tel", ph: "İsteğe bağlı", ac: "tel", wide: false },
    { id: `${uid}-sirket`, label: "Şirket / marka", type: "text", ph: "İsteğe bağlı", ac: "organization", wide: false },
  ];

  return (
    <>
      <h2 className="i1-ask">
        <span className="sr-only">Son adım: size nasıl dönelim?</span>
        <span aria-hidden="true">
          {words("Son adım: size nasıl dönelim?", "nasıl dönelim?").map(
            ({ word, index, on }) => (
              <span className="i1-wclip" key={index}>
                <motion.span
                  className={on ? "i1-w-on" : undefined}
                  initial={{ y: reduce ? "0%" : "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: reduce ? 0.2 : 0.55,
                    ease: EASE,
                    delay: reduce ? 0 : index * 0.038,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ),
          )}
        </span>
      </h2>

      <p className="i1-hint">
        Yukarıdaki üç cevap konuşmanın başlangıç noktası. Mesai içinde isimli
        tek muhatabınız dönüş yapıyor; dosyanız bir havuza düşmüyor.
      </p>

      <form className="i1-form" noValidate onSubmit={(event) => event.preventDefault()}>
        <div className="i1-fgrid">
          {fields.map((f, index) => (
            <motion.div
              key={f.id}
              className="i1-field"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0.2 : 0.45,
                ease: EASE,
                delay: reduce ? 0 : 0.12 + index * 0.05,
              }}
            >
              <label htmlFor={f.id}>{f.label}</label>
              <input id={f.id} name={f.id} type={f.type} placeholder={f.ph} autoComplete={f.ac} />
            </motion.div>
          ))}

          <motion.div
            className="i1-field i1-field-wide"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.45, ease: EASE, delay: reduce ? 0 : 0.34 }}
          >
            <label htmlFor={`${uid}-mesaj`}>Eklemek istedikleriniz</label>
            <textarea
              id={`${uid}-mesaj`}
              name={`${uid}-mesaj`}
              rows={3}
              placeholder="İsteğe bağlı — durumunuzu birkaç cümleyle anlatın"
            />
          </motion.div>
        </div>

        <div className="i1-fbar">
          <button type="submit" className="i1-send" disabled>
            Gönder
            <Send size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          <AskCta tone="solid" label="Şimdi konuşmaya başlayın" href="/basla" />
        </div>

        <p className="i1-fnote">
          Form şu anda bağlı değil — gönderim uç noktası eklendiğinde açılacak.
          O zamana kadar yukarıdaki düğme çalışan tek yol.
        </p>
      </form>
    </>
  );
}

/* ===================================================== 2 · CEVAP KİMDEN GELİR
   Formun altındaki klasik "neden biz" kutucukları değil: ziyaretçi az önce bir
   şey yazdı ve tek merak ettiği şey karşı tarafta ne olduğu. Dördü de
   doğrulanmış — Dubai'de kendi ofis, Türkçe süreç, isimli tek muhatap,
   TaxDome paneli. Buraya doğrulanmamış hiçbir şey girmiyor. */

const WHO: { Icon: LucideIcon; t: string; d: string }[] = [
  {
    Icon: UserRound,
    t: "İsimli tek muhatap",
    d: "Dosyanız bir destek havuzuna düşmüyor. Baştan sona aynı kişiyle konuşuyorsunuz.",
  },
  {
    Icon: Languages,
    t: "Süreç Türkçe yürüyor",
    d: "Yazışma, evrak takibi ve görüşmeler Türkçe. Çeviriyle uğraşmıyorsunuz.",
  },
  {
    Icon: Building2,
    t: "Dubai'de kendi ofisimiz",
    d: "Aracı bir acente değiliz. Yerinde ekip, yerinde takip.",
  },
  {
    Icon: LayoutPanelLeft,
    t: "TaxDome müşteri paneli",
    d: "Evrak, onay ve durum tek panelde. Nerede kaldığını sormak zorunda değilsiniz.",
  },
];

function Who() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Yazdıktan sonra ne oluyor"
            accent="ne oluyor"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Mesai saatleri içinde doğrudan erişim. Karşınızda otomatik bir
              sıra numarası değil, adını bildiğiniz bir kişi var.
            </p>
          </FadeUp>
        </div>

        <div className="i1-who">
          {WHO.map((w, index) => (
            <FadeUp key={w.t} delay={0.1 + index * 0.07}>
              <article className="i1-who-c">
                <span className="i1-who-ic" aria-hidden="true">
                  <w.Icon size={19} strokeWidth={1.9} />
                </span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================================================== 3 · DOĞRUDAN HAT
   SWAP:CONTACT_INFO — Telefon, WhatsApp, e-posta ve ofis adresi DOĞRULANMADI.
   Uydurma numara yazmak tasarımı tamam gösterir ama ilk arayan kişide biter;
   bu yüzden değerlerin yerinde kesikli birer yuva duruyor. Bilgi geldiğinde
   yalnızca aşağıdaki dizinin `value` alanları dolar, yerleşim değişmez. */

type Line = { Icon: LucideIcon; k: string; note: string; badge?: string };

const LINES: Line[] = [
  { Icon: Phone, k: "Telefon", note: "Mesai içinde doğrudan" },
  { Icon: MessageSquare, k: "WhatsApp", note: "Yazılı takip için" },
  { Icon: AtSign, k: "E-posta", note: "Evrak ve resmî yazışma" },
  { Icon: MapPin, k: "Ofis", note: "Dubai", badge: "Kendi ofisimiz" },
];

function Lines() {
  return (
    <section className="sec-pad sec-night">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text="Form değil, doğrudan hat"
            accent="doğrudan hat"
            className="h2"
            style={{ color: "#ffffff" }}
            accentColor="#78b0f5"
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">
              Soru sormak için sıra beklemek gerekmiyor. Mesai saatleri içinde
              bu kanallardan doğrudan ulaşırsınız.
            </p>
          </FadeUp>
        </div>

        <div className="i1-lines">
          {LINES.map((l, index) => (
            <FadeUp key={l.k} delay={0.1 + index * 0.06}>
              <div className="i1-line">
                <span className="i1-line-ic" aria-hidden="true">
                  <l.Icon size={18} strokeWidth={1.9} />
                </span>
                <span className="i1-line-t">
                  <b>
                    {l.k}
                    {l.badge && <em>{l.badge}</em>}
                  </b>
                  <i>{l.note}</i>
                </span>
                {/* yer tutucu yuva — içi bilerek boş */}
                <span className="i1-slot">
                  <span className="sr-only">{l.k} bilgisi </span>eklenecek
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.34}>
          <p className="i1-lines-note">
            Numara, e-posta ve ofis adresi bilgileri eklendiğinde bu yuvalar
            dolacak. Doğrulanmamış bilgi yazmıyoruz.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ==================================================== 4 · YAZMADAN ÖNCE
   STANCE_LIMITS aynen brand.ts'ten geliyor. İletişim sayfasında durması
   tesadüf değil: beklenti tam burada kuruluyor. "Banka onayı garantisi"
   bekleyen biri yazmadan önce görsün ki ikinci mesaj hayal kırıklığı
   olmasın. */

function Limits() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Yazmadan önce bunları bilin"
            accent="bunları bilin"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Söz veremeyeceğimiz üç şey var ve bunları görüşme başlamadan
              yazıyoruz.
            </p>
          </FadeUp>
        </div>

        <div className="i1-lim">
          {STANCE_LIMITS.map((s, index) => (
            <FadeUp key={s.title} delay={0.1 + index * 0.08}>
              <article className="i1-lim-c">
                <span className="i1-lim-ic" aria-hidden="true">
                  <ShieldCheck size={17} strokeWidth={1.9} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.34}>
          <div className="i1-lim-foot">
            <AskCta label="Sorunuzu şimdi sorun" href="/basla" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* =========================================================== sayfa gövdesi */

export default function ContactI1() {
  return (
    <>
      <Stage />
      <Who />
      <Lines />
      <Limits />
    </>
  );
}
