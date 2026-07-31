"use client";

import { motion, useReducedMotion } from "motion/react";
import { Handshake, Stamp, UsersRound } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import type { Country } from "@/lib/store";

/* "Neden Ortac Global?" bölümünün GENİŞ KAROSUNUN İÇİ — iki sütun birden.
 *
 * Bileşen bir fragment döndürüyor, kabuk döndürmüyor: dış kutu
 * (.bn-tile.bn-tile-wide) bento ızgarasının bir hücresi ve o ızgara
 * TrustLayer'a ait. Kabuk zaten iki sütunlu bir grid olduğu için buradaki iki
 * kök <div> doğrudan o gridin hücreleri oluyor.
 *
 * ------------------------------------------------------------------ NEDEN
 *
 * 1) "22" iki kere söyleniyordu. Başlıkta "22 yıllık kurumsal geçmiş" yazıp
 *    hemen yanındaki panoda 76 pikselik bir "22" sayacı ve 22 segmentlik bir
 *    yıl şeridi göstermek, aynı cümleyi iki farklı yazı tipiyle tekrar
 *    etmekti. Sayı bir kere söylenir; ikinci kez söylendiğinde bilgi değil
 *    gürültü olur. Bu yüzden sayısal ağırlığın tamamı BAŞLIKTA kaldı ve görsel
 *    sütun bambaşka bir iddiaya devredildi: erişim. Karoda artık hiçbir yerde
 *    rakam yok — küre süreyi değil coğrafyayı anlatıyor.
 *
 * 2) Sol sütundaki üç madde tek ülkeye kilitliydi ("Dubai'de kendi ofisimiz",
 *    "IFZA resmî iş ortağı"). Bu karo bento'nun İLK otorite bloğu ve ana sayfa
 *    üç ülkeyi eşit sunduğunu söylüyor; firmanın bütününü anlatması gereken
 *    yerde tek serbest bölgenin adını görmek, hem kapsamı olduğundan dar
 *    gösteriyor hem de sayfanın kendi vaadiyle çelişiyordu. Üç madde de artık
 *    ülkeden bağımsız: hangi ülkeyi seçerseniz seçin geçerli olan şeyler.
 *
 * 3) Üç madde üç özdeş yeşil tikle işaretliydi. Özdeş tik bir liste noktalaması
 *    — göz üçünü tek blok olarak görüp metni okumadan geçiyor. Şimdi her
 *    maddenin kendi glifi var; ne olduklarını okumadan önce farklı oldukları
 *    görülüyor.
 *
 * ------------------------------------------------- KÜRE, HERO'DAKİNE RAĞMEN
 * Ana sayfanın hero'sunda zaten büyük, koyu, noktalı ve dönen bir küre var
 * (SvgGlobe). Buradaki onun kopyası değil, bilerek karşıtı: açık zeminli, düz
 * renkli, tel kafes bir disk ve hiç dönmüyor. Aynı fikrin iki farklı ölçekte
 * tekrarı sayfada ritim kuruyor — hero "dünyaya bakıyorsunuz" der, bu karo
 * "biz şurada, şurada ve şuradayız" der. Kıta çizmedik: küre bir harita değil,
 * erişim işareti; olmayan bir coğrafi hassasiyet iddia etmiyor.
 *
 * ------------------------------------------------------------- İDDİA SINIRI
 * Bölümün kendi lead'i "Yalnızca doğrulanabilir olanı yazıyoruz" diyor, o
 * yüzden buradaki her satır brand.ts'teki listeden geliyor: resmî iş
 * ortaklıkları (PARTNERS), kendi muhasebe lisansı, üç ülkede operasyon, işin
 * taşerona verilmemesi. "Uzman", "lider", "en hızlı" gibi ölçülemeyen sıfat
 * yok; yeni rakam, süre taahhüdü ve banka sonucu imâsı da yok.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/* Sol sütun. Üçü de tek satır, hiçbirinin alt açıklaması yok — detay isteyen
   bölümün altındaki "Süreci gör" çıkışına gidiyor ("özet önde, detay talep
   üzerine").

   Sıralama dıştan içe: önce bizi dışarıdan tanıyan kurumlar, sonra kendi
   yetkimiz, en sonra işi fiilen yapan insanlar. Okuyucu "kim onaylıyor → neye
   yetkiniz var → kim yapıyor" sırasıyla iniyor.

   Burada BİLEREK olmayanlar:
   - "Üç ülkede operasyon" → onu sağdaki küre söylüyor, iki kere söylemiyoruz.
   - "Tek muhatap / kuruluş sonrası aynı ekip" → o iddia bento'nun yanındaki
     kendi karosunda; buraya da koymak dört karolu ızgarada aynı cümleyi iki
     hücrede göstermek olurdu.
   - "22 yıl" → yalnızca başlıkta. */
const CREDS = [
  {
    Icon: Handshake,
    /* PARTNERS listesinin tamamı: IFZA, Wio Business, Mashreq NeoBiz, PayPal,
       Wam. Tek tek saymıyoruz — isim listesi hem satırı taşırır hem de karo
       ülke seçilmeden görüldüğü için çoğu ziyaretçiye bir şey ifade etmez.
       Marka işaretleri ait oldukları yerde, ortaklar şeridinde duruyor. */
    t: "Resmî iş ortaklıkları",
  },
  {
    /* Mühür: lisans bir onay değil, bir yetki. Tik "doğru" der, mühür
       "yetkiliyiz" der — aradaki fark bu satırın bütün anlamı. */
    Icon: Stamp,
    t: "Kendi muhasebe lisansımız",
  },
  {
    /* "Uzman kadro" demiyoruz: uzmanlık ölçülemez ve bölümün vaadi
       doğrulanabilirlik. Doğrulanabilir olan, işin kimde durduğu. */
    Icon: UsersRound,
    t: "Taşeron değil, kendi kadromuz",
  },
];

/* Sağ sütun. Yüzdeler KÜRENİN kare kutusuna göre (sahneye göre değil) — bkz.
   authority.css'teki .aut-globe notu; sahne genişleyince işaretlerin küreden
   kopmaması bu sayede.
   Koordinatlar enlem-boylam DEĞİL: disk bir harita olmadığı için gerçek
   koordinat vermek olmayan bir hassasiyet iddia etmek olurdu. Ama dizilim
   keyfî de değil, soldan sağa batıdan doğuya gidiyor (İngiltere → KKTC →
   Dubai), böylece en azından gerçeğe ters düşmüyor.
   `hub` yalnızca Dubai'de: kendi ofisimizin olduğu tek yer orası. */
const MARKS: { c: Country; label: string; x: number; y: number; hub?: boolean }[] = [
  { c: "ingiltere", label: "İngiltere", x: 34, y: 24 },
  { c: "dubai", label: "Dubai", x: 70, y: 38, hub: true },
  { c: "kktc", label: "KKTC", x: 38, y: 53 },
];

/* Tel kafes, 240'lık kare bir viewBox içinde: merkez (120,120), yarıçap 92.
   Enlemler düz çizgi değil basık elips, çünkü küre hafifçe eğik duruyor — düz
   çizgi çizersek disk yassı bir madeni paraya benziyor. Her enlemin rx'i
   kürenin o yükseklikteki gerçek kirişi (Pisagor), ry'si o kirişin sabit bir
   oranı; böylece elipsler diskin dışına taşmıyor.
   Üç enlem + iki boylam: altısı da hairline. Daha fazlası küreyi çizim değil
   tel yumağı yapıyordu. */
const R = 92;
const CX = 120;
const LATS = [-56, 0, 56].map((dy) => {
  const rx = Math.sqrt(R * R - dy * dy);
  return { cy: CX + dy, rx, ry: rx * 0.22 };
});
const MERIDIANS = [32, 66];

export default function Authority() {
  const reduce = useReducedMotion();

  /* Çizgiler pathLength="1" ile normalize ediliyor, böylece kesikli çizgi
     hesabı elemanın gerçek uzunluğundan bağımsız: dasharray 1, dashoffset
     1'den 0'a giderken çizgi kendini çiziyor. getTotalLength() ölçümüne
     ihtiyaç yok, elipslerde de aynen çalışıyor.
     Hareket kapalıysa offset baştan 0 — çizgi hiç gizlenmiyor, sonuç kare
     görüntüyle birebir aynı. */
  const draw = (i: number) => ({
    pathLength: 1,
    strokeDasharray: 1,
    initial: { strokeDashoffset: reduce ? 0 : 1 },
    whileInView: { strokeDashoffset: 0 },
    viewport: VIEW,
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15 + i * 0.09, ease: EASE },
  });

  return (
    <>
      {/* ---------------- sol sütun: iddia, üç satır ---------------- */}
      <div className="aut-copy">
        <motion.h3
          className="aut-title"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        >
          22 yıllık kurumsal geçmiş
        </motion.h3>

        {/* Bu cümle KAPSAMI anlatıyor, aşağıdaki üç madde ise YETKİYİ. İkisini
            ayrı tutmamızın sebebi maddelerin cümleyi tekrar etmemesi: cümle
            "neyi yapıyoruz", maddeler "neye dayanarak yapıyoruz" sorusuna
            cevap veriyor. */}
        <motion.p
          className="aut-line"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.08, ease: EASE }}
        >
          Kuruluş, lisans yenileme, muhasebe, beyan ve banka dosyası — hepsi aynı
          çatı altında yürüyor.
        </motion.p>

        <ul className="aut-creds">
          {CREDS.map(({ Icon, t }, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: reduce ? 0 : -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{
                duration: reduce ? 0 : 0.42,
                delay: reduce ? 0 : 0.18 + i * 0.09,
                ease: EASE,
              }}
            >
              <span className="aut-ic" aria-hidden="true">
                <Icon size={15} strokeWidth={2.1} />
              </span>
              {t}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ---------------- sağ sütun: erişim ---------------- */}
      <div className="aut-stage">
        {/* Kürenin ne anlattığını tek başına bayraklar da söylüyor ama bu üç
            kelime hem ekran okuyucuya hem de aceleyle kaydıran göze bağlamı
            bedavaya veriyor. */}
        <span className="aut-tag">Üç ülkede operasyon</span>

        {/* Küre ve işaretler AYNI kare kutunun içinde; kutu sahnenin alt
            kenarından taşıyor ve kırpılıyor. Tam daire çizersek karo boyu
            60-70 piksel uzuyordu, üstelik ortada duran bir daire "ikon" gibi
            okunuyor. Kırpılmış hâli ufuktan yükselen bir gezegen. */}
        <div className="aut-globe">
          <svg className="aut-orb" viewBox="0 0 240 240" aria-hidden="true" focusable="false">
            {/* Yalnızca opaklık: SVG'de ölçek animasyonu transform-origin'i
                bbox'tan hesaplatıyor ve disk kırpılı olduğu için origin
                tarayıcıdan tarayıcıya kayabiliyor. Zemin sessizce açılıyor,
                hareketi tel kafes taşıyor. */}
            <motion.circle
              className="aut-disc"
              cx={CX}
              cy={CX}
              r={R}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEW}
              transition={{ duration: reduce ? 0 : 0.65, ease: EASE }}
            />

            <g className="aut-grid">
              {LATS.map((l, i) => (
                <motion.ellipse key={`lat-${i}`} cx={CX} cy={l.cy} rx={l.rx} ry={l.ry} {...draw(i)} />
              ))}
              {MERIDIANS.map((rx, i) => (
                <motion.ellipse
                  key={`mer-${rx}`}
                  cx={CX}
                  cy={CX}
                  rx={rx}
                  ry={R}
                  {...draw(LATS.length + i)}
                />
              ))}
            </g>

            <motion.circle className="aut-rim" cx={CX} cy={CX} r={R} {...draw(0)} />
          </svg>

          {/* Konum işaretleri. Ülke adı için ayrı bir cümle kurmuyoruz —
              bayrak + ad zaten "Dubai · İngiltere · KKTC" satırının yaptığı
              işi yapıyor, üstelik yer kaplamadan. */}
          {MARKS.map(({ c, label, x, y, hub }, i) => (
            /* Ortalama (translate -50%) dış katmanda, hareket iç katmanda:
               motion transform'u komple yazdığı için ikisi aynı elemanda
               olamaz — biri diğerini siler. */
            <span className="aut-at" key={c} style={{ left: `${x}%`, top: `${y}%` }}>
              <motion.span
                className="aut-mark"
                data-hub={hub || undefined}
                initial={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={VIEW}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : 0.62 + i * 0.13,
                  ease: EASE,
                }}
              >
                <span className="aut-pin">
                  <span className="aut-flag">
                    <Flag country={c} />
                  </span>
                  {/* Nabız yalnızca Dubai'de ve yalnızca hareket açıkken: üç
                      işaretin üçü de atarsa vurgu diye bir şey kalmıyor. */}
                  {hub && !reduce ? (
                    <motion.i
                      className="aut-ping"
                      aria-hidden="true"
                      initial={{ scale: 0.65, opacity: 0.55 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                  ) : null}
                </span>
                {label}
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
