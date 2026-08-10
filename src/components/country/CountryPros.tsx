import {
  BadgeCheck,
  Check,
  CreditCard,
  IdCard,
  Landmark,
  MapPin,
  MonitorSmartphone,
  Percent,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import ProSchema from "@/components/country/ProSchema";
import type { Pro } from "@/lib/countryContent";

/* Ülke avantajları — bento.
 *
 * ============================================================================
 * 0) BU DOSYA BİR TUR SİLİNDİ. NEDEN GİTTİ, NEDEN GERİ GELDİ.
 *
 * GİDİŞİ BİR TASARIM KARARI DEĞİL, BİR TALİMAT HATASIYDI.
 *
 * Beşinci turda giriş bölümü K4 düzenine geçti ve avantajları da basmaya
 * başladı (CountryIntro). Oradan şu sonuca atlandı: "avantajlar yukarı çıktı,
 * öyleyse aşağıdaki bento gereksiz." Dosya CountryCost'a dönüştürüldü (git mv),
 * .advx CSS bloğu globals.css'ten silindi, ProSchema bağlantısız kaldı.
 *
 * Müşteri bunu istememişti. İstediği, GİRİŞTE avantajlardan söz edilmesiydi:
 * "direkt o kısımda dubainin en öne çıkan avantajlarını fln mı vererek girsek."
 * Bölümün kendisinin kaldırılması hiç konuşulmadı. Görünce tepkisi:
 *   "dubaideki avantajlar kısmını ne yaptın … avantajlar kısmının özel bir yeri
 *    olması gayet iyiydi."
 *
 * Bu yüzden bölüm SIFIRDAN TASARLANMADI, git'ten (510f687) geri kuruldu:
 * beğenilen şey eski hâliydi. Kartların yapısı, ızgara matematiği, çizimler ve
 * rozet kuralı birebir aynı. Değişen iki şey aşağıda, ikisinin de gerekçesi var
 * (başlık/spot ve rozetin kontrastı).
 *
 * DERS: bir bölümün içeriği başka bir bölümde de görünüyor olması, o bölümün
 * kaldırılması demek değil. Tekrar bir sorunsa çözümü SİLMEK değil AYRIŞTIRMAK.
 *
 * ============================================================================
 * 1) TEKRAR SORUNU KAPANDI — ARTIK TEK EV BURASI
 *
 * Bu bölümün en uzun süren gerilimi `pros`un İKİ yerde basılmasıydı: burada ve
 * hero'dan sonraki giriş bloğunda (CountryIntro). O tekrar müşterinin isteğiydi
 * ve kopya olmasın diye iki bölüm dört ayrı kolda (rütbe / çizim / marka /
 * zemin) ayrıştırılmıştı.
 *
 * BU TUR GİRİŞ BLOĞU AKIŞTAN ÇIKTI ("şimdilik ordaki kısmı kaldır"), yani
 * `pros` sayfada yalnızca burada basılıyor. Ayrıştırma kolları artık savunulan
 * bir şey değil — ama kaldırılmadılar da: ızgara, rütbesizlik ve ProSchema
 * çizimleri bu bölümün kendi tasarımı, girişe karşı konumlanmaları tesadüftü.
 * Değişen tek şey BAŞLIK ve SPOT: ikisi de "girişte gördüklerinin devamı"
 * diyordu, gösterecekleri giriş kalmadı. Bkz. aşağıdaki sec-head yorumu.
 *
 * GİRİŞ BLOĞU GERİ GELİRSE bu gerilim de geri gelir. O gün yapılacak şey
 * silmek değil ayrıştırmak — bir tur bu ders pahalıya öğrenildi (yukarıdaki
 * 0. madde).
 *
 * ============================================================================
 * 2) SAYFADAKİ YERİ
 *
 * Silinmeden önceki slotuna döndü: CountryStructures'ın altı, CountryOrtac'ın
 * üstü. Giriş bloğu kalkınca sayfanın ikinci bölümü oldu (hero → yapı seçimi →
 * burası). Yapı seçiminin ALTINDA olması hâlâ doğru: önce hangi yapıyı
 * kurduğunuz, sonra o ülkenin ne verdiği.
 *
 * ALTINDAKİ "Karşılığında" bölümü de bu turda kalktı (bkz. page.tsx). Yani bu
 * bölüm artık bir ikiliğin ilk yarısı değil, kendi başına duruyor; spotundaki
 * "Bunlar ülkenin kendi sağladıkları" cümlesi ayrımı tek başına taşıyor.
 *
 * CountryOrtac'ın üstünde durması da korunmuş bir ayrım: buradakiler ÜLKENİN
 * sağladıkları, oradakiler ORTAC'ın kattıkları. ("Ofisimiz burada" maddesi tam
 * bu yüzden bir tur önce bu ızgaradan çıkarılmıştı.)
 *
 * ============================================================================
 * 2b) KARTLARIN ZEMİNİ SİYAH  (bu tur)
 *
 * Müşteri: "dubaide şirket kurmanın avantajarı kısmının kartlarınıda siyah
 * yapabiliriz arkasını." Değişen yalnızca KART; bölümün zemini beyaz kaldı.
 * Bölümü de siyaha çevirmek sayfada arka arkaya iki gece bloğu (burası ve
 * fiyat) üretirdi.
 *
 * BU DEĞİŞİKLİK MARKUP'A DOKUNMADI. Kart yapısı, ızgara matematiği, rozet
 * kuralı ve ProSchema çağrısı aynen duruyor; iş bütünüyle .advx- CSS bloğunda
 * yapıldı. Çizimler (.gv2-) beyaz kâğıt için kurulmuştu ve körlemesine
 * taşınmadı: dolgu, hat ve metin kademelerinin tamamı gece merdivenine
 * çevrilip yeniden ölçüldü — ama .gv2- tokenlarının KENDİSİ değiştirilmedi,
 * çünkü aynı sınıflar CountryStructures ve CountryScope'ta hâlâ beyaz zeminde
 * basılıyor. Gece değerleri .advx-fig altına kapsandı. Ölçüm tablosu
 * globals.css'te, "ÇİZİM DİLİ · GECE SÜRÜMÜ" başlığının altında.
 *
 * "Şarta bağlı" rozeti DEĞİŞMEDİ: kontrastı kendi zemini (kehribar) ile kendi
 * metni (siyah) arasında ölçülüyor, kartın arkası ikisine de dokunmuyor —
 * 17,91:1 aynen duruyor.
 *
 * 3) IZGARA VE ÇİZİMLER (geri kurulan karar kaydı, değişmedi)
 *
 * 1. "Karşılığında" hücresi bu ızgaranın içinde değil. Avantaj ızgarasının
 *    içinde duran bir uyarı listesi, bölümü iki başlı bırakıyordu: başlık
 *    "avantajları" diyor, en büyük hücrelerden biri tam tersini sayıyordu.
 *    Kalemler bir tur kendi bölümünü aldı (CountryCost), o bölüm de bu turda
 *    kaldırıldı; countryContent.watchouts artık hiçbir yerde basılmıyor ama
 *    veri duruyor. Buraya geri koymak eski iki başlılığı geri getirir.
 *
 * 2. Dev hücre yok. Eski düzende ilk avantaj 7 sütun + 2 satırdı; Dubai'de bu
 *    "%0 kurumlar vergisi" kartına denk geliyordu ve ekranın yarısını tek
 *    başına kaplıyordu. Üstelik en şarta bağlı iddia en büyük yüzeyi alıyordu.
 *    Artık satırlar 5+7 ve 7+5 diye dönüşümlü kapanıyor.
 *
 * 3. Çizimler hareket ediyor. ProSchema'nın vektörleri aynı; akış çizgileri,
 *    nokta ve çubuklar kartın içinde sürekli düşük genlikli bir döngüde
 *    (CSS, .advx-fig altında). Bileşen sunucuda kalabilsin diye hareket JS
 *    değil CSS; @media (prefers-reduced-motion) hepsini durduruyor.
 *    useReducedMotion KANCASI KULLANILMIYOR — bu depoda beş ayrı kalıpta
 *    hidrasyon hatası çıkardı.
 */

const PRO_ICON: Record<string, LucideIcon> = {
  percent: Percent,
  bank: Landmark,
  id: IdCard,
  pin: MapPin,
  remote: MonitorSmartphone,
  wallet: Wallet,
  badge: BadgeCheck,
  card: CreditCard,
  zap: Zap,
};

/* Onikilik ızgara, dönüşümlü satırlar. Çift sayıda kart 5+7 / 7+5 olarak
   kapanıyor; üç kalırsa 4+4+4, bir kalırsa tam satır. Böylece ızgara hiçbir
   zaman delikle bitmiyor ve tek bir kart öne çıkmıyor. */
function spansFor(total: number): number[] {
  if (total <= 1) return [12];
  if (total === 3) return [4, 4, 4];

  const out: number[] = [];
  let left = total;
  let flip = false;
  while (left > 0) {
    if (left === 1) {
      out.push(12);
      left = 0;
    } else if (left === 3) {
      out.push(4, 4, 4);
      left = 0;
    } else {
      out.push(flip ? 7 : 5, flip ? 5 : 7);
      flip = !flip;
      left -= 2;
    }
  }
  return out;
}

/** yerleşim kararı: geniş kart yan yana okur, dar kart yukarıdan aşağı */
const rankFor = (span: number) => (span >= 7 ? "wide" : span === 4 ? "sm" : "mid");

export default function CountryPros({ pros, name }: { pros: Pro[]; name: string }) {
  /* Veri boşalırsa bölüm hiç basılmıyor: başlığı olup gövdesi olmayan bir
     bölüm, olmayan bölümden kötüdür. (Aynı kural CountryCost'ta da var.) */
  if (pros.length === 0) return null;

  const spans = spansFor(pros.length);

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* BAŞLIKTA ARTIK ÜLKE ADI VAR. Müşterinin cümlesi: "asıl avantajlar
              kısmının başlığı dubaide şirket kurmanın avantajları olsun."

              Eski başlık "Aynı maddeler, nasıl işlediğiyle." idi ve bir
              ilişkiyi anlatıyordu: aynı maddeler giriş bloğunda da geçtiği için
              bu bölüm onun DEVAMI olduğunu söylüyordu. O ilişki artık yok —
              giriş bölümü akıştan çıktı (bkz. ulke/[slug]/page.tsx), yani bu
              bölüm sayfada avantajları basan TEK yer. Devamı olmayan bir şeyin
              devamı gibi konuşan başlık da onunla birlikte gitti.

              Ad prop'tan geliyor (page → COUNTRY_LABELS), üç ayrı dize yok:
              "Dubai'de / İngiltere'de / KKTC'de şirket kurmanın avantajları".

              'DE EKİ SABİT, VERİDEN TÜRETİLMİYOR. Üç adın da doğru eki 'de
              (son ünlüleri ı/i/e değil ama üçü de ince-düz sıraya düşüyor:
              Dubai → "de", İngiltere → "de", KKTC "ke-ke-te-ce" → "de"), o
              yüzden tek kalıp yetiyor. Sayfanın kendisi de aynı kalıbı üç yerde
              kullanıyor ("…'de şirket kurmak.", "…'de süreç, adım adım."), yani
              burada yeni bir kural icat edilmiyor, var olanla hizalanıyor.
              DÖRDÜNCÜ BİR ÜLKE EKLENİRSE önce eki kontrol edin: örneğin
              "Katar'da" bu kalıba girmez, o gün ek COUNTRY_LABELS'ın yanında
              veriye yazılmalı — bileşende üç ayrı koşul yazmak değil. */}
          <SplitWords
            as="h2"
            text={`${name}'de şirket kurmanın avantajları.`}
            accent="avantajları."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* Spotun ilk cümlesi ("Girişte saydıklarımızın her biri burada
                kendi şemasıyla") giriş bölümüne işaret ediyordu; o bölüm
                akıştan çıkınca cümle olmayan bir yeri gösterir oldu ve
                kaldırıldı. Kalan iki cümle bölümün kendi spotu.
                "şarta bağlı olan her madde" KOŞULLU bir cümle — İngiltere ve
                KKTC'de koşullu madde yok, orada hiçbir şey vaat etmiyor. */}
            <p className="sec-lead">
              Her maddenin altında nasıl işlediğini gösteren kendi şeması var.
              Bunlar ülkenin kendi sağladıkları; şarta bağlı olan her madde şart
              rozetiyle işaretli.
            </p>
          </FadeUp>
        </div>

        <div className="advx">
          {pros.map((x, i) => {
            const span = spans[i] ?? 12;
            const rank = rankFor(span);
            const Icon = (x.icon && PRO_ICON[x.icon]) || Check;
            /* Koşul taşıyan iddia, koşulu kart başında da gösterir. Metnin
               kendisinden okunuyor (yıldızlı başlık ya da "şart" geçen cümle),
               ikon anahtarından değil: aynı ikonu kullanan koşulsuz bir
               avantaja rozet kaymasın. Aynı kural CountryIntro'da da geçerli —
               iki bölüm aynı maddeye aynı rozeti koyuyor. */
            const conditional = x.title.includes("*") || /şart/i.test(x.line);
            return (
              <FadeUp
                key={x.title}
                delay={0.12 + i * 0.07}
                y={18}
                className={`advx-cell advx-c${span}`}
              >
                <article className="advx-card" data-rank={rank}>
                  <div className="advx-body">
                    <div className="advx-head">
                      <span className="advx-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={2.1} />
                      </span>
                      {conditional && <span className="advx-chip">şarta bağlı</span>}
                    </div>
                    <h3 className="advx-t">{x.title}</h3>
                    <p className="advx-p">{x.line}</p>
                  </div>
                  {/* çizim üstündeki iddiayı tekrar eder, kendi başına bilgi
                      taşımaz — ekran okuyucuya görünmüyor */}
                  <figure className="advx-fig" aria-hidden="true">
                    <ProSchema kind={x.icon} brands={x.brands} />
                  </figure>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
