import { Boxes, Building2, Globe2, Link2, UsersRound, type LucideIcon } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import CountUp from "@/app/hakkimizda/CountUp";
import { CHAIN, COUNTRY_NAME, FACTS } from "@/lib/brand";
import { BASIS, FOR_WHOM, HOW, OPENING, SUMMARY, WHERE, structureOf } from "@/lib/about";
import { SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 3 · "YERİNDE"
   Biçim: src/app/css/lab-hb3.css (ad alanı .hb3-)

   ------------------------------------------------------------------- FİKİR
   Bento YERİNDE KALIYOR. Ayrı bölüm açılmıyor, yeni başlık yazılmıyor: blok
   bugünkü yerinde, vizyon/misyon kartlarının hemen altında duruyor ve
   üstündeki tek satır da bugünküyle aynı (OPENING.statementNote). Değişen tek
   şey bentonun kendisi.

   Bu aday müşterinin iki önerisinden yalnızca birini deniyor ve bu bilinçli:
   "ayrı bölüm" fikrini aday 1 ve aday 2 zaten üstleniyor. Karar verirken
   şunu görmek gerekiyor — bento vizyon/misyondan ayrılmadan da güçlenebilir
   mi? Bu aday o sorunun cevabı.

   ------------------------------------------- ANA SAYFA BENTOSUNDAN NE ALDI
     · EŞİT OLMAYAN HÜCRE — üç eşit hücre yerine bir uzun (7 × 2 satır) ve iki
       normal (5) karo.
     · TON — bir karo siyah. Bugünkü kusurun en görünür yarısı buydu: beyaz
       bölümde üç beyaz hücre tek bir levha gibi okunuyor.
     · KARONUN ANATOMİSİ — işaret → başlık → tek satır → PANO → dipnot.
       Bugünkü hücrede bunların hiçbiri yok; rakam ve altında bir liste var.
     · PANONUN OKUMASI — ana sayfadaki "Şeffaf süreç" karosunda durum
       çubuğunun sağında bir yüzde duruyor. Sayı orada panonun okuması, karonun
       konusu değil. Üç sayaç da tam bu role geçti.

   ------------------------- ANA SAYFANIN BENTO KARTINI YENİDEN KULLANAN PARÇA
   Uzun koyu karo (ÜLKE) TrustLayer'daki "Tek muhatap" karosunun iskeleti.
   Canlı bileşen import EDİLMİYOR; ad alanı ayrı bir lab kopyası kuruldu.

   ------------------------------------------------------- SAYAÇLAR NEDEN KALDI
   Diğer iki adayda rakam dipnota indi. Burada kalıyor çünkü bu adayın sorusu
   farklı: "bugünkü blok, yerinden oynatılmadan güçlenebilir mi?" Rakam
   silinirse blok zaten bugünkü blok olmaktan çıkar.

   Ama rakam artık manşet değil, PANONUN OKUMASI: karonun başlığı bir cümle,
   sayı panonun sağ üstünde. Kaynağı da bugünküyle aynı — diziler
   (WHERE.countries, CHAIN, FOR_WHOM.sectors) ve etiketler about.ts · SUMMARY.
   Elle yazılmış tek bir rakam yok.

   SUNUCU SON RAKAMI BASIYOR. CountUp durum tutmuyor ve döndürdüğü ağaç tek ve
   değişmez; sayma işi React'in dışında, düğümün textContent'i üzerinde
   yürüyor. Sonuçları: JS kapalıyken sayfada doğru rakam duruyor, hareket
   azaltılmışsa sayaç hiç çalışmıyor ve rakam zaten son değerinde. Gerekçenin
   tamamı src/app/hakkimizda/CountUp.tsx'te; o dosyaya dokunulmadı, yalnızca
   çağrıldı.

   ---------------------------------------------------------- NEYİ FEDA EDİYOR
   Anlatı. "Ne bizim olayımız" diye girişen bir bölüm yok; blok hâlâ
   vizyon/misyonun kuyruğu ve kendi başlığı yok. Müşterinin ikinci önerisi bu
   adayda karşılanmıyor.

   İkinci bedel hareket: üçünün en hareketlisi bu (on bir sonsuz animasyon).
   Üç karo, dört karodan az; kural da "az sayıda görünüyorsa olabildiğince
   fazla" diyor. Yine de hiçbir hareket iki üç pikseli aşmıyor.

   ------------------------------------------------------------------ İÇERİK
   Tek bir iddia bu dosyada yazılmadı. Kaynak metinlerin bir kısmında uzun tire
   geçiyor (FOR_WHOM.lead); firmanın onaylanmış metni olduğu gibi basılıyor.
   ========================================================================= */

/* Rakamlar ELLE YAZILMIYOR, dizilerin uzunluğu. Bir ülke ya da sektör
   eklendiğinde pano kendiliğinden doğru kalıyor. */
const COUNTS = {
  where: WHERE.countries.length,
  chain: CHAIN.length,
  sectors: FOR_WHOM.sectors.length,
};

/* Panonun sol üstündeki etiket. Bugünkü bentonun etiketleriyle AYNI dizi
   (about.ts · SUMMARY); yeni bir kelime yazılmadı. */
const LABEL = Object.fromEntries(SUMMARY.map((s) => [s.k, s.label])) as Record<
  string,
  string
>;

export default function AboutBentoYerinde() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* Bugünkü blokta bentonun hemen üstünde duran satır. Blok yerinde
            kaldığı için bu satır da yerinde: vizyon ve misyon firmanın kendi
            resmî ifadesi, bento da onun altındaki özet. */}
        <FadeUp>
          <p className="ab-vm-note">{OPENING.statementNote}</p>
        </FadeUp>

        <div className="hb3">
          {/* ================================ ÜLKE (koyu, 7 × 2 satır)
              ANA SAYFANIN BENTO KARTI: işaret → başlık → satır → pano →
              dipnot. */}
          <FadeUp delay={0.1} y={18} className="hb3-tile hb3-geo">
            <Head Icon={Globe2} title={WHERE.heading} line={WHERE.lead} />

            <div className="hb3-panel">
              <div className="hb3-head">
                <span>{LABEL.where}</span>
                {/* Sayacın sıfırdan başlaması ancak rakam görünmezken
                    yapılabiliyor ve onu görünmez tutan şey bu karonun
                    FadeUp'ıdır (opacity 0 başlangıcı, sunucuda da basılıyor).
                    Gerekçenin tamamı CountUp.tsx'te. */}
                <CountUp className="hb3-n" to={COUNTS.where} />
              </div>

              <ul className="hb3-rows">
                {WHERE.countries.map((c) => (
                  <li key={c.slug} className="hb3-row">
                    {/* BAYRAK TUZAĞI: `Flag` width/height taşımayan çıplak bir
                        <svg> döndürüyor; kabı ölçülmezse 300 × 150'ye açılıyor
                        ve hakkımızda sayfası bir kez bu yüzden çöktü. Ölçü
                        CSS'te sabit pikselle (.hb3-flag). */}
                    <span className="hb3-flag" aria-hidden="true">
                      <Flag country={c.slug} />
                    </span>
                    <span className="hb3-rt">
                      <b>{COUNTRY_NAME[c.slug]}</b>
                      {/* Yapı künyesi brand.ts · FACTS'ten okunuyor;
                          about.ts'e kopyalanmadı ki iki yerde iki farklı yapı
                          yazma ihtimali hiç doğmasın. */}
                      <span>{structureOf(c.slug)}</span>
                      {/* Ülkenin kendi cümlesi: panonun boyunu dolduran şey
                          bu, ad ile künye tek başına üç kısa satır bırakıyordu. */}
                      <i>{c.line}</i>
                    </span>
                    <span className="hb3-tag">{FACTS[c.slug].tag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dipnot bir iddia ve firmanın kendi cümlesi (BASIS · office). */}
            <span className="hb3-f">
              <Building2 size={13} strokeWidth={2.2} aria-hidden="true" />
              {BASIS.cards[2].t}
            </span>
          </FadeUp>

          {/* ============================================= ZİNCİR (açık, 5) */}
          <FadeUp delay={0.18} y={18} className="hb3-tile">
            <Head Icon={Link2} title={HOW.heading} line={HOW.lead} />

            <div className="hb3-panel">
              <div className="hb3-head">
                <span>{LABEL.chain}</span>
                <CountUp className="hb3-n" to={COUNTS.chain} />
              </div>

              {/* Beş bölmeli şerit. Bölme sayısı CHAIN'den geliyor, elle
                  yazılmıyor; bir halka eklenirse şerit de altıya çıkıyor. */}
              <div className="hb3-bar" aria-hidden="true">
                {CHAIN.map((s) => (
                  <span key={s.key} className="hb3-seg" />
                ))}
              </div>

              <ol className="hb3-steps">
                {CHAIN.map((s, i) => (
                  <li key={s.key} className="hb3-step">
                    <span className="hb3-stepn" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b>{s.label}</b>
                  </li>
                ))}
              </ol>
            </div>

            <span className="hb3-f">
              <UsersRound size={13} strokeWidth={2.2} aria-hidden="true" />
              {HOW.principles[0].t}
            </span>
          </FadeUp>

          {/* ============================================= SEKTÖR (açık, 5) */}
          <FadeUp delay={0.26} y={18} className="hb3-tile">
            <Head Icon={Boxes} title={FOR_WHOM.heading} line={FOR_WHOM.lead} />

            <div className="hb3-panel">
              <div className="hb3-head">
                <span>{LABEL.sectors}</span>
                <CountUp className="hb3-n" to={COUNTS.sectors} />
              </div>

              {/* Altı ikon sayfanın sektör bölümündekilerle AYNI: aynı
                  sektörün iki blokta iki farklı glifle çıkması, ziyaretçinin
                  kurduğu görsel eşlemeyi bozuyor. */}
              <ul className="hb3-secs">
                {FOR_WHOM.sectors.map((s) => {
                  const Icon = SECTOR_ICON[s.slug];
                  return (
                    <li key={s.slug} className="hb3-sec">
                      <span className="hb3-secic" aria-hidden="true">
                        {Icon ? <Icon size={15} strokeWidth={1.9} /> : null}
                      </span>
                      <b>{s.label}</b>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* Karonun üst üçlüsü. Üçünde de aynı sırada. Koyu / açık ayrımı BURADA DEĞİL,
   CSS'te (.hb3-geo torunlarını boyuyor): koşullu sınıf yazmak sunucu ile
   istemci arasında ayrım riski demek ve bu depoda o riskin bedeli ödendi. */
function Head({ Icon, title, line }: { Icon: LucideIcon; title: string; line: string }) {
  return (
    <>
      <span className="hb3-ic" aria-hidden="true">
        <Icon size={17} strokeWidth={1.9} />
      </span>
      <h3 className="hb3-t">{title}</h3>
      <p className="hb3-l">{line}</p>
    </>
  );
}
