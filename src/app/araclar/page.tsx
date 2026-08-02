import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import FadeUp from "@/components/shared/FadeUp";
import ToolShell from "@/components/tools/ToolShell";
import EntryCounter from "@/components/tools/EntryCounter";
import ObligationCalendar from "@/components/tools/ObligationCalendar";
import DocChecklist from "@/components/tools/DocChecklist";
import { TOOL_BY_ID, TOOL_CATALOG } from "@/lib/tools/catalog";

/* ============================================================================
   /araclar — araçların gerçek sayfası
   ============================================================================

   BU SAYFA NEDEN ŞİMDİ VAR
   Site aylardır üç yerden "Araçlar"a bağlanıyordu ama /araclar diye bir sayfa
   hiç yazılmamıştı. Kimsenin fark etmemesinin sebebi app/[...yapim]
   yakalayıcısı: inşa edilmemiş her adres oraya düşüyor ve "yapım aşamasında"
   kartını HTTP 200 ile basıyor. Yani bağlantı ölüydü ama hiçbir durum kodu
   kontrolü bunu yakalayamıyordu. Sayfanın kendisi artık burada; yakalayıcıya
   düşen bir "araç" kalmadı.

   BÖLÜMÜN İŞİ DEĞİŞTİ
   Eskiden Araçlar başlığı altında uygunluk testi, maliyet hesaplayıcı ve
   ödeme altyapısı matrisi duruyordu. Üçü de karar araçları, yani bizim satış
   yardımcılarımız — ve üçü de sitenin içine zaten dağıtılmış durumda: test
   hero'da ve navbar'da, maliyet ülke sayfalarının fiyat bölümünde, matris
   /ulkeler'in kıyas tablosunda. Bu sayfa onların kopyası değil; ziyaretçinin
   kendi işi için kullanacağı, çıktısı elinde kalan araçları topluyor.

   ÜÇ ARACIN İKİSİ NEDEN YALNIZCA DUBAİ
   Çünkü depoda doğrulanmış veri o kadar. afterSetup.ts yalnızca Dubai'yi
   taşıyor; İngiltere'nin kurumlar vergisi oranı countryContent.ts'te
   SWAP:UK_CT_RATE ile teyitsiz işaretli, KKTC'de zaten rakam yayınlanmıyor.
   Bir aracı olmayan veriyle üç ülkeye yaymak, üç ülke için de yanlış olurdu.
   Belge listesi üçünü birden kapsıyor, çünkü verisi üçünde de dolu.
   ========================================================================= */

export const metadata: Metadata = {
  title: "Araçlar — oturum sayacı, yükümlülük takvimi ve belge listesi | Ortac Global",
  description:
    "Kullanınca elinizde bir çıktı kalan araçlar: BAE oturum izni giriş sayacı, kuruluş sonrası ilk 12 ayın yükümlülük takvimi ve üç ülke için belge kontrol listesi.",
};

export default function AraclarPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb="Araçlar"
          title="Kullanın, çıktısı sizde kalsın."
          accent="çıktısı sizde kalsın."
          lead="Buradaki araçlar bizim satış yardımcılarımız değil, sizin işinizi gören şeyler: bir tarih, bir takvim, bir liste. Hepsi tarayıcınızda çalışıyor, hiçbiri girdiğiniz bilgiyi bize göndermiyor."
        />

        {/* Sayfanın dizini. Üç aracın da adı ve ne olduğu tek ekranda görünsün
            diye: aşağısı üç uzun panel, hangisinin ne olduğunu kaydırarak
            keşfettirmek gereksiz. Çapalar ToolShell'in bastığı id'lere iniyor,
            yani liste ile bölümler tek kaynaktan (lib/tools/catalog.ts). */}
        <section className="tl-intro">
          <div className="container-o">
            <FadeUp>
              <ol className="tl-index">
                {TOOL_CATALOG.map((t, i) => (
                  <li key={t.id} className="tl-index-i">
                    <a href={`#${t.id}`} className="tl-index-a">
                      <span className="tl-index-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="tl-index-b">
                        <b>{t.title}</b>
                        <em>{t.meta}</em>
                      </span>
                      <ArrowDown size={16} strokeWidth={2.1} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="tl-intro-n">
                Üç aracın ikisi yalnızca Dubai için çalışıyor. Sebebi tercih değil veri: kuruluş
                sonrası yükümlülük takvimi ve oturum kuralı elimizde yalnızca Dubai için
                doğrulanmış durumda. İngiltere ve KKTC için aynı veriyi teyit etmeden araç
                yazmıyoruz.
              </p>
            </FadeUp>
          </div>
        </section>

        <ToolShell tool={TOOL_BY_ID["oturum-sayaci"]} index={0}>
          <EntryCounter />
        </ToolShell>

        <ToolShell tool={TOOL_BY_ID["yukumluluk-takvimi"]} index={1}>
          <ObligationCalendar />
        </ToolShell>

        <ToolShell tool={TOOL_BY_ID["belge-listesi"]} index={2}>
          <DocChecklist />
        </ToolShell>

        <FinalCta />
      </main>
    </>
  );
}
