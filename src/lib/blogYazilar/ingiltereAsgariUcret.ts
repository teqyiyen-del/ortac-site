/* İNGİLTERE ASGARİ ÜCRET · eski sitenin en çok trafik alan yazısı
   (Search Console, 16 ay: 4.543 tıklama, 214.762 gösterim, ortalama sıra 5,5).

   ADRES: eski adres /blog/ingiltere-asgari-ucret-2025 idi. Burak: "trafik alma
   sebebi geçen sene güncellenmesiydi; adresi yönlendir, bu sene 2026 versiyonu
   yazalım, adreste 2025 durmasına gerek yok." Yıl adresten çıktı, başlıkta
   duruyor; eski adres buraya kalıcı yönleniyor (next.config.ts). Her nisanda
   AYNI adreste güncellenir: tabloya yeni satır, başlıkta yeni yıl, updatedAt.

   BAŞLIK sayfanın gerçekten çıktığı sorgulardan kuruldu: "ingiltere asgari
   ücret 2025", "… aylık", "… ne kadar", "londra asgari ücret", "iskoçya asgari
   ücret", "uk asgari ücret".

   KAYNAK (09.10.2026'da tek tek okundu):
     · oranlar            gov.uk/national-minimum-wage-rates
     · gelir vergisi      gov.uk/income-tax-rates (kişisel muafiyet 12.570 £, %20)
     · ulusal sigorta     gov.uk/national-insurance-rates-letters (çalışan %8)
     · gönüllü ücret      livingwage.org.uk (13,45 £; Londra 14,80 £)
   Aylık ve net tutarlar bu oranlardan HESAPLANDI (aşağıda formülü yazılı);
   kur çevirisi bilerek yok (kur her gün değişiyor, yazı eskir).
   Ortac'a dair cümleler sitenin İngiltere ve İngiltere muhasebe sayfalarından. */
import type { BlogPost } from "@/lib/blog";
import { SLUG } from "@/lib/blogTemel";
import { POST_PHOTO } from "@/lib/media";

export const POST_UK_ASGARI_UCRET: BlogPost = {
  slug: SLUG.ukAsgariUcret,
  category: "ulke-rehberi",
  title: "İngiltere asgari ücret 2026: saatlik ve aylık ne kadar?",
  heroAccent: "saatlik ve aylık ne kadar?",
  summary:
    "İngiltere'de asgari ücret 1 Nisan 2026'dan beri 21 yaş ve üstü için saatte 12,71 sterlin. Aylık karşılığı, yaşa göre oranlar ve Londra farkı.",
  /* Burak: "tarihini güncellendi olarak verme, yeni gibi ver" */
  publishedAt: "2026-10-09",
  topic: "Çalışma hayatı",
  country: "ingiltere",
  tags: ["İngiltere", "Asgari ücret", "Bordro"],
  author: "Murat Ortaç",
  cover: POST_PHOTO.kafe,

  seo: {
    title: "İngiltere Asgari Ücret 2026: Saatlik ve Aylık Ne Kadar?",
    description:
      "İngiltere'de asgari ücret 1 Nisan 2026'dan beri 21 yaş üstü için saatte 12,71 sterlin. Aylık brüt ve net karşılığı, yaşa göre oranlar, Londra ve İskoçya.",
  },

  sourceNote:
    "Saatlik oranlar Birleşik Krallık hükümetinin resmî sayfasından (gov.uk), gönüllü ücret Living Wage Foundation'dan alınmıştır. Aylık ve net tutarlar bu oranlardan hesaplanmıştır. Bilgiler 9 Ekim 2026 itibarıyla günceldir.",

  body: [
    {
      kind: "ozet",
      items: [
        "İngiltere'de asgari ücret 1 Nisan 2026'dan beri 21 yaş ve üstü için saatte 12,71 sterlin.",
        "Haftada 37,5 saat çalışan biri için bu, ayda yaklaşık 2.065 sterlin brüt ediyor.",
        "18-20 yaş için oran saatte 10,85 sterlin; 18 yaş altı ve çıraklar için 8 sterlin.",
        "Oran Londra, İskoçya, Galler ve Kuzey İrlanda'da aynı; her yıl 1 Nisan'da değişiyor.",
      ],
    },
    {
      kind: "p",
      text: "İngiltere'de asgari ücret aylık değil saatlik belirlenir ve çalışanın yaşına göre değişir. Bu yazı 2026 oranlarını, aylık ve yıllık karşılığını, önceki yıllarla farkını ve İngiltere'de şirket kurup çalışan almayı düşünenlerin bilmesi gerekenleri bir arada veriyor.",
    },

    { kind: "h2", id: "saatlik", text: "İngiltere'de asgari ücret 2026'da saatlik ne kadar?" },
    {
      kind: "p",
      text: "İngiltere'de 1 Nisan 2026'dan 31 Mart 2027'ye kadar geçerli asgari ücret, 21 yaş ve üstü çalışanlar için saatte 12,71 sterlin. Bu orana resmî olarak National Living Wage deniyor. 21 yaşın altındakiler için daha düşük olan National Minimum Wage oranları uygulanıyor. Oranların tamamı [hükümetin resmî sayfasında](https://www.gov.uk/national-minimum-wage-rates) yayımlanıyor.",
    },
    {
      kind: "tablo",
      caption: "İngiltere asgari ücret oranları · 1 Nisan 2026 - 31 Mart 2027",
      head: ["Çalışan", "Saatlik oran", "Bir önceki yıl"],
      rows: [
        ["21 yaş ve üstü", "12,71 £", "12,21 £"],
        ["18-20 yaş", "10,85 £", "10,00 £"],
        ["18 yaş altı", "8,00 £", "7,55 £"],
        ["Çırak", "8,00 £", "7,55 £"],
      ],
      foot: "Çırak oranı 19 yaşından küçük çıraklar ile çıraklığının ilk yılındaki herkes için geçerli. İlk yılını bitirmiş 19 yaş üstü çırak kendi yaş grubunun oranını alır.",
    },

    { kind: "h2", id: "aylik", text: "İngiltere'de asgari ücret aylık ne kadar ediyor?" },
    {
      kind: "p",
      text: "İngiltere'de yasal bir aylık asgari ücret yok; aylık tutar çalışılan saate göre çıkıyor. Tam zamanlı iş çoğunlukla haftada 37,5 ya da 40 saat. Saatlik 12,71 sterlinle haftada 37,5 saat çalışan 21 yaş üstü biri ayda yaklaşık 2.065 sterlin, yılda 24.784 sterlin brüt kazanıyor. Haftada 40 saatte bu tutar ayda yaklaşık 2.203 sterline çıkıyor.",
    },
    {
      kind: "tablo",
      caption: "21 yaş ve üstü için brüt ve net karşılık (saatte 12,71 £)",
      head: ["Haftalık saat", "Aylık brüt", "Yıllık brüt", "Aylık net (yaklaşık)"],
      rows: [
        ["37,5 saat", "2.065 £", "24.784 £", "1.780 £"],
        ["40 saat", "2.203 £", "26.437 £", "1.880 £"],
      ],
      foot: "Hesap: saatlik oran × haftalık saat × 52 hafta ÷ 12 ay. Net tutar standart vergi koduyla (12.570 £ kişisel muafiyet), %20 gelir vergisi ve %8 ulusal sigorta kesintisiyle hesaplandı; emeklilik kesintisi ve öğrenim kredisi geri ödemesi dahil değil.",
    },
    {
      kind: "p",
      text: "Net tutar kişiden kişiye değişir. İşyeri emeklilik planına otomatik katılım varsa brüt ücretin bir kısmı daha kesilir; İskoçya'da yaşayanlar için gelir vergisi dilimleri de farklıdır.",
    },

    { kind: "h2", id: "onceki-yillar", text: "İngiltere'de asgari ücret yıllara göre nasıl değişti?" },
    {
      kind: "p",
      text: "İngiltere'de asgari ücret her yıl 1 Nisan'da yenileniyor. 21 yaş ve üstü oranı 2025'te 12,21 sterlindi; 2026'da 50 peni, yani yaklaşık yüzde 4,1 arttı. En büyük sıçrama 18-20 yaş grubunda oldu: 10,00 sterlinden 10,85 sterline, yüzde 8,5.",
    },
    {
      kind: "tablo",
      caption: "Yetişkin oranı, son beş yıl",
      head: ["Dönem", "Saatlik oran", "Kapsadığı yaş"],
      rows: [
        ["Nisan 2026 - Mart 2027", "12,71 £", "21 ve üstü"],
        ["Nisan 2025 - Mart 2026", "12,21 £", "21 ve üstü"],
        ["Nisan 2024 - Mart 2025", "11,44 £", "21 ve üstü"],
        ["Nisan 2023 - Mart 2024", "10,42 £", "23 ve üstü"],
        ["Nisan 2022 - Mart 2023", "9,50 £", "23 ve üstü"],
      ],
      foot: "Nisan 2024'e kadar yetişkin oranı 23 yaş ve üstüne uygulanıyordu; o tarihte sınır 21'e indi.",
    },

    { kind: "h2", id: "londra-iskocya", text: "Londra'da ve İskoçya'da asgari ücret farklı mı?" },
    {
      kind: "p",
      text: "Hayır. Yasal asgari ücret Birleşik Krallık'ın tamamında aynı: İngiltere, İskoçya, Galler ve Kuzey İrlanda'da 21 yaş üstü için saatte 12,71 sterlin. Londra için ayrı bir yasal oran yok.",
    },
    {
      kind: "p",
      text: "Karışıklığın kaynağı, adı benzeyen gönüllü bir ücret. Living Wage Foundation adlı vakfın yaşam maliyetine göre hesapladığı Real Living Wage şu an Birleşik Krallık genelinde saatte 13,45 sterlin, Londra'da 14,80 sterlin. Bu oranı ödemek yasal zorunluluk değil; vakfa üye işverenler kendi isteğiyle uyguluyor. [Güncel rakamlar vakfın sayfasında](https://www.livingwage.org.uk/what-real-living-wage).",
    },

    { kind: "h2", id: "kim-alir", text: "İngiltere'de asgari ücreti kimler alır?" },
    {
      kind: "p",
      text: "İngiltere'de okul bitirme yaşını geçmiş ve işçi statüsünde çalışan herkes asgari ücrete hak kazanır: tam zamanlı, yarı zamanlı, geçici, ajans üzerinden çalışanlar ve çıraklar dahil. Serbest çalışanlar, kendi şirketinin direktörü olup iş sözleşmesi bulunmayanlar ve gönüllüler kapsam dışındadır.",
    },
    {
      kind: "note",
      tone: "info",
      title: "İngiltere'de şirket kurmak çalışma izni vermez",
      text: "Türkiye'den İngiltere'de limited şirket kurabilirsiniz ama bu size İngiltere'de yaşama ya da çalışma hakkı kazandırmaz. Asgari ücret, İngiltere'de çalışma hakkı olan kişiler için geçerli bir kuraldır.",
    },

    { kind: "h2", id: "yasam", text: "Asgari ücret İngiltere'de yaşam maliyetini karşılıyor mu?" },
    {
      kind: "p",
      text: "Bu sorunun tek cevabı yok, çünkü İngiltere'de en büyük gider olan kira şehirden şehire çok değişiyor. Yasal asgari ücret ülkenin her yerinde aynı olduğu için aynı maaş Londra'da ve kuzeydeki bir şehirde çok farklı bir yaşam demek. Gönüllü Real Living Wage oranının Londra için ayrı ve daha yüksek hesaplanmasının sebebi de bu.",
    },
    {
      kind: "p",
      text: "Kira, vize ve çalışma izni tarafını [İngiltere'de yaşam rehberinde](/blog/ingiltere-yasam-rehberi-is-imkanlari-vize-maliyetler) resmî rakamlarla anlattık. Çalışmak için değil iş kurmak için ülke arıyorsanız [Dubai'de ne iş yapılır](/blog/dubai-is-fikirleri-en-karlı-is-imkanlari) ve [Kıbrıs'ta yaşam](/blog/kktc-yasam-rehberi-kibris-is-firsatlari-maliyetler) yazıları da aynı soruya öteki iki ülkeden bakıyor. Vergi tarafını merak ediyorsanız [gelir vergisi olmayan ülkeler](/blog/gelir-vergisi-olmayan-ulkeler-2025) yazısı, kişisel gelir vergisinin nerede ve neden doğduğunu açıklıyor.",
    },
    { kind: "gorsel", src: POST_PHOTO.ukTax, alt: "Londra'da Tower Bridge ve arkasında City of London", caption: "Yasal asgari ücret Londra'da da ülkenin geri kalanıyla aynı." },

    { kind: "h2", id: "isveren", text: "İngiltere'de şirket kurup çalışan alacaklar neye dikkat etmeli?" },
    {
      kind: "p",
      text: "İngiltere'de çalışan istihdam eden her şirket, en az asgari ücreti ödemek ve bunu bordroyla kayıt altına almak zorunda. Bunun için şirketin HMRC'ye işveren olarak kaydolması ve her ödemede bordro (PAYE) bildirimi yapması gerekiyor. Asgari ücretin altında ödeme yapan işveren eksik tutarı geri öder, ayrıca ceza alır ve adı kamuya açıklanabilir.",
    },
    {
      kind: "list",
      items: [
        "Oran her 1 Nisan'da değişir; bordro o tarihten itibaren yeni oranla hesaplanmalıdır.",
        "Çalışan yaş sınırını geçtiğinde (18 ve 21) bir sonraki ödeme döneminde üst orana geçer.",
        "Şirketin tek çalışanı direktörün kendisi olsa bile maaş ödenecekse bordro kaydı gerekir.",
      ],
    },
    {
      kind: "note",
      tone: "info",
      title: "Ortac Global bu konuda ne yapıyor?",
      text: "Ortac Global İngiltere'de şirket kuruluşunu ve kuruluş sonrası muhasebeyi Londra ofisinden yürütüyor. Direktör olarak kendinize maaş ödeyecekseniz bordro (PAYE) kaydının ayrıca yapılması gerekiyor; maaş mı kâr payı mı sorusunu da vergi tarafıyla birlikte ele alıyoruz.",
    },
    {
      kind: "p",
      text: "Kuruluş adımları ve maliyeti için [İngiltere'de şirket kurma sayfasına](/ingiltere), yıllık yükümlülükler için [İngiltere muhasebe sayfasına](/ingiltere/muhasebe), kârın nasıl vergilendiği için [İngiltere vergi sayfasına](/ingiltere/vergi) bakabilirsiniz. Kendi rakamınızla hesap yapmak isterseniz [İngiltere kurumlar vergisi hesaplayıcısı](/araclar/kurumlar-vergisi/ingiltere) da açık. İngiltere'yi Dubai ve KKTC ile yan yana görmek için [ülke karşılaştırması](/ulkeler) var.",
    },

    { kind: "h2", id: "sss", text: "Sık sorulan sorular" },
    {
      kind: "sss",
      items: [
        {
          q: "İngiltere'de asgari ücret 2026'da ne kadar?",
          a: "İngiltere'de 1 Nisan 2026'dan beri asgari ücret 21 yaş ve üstü için saatte 12,71 sterlin, 18-20 yaş için 10,85 sterlin, 18 yaş altı ve çıraklar için 8 sterlin.",
        },
        {
          q: "İngiltere'de aylık asgari ücret kaç sterlin?",
          a: "Yasal bir aylık tutar yok. Saatlik 12,71 sterlinle haftada 37,5 saat çalışan 21 yaş üstü biri ayda yaklaşık 2.065 sterlin, 40 saat çalışan yaklaşık 2.203 sterlin brüt kazanır.",
        },
        {
          q: "İngiltere'de asgari ücretin neti ne kadar?",
          a: "Standart vergi koduyla, emeklilik kesintisi olmadan, haftada 37,5 saat çalışan biri için ayda yaklaşık 1.780 sterlin; 40 saat için yaklaşık 1.880 sterlin. Kesin tutar kişinin vergi koduna ve kesintilerine göre değişir.",
        },
        {
          q: "Londra'da asgari ücret daha mı yüksek?",
          a: "Yasal asgari ücret Londra'da da aynıdır: saatte 12,71 sterlin. Londra için açıklanan 14,80 sterlin, işverenlerin gönüllü olarak uyguladığı Real Living Wage oranıdır; yasal zorunluluk değildir.",
        },
        {
          q: "İngiltere'de asgari ücret ne zaman değişiyor?",
          a: "İngiltere'de asgari ücret her yıl 1 Nisan'da yenilenir. Yeni oranlar genellikle bir önceki sonbaharda bütçeyle birlikte açıklanır.",
        },
        {
          q: "Kendi şirketimin direktörüyüm, asgari ücret almak zorunda mıyım?",
          a: "Direktörle şirket arasında iş sözleşmesi yoksa asgari ücret kuralı uygulanmaz. Sözleşme varsa ya da maaş ödenecekse bordro kaydı gerekir. Ayrıntı için [İngiltere muhasebe sayfasına](/ingiltere/muhasebe) bakabilirsiniz.",
        },
      ],
    },
  ],

  links: [
    {
      label: "İngiltere'de şirket kurmak",
      href: "/ingiltere",
      line: "Kuruluş adımları, maliyet ve İngiltere şirketiyle çalışan ödeme kanalları.",
    },
    {
      label: "İngiltere'de muhasebe",
      href: "/ingiltere/muhasebe",
      line: "Yıllık hesaplar, bildirimler ve bordro kaydının ne zaman gerektiği.",
    },
    {
      label: "İngiltere vergi çerçevesi",
      href: "/ingiltere/vergi",
      line: "Kurumlar vergisi oranları ve kârın Türkiye'ye nasıl geldiği.",
    },
  ],

  closing: {
    title: "İngiltere'de şirket kurmayı mı düşünüyorsunuz?",
    line: "Kuruluştan muhasebeye bütün süreci Londra ofisimizden, Türkçe yürütüyoruz.",
    cta: "İletişime geçin",
  },

  footnote:
    "Bu yazı genel bilgilendirme amaçlıdır; kişiye özel vergi, hukuk ya da göçmenlik danışmanlığı değildir. Oranlar her yıl 1 Nisan'da değişir.",
};
