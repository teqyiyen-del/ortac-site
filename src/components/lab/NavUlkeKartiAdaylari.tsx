import { ArrowRight } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import { Vista } from "@/components/home/HeroPortal";
import { COUNTRY_LINE, COUNTRY_NAME, FACTS } from "@/lib/brand";
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
function Silüet({ c, id, kisik }: { c: CountrySlug; id: string; kisik?: boolean }) {
  return (
    <span className="nuk-silo hgt-tone" data-c={c} data-kisik={kisik || undefined} aria-hidden="true">
      <svg viewBox="30 80 300 140" preserveAspectRatio="xMidYMax slice" focusable="false">
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
