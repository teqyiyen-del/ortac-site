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

   BU TUR · SAHNE DÜZENİ OPTİMİZE EDİLDİ.
   Müşteri: "şimdi biraz optimize etmek lazım. öncelikle uçakla ülke logosu
   karşılaştığında uçak arkasında kalsın ülke logosunun. bide aynı anda iki
   uçak birbirine doğru gitmesin, aynı anda iki ülke de birbirine doğru
   gitmesin. güzel hiyerarşik bi düzen kur şuan ortada bi karmaşa var her şey
   rastgele birbirine gidiyor amk."

   Sahne ölçüsü, geometrisi ve mekanizması ÖNCEKİ TURDAN aynen duruyor
   (yaylar r3 · r3−g · r3−2g, ortak merkez çıpası, rotate→translateY zinciri,
   altı disk + dört uçak, yıldız alanı, iki kayan yıldız). Değişen tek şey
   taşıyıcıların YÖNÜ, HIZI, FAZI ve BASIM SIRASI. Üç değişmez kuruldu:

     D1 · UÇAK HER ZAMAN DİSKİN ARKASINDA. İki koldan garanti: uçaklar
          dizide disklerden ÖNCE geliyor (DOM sırası) ve ayrıca CSS'te
          uçak z-index 1, disk z-index 2 (lab-ctadek-3.css · .kd3-tas--*).
          Tek başına DOM sırası kırılgan olurdu: diziye ileride bir uçak
          eklenip yanlış yere düşse kural sessizce bozulurdu. z-index kuralı
          nerede kural ise orada yazıyor, dizinin sırasından bağımsız.
     D2 · Hiçbir iki uçak birbirine doğru gitmiyor.
     D3 · Hiçbir iki disk birbirine doğru gitmiyor.

   D2 ve D3 YAPISAL OLARAK ÇÖZÜLDÜ, FAZ AYARIYLA DEĞİL. `yon` alanı ve
   `data-yon` özniteliği TAMAMEN SİLİNDİ; CSS'te `animation-direction`
   bildirimi kalmadı. Yani "sola giden taşıyıcı" artık ifade edilemiyor:
   on taşıyıcının onu da soldan sağa akıyor, kafa kafaya gelen çift
   kurulamaz. Faz hilesi denenmedi çünkü çözmüyor: periyotlar asal, her
   göreli konum er ya da geç oluşuyor, "şimdilik çakışmıyorlar" bir ölçüm
   penceresinin dışında hükümsüz.

   ÖLÇÜLDÜ (1440 px, animasyonlar duraklatılıp currentTime sürülerek,
   104 saniye · 1.040 kare · 100 ms adım):
     · D1 · beş ayrı kesişme anında (yay1 kktc · yay3 kktc · yay3 dubai ×2 ·
       yay2 ingiltere) kesişen alanın içinden 9'ar nokta örneklendi,
       45 noktanın 45'inde elementFromPoint DİSKİ döndürdü. Uçak z-index 1,
       disk 2. Bir tur boyunca sekiz uçak-disk kesişme olayı oluyor ve hepsi
       aynı yayda: farklı yaylardaki taşıyıcılar hiç çakışmıyor (0 kare),
       çünkü yaylar arası açıklık --kd3-g, en dar hâlinde 46 px ve en büyük
       disk 38 px.
     · D2/D3 · 21.731 aynı-tür çift ölçümünde YAKLAŞAN ÇİFT 0. Negatif
       açısal hız ölçümü de 0; tek istisna 22 başa-dönüş karesi, onlarda da
       en yüksek opaklık 0,021, yani görünmüyorlar.
     · Geçme olayı · yay1'de uçak diskin 2,46° gerisinden gelip (t=17 s)
       3,75° önüne çıkıyor (t=32 s), tam üstünden geçtiği an t≈23 s ve fark
       0,03°. yay2'de aynı olay -4,95° → +7,90°.
     · Şerit değil · aynı yönde akmasına rağmen taşıyıcıların soldan sağa
       diziliş sırası 104 saniyede 45 kez değişiyor (tek parça şerit olsaydı
       1 olurdu); açısal yayılım 54,9°-86,3° arasında geziniyor, ortalama
       67,6°; herhangi iki taşıyıcı arasındaki açı her 100 ms'de ortalama
       0,049° değişiyor, yani hiçbir çift sabit mesafede kalmıyor.

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
   ON HAREKETLİ ÖGE, TEK DİZİ. Uçak ve disk ayrı mekanizmalarda değil, ikisi
   de aynı zincirle yayın üstünde ilerliyor. Tek fark uçakta karşı-döndürmenin
   olmaması (burnu teğette kalmalı) ve ikonun 45 derece çevrilmesi.

   DİZİNİN SIRASI ARTIK ANLAM TAŞIYOR: önce dört uçak, sonra altı disk.
   Bileşen diziyi olduğu gibi basıyor, yani diskler DOM'da uçaklardan sonra
   geliyor ve üstlerine düşüyorlar (D1). Bu, CSS'teki z-index kuralının
   ikizi; ikisi de aynı şeyi söylüyor ve biri bozulursa öteki tutuyor.

   ALTI DİSK · HER ÜLKEDEN İKİ TANE, DÖRT UÇAK. Müşteri sayıyı beğendi ("çok
   az kalıyorlar yoksa 2 ülke gidince yörünge bomboş oluyor"), bu turda
   değişmedi. Aynı ülkenin iki diski FARKLI YAYDA ve fazları uzak: t=0'da
   ingiltere 29,4° · kktc 35,3° · dubai 21,6° aralıkla duruyorlar, yani aynı
   bayrak hiçbir yerde ikiz gibi görünmüyor.

   `yay` · 1 en içteki (en alttaki, en kısa) · 3 en dıştaki (en üstteki,
   kenardan kenara giden). Hangi ülkenin hangi yayda olduğu HİÇBİR ŞEY
   ANLATMIYOR.

   YÖN ALANI YOK VE OLMAYACAK. Eskiden `yon: "sag" | "sol"` vardı ve her yayda
   iki yön karışıktı; müşteri tam bunu reddetti. Alan silindi, dolayısıyla
   on taşıyıcının onu da soldan sağa akıyor. D2 ve D3 bu yüzden ölçüm değil
   tip meselesi: ters yön ifade edilemiyor.

   `ms` · süpürme periyodu. Hepsi ASAL, dolayısıyla ikişerli aralarında asal
   (tuzak K). SAYILAR BU TUR YENİDEN DAĞITILDI, çünkü hız artık keyfî değil
   hiyerarşinin kendisi. Açısal hız ω = 2·w/T ve tek bir kural sürüyor:

     · DİSKLER · içten dışa yavaşlıyor, üç ayrı hız kuşağı:
         yay1  1,470 · 1,407 °/sn   (25,0 · 23,9 px/sn)
         yay2  1,172 · 1,057 °/sn   (21,5 · 19,4 px/sn)
         yay3  0,902 · 0,866 °/sn   (17,7 · 17,0 px/sn)
       Kuşaklar çakışmıyor ve basamaklar eşit: %20,1 ve %17,2. Sıra hem
       açısal hem çizgisel hızda aynı, yani hangi ölçüyle bakılırsa bakılsın
       iç yay hızlı. Eş merkezli bir sistemde beklenen budur; sahne bu tek
       kuralla "yörünge" gibi okunuyor.
     · UÇAKLAR · dört uçak tek bir dar kuşakta: 1,799-1,914 °/sn, yayılım
       yalnız %6,4. En yavaş uçak en hızlı diskin ω'da 1,22, px/sn'de 1,24
       katı, yani HER uçak HER diskten hızlı. Sonuç okunur tek bir olay:
       uçak diski arkadan yakalıyor, üstünden değil ALTINDAN geçiyor (D1) ve
       önüne çıkıyor. Üç kural tek harekette görünüyor.

   ESKİ KURAL ("görünen hız üç yayda da eşit olsun, 22-29 px/sn") BIRAKILDI:
   eşit hız tam olarak müşterinin şikâyet ettiği düzsüzlüğü üretiyordu.

   `gec` · turun kesri, negatif animation-delay'e çevriliyor. Bu tur işi
   büyüdü: aynı yönde akan bir sahnenin ŞERİT gibi okunmaması buna bağlı.
   Onu da [0,14 · 0,86] aralığında, yani açılışta onu da görünür; yay içi
   açısal aralıklar bilerek eşitsiz (yay3'te 16,2° · 21,6° · 17,1°), çünkü
   eşit aralık sahneyi cetvele çeviriyor. Şeridin asıl panzehiri yine de faz
   değil HIZ FARKI: on taşıyıcının açısal hızı 0,866'dan 1,914'e yayılıyor
   (2,21 kat), yani aralarındaki açı sürekli değişiyor, hiçbir ikisi sabit
   mesafede kalamıyor.

   `aci` · YALNIZCA HAREKET KAPALIYKEN görünen duruş açısı; hareket açıkken
   keyframe kendi süpürme aralığını sürüyor ve bu değeri eziyor. On açı
   ölçülerek seçilmişti ve BU TUR DEĞİŞMEDİ: her yayın açı kümesi ve o
   açılardaki taşıyıcı TÜRÜ aynı kaldı, yani dört genişlikte yapılan çakışma
   ölçümü (en dar pay 375'te 20 px) hâlâ geçerli. */
type Tasiyici =
  | { tur: "disk"; ulke: Country; yay: 1 | 2 | 3; ms: number; gec: number; aci: number }
  | { tur: "ucak"; yay: 1 | 2 | 3; ms: number; gec: number; aci: number };

const TASIYICILAR: Tasiyici[] = [
  /* ÖNCE UÇAKLAR · DOM'da altta kalsınlar diye (D1) */
  { tur: "ucak", yay: 1, ms: 27449, gec: 0.44, aci: 3 },
  { tur: "ucak", yay: 2, ms: 38669, gec: 0.52, aci: -6 },
  { tur: "ucak", yay: 3, ms: 47417, gec: 0.36, aci: 6 },
  { tur: "ucak", yay: 3, ms: 50023, gec: 0.79, aci: -27 },
  /* SONRA DİSKLER · DOM'da üstte kalsınlar diye (D1) */
  { tur: "disk", ulke: "ingiltere", yay: 1, ms: 34019, gec: 0.22, aci: -16 },
  { tur: "disk", ulke: "kktc", yay: 1, ms: 35527, gec: 0.63, aci: 17 },
  { tur: "disk", ulke: "dubai", yay: 2, ms: 63149, gec: 0.31, aci: -19 },
  { tur: "disk", ulke: "ingiltere", yay: 2, ms: 70019, gec: 0.71, aci: 12 },
  { tur: "disk", ulke: "kktc", yay: 3, ms: 99833, gec: 0.18, aci: -11 },
  { tur: "disk", ulke: "dubai", yay: 3, ms: 103889, gec: 0.6, aci: 22 },
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
              sayılar olduğu lab-ctadek-3.css'in başında yazılı.

              BASIM SIRASI D1'İN İKİNCİ KOLU. Yaylar önce basılıyor (z-index
              yok, konumlu kardeşler arasında en altta kalıyorlar), sonra
              dizinin kendi sırası geliyor: dört uçak, ardından altı disk.
              Diziyi tür sırasına sokmak, kural CSS'ten silinse bile diskin
              önde kalmasını sağlıyor. */}
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
                    <span key={i} className="kd3-tas kd3-tas--ucak" data-yay={t.yay} style={stil}>
                      <Plane size={20} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                  );
                }

                return (
                  <span key={i} className="kd3-tas kd3-tas--disk" data-yay={t.yay} style={stil}>
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
