/* ============================================================================
   KKTC · BANKA & ÖDEME — /kktc/banka-hesabi · metin (07.10.2026)
   Biçim ve gövde Dubai'ninkiyle ortak (lib/bankaDubai.ts · BankaVeri,
   components/services/BankaSayfa). Burak: "Kıbrıs'ta çok boş … Dubai'deki
   section'ları bir bak, aynıları Kıbrıs'ta da olabiliyorsa olsun."

   KAYNAKLAR (hangi cümle nereden, blokların başında):
     [BELGE]   müşterinin KKTC teklif belgesi ("KKTC Serbest Bölge Şirket
               Kuruluşu ve Muhasebe Hizmetleri", 06.10.2026): madde 7 ve
               "Dikkate Alınması Gereken Hususlar".
     [TEYİT]   Murat Bey'in teyit cevapları (docs/teyit-cevaplar-1.md):
               KKTC 20 "banka ismi belirtmeyelim" · 22 süreç adımları ·
               24-25 sanal POS (Tiko) var, uluslararası kuruluşlar yok ·
               51 belgeler baştan, bankanın ön hesap onayı için.
     [RESMÎ]   docs/kktc-mevzuat.md: döviz serbest (38/1997), sağlayıcıların
               ülke listeleri (Stripe, PayPal: "Cyprus" var, KKTC yok).
   Ülke sayfasında zaten yayında olan cümleler (countryContent.ts · kktc)
   aynen kullanıldı; yeni rakam, süre ya da banka adı YOK.

   AÇIK SORULAR docs/durum.md · 07.10.2026 (17): bankada şahsen başvuru
   şartı, hesap açılış süresi, Türkiye bankasının hangi durumda mümkün
   olduğu, sanal POS için aranan şartlar. */

import type { BrandKey } from "@/lib/brands";
import type { BankaVeri } from "@/lib/bankaDubai";

export const BANKA_KKTC: BankaVeri = {
  ulke: "KKTC",
  hero: {
    crumb: "KKTC · Banka & Ödeme",
    title: "KKTC'de banka hesabı ve tahsilat.",
    accent: "banka hesabı",
    /* [BELGE] madde 7: hazırlık ve yönlendirme bizde, karar bankada */
    lead: "Şirketin hesabı KKTC'deki yerel bankada açılıyor. Dosyayı biz hazırlıyoruz; hesap kararını banka veriyor.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    trust: [
      { icon: "dosya", line: "Dosyayı biz hazırlıyoruz" },
      { icon: "banka", line: "Hesap TL ve dövizle" },
      { icon: "kart", line: "Kartla tahsilat sanal POS'la" },
    ],
  },

  bank: {
    id: "banka",
    heading: "Kurumsal banka hesabı.",
    accent: "banka hesabı.",
    /* [TEYİT] KKTC 22: sermaye hesabı imza ziyaretinde, tescilden sonra aktif */
    lead: "Şirketin ana hesabı KKTC'deki yerel bankada. Sermaye hesabını imza ziyaretinde açıyorsunuz; şirket tescil olunca hesap kullanıma açılıyor.",
    hesap: { alt: "TL ve döviz", giderler: ["Tedarikçi ödemesi", "Maaşlar", "Yıllık harç", "Faturalar"] },
    /* Banka ADI yok: [TEYİT] KKTC 20. */
    items: [
      { logo: "banka", name: "KKTC yerel bankası", line: "Şirketin ana hesabı; TL ve dövizle açılıyor." },
      { logo: "nakit", name: "Sermaye hesabı", line: "İmza ziyaretinde açılıyor; tescilden sonra para şirket hesabında serbest kalıyor." },
      /* [BELGE] madde 7, kelimesi kelimesine "mümkün olabiliyor" */
      { logo: "dunya", name: "Türkiye bankaları", line: "Gerekli değerlendirme ve onaylar alınırsa çalışmak mümkün olabiliyor." },
    ],
    /* [BELGE] "Dikkate Alınması Gereken Hususlar" */
    checks: {
      heading: "Bankanın baktığı başlıklar",
      items: [
        { icon: "faaliyet", title: "Faaliyet", line: "Şirketin ne iş yaptığı ve gerçek bir ticari faaliyetinin olması." },
        { icon: "ortak", title: "Müşteri ve tedarikçi", line: "Kime satıp kimden aldığınız, aradaki ilişkinin belgesi." },
        { icon: "dosya", title: "Sözleşme ve fatura", line: "İşlemlerin dayanağı; yüksek tutarda ek belge istenebiliyor." },
        { icon: "kaynak", title: "Paranın kaynağı", line: "Hesaba girecek paranın nereden geldiği." },
      ],
    },
  },

  pay: {
    id: "odeme",
    heading: "Ödeme ve tahsilat kanalları.",
    accent: "tahsilat kanalları.",
    /* [TEYİT] KKTC 24-25 */
    lead: "Uluslararası ödeme kuruluşları KKTC şirketiyle çalışmıyor. Tahsilat banka havalesi ve yerel sanal POS üzerinden yürüyor; ödemeler KKTC'deki şirket hesabına geliyor.",
    sahne: [{ icon: "kart" }, { yazi: "₺" }, { yazi: "€" }, { yazi: "$" }],
    items: [
      { logo: "kart", name: "Sanal POS (Tiko)", line: "Kartla tahsilat; ödeme KKTC'deki şirket hesabına geliyor.", tag: "Kartla satış", icon: "kart" },
      { logo: "banka", name: "TL havale", line: "Türkiye'deki müşteriden TL ödeme alınabiliyor.", tag: "Türkiye müşterisi", icon: "banka" },
      { logo: "dunya", name: "Döviz havale", line: "Yurt dışından gelen para Türkiye'deki aracı banka üzerinden geliyor.", tag: "Yurt dışı müşteri", icon: "dunya" },
      /* [RESMÎ] sağlayıcıların ülke listeleri (23.09.2026) */
      { brand: "stripe" as BrandKey, name: "Stripe", line: "Ülke listesinde KKTC yok.", tag: "Çalışmıyor", icon: "yok", yok: true },
      { brand: "paypal" as BrandKey, name: "PayPal", line: "Ülke listesinde KKTC yok.", tag: "Çalışmıyor", icon: "yok", yok: true },
    ],
  },

  steps: {
    id: "surec",
    heading: "Hesap nasıl açılıyor.",
    accent: "nasıl açılıyor.",
    lead: "Adımlara süre yazmıyoruz: bankanın takvimi bizim kontrolümüzde değil.",
    exit: { href: "/kktc", label: "Şirket kuruluşu: banka hesabı bu sürecin bir adımı" },
    /* [TEYİT] KKTC 22 (adım sırası) ve 51 (belgeler baştan, ön onay için) */
    items: [
      { icon: "secim", title: "İhtiyacı konuşuyoruz", line: "Hangi para biriminde, kimden tahsilat yapacağınızı kuruluştan önce netleştiriyoruz." },
      { icon: "dosya", title: "Dosya hazırlığı", line: "Bankanın ön onayı için belgeleri baştan istiyor, dosyayı biz derliyoruz." },
      { icon: "imza", title: "İmza ziyareti", line: "KKTC'ye bir kez geliyorsunuz; aynı ziyarette bankada sermaye hesabını açıyorsunuz." },
      { icon: "karar", title: "Tescil ve bankanın kararı", line: "Şirket tescil olunca belgelerle bankaya başvuruluyor; hesap genellikle 2-4 haftada açılıyor." },
      { icon: "kanal", title: "Tahsilat ve muhasebe", line: "Hesap açılınca sanal POS başvurusu yapılıyor; aylık muhasebe o ay başlıyor." },
    ],
  },

  docs: {
    heading: "Hesap açmak için nelere ihtiyacınız var?",
    accent: "nelere ihtiyacınız var?",
    lead: "Sizde olanı işaretleyin; dosyanın geri kalanını biz hazırlıyoruz.",
    data: {
      groups: [
        {
          title: "Sizden istediklerimiz",
          hint: "İlk ikisini kuruluşta zaten veriyorsunuz; bankaya giden dosyada yeniden kullanılıyor.",
          items: [
            "Pasaport veya kimlik kartınızın kopyası",
            "e-Devlet'ten alınmış ikamet belgesi",
            "Faaliyet konusu, müşteri ve tedarikçi tarifi",
            "Paranın kaynağına dair kısa açıklama",
          ],
        },
        {
          title: "Süreç içinde ortaya çıkanlar",
          hint: "Bunları biz hazırlıyoruz; sizden yalnızca onay ve imza isteniyor.",
          items: [
            "Şirket tescil belgeleri",
            "Ortaklık yapısını gösteren belge",
            "Bankanın müşteri tanıma formları",
            "Banka isterse sözleşme ve fatura örnekleri",
          ],
        },
      ],
      note: "Liste bankadan bankaya değişiyor; tam listeyi başvurudan önce paylaşıyoruz.",
    },
  },

  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Banka hesabı açılmasını garanti ediyor musunuz?", a: "Hayır. Bankalar kendi müşteri tanıma ve risk politikalarına göre bağımsız karar veriyor. Biz hazırlık ve yönlendirme desteği veriyoruz." },
      /* 09.10.2026 · Murat Bey (teyit 20): "2 - 4 hafta" */
      { q: "Hesap ne kadar sürede açılıyor?", a: "Başvurudan sonra genellikle 2-4 hafta içinde. Süreyi bankanın incelemesi belirliyor; kararı banka veriyor." },
      { q: "Hesap için KKTC'ye gelmem gerekiyor mu?", a: "Evet, bir kez. Belgeleri KKTC'de imzalıyorsunuz ve aynı ziyarette bankada şirketin sermaye hesabını açıyorsunuz." },
      { q: "Hesap hangi para biriminde açılıyor?", a: "KKTC bankasında kurumsal hesap TL ve dövizle açılıyor. Döviz bulundurmak, dövizle sözleşme yapmak ve yurt dışına transfer serbest." },
      { q: "Stripe ya da PayPal kullanabilir miyim?", a: "Hayır. İkisinin de ülke listesinde KKTC yok. Kartla tahsilatı yerel sanal POS'la yapıyorsunuz, ödemeler KKTC'deki şirket hesabına geliyor." },
      { q: "Yurt dışındaki bankalarla çalışabilir miyim?", a: "KKTC şirketlerinin uluslararası bankalara ve bazı uluslararası ödeme kuruluşlarına doğrudan erişimi sınırlı olabiliyor. İngiltere, Avrupa Birliği ya da BAE'deki şirketlere kıyasla daha dar bir alan; kuruluştan önce birlikte değerlendiriyoruz." },
      { q: "Sermaye bankada bloke mi kalıyor?", a: "Hayır. Yabancı ortakların payı kadar tutar tescilde bloke ediliyor; şirket tescil belgeleriyle bloke kalkıyor ve para şirket hesabında kullanılabiliyor." },
      { q: "Banka benden ne isteyebilir?", a: "Şirketin faaliyetlerini, müşteri ve tedarikçi ilişkilerini, sözleşmeleri, faturaları ve paranın kaynağını inceleyebilir. Yüksek tutarlı ya da olağan dışı işlemlerde ek belge isteyebilir." },
      { q: "Hesap açılınca muhasebe ne oluyor?", a: "Banka hesabının açıldığı ay, aylık muhasebe hizmetinin ilk ayı. O aya kadar şirket pasif sayılıyor." },
    ],
  },

  closing: {
    title: "KKTC şirketinizin banka tarafını birlikte kuralım.",
    accent: "birlikte kuralım.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
