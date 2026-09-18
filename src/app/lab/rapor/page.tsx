import type { Metadata } from "next";

import { RaporR1, RaporR2, RaporR3 } from "@/components/lab/RaporAdaylari";
import type { Rapor } from "@/lib/rapor";

/* /lab/rapor — araç çıktısının (Ortac markalı PDF) tasarım adayları.

   18.09.2026 · Burak: "raporun tasarımı çok dosya gibi kokuyor ya sarmadı. şu
   bizim yeni funnel kurmuştuk ta sonunda teklif veriyordu ya ordaki bile daha
   iyi duruyordu … bana 3 tane tasarım oluştur bence göreyim."

   Üçü de AYNI VERİYİ basıyor: aşağıdaki ÖRNEK, uygunluk testinin gerçek
   çıktısının bir örneği (canlı rapor da bu modeli dolduruyor, lib/rapor.ts).
   Seçilen tasarım components/rapor/RaporBelge.tsx'e geçecek ve yazdırma o
   zaman bağlanacak; bu sayfada yalnız ekran önizlemesi var. */

export const metadata: Metadata = {
  title: "Araç raporu · tasarım adayları | Ortac Global",
  robots: { index: false, follow: false },
};

const ORNEK: Rapor = {
  arac: "Ülke uygunluk testi",
  baslik: "Ülke uygunluk ön değerlendirmesi",
  ozet: "Verdiğiniz cevaplara göre İngiltere öne çıkıyor; Dubai 5 puan geride.",
  yol: "/uygunluk-testi",
  kaynak: "Puanlama: 11 sorunun ağırlıklı toplamı",
  bloklar: [
    {
      tip: "sonuc",
      baslik: "Sonuç",
      deger: "İngiltere öne çıkıyor",
      alt: "Fark, tek bir cevabınızı değiştirseniz sıranın döneceği kadar dar.",
    },
    {
      tip: "tablo",
      baslik: "Sıralama",
      basliklar: ["#", "Ülke", "Puan"],
      satirlar: [
        ["1", "İngiltere", "19"],
        ["2", "Dubai", "14"],
        ["3", "KKTC", "3"],
      ],
    },
    {
      tip: "liste",
      baslik: "Cevaplarınız (11)",
      maddeler: [
        { t: "Müşterileriniz ağırlıklı olarak nerede?", d: "Avrupa ve İngiltere" },
        { t: "Ne satıyorsunuz?", d: "Yazılım ve dijital hizmet" },
        { t: "Parayı nasıl tahsil edeceksiniz?", d: "Kartla, site veya uygulama üzerinden" },
        { t: "Global platformlarda satış yapacak mısınız?", d: "Evet, satışın önemli bölümü oradan gelecek" },
        { t: "Banka tarafında ne lazım?", d: "Bankada kurumsal hesap" },
        { t: "Süreç için bir kez yurt dışına gidebilir misiniz?", d: "Evet, bir kez gidebilirim" },
        { t: "Bu iş bugün yılda ne kadar net kazandırıyor?", d: "19.000 USD ve altı" },
        { t: "Şirketin yıllık sabit giderine ne kadar ayırabilirsiniz?", d: "1.000 USD ve altı" },
        { t: "Kuruluş bütçeniz nasıl?", d: "Mümkün olan en düşük" },
        { t: "Şirketin ne kadar sürede kurulmuş olması gerekiyor?", d: "En kısa sürede, günler içinde" },
        { t: "Oturum vizesi de istiyor musunuz?", d: "Hayır, sadece şirket" },
      ],
    },
    {
      tip: "not",
      metin:
        "Bu sıralama bir kısa liste aracıdır: hangi yapının işinize yaradığı faaliyetinize, mukimliğinize ve gelir türünüze bağlı ve teyit gerektirir.",
    },
  ],
};

export default function RaporLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · araç çıktısı</span>
        <h1>Araç raporunun tasarımı</h1>
        <p>
          Üçünde de aynı veri var (uygunluk testinin örnek çıktısı); değişen tipografi ve düzen.
          Sayfalar gerçek A4 ölçüsünde, ekrana sığacak kadar küçültülüyor.
        </p>
      </div>

      <div className="lgc-aday">
        <b>R1 · Teklif dili</b>
        <span>satış akışındaki teklif belgesinin düzeni: solda logo, sağda künye, gri sonuç kutusu</span>
      </div>
      <section className="sec-pad lrp-sec">
        <div className="container-o">
          <RaporR1 rapor={ORNEK} />
        </div>
      </section>

      <div className="lgc-aday">
        <b>R2 · Gece kapak</b>
        <span>üstte tam genişlik gece bant, altında beyaz gövde; sonuç mavi ve büyük</span>
      </div>
      <section className="sec-pad lrp-sec">
        <div className="container-o">
          <RaporR2 rapor={ORNEK} />
        </div>
      </section>

      <div className="lgc-aday">
        <b>R3 · Editoryal</b>
        <span>solda dar künye sütunu, sağda geniş içerik; başlık sayfanın en büyük ögesi</span>
      </div>
      <section className="sec-pad lrp-sec">
        <div className="container-o">
          <RaporR3 rapor={ORNEK} />
        </div>
      </section>
    </main>
  );
}
