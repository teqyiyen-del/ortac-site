"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H3 · "Yıldızlı sıfır"

   ---------------------------------------------------------------- MUHAKEME

   1. BU SAYFAYA KİM GELİYOR?
   Türkiye'den, Dubai'de şirket kurmayı DÜŞÜNEN ama karar vermemiş biri. Ve
   önemli olan şu: buraya bilgisiz gelmiyor. Kafasında zaten bir cümle var —
   "Dubai'de vergi yok". O cümleyi bu sayfada duymadı, sosyal medyada,
   tanıdığından ya da bu işi satan başka birinden duydu. Sayfaya geliş sebebi
   o cümleyi ÖĞRENMEK değil, DOĞRULAMAK.

   2. ÜÇ SANİYEDE KART ONDAN NE ALSIN / ONA NE VERSİN?
   Ona vereceğimiz şey yeni bir bilgi değil, elindeki bilginin düzeltilmiş
   hâli. Çünkü üç saniyede bir kişiyi "%0" diyerek etkileyemezsiniz — onu
   zaten biliyor, üstelik herkesten duydu. Ama üç saniyede ona "%0 doğru, AMA
   şartlı — ve şartın ne olduğunu sana ilk söyleyen biziz" derseniz, o üç
   saniyede rakamı değil GÜVENİ almış olur. Bu sayfanın rakiplerinden tek
   gerçek farkı abartmaması; hero abartmayan olduğunu göstermezse sayfanın
   geri kalanı bunu kanıtlamaya çalışırken ziyaretçi çoktan gitmiş olur.

   3. KART HANGİ SORUYU KAPATIYOR? AŞAĞIDA ZATEN VAR MI?
   Burası kritik, çünkü ilk fikrim (kalan/vergiye giden oranı) AŞAĞIDA ZATEN
   VAR: CountryTax (#vergi) içinde kâr girişi olan, kalan/vergi çubuğu çizen,
   üstüne Türkiye'yle kıyas yapan tam bir bölüm duruyor. Hero'ya onun küçük
   ve etkileşimsiz bir kopyasını koymak, ziyaretçiye aynı şeyi iki kez, ikinci
   seferinde daha iyisiyle göstermek olurdu. O yüzden oradan çıktım.

   Aşağıda OLMAYAN şu: aşağıdaki bölüm "SENİN rakamında ne kalır" sorusunu
   hesaplıyor. Hiçbir yer "duyduğun %0 gerçek mi, şartı ne" sorusunu BAŞLIK
   olarak kurmuyor — o bilgi bir tablo satırının dipnotunda ve bir "karıştırılan
   üç şey" bloğunda, sayfanın çok aşağısında dağınık duruyor. Kart bunu
   kapatıyor: oranın kendisini değil, oranın ŞARTINI öne alıyor.

   İkisi birbirinin kopyası değil, devamı: kart çerçeveyi verir ("oran şarta
   bağlı"), aşağıdaki bölüm hesabı yapar ("senin rakamında şu kalır"). Kartın
   altındaki tek bağlantı da zaten oraya gidiyor — müşterinin istediği
   "özet önde, detay talep üzerine" akışı tam olarak bu.

   ------------------------------------------------------------------ TASARIM

   Kart tek bir rakamı taşıyor ve o rakam TIKLANABİLİR BİR ŞARTA bağlı.
   Varsayılan durumda iyi haber görünüyor (%0), ziyaretçi isterse ikinci
   düğmeye basıp "peki şart tutmazsa" durumunu kendisi açıyor. Akordiyon
   mantığının rakama uygulanmış hâli: hepsini birden göstermiyoruz, isteyene
   açıyoruz.

   RENK BİR ANLAM TAŞIYOR, süs değil: çubukta BEYAZ = size kalan, MAVİ =
   vergiye giden. Koyu kartta beyaz kıt bir kaynak gibi okunuyor, zaten
   "elinizde kalan" da o. Şart sağlandığında çubuk baştan sona beyaz; şart
   dıştaysa sağ uçta mavi bir dilim beliriyor. Yani ziyaretçi oranı okumadan
   önce görüyor.

   STANCE_LIMITS: gün sayısı yok, fiyat yok, banka vaadi yok. Oran vaadi de
   yok — kartın tamamı zaten "bu oran şarta bağlı" demek için kurulu, dipnot
   da bunu yazıyla tekrar ediyor. Kişiye özel yorum vermiyoruz; kişiye özel
   hesabı yapan yere yönlendiriyoruz.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Oranlar ve eşik BURADA ÜRETİLMİYOR — src/lib/countryContent.ts içindeki
   COUNTRY_CONTENT.dubai.tax satırlarının aynısı:
     · "375.000 AED'ye kadar %0, üzeri %9"
     · "Şartları sağlayan nitelikli serbest bölge mükellefinin nitelikli
        gelirinde %0."
     · pros: "Kurumlar vergisi %0*" / "Yıldız önemli: şart ihlalinde standart
        oran uygulanır."
   Elle kopyalandı, import edilmedi: kart props almayan tek başına bir bileşen
   ve içerik dosyasının şekli bu turda başka ellerde değişebilir. İçerik
   güncellenirse DOĞRU KAYNAK countryContent.ts, burası ona uyar. */
type Band = {
  key: string;
  /* düğme yazısı — kartın anlattığı şey oran değil, oranın şartı olduğu için
     düğmeler oranı değil ŞARTI adlandırıyor */
  tab: string;
  rate: number;
  /* rakamın hemen yanındaki tek satır: oranın hangi zeminde geçerli olduğu */
  caption: string;
  /* yıldız yalnızca %0'a ait: sitenin kendi "%0*" yazımıyla birebir aynı */
  star: boolean;
};

const BANDS: Band[] = [
  {
    key: "nitelikli",
    tab: "Şartlar sağlanıyor",
    rate: 0,
    caption: "Nitelikli serbest bölge gelirinde",
    star: true,
  },
  {
    key: "standart",
    tab: "Şart dışında",
    rate: 9,
    /* %9'u çıplak yazmak yanlış olurdu: standart rejimde de ilk dilim %0.
       Eşiği yazmak hem doğru, hem de ziyaretçiye "ben hangi taraftayım"
       sorusunu sordurduğu için aşağıya inmesinin sebebi oluyor. */
    caption: "375.000 AED üstü kazançta, standart oran",
    star: false,
  },
];

export default function HeroH3() {
  const reduced = useReducedMotion() ?? false;
  const [i, setI] = useState(0);
  const band = BANDS[i];
  const keep = 100 - band.rate;

  /* reduced-motion'da süre sıfır: hareket kaybolur, bilgi kaybolmaz —
     genişlik ve rakam yine doğru yere gider, sadece anında gider. */
  const t = (v: number) => (reduced ? 0 : v);
  const grow = { duration: t(0.55), ease: EASE };

  return (
    <div className="rak">
      {/* --- üst etiket: kartın neyi ölçtüğü, tek satır --- */}
      <div className="rak-top">
        <span className="rak-k">Kurumlar vergisi</span>
        <span className="rak-loc">BAE · serbest bölge</span>
      </div>

      {/* --- rakam + şartı --- */}
      <div className="rak-read">
        {/* key={band.key}: durum değişince düğüm yeniden bağlanıyor, yani
            initial→animate kendiliğinden tekrar çalışıyor. AnimatePresence'a
            gerek yok, çıkış animasyonu istemiyoruz — rakamın beklemesi
            "hangisi doğru" tereddüdü yaratır, anında değişmeli. */}
        <motion.strong
          key={band.key}
          className="rak-num"
          initial={{ opacity: 0, y: t(12) }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: t(0.4), ease: EASE }}
        >
          %{band.rate}
          {band.star && <sup aria-hidden="true">*</sup>}
        </motion.strong>
        <span className="rak-cap">{band.caption}</span>
      </div>

      {/* --- çubuk: beyaz = kalan, mavi = vergi --- */}
      <div className="rak-bar" aria-hidden="true">
        <motion.span
          className="rak-seg"
          data-k="keep"
          initial={{ width: `${keep}%` }}
          animate={{ width: `${keep}%` }}
          transition={grow}
        />
        <motion.span
          className="rak-seg"
          data-k="tax"
          initial={{ width: `${band.rate}%` }}
          animate={{ width: `${band.rate}%` }}
          transition={grow}
        />
      </div>

      {/* renk anahtarı: çubuğun iki rengini adlandıran tek satır. Rakamlar
          duruma göre değişiyor, satırın yapısı değişmiyor — böylece göz
          aynı yere bakmaya devam ediyor. */}
      <div className="rak-legend" aria-hidden="true">
        <span data-k="keep">
          Size kalan <b>%{keep}</b>
        </span>
        <span data-k="tax">
          Vergiye giden <b>%{band.rate}</b>
        </span>
      </div>

      {/* --- şart anahtarı: kartın "detayı talep üzerine" açan yeri --- */}
      <div className="rak-switch" role="group" aria-label="Vergi oranının şartı">
        {BANDS.map((b, n) => (
          <button
            key={b.key}
            type="button"
            className="rak-tab"
            /* aria-pressed: iki düğme de kalıcı bir durumu açıp kapatıyor,
               gezinme yapmıyor. Ekran okuyucu hangisinin basılı olduğunu
               böyle duyuyor. */
            aria-pressed={n === i}
            onClick={() => setI(n)}
          >
            {b.tab}
          </button>
        ))}
      </div>

      {/* Ekran okuyucu için: yukarıdaki görsel anlatının yazılı karşılığı.
          Çubuk ve rakam aria-hidden olduğu için durum buradan duyuruluyor. */}
      <p className="rak-sr" role="status">
        {band.rate === 0
          ? "Şartlar sağlandığında nitelikli serbest bölge gelirinde kurumlar vergisi oranı yüzde sıfır."
          : "Şart dışında, 375.000 AED üstü kazançta standart oran yüzde dokuz."}
      </p>

      {/* --- dipnot + tek çıkış --- */}
      <div className="rak-foot">
        <p>Yıldız önemli: şart ihlalinde standart oran uygulanır.</p>
        {/* Sayfa içi çapa, ayrı bir adres değil — SmartLink'in sönükleştirme
            işi burada geçerli değil. Kartın tek görevi çerçeveyi vermek;
            kişiye özel hesap #vergi bölümünde yapılıyor. */}
        <a className="rak-more" href="#vergi">
          Kendi rakamınızla görün
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
              d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
