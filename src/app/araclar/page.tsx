import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import ToolShell from "@/components/tools/ToolShell";
import UaeCorporateTax from "@/components/tools/UaeCorporateTax";
import UaeVat from "@/components/tools/UaeVat";
import NameForge from "@/components/tools/NameForge";
import EntryCounter from "@/components/tools/EntryCounter";
import ObligationCalendar from "@/components/tools/ObligationCalendar";
import DocChecklist from "@/components/tools/DocChecklist";
import {
  FAMILY_LABEL,
  FAMILY_ORDER,
  LIVE_TOOLS,
  PLANNED_TOOLS,
  liveToolsOf,
  type ToolId,
} from "@/lib/tools/catalog";

/* ============================================================================
   /araclar — araçların gerçek sayfası
   ============================================================================

   BU SAYFA NEDEN VAR
   Site aylardır üç yerden "Araçlar"a bağlanıyordu ama /araclar diye bir sayfa
   hiç yazılmamıştı. Kimsenin fark etmemesinin sebebi app/[...yapim]
   yakalayıcısı: inşa edilmemiş her adres oraya düşüyor ve "yapım aşamasında"
   kartını HTTP 200 ile basıyor. Yani bağlantı ölüydü ama hiçbir durum kodu
   kontrolü bunu yakalayamıyordu.

   BU TURDA AĞIRLIK HUNİNİN TEPESİNE KAYDI
   Sayfadaki ilk üç araç kuruluş SONRASINA aitti (oturum sayacı, yükümlülük
   takvimi, belge listesi) — belgenin huni haritasında (s.4) en dipteki aile,
   yani "mevcut müşteriyi geri getiren" araçlar. Müşterinin bu turdaki cümlesi
   tam tersini istiyor: "aramadan trafik çekebilecek araçlardan bahsediyorum
   biraz daha ağırlıklı." Belgenin aynı haritasında o iş vergi hesaplayıcılarına
   düşüyor (huni TEPESİ).

   O yüzden sayfanın SIRASI değişti: önce hesaplayıcılar, sonra karar araçları,
   en sonda kuruluş sonrası. Eski üç araç kaldırılmadı — hâlâ çalışıyorlar ve
   hâlâ doğrular; yalnızca huninin doğru yerine oturdular. Sıra kayıt
   defterinden geliyor (lib/tools/catalog.ts · FAMILY_ORDER), bu dosyada elle
   dizilmiş bir liste yok.

   ÜLKE SEKMESİ YOK — VE BU BİR KARAR
   Gerekçenin uzunu catalog.ts'in başında. Kısası: her araç ülkeye bağlı değil
   (isim üreteci hiç değil, belge listesi üç ülkeyi BİRLİKTE gösterdiği için
   var), ve ülkeye bağlı olanların ülkesi zaten adında yazıyor. Ülke seçimi,
   ihtiyaç duyan aracın kendi içinde ve görünen kutucuklarla.
   ========================================================================= */

export const metadata: Metadata = {
  title: "Araçlar — BAE kurumlar vergisi, KDV, isim üreteci ve kuruluş takvimi | Ortac Global",
  description:
    "Tarayıcınızda çalışan, hiçbir bilgiyi bize göndermeyen araçlar: BAE kurumlar vergisi ve KDV hesaplayıcı, şirket ismi üreteci, üç ülke için belge kontrol listesi, kuruluş sonrası yükümlülük takvimi ve oturum izni giriş sayacı.",
};

/* Araç kimliği → bileşen. Kayıt defteri "hangi araç var" sorusunu, bu tablo
   "onu kim çiziyor" sorusunu cevaplıyor. Record<ToolId,…> değil kısmî bir
   tablo: planlanan araçların bileşeni yok ve olmamalı. */
const RENDERERS: Partial<Record<ToolId, React.ReactNode>> = {
  "bae-kurumlar-vergisi": <UaeCorporateTax />,
  "bae-kdv": <UaeVat />,
  "isim-ureteci": <NameForge />,
  "belge-listesi": <DocChecklist />,
  "yukumluluk-takvimi": <ObligationCalendar />,
  "oturum-sayaci": <EntryCounter />,
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
          lead="Buradaki araçlar bizim satış yardımcılarımız değil, sizin işinizi gören şeyler: bir hesap, bir liste, bir takvim. Hepsi tarayıcınızda çalışıyor, hiçbiri girdiğiniz bilgiyi bize göndermiyor."
        />

        {/* Sayfanın dizini, huni ailelerine göre gruplu. Altı aracın adı ve ne
            olduğu tek ekranda görünsün diye: aşağısı altı uzun panel, hangisinin
            ne olduğunu kaydırarak keşfettirmek gereksiz. Çapalar ToolShell'in
            bastığı id'lere iniyor, yani liste ile bölümler tek kaynaktan. */}
        <section className="tl-intro">
          <div className="container-o">
            {FAMILY_ORDER.map((f, gi) => {
              const items = liveToolsOf(f);
              if (items.length === 0) return null;
              return (
                <FadeUp key={f} delay={gi * 0.06}>
                  <div className="tl-group">
                    <p className="tl-group-h">
                      <b>{FAMILY_LABEL[f].head}</b>
                      <em>{FAMILY_LABEL[f].line}</em>
                    </p>
                    <ol className="tl-index">
                      {items.map((t) => (
                        <li key={t.id} className="tl-index-i">
                          <a href={`#${t.id}`} className="tl-index-a">
                            <span className="tl-index-n">
                              {String(LIVE_TOOLS.indexOf(t) + 1).padStart(2, "0")}
                            </span>
                            <span className="tl-index-b">
                              <b>{t.title}</b>
                              <em>{t.meta}</em>
                            </span>
                            <ArrowDown size={16} strokeWidth={2.1} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </FadeUp>
              );
            })}

            <FadeUp delay={0.24}>
              <p className="tl-intro-n">
                Hesaplayıcılar şimdilik yalnızca BAE için çalışıyor. Sebebi tercih değil veri:
                kullandıkları oran ve eşiklerin karşılığı depodaki vergi tablosunda var. İngiltere
                kurumlar vergisinde oran teyitsiz ve marjinal indirim eşiği hiçbir yerde yazmıyor;
                KKTC için ise sitenin kendi kararı oran yayımlamamak. Teyit edilmemiş bir oranla
                hesap yapan araç, hiç olmayan araçtan kötüdür.
              </p>
            </FadeUp>
          </div>
        </section>

        {LIVE_TOOLS.map((t, i) => (
          <ToolShell key={t.id} tool={t} index={i}>
            {RENDERERS[t.id]}
          </ToolShell>
        ))}

        {/* YOL HARİTASI — menüde değil burada.
            Menü bir dolaşım yüzeyi; planlanan her aracı oraya koymak paneli bir
            "yakında" duvarına çevirirdi (menüde yalnızca iki tanesi var, bkz.
            catalog.ts · karar 3). Ama listenin tamamının görünür olması lazım:
            müşteri belgede yirmi araç önerdi ve hangilerinin neden beklediğini
            görmek istiyor. Bağlantılar SmartLink, adresleri henüz yayında
            değil, o yüzden sönük ve tıklanamaz çıkıyorlar — durum tek bir
            alandan (`status`) geliyor, elle rozet basılmıyor. */}
        <section className="tl-sec" data-alt={LIVE_TOOLS.length % 2 === 0 ? "" : undefined}>
          <div className="container-o">
            <div className="tl-head">
              <span className="tl-kicker">Yol haritası</span>
              <h2 className="h2 tl-title">
                Sırada bekleyenler ve <span className="text-accent">neyi bekledikleri.</span>
              </h2>
              <p className="tl-lead">
                Aşağıdakiler yazılmadı. Sebep zaman değil veri: her birinin yanında hangi rakamın ya
                da hangi kararın beklendiği yazıyor. Bir satır çözüldüğünde araç aynı hafta çıkıyor.
              </p>
            </div>

            <ul className="tl-soon">
              {PLANNED_TOOLS.map((t) => (
                <li key={t.id} className="tl-soon-i">
                  <SmartLink href={t.href} className="tl-soon-a">
                    <b>{t.title}</b>
                    <em>{t.meta}</em>
                  </SmartLink>
                  <p className="tl-soon-w">{t.source.replace(/^YAZILMADI — /, "")}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
