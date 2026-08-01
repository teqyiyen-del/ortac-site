"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Clock3,
  FolderLock,
  Languages,
  Lock,
  Mail,
  MessageSquareText,
  PenLine,
  Phone,
  UserRound,
} from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { Flag } from "@/components/shared/CountryPicker";
import type { Country } from "@/lib/store";

/* ADAY I3 (.i3-) — İLETİŞİM SAYFASI · "SANTRAL"
 *
 * ---------------------------------------------------------------------------
 * SORU NE
 *
 * İletişim sayfasına gelen kişinin kafasındaki cümle "adresiniz nedir" değil.
 * İki şey soruyor: **ne kadar sürede dönerler** ve **hangi kanaldan yazayım**.
 * Standart şablon (form + harita + telefon) bu ikisinin hiçbirini
 * cevaplamıyor; üç kanalı yan yana eşit ağırlıkta diziyor ve seçimi
 * ziyaretçiye bırakıyor. Ziyaretçi de en kolayını seçiyor, yani genelde
 * yanlış olanını: dosya kurgusu gerektiren bir soruyu WhatsApp'tan tek satır
 * yazıyor, sonra iki gün mesajlaşarak aynı yere geliyor.
 *
 * Bu aday o iki soruyu sayfanın omurgası yapıyor.
 *
 * ---------------------------------------------------------------------------
 * 1) KANAL SIRALAMASI EŞİT DEĞİL — İŞE GÖRE
 *
 * Dört kanal alt alta, numaralı, tek bir rayda. Sıra prestije göre değil işe
 * göre: en çok karşılaşılan iş (anlatılacak birden çok şey var) en üstte,
 * en dar iş (belge gidip gelecek) en altta. Her satırın altında TEK cümlelik
 * bir "bunun için doğru" var, gerektiğinde bir de "bunun için değil".
 *
 * Yan yana dizmek yerine alt alta dizmenin sebebi ölçü: yatay dizilimde her
 * kanal en fazla bir ikon + bir kelime taşıyabiliyor, o zaman da hangisinin
 * ne işe yaradığı yazılamıyor. Dikey rayda her satır 100 pikselden geniş bir
 * hedef ve içine bir cümle sığıyor. "Az öğe, büyük hedef" burada estetik
 * tercih değil, kanal seçimini mümkün kılan şeyin ta kendisi.
 *
 * ---------------------------------------------------------------------------
 * 2) HIZ SORUSUNA YANIT SÜRESİ VAAT ETMEDEN CEVAP
 *
 * "2 saat içinde dönüyoruz" rozetini basmak en kolay yoldu ve yasak: elimizde
 * öyle bir taahhüt yok, olmayan bir sözü sayfaya yazamayız (bkz. brand.ts ·
 * STANCE_LIMITS — süre taahhüdü vermiyoruz).
 *
 * Yerine kanıtlanabilir olan şey konuyor: **şu anda orada mıyız**. Sağ üstteki
 * konsol Dubai'nin yerel saatini canlı gösteriyor ve mesai içinde olup
 * olmadığımızı söylüyor. Ziyaretçi "ne kadar sürer" sorusunun cevabını
 * kendisi kuruyor — sabah 10'da yazan biriyle gece 3'te yazan biri aynı şeyi
 * beklemiyor. Vaat yok, durum var.
 *
 * Aynı dürüstlük son bölümde açıkça yazıyor: süre taahhüdü vermiyoruz,
 * mesai içinde doğrudan erişim var. Dördüncü kart bunu gizlemek yerine
 * diğer üç güvenle aynı boyda basıyor.
 *
 * ---------------------------------------------------------------------------
 * 3) FORM ÜÇ ALAN, VE BİR CÜMLE KURUYOR
 *
 * Uzun form doldurtmak hız iddiasıyla çelişir. Buradaki brief iki seçim + üç
 * alan. Seçimler yaptıkça üstteki büyük cümle canlı yeniden yazılıyor
 * ("Dubai için şirket kuruluşu konusunda yazıyorum") — ziyaretçi ne
 * göndereceğini formu bitirmeden görüyor. Geri bildirim anlık, yani sayfanın
 * hız iddiası tipografide kalmıyor, elin altında hissediliyor.
 *
 * ---------------------------------------------------------------------------
 * NE UYDURULMADI
 *
 * · SWAP:CONTACT_INFO — telefon, WhatsApp, e-posta, panel adresi ve çalışma
 *   saatleri DOĞRULANMADI. Numara/adres yazılmadı; kanal satırları "bilgi
 *   bekleniyor" rozetiyle çıkıyor ve tıklanamıyor. Konsoldaki 09:00–18:00 da
 *   yer tutucu ve rozetli — mesai hesabı o yer tutucudan türüyor, bilgi
 *   gelince tek sabit (OFFICE) değişiyor, başka hiçbir yere dokunulmuyor.
 * · SWAP:CONTACT_FORM — gönderim ucu yok. Alanlar <fieldset disabled> içinde,
 *   buton devre dışı, onSubmit/action yok. "Mesajınız iletildi" ekranı
 *   BİLEREK yok; form gönderdiğini iddia etmiyor. Çalışan çıkış AskCta.
 * · Doğrulanmış ve kullanılan tek iddia kümesi: Dubai'de kendi ofisimiz,
 *   Türkçe süreç, isimli tek muhatap, mesai içinde doğrudan erişim, TaxDome
 *   paneli, üç ülkede operasyon.
 */

/* ------------------------------------------------------------------ KONSOL */

/* SWAP:CONTACT_INFO — çalışma saatleri doğrulanmadı. Mesai içinde/dışında
   hesabının tamamı bu sabitten türüyor; gerçek saatler gelince yalnızca
   burası değişiyor. Gün indeksleri JS'in kendi sırası (0 Pazar). */
const OFFICE = {
  tz: "Asia/Dubai",
  openMin: 9 * 60,
  closeMin: 18 * 60,
  days: [1, 2, 3, 4, 5],
  hoursLabel: "09:00 – 18:00",
  daysLabel: "Pazartesi – Cuma",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Zone = { h: number; m: number; s: number; wd: number };

/** Bir saat diliminde o anki saat/dakika/saniye ve haftanın günü. */
function readZone(tz: string, at: Date): Zone {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    h: Number(get("hour")),
    m: Number(get("minute")),
    s: Number(get("second")),
    wd: WEEKDAYS.indexOf(get("weekday")),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ KANALLAR */

type Channel = {
  n: string;
  icon: LucideIcon;
  title: string;
  /** ne için doğru — tek cümle, kanalın varlık sebebi */
  job: string;
  /** ne için değil — yalnızca gerçekten bir sınır varsa */
  not?: string;
  /** kanalın biçimi. Yanıt süresi DEĞİL: taahhüt değil tarif. */
  form: string;
  /** çalışan çıkış; yoksa satır SWAP:CONTACT_INFO rozetiyle sönük çıkıyor */
  href?: string;
  cta?: string;
};

/* Sıra bilinçli: yukarıdan aşağı iş daralıyor. En üstteki satır sayfanın
   kendi formuna iniyor — yani "hangi kanal" sorusunun varsayılan cevabı
   sayfanın içinde duruyor, ziyaretçiyi başka bir uygulamaya göndermeden. */
const CHANNELS: Channel[] = [
  {
    n: "01",
    icon: PenLine,
    title: "Aşağıdaki brief",
    job: "Anlatacak birden çok şey varsa. Ülke, konu ve durumunuz tek seferde bize ulaşır; ilk cevabı yazarken elimizde tablo olur.",
    form: "tek seferde",
    href: "#i3-brief",
    cta: "Brief'e in",
  },
  {
    n: "02",
    icon: MessageSquareText,
    title: "WhatsApp",
    job: "Tek soruluk işler. Belge fotoğrafı, kısa teyit, \"bu evrak yeterli mi\".",
    not: "Dosya kurgusu bu kanaldan çıkmaz — yazışma uzayınca brief'e dönüyoruz.",
    form: "anlık yazışma",
  },
  {
    n: "03",
    icon: Phone,
    title: "Telefon",
    job: "Yazarak on dakika sürecek bir durumu iki dakikada anlatmak için.",
    not: "Mesai dışında hat açık değil; konsoldaki saate bakın.",
    form: "sesli · mesai içinde",
  },
  {
    n: "04",
    icon: Mail,
    title: "E-posta",
    job: "Ek belge, sözleşme, resmî yazışma — iz bırakması gereken her şey.",
    form: "yazılı iz",
  },
];

/* --------------------------------------------------------------- BRIEF VERİSİ */

/* Ülke seçimi zorunlu değil: karar vermemiş olmak da bir durum ve cümle onu
   da kurabiliyor. Boş bırakılan bir seçim, yanlış doldurulan bir seçimden
   iyidir — brief'in tamamı bu ilkeye göre kısa. */
type Pick = { c: Country | null; label: string };

const PICKS: Pick[] = [
  { c: "dubai", label: "Dubai" },
  { c: "ingiltere", label: "İngiltere" },
  { c: "kktc", label: "KKTC" },
  { c: null, label: "Karar vermedim" },
];

/* `chip` düğmede, `inline` cümlenin içinde geçiyor. İkisi ayrı olmasaydı ya
   cümle "Muhasebe & Vergi konusunda yazıyorum" diye tuhaf akardı ya da
   düğmeler cümle parçası gibi görünürdü. */
const TOPICS: { key: string; chip: string; inline: string }[] = [
  { key: "kurulus", chip: "Şirket kuruluşu", inline: "şirket kuruluşu" },
  { key: "muhasebe", chip: "Muhasebe & vergi", inline: "muhasebe ve vergi" },
  { key: "banka", chip: "Banka & ödeme", inline: "banka ve ödeme" },
  { key: "vize", chip: "Oturum & vize", inline: "oturum ve vize" },
  { key: "uyum", chip: "Uyum & AML", inline: "uyum ve AML" },
  { key: "secim", chip: "Hangisi bana uygun?", inline: "hangi yapının bana uygun olduğu" },
];

/* ------------------------------------------------------------------- SONRASI */

/* Dördüncü kart diğer üçüyle aynı boyda ve aynı yerde. Sınırı dipnota
   almak, sınırı gizlemenin kibar hâli olurdu. */
const AFTER: { icon: LucideIcon; t: string; l: string }[] = [
  {
    icon: UserRound,
    t: "İsimli tek muhatap",
    l: "Dosya elden ele geçmiyor. İlk mesajda kim yazıyorsa süreç boyunca o kalıyor.",
  },
  {
    icon: Languages,
    t: "Süreç Türkçe yürüyor",
    l: "Yazışma, evrak takibi ve görüşmeler Türkçe. Tercüme bekleyen bir aşama yok.",
  },
  {
    icon: Building2,
    t: "Dubai'de kendi ofisimiz",
    l: "Aracı bir masa değil. İş, başından sonuna kendi ekibimizde kalıyor.",
  },
  {
    icon: Clock3,
    t: "Süre taahhüdü vermiyoruz",
    l: "Mesai içinde doğrudan erişim var. Sabit bir dönüş süresi vaat etmiyoruz — veremeyeceğimiz sözü de vermiyoruz.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ========================================================================= */

export default function ContactI3() {
  const reduce = useReducedMotion();

  /* Saat sunucuda okunamaz: SSR'da üretilen değer istemcinin ilk render'ıyla
     kaçınılmaz olarak farklı olur ve hidrasyon uyuşmazlığı verir. Bağlanana
     kadar konsolda "--:--" duruyor ve hiçbir ölçü kaymıyor. */
  const [zone, setZone] = useState<Zone | null>(null);

  /* Hareket kapalıyken saniye basamağı hiç basılmıyor ve okuma 30 saniyede
     bire düşüyor. Saniyede bir değişen rakam da harekettir; kullanıcı
     hareketi kapattıysa ekranda sürekli kıpırdayan bir şey bırakmıyoruz. */
  const live = !reduce;

  useEffect(() => {
    const read = () => {
      try {
        setZone(readZone(OFFICE.tz, new Date()));
      } catch {
        /* Bilinmeyen saat dilimi adında Intl fırlatabiliyor. Konsol saatsiz
           de ayakta kalsın diye sayfayı düşürmüyoruz. */
      }
    };
    read();
    const id = window.setInterval(read, live ? 1000 : 30_000);
    return () => window.clearInterval(id);
  }, [live]);

  const minutes = zone ? zone.h * 60 + zone.m : null;
  const open =
    zone !== null &&
    minutes !== null &&
    OFFICE.days.includes(zone.wd) &&
    minutes >= OFFICE.openMin &&
    minutes < OFFICE.closeMin;

  /* Brief'in iki seçimi. Varsayılanlar cümlenin ilk hâlini kuruyor; boş bir
     cümle göstermek yerine en sık gelen durumu gösteriyoruz. */
  const [pick, setPick] = useState<Pick>(PICKS[0]);
  const [topic, setTopic] = useState(TOPICS[0]);

  return (
    <>
      {/* ==================================================================
          1 · SANTRAL — başlık, canlı konsol, kanal rayı
          ================================================================== */}
      <section className="sec-pad sec-night i3-hero">
        {/* Zemindeki dikey çizgiler bir pano/santral yüzeyi kuruyor. Tonlar
            opak: #0e0e0e siyahın üstünde ancak seçilecek kadar açık, alfa
            kullanılmadığı için hiçbir katmanla karışmıyor. */}
        <div className="i3-panelbg" aria-hidden="true" />

        <div className="container-o i3-hero-in">
          <div className="i3-top">
            <div className="i3-top-copy">
              <FadeUp>
                <span className="tag i3-eyebrow">İletişim</span>
              </FadeUp>

              <SplitWords
                as="h1"
                text="Santral yok. Sıra numarası yok."
                accent="Sıra numarası yok."
                accentColor="#5c9eeb"
                className="i3-h1"
                base={0.05}
              />

              <FadeUp delay={0.24}>
                <p className="i3-lead">
                  Dört kanal var ve eşit değiller. Her birinin altında ne için doğru
                  olduğu yazıyor — yanlış kapıyı çalıp sırada beklemeyin.
                </p>
              </FadeUp>
            </div>

            {/* ---------------- canlı konsol ----------------
                "Ne kadar sürede dönersiniz" sorusunun taahhüt vermeyen
                cevabı: şu anda orada mıyız. */}
            <FadeUp delay={0.3} className="i3-console-wrap">
              <div className="i3-console">
                <div className="i3-console-top">
                  <span className="tag i3-console-label">Dubai ofisi · yerel saat</span>
                  <span className="i3-blip" data-on={zone ? "" : undefined} aria-hidden="true" />
                </div>

                {/* Ekran okuyucu için saat bir kez, sessizce. aria-live YOK:
                    saniyede bir konuşan bir saat sayfayı kullanılmaz yapardı. */}
                <p className="data i3-clock">
                  {zone ? `${pad(zone.h)}:${pad(zone.m)}` : "--:--"}
                  {live && zone ? <i className="i3-clock-s">:{pad(zone.s)}</i> : null}
                </p>

                <p className="i3-status" data-open={zone ? String(open) : undefined}>
                  <span className="i3-status-dot" aria-hidden="true" />
                  {zone === null
                    ? "Saat okunuyor"
                    : open
                      ? "Şu an mesai içinde"
                      : "Şu an mesai dışı"}
                </p>

                <p className="i3-console-line">
                  {zone !== null && !open
                    ? "Şimdi yazın; mesai açıldığında sıradaki ilk iş olur."
                    : "Mesai içinde doğrudan erişim — arada karşılama masası yok."}
                </p>

                <div className="i3-console-foot">
                  <span>
                    {OFFICE.daysLabel}
                    <b>{OFFICE.hoursLabel}</b>
                  </span>
                  {/* SWAP:CONTACT_INFO */}
                  <span className="i3-swap" data-swap="CONTACT_INFO">
                    bilgi bekleniyor
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ---------------- kanal rayı ---------------- */}
          <ul className="i3-rail">
            {CHANNELS.map((ch, i) => {
              const Icon = ch.icon;

              /* Satırın içi tek yerde kuruluyor; dışı bağlantı mı ölü kutu mu
                 olduğuna göre değişiyor. İki ayrı JSX ağacı yazmak, ileride
                 birinde metin değişip diğerinde unutulması demekti. */
              const body = (
                <>
                  <span className="i3-row-n data" aria-hidden="true">
                    {ch.n}
                  </span>

                  <span className="i3-row-ic" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.9} />
                  </span>

                  <span className="i3-row-b">
                    <b className="i3-row-t">{ch.title}</b>
                    <span className="i3-row-j">{ch.job}</span>
                    {ch.not ? <span className="i3-row-x">{ch.not}</span> : null}
                  </span>

                  <span className="i3-row-tail">
                    <span className="tag i3-row-f">{ch.form}</span>
                    {ch.href ? (
                      <span className="i3-row-go">
                        {ch.cta}
                        <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                    ) : (
                      /* SWAP:CONTACT_INFO — numara/adres doğrulanmadı.
                         Yer tutucu bir numara basmaktansa satır açıkça
                         eksik duruyor: tıklanamıyor ve rozet sebebini
                         söylüyor. */
                      <span className="i3-swap" data-swap="CONTACT_INFO">
                        bilgi bekleniyor
                      </span>
                    )}
                  </span>
                </>
              );

              return (
                <motion.li
                  key={ch.n}
                  className="i3-rail-i"
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{
                    duration: reduce ? 0 : 0.42,
                    delay: reduce ? 0 : 0.06 * i,
                    ease: EASE,
                  }}
                >
                  {ch.href ? (
                    <SmartLink href={ch.href} className="i3-row" data-live="">
                      {body}
                    </SmartLink>
                  ) : (
                    <div className="i3-row">{body}</div>
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* ---------------- mevcut müşteri şeridi ----------------
              Rayın dışında ve başka bir dilde: bu satır yeni gelen için
              değil. Ayrı durmazsa beş eşit kanal olur ve sıralama iddiası
              çöker. */}
          <FadeUp delay={0.1}>
            <div className="i3-client">
              <span className="i3-client-ic" aria-hidden="true">
                <FolderLock size={18} strokeWidth={1.9} />
              </span>
              <p className="i3-client-t">
                <b>Zaten müşterimizseniz</b>
                Dosyanız, belgeleriniz ve muhatabınız TaxDome panelinde. Yeni bir
                kanal açmayın — oradan yazdığınızda mesaj doğrudan dosyanıza düşüyor.
              </p>
              {/* SWAP:CONTACT_INFO — panel adresi doğrulanmadı. */}
              <span className="i3-swap" data-swap="CONTACT_INFO">
                panel adresi bekleniyor
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ==================================================================
          2 · BRIEF — iki seçim, üç alan, canlı cümle
          ================================================================== */}
      <section className="sec-pad i3-brief" id="i3-brief" style={{ background: "var(--paper)" }}>
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="İki seçim, üç alan."
              accent="İki seçim,"
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Uzun form doldurtmuyoruz. Ülke ve konuyu işaretleyin, size nasıl
                döneceğimizi yazın — gerisini konuşurken tamamlıyoruz.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            {/* SWAP:CONTACT_FORM — gönderim ucu yok.
                action ve onSubmit YOK, alanlar <fieldset disabled> içinde,
                buton devre dışı. Form bu hâliyle hiçbir şey göndermiyor ve
                gönderdiğini de iddia etmiyor; "mesajınız iletildi" ekranı
                bilerek yazılmadı. Çalışan çıkış altta, AskCta.
                aria-describedby ile not forma bağlı: ekran okuyucu formu
                duyurduğunda kapalı olduğunu da duyuruyor. */}
            <form className="i3-form" aria-describedby="i3-form-note">
              {/* ---- canlı cümle ----
                  Seçimlerin çıktısı. aria-live="polite" var çünkü çip
                  değiştiğinde ekranda değişen tek şey bu cümle; görmeyen
                  kullanıcı aksi hâlde seçiminin karşılığını duymuyor. */}
              <p className="i3-say" aria-live="polite">
                {pick.c ? (
                  <>
                    <b className="i3-tok">{pick.label}</b> için{" "}
                  </>
                ) : (
                  <>
                    <b className="i3-tok">Ülkeye karar vermeden</b>{" "}
                  </>
                )}
                <b className="i3-tok">{topic.inline}</b> konusunda yazıyorum.
              </p>

              {/* Çipler fieldset'in DIŞINDA: seçim yapmak veri toplamak
                  değil, sayfada kalıyor. Kapalı olan şey gönderim ve kişisel
                  alanlar; tasarımın çalıştığını görmek için seçicilerin
                  gerçekten çalışması gerekiyor. */}
              <div className="i3-picks">
                <div className="i3-pick-row">
                  <span className="tag i3-pick-l">Ülke</span>
                  <div className="i3-chips" role="group" aria-label="Ülke seçimi">
                    {PICKS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        className="i3-chip"
                        data-on={p.label === pick.label ? "" : undefined}
                        aria-pressed={p.label === pick.label}
                        onClick={() => setPick(p)}
                      >
                        {p.c ? (
                          <span className="i3-chip-flag" aria-hidden="true">
                            <Flag country={p.c} />
                          </span>
                        ) : null}
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="i3-pick-row">
                  <span className="tag i3-pick-l">Konu</span>
                  <div className="i3-chips" role="group" aria-label="Konu seçimi">
                    {TOPICS.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        className="i3-chip"
                        data-on={t.key === topic.key ? "" : undefined}
                        aria-pressed={t.key === topic.key}
                        onClick={() => setTopic(t)}
                      >
                        {t.chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <fieldset className="i3-fields" disabled>
                <legend className="sr-only">İletişim bilgileriniz</legend>

                <div className="i3-field">
                  <label className="i3-label" htmlFor="i3-name">
                    Ad Soyad
                  </label>
                  <input
                    className="i3-input"
                    id="i3-name"
                    name="ad"
                    type="text"
                    autoComplete="name"
                    placeholder="Adınız"
                  />
                </div>

                <div className="i3-field">
                  <label className="i3-label" htmlFor="i3-reach">
                    Size nasıl dönelim
                  </label>
                  <input
                    className="i3-input"
                    id="i3-reach"
                    name="iletisim"
                    type="text"
                    autoComplete="email"
                    placeholder="E-posta veya telefon"
                  />
                </div>

                <div className="i3-field" data-wide="">
                  <label className="i3-label" htmlFor="i3-note">
                    Kısaca durumunuz
                    <i>opsiyonel</i>
                  </label>
                  <textarea
                    className="i3-input i3-area"
                    id="i3-note"
                    name="durum"
                    rows={3}
                    placeholder="Faaliyetiniz, tahsilat kanalınız, hedef pazarınız — aklınızda ne varsa."
                  />
                </div>
              </fieldset>

              <div className="i3-foot">
                <div className="i3-foot-l">
                  <span className="i3-form-badge">
                    <Lock size={12} strokeWidth={2.4} aria-hidden="true" />
                    gönderim kapalı
                  </span>
                  <p className="i3-note" id="i3-form-note">
                    Form uç noktası henüz bağlanmadı: bu alanlar veri toplamıyor ve
                    buton bir şey göndermiyor. Bugün çalışan çıkış yandaki bağlantı.
                  </p>
                </div>

                <div className="i3-foot-r">
                  <button type="button" className="i3-send" disabled>
                    Gönder
                    <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <AskCta label="Sorumu şimdi sorayım" />
                </div>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* ==================================================================
          3 · YAZDIKTAN SONRA — dördü de aynı boyda, sınır dahil
          ================================================================== */}
      <section className="sec-pad sec-night">
        <div className="container-o">
          <div className="sec-head sec-head-dark">
            <SplitWords
              as="h2"
              text="Yazdıktan sonra ne oluyor?"
              accent="ne oluyor?"
              accentColor="#5c9eeb"
              className="h2"
              style={{ color: "#ffffff" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead sec-lead-dark">
                Mesajınız bir havuza düşmüyor. Aşağıdaki dördü, dördüncüsü dahil,
                bugün geçerli.
              </p>
            </FadeUp>
          </div>

          <div className="i3-after">
            {AFTER.map((a, i) => {
              const Icon = a.icon;
              return (
                <FadeUp key={a.t} delay={0.06 * i} className="i3-after-c">
                  <span className="i3-after-ic" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <b className="i3-after-t">{a.t}</b>
                  <span className="i3-after-l">{a.l}</span>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.14}>
            <div className="i3-end">
              <p className="i3-end-t">
                Hangi kanaldan yazacağınıza karar veremediyseniz yukarıdaki formu
                doldurun. Yanlış kanal diye bir şey yok; yalnızca sizi daha çok
                yazdıranı var.
              </p>
              <AskCta label="Durumumu anlatayım" tone="solid" />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
