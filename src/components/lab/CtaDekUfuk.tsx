import { ArrowRight, Plane } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { Country } from "@/lib/store";

/* KAPANIŞ CTA'SI ADAYI · UFUK (.kd3-)
   Gece bir kart, içinde yıldız alanı; kartın altında kalan ortak bir merkeze
   bağlı üç yay, üstlerinde üç bayrak diski ve yavaşça geçen bir uçak. Metin
   ve düğme hedefi canlı CTA'dan geliyor (Footer.tsx · Ft2Cta): yeni vaat
   yazılmadı, yalnız sahne yeni.

   ÖNCEKİ TUR · ALT SAHNE SADELEŞTİ. Aday beğenildi, itiraz yalnız alt yarıya
   geldi: "alta dolgu vermişsin bişi yapmışsın ya dünya yapmaya çalışmışsın
   ona gerek yok direkt yörünge versiyonundaki gibi yapabiliriz." Gradyan
   dolgulu dünya kavisi (.kd3-kure) ve kenarına yapışan atmosfer parıltısı
   (.kd3-atmos) silindi; yerine Yörünge adayının kalıbı geldi, yani yalnız
   kenarlıkla çizilen temiz yaylar.

   BU TUR · YÖRÜNGE'DEN İKİ ÖZELLİK TAŞINDI. Müşteri: "ufukun yörüngedeki
   gibi uzaklıklar eşit olsun yörünge çizgileri arasında ve ülkelerde hareket
   etsin."
     1 · Yaylar arasındaki aralık eşitlendi (k = 0 · 44 · 88; eski dizi
         0 · 52 · 176'ydı, gerekçesi "perspektif" diye yazılıydı, reddedildi).
     2 · Üç bayrak diski artık kendi yayında ilerliyor; eskiden yayın üstünde
         sabit duruyorlardı. Mekanizma Yörünge'nin .kd2-tas--disk zinciri.
   AYNEN DURANLAR: uçağın geçişi, uzay teması ve yıldız paralaksı, sahnede
   metin olmaması, üst yarıdaki rozet + iki satır başlık + tek düğme.

   SAHNE HİÇBİR ŞEY ANLATMIYOR — VE BU BİLEREK BÖYLE.
   Bir önceki tur üç adayla reddedildi; üçü de hareketle bilgi taşıyordu
   (yörünge yarıçapı kuruluş süresine bağlıydı, zincir halkaları iş akışını
   anlatıyordu). Müşterinin sözü: "bişi anlatmasın ztn her boku anlattık ya."
   Bu yüzden burada hiçbir ölçü bir veriden türemiyor: yarıçaplar, açılar ve
   periyotlar yalnız kompozisyon ve teknik kısıt (asallık) için seçildi.
   Sahnede etiket, rakam ve künye metni de yok; ekrandaki bütün metin rozet +
   iki satır başlık + tek düğme.

   Sahnenin tamamı aria-hidden: içinde okunacak bir bilgi yok, ekran
   okuyucuya yalnız gürültü olurdu. */

/* ÜÇ BAYRAK DİSKİ · her biri kendi yayında, kendi hızında.

   Konum piksel koordinatıyla değil AÇIYLA veriliyor. Sebebi geometrik:
   yayların çapı ekran genişliğiyle ölçekleniyor (--kd3-d), yani sabit bir
   `left: %x` her genişlikte kavisin başka bir yerine düşerdi. Açı ölçekten
   bağımsız, disk her genişlikte çizginin tam üstünde kalıyor.

   `yay` · diskin bindiği yay (1 en içteki ufuk çizgisi, 3 en dıştaki).
   Hangi ülkenin hangi yayda olduğu HİÇBİR ŞEY ANLATMIYOR; bu turun kuralı
   zaten sahnenin bir şey anlatmaması. Sıra yalnızca bugünkü soldan sağa
   dizilişi koruyor.
   `ms` · süpürme periyodu. Üçü de asal ve birbirleriyle aralarında asal
   (tuzak K); tam liste ve neden bu sayılar olduğu lab-ctadek-3.css'in
   hareket bloğunda yazılı. İçteki disk en hızlısı, dıştaki en yavaşı:
   yarıçap büyüdükçe aynı açısal hız daha uzun bir yol demek, eşit süre
   verilseydi dıştaki fırlamış görünürdü.
   `gec` · turun kesri, negatif animation-delay'e çevriliyor. Sayfa
   açıldığında üçü birden aynı uçtan başlamasın diye var, başka anlamı yok.
   `yon` · "sol" ise animation-direction: reverse. Bu, tuzak K'nın
   yasakladığı `alternate` DEĞİL: periyodu değiştirmiyor, yalnız yönü
   çeviriyor. Ortadaki disk ters yöne gidiyor, üçü aynı yöne akarsa sahne
   tek parça kayan bir şerit gibi okunuyor.
   `aci` · YALNIZCA HAREKET KAPALIYKEN görünen duruş açısı; hareket açıkken
   keyframe kendi süpürme aralığını sürüyor ve bu değeri eziyor. Üçü de bu
   turdan önceki açılar (-8,4 / 0,6 / 9,2), yani hareketi kapatan ziyaretçi
   bugünkü sahneyi görmeye devam ediyor. Tam simetri sahneyi diyagram gibi
   gösteriyordu, hafif kaçıklık onu süse çeviriyor. */
const DISKLER: {
  ulke: Country;
  yay: 1 | 2 | 3;
  ms: number;
  gec: number;
  aci: string;
  yon: "sag" | "sol";
}[] = [
  { ulke: "ingiltere", yay: 1, ms: 50023, gec: 0.19, aci: "-8.4deg", yon: "sag" },
  { ulke: "dubai", yay: 2, ms: 55987, gec: 0.63, aci: "0.6deg", yon: "sol" },
  { ulke: "kktc", yay: 3, ms: 61991, gec: 0.37, aci: "9.2deg", yon: "sag" },
];

export default function CtaDekUfuk() {
  return (
    <section className="kd3">
      <div className="container-o">
        <div className="kd3-kart">
          <div className="kd3-sahne" aria-hidden="true">
            {/* DOM sırası burada z sırası demek, hiçbir katmana z-index
                verilmedi. Sıra uzaktan yakına: iki yıldız katmanı, en soluk
                yay, kesikli yay, uçak, ufuk çizgisi, en üstte diskler.
                Diskler uçaktan sonra geliyor ama ikisi çakışmıyor: uçağın
                yayı en dıştaki diskin 30 px üstünde (ölçü CSS'te). */}
            <span className="kd3-yildiz kd3-yildiz-b" />
            <span className="kd3-yildiz kd3-yildiz-a" />
            <span className="kd3-yay kd3-yay-3" />
            <span className="kd3-yay kd3-yay-2" />

            {/* Uçak yaylarla EŞ MERKEZLİ bir çemberin tepesinde duruyor ve
                çember dönüyor; yani uçağın yolu gerçek bir yay ve her ekran
                genişliğinde aynı kavisi çiziyor. Merkez küre kalkınca da
                yerinde kaldı, uçak zaten küreye değil o merkeze bağlıydı.
                offset-path denenmedi: onun yol koordinatları piksel sabiti ve
                dar ekranda uçak kadrajın dışında kalıyordu. */}
            <span className="kd3-ucus">
              <span className="kd3-ucak">
                <Plane size={17} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </span>

            {/* Ufuk çizgisi. Bu tur ÇOCUKSUZ kaldı: bayrak diskleri artık
                tek bir yayın üstünde durmuyor, üçü üç ayrı yayda dolaşıyor,
                o yüzden aşağıdaki ortak merkez çıpasına taşındılar. */}
            <span className="kd3-yay kd3-yay-1" />

            {/* ORTAK MERKEZ · ölçüsüz (0x0) bir çıpa, yayların merkeziyle
                aynı noktada. Diskler bunun içinde `left: 0; top: 0` ile
                duruyor ve konumlarını rotate + translateY zinciriyle
                alıyorlar, yani yaylarla aynı noktadan ölçülüyorlar ve hiçbir
                genişlikte yaydan kayamıyorlar. Zincirin okunuşu ve neden
                offset-path olmadığı CSS'te yazılı. */}
            <span className="kd3-mrk">
              {DISKLER.map(({ ulke, yay, ms, gec, aci, yon }) => (
                <span
                  key={ulke}
                  className="kd3-tas"
                  data-yay={yay}
                  data-yon={yon}
                  style={
                    {
                      "--a": aci,
                      "--kd3-t": `${ms}ms`,
                      "--kd3-gec": `-${Math.round(ms * gec)}ms`,
                    } as React.CSSProperties
                  }
                >
                  {/* Kap SABİT px + overflow:hidden (tuzak H): Flag çıplak
                      <svg viewBox="0 0 60 40"> basıyor, width/height
                      taşımıyor ve serbest bırakılırsa 300x150'ye şişiyor.
                      Disk artık DÖNDÜĞÜ için kural daha da kritik: şişen bir
                      kap dönerken kartın dışına savrulur. */}
                  <span className="kd3-bayrak">
                    <Flag country={ulke} />
                  </span>
                </span>
              ))}
            </span>
          </div>

          <div className="kd3-ust">
            <span className="kd3-rozet">
              <span className="kd3-nokta" />
              Tek ekip, tek muhatap
            </span>

            {/* Başlık ve düğme hedefi canlı CTA'nın kendisi. Canlıdaki
                paragraf BİLEREK GELMEDİ: bu turun sözleşmesi ekranda rozet +
                iki satır başlık + tek düğmeden fazlasını istemiyor. */}
            <h2 className="kd3-t">
              Kurulumunuzu <span className="kd3-vurgu">bugün başlatalım.</span>
            </h2>

            <div className="kd3-eylem">
              <SmartLink href="/basla" className="btn btn-primary">
                Kurulumu Başlat
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
