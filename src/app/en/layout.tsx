import DilIsareti from "@/components/shared/DilIsareti";

/* İNGİLİZCE AĞACIN KABUĞU (10.10.2026 · deneme).
   Kök layout tek ve <html lang="tr"> basıyor. Kökte yolu okuyup lang seçmek
   (headers()) bütün siteyi istek anında çizilen sayfaya çevirirdi; istenmedi.
   Bu yüzden İngilizce ağaç dili TARAYICIDA düzeltiyor (shared/DilIsareti):
   sayfa açılınca <html lang="en"> oluyor.

   SINIRI: sunucudan gelen HTML'de lang hâlâ "tr". Ekran okuyucu ve tarayıcı
   çevirisi düzeltilmiş değeri görüyor; ham HTML'i okuyan bir bot görmüyor.
   Deneme dizin dışı olduğu için bugün zararı yok. İngilizce sayfalar dizine
   açılmadan ÖNCE kalıcı çözüm gerekiyor: sayfaları (tr) ve (en) rota
   gruplarına ayırıp iki kök layout yazmak (her biri kendi lang değeriyle).
   O taşıma bütün app/ klasörünü yerinden oynatıyor; bu turun işi değil. */
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DilIsareti />
      {children}
    </>
  );
}
