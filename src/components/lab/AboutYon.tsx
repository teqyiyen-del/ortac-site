import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import PageHero from "@/components/shared/PageHero";
import { BASIS, OPENING, WHERE } from "@/lib/about";
import { CHAIN, COUNTRY_NAME, type CountrySlug } from "@/lib/brand";

/* Hakkımızda girişi · YÖN 1 · LEVHA.
 *
 * Dört yön denendi (Levha · Sıra · Sahne · Manşet), müşteri yalnız Levha'yı
 * işaret etti; kalan üçü ve /lab/hakkimizda-yon rotası silindi (kayıt dosyanın
 * sonunda). Levha bugün /lab/hakkimizda-levha'da canlı sayfanın akışının
 * içinde deneniyor.
 *
 * Müşteri: "hakkımızda sayfasından da pek bişi anlamadım, çok ilgimi çekmedi."
 * Beğenilen tek şey HA1'in dayanak listesiydi; Levha o grameri koruyup
 * (ölçü · kısa başlık · tek cümle) sayı omurgasına asıyor.
 *
 * VİZYON VE MİSYON BİREBİR AYNI. about.ts'in kendi kuralı:
 * firmanın resmî ifadesi, yeniden yazılmaz. Değişen tek şey durduğu yer.
 *
 * UYDURMA OLGU YOK. Ekrandaki her sayı ve her ad ya bir diziden sayılıyor
 * (üç ülke, beş halka) ya da about.ts'te doğrulanmış hâlde duruyor. Kuruluş
 * yılı, çalışan/müşteri sayısı, lisans numarası ve adres SWAP: ile boş, o
 * yüzden burada da geçmiyor.
 */

/** BASIS.cards sırası sabit ve levha bu sıraya bağlı. Üçüncü kart (OFIS)
 *  levhada geçmiyor — üç ülke zaten ilk satırın konusu — o yüzden okunmuyor. */
const [LISANS, IFZA, , GECMIS] = BASIS.cards;

/* Sitenin kanonik okunuşu "KKTC, İngiltere ve Dubai" ve bu dize sitede
   yirmi dört yerde aynı sırayla geçiyor. WHERE.countries batıdan doğuya
   dizili (İngiltere önce) çünkü o sıra sahnedeki üç işaretin dizilişi; cümle
   ondan üretilirse aynı liste sitede iki farklı sırayla okunur. SAYI yine
   diziden geliyor, yani bir ülke eklendiğinde rakam eskimiyor. */
const ULKE_SIRA: CountrySlug[] = ["kktc", "ingiltere", "dubai"];
const ULKELER = ULKE_SIRA.map((s) => COUNTRY_NAME[s]);
const ULKE_CUMLE = `${ULKELER.slice(0, -1).join(", ")} ve ${ULKELER[ULKELER.length - 1]}`;

/* Vizyon ve misyon. Tek bileşen, dört kap: `v` yalnızca CSS'in hangi
   yerleşimi seçeceğini söylüyor, metne dokunmuyor. */
function Beyan({ v }: { v?: "ed" }) {
  return (
    <div className="hyn-beyan" data-v={v}>
      {[OPENING.vision, OPENING.mission].map((b, i) => (
        <FadeUp key={b.t} delay={0.08 + i * 0.08}>
          <h3>{b.t}</h3>
          <p>{b.s}</p>
        </FadeUp>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════ YÖN 1 · LEVHA ════
   Teşhis: giriş şeridinin 786 karakterinde tek bir sayı, tarih ya da isim
   yok. Bu yön girişi ölçülebilir olanla açıyor; anlatı ölçünün ARDINDAN
   geliyor, önünden değil. */

/** Levha satırları. Sayılar dizilerden okunuyor: bir ülke ya da bir halka
 *  eklenince rakam kendiliğinden güncelleniyor, elle yazılan sayı eskimiyor. */
type LevhaSatir = { n: string; tip?: "ad"; t: string; s: string };
const LEVHA: LevhaSatir[] = [
  {
    n: String(WHERE.countries.length),
    t: "ülke",
    s: `${ULKE_CUMLE}. Üçünde de kendi ofisimiz var ve üçünü de kendimiz yürütüyoruz.`,
  },
  {
    n: String(CHAIN.length),
    t: "halkalı zincir",
    s: `${CHAIN.map((c) => c.label).join(", ")}. Zincirin tamamı aynı ekipte.`,
  },
  /* "30 yıllık" müşterinin kendi düzeltmesiyle sitedeki resmî ifade
     (about.ts · BASIS). Buradan bir KURULUŞ YILI türetilmedi: 2026-30=1996
     aritmetik olarak doğru, olgu olarak uydurma. */
  { n: "30", t: "yıllık kurumsal geçmiş", s: GECMIS.s },
  { n: "IFZA", tip: "ad", t: "resmî iş ortağı", s: IFZA.s },
  { n: "Murat Ortaç", tip: "ad", t: "Certified Accountant", s: LISANS.s },
];

export function YonLevha() {
  return (
    <>
      <PageHero
        crumb="Hakkımızda"
        /* Nokta ile biten bir CÜMLE, soru değil: sitedeki öteki on dokuz
           hero'nun grameri bu. Rakam h1'in içinde, yani ilk ekranda. */
        title="Üç ülke, beş halka, tek ekip."
        accent="tek ekip."
        lead="Vergi, muhasebe ve şirket kuruluşu. Anlatmadan önce sayılabilir olanı sayıyoruz."
      />

      <section className="sec-pad hyn-sec">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={BASIS.heading} accent={BASIS.accent} className="h2" />
            <FadeUp delay={0.2}>
              {/* BOŞ OLAN LEAD DOLUYOR (about.ts · BASIS.lead === ""). Yerine
                  giden cümle yeni değil: açılış paragrafının kanıtı tanıtan
                  ikinci cümlesi, bugün kanıttan üç ekran önce duruyor. */}
              <p className="sec-lead">{OPENING.body[1]}</p>
            </FadeUp>
          </div>

          {/* Aktarım durak sırasını CSS'ten alıyor (lab-habyon.css · nth-child),
              satır içi stilden değil: sözleşmenin bütün değerleri tek blokta
              dursun, "reduce altında ne oluyor" tek bakışta okunsun. */}
          <ul className="hyn-levha akt">
            {LEVHA.map((r, i) => (
              <FadeUp key={r.t} delay={0.08 + i * 0.05}>
                <li className="hyn-lev akt-durak">
                  <div>
                    <p className="hyn-lev-n" data-tip={r.tip}>
                      {r.n}
                    </p>
                    <p className="hyn-lev-t">{r.t}</p>
                  </div>
                  <p className="hyn-lev-s">{r.s}</p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-pad hyn-sec" data-alt="">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="h2" />
          </div>
          <FadeUp delay={0.12}>
            <p className="hyn-ed-p hyn-blok">{OPENING.body[0]}</p>
          </FadeUp>
          <Beyan />
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════ ÜÇ YÖN SİLİNDİ · 10.09.2026
   Bu dosya dört yön taşıyordu: Levha · Sıra · Sahne · Manşet. Müşteri
   dördünden yalnız birini işaret etti — "hakkımızda kısmında levha
   kullanılabilir belki ama sitede nasıl durur görmem lazım" — ve aynı mesajda
   ölçütü de yazdı: "kullanmadığımızı düşündüklerini full gönder ya zaten
   beğensem söylerdim."

   Sıra (akan eksen), Sahne (tek büyük kart) ve Manşet (tek sütun) o cümleyle
   birlikte gitti; /lab/hakkimizda-yon rotası da. Levha artık tek başına ve
   yeni yerinde deneniyor: /lab/hakkimizda-levha, canlı sayfanın akışının
   içinde.

   `.hyn-ed-p` ADI KALDI ve bu bir artık değil: Manşet'in paragraf ölçüsü
   (65ch, 17px) Levha'nın ikinci bölümünde de kullanılıyordu ve orada duruyor.
   Adı "ed" öneki taşıdığı için yanıltıcı olabilir; yeniden adlandırılmadı
   çünkü Levha'nın kendisi de aday, kazanırsa sınıf adları zaten canlı ad
   alanına taşınacak. */
