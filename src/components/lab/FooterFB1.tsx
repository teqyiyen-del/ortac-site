import { Ft2Cta, Ft2Directory } from "@/components/Footer";

/* FOOTER ADAYI FB1 · "AYRI AMA İKİSİ DE GECE" (.fb1-) · CSS: css/lab-footer-1.css

   Müşterinin teşhisi: "şuan cta ile ayrışmıyor sectionlar... footer geriplana
   düşüyor dikkat çekicilik olarak." Kapanış CTA'sı bu turda gece bir karta
   döndü ve her sayfanın altında duruyor; hemen altındaki site dizini hâlâ
   BEYAZ zeminde, yani göz kartta kalıyor ve dizin siliniyor.

   BU ADAYIN CEVABI: dizin de gece yüzeye geçiyor, ama CTA kartı kart kalıyor.
   İki blok ayrı okunmaya devam ediyor; ayrışmayı sağlayan şey artık "beyaz
   ↔ gece" farkı değil, kartın kendi kenarı.

   HİÇBİR ŞEY YENİDEN YAZILMADI. Bu dosya iki canlı bileşeni olduğu gibi
   basıyor: Ft2Cta (rozet, başlık, düğme, yıldız alanı ve CtaSahne) ve
   Ft2Directory (üç ülke sütunu + Araçlar/Kaynaklar/Kurumsal + künye satırı).
   Kopyalanmadılar, IMPORT edildiler; yani sahnenin geometrisi, on iki
   taşıyıcı, iki kayan yıldız ve dizinin bütün bağlantıları birebir aynı.
   Kaybolan çıkış yok, yeni bağlantı ve yeni metin de yok.

   DEĞİŞEN TEK ŞEY RENK VE KENAR, ve hepsi CSS'te:
     · .fb1 kabuğu --night-2 (#111111) gece yüzey,
     · CTA kartı --night (#080808) kalıyor (sahne bu zemine göre ayarlıydı),
     · kartın çevresine 1px'lik ince halka, iki yüzeyi ayıran çizgi,
     · dizinin metin ve bağlantı renkleri gece kademelerine geçiyor.

   `placement` bilerek "lab-fb1": lab sayfasındaki tıklamalar canlı footer'ın
   `cta_start_click · footer` ölçümüne karışmasın. */
export default function FooterFB1() {
  return (
    <footer className="fb1">
      <Ft2Cta placement="lab-fb1" />

      {/* Dizin kendi kabında: renk override'ları ancak bir kapsam sınıfıyla
          canlı .ft2- kurallarını geçebiliyor (özgüllük gerekçesi CSS'te). */}
      <div className="fb1-dizin">
        <Ft2Directory />
      </div>
    </footer>
  );
}
