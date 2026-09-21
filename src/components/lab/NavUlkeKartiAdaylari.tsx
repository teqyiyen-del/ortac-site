import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import { Vista } from "@/components/home/HeroPortal";
import { COUNTRY_LINE, COUNTRY_NAME, FACTS } from "@/lib/brand";
import { COUNTRY_PHOTO } from "@/lib/media";
import type { CountrySlug } from "@/lib/brand";

/* ============================================================================
   /lab/nav-ulke-karti · NAVBAR'DAKİ KOYU ÜLKE KARTI
   CSS: css/lab-nav-ulke.css · ad alanı .nuk-

   19.09.2026 · Burak: "navbarda hizmetler kısmı var ya, sonra da bir siyah
   kart var orada, dubai kartı diye, dubai seçiliyken çıkan. o kartın
   tasarımına biraz oynama yapabilir miyiz ya? birkaç alternatif görmek
   istiyorum senden. çünkü biraz garip duruyor. özellikle YAPI, TİPİK SÜRE,
   KİMLER İÇİN kısmı var ya, oralar caps lock olması zaten başlı başına bir
   sıkıntı. ve çok yazılı duruyor gibi … işte bak dubai seçildi, dubai kartı,
   bak dubai bu demek için aslında. belki işin içine o mantıkta görsel mi
   girmesi gerekiyordur."

   ÖLÇÜLEN SORUN: kart 280x240 px ve içinde DOKUZ ayrı metin parçası var —
   bayrak jetonu, ülke adı, tek satırlık künye, üç etiket (YAPI · TİPİK SÜRE ·
   KİMLER İÇİN), üç değer ve bir buton. Üçü büyük harf. En uzun değer 48
   karakter ve iki satıra düşüyor. Yani kart bir KÜNYE TAHTASI, oysa işi
   "Dubai seçildi, Dubai bu" demek.

   BÜYÜK HARF KURALI: versal bu turlarda site genelinde kaldırılmıştı, bu üç
   etiket bilerek istisna bırakılmıştı (nav.css'te gerekçesi yazılı: 10 px gri
   etiket ile 12 px açık gri değer aynı yazıya dönmesin diye). Burak şimdi tam
   o satırları işaret etti, yani istisna düşüyor. Ama `text-transform`u TEK
   BAŞINA silmek çözüm değil — gerekçe hâlâ doğru. Üç adayın üçü de bu yüzden
   etiket/değer tahtasını KALDIRARAK çözüyor, biçimlendirerek değil.

   GÖRSEL DİL İCAT EDİLMEDİ. Sitede ülkeyi temsil eden iki canlı dil var:
   ana sayfa hero'sundaki SİLÜET ailesi (Burj Khalifa · Tower Bridge ·
   Beşparmak) ve yuvarlak bayrak diski. Silüet seçildi: üçü de çizili, üçü de
   KOYU ZEMİN için çizildi (aynı "gece yüzeyde alfa yok" kuralı) ve hiçbirinde
   tek harf yok — çizimin kendi yazılı kuralı: "bir silüet 'burada ofisimiz
   var' demiyor, 'bu ülke' diyor." Bayrak ikinci sırada kaldı çünkü bayrak bir
   SEÇİM işareti ve üstteki rayda zaten var.

   ÜÇ ADAY DA CANLI ÖLÇÜLERDE: sütun 280 px, kart sağdaki ızgaraya hizalı
   240 px. Kıyas ancak aynı kutuda anlamlı.
   ========================================================================= */

/** Silüet bandı. Vista kendi tuvalinde (360x330) gökyüzü + siluet çiziyor;
 *  burada ufuk çizgisinin çevresinden yatay bir şerit kadrajlanıyor.
 *  `.hgt-tone` sınıfı şart: ülkenin gece paleti o sınıftan geliyor. */
function Silüet({
  c,
  id,
  kisik,
  tam,
}: {
  c: CountrySlug;
  id: string;
  kisik?: boolean;
  /** kartın tamamını kaplasın (E2/E3 dili): kadraj dikeyde genişliyor */
  tam?: boolean;
}) {
  return (
    <span
      className="nuk-silo hgt-tone"
      data-c={c}
      data-kisik={kisik || undefined}
      data-tam={tam || undefined}
      aria-hidden="true"
    >
      <svg
        viewBox={tam ? "40 40 280 180" : "30 80 300 140"}
        preserveAspectRatio="xMidYMax slice"
        focusable="false"
      >
        <Vista c={c} id={id} />
      </svg>
    </span>
  );
}

/* =========================================================== D1 · SİLÜET ===
   Kartın üstü ülkenin kendisi, altı yalnız ad + tek satır + buton.
   GÖSTERMEDİĞİ: üç künye satırının tamamı. Dokuz metin parçası dörde iniyor.
   Etiketler tamamen kalktığı için versal sorunu yapısal olarak bitiyor —
   silinecek bir `text-transform` kalmıyor.
   Bilgi kaybolmuyor: yapı bilgisi mobil satırda ve ülke sayfasının ilk
   ekranında, süre ve kimler için uygunluk testinde ve /ulkeler kıyasında,
   panelin eteği de zaten oraya yönlendiriyor. */
export function NavUlkeD1({ c }: { c: CountrySlug }) {
  return (
    <div className="nuk-kart" data-aday="d1">
      <Silüet c={c} id={`d1${c}`} />
      <div className="nuk-alt">
        <b className="nuk-ad">{COUNTRY_NAME[c]}</b>
        <em className="nuk-line">{COUNTRY_LINE[c]}</em>
        <span className="nuk-btn">
          {COUNTRY_NAME[c]} ülke sayfası
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ====================================================== D2 · TEK CÜMLE ===
   En ucuz yön: künye tahtası kalkıyor, yerine bayrak büyüyor ve iki alan tek
   satırda birleşiyor ("Serbest bölge veya mainland · tipik 7-14 gün").
   "Kimler için" düşüyor — kartın en uzun ve en az okunan satırıydı.
   "tipik" kelimesi zorunlu: kesin süre taahhüdü yasak (STANCE_LIMITS), etiket
   kalkınca o uyarıyı cümlenin kendisi taşımak zorunda.
   Bayrak 32 → 96 px: tahta kalkınca ortada açılan ~80 px'lik boşluğu nefes
   olarak bırakmak da olurdu; burada bayrak dolduruyor, çünkü kart sağdaki
   ızgaraya hizalı ve boyu düşmüyor. */
export function NavUlkeD2({ c }: { c: CountrySlug }) {
  const f = FACTS[c];
  return (
    <div className="nuk-kart" data-aday="d2">
      <div className="nuk-d2-ust">
        <span className="nuk-jeton" aria-hidden="true">
          <Flag country={c} />
        </span>
        <b className="nuk-ad" data-buyuk="">
          {COUNTRY_NAME[c]}
        </b>
        <em className="nuk-line">{COUNTRY_LINE[c]}</em>
      </div>
      <p className="nuk-tek">
        {f.structure} · tipik {f.days}
      </p>
      <span className="nuk-btn">
        {COUNTRY_NAME[c]} ülke sayfası
        <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
      </span>
    </div>
  );
}

/* ========================================================== D3 · AFİŞ ===
   En iddialı yön: zeminde silüet kısık, önünde TEK büyük odak. Kartın
   bugünkü sorunu dokuz eşit ağırlıkta parça olması; tek odak gelince göz
   nereye bakacağını biliyor ve kart "künye tahtası" değil "afiş" okunuyor.

   ODAK SÜRE, FİYAT DEĞİL. Defterde `fromLabel` de var ($3.900 gibi) ama
   fiyatın menünün ilk ekranında çıkması bir tasarım değil SATIŞ kararı ve
   Burak'a sorulmadan verilemez.

   KONTRAST: 28 px/600 beyaz büyük metin sayılır (eşik 3:1) ve silüetin en
   açık far tonunda bile geçiyor. Alt satır 11,5 px ve büyük metin SAYILMAZ
   (eşik 4,5) — o yüzden silüetin dışında, düz gece zeminde duruyor. */
export function NavUlkeD3({ c }: { c: CountrySlug }) {
  const f = FACTS[c];
  return (
    <div className="nuk-kart" data-aday="d3">
      <Silüet c={c} id={`d3${c}`} kisik />
      <div className="nuk-d3-on">
        <span className="nuk-jeton" data-kucuk="" aria-hidden="true">
          <Flag country={c} />
        </span>
        <b className="nuk-ad">{COUNTRY_NAME[c]}</b>
        <span className="nuk-odak">tipik {f.days}</span>
      </div>
      <div className="nuk-d3-alt">
        <em className="nuk-line">{COUNTRY_LINE[c]}</em>
        <span className="nuk-btn">
          Ülke sayfası
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ============================================================================
   İKİNCİ GEÇİŞ · D1 SEÇİLDİ, ÜSTÜNE ÜÇ DENEME

   19.09.2026 · Burak: "Navbar'daki kart için D1 mantıklı. Sadece bunlara da
   bayrak gelebilir, Dubai'nin yanına falan filan … bir de açıklamasına yani
   bir şeyler yazılabilir belki, gerçi böyle de güzel. Hatta görsel kısmını
   biraz daha dikey olarak büyütürsün, yani şu an kare gibi ya tüm box …
   oradaki görsele de belki gerçek görsel koyabiliriz. Ya da böyle de
   kalabilir. D3 de güzel böyle biraz daha zoomlu bir şey olduğu için ama
   buraya tutup da şey yazmanın manası yok, işte kocaman tipik 7-14 gün falan.
   Belki onları çıkartıp D1 ile D3'ün karması da olabilir. Çünkü bunda ikon da
   var, Dubai yazıyor altında falan, bu güzel mesela — hani görselin üstüne
   yazmış gibi oluyoruz."

   KART 240 → 300 PX. "Kare gibi" itirazının sayısal karşılığı: 280x240 kart
   1,17 oranında, yani neredeyse kare. 280x300 oranı 0,93'e indiriyor ve kart
   dikey okunuyor. BEDELİ VAR ve karar bunu bilerek veriyor: kart sağdaki
   hizmet ızgarasına hizalı, yani 60 px uzayan kart PANELİ de 60 px uzatıyor.
   Üç aday da 300 px'te, kıyas o bedelle birlikte yapılsın diye.
   ========================================================================= */

/* ============================================ E1 · D1 + BAYRAK, DAHA DİKEY */
/* D1'in aynısı: silüet üstte kendi bandında, metin altında düz gece zeminde.
   Değişen iki şey: kart 300 px ve ülke adının yanında bayrak var.
   Bayrak neden adın YANINDA: silüetin üstüne konsaydı iki ülke işareti üst
   üste binerdi (silüetin kendisi zaten "hangi ülke" diyor); adın yanında ise
   künye satırı gibi okunuyor. */
export function NavUlkeE1({ c }: { c: CountrySlug }) {
  return (
    <div className="nuk-kart" data-aday="e1">
      <Silüet c={c} id={`e1${c}`} />
      <div className="nuk-alt">
        <span className="nuk-adsatir">
          <span className="nuk-jeton" data-kucuk="" aria-hidden="true">
            <Flag country={c} />
          </span>
          <b className="nuk-ad">{COUNTRY_NAME[c]}</b>
        </span>
        <em className="nuk-line">{COUNTRY_LINE[c]}</em>
        <span className="nuk-btn">
          {COUNTRY_NAME[c]} ülke sayfası
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ================================== E2 · D1 + D3 KARMASI · YAZI GÖRSELİN ÜSTÜNDE */
/* Silüet kartın TAMAMINI kaplıyor, bayrak + ad + künye satırı onun üstünde
   duruyor, buton altta. D3'ün beğenilen tarafı bu ("hani görselin üstüne
   yazmış gibi oluyoruz"); beğenilmeyen tarafı — kocaman "tipik 7-14 gün" —
   yok.

   KONTRAST İÇİN ALT KARARTMA ŞART: 11,5 px'lik künye satırı büyük metin
   SAYILMIYOR (eşik 4,5) ve silüetin far tonları (#4a3d27 · #2b3850 · #234840)
   üstünde garanti edilemiyor. Yazının arkasına aşağıdan yukarıya bir karartma
   seriliyor; bu bir YÜZEY değil bir maske, yani "gece yüzeyde alfa yok"
   kuralının konusu değil. */
export function NavUlkeE2({ c }: { c: CountrySlug }) {
  return (
    <div className="nuk-kart" data-aday="e2">
      <Silüet c={c} id={`e2${c}`} tam />
      <span className="nuk-perde" aria-hidden="true" />
      <div className="nuk-uzeri">
        <span className="nuk-adsatir">
          <span className="nuk-jeton" data-kucuk="" aria-hidden="true">
            <Flag country={c} />
          </span>
          <b className="nuk-ad">{COUNTRY_NAME[c]}</b>
        </span>
        <em className="nuk-line">{COUNTRY_LINE[c]}</em>
        <span className="nuk-btn">
          {COUNTRY_NAME[c]} ülke sayfası
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ====================================== E3 · GERÇEK GÖRSEL, YAZI ÜSTÜNDE */
/* E2'nin aynısı, tek fark zemindeki görsel: çizim değil FOTOĞRAF. Kaynak
   lib/media.ts · COUNTRY_PHOTO — hakkımızda sayfasında zaten basılıyor ve
   SWAP:STOCK_PHOTOS işaretli, yani müşterinin kendi görselleri geldiğinde tek
   yerden değişiyor.

   BEDELİ ÇİZİMDEN FAZLA ve karar bunu görerek verilmeli: (a) menü her sayfada
   açılıyor, yani üç fotoğraf her ziyarette yükleniyor; (b) fotoğrafın tonu
   ülkeden ülkeye değişiyor, çizimin paleti ise kontrol altında; (c) çizimin
   yazılı kuralı "tek harf yok, marka yok" — bir stok fotoğrafta o garanti
   yok. Yine de deneniyor, çünkü Burak açıkça istedi. */
export function NavUlkeE3({ c }: { c: CountrySlug }) {
  return (
    <div className="nuk-kart" data-aday="e3">
      <span className="nuk-foto" aria-hidden="true">
        <Image src={COUNTRY_PHOTO[c]} alt="" fill sizes="280px" unoptimized />
      </span>
      <span className="nuk-perde" aria-hidden="true" />
      <div className="nuk-uzeri">
        <span className="nuk-adsatir">
          <span className="nuk-jeton" data-kucuk="" aria-hidden="true">
            <Flag country={c} />
          </span>
          <b className="nuk-ad">{COUNTRY_NAME[c]}</b>
        </span>
        <em className="nuk-line">{COUNTRY_LINE[c]}</em>
        <span className="nuk-btn">
          {COUNTRY_NAME[c]} ülke sayfası
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
