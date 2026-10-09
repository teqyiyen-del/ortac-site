/* ============================================================================
   DUBAİ · VERGİ DANIŞMANLIĞI — sayfanın bütün metni ve ortak veri biçimi
   Sayfa: app/dubai/vergi/page.tsx · Gövde: components/services/VergiSayfa.tsx
   Biçim: css/svc-vergi.css (.svr-)

   09.10.2026 · İLK YAZIM. Burak: "Vergi danışmanlığına geliyorum, bir şey yok.
   Üç dört kart koymuşsun, bitmiş. Banka, şirket kuruluşu, muhasebe çok güzel
   oldu: SVG görseller var, animasyonlar var. Bunları da öyle doldur." Sayfa o
   güne kadar genel hizmet şablonundan (lib/hizmetIcerik.ts · vergi) basılıyordu:
   üç kart, dört kural, dört adım, dört soru. Şimdi on durak; biçim üç ülkede
   ortak (lib/vergiIngiltere.ts · lib/vergiKktc.ts aynı tipi dolduruyor).

   FİYAT YOK. Bu hizmet ayrı satılmıyor; giriş düğmesi "İletişime geçin".
   lib/pricing.ts'e dokunulmadı.

   ------------------------------------------------------------ KAYNAK DÜZENİ
     [RESMÎ]   docs/bae-mevzuat.md (15.09.2026, tax.gov.ae · mof.gov.ae):
               oranlar ve eşik (D·8), kayıt süresi (D·8), beyan süresi (D·9),
               KDV eşik ve süreleri (C·5), cezalar (C·7, D·8), küçük işletme
               indirimi (D·10), serbest bölge şirketinin yükümlülükleri (B·4).
     [ONAYLI]  sitede yayında olan cümle: countryContent.ts · dubai · tax,
               hizmetIcerik.ts · DUBAI · vergi (eski sayfanın metni).
     [TEYİT]   docs/teyit-cevaplar-1.md · Dubai kuruluş 3 ("%0 neredeyse
               imkânsız … oran %9, ilk 375.000 AED muaf"), muhasebe 9
               (kişisel gelir vergisi yok).

   BİLEREK YUMUŞATILANLAR
     · Serbest bölgenin %0'ı: Murat Bey "akıl karıştırmak istemem" dedi. Sayfa
       oranı ANLATMIYOR; yalnız "otomatik değil, ağır şartlara bağlı" diyor
       (hata kartı ve bir soru). Şartların listesi docs/bae-mevzuat.md · B·4.
     · Kâr payının Türkiye'deki vergisi: açık soru (teyit · Dubai kuruluş 5,
       mali müşavir). Sayfa oran ya da istisna söylemiyor; "mukim olduğunuz
       ülkenin kuralı işliyor" diyor.
     · Küçük işletme indiriminin bitiş tarihi: MoF haberi okundu, kararın tam
       metni okunmadı (mevzuat notu · D·10). Cümle "bugünkü düzenlemeye göre".
     · Kurumlar vergisi ceza tablosunun (CD 75/2023) 2025-2026'da değişmediği
       birincil kaynaktan kesinleştirilemedi; rakamlar notun okunduğu günkü.
     · Firmanın FTA vergi temsilcisi sicilinde olup olmadığı bilinmiyor
       (docs/teslim/bilgi-ve-murat.md); "vergi ajanı" denmiyor.
   ========================================================================= */

import type { Faq } from "@/lib/countryContent";

export type VergiIkon =
  | "yuzde"
  | "terazi"
  | "kisi"
  | "dosya"
  | "takvim"
  | "kalkan"
  | "harita"
  | "ara"
  | "kasa"
  | "sirket"
  | "kure"
  | "defter"
  | "banka"
  | "kurulus"
  | "hesap"
  | "saat"
  | "para"
  | "fatura"
  | "kimlik"
  | "pusula";

/* Renk kuralı (hafıza: renk-anlam-kurali): ağırlık mavide, yeşil yalnız para
   ve "vergi çıkmıyor", amber şart / risk / ceza. */
export type VergiTon = "mavi" | "yesil" | "amber";

/** ÇERÇEVE GÖRSELİ · ülkeye göre üç ayrı çizim:
 *   esik   kaydırıcılı hesap: kârın eşiğe kadar olan kısmı %0, üstü tek oran
 *          (Dubai; services/VergiHesap)
 *   egri   kâra göre değişen oran eğrisi (İngiltere; country/VergiGrafik,
 *          ülke sayfasında yayında olan bileşen)
 *   ayrim  aynı şirket, iki müşteri, iki sonuç (KKTC Serbest Liman) */
export type VergiGorsel =
  | { tur: "esik"; baslik: string; birim: string; esik: number; oran: number; max: number; adim: number; varsayilan: number; arac?: { label: string; href: string } }
  | { tur: "egri"; baslik: string }
  | {
      tur: "ayrim";
      kaynak: { ad: string; alt: string };
      yollar: { etiket: string; deger: string; line: string; ton: "yesil" | "amber" }[];
    };

export type VergiMadde = { icon: VergiIkon; title: string; line: string };

/** Yıl halkasındaki işaret: hangi aylar, hangi tonda (1 = Ocak). */
export type VergiIsaret = { ad: string; ton: "ana" | "ara" | "yesil"; aylar: number[] };

export type VergiVeri = {
  ulke: string;
  /** adres ve künye (JSON-LD) */
  yol: string;
  seo: { title: string; description: string };
  hero: { crumb: string; title: string; accent: string; lead: string; cta: { label: string; href: string }; trust: { icon: VergiIkon; line: string }[] };
  cerceve: {
    id: string; heading: string; accent: string; lead: string;
    gorsel: VergiGorsel;
    kartlar: { deger: string; etiket: string; line: string; ton?: VergiTon }[];
  };
  kapsam: {
    id: string; heading: string; accent: string; lead: string;
    items: VergiMadde[];
    haric: { baslik: string; items: string[] };
  };
  takvim: {
    id: string; heading: string; accent: string; lead: string;
    /** halkanın ortasındaki iki satır: hangi şirket için çizildi */
    ornek: { ust: string; alt: string };
    isaretler: VergiIsaret[];
    kalemler: { sure: string; ne: string; kural: string; ceza?: string }[];
  };
  turkiye: {
    id: string; heading: string; accent: string; lead: string;
    duraklar: { ikon: VergiIkon; kim: string; yer: string; vergi: string; line: string; ton: "sifir" | "vergi" | "beyan" | "notr" }[];
    /** bu duraktan sonraki bağ ok değil "ya da" (iki alternatif) */
    ayrim?: number;
    ayrintilar: { baslik: string; line: string }[];
  };
  hatalar: {
    id: string; heading: string; accent: string; lead: string;
    items: (VergiMadde & { ceza?: string })[];
    /** gecikme uzadıkça büyüyen ceza; yalnız resmî rakamı olan ülkede */
    merdiven?: { baslik: string; alt: string; birim: string; onde?: boolean; basamaklar: { sure: string; tutar: number }[] };
  };
  adimlar: { id: string; heading: string; accent: string; lead: string; items: VergiMadde[] };
  ilgili: { id: string; heading: string; accent: string; items: (VergiMadde & { href: string })[] };
  faq: { id: string; heading: string; accent: string; items: Faq[] };
  closing: { title: string; accent: string; cta: { label: string; href: string } };
};

export const VERGI_DUBAI: VergiVeri = {
  ulke: "Dubai",
  yol: "/dubai/vergi",
  seo: {
    title: "Dubai'de Vergi Danışmanlığı: Kurumlar Vergisi ve KDV | Ortac Global",
    description:
      "Dubai şirketinizde kurumlar vergisi, KDV ve mukimlik: hangi kural size işliyor, kayıt ve beyan ne zaman. 375.000 AED'ye kadar %0, üstü %9; KDV %5.",
  },

  /* ------------------------------------------------------------------ hero */
  hero: {
    crumb: "Dubai · Vergi Danışmanlığı",
    title: "Dubai'de vergi danışmanlığı.",
    accent: "vergi danışmanlığı.",
    /* [ONAYLI] ilk cümle sitenin duruşu (hizmetIcerik · kurallar · lead). */
    lead: "Dubai'de şirket kurmak tek başına vergi avantajı vermiyor. Kurumlar vergisi, KDV ve mukimlik tarafında size hangi kuralın işlediğini netleştiriyor, kayıt ve beyan takvimini birlikte kuruyoruz.",
    /* hizmet sayfalarının tek giriş düğmesi (bankaDubai.ts · hero.cta notu) */
    cta: { label: "İletişime geçin", href: "/iletisim" },
    trust: [
      { icon: "yuzde", line: "Kurumlar vergisi ve KDV aynı ekipte." },
      /* hafıza: ortac-1996-dogrulanmis */
      { icon: "defter", line: "1996'dan beri muhasebe ve vergi." },
    ],
  },

  /* --------------------------------------------------------------- çerçeve
     [RESMÎ] D·8 (oran ve eşik), C·5 (KDV), [TEYİT] muhasebe 9. Kaydırıcının
     üst sınırı 2 milyon AED: eşik çubuğun beşte birine yakın bir yerde
     duruyor, iki dilim de gözle okunuyor. */
  cerceve: {
    id: "cerceve",
    heading: "Dubai'de vergi çerçevesi.",
    accent: "vergi çerçevesi.",
    lead: "Kurumlar vergisi net kâr üzerinden hesaplanıyor. İlk 375.000 AED'de vergi çıkmıyor, üstü %9.",
    gorsel: {
      tur: "esik",
      baslik: "Kârınıza göre kurumlar vergisi",
      birim: "AED",
      esik: 375000,
      oran: 9,
      max: 2000000,
      adim: 25000,
      varsayilan: 750000,
      arac: { label: "Ayrıntılı hesap aracını açın", href: "/araclar/kurumlar-vergisi/dubai" },
    },
    kartlar: [
      { deger: "%0", etiket: "375.000 AED'ye kadar", line: "Vergilendirilebilir gelirin ilk dilimi.", ton: "yesil" },
      { deger: "%9", etiket: "375.000 AED'nin üstü", line: "Serbest bölge şirketi de dahil.", ton: "mavi" },
      { deger: "%5", etiket: "KDV", line: "Yıllık tedarik 375.000 AED'yi aşarsa kayıt zorunlu.", ton: "mavi" },
      { deger: "Yok", etiket: "Kişisel gelir vergisi", line: "BAE'de maaş ve kâr payından alınmıyor.", ton: "yesil" },
    ],
  },

  /* ---------------------------------------------------------------- kapsam
     [ONAYLI] lib/services.ts · vergi · dubai ("kurumlar vergisi kaydı ve
     beyanı, KDV kaydı ve beyanı, vergi planlaması ve danışmanlık") +
     hizmetIcerik kartları. Süreler [RESMÎ] D·8, D·9, C·5, D·10. */
  kapsam: {
    id: "kapsam",
    heading: "Bu hizmette ne yapıyoruz?",
    accent: "ne yapıyoruz?",
    lead: "Kayıt, beyan ve değerlendirme tek dosyada. Aylık kayıtlar muhasebe ekibimizde; ikisi birlikte yürüyor.",
    items: [
      { icon: "dosya", title: "Kurumlar vergisi kaydı", line: "Kuruluştan sonraki üç ay içinde vergi idaresine kayıt." },
      { icon: "takvim", title: "Kurumlar vergisi beyanı", line: "Dönem sonundan itibaren dokuz ay içinde beyan ve ödeme." },
      { icon: "fatura", title: "KDV kaydı ve beyanı", line: "Eşik takibi, kayıt başvurusu ve üç aylık beyanlar." },
      { icon: "terazi", /* 09.10.2026 · Murat Bey (teyit 25): "Rejim değerlendirmesini çok sevmedim. Vergi uyum hizmeti daha iyi olur." */
        title: "Vergi uyum hizmeti", line: "Faaliyetinize hangi kuralın işlediğini yazıyla bildiriyor, uyumu yıl boyu izliyoruz." },
      { icon: "kalkan", title: "Küçük işletme indirimi", line: "Geliri 3 milyon AED'yi aşmayan şirkette seçeneği her dönem değerlendiriyoruz." },
      { icon: "kisi", title: "Şirket ve kişisel mukimlik", line: "Şirketin ve sizin vergi mukimliğinizi birlikte ele alıyoruz." },
    ],
    haric: {
      baslik: "Bu hizmetin dışında kalanlar",
      items: [
        "Aylık muhasebe kaydı (muhasebe hizmetinde)",
        "Bağımsız denetim raporu",
        "Türkiye'deki kişisel beyannameniz",
        "Vergi sonucu için garanti",
      ],
    },
  },

  /* ---------------------------------------------------------------- takvim
     [RESMÎ] D·8 (kayıt 3 ay, geç kayıt 10.000 AED), D·9 (beyan ve ödeme 9 ay;
     aralıkta kapanan yıl için 30 Eylül), C·5 (KDV: 30 gün kayıt, dönemi
     izleyen 28. gün), C·7 ve D·8 (cezalar). Halka mali yılı ocak-aralık olan
     ve KDV dönemi takvim çeyreğine denk gelen şirket için çizildi: KDV
     dönemini vergi idaresi atıyor, başka aylara da düşebilir. */
  takvim: {
    id: "takvim",
    heading: "Yıl içinde vergi takvimi.",
    accent: "vergi takvimi.",
    lead: "Tarihler şirketin mali yılına göre işliyor. Aşağıdaki halka, yılı aralıkta kapanan bir şirketin örneği.",
    ornek: { ust: "Mali yıl", alt: "Ocak - Aralık" },
    isaretler: [
      { ad: "Kurumlar vergisi beyanı ve ödemesi", ton: "ana", aylar: [9] },
      { ad: "KDV beyanı ve ödemesi", ton: "ara", aylar: [1, 4, 7, 10] },
    ],
    kalemler: [
      { sure: "3 ay", ne: "Kurumlar vergisi kaydı", kural: "Kuruluştan itibaren üç ay içinde yapılıyor.", ceza: "Geç kayıt: 10.000 AED" },
      { sure: "9 ay", ne: "Kurumlar vergisi beyanı", kural: "Dönem sonundan itibaren; ödeme de aynı süre içinde." },
      { sure: "30 gün", ne: "KDV kaydı", kural: "Eşik aşıldıktan sonra otuz gün içinde başvuru.", ceza: "Geç kayıt: 10.000 AED" },
      { sure: "28 gün", ne: "KDV beyanı", kural: "Üç aylık dönemi izleyen 28. güne kadar beyan ve ödeme.", ceza: "Geç beyan: 1.000 AED" },
    ],
  },

  /* --------------------------------------------------------------- türkiye
     [TEYİT] muhasebe 9 (kişisel gelir vergisi yok) · [ONAYLI] hizmetIcerik
     SSS (oturum izni mukimliği kendiliğinden bitirmiyor) · iş merkezi kuralı
     [RESMÎ] docs/kktc-mevzuat.md · 9 (KVK md. 3). Kâr payının Türkiye'deki
     vergisi AÇIK SORU: oran ya da istisna yazılmadı. */
  turkiye: {
    id: "turkiye",
    heading: "Türkiye'de yaşıyorsanız vergi nerede çıkıyor?",
    accent: "vergi nerede çıkıyor?",
    lead: "Şirketin vergisi Dubai'de, sizin verginiz yaşadığınız ülkede çıkıyor. Oturum izni almak Türkiye'deki mukimliği kendiliğinden bitirmiyor.",
    duraklar: [
      { ikon: "sirket", kim: "Şirketiniz", yer: "Dubai'de", vergi: "%0 / %9", line: "Kâr önce burada vergileniyor: ilk 375.000 AED %0, üstü %9.", ton: "vergi" },
      { ikon: "kimlik", kim: "Dubai'de yaşıyorsanız", yer: "BAE'de", vergi: "Kişisel vergi yok", line: "Maaş ve kâr payından kişisel gelir vergisi alınmıyor.", ton: "sifir" },
      { ikon: "kisi", kim: "Türkiye'de yaşıyorsanız", yer: "Türkiye'de", vergi: "Beyan", line: "Mukim olduğunuz ülkenin kuralı işliyor; kâr payı Türkiye'de beyan konusu.", ton: "beyan" },
    ],
    ayrim: 1,
    ayrintilar: [
      { baslik: "Oturum izni mukimliği bitirmiyor", line: "Oturum izni ya da Emirates ID sahibi olmak, başka bir ülkedeki vergi mukimliğini tek başına sona erdirmiyor." },
      { baslik: "Şirket Türkiye'den yönetilirse", line: "İşlerin fiilen Türkiye'de yönetildiği bir şirket Türkiye'de de mükellef sayılabiliyor." },
      { baslik: "Kişiye özel görüş", line: "Kişiye özel vergi görüşü vermiyoruz; iki tarafı görüşmede birlikte değerlendiriyoruz." },
    ],
  },

  /* --------------------------------------------------------------- hatalar
     [RESMÎ] B·4 (serbest bölge şirketi de kayıt olur, beyan verir), D·8
     (cezalar), C·5 ve C·7 (KDV), D·10 (indirim seçilse de beyan sürer).
     Merdiven türetilmiş: ilk 12 ay ayda 500 AED (6.000), 13. aydan itibaren
     ayda 1.000 AED; 18. ayda 12.000 AED. */
  hatalar: {
    id: "hatalar",
    heading: "Sık yapılan hatalar ve cezaları.",
    accent: "hatalar ve cezaları.",
    lead: "Cezaların çoğu vergi borcundan değil, geciken kayıt ve beyandan doğuyor.",
    items: [
      { icon: "kalkan", title: "Serbest bölgeyi otomatik %0 sanmak", line: "Serbest bölge şirketi de kayıt oluyor ve beyan veriyor; %0 ağır şartlara bağlı." },
      { icon: "dosya", title: "Kaydı geciktirmek", line: "Kurumlar vergisi kaydı kuruluştan sonraki üç ay içinde yapılıyor.", ceza: "10.000 AED" },
      { icon: "takvim", title: "Kâr yok diye beyan vermemek", line: "Vergi çıkmasa da şirket her dönem beyan veriyor." },
      { icon: "fatura", title: "KDV eşiğini izlememek", line: "Son 12 ayın tedariki 375.000 AED'yi aşınca 30 gün içinde başvuru gerekiyor.", ceza: "10.000 AED" },
      { icon: "saat", title: "Vergiyi geç ödemek", line: "Ödenmeyen tutara gecikme cezası her ay işliyor.", ceza: "Yıllık %14" },
      { icon: "kimlik", title: "Oturumla mukimliğin bittiğini sanmak", line: "Emirates ID, Türkiye'deki vergi mukimliğini tek başına sona erdirmiyor." },
    ],
    /* 09.10.2026 · geç beyan cezası merdiveni (ayda 500, sonra 1.000 AED)
       KALKTI: Murat Bey rakamı teyit etmedi, Burak: "bir şey yazmasak da olur." */
  },

  /* --------------------------------------------------------------- adımlar
     [ONAYLI] hizmetIcerik.ts · DUBAI · vergi · adimlar (eski sayfanın dört
     adımı). Cümleler kısaltıldı: dört sütunlu kartta üç satıra iniyordu
     (hafıza: açıklama en çok iki satır). */
  adimlar: {
    id: "surec",
    heading: "Adım adım nasıl çalışıyoruz?",
    accent: "nasıl çalışıyoruz?",
    lead: "Dört adım; ilki bir görüşme.",
    items: [
      { icon: "ara", title: "Faaliyetinize bakıyoruz", line: "Ne iş yaptığınızı ve gelir türlerinizi dinliyoruz." },
      { icon: "terazi", title: "Vergi uyumunu kuruyoruz", line: "Hangi gelir hangi kurala giriyor, yazıyla bildiriyoruz." },
      { icon: "dosya", title: "Kayıt ve beyanı kuruyoruz", line: "Kayıt ve beyan takvimi muhasebe ekibimizle kuruluyor." },
      { icon: "pusula", title: "Yıl içinde takip ediyoruz", line: "Faaliyet ya da yapı değişirse yeniden bakıyoruz." },
    ],
  },

  /* ---------------------------------------------------------------- ilgili */
  ilgili: {
    id: "ilgili",
    heading: "Vergiyle birlikte yürüyen hizmetler.",
    accent: "birlikte yürüyen hizmetler.",
    items: [
      { icon: "defter", title: "Muhasebe", line: "Beyanın dayanağı olan aylık kayıtlar ve yıllık mali tablolar.", href: "/dubai/muhasebe" },
      { icon: "banka", title: "Banka ve ödeme", line: "Kurumsal hesap ve tahsilat kanalları.", href: "/dubai/banka-hesabi" },
      { icon: "kurulus", title: "Şirket kuruluşu", line: "Serbest bölge seçimi, lisans ve kuruluş adımları.", href: "/dubai" },
      { icon: "hesap", title: "Kurumlar vergisi hesaplayıcı", line: "Kârınızı girin, vergiyi ve efektif oranı görün.", href: "/araclar/kurumlar-vergisi/dubai" },
    ],
  },

  /* ------------------------------------------------------------------- SSS
     İlk, ikinci ve altıncı soru [ONAYLI] (hizmetIcerik · sss). Kalanlar
     [RESMÎ]: B·4, C·5, D·10; kişisel gelir vergisi [TEYİT] muhasebe 9. */
  faq: {
    id: "sss",
    heading: "Sık sorulan sorular.",
    accent: "sorulan sorular.",
    items: [
      { q: "Muhasebe hizmetinden farkı ne?", a: "Muhasebe kayıtları tutuyor ve beyanın dayanağını hazırlıyor. Kurumlar vergisi kaydı, beyanın hazırlanıp sunulması ve özel vergi danışmanlığı aylık muhasebe ücretine dahil değil; ayrı yürüyor." },
      { q: "Serbest bölgede kurarsam vergi ödemez miyim?", a: "Bu garanti değil. %0 yalnız gerekli şartları sağlayan şirketin nitelikli geliri için geçerli; kalan gelir standart kurala göre vergileniyor. Durumunuza bakmadan oran söylemiyoruz." },
      { q: "Kârım 375.000 AED'nin altındaysa beyan vermem gerekir mi?", a: "Evet. Vergi çıkmasa da şirket kurumlar vergisine kayıt oluyor ve her dönem beyan veriyor. Beyan, dönem sonundan itibaren dokuz ay içinde veriliyor." },
      { q: "KDV kaydı ne zaman zorunlu?", a: "Vergiye tabi tedarikiniz son 12 ayda 375.000 AED'yi aşarsa ya da önümüzdeki 30 günde aşması bekleniyorsa. 187.500 AED'nin üstünde gönüllü kayıt mümkün." },
      { q: "Küçük işletme indirimi nedir?", a: "Geliri 3 milyon AED'yi aşmayan şirket, şartları sağlıyorsa o dönem için vergilendirilebilir gelirini yok saydırabiliyor. Kayıt ve beyan yükümlülüğü sürüyor. Bugünkü düzenlemeye göre 2029 sonuna kadar biten dönemleri kapsıyor." },
      { q: "Dubai'de oturum alınca Türkiye'deki vergi mukimliğim biter mi?", a: "Kendiliğinden bitmez. Oturum izni ya da Emirates ID sahibi olmak, başka bir ülkedeki mukimliği tek başına sona erdirmiyor; iki tarafı birlikte değerlendiriyoruz." },
      { q: "Dubai'de kişisel gelir vergisi var mı?", a: "Hayır. BAE'de maaş ve kâr payı üzerinden kişisel gelir vergisi alınmıyor. Başka bir ülkedeki mukimliğiniz sürüyorsa o ülkenin kuralı ayrıca işliyor." },
      { q: "Ücreti ne kadar?", a: "Kapsam şirketten şirkete değiştiği için sabit fiyat yazmıyoruz; görüşmeden sonra yazılı olarak bildiriyoruz." },
    ],
  },

  closing: {
    title: "Vergi tarafını birlikte netleştirelim.",
    accent: "birlikte netleştirelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
