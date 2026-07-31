"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, TriangleAlert, X } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C5 — "Sade açılır"

   MÜŞTERİNİN ÜÇ CÜMLESİ, ÜÇ KARAR

   1) "tıklayıp başka bir yere gitmekten bahsetmiyordum" → detay burada açılıyor.
      C1'in çözümü her satırı bir kapıya çevirmekti; tıklayınca ülke sayfasına
      gidiliyordu. Burada satırın kendisi açılıyor, sayfa değişmiyor. Canlı
      bölümün (ThreeCountries) mekaniği zaten buydu, korunan tek şey o.

   2) "istediğim onun daha sade hali" → açılan panelde ÜÇ bilgi var, dördüncüsü
      yok. Canlı panelde ne vardı, nereye gitti:
        · EDGE cümlesi        → kapalı satıra taşındı, artık açmadan görünüyor
        · "Uygun" çip listesi → düz metin oldu (FACTS.forWhom, aynı kaynak)
        · "Neden?" ikon rayı  → GİTTİ. Üç elle yazılmış etiketti ve üçü de
                                ülke sayfasının ilk ekranında zaten var.
        · Tahsilat matrisi    → dört kanal yerine tek eksen, o da kapalı satırda
        · "…'de kuruluş" butonu → sessiz metin bağlantısı oldu; bölümün işi
                                satış değil, seçtirmek
        · Ödeme dipnotları    → GİTTİ (aşağıda ayrıca açıklandı)
        · Kart/tablo anahtarı → GİTTİ. Kıyas artık kapalı hâlin kendisi.
        · Ülke fotoğrafları   → GİTTİ. Fotoğraf üç sütunu 240 piksel
                                uzatıyordu ve hiçbir soruyu cevaplamıyordu.

   3) "tıklamadan bile biraz detay lazım, kıyas yaptığını hissettirmek için" →
      kapalı satır iki şey söylüyor: ülkeyi ayıran tek cümle ve ÜÇ ÜLKEDE DE
      AYNI olan tek bir kıyas ekseni (kartla tahsilat). İkisi birlikte üç ülkeyi
      birbirinden ayırmaya yetiyor: cümle Dubai ile İngiltere'yi ayırıyor, eksen
      KKTC'yi ayırıyor. Eksen aynı sütunda hizalı durduğu için göz aşağı doğru
      okuyup kıyaslıyor — tablo kurmadan tablo etkisi. Sütun başlıkları (Fark /
      Kartla tahsilat) bir kez, en üstte yazılıyor; her satırda tekrarlanan
      etiket üç kez aynı kelimeyi okutmak olurdu.

   4) "istanbul detayına gerek yok" → bu bölümde İstanbul geçmiyor. KKTC'nin
      yakınlık argümanı yalnızca kendi satırında, kendi cümlesinde duruyor.

   NEDEN AKORDİYON, NEDEN TEK TEK AÇILIYOR
   Satırlar alt alta ve aynı anda yalnızca biri açık. Sebep kıyasın nerede
   yapıldığı: kıyas kapalı hâlde, hizalı sütunda yapılıyor; açılan panel kıyas
   için değil, tek bir ülkede derinleşmek için. İki panel aynı anda açık olsaydı
   bölüm iki katına çıkar, üstelik iki panelin içeriği yan yana değil alt alta
   durduğu için kıyas da kolaylaşmazdı. Açık panel sayısını birde tutmak bölümün
   yüksekliğini de sabitliyor — bu turun asıl konusu buydu.

   NEDEN HEPSİ KAPALI BAŞLIYOR
   Canlı bölüm Dubai açık başlıyor ve bu, kapalı yüksekliği hiç göstermiyor;
   ziyaretçi bölümü ilk gördüğünde zaten bir ülkeye gömülmüş oluyor. Üç ülke
   eşit ağırlıkta sunulacaksa hiçbiri önden açık olamaz. Kapalı hâl boş da
   değil: her satırda bayrak, ad, ayırt eden cümle ve kıyas ekseni var.

   DÜRÜST KISIT NEDEN KAPALI HÂLDE DEĞİL
   FACTS[c].limit birer tam cümle (40-46 karakter) ve üçü birden kapalı satıra
   girseydi her satır iki-üç satıra çıkar, bölüm yeniden uzardı; dahası üç uyarı
   üst üste okunduğunda tek tek anlamlarını kaybediyor. Kısıt tek tıkla, açılan
   panelin son sütununda, amber ikonuyla duruyor — yani ülkeyi ciddi ciddi
   düşünen kişi onu mutlaka görüyor. Kapalı satırdaki tahsilat ekseni de zaten
   bir kısıt gösteriyor (KKTC'de "Yok"), o yüzden kapalı hâl "her şey güzel"
   demiyor.

   ÖDEME DİPNOTLARI NEREYE GİTTİ
   Canlı bölümün altındaki iki paragraf ("ödeme kuruluşu banka değildir",
   "kararı banka verir") burada yok; ikisi de PriceSummary, HomeFaq ve
   /{ülke}/banka-hesabi sayfalarında tam hâliyle duruyor. DİKKAT: o blok
   id="odeme-altyapisi" taşıyor ve lib/routes.ts bu çapayı canlı sayıyor
   (FinalCta ve footer oraya bağlanıyor). Bu aday kazanırsa çapanın yeni bir eve
   ihtiyacı var — burası o metni barındırmadığı için id'yi de sahiplenmiyor.
   Bölüm id="ulkeler" de almıyor: /lab/ulkeler sayfasında adaylar alt alta
   duruyor ve id çakışması olmasın diye çapa canlıya taşınırken veriliyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Ülke başına TEK cümle, kapalı satırda. Kurallar:
   1) Ayırt edici olacak — üçünde de doğru olan bir şey (kuruluş, banka,
      muhasebe) burada yazılmaz, o zaten başlığın altındaki satırda.
   2) Söz vermeyecek — Dubai'de "çıkabilen" yazıyor, "çıkar" değil; vize
      kararını konsolosluk veriyor. Süre ve rakam yok, ikisi de fiyat
      bölümünün işi.
   3) Tek satıra sığacak — 1200'lük kapta bu sütun ~610 piksel, üç cümle de
      rahatça sığıyor. Biri iki satıra taşarsa satır yüksekliği tırtıklanır. */
const LINE: Record<CountrySlug, string> = {
  dubai: "Oturum vizesi çıkabilen tek ülke.",
  ingiltere: "Baştan sona uzaktan kuruluş.",
  kktc: "Türkiye'ye en yakın, Türkçe süreç.",
};

/* --------------------------------------------------------- kıyas ekseni ---- */
/* Kapalı hâlde tek bir eksen var ve o da elle yazılmıyor: PAY_MATRIX'in
   "Tahsilat" grubundaki kartlı kanallar okunuyor. Neden bu eksen:
   · Veriden geliyor — matris değişirse satır kendiliğinden değişir.
   · Üç ülkeyi gerçekten ayırıyor: Dubai/İngiltere "Var", KKTC "Yok". Ayırmayan
     bir eksen (üçünde de aynı çıkan bir şey) kıyas hissi vermez, yer kaplar.
   · Karar verdiren bilgi bu: "parayı nasıl tahsil ederim" sorusu ülke seçimini
     ülke seçiminin kendisinden daha çok belirliyor.
   Wise/Payoneer bilerek dışarıda: onlar ödeme kuruluşu, banka değil ve bu ayrım
   tek satırlık bir hücrede anlatılamaz — o ayrım banka sayfalarının işi. */
const CARD_ROWS =
  PAY_MATRIX.find((g) => g.title === "Tahsilat")?.rows.filter(
    (r) => r.name === "Stripe" || r.name === "PayPal",
  ) ?? [];

function cardsOf(c: CountrySlug) {
  const live = CARD_ROWS.filter((r) => r.cells[c] === "yes").map((r) => r.name);
  return { on: live.length > 0, names: live.join(", ") };
}

export default function CountriesC5() {
  /* null gerçek bir durum: açık panel kendi satırına geri kapanabiliyor. */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion();

  const toggle = (c: CountrySlug) => setOpen((prev) => (prev === c ? null : c));
  /* Tek yerden süre: reduce açıkken 0 verilince motion aynı düzeni animasyonsuz
     kuruyor, AnimatePresence'i sökmek gerekmiyor. */
  const dur = reduce ? 0 : 0.38;

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
                bir şey kalmadı. Yeni satırın ikinci yarısı mekaniği baştan
                söylüyor: ayrıntı var, ama satırı açan görüyor. Bu cümle
                olmadan kapalı liste "hepsi bu mu?" diye okunuyor. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Ayrıntı için satırı açın.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16}>
          {/* Üç ayrı kart değil, üçe bölünmüş tek panel: çerçeve, gölge ve köşe
              takımı bir kez veriliyor, satırlar yalnızca saç teli çizgiyle
              ayrılıyor. Sadeliğin büyük kısmı metni kısaltmaktan değil, göze
              sayılan nesneyi üçten bire indirmekten geliyor. */}
          <div className="csad-list">
            {/* Sütun başlıkları. aria-hidden çünkü ekran okuyucuya bu bilgi
                satırların içinden veriliyor (.csad-axis-k); iki kez okunması
                gereksiz. Görsel olarak ise başlık şart: hizalı bir sütunun
                kıyas olduğunu söyleyen şey başlığın kendisi. */}
            <div className="csad-legend" aria-hidden="true">
              <span className="csad-lg-a">Fark</span>
              <span className="csad-lg-b">Kartla tahsilat</span>
            </div>

            {COUNTRY_ORDER.map((c) => {
              const on = open === c;
              const card = cardsOf(c);
              return (
                <article key={c} className="csad-row" data-on={on}>
                  {/* WAI-ARIA akordiyon kalıbı: başlık düzeyinde bir düğme.
                      h3 yalnızca ülke adını değil satırın tamamını sarıyor,
                      çünkü tıklama hedefi de satırın tamamı — düğmenin görsel
                      alanı ile erişilebilirlik ağacındaki alanı aynı olmalı. */}
                  <h3 className="csad-h">
                    <button
                      type="button"
                      className="csad-btn"
                      aria-expanded={on}
                      /* Panel kapalıyken DOM'da yok (AnimatePresence söküyor),
                         o yüzden aria-controls de yalnızca açıkken veriliyor:
                         var olmayan bir id'ye işaret eden bağ, erişilebilirlik
                         denetimlerinde kırık referans olarak sayılıyor. */
                      aria-controls={on ? `csad-p-${c}` : undefined}
                      onClick={() => toggle(c)}
                    >
                      <span className="csad-idcell">
                        <span className="csad-flag" aria-hidden="true">
                          <Flag country={c} />
                        </span>
                        <span className="csad-name">{COUNTRY_NAME[c]}</span>
                      </span>

                      <span className="csad-line">{LINE[c]}</span>

                      {/* Eksen hücresi. Etiket masaüstünde görünmüyor ama
                          DOM'da: ekran okuyucu "Kartla tahsilat, Var, Stripe,
                          PayPal" duyuyor, gören kişi ise üstteki tek başlığı
                          okuyup üç değeri alt alta kıyaslıyor. Dar ekranda
                          sütun hizası diye bir şey kalmadığı için aynı etiket
                          görünür hâle geliyor. */}
                      <span className="csad-axis" data-v={card.on ? "yes" : "no"}>
                        <span className="csad-axis-k">Kartla tahsilat</span>
                        <span className="csad-axis-v">
                          {card.on ? (
                            <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                          ) : (
                            <X size={15} strokeWidth={2.4} aria-hidden="true" />
                          )}
                          {card.on ? "Var" : "Yok"}
                        </span>
                        {/* Kanal adları iddiayı somutluyor: "Var" tek başına
                            söz, "Stripe, PayPal" kanıt. Çalışmayan ülkede
                            karşılığı olmadığı için hücre boş kalıyor —
                            yerine "yerel banka var" yazmak kartla tahsilat
                            sorusuna verilmiş yanlış bir cevap olurdu. */}
                        {card.on && <span className="csad-axis-n">{card.names}</span>}
                      </span>

                      <span className="csad-chev" aria-hidden="true">
                        <ChevronDown size={17} strokeWidth={2.2} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        key="p"
                        id={`csad-p-${c}`}
                        className="csad-panel"
                        /* Yükseklik animasyonu dıştaki kutuda (overflow:hidden),
                           iç boşluk içteki kutuda. Padding'i animasyonlu kutuya
                           koymak kapanışta panelin son 20 pikselde sıkışmasına
                           yol açıyor; ayırınca içerik sabit kalıp yalnızca
                           pencere kapanıyor. */
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: dur, ease: EASE },
                          /* opacity biraz daha kısa: içerik, pencere tam
                             kapanmadan silinsin, yoksa kapanışın son karesinde
                             metin kırpılmış görünüyor */
                          opacity: { duration: dur * 0.7, ease: EASE },
                        }}
                      >
                        <div className="csad-panel-in">
                          <dl className="csad-facts">
                            <div>
                              <dt className="csad-k">Uygun</dt>
                              {/* forWhom tek kaynaktan, virgüllü liste olarak.
                                  Canlı bölümde bu liste yeşil çiplere
                                  bölünüyordu; çip, bir şeyin "var/yok"
                                  olduğunu söylemek için iyi bir biçim, oysa
                                  burada söylenen şey bir hedef kitle. Düz metin
                                  hem daha kısa hem daha doğru. */}
                              <dd className="csad-v">{FACTS[c].forWhom}</dd>
                            </div>
                            <div>
                              <dt className="csad-k">Yapı</dt>
                              <dd className="csad-v">{FACTS[c].structure}</dd>
                            </div>
                            <div>
                              <dt className="csad-k">Kısıt</dt>
                              <dd className="csad-v csad-limit">
                                <TriangleAlert size={15} strokeWidth={2.1} aria-hidden="true" />
                                <span>{FACTS[c].limit}</span>
                              </dd>
                            </div>
                          </dl>

                          {/* Bölümün tek çıkışı ve yalnızca panel açıkken var.
                              Kapalı listede hiç bağlantı yok: müşterinin
                              şikâyeti tam olarak "tıklayınca başka yere
                              gitmek"ti. Sıra şu: satırı aç, üç bilgiyi oku,
                              hâlâ istiyorsan ülke sayfasına geç. Solid buton
                              değil sessiz bir metin bağlantısı — üç panelde üç
                              mavi buton, bölümü yeniden reklam panosuna
                              çevirirdi. */}
                          <SmartLink href={`/${c}`} className="csad-door">
                            {COUNTRY_NAME[c]} sayfasında tamamı
                            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                          </SmartLink>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
