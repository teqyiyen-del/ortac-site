"use client";

/* ============================================================================
   ADAY I4 — İLETİŞİM SAYFASI · "KLASİK"
   CSS: src/app/css/lab-i4.css · ad alanı .i4-

   NEDEN BU TASARIM
   Önceki üç aday (I1 tek soru, I2 masa, I3 santral) şablonun dışına çıkmak
   üzerine kuruluydu ve müşterinin itirazı tam da buydu: fikir iyi ama ziyaretçi
   sayfayı açtığında ne yapacağını ANLAMAK zorunda kalıyor. İletişim sayfası
   anlaşılmayı bekleyemez — insanlar oraya bir şey ARAMAYA gelir, keşfetmeye
   değil. Bu yüzden I4 bilerek tanıdık: solda iletişim kanalları düz bir liste,
   sağda form, üstte bir cümlelik yönlendirme. Bilmece yok, tam ekran tek soru
   yok, klavye kısayolu gerektiren mekanik yok.

   "Sıradan görünmesin" işi düzenden değil ritimden çıkıyor: bölüm kabuğu,
   tipografi ölçekleri ve boşluklar sitenin geri kalanıyla birebir aynı
   (.sec-pad, .container-o, .sec-head, .h2, --space-head). Yani sayfa tanıdık
   ama yabancı değil; şablon indirilmiş gibi durmuyor.

   ÖNCEKİ ADAYLARDAN NE ALINDI, NE ATILDI
   ALINDI · kanal listesi (I1/I2/I3'te de vardı) — ama tek bir yerde, düz ve
     eşit ağırlıkta. Sıralama iddiası (I3) ve masa eşleştirmesi (I2) atıldı.
   ALINDI · formun alanları (I1) — ama tam alan seti tek ekranda duruyor,
     adım adım kurulmuyor.
   ALINDI · yer tutucu disiplini (üçünde de) — uydurma numara yok.
   ATILDI · ülke başına canlı saat panosu (I2/I3). Müşteri açıkça söyledi:
     her ülkede ayrı bir muhatabımız yok. Üç ayrı saat göstermek olmayan bir
     organizasyon şemasını ima ediyordu.
   ATILDI · hizmet başına ayrı muhatap / "şu masaya düşer" yönlendirmesi (I2).
     Firmada böyle bir yapı yok; göstermek yanlış bilgi olurdu.

   ELİMİZDE OLMAYAN İKİ ŞEY, İKİSİ DE GİZLENMİYOR
   · SWAP:CONTACT_INFO — telefon, WhatsApp, e-posta, ofis adresi ve panel
     adresi doğrulanmadı. Değerler boş; satırlar yer tutucu yuvayla çıkıyor ve
     TIKLANAMIYOR. Bilgi geldiğinde tek yapılacak şey aşağıdaki CHANNELS
     dizisinin value/href alanlarını doldurmak — satır kendiliğinden bağlantıya
     dönüyor, tasarımda tek satır oynamıyor.
   · SWAP:CONTACT_FORM — çalışan bir gönderim ucumuz yok. Buton devre dışı ve
     altında nedeni yazıyor. Sahte "mesajınız iletildi" ekranı YOK: gerçekten
     yazan birinin mesajını sessizce kaybetmek, kapalı bir butondan çok daha
     pahalıya patlar.
   ========================================================================= */

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  CircleAlert,
  Globe,
  Languages,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import SplitWords from "@/components/shared/SplitWords";
import { STANCE_LIMITS } from "@/lib/brand";
import { COUNTRY_SLUGS, servicesFor, type ServiceSlug } from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* projedeki tek yumuşama eğrisi (--ease-out-quint'in JS karşılığı) */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ========================================================== 1 · KANALLAR ===
   SWAP:CONTACT_INFO — hiçbir değer doğrulanmadı, hiçbiri uydurulmadı.
   `value` doluysa satır <a> olarak çıkıyor ve `href` kullanılıyor; boşsa aynı
   içerik tıklanamaz bir kutu olarak çıkıyor. İki ayrı JSX ağacı yazmamanın
   sebebi bakım: metin tek yerde duruyor, birinde değişip diğerinde
   unutulamıyor.

   Not satırları doğrulanmış olanla sınırlı: Dubai'de kendi ofisimiz var,
   süreç Türkçe yürüyor, TaxDome müşteri paneli kullanılıyor, mesai içinde
   doğrudan erişim var. Yanıt SÜRESİ hiçbir satırda yazmıyor — öyle bir
   taahhüdümüz yok (brand.ts · STANCE_LIMITS). */

type Channel = {
  key: string;
  Icon: LucideIcon;
  label: string;
  note: string;
  /** SWAP:CONTACT_INFO — dolunca satır tıklanabilir hâle geliyor */
  value: string;
  /** tel: · mailto: · https: — value ile birlikte doluyor */
  href: string;
};

const CHANNELS: Channel[] = [
  {
    key: "telefon",
    Icon: Phone,
    label: "Telefon",
    note: "Mesai içinde doğrudan muhatabınıza bağlanır.",
    value: "",
    href: "",
  },
  {
    key: "whatsapp",
    Icon: MessageCircle,
    label: "WhatsApp",
    note: "Kısa sorular ve belge teyidi için en hızlı kanal.",
    value: "",
    href: "",
  },
  {
    key: "eposta",
    Icon: Mail,
    label: "E-posta",
    note: "Ek belge, sözleşme ve resmî yazışma buradan yürür.",
    value: "",
    href: "",
  },
  {
    key: "ofis",
    Icon: MapPin,
    label: "Dubai ofisi",
    note: "Aracı bir ofis değil, kendi ofisimiz. Randevuyla ziyaret edilebilir.",
    value: "",
    href: "",
  },
  {
    key: "panel",
    Icon: LayoutDashboard,
    label: "TaxDome müşteri paneli",
    note: "Zaten müşterimizseniz: evrak, imza ve durum aynı panelde.",
    value: "",
    href: "",
  },
];

/* Kanalların altındaki üç satır. Hepsi doğrulanmış ve hepsi İLKE — kişi adı,
   ekip şeması ya da süre sözü içermiyor. */
const FACTS: { Icon: LucideIcon; t: string; d: string }[] = [
  {
    Icon: UserRound,
    t: "İsimli tek muhatap",
    d: "Dosyanız havuza düşmüyor; süreç boyunca aynı kişiyle konuşuyorsunuz.",
  },
  {
    Icon: Languages,
    t: "Süreç Türkçe yürüyor",
    d: "Yazışma, evrak takibi ve görüşmeler Türkçe.",
  },
  {
    Icon: Globe,
    t: "Üç ülkede operasyon",
    d: "Dubai, İngiltere ve KKTC — hepsi aynı ekipte.",
  },
];

/* ============================================================= 2 · FORM ===
   Hizmet ve ülke listeleri ELLE YAZILMIYOR. Ülke seçiliyse o ülkenin gerçek
   hizmet listesi (services.ts), seçili değilse üç ülkenin birleşimi. Vize
   İngiltere'de tanımlı olmadığı için orada listede de çıkmıyor; liste
   değişirse form kendiliğinden doğru kalıyor. */

type CountryChoice = Country | "bilmiyorum" | "";

function serviceOptions(choice: CountryChoice): { slug: ServiceSlug; title: string }[] {
  const all =
    choice === "" || choice === "bilmiyorum"
      ? COUNTRY_SLUGS.flatMap((c) => servicesFor(c))
      : servicesFor(choice);

  /* Birleşimde aynı slug birden çok ülkeden gelebiliyor; ilk gelen başlık
     kalıyor (uyum başlığı ülkeye göre değişiyor, ülke seçilince zaten o
     ülkenin başlığına dönüyor). */
  const out: { slug: ServiceSlug; title: string }[] = [];
  for (const s of all) {
    if (!out.some((o) => o.slug === s.slug)) out.push({ slug: s.slug, title: s.title });
  }
  return out;
}

type FormState = {
  ad: string;
  eposta: string;
  telefon: string;
  ulke: CountryChoice;
  hizmet: ServiceSlug | "";
  mesaj: string;
};

type FieldKey = keyof FormState;

const EMPTY: FormState = {
  ad: "",
  eposta: "",
  telefon: "",
  ulke: "",
  hizmet: "",
  mesaj: "",
};

/* Tarayıcının kendi doğrulaması gönderime bağlı; buton kapalı olduğu için hiç
   çalışmayacaktı. Bu yüzden kural seti burada duruyor: alan dokunulduğu anda
   hatası görünür oluyor ve role="alert" ile ekran okuyucuya bildiriliyor.
   Amaç formu zorlaştırmak değil, hata YOLUNUN gerçekten kurulu olması —
   gönderim ucu bağlandığında bu kısım olduğu gibi çalışmaya devam ediyor. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function errorsOf(f: FormState): Partial<Record<FieldKey, string>> {
  const e: Partial<Record<FieldKey, string>> = {};
  if (!f.ad.trim()) e.ad = "Adınızı ve soyadınızı yazın.";
  if (!f.eposta.trim()) e.eposta = "E-posta adresinizi yazın.";
  else if (!EMAIL.test(f.eposta.trim())) e.eposta = "E-posta adresi geçerli görünmüyor.";
  if (!f.ulke) e.ulke = "Bir ülke seçin; emin değilseniz “Henüz karar vermedim”.";
  if (!f.hizmet) e.hizmet = "İlgilendiğiniz hizmeti seçin.";
  if (f.mesaj.trim().length < 10) e.mesaj = "Kısaca ne sormak istediğinizi yazın.";
  return e;
}

/* Form ayrı bileşen: her tuş vuruşunda durum değişiyor ve bunun soldaki kanal
   listesini yeniden çizmesi için hiçbir sebep yok. */
function ContactForm() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  const options = useMemo(() => serviceOptions(form.ulke), [form.ulke]);
  const errors = errorsOf(form);

  function put<K extends FieldKey>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  /* Ülke değişince seçili hizmet yeni listede yoksa düşüyor: ekranda listede
     bulunmayan bir hizmetin seçili görünmesi, formun yalan söylemesi olurdu. */
  function pickCountry(next: CountryChoice) {
    setForm((prev) => {
      const keep = serviceOptions(next).some((o) => o.slug === prev.hizmet);
      return { ...prev, ulke: next, hizmet: keep ? prev.hizmet : "" };
    });
  }

  const touch = (key: FieldKey) => setTouched((prev) => ({ ...prev, [key]: true }));

  /** alan başına ortak kablolama: hata görünür mü, hangi id'ye bağlı */
  function wire(key: FieldKey) {
    const message = errors[key];
    const show = Boolean(message && touched[key]);
    const errId = `${uid}-${key}-err`;
    return {
      show,
      message,
      errId,
      fieldProps: {
        id: `${uid}-${key}`,
        name: key,
        onBlur: () => touch(key),
        "aria-invalid": show || undefined,
        "aria-describedby": show ? errId : undefined,
      },
    };
  }

  const ad = wire("ad");
  const eposta = wire("eposta");
  const telefon = wire("telefon");
  const ulke = wire("ulke");
  const hizmet = wire("hizmet");
  const mesaj = wire("mesaj");

  const noteId = `${uid}-note`;

  return (
    <div className="i4-card">
      <div className="i4-card-head">
        <h2 className="i4-card-t" id={`${uid}-title`}>
          Mesaj bırakın
        </h2>
        <p className="i4-card-n">
          Hizmet ve ülkeyi işaretlemeniz ilk cevabı hızlandırıyor: dosyanızı
          açmadan önce neye baktığımızı biliyoruz.
        </p>
      </div>

      {/* SWAP:CONTACT_FORM — action ve gerçek onSubmit YOK. Varsayılan
          gönderim iptal ediliyor ki Enter'a basan biri sayfayı yeniden
          yüklemesin; hiçbir yere istek gitmiyor, hiçbir onay ekranı
          açılmıyor. */}
      <form
        className="i4-form"
        noValidate
        aria-labelledby={`${uid}-title`}
        aria-describedby={noteId}
        onSubmit={(event) => event.preventDefault()}
      >
        <p className="i4-req-note">
          <span aria-hidden="true">*</span> işaretli alanlar zorunlu.
        </p>

        <div className="i4-fields">
          {/* ---- ad soyad ---- */}
          <div className="i4-field" data-err={ad.show || undefined}>
            <label className="i4-label" htmlFor={ad.fieldProps.id}>
              Ad soyad <b className="i4-req" aria-hidden="true">*</b>
            </label>
            <input
              {...ad.fieldProps}
              className="i4-input"
              type="text"
              required
              autoComplete="name"
              placeholder="Adınız ve soyadınız"
              value={form.ad}
              onChange={(e) => put("ad", e.target.value)}
            />
            <Err show={ad.show} message={ad.message} errId={ad.errId} reduce={Boolean(reduce)} />
          </div>

          {/* ---- e-posta ---- */}
          <div className="i4-field" data-err={eposta.show || undefined}>
            <label className="i4-label" htmlFor={eposta.fieldProps.id}>
              E-posta <b className="i4-req" aria-hidden="true">*</b>
            </label>
            <input
              {...eposta.fieldProps}
              className="i4-input"
              type="email"
              required
              autoComplete="email"
              placeholder="ornek@sirketiniz.com"
              value={form.eposta}
              onChange={(e) => put("eposta", e.target.value)}
            />
            <Err
              show={eposta.show}
              message={eposta.message}
              errId={eposta.errId}
              reduce={Boolean(reduce)}
            />
          </div>

          {/* ---- telefon (isteğe bağlı) ---- */}
          <div className="i4-field">
            <label className="i4-label" htmlFor={telefon.fieldProps.id}>
              Telefon <i className="i4-opt">isteğe bağlı</i>
            </label>
            <input
              {...telefon.fieldProps}
              className="i4-input"
              type="tel"
              autoComplete="tel"
              placeholder="+90 …"
              value={form.telefon}
              onChange={(e) => put("telefon", e.target.value)}
            />
          </div>

          {/* ---- ülke ---- */}
          <div className="i4-field" data-err={ulke.show || undefined}>
            <label className="i4-label" htmlFor={ulke.fieldProps.id}>
              Ülke <b className="i4-req" aria-hidden="true">*</b>
            </label>
            <span className="i4-sel">
              <select
                {...ulke.fieldProps}
                className="i4-input"
                required
                value={form.ulke}
                onChange={(e) => pickCountry(e.target.value as CountryChoice)}
              >
                <option value="">Seçiniz</option>
                {COUNTRY_SLUGS.map((c) => (
                  <option key={c} value={c}>
                    {COUNTRY_LABELS[c]}
                  </option>
                ))}
                <option value="bilmiyorum">Henüz karar vermedim</option>
              </select>
              <ChevronDown size={16} strokeWidth={2.1} aria-hidden="true" />
            </span>
            <Err show={ulke.show} message={ulke.message} errId={ulke.errId} reduce={Boolean(reduce)} />
          </div>

          {/* ---- hizmet ---- */}
          <div className="i4-field" data-wide="" data-err={hizmet.show || undefined}>
            <label className="i4-label" htmlFor={hizmet.fieldProps.id}>
              İlgilendiğiniz hizmet <b className="i4-req" aria-hidden="true">*</b>
            </label>
            <span className="i4-sel">
              <select
                {...hizmet.fieldProps}
                className="i4-input"
                required
                value={form.hizmet}
                /* yardım satırı her zaman bağlı, hata varsa önüne ekleniyor */
                aria-describedby={
                  hizmet.show ? `${hizmet.errId} ${uid}-hizmet-help` : `${uid}-hizmet-help`
                }
                onChange={(e) => put("hizmet", e.target.value as ServiceSlug | "")}
              >
                <option value="">Seçiniz</option>
                {options.map((o) => (
                  <option key={o.slug} value={o.slug}>
                    {o.title}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} strokeWidth={2.1} aria-hidden="true" />
            </span>
            <p className="i4-help" id={`${uid}-hizmet-help`}>
              {form.ulke === "" || form.ulke === "bilmiyorum"
                ? "Ülke seçtiğinizde liste o ülkede gerçekten verdiğimiz hizmetlere iniyor."
                : `${COUNTRY_LABELS[form.ulke]} için verdiğimiz hizmetler.`}
            </p>
            <Err
              show={hizmet.show}
              message={hizmet.message}
              errId={hizmet.errId}
              reduce={Boolean(reduce)}
            />
          </div>

          {/* ---- mesaj ---- */}
          <div className="i4-field" data-wide="" data-err={mesaj.show || undefined}>
            <label className="i4-label" htmlFor={mesaj.fieldProps.id}>
              Mesajınız <b className="i4-req" aria-hidden="true">*</b>
            </label>
            <textarea
              {...mesaj.fieldProps}
              className="i4-input i4-area"
              rows={5}
              required
              placeholder="Ne yapmak istediğinizi, bugün hangi aşamada olduğunuzu ve varsa şirketinizin durumunu birkaç cümleyle yazın."
              value={form.mesaj}
              onChange={(e) => put("mesaj", e.target.value)}
            />
            <Err
              show={mesaj.show}
              message={mesaj.message}
              errId={mesaj.errId}
              reduce={Boolean(reduce)}
            />
          </div>
        </div>

        <div className="i4-foot">
          {/* Buton geçerlilikten bağımsız olarak KAPALI: sebep formun eksik
              olması değil, gönderim ucunun olmaması. */}
          <button type="submit" className="i4-send" disabled aria-describedby={noteId}>
            <Lock size={15} strokeWidth={2.1} aria-hidden="true" />
            Gönder
          </button>
          <AskCta label="Sorunuzu buradan iletin" />
        </div>

        <p className="i4-fnote" id={noteId}>
          Form şu anda bağlı değil: gönderim uç noktası eklenmediği için buton
          kapalı ve yazdıklarınız hiçbir yere iletilmiyor. Bugün çalışan yol
          yandaki bağlantı ya da soldaki kanallar.
        </p>
      </form>
    </div>
  );
}

/** Hata satırı. role="alert" ile ekran okuyucu, ikon + renk ile gören
 *  kullanıcı aynı anda haberdar oluyor (renk tek başına taşıyıcı değil). */
function Err({
  show,
  message,
  errId,
  reduce,
}: {
  show: boolean;
  message?: string;
  errId: string;
  reduce: boolean;
}) {
  if (!show || !message) return null;
  return (
    <motion.p
      className="i4-err"
      id={errId}
      role="alert"
      initial={{ opacity: 0, y: reduce ? 0 : -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
    >
      <CircleAlert size={14} strokeWidth={2.2} aria-hidden="true" />
      {message}
    </motion.p>
  );
}

/* ======================================================== sayfa gövdesi === */

export default function ContactI4() {
  return (
    <>
      {/* ==================================================================
          1 · BAŞLIK + İKİ SÜTUN — solda kanallar, sağda form.
          ================================================================== */}
      <section className="sec-pad" style={{ background: "var(--white)" }}>
        <div className="container-o">
          <div className="sec-head">
            <FadeUp>
              <span className="tag i4-eyebrow">İletişim</span>
            </FadeUp>
            <SplitWords
              as="h1"
              text="Bize ulaşın."
              accent="ulaşın."
              className="i4-h1"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Solda doğrudan ulaşabileceğiniz kanallar, sağda form. Hangisini
                seçerseniz seçin aynı ekibe geliyor — ayrı ülke masaları ya da
                karşılama santrali yok.
              </p>
            </FadeUp>
          </div>

          <div className="i4-grid">
            {/* ---------------------------------------------- sol: kanallar */}
            <div className="i4-side">
              <h2 className="i4-side-t">İletişim bilgileri</h2>

              <ul className="i4-chs">
                {CHANNELS.map((ch, index) => {
                  const Icon = ch.Icon;
                  const live = ch.value !== "" && ch.href !== "";

                  const body = (
                    <>
                      <span className="i4-ch-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span className="i4-ch-b">
                        <b className="i4-ch-l">{ch.label}</b>
                        <span className="i4-ch-v">
                          {live ? (
                            ch.value
                          ) : (
                            /* SWAP:CONTACT_INFO — uydurma numara yerine
                               görünür bir boşluk. */
                            <span className="i4-slot">
                              <span className="sr-only">
                                {ch.label} bilgisi henüz eklenmedi:{" "}
                              </span>
                              eklenecek
                            </span>
                          )}
                        </span>
                        <span className="i4-ch-n">{ch.note}</span>
                      </span>
                    </>
                  );

                  return (
                    <li key={ch.key}>
                      <FadeUp delay={0.05 * index}>
                        {live ? (
                          <SmartLink href={ch.href} className="i4-ch" data-live="">
                            {body}
                          </SmartLink>
                        ) : (
                          <div className="i4-ch">{body}</div>
                        )}
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>

              <FadeUp delay={0.1}>
                <p className="i4-swap-note">
                  Numara, e-posta, adres ve panel bilgisi eklendiğinde bu
                  satırlar dolacak ve tıklanabilir olacak. Doğrulanmamış bilgi
                  yazmıyoruz.
                </p>
              </FadeUp>

              <FadeUp delay={0.14}>
                <ul className="i4-facts">
                  {FACTS.map((f) => {
                    const Icon = f.Icon;
                    return (
                      <li className="i4-fact" key={f.t}>
                        <span className="i4-fact-ic" aria-hidden="true">
                          <Icon size={16} strokeWidth={1.9} />
                        </span>
                        <span className="i4-fact-b">
                          <b>{f.t}</b>
                          <i>{f.d}</i>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </FadeUp>
            </div>

            {/* -------------------------------------------------- sağ: form */}
            <FadeUp delay={0.08} className="i4-formcol">
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2 · YAZMADAN ÖNCE — brand.ts'teki duruş, aynen.
          Beklenti burada kuruluyor: "banka onayı garantisi" bekleyen biri
          yazmadan önce görsün ki ikinci mesaj hayal kırıklığı olmasın.
          ================================================================== */}
      <section className="sec-pad" style={{ background: "var(--paper)" }}>
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

          <div className="i4-lim">
            {STANCE_LIMITS.map((s, index) => (
              <FadeUp key={s.title} delay={0.08 * index}>
                <article className="i4-lim-c">
                  <span className="i4-lim-ic" aria-hidden="true">
                    <ShieldCheck size={17} strokeWidth={1.9} />
                  </span>
                  <h3 className="i4-lim-t">{s.title}</h3>
                  <p className="i4-lim-l">{s.line}</p>
                </article>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.28}>
            <div className="i4-end">
              <p className="i4-end-t">
                Kendi durumunuzun bu çerçevede nereye düştüğünü sormak için
                formu doldurmanız gerekmiyor.
              </p>
              <AskCta tone="line" label="Sorunuzu şimdi sorun" />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
