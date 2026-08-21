import { ArrowRight, Plane } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { Country } from "@/lib/store";

/* KAPANIŞ CTA'SI ADAYI · UFUK (.kd3-)
   Gece bir kart: kartın tamamını kaplayan yıldız alanı, üst yarısında rozet +
   iki satır başlık + tek düğme, alt yarısında kartın altında kalan ortak bir
   merkeze bağlı üç yay ve üstlerinde ilerleyen bayrak diskleri ile uçaklar.
   Metin ve düğme hedefi canlı CTA'dan geliyor (Footer.tsx · Ft2Cta): yeni
   vaat yazılmadı.

   BU TUR · ÜÇ KISIT VE BİRİNİN GEÇERSİZ KILDIĞI BİR ÖNCEKİ KARAR.
   Müşteri: "ama bazı ülke logoları iç içe binmiş bide aynı anda aynı ülkeler
   birbirine bu kadar yakın olmasın o ülke dağılımını biraz iyi yapman lazım o
   olmadı pek" ve arkasından "peş peşe iki uçak da peş peşe iki ülke de
   olmasın btw".

     Y1 · hiçbir iki ülke diski üst üste binmeyecek,
     Y2 · aynı ülkenin iki diski birbirine yakın durmayacak,
     Y3 · açısal sırada uçak ve disk SIRAYLA gelecek.

   TEŞHİS. Binme faz kazası değildi, hız kazasıydı: aynı yaydaki iki disk
   farklı ama %4 komşuluğunda periyot taşıyordu (yay1 34019·35527 · yay2
   63149·70019 · yay3 99833·103889), yani birbirlerini çok yavaş yakalıyor,
   uzun süre yan yana kalıyor ve turun bir yerinde tam üst üste biniyorlardı.
   Farklı yaylardakiler zaten binemiyor: yaylar arası --kd3-g en dar hâlinde
   46 px, en büyük disk 38 px.

   Y3 GEÇEN TURUN HİYERARŞİSİNİ GEÇERSİZ KILDI. Geçen tur "her uçak her
   diskten hızlı, uçak diski arkadan yakalayıp altından geçiyor" diye bir
   düzen kurulmuştu; okunur tek olay oydu. O düzende taşıyıcıların birbirine
   göre SIRASI sürekli değişir — geçme olayının kendisi budur. Y3 ise sıranın
   sabit kalmasını istiyor. İkisi aynı anda olamaz, Y3 müşterinin son sözü ve
   kazanan o. "Uçak diski geçer" fikri BU TURDA BIRAKILDI; uçak ve disk artık
   aynı hızda, birbirlerini hiç yakalamıyorlar.

   ÇÖZÜM YAPISAL, FAZ AYARI DEĞİL. İki taşıyıcının birbirine göre konumu
   ancak açısal hızları EŞİTSE sabit kalır; "şimdilik düzgün duruyorlar" bir
   ölçüm penceresinin dışında hükümsüz (bu ders bu depoda yön ve çakışma
   konularında iki kez alındı). Üç adım:

     1 · AYNI YAYDAKİ BÜTÜN TAŞIYICILAR TEK PERİYOT PAYLAŞIYOR. Süpürme
         genişliği zaten yay başına tek (--kd3-w), periyot da tek olunca
         ω = 2w/T eşitleniyor ve o yay RİJİT BİR TAKIMYILDIZ oluyor:
         aralarındaki açı sabit, ne biniyorlar (Y1), ne yaklaşıyorlar (Y2),
         ne sıra değiştiriyorlar (Y3). Periyot artık taşıyıcının değil YAYIN
         özelliği ve bileşende hiç yazmıyor: CSS'te [data-yay] kuralında
         duruyor (lab-ctadek-3.css · --kd3-t), yani aynı yayda iki farklı
         periyot YAZILAMIYOR.
     2 · HER YAYDA TÜRLER SIRAYLA. Aşağıdaki dizi bunu tipten alıyor: bir
         yayın içeriği "durak" listesi ve HER DURAK BİR DİSK + BİR UÇAK.
         Tür bileşende indisle değil durağın alanıyla belirleniyor, yani
         "peş peşe iki uçak" ifade edilemiyor. Süpürme bandı döngüsel
         olduğu için (sağ uçtan çıkan sol uçtan giriyor, iki ucunda da
         opaklık sıfır) çift uzunluktaki bu dizi her karede sırayla okunuyor.
     3 · HIZ FARKI YAYLAR ARASINDA KALDI. Yay içinde eşitlik, yaylar arasında
         fark: 1,450 °/sn (iç) ve 0,930 °/sn (dış). Sahne bu yüzden tek parça
         bir şerit gibi kaymıyor, iki takımyıldız birbirine göre kayıyor.

   ORTA YAY BİLEREK BOŞ VE ASIL KARAR BU. Üç yayın üçü de dolu olsaydı Y2
   çözülemezdi: aynı ülkenin iki diski komşu yaylara düşerse aralarındaki
   en küçük mesafe --kd3-g olur, yani 1440'ta 72 px = 1,9 disk çapı, ve
   yaylar farklı hızda olduğu için o hizalanma kaçınılmaz. Ölçüldü: bugünkü
   sahnede aynı ülkenin en küçük mesafesi zaten 1,92 disk çapı ve turun
   %2,7'sinde 2 çapın altına iniyor — yani üç yaya yayılmış bir düzen
   müşterinin İKİNCİ şikâyetini hiç çözmüyordu. Diskler yalnız 1. ve 3.
   yaya konunca aradaki mesafe 2·--kd3-g oluyor ve her ülkenin iki diski
   sonsuza kadar en az 3,2 disk çapı uzakta kalıyor. Bedeli: kesikli orta
   yay taşıyıcısız kalıyor. Ölçüm bedeli haklı çıkardı, sayılar aşağıda.
   Yayın kendisi duruyor (ölçü, renk, kesik hiç değişmedi); çizim değişmedi,
   yalnız üstünde taşıyıcı yok.

   ÖLÇÜLDÜ (dört genişlikte, animasyonlar duraklatılıp currentTime sürülerek,
   en uzun periyot 96,769 s boyunca):
     · Y1 · disk-disk binme 0 kare. Turun tamamındaki en küçük merkez
       mesafesi 3,85 disk çapı (1440) · 3,66 (1024) · 3,29 (768) · 3,22 (375).
     · Y2 · aynı ülkenin iki diski arasındaki en küçük mesafe 3,85 / 3,66 /
       3,29 / 3,29 çap; "yakın" eşiği 3 çap alındığında turun %0'ında altına
       iniyor. Dubai'nin çifti aynı yayda ve yarım tur arayla olduğu için
       mesafesi sabit: 22,5 çap (1440).
     · Y3 · yay içi açısal sırada "peş peşe aynı tür" 0. Bütün sahnede
       (soldan sağa görsel sıra) sıfır DEĞİL, karede ortalama 3,1 komşuluk;
       nedeni ve karşılığında ne kazanıldığı aşağıda, `aci` yorumunda.
     · aynı türden iki taşıyıcı arasındaki mesafe hiçbir karede 2,6 disk
       çapının altına inmiyor, yani iki uçak da iki disk de görsel olarak
       "yan yana" düşmüyor.

   KART GECE KALIYOR VE BU BİLEREK BÖYLE. Müşteri bu adayı "siyah olan" diye
   anıyor, kimliği o. Yörünge'nin krem gradyan zemini TAŞINMADI; yıldız alanı
   da yerinde. Taşınan şey zemin rengi değil, sahnenin ölçüsü, mekanizması ve
   kompozisyonu.

   SAHNE HİÇBİR ŞEY ANLATMIYOR — VE BU DA BİLEREK BÖYLE.
   Müşterinin sözü: "bişi anlatmasın ztn her boku anlattık ya." Hiçbir ölçü
   bir veriden türemiyor: yarıçaplar, açılar ve periyotlar yalnız kompozisyon
   ve teknik kısıt (asallık) için seçildi. Sahnede etiket, rakam ve künye
   metni de yok; ekrandaki bütün metin rozet + iki satır başlık + tek düğme.

   Sahnenin ve gökyüzünün tamamı aria-hidden: içlerinde okunacak bir bilgi
   yok, ekran okuyucuya yalnız gürültü olurlar. */

/* ------------------------------------------------------------ takımyıldız
   BİR YAY = BİR TAKIMYILDIZ. Yayın bütün taşıyıcıları tek periyodu paylaşıyor
   (periyot CSS'te, [data-yay] kuralında) ve aralarındaki açı hiç değişmiyor.

   `yay` TİPİNDE 2 YOK. Orta yay bilerek taşıyıcısız: Y2'nin tek yapısal
   çözümü disklerin komşu olmayan iki yaya (1 ve 3) düşmesi, gerekçesi
   yukarıda ölçümüyle yazılı. Değer tipte olmadığı için orta yaya taşıyıcı
   "yanlışlıkla" konamıyor; koymak isteyen önce tipi, sonra CSS'te eksik
   [data-yay="2"] kuralını yazmak zorunda ve o an bu kararı görüyor.

   `durak` DİZİSİ TÜR SIRASINI TİPTEN ALIYOR. Her durak bir disk VE bir uçak
   taşıyor; bileşen önce durağın diskini, sonra uçağını açısal sıraya
   koyuyor. Yani dizide "iki uçak arka arkaya" ifade edilemiyor — Y3 bir
   ölçüm değil, yazılamayacak bir şey. Dizi bu yüzden aynı zamanda çift
   uzunlukta ve döngüsel sıra da (sağ uçtan çıkan sol uçtan giriyor) sırayla
   okunuyor.

   ÜLKE DAĞILIMI · seçenek B, ölçümle. Aynı ülkenin iki diski aynı yayın iki
   ucuna konsaydı (seçenek A) mesafe sabit ve en büyük olurdu ama her yay tek
   bir ülkeye ait olur, "iç yay hangi ülke" diye bir hiyerarşi ima ederdi;
   sahne hiçbir şey anlatmamalı. Bunun yerine iki ülke 1. ve 3. yaya
   dağıtıldı (aradaki en küçük mesafe 2·--kd3-g, ölçüldü: 3,22-3,85 disk
   çapı) ve üçüncü ülkenin iki diski dış yayda YARIM TUR arayla duruyor
   (0,51 tur = 45,9°, mesafe sabit 22,5 çap). Üç ülkenin hiçbiri bir yayla
   eşleşmiyor: dış yayda üç ülke birden var, iç yayda ikisi.
   Hangi ülkenin ikizinin dış yayda kaldığı da bir şey anlatmıyor — bugünkü
   sahnede de Dubai iç yayda değildi, dağılım oradan devralındı.

   `gec` · turun kesri. CSS'te `calc(--kd3-faz * --kd3-t)` ile negatif
   animation-delay'e çevriliyor, yani sayı burada birimsiz kalıyor ve periyot
   tek yerde (CSS) duruyor. Bir yayın içindeki kesirler eşit değil (iç yayda
   0,28 · 0,22 · 0,26 · 0,24): eşit aralık sahneyi cetvele çeviriyor.

   `aci` · YALNIZCA HAREKET KAPALIYKEN görünen duruş açısı; hareket açıkken
   keyframe kendi süpürme aralığını sürüyor ve bu değeri eziyor. Değerler
   t=0 karesinin açıları, her yayın "her genişlikte tam görünür" penceresine
   sıkıştırılmış hâli (iç yay ×0,79 → ±19,8°, dış yay ×0,65 → ±29,3°): sıra
   ve tür dizilişi aynen korunuyor, yalnız hiçbir taşıyıcı sahne kutusunun
   altına ya da kartın dışına düşmüyor. Ölçüldü, duruşta dört genişlikte de
   on iki taşıyıcının on ikisi görünür, disk binmesi 0, yay içi "peş peşe
   aynı tür" 0.

   BÜTÜN SAHNEDE (soldan sağa) TÜR SIRASI NEDEN SIFIR DEĞİL. İki yay farklı
   hızda olmak zorunda (yoksa sahne tek parça kayan bir şerit) ve x = R·sinA
   olduğu için farklı yarıçaptaki iki taşıyıcının açısal sırası ile soldan
   sağa sırası aynı şey değil; ikisi zamanla birbirini kesiyor. Yani "bütün
   sahnede alternan" ancak tek bir yay dolu olsaydı ya da iki yay kilitli
   olsaydı sağlanırdı, ikisi de sahneyi bozuyor. Karşılığında sağlanan şey
   ölçülebilir ve göze görünen kısım: aynı türden iki taşıyıcı hiçbir karede
   2,6 disk çapından yakın düşmüyor, yani "yan yana iki uçak" ya da "yan yana
   iki bayrak" sahnede hiç oluşmuyor. */
type Yay = 1 | 3;

type Durak = {
  disk: { ulke: Country; gec: number; aci: number };
  ucak: { gec: number; aci: number };
};

const TAKIMYILDIZ: { yay: Yay; durak: Durak[] }[] = [
  {
    yay: 1,
    durak: [
      { disk: { ulke: "kktc", gec: 0.04, aci: -18 }, ucak: { gec: 0.3, aci: -8 } },
      { disk: { ulke: "ingiltere", gec: 0.54, aci: 2 }, ucak: { gec: 0.82, aci: 13 } },
    ],
  },
  {
    yay: 3,
    durak: [
      { disk: { ulke: "dubai", gec: 0.08, aci: -25 }, ucak: { gec: 0.23, aci: -16 } },
      { disk: { ulke: "ingiltere", gec: 0.34, aci: -9 }, ucak: { gec: 0.46, aci: -2 } },
      { disk: { ulke: "dubai", gec: 0.59, aci: 5 }, ucak: { gec: 0.73, aci: 13 } },
      { disk: { ulke: "kktc", gec: 0.83, aci: 19 }, ucak: { gec: 0.97, aci: 28 } },
    ],
  },
];

/* D1 · UÇAK DİSKİN ARKASINDA. İki koldan garanti: uçaklar DOM'da disklerden
   önce basılıyor (aşağıdaki iki düzleştirme) ve ayrıca CSS'te uçak z-index 1,
   disk z-index 2. Alternan dizilimde uçak-disk kesişmesi zaten olmuyor (ikisi
   aynı hızda, birbirlerini yakalamıyorlar) ama kural yerinde kalıyor: bedeli
   sıfır ve sıranın rastlantıya bırakılmaması bu turun bütün mantığı. */
const UCAKLAR = TAKIMYILDIZ.flatMap(({ yay, durak }) =>
  durak.map((d, i) => ({ yay, anahtar: `${yay}-${i}`, ...d.ucak })),
);
const DISKLER = TAKIMYILDIZ.flatMap(({ yay, durak }) =>
  durak.map((d, i) => ({ yay, anahtar: `${yay}-${i}`, ...d.disk })),
);

/* Taşıyıcının CSS değişkenleri. `--kd3-faz` BİRİMSİZ: gecikme CSS'te
   `calc(var(--kd3-faz) * var(--kd3-t))` ile kuruluyor, yani periyot burada
   hiç geçmiyor ve aynı yaydaki iki taşıyıcıya farklı periyot verilemiyor. */
function stil(gec: number, aci: number) {
  return { "--kd3-faz": `-${gec}`, "--kd3-a": `${aci}deg` } as React.CSSProperties;
}

export default function CtaDekUfuk() {
  return (
    <section className="kd3">
      <div className="container-o">
        <div className="kd3-kart">
          {/* --------------------------------------------------- gökyüzü
              Yıldız alanı SAHNENİN DEĞİL KARTIN katmanı: sahne kartın alt
              bandında duran, --kd3-h yüksekliğinde bir kutu, oysa yıldızlar
              kartın tamamını kaplamalı. İkisi ayrı olduğu için kayan yıldız
              da doğru yere düşüyor.

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
              Şirketinizi <span className="kd3-vurgu">bugün kuralım.</span>
            </h2>

            <div className="kd3-eylem">
              <SmartLink href="/basla" className="btn btn-primary">
                Kurulumu Başlat
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </div>
          </div>

          {/* ------------------------------------------------------ sahne
              GEOMETRİ CSS'TE. Üç yayın merkezi kartın ALTINDA, ortak bir
              noktada (.kd3-mrk); yaylar eş merkezli, yani hiçbir yerde
              kesişmiyorlar, yalnız yarıçapları --kd3-g kadar farklı.
              Taşıyıcılar da aynı çıpayı kullandığı için her genişlikte yayın
              tam üstünde duruyorlar. Sayılar ve neden o sayılar olduğu
              lab-ctadek-3.css'in başında yazılı.

              ÜÇ YAY DA ÇİZİLİYOR, TAŞIYICI YALNIZ İKİSİNDE. Orta yayın boş
              kalması Y2'nin yapısal çözümü, gerekçesi yukarıda ölçümüyle
              duruyor; yayın kendisi ölçüsüyle ve kesikli çizgisiyle aynen
              yerinde.

              BASIM SIRASI D1'İN İKİNCİ KOLU. Yaylar önce basılıyor (z-index
              yok, konumlu kardeşler arasında en altta kalıyorlar), sonra
              bütün uçaklar, en son bütün diskler. */}
          <div className="kd3-sahne" aria-hidden="true">
            <span className="kd3-mrk">
              <span className="kd3-yay kd3-yay-3" />
              <span className="kd3-yay kd3-yay-2" />
              <span className="kd3-yay kd3-yay-1" />

              {UCAKLAR.map((u) => (
                <span
                  key={u.anahtar}
                  className="kd3-tas kd3-tas--ucak"
                  data-yay={u.yay}
                  style={stil(u.gec, u.aci)}
                >
                  <Plane size={20} strokeWidth={1.9} aria-hidden="true" />
                </span>
              ))}

              {DISKLER.map((d) => (
                <span
                  key={d.anahtar}
                  className="kd3-tas kd3-tas--disk"
                  data-yay={d.yay}
                  style={stil(d.gec, d.aci)}
                >
                  {/* TUZAK H · Flag çıplak <svg viewBox="0 0 60 40"> basıyor,
                      width/height TAŞIMIYOR ve serbest bırakılırsa
                      300x150'ye şişiyor; iki sayfayı bozduğu ölçüldü. Kap
                      sabit px (--kd3-disk bir clamp, her zaman kesin
                      uzunluk) + overflow:hidden. Disk yayda İLERLEDİĞİ için
                      kural daha da kritik: şişen bir kap kartın dışına
                      savrulur. */}
                  <span className="kd3-bayrak">
                    <Flag country={d.ulke} />
                  </span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
