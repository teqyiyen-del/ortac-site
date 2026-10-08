/* İNGİLTERE · BANKA & ÖDEME — /ingiltere/banka-hesabi · metin (08.10.2026)
   Gövde Dubai ve KKTC'yle ortak (services/BankaSayfa · BankaVeri).

   KAYNAK. Müşteri belgesi yok; cümleler iki yerden:
     [YAYINDA] ülke sayfasında zaten duran cümleler (countryContent.ts ·
               ingiltere: "pratikte Tide gibi dijital hesapla başlanıyor",
               HSBC'nin vergi mukimliği şartı, Stripe'ın şartı, ödeme
               kanalları listesi).
     [RESMÎ]   docs/ingiltere-mevzuat.md · 7: sağlayıcıların kendi sayfaları
               (Stripe, Shopify Payments, Tide, HSBC; kontrol 23.09.2026).
   Banka satırlarında LOGO yok: Tide ve HSBC'nin logosu depoda değil, ad
   yazıyla. Ödeme satırları ülke sayfasındaki sekiz kanalın beşi.
   Açık sorular: hangi hesapla fiilen başlıyoruz, başvuruyu biz mi
   yapıyoruz, Wise'ı öneriyor muyuz (siteden çıkarılmıştı). */

import type { BrandKey } from "@/lib/brands";
import type { BankaVeri } from "@/lib/bankaDubai";

export const BANKA_INGILTERE: BankaVeri = {
  ulke: "İngiltere",
  hero: {
    crumb: "İngiltere · Banka & Ödeme",
    title: "İngiltere'de banka hesabı ve ödeme altyapısı.",
    accent: "banka hesabı",
    lead: "Tescil kolay, banka değil. Hangi hesabın sizin durumunuzda açılabildiğini kuruluştan önce konuşuyoruz; kararı banka veriyor.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    trust: [
      { icon: "secim", line: "Hesap türü kuruluştan önce netleşiyor" },
      { icon: "kart", line: "Stripe ve PayPal açık" },
      { icon: "dosya", line: "Dosyayı biz hazırlıyoruz" },
    ],
  },

  bank: {
    id: "banka",
    heading: "Kurumsal banka hesabı.",
    accent: "banka hesabı.",
    lead: "Geleneksel bankalar İngiltere'de yaşamayan direktöre kolay hesap açmıyor. Pratikte dijital bir işletme hesabıyla başlanıyor.",
    hesap: { alt: "GB•• •••• •••• ••••", giderler: ["Tedarikçi ödemesi", "Maaşlar", "Vergi", "Faturalar"] },
    items: [
      { logo: "kart", name: "Dijital işletme hesabı", line: "Tide gibi; başvuru yurt dışından yapılabiliyor, İngiliz cep numarası isteniyor." },
      { logo: "banka", name: "Geleneksel banka", line: "HSBC küçük işletme hesabı için İngiltere'de vergi mukimliği arıyor." },
      { logo: "dunya", name: "Sterlin hesabı neden önemli", line: "Stripe ve Shopify, şirketle aynı ülkede bir banka hesabı istiyor." },
    ],
    checks: {
      heading: "Hesap açan kurumun baktığı başlıklar",
      items: [
        { icon: "faaliyet", title: "Faaliyet", line: "Ne sattığınız, kime sattığınız ve sicildeki faaliyet koduyla örtüşmesi." },
        { icon: "ortak", title: "Direktör ve ortaklar", line: "Kimlik, adres ve şirketteki paylar; nerede yaşadığınız." },
        { icon: "kaynak", title: "Paranın kaynağı", line: "Hesaba girecek paranın nereden geldiği." },
        { icon: "hacim", title: "Beklenen hacim", line: "Aylık işlem sayısının ve tutarının yaklaşık tahmini." },
      ],
    },
  },

  pay: {
    id: "odeme",
    heading: "Ödeme ve tahsilat kanalları.",
    accent: "tahsilat kanalları.",
    lead: "İngiltere'nin asıl gücü bu: kartla tahsilat, pazar yeri ve platform ödemelerinin hepsi İngiltere şirketiyle açılıyor.",
    sahne: [{ brand: "stripe" }, { brand: "paypal" }, { brand: "revolut" }, { brand: "binance" }],
    items: [
      { brand: "stripe" as BrandKey, name: "Stripe", line: "Sitenizde ve uygulamanızda kartla tahsilat.", tag: "Kartla satış", icon: "kart" },
      { brand: "paypal" as BrandKey, name: "PayPal", line: "PayPal hesabıyla ödeyen müşteriden tahsilat.", tag: "Online ödeme", icon: "dunya" },
      { logo: "pazar", name: "Amazon UK ve Etsy", line: "İki pazar yeri de İngiltere şirketini satıcı olarak kabul ediyor.", tag: "Pazar yeri", icon: "pazar" },
      { logo: "kart", name: "Shopify Payments", line: "Shopify mağazanızda kartla ödeme; İngiliz banka hesabı istiyor.", tag: "E-ticaret", icon: "kart" },
      { brand: "binance" as BrandKey, name: "Binance", line: "Binance Pay ile müşteriden kripto ödeme alma.", tag: "Kripto ödeme", icon: "kripto" },
    ],
  },

  steps: {
    id: "surec",
    heading: "Hesap nasıl açılıyor.",
    accent: "nasıl açılıyor.",
    lead: "Adımlara süre yazmıyoruz: kararı ve takvimi hesap açan kurum belirliyor.",
    exit: { href: "/ingiltere", label: "Şirket kuruluşu: banka hesabı bu sürecin devamı" },
    items: [
      { icon: "secim", title: "Hesap türünü seçiyoruz", line: "Nerede yaşadığınıza ve satış kanalınıza göre hangi hesabın açılabildiğine bakıyoruz." },
      { icon: "dosya", title: "Şirket tescil ediliyor", line: "Hesap, tescil edilmiş şirket adına açılıyor; kuruluş belgeleri dosyaya giriyor." },
      { icon: "imza", title: "Başvuru", line: "Başvuru çevrim içi yapılıyor; kimlik ve adres doğrulaması isteniyor." },
      { icon: "karar", title: "Kurumun kararı", line: "Hesap kararı tamamen başvurulan kuruma ait; garanti edilemiyor." },
      { icon: "kanal", title: "Tahsilat kanalları", line: "Hesap açılınca Stripe, PayPal ve pazar yeri hesapları şirket adına bağlanıyor." },
    ],
  },

  docs: {
    heading: "Hesap açmak için nelere ihtiyacınız var?",
    accent: "nelere ihtiyacınız var?",
    lead: "Sizde olanı işaretleyin; şirket tarafındaki belgeleri biz hazırlıyoruz.",
    data: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "Çoğunu kuruluşta zaten verdiniz.",
          items: [
            "Pasaport ya da kimlik taraması",
            "İkametgâh belgesi",
            "Faaliyet konusu ve hedef müşteri tarifi",
            "Beklenen işlem hacmi ve paranın kaynağına dair kısa açıklama",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Bunlar kuruluşla birlikte geliyor.",
          items: [
            "Kuruluş belgesi (Certificate of Incorporation)",
            "Ana sözleşme ve hisse belgesi",
            "Londra kayıtlı ofis adresi",
            "Şirket vergi numarası (UTR)",
          ],
        },
      ],
      note: "Liste kurumdan kuruma değişiyor; tam listeyi başvurudan önce paylaşıyoruz.",
    },
  },

  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Banka hesabı açabilecek miyim?", a: "Geleneksel bankalar İngiltere'de yaşamayan direktöre kolay hesap açmıyor; HSBC küçük işletme hesabı için İngiltere vergi mukimliği istiyor. Pratikte Tide gibi dijital hesapla başlanıyor." },
      { q: "Hesap açılmasını garanti ediyor musunuz?", a: "Hayır. Kararı başvurulan kurum veriyor; biz hangi hesabın sizin durumunuzda açılabildiğine bakıyor ve dosyayı hazırlıyoruz." },
      { q: "Hesap için İngiltere'ye gitmem gerekiyor mu?", a: "Dijital hesaplarda başvuru çevrim içi yapılıyor. Kurum İngiliz cep numarası gibi ek şartlar isteyebiliyor; başvurudan önce birlikte kontrol ediyoruz." },
      { q: "Stripe için ne gerekiyor?", a: "Stripe İngiltere şirketiyle çalışıyor; şartı İngiltere'de bir banka hesabı ve posta kutusu olmayan bir adres. Direktörün İngiltere'de yaşaması şartı yazmıyor." },
      { q: "Shopify Payments açılır mı?", a: "İngiltere'de tescilli şirket ve İngiliz adresiyle açılıyor; sterlin ödemesi alabilen bir İngiliz banka hesabı istiyor, para transfer hizmetlerini kabul etmiyor." },
      { q: "Amazon UK'de satış yapabilir miyim?", a: "Evet. Amazon kimlik, şirket ve adres belgesiyle birlikte bir banka hesabı istiyor; doğrulama çoğunlukla birkaç iş günü sürüyor." },
      { q: "Parayı Türkiye'ye nasıl getiririm?", a: "Kâr önce İngiltere'de vergileniyor; size kâr payı ya da maaş olarak geçtiğinde Türkiye'de beyan ediyorsunuz. Yolun ayrıntısı ülke sayfasında." },
    ],
  },

  closing: {
    title: "İngiltere şirketinizin banka tarafını birlikte kuralım.",
    accent: "birlikte kuralım.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
