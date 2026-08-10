import FadeUp from "@/components/shared/FadeUp";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { BASIS, FOR_WHOM, SUMMARY, WHERE } from "@/lib/about";
import { ABOUT_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 9 · "LEVHA"
   Biçim: src/app/css/lab-hb9.css (ad alanı .hb9-)

   ------------------------------------------------------------------- FİKİR
   Karonun içeriği değil YÜZEYİ tipografi. Her karoda tek bir kelime var ve o
   kelime karonun neredeyse tamamını kaplıyor: gövdesinden ışık geçiyor, altında
   saydığı şeylerin adları ince bir şerit hâlinde duruyor.

   Bu aday 5 "Oyma"nın orta yolu. Oyma da yüzeyi tipografiye çevirmişti ama
   yüzeye DEV BİR RAKAM koymuştu ve blok toplam üç karakter taşıyordu; müşteri
   onu "bomboş" buldu. Buradaki tek değişiklik rakamın yerini KELİMENİN
   almasıdır: aynı afiş mantığı, ama ekranda okunacak bir şey var. Rakam
   silinmedi, manşetlikten indi — kelimenin omzunda küçük bir üst simge.

   ------------------------------------------------------- ŞERİT NEDEN İKON DEĞİL
   Aday 7 nesneleri ikonla gösteriyor, bu aday ADIYLA. Fark bilerek: karar veren
   kişi "işaret mi, kelime mi" sorusunun iki cevabını da yan yana görsün. Tek
   istisna dayanak karosu — dört dayanağın adı birer cümle uzunluğunda
   ("Kendi muhasebe lisansımız" …) ve sayfanın 4. bölümü onları açıklamasıyla
   zaten basıyor; oraya kopyalamak müşterinin kaldırttığı tekrar olurdu. O
   karoda şerit dört mühürden oluşuyor.

   ------------------------------------------------------------------ HAREKET
   İki katman. Kelimenin gövdesinden geçen ışık (16,7 s, karo başına biri, dördü
   ayrı evrede) ve şeritleri kat eden aktarım dalgası (13,9 s, aktarim.css).
   Işık kesintisiz, dalga olay.

   -------------------------------------------------------------- İÇERİK SINIRI
   Ekrandaki her kelime veriden. Karo başlıkları about.ts · SUMMARY'nin TEK
   KELİMEYE indirgenmiş hâli (aşağıdaki `tekKelime`), şeritler COUNTRY_NAME,
   brand.ts · CHAIN ve about.ts · FOR_WHOM. Sayılar dizi uzunluğu. Elle yazılan
   tek kelime "dayanak".
   ========================================================================= */

/* SUMMARY etiketleri iki kelimeli olabiliyor ("halkalı zincir") ve bu adayın
   yüzeyi TEK kelime taşıyor: iki kelime yan yana yazıldığında punto yarıya
   iniyor ve afiş etkisi kayboluyor. Son kelime alınıyor çünkü Türkçede taşıyıcı
   ad orada: "halkalı zincir" → "zincir". Elle yazılmıyor ki about.ts'teki bir
   düzeltme buraya da gelsin. */
const tekKelime = (s: string) => s.split(" ").at(-1) ?? s;
const AD = Object.fromEntries(SUMMARY.map((s) => [s.k, tekKelime(s.label)]));

const AD_DAYANAK = "dayanak";

export default function AboutBentoLevha() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* `akt` KABIN üstünde: kalıp turu kabın hover'ında duraklatıyor. */}
        <div className="hb9 akt">
          {/* ==================================== 1 · ÜLKE (koyu, dar) */}
          <FadeUp className="hb9-w hb9-w-dar" y={18} delay={0.06}>
            <article
              className="hb9-t hb9-t-dark"
              style={{ "--hb9-t": 0 } as React.CSSProperties}
            >
              <span className="hb9-yuzey">
                <span className="hb9-kelime">{AD.where}</span>
                <b className="hb9-no">{WHERE.countries.length}</b>
              </span>
              <ul className="hb9-serit">
                {WHERE.countries.map((c) => (
                  <li key={c.slug} className="akt-durak">
                    {COUNTRY_NAME[c.slug]}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>

          {/* =================================== 2 · SEKTÖR (açık, geniş)
              Altı ad en uzun şerit; geniş karo bu yüzden burada. */}
          <FadeUp className="hb9-w hb9-w-genis" y={18} delay={0.12}>
            <article className="hb9-t" style={{ "--hb9-t": 1 } as React.CSSProperties}>
              <span className="hb9-yuzey">
                <span className="hb9-kelime">{AD.sectors}</span>
                <b className="hb9-no">{FOR_WHOM.sectors.length}</b>
              </span>
              <ul className="hb9-serit">
                {FOR_WHOM.sectors.map((s) => (
                  <li key={s.slug} className="akt-durak">
                    {s.label}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>

          {/* ================================== 3 · DAYANAK (açık, geniş) */}
          <FadeUp className="hb9-w hb9-w-genis" y={18} delay={0.18}>
            <article className="hb9-t" style={{ "--hb9-t": 2 } as React.CSSProperties}>
              <span className="hb9-yuzey">
                <span className="hb9-kelime">{AD_DAYANAK}</span>
                <b className="hb9-no">{BASIS.cards.length}</b>
              </span>
              <ul className="hb9-serit hb9-serit-mim" aria-hidden="true">
                {BASIS.cards.map((c) => {
                  const Icon = ABOUT_ICON[c.icon];
                  return (
                    <li key={c.t} className="akt-durak">
                      {Icon ? <Icon size={16} strokeWidth={1.7} /> : null}
                    </li>
                  );
                })}
              </ul>
            </article>
          </FadeUp>

          {/* =================================== 4 · ZİNCİR (koyu, dar) */}
          <FadeUp className="hb9-w hb9-w-dar" y={18} delay={0.24}>
            <article
              className="hb9-t hb9-t-dark"
              style={{ "--hb9-t": 3 } as React.CSSProperties}
            >
              <span className="hb9-yuzey">
                <span className="hb9-kelime">{AD.chain}</span>
                <b className="hb9-no">{CHAIN.length}</b>
              </span>
              <ul className="hb9-serit">
                {CHAIN.map((s) => (
                  <li key={s.key} className="akt-durak">
                    {s.label}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
