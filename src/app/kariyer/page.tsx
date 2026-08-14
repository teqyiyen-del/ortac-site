import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";

import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import SmartLink from "@/components/shared/SmartLink";
import CareerSections from "@/app/kariyer/CareerSections";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME } from "@/lib/brand";
import { OFFICE_ORDER } from "@/lib/offices";
import { OPEN_APPLICATION, hasCareerInbox, sortedOpenings } from "@/lib/careers";

/* ============================================================================
   KARİYER — /kariyer

   NEDEN VAR
   Müşterinin cümlesi: "kariyer diye bir şey gelcek insanlar iş başvurusu
   yapmak ister diye ordan açık pozisyonları göstereceğimiz fln bir kısım."
   Bu turda gelen ikinci cümle: "kariyer kısmını place holder şeklinde yapıp
   açık bir kaç pozisyon ekle bide başvuru için form tarzında bir şey
   ekleyelim aşamalı da olabilir."

   ---------------------------------------------------------- NEDEN İKİ DOSYA
   Bu dosya SUNUCU bileşeni ve öyle kalmalı: `export const metadata` bir
   "use client" dosyasından verilemiyor. Durum tutan her şey (ilan listesi +
   form, ikisi tek seçimi paylaşıyor) CareerSections.tsx'te; metadata, JSON-LD
   ve sayfa kabuğu burada. Aynı bölünme /iletisim'de de var.

   ------------------------------------------------------- SAYFANIN İSKELETİ
     Nav
     PageHero            kırıntı yolu + sayfanın TEK <h1>'i + lead
     1 · pozisyonlar     dört ilan, her biri "Örnek" rozetli              (h2)
     2 · başvuru         tek ekranlık form, gönderim kapalı               (h2)
     3 · açık başvuru    gerçekten çalışan çıkış + üç ofis                (h2)
     FinalCta

   -------------------------------------------------- YER TUTUCU POLİTİKASI
   İlanlar tasarım için hazırlanmış örnek kayıtlar (src/lib/careers.ts) ve
   sayfa bunu tek bir yerde söylüyor: kayıt başına küçük "Örnek" rozeti.
   Sayfa başında uyarı paneli, kesikli kart çerçevesi, sönük başlık ve ayrı
   "hazırlananlar" bölümü YOK — sitedeki yerleşik dilin aynısı (.kyn-seed-tag,
   .bh-seed). Gerekçe: tasarımın dolu hâli değerlendirilebilsin.

   Yer tutucu olmak, taahhüt uydurmak demek DEĞİL. İlanlarda maaş, yan hak,
   ekip büyüklüğü, işe alım süresi ve ofis olanağı yok; şema da alan açmıyor.
   Gerekçenin uzunu careers.ts'in başında.

   ------------------------------------------------------ JSON-LD: JobPosting YOK
   Sayfanın kendi BreadcrumbList'i ve CollectionPage'i duruyor. `JobPosting`
   düğümü BİLEREK yazılmadı ve yazılmayacak: Google iş ilanlarını ayrı bir
   arama yüzeyinde gösteriyor ve oraya yer tutucu bir ilan bildirmek, başvurmak
   için tıklayan gerçek insanlar üretir. Ekrandaki bir rozeti geri almak kolay,
   arama motoruna verilmiş yanlış beyanı geri almak değil. Aynı ayrım blog ve
   kaynaklar tarafında da korunuyor.

   ------------------------------------------------------ FORM GÖNDERMİYOR
   Çalışan bir gönderim ucu yok: buton devre dışı, dosya alanı devre dışı,
   ikisinin de nedeni ekranda yazıyor ve sahte bir "başvurunuz alındı" ekranı
   yok. Gerçekten çalışan tek çıkış aşağıdaki açık başvuru bölümü.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/kariyer";

/* Modül düzeyinde: OPENINGS bir sunucu sabiti, `metadata` da öyle. */
const OPEN = sortedOpenings();
const EMPTY = OPEN.length === 0;

const TITLE = "Kariyer — açık pozisyonlar ve başvuru | Ortac Global";

/* Açıklama pozisyon yokken pozisyon vaat etmiyor: aramada "açık pozisyonlar"
   görüp boş sayfaya düşen kişi bir daha bakmaz. */
const DESCRIPTION = EMPTY
  ? "Ortac Global'de şu an açık pozisyon yok. İlan yayımlamadığımız dönemde olmayan bir pozisyon yazmıyoruz; açık başvurunuzu yine de bırakabilirsiniz."
  : "Ortac Global'de açık pozisyonlar: muhasebe ve vergi, uyum, şirket kuruluşu ve vize ekipleri. Her ilanın yanında ekip, ülke ve çalışma biçimi yazıyor; başvuru formu aynı sayfada.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  /* Kanonik mutlak: layout.tsx'te metadataBase yok (aynı gerekçe /iletisim'de). */
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: `${SITE}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function KariyerPage() {
  /* Yalnızca iki düğüm: sayfanın kırıntı yolu ve sayfanın kendisi.
     İlanlar yapılandırılmış veriye GİRMİYOR — bkz. dosya başı. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Kariyer", item: `${SITE}${PATH}` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Kariyer",
        url: `${SITE}${PATH}`,
        description: DESCRIPTION,
        inLanguage: "tr-TR",
        about: { "@id": `${SITE}/#organization` },
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* country VERİLMİYOR: kompakt başlık. Bu sayfa üç ülkede birden
            geçiyor, tek ülkenin sahnesini çizmek yanlış olurdu. */}
        {/* Başlık "Açık pozisyonlar ve başvuru." idi: iki etiketin toplamı,
            cümle değil. Ölçü, müşterinin verdiği: sayfanın konusu başlıkta
            cümle içinde geçsin.

            BAŞLIK ARTIK EMPTY'YE DUYARLI ve bu bir doğruluk düzeltmesi, biçim
            değil: ilan yokken "açık pozisyonlar" yazmak ekranda olmayan bir
            şeyi vaat etmek olurdu. Lead zaten iki hâli ayırıyordu, başlık
            ayırmıyordu. Aksan başlığın SONU olmak zorunda (PageHero
            title.endsWith(accent) ile ayırıyor), o yüzden iki hâlde iki aksan. */}
        <PageHero
          crumb="Kariyer"
          title={EMPTY ? "Ekibimize başvurun." : "Ekibimizde açık pozisyonlar."}
          accent={EMPTY ? "başvurun." : "açık pozisyonlar."}
          lead={
            EMPTY
              ? "Şu an yayımlanmış bir ilanımız yok. Sayfayı doldurmak için olmayan bir pozisyon yazmıyoruz; buna karşılık başvurunuzu her zaman bırakabilirsiniz."
              : "Muhasebe ve vergi, uyum, şirket kuruluşu ve vize: dört ekip, üç ülke. Her ilanın yanında hangi ekip, hangi ülke ve hangi çalışma biçimi olduğu yazıyor; başvuru formu da aynı sayfada."
          }
        />

        <CareerSections />

        {/* ==================================================================
            3 · AÇIK BAŞVURU — form bağlanana kadar gerçekten çalışan tek yol
            ================================================================== */}
        <section className="sec-pad" id="acik-basvuru" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="krm-media">
              <div>
                <h2 className="h2">{OPEN_APPLICATION.title}</h2>
                <p className="sec-lead">{OPEN_APPLICATION.line}</p>

                <div className="krm-media-a">
                  {hasCareerInbox() ? (
                    <a className="btn btn-primary" href={`mailto:${OPEN_APPLICATION.inbox}`}>
                      {OPEN_APPLICATION.inbox}
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </a>
                  ) : (
                    <SmartLink href={OPEN_APPLICATION.cta.href} className="btn btn-primary">
                      {OPEN_APPLICATION.cta.label}
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  )}
                </div>
              </div>

              {/* Nerede çalışıyoruz. Üç ofisin VARLIĞI doğrulanmış ve site
                  bunu her yerde söylüyor; şehir ve açık adres doğrulanmadığı
                  için burada da yazmıyor (src/lib/offices.ts · SWAP:OFFICE_*).
                  Aynı şerit navbar'ın iletişim kartında da duruyor — orada da
                  ülke adından fazlasını iddia etmiyor. */}
              <div className="krm-facts">
                <p className="krm-facts-k">
                  <MapPin size={14} strokeWidth={2} aria-hidden="true" />
                  Nerede çalışıyoruz
                </p>
                <div className="krm-of">
                  {OFFICE_ORDER.map((c) => (
                    <span key={c} className="krm-of-i">
                      <span className="krm-of-f" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                      {COUNTRY_NAME[c]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
