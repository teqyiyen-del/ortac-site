"use client";

import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, Clock, FileText, Mail, MapPin, ShieldCheck } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import Logo from "@/components/shared/Logo";
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

/* Butonların altındaki üç satır — iddia değil, çalışma biçimi beyanı.

   ÜÇÜNCÜSÜ BU TURDA DEĞİŞTİ. Eskiden "Dubai'deki kendi ofisimizden" yazıyordu
   ve müşteri haklı olarak çıkarttı: "cta nötr bi alan olduğu için bir ülkeyi
   öne çıkaran bir avantaj atmasın."

   Gerekçe yalnızca üslup değil, YER. Bu blok hem ana sayfanın kapanışında hem
   FinalCta üzerinden bütün alt sayfalarda basılıyor — yani /ingiltere'nin ve
   /kktc'nin altında da. Üç ülkenin ortak zemininde tek bir ülkenin avantajını
   duyurmak, o iki sayfayı kendi kapanışında ikinci sıraya düşürüyordu.

   Yerine gelen satır üç kısıtı birden karşılıyor: ülke-nötr, doğrulanmış, ve
   diğer ikisiyle çakışmıyor. Ayrıca CTA'nın kendi alt satırının söylemediği
   bir şey söylüyor — o satır "tek ekip, tek muhatap, baştan sona Türkçe"
   diyor, yani ŞİMDİYİ anlatıyor; bu ise sitenin ana tezini, kuruluştan
   SONRASINI. (bkz. ana sayfa · "Kuruluş bir halka, zincir devam ediyor")

   Dubai ofisi iddiası kaybolmadı: ülkeye özel olduğu yerlerde duruyor —
   /dubai sayfası, Hakkımızda ve ana sayfanın kanıt şeridi. */
export const FT2_POINTS = [
  { Icon: Clock, t: "Ücretsiz ilk değerlendirme" },
  { Icon: FileText, t: "Kapsam ve fiyat yazılı" },
  { Icon: ShieldCheck, t: "Kuruluş sonrası da aynı ekip" },
];

/** The closing CTA — hero language: black surface, big type with a blue second
 *  half, two pill buttons, and one slow move behind it. Shared by the home
 *  footer and by FinalCta on the sub-pages.
 *
 *  TAM GENİŞLİK · KAP İÇERİ ALINDI. Müşterinin kararı: "şu cta kısmını bi box
 *  ile sınırlandırmak yerine full width mi yapsak ya orayı kople kaplasın hep
 *  footera geçmeden önce güzel bir alan olmuş olur bence iyi durur."
 *
 *  Değişen tek şey `container-o`nun YERİ: eskiden koyu panelin DIŞINDAYDI ve
 *  paneli 1200 pikselle sınırlıyordu, artık İÇİNDE ve yalnızca yazıyı
 *  hizalıyor. Panel kenardan kenara, metin ise sitenin geri kalanıyla aynı
 *  hatta. İçerik ağacı, buton sırası ve güven satırları hiç değişmedi.
 *
 *  Izgara ve glow hâlâ `.ft2-cta`nın `overflow: clip`i ile kırpılıyor; ikisi
 *  de kabın dışına taşacak biçimde konumlu (`inset: -80px`) ve kutu kalkınca o
 *  kırpma daha da kritik oldu — kap artık viewport genişliğinde. */
export function Ft2Cta({ placement = "footer" }: { placement?: string }) {
  return (
    <div className="ft2-cta">
      <div className="ft2-cta-bg" aria-hidden="true">
        <span className="ft2-cta-glow" />
        <span className="ft2-cta-grid" />
        <span className="ft2-cta-seam" />
      </div>

      <div className="container-o">
        <div className="ft2-cta-in">
          <SplitWords
            as="h2"
            text="Kurulumunuzu bugün başlatalım."
            accent="bugün başlatalım."
            base={0.06}
            className="ft2-cta-t"
          />

          <FadeUp delay={0.26}>
            <p className="ft2-cta-l">
              Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe.
              <br />
              Tek ekip, tek muhatap, baştan sona Türkçe.
            </p>
          </FadeUp>

          <FadeUp delay={0.34}>
            <div className="ft2-cta-btns">
              <SmartLink
                href="/basla"
                className="btn btn-primary"
                onClick={() => gtm("cta_start_click", { placement })}
              >
                Kurulumu Başlat
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
              <SmartLink
                href="/iletisim"
                className="btn btn-ghost"
                onClick={() => gtm("cta_meeting_click", { placement })}
              >
                Ücretsiz danışmanlık
              </SmartLink>
            </div>
          </FadeUp>

          <FadeUp delay={0.42} className="ft2-cta-ptsw">
            <ul className="ft2-cta-pts">
              {FT2_POINTS.map((p) => (
                <li key={p.t} className="ft2-cta-pt">
                  <p.Icon size={15} strokeWidth={2.1} aria-hidden="true" />
                  {p.t}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
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
      <Ft2Directory />
    </footer>
  );
}
