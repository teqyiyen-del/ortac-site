import { ArrowRight, Plane } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { Country } from "@/lib/store";

/* KAPANIŞ CTA'SI ADAYI · UFUK (.kd3-)
   Gece bir kart: kartın tamamını kaplayan yıldız alanı, üst yarısında rozet +
   iki satır başlık + tek düğme, alt yarısında kartın altında kalan ortak bir
   merkeze bağlı üç yay ve üstlerinde ilerleyen altı bayrak diski ile dört
   uçak. Metin ve düğme hedefi canlı CTA'dan geliyor (Footer.tsx · Ft2Cta):
   yeni vaat yazılmadı.

   BU TUR · ADAY SEÇİLDİ, SAHNE YÖRÜNGE'YE ÇEVRİLDİ.
   Müşteri: "birebir yörüngede versiyonundaki ölçüyü ve uçak mantığını fln
   taşır mısın ufuk konseptine. şuan ufuktaki uçağıda arkasından iz çıkarak
   fln gidiyor ya o hoşuma gitmiştide onu yıldıza çevir arkaplanda arada bir
   kaysın geçsin sadece. onun dışında alt kısmın tarzı yörünge konseptindeki
   gibi olsun."

   Dört iş yapıldı:
     1 · ÖLÇÜ. Ufuk'un kendi sistemi (çap --kd3-d + ufuk tabanı + k = 0/g/2g)
         tamamen bırakıldı, yerine Yörünge'nin yarıçap tabanlı sistemi geldi:
         yaylar r3 · r3−g · r3−2g ve hepsi tek bir çıpadan ölçülüyor.
         Sayılar birebir Yörünge'den (lab-ctadek-2.css · .kd2-sahne).
     2 · UÇAK MANTIĞI. Uçağın kendi dönen çemberi (.kd3-ucus) kalktı. Uçak da
         disk de artık AYNI taşıyıcı mekanizmasında: tek bir TASIYICILAR
         dizisi, tek zincir (rotate → translateY → translate).
     3 · İZ KALKTI, YERİNE KAYAN YILDIZ. Uçağın arkasındaki sönen çizgi
         (.kd3-ucak::before) silindi; aynı iz efekti yıldız alanına taşındı ve
         arada bir geçen iki kayan yıldıza dönüştü.
     4 · ALT KISMIN TARZI. Kompozisyon, yay ağırlıkları ve taşıyıcı dili
         Yörünge'den.

   KART GECE KALIYOR VE BU BİLEREK BÖYLE. Müşteri bu adayı "siyah olan" diye
   anıyor, kimliği o. Yörünge'nin krem gradyan zemini TAŞINMADI; yıldız alanı
   da yerinde. Taşınan şey zemin rengi değil, sahnenin ölçüsü, mekanizması ve
   kompozisyonu. Yay renkleri gece zeminde okunur değerlerinde bırakıldı
   (Yörünge kâğıt üstünde rgba(8,8,8,…) kullanıyor, burada beyaz).

   SAHNE HİÇBİR ŞEY ANLATMIYOR — VE BU DA BİLEREK BÖYLE.
   Bir önceki tur üç adayla reddedildi; üçü de hareketle bilgi taşıyordu.
   Müşterinin sözü: "bişi anlatmasın ztn her boku anlattık ya." Bu yüzden
   burada hiçbir ölçü bir veriden türemiyor: yarıçaplar, açılar ve periyotlar
   yalnız kompozisyon ve teknik kısıt (asallık) için seçildi. Sahnede etiket,
   rakam ve künye metni de yok; ekrandaki bütün metin rozet + iki satır başlık
   + tek düğme.

   Sahnenin ve gökyüzünün tamamı aria-hidden: içlerinde okunacak bir bilgi
   yok, ekran okuyucuya yalnız gürültü olurlar. */

/* ------------------------------------------------------------- taşıyıcılar
   ON HAREKETLİ ÖGE, TEK DİZİ. Yörünge'nin kalıbı bu: uçak ve disk ayrı
   mekanizmalarda değil, ikisi de aynı zincirle yayın üstünde ilerliyor. Tek
   fark uçakta karşı-döndürmenin olmaması (burnu teğette kalmalı) ve ikonun
   45 derece çevrilmesi.

   ALTI DİSK · HER ÜLKEDEN İKİ TANE, DÖRT UÇAK. Müşteri sayıyı beğendi ("çok
   az kalıyorlar yoksa 2 ülke gidince yörünge bomboş oluyor"), bu turda
   değişmedi. Aynı ülkenin iki diski FARKLI YAYDA: aynı yayda olsalardı ikiz
   gibi okunurlardı, bu hâlde tekrar değil yoğunluk oluyorlar.

   `yay` · 1 en içteki (en alttaki, en kısa) · 3 en dıştaki (en üstteki,
   kenardan kenara giden). Hangi ülkenin hangi yayda olduğu HİÇBİR ŞEY
   ANLATMIYOR.

   `ms` · süpürme periyodu. Onu da ASAL ve ikişerli aralarında asal (tuzak K);
   tam liste ve gerekçe lab-ctadek-3.css'in hareket bloğunda.
   Dağıtım keyfî değil, GÖRÜNEN HIZ eşitlensin diye yapıldı: 1440'ta bir
   taşıyıcının süpürdüğü yol yay1'de 854, yay2'de 1358, yay3'te 1764 piksel
   (2·w·r). Periyotlar aynı oranda büyütüldü, yani üç yayda da 22-29 px/sn
   çıkıyor; eşit süre verilseydi dıştaki fırlamış görünürdü. Uçaklar aynı
   yaydaki disklerden bilerek biraz hızlı.

   `gec` · turun kesri, negatif animation-delay'e çevriliyor. Sayfa
   açıldığında onu birden aynı uçtan başlamasın diye var, başka anlamı yok.

   `yon` · "sol" ise animation-direction: reverse. Bu, tuzak K'nın yasakladığı
   `alternate` DEĞİL: periyodu değiştirmiyor, yalnız yönü çeviriyor. Her yayda
   iki yön karışık; hepsi aynı yöne akarsa sahne tek parça kayan bir şerit
   gibi okunuyor. En dıştaki yaydaki iki uçak da ters yönde, birbirlerini
   kesiyorlar.

   `aci` · YALNIZCA HAREKET KAPALIYKEN görünen duruş açısı; hareket açıkken
   keyframe kendi süpürme aralığını sürüyor ve bu değeri eziyor. On açı
   ölçülerek seçildi: dört genişlikte (1440 · 1024 · 768 · 375) hiçbir iki
   taşıyıcının kenarı çakışmıyor (en dar pay 375'te 20 px), hepsi kartın
   yarı genişliğinin içinde ve hepsi sahne kutusunun içinde kalıyor. Tam
   simetri sahneyi diyagram gibi gösteriyordu, hafif kaçıklık onu süse
   çeviriyor. */
type Tasiyici =
  | { tur: "disk"; ulke: Country; yay: 1 | 2 | 3; ms: number; gec: number; aci: number; yon: "sag" | "sol" }
  | { tur: "ucak"; yay: 1 | 2 | 3; ms: number; gec: number; aci: number; yon: "sag" | "sol" };

const TASIYICILAR: Tasiyici[] = [
  { tur: "disk", ulke: "ingiltere", yay: 1, ms: 38669, gec: 0.19, aci: -16, yon: "sag" },
  { tur: "disk", ulke: "kktc", yay: 1, ms: 44939, gec: 0.72, aci: 17, yon: "sol" },
  { tur: "ucak", yay: 1, ms: 34019, gec: 0.41, aci: 3, yon: "sag" },
  { tur: "disk", ulke: "dubai", yay: 2, ms: 50023, gec: 0.63, aci: -19, yon: "sol" },
  { tur: "disk", ulke: "ingiltere", yay: 2, ms: 55987, gec: 0.28, aci: 12, yon: "sag" },
  { tur: "ucak", yay: 2, ms: 47417, gec: 0.86, aci: -6, yon: "sol" },
  { tur: "disk", ulke: "kktc", yay: 3, ms: 73877, gec: 0.37, aci: -11, yon: "sag" },
  { tur: "disk", ulke: "dubai", yay: 3, ms: 81509, gec: 0.85, aci: 22, yon: "sol" },
  { tur: "ucak", yay: 3, ms: 61991, gec: 0.09, aci: 6, yon: "sag" },
  { tur: "ucak", yay: 3, ms: 70019, gec: 0.55, aci: -27, yon: "sol" },
];

export default function CtaDekUfuk() {
  return (
    <section className="kd3">
      <div className="container-o">
        <div className="kd3-kart">
          {/* --------------------------------------------------- gökyüzü
              Yıldız alanı ARTIK SAHNENİN DEĞİL KARTIN katmanı: sahne bu tur
              Yörünge gibi kartın alt bandına indi (akışta duran, --kd3-h
              yüksekliğinde bir kutu), oysa yıldızlar kartın tamamını
              kaplamalı. İkisi ayrılınca kayan yıldız da doğru yere düştü.

              Kayan yıldızlar burada, sahnede değil: müşteri izi uçakta değil
              "arkaplanda" istedi. Metnin ARKASINDAN geçiyorlar (z sırası:
              gök 0 · sahne 1 · metin 2), yani okunurluğa dokunmuyorlar. */}
          <span className="kd3-gok" aria-hidden="true">
            <span className="kd3-yildiz kd3-yildiz-b" />
            <span className="kd3-yildiz kd3-yildiz-a" />
            <span className="kd3-kayan kd3-kayan-1" />
            <span className="kd3-kayan kd3-kayan-2" />
          </span>

          {/* ------------------------------------------------------ metin */}
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

          {/* ------------------------------------------------------ sahne
              GEOMETRİ CSS'TE VE BİREBİR YÖRÜNGE'DEN. Üç yayın merkezi kartın
              ALTINDA, ortak bir noktada (.kd3-mrk); yaylar eş merkezli, yani
              hiçbir yerde kesişmiyorlar, yalnız yarıçapları --kd3-g kadar
              farklı. Taşıyıcılar da aynı çıpayı kullandığı için her
              genişlikte yayın tam üstünde duruyorlar. Sayılar ve neden o
              sayılar olduğu lab-ctadek-3.css'in başında yazılı. */}
          <div className="kd3-sahne" aria-hidden="true">
            <span className="kd3-mrk">
              <span className="kd3-yay kd3-yay-3" />
              <span className="kd3-yay kd3-yay-2" />
              <span className="kd3-yay kd3-yay-1" />

              {TASIYICILAR.map((t, i) => {
                const stil = {
                  "--kd3-t": `${t.ms}ms`,
                  "--kd3-gec": `-${Math.round(t.ms * t.gec)}ms`,
                  "--kd3-a": `${t.aci}deg`,
                } as React.CSSProperties;

                /* `key` ARTIK İNDEKS. Eskiden disklerde `key={ulke}` yazıyordu
                   ve altı disk üç ülkeden ikişer tane olduğu için üç anahtar
                   İKİZDİ; React aynı anahtarlı kardeşleri ayırt edemiyor.
                   Dizi sabit ve hiç sıralanmıyor, indeks burada güvenli. */
                if (t.tur === "ucak") {
                  return (
                    <span
                      key={i}
                      className="kd3-tas kd3-tas--ucak"
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
                    className="kd3-tas kd3-tas--disk"
                    data-yay={t.yay}
                    data-yon={t.yon}
                    style={stil}
                  >
                    {/* TUZAK H · Flag çıplak <svg viewBox="0 0 60 40"> basıyor,
                        width/height TAŞIMIYOR ve serbest bırakılırsa
                        300x150'ye şişiyor; iki sayfayı bozduğu ölçüldü. Kap
                        sabit px (--kd3-disk bir clamp, her zaman kesin
                        uzunluk) + overflow:hidden. Disk yayda İLERLEDİĞİ için
                        kural daha da kritik: şişen bir kap kartın dışına
                        savrulur. */}
                    <span className="kd3-bayrak">
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
