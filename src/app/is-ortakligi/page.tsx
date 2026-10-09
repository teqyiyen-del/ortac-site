import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calculator,
  CalendarClock,
  Check,
  ChevronRight,
  ChevronUp,
  Eye,
  FolderOpen,
  Handshake,
  LayoutDashboard,
  MapPin,
  Megaphone,
  Minus,
  MonitorCheck,
  Scale,
  Send,
  Share2,
  UserRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import Nav from "@/components/Nav";
import FotoGiris from "@/components/shared/FotoGiris";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import FormBagla from "@/components/shared/FormBagla";
import { Flag } from "@/components/shared/CountryPicker";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import { COUNTRY_PHOTO, SECTOR_PHOTO } from "@/lib/media";
import { sayfaKunye } from "@/lib/seo";
import {
  PARTNER_AKIS,
  PARTNER_BASVURU,
  PARTNER_EKIP,
  PARTNER_FAQ,
  PARTNER_FAQ_BAS,
  PARTNER_HERO,
  PARTNER_IZLEME,
  PARTNER_KIMLER,
  PARTNER_SEO,
  PARTNER_ULKELER,
  type PartnerIcon,
} from "@/lib/partners";

/* Stil dosyası globals.css'in @import listesine değil BURAYA bağlı
   (KurumsalSayfa.tsx'in css/svc-kurumsal.css'i bağladığı gibi; tuzak P:
   ortak @import bloğuna satır eklemek başka turlarla çakışıyor). */
import "@/app/css/is-ortakligi.css";

/* ============================================================================
   İŞ ORTAKLIĞI — /is-ortakligi   (09.10.2026 · bugünkü dille yeniden kuruldu)
   Metin: lib/partners.ts (gerekçeler ve iddia sınırı orada) ·
   Biçim: css/is-ortakligi.css (.iob-)

   OKUR müşteri değil, müşterisini Dubai, İngiltere ya da KKTC'ye yönlendiren
   danışmanlık firması, mali müşavir, hukuk bürosu ya da ajans. Ana fikir
   (Murat Bey'in tarifi): müşterinizi yönlendirin, kuruluşu ve sonrasını biz
   yürütelim, siz her adımı izleyin.

   ESKİ SAYFADAN NE GİTTİ: iki model kartı (referans · white-label; teyitsiz),
   rakam yerine tire basan "Ticari şartlar" tablosu, tam siyah "ne
   götürüyorsunuz" bölümü ve <details> kartları, hizmet zinciri rayı. Eski
   biçim dosyası css/partnerlik.css (.pt-) artık bu sayfadan çağrılmıyor.

   DURAKLAR, zemin beyaz ve kırık beyaz sırayla; siyah yalnız iki büyük gece
   kartta ("iki beyaz bir siyah" ritmi, KurumsalSayfa'daki karar):
     giriş      foto giriş (FotoGiris; hizmet sayfalarının girişi)
     nasıl      ÇİZİM 1 akış (Siz → Ortac → Müşteriniz) + üç kart     beyaz
     izleme     ÇİZİM 2 dosya çizelgesi, GECE kartta + üç satır       kırık beyaz
     ekip       ÇİZİM 3 zaman çizgisi + üç sayı + amber sınır kutusu  beyaz
     ülkeler    üç fotoğraflı ülke kartı                              kırık beyaz
     kimler     dört meslek, GECE panoda                              beyaz
     başvuru    dört adımlı ray + ÇALIŞAN form                        kırık beyaz
     SSS        CountryFaq                                            beyaz
     kapanış    FinalCta

   ORTAK PANELİ HENÜZ YOK ve sayfa onu var gibi göstermiyor: ÇİZİM 2 "Örnek"
   çipi taşıyor, yanındaki satırlar "Bugün" ile "Hazırlanıyor"u ayırıyor.

   NEDEN SUNUCU BİLEŞENİ: künye (generateMetadata) sunucuda çalışıyor ve
   sayfada durum tutan tek şey SSS; o da hazır istemci bileşeni (CountryFaq).
   Form düz HTML, gönderimi içine konan FormBagla yakalıyor.

   ÇİZİMLERİN ÜÇÜ DE aria-hidden: iddia başlıkta, kartlarda ve satırlarda
   yazılı, çizim aynı şeyi gösteriyor. Hareketin tamamı CSS'te ve
   prefers-reduced-motion: no-preference kapısında (tuzak A). Ekran dışında
   durdurma layout'taki EkranDisiDurdur'dan geliyor.

   RENK: ağırlık mavide; amber yalnız not ve sınır ("Hazırlanıyor", verilemeyen
   sözler). Yeşil yok, çünkü sayfada para yok.
   ========================================================================= */

export function generateMetadata(): Metadata {
  return sayfaKunye({ title: PARTNER_SEO.title, description: PARTNER_SEO.description, yol: PARTNER_SEO.path });
}

const SITE = "https://ortacglobal.com";

const IKON: Record<PartnerIcon, LucideIcon> = {
  yonlendir: Send,
  yurut: Workflow,
  izle: Eye,
  paylas: Share2,
  panel: LayoutDashboard,
  ortakPanel: MonitorCheck,
  danisman: Briefcase,
  musavir: Calculator,
  hukuk: Scale,
  ajans: Megaphone,
};

function Kuyu({ icon, ton, boy = 20 }: { icon: PartnerIcon; ton?: "amber"; boy?: number }) {
  const I = IKON[icon];
  return (
    <span className="iob-ic" data-ton={ton} aria-hidden="true">
      <I size={boy} strokeWidth={1.9} />
    </span>
  );
}

function Bas({ b }: { b: { heading: string; accent: string; lead: string } }) {
  return (
    <div className="sec-head">
      <SplitWords as="h2" text={b.heading} accent={b.accent} className="h2" />
      <FadeUp delay={0.2}>
        <p className="sec-lead">{b.lead}</p>
      </FadeUp>
    </div>
  );
}

/* ------------------------------------------------------------------ ÇİZİM 1
   AKIŞ. Üç durak yan yana: Siz, Ortac, Müşteriniz. Durakların arkasından
   geçen hat ileri akıyor (müşteri size, sizden bize, bizden kuruluşa);
   altta Ortac'tan size dönen kesik hat "her adımın bilgisi"ni taşıyor.
   Hatlar kutu genişliğine gerilen iki SVG (preserveAspectRatio none; çizgi
   kalınlığı vector-effect ile sabit). Sütun merkezleri 50 · 150 · 250.
   Ortadaki durak dolu mavi: işi yürüten o. */
const DURAK_IKON = [Handshake, Building2, UserRound];
function SahneAkis() {
  const A = PARTNER_AKIS;
  return (
    <div className="iob-akis" data-yaricap="serbest">
      <svg className="iob-akis-hat" viewBox="0 0 300 10" preserveAspectRatio="none" focusable="false">
        <path className="iob-hat" d="M50 5 H250" />
        <path className="iob-hat-akan" d="M50 5 H250" />
      </svg>
      <ol className="iob-akis-l">
        {A.duraklar.map((d, k) => {
          const I = DURAK_IKON[k];
          return (
            <li key={d.ad} className="iob-akis-d" data-orta={k === 1 ? "" : undefined}>
              <span className="iob-akis-ic">
                <I size={24} strokeWidth={1.9} />
              </span>
              <b>{d.ad}</b>
              <small>{d.alt}</small>
              {k < 2 ? (
                <span className="iob-akis-ok">
                  <ChevronRight size={16} strokeWidth={2.4} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="iob-donus">
        <svg className="iob-donus-hat" viewBox="0 0 300 30" preserveAspectRatio="none" focusable="false">
          <path className="iob-hat" data-kesik="" d="M150 0 V28 H50 V0" />
          <path className="iob-donus-akan" d="M150 0 V28 H50 V0" />
        </svg>
        <span className="iob-donus-uc">
          <ChevronUp size={16} strokeWidth={2.4} />
        </span>
        <span className="iob-donus-cip">
          <Eye size={15} strokeWidth={2} />
          {A.donus}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ ÇİZİM 2
   DOSYA ÇİZELGESİ. Gece kartın içinde bir dosya kartı: üstte ad ve "Örnek"
   çipi, ortada beş adım (üçü tamam, biri sürüyor, biri sırada), altta "Ortak
   görünümü" satırı. Ortak paneli henüz yok; çizim onun ekranı değil, ortağın
   bugün de aldığı bilginin resmi (hangi adım tamam, hangisi sürüyor).
   Hareket: süren adımın noktası yanıp sönüyor (iobNabiz). */
function SahneDosya() {
  const Z = PARTNER_IZLEME;
  return (
    <div className="iob-dosya" data-yaricap="serbest">
      <div className="iob-dosya-ust">
        <span className="iob-dosya-ic">
          <FolderOpen size={18} strokeWidth={1.9} />
        </span>
        <b>{Z.dosya.ad}</b>
        <span className="iob-dosya-cip">{Z.dosya.cip}</span>
      </div>
      <ol className="iob-dosya-l">
        {Z.adimlar.map((a) => (
          <li key={a.ad} className="iob-dosya-a" data-durum={a.durum}>
            <span className="iob-dosya-n">{a.durum === "tamam" ? <Check size={13} strokeWidth={3} /> : <i />}</span>
            <b>{a.ad}</b>
            <span className="iob-dosya-d">{Z.durumAd[a.durum]}</span>
          </li>
        ))}
      </ol>
      <div className="iob-dosya-alt">
        <Eye size={15} strokeWidth={2} />
        {Z.dosya.gorunum}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ ÇİZİM 3
   ZAMAN ÇİZGİSİ. Solda 1996, sağda Bugün; arada otuz bir çentikli hat (her
   çentik bir yıl) ve ortasında "30 yıl". Hat tek SVG (300 x 24, genişliğe
   geriliyor); çentiklerin x'i 0'dan 300'e eşit otuz aralık. Hareket: hattın
   üstünde soldan sağa yürüyen nokta (iobYuru; yolu kabın genişliği, cqw). */
function SahneCizgi() {
  const C = PARTNER_EKIP.cizgi;
  return (
    <div className="iob-cizgi" data-yaricap="serbest">
      <p className="iob-cizgi-orta">
        <b>{C.orta}</b>
        <small>{C.alt}</small>
      </p>
      <div className="iob-cizgi-sira">
        <span className="iob-cizgi-uc">{C.bas}</span>
        <span className="iob-cizgi-yol">
          <svg viewBox="0 0 300 24" preserveAspectRatio="none" focusable="false">
            <path className="iob-cizgi-hat" d="M0 12 H300" />
            {Array.from({ length: 31 }, (_, i) => (
              <path key={i} className="iob-cizgi-centik" data-bes={i % 5 === 0 ? "" : undefined} d={`M${i * 10} ${i % 5 === 0 ? 4 : 8} V${i % 5 === 0 ? 20 : 16}`} />
            ))}
          </svg>
          <i className="iob-cizgi-nokta" />
        </span>
        <span className="iob-cizgi-uc" data-son="">
          {C.son}
        </span>
      </div>
    </div>
  );
}

export default function PartnershipPage() {
  const H = PARTNER_HERO;
  const B = PARTNER_BASVURU;

  /* Yapılandırılmış veri: kırıntı ve SSS. Organization ve Service layout'ta
     global basılıyor, burada tekrarlanmıyor. FAQPage ekrandaki yedi soruyla
     AYNI listeden (CountryFaq yalnız seçili cevabı DOM'a basıyor; metinlerin
     tamamı bileşenin sunucu yükünde ve şemada). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: H.crumb, item: `${SITE}${PARTNER_SEO.path}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: PARTNER_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Nav />
      <main id="icerik" className="iob">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* ------------------------------------------------------------ GİRİŞ
            Foto giriş doğrudan çağrılıyor (PageHero üzerinden değil): PageHero
            bu dalda fotoğrafı kırıntıdaki ülke adından seçiyor ve ülkesiz
            sayfada Dubai siluetine düşüyor; bu sayfanın iddiası üç ülke.
            Fotoğraf: tepeden çalışma masası, yüz yok (media.ts · danışmanlık
            karesi). Düğmeler sayfa içi çapa: başvuru formu ve akış bölümü. */}
        <FotoGiris
          iz={H.crumb}
          baslik={H.title}
          vurgu={H.accent}
          lead={H.lead}
          foto={SECTOR_PHOTO.danismanlik.band}
          belge={H.belge}
          rozetler={H.rozetler.map((r, i) => {
            const I = [CalendarClock, MapPin, BadgeCheck][i];
            return {
              icon: <I size={18} strokeWidth={2} />,
              metin: (
                <>
                  <b>{r.b}</b>
                  {r.s}
                </>
              ),
            };
          })}
          dugmeler={
            <>
              <a href={H.cta.href} className="dhr-btn dhr-btn-mavi">
                {H.cta.label}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
              <a href={H.ikinci.href} className="dhr-btn dhr-btn-cizgi">
                {H.ikinci.label}
              </a>
            </>
          }
        />

        {/* ------------------------------------------------------ NASIL ÇALIŞIR
            Üstte akış panosu (kabın genişliğinde), altında üç kart. */}
        <section id={PARTNER_AKIS.id} className="sec-pad">
          <div className="container-o">
            <Bas b={PARTNER_AKIS} />
            <FadeUp className="iob-akis-pano" delay={0.1}>
              <div aria-hidden="true">
                <SahneAkis />
              </div>
            </FadeUp>
            <ul className="iob-uclu">
              {PARTNER_AKIS.items.map((m, i) => (
                <li key={m.title}>
                  <FadeUp className="iob-kart" delay={0.08 + i * 0.05}>
                    <Kuyu icon={m.icon} />
                    <h3 className="iob-kart-t">{m.title}</h3>
                    <p className="iob-kart-p">{m.line}</p>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ İZLEME
            Gece kart: solda dosya çizelgesi, sağda üç satır. Satırın çipi
            neyin bugün var olduğunu, neyin hazırlandığını söylüyor. */}
        <section id={PARTNER_IZLEME.id} className="sec-pad iob-kirik">
          <div className="container-o">
            <Bas b={PARTNER_IZLEME} />
            <FadeUp className="iob-gece" delay={0.1}>
              <div className="iob-gece-sahne" aria-hidden="true">
                <SahneDosya />
              </div>
              <ul className="iob-gece-l">
                {PARTNER_IZLEME.items.map((m) => (
                  <li key={m.title} className="iob-gece-k">
                    <Kuyu icon={m.icon} ton={m.ton} />
                    <div className="iob-gece-m">
                      <h3 className="iob-gece-t">{m.title}</h3>
                      <p className="iob-gece-p">{m.line}</p>
                    </div>
                    <span className="iob-gece-z" data-ton={m.ton}>
                      {m.cip}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </section>

        {/* -------------------------------------------------------------- EKİP
            Beyaz pano: üstte zaman çizgisi, altında üç sayı. Sayılar gerçek
            metin (ekran okuyucu "700+ şirket kuruluşu" diye okuyor); yalnız
            çizgi süs. Altındaki amber kutu ortağın veremeyeceği üç söz. */}
        <section id={PARTNER_EKIP.id} className="sec-pad">
          <div className="container-o">
            <Bas b={PARTNER_EKIP} />
            <FadeUp className="iob-ekip" delay={0.1}>
              <div aria-hidden="true">
                <SahneCizgi />
              </div>
              <ul className="iob-sayi">
                {PARTNER_EKIP.sayilar.map((s) => (
                  <li key={s.ad}>
                    <b>{s.sayi}</b>
                    <span>{s.ad}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp className="iob-sinir" delay={0.16}>
              <h3 className="iob-sinir-t">{PARTNER_EKIP.sinir.title}</h3>
              <ul className="iob-sinir-l">
                {PARTNER_EKIP.sinir.maddeler.map((m) => (
                  <li key={m}>
                    <Minus size={16} strokeWidth={2.4} aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </section>

        {/* ----------------------------------------------------------- ÜLKELER
            Üç fotoğraflı kart; kartın tamamı ülke sayfasına bağlantı. Yazı
            fotoğrafın üstünde, altta koyu perde (okunurluk). Bayrak kabı
            sabit px + overflow hidden (tuzak H). */}
        <section id={PARTNER_ULKELER.id} className="sec-pad iob-kirik">
          <div className="container-o">
            <Bas b={PARTNER_ULKELER} />
            <ul className="iob-ulke">
              {PARTNER_ULKELER.items.map((u, i) => (
                <li key={u.slug}>
                  <FadeUp className="iob-ulke-f" delay={0.08 + i * 0.05}>
                    <SmartLink href={u.href} className="iob-ulke-k">
                      <Image src={COUNTRY_PHOTO[u.slug]} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="iob-ulke-img" />
                      <span className="iob-ulke-ok" aria-hidden="true">
                        <ArrowUpRight size={18} strokeWidth={2} />
                      </span>
                      <span className="iob-ulke-m">
                        <span className="iob-ulke-ust">
                          <span className="iob-ulke-bayrak">
                            <Flag country={u.slug} />
                          </span>
                          <b>{u.ad}</b>
                          <span className="iob-ulke-ofis">
                            <MapPin size={13} strokeWidth={2.2} aria-hidden="true" />
                            {u.ofis}
                          </span>
                        </span>
                        <span className="iob-ulke-p">{u.line}</span>
                      </span>
                    </SmartLink>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ KİMLER
            Gece pano, dört kart (2 x 2). Bağlantı değil, düz kart. */}
        <section id={PARTNER_KIMLER.id} className="sec-pad">
          <div className="container-o">
            <Bas b={PARTNER_KIMLER} />
            <ul className="iob-kim">
              {PARTNER_KIMLER.items.map((k, i) => (
                <li key={k.title}>
                  <FadeUp className="iob-kim-k" delay={0.08 + i * 0.04}>
                    <Kuyu icon={k.icon} />
                    <div className="iob-kim-m">
                      <h3 className="iob-gece-t">{k.title}</h3>
                      <p className="iob-gece-p">{k.line}</p>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- BAŞVURU
            Üstte dört adımlı ray (sayı + çubuk), altında form panosu.

            FORM ÇALIŞIYOR. Düz HTML; gönderimi içindeki FormBagla yakalıyor
            (lib/formGonder → /api/form; sunucu gönderemezse ziyaretçinin
            e-posta uygulamasında web@ortacglobal.com'a adresli dolu bir ileti
            açılır). Sonuç cümlesi not satırına yazılıyor (role="status").
            Seçenekler görünür çip + gizli native radio (kural 9: <select>
            yok); seçili hâl :has(input:checked) ile, yani durum tutan
            istemci kodu yok. Radyonun adı sarmalayan <label>'ın metninden,
            grubun adı aria-labelledby'den geliyor (tuzak G). */}
        <section id={B.id} className="sec-pad iob-kirik">
          <div className="container-o">
            <Bas b={B} />
            <ol className="iob-ray">
              {B.adimlar.map((a, i) => (
                <li key={a.t} className="iob-ray-a">
                  <span className="iob-ray-ust" aria-hidden="true">
                    <span className="iob-ray-n">{i + 1}</span>
                    <i />
                  </span>
                  <h3 className="iob-ray-t">{a.t}</h3>
                  <p className="iob-ray-p">{a.s}</p>
                </li>
              ))}
            </ol>

            <FadeUp delay={0.12}>
              <form className="iob-form" aria-labelledby="iob-form-t" aria-describedby="iob-form-not">
                <h3 className="iob-form-t" id="iob-form-t">
                  {B.formBaslik}
                </h3>
                <div className="iob-alanlar">
                  {B.fields.map((f) =>
                    f.type === "secenek" ? (
                      <div className="iob-alan" key={f.name} data-genis={f.wide ? "" : undefined}>
                        <span className="iob-etiket" id={`iob-${f.name}-e`}>
                          {f.label}
                        </span>
                        <div className="iob-cipler" role="group" aria-labelledby={`iob-${f.name}-e`}>
                          {f.options?.map((o) => (
                            <label className="iob-cip" key={o}>
                              <input type="radio" name={f.name} value={o} />
                              <span>{o}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="iob-alan" key={f.name}>
                        <label className="iob-etiket" htmlFor={`iob-${f.name}`}>
                          {f.label}
                        </label>
                        <input
                          className="iob-girdi"
                          id={`iob-${f.name}`}
                          name={f.name}
                          type={f.type}
                          placeholder={f.placeholder}
                          autoComplete={f.autoComplete}
                          required={B.zorunlu.includes(f.name)}
                        />
                      </div>
                    ),
                  )}
                </div>
                <div className="iob-form-alt">
                  <button type="submit" className="btn btn-solid">
                    {B.submitLabel}
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </button>
                  <AskCta label={B.askLabel} />
                </div>
                <p className="iob-form-not" id="iob-form-not" role="status">
                  {B.note}
                </p>
                <FormBagla
                  tur="ortaklik"
                  konu="İş ortaklığı başvurusu"
                  etiketler={Object.fromEntries(B.fields.map((f) => [f.name, f.label]))}
                  zorunlu={B.zorunlu}
                  yedekEposta="web@ortacglobal.com"
                  notId="iob-form-not"
                />
              </form>
            </FadeUp>
          </div>
        </section>

        <section id={PARTNER_FAQ_BAS.id} className="sec-pad">
          <div className="container-o">
            <Bas b={PARTNER_FAQ_BAS} />
            <CountryFaq items={PARTNER_FAQ} />
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
