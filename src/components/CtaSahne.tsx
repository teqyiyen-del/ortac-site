import { Plane } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import type { Country } from "@/lib/store";

/* KAPANIŞ CTA'SININ SAHNESİ (.kcta-) · CSS: app/css/kapanis-cta.css
   Ortak bir merkeze bağlı üç yay, üstlerinde ilerleyen bayrak diskleri ve
   uçaklar. Kartın kendisi, metni ve düğmesi Footer.tsx · Ft2Cta'da; burada
   yalnız sahne var.

   NEREDEN GELDİ. /lab/cta2 turunun kazananı K3 (Ufuk). Müşteri: "cta yı artık
   live alabilirsin kral." Lab dosyaları (components/lab/CtaDekUfuk.tsx ·
   css/lab-ctadek-3.css) KAYIT OLARAK DURUYOR, silinmedi.

   LAB ÖNEKİ (.kd3-) CANLIYA GELMEDİ. lab-ctadek-3.css hâlâ globals.css'in
   @import bloğunda ve canlı CSS'ten SONRA okunuyor; aynı adları kullanmak
   labdaki bir düzenlemenin canlıyı sessizce değiştirmesi demekti. Bu depoda
   yaşandı, MT16 taşınırken .kmt- öneki tam bu yüzden açılmıştı. Burada YENİ
   önek de açılmadı: kapanış CTA'sının canlı ad alanı zaten .kcta- ve blok
   aynı blok. Gerekçenin tamamı kapanis-cta.css'in başında.

   BU DOSYA NEDEN AYRI. Footer.tsx site dizininin kendisi; on iki taşıyıcılık
   takımyıldız tablosunu oraya koymak iki ayrı işi tek dosyaya sıkıştırırdı.
   Sahne kendi dosyasında, CSS'i kapanış CTA'sının dosyasında.

   ---------------------------------------------------------------- TAKIMYILDIZ
   BİR YAY = BİR TAKIMYILDIZ. Yayın bütün taşıyıcıları tek periyodu paylaşıyor
   (periyot CSS'te, [data-yay] kuralında) ve aralarındaki açı hiç değişmiyor.
   Müşterinin üç şikâyetini yapısal olarak çözen kural bu:

     Y1 · hiçbir iki ülke diski üst üste binmeyecek,
     Y2 · aynı ülkenin iki diski birbirine yakın durmayacak,
     Y3 · açısal sırada uçak ve disk SIRAYLA gelecek.

   İki taşıyıcının birbirine göre konumu ancak açısal hızları EŞİTSE sabit
   kalır; "şimdilik düzgün duruyorlar" bir ölçüm penceresinin dışında
   hükümsüz. Süpürme genişliği zaten yay başına tek (--kcta-w), periyot da
   tek olunca ω = 2w/T eşitleniyor ve o yay rijit bir takımyıldız oluyor:
   ne biniyorlar, ne yaklaşıyorlar, ne sıra değiştiriyorlar.

   TUZAK K YANLIŞ OKUNMASIN. Aynı yaydaki taşıyıcıların aynı periyodu
   paylaşması KASITLI senkron ve kısıtın kendisi; tuzak K farklı ögelerin
   YANLIŞLIKLA senkronlanmasına karşı. Asallık şartı yaylar ARASINDA sürüyor.

   `yay` TİPİNDE 2 YOK. Orta yay bilerek taşıyıcısız: aynı ülkenin iki diski
   komşu yaylara düşerse aralarındaki en küçük mesafe --kcta-g olur (1440'ta
   72 px = 1,9 disk çapı) ve yaylar farklı hızda olduğu için o hizalanma
   kaçınılmaz. Diskler yalnız 1. ve 3. yaya konunca mesafe 2·--kcta-g'ye
   çıkıyor ve Y2 yapısal olarak çözülüyor. Değer tipte olmadığı için orta
   yaya taşıyıcı "yanlışlıkla" konamıyor; koymak isteyen önce tipi, sonra
   CSS'te eksik [data-yay="2"] kuralını yazmak zorunda ve o an bu kararı
   görüyor. Yayın kendisi (ölçü, renk, kesik) aynen çiziliyor.

   `durak` DİZİSİ TÜR SIRASINI TİPTEN ALIYOR. Her durak bir disk VE bir uçak
   taşıyor; bileşen önce durağın diskini, sonra uçağını açısal sıraya
   koyuyor. Yani dizide "peş peşe iki uçak" ifade EDİLEMİYOR — Y3 bir ölçüm
   değil, yazılamayacak bir şey.

   ÜLKE DAĞILIMI. İki ülke 1. ve 3. yaya dağıtıldı (aradaki en küçük mesafe
   2·--kcta-g), üçüncü ülkenin iki diski dış yayda yarım tur arayla duruyor
   (0,51 tur = 45,9°, mesafe sabit 22,5 çap). Üç ülkenin hiçbiri bir yayla
   eşleşmiyor: sahne hiçbir şey anlatmamalı, "iç yay hangi ülke" diye bir
   hiyerarşi ima etmemeli.

   `gec` · turun kesri, BİRİMSİZ. CSS'te `calc(--kcta-faz * --kcta-t)` ile
   negatif animation-delay'e çevriliyor, yani periyot tek yerde (CSS,
   [data-yay] kuralı) duruyor ve aynı yaya iki farklı periyot YAZILAMIYOR.
   Bir yayın içindeki kesirler eşit değil (iç yayda 0,28 · 0,22 · 0,26 ·
   0,24): eşit aralık sahneyi cetvele çeviriyor.

   `aci` · YALNIZCA HAREKET KAPALIYKEN görünen duruş açısı; hareket açıkken
   keyframe kendi süpürme aralığını sürüyor ve bu değeri eziyor. Değerler
   t=0 karesinin açıları, her yayın "her genişlikte tam görünür" penceresine
   sıkıştırılmış hâli (iç yay ×0,79 → ±19,8°, dış yay ×0,65 → ±29,3°).

   YÖN YAPISAL OLARAK TEK. `yon` diye bir alan YOK, `data-yon` YOK, CSS'te
   `animation-direction` YOK: sola gitmek ifade edilemiyor. Müşteri tek yönü
   beğendi ("tamam şimdi daha iyi hepsi aynı yöne akıyor diye") ve kural
   ölçülecek değil yazılamayacak bir şey. */
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
   sıfır ve sıranın rastlantıya bırakılmaması bu sahnenin bütün mantığı. */
const UCAKLAR = TAKIMYILDIZ.flatMap(({ yay, durak }) =>
  durak.map((d, i) => ({ yay, anahtar: `${yay}-${i}`, ...d.ucak })),
);
const DISKLER = TAKIMYILDIZ.flatMap(({ yay, durak }) =>
  durak.map((d, i) => ({ yay, anahtar: `${yay}-${i}`, ...d.disk })),
);

/* Taşıyıcının CSS değişkenleri. `--kcta-faz` BİRİMSİZ: gecikme CSS'te
   `calc(var(--kcta-faz) * var(--kcta-t))` ile kuruluyor, yani periyot burada
   hiç geçmiyor ve aynı yaydaki iki taşıyıcıya farklı periyot verilemiyor. */
function stil(gec: number, aci: number) {
  return { "--kcta-faz": `-${gec}`, "--kcta-a": `${aci}deg` } as React.CSSProperties;
}

/** Kapanış CTA'sının alt bandı · üç yay ve on iki taşıyıcı.
 *
 *  GEOMETRİ CSS'TE. Üç yayın merkezi kartın ALTINDA, ortak bir noktada
 *  (.kcta-mrk); yaylar eş merkezli, yani hiçbir yerde kesişmiyorlar, yalnız
 *  yarıçapları --kcta-g kadar farklı. Taşıyıcılar da aynı çıpayı kullandığı
 *  için her genişlikte yayın tam üstünde duruyorlar.
 *
 *  BASIM SIRASI D1'İN İKİNCİ KOLU: önce yaylar (z-index yok, konumlu
 *  kardeşler arasında en altta), sonra bütün uçaklar, en son bütün diskler.
 *
 *  Sahnenin tamamı aria-hidden: içinde okunacak bir bilgi yok, ekran
 *  okuyucuya yalnız gürültü olur. */
export default function CtaSahne() {
  return (
    <div className="kcta-sahne" aria-hidden="true">
      <span className="kcta-mrk">
        <span className="kcta-yay kcta-yay-3" />
        <span className="kcta-yay kcta-yay-2" />
        <span className="kcta-yay kcta-yay-1" />

        {UCAKLAR.map((u) => (
          <span
            key={u.anahtar}
            className="kcta-tas kcta-tas--ucak"
            data-yay={u.yay}
            style={stil(u.gec, u.aci)}
          >
            <Plane size={20} strokeWidth={1.9} aria-hidden="true" />
          </span>
        ))}

        {DISKLER.map((d) => (
          <span
            key={d.anahtar}
            className="kcta-tas kcta-tas--disk"
            data-yay={d.yay}
            style={stil(d.gec, d.aci)}
          >
            {/* TUZAK H · Flag çıplak <svg viewBox="0 0 60 40"> basıyor,
                width/height TAŞIMIYOR ve serbest bırakılırsa 300x150'ye
                şişiyor; iki sayfayı bozduğu ölçüldü. Kap sabit px
                (--kcta-disk bir clamp, her zaman kesin uzunluk) +
                overflow:hidden. Disk yayda İLERLEDİĞİ için kural daha da
                kritik: şişen bir kap kartın dışına savrulur. */}
            <span className="kcta-bayrak">
              <Flag country={d.ulke} />
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
