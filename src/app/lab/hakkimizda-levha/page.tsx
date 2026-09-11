import type { Metadata } from "next";
import AboutPage from "@/app/hakkimizda/page";
import { YonLevha } from "@/components/lab/AboutYon";

/* /lab/hakkimizda-levha — Levha'nın dayanak levhası canlı /hakkimizda
 * akışının içinde.
 *
 * ------------------------------------------------------ İKİNCİ TUR · 11.09.2026
 * Müşteri iki okumayı da gördü ve üçüncüsünü tarif etti:
 *
 *   "yeni yaptığın neye dayanarak çalışıyoruz kısmı ve yeni kim olduğumuz
 *    kısmı iyi gibi ama bize görselli bişi lazım o yüzden şimdilik şu bizim
 *    kim olduğumuz kısmı görseliyle dursun, neye dayanarak çalışıyoruzu da
 *    onun altına koy, üstüne değil."
 *
 * Yani sıra şu:
 *     canlı hero  →  canlı "Kim olduğumuz" (fotoğrafıyla)  →  Levha'nın
 *     dayanak levhası  →  canlı sayfanın kalanı
 *
 * A/B ÇİPİ GİTTİ: karar verildi, iki okuma kalmadı. Levha'nın KENDİ HERO'SU
 * ve kendi "Kim olduğumuz" bölümü de basılmıyor (CSS'te kapalı). Hero'nun
 * gitmesinin ayrı bir sebebi var: Levha hero'sunun lead'i "Anlatmadan önce
 * sayılabilir olanı sayıyoruz" diyordu ve bu cümle levhanın hero'nun HEMEN
 * altında durduğu sıraya aitti. Artık levhadan önce anlatı geliyor; cümle
 * yanlış olurdu. Canlı hero ("Ortac Global kimdir?") ise tam bu sıraya ait:
 * sorunun cevabı hemen altındaki "Kim olduğumuz".
 *
 * ---------------------------------------------- KOPYALAMA YOK, İÇE AKTARMA VAR
 * Birinci turun kararı geçerli: canlı sayfa olduğu gibi import ediliyor,
 * ikinci bir kopyası yok. Yeni olan tek şey SIRA: Levha'nın bölümü canlı
 * sayfanın <main>'inin DIŞINDA basılıyor ama ekranda iki canlı bölümün
 * ARASINA oturması gerekiyor. Bu, CSS `order` ile yapılıyor; mekanizma ve
 * bedeli css/lab-hak-levha.css'in başında.
 *
 * KALICI YOL (canlıya geçerken): /hakkimizda bölümleri ayrı bileşenlere
 * çıkarılır ve sayfa onları istediği sırayla basar. Bu rotadaki `order`
 * düzeni o gün tamamen silinir.
 */

export const metadata: Metadata = {
  title: "Hakkımızda · Levha yerinde | Ortac Global",
  robots: { index: false, follow: false },
};

export default function HakkimizdaLevhaLab() {
  return (
    <div className="lhl">
      <div className="hyn-kunye-lab lhl-kunye">
        <span>Yön HY1 · ikinci tur</span>
        <h2>Levha · sayfanın kendi akışında</h2>
        <p>
          Canlı &quot;Kim olduğumuz&quot; fotoğrafıyla yerinde; Levha&apos;nın dayanak levhası hemen
          altında. Kalan bölümlerin hepsi canlı /hakkimizda sayfasının kendisi.
        </p>
      </div>

      {/* Aday /components/lab/AboutYon.tsx'ten TEK HARFİ DEĞİŞMEDEN geliyor;
          üç parçasından yalnız levha bölümü görünüyor (CSS). */}
      <div className="lhl-giris">
        <YonLevha />
      </div>

      {/* Canlı sayfanın kendisi. Sarmalayıcı DÜZ bir <div>: transform, filter,
          contain ya da will-change yazılmıyor — biri yazılsaydı içerideki
          position:fixed ögeler o kaba hapsolurdu. */}
      <div className="lhl-canli">
        <AboutPage />
      </div>
    </div>
  );
}
