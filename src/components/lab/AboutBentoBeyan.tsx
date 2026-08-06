import { Boxes, Globe2, Link2 } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandChip } from "@/components/shared/BrandMark";
import { brandKeyForName } from "@/lib/brands";
import { CHAIN, COUNTRY_NAME, FACTS, PARTNERS } from "@/lib/brand";
import { BASIS, FOR_WHOM, HOW, OPENING, WHERE } from "@/lib/about";
import { SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 2 · "BEYAN"
   Biçim: src/app/css/lab-hb2.css (ad alanı .hb2-)

   ------------------------------------------------------------------- FİKİR
   Bölümün başlığı yok, çünkü başlık İLK KARONUN İÇİNDE. Müşterinin cümlesi
   "ne bizim olayımız diye girişip anlatırız" idi; bir bentonun içinden
   girişmenin yolu, ilk karoyu bir kart değil bir BEYAN yapmak. O karo bölümün
   sorusunu soruyor, firmanın iki paragrafıyla cevaplıyor ve altında resmî iş
   ortaklarının GERÇEK LOGOLARINI taşıyor.

   ------------------------------------------- ANA SAYFA BENTOSUNDAN NE ALDI
   Izgarayı DEĞİL, ilkeyi:

     · EŞİT OLMAYAN HÜCRE — 12 sütun; beyan karosu 7 genişlik ve 2 satır,
       ülke ve zincir 5'er, sektör tam genişlik.
     · TON KARŞITLIĞI, TERSİNE ÇEVRİLMİŞ — ana sayfada zemin beyaz ve iki karo
       siyah; burada zemin siyah ve iki karo beyaz. Aynı iş, ters yönde.
     · HER KARONUN KENDİ MEKANİĞİ — logo şeridi, ülke taban çizgisi, dikey
       zincir rayı. Sektör karosu bilerek hareketsiz.
     · KARO SAYMIYOR, GÖSTERİYOR — manşetler cümle, rakamlar dipnotta.

   ANA SAYFANIN BENTO KARTINI YENİDEN KULLANMIYOR. Bu bilinçli: kararı verecek
   kişi kartın yeniden kullanıldığı hâli (aday 1 ve aday 3) ile kullanılmadığı
   hâli yan yana görmeli. Ülke karosu burada satır satır bir pano değil, üç
   sütunlu bir şerit.

   ---------------------------------------------------------- NEYİ FEDA EDİYOR
   Zemin ritmi. Bölüm gece; hakkımızda sayfasında hemen ardından gelen "Üç
   ülkede çalışıyoruz" bölümü de gece. İki gece bölüm arka arkaya gelirse
   sayfanın beyaz–gece–mavi ritmi bozuluyor. Canlıya alınırsa ya bu bölüm
   beyaza çekilmeli ya da alttaki bölüm.

   İkinci bedel: BASIS kartları (dört dayanak) bu adayda ekranda yok. Yerini
   ortak logoları aldı. Dayanaklar sayfanın kendi 4. bölümünde tek tek duruyor.

   Üçüncü bedel: logolar. Sayfanın 4. bölümü zaten bir ortak listesi basıyor.
   Bu karo yalnızca `resmi` grubunu (beş kurum) alıyor, ama canlıya alınırsa
   iki listeden biri sadeleşmeli.

   ------------------------------------------------------------------ İÇERİK
   Tek bir iddia bu dosyada yazılmadı; her satır lib/about.ts, lib/brand.ts ve
   lib/brands.ts'ten okunuyor. Ortak listesinden YALNIZCA `resmi` grubu
   basılıyor ve gerekçesi olgusal: o grubun ekrandaki karşılığı "adımızın karşı
   tarafta kayıtlı olduğu kurumlar" cümlesi, `altyapi` grubu için o cümle yanlış
   olurdu (gerekçenin tamamı brand.ts · PARTNERS başında).

   Logosu kayıt defterinde olmayan bir ad düz yazıyla çıkıyor: yanlış bir logo,
   logosuzluktan daha kötü.

   ------------------------------------------------------------------ HAREKET
   Dört mekanik, on sonsuz animasyon, hepsi saf CSS. Sunucu bileşeni:
   useReducedMotion bu depoda beş kalıpta hidrasyon uyarısı çıkardı, bir CSS
   medya sorgusu ise sunucu ile istemci arasında ayrım yaratmıyor. Bütçe ve
   gerekçe CSS'te.
   ========================================================================= */

/* BU DOSYADA YAZILAN TEK METİN. Bir olgu iddiası taşımıyor: bölümün sorusu. */
const ASK = "Ne bizim olayımız?";
const ASK_ACCENT = "olayımız?";

const UNITS = { where: "ülke", chain: "halka", sectors: "sektör" };

/* Kayıt defterindeki kurumların tamamı. GRUBA GÖRE FİLTRELENMİYOR ve bunun
   sebebi etiketin kendisi: about.ts · BASIS.partners.t bugün "Birlikte
   çalıştığımız kurumlar" diyor, yani listenin tamamını kapsıyor. Bir tur önce
   burada yalnızca `resmi` grubu basılıyordu çünkü o günkü etiket "Resmî iş
   ortaklıkları" idi ve `altyapi` için o cümle yanlış olurdu. Etiket değişti,
   filtre de kalktı: ekrandaki liste her zaman etiketin söylediği şey olmalı.

   Etiketin ALT SATIRI (BASIS.partners.s) bilerek basılmıyor. O cümle "başlıklar
   kurumun türünü söylüyor" diyor ve sayfanın 4. bölümündeki TÜRE GÖRE gruplu
   listeyi tarif ediyor; buradaki şerit gruplu değil, düz bir logo dizisi.
   Doğru olmayan bir cümleyi basmaktansa hiç basmamak. */
const MARKS = PARTNERS;

export default function AboutBentoBeyan() {
  return (
    <section className="sec-pad sec-night">
      <div className="container-o">
        <div className="hb2">
          {/* =================================== BEYAN (açık, 7 × 2 satır) */}
          <FadeUp delay={0.08} y={18} className="hb2-tile hb2-say">
            <SplitWords
              as="h2"
              text={ASK}
              accent={ASK_ACCENT}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />

            {/* Firmanın kendi iki paragrafı. Canlıya alınırsa bunlar "Kim
                olduğumuz" bölümünden BURAYA TAŞINIR, kopyalanmaz: aynı
                paragrafın iki bölümde birden durması tam olarak müşterinin
                "öylesine yapılmış" dediği şeyi üretir. */}
            <div className="hb2-body">
              {OPENING.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {/* Logolar. Müşterinin isteği "logo vb girebilir işin içine, elini
                korkak alıştırma" idi ve karşılığı bu şerit: soyut bir işaret
                değil, kurumların kendi tam logoları. */}
            <div className="hb2-marks-head">
              <p className="hb2-marks-t">{BASIS.partners.t}</p>
              <ul className="hb2-marks">
                {MARKS.map((p) => {
                  const key = brandKeyForName(p.name);
                  return (
                    <li key={p.name} className="hb2-mark">
                      {/* Kayıt defterinde tam logosu olan ad LOGOSUYLA,
                          olmayan DÜZ ADIYLA çıkıyor. Renk ya da işaret
                          uydurulmuyor: yanlış bir logo, logosuzluktan daha
                          kötü. */}
                      {key ? (
                        <BrandChip brand={key} optical={15} />
                      ) : (
                        <b className="hb2-mark-n">{p.name}</b>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeUp>

          {/* ============================================= ÜLKE (koyu, 5) */}
          <FadeUp delay={0.16} y={18} className="hb2-tile hb2-geo">
            <h3 className="hb2-t">{WHERE.heading}</h3>
            <p className="hb2-l">{WHERE.lead}</p>

            <ul className="hb2-cols">
              {WHERE.countries.map((c) => (
                <li key={c.slug} className="hb2-col">
                  {/* BAYRAK TUZAĞI: `Flag` width/height taşımayan çıplak bir
                      <svg> döndürüyor ve kabı ölçülmezse 300 × 150'ye
                      açılıyor; hakkımızda sayfası bir kez bu yüzden çöktü.
                      Ölçü CSS'te sabit pikselle veriliyor (.hb2-flag). */}
                  <span className="hb2-flag" aria-hidden="true">
                    <Flag country={c.slug} />
                  </span>
                  <b>{COUNTRY_NAME[c.slug]}</b>
                  {/* İki kelimelik künye brand.ts · FACTS'ten; about.ts'e
                      kopyalanmadı ki iki yerde iki farklı şey yazmasın. */}
                  <span>{FACTS[c.slug].tag}</span>
                </li>
              ))}
            </ul>

            <span className="hb2-f">
              <Globe2 size={13} strokeWidth={2.2} aria-hidden="true" />
              <b>{WHERE.countries.length}</b> {UNITS.where}
            </span>
          </FadeUp>

          {/* =========================================== ZİNCİR (koyu, 5) */}
          <FadeUp delay={0.24} y={18} className="hb2-tile hb2-chain">
            <h3 className="hb2-t">{HOW.heading}</h3>
            <p className="hb2-l">{HOW.lead}</p>

            {/* Ray DİKEY. Aday 1'deki yatay rayın kopyası değil: iki adayı yan
                yana koyup karar verecek kişi aynı çizimi iki kez görmemeli. */}
            <ol className="hb2-steps">
              {CHAIN.map((s, i) => (
                <li key={s.key} className="hb2-step">
                  <span className="hb2-stepn" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <b>{s.label}</b>
                  <span>{s.line}</span>
                </li>
              ))}
            </ol>

            <span className="hb2-f">
              <Link2 size={13} strokeWidth={2.2} aria-hidden="true" />
              <b>{CHAIN.length}</b> {UNITS.chain}
            </span>
          </FadeUp>

          {/* ================================ SEKTÖR (açık, tam genişlik)
              IZGARANIN DİNLENME NOKTASI: ambiyans hareketi yok. Dört karo
              birden kıpırdarsa hiçbiri okunmuyor. */}
          <FadeUp delay={0.32} y={18} className="hb2-tile hb2-sec">
            <h3 className="hb2-t">{FOR_WHOM.heading}</h3>

            {/* Altı ikon sayfanın sektör bölümündekilerle AYNI: aynı sektörün
                iki blokta iki farklı glifle çıkması görsel eşlemeyi bozuyor. */}
            <ul className="hb2-sec-grid">
              {FOR_WHOM.sectors.map((s) => {
                const Icon = SECTOR_ICON[s.slug];
                return (
                  <li key={s.slug} className="hb2-s">
                    <span className="hb2-sic" aria-hidden="true">
                      {Icon ? <Icon size={16} strokeWidth={1.9} /> : null}
                    </span>
                    <b>{s.label}</b>
                  </li>
                );
              })}
            </ul>

            <span className="hb2-f">
              <Boxes size={13} strokeWidth={2.2} aria-hidden="true" />
              <b>{FOR_WHOM.sectors.length}</b> {UNITS.sectors}
            </span>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
