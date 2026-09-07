import { ArrowRight, BookOpen, Receipt, BarChart3, Archive, Check, X } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { RHYTHM_LABEL, type Inclusion } from "@/lib/afterSetup";
import { accountingItems, ACC_PRICE_FOOTNOTE } from "@/lib/accountingDubai";
import { AYRIM, FIYAT, NE } from "@/app/lab/muhasebe/veri";

/* Muhasebe sayfasının üç "tarayarak anlaşılır" bloğu.
 *
 * Kural tek: her blok TEK BAKIŞTA anlaşılsın. Uygulaması üç kısıt (gerekçe
 * ve ölçüm app/lab/muhasebe/veri.ts'in başında):
 *   · kapsam karosu   → bir kelime + en fazla altı kelime
 *   · dahil/hariç     → kalem başına en fazla dört kelime, cümle yok
 *   · bölüm lead'i    → tek satır
 *
 * Canlı sayfada bu üç bloğun karşılığı 5 aşamalı bir akordiyon + bir takas
 * paneli + bir sınır şeridi + ayrı bir fiyat bölümü; toplam 17 <details> ve
 * 19 uzun paragraf. Burada <details> yalnız fiyat satırlarında kaldı, çünkü
 * orada tıklamanın arkasına giren şey gerçekten ayrıntı.
 */

const KAPSAM_IKON = [BookOpen, Receipt, BarChart3, Archive];

/* ROZET BU SAYFAYA AİT, PAYLAŞILAN ETİKET DEĞİL.
   afterSetup.ts'in INCLUSION_LABEL'ı "İlk yıl toplamında" diyor ve bu etiket
   /dubai'deki ÖRNEK HESABA işaret ediyor. O hesap bu sayfada YOK; üstelik
   bölümün kendi lead'i "tek bir toplam yazmıyoruz" diyor. Yani canlı sayfada
   üç satır, hemen üstündeki cümleyle doğrudan çelişen bir rozet taşıyor.

   Buradaki üç etiket aynı veriyi bu sayfanın sorusuna göre okuyor: kalem
   herkeste doğuyor mu, yoksa şart oluşursa mı? Tarayan gözün aradığı ayrım
   bu. Veri alanı (`inclusion`) değişmedi, yalnız okunuşu değişti. */
const ROZET: Record<Inclusion, string> = {
  ornekte: "Herkeste doğuyor",
  "gerekli-ise": "Gerekli ise",
  "istege-bagli": "İsteğe bağlı",
};

/* Canlı sayfanın biçimlendiricisiyle birebir aynı (page.tsx:465). */
const nf = new Intl.NumberFormat("tr-TR");
function priceText(p: { usd: number; plusVat: boolean; qualifier?: string }) {
  return `${p.qualifier ? `${p.qualifier} ` : ""}${nf.format(p.usd)} USD${p.plusVat ? " + KDV" : ""}`;
}

/* ------------------------------------------------------------ NE ALIYORSUNUZ */
export function MuhasebeNe() {
  return (
    <section id={NE.id} className="sec-pad lmh-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={NE.heading} accent={NE.accent} className="h2" />
        </div>
        <ul className="lmh-ne">
          {NE.items.map((k, i) => {
            const Icon = KAPSAM_IKON[i];
            return (
              <FadeUp key={k.ad} delay={0.06 + i * 0.05}>
                <li>
                  <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                  <b>{k.ad}</b>
                  <span>{k.line}</span>
                </li>
              </FadeUp>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ DAHİL / DEĞİL */
/* Tarama hızı için: göz sol sütunda tikleri, sağ sütunda çarpıları izliyor ve
   hiçbir yerde cümle okumak zorunda kalmıyor.

   İŞARET TEK TAŞIYICI DEĞİL: iki sütunun kendi başlığı var ("Dahil" / "Dahil
   değil"), yani tik ile çarpıyı ayırt edemeyen biri de sütunun ne olduğunu
   okuyor. */
export function MuhasebeAyrim() {
  return (
    <section id={AYRIM.id} className="sec-pad lmh-sec" data-alt="">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={AYRIM.heading} accent={AYRIM.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{AYRIM.lead}</p>
          </FadeUp>
        </div>

        <div className="lmh-ayrim">
          <FadeUp>
            <div className="lmh-kol">
              <h3 className="lmh-kol-b">Dahil</h3>
              <ul>
                {AYRIM.var.map((t) => (
                  <li key={t}>
                    <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="lmh-kol" data-yok="">
              <h3 className="lmh-kol-b">Dahil değil</h3>
              <ul>
                {AYRIM.yok.map((t) => (
                  <li key={t}>
                    <X size={15} strokeWidth={2.6} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- FİYAT */
/* Tablo canlı sayfadan devralındı ve iyi çalışıyor: tarayan göz için zaten
   doğru biçim. İki düzeltme var:
   · RHYTHM_LABEL ile price.unit yan yana basılıyordu, yani altı satırın
     beşinde aynı kelime iki kez ("Tek seferlik / tek seferlik"). Artık `unit`
     yalnız rozetten farklıysa basılıyor.
   · Bölümün sonunda bir kapı var. Ölçüldü: canlı sayfada fiyat bölümünün
     tamamında tek bir <a> yok. */
export function MuhasebeFiyat() {
  const items = accountingItems();
  return (
    <section id={FIYAT.id} className="sec-pad sec-night lmh-fiyat">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text={FIYAT.heading}
            accent={FIYAT.accent}
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">{FIYAT.lead}</p>
          </FadeUp>
        </div>

        {/* SATIRLAR AÇILIR DEĞİL. Canlı sayfada altı fiyat satırının altısı
            <details>'ti ve içlerinde ne vardı: kalemin ne olduğunu anlatan
            cümle ve "neler dahil" listesi. İkisi de bu adayda YUKARIDA zaten
            duruyor (dört karo + Dahil sütunu), yani tıklamanın arkasındaki
            şey tekrardı. Düz satır bırakınca fiyat listesi tek bakışta
            okunan bir tabloya dönüyor ve sayfadan altı açılır blok düşüyor. */}
        <ul className="lmh-plist">
          {items.map((it, i) => (
            <FadeUp key={it.id} delay={0.05 + i * 0.03}>
              <li data-inc={it.inclusion}>
                <b>{it.title}</b>
                <span className="lmh-prow-tags">
                  <em className="svm-badge">{ROZET[it.inclusion]}</em>
                  <em className="svm-rhythm">{RHYTHM_LABEL[it.rhythm]}</em>
                </span>
                <span className="lmh-prow-v data">
                  {priceText(it.price)}
                  {it.price.unit !== RHYTHM_LABEL[it.rhythm].toLocaleLowerCase("tr-TR") && (
                    <i>{it.price.unit}</i>
                  )}
                </span>
              </li>
            </FadeUp>
          ))}
        </ul>

        {/* Kalem notları listenin altında tek blokta. Canlı sayfada üç ayrı
            satırdı; burada da üç ama artık tıklamanın arkasında değiller ve
            hangi kalemi nitelediklerini adıyla söylüyorlar. */}
        {items.some((it) => it.note) && (
          <FadeUp delay={0.26}>
            <ul className="svm-pnotes">
              {items
                .filter((it) => it.note)
                .map((it) => (
                  <li key={it.id}>
                    <b>{it.title}:</b> {it.note}
                  </li>
                ))}
            </ul>
          </FadeUp>
        )}

        <FadeUp delay={0.3}>
          <div className="lmh-fiyat-alt">
            <details className="svm-more svm-more-dark">
              <summary>
                Tutarlar USD ve KDV hariç · tam şartlar
                <span className="svm-more-x" aria-hidden="true" />
              </summary>
              <p>{ACC_PRICE_FOOTNOTE}</p>
            </details>

            <SmartLink href="/basla" className="btn btn-primary">
              {FIYAT.cta}
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
