import type { Metadata } from "next";

import CountryStructures from "@/components/CountryStructures";
import Repatriation from "@/components/Repatriation";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* /lab/secenek — iki bölümün seçenek tasarımı.

   18.09.2026 · Burak iki yer gösterdi:
     · "kazancınızı Türkiye'ye nasıl getiriyorsunuz kısmında 3 tane seçenek
       var, onların tasarımı şu an sitenin geri kalanına pek uymuyor."
     · "girişte şu an bir önce yapıyı seçiyoruz kısmı … giriş için çok
       kalabalık duruyor sanki."

   İki ayrı soru olduğu için sayfa ikiye bölünmüş durumda. Adaylar CANLI
   BİLEŞENLERİN KENDİSİNİ basıyor; css/lab-secenek.css yalnız düzen ve yüzey
   bildiren satırları eziyor, yani içerik ve davranış birebir canlıdaki.

   YAPI ADAYLARINDA GÖRÜNÜR YÜZDEN ÇIKAN SATIRLAR GİZLENİYOR, SİLİNMİYOR:
   soru "bu bölümde ne kalsın" ve cevabı görmek için satırın yokluğunu görmek
   gerekiyor. Kazanan canlıya alınırken çıkan satır silinmeyecek, bir açılırın
   içine girecek — muhasebe sayfasında aynı karar bu turda verildi. */

export const metadata: Metadata = {
  title: "Seçenek tasarımı · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

const PARA = [
  {
    kod: "bugun",
    ad: "Bugün · canlıdaki hâli",
    not: "Seçili seçenek kutu gibi duruyor, seçili olmayan ikisi çıplak metin: ne kenarlık ne zemin. Üç seçenek üç ayrı malzeme gibi okunuyor, oysa üçü de aynı şey — bir seçim.",
  },
  {
    kod: "p1",
    ad: "P1 · Üçü de kutu",
    not: "İhtiyaç bulucunun gece seçenekleriyle birebir aynı dil: kırık siyah kutu, ince çizgi, seçili olan koyu mavi. Yarı saydam gri de kalktı (bu depoda gece yüzeylerde alfa yok).",
  },
  {
    kod: "p2",
    ad: "P2 · Numara dairede",
    not: "P1'in üstüne tek fark: sıra numarası daire içinde — geçiş hattındaki durak numarasının aynısı. Üç yol aynı ailenin üyesi gibi okunuyor.",
  },
];

const YAPI = [
  {
    kod: "bugun",
    ad: "Bugün · canlıdaki hâli",
    not: "Görünür yüzde: başlık, iki satır giriş, tam genişlikte “Karar kuralı” bandı, harita ve iki kartın her birinde künye + ad + iki satır tarif + “Dikkat” satırı.",
  },
  {
    kod: "y1",
    ad: "Y1 · Dikkat satırı açılırda",
    not: "En küçük müdahale: kartın “Dikkat” satırı görünür yüzden çıkıyor. Karar kuralı bandı ve tarif duruyor.",
  },
  {
    kod: "y2",
    ad: "Y2 · Karar kuralı da giriyor",
    not: "Y1'in üstüne: tam genişlikteki “Karar kuralı” bandı da çıkıyor. Cümlenin kendisi bölüm girişine üçüncü satır olarak taşınabilir.",
  },
  {
    kod: "y3",
    ad: "Y3 · Sadece seçim",
    not: "En sade uç: kartta yalnız künye, ad ve işaret kalıyor. Bölüm bir “seçim” oluyor, bir “anlatım” değil; ayrıntının tamamı seçtikten sonra açılan panelde zaten var.",
  },
];

export default function SecenekLab() {
  /* Dubai'nin yapı bloğu veride her zaman dolu; tip isteğe bağlı olduğu için
     kontrol ediliyor ve yoksa bölüm hiç basılmıyor. */
  const yapi = COUNTRY_CONTENT.dubai.structures;
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · seçenek tasarımı</span>
        <h1>İki bölümün seçenekleri</h1>
        <p>
          Üstte <b>üç yol</b> (kazancı Türkiye&apos;ye getirme), altta <b>yapı seçimi</b>. İkisi de
          canlı bileşenin kendisi; değişen yalnız düzen ve yüzey.
        </p>
        <p>
          Yapı adaylarında görünür yüzden çıkan satırlar <b>gizleniyor, silinmiyor</b>: soru &quot;bu
          bölümde ne kalsın&quot; ve cevabı görmek için satırın yokluğunu görmek gerekiyor. Kazanan
          canlıya alınırken çıkan satır bir açılırın içine girecek.
        </p>
      </div>

      {PARA.map((a) => (
        <section key={a.kod} className="lsc-blok">
          <div className="container-o lsc-kunye">
            <p className="lsc-etiket">{a.ad}</p>
            <p className="lsc-not">{a.not}</p>
          </div>
          <div data-secenek={a.kod}>
            <Repatriation id={`para-${a.kod}`} />
          </div>
        </section>
      ))}

      {YAPI.map((a) => (
        <section key={a.kod} className="lsc-blok">
          <div className="container-o lsc-kunye">
            <p className="lsc-etiket">{a.ad}</p>
            <p className="lsc-not">{a.not}</p>
          </div>
          <div data-yapi={a.kod}>
            {yapi && <CountryStructures data={yapi} id={`yapi-${a.kod}`} />}
          </div>
        </section>
      ))}
    </main>
  );
}
