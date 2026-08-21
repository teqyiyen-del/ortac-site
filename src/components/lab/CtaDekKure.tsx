import { ArrowRight, Globe, Plane } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { Country } from "@/lib/store";

/* KAPANIŞ CTA'SI ADAYI · KÜRE (.kd1-) · lab
   Sıcak zeminli kutu; üstte rozet, iki satır başlık, tek koyu düğme. Alt yarı
   gece bir sahne: tel kafes bir dünya, çevresinde üç ince yörünge, üstlerinde
   üç bayrak diski ve iki uçak.

   SAHNE HİÇBİR ŞEY ANLATMIYOR VE BU TURUN TEK KURALI BU. Önceki turda üç
   adayın üçü de hareketle bilgi taşımıştı (yörünge yarıçapı kuruluş süresine
   bağlıydı, zincir halkaları iş akışını anlatıyordu) ve müşteri tam olarak
   bunu reddetti: "bişi anlatmasın ztn her boku anlattık ya". Bu dosyada
   aşağıdaki sayıların HİÇBİRİ bir veriden türemiyor: yarıçap, eğim, periyot ve
   başlangıç açısı gözle seçildi, tek kısıt periyotların asal ve birbirleriyle
   aralarında asal olması (tuzak K). Ekrandaki metin de üç parçaya indi:
   rozet + iki satır başlık + tek düğme. Metin ve düğme hedefi canlı CTA'dan
   (Footer.tsx · Ft2Cta) alındı, yeni vaat yazılmadı. */

/** SVG'ye ve CSS'e basılan sayıları kısaltır; DOM'da on dört basamak gereksiz. */
const yuvarla = (n: number) => Number(n.toFixed(4));

/* --------------------------------------------------------------- KÜRE
   Ortografik izdüşüm, üç satır matematik:

   EKSEN EĞİMİ. Küre kuzey kutbu izleyiciye doğru EGIM kadar yatık duruyor.
   Bu tek sayı hem paralelleri hem kutupların yerini belirliyor:
     paralel (enlem φ):  yatay yarıçap 100·cosφ · dikey yarıçap onun sinEGIM
                         katı · merkezi 100·sinφ·cosEGIM kadar yukarıda
     kutup:              merkezden 100·cosEGIM uzakta
   φ+EGIM = 90° olan paralel çemberin kenarına TEĞET çıkıyor (üst noktası
   100·sin(φ+EGIM)); yani formül kendi kendini doğruluyor, elle ölçü verilmedi.

   MERİDYENLER AYNI EĞİMİ TAM OLARAK TAŞIMIYOR ve bu bilerek. Gerçek izdüşümde
   yatık bir kürenin meridyeni EĞİK bir elips oluyor (ekseni ne yatay ne dikey),
   yani her biri ayrı bir dönme açısı ister. Burada eksenleri dik bıraktık;
   tek görünür bedeli, kenardaki meridyenin 14° yatık değil dik durması. Bu bir
   veri görselleştirmesi değil, süs — ve dik eksen sayesinde dönme tek bir
   `scaleX` ile yapılabiliyor (aşağıda). Meridyenlerin dikey yarıçapı yine de
   kutupla eşitlendi (100·cosEGIM), yoksa çizgiler paralellerin kutbunun 3
   piksel üstünde birleşirdi. */
const EGIM = 14;
const EGIM_SIN = Math.sin((EGIM * Math.PI) / 180);
const EGIM_COS = Math.cos((EGIM * Math.PI) / 180);

const PARALELLER = [60, 30, 0, -30, -60].map((enlem) => {
  const r = (enlem * Math.PI) / 180;
  const rx = 100 * Math.cos(r);
  return {
    enlem,
    rx: yuvarla(rx),
    ry: yuvarla(rx * EGIM_SIN),
    cy: yuvarla(-100 * Math.sin(r) * EGIM_COS),
  };
});

/* DÖNME · MASKE DEĞİL, GERÇEK İZDÜŞÜM. Brif "içinden soldan sağa kayan bir
   maske" öneriyordu; maske gerekmedi çünkü daha ucuzu var. Boylamı λ olan bir
   meridyen ortografik izdüşümde yatay yarıçapı 100·cosλ olan bir elips, yani
   küre dönerken tek değişen şey o çarpan. Altı meridyen aynı `scaleX(cos)`
   keyframe'ini paylaşıyor, aralarındaki 30°'lik boylam farkı NEGATİF GECİKMEYE
   çevriliyor (30° = turun 1/12'si). Tek keyframe, altı gecikme, gerçek dönme.
   Çizgi kalınlığı `vector-effect="non-scaling-stroke"` ile ölçekten muaf;
   olmasaydı elips yassılırken dikey kenarları incelirdi.

   PERİYOT 91151 ms · asal. Brifteki on sürekli periyodun (1510 · 8900 · 9700 ·
   13711 · 16993 · 20000 · 26000 · 29023 · 42000 · 60000) hiçbirinin çarpanı
   değil, hiçbirine eşit değil. Yaklaşık 53 saniyede tam tur: sakin. */
/* ÇAKIŞMA DÜZELTMESİ (bu tur): eski değerler 52999 ve 37003 idi ve İKİSİ DE
   Yörünge adayında da kullanılıyordu; aynı lab sayfasındaki iki sahne
   senkron atıyordu. Yeni sayılar 91151 ve 85991; ikisi de asal, sayfadaki
   hiçbir periyoda eşit değil ve en yakınına %5,5 uzak (yakın oranlar
   saatlerce aynı fazda görünüp yavaş bir nabız üretiyor). */
const KURE_MS = 91151;
const MERIDYEN_RY = yuvarla(100 * EGIM_COS);
const MERIDYENLER = [0, 1, 2, 3, 4, 5].map((k) => ({
  k,
  /* Hareket kapalıyken duruş değeri. Yazılmazsa altı meridyen de scaleX(1)'de
     kalır, yani üst üste biner ve tel kafes tek bir elipse çöker. */
  f: yuvarla(Math.cos((k * Math.PI) / 6)),
  gec: Math.round((-KURE_MS * k) / 12),
}));

/* ------------------------------------------------------------ YÖRÜNGELER
   Üç ince halka; ÜÇÜ DE aynı yassılıkta (--kd1-yassi), yalnız yarıçapları ve
   eğimleri farklı. Yassılığın ortak olması şart: uçağın burnunu çeviren
   keyframe (kd1Yon) teğet açısını bu orandan hesaplıyor, halka başına farklı
   oran verilseydi uçak yörüngenin dışına bakardı.

   Halkalar kürenin diskini kesiyor ve bu kabul edilen bir şey: ince mavi bir
   yay koyu kürenin önünden geçince "uçuş hattı" gibi okunuyor. Arkada kalan
   yarıyı gizlemek iki maske daha isterdi, dekoratif bir sahne için bedeli
   ağır.

   PERİYOTLAR 58997 · 85991 · 23003 ms; üçü de asal, üçü de yukarıdaki listeden
   ve 91151'den bağımsız. Oranları tam sayıya uzak (2,565 · 1,609 · 1,594), yani
   üç gezgin yavaş bir nabızla senkronlanmıyor. İçteki halkanın daha hızlı
   olması bir bilgi değil, göze doğru gelen bir seçim.
   `animation-direction: alternate` hiçbir yerde yok (tuzak K). */
const YASSI = 0.34;

type Gezgin =
  | { tip: "bayrak"; ulke: Country; u: number }
  | { tip: "ucak"; u: number };

const YORUNGELER: {
  ad: string;
  r: number;
  egim: string;
  ms: number;
  gezginler: Gezgin[];
}[] = [
  {
    ad: "dis",
    r: 1,
    egim: "-13deg",
    ms: 58997,
    gezginler: [
      { tip: "bayrak", ulke: "dubai", u: 0.07 },
      { tip: "ucak", u: 0.58 },
    ],
  },
  {
    ad: "orta",
    r: 0.86,
    egim: "27deg",
    ms: 85991,
    gezginler: [{ tip: "bayrak", ulke: "ingiltere", u: 0.41 }],
  },
  {
    ad: "ic",
    r: 0.72,
    egim: "-47deg",
    ms: 23003,
    gezginler: [
      { tip: "bayrak", ulke: "kktc", u: 0.73 },
      { tip: "ucak", u: 0.24 },
    ],
  },
];

/** Bir gezginin CSS değişkenleri: periyot, faz gecikmesi ve hareket kapalıyken
 *  durduğu nokta (--kd1-cx / --kd1-sy) ile uçağın duruş açısı (--kd1-yon).
 *  Duruş değerleri olmasaydı hareketi kapatan ziyaretçide beş gezgin de
 *  yörüngenin sağ ucunda üst üste yığılırdı. */
function gezginStil(u: number, ms: number): React.CSSProperties {
  const a = 2 * Math.PI * u;
  /* Teğet açısı: konum (rx·cos u, ry·sin u), hız (-rx·sin u, ry·cos u).
     +45° lucide `Plane` ikonunun kendi yönü (burnu sağ üstte, yani -45°). */
  const yon = (Math.atan2(YASSI * Math.cos(a), -Math.sin(a)) * 180) / Math.PI + 45;
  return {
    "--kd1-t": `${ms}ms`,
    "--kd1-gec": `${-Math.round(ms * u)}ms`,
    "--kd1-cx": Math.cos(a).toFixed(4),
    "--kd1-sy": Math.sin(a).toFixed(4),
    "--kd1-yon": `${yuvarla(yon)}deg`,
  } as React.CSSProperties;
}

export default function CtaDekKure() {
  return (
    <section className="kd1">
      <div className="container-o">
        <div className="kd1-kart">
          <div className="kd1-ust">
            {/* Rozet bir cümle değil, üç ad. Sahne aria-hidden olduğu için
                ülkelerin ekran okuyucuya çıktığı tek yer de burası. */}
            <span className="kd1-rozet">
              <Globe size={14} strokeWidth={1.9} aria-hidden="true" />
              Dubai · İngiltere · KKTC
            </span>

            <h2 className="kd1-t">
              Kurulumunuzu
              <span className="kd1-t-ac">bugün başlatalım.</span>
            </h2>

            {/* TEK DÜĞME. Canlı CTA'da iki tane var (/basla · /iletisim); müşterinin
                attığı örnekte ve bu turun metin bütçesinde bir tane var, o yüzden
                ikincil düğme bu adayda yok. Hedef ve etiket aynen canlıdan. */}
            <SmartLink href="/basla" className="btn kd1-dugme">
              Kurulumu Başlat
              <ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />
            </SmartLink>
          </div>

          {/* Sahnede okunacak hiçbir şey yok: etiket, rakam, künye yok. Tek
              aria-hidden bütün katmanı erişilebilirlik ağacından düşürüyor. */}
          <div className="kd1-sahne" aria-hidden="true">
            <div className="kd1-alan">
              <span className="kd1-hale" />

              <div className="kd1-kure">
                <svg className="kd1-tel" viewBox="-105 -105 210 210">
                  {/* Kürenin siluetı. Dolgu YOK: gece zeminde yalnız çizgi. */}
                  <circle className="kd1-cember" r="100" vectorEffect="non-scaling-stroke" />

                  {PARALELLER.map((p) => (
                    <ellipse
                      key={p.enlem}
                      className="kd1-par"
                      cy={p.cy}
                      rx={p.rx}
                      ry={p.ry}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {MERIDYENLER.map((m) => (
                    <ellipse
                      key={m.k}
                      className="kd1-mer"
                      rx={100}
                      ry={MERIDYEN_RY}
                      vectorEffect="non-scaling-stroke"
                      style={
                        {
                          "--kd1-f": m.f,
                          "--kd1-mgec": `${m.gec}ms`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </svg>
              </div>

              {/* HALKA ÇİZGİLERİ VE GEZGİNLER AYRI KAPTA, boyama sırası için.
                  Kaplar `rotate` taşıyor, yani her biri kendi yığın bağlamını
                  açıyor ve içindeki bir disk komşu halkanın çizgisinin üstüne
                  çıkamıyor (z-index de kurtarmıyor, bağlam kapalı). Önce üç
                  çizgi, sonra beş gezgin basılınca hiçbir halka bayrağın
                  üstünden geçmiyor. */}
              {YORUNGELER.map((y) => (
                <span
                  key={y.ad}
                  className="kd1-yol"
                  style={{ "--kd1-r": y.r, "--kd1-egim": y.egim } as React.CSSProperties}
                >
                  <span className="kd1-halka" />
                </span>
              ))}

              {YORUNGELER.map((y) => (
                <span
                  key={y.ad}
                  className="kd1-yol"
                  style={{ "--kd1-r": y.r, "--kd1-egim": y.egim } as React.CSSProperties}
                >
                  {y.gezginler.map((g) => (
                    <span
                      key={g.tip === "bayrak" ? g.ulke : `ucak-${g.u}`}
                      className="kd1-gez"
                      style={gezginStil(g.u, y.ms)}
                    >
                      {g.tip === "bayrak" ? (
                        /* TUZAK H · Flag çıplak <svg viewBox="0 0 60 40"> basıyor,
                           width/height taşımıyor, serbest bırakılırsa 300x150'ye
                           şişiyor. Kap sabit px + overflow:hidden; svg'ye ayrıca
                           %100 veriliyor ki bayrak diskin içine otursun.
                           Disk ayrıca halkanın eğimini geri alıyor: bayraklar
                           yörünge yatık olsa da dik duruyor. */
                        <span className="kd1-disk">
                          <Flag country={g.ulke} />
                        </span>
                      ) : (
                        /* Uçak eğimi GERİ ALMIYOR: burnu yörüngenin teğetine
                           bakmalı, teğet de halkayla birlikte yatıyor. */
                        <span className="kd1-ucak">
                          <Plane strokeWidth={1.9} />
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
