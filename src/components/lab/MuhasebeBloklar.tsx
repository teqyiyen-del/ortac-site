import {
  ArrowRight,
  Archive,
  BarChart3,
  BookOpen,
  Building2,
  FolderOpen,
  Quote,
  Receipt,
  Stamp,
  Users,
  X,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { RHYTHM_LABEL, type Inclusion } from "@/lib/afterSetup";
import { accountingItems, ACC_PRICE_FOOTNOTE, ACCOUNTING_DUBAI } from "@/lib/accountingDubai";
import { ARTI, FIYAT, KAPSAM, KARSILIK } from "@/app/lab/muhasebe/veri";

/* Muhasebe sayfasının bölümleri. Brif, gerekçe ve neyin neden gittiği
   app/lab/muhasebe/veri.ts'in başında; burada yalnız işaretleme var. */

const ARTI_IKON = [Stamp, Users, FolderOpen, Building2];
const KAPSAM_IKON = [BookOpen, Receipt, BarChart3, Archive];

/* ROZET BU SAYFAYA AİT, PAYLAŞILAN ETİKET DEĞİL.
   afterSetup.ts'in INCLUSION_LABEL'ı "İlk yıl toplamında" diyor ve o etiket
   /dubai'deki ÖRNEK HESABA işaret ediyor. O hesap bu sayfada yok; üstelik
   bölümün kendi lead'i "tek bir toplam yazmıyoruz" diyor, yani canlı sayfada
   üç satır hemen üstündeki cümleyle çelişen bir rozet taşıyor. Buradaki üç
   etiket aynı veriyi bu sayfanın sorusuna göre okuyor; veri değişmedi. */
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

/* ------------------------------------------------------------------ 1 · ARTI */
export function MuhasebeArti() {
  return (
    <section id={ARTI.id} className="sec-pad lmh-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={ARTI.heading} accent={ARTI.accent} className="h2" />
        </div>
        <ul className="lmh-karo">
          {ARTI.items.map((k, i) => {
            const Icon = ARTI_IKON[i];
            return (
              <FadeUp key={k.t} delay={0.06 + i * 0.05}>
                <li>
                  <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                  <b>{k.t}</b>
                  <span>{k.s}</span>
                </li>
              </FadeUp>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 2 · ALINTI */
/* Müşteri: "sonra murat abinin alıntısını koyarız full genişlikte fln."
   Gece bant: sayfanın tek insan sesi ve tek tam genişlik bloğu, o yüzden
   aynı zamanda ritmin dönüm noktası. Metin canlı veriden, değişmedi.

   BU TUR SOLA YASLANDI ("onu sola daya"). İŞARETLEME DEĞİŞMEDİ: sıra hâlâ
   tırnak simgesi → gövde → künye, çünkü künyenin gövdenin ALTINDA kalması
   bilinçli bir karar (gerekçe css/lab-muhasebe.css · .lmh-alinti). Bant tam
   genişlik gece olmaya devam ediyor; yaslanan şey bandın içindeki figure. */
export function MuhasebeAlinti() {
  const q = ACCOUNTING_DUBAI.ortac.quote;
  return (
    <section className="lmh-alinti">
      <div className="container-o">
        <FadeUp>
          <figure>
            <Quote size={30} strokeWidth={1.6} aria-hidden="true" />
            <blockquote>{q.text}</blockquote>
            <figcaption>
              <b>{q.who}</b>
              <span>{q.role}</span>
            </figcaption>
          </figure>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 3 · KAPSAM */
/* Solda dört ikonlu karo, sağda yapmadıklarımız. Canlı sayfada bu ikisi hiç
   yan yana gelmiyordu: biri beş aşamalı bir akordiyonda, öteki iki bölüm
   ötede bir <details> şeridinin arkasındaydı ve o şerit kapalıyken ekranda
   duran tek cümle "Kapsamadığı, kapsadığı kadar önemli." idi. */
export function MuhasebeKapsam() {
  return (
    <section id={KAPSAM.id} className="sec-pad lmh-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={KAPSAM.heading} accent={KAPSAM.accent} className="h2" />
        </div>

        {/* YAPTIKLARIMIZ BÜYÜDÜ, YAPMADIKLARIMIZ AKORDİYONA İNDİ.
            Müşteri: "dahil değil diye başlık atıp bir sürü şey listelemek pek
            güzel durmuyor. yaptıklarımız kısmını biraz daha artırıp
            yapmadıklarımız kısmını akordiyon şekilde alta bırakabiliriz."

            Bir önceki hâlde iki liste yan yanaydı ve sağdaki altı satırlık
            ret listesi sol sütunla eşit ağırlık taşıyordu. Şimdi dört kart
            sayfanın tamamını alıyor, sınır tek satırlık bir açılırda duruyor.
            Sınır KAYBOLMUYOR: kapalıyken bile kaç kalem olduğu başlıkta
            yazıyor, yani ziyaretçi tıklamadan da varlığını biliyor. */}
        <ul className="lmh-yap">
          {KAPSAM.var.map((k, i) => {
            const Icon = KAPSAM_IKON[i];
            return (
              <FadeUp key={k.ad} delay={0.06 + i * 0.05}>
                <li>
                  <span className="lmh-yap-ic" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <b>{k.ad}</b>
                  <span className="lmh-yap-l">{k.line}</span>
                </li>
              </FadeUp>
            );
          })}
        </ul>

        <FadeUp delay={0.26}>
          <details className="lmh-yok">
            <summary>
              <span>
                {KAPSAM.yokBaslik} <b>{KAPSAM.yok.length} kalem</b>
              </span>
              <span className="lmh-yok-x" aria-hidden="true" />
            </summary>
            <div className="lmh-yok-b">
              <ul>
                {KAPSAM.yok.map((t) => (
                  <li key={t}>
                    <X size={14} strokeWidth={2.6} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p>{KAPSAM.yokNot}</p>
            </div>
          </details>
        </FadeUp>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- 5 · KARŞILIK */
/* Müşteri: "düzenli muhasebenin karşılığı kısmına daha fazla alan ayırıp
   biraz daha göze çarpıcı şekilde yapabilirsin, burası önemli bir kısım."

   Uygulaması: kendi zemini, iki satırlık geniş ızgara, başlık tipografisi
   17'den 21'e. Sayfada en çok nefes alan blok bu. */
export function MuhasebeKarsilik() {
  return (
    <section id={KARSILIK.id} className="sec-pad lmh-karsilik">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={KARSILIK.heading} accent={KARSILIK.accent} className="h2" />
        </div>
        <ul className="lmh-kars">
          {KARSILIK.items.map((k, i) => (
            <FadeUp key={k.t} delay={0.06 + i * 0.06}>
              <li>
                <b>{k.t}</b>
                <span>{k.s}</span>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- 6 · FİYAT */
/* Müşteri: "muhasebe hizmet bedeli kısmı güzel, burayı aynen koruyalım."
   Bölümün yapısı korundu; iki şey düzeltildi:
   · RHYTHM_LABEL ile price.unit yan yana basılıyordu, altı satırın beşinde
     aynı kelime iki kez ("Tek seferlik / tek seferlik").
   · Bölümün sonunda kapı yoktu. Ölçüldü: canlı fiyat bölümünün tamamında
     tek bir <a> yok. */
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

        {/* CANLI SİTEDEKİ TASARIMIN AYNISI. Müşteri: "muhasebe hizmetinin
            bedeli kısmını şuan sitede live olanın tasarımıyla koy."
            Bir önceki turda satırlar düzleştirilmişti (açılır değil); o karar
            geri alındı, canlı `.svm-prow` düzeni birebir kullanılıyor.

            İki şey CANLIDAN FARKLI ve ikisi de düzeltme:
            · `unit` yalnız rozetten farklıysa basılıyor. Canlıda RHYTHM_LABEL
              ile yan yana duruyor ve altı satırın beşinde aynı kelime iki kez
              çıkıyor ("Tek seferlik / tek seferlik").
            · Rozet bu sayfaya ait (bkz. ROZET). Canlıdaki "İlk yıl
              toplamında" etiketi /dubai'deki örnek hesaba işaret ediyor ve o
              hesap bu sayfada yok; üstelik bölümün kendi lead'i "tek bir
              toplam yazmıyoruz" diyor. */}
        <div className="svm-plist">
          {items.map((it, i) => (
            <FadeUp key={it.id} delay={0.06 + i * 0.04}>
              <details className="svm-more svm-more-dark svm-prow" data-inc={it.inclusion}>
                <summary>
                  <span className="svm-prow-t">
                    <b>{it.title}</b>
                    <span className="svm-prow-tags">
                      <em className="svm-badge">{ROZET[it.inclusion]}</em>
                      <em className="svm-rhythm">{RHYTHM_LABEL[it.rhythm]}</em>
                    </span>
                  </span>
                  <span className="svm-prow-v data">
                    {priceText(it.price)}
                    {it.price.unit !== RHYTHM_LABEL[it.rhythm].toLocaleLowerCase("tr-TR") && (
                      <i>{it.price.unit}</i>
                    )}
                  </span>
                  <span className="svm-more-x" aria-hidden="true" />
                </summary>

                <div className="svm-prow-d">
                  {it.en && <p className="svm-prow-en">{it.en}</p>}
                  {it.line && <p>{it.line}</p>}
                  {it.scope && it.scope.length > 0 && (
                    <ul>
                      {it.scope.map((sc) => (
                        <li key={sc}>{sc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </FadeUp>
          ))}
        </div>

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
