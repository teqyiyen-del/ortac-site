import { baeHesap, ingHesap } from "@/lib/tools/hesap";
import { formatAmount, formatPercent } from "@/lib/tools/num";
import { UAE_CT, UAE_VAT, UK_CT } from "@/lib/tools/rates";
import type { SicSatir } from "@/lib/tools/sic";
import { DURUM_ADI, type SirketKaydi } from "@/lib/tools/ukIsim";
import type { Rapor } from "@/lib/rapor";

/* ============================================================================
   ARAÇ ÇIKTILARININ RAPOR KURUCULARI

   18.09.2026 · Burak: "açıkta kalanlarla ilgili PDF rapor tasarımlarını bana
   tekrar at, ona göre entegre edelim, hepsinin tasarımını da yapabilirsin
   orada."

   Uygunluk testi 18.09 sabahı rapor şablonuna bağlanmıştı (FitTest.tsx);
   kalan altı araç burada. Her fonksiyon aracın KENDİ sonucunu alıp `Rapor`
   modeline çeviriyor — belge tasarımı tek yerde (components/rapor/RaporBelge)
   ve burada yalnız "hangi araç hangi bloğu doldurur" kararı var.

   ---------------------------------------------------------------- KURALLAR

   1) UYDURMA SAYI YOK. Bütün tutarlar aracın kendi hesabından geliyor
      (lib/tools/hesap.ts) ve oranlar tek kaynaktan (lib/tools/rates.ts).
      Fonksiyonlar girdiyi parametre olarak alıyor, içeride örnek üretmiyor.

   2) TEYİT DURUMU BELGEYE GİRİYOR. Oranların bir kısmı henüz mali müşavir
      onayından geçmedi (`ToolRate.confirmed`). Ekranda bunu sonucun altındaki
      satır söylüyor; PDF'te de söylemek zorunda, çünkü belge ekrandan kopup
      dolaşıyor. `teyitNotu()` bunu tek yerden basıyor.

   3) İÇ REFERANS YOK. Müşteriye giden belgede dosya adı, depo yolu ya da
      alan adı yazılmıyor (uygunluk testinde bir kez yazılmış ve o turda
      temizlenmişti). `kaynak` alanı yalnızca RESMÎ kaynağın adını taşıyor.

   4) ŞERH, TARİH VE ADRES ZORUNLU ve modelde değil BİLEŞENDE — araç unutamaz
      (bkz. lib/rapor.ts başlığı).
   ========================================================================= */

/** Oran teyit edilmemişse belgenin sonuna giren not. Ekrandaki cümlenin
 *  karşılığı; iki yerde iki ayrı metin olmasın diye tek yerde. */
function teyitNotu(...teyit: boolean[]): string | null {
  return teyit.some((t) => !t)
    ? "Oran ve eşikler resmî kaynaktan alındı; mali müşavir onayından henüz geçmedi."
    : null;
}

/* ===================================================== KURUMLAR VERGİSİ ===
   İki ülke, iki ayrı hesap mantığı, tek rapor kalıbı:
     künye (girdi) → sonuç (tek büyük sayı) → döküm tablosu → kural notu.
   BAE'de oran DİLİME uygulanıyor, İngiltere'de kârın TAMAMINA; tablo bu farkı
   olduğu gibi gösteriyor, çünkü belgeyi okuyan kişinin sorusu "bu sayı nasıl
   çıktı". */

export function raporKvDubai(kazanc: number): Rapor {
  const r = baeHesap(kazanc);
  const c = UAE_CT.currency;
  return {
    arac: "Dubai kurumlar vergisi hesaplayıcı",
    baslik: "Kurumlar vergisi ön hesabı · Dubai",
    ozet: `${formatAmount(kazanc)} ${c} vergiye tabi kazanç üzerinden hesaplanmıştır.`,
    yol: "/araclar/kurumlar-vergisi/dubai",
    kaynak: "BAE Federal Kurumlar Vergisi çerçevesi",
    bloklar: [
      {
        tip: "kunye",
        baslik: "Girdiğiniz değer",
        ikon: "hesap",
        satirlar: [
          { k: "Vergiye tabi kazanç", v: `${formatAmount(kazanc)} ${c}` },
          { k: "Eşik", v: `${UAE_CT.threshold.label} (${UAE_CT.lower.label})` },
          { k: "Eşik üstü oran", v: UAE_CT.upper.label },
        ],
      },
      {
        tip: "sonuc",
        baslik: "Ödenecek kurumlar vergisi",
        ikon: "sonuc",
        deger: `${formatAmount(r.tax)} ${c}`,
        alt: `Efektif oran ${formatPercent(r.effective)} · oran kazancın tamamına değil, eşiği aşan kısmına uygulanıyor.`,
      },
      {
        tip: "tablo",
        baslik: "Döküm",
        ikon: "belge",
        basliklar: ["Dilim", "Matrah", "Oran", "Vergi"],
        satirlar: [
          [
            `${UAE_CT.threshold.label} ve altı`,
            `${formatAmount(r.lowerBase)} ${c}`,
            UAE_CT.lower.label,
            `${formatAmount(r.lowerBase * UAE_CT.lower.value)} ${c}`,
          ],
          [
            "Eşiği aşan kısım",
            `${formatAmount(r.upperBase)} ${c}`,
            UAE_CT.upper.label,
            `${formatAmount(r.upperBase * UAE_CT.upper.value)} ${c}`,
          ],
          ["Toplam", `${formatAmount(kazanc)} ${c}`, "—", `${formatAmount(r.tax)} ${c}`],
        ],
      },
      {
        tip: "not",
        metin: [
          "Bu hesap bir vergi beyanı ya da vergi görüşü değildir. Kazancın vergiye tabi kısmının nasıl bulunduğu ayrı bir konudur; serbest bölge muafiyeti ve grup şirketi kuralları bu hesaba dahil değildir.",
          teyitNotu(UAE_CT.lower.confirmed, UAE_CT.upper.confirmed, UAE_CT.threshold.confirmed),
        ]
          .filter(Boolean)
          .join(" "),
      },
    ],
  };
}

export function raporKvIngiltere(kar: number): Rapor {
  const r = ingHesap(kar);
  const c = UK_CT.currency;
  const bantAdi =
    r.bant === "kucuk"
      ? `Küçük kâr oranı (${UK_CT.lower.label} ve altı)`
      : r.bant === "ana"
        ? `Ana oran (${UK_CT.upper.label} ve üstü)`
        : "İki sınır arasında · marjinal indirim";

  /* Döküm İKİ BANTTA İKİ FARKLI SATIR DİZİSİ: küçük kâr bandında marjinal
     indirim diye bir satır yok ve boş bir "0" satırı okuyucuyu yanıltırdı. */
  const satirlar: string[][] =
    r.bant === "kucuk"
      ? [[`Kâr × ${UK_CT.small.label}`, `${formatAmount(kar)} ${c}`, `${formatAmount(r.vergi)} ${c}`]]
      : [
          [`Kâr × ${UK_CT.main.label}`, `${formatAmount(kar)} ${c}`, `${formatAmount(r.anaVergi)} ${c}`],
          ...(r.indirim > 0
            ? [["Marjinal indirim", `${UK_CT.fraction.label}`, `− ${formatAmount(r.indirim)} ${c}`]]
            : []),
          ["Ödenecek", "—", `${formatAmount(r.vergi)} ${c}`],
        ];

  return {
    arac: "İngiltere kurumlar vergisi hesaplayıcı",
    baslik: "Kurumlar vergisi ön hesabı · İngiltere",
    ozet: `${formatAmount(kar)} ${c} vergiye tabi kâr üzerinden hesaplanmıştır.`,
    yol: "/araclar/kurumlar-vergisi/ingiltere",
    kaynak: "GOV.UK · Corporation Tax rates",
    bloklar: [
      {
        tip: "kunye",
        baslik: "Girdiğiniz değer",
        ikon: "hesap",
        satirlar: [
          { k: "Vergiye tabi kâr", v: `${formatAmount(kar)} ${c}` },
          { k: "Bant", v: bantAdi },
          { k: "Oranlar", v: `${UK_CT.small.label} · ${UK_CT.main.label}` },
        ],
      },
      {
        tip: "sonuc",
        baslik: "Ödenecek kurumlar vergisi",
        ikon: "sonuc",
        deger: `${formatAmount(r.vergi)} ${c}`,
        alt: `Efektif oran ${formatPercent(r.efektif)} · oran kârın tamamına uygulanıyor, iki sınır arasında marjinal indirim devreye giriyor.`,
      },
      { tip: "tablo", baslik: "Döküm", ikon: "belge", basliklar: ["Kalem", "Matrah", "Tutar"], satirlar },
      {
        tip: "not",
        metin: [
          "Bu hesap bir vergi beyanı ya da vergi görüşü değildir. İlişkili şirketler, on iki aydan kısa hesap dönemi ve grup kuralları bu hesaba dahil değildir; üçü de oranı ve indirimi değiştirebilir.",
          teyitNotu(UK_CT.small.confirmed, UK_CT.main.confirmed),
        ]
          .filter(Boolean)
          .join(" "),
      },
    ],
  };
}

/* ================================================================ KDV ===
   Aracın iki yönü var (dâhil / hariç) ve rapor hangi yönde hesaplandığını
   künyede söylüyor: aynı üç sayı iki farklı soruya ait olabilir. */
export function raporBaeKdv(tutar: number, dahil: boolean): Rapor {
  const oran = UAE_VAT.rate.value;
  const matrah = dahil ? tutar / (1 + oran) : tutar;
  const kdv = matrah * oran;
  const toplam = matrah + kdv;
  const c = "AED";
  return {
    arac: "BAE KDV hesaplayıcı",
    baslik: "KDV ön hesabı · Birleşik Arap Emirlikleri",
    ozet: dahil
      ? `${formatAmount(tutar, 2)} ${c} KDV dâhil tutarın içinden ayrıştırılmıştır.`
      : `${formatAmount(tutar, 2)} ${c} KDV hariç tutara eklenmiştir.`,
    yol: "/araclar/bae-kdv",
    kaynak: "BAE Federal Vergi Dairesi · KDV oranı",
    bloklar: [
      {
        tip: "kunye",
        baslik: "Girdiğiniz değer",
        ikon: "hesap",
        satirlar: [
          { k: "Tutar", v: `${formatAmount(tutar, 2)} ${c}` },
          { k: "Yön", v: dahil ? "KDV dâhil" : "KDV hariç" },
          { k: "Oran", v: UAE_VAT.rate.label },
        ],
      },
      {
        tip: "sonuc",
        baslik: "KDV",
        ikon: "sonuc",
        deger: `${formatAmount(kdv, 2)} ${c}`,
        alt: `Matrah ${formatAmount(matrah, 2)} ${c} · toplam ${formatAmount(toplam, 2)} ${c}`,
      },
      {
        tip: "tablo",
        baslik: "Döküm",
        ikon: "belge",
        basliklar: ["Kalem", "Tutar"],
        satirlar: [
          ["Matrah", `${formatAmount(matrah, 2)} ${c}`],
          [`KDV (${UAE_VAT.rate.label})`, `${formatAmount(kdv, 2)} ${c}`],
          ["Toplam", `${formatAmount(toplam, 2)} ${c}`],
        ],
      },
      {
        tip: "not",
        metin: [
          `Bu hesap kayıt zorunluluğunuz olup olmadığını söylemez. Zorunlu kayıt eşiği yıllık vergiye tabi tedarikte ${UAE_VAT.registration.label}; eşiğe hangi tutarların girdiği faaliyetinize bağlıdır.`,
          teyitNotu(UAE_VAT.rate.confirmed),
        ]
          .filter(Boolean)
          .join(" "),
      },
    ],
  };
}

/* ============================================================ SIC KODU ===
   Çıktı ARAMA SONUCU DEĞİL, kullanıcının defterine aldığı kodlar: tescil
   başvurusunda yazılacak liste bu. Arama sonucunu basmak belgeyi bir ekran
   dökümüne çevirirdi. */
export function raporSicKodu(secilenler: SicSatir[]): Rapor {
  return {
    arac: "İngiltere SIC kodu bulucu",
    baslik: "Seçtiğiniz SIC kodları",
    ozet:
      secilenler.length === 1
        ? "Tescil başvurusunda bir faaliyet kodu yazılacak."
        : `Tescil başvurusunda ${secilenler.length} faaliyet kodu yazılacak.`,
    yol: "/araclar/ingiltere-sic-kodu",
    kaynak: "Companies House · SIC 2007 listesi",
    bloklar: [
      {
        tip: "liste",
        baslik: "Defterdeki kodlar",
        ikon: "liste",
        maddeler: secilenler.map((s) => ({
          t: `${s.kod} — ${s.tanim}`,
          d: s.ozel ? `${s.bolum.ad} · Companies House'a özgü kod` : s.bolum.ad,
        })),
      },
      {
        tip: "not",
        metin:
          "Kod seçimi tescil başvurusunda beyan edilen faaliyeti belirler ve sonraki lisans, vergi ve raporlama işlerinin girdisi olur. Liste bir öneridir; başvuruda hangi kodun yazılacağı faaliyetin kendisine bağlıdır. Companies House başvuruda en çok dört kod kabul eder.",
      },
    ],
  };
}

/* ======================================================= ŞİRKET İSMİ ===
   Üretilen adaylar bir müsaitlik sonucu DEĞİL; belge bunu not olarak
   söylüyor, yoksa Ortac logolu bir kâğıt "bu isimler alınabilir" demiş gibi
   okunur. */
export function raporIsimUreteci(
  anahtar: string,
  sektor: string,
  uslup: string,
  adaylar: string[],
): Rapor {
  return {
    arac: "Şirket ismi üreteci",
    baslik: "Aday şirket isimleri",
    ozet: `“${anahtar}” anahtar kelimesinden ${adaylar.length} aday üretildi.`,
    yol: "/araclar/isim-ureteci",
    bloklar: [
      {
        tip: "kunye",
        baslik: "Girdileriniz",
        ikon: "cevap",
        satirlar: [
          { k: "Anahtar kelime", v: anahtar },
          { k: "Sektör", v: sektor },
          { k: "Üslup", v: uslup },
        ],
      },
      {
        tip: "liste",
        baslik: "Adaylar",
        ikon: "liste",
        maddeler: adaylar.map((a) => ({ t: a })),
      },
      {
        tip: "not",
        metin:
          "Bu liste bir müsaitlik sonucu değildir: isimlerin tescil edilebilir olup olmadığı ilgili sicilde ayrıca sorgulanır. İngiltere için sorgulama aracımız var; Dubai ve KKTC'de isim onayı başvurunun kendi adımıdır.",
      },
    ],
  };
}

/* ============================================== İNGİLTERE İSİM SORGUSU ===
   Tek araç sunucuya çıkıyor ve cevabı Companies House veriyor. Rapor o
   cevabın kaydı: ne arandı, kaç kayda bakıldı, ne bulundu. Tarih burada
   ayrıca önemli — sicil her gün değişiyor ve belge bir gün sonra eskiyor. */
export function raporIsimSorgu(
  sorgu: string,
  bicim: string,
  bakilan: number,
  ayni: SirketKaydi[],
  benzer: SirketKaydi[],
): Rapor {
  const kayitSatiri = (k: SirketKaydi) => ({
    t: k.ad,
    d: [
      `Şirket no ${k.numara}`,
      DURUM_ADI[k.durum] ?? k.durum,
      k.kurulus ? `kuruluş ${k.kurulus}` : null,
    ]
      .filter(Boolean)
      .join(" · "),
  });

  const bloklar: Rapor["bloklar"] = [
    {
      tip: "kunye",
      baslik: "Sorgu",
      ikon: "cevap",
      satirlar: [
        { k: "Aranan isim", v: sorgu },
        { k: "Karşılaştırma biçimi", v: bicim },
        { k: "Bakılan kayıt", v: `${bakilan}` },
      ],
    },
    {
      tip: "sonuc",
      baslik: "Sonuç",
      ikon: "sonuc",
      deger:
        ayni.length === 0
          ? "Aynı sayılabilecek kayıt bulunamadı"
          : `${ayni.length} kayıt aynı sayılabilir`,
      alt:
        benzer.length > 0
          ? `Ayrıca ${benzer.length} benzer kayıt listelendi.`
          : "Benzer kayıt listelenmedi.",
    },
  ];

  if (ayni.length > 0) {
    bloklar.push({
      tip: "liste",
      baslik: "Aynı sayılabilecek kayıtlar",
      ikon: "uyari",
      maddeler: ayni.map(kayitSatiri),
    });
  }
  if (benzer.length > 0) {
    bloklar.push({
      tip: "liste",
      baslik: "Benzer kayıtlar",
      ikon: "liste",
      maddeler: benzer.map(kayitSatiri),
    });
  }
  bloklar.push({
    tip: "not",
    metin:
      "Bu sorgu Companies House'un arama sonuçlarına bakar ve bir isim onayı değildir. Tescil sırasında uygulanan “aynı sayılan isim” kuralları ile korunan ve hassas kelime listeleri ayrıca değerlendirilir. Sicil her gün değişir; belgenin tarihi bu yüzden önemlidir.",
  });

  return {
    arac: "İngiltere şirket ismi sorgulama",
    baslik: "Şirket ismi sorgu sonucu",
    ozet: `“${sorgu}” ismi Companies House kayıtlarında arandı.`,
    yol: "/araclar/ingiltere-isim-sorgulama",
    kaynak: "Companies House · şirket arama servisi",
    bloklar,
  };
}
