"use client";

import { useState } from "react";
import { ArrowRight, CircleHelp, Plus } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import type { Faq } from "@/lib/countryContent";

/* ============================================================================
   /lab/sss · SIK SORULANLAR BLOĞUNUN TASARIMI
   CSS: css/lab-sss.css (.lss-)

   18.09.2026 · Burak: "bizim sitedeki ss kısımlarının tipini daha iyi nasıl
   yaparız ya o konuda biraz alternatifler sunsana … solda başlıklar sağda
   cevap olması işini beğeniyorum btw onu koru onda sorun yok ama tasarım daha
   iyi olabilir bi şekilde şuan tam ikna etmedi."

   DÜZEN KORUNUYOR: solda soru listesi, sağda seçili cevabın paneli; seçim
   tıklamayla değişiyor, sağ panel yapışkan. Değişen yalnız GÖRSEL DİL:

     S1 · SAKİN LİSTE   çerçeve yok, ayraç yok. Seçili soru --paper zemin ve
                        koyu metin; sağ panel beyaz, cevabın üstünde ince
                        çizgi ve "soru i/n". En sessiz hâl.
     S2 · NUMARALI      sorular numaralı (01…): seçili olan gece zemin beyaz
                        metin. Sağ panel --paper; cevabın başında büyük soru
                        işareti. Liste bir "içindekiler" gibi okunuyor.
     S3 · GECE CEVAP    sorular beyaz kartlar (çerçeveli), seçili kart mavi
                        çerçeveli; cevap paneli GECE — blok sayfada bir
                        vurgu alanına dönüyor.

   Canlı blok (components/CountryFaq.tsx) bu turda DEĞİŞMEDİ; seçilen dil
   oraya taşınacak. Klavye gezinmesi ve aria bağları canlıda duruyor; adaylar
   yalnız görsel kıyas için, o yüzden burada sade tutuldu (buton + panel). */

function Panel({ item, i, total, tur }: { item: Faq; i: number; total: number; tur: string }) {
  return (
    <div className="lss-panel" data-tur={tur}>
      <p className="lss-panel-ust">
        {tur === "s2" ? (
          <CircleHelp size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <span className="lss-panel-say">
            {i + 1} / {total}
          </span>
        )}
        {tur === "s2" && `Soru ${i + 1} / ${total}`}
      </p>
      <h3 className="lss-panel-q">{item.q}</h3>
      <p className="lss-panel-a">{item.a}</p>
    </div>
  );
}

function Blok({ items, tur, ad }: { items: Faq[]; tur: "s1" | "s2" | "s3"; ad: string }) {
  const [acik, setAcik] = useState(0);
  return (
    <section className="sec-pad lss-sec" data-tur={tur}>
      <div className="container-o">
        <p className="lss-etiket">{ad}</p>
        <div className="sec-head">
          <SplitWords as="h2" text="Sık sorulanlar." accent="sorulanlar." className="h2" />
        </div>
        <div className="lss" data-tur={tur}>
          <ul className="lss-liste">
            {items.map((f, i) => (
              <li key={f.q}>
                <button type="button" data-on={acik === i ? "" : undefined} onClick={() => setAcik(i)}>
                  {tur === "s2" && (
                    <span className="lss-n data" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <span className="lss-q">{f.q}</span>
                  {tur !== "s2" && <Plus className="lss-art" size={15} strokeWidth={2.2} aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
          <Panel item={items[acik]} i={acik} total={items.length} tur={tur} />
        </div>
        <p className="lss-cikis">
          <a href="/basla" className="btn btn-line">
            Ücretsiz danışmanlık
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}

export function SssS1({ items }: { items: Faq[] }) {
  return <Blok items={items} tur="s1" ad="S1 · Sakin liste — çerçeve yok, seçili soru kırık beyaz" />;
}
export function SssS2({ items }: { items: Faq[] }) {
  return <Blok items={items} tur="s2" ad="S2 · Numaralı — içindekiler gibi, seçili soru gece" />;
}
export function SssS3({ items }: { items: Faq[] }) {
  return <Blok items={items} tur="s3" ad="S3 · Gece cevap — sorular kart, cevap paneli gece" />;
}
