"use client";

import { ArrowRight } from "lucide-react";

import CtaSahne from "@/components/CtaSahne";
import { Ft2Directory } from "@/components/Footer";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import SplitWords from "@/components/shared/SplitWords";
import { gtm } from "@/lib/gtm";

/* FOOTER ADAYI FB2 · "BİRLEŞİK" (.fb2-) · CSS: css/lab-footer-2.css

   Müşterinin ikinci fikri, birebir: "ya da ikisinide birleştirip siyah fln
   yapmak lzm... cta ile footerı birleştirebiliriz yani opsiyonel."

   BU ADAYIN CEVABI: kart diye bir şey yok. Kapanış CTA'sı ile site dizini tek
   bir gece blok; CTA onun ÜST KATI, dizin ALT KATI, aradaki kat değişimini
   sahnenin kendisi (üç yay) ve tek bir ince çizgi söylüyor.

   NE KOPYALANDI, NE IMPORT EDİLDİ · ve neden.
   Dizin IMPORT edildi (Ft2Directory): üç ülke sütunu, Araçlar / Kaynaklar /
   Kurumsal sütunları, künye satırı ve şerh cümlesi canlıdaki hâliyle
   basılıyor, tek bir bağlantı bile eksilmedi ya da eklenmedi.
   Sahne de IMPORT edildi (CtaSahne): üç yay, on iki taşıyıcı, takımyıldız
   tablosu ve tek yönlü akış birebir aynı bileşenden geliyor.
   KOPYALANAN tek şey CTA'nın METİN İSKELESİ (rozet + başlık + düğme) ve
   gökyüzü katmanı. Sebebi yapısal: canlı Ft2Cta bu düğümleri `.kcta-kart`
   sarmalayıcısının içine basıyor ve bu adayın tanımı tam olarak "kart yok".
   Metin, hedef, olay adı ve sınıf adları canlıdan alındı; yeni cümle yok.

   GÖKYÜZÜ ÜST KATIN KATMANI, BLOĞUN TAMAMININ DEĞİL. Yıldız alanı ve iki
   kayan yıldız .fb2-kat'ın içinde duruyor, dizinin arkasına geçmiyor.
   Gerekçe okunurluk: 13,5 px'lik bağlantı listesinin arkasında hareket eden
   benekler kontrast tablosunda görünmeyen ama gözle görülen bir gürültü.
   Sahnenin "bloğun tamamına yayılması" bunun yerine YATAYDA yapıldı:
   yaylar artık 1136 px'lik kartın içine hapsedilmiş değil, ekranın bir
   kenarından öbürüne gidiyor (ayrıntı ve ölçüm CSS'te).

   `placement` bilerek "lab-fb2": lab tıklamaları canlı footer'ın
   `cta_start_click · footer` ölçümüne karışmasın. */
export default function FooterFB2() {
  return (
    <footer className="fb2">
      {/* ------------------------------------------------------- üst kat */}
      <div className="fb2-kat">
        {/* Gökyüzü · canlı CTA'daki dört düğümün aynısı, aynı sınıflarla.
            Kayan yıldızlar metnin ARKASINDAN geçiyor (gök 0 · sahne 1 ·
            metin 2), yani okunurluğa dokunmuyorlar. */}
        <span className="kcta-gok" aria-hidden="true">
          <span className="kcta-yildiz kcta-yildiz-b" />
          <span className="kcta-yildiz kcta-yildiz-a" />
          <span className="kcta-kayan kcta-kayan-1" />
          <span className="kcta-kayan kcta-kayan-2" />
        </span>

        <div className="fb2-ust">
          <div className="container-o">
            <div className="fb2-in">
              <FadeUp>
                <span className="kcta-rozet">
                  <span className="kcta-nokta" />
                  Tek ekip, tek muhatap
                </span>
              </FadeUp>

              <SplitWords
                as="h2"
                text="Şirketinizi bugün kuralım."
                accent="bugün kuralım."
                base={0.06}
                className="kcta-t"
              />

              <FadeUp delay={0.26}>
                <div className="kcta-eylem">
                  <SmartLink
                    href="/basla"
                    className="btn btn-primary"
                    onClick={() => gtm("cta_start_click", { placement: "lab-fb2" })}
                  >
                    Kurulumu Başlat
                    <ArrowRight size={15} strokeWidth={2.1} />
                  </SmartLink>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* Sahne kat sınırının kendisi: üstünde mesaj, altında dizin.
            `container-o` DIŞINDA duruyor, yani yaylar ekran genişliğinde. */}
        <CtaSahne />
      </div>

      {/* ------------------------------------------------------- alt kat */}
      <div className="fb2-alt">
        <Ft2Directory />
      </div>
    </footer>
  );
}
