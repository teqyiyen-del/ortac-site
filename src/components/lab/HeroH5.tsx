"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Route } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H5 · "YOL"

   ---------------------------------------------------------------- MUHAKEME

   1) BU SAYFAYA KİM GELİYOR?
   Türkiye'den, Dubai'de şirket kurmayı düşünen ama henüz karar vermemiş biri.
   Bir reklamdan ya da aramadan geldi. Kafasındaki asıl engel fiyat değil —
   fiyatı zaten aşağıda görecek. Asıl engel şu: "kuruluş" onun zihninde tek
   parça, sınırı belirsiz, ne kadar süreceği ve içine ne kadar gireceği belli
   olmayan bir kütle. Karar veremiyor, çünkü neye evet diyeceğini bilmiyor.

   2) ÜÇ SANİYEDE KART NE VERSİN?
   Bir mesafe hissi. "Buradan oraya" — nerede durduğunu, nereye varacağını ve
   arada kaç kez kendisinin devreye gireceğini tek bakışta görsün. Zaman değil
   MESAFE, çünkü zaman taahhüdü veremiyoruz (STANCE_LIMITS) ama mesafe ve
   sahiplik gerçek: yolun iki durağı ziyaretçinin, kalan bütün yol bizim.
   Kartın verdiği duygu şu: "Bu tarif edilmiş bir yol, ve zor kısmı benim
   üstümde değil."

   3) HANGİ SORUYU KAPATIYOR? AŞAĞIDA ZATEN VAR MI?
   Kapattığı soru: "Bu işte benden ne isteniyor ve ne kadar yol ben yürüyeceğim?"
   Sayfanın aşağısı bunu kapatmıyor:
   - CountryProcess beş adımı gün gün yazıyor ama hepsini eşit ağırlıkta
     sıralıyor; "bu adım senin, bu adım bizim" toplamını hiçbir yerde
     resmetmiyor. Adım verisindeki `who` alanı satır satır var, toplamı yok.
   - CountryDocs neyi vereceğini yazıyor, ne kadarını verdiğini değil.
   - SSS'in ilk sorusu tam olarak bu: "Dubai'ye gitmeden şirket kurulur mu?"
     Yani sayfanın en çok sorulan sorusu bu kartın çizdiği resim. Kart onu üç
     saniyede cevaplıyor, SSS talep üzerine açıyor — müşterinin istediği
     "özet önde, detay talep üzerine" düzeninin ta kendisi.
   Yani kart aşağıdaki bölümlerin özeti değil, onların hiç kurmadığı tek
   cümleyi kuruyor: "iki durak sizin, gerisi bizim."

   ---------------------------------------------------------------- TASARIM

   Dikey bir yol. Yukarıdan aşağıya, sayfanın okunma yönüyle aynı. Yatay ray
   denendi ve süreç şeridine benziyordu; dikey yol harita gibi okunuyor ve
   etiketlere gerçek genişlik bırakıyor.

   Geometri mesajın kendisi:
   - İki "SİZ" durağı kısa satırlar — kısa çünkü iş kısa.
   - Aradaki "ORTAC" bölümünün kendi düğümü yok; omurgada uzun bir KAPSÜL
     var. Yol orada kalınlaşıyor. Uzun ve kalın olması tesadüf değil: taşınan
     yükün nerede olduğunu çizerek söylüyor, yazarak değil.
   - Yalnızca varış satırının bir yüzeyi (kutusu) var. Yolun geri kalanı
     çıplak. Varış "bir yer" gibi dursun diye.

   Renk mantığı: mavi = kat edilen yol, beyaz = varış. BEYAZ YÜZEY yalnızca
   iki öğede: yolda ilerleyen ışık ve vardığında onun dönüştüğü varış diski.
   (Beyaz METİN bundan ayrı; koyu kartlarda başlık beyazı bu projede standart —
   bkz. .phda-t b. Kısıt beyaz YÜZEY için konmuştu, kart beyazlaşmasın diye.)

   Hareket: ışık yukarıdan aşağıya iniyor, her durakta duruyor, geçtiği yol
   mavi kalıyor — ilerleme birikiyor, sıfırlanmıyor. Uzun bölümü geçmesi
   görünür biçimde daha uzun sürüyor; mesafe hissi buradan geliyor, gün
   sayısından değil. Sona varınca ışık sönüp varış diskine dönüşüyor, sonra
   kart sessizce başa alınıyor (geri kayan işaretçi "geri adım" gibi okunuyor,
   hero.css'te aynı ders yazılı).

   Döngülerin tamamı CSS'te (lab-h5.css). Buradaki motion yalnızca kartın
   girişini yapıyor; prefers-reduced-motion sonsuz döngüyü CSS tarafında
   kapatıyor ve yolu tamamlanmış hâlde bırakıyor — hareketsiz hâl de eksik
   değil, okunur bir resim.

   ---------------------------------------------------------------- SINIRLAR
   - Gün sayısı yok, fiyat yok, banka adı ve banka onayı vaadi yok. Varış
     kutusunun alt satırı yalnızca bizim teslim ettiğimiz üç şeyi sayıyor.
   - "Bir kez BAE'de" satırı FACTS.dubai.limit ile aynı gerçeği taşıyor ama
     uyarı olarak değil, yolun bir durağı olarak. Gizlemek yerine yükü
     küçültüyor: dört duraktan biri.
   - Toplam sekiz kısa metin birimi, brief'in üst sınırı: yolda dört durak
     satırı, ikisinin altında birer mikro satır, artı ORTAC bölümünün satırı
     ve kartın alt cümlesi. Rozetler (Siz / Ortac) etiket, satır sayılmıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroH5() {
  const reduced = useReducedMotion() ?? false;
  /* reduced hâlde işaretleme değişmiyor, yalnızca süre sıfırlanıyor:
     sunucu ve ilk istemci render'ı aynı DOM'u üretmek zorunda */
  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      className="har"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
    >
      <div className="har-road">
        {/* Omurga tek parça ve satırların ARKASINDA duruyor. Satır yükseklikleri
            CSS'te sabit; ışığın durak noktaları (0 / 44 / 184 / 244px) o
            yüksekliklerden geliyor. Satır yüksekliği değişirse keyframe'ler de
            değişmeli — ikisi lab-h5.css'te yan yana yazılı. */}
        <span className="har-spine" aria-hidden="true">
          <span className="har-dash" />
          <span className="har-run" />
          <span className="har-fill" />
          <span className="har-car" />
        </span>

        <div className="har-row har-r1">
          <span className="har-n har-n1" aria-hidden="true" />
          <span className="har-now">Şu an buradasınız</span>
        </div>

        <div className="har-row har-r2">
          <span className="har-n har-n2" aria-hidden="true" />
          <span className="har-line">
            <b>Pasaport ve evrak</b>
            <em className="har-tag har-you">Siz</em>
          </span>
        </div>

        {/* Bu satırda düğüm yok — omurgadaki kapsül onun karşılığı. Boş hücre
            ızgarayı bozmamak için duruyor. */}
        <div className="har-row har-r3">
          <span className="har-void" aria-hidden="true" />
          <span className="har-line">
            <i>İsim onayı, lisans, tescil</i>
            <em className="har-tag har-us">Ortac</em>
          </span>
        </div>

        <div className="har-row har-r4">
          <span className="har-n har-n4" aria-hidden="true" />
          <span className="har-line">
            <span className="har-t">
              <b>Bir kez BAE&apos;de</b>
              <i>İmza ve biyometri</i>
            </span>
            <em className="har-tag har-you">Siz</em>
          </span>
        </div>

        <div className="har-row har-r5">
          <span className="har-n har-n5" aria-hidden="true">
            <Check size={13} strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="har-goal">
            <b>Şirketiniz hazır</b>
            <i>Lisans, tescil ve vergi kaydı</i>
          </span>
        </div>
      </div>

      <p className="har-foot">
        <Route size={14} strokeWidth={2} aria-hidden="true" />
        <span>İki durak sizin. Aradaki yolu biz yürüyoruz.</span>
      </p>
    </motion.div>
  );
}
