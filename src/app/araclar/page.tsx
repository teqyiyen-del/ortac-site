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
import { TOOL_ICON } from "@/lib/tools/ikonlar";
import { sayiYaziyla } from "@/lib/tools/num";
import { SITE } from "@/lib/routes";

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

/* Kök adres lib/routes.ts · SITE'tan (11.09.2026 · site haritasıyla birlikte
   tek kaynağa alındı; sabitin değeri bu dosyadaki eski kopyanın aynısı). */

/* 11.09.2026 · defter daraldı (lib/tools/catalog.ts · "DEFTER DARALDI"). Eski
   açıklama kaldırılan üç aracı (belge listesi, yükümlülük takvimi, oturum
   sayacı) sayıyordu ve "girdiğiniz bilgiyi bize göndermeyen araçlar" diyordu —
   İngiltere isim sorgulaması ismi sunucumuz üzerinden Companies House'a
   sorduğu için artık yanlıştı. */
/* Dizinin gizlilik cümlesi defterden türüyor, elle yazılmıyor: bir gün başka
   bir araç da sunucuya çıkarsa cümle kendiliğinden düzeliyor. Kalıp ToolShell'in
   araç başına bastığı cümlenin dizin karşılığı. */
const SUNUCULU = LIVE_TOOLS.filter((t) => t.sunucu);
const ARAC_GIZLILIK =
  SUNUCULU.length === 0
    ? "Buradaki araçlar bir satış aracı değil, işinizi kolaylaştıran uygulamalar: bir hesaplama, bir liste, bir takvim. Her biri kendi sayfasında ve hepsi tarayıcınızda çalışıyor; girdiğiniz bilgi bize gelmiyor."
    : `Buradaki araçlar bir satış aracı değil, işinizi kolaylaştıran uygulamalar: bir hesaplama, bir liste, bir takvim. Her biri kendi sayfasında. ${SUNUCULU.map((t) => t.title).join(" ve ")} dışındakiler tarayıcınızda çalışıyor ve girdiğiniz bilgi bize gelmiyor; ${SUNUCULU.map((t) => t.sunucu!.kisa.replace(/\.?$/, ".")).join(" ")}`;

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
        {/* 18.09.2026 · BAŞLIK VE GİRİŞ. Burak: "araçlar çıktısı sizde kalır,
            bu bir kere güzel başlık değil, karşı tarafa konuşuyormuşuz gibi …
            SEO açısından hiç hoş değil, başlıkta konu neyse onu yaz. bir de
            onun altında bir paragraf açıklama yazmışsın, gereksiz."

            Başlık artık sayfanın konusunu söylüyor ve metadata'daki başlıkla
            aynı dilde ("Araçlar — kurumlar vergisi, SIC kodu, şirket ismi").
            Giriş tek cümle: ne olduğu ve kimin için olduğu.

            GİZLİLİK CÜMLESİ SİLİNMEDİ, TAŞINDI. Altı satırlık hâli hero'da
            duruyordu; artık listenin altındaki açılırın içinde (ARAC_GIZLILIK
            hâlâ defterden türüyor, yani bir araç sunucuya çıkarsa cümle
            kendiliğinden düzeliyor). Aynı cümle her aracın kendi sayfasında
            zaten ayrıca basılıyor (ToolShell · yerellikCumlesi). */}
        <PageHero
          crumb="Araçlar"
          title="Kuruluş ve vergi araçları."
          accent="vergi araçları."
          lead="Dubai, İngiltere ve KKTC için hesaplayıcılar ve karar araçları; her biri kendi sayfasında."
        />

        <section className="tl-intro">
          <div className="container-o">
            {/* Sönük kartların çerçevesi. Bu cümle olmadan "Sırada" rozetleri
                ve altlarındaki teknik gerekçe, sayfada arıza gibi okunuyor. */}
            {/* SİLİNDİ · giriş paragrafı (18.09.2026). "Her araç kendi
                sayfasında çalışıyor ve her birinin altında ne olmadığı yazıyor
                …" diyordu. Burak: "sitede bir sürü yazı var." Söylediği iki şey
                de yerinde duruyor: aracın ne olmadığı aracın kendi sayfasında,
                oran teyidi de sonucun altında. Dizin sayfasının bunu baştan
                anlatması gerekmiyor. */}

            {FAMILY_ORDER.map((f, gi) => {
              const items = toolsOf(f);
              if (items.length === 0) return null;
              return (
                <FadeUp key={f} delay={gi * 0.06} className="tl-group-w">
                  <div className="tl-group">
                    {/* 18.09.2026 · GRUP BAŞLIĞININ ALT SATIRI KALKTI. Burak:
                        "karar araçlarını ayrı bir yere koyman gerekiyor, o
                        tekstler birbirine girmiş." Grup adının altındaki
                        açıklama cümlesi ("Bir değer giriyor, karşılığında bir
                        sonuç alıyorsunuz.") iki grubu ayırmak yerine iki
                        grubun arasını yazıyla dolduruyordu. Ayrımı artık
                        boşluk ve başlığın kendisi taşıyor. FAMILY_LABEL.line
                        defterde duruyor, başka bir yerde gerekirse hazır. */}
                    <h2 className="tl-group-h">
                      <b>{FAMILY_LABEL[f].head}</b>
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
                              {/* 18.09.2026 · İKON GELDİ, ÜÇ SATIRLIK AÇIKLAMA
                                  GİTTİ. Burak: "bunların hiçbiri ayrışmıyor …
                                  ikondur odur budur, biraz süsleyebilirsin" ve
                                  "sitede bir sürü yazı var".

                                  Kartta kalan şey aracın kimliği: ikon, ad,
                                  tek satır künye, çıkış. `t.is` (üç satırlık
                                  "ne yapıyor" metni) aracın KENDİ sayfasında
                                  zaten başlığın altında duruyor; dizinde yedi
                                  kez tekrar etmesi ızgarayı okunmaz yapıyordu.

                                  İkon eşlemesi lib/tools/ikonlar.ts'te, yani
                                  menüyle aynı kaynaktan. */}
                              <span className="tl-ix-ic" aria-hidden="true">
                                {(() => {
                                  const Ikon = TOOL_ICON[t.id];
                                  return <Ikon size={18} strokeWidth={1.9} />;
                                })()}
                              </span>
                              {/* 18.09.2026 · "Kullanıma hazır" ROZETİ YALNIZ
                                  FARK VARSA. Defterde planlanan araç kalmadığı
                                  için yedi kartın yedisinde de aynı rozet
                                  duruyordu: hiçbir şey ayırt etmiyor, yalnız
                                  ızgarayı kalabalıklaştırıyordu. Rozet artık
                                  yalnız "Sırada" olanlarda basılıyor — yani
                                  bir şey SÖYLEDİĞİNDE. Defter yeniden
                                  planlanan araç taşırsa rozet kendiliğinden
                                  geri gelir. */}
                              {planned && <span className="tl-ix-tag">Sırada</span>}
                              <span className="tl-ix-t">{t.title}</span>
                              <span className="tl-ix-m">{t.meta}</span>
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

            {/* 18.09.2026 · EN ALTTAKİ PARAGRAF AÇILIRIN İÇİNE GİRDİ.
                Burak: "en altta yine bir yazı var, 7 araç kullanıma hazır
                falan filan, buna da gerek yok."

                Paragrafın söyledikleri yanlış değil ve bir kısmı gerçekten
                gerekli (iki hesaplayıcının farkı, oranların teyit durumu,
                KKTC'de neden hesaplayıcı olmadığı, hangi aracın sunucuya
                çıktığı). Silinmedi, MERAKLISINA taşındı: kapalı bir açılır,
                sayfanın dibinde tek satır.

                Metinlerin ikisi de defterden türüyor (ARAC_GIZLILIK ve araç
                sayıları), yani defter değişince kendiliğinden düzeliyorlar. */}
            <FadeUp delay={0.24}>
              <details className="tl-more">
                <summary>
                  Araçlar hakkında: oranlar, kaynaklar ve gizlilik
                  <span className="tl-more-x" aria-hidden="true" />
                </summary>
                <div className="tl-more-d">
                  <p>{ARAC_GIZLILIK}</p>
                  <p>
                    {sayiYaziyla(LIVE_TOOLS.length, true)} araç kullanıma hazır
                    {PLANNED_TOOLS.length > 0 &&
                      `, ${sayiYaziyla(PLANNED_TOOLS.length)} tanesi sırada`}
                    . Kurumlar vergisi iki ayrı hesaplayıcı ve ikisi aynı biçimde çalışmıyor:
                    Dubai&apos;nin oranı ve eşiği sitede yayımlanan çerçeveden,
                    İngiltere&apos;ninki GOV.UK&apos;nin resmî tablosundan geliyor ve orada oran
                    kârın tamamına uygulanıp iki eşik arasında marjinal indirim devreye giriyor.
                    İkisi de henüz mali müşavir onayından geçmedi ve araç bunu sonucun altında
                    yazıyor. KKTC için hesaplayıcı yok: sitenin kararı KKTC&apos;de oran
                    yayımlamamak, çünkü oran ve istisnalar faaliyet konusuna göre değişiyor.
                  </p>
                </div>
              </details>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
