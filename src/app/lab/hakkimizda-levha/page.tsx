import type { Metadata } from "next";
import AboutPage from "@/app/hakkimizda/page";
import { YonLevha } from "@/components/lab/AboutYon";

/* /lab/hakkimizda-levha — Levha (HY1) canlı /hakkimizda akışının içinde.
 *
 * Müşteri: "hakkımızda kısmında levha kullanılabilir belki ama sitede nasıl
 * durur görmem lazım." Soru tasarımın kendisi değil BAĞLAM: aday tek başına
 * duruyordu, sayfanın kendi hero'sunun altında ve kendinden sonraki
 * bölümlerin yanında hiç görülmedi. O yüzden burada sayfanın TAMAMI basılıyor.
 *
 * ---------------------------------------------- KOPYALAMA YOK, İÇE AKTARMA VAR
 * Canlı sayfanın bölümleri src/app/hakkimizda/page.tsx'in içinde yazılı ve o
 * dosyaya bu turda dokunulamıyor. Üç yol vardı:
 *
 *   1) bölümleri buraya KOPYALAMAK — elendi. İki kopya demek ve bu depo
 *      bedelini ödedi: lab/turlar.ts'in başındaki "iki yerde ayrı yazılıydı,
 *      İKİ TUR ÜST ÜSTE BAYATLADI" kaydı tam olarak bunun kaydı. Kıyas da
 *      dürüst olmazdı: kopya, canlı sayfanın bir sonraki hâlini göstermez.
 *   2) bölümleri ORTAK BİLEŞENLERE çıkarmak — elendi, çünkü canlı page.tsx'i
 *      değiştirmek demek ve bu tur onu yasaklıyor. (Doğru yol bu; ana oturuma
 *      öneri olarak rapora yazıldı.)
 *   3) canlı sayfayı OLDUĞU GİBİ basıp yalnız yer değiştiren bölümlerini
 *      CSS'le kapatmak — SEÇİLEN. Tek kaynak canlı dosyanın kendisi: o
 *      değişirse bu rota da değişiyor, bayatlayacak ikinci bir kopya yok.
 *
 * Kapatma kurallarının tamamı ve hangi bölümün neden kapandığı
 * css/lab-hak-levha.css'te, ölçülen çakışmalarıyla birlikte.
 *
 * -------------------------------------------------------- BUNUN İKİ BEDELİ
 * Dürüst olmak için ikisi de burada yazılı, ikisi de yalnız bu lab rotasında:
 *   · Kapatılan bölümler HTML'de duruyor, yalnız display:none. Canlıya
 *     geçerken bu bir CSS kapısı değil kaynak düzenlemesi olacak.
 *   · Canlı sayfanın JSON-LD'si ve <main>'i bu rotada da basılıyor. Rota
 *     noindex/nofollow, yani yapısal veri bir yere gitmiyor; Levha'nın
 *     bölümleri ise o <main>'in dışında kalıyor.
 */

export const metadata: Metadata = {
  title: "Hakkımızda · Levha yerinde | Ortac Global",
  robots: { index: false, follow: false },
};

export default function HakkimizdaLevhaLab() {
  return (
    <div className="lhl">
      {/* Künye tek satır (docs/tuzaklar.md · "Lab sayfaları ekrana METİN
          DÖKMEZ"). Kalan iki cümle uyarı, tavsiye değil: ikisi de ekranda
          görülüyor ama sebebi görülmüyor, ve turun cevabı ikisine bağlı.
          Üçüncü cümle bu turda EKLENDİ: ölçüm, Levha'nın ilk satırıyla canlı
          "Üç ülkede çalışıyoruz" bölümünün giriş cümlesinin ilk 87
          karakterinin birebir aynı olduğunu gösterdi. Yazılmasaydı müşteri
          onu bir hata sanıp adayı yanlış gerekçeyle eleyebilirdi; gerekçe ve
          neden kapatılmadığı css/lab-hak-levha.css'te. */}
      <div className="hyn-kunye-lab">
        <span>Yön HY1</span>
        <h2>Levha · sayfanın kendi akışında</h2>
        <p>
          Giriş Levha, kalan bölümlerin hepsi canlı /hakkimizda sayfasının kendisi. Levha girişin
          tamamını alırsa ekip fotoğrafı ve vizyon/misyon kartları sayfadan çıkıyor; ikinci okuma
          ikisini de yerinde bırakıyor. Levha&apos;nın ilk satırı ile aşağıdaki &quot;Üç ülkede
          çalışıyoruz&quot; bölümünün giriş cümlesi şu an aynı cümleyle başlıyor; Levha seçilirse
          ikisinden biri kısalacak.
        </p>
      </div>

      {/* Görünür çip + gizli native radyo (docs/tuzaklar.md · kural 9).
          role="group" + aria-labelledby: iki radyo tek bir soruya ait olduğunu
          erişilebilirlik ağacında da söylüyor. Etiket GERÇEK METİN olarak
          basılıyor, aria ile gösterilmiyor (tuzak G-2). */}
      <div className="lhl-kip">
        <span className="lhl-kip-t" id="lhl-kip-lbl">
          Levha girişin ne kadarını alıyor
        </span>
        <div className="lhl-chips" role="group" aria-labelledby="lhl-kip-lbl">
          <label className="lhl-chip">
            <input type="radio" name="lhl-okuma" id="lhl-a" defaultChecked />
            <span className="lhl-chip-t">Girişin tamamı</span>
          </label>
          <label className="lhl-chip">
            <input type="radio" name="lhl-okuma" id="lhl-b" />
            <span className="lhl-chip-t">Yalnız açılış · canlı &quot;Kim olduğumuz&quot; kalıyor</span>
          </label>
        </div>
      </div>

      {/* Aday, /lab/hakkimizda-yon'daki dosyadan TEK HARFİ DEĞİŞMEDEN geliyor.
          İkinci bir sürüm açılmadı: aynı adayın iki rotada iki farklı hâli
          olsaydı hangisinin karara girdiği belirsiz kalırdı. */}
      <div className="lhl-giris">
        <YonLevha />
      </div>

      {/* Canlı sayfanın kendisi. Sarmalayıcı DÜZ bir <div>: transform, filter,
          contain ya da will-change yazılmıyor — biri yazılsaydı içerideki
          position:fixed ögeler (site şeridi, kapanış çağrısı) o kaba
          hapsolurdu. */}
      <div className="lhl-canli">
        <AboutPage />
      </div>
    </div>
  );
}
