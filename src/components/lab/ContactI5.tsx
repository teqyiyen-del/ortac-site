"use client";

import { useMemo, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  AtSign,
  Check,
  Clock3,
  Compass,
  Languages,
  LayoutPanelLeft,
  Lock,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Send,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { STANCE_LIMITS } from "@/lib/brand";
import { COUNTRY_SLUGS, serviceFor, servicesFor } from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* ADAY I5 (.i5-) — İLETİŞİM SAYFASI · KLASİK · "ÖNCE FORM, SONRA KANALLAR"
 *
 * ---------------------------------------------------------------------------
 * NEDEN BÖYLE
 *
 * Önceki üç aday sayfayı bir mekanizmaya çevirmişti: tek soru akışı, masa
 * seçimi, santral rayı. Fikir olarak ayaktalar ama ziyaretçinin bir iletişim
 * sayfasından beklediği şey öğrenilecek bir arayüz değil. Bu aday tam tersini
 * yapıyor: sayfa açıldığı anda ne olduğu belli olsun. Üstte form, altta
 * iletişim bilgileri. Bilmece yok, tam ekran tek soru yok, klavye kısayolu
 * gerektiren hiçbir mekanik yok.
 *
 * Sıralama tesadüf değil. İletişim sayfasına gelenlerin çoğu yazmaya geliyor,
 * arayanlar zaten numarayı arıyor ve numara sayfanın altında da bulunur —
 * ama forma inmek için kaydırmak gerekirse form doldurulmaz. O yüzden form
 * yukarıda, kanallar altında ve başlıkta ikisinin de nerede olduğu yazıyor.
 *
 * ---------------------------------------------------------------------------
 * FORM İKİ ADIM, İKİSİ DE AYNI ANDA EKRANDA
 *
 * "Adım" burada gizleme değil gruplama: 1) konu (ülke + hizmet), 2) kişi
 * (ad, e-posta, telefon, mesaj). Hiçbir alan saklanmıyor, kimse "devam"
 * tuşuna basmak zorunda değil — ama başlıkta kaç zorunlu alan kaldığı ve
 * hangi adımın tamamlandığı görünüyor. Uzun formu korkutucu yapan şey
 * uzunluk değil, nerede bittiğinin belirsizliği.
 *
 * ---------------------------------------------------------------------------
 * LİSTELER ELLE YAZILMADI
 *
 * Ülkeler COUNTRY_SLUGS + COUNTRY_LABELS'tan, hizmetler servicesFor()'dan
 * türüyor. Bunun somut karşılığı: İngiltere seçilince "Vize ve oturum"
 * listeden kendiliğinden düşüyor, çünkü services.ts o ülkede o hizmeti
 * üretmiyor. Yarın bir ülkeye yeni bir hizmet eklendiğinde bu form da
 * kendiliğinden doğru kalıyor. Elle yazılmış bir liste bunu yapamaz, üstelik
 * sessizce yalan söylemeye başlar.
 *
 * ---------------------------------------------------------------------------
 * ÇIKARILANLAR — bilerek yok
 *
 * · Ülke başına canlı saat panosu YOK. Üç ülkede ayrı ayrı masada oturan üç
 *   ekip yok; üç saat göstermek olmayan bir yapıyı ima ederdi.
 * · Hizmet başına ayrı muhatap/kişi gösterimi YOK. "Bu not şu masaya düşer"
 *   cümlesi de yok. Doğru olan şey tek: isimli tek muhatap ilkesi. İsim
 *   siteye değil dosyaya bağlanır, o yüzden isim de yazılmadı.
 *
 * ---------------------------------------------------------------------------
 * ELİMİZDE OLMAYAN
 *
 * · SWAP:CONTACT_INFO — telefon, WhatsApp, e-posta, ofis adresi ve panel
 *   adresi doğrulanmadı. Hiçbiri uydurulmadı: kanal satırlarının değer
 *   alanları boş yuva olarak çiziliyor. Değerler tek bir diziden okunuyor
 *   (CHANNELS), bilgi gelince yalnızca orası doluyor.
 * · SWAP:CONTACT_FORM — çalışan gönderim ucu yok. Gönder butonu devre dışı,
 *   onSubmit yalnızca varsayılanı iptal ediyor ve sahte bir "mesajınız
 *   iletildi" ekranı BİLEREK yazılmadı: gerçekten yazan birinin mesajını
 *   sessizce kaybetmek, çalışmayan bir formdan çok daha pahalıya patlar.
 * · Doğrulanmış ve kullanılan iddia kümesi: Dubai'de kendi ofisimiz, süreç
 *   Türkçe, isimli tek muhatap ilkesi, mesai içinde doğrudan erişim, TaxDome
 *   paneli, üç ülkede operasyon. Süre ve banka onayı sözü yok (STANCE_LIMITS).
 */

/* projedeki tek yumuşama eğrisi (--ease-out-quint'in JS karşılığı) */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ----------------------------------------------------------------- SEÇİMLER */

/** "" = henüz seçilmedi · "belirsiz" = ziyaretçi karar vermemiş */
type UlkeValue = "" | "belirsiz" | Country;

const COUNTRY_OPTIONS: { value: UlkeValue; label: string; country: Country | null }[] = [
  ...COUNTRY_SLUGS.map((c) => ({ value: c as UlkeValue, label: COUNTRY_LABELS[c], country: c })),
  /* Dördüncü seçenek bir ülke değil ama gerçek bir cevap: "hangisi bana uyar"
     sorusuyla gelen ziyaretçiyi yanlış bir kutuya işaret koymaya zorlamıyoruz.
     Karşılığı da var — seçilince hizmet listesi üç ülkenin birleşimine açılıyor. */
  { value: "belirsiz", label: "Henüz karar vermedim", country: null },
];

/** Bir ülke seçiliyse o ülkenin hizmetleri, değilse üç ülkenin birleşimi.
 *  Sıra services.ts'in sırası; başlık çakışırsa son ülkenin (jenerik) yazımı
 *  kalıyor — birleşik listede "Uyum (AML / goAML)" gibi ülkeye özgü bir
 *  başlığın durması yanlış olurdu. */
function serviceOptionsFor(u: UlkeValue) {
  const list: Country[] = COUNTRY_SLUGS.includes(u as Country) ? [u as Country] : COUNTRY_SLUGS;
  const map = new Map<string, string>();
  for (const c of list) {
    for (const s of servicesFor(c)) map.set(s.slug, s.title);
  }
  return Array.from(map, ([slug, title]) => ({ slug, title }));
}

/** Üç ülkenin birleşimi — düşen seçimin adını yazabilmek için. */
const ALL_SERVICES = serviceOptionsFor("");

/* -------------------------------------------------------------- DOĞRULAMA */

type FieldKey = "ulke" | "hizmet" | "ad" | "eposta" | "telefon" | "mesaj";
type Values = Record<FieldKey, string>;

const EMPTY: Values = { ulke: "", hizmet: "", ad: "", eposta: "", telefon: "", mesaj: "" };

/* Zorunlu alanlar tek yerde: hem sayaç hem ray hem adım rozetleri buradan
   besleniyor, yani "kaç alan kaldı" ile ekranda kırmızı görünen alan sayısı
   asla ayrışmıyor. */
const REQUIRED: FieldKey[] = ["ulke", "hizmet", "ad", "eposta", "mesaj"];
const STEP_1: FieldKey[] = ["ulke", "hizmet"];
const STEP_2: FieldKey[] = ["ad", "eposta", "mesaj"];

/* Kasten gevşek: amaç adresin gerçek olduğunu kanıtlamak değil, "@" unutan
   ziyaretçiyi kendi yazım hatasından kurtarmak. Sıkı bir regex geçerli
   adresleri de reddeder ve kimse formu ikinci kez denemez. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function errorOf(k: FieldKey, v: Values): string | null {
  const t = v[k].trim();
  switch (k) {
    case "ulke":
      return t ? null : "Bir ülke işaretleyin — karar vermediyseniz son seçenek de geçerli bir cevap.";
    case "hizmet":
      return t ? null : "Listeden bir konu seçin.";
    case "ad":
      return t.length >= 2 ? null : "Adınızı ve soyadınızı yazın.";
    case "eposta":
      if (!t) return "E-posta adresinizi yazın.";
      return EMAIL_RE.test(t) ? null : "Adres eksik görünüyor — ornek@sirketiniz.com gibi olmalı.";
    case "mesaj":
      return t.length >= 10 ? null : "Birkaç cümleyle ne hakkında yazdığınızı ekleyin.";
    default:
      return null; /* telefon isteğe bağlı */
  }
}

/* ------------------------------------------------------------- ALAN KABUĞU
   Etiket, zorunluluk işareti, ipucu ve hata satırı tek yerde. Erişilebilirlik
   burada gerçekten kuruluyor: her alanın <label htmlFor>'u var, zorunluluk
   yalnızca yıldızla değil ekran okuyucunun okuyacağı bir metinle de
   işaretleniyor ve hata çıktığında role="alert" ile duyuruluyor. */

function FieldShell({
  id,
  label,
  required,
  optional,
  hint,
  error,
  wide,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string | null;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="i5-field" data-wide={wide ? "" : undefined} data-bad={error ? "" : undefined}>
      <label className="i5-label" htmlFor={id}>
        {label}
        {required ? (
          <>
            <b className="i5-req" aria-hidden="true">
              *
            </b>
            <span className="sr-only"> (zorunlu)</span>
          </>
        ) : null}
        {optional ? <i>isteğe bağlı</i> : null}
      </label>

      {children}

      {hint && !error ? (
        <p className="i5-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="i5-err" id={`${id}-err`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ============================================ 1 · BAŞLIK + FORM (önde) === */

function FormSection() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  /* Ülke değişince düşen hizmet seçimini sessizce yutmuyoruz: ne olduğunu
     yazıyoruz, yoksa ziyaretçi seçimini kendi sildi sanır. */
  const [dropped, setDropped] = useState<string | null>(null);

  const reduce = useReducedMotion();
  const lenis = useLenis();

  const options = useMemo(() => serviceOptionsFor(values.ulke as UlkeValue), [values.ulke]);

  /* Seçilen hizmetin services.ts'teki kendi tanımı. Uydurulmuş bir "şunu
     yapıyoruz" cümlesi değil, hizmet sayfasının kullandığı satırın aynısı.
     Süre ve fiyat bilerek gösterilmiyor: form doldururken verilen bir süre
     bilgisi taahhüt gibi okunur (STANCE_LIMITS). */
  const active = useMemo(() => {
    if (!values.hizmet || values.hizmet === "belirsiz") return null;
    if (COUNTRY_SLUGS.includes(values.ulke as Country)) {
      return serviceFor(values.ulke as Country, values.hizmet) ?? null;
    }
    for (const c of COUNTRY_SLUGS) {
      const s = serviceFor(c, values.hizmet);
      if (s) return s;
    }
    return null;
  }, [values.ulke, values.hizmet]);

  const set = (k: FieldKey, val: string) => setValues((p) => ({ ...p, [k]: val }));
  const blur = (k: FieldKey) => setTouched((p) => ({ ...p, [k]: true }));
  /* Hata yalnızca alandan çıkıldıktan sonra görünüyor: ilk harfte kırmızıya
     dönen bir form, doldurmaya çalışan kişiyi azarlıyor demektir. */
  const shown = (k: FieldKey) => (touched[k] ? errorOf(k, values) : null);

  const missing = REQUIRED.filter((k) => errorOf(k, values) !== null).length;
  const done1 = STEP_1.every((k) => errorOf(k, values) === null);
  const done2 = STEP_2.every((k) => errorOf(k, values) === null);

  function pickCountry(next: UlkeValue) {
    const list = serviceOptionsFor(next);
    const keep =
      !values.hizmet ||
      values.hizmet === "belirsiz" ||
      list.some((o) => o.slug === values.hizmet);

    if (keep) {
      setDropped(null);
    } else {
      const gone = ALL_SERVICES.find((o) => o.slug === values.hizmet)?.title ?? "Seçtiğiniz konu";
      const where = COUNTRY_SLUGS.includes(next as Country)
        ? COUNTRY_LABELS[next as Country]
        : "bu seçim";
      setDropped(`${gone} — ${where} listesinde yok, konu seçiminiz temizlendi.`);
    }

    setValues((p) => ({ ...p, ulke: next, hizmet: keep ? p.hizmet : "" }));
    setTouched((p) => ({ ...p, ulke: true }));
  }

  /* Lenis kaydırmayı devraldığı için tarayıcının kendi atlaması onun
     konumuyla çakışıyor; sitedeki kalıbın aynısı. Bağlantı yine gerçek bir
     <a href="#…">, yani JavaScript çalışmasa da hedefe gidiyor. */
  function jump(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("i5-kanallar");
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: reduce ? 0 : 1.05 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  const ulkeErr = shown("ulke");
  const hizmetErr = shown("hizmet");
  const hizmetHint = active
    ? active.line
    : values.hizmet === "belirsiz"
      ? "Konuyu ilk görüşmede birlikte netleştiriyoruz."
      : "Ülke seçerseniz liste o ülkede yürüttüğümüz hizmetlere daralır.";

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        {/* --- sayfa başlığı: ne nerede, tek cümlede --- */}
        <div className="i5-head">
          <FadeUp>
            <span className="tag i5-eyebrow">
              <span className="i5-eyebrow-dot" aria-hidden="true" />
              İletişim
            </span>
          </FadeUp>

          <SplitWords
            as="h1"
            text="Bize yazın"
            accent="yazın"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />

          <FadeUp delay={0.16}>
            <p className="sec-lead">
              Aşağıdaki formu doldurun: hangi ülke, hangi konu ve size nasıl
              döneceğimiz. Telefon, WhatsApp, e-posta ve ofis bilgilerimiz
              sayfanın alt kısmında açıkça duruyor.
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <a className="i5-jump" href="#i5-kanallar" onClick={jump}>
              <ArrowDown size={15} strokeWidth={2.1} aria-hidden="true" />
              Form yerine doğrudan ulaşmak istiyorum
            </a>
          </FadeUp>
        </div>

        {/* ------------------------------------------------------------------
            SWAP:CONTACT_FORM — alanlar gerçek, gönderim değil.
            onSubmit yalnızca varsayılanı iptal ediyor (metin alanında Enter'a
            basılırsa sayfa yenilenmesin diye), buton devre dışı ve altında
            neden kapalı olduğu tek satırla yazıyor. Uç nokta bağlandığında
            değişecek yerler: butonun disabled'ı, onSubmit'in gövdesi ve o tek
            satır. Yerleşimde hiçbir şey oynamıyor.
            ------------------------------------------------------------------ */}
        <FadeUp delay={0.1}>
          <form
            className="i5-form"
            noValidate
            aria-describedby="i5-form-note"
            onSubmit={(event) => event.preventDefault()}
          >
            {/* --- form başlığı: iki adım ve kaç alan kaldığı --- */}
            <div className="i5-form-head">
              <ol className="i5-steps">
                <li className="i5-step" data-done={done1 ? "" : undefined}>
                  <span className="i5-step-n" aria-hidden="true">
                    {done1 ? <Check size={13} strokeWidth={2.6} /> : "1"}
                  </span>
                  <span className="i5-step-t">
                    Konu
                    <i>Ülke ve hizmet</i>
                  </span>
                  <span className="sr-only">{done1 ? " — tamamlandı" : " — eksik"}</span>
                </li>
                <li className="i5-step" data-done={done2 ? "" : undefined}>
                  <span className="i5-step-n" aria-hidden="true">
                    {done2 ? <Check size={13} strokeWidth={2.6} /> : "2"}
                  </span>
                  <span className="i5-step-t">
                    Bilgileriniz
                    <i>Size nasıl dönelim</i>
                  </span>
                  <span className="sr-only">{done2 ? " — tamamlandı" : " — eksik"}</span>
                </li>
              </ol>

              {/* Sayaçta aria-live YOK ve bu bilinçli: değer yazarken
                  değiştiği için canlı bölge her karakterde ekran okuyucuyu
                  keserdi. Eksik alanın kendisi zaten role="alert" ile
                  duyuruluyor. */}
              <p className="i5-left data">
                {missing === 0 ? "Zorunlu alanların hepsi dolu" : `${missing} zorunlu alan kaldı`}
              </p>
            </div>

            <div className="i5-rail" role="presentation">
              <motion.span
                className="i5-rail-fill"
                initial={false}
                animate={{ scaleX: (REQUIRED.length - missing) / REQUIRED.length }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              />
            </div>

            {/* ================= ADIM 1 · KONU ================= */}
            <fieldset className="i5-block">
              <legend className="i5-legend">
                <b aria-hidden="true">1</b>
                Hangi konuda yazıyorsunuz?
              </legend>

              {/* Ülke — radyo grubu. Etiketler COUNTRY_LABELS'tan geliyor. */}
              <fieldset
                className="i5-rg"
                role="radiogroup"
                aria-required="true"
                aria-invalid={ulkeErr ? true : undefined}
                aria-describedby={ulkeErr ? "i5-ulke-err" : undefined}
              >
                <legend className="i5-label i5-label-legend">
                  Hangi ülke?
                  <b className="i5-req" aria-hidden="true">
                    *
                  </b>
                  <span className="sr-only"> (zorunlu)</span>
                </legend>

                <div className="i5-radios">
                  {COUNTRY_OPTIONS.map((o) => (
                    <label
                      key={o.value}
                      className="i5-radio"
                      data-on={values.ulke === o.value ? "" : undefined}
                    >
                      <input
                        type="radio"
                        name="ulke"
                        value={o.value}
                        checked={values.ulke === o.value}
                        onChange={() => pickCountry(o.value)}
                        onBlur={() => blur("ulke")}
                      />
                      <span className="i5-radio-ic" aria-hidden="true">
                        {o.country ? <Flag country={o.country} /> : <Compass size={17} strokeWidth={1.9} />}
                      </span>
                      <span className="i5-radio-t">{o.label}</span>
                    </label>
                  ))}
                </div>

                {ulkeErr ? (
                  <p className="i5-err" id="i5-ulke-err" role="alert">
                    {ulkeErr}
                  </p>
                ) : null}
              </fieldset>

              {/* Hizmet — servicesFor()'dan türüyor, elle yazılmıyor. */}
              <div className="i5-grid i5-grid-one">
                <FieldShell
                  id="i5-hizmet"
                  label="İlgilendiğiniz hizmet"
                  required
                  hint={hizmetHint}
                  error={hizmetErr}
                >
                  <select
                    className="i5-input i5-select"
                    id="i5-hizmet"
                    name="hizmet"
                    value={values.hizmet}
                    aria-required="true"
                    aria-invalid={hizmetErr ? true : undefined}
                    aria-describedby={hizmetErr ? "i5-hizmet-err" : "i5-hizmet-hint"}
                    onChange={(event) => {
                      set("hizmet", event.target.value);
                      setDropped(null);
                    }}
                    onBlur={() => blur("hizmet")}
                  >
                    <option value="">Seçiniz…</option>
                    {options.map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {o.title}
                      </option>
                    ))}
                    <option value="belirsiz">Emin değilim / birden fazla konu</option>
                  </select>
                </FieldShell>
              </div>

              {dropped ? (
                <p className="i5-drop" role="status">
                  <Minus size={14} strokeWidth={2.4} aria-hidden="true" />
                  {dropped}
                </p>
              ) : null}
            </fieldset>

            {/* ================= ADIM 2 · BİLGİLERİNİZ ================= */}
            <fieldset className="i5-block">
              <legend className="i5-legend">
                <b aria-hidden="true">2</b>
                Size nasıl dönelim?
              </legend>

              <div className="i5-grid">
                <FieldShell id="i5-ad" label="Ad Soyad" required error={shown("ad")}>
                  <input
                    className="i5-input"
                    id="i5-ad"
                    name="ad"
                    type="text"
                    autoComplete="name"
                    placeholder="Adınız ve soyadınız"
                    value={values.ad}
                    aria-required="true"
                    aria-invalid={shown("ad") ? true : undefined}
                    aria-describedby={shown("ad") ? "i5-ad-err" : undefined}
                    onChange={(event) => set("ad", event.target.value)}
                    onBlur={() => blur("ad")}
                  />
                </FieldShell>

                <FieldShell id="i5-eposta" label="E-posta" required error={shown("eposta")}>
                  <input
                    className="i5-input"
                    id="i5-eposta"
                    name="eposta"
                    type="email"
                    autoComplete="email"
                    placeholder="ornek@sirketiniz.com"
                    value={values.eposta}
                    aria-required="true"
                    aria-invalid={shown("eposta") ? true : undefined}
                    aria-describedby={shown("eposta") ? "i5-eposta-err" : undefined}
                    onChange={(event) => set("eposta", event.target.value)}
                    onBlur={() => blur("eposta")}
                  />
                </FieldShell>

                <FieldShell
                  id="i5-telefon"
                  label="Telefon"
                  optional
                  hint="Yazmak yerine konuşmayı tercih ederseniz."
                >
                  <input
                    className="i5-input"
                    id="i5-telefon"
                    name="telefon"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+90 …"
                    value={values.telefon}
                    aria-describedby="i5-telefon-hint"
                    onChange={(event) => set("telefon", event.target.value)}
                    onBlur={() => blur("telefon")}
                  />
                </FieldShell>

                <FieldShell
                  id="i5-mesaj"
                  label="Mesajınız"
                  required
                  wide
                  hint="Faaliyetiniz, hedef pazarınız, tahsilat kanalınız — aklınızda ne varsa. Ne kadar yazarsanız ilk dönüş o kadar isabetli olur."
                  error={shown("mesaj")}
                >
                  <textarea
                    className="i5-input i5-area"
                    id="i5-mesaj"
                    name="mesaj"
                    rows={5}
                    placeholder="Durumunuzu birkaç cümleyle anlatın."
                    value={values.mesaj}
                    aria-required="true"
                    aria-invalid={shown("mesaj") ? true : undefined}
                    aria-describedby={shown("mesaj") ? "i5-mesaj-err" : "i5-mesaj-hint"}
                    onChange={(event) => set("mesaj", event.target.value)}
                    onBlur={() => blur("mesaj")}
                  />
                </FieldShell>
              </div>
            </fieldset>

            {/* --- gönderim: kapalı ve kapalı olduğunu söylüyor --- */}
            <div className="i5-foot">
              <div className="i5-foot-l">
                <button type="submit" className="i5-send" disabled>
                  Gönder
                  <Send size={16} strokeWidth={2} aria-hidden="true" />
                </button>
                <span className="i5-lock">
                  <Lock size={12} strokeWidth={2.4} aria-hidden="true" />
                  gönderim kapalı
                </span>
              </div>
              <AskCta label="Sorunuzu şimdi sorun" href="/basla" />
            </div>

            <p className="i5-note" id="i5-form-note">
              Form henüz bir yere bağlı değil: gönderim uç noktası eklenene kadar
              bu buton çalışmıyor ve yazdıklarınız hiçbir yere kaydedilmiyor.
            </p>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

/* ================================================ 2 · İLETİŞİM KANALLARI ===
   SWAP:CONTACT_INFO — beş kanalın da değeri DOĞRULANMADI. Uydurma numara
   yazmak tasarımı tamam gösterir ama ilk arayan kişide biter; bu yüzden
   değerin yerinde boş bir yuva duruyor. Bilgi geldiğinde yalnızca aşağıdaki
   dizinin `value` (ve varsa `href`) alanları doluyor, yerleşim değişmiyor. */

type Channel = {
  Icon: LucideIcon;
  k: string;
  note: string;
  badge?: string;
  value: string | null;
  href: string | null;
};

const CHANNELS: Channel[] = [
  { Icon: Phone, k: "Telefon", note: "Mesai saatleri içinde doğrudan hat", value: null, href: null },
  { Icon: MessageCircle, k: "WhatsApp", note: "Kısa sorular ve yazılı takip", value: null, href: null },
  { Icon: AtSign, k: "E-posta", note: "Evrak ve resmî yazışma", value: null, href: null },
  {
    Icon: MapPin,
    k: "Ofis",
    note: "Dubai — aracı acente değiliz, yerinde ekip",
    badge: "Kendi ofisimiz",
    value: null,
    href: null,
  },
  {
    Icon: LayoutPanelLeft,
    k: "Müşteri paneli",
    note: "TaxDome — mevcut müşteriler için evrak, onay ve durum",
    value: null,
    href: null,
  },
];

function Channels() {
  return (
    <section
      className="sec-pad"
      id="i5-kanallar"
      style={{ background: "var(--white)", scrollMarginTop: 70 }}
    >
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Doğrudan ulaşmak isterseniz"
            accent="Doğrudan"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Form tek yol değil. Aşağıdaki kanalların hepsi aynı ekibe çıkıyor;
              hangisinden yazarsanız yazın dosyanız aynı yerde açılıyor.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <ul className="i5-chs">
            {CHANNELS.map((c) => (
              <li className="i5-ch" key={c.k}>
                <span className="i5-ch-ic" aria-hidden="true">
                  <c.Icon size={18} strokeWidth={1.9} />
                </span>

                <span className="i5-ch-t">
                  <b>
                    {c.k}
                    {c.badge ? <em>{c.badge}</em> : null}
                  </b>
                  <i>{c.note}</i>
                </span>

                {/* Değer geldiğinde tıklanabilir; gelene kadar yuva boş ve
                    tıklanamaz. İki hâl de aynı satırda yaşıyor. */}
                {c.value ? (
                  c.href ? (
                    <a className="i5-ch-v" href={c.href}>
                      {c.value}
                    </a>
                  ) : (
                    <span className="i5-ch-v">{c.value}</span>
                  )
                ) : (
                  <span className="i5-ch-slot">
                    <span className="sr-only">{c.k} bilgisi </span>eklenecek
                  </span>
                )}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.24}>
          <p className="i5-chs-note">
            Numara, e-posta, ofis adresi ve panel adresi doğrulandığında bu
            yuvalar dolacak. Doğrulanmamış iletişim bilgisi yazmıyoruz.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ==================================== 3 · NE BEKLEYEBİLİRSİNİZ / VEREMEYİZ
   Soldaki dördü doğrulanmış, sağdaki üçü brand.ts'teki STANCE_LIMITS. İkisini
   yan yana koymanın sebebi: iletişim sayfası beklentinin kurulduğu yer.
   "Banka onayı garantisi" bekleyen biri bunu yazmadan önce görsün ki ikinci
   mesaj hayal kırıklığı olmasın. */

const CAN: { Icon: LucideIcon; t: string; d: string }[] = [
  {
    Icon: UserRound,
    t: "İsimli tek muhatap",
    d: "Dosyanız bir destek havuzuna düşmüyor; baştan sona aynı kişiyle konuşuyorsunuz.",
  },
  {
    Icon: Languages,
    t: "Süreç Türkçe yürüyor",
    d: "Yazışma, evrak takibi ve görüşmeler Türkçe. Çeviriyle uğraşmıyorsunuz.",
  },
  {
    Icon: Clock3,
    t: "Mesai içinde doğrudan erişim",
    d: "Sıra numarası ve çağrı merkezi yok. Mesai saatleri içinde doğrudan ulaşırsınız.",
  },
  {
    Icon: LayoutPanelLeft,
    t: "TaxDome müşteri paneli",
    d: "Evrak, onay ve durum tek panelde. Nerede kaldığını sormak zorunda değilsiniz.",
  },
];

function Closing() {
  return (
    <section className="sec-pad sec-night">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text="Ne bekleyebilirsiniz, ne bekleyemezsiniz"
            accent="ne bekleyemezsiniz"
            className="h2"
            style={{ color: "#ffffff" }}
            accentColor="#78b0f5"
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">
              Soldakiler bugün geçerli. Sağdaki üçünü söz veremiyoruz ve bunu
              yazışma başlamadan önce yazıyoruz.
            </p>
          </FadeUp>
        </div>

        <div className="i5-two">
          <FadeUp delay={0.08} className="i5-col">
            <h3 className="i5-col-h">Bunlar bugün geçerli</h3>
            <ul className="i5-list">
              {CAN.map((c) => (
                <li className="i5-item" key={c.t}>
                  <span className="i5-item-ic" aria-hidden="true">
                    <c.Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span className="i5-item-t">
                    <b>{c.t}</b>
                    <i>{c.d}</i>
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.16} className="i5-col">
            <h3 className="i5-col-h">Bunların sözünü vermiyoruz</h3>
            <ul className="i5-list">
              {STANCE_LIMITS.map((s) => (
                <li className="i5-item" data-limit="" key={s.title}>
                  <span className="i5-item-ic" aria-hidden="true">
                    <Minus size={17} strokeWidth={2.2} />
                  </span>
                  <span className="i5-item-t">
                    <b>{s.title}</b>
                    <i>{s.line}</i>
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        <FadeUp delay={0.28}>
          <div className="i5-close-foot">
            <p>Formu doldurmadan da sorabilirsiniz — tek soruluk mesajlar da geçerli.</p>
            <AskCta tone="solid" label="Sorunuzu şimdi sorun" href="/basla" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* =========================================================== sayfa gövdesi */

export default function ContactI5() {
  return (
    <MotionConfig reducedMotion="user">
      <FormSection />
      <Channels />
      <Closing />
    </MotionConfig>
  );
}
