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
import { sayiYaziyla } from "@/lib/tools/num";

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

/* 11.09.2026 · defter daraldı (lib/tools/catalog.ts · "DEFTER DARALDI"). Eski
   açıklama kaldırılan üç aracı (belge listesi, yükümlülük takvimi, oturum
   sayacı) sayıyordu ve "girdiğiniz bilgiyi bize göndermeyen araçlar" diyordu —
   İngiltere isim sorgulaması ismi sunucumuz üzerinden Companies House'a
   sorduğu için artık yanlıştı. */
const TITLE = "Araçlar — kurumlar vergisi, SIC kodu, şirket ismi | Ortac Global";
const DESCRIPTION =
  "Dubai, İngiltere ve KKTC için kurumlar vergisi hesaplayıcı, BAE KDV hesaplayıcı, İngiltere SIC kodu bulucu, İngiltere şirket ismi sorgulama, şirket ismi üreteci ve ülke uygunluk testi.";

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
          title="Araçlar, çıktısı sizde kalır."
          accent="çıktısı sizde kalır."
          lead="Buradaki araçlar bir satış aracı değil, işinizi kolaylaştıran uygulamalar: bir hesaplama, bir liste, bir takvim. Her biri kendi sayfasında; hepsi tarayıcınızda çalışıyor ve girdiğiniz bilgiyi bize göndermiyor."
        />

        <section className="tl-intro">
          <div className="container-o">
            {/* Sönük kartların çerçevesi. Bu cümle olmadan "Sırada" rozetleri
                ve altlarındaki teknik gerekçe, sayfada arıza gibi okunuyor. */}
            <FadeUp>
              {/* "Bir kısmı hazır, bir kısmı sırada" cümlesi 11.09.2026'da gitti:
                  defterde planlanan araç kalmadı. Bir gün yeniden eklenirse
                  aşağıdaki sayım paragrafı "sırada" kuyruğunu kendisi basıyor. */}
              <p className="tl-intro-n" data-lead="">
                Her araç kendi sayfasında çalışıyor ve her birinin altında ne olmadığı yazıyor. Vergi
                hesaplayıcılarının oranları resmî kaynaktan; müşavir teyidi gelene kadar sonucun
                altında bunu söylüyorlar.
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
              {/* 11.09.2026 · BU PARAGRAF GERÇEĞE GÖRE YENİDEN YAZILDI. Eski hâli
                  "Hesaplayıcılar şimdilik yalnızca BAE için çalışıyor … İngiltere
                  kurumlar vergisinde … marjinal indirim eşiği hiçbir yerde
                  yazmıyor" diyordu. İkisi de artık yanlış: kurumlar vergisi aracı
                  ülke seçimli ve İngiltere değerleri GOV.UK'nin kendi tablosundan
                  (lib/tools/rates.ts · UK_CT). KKTC cümlesi DOĞRUYDU ve kaldı.

                  "Teyit edilmemiş bir oranla hesap yapan araç, hiç olmayan
                  araçtan kötüdür" cümlesi ÇIKTI: araçlar bugün teyit bekleyen
                  oranla hesap yapıyor ve bunu sonucun altında söylüyor
                  (rates.ts · confirmed:false sözleşmesi). Cümle kalsaydı sayfa
                  kendi araçlarını kötülemiş olurdu.

                  Sayılar yazıyla ve "sırada" kuyruğu koşullu: defter bu turda
                  daraldı ve planlanan araç kalmadı; "altı araç kullanıma hazır,
                  sıfır tanesi sırada" yazmak olmayan bir yol haritasını anardı. */}
              <p className="tl-intro-n">
                {sayiYaziyla(LIVE_TOOLS.length, true)} araç kullanıma hazır
                {PLANNED_TOOLS.length > 0 && `, ${sayiYaziyla(PLANNED_TOOLS.length)} tanesi sırada`}.
                Kurumlar vergisi hesaplayıcısında üç ülke var ve üçü aynı biçimde çalışmıyor:
                Dubai&apos;nin oranı ve eşiği sitede yayımlanan çerçeveden, İngiltere&apos;ninkiler
                GOV.UK&apos;nin resmî tablosundan geliyor. İkisi de henüz mali müşavir onayından
                geçmedi ve araç bunu sonucun altında yazıyor. KKTC seçildiğinde hesap yapılmıyor,
                çünkü sitenin kararı KKTC için oran yayımlamamak: oran ve istisnalar faaliyet
                konusuna göre değişiyor.
              </p>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
