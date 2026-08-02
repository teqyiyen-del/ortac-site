import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import {
  FAMILY_LABEL,
  FAMILY_ORDER,
  LIVE_TOOLS,
  PLANNED_TOOLS,
  toolsOf,
  whyPlanned,
} from "@/lib/tools/catalog";

/* ============================================================================
   /araclar — ARAÇLARIN DİZİNİ
   ============================================================================

   BU SAYFA ARTIK BİR DİZİN, ARAÇLARIN KENDİSİ DEĞİL.

   Bir tur önce burası altı aracın tamamını tek sayfada, çapalarla basıyordu.
   Müşterinin kararı bunu tersine çevirdi: "her aracın ayrı sayfası olacak,
   hepsini tek bir sayfaya toplayıp içinde section yapma." Araçlar
   /araclar/<araç> adreslerine taşındı (app/araclar/[arac]/page.tsx) ve burada
   yalnızca kapıları kaldı.

   Kararın tek sayfadan daha iyi olmasının ölçülebilir sebebi de var: bu
   araçların işi arama trafiği çekmek ve tek sayfadaki bir çapa "dubai kurumlar
   vergisi hesaplama" sorgusunda sıralanamıyor. Her aracın kendi adresi, kendi
   <title>'ı ve kendi açıklaması var artık.

   YOL HARİTASI AYRI BİR BLOK DEĞİL, LİSTENİN İÇİNDE
   Planlanan araçlar eskiden sayfanın en altında ayrı bir kutudaydı. Şimdi ait
   oldukları ailenin içinde duruyorlar, çünkü ziyaretçinin sorusu "hangi
   hesaplayıcılar var" — cevabı da "ikisi hazır, ikisi oran teyidi bekliyor".
   Ayrı kutu bu cevabı sayfanın iki ucuna bölüyordu.

   Sönüklük elle basılmıyor: adresleri yayında olmadığı için SmartLink onları
   <span> olarak çıkarıyor ([data-soon], sitenin standart davranışı). Yani
   tıklanamıyorlar ve yakalayıcıya düşen tek bir bağlantı kalmıyor. Durum tek
   bir alandan (`status`) geliyor; araç yazıldığında yapılacak şey o alanı
   çevirmek ve lib/routes.ts'e bir satır eklemek.
   ========================================================================= */

const SITE = "https://ortacglobal.com";

const TITLE = "Araçlar — vergi hesaplayıcı, uygunluk testi, belge listesi | Ortac Global";
const DESCRIPTION =
  "Tarayıcınızda çalışan, girdiğiniz bilgiyi bize göndermeyen araçlar: BAE kurumlar vergisi ve KDV hesaplayıcı, ülke uygunluk testi, şirket ismi üreteci, üç ülke için belge kontrol listesi, kuruluş sonrası yükümlülük takvimi ve oturum izni giriş sayacı.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/araclar` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: `${SITE}/araclar`,
    title: TITLE,
    description: DESCRIPTION,
  },
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
          lead="Buradaki araçlar bizim satış yardımcılarımız değil, sizin işinizi gören şeyler: bir hesap, bir liste, bir takvim. Her biri kendi sayfasında; hepsi tarayıcınızda çalışıyor ve hiçbiri girdiğiniz bilgiyi bize göndermiyor."
        />

        <section className="tl-intro">
          <div className="container-o">
            {/* Sönük kartların çerçevesi. Bu cümle olmadan "Sırada" rozetleri
                ve altlarındaki teknik gerekçe, sayfada arıza gibi okunuyor. */}
            <FadeUp>
              <p className="tl-intro-n" data-lead="">
                Aşağıdaki araçların bir kısmı <b>kullanıma hazır</b>, bir kısmı <b>sırada</b>.
                Sırada olanların sayfası bilerek açılmadı ve tıklanamıyor; her birinin altında neyi
                beklediği yazıyor. Sebep zaman değil veri: teyit edilmemiş bir oranla hesap yapan
                araç, hiç olmayan araçtan kötüdür.
              </p>
            </FadeUp>

            {FAMILY_ORDER.map((f, gi) => {
              const items = toolsOf(f);
              if (items.length === 0) return null;
              return (
                <FadeUp key={f} delay={gi * 0.06}>
                  <div className="tl-group">
                    <h2 className="tl-group-h">
                      <b>{FAMILY_LABEL[f].head}</b>
                      <em>{FAMILY_LABEL[f].line}</em>
                    </h2>

                    <ul className="tl-ix">
                      {items.map((t) => {
                        const planned = t.status === "planned";
                        return (
                          <li key={t.id} className="tl-ix-i" data-planned={planned ? "" : undefined}>
                            {/* Kartın tamamı bağlantı. SmartLink yayında olmayan
                                adreste <span> basıyor, o yüzden içeride <p> gibi
                                blok etiketi yok — hepsi <span>. */}
                            <SmartLink href={t.href} className="tl-ix-a">
                              <span className="tl-ix-tag">
                                {planned ? "Sırada" : "Kullanıma hazır"}
                              </span>
                              <span className="tl-ix-t">{t.title}</span>
                              <span className="tl-ix-m">{t.meta}</span>
                              <span className="tl-ix-d">{t.is}</span>
                              <span className="tl-ix-go">
                                {planned ? (
                                  "Henüz yazılmadı"
                                ) : (
                                  <>
                                    Aracı açın
                                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                                  </>
                                )}
                              </span>
                            </SmartLink>

                            {/* Sönük kart tek başına "neden" demiyor; gerekçe
                                kartın dışında ve okunur kalıyor. Metin defterden,
                                elle yazılmıyor. */}
                            {planned && <p className="tl-ix-w">{whyPlanned(t)}</p>}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </FadeUp>
              );
            })}

            <FadeUp delay={0.24}>
              <p className="tl-intro-n">
                {LIVE_TOOLS.length} araç kullanıma hazır, {PLANNED_TOOLS.length} tanesi sırada.
                Hesaplayıcılar şimdilik yalnızca BAE için çalışıyor ve sebebi tercih değil veri:
                kullandıkları oran ve eşiklerin karşılığı depodaki vergi tablosunda var. İngiltere
                kurumlar vergisinde oran teyitsiz ve marjinal indirim eşiği hiçbir yerde yazmıyor;
                KKTC için ise sitenin kendi kararı oran yayımlamamak. Teyit edilmemiş bir oranla
                hesap yapan araç, hiç olmayan araçtan kötüdür.
              </p>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
