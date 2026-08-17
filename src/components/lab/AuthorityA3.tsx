"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Flag } from "@/components/shared/CountryPicker";
import type { Country } from "@/lib/store";

/* ADAY A3 (.asik-) — "Neden Ortac Global?" geniş karosunun içi. SESSİZ.
 *
 * ------------------------------------------------------------------------
 * 1) SÜRE NEDEN İKİ KEZ SÖYLENİYORDU
 *
 * Eski karoda otoriteyi SAYININ KENDİSİ taşıyordu: sağ sütunda 76 piksellik
 * bir sayaç, altında yıl başına bir segment. Sayı tek başına bir iddia
 * kuramadığı için yanına sürekli açıklama gerekiyordu — "yıl", "kesintisiz
 * faaliyet", sonra üç satırlık kimlik listesi. Metin oradan büyüyordu. Başlık
 * da zaten "N yıllık kurumsal geçmiş" dediği için aynı cümle iki farklı
 * puntoyla iki kez kuruluyordu.
 *
 * Bu adayın kararı: sayısal ağırlığın TAMAMI başlıkta kalıyor, görsel sütunda
 * tek bir hane bile bulunmuyor. Kadranlarda rakam çemberi yok, dijital saat
 * yok — yalnızca akrep, yelkovan ve saniye. Yani başlıktaki sayıyla
 * yarışabilecek bir rakam karonun sağ yarısında fiziksel olarak mevcut
 * değil; tekrar imkânsız.
 *
 * ------------------------------------------------------------------------
 * 2) NEDEN SAAT
 *
 * Müşteri "belki kartın içinde dünya gibi bir şey olur" dedi. Dünyayı
 * göstermenin iki yolu var: harita ve saat. Harita coğrafyayı anlatır ama
 * durağandır — oranın var olduğunu söyler, bizim orada olduğumuzu değil. Saat
 * ŞU ANI gösterir: üç kadran üç ayrı yerel saatte durduğu anda "üç ülkede
 * operasyon" cümlesini kurmaya gerek kalmaz, ziyaretçi onu kendisi okur.
 *
 * Başlıkla da çakışmıyor, tamamlıyor: başlık geçmiş SÜREYİ söylüyor (30 yıl),
 * kadranlar içinde bulunduğumuz ANI. "O zamandan beri buradayız, şu anda da
 * iş başındayız" — aynı şeyin tekrarı değil, ikinci yarısı.
 *
 * Üç kadran ortak bir tel raya asılı: lobi duvarındaki saat sırası. Ray
 * süsleme değil, kompozisyon kararı — onsuz üç ayrı maket, onunla tek nesne.
 *
 * ------------------------------------------------------------------------
 * 3) KALABALIK
 *
 * Eski karoda ~72 kelime vardı (başlık + 33 kelimelik paragraf + iki tikli
 * satır + sağ sütunda üç adet iki satırlık kimlik bloğu) ve sağdaki üç satırın
 * ikisi soldaki iki tikin birebir tekrarıydı. Burada sol sütun başlık + tek
 * cümle; sağ sütunda üç ülke adından başka yazı yok. Toplam ~20 kelime.
 * Detay isteyen bölümün altındaki "Süreci gör" çıkışına ve ülke sayfalarına
 * gidiyor — özet önde, detay talep üzerine.
 *
 * Hareket de aynı mantıkla tek yerde toplandı: sol sütun hiç animasyon almıyor
 * (karonun kendi giriş geçişine biniyor), sayfada kıpırdayan tek şey sağdaki
 * grafik. "Sessiz" iddiası tipografide olduğu kadar hareket bütçesinde de
 * geçerli.
 *
 * ------------------------------------------------------------------------
 * İDDİA SINIRI
 * Buradaki tek iddia "üç ülkede operasyon" ve o brand.ts'teki doğrulanabilir
 * listede var. Kadranlar ofis iddiası kurmuyor: bu yüzden şehir değil ÜLKE adı
 * yazıyor ve sitenin her yerindeki "Dubai · İngiltere · KKTC" sözlüğüyle
 * birebir aynı. Süre taahhüdü, banka garantisi, vergi görüşü yok.
 */

/* SWAP:AUTHORITY — sol sütundaki iki satır ve aşağıdaki üç ülke müşteri
   onayına tabi. Ülke eklenir/çıkarılırsa kadran sırası kendiliğinden uzuyor;
   ne burada ne CSS'te sabit bir "3" var. */
const PLACES: { c: Country; label: string; tz: string }[] = [
  { c: "dubai", label: "Dubai", tz: "Asia/Dubai" },
  { c: "ingiltere", label: "İngiltere", tz: "Europe/London" },
  /* KKTC 2017'den beri Kıbrıs'ın saat rejiminde (EET/EEST). Europe/Istanbul
     sabit +3 olduğu için kışın bir saat yanlış gösterirdi. */
  { c: "kktc", label: "KKTC", tz: "Asia/Nicosia" },
];

/* Kadran geometrisi: viewBox 100 birim, merkez (50,50), dış çember r=45.
   On iki çentik yerine yalnızca dört çeyrek çentik var; on iki tanesi kadranı
   "widget" gibi gösteriyordu, buradaki işi ise sessiz durmak. */
const TICKS = [
  { x1: 50, y1: 9, x2: 50, y2: 14 },
  { x1: 91, y1: 50, x2: 86, y2: 50 },
  { x1: 50, y1: 91, x2: 50, y2: 86 },
  { x1: 9, y1: 50, x2: 14, y2: 50 },
];

/** Bir kadranın o anki hâli. `raw` ham dakika (0-1439); açılar ondan değil,
 *  bir öncekinin üstüne FARK eklenerek büyüyor — sebebi aşağıda. */
type Dial = { raw: number; hour: number; minute: number };
type Clock = { dials: Dial[]; sec: number };

/** Belirli bir saat diliminde o anki saat ve dakika. */
function readZone(tz: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const pick = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return pick("hour") * 60 + pick("minute");
}

export default function AuthorityA3() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  /* Saat sunucuda okunamaz: SSR'da üretilen değer istemcinin ilk render'ıyla
     kaçınılmaz olarak farklı olur ve hidrasyon uyuşmazlığı verir. Bu yüzden
     ibreler yalnızca bağlandıktan sonra doğuyor; o ana kadar kadran ibresiz
     bir çember olarak duruyor ve hiçbir ölçü kaymıyor. */
  const [clock, setClock] = useState<Clock | null>(null);

  useEffect(() => {
    const read = () => {
      const now = new Date();
      let raws: number[];
      try {
        raws = PLACES.map((p) => readZone(p.tz, now));
      } catch {
        /* Bilinmeyen bir saat dilimi adında Intl fırlatabiliyor. Grafik
           ibresiz de ayakta kalsın diye sayfayı düşürmüyoruz. */
        return;
      }

      setClock((prev) => ({
        /* Saniye SADECE ilk okumada alınıyor. Saniye ibresi 60 saniyelik bir
           CSS animasyonu; negatif gecikmeyle bir kez gerçek saniyeye
           hizalandıktan sonra kendi kendine doğru kalıyor. Her yenilemede
           tazeleseydik animasyon 20 saniyede bir baştan başlar, ibre süzülmek
           yerine sıçrardı. */
        sec: prev ? prev.sec : now.getSeconds(),

        dials: raws.map((raw, i) => {
          const p = prev?.dials[i];
          /* İlk okuma: açılar 360'a göre indirgenmiş hâlleriyle giriyor.
             Yelkovana bir tam tur ekleniyor — ibre girişte saat kuruluyormuş
             gibi fazladan bir tur atsın diye. */
          if (!p) return { raw, hour: (raw * 0.5) % 360, minute: ((raw * 6) % 360) + 360 };

          /* Sonraki okumalar FARK ile ilerliyor. Ham açı kullanılsaydı 59.
             dakikadan 0. dakikaya geçerken yelkovan 354 dereceden 0'a düşer,
             yani gözle görülür şekilde GERİ sarardı. Fark daima ileri
             olduğundan ibre hep ileri gidiyor; gün dönümünde negatife düşen
             fark 1440 eklenerek düzeltiliyor. */
          let d = raw - p.raw;
          if (d < 0) d += 1440;
          return { raw, hour: p.hour + d * 0.5, minute: p.minute + d * 6 };
        }),
      }));
    };

    read();
    /* Dakika hassasiyeti yeterli: 20 saniyelik aralık en fazla o kadar geç
       kalıyor ve saniyede bir render etmenin bedelini ödemiyoruz. */
    const id = window.setInterval(read, 20_000);
    return () => window.clearInterval(id);
  }, []);

  /* İbreler yalnızca hem saat okunduğunda hem de karo görüş alanına girdiğinde
     yerine oturuyor; kurulma hareketi ekranda değilken harcanmasın diye. */
  const ready = seen && clock !== null;

  return (
    <>
      {/* ---------------- sol sütun: başlık ve tek cümle ----------------
          Bilerek animasyonsuz. Karo zaten çağıran tarafta bir bütün olarak
          içeri giriyor; metni ayrıca kıpırdatmak "sessiz" iddiasını daha ilk
          saniyede bozardı. */}
      <div className="asik-copy">
        <h3 className="asik-title">30 yıllık kurumsal geçmiş</h3>
        <p className="asik-line">
          Resmî iş ortaklıkları ve kendi muhasebe lisansımız bizde; dosya baştan sona
          aynı ekipte kalıyor.
        </p>
      </div>

      {/* ---------------- sağ sütun: tek grafik, sıfır cümle ---------------- */}
      <div className="asik-stage" ref={ref}>
        {/* Ekran okuyucu kadranı göremez. Ülke adları zaten metin olarak var
            ama neye bakıldığını söyleyen cümle, görsel olarak tek piksel yer
            kaplamadan burada duruyor. */}
        <span className="asik-sr">Üç ülkede operasyon — şu anki yerel saatler.</span>

        <div className="asik-wall" data-on={seen ? "" : undefined}>
          <div className="asik-dials">
            {PLACES.map(({ c, label }, i) => {
              const dial = clock?.dials[i];
              /* Karo görünmeden önce bütün ibreler 12'de duruyor; `ready`
                 dönünce CSS geçişi onları gerçek saate kuruyor. */
              const hour = ready && dial ? dial.hour : 0;
              const minute = ready && dial ? dial.minute : 0;

              return (
                <div className="asik-dial" key={c}>
                  {/* İki katman: dıştaki sabit kutu rayı taşıyor (::before),
                      içteki katman büyüyerek giriyor. Ray animasyonlu katmanın
                      içinde olsaydı kadranla birlikte ölçeklenir, yatay çizgi
                      girişte kısalıp uzardı. */}
                  <div className="asik-face-wrap">
                    <motion.div
                      className="asik-face-in"
                      initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
                      animate={seen ? { opacity: 1, scale: 1 } : undefined}
                      transition={{
                        duration: reduce ? 0 : 0.5,
                        delay: reduce ? 0 : 0.18 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <svg
                        className="asik-face"
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <circle className="asik-plate" cx="50" cy="50" r="45" />
                        <g className="asik-ticks">
                          {TICKS.map((t) => (
                            <line key={`${t.x1}-${t.y1}`} {...t} />
                          ))}
                        </g>

                        {/* İbreler motion ile değil, düz CSS geçişiyle dönüyor.
                            Sebep teknik: motion SVG düğümlerinde dönme merkezini
                            elemanın kendi sınır kutusundan hesaplıyor ve bir
                            ibrenin sınır kutusunun merkezi kadranın merkezi
                            DEĞİL — akrep kendi ortasından dönerdi. Merkez CSS'te
                            `transform-origin: 50px 50px` ile sabitlendi. */}
                        <g className="asik-hand" style={{ transform: `rotate(${hour}deg)` }}>
                          <line className="asik-hh" x1="50" y1="56" x2="50" y2="26" />
                        </g>
                        <g className="asik-hand" style={{ transform: `rotate(${minute}deg)` }}>
                          <line className="asik-mh" x1="50" y1="58" x2="50" y2="15" />
                        </g>

                        {/* Saniye ibresi grafiğin canlı olduğunun tek kanıtı.
                            Dönüşü JS'e değil CSS'e bırakıldı: üç kadran aynı
                            negatif gecikmeyi aldığı için üçü de saniyesi
                            saniyesine BİRLİKTE süzülüyor — üç ayrı tik değil,
                            tek bir hareket. Hareket kapalıyken animasyon medya
                            sorgusuyla sönüyor, satır içi transform devralıyor;
                            animasyon çalışırken zaten onu eziyor. */}
                        {ready && clock ? (
                          <g
                            className="asik-hand asik-sec"
                            style={{
                              /* İki gecikme, iki animasyon: ilki saniye
                                 ibresini gerçek saniyeye hizalıyor (negatif),
                                 ikincisi ibrenin ne zaman belireceğini
                                 söylüyor — akrep ve yelkovan yerine
                                 oturduktan hemen sonra. */
                              animationDelay: `-${clock.sec}s, 1.6s`,
                              transform: `rotate(${clock.sec * 6}deg)`,
                            }}
                          >
                            <line className="asik-sh" x1="50" y1="62" x2="50" y2="12" />
                          </g>
                        ) : null}

                        <circle className="asik-pin" cx="50" cy="50" r="2.6" />
                      </svg>

                      {/* Bayrak kadranın alt kenarına oturan bir rozet: saati
                          bir yere çiviliyor. Kendi satırını açmadığı için üç
                          ülkeyi göstermenin maliyeti neredeyse sıfır piksel. */}
                      <span className="asik-flag" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                    </motion.div>
                  </div>

                  <motion.span
                    className="asik-name"
                    initial={{ opacity: 0 }}
                    animate={seen ? { opacity: 1 } : undefined}
                    transition={{
                      duration: reduce ? 0 : 0.45,
                      delay: reduce ? 0 : 0.34 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {label}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
