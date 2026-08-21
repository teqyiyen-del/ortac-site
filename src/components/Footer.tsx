"use client";

import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import Logo from "@/components/shared/Logo";
import CtaSahne from "@/components/CtaSahne";
import { COUNTRY_NAME, COUNTRY_ORDER, COUNTRY_SERVICES } from "@/lib/brand";
import { TOOL_BY_ID } from "@/lib/tools/catalog";
import { gtm } from "@/lib/gtm";

/* §15 — the internal-link engine. Every route in the fixed architecture is
   reachable from here, so the footer doubles as the site index. Tools and
   resources live here now that the home page no longer carries that section.

   NOTE on class names: the root used to be `.ft`, which is also the Fit Test
   card selector. Both rule sets landed on the same element and squeezed the
   footer into a 720px centred card. Everything here is `.ft2-`. */
export const FT2_COLS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Araçlar",
    /* SÜTUN BU TURDA GERÇEK ARAÇ SAYFALARINA BAĞLANDI.
       Araçlar tek sayfadaki çapalardan (/araclar#…) kendi adreslerine taşındı;
       footer bir site dizini olduğu için en çok iş gören ikisi buraya girdi.
       Adresler ve adlar kayıt defterinden (lib/tools/catalog.ts), elle değil —
       bu sütun bir tur önce tam olarak elle yazıldığı için iki hayalet adres
       taşıyordu ("/fiyatlar" ve "/araclar/odeme-altyapisi"; ikisi de yazılmamış
       sayfalardı ve app/[...yapim] yakalayıcısını 200 ile gösteriyorlardı).

       "Ödeme altyapısı → /ulkeler#para-ve-tahsilat" satırı çıktı: bir araç
       değil, hemen altındaki /ulkeler'in içindeki bir çapaydı. Aynı sayfaya
       iki satır ayırmak, üçüncü bir araca yer bırakmıyordu. */
    links: [
      { label: TOOL_BY_ID["uygunluk-testi"].title, href: TOOL_BY_ID["uygunluk-testi"].href },
      {
        label: TOOL_BY_ID["bae-kurumlar-vergisi"].title,
        href: TOOL_BY_ID["bae-kurumlar-vergisi"].href,
      },
      { label: TOOL_BY_ID["belge-listesi"].title, href: TOOL_BY_ID["belge-listesi"].href },
      { label: "Ülke karşılaştırma", href: "/ulkeler" },
      { label: "Tüm araçlar", href: "/araclar" },
    ],
  },
  {
    head: "Kaynaklar",
    /* Bu turda kaynaklar tek yığından DÖRT TÜRE ayrıldı; sütun da onu izliyor.
       Eski üç satırın ikisi yanlıştı:
       · "Rehberler ve e-kitaplar" iki ayrı türü tek satırda birleştiriyordu —
         müşterinin şikâyeti tam olarak buydu ("hepsi aynı yere çıkıyor").
       · "Şirketini taşı → /sirket-tasima" diye bir sayfa HİÇ YOK. Adres
         app/[...yapim] yakalayıcısına düşüyor ve "yapım aşamasında" kartını
         HTTP 200 ile basıyor, o yüzden ölü olduğu hiçbir kontrolde görünmedi.
         Karşılığı olan bir sayfa yazılırsa geri gelir; uydurma bir hizmet adını
         footer'da tutmanın anlamı yok. */
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Ülke rehberleri", href: "/blog/rehberler" },
      { label: "Gelişmeler ve mevzuat", href: "/gelismeler" },
      { label: "E-kitaplar", href: "/e-kitaplar" },
      { label: "Tüm kaynaklar", href: "/kaynaklar" },
    ],
  },
  {
    head: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "İş ortaklığı", href: "/is-ortakligi" },
      { label: "İletişim", href: "/iletisim" },
      { label: "Panel girişi", href: "/panel" },
    ],
  },
];

/* ==================== KALDIRILDI · BUTONLARIN ALTINDAKİ ÜÇ SATIR ===========
   Müşterinin kararı, birebir: "cta kısmındaki şu 3 şeyi değiştirmek lazım ya
   da komple kaldırabiliriz onları sadece yukarısı kalsın ya." Kaldırıldı.

   KAYIT — silinen üç satır ve ikonları (geri istenirse birebir bunlar):
     Clock       · "Ücretsiz ilk değerlendirme"
     FileText    · "Kapsam ve fiyat yazılı"
     ShieldCheck · "Kuruluş sonrası da aynı ekip"
   Üçüncüsü bir tur önce değişmişti: eskiden "Dubai'deki kendi ofisimizden"
   yazıyordu ve müşteri çıkarttı ("cta nötr bi alan olduğu için bir ülkeyi öne
   çıkaran bir avantaj atmasın"), yerine ülke-nötr olan bu satır gelmişti.
   Dubai ofisi iddiası kaybolmadı: /dubai sayfası, Hakkımızda ve ana sayfanın
   kanıt şeridi onu ülkeye özel olduğu yerde söylemeye devam ediyor.

   NEDEN DİZİ DE GİTTİ, YALNIZ RENDER DEĞİL. `FT2_POINTS` bu dosyanın kendi
   sabitiydi (bir veri dosyasından gelmiyordu) ve tek müşterisi aşağıdaki
   listeydi; ekrandan çıkınca dışa açık ama hiç kimsenin okumadığı bir dizi
   kalıyordu. Depo kuralı: ölü alan bir sonraki turda yeniden doldurulmaya
   davetiye (bkz. HeroPortal · PROFIL tipinden silinen kiriş/dikme alanları).
   Karar kaydının kalıcı yeri bu yorum ve commit mesajı.

   BLOĞUN DOLGUSU DA TOPLANDI. Liste giderken yalnız kendi yüksekliğini
   götürmedi, bloğun kapanışını da götürdü: alttaki nefes artık butonların
   altında ölçülüyor. (Ölçüm o turda globals.css · .ft2-cta'daydı; blok bu
   turda kutuya dönüp css/kapanis-cta.css · .kcta'ya taşındı, dolgular orada
   yeniden ölçüldü.)
   ========================================================================== */

/* ============ KALDIRILDI · PARAGRAF VE İKİNCİ DÜĞME (K3 turu) =============
   Kapanış CTA'sı /lab/cta2'nin kazananına (K3 · Ufuk) döndü ve o adayın
   sözleşmesi ekranda "rozet + iki satır başlık + TEK düğme"den fazlasını
   istemiyordu. Müşteri adayı bu hâlde beğendi ve turu kapattı: "cta yı artık
   live alabilirsin kral."

   KAYIT — ekrandan kalkan üç şey, tek tek:

     1 · PARAGRAF (.kcta-l), iki satır:
         "Dubai, İngiltere ve KKTC'de kuruluş, banka, tahsilat ve muhasebe."
         "Tek ekip, tek muhatap, baştan sona Türkçe."
         İkinci satırın ilk yarısı ROZETE taşındı ("Tek ekip, tek muhatap"),
         yani tamamen kaybolmadı. Üç ülkeyi ve dört hizmeti sayan ilk satırın
         karşılığı hemen alttaki site dizininde duruyor: dizinin ilk üç
         sütunu zaten üç ülke ve her ülkenin hizmetleri (COUNTRY_SERVICES),
         yani bilgi bir satır aşağıda ve bağlantılı hâlde.

     2 · İKİNCİ DÜĞME: "Ücretsiz danışmanlık" → /iletisim,
         gtm("cta_meeting_click", { placement }).
         KAYBOLAN ÇIKIŞ VAR MI: hayır, ama her sayfadaki bir çıkış eksildi.
         /iletisim menüden (Nav · her sayfada) ve hemen alttaki dizinin
         "Kurumsal" sütunundan hâlâ bir tık uzakta. `cta_meeting_click` olayı
         da sitede yaşıyor: Hero, Packages, HomeFaq ve CountryFaq onu kendi
         placement'larıyla çağırmaya devam ediyor. Kaybolan tam olarak şu:
         olayın "footer" ve "final" placement'ları, yani her sayfanın
         altındaki ölçüm noktası.

     3 · BAŞLIK DEĞİŞTİ (müşteri bu turda değiştirdi):
         "Kurulumunuzu bugün başlatalım." → "Şirketinizi bugün kuralım."

   gtm("cta_start_click", { placement }) DURUYOR ve `placement` prop'u da
   duruyor; analitik ona bağlı, iki çağrı yeri de (footer · final) aynen
   çalışıyor.
   ========================================================================= */

/** The closing CTA — gece kart, yıldız alanı ve üç yaylı bir yörünge sahnesi.
 *  Shared by the home footer and by FinalCta on the sub-pages.
 *
 *  SAHNE K3'E (UFUK) DÖNDÜ. /lab/cta2 turunun kazananı; tur kapandı
 *  (lab/turlar.ts · durum "canli"), lab dosyaları kayıt olarak duruyor.
 *  Sahnenin kendisi components/CtaSahne.tsx'te, CSS'i css/kapanis-cta.css'te.
 *
 *  LAB ÖNEKİ (.kd3-) CANLIYA GELMEDİ, YENİ ÖNEK DE AÇILMADI. Ad alanı .kcta-
 *  olarak korundu; gerekçesi kapanis-cta.css'in başında, üç maddeyle. Kısası:
 *  lab-ctadek-3.css hâlâ globals.css'in @import bloğunda ve canlı dosyadan
 *  SONRA okunuyor, yani .kd3- kullanmak labdaki bir düzenlemenin canlıyı
 *  sessizce değiştirmesi demekti; ama .kcta- zaten bu bloğun canlı adı ve
 *  üçüncü bir önek yalnızca "hangisi gerçek" sorusu üretirdi.
 *
 *  YAPISAL FARK: `container-o` koyu panelin DIŞINDA, yani kutuyu kuran şey o.
 *  Kartın dolgusu bu turda metin bloğuna (.kcta-in) indi, çünkü sahne artık
 *  akışta duran ve kendi yüksekliği olan bir bant.
 *
 *  GİRİŞ HAREKETİ KORUNDU. K3 labda düz metin basıyordu; canlıda başlık
 *  SplitWords, düğme FadeUp ile geliyor. Sitedeki her bölüm başlığı bu iki
 *  bileşenle açılıyor ve CTA'yı tek istisna yapmanın gerekçesi yok. Başlığın
 *  mavi yarısı SplitWords'ün `accent`inden geliyor (.text-accent =
 *  var(--blue-700)), yani K3'ün .kd3-vurgu sınıfının canlı karşılığı bu. */
export function Ft2Cta({ placement = "footer" }: { placement?: string }) {
  return (
    <div className="ft2-kat">
      {/* --------------------------------------------------------- gökyüzü
          Katmanın kabı artık .ft2-kat: kart kalkınca `inset: 0` neye
          yaslanacaksa o. Yıldızlar ÜST KATIN katmanı, bloğun tamamının
          değil — dizinin arkasına geçmiyorlar. Gerekçe okunurluk: 13,5 px'lik
          bir bağlantı listesinin arkasında hareket eden benekler kontrast
          tablosunda görünmeyen ama gözle görülen bir gürültü.

          Kayan yıldızlar sahnede değil burada: müşteri izi uçakta değil
          "arkaplanda" istemişti. Metnin ARKASINDAN geçiyorlar (gök 0 ·
          sahne 1 · metin 2), yani okunurluğa dokunmuyorlar. */}
      <span className="kcta-gok" aria-hidden="true">
        <span className="kcta-yildiz kcta-yildiz-b" />
        <span className="kcta-yildiz kcta-yildiz-a" />
        <span className="kcta-kayan kcta-kayan-1" />
        <span className="kcta-kayan kcta-kayan-2" />
      </span>

      {/* ---------------------------------------------------------- metin */}
      <div className="ft2-ust">
        <div className="container-o">
          <div className="ft2-in">
            <FadeUp>
              <span className="kcta-rozet">
                <span className="kcta-nokta" />
                Tek ekip, tek muhatap
              </span>
            </FadeUp>

            <SplitWords
              as="h2"
              text="Şirketinizi bugün kuralım."
              accent="bugün kuralım."
              base={0.06}
              className="kcta-t"
            />

            <FadeUp delay={0.26}>
              <div className="kcta-eylem">
                <SmartLink
                  href="/basla"
                  className="btn btn-primary"
                  onClick={() => gtm("cta_start_click", { placement })}
                >
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.1} />
                </SmartLink>

                {/* İKİNCİ DÜĞME GERİ GELDİ. Müşteri: "kurulumu başlat tuşunun
                    yanına iletişime geç tuşu da koyalım dümenden."

                    K3 turunda kaldırılmıştı ve o turun kaydı yukarıdaki
                    blokta duruyor; kaldırılırken not edilen tek kayıp
                    `cta_meeting_click` olayının "footer" ve "final"
                    placement'larıydı, yani her sayfanın altındaki ölçüm
                    noktası. Aynı olay adı ve aynı hedefle geri konunca o
                    ölçüm noktası da geri geldi — Hero, Packages, HomeFaq ve
                    CountryFaq zaten bu olayı kendi placement'larıyla
                    çağırmaya devam ediyordu.

                    METİN DEĞİŞTİ: eski hâli "Ücretsiz danışmanlık" idi.
                    Ücretsiz olduğu bu sayfada hiçbir yerde doğrulanmıyor ve
                    firma adına bir taahhüt; müşterinin yazdığı ad ise düz ve
                    doğru. .btn-ghost gece yüzeyin kendi ikincil düğmesi
                    (sitenin hero'larında canlı): #080808 üstünde yazısı
                    14,60:1. /iletisim yayında (lib/routes.ts), yani SmartLink
                    onu sönük <span> değil gerçek bağlantı basıyor. */}
                <SmartLink
                  href="/iletisim"
                  className="btn btn-ghost"
                  onClick={() => gtm("cta_meeting_click", { placement })}
                >
                  İletişime Geç
                </SmartLink>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- sahne
          Kat sınırının kendisi: üstünde mesaj, altında dizin. `container-o`
          DIŞINDA duruyor, yani yaylar ekranın bir kenarından öbürüne
          gidiyor. Ölçü ve gerekçe kapanis-cta.css'te. */}
      <CtaSahne />
    </div>
  );
}

/** The site index. `hashClick` is optional: the sub-page footer passes a
 *  Lenis-aware handler for its "/#..." entries, the home footer needs none
 *  because every link here is a real route. */
export function Ft2Directory({
  cols = FT2_COLS,
  hashClick,
}: {
  cols?: typeof FT2_COLS;
  hashClick?: (href: string) => ((e: React.MouseEvent) => void) | undefined;
}) {
  return (
    <>
      <div className="container-o ft2-grid">
        <div className="ft2-brand">
          <Logo height={22} />
          <p>
            Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe. Tek elden,
            tek muhatapla.
          </p>
          <span className="ft2-meta">
            <MapPin size={14} strokeWidth={2.1} aria-hidden="true" />
            IFZA · Dubai Silicon Oasis
          </span>
          <span className="ft2-meta">
            <Mail size={14} strokeWidth={2.1} aria-hidden="true" />
            <a href="mailto:info@ortacglobal.com">info@ortacglobal.com</a>
          </span>
        </div>

        <div className="ft2-nav">
          {COUNTRY_ORDER.map((c) => (
            <nav key={c} className="ft2-col" aria-label={COUNTRY_NAME[c]}>
              <span className="ft2-h">{COUNTRY_NAME[c]}</span>
              {COUNTRY_SERVICES[c].map((s) => (
                <SmartLink key={s.key} href={s.href}>
                  {s.label}
                </SmartLink>
              ))}
            </nav>
          ))}

          {cols.map((col) => (
            <nav key={col.head} className="ft2-col" aria-label={col.head}>
              <span className="ft2-h">{col.head}</span>
              {col.links.map((l) => (
                <SmartLink key={l.label} href={l.href} onClick={hashClick?.(l.href)}>
                  {l.label}
                </SmartLink>
              ))}
            </nav>
          ))}
        </div>
      </div>

      <div className="container-o ft2-base">
        <p>© 2026 Ortac Global. Tüm hakları saklıdır.</p>
        <p className="ft2-legal">
          Bu sitedeki bilgiler genel bilgilendirme amaçlıdır; mali, hukuki veya vergi
          danışmanlığı yerine geçmez.
        </p>
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="ft2">
      <Ft2Cta />
      <div className="ft2-alt">
        <Ft2Directory />
      </div>
    </footer>
  );
}
