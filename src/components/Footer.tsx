"use client";

import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, Mail, MapPin } from "lucide-react";
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

/** The closing CTA — hero language: black surface, big type with a blue second
 *  half, two pill buttons, and one slow move behind it. Shared by the home
 *  footer and by FinalCta on the sub-pages.
 *
 *  KUTUYA DÖNÜLDÜ · "SAYFANIN SON KARTI". Müşterinin kararı, birebir: "cta yı
 *  A yap." /lab/cta'daki A adayı = Kutu. Bir tur önce tersi istenmişti ("şu
 *  cta kısmını bi box ile sınırlandırmak yerine full width mi yapsak"), yani
 *  bu bir gidiş geliş.
 *
 *  GİT'TEKİ ESKİ KUTUYA DÖNÜLMEDİ, bilerek. Labdaki Kutu yeni bir tasarım:
 *  gövdesi üç maddelik güven şeridi kalktıktan SONRAKİ gövde, dolguları ve
 *  glow tavanı o gövdeye göre yeniden ölçüldü, kart artık kenarlıksız (yüzey
 *  farkı ve kırağı çizgisi yetiyor). Seçilen o, eski hâli değil.
 *
 *  YAPISAL FARK TEK BİR ŞEY: `container-o` koyu panelin DIŞINDA. Tam genişlik
 *  tasarımında aynı kap panelin içindeydi ve yalnız yazıyı hizalıyordu; dışarı
 *  çıkınca panelin kendisini 1200 piksele sınırlıyor, yani kutuyu kuran şey o.
 *  İçerik ağacı, metin ve buton sırası hiç değişmedi.
 *
 *  AD ALANI DEĞİŞTİ: `.ft2-cta*` → `.kcta*` (src/app/css/kapanis-cta.css).
 *  Kazananın labdaki adı `.ctal-` idi ve o önek canlıya alınamazdı: lab-cta.css
 *  hâlâ globals.css'in @import bloğunda, aynı adlar iki dosyada sessizce
 *  ezişirdi. Eski `.ft2-cta*` kuralları globals.css'ten silindi.
 *
 *  Izgara ve glow `.kcta-kart`ın `overflow: clip`iyle kırpılıyor; ikisi de
 *  kabın dışına taşacak biçimde konumlu (`inset: -80px`). Kırpma ayrıca
 *  köşeleri yuvarlıyor, yani üstteki kırağı çizgisi köşeyi kesmiyor. */
export function Ft2Cta({ placement = "footer" }: { placement?: string }) {
  return (
    <div className="kcta">
      <div className="container-o">
        <div className="kcta-kart">
          <div className="kcta-bg" aria-hidden="true">
            <span className="kcta-glow" />
            <span className="kcta-grid" />
            <span className="kcta-seam" />
          </div>

          <div className="kcta-in">
            <SplitWords
              as="h2"
              text="Kurulumunuzu bugün başlatalım."
              accent="bugün başlatalım."
              base={0.06}
              className="kcta-t"
            />

            <FadeUp delay={0.26}>
              <p className="kcta-l">
                Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe.
                <br />
                Tek ekip, tek muhatap, baştan sona Türkçe.
              </p>
            </FadeUp>

            <FadeUp delay={0.34}>
              <div className="kcta-btns">
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
          </div>
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
