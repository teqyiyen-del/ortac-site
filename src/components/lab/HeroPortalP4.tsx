"use client";

import { useOrtacStore, type Country } from "@/lib/store";
import { ORDER, PortalPicker, PortalPlate, Vista, useArtId } from "./HeroPortalShell";

/* ============================================================================
   ADAY P4 · "YANKI" — P1'İN KAPISI + P2'NİN DIŞA YAYILAN ÇİZGİLERİ
   CSS: src/app/css/lab-ptl4.css · ad alanı .ptl4-

   ------------------------------------------------------------------ İSTEK
   Müşterinin bu turdaki cümlesi birebir: "portal olayı için p1 iyi ama p2 deki
   gibi dışına doğru çizgiler yanarak ilerliyor ya daha bi portl hissi veriyor
   p1 e onu ekleyebiliriz sanki ama bi alana sıkıştırıp pat diye kesmek de
   istemiyorum pek p3 de o hoşuma gitmedi."

   Üç ayrı talimat olarak okundu:
     1) P1 TABAN. Kasa, açıklık, ülke çizimi, tabela, seçim mantığı ve geçişin
        kendisi P1'den BİREBİR alındı. Yeniden tasarlanan hiçbir şey yok.
     2) P2'DEN YALNIZCA DALGA. P2'nin koridor kurgusu (beş iç içe eşik, kaçış
        noktası, derinlik) GELMEDİ. Gelen tek şey P2'nin beğenilen davranışı:
        sıradaki halkanın yanıp sönerek bir sonrakine devretmesi. P2'de dalga
        koridorun sonundan size doğru geliyordu; burada kapının kendi ışık
        kenarından başlayıp DIŞA doğru gidiyor.
     3) KESİM YASAK. Aşağıdaki "ÜÇ AYRI GÜVENCE" bloğu bunun tek konusu.

   ------------------------------------------------------ YANKI NE, NEDEN YANKI
   Kapının dışında beş halka var ve hepsi kapının kendi siluetinin büyütülmüşü:
   aynı yay, aynı ayaklar, aynı zemin. Dalga kapının ışık kenarında (rim)
   başlıyor, sırayla beş halkadan geçiyor ve sönüyor. Yani ekranda gördüğünüz
   şey "kapının etrafına konmuş dekor" değil, KAPININ KENDİSİNİN dışa doğru
   tekrar tekrar yankılanması.

   Halkalar dışa gittikçe BASIKLAŞIYOR: yarıçapları yatayda 2.6 kat hızlı
   büyüyor (rx 187→322, ry 174→226). İki sebep var, biri fikir biri ölçü.
   Fikir: yayılan bir dalga enerjisini kaybederken düzleşir, dikey bir halka
   zinciri "büyüyen kapılar" (yani P2'nin koridoru) gibi okunurdu. Ölçü:
   sahnede yatay yer BOL, dikey yer YOK — ölçümler CSS dosyasında.

   ------------------------------------------------- ÜÇ AYRI GÜVENCE · KESİM YOK
   (a) BÜTÜN MÜREKKEP viewBox'IN İÇİNDE. En dıştaki halka x −142..502, y
       −56..300; yankı tuvali x −162..522, y −66..396. preserveAspectRatio
       "meet" olduğu için tuvalin tamamı her zaman ekranda, yani SVG hiçbir
       koşulda kırpmıyor. Bu, "çizgiyi kabın kenarında kesme" ihtimalini
       geometriyle ortadan kaldırıyor.
   (b) MASKE. Yankı katmanının tamamı, kutusuna içten teğet bir elips
       gradyanıyla maskeleniyor: %74'e kadar tam opak, %100'de sıfır. Yani
       mürekkep kutunun kenarına VARMADAN sönüyor; dıştaki halkaların ayakları
       zemine değmeden dağılıyor, en dıştaki halka yalnızca soluk bir kaş
       olarak kalıyor. Ölçülen eğri CSS dosyasında.
   (c) KUTU SAHNENİN İÇİNDE. Yankı kutusu sahne yüksekliğinin 0.952'si,
       genişliği ise 1.409 × sahne YÜKSEKLİĞİ. Dört kırılımda da sahne
       genişliğinin altında kalıyor (ölçümler CSS dosyasında).

   ------------------------------------------------------------- NEYİ FEDA EDİYOR
   1) KAPI KÜÇÜLDÜ. Sahne yüksekliği sabit ve P1'in kapısı o yüksekliğin
      neredeyse tamamını yiyordu (kemer merkezinin üstünde yalnızca 14 birim
      boşluk kalıyordu, halka için 8 birim bile yetmezdi). Kapı ile yankı aynı
      dikey bütçeyi paylaşmak zorunda: kapı P1'dekinin %72'si (1440x900'de
      211px yerine 153px), buna karşılık ekranda duran "portal nesnesi"
      (kapı + yankı) P1'inkinden daha büyük.
   2) DAR EKRANDA YANKI YOK. 700px altında kapının solunda kemer dışına 14
      birim yer var (tabela satırın sağını yiyor). Ölçüldü: oraya halka koymak
      kaçınılmaz olarak kesmek demekti, yani müşterinin tek net yasağı. O
      yüzden 700px altında sahne AYNEN P1 — müşteri onu zaten beğendi.
   3) SİLUET KLİŞESİ P1'DEN DEVRALINDI. Şehir silueti bugünkü canlı sahnede
      bilerek elenmişti; P1 o kararı tersine çevirdi, P4 de aynı yerde duruyor.

   ------------------------------------------------------------- SEÇİNCE NE OLUYOR
   P1'in geçişi aynen duruyor (açıklık bir an kararıyor, giden ülke seçim
   yönünün tersine kayıp siliniyor, gelen yerine oturuyor). ÜSTÜNE: dalganın
   taşıdığı ışık o ülkenin göğünün en parlak durağına (--pv-s3) dönüyor, yani
   seçim yalnız kapının içini değil kapının etrafındaki yankıyı da yeniden
   renklendiriyor. P2'de kazanan davranış buydu.

   ------------------------------------------------------------- GEOMETRİ
   KAPI TUVALİ 360 × 330, P1 ile BİREBİR aynı koordinatlar (zemin y=300,
   açıklık x 40..320, kemer merkezi (180,170), yarıçap 140, kasa dışı 166).
   YANKI TUVALİ −162 −66 684 462. İkisi ayrı <svg> ama AYNI kullanıcı
   koordinatında: yankı kutusu, kapı kutusunun yatayda %190'ı ve dikeyde
   %140'ı; tuvali de kapı tuvalinin tam o oranda büyütülmüşü (684 = 360×1.9,
   462 = 330×1.4) ve iki kutu aynı merkezde. Bu yüzden ölçek ve orijin her
   ekran genişliğinde kendiliğinden çakışıyor — cebiri CSS dosyasında.
   ========================================================================= */

/* Açıklığın konturu — P1'den birebir. Tek dize hem kırpma maskesi hem ışık
   kenarı: ikisi ayrı yazılsaydı biri değiştiğinde öteki sessizce kayardı. */
const OPEN = "M40 300 V170 A140 140 0 0 1 320 170 V300 Z";

/* YANKILAR — [rx, ry]. Sıra içten dışa; dalganın sırası da bu (P2'de tersiydi,
   çünkü orada kaynak koridorun sonundaydı; burada kaynak kapının kendisi).
   ry adımları 10..15 birim: dikey bütçe 81 birim ve beşi de oraya sığmak
   zorunda. rx adımları 26..42 birim, yani yatayda 2.7 kat hızlı.

   İLK HALKANIN ry'si 174 DEĞİL 178. 174'te kemerin tepesiyle arasında 8 birim
   kalıyordu (1440x900'de 4.2 piksel, konturlar düşünce ekranda 2.9 piksellik
   bir boşluk) ve o incelikte halka "yankı" değil "kasanın ikinci çizgisi" gibi
   okunuyordu. 178'de boşluk 12 birim; yanlardaki 21 birimlik boşlukla arasında
   hâlâ fark var, ama o fark zaten dalganın basıklaşmasının kendisi. */
const ECHO: readonly (readonly [number, number])[] = [
  [187, 178],
  [213, 188],
  [244, 199],
  [280, 212],
  [322, 227],
];

/** Kapının silueti, büyütülmüşü. Ayaklar zemine (y=300) iniyor: halkanın iki
 *  ucu boşlukta bitmiyor, kapının ayaklarıyla aynı hizada zemine basıyor.
 *  Dıştaki halkalarda o ayaklar maskeyle zemine varmadan dağılıyor. */
const arch = (rx: number, ry: number) =>
  `M${180 - rx} 300 V170 A${rx} ${ry} 0 0 1 ${180 + rx} 170 V300`;

export default function HeroPortalP4() {
  const country = useOrtacStore((s) => s.country);
  const id = useArtId("p4");
  const index = ORDER.indexOf(country);

  return (
    <div className="ptl">
      <PortalPicker />

      {/* data-c sahnenin kökünde: ülke paleti (--pv-*) buradan aşağı miras
          kalıyor — yankının taşıdığı ışık, eşiğin huzmesi ve tabelanın rengi
          seçili ülkeyi okuyor. Açıklığın içindeki üç dünya kendi data-c'siyle
          bu mirası yerel olarak eziyor (geçişte iki ülke aynı anda ekranda). */}
      <div className="ptl-stage ptl4-stage ptl-tone" data-c={country} aria-hidden="true">
        {/* akt: fare kabın üstündeyken dalga duruyor. Kapı kalıbın içinde
            (css/aktarim.css), burada yalnızca kabı işaretliyoruz. Kap kapı
            kutusu, çünkü hem rim hem halkalar onun altında. */}
        <div className="ptl4-art ptl-center akt">
          {/* ---------------------------------------------------- YANKI KATMANI
              Kapının ARKASINDA duruyor (DOM'da önce, ikisi de position'lı).
              Zemin çizgisi ve eşikten taşan huzme de burada: ikisi de kapı
              tuvalinden geniş ve burada kenarları kırpılmadan sönebiliyorlar.
              700px altında bu katman komple kapanıyor, o yüzden dar ekran için
              ikisinin P1'deki dar sürümü kapı katmanında ayrıca duruyor. */}
          <svg
            className="ptl4-halo"
            viewBox="-162 -66 684 462"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <defs>
              {/* Eşikten taşan huzme. Dış durak SAYDAM, opak siyah değil:
                  hero'nun arkasında bir ızgara var ve opak bir durak onu silen
                  bir dikdörtgen bırakır (canlı sahnede yaşandı). */}
              <linearGradient id={`${id}sw`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--pv-s2)" stopOpacity="0.62" />
                <stop offset="1" stopColor="var(--pv-s2)" stopOpacity="0" />
              </linearGradient>
              {/* Zemin çizgisi iki ucunda sönüyor. Maske zaten söndürüyor ama
                  gradyan sönümü daha uzun: çizgi maskeye VARMADAN bitiyor,
                  yani iki söndürücü üst üste biniyor ve hangisi olursa olsun
                  kenarda ani bir kesim kalmıyor. */}
              <linearGradient id={`${id}fw`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1c1c1c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2f2f2f" />
                <stop offset="1" stopColor="#1c1c1c" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path className="ptl4-spill" d="M40 300 H320 L470 384 H-110 Z" fill={`url(#${id}sw)`} />
            {/* Zemin çizgisi tuvalin kenarına DEĞMİYOR (−158..518, tuval
                −162..522): "bütün mürekkep tuvalin içinde" güvencesi bu
                dikdörtgen için de sözlük anlamıyla doğru olsun diye. Zaten
                gradyanı uçlarda saydam ve maske ondan çok önce sıfırlıyor,
                ama kenara dayanan bir kutu sonraki turda kolayca taşar. */}
            <rect x="-158" y="299.4" width="676" height="1.4" fill={`url(#${id}fw)`} />

            {/* HALKALAR. --akt-i içten dışa artıyor: ışık kapıdan çıkıp dışarı
                gidiyor. Kalınlık merdiveni (2.0 → 1.2) dalganın enerji
                kaybını taşıyor; P2'de aynı merdiven derinliği taşıyordu. */}
            {ECHO.map(([rx, ry], i) => (
              <path
                key={rx}
                className="ptl4-echo akt-durak"
                data-k={i + 1}
                d={arch(rx, ry)}
                style={{ "--akt-i": i + 1 } as React.CSSProperties}
              />
            ))}
          </svg>

          {/* ----------------------------------------------------- KAPI KATMANI
              P1'in tuvali, koordinatları ve çizim sırası birebir. */}
          <svg
            className="ptl4-door"
            viewBox="0 0 360 330"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <defs>
              <clipPath id={`${id}c`}>
                <path d={OPEN} />
              </clipPath>
              {/* Dar ekran sürümleri: yankı katmanı kapalıyken zemin ve huzme
                  buradan geliyor. Uçları kapı tuvalinin İÇİNDE sönüyor. */}
              <linearGradient id={`${id}sn`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--pv-s2)" stopOpacity="0.62" />
                <stop offset="1" stopColor="var(--pv-s2)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`${id}fn`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1c1c1c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2f2f2f" />
                <stop offset="1" stopColor="#1c1c1c" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g clipPath={`url(#${id}c)`}>
              {/* Dünyalar arası boşlukta görünen kare: geçişin ortasında
                  açıklık bir an bu koyuluğa iniyor, kapı bir an kapanıp başka
                  bir yere açılıyor gibi okunuyor. */}
              <rect x="40" y="20" width="280" height="290" fill="#090909" />

              {ORDER.map((c, i) => (
                <g
                  key={c}
                  className="ptl4-world"
                  data-on={c === country}
                  /* Kayma yönü seçim yönünden: giden ülke, gelenin geldiği
                     yönün tersine çıkıyor. Tek sayı (sıra farkı) hem yön hem
                     mesafe veriyor. */
                  style={{ "--ptl4-d": i - index } as React.CSSProperties}
                >
                  {/* P1'deki kadrajın aynısı: kulenin tepesi kemerin altında
                      ~50 birim boşluk bırakıyor, tuvalin yanları açıklıktan
                      geniş kalıyor, yani hiçbir kadrajda gökyüzü bitmiyor. */}
                  <g transform="translate(-38 74) scale(1.09)">
                    <Vista c={c as Country} id={`${id}${c}`} />
                  </g>
                </g>
              ))}
            </g>

            {/* Işığın kasaya vurduğu kenar. Dalganın SIFIRINCI durağı da bu:
                yanma kapının kendi ışığında başlıyor, sonra dışarı gidiyor. */}
            <path className="ptl4-rim akt-durak" d={OPEN} style={{ "--akt-i": 0 } as React.CSSProperties} />

            {/* ---- DEĞİŞMEYEN KASA (P1'den birebir) ---- */}
            <g className="ptl4-frame">
              <path className="ptl4-ln" d="M14 300 V170 A166 166 0 0 1 346 170 V300" />
              <path className="ptl4-hr" d="M54 300 V170 A126 126 0 0 1 306 170 V300" />
              <path className="ptl4-hr" d="M22 170 H38 M322 170 H338" />
              <path
                className="ptl4-hr"
                d="M311.6 122.1 L335 113.2 M279 71 L297.4 52.6 M227.9 38.4 L236.8 14 M132.1 38.4 L123.2 14 M81 71 L62.6 52.6 M48.4 122.1 L25 113.2"
              />
            </g>
            <path className="ptl4-key" d="M166 8 H194 L188 34 H172 Z" />

            {/* ---- DAR EKRAN EŞİĞİ ---- */}
            <path className="ptl4-spill ptl4-dar" d="M40 300 H320 L356 330 H4 Z" fill={`url(#${id}sn)`} />
            <rect className="ptl4-dar" x="0" y="299.4" width="360" height="1.4" fill={`url(#${id}fn)`} />
          </svg>
        </div>

        <PortalPlate c={country} />
      </div>
    </div>
  );
}
