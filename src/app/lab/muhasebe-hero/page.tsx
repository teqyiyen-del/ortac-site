import { ArrowRight, Info, Stamp } from "lucide-react";

import AccountingHeroScene from "@/components/services/AccountingHeroScene";
import { ACCOUNTING_DUBAI } from "@/lib/accountingDubai";
import MhGecit from "@/components/lab/MhGecit";
import MhKlasor from "@/components/lab/MhKlasor";
import MhEslesme from "@/components/lab/MhEslesme";
import MhSahne from "@/components/lab/MhSahne";

/* /lab/muhasebe-hero — /dubai/muhasebe hero'sunun sağındaki sahneye adaylar.
 *
 * BU TUR: DÖRDÜNCÜ ADAY EN ÜSTTE. Müşteri iki şeyi ayrı ayrı söyledi —
 * "2 de ki mantık gibi bir mantığa gidip 4 tane şey göstermek mantıklı" ve
 * "böyle sağa doğru çıkan tırnaklardan değilde dubai sayfasındaki gibi
 * tasarımla yaparsak daha iyi olur". Yani Klasör'ün MANTIĞI tuttu, SUNUMU
 * tutmadı. Aday 4 (Sahne) tam olarak bu: dört bölme ve etkileşim aynı, fihrist
 * tırnakları gitti, yerine /dubai hero kartının dili geldi.
 *
 * ÜÇ ESKİ ADAY VE TABAN DURUYOR — hiçbiri silinmedi. Karar bir kıyas kararı;
 * yeni aday neyi değiştirdiğini ancak yanında durdukları zaman gösteriyor.
 *
 * NEDEN HER ADAY HERO'NUN İÇİNDE: sahne hiçbir zaman tek başına
 * görülmüyor — hero'nun gece zemini, ızgarası ve glow'u onun yarısı kadar iş
 * yapıyor, ve solundaki başlık bloğu onun ölçüsünü belirliyor. Çıplak
 * gösterilen bir sahne yanlış bir karar verdirir. Aşağıdaki dört blok da
 * canlı hero'nun BİREBİR aynı iskeletini kullanıyor: .ph .ph-split .phg +
 * .phg-bg (ızgara + glow) + .phx-grid, yani PageHero'nun ülkesiz split dalı.
 *
 * TABAN DA BURADA: bugün canlıda olan sahne (AccountingHeroScene) aynı
 * bağlamda basılıyor. Karşılaştırma ancak yan yana yapılır.
 *
 * Bu sayfa canlı hiçbir şeye dokunmuyor: canlı sahne buraya yalnızca
 * import ediliyor, dört aday kendi ad alanlarında (.mhs- .mhg- .mhk- .mhd-).
 */

/* ---------------------------------------------------------------- künye */
const chip = (bg: string, bd: string, fg: string) => ({
  display: "inline-flex" as const,
  gap: 8,
  alignItems: "center" as const,
  padding: "5px 12px",
  borderRadius: 999,
  background: bg,
  border: `1px solid ${bd}`,
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: fg,
});

const P = {
  margin: "14px 0 0",
  maxWidth: "72ch",
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "#a6a6a6",
};
const PS = { ...P, margin: "8px 0 0", fontSize: 13.5, color: "#7d7d7d" };

/* Hero'nun sol sütunu dört blokta da AYNI. Metin accountingDubai.ts'ten
   OKUNUYOR, elle kopyalanmıyor: canlı hero o dosyadan besleniyor ve sayfa
   başka bir turda değişirse lab da kendiliğinden takip etsin. Sol sütunun
   yüksekliği burada önemli — .phx-grid align-items:center, yani sağdaki
   sahnenin dikey konumu soldakinin boyuna bağlı. Buton ve iki güven satırı
   olmadan sahne canlıdakinden farklı bir yerde duruyordu.

   Buton gerçek bir bağlantı DEĞİL, <span>: lab bir bakma yeri, gezinme yeri
   değil; ölçü ve görüntü aynı, tıklanınca hiçbir şey olmuyor. Aynı sebeple
   kırıntı satırı da bağlantısız. */
const H = ACCOUNTING_DUBAI.hero;
const TRUST_ICON = { stamp: Stamp, info: Info } as const;

function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="ph ph-split phg" style={{ marginTop: 28 }}>
      <div className="phg-bg" aria-hidden="true">
        <div className="phg-grid" />
        <div className="phg-glow" />
      </div>
      <div className="container-o">
        <div className="ph-crumb">
          <span>Ana sayfa</span>
          <span aria-hidden="true">›</span>
          <span>{H.crumb}</span>
        </div>
        <div className="phx-grid">
          <div>
            <h2 className="ph-h1">
              {H.title.slice(0, -H.accent.length)}
              <span style={{ color: "var(--blue-500)" }}>{H.accent}</span>
            </h2>
            <p className="phx-lead">{H.lead}</p>
            <div className="phx-cta">
              <span className="btn btn-primary">
                {H.cta.label}
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </span>
            </div>
            <ul className="phx-trust">
              {H.trust.map((t) => {
                const Icon = TRUST_ICON[t.icon as keyof typeof TRUST_ICON];
                return (
                  <li key={t.line}>
                    {Icon ? <Icon size={15} strokeWidth={2} aria-hidden="true" /> : null}
                    <span>{t.line}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function LabMuhasebeHeroPage() {
  return (
    <main style={{ background: "var(--night)", minHeight: "100dvh", paddingBottom: 96 }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "#ffffff" }}>
          Muhasebe hero sahnesi — yeni aday, üç eski, taban
        </h1>
        <p style={{ ...P, maxWidth: "76ch", marginTop: 14 }}>
          Şikâyet dörttü: çok basic, bir şeyler yanlış gibi, tam olarak bir şey
          anlatmıyor, aksiyon yok. Dördüncüsü animasyon EKLENDİKTEN SONRA geldi,
          yani sorun hareketin yokluğu değil. Ölçüldü: canlı sahnede kımıldayan
          alan tuvalin yaklaşık binde ikisi ve iki olay arasında beş saniye
          boşluk var — yani hareket VAR ama görünmüyor. Adaylar bu teşhisten
          çıktı: hareket eden şey büyük olacak, sık olacak, ve bir şeyin
          olduğunu anlatacak.
        </p>
        <p style={{ ...PS, maxWidth: "76ch" }}>
          Bu turda gelen karar: Klasör&apos;ün (Aday 2) mantığı tuttu, sunumu
          tutmadı. &ldquo;Sağa doğru çıkan tırnaklar&rdquo; gitti, yerine{" "}
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>/dubai</b> hero
          kartının tasarım dili geldi. Yeni aday en üstte; eskiler kıyas için
          duruyor.
        </p>
        <p style={{ ...PS, maxWidth: "76ch" }}>
          Beşi de gerçek hero bağlamında: aynı gece zemin, aynı ızgara ve glow,
          aynı sol sütun. Değişen tek şey sağdaki sahne.
        </p>
      </div>

      {/* --------------------------------------------------------- ADAY 4 */}
      <div className="container-o" style={{ marginTop: 56 }}>
        <span style={chip("#10243c", "#2f5c92", "#bcd9ff")}>
          Aday 4 · Sahne — dört bölme, /dubai kartının diliyle · YENİ
        </span>
        <p style={P}>
          <b style={{ color: "#dfe1e4", fontWeight: 600 }}>Fikir:</b>{" "}
          Klasör&apos;ün mantığı aynen duruyor — dört bölme (defter, beyan,
          rapor, arşiv), kart 4,1 saniyede bir kendi çeviriyor, ziyaretçi bir
          bölmeye basınca kalıcı olarak duruyor. Değişen şey sunum:{" "}
          <b style={{ color: "#dfe1e4", fontWeight: 600 }}>/dubai</b> hero
          kartının iskeleti (kendi çerçevesi olan koyu panel → sabit sahne
          kutusu → altında ad ve tek satır → altında şerit → künye satırı) ve
          tek renk kuralı: beyaz yüzey değil, mürekkeptir.
        </p>
        <p style={PS}>
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>
            /dubai kartından ALINMAYAN:
          </b>{" "}
          sıra. O kart beş aşamayı gerçekleşme sırasıyla anlatıyor ve şeridi
          &ldquo;bitti / şimdi / sıradaki&rdquo; diye boyuyor; burada sıra yok,
          dört iş aynı anda yürüyor. Bu yüzden geri sarma yok ve &ldquo;kim
          yapıyor&rdquo; rozeti yok — dördünü de aynı taraf yürütüyor. Dört
          çizimin hiçbiri o karttan taşınmadı.{" "}
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>Metin:</b> dört alt
          satır accountingDubai.ts&apos;ten okunuyor (scope.phases[1..4].line),
          elle kopyalanmıyor.
        </p>
        <p style={PS}>
          <b style={{ color: "#dfe1e4", fontWeight: 600 }}>Bu turda iki şey:</b>{" "}
          (1) şeritteki adlar kalktı — açık bölmenin adı zaten kartın üstünde
          30 punto ile yazıyor, şerit ikinci kez yazmıyordu. Ad ekrandan kalktı
          ama erişilebilirlikten kalkmadı: dört düğme de{" "}
          <code style={{ fontSize: 12.5 }}>aria-label</code> taşıyor, durum yine{" "}
          <code style={{ fontSize: 12.5 }}>aria-pressed</code> ile duyuruluyor
          ve düğmenin hedefi 36px&apos;ten 44px&apos;e ÇIKTI. (2) Sahne artık
          açıldıktan sonra da yaşıyor: her bölmenin kendi sürekli döngüsü var —
          defterde kayıt satır satır iniyor, beyanda dönem doluyor ve dolunca
          beyan veriliyor, raporda seri soldan sağa yeniden hesaplanıyor,
          arşivde dosya çıkıp yerine konuyor. Yalnızca EKRANDAKİ bölme dönüyor;
          gizli üçü hiç çalışmıyor.
        </p>
      </div>
      <HeroFrame>
        <MhSahne />
      </HeroFrame>

      {/* ------------------------------------------------------------ TABAN */}
      <div className="container-o" style={{ marginTop: 88 }}>
        <span style={chip("#1a1a1a", "#333333", "#9c9c9c")}>Taban · bugün canlıda</span>
        <p style={P}>
          Kapanan mali sayfa: cetvelli satırlar, toplam ve altındaki çift çizgi;
          sağda rapor kartı. 29 saniyelik altı adımlı bir tur var.
        </p>
      </div>
      <HeroFrame>
        <AccountingHeroScene />
      </HeroFrame>

      {/* --------------------------------------------------------- ADAY 1 */}
      <div className="container-o" style={{ marginTop: 88 }}>
        <span style={chip("#152333", "#284469", "#9cc6f5")}>
          Aday 1 · Geçit — sizden gelen / size dönen
        </span>
        <p style={P}>
          <b style={{ color: "#dfe1e4", fontWeight: 600 }}>Fikir:</b> sahne bir
          belge değil bir DEVİR gösteriyor. Solda sizin gönderdiğiniz dağınık
          kağıtlar (fatura, altı yırtık fiş, yatık ekstre), sağda size dönen
          dosya, arada tek yönlü ok. Kaynağı sayfanın kendi 5. bölümü — &ldquo;Siz
          ne veriyorsunuz, biz ne veriyoruz?&rdquo;. Belgeler yolu gerçekten kat
          ediyor ve dosya turun içinde boştan doluya gidiyor.
        </p>
        <p style={PS}>
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>Neyi çözüyor:</b>{" "}
          aksiyon — her an yolda bir belge var, hareket tuvali boydan boya
          geçiyor, ve dosyanın kalınlaşması turun kendisi kadar büyük bir
          değişim. Anlatmıyor — sahnenin tek bir cümlesi var. Basic — üç belge
          üç ayrı nesne, aynı yuvarlak çubuğun tekrarı değil.{" "}
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>Feda ettiği:</b>{" "}
          etkileşim yok, ve sahne bir olgu değil bir akış anlatıyor — Dubai,
          KDV ya da takvim geçmiyor.
        </p>
      </div>
      <HeroFrame>
        <MhGecit />
      </HeroFrame>

      {/* --------------------------------------------------------- ADAY 2 */}
      <div className="container-o" style={{ marginTop: 88 }}>
        <span style={chip("#152333", "#284469", "#9cc6f5")}>
          Aday 2 · Klasör — dört bölme, tırnaklı
        </span>
        <p style={P}>
          <b style={{ color: "#dfe1e4", fontWeight: 600 }}>Fikir:</b> sahne tek
          bir nesne — sağ kenarında dört fihrist tırnağı olan bir klasör.
          Tırnağa basınca o bölme açılıyor, kimse basmazsa 3.7 saniyede bir
          kendi çeviriyor. Dört bölme: defter, beyan, rapor, arşiv. /dubai
          kartının kumandası çizimin altındaki bir şeritti; buradaki kumanda
          çizimin kendisi.
        </p>
        <p style={PS}>
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>Neyi çözüyor:</b>{" "}
          aksiyon — iki yoldan: sahnenin TAMAMI değişiyor, ve ziyaretçi
          durdurabiliyor (müşterinin /dubai kartında beğendiği şey buydu).
          Anlatmıyor — dört bölmenin dördü de adlı, dördünün de tek satır
          karşılığı var ve dördü de sayfanın kendi metninden.{" "}
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>Feda ettiği:</b>{" "}
          &ldquo;use client&rdquo; gerekiyor, DOM&apos;a dört çizim birden giriyor, ve dört
          bölme bir sıra kurmuyor — envanter var, süreç yok.
        </p>
      </div>
      <HeroFrame>
        <MhKlasor />
      </HeroFrame>

      {/* --------------------------------------------------------- ADAY 3 */}
      <div className="container-o" style={{ marginTop: 88 }}>
        <span style={chip("#152333", "#284469", "#9cc6f5")}>
          Aday 3 · Eşleşme — banka ile defter
        </span>
        <p style={P}>
          <b style={{ color: "#dfe1e4", fontWeight: 600 }}>Fikir:</b> diğer iki
          aday muhasebenin ÜRETTİĞİ şeyi çiziyor; bu aday KONTROL EDİLDİĞİNİ.
          Solda banka ekstresi, sağda ciltli defter, arada satır satır kurulan
          eşleşmeler. Turun bir olayı var: bir satır açıkta kalıyor, imleç geri
          dönüp onu buluyor, son bağ kurulunca imleç ekstre tarafından defter
          tarafına geçiyor.
        </p>
        <p style={PS}>
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>Neyi çözüyor:</b>{" "}
          aksiyon — turun %49&apos;unda bir bağ çiziliyor, kalanında imleç
          yürüyor; boş kare yok. Anlatmıyor — sahnede bir şey OLUYOR, dekor
          değil. Yanlış — iki eşit kütle, aynı hizada; küçük ve boş kalan bir
          yan kart yok.{" "}
          <b style={{ color: "#9c9c9c", fontWeight: 600 }}>Feda ettiği:</b>{" "}
          etkileşim yok, ve konu dar: &ldquo;ne alıyorum&rdquo; sorusunun cevabı bu
          sahnede yok.
        </p>
      </div>
      <HeroFrame>
        <MhEslesme />
      </HeroFrame>
    </main>
  );
}
