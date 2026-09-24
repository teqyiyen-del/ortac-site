"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import SurecP3 from "@/components/shared/SurecP3";
import { SCENE_BY_KIND, stepSceneKind, type SceneKind } from "@/components/scenes/SetupScenes";
import { COUNTRY_SLUGS } from "@/lib/services";
import { WHO_LABEL, type Step } from "@/lib/countryContent";

/* 25.09.2026 · BÖLÜM P3'E GEÇTİ (components/shared/SurecP3; /lab/surec'te
   seçildi). Solda alt alta yedi satırlık ray ve sağdaki kartın başlığı
   ("Kuruluş dosyası", adım adı, "3/7") kalktı; solda yalnız o anki adım +
   çubuklar ve sayılar, sağda yalnız çizim. Burak: "P3 daha iyi … sağdaki
   SVG kartı sadece görsel bırakalım … bunu her sayfaya entegre edeceğiz."
   Aşağıdaki eski karar kaydı ray dönemine ait; neden rayın kalabalık
   bulunduğunu ve neyin korunduğunu (kimde + süre, dipnot, tek çıkış)
   anlattığı için duruyor. `panelTitle` prop'u artık basılmıyor. */

/* ============================================================================
   SÜREÇ · solda adım rayı, sağda o adımın çizildiği gece kartı
   ============================================================================
   Bu bölüm lab'de üç adayla yarıştı ve müşteri P1'i seçti. Kararın gerekçesi
   kendi cümlesiyle: "eski hâlindeki karmaşıklığı bir kenara bırakmış gibi
   duruyor ve daha anlaşılır bir havası var. daha çok bilgi vermek istersek
   zaten burdan bir yere yönlendiririz."

   Karar bağlandıktan sonra lab tarafı müşteri isteğiyle tamamen silindi:
   /lab/surec sayfası, ProcessP1 / ProcessP0 bileşenleri ve lab-p1.css artık
   yok. Önceki hâlin (P0) çalışan bir kopyası kalmadı; aşağıdaki karşılaştırma
   notları o tasarımın kaydı olarak duruyor.

   ---- Neden bu kurgu kazandı: ölçülen şey "kalabalık" değil, nesne sayısıydı
   ============================================================================
   Ana sayfadaki süreç bölümüyle bu bölüm aynı dili konuşuyordu ama biri temiz,
   öteki kalabalık okunuyordu. Fark dilde değil, satır başına düşen yükte:

   · Ana sayfanın ray satırı ÜÇ şey taşıyor — 28px'lik ince bir daire,
     15px/500 bir başlık, altında tek gri satır.
   · Eski ülke satırı BEŞ şey taşıyordu — 38px'lik DOLU bir ikon karesi, mavi
     bir sıra numarası, 18.5px/600 bir başlık, koyu puntolu bir süre, renk kodlu
     bir "top kimde" hapı. Seçili satır bunların üstüne bir dolu gri zemin ve
     altına bir sayaç çubuğu daha alıyordu.

   Beş adım × üç nesne = 15. Yedi adım × beş nesne = 35. Aradaki fark "iki adım
   daha" değil, iki kattan fazla nesne. Üstüne aynı anda dört renk sistemi
   çalışıyordu (ikon karesi üç renk, hap üç renk, karttaki şerit mavi-yeşil,
   baştaki rozet ayrı bir mavi): göz bir listeye değil, bir gösterge paneline
   bakıyordu.

   Dördüncü bir sorun kartın tarafındaydı. Kart raya gerildiği için (1440px'te
   651px) ve çizim sabit oranlı olduğu için (560x330), sağda küçük bir resmin
   yüzdüğü uzun bir siyah levha çıkıyordu. Bölüm aynı anda hem SOLDA kalabalık
   hem SAĞDA boştu.

   Çözüm tasarımı değiştirmek değil, FAZLADAN taşınanı bırakmak oldu. Atılanlar:
   ikon kareleri, ayrı sıra numarası, renkli haplar, seçili satırın dolu zemini,
   satır altı sayaç çubuğu, kartın içindeki yedi bölmeli şerit, ve spot metnin
   ikinci cümlesi. Hiçbir BİLGİ silinmedi, yerleri değişti:

   · TOP KİMDE — tek gri alt satıra taşındı: "Sizde · 1-2 gün". Yalnızca "kimde"
     kısmı bir tık mürekkep alıyor (500 ağırlık, text-900); süre gri kalıyor.
     Yeni bir kutu, yeni bir renk, yeni bir hap yok — bir tipografik basamak var.
   · SIRA NUMARASI — noktanın içinde.
   · ADIMIN TAM ANLATIMI (Step.line) — ekranda hiç basılmıyor, butonun
     aria-label'ında duruyor. Kart ekran okuyucudan gizli olduğu için metnin tek
     erişilebilir kopyası orası.
   · SAYAÇ — rayın kendi ipliği doluyor. Kartın içindeki ikinci şerit aynı şeyi
     iki yerde söylüyordu.

   Ray hafifleyince iki sütunun DOĞAL boyu da neredeyse eşitlendi, yani siyah
   levha kendiliğinden kayboldu: 1200px'lik kapta kartın doğal boyu ~437px, yedi
   satırlık ray ~464px, fark 27px ve o da çizimin altına/üstüne 13'er piksel
   olarak dağılıyor. Eski kurguda bu fark 214px'ti.

   ---- Bölüm bir ÖZET; detay bir tık ötede
   ============================================================================
   Müşterinin bu tur koyduğu genel ilke: "site genel olarak özet bilgi vermeli
   her section'da; gerektiği kısımda tıklanarak açılan yerlerle ya da başka bir
   sayfaya yönlendirmelerle daha fazla detaya girmesi lazım."

   Burada bunun karşılığı şu: adım açıklamalarının tamamı (Step.line) geri
   DOLDURULMADI. Yedi adımın her birine üç dört cümle koymak bölümü yeniden
   eski hâline getirirdi ve zaten kimse okumuyordu. Bölümün altında tek bir
   çıkış var (aşağıda `detail`), ve o çıkış gerçekten daha fazlasını veriyor:
   kuruluş hizmetinin kapsamı, hariç kalan kalemler ve kalem kalem tutar.

   Çıkışın adresi neden pathname'den okunuyor: bölümün imzası
   `({ steps, title })` ve ülke sayfası onu böyle çağırıyor — imzayı
   değiştirmek çağrı yerine dokunmak demekti. Ülke bilgisi zaten adreste
   duruyor (/dubai, /ulke/dubai), o yüzden oradan çıkarılıyor. Tanınmayan bir
   adreste (ör. bir lab sayfası) hizmet adresi UYDURULMUYOR, çıkış /basla'ya
   düşüyor — SmartLink yayında olmayan bir adrese bağlantı kurmuyor ve boş bir
   "yakında" rozeti göstermektense doğru olan, her zaman açık olan kapıyı
   göstermek.

   ---- Ad alanı
   ============================================================================
   Bölümün bütün kuralları `.cpr-` altında, src/app/css/process.css'te. Bu
   bölüm `ops-`, `cps-`, `proc-`, `pr5-` veya `p0-` setlerinden hiçbirini
   KULLANMIYOR: `ops-`/`cps-` setlerini Workflow.tsx ve ana sayfa paylaşıyor,
   `p0-` ise bu bölümün lab'deki yedeği. Paylaşılan tek şey çizimlerin `.dv-*`
   renk kümesi; onun da alfalı değerleri kartın içinde opak karşılıklarıyla
   eziliyor (koyu yüzeyde alfa yok). */


/* Bölümün tek detay çıkışı. Ülke biliniyorsa kuruluş hizmetinin kendi
   sayfasına, bilinmiyorsa her zaman açık olan /basla'ya. */
const FALLBACK_DETAIL = {
  href: "/basla",
  label: "Süreci kendi dosyanız için konuşalım",
};

/* 22.09.2026 · PANEL BAŞLIĞI VE ÇIKIŞ ÇAĞIRANDAN GELEBİLİYOR. İkinci kullanıcı
   /dubai/banka-hesabi: panelin başlığı "Kuruluş dosyası" diye sabit yazılıydı,
   alttaki çıkış da adresten türetilen "Kuruluş hizmeti: kapsam, hariç
   kalemler ve tutar"dı. İkisi de opsiyonel; verilmezse bugünkü metin ve
   adres, yani ülke sayfaları birebir aynı. */
export default function CountryProcess({
  steps,
  title,
  detailOverride,
}: {
  steps: Step[];
  title: string;
  /** eski kartın başlığıydı; 25.09.2026'dan beri kart yalnız çizim */
  panelTitle?: string;
  detailOverride?: { href: string; label: string };
}) {
  const pathname = usePathname();

  /* Adres parçalanıp içindeki ülke aranıyor, ilk parçaya bakılmıyor: aynı sayfa
     hem /dubai hem /ulke/dubai adresinde yaşıyor. Bulunamazsa hizmet adresi
     kurulmuyor. */
  const detail = useMemo(() => {
    if (detailOverride) return detailOverride;
    const slug = pathname.split("/").find((seg) => (COUNTRY_SLUGS as string[]).includes(seg));
    if (!slug) return FALLBACK_DETAIL;
    return { href: `/${slug}`, label: "Kuruluş hizmeti: kapsam, hariç kalemler ve tutar" };
  }, [pathname, detailOverride]);

  /* Kartın boyu adıma göre oynamasın: bu ülkenin çözdüğü bütün çizimler aynı
     hücrede görünmez yığılıyor (tekrarlar elenerek). */
  const sizer = useMemo(() => {
    const seen = new Set<SceneKind>();
    for (const s of steps) {
      const k = stepSceneKind(s.title);
      if (k) seen.add(k);
    }
    return [...seen].map((k) => SCENE_BY_KIND[k]);
  }, [steps]);

  const scenes = useMemo(
    () =>
      steps.map((s) => {
        const k = stepSceneKind(s.title);
        return k ? SCENE_BY_KIND[k] : null;
      }),
    [steps],
  );

  return (
    <SurecP3
      head={
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={title}
            accent="adım adım."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Her adımda sorumluluğun kimde olduğu yazıyor; tıklandığında akış durur.</p>
          </FadeUp>
        </div>
      }
      steps={steps.map((s, i) => ({
        title: s.title,
        short: s.short ?? s.line,
        who: s.who,
        timing: s.timing,
        aria: `${i + 1}. adım: ${s.title}. ${s.line} ${s.timing}, ${WHO_LABEL[s.who]}.`,
      }))}
      scenes={scenes}
      sizer={sizer}
      foot={
        <>
          {/* Kalması şart olan tek cümle: panel son adıma kendi kendine
              yürüyor, taahhüt vermediğimiz şey kelimeyle söylenmeli. */}
          <p className="srp-note">
            Süreler tipik aralıktır. Kurum ve banka kararları ilgili kuruluşlara aittir; sonuç ve
            süre garanti edilmez.
          </p>
          {/* bölümün tek detay çıkışı */}
          <p className="srp-more">
            <SmartLink href={detail.href} className="cpr-more-a">
              {detail.label}
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </p>
        </>
      }
    />
  );
}
