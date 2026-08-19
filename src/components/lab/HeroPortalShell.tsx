"use client";

import { useId } from "react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag, COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { useOrtacStore, type Country } from "@/lib/store";

/* ============================================================================
   PORTAL ADAYLARININ ORTAK PARÇALARI — ad alanı .ptl-
   CSS: src/app/css/lab-portal.css

   BURADA NE VAR, NEDEN ORTAK
   Üç aday üç ayrı PORTAL OKUMASI. Ayrıştıkları yer sahne; kumanda, tabela ve
   ufuk çizimi ayrışmamalı. Sebep karşılaştırmanın kendisi: müşteri üç sahneyi
   yan yana koyup "hangi portal fikri" diye bakacak. Seçicinin ya da tabelanın
   adaydan adaya değişmesi o soruyu bulanıklaştırır, çünkü fark sahneden mi
   kumandadan mı geliyor anlaşılmaz.

   ÜLKE ÇİZİMİ DE ORTAK (Vista). Dubai'nin Burj Khalifa'sı, Londra'nın Tower
   Bridge'i ve Girne'nin Beşparmak sırtı tek bir tuvalde bir kez çiziliyor;
   üç aday onu üç ayrı çerçeveden gösteriyor (kapı açıklığı · koridorun sonu ·
   halkayı aşan kütle). Aynı ülke üç adayda aynı görünsün ki karşılaştırılan
   şey ÇERÇEVE olsun.

   METİN UYDURULMUYOR: tabeladaki tek satır o ülkenin kendi sayfasında zaten
   yayınlanmış avantaj listesinden geliyor (countryContent · pros), canlı
   hero'daki seçimin birebir aynısı. Dubai'nin ilk maddesi ("Kurumlar vergisi
   %0*") bilerek alınmıyor: yıldız gerçek bir şart taşıyor ve tabelada dipnot
   yeri yok.
   ========================================================================= */

export const ORDER: Country[] = ["dubai", "ingiltere", "kktc"];

/* Canlı hero'daki eşlemenin aynısı. Seçim SIRA NUMARASIYLA değil ikonla:
   listeye yeni bir madde girdiğinde ya da sıra değiştiğinde çengel kaymıyor. */
const HOOK_ICON: Record<Country, string> = {
  dubai: "id", // "Şirket üzerinden oturum vizesi"
  ingiltere: "remote", // "Ziyaret şartı yok"
  kktc: "pin", // "Türkiye'ye yakın"
};

export function hookFor(c: Country): string {
  const pros = COUNTRY_CONTENT[c].pros;
  return (pros.find((p) => p.icon === HOOK_ICON[c]) ?? pros[0]).title;
}

/** SVG id'leri belge genelinde tekil olmak zorunda ve çakışma sessizce yanlış
 *  gradyanı gösteriyor. Lab sayfasında dört sahne (taban + üç aday) aynı anda
 *  DOM'da, yani çakışma teorik değil. React'in useId'i harf dışı karakter
 *  üretiyor (sürüme göre iki nokta ya da köşeli tırnak) ve url(#…) referansı
 *  onları kaldıramıyor; en ucuzu hepsini atmak. */
export function useArtId(prefix: string): string {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

/* ============================== KUMANDA ==============================
   GÖRÜNEN KUTUCUK + GİZLİ YERLİ RADYO. Altta yatan kontrol gerçek bir
   <input type="radio"> grubu: ok tuşlarıyla gezinme, klavyeyle seçme ve
   ekran okuyucu duyurusu tarayıcıdan geliyor, taklit edilmiyor. Grubun adı
   <legend> ile veriliyor, yani radyoya odaklanan kişi neyi seçtiğini duyuyor.
   Ayrı bir aria-live satırı BİLEREK yok: yerli radyo zaten duyuruyor, ikinci
   bir canlı bölge aynı cümleyi iki kez okuturdu.

   name useId'den: lab sayfasında üç aday aynı anda ekranda ve sabit bir ad
   üçünü TEK radyo grubu yapardı — birinde seçim yapmak ötekinin işaretini
   düşürürdü. Mağaza (zustand) zaten ortak, yani üç sahne yine birlikte
   değişiyor; ayrılan tek şey HTML grubu.

   Fare ile üstüne gelmek de seçiyor: canlı hero'nun davranışı bu ve
   karşılaştırma ancak aynı davranışla adil. */
export function PortalPicker() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const group = useArtId("g");

  return (
    <div className="ptl-pick">
      <fieldset className="ptl-fs">
        <legend className="ptl-legend">Ülke seçin</legend>
        <div className="ptl-tabs">
          {ORDER.map((c) => (
            <label
              key={c}
              className="ptl-tab"
              data-on={country === c}
              onMouseEnter={() => setCountry(c)}
            >
              <input
                className="ptl-radio"
                type="radio"
                name={group}
                value={c}
                checked={country === c}
                onChange={() => setCountry(c)}
              />
              <span className="ptl-tab-disc">
                <Flag country={c} />
              </span>
              <span className="ptl-tab-name">{COUNTRY_NAMES[c]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <SmartLink href="/uygunluk-testi" className="ptl-unsure">
        Emin değilim, bana uygun olanı bul
        <span aria-hidden="true">→</span>
      </SmartLink>
    </div>
  );
}

/** Tabela: ülke adı + o ülkenin en çok tercih edilme sebebi. Canlı hero'daki
 *  içeriğin aynısı; sahne değişse de kapının yanında yazan şey değişmiyor. */
export function PortalPlate({ c }: { c: Country }) {
  return (
    <div className="ptl-plate">
      <strong className="ptl-plate-name">{COUNTRY_NAMES[c]}</strong>
      <span className="ptl-plate-line">{hookFor(c)}</span>
    </div>
  );
}

/* ============================================================================
   VISTA — ÜLKENİN KENDİSİ
   Tuval: 0 0 400 220 · ufuk (yer/deniz çizgisi) y = 200 · üstü gökyüzü.

   ------------------------------------------------------- NEDEN SİLUET, NEDEN ÇİZİM
   Müşterinin cümlesi net: "dubai seçince burjkhalifa gözüksün". Yani ülke
   artık kapının ışık rengiyle değil, KENDİ BİÇİMİYLE anlatılacak.

   Fotoğraf değil çizim, üç sebeple. (1) Depodaki ülke kareleri gündüz/gün
   batımı fotoğrafları; hero'nun #080808 gecesinin içine bir fotoğraf koymak
   sahneyi ikiye bölüyor. (2) Bir Unsplash kimliğinin arkasındaki kare
   değişebiliyor ve bu depoda bir kimlik 404 döndü (bkz. lib/media.ts) — hero
   sitenin ilk ekranı, orada kırık kare kabul edilemez. (3) Çizimde çizgi
   kalınlığı, ışık yönü ve odak bize ait; fotoğrafta değil.

   ---------------------------------------------------------------- DERİNLİK MERDİVENİ
   Işık gökyüzünden geliyor, yani her kütle bir SİLUET. Derinlik alfayla değil
   dört kademeli OPAK mürekkeple veriliyor (koyu yüzeyde alfa yok):
     uzak  → ülkenin göğünden tonlanmış, en açık (atmosfer)
     orta  → bir kademe koyu
     mark  → ÜLKENİN İMZASI, en koyu, tek parlak kenarı olan tek nesne
     yakın → önde duran kütle, nötr siyaha en yakın
   Gökyüzü üç durak: canlı sahnenin o ülke için ONAYLANMIŞ ışık paletinin
   kendisi (hero-scene.css · --hsc-l1/l2/l3). Yeni renk uydurulmuyor; bugün
   kapının içinden gelen ışık, burada o ışığın geldiği gökyüzü oluyor.

   ---------------------------------------------------------------- İDDİA YOK
   Çizimlerde tek harf yok: yazı, rakam, arma, logo, marka yok. Bir siluet
   "burada ofisimiz var" demiyor, "bu ülke" diyor. Hepsi aria-hidden.
   ========================================================================= */

/** Vista'nın çizdiği tek şey: gökyüzü + siluetler. Kırpma, ölçek ve konum
 *  çağıran sahnenin işi — aynı çizim kapı açıklığından, koridorun sonundan ve
 *  halkanın içinden farklı kadrajlarla görünüyor. */
export function Vista({ c, id }: { c: Country; id: string }) {
  return (
    <g className="ptl-vista ptl-tone" data-c={c}>
      <defs>
        {/* userSpaceOnUse: duraklar tuvalin kendi y'sine oturuyor, yani
            gökyüzü kutusu ne kadar taşarsa taşsın ufuk çizgisindeki en parlak
            bant hep y=200'de. Kutu bilerek çok geniş: üç sahne de bu çizimi
            farklı ölçekte kırpıyor ve hiçbirinde gökyüzü bitmemeli. */}
        <linearGradient
          id={`${id}sky`}
          gradientUnits="userSpaceOnUse"
          x1="200"
          y1="-70"
          x2="200"
          y2="200"
        >
          {/* Duraklar ekranda ölçülerek çekildi (0.58/0.85 idi, 0.42/0.74 oldu).
              Sebep: parlak bant ufka çok yapışıkken siluetlerin üst yarısı
              gökle aynı tona düşüyordu — KKTC'nin sırtı fark edilmiyordu bile.
              Bant yukarı çekilince her kütle kendi yüksekliğinde gökten koyu
              kalıyor, yani siluet gerçekten siluet oluyor. */}
          <stop offset="0" stopColor="var(--pv-s0)" />
          <stop offset="0.42" stopColor="var(--pv-s1)" />
          <stop offset="0.74" stopColor="var(--pv-s2)" />
          <stop offset="1" stopColor="var(--pv-s3)" />
        </linearGradient>

        {/* PUS LEKESİ. Yumuşak kenarın tamamı gradyan, SVG filtresi değil:
            sürekli dönen bir animasyonda blur filtresi her karede yeniden
            hesaplanır ve bu sahne hero'nun içinde duruyor. */}
        <radialGradient id={`${id}hz`} cx="50%" cy="86%" r="56%">
          <stop offset="0" stopColor="var(--pv-s3)" stopOpacity="0.36" />
          <stop offset="0.55" stopColor="var(--pv-s3)" stopOpacity="0.13" />
          <stop offset="1" stopColor="var(--pv-s3)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="-320" y="-320" width="1040" height="540" fill={`url(#${id}sky)`} />

      {/* PUS BANDI — ufkun üstünde yol alan ışık. Üç kopya yan yana ve grup
          tam bir kopya boyu kayıyor, yani tur bitişinde desen başlangıçla
          çakışıyor (bkz. CSS · HAREKET). Sahne durduğu sürece süren hareket
          bu ve üç ülkede de var. */}
      <g className="ptl-haze">
        <rect x="-400" y="56" width="400" height="146" fill={`url(#${id}hz)`} />
        <rect x="0" y="56" width="400" height="146" fill={`url(#${id}hz)`} />
        <rect x="400" y="56" width="400" height="146" fill={`url(#${id}hz)`} />
      </g>

      {c === "dubai" ? <VistaDubai /> : null}
      {c === "ingiltere" ? <VistaUk /> : null}
      {c === "kktc" ? <VistaKktc /> : null}

      {/* yer: ufkun altı, siluetlerin bastığı zemin */}
      <rect className="ptl-v-ground" x="-320" y="200" width="1040" height="120" />
    </g>
  );
}

/* -------------------------------------------------------------- DUBAI
   İmza: Burj Khalifa. Kademeli daralan gövde ve uzun iğne; profilin kendisi
   tanınıyor, tek bir yazıya gerek kalmıyor. Yarı genişlikler x=200'den
   26 / 21 / 17 / 13 / 9.5 / 6 / 3.5 / 1.3, yani her kademe bir öncekinin
   yaklaşık %78'i — kulenin gerçek daralma ritmi bu.

   Yanındakiler Dubai'yi Dubai yapan ikinci şey: sık ve yüksek bir duvar.
   Uzak bant 16 birimde bir basamaklanıyor (yoğun), orta katmanda uçları
   eğik ikiz kuleler ve bir yelken kütlesi var. */
function VistaDubai() {
  return (
    <>
      <path
        className="ptl-v-far"
        d="M-320 200 V178 H16 V168 H30 V182 H44 V162 H60 V176 H76 V166 H92 V180 H108 V170 H124 V184 H140 V172 H156 V164 H172 V178 H188 V170 H204 V182 H220 V168 H236 V180 H252 V172 H268 V162 H284 V176 H300 V166 H316 V180 H332 V172 H348 V184 H364 V174 H380 V180 H720 V200 Z"
      />

      <path className="ptl-v-mid" d="M104 200 V108 L118 88 L132 108 V200 Z" />
      <path className="ptl-v-mid" d="M140 200 V130 L152 114 L164 130 V200 Z" />
      <path className="ptl-v-mid" d="M222 200 V146 H244 V200 Z" />
      {/* yelken: tek dikey kenar ve ona yaslanan eğri — Körfez'in ikinci
          en tanınan kütlesi, ama kuleyle yarışmasın diye orta katmanda */}
      <path className="ptl-v-mid" d="M250 200 V86 C266 118 284 156 296 200 Z" />

      <path
        className="ptl-v-mark"
        d="M174 200 V164 H179 V134 H183 V108 H187 V82 H190.5 V58 H194 V36 H196.5 V22 H198.7 V8 H201.3 V22 H203.5 V36 H206 V58 H209.5 V82 H213 V108 H217 V134 H221 V164 H226 V200 Z"
      />

      {/* İğnenin ucundaki uyarı ışığı. Çizimin TEK parlak noktası ve
          uydurma değil: o yükseklikteki her kulede var. */}
      <circle className="ptl-v-beacon" cx="200" cy="8" r="2.6" />

      <path className="ptl-v-near" d="M64 200 V162 H92 V176 H108 V200 Z" />
      <path className="ptl-v-near" d="M300 200 V152 H328 V166 H342 V200 Z" />
    </>
  );
}

/* -------------------------------------------------------------- İNGİLTERE
   İmza: Tower Bridge. Bu adayda ayrıca bir şans var — köprünün kendisi zaten
   bir KAPI: iki kule ve aralarındaki yüksek geçit, portal fikrinin ülke
   tarafındaki karşılığı.

   Uzak katmanda Londra'nın iki modern imzası (koni biçimli kule ve sivrilen
   şiş) ve alçak bir sıra ev bandı; onlar sahnenin nerede geçtiğini söylüyor,
   köprü ise neyin görüldüğünü. */
function VistaUk() {
  return (
    <>
      <path
        className="ptl-v-far"
        d="M-320 200 V182 H22 V174 H44 V186 H66 V178 H88 V188 H110 V180 H132 V186 H154 V176 H176 V188 H198 V180 H220 V186 H242 V178 H264 V188 H286 V180 H308 V186 H330 V176 H352 V186 H374 V180 H720 V200 Z"
      />
      {/* Koni ve şiş: Londra'nın iki modern imzası. Konumları ÖLÇÜMLE seçildi,
          göz kararıyla değil — P1'in kapı açıklığı bu tuvalin yalnızca
          72..328 aralığını gösteriyor ve ikisi de ilk yazımda o pencerenin
          dışında kalıyordu (biri solda, biri sağda kırpılıyordu). */}
      <path
        className="ptl-v-far"
        d="M95 200 V142 C95 124 102 112 110 108 C118 112 125 124 125 142 V200 Z"
      />
      <path className="ptl-v-far" d="M287 200 L296 98 L300 62 L304 98 L313 200 Z" />

      {/* askı halatları: kuleden kıyıya sarkan iki eğri. Dolgu değil kontur,
          çünkü halat bir kütle değil bir hat. */}
      <path className="ptl-v-chain" d="M-30 132 Q54 162 138 116" />
      <path className="ptl-v-chain" d="M262 116 Q346 162 430 132" />

      <path className="ptl-v-mid" d="M-320 160 H720 V172 H-320 Z" />
      <path className="ptl-v-mid" d="M130 172 H178 V200 H130 Z" />
      <path className="ptl-v-mid" d="M222 172 H270 V200 H222 Z" />

      {/* iki kule + sivri külah + iğne, ve aralarındaki iki geçit katı */}
      <path className="ptl-v-mark" d="M138 172 V104 H172 V172 Z" />
      <path className="ptl-v-mark" d="M132 104 L154 66 L155 46 L156 66 L178 104 Z" />
      <path className="ptl-v-mark" d="M228 172 V104 H262 V172 Z" />
      <path className="ptl-v-mark" d="M222 104 L244 66 L245 46 L246 66 L268 104 Z" />
      <path className="ptl-v-mark" d="M172 108 H228 V122 H172 Z" />
      <path className="ptl-v-mark" d="M172 128 H228 V134 H172 Z" />
    </>
  );
}

/* -------------------------------------------------------------- KKTC
   İmza: Beşparmak sırtı. Adanın kuzeyini tanımlayan şey bir bina değil bir
   ufuk çizgisi, o yüzden burada "mark" olan şey de farklı bir cinsten: beş
   belirgin tepe (x = 54 · 108 · 170 · 234 · 298).

   Sırt UZAK katmanda kalıyor ve imzayı taşıyan parlak kenar Girne kalesine
   veriliyor. Sebep derinlik merdiveni: en koyu mürekkep en öndeki kütlenin
   hakkı, sırt ise en arkada. Kale ortada, önünde liman kıyısı. */
function VistaKktc() {
  return (
    <>
      {/* BEŞ TEPE, BEŞİ DE PENCEREDE. Sırtın ilk yazımında tepeler x = 54 · 108
          · 170 · 234 · 298'deydi ve P1'in kapı açıklığı yalnızca 72..328'i
          gösterdiği için birincisi kırpılıyordu; "Beşparmak" dört parmakla
          okunmaz. Tepeler 88 · 148 · 205 · 262 · 318'e sıkıştırıldı ve
          ortadaki en yüksek olacak biçimde sıralandı. */}
      <path
        className="ptl-v-far"
        d="M-320 200 V168 H12 L44 156 L88 116 L118 148 L148 104 L178 146 L205 92 L232 144 L262 106 L292 150 L318 122 L352 152 L400 162 H720 V200 Z"
      />

      <path className="ptl-v-mid" d="M204 200 V174 H312 V200 Z" />

      {/* kale: mazgallı beden duvarı, solda kare burç, sağda yuvarlak tabya */}
      <path className="ptl-v-mark" d="M204 174 H312 V200 H204 Z" />
      <path
        className="ptl-v-mark"
        d="M206 166 H216 V174 H206 Z M222 166 H232 V174 H222 Z M238 166 H248 V174 H238 Z M254 166 H264 V174 H254 Z M270 166 H280 V174 H270 Z M286 166 H296 V174 H286 Z"
      />
      <path className="ptl-v-mark" d="M192 200 V156 H220 V200 Z" />
      <path className="ptl-v-mark" d="M194 148 H202 V156 H194 Z M208 148 H216 V156 H208 Z" />
      <path className="ptl-v-mark" d="M288 200 V172 A14 14 0 0 1 316 172 V200 Z" />

      <path className="ptl-v-near" d="M84 200 V172 H116 V182 H136 V200 Z" />
      <path className="ptl-v-near" d="M146 200 V178 H166 V186 H182 V200 Z" />
      <path className="ptl-v-near" d="M-320 194 H720 V200 H-320 Z" />
    </>
  );
}
