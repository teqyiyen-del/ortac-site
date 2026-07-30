"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";

/* ============================================================================
   C1 — "Üç kapı"

   NEDEN BU KADAR AZ?
   Ana sayfa bir vitrin. Vitrinin işi ürünü satmak değil, doğru rafı
   göstermek. Ziyaretçi buraya "hangi ülke?" sorusuyla geliyor ve bu bölümden
   çıkarken elinde tek bir şey olması yeterli: nereye tıklayacağı.

   Mevcut bölüm bunun tersini yapıyordu. Açılır panel, "Uygun"/"Neden?" çip
   listeleri, dört kanallı tahsilat şeridi, iki satırlık dipnot ve bir de
   kart/tablo anahtarı — hepsi aynı anda ve hepsi ilk ekranın hemen altında.
   Yani ziyaretçiye seçim yaptırmadan önce karşılaştırma yaptırıyorduk. Oysa
   ayrıntılı kıyas zaten iki yerde daha var: /ulkeler'de yan yana tablo,
   /dubai · /ingiltere · /kktc sayfalarında ülkenin kendi anlatısı. Aynı bilgi
   üçüncü kez, üstelik en dar yüzeyde tekrarlanınca bilgi değil gürültü
   oluyor.

   Bu yüzden kıyas tamamen bırakıldı. Üç ülke burada birbiriyle yarışmıyor;
   üçü de eşit ağırlıkta, her biri kendi tek cümlesiyle duruyor. Kıyas isteyen
   için bölümün altında tek bir çıkış var.

   NE KALDI, NE GİTTİ
   Kaldı  : bayrak, ülke adı, o ülkeyi bir cümlede özetleyen ayırt edici şey,
            FACTS[c].limit (dürüst kısıt), ülke sayfasına giden kapı,
            /ulkeler'e giden tek karşılaştırma çıkışı.
   Gitti  : açılır panel ve +/- düğmesi, kart/tablo anahtarı, "Uygun"/"Neden?"
            çip listeleri, PAY_MATRIX tahsilat şeritleri, ülke fotoğrafları,
            "ödeme kuruluşu banka değildir" dipnot bloğu.

   GİDENLER NEREDE YAŞIYOR?
   Hiçbiri silinmiş değil, hepsi zaten başka bir yüzeyde tam haliyle duruyor:
   - PAY_MATRIX kıyası → /ulkeler tablosu ve ülke sayfalarının banka bölümü.
   - "Ödeme kuruluşu, banka hesabı değildir" ve "kararı banka verir" uyarısı →
     PriceSummary, HomeFaq ve /{ülke}/banka-hesabi.
   TEK DİKKAT: eski bölümdeki dipnot bloğu id="odeme-altyapisi" taşıyordu ve
   lib/routes.ts bu çapayı canlı sayıyor (FinalCta ve footer oraya bağlanıyor).
   Bu bölüm kazanırsa o id'nin yeni bir eve ihtiyacı olacak — burası artık o
   metni barındırmıyor, dolayısıyla id'yi de sahiplenmiyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Ülke başına TEK cümle. Kural üç maddede:

   1) Ayırt edici olacak. Üçünde de doğru olan bir şey (kuruluş yapıyoruz,
      banka açıyoruz, muhasebe tutuyoruz) burada yazılmaz — o zaten başlığın
      altındaki tek satırda. Bu cümle yalnızca "neden bu ülke, öbürü değil"
      sorusuna cevap verir.
   2) Aynı biçimde olacak. Üçü de isim öbeği; biri cümle biri öbek olursa göz
      birini diğerinden önemli sanıyor, oysa burada üçü eşit ağırlıkta.
   3) Söz vermeyecek. Dubai'de "çıkabilen" yazıyor, "çıkar" değil — vize
      kararını konsolosluk veriyor, biz vermiyoruz. Süre ve rakam yok; ikisi
      de fiyat bölümünün işi.
   4) Tek satıra sığacak. Üçü de 1200'lük kapta ölçüldü (244 / 225 / 252
      piksel, hücrenin içi 321). Biri iki satıra taşarsa sıra tırtıklı
      görünüyor ve hücre boyu 24 piksel büyüyor; KKTC'nin cümlesi bu yüzden
      "tamamen Türkçe süreç"ten "Türkçe süreç"e indi. */
const LINE: Record<CountrySlug, string> = {
  dubai: "Oturum vizesi çıkabilen tek ülke.",
  ingiltere: "Baştan sona uzaktan kuruluş.",
  kktc: "Türkiye'ye en yakın, Türkçe süreç.",
};

/* Dürüst kısıt neden burada kalıyor, ama neden amber kutuda değil?

   KALIYOR: firmanın duruşu "kısıtı sonra öğrenirsiniz" değil. Ziyaretçi bir
   kapıya tıklamadan önce o kapının bedelini de görmeli, yoksa bu bölüm vitrin
   değil tuzak olur. Metin elle yazılmıyor, FACTS[c].limit'ten okunuyor — tek
   kaynak orada, burada kopyası yok.

   AMBER DEĞİL: uyarı rengi bir iddianın yanında anlamlı. Bu bölüm hiçbir
   iddiada bulunmuyor — fiyat yok, süre yok, garanti yok. İddianın olduğu
   yerlerde (fiyat özeti, ülke sayfaları) kısıt zaten amber şeridiyle
   duruyor. Burada aynı cümleyi üç kez amber basmak, uyarıyı vurgulamak
   yerine aşındırır: her yerde kırmızı yanan lamba kimsenin dikkatini
   çekmez. O yüzden nötr gri, küçük punto, ince çizginin altında — bilgi
   olarak var, alarm olarak yok. */
const LIMIT_KICKER = "Kısıt";

export default function CountriesC1() {
  const reduce = useReducedMotion();

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* Eski satır "Kanallar ve sınırlar kartlarda." diyordu; kart diye
                bir şey kalmayınca söz de kalkıyor. Yeni satır iki iş yapıyor:
                üç ülkede ne yaptığımızı söylüyor ve ayrıntının bu bölümde
                DEĞİL, tıklandığında geleceğini baştan haber veriyor. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Ayrıntı ülke sayfasında.
            </p>
          </FadeUp>
        </div>

        {/* Üç ayrı kart değil, üçe bölünmüş tek panel.
            Üç gölgeli kutu yan yana durunca göz üç nesne sayıyor ve bölüm
            görsel olarak ağırlaşıyor; tek çerçeve içinde saç teli çizgilerle
            ayrılınca göz tek bir nesne görüyor, bölünme ise okumayı
            engellemeyecek kadar sessiz kalıyor. Sadeliğin büyük kısmı metni
            kısaltmaktan değil, nesne sayısını düşürmekten geliyor. */}
        <div className="cmin-grid">
          {COUNTRY_ORDER.map((c, i) => (
            <motion.div
              key={c}
              className="cmin-cell"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{
                duration: reduce ? 0 : 0.6,
                ease: EASE,
                /* soldan sağa kademe: üç kapı aynı anda değil sırayla
                   beliriyor, böylece okuma yönü animasyonla kuruluyor */
                delay: reduce ? 0 : 0.1 + i * 0.09,
              }}
            >
              {/* Tıklama hedefi hücrenin tamamı. Eski bölümde açan düğme ile
                  giden bağlantı ayrıydı; burada tek eylem var, o yüzden tek
                  hedef. SmartLink kullanılıyor çünkü bir ülke sayfası bir gün
                  yayından kalkarsa kapı kendiliğinden sönükleşsin.

                  Dört parça sarmalayıcı olmadan doğrudan ızgaraya giriyor.
                  Sebep dar ekran: yan yana üç sütunda bayrak üstte, adın
                  üzerinde duruyor; alt alta dizilince aynı bayrak adın SOLUNA
                  geçip kendi satırını bırakıyor. Bayrağı bir sarmalayıcıya
                  hapsetmek bu iki yerleşimi tek DOM'dan çıkarmayı imkânsız
                  kılardı ve telefonda hücre başına ~50 piksel boşa giderdi.
                  Yerleşimin tamamı CSS'te, grid-template-areas ile. */}
              <SmartLink href={`/${c}`} className="cmin-door">
                <span className="cmin-flag">
                  <Flag country={c} />
                </span>
                <span className="cmin-name">{COUNTRY_NAME[c]}</span>
                {/* Ok tek başına "buradan girilir" diyor; "Dubai'de kuruluş"
                    gibi bir etiket üç kez tekrarlanan bir satır demek olurdu
                    ve ülke adı zaten yanı başında yazıyor. */}
                <span className="cmin-go" aria-hidden="true">
                  <ArrowRight size={17} strokeWidth={2.1} />
                </span>
                <span className="cmin-line">{LINE[c]}</span>
                {/* Kısıt satırı hücrenin dibine yapışıyor (ızgaranın son satırı
                    esnek, kendisi align-self:end): üç cümlenin uzunluğu farklı
                    olsa bile üç kısıt aynı hizadan başlıyor. */}
                <span className="cmin-limit">
                  <b>{LIMIT_KICKER}</b>
                  {FACTS[c].limit}
                </span>
              </SmartLink>
            </motion.div>
          ))}
        </div>

        {/* Bölümün tek çıkışı — kıyas isteyen buradan gidiyor. Üç kapının
            hiçbiri seçilemediyse cevap "daha çok bilgi göster" değil, "kıyas
            sayfasına geç" olmalı: kıyas için tasarlanmış yüzey orası. */}
        <FadeUp delay={0.3}>
          <SmartLink href="/ulkeler" className="link-arrow">
            Üç ülkeyi yan yana karşılaştırın
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </SmartLink>
        </FadeUp>
      </div>
    </section>
  );
}
