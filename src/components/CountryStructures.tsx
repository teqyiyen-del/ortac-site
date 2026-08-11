"use client";

import { useId, useState } from "react";
import { Building2, Check, Globe, Split, Store, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent } from "@/lib/countryContent";

/* YAPI SEÇİMİ — "serbest bölge mi, mainland mi?" · CANLI SÜRÜM
 * Ad alanı: .ys-        CSS: src/app/css/structures.css
 *
 * ===========================================================================
 * BU TURDA NE OLDU: /lab/yapi'daki Y5 ADAYI CANLIYA ALINDI
 *
 * Bölümün bir önceki canlı hâli iki kapak resimli karttı (.ysc-*): solda
 * serbest bölge şeması, sağda mainland şeması, altlarında açılan liste.
 * Müşteri ikinci lab turunda o kalıbı değil, TEK HARİTA + SAĞDA İKİ KART
 * kalıbını seçti ("s3 ü daha mantıklı buluyoruz") ve bu tur Y5'i onayladı:
 *   "y5 iyi olmuş mainland fln muhabbeti için … sonra siteye live koyabilirsin."
 *
 * Y5'in ayırt edici kararı NÖBET ve o karar burada BOZULMADAN taşındı: boşta
 * hiçbir şey seçili değil ama hiçbir şey de durmuyor. Tek bir tur boyunca önce
 * serbest bölge, sonra mainland kısık sesle kendini gösteriyor; fare kartlara
 * değdiği ya da bir seçim yapıldığı anda nöbet TAMAMEN susuyor ve harita tek
 * bir yapıya tam mavisiyle kilitleniyor. Bu, müşterinin iki önerisinden
 * ikincisiydi ("ya üzerlerinde değilken bile ikisini az gösteren şekilde
 * dinamik dursun ya da sanki serbest bölge başlangıçta seçili gelmiş gibi de
 * yapabiliriz"); baştan seçili gelen sürüm Y4 olarak labda duruyor.
 *
 * ---------------------------------------------------------------------------
 * AD ALANI: NEDEN .y5- / .yhm- DEĞİL, .ys-
 *
 * Labdaki dosyalar (css/lab-y5.css, css/lab-yhm.css) ve canlı CSS AYNI
 * globals.css'e giriyor. Yani /lab/yapi sayfası açık kalmasa bile iki kural
 * kümesi aynı belge içinde yan yana duruyor; canlıda .y5- kullansaydık lab'da
 * yapılan bir deneme sessizce canlıyı ezerdi (ya da tersi, import sırasına
 * bağlı olarak). O yüzden canlı sürümün kendi öneki var: .ys-
 *
 * ÇAKIŞMA KANITI: repoda `\.ys-` deseni bu tur öncesinde HİÇ geçmiyordu
 * (grep -rn "\.ys-" src → 0 satır; "ys-" araması yalnızca eski .ysc-* ile
 * eşleşiyordu, o da regex olarak farklı bir dize).
 *
 * ESKİ .ysc-* SİLİNDİ, BIRAKILMADI. Aynı kararı bir önceki tur .stx-* için de
 * vermiştik ve gerekçesi aynı: kullanılmayan bir bölüm CSS'i dosyada
 * durduğunda altı ay sonra "hangisi canlı?" sorusunu doğuruyor. Geçmiş git'te
 * duruyor, ihtiyaç olursa oradan gelir.
 *
 * ---------------------------------------------------------------------------
 * SAHNE BURADA, LAB BİLEŞENİNDEN İTHAL EDİLMİYOR
 *
 * Labda harita tek nüsha bir bileşende (components/lab/StructuresYapiScene).
 * Canlı o dosyayı import ETMİYOR, kendi kopyasını basıyor. İki sebep:
 *   1. O bileşen sınıf adlarını gövdesinde .yhm-* olarak yazıyor; canlı ad
 *      alanı zorunluluğu (yukarıdaki madde) onu doğrudan kullanılamaz kılıyor.
 *   2. components/lab/* hâlâ üç adayın karşılaştırma zemini ve kurcalanmaya
 *      açık. Canlı bir sayfanın gövdesi lab'daki bir denemeye bağlı olmamalı.
 * Bedeli: geometri iki yerde duruyor. Kabul edildi — lab kopyası bir kıyas
 * arşivi, bu kopya ürün.
 *
 * ---------------------------------------------------------------------------
 * HARİTA NEDEN 560x400 (LABDA 560x364)
 *
 * Müşteri: "haritayı daha da büyük yapabiliriz bu arada sağdaki kartlarla aynı
 * yükeklikte fln." Bu bir ölçü işi ve çözümü ızgarada:
 *
 *   .ys-grid iki sütunlu ve align-items: stretch. Harita kutusu ile kart
 *   sütunu AYNI ızgara satırında; satırın yüksekliği ikisinin doğal
 *   yüksekliğinin büyüğü, ve İKİSİ DE o yüksekliğe geriliyor. Yani "aynı
 *   yükseklik" bir ayar değil, yerleşimin tanımı: sayı ne olursa olsun eşit.
 *
 * Geriye "hangisi taşırıyor" sorusu kalıyor ve iki taraf da taşmayı düzgün
 * karşılıyor:
 *   · Kart sütunu kısa kalırsa iki kart flex: 1 ile boşluğu paylaşıyor —
 *     kartlar zaten büyüsün isteniyordu, artan yer içeriye gidiyor.
 *   · Harita kutusu kısa kalırsa sahne kutunun içinde DİKEYDE ORTALANIYOR ve
 *     artan yer yukarıda DENİZ, aşağıda KARA olarak açılıyor. İki dolgu da
 *     bilerek viewBox'ın dışına çiziliyor (SEA … V-400, LAND … V760) ve
 *     <svg overflow: visible> ile kutunun geri kalanına akıyor; .ys-map'in
 *     overflow:hidden'ı sınırı çiziyor. Böylece kutu ne kadar gerilirse
 *     gerilsin beyaz bir bant açılmıyor, "daha çok harita" görünüyor.
 *     Ölçüldü: 1024'te fark 44px (22 deniz + 22 kara), 1100'de 15px,
 *     1200 ve üstünde 0. Hepsini alta yığmak da denendi ve tek parça 44px'lik
 *     boş kara "harita bitti ama kutu bitmedi" gibi okunuyordu.
 *     "Sahneyi preserveAspectRatio ile esnetmek" alternatifi elendi: esnetmek
 *     ya çizimi bozar (none) ya da HTML etiketlerin yüzdelik konumlarını
 *     SVG'den ayırır (meet/slice) — etiketler SVG <text> değil, gerçek CSS
 *     tipografisi olduğu için ikincisi kabul edilemez.
 *
 * viewBox 364'ten 400'e ÇIKTI, yani sahnenin oranı 0.650'den 0.714'e. Sebep:
 * kart sütununun doğal yüksekliği 1200px'lik kapsayıcıda ~400px ve 0.65 oranlı
 * bir harita o yüksekliğe ancak ~610px genişlikle ulaşıyordu; o genişlik kart
 * sütununu 460px'in altına düşürüyor, daralan kart metni daha çok sarıyor ve
 * kart sütunu yeniden uzuyordu. Daha dik bir sahne bu kısır döngüyü kırıyor.
 * ÖLÇÜLEN SONUÇ (1440 ve 1280'de kapsayıcı 1200'de sabit): harita 588x459,
 * kart sütunu 512x459 — birbirinin AYNISI, kart başına 512x223. Karşılaştırma:
 * canlının bir önceki hâlinde kart başına bir şema bandı ~511x146 idi, labdaki
 * Y5'te harita 520x338 ve kart 602x185.
 * Eklenen 36 birim tamamen alt kenardaki boş kara; hiçbir düğüm kaymadı,
 * onaylanmış kompozisyon aynen duruyor.
 *
 * ---------------------------------------------------------------------------
 * KARAR KURALI NEREDE DURUYOR — VE NEDEN HARİTANIN ALTINDA DEĞİL
 *
 * Müşteri kararsızdı: "şu karar kuralı zımbırtısını haritanın altına fln mı
 * koysak bilemedim." Üç yerleşim kuruldu ve ölçüldü; seçilen A.
 *
 *   A) IZGARANIN ÜSTÜNDE, TAM GENİŞLİK  ← SEÇİLEN
 *      Kural başlıktan sonra, harita ve kartlardan önce. Sağ sütun SADECE
 *      kartlardan oluşuyor, yani "harita = kartlar" eşitliği tam olarak
 *      müşterinin cümlesindeki iki nesne arasında kuruluyor.
 *   B) SAĞ SÜTUNDA, KARTLARIN ÜSTÜNDE  (labdaki Y5 düzeni)
 *      Eşitlik iddiası bulanıklaşıyor: sağ sütun artık kural + kartlar, yani
 *      harita kart yığınından kuralın boyu kadar uzun kalıyor. Ayrıca kural
 *      sütunun içine girince sütun daralıyor ve kartlar küçülüyor — bir
 *      önceki turun asıl isteğine ters.
 *   C) HARİTANIN ALTINDA  (müşterinin aklındaki)
 *      Sol sütun harita + kural oluyor. Bu, 2. maddeyle DOĞRUDAN ÇELİŞİYOR:
 *      harita artık satırın tamamı değil, satır eksi kural kadar. "Kartlarla
 *      aynı yükseklik" ancak kuralı da haritadan sayarsak doğru olur.
 *      Okuma sırası da bozuluyor: kural, sonucundan sonra geliyor.
 *
 * ÖLÇÜM (1440 · harita yüksekliği − kart sütunu yüksekliği · bölümün toplamı):
 *   A →   459 − 459 =    0px · 931px
 *   B →   564 − 436 = +127px · 929px   (haritada 104px boş deniz+kara)
 *   C →   459 − 559 = −100px · 925px   (harita kart yığınından kısa kalıyor)
 * 1024'te fark daha da açılıyor: B +151px, C −127px, A yine 0. Bölümün toplam
 * yüksekliği üçünde de birbirine 6px yakın, yani yükseklik ayırt edici DEĞİL;
 * ayıran şey eşitlik iddiası ve okuma sırası. 320px'te üçü de aynı tek sütuna
 * düşüyor, tek fark sıralama: A'da kural spottan hemen sonra, B ve C'de
 * haritadan SONRA okunuyor.
 *
 * A'nın asıl gerekçesi ölçü değil AKIŞ: bu bölüm
 * hero'dan hemen sonraki İLK bölüm (ülke giriş bloğu akıştan çıktı), ziyaretçi
 * ülkeyi daha tanımadan buraya düşüyor. Kural, kartların dipnotu değil sebebi;
 * fiziksel olarak da önlerinde durması gerekiyor.
 *
 * ÇATAL KALKTI. Eski canlı sürümde kuralın altından iki kol inip iki kartın
 * merkezine bağlanıyordu. Yeni yerleşimde kartlar YAN YANA DEĞİL, sağ sütunda
 * ALT ALTA; iki kol ya haritayı gösterirdi ya da aynı noktaya inerdi. Anlam
 * taşımayan 34px'lik bir süs, yeni büyümüş bir bölümden çıkarıldı.
 *
 * ---------------------------------------------------------------------------
 * ERİŞİLEBİLİRLİK
 * Kart başlıkları gerçek <input type="radio">; rol, "checked" durumu ve ok
 * tuşlarıyla geçiş tarayıcıdan geliyor. Bu depoda taklit durum (rolü olmayan
 * <span aria-current>) erişilebilirlik ağacında adsız kalmıştı, o yüzden taklit
 * yok. Açılışta hiçbir radyo seçili değil — seçili gelseydi bu sürüm Y5 değil
 * Y4 olurdu.
 *
 * HAREKET tamamen CSS ve tamamı `prefers-reduced-motion: no-preference`
 * kapısının içinde. useReducedMotion kullanılmıyor: bu depoda beş ayrı kalıpta
 * hidrasyon hatası çıkardı ve saf CSS olunca sunucuda basılan işaretleme
 * istemcidekiyle birebir aynı.
 *
 * İDDİA SINIRI
 * Ekranda görünen her cümle countryContent.structures'tan. Burada üretilen tek
 * metin üç aktörün adı, iki kart etiketi ("BAE dışına/içine satıyorsanız" —
 * data.rule cümlesinin kendi ifadesi), açılan listenin başlığı ve şemanın
 * ölçekli olmadığını söyleyen not. Süre, banka onayı, vergi ya da firma
 * bilgisi (yıl, ofis, müşteri sayısı) hakkında hiçbir iddia yok.
 * ======================================================================== */

const VIEWS = [
  { key: "free", when: "BAE dışına satıyorsanız", Icon: Globe },
  { key: "main", when: "BAE içine satıyorsanız", Icon: Store },
] as const;

type YapiState = "none" | "free" | "main";

/* Şemanın sözlü karşılığı. Nöbet bir animasyon; metin animasyonu değil DURUMU
   anlatıyor, çünkü reduce açıkken nöbet hiç çalışmıyor ve aynı metnin o hâlde
   de doğru olması gerekiyor. */
const ALT: Record<YapiState, string> = {
  none: "Şematik harita: henüz bir yapı seçilmedi. Ülkenin içinde çitli serbest bölge parselleri, dışarıda ve içeride birer müşteri duruyor. Bir yapı seçildiğinde harita o yapıya göre değişiyor.",
  free: "Şematik harita: serbest bölge seçili. Şirket ülkenin içindeki çitli bir alanda; satış kıyıyı geçip BAE dışındaki müşteriye gidiyor.",
  main: "Şematik harita: mainland seçili. Şirket ülkenin genelinde; satış sınırın içinde kalıp BAE içindeki müşteriye gidiyor.",
};

/* ============================ HARİTA GEOMETRİSİ ============================
   Tek koordinat sistemi: hem SVG hem üstteki HTML etiketler bu sayıları
   kullanıyor. Etiketler SVG <text> DEĞİL çünkü (a) gerçek CSS tipografisi
   istiyoruz, (b) daralınca punto kontrolü yalnız CSS'te var. Yüzdeye çevirmeyi
   pct() yapıyor: bir düğümü kaydırınca etiketi de kendiliğinden kayıyor. */
const VB_W = 560;
const VB_H = 400;

/* SAHNENİN viewBox DIŞINA TAŞAN PAYI.
   Izgara satırı sahneden uzun olduğunda sahne kutunun içinde DİKEYDE ORTALANIYOR
   (CSS: .ys-scene ve .ys-cap'in ikisinde de margin-top:auto) ve artan yer
   yukarıda deniz, aşağıda kara olarak açılıyor. Yani harita kutusu gerildikçe
   "daha çok harita" görünüyor, boş bant açılmıyor. İki dolgu bu yüzden
   viewBox'ın dışına kadar çiziliyor; .ys-svg overflow:visible, .ys-map
   overflow:hidden.

   Ölçülen en büyük boşluk 1024px'te 59px (yani üstte ~30, altta ~30 birim
   civarı); 400 ve 760 fazlasıyla yeter, ve iki sayı da yalnızca dolgu
   yüzeyini büyütüyor — hiçbir düğümün koordinatı değişmiyor. */
const SEA_OVER = -400;
const LAND_OVER = 760;

const pct = (x: number, y: number) => ({
  left: `${(x / VB_W) * 100}%`,
  top: `${(y / VB_H) * 100}%`,
});

/* Kıyı soldan sağa yükseliyor: deniz sol üstte büyük bir üçgen bırakıyor.
   Sebep kompozisyon — "dışarıdaki müşteri" düğümüne denizde yer gerekiyordu ve
   iki ok birbirinin tam tersi yöne gidince kıyas tek bakışta okunuyor. */
const COAST = "M0 116 C 120 106, 212 92, 300 74 C 392 55, 472 34, 560 20";
const SEA = `M560 20 C 472 34, 392 55, 300 74 C 212 92, 120 106, 0 116 V${SEA_OVER} H560 Z`;
const LAND = `${COAST} V${LAND_OVER} H0 Z`;

/* Karanın dokusu. Bilgi taşımıyor, "burası bir şehir" diyor. Kıyıyı
   taşmasınlar diye kara yoluyla kırpılıyorlar. Taşma bandına uzatılmadılar:
   0.06 alfayla zaten sınırdalar, ve bandın işi boşluk olmak. */
const ROADS = [
  "M-20 176 C 120 164, 300 186, 580 158",
  "M-20 276 C 140 266, 330 288, 580 258",
  "M120 400 C 108 300, 124 200, 104 84",
  "M348 400 C 340 300, 356 200, 334 40",
];

/* Serbest bölgeler: şehrin içine dağılmış, kendi çitleri olan alanlar.
   Şirketi barındıran parsel ayrı (HOST) çünkü onun üç ayrı hâli var. Dördü de
   bilerek etiketlerin ve okların geçtiği koridorların dışında. */
const PARCELS = [
  { x: 96, y: 196, w: 96, h: 64 },
  { x: 416, y: 158, w: 80, h: 54 },
  { x: 110, y: 300, w: 88, h: 54 },
  { x: 250, y: 300, w: 84, h: 50 },
];
const HOST = { x: 238, y: 160, w: 124, h: 96 };
const CO = { x: 270, y: 188, w: 60, h: 40 };
const GLOBE = { cx: 86, cy: 52, r: 26 };
const SHOP = { x: 420, y: 272, w: 62, h: 48 };

/* İki satış yolu. Başlangıçları şirket kutusunun kenarları, bitişleri
   düğümlerin kenarından ~8 birim önce (ok başı orada duruyor).

   Uzunlukları KASITLI OLARAK EŞİT DEĞİL: dışarı giden yol ~215 birim, içeri
   giden ~118. Sevkiyat ikisinde de aynı sürede yola çıkıp aynı anda varıyor,
   yani değişen tek şey katedilen mesafe — bölümün anlattığı fark zaten bu. */
const P_OUT = "M266 202 C 222 194, 166 148, 108 79";
const P_IN = "M332 220 C 374 236, 386 264, 412 292";

/* Şirketin etiketi her durumda AYNI yerde: şirketin hemen üstünde. Etiket bir
   ülkeyi değil, SİZİN hangi yetki alanında olduğunuzu söylüyor; o yüzden
   şirketle birlikte duruyor ve seçim değişince yerinde değişiyor. Nötr hâlde
   "Şirketiniz" yazıyor, yoksa haritanın ortasındaki kutunun ne olduğu belirsiz
   kalıyor: iki müşterinin adı var, şirketin adı yok. */
const CHIP = { x: 300, y: 154 };
const CO_LABEL = "Şirketiniz";

/** Ok başı. Varsayılan yönü +x; açıyı çağıran veriyor çünkü iki yol da eğik. */
function Head({ x, y, deg, role }: { x: number; y: number; deg: number; role: string }) {
  return (
    <path
      d="M-3.4 -5 L6 0 L-3.4 5 Z"
      className="ys-ah"
      data-role={role}
      transform={`translate(${x} ${y}) rotate(${deg})`}
    />
  );
}

/** Haritanın kendisi. Durumu (data-state) sarmalayıcı veriyor; bu bileşen
 *  hangi ögenin ne renk olacağını bilmiyor, hepsi CSS'te. */
function Scene({ state, name, alt }: { state: YapiState; name: string | null; alt: string }) {
  /* React'in ürettiği id noktalama taşıyor; url(#…) düz id karakteri istiyor
     (bkz. scenes/SetupScenes.tsx'teki aynı kalıp). */
  const uid = `ys${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const clipId = `${uid}-land`;

  return (
    <div className="ys-scene">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="ys-svg" role="img" aria-label={alt}>
        <defs>
          <clipPath id={clipId}>
            <path d={LAND} />
          </clipPath>
        </defs>

        <path d={SEA} className="ys-sea" />
        <path d={LAND} className="ys-land" />

        <g clipPath={`url(#${clipId})`} aria-hidden="true">
          {ROADS.map((d) => (
            <path key={d} d={d} className="ys-road" />
          ))}
        </g>

        <path d={COAST} className="ys-coast" />

        {PARCELS.map((p) => (
          <rect
            key={`${p.x}-${p.y}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx="12"
            className="ys-parcel"
          />
        ))}

        {/* Şirketin çiti. Serbest bölgede beliriyor, mainland'de kayboluyor.
            Bölümün tek mekanizma cümlesi bu. */}
        <rect x={HOST.x} y={HOST.y} width={HOST.w} height={HOST.h} rx="14" className="ys-host" />

        {/* Dışarı giden satış. Sıra önemli: yol → sevkiyat → ok başı. Tane ucun
            üstünden geçerken ok başını örtmesin diye ok başı en sonda. */}
        <path d={P_OUT} className="ys-path" data-role="out" />
        <path d={P_OUT} pathLength={1} className="ys-flow" data-role="out" />
        <Head x={108} y={79} deg={230} role="out" />

        {/* İçeride kalan satış */}
        <path d={P_IN} className="ys-path" data-role="in" />
        <path d={P_IN} pathLength={1} className="ys-flow" data-role="in" />
        <Head x={412} y={292} deg={47} role="in" />

        {/* Siz. Konumu hiç değişmiyor: değişen şey altındaki zemin ve çit. */}
        <rect x={CO.x} y={CO.y} width={CO.w} height={CO.h} rx="12" className="ys-co" />
        <Building2
          x={CO.x + 21}
          y={CO.y + 11}
          width={18}
          height={18}
          strokeWidth={2.1}
          className="ys-co-ic"
        />

        {/* Denizdeki müşteri: sınırın dışı */}
        <circle cx={GLOBE.cx} cy={GLOBE.cy} r={GLOBE.r} className="ys-node" data-role="out" />
        <Globe
          x={GLOBE.cx - 9}
          y={GLOBE.cy - 9}
          width={18}
          height={18}
          strokeWidth={2.1}
          className="ys-node-ic"
          data-role="out"
        />
        {/* Varış halkası: içi boş, ikonu kapatmıyor. Büyürken viewBox'ı
            taşmıyor (86 − 26·1.22 = 54 > 0). */}
        <circle cx={GLOBE.cx} cy={GLOBE.cy} r={GLOBE.r} className="ys-hit" data-role="out" />

        {/* Karadaki müşteri: iç pazar */}
        <rect
          x={SHOP.x}
          y={SHOP.y}
          width={SHOP.w}
          height={SHOP.h}
          rx="14"
          className="ys-node"
          data-role="in"
        />
        <Store
          x={SHOP.x + 22}
          y={SHOP.y + 15}
          width={18}
          height={18}
          strokeWidth={2.1}
          className="ys-node-ic"
          data-role="in"
        />
        <rect
          x={SHOP.x}
          y={SHOP.y}
          width={SHOP.w}
          height={SHOP.h}
          rx="14"
          className="ys-hit"
          data-role="in"
        />
      </svg>

      {/* Müşteri etiketleri sabit: haritanın sorusu ("müşteriniz hangi
          tarafta?") seçim yapılmadan önce de ekranda duruyor. */}
      <span
        className="ys-pin"
        data-side="out"
        data-on={state === "free" || undefined}
        style={pct(GLOBE.cx + GLOBE.r + 8, GLOBE.cy)}
      >
        <Globe size={13} strokeWidth={2.3} aria-hidden="true" />
        BAE dışı müşteri
      </span>
      <span
        className="ys-pin"
        data-side="in"
        data-on={state === "main" || undefined}
        style={pct(SHOP.x + SHOP.w / 2, SHOP.y + SHOP.h + 10)}
      >
        <Store size={13} strokeWidth={2.3} aria-hidden="true" />
        BAE içi müşteri
      </span>

      {/* Şirketin etiketi. Metin değişimi anlık: harita 340ms'de renk
          değiştirirken etiketin de solup gelmesi için AnimatePresence
          gerekirdi, o da bu sahneye motion sokardı. Tek kelimelik bir kutunun
          anında değişmesi okunurluğu bozmuyor. */}
      <span className="ys-chip" data-neutral={name ? undefined : true} style={pct(CHIP.x, CHIP.y)}>
        {name ?? CO_LABEL}
      </span>
    </div>
  );
}

export default function CountryStructures({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* İki ayrı durum, bilerek: `picked` kalıcı seçim (radyo), `hint` geçici
     (fare üstünde ya da klavye odağı). Harita ikisinin birleşimini gösteriyor
     ama kartın "seçili" işareti yalnız picked'ı okuyor — fareyle gezinirken
     hiçbir kart seçilmiş görünmüyor, yalnız harita önizleme yapıyor. */
  const [picked, setPicked] = useState<number | null>(null);
  const [hint, setHint] = useState<number | null>(null);
  const shown = hint ?? picked;

  const uid = `ys${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const group = `${uid}-yapi`;

  const state: YapiState = shown === null ? "none" : VIEWS[shown]?.key ?? "none";
  const name = shown === null ? null : data.options[shown]?.name ?? null;

  return (
    /* data-state bölümün kökünde de duruyor: nöbet yalnız haritayı değil
       sağdaki kartları da kapsıyor, ve kartların CSS'i "boşta mıyız" sorusunu
       buradan okuyor. */
    /* data-pick AYRI bir bayrak, data-state'ten türetilemez: state fareyle
       gezinirken de değişiyor, oysa yerleşim yalnız GERÇEK SEÇİMDE değişmeli.
       Fare geçerken kartların yüksekliğinin oynaması sahneyi zıplatırdı. */
    <section
      id="yapi"
      className="sec-pad ys-sec"
      data-state={state}
      data-pick={picked !== null || undefined}
      style={{ background: "var(--white)" }}
    >
      <div className="container-o">
        <div className="sec-head">
          {/* BAŞLIK VERİDEN GELİYOR, BURADA KIRPILMIYOR.
              Müşteri başlığın yalnızca "Önce yapıyı seçiyoruz:" olmasını
              istedi: "zaten altta konuyu veriyoruz 30 kez serbest bölge
              mainland yazmamıza gerek yok yani." Düzeltme
              countryContent.structures.title'da yapıldı, burada değil; bir
              `split(":")[0]` kırpması veri düzelince başlığı ikinci kez budardı.

              accent BU YÜZDEN "yapıyı seçiyoruz:" — hem eski uzun başlıkta hem
              yeni kısa başlıkta geçen tek parça. SplitWords accent'i bulamazsa
              vurgusuz basar, patlamaz. */}
          <SplitWords
            as="h2"
            text={data.title}
            accent="yapıyı seçiyoruz:"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        {/* ---- karar kuralı ----
            Izgaranın ÜSTÜNDE ve tam genişlikte. Yerleşim gerekçesi ve elenen
            iki alternatif dosya başındaki karar kaydında. */}
        <FadeUp delay={0.26} className="ys-rulew">
          <p className="ys-rule">
            <span className="ys-rule-k">
              <Split size={15} strokeWidth={2.3} aria-hidden="true" />
              Karar kuralı
            </span>
            <span className="ys-rule-t">{data.rule}</span>
          </p>
        </FadeUp>

        <div className="ys-grid">
          {/* FadeUp bir motion.div basıyor; ızgaranın gerçek çocuğu o. Gerilme
              zincirinin kopmaması için .ys-figw ve .ys-sidew display:grid
              (CSS'te), yani içlerindeki tek çocuk satır yüksekliğini alıyor. */}
          <FadeUp delay={0.3} className="ys-figw">
            <figure className="ys-map" data-state={state}>
              <Scene state={state} name={name} alt={ALT[state]} />
              <figcaption className="ys-cap">
                Şematik gösterim; ölçekli harita değildir.
              </figcaption>
            </figure>
          </FadeUp>

          <FadeUp delay={0.36} className="ys-sidew">
            <div className="ys-side" role="radiogroup" aria-label="Yapı seçimi">
              {data.options.map((o, idx) => {
                const v = VIEWS[idx];
                const on = picked === idx;
                const rid = `${uid}-r${idx}`;
                return (
                  /* data-i nöbetin sırasını veriyor: 0 turun ilk yarısında,
                     1 ikinci yarısında yanıyor. CSS negatif gecikmeyle aynı
                     keyframe'i yarım tur kaydırıyor. */
                  <div
                    key={o.name}
                    className="ys-card"
                    data-i={idx}
                    data-on={on || undefined}
                    data-pre={(hint === idx && !on) || undefined}
                    onPointerEnter={() => setHint(idx)}
                    onPointerLeave={() => setHint(null)}
                  >
                    <label className="ys-head" htmlFor={rid}>
                      {/* Açık aria-label: bu depoda görsel olarak gizlenmiş
                          <span> üç ayrı yerde erişilebilirlik ağacına
                          çıkmamıştı. Etiket, görünen iki metni aynı sırada
                          taşıyor. */}
                      <input
                        id={rid}
                        className="ys-in"
                        type="radio"
                        name={group}
                        aria-label={`${v?.when}: ${o.name}`}
                        checked={on}
                        onChange={() => setPicked(idx)}
                        onFocus={() => setHint(idx)}
                        onBlur={() => setHint(null)}
                      />
                      <span className="ys-face">
                        <span className="ys-ic">
                          {v ? <v.Icon size={20} strokeWidth={2.1} aria-hidden="true" /> : null}
                        </span>
                        <span className="ys-when">{v?.when}</span>
                        <span className="ys-name">{o.name}</span>
                        <span className="ys-mark" aria-hidden="true">
                          <Check size={13} strokeWidth={3.4} />
                        </span>
                      </span>
                    </label>

                    <p className="ys-line">{o.line}</p>

                    <div className="ys-det">
                      <div className="ys-det-in">
                        <p className="ys-fit-k">Bunu yapıyorsanız</p>
                        <ul className="ys-fit">
                          {o.fit.map((f) => (
                            <li key={f}>
                              <Check size={12} strokeWidth={3.4} aria-hidden="true" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Dikkat satırı KAPALI HÂLDE DE duruyor: bu bölümün
                        dürüstlük noktası burası, her iki yapının da bir bedeli
                        var ve o bedeli görmek için tıklamak gerekmemeli.
                        margin-top:auto ile kartın dibine yapışıyor — kartlar
                        satır yüksekliğine gerildiğinde artan yer metinlerin
                        arasına değil, dikkat satırının üstüne gidiyor. */}
                    <p className="ys-watch">
                      <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                      <span>
                        <b>Dikkat:</b> {o.watch}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
