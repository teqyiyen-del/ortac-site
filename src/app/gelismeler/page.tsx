import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import KynTimeline from "@/components/kaynaklar/KynTimeline";
import {
  DRAFT_UPDATE_COPY,
  RESOURCE_KINDS,
  UPDATES,
  timelineRows,
  updateFilterOptions,
} from "@/lib/resources";

/* ============================================================================
   /gelismeler — zaman çizelgesi
   ============================================================================

   BU TURDA NE DEĞİŞTİ VE NEDEN

   Müşteri sayfanın iki şeyini birden eleştirdi:
     "şu üstteki örnektirler bir kayıt dört şeyi taşımadan yayınlanmıyor
      kısımlarını kaldır ya gerçekten bu kısım finalde nasıl gözükecek onu
      tasarlamanı istiyorum ne bu not düşme sevdası."
     "gelişmelerin kendisine ayrılan alanda çok fazla ayrıca şuan her kartın
      yüksekliği baya fazla."

   Kalkanlar — üçü de sayfanın kendisiyle ilgili değil, sayfanın HAKKINDA
   konuşan parçalardı:
     · "Bir kayıt dört şeyi taşımadan yayınlanmıyor" kural paneli (4 ikon,
       ~201px). İçerik standardını anlatıyordu; standardın yeri artık
       lib/resources.ts'in tip tanımları ve kaynak satırı, ekranın üstü değil.
     · "Aşağıdaki kayıtlar örnektir" uyarı paneli (~177px). İşini kayıt
       başına duran küçük "Örnek" rozeti devraldı.
     · Boş durum dalı (KynEmpty). Çizelgede yirmi iki kayıt var; hiç
       basılmayan bir dal, bir gün yanlışlıkla basılabilecek bir daldır.

   Kalan: hero + ülke seçici + eksen. Sayfa artık kendini anlatmıyor, işini
   yapıyor.

   ---------------------------------------------------------------------------
   YER TUTUCULAR VE KORUNAN SINIR

   Çizelgedeki yirmi iki kaydın hepsi yer tutucu ve ayrı bir tipte
   (`DraftUpdate`); `source` alanları hiç yok, yani `UPDATES` dizisine
   kopyalanamıyorlar. İçlerinde tek bir oran, tutar, eşik, yürürlük tarihi,
   kanun maddesi ya da kurum kararı YOK — hepsi konu başlığı düzeyinde ve
   ayrıntı alanları soru cümlesi (bkz. lib/resources.ts · DRAFT_UPDATES).

   Ekrandaki tek işaret kayıt başına duran küçük "Örnek" rozeti. Müşteri bunu
   açıkça kabul etti: "zaten koyduklarının içinde örnektir fln diye
   yazıyorsun."

   ---------------------------------------------------------------------------
   RİTİM — GL3 "MANŞET" (labdan seçildi: "gl3 ü de siteye alabilirsin")
   Kartın çerçevesi, zemini ve gölgesi YOK; kayıtları boşluk ve tipografik
   ölçek ayırıyor. Solda sabit genişlikte tarih sütunu duruyor ama ARTIK
   DİKEY EKSEN VE DÜĞÜM YOK — GL3'ün fikri tam olarak o çizgiyi kaldırmak.

   Ülke rengi kaybolmadı, taşıyıcısı büyüdü: 11px'lik bir düğümden 30px'lik
   gün rakamına geçti (ayrıca ülke adı ve bayrak halkası). Kayıtlar aya göre
   gruplu kalmaya devam ediyor.

   Feda edilen: kaydın sınırı. Çerçeve olmayınca nerede başlayıp bittiğini
   yalnızca boşluk söylüyor; yoğun aylarda kartlı düzenden zayıf bir sınır.
   Müşteriye bu bedel söylenerek seçildi.

   ÜLKE SEÇİCİ — KynTimeline içinde, bayraklı ve native radyo grubuyla.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const META = RESOURCE_KINDS.gelisme;

export const metadata: Metadata = {
  title: "Gelişmeler ve mevzuat — tarih sırasıyla | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC tarafında neyin ne zaman değiştiği; ülkeye göre süzülebilen zaman çizelgesi. Yayınlanan her kayıt resmî kaynağına bağlanır.",
  alternates: { canonical: `${SITE}/gelismeler` },
};

/* Seçenekler sunucuda hazırlanıp prop olarak geçiyor: istemci bileşeni
   resources.ts'i değer olarak import etmiyor (bkz. KynTimeline başlığı). */
const FILTERS = updateFilterOptions();

export default function GelismelerPage() {
  const rows = timelineRows();

  /* JSON-LD'ye YALNIZCA `UPDATES` giriyor ve bu ayrım tasarımdan bağımsız.
     Ekranda işaretlenmiş bir yer tutucu bir tasarım kararı; yapılandırılmış
     veriye girmiş bir yer tutucu arama motoruna verilmiş yanlış beyandır ve
     geri alınması kat kat zordur. Bugün dizi boş, o yüzden ItemList hiç
     yazılmıyor — sayfada yirmi iki kayıt görünüyor olması bunu değiştirmiyor. */
  const empty = UPDATES.length === 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Gelişmeler", item: `${SITE}/gelismeler` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Gelişmeler ve mevzuat",
        url: `${SITE}/gelismeler`,
        inLanguage: "tr-TR",
        description: META.job,
        ...(empty
          ? {}
          : {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: UPDATES.map((u, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: u.title,
                  url: u.source.url,
                })),
              },
            }),
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

        <PageHero
          crumb="Gelişmeler"
          title="Neyin ne zaman değiştiği."
          accent="ne zaman değiştiği."
          /* "Kartın üstüne tıklayınca" İDİ — GL3 canlıya alınınca sayfada kart
             kalmadı, kayıtları boşluk ayırıyor. Cümle ekranda görünen şeyi
             tarif etmeli, geçmişte görüneni değil. */
          lead="Kuruluş, vergi ve beyan tarafındaki değişiklikler tarih sırasıyla burada; ülke seçerek daraltabilirsiniz. Başlığa tıklayınca kaydın ayrıntısı açılıyor."
        />

        {/* Bölümün kendi dolgusu: `.sec-pad` bu sayfada 56-84px'lik bir üst
            boşluk veriyordu ve müşterinin "alan çok fazla" dediği şeyin bir
            parçası oydu. Eksen zaten kendi ritmini taşıyor. */}
        <section className="kyn-tl-sec">
          <div className="container-o">
            <KynTimeline rows={rows} filters={FILTERS} draftBadge={DRAFT_UPDATE_COPY.badge} />
          </div>
        </section>

        <KynSwitch current="gelisme" />
        <FinalCta />
      </main>
    </>
  );
}
