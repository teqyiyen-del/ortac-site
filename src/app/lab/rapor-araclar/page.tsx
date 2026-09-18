import type { Metadata } from "next";

import RaporOnizleme from "@/components/lab/RaporOnizleme";
import { FIT_QUESTIONS } from "@/lib/fitTest";
import type { Rapor } from "@/lib/rapor";
import { SECTOR_BY_KEY, TONES, generateNames } from "@/lib/tools/names";
import {
  raporBaeKdv,
  raporIsimSorgu,
  raporIsimUreteci,
  raporKvDubai,
  raporKvIngiltere,
  raporSicKodu,
} from "@/lib/tools/raporlar";
import { sicAra } from "@/lib/tools/sic";

/* /lab/rapor-araclar — yedi aracın PDF raporu.

   18.09.2026 · Burak: "açıkta kalanlarla ilgili PDF rapor tasarımlarını bana
   tekrar at, ona göre entegre edelim, hepsinin tasarımını da yapabilirsin
   orada."

   Uygunluk testinin raporu 18.09 sabahı canlıya alınmıştı; kalan altı araç
   burada, hepsi aynı şablonla (components/rapor/RaporBelge · lib/rapor.ts).
   Sayfa kâğıdı GERÇEK ÖLÇÜDE (210 mm) kurup ekrana sığacak kadar küçültüyor,
   yani görünen satır kırılmaları PDF'teki ile aynı.

   SAYILAR UYDURMA DEĞİL. Her önizleme aracın KENDİ hesabıyla üretiliyor:
   kurumlar vergisi ve KDV lib/tools/hesap.ts + rates.ts'ten, SIC kodları
   sicAra()'dan, aday isimler generateNames()'ten. Bu sayfadaki tek elle
   yazılmış şey GİRDİLER (örnek kazanç, örnek anahtar kelime) ve her bloğun
   başında yazılı.

   İSİM SORGUSU BOŞ SONUÇLA gösteriliyor ve bu bilinçli: o aracın cevabı
   Companies House'tan geliyor, elimizde gerçek bir kayıt yok ve Ortac logolu
   bir belgeye uydurma şirket kaydı yazılmaz. Eşleşme bulunduğunda çıkan liste
   bloğu, SIC raporundaki listeyle aynı blok. */

export const metadata: Metadata = {
  title: "Araç raporları · PDF tasarımı | Ortac Global",
  robots: { index: false, follow: false },
};

/* ---- örnek girdiler; tek elle yazılan yer burası ---- */
const KV_DUBAI_KAZANC = 1_200_000;
const KV_ING_KAR = 180_000;
const KDV_TUTAR = 24_500;
const SIC_SORGU = "yazılım";
const ISIM_ANAHTAR = "atlas";

const sicSecim = sicAra(SIC_SORGU).satirlar.slice(0, 3);
const isimAdaylari = generateNames(ISIM_ANAHTAR, "yazilim", "kurumsal", 0);

/* Uygunluk testinin raporu canlıda FitTest içinde kuruluyor (ekrandaki
   cevaplardan). Kıyas için buraya aynı şablonun bir örneği giriyor: ilk üç
   soru cevaplanmış, kalanlar boş — tasarım aynı, veri örnektir. */
const UYGUNLUK_ORNEK: Rapor = {
  arac: "Ülke uygunluk testi",
  baslik: "Ülke uygunluk ön değerlendirmesi",
  ozet: "İngiltere öne çıkıyor.",
  yol: "/uygunluk-testi",
  kaynak: `Puanlama: ${FIT_QUESTIONS.length} sorunun ağırlıklı toplamı`,
  bloklar: [
    {
      tip: "sira",
      baslik: "Sıralama",
      ikon: "siralama",
      satirlar: [
        { ulke: "ingiltere", ad: "İngiltere", deger: "19 puan" },
        { ulke: "dubai", ad: "Dubai", deger: "14 puan" },
        { ulke: "kktc", ad: "KKTC", deger: "3 puan" },
      ],
    },
    {
      tip: "liste",
      baslik: `Cevaplarınız (${FIT_QUESTIONS.length})`,
      ikon: "cevap",
      maddeler: FIT_QUESTIONS.map((q, i) => ({
        t: q.q,
        d: i < 3 ? q.options[0].label : "Cevaplanmadı",
      })),
    },
    {
      tip: "not",
      metin:
        "Bu sıralama bir kısa liste aracıdır: hangi yapının işinize yaradığı faaliyetinize, mukimliğinize ve gelir türünüze bağlı ve teyit gerektirir.",
    },
  ],
};

const ADAYLAR: { ad: string; not: string; girdi: string[]; rapor: Rapor; canli?: boolean }[] = [
  {
    ad: "1 · Ülke uygunluk testi",
    not: "Canlıda olan tek rapor. Bayraklı sıralama + cevap dökümü; kalan altısı bu şablonun aynısını kullanıyor.",
    girdi: ["Örnek: ilk üç soru cevaplanmış"],
    rapor: UYGUNLUK_ORNEK,
    canli: true,
  },
  {
    ad: "2 · Dubai kurumlar vergisi",
    not: "Künye (girdi) → tek büyük sonuç → dilim dökümü → kural notu. Dökümün işi “bu sayı nasıl çıktı” sorusunu cevaplamak: oran kazancın tamamına değil, eşiği aşan kısmına uygulanıyor ve tablo bunu satır satır gösteriyor.",
    girdi: [`Vergiye tabi kazanç: ${KV_DUBAI_KAZANC.toLocaleString("tr-TR")} AED`],
    rapor: raporKvDubai(KV_DUBAI_KAZANC),
  },
  {
    ad: "3 · İngiltere kurumlar vergisi",
    not: "Aynı kalıp, farklı mantık: oran kârın tamamına uygulanıp iki sınır arasında marjinal indirim düşülüyor. Döküm küçük kâr bandında tek satır, arada üç satır — boş bir “0 indirim” satırı okuyucuyu yanıltırdı.",
    girdi: [`Vergiye tabi kâr: ${KV_ING_KAR.toLocaleString("tr-TR")} GBP`],
    rapor: raporKvIngiltere(KV_ING_KAR),
  },
  {
    ad: "4 · BAE KDV",
    not: "Künyede yön yazılı (dâhil / hariç): aynı üç sayı iki farklı soruya ait olabilir. Not, kayıt zorunluluğu eşiğini söylüyor ama “kayıt olmalısınız” demiyor.",
    girdi: [`Tutar: ${KDV_TUTAR.toLocaleString("tr-TR")} AED`, "Yön: KDV hariç"],
    rapor: raporBaeKdv(KDV_TUTAR, false),
  },
  {
    ad: "5 · İngiltere SIC kodu",
    not: "Çıktı arama sonucu değil, kullanıcının DEFTERİNE aldığı kodlar — tescil başvurusunda yazılacak liste bu. Arama sonucunu basmak belgeyi ekran dökümüne çevirirdi.",
    girdi: [`Arama: “${SIC_SORGU}”`, "Defterdeki ilk üç kod"],
    rapor: raporSicKodu(sicSecim),
  },
  {
    ad: "6 · Şirket ismi üreteci",
    not: "Aday listesi + girdi künyesi. Not önemli: bu liste bir müsaitlik sonucu DEĞİL, yoksa Ortac logolu kâğıt “bu isimler alınabilir” demiş gibi okunur.",
    girdi: [`Anahtar: “${ISIM_ANAHTAR}”`, "Sektör: Yazılım ve teknoloji", "Üslup: Kurumsal"],
    rapor: raporIsimUreteci(
      ISIM_ANAHTAR,
      SECTOR_BY_KEY.yazilim?.label ?? "Yazılım",
      TONES[0].label,
      isimAdaylari,
    ),
  },
  {
    ad: "7 · İngiltere şirket ismi sorgulama",
    not: "Sorgu künyesi + sonuç + not. Eşleşme çıktığında araya “aynı sayılabilecek kayıtlar” ve “benzer kayıtlar” listeleri giriyor (5 numaradaki liste bloğunun aynısı). Burada boş sonuçla gösteriliyor: cevap Companies House'tan geliyor ve Ortac logolu bir belgeye uydurma şirket kaydı yazılmaz.",
    girdi: ["Aranan isim: “Ortac Global”", "Sonuç: eşleşme yok"],
    rapor: raporIsimSorgu("Ortac Global", "ORTACGLOBAL", 20, [], []),
  },
];

export default function RaporAraclarLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · araç raporları</span>
        <h1>Yedi aracın PDF raporu</h1>
        <p>
          Uygunluk testinin raporu canlıda; kalan <b>altısı burada</b>, hepsi aynı şablonla. Her
          kâğıt gerçek ölçüde (210 mm) kurulup ekrana sığacak kadar küçültülüyor — yani gördüğün
          satır kırılmaları ve sayfa doluluğu <b>PDF&apos;teki ile aynı</b>.
        </p>
        <p>
          <b>Sayılar uydurma değil:</b> her önizleme aracın kendi hesabıyla üretiliyor. Elle
          yazılan tek şey girdiler ve her bloğun başında yazılı.
        </p>
        <p>
          Beğenirsen araçlara bağlarım: her araç sonucun altına bir &quot;Raporu indir (PDF)&quot;
          düğmesi alır, tıklayınca tarayıcının yazdırma penceresi açılır ve &quot;PDF olarak
          kaydet&quot; ile iner. Sunucu tarafı yok.
        </p>
      </div>

      {ADAYLAR.map((a) => (
        <section key={a.ad} className="lra-blok">
          <div className="container-o">
            <p className="lra-etiket">
              {a.ad}
              {a.canli ? " · canlıda" : ""}
            </p>
            <p className="lra-not">{a.not}</p>
            <p className="lra-girdi">
              {a.girdi.map((g) => (
                <span key={g}>
                  <b>Girdi</b> {g}
                </span>
              ))}
            </p>
            <RaporOnizleme rapor={a.rapor} />
          </div>
        </section>
      ))}
    </main>
  );
}
