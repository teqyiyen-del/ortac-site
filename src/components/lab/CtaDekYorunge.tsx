import { ArrowRight, Globe, Plane } from "lucide-react";

import { COUNTRY_ORDER, Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";

/* KAPANIŞ CTA'SI ADAYI · YÖRÜNGE · DEKORATİF TUR (.kd2-)
   Sıcak kâğıt zeminli bir kutu: üstte rozet, iki satır başlık, tek koyu düğme;
   alt yarısında iç içe geçmiş üç geniş yay, üstlerinde üç bayrak diski ve iki
   uçak.

   SAHNE HİÇBİR ŞEY ANLATMIYOR VE BU TURUN TEK KURALI BU.
   Bir önceki tur reddedildi; müşterinin sözü: "işlevsel olsun diye bir şeyler
   anlatmak istemişsin ama karman çorman olmuş. bana daha dekoratif kafada bir
   cta lzm bişi anlatmasın ztn her boku anlattık ya."
   O turda yörünge YARIÇAPI kuruluş süresine, PERİYODU Kepler kuralına
   bağlanmıştı; yani hareket veri taşıyordu. Burada taşımıyor:
     · hiçbir yarıçap, hız ya da açı bir sayıya karşılık gelmiyor,
     · hangi ülkenin hangi yayda olduğu keyfî (yalnızca COUNTRY_ORDER sırası),
     · sahnede tek bir etiket, rakam ya da künye yok.
   Ekrandaki toplam metin: rozet + iki satır başlık + bir düğme. Site zaten her
   şeyi anlatıyor; kapanışın işi güzel durmak ve düğmeye götürmek.

   METİN VE HEDEF CANLIDAN GELİYOR, yeni vaat yazılmadı: başlık ve düğme
   Footer.tsx · Ft2Cta'nın birebir aynısı. Canlıdaki paragraf ("Dubai,
   İngiltere ve KKTC'de kuruluş, banka…") bilerek DÜŞTÜ, çünkü brifin saydığı
   üç ögeden biri değil ve sahnenin altındaki sessizliği bozuyordu.
   Rozet cümlesi de uydurma değil: iletişim sayfasının canlı başlığı.

   GTM YOK. Canlı Ft2Cta düğmelerinde `gtm("cta_start_click")` çağrısı var; bu
   dosya lab adayı, sahte olay göndermesin diye çağrı taşınmadı. Aday canlıya
   alınırsa geri eklenecek tek satır odur. */

/* ------------------------------------------------------------- taşıyıcılar
   Beş hareketli öge. Alanların hiçbiri firma verisinden türemiyor.

   PERİYOTLAR (tuzak K). Beşi de ASAL ve birbirleriyle aralarında asal;
   ayrıca sitedeki on sürekli periyodun (1510 · 8900 · 9700 · 13711 · 16993 ·
   20000 · 26000 · 29023 · 42000 · 60000) hiçbiriyle ortak böleni yok.
   Doğrulandı: 52999 · 40993 · 31013 · 67003 · 37003, ikili gcd'lerin tamamı 1.
   Oranların hiçbiri tam sayıya yakın değil (en yakını 37003/31013 = 1,193),
   yani yakın rezonanstan doğan yavaş nabız da oluşmuyor.

   `gec` turun kesri; negatif animation-delay'e çevriliyor. Sayfa açıldığında
   beşi birden yayın sol ucundan başlamasın diye var, başka anlamı yok.

   `aci` YALNIZCA HAREKET KAPALIYKEN kullanılıyor (duruş açısı). Hareket
   açıkken keyframe kendi süpürme aralığını (--kd2-w) sürüyor ve bu değeri
   ezip geçiyor. Beş açı, üç yayın masaüstündeki görünür bandı içinde ve
   birbirinden en az 120 piksel uzağa düşecek şekilde seçildi; yoksa hareketi
   kapatan ziyaretçide diskler tepe noktasında üst üste yığılıyordu.

   `yon` "sol" ise `animation-direction: reverse` uygulanıyor. Bu, tuzak K'nın
   yasakladığı `alternate` DEĞİL: reverse gerçek periyodu değiştirmiyor,
   yalnız yönü çeviriyor. İki uçağın ters yönde geçmesi sahneyi canlandırıyor.

   Diskler COUNTRY_ORDER sırasıyla dağıtılıyor (dubai · ingiltere · kktc).
   Hangi ülkenin hangi yayda olduğu ANLAM TAŞIMIYOR; yay çapları da öyle.
   Ülke tabloya `ulke` alanı olarak YAZILDI, çizim sırasında sayaçla
   türetilmedi: `let` sayacı render içinde artırmak lint kapısına takılıyor
   (react-hooks/immutability) ve haklı olarak, çünkü aynı ağaç iki kez
   çizilirse sayaç kayardı. */
type Tasiyici =
  | { tur: "disk"; ulke: (typeof COUNTRY_ORDER)[number]; yay: 1 | 2 | 3; ms: number; gec: number; aci: number; yon: "sag" | "sol" }
  | { tur: "ucak"; yay: 1 | 2 | 3; ms: number; gec: number; aci: number; yon: "sag" | "sol" };

/* ON TAŞIYICI: altı bayrak diski (her ülkeden İKİ tane) ve dört uçak.
   Müşteri: "ülke logolarından sadece 1 er tane koymuşsun ya... daha fazla
   koyabilirsin bide yörüngeye de uçak fln ekleyebilirsin bi kaç tane daha.
   çok az kalıyorlar yoksa 2 ülke gidince yörünge bomboş oluyor."

   Beş taşıyıcıyla sahne gerçekten boşalıyordu: üçü aynı anda kadrajın
   kenarına yaklaştığında ortada tek bir öge kalıyordu. On taşıyıcı, üç yaya
   dağılmış hâlde (3 + 4 + 3) her an en az dördünü görünür tutuyor.

   AYNI ÜLKE İKİ KEZ AMA AYNI YAYDA DEĞİL: ikisi aynı yayda olsaydı ikizmiş
   gibi okunurdu; farklı yayda ve farklı periyotta oldukları için tekrar değil
   yoğunluk oluyorlar.

   PERİYOTLARIN HEPSİ YENİ VE HEPSİ ASAL. Eski beş sayının ikisi (37003 ve
   52999) Küre adayında da vardı, yani aynı lab sayfasındaki iki sahne
   senkron atıyordu; on sayının hiçbiri sitede ya da öteki iki adayda
   kullanılmıyor. Seçim ölçütü yalnız asallık değil: hiçbiri kullanılan bir
   sayıya %4'ten, birbirine %5,2'den yakın değil, yoksa yakın oranlar
   saatlerce aynı fazda görünüp yavaş bir nabız üretiyor.

   EN ÜSTTEN GEÇEN UÇAK KORUNDU (yay 3, sola giden): müşteri "en yukardan
   geçen uçak dursun onun ayrı bir havası var hoşuma gitti" dedi. Açısı ve
   yönü aynen bırakıldı, yalnız periyodu çakışma yüzünden değişti. */
const TASIYICILAR: Tasiyici[] = [
  /* yay 1 · en içteki, en kısa yol */
  { tur: "disk", ulke: COUNTRY_ORDER[0], yay: 1, ms: 35381, gec: 0.13, aci: 8, yon: "sag" },
  { tur: "disk", ulke: COUNTRY_ORDER[2], yay: 1, ms: 47057, gec: 0.55, aci: -14, yon: "sol" },
  { tur: "ucak", yay: 1, ms: 38501, gec: 0.71, aci: 17, yon: "sag" },

  /* yay 2 · ortadaki, kesikli çizgi */
  { tur: "disk", ulke: COUNTRY_ORDER[1], yay: 2, ms: 44729, gec: 0.61, aci: -18, yon: "sol" },
  { tur: "disk", ulke: COUNTRY_ORDER[0], yay: 2, ms: 69691, gec: 0.24, aci: 26, yon: "sag" },
  { tur: "ucak", yay: 2, ms: 73327, gec: 0.29, aci: 22, yon: "sag" },
  { tur: "ucak", yay: 2, ms: 85361, gec: 0.06, aci: -30, yon: "sol" },

  /* yay 3 · en dıştaki, kenardan kenara */
  { tur: "disk", ulke: COUNTRY_ORDER[2], yay: 3, ms: 81119, gec: 0.47, aci: -24, yon: "sag" },
  { tur: "disk", ulke: COUNTRY_ORDER[1], yay: 3, ms: 94483, gec: 0.88, aci: 31, yon: "sol" },
  /* MÜŞTERİNİN BEĞENDİĞİ UÇAK · en üstten geçen, sola giden. */
  { tur: "ucak", yay: 3, ms: 89809, gec: 0.83, aci: 9, yon: "sol" },
];

export default function CtaDekYorunge() {
  return (
    <section className="kd2">
      <div className="container-o">
        <div className="kd2-kart">
          {/* ------------------------------------------------------- metin */}
          <div className="kd2-in">
            <span className="kd2-rozet">
              <Globe size={14} strokeWidth={1.9} aria-hidden="true" />
              Üç ülkede de kendi ofisimiz var
            </span>

            {/* Vurgu satırı `display: block`: başlık HER genişlikte tam iki
                satır olsun diye. `max-width` ile kırdırmak 375'te üçüncü
                satıra taşıyordu (kapanis-cta.css'te ölçülmüş aynı sorun). */}
            <h2 className="kd2-t">
              Kurulumunuzu
              <span className="kd2-t-ac">bugün başlatalım.</span>
            </h2>

            <SmartLink href="/basla" className="btn kd2-cta">
              Kurulumu Başlat
              <ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />
            </SmartLink>
          </div>

          {/* ------------------------------------------------------- sahne
              Tek `aria-hidden` yetiyor: içeride okunacak hiçbir bilgi yok,
              bayraklar bile ad taşımıyor. Ekran okuyucuya gürültü olurdu.

              GEOMETRİ CSS'TE. Üç yayın merkezi kartın ALTINDA, ortak bir
              noktada (.kd2-mrk). Yaylar eş merkezli, yani hiçbir yerde
              kesişmiyorlar; yalnız yarıçapları --kd2-g kadar farklı.
              Taşıyıcılar da aynı merkezi kullandığı için her genişlikte
              yayın tam üstünde duruyorlar. Sayılar ve neden o sayılar
              olduğu lab-ctadek-2.css'in başında yazılı. */}
          <div className="kd2-sahne" aria-hidden="true">
            <span className="kd2-isik" />

            <span className="kd2-mrk">
              <span className="kd2-yay kd2-yay--3" />
              <span className="kd2-yay kd2-yay--2" />
              <span className="kd2-yay kd2-yay--1" />

              {TASIYICILAR.map((t, i) => {
                const stil = {
                  "--kd2-t": `${t.ms}ms`,
                  "--kd2-gec": `-${Math.round(t.ms * t.gec)}ms`,
                  "--kd2-a": `${t.aci}deg`,
                } as React.CSSProperties;

                if (t.tur === "ucak") {
                  return (
                    <span
                      key={i}
                      className="kd2-tas kd2-tas--ucak"
                      data-yay={t.yay}
                      data-yon={t.yon}
                      style={stil}
                    >
                      <Plane size={20} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                  );
                }

                return (
                  <span
                    key={i}
                    className="kd2-tas kd2-tas--disk"
                    data-yay={t.yay}
                    data-yon={t.yon}
                    style={stil}
                  >
                    {/* TUZAK H · Flag çıplak <svg viewBox="0 0 60 40"> basıyor,
                        width/height TAŞIMIYOR. Kap sabit px + overflow:hidden
                        olmazsa 300x150'ye şişiyor ve iki sayfayı bozdu. */}
                    <span className="kd2-disk">
                      <Flag country={t.ulke} />
                    </span>
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
