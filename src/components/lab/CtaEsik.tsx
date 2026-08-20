import { ArrowRight } from "lucide-react";

import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN, COUNTRY_ORDER } from "@/lib/brand";

/* LAB · KAPANIŞ CTA ADAYI · "EŞİK" — biçim: src/app/css/lab-cta2-b.css (.kc2b-)
   Hero'da kapıya BAKIYORSUN, kapanışta içinden GEÇİYORSUN: metin eşiğin
   içinde duruyor, kartın alt şeridi eşiğin ötesi (ışık, zemin, adımlar).
   Metin canlı CTA'dan geliyor, yeni vaat yok; iki hedef de aynı.
   Hareketin tamamı CSS'te ve reduce kapısının arkasında (tuzak A). */

/* Kemer sayısı 5 — en içteki açıklık, en dıştaki en yakın söve. Sayı burada
   çünkü CSS'te `--i` ile ölçekleniyor; beşten fazlası kartta kırpılıyor,
   azı derinliği tek adıma indiriyor. */
const KEMER = [0, 1, 2, 3, 4];

/* Işıktaki toz. Altı tane: huzme dar olduğu için yarısı zaten kırpılıyor. */
const TOZ = [0, 1, 2, 3, 4, 5];

export default function CtaEsik() {
  return (
    <div className="kc2b">
      <div className="container-o">
        <div className="kc2b-kart">
          {/* Derinlik katmanı: açıklığın ışığı + iç içe kemerler. Tamamı süs,
              tamamı aria-hidden; ekran okuyucu yalnız metni ve adımları görür. */}
          <div className="kc2b-sahne" aria-hidden="true">
            <span className="kc2b-acik" />
            {KEMER.map((i) => (
              <span
                key={i}
                className="kc2b-kemer"
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="kc2b-in">
            <p className="kc2b-rozet">
              {/* BAYRAK TUZAĞI (H): `Flag` çıplak <svg viewBox="0 0 60 40">
                  döndürüyor, kabı ölçülmezse 300x150'ye şişiyor. .kc2b-disk'in
                  sabit px + overflow satırları silinemez. */}
              <span className="kc2b-diskler">
                {COUNTRY_ORDER.map((c) => (
                  <span key={c} className="kc2b-disk" aria-hidden="true">
                    <Flag country={c} />
                  </span>
                ))}
              </span>
              Üç ülkede de kendi ofisimiz var
            </p>

            {/* SplitWords KULLANILMADI: o bileşen motion tabanlı bir yükleniş
                hareketi ve bu turun şartı hareketin tamamının CSS'te olması.
                Vurgu aynı yerde, aynı kelimelerde. */}
            <h2 className="kc2b-t">
              Kurulumunuzu <span className="kc2b-vurgu">bugün başlatalım.</span>
            </h2>

            {/* Canlı paragrafın ilk cümlesi ("Dubai, İngiltere ve KKTC'de
                kuruluş, banka, tahsilat ve muhasebe") ekrandan KALKMADI, yer
                değiştirdi: ülkeleri rozetteki üç bayrak, hizmetleri eşiğin
                üstündeki beş adım söylüyor. Geriye farkı anlatan tek satır
                kaldı. Yeni bir cümle yazılmadı. */}
            <p className="kc2b-l">Tek ekip, tek muhatap, baştan sona Türkçe.</p>

            <div className="kc2b-btns">
              <SmartLink href="/basla" className="btn btn-primary">
                Kurulumu Başlat
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
              <SmartLink href="/iletisim" className="btn btn-ghost">
                Ücretsiz danışmanlık
              </SmartLink>
            </div>
          </div>

          {/* Eşiğin ötesi. Sıra sitenin kendi zinciri (lib/brand · CHAIN),
              elle yazılmıyor: kuruluştan oturuma giden aynı dizi. */}
          <div className="kc2b-taban">
            <span className="kc2b-esik" aria-hidden="true" />
            <span className="kc2b-huzme" aria-hidden="true">
              <span className="kc2b-akinti" />
              {TOZ.map((i) => (
                <span
                  key={i}
                  className="kc2b-toz"
                  style={{ "--i": i } as React.CSSProperties}
                />
              ))}
            </span>
            <ol className="kc2b-adim">
              {CHAIN.map((h, i) => (
                <li
                  key={h.key}
                  className="kc2b-adim-i"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {h.label}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
