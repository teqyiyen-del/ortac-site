/* ============================================================================
   KKTC · VERGİ DANIŞMANLIĞI — sayfanın bütün metni
   Sayfa: app/kktc/vergi/page.tsx · Gövde: components/services/VergiSayfa.tsx
   Biçim ve tip: lib/vergiDubai.ts (VergiVeri) · css/svc-vergi.css (.svr-)

   09.10.2026 · İLK YAZIM (gerekçe vergiDubai.ts başında). Eski sayfa genel
   şablondaydı (hizmetIcerik.ts · KKTC · vergi).

   ------------------------------------------------------------ KAYNAK DÜZENİ
     [RESMÎ]   docs/kktc-mevzuat.md (22-23.09.2026): Serbest Liman muafiyeti
               (3), genel beyan takvimi (7), Türkiye tarafı (9).
     [TEYİT]   docs/teyit-cevaplar-1.md · KKTC 3 (yerel satışta normal vergi),
               KKTC 4 ve 6 (kâr transferi KKTC tarafında vergisiz; mukim
               olunan ülkenin kuralı ayrıca işliyor), KKTC 19 (yıllık bildirim).
     [ONAYLI]  sitede yayında: countryContent.ts · kktc · tax, paraYolu;
               accountingKktc.ts · takvim, faq; hizmetIcerik.ts · KKTC · vergi.

   KURALLAR: banka adı yazılmıyor. "Vergisiz" iddiası yok; muafiyet her
   cümlede şartıyla birlikte ("KKTC dışına ve Serbest Liman içine yapılan iş").

   BİLEREK YUMUŞATILANLAR
     · Serbest Liman şirketinin yıllık hesap ve beyanlarının TARİHİ notta ve
       teyitte yok (accountingKktc.ts · takvim: "Tarih YOK, soruldu"). Halka
       bu yüzden KKTC'nin GENEL beyan takvimini gösteriyor (nisan beyanname,
       mayıs ve ekim sonu ödeme) ve yalnız "iç piyasaya satışınız varsa"
       diye sunuluyor. Serbest Liman şirketinin iç piyasa geliri için bu
       takvimin birebir işlediği mali müşavirle teyit edilmeli.
     · Kâr payının Türkiye'deki yarı istisnası ve pasif gelir kuralı: kanun
       maddesi var ama Murat Bey "mali müşavire sorulmalı" dedi (docs/teslim/
       bilgi-ve-murat.md · 10). "Şartlar sağlanırsa", "sayılabiliyor".
     · Ceza tutarı yok: resmî kaynakta okunmadı. Hata kartları tutarsız,
       ceza merdiveni bu sayfada basılmıyor.
   ========================================================================= */

import type { VergiVeri } from "@/lib/vergiDubai";

export const VERGI_KKTC: VergiVeri = {
  ulke: "KKTC",
  yol: "/kktc/vergi",
  seo: {
    title: "KKTC'de Vergi Danışmanlığı: Serbest Liman Şirketi | Ortac Global",
    description:
      "KKTC Serbest Liman şirketinde vergi: muafiyetin şartı, iç piyasaya satış, yıllık beyanlar ve Türkiye tarafındaki kâr payı beyanı. Hangi geliriniz muafiyete giriyor, birlikte bakıyoruz.",
  },

  hero: {
    crumb: "KKTC · Vergi Danışmanlığı",
    title: "KKTC'de vergi danışmanlığı.",
    accent: "vergi danışmanlığı.",
    /* [ONAYLI] hizmetIcerik · kartlar · lead ("muafiyet şarta bağlı"). */
    lead: "Serbest Liman şirketinde vergi muafiyeti şarta bağlı. O şartın sizin işinizde sağlanıp sağlanmadığına bakıyor, Türkiye tarafındaki beyanı da birlikte ele alıyoruz.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
    trust: [
      { icon: "kalkan", line: "Muafiyetin şartı işinize göre değerlendiriliyor." },
      { icon: "defter", line: "1996'dan beri muhasebe ve vergi." },
    ],
  },

  /* [RESMÎ] 3 · [ONAYLI] countryContent · kktc · tax (satırlar ve ayrım
     şeması: aynı şirket, iki müşteri, iki sonuç). */
  cerceve: {
    id: "cerceve",
    heading: "Serbest Liman'da vergi çerçevesi.",
    accent: "vergi çerçevesi.",
    lead: "Vergi, işi kime yaptığınıza göre değişiyor. KKTC dışına ve Serbest Liman içine yapılan işte kurumlar ve gelir vergisi yok.",
    gorsel: {
      tur: "ayrim",
      kaynak: { ad: "Serbest Liman şirketiniz", alt: "Faturayı şirket kesiyor" },
      yollar: [
        { etiket: "KKTC dışı ya da Serbest Liman içi", deger: "%0", line: "Kurumlar ve gelir vergisi yok, KDV yok.", ton: "yesil" },
        { etiket: "KKTC içindeki yerel şirket", deger: "Normal vergi", line: "Gümrük, KDV ve kurumlar vergisi kuralları uygulanıyor.", ton: "amber" },
      ],
    },
    kartlar: [
      { deger: "%0", etiket: "Kurumlar vergisi", line: "KKTC dışına ve Serbest Liman içine yapılan işte.", ton: "yesil" },
      { deger: "%0", etiket: "Gelir vergisi", line: "Aynı şartla.", ton: "yesil" },
      { deger: "Yok", etiket: "KDV", line: "Serbest Liman şirketi KDV mükellefi değil.", ton: "yesil" },
      { deger: "Serbest", etiket: "Kâr transferi", line: "Mukim olduğunuz ülkenin kuralı ayrıca işliyor.", ton: "mavi" },
    ],
  },

  /* [ONAYLI] hizmetIcerik · KKTC · vergi kartları ve adımları;
     accountingKktc · kapsam ("vergi çıkmasa da … veriyor"). */
  kapsam: {
    id: "kapsam",
    heading: "Bu hizmette ne yapıyoruz?",
    accent: "ne yapıyoruz?",
    lead: "Hangi gelirinizin muafiyete girdiğine bakıyoruz. Kayıtlar ve yıllık beyanlar muhasebe ekibimizle birlikte yürüyor.",
    items: [
      { icon: "kalkan", title: "Muafiyetin şartı", line: "İşiniz KKTC dışına mı, Serbest Liman içine mi; değerlendiriyoruz." },
      { icon: "harita", title: "Yerel satışın ayrılması", line: "KKTC içine satışta normal kurallar işliyor; işlemleri ayırıyoruz." },
      { icon: "defter", title: "Kayıt düzeni", line: "Muafiyetin dayanağı düzgün tutulan kayıtlar; düzeni birlikte kuruyoruz." },
      { icon: "dosya", title: "Yıllık hesap ve beyanlar", line: "Vergi çıkmasa da şirket her yıl bilançosunu ve yıllık raporlarını veriyor." },
      { icon: "kisi", title: "Kâr payı ve Türkiye", line: "Kazancın Türkiye tarafındaki beyanını birlikte ele alıyoruz." },
      { icon: "pusula", title: "Yıl içi takip", line: "Müşteri yapınız ya da gelir türünüz değişirse yeniden bakıyoruz." },
    ],
    haric: {
      baslik: "Bu hizmetin dışında kalanlar",
      items: [
        "Aylık muhasebe kaydı (muhasebe hizmetinde)",
        "Yıllık faaliyet harcının kendisi",
        "Türkiye'deki kişisel beyannameniz",
        "Vergi sonucu için garanti",
      ],
    },
  },

  /* İlk üç kalem [ONAYLI] accountingKktc · takvim (tarih yok; soruldu).
     Dördüncü kalem ve halka [RESMÎ] 7: kurumlar vergisi beyannamesi nisan,
     ödeme 31 Mayıs ve 31 Ekim. KKTC'nin genel takvimi; yalnız iç piyasa
     satışı olan şirket için (dosya başı · yumuşatılanlar). */
  takvim: {
    id: "takvim",
    heading: "Yıl içinde vergi takvimi.",
    accent: "vergi takvimi.",
    lead: "Vergi çıkmasa da yıllık yükümlülükler sürüyor. KKTC içine satışınız varsa genel beyan takvimi de işliyor.",
    ornek: { ust: "İç piyasa satışı", alt: "Genel takvim" },
    isaretler: [
      { ad: "Kurumlar vergisi beyannamesi", ton: "ana", aylar: [4] },
      { ad: "Kurumlar vergisi ödemesi", ton: "yesil", aylar: [5, 10] },
    ],
    kalemler: [
      { sure: "Yıl sonu", ne: "Yıllık hesaplar", kural: "Dönem kapanıyor, bilanço hazırlanıyor." },
      { sure: "Her yıl", ne: "Beyan ve yıllık raporlar", kural: "Vergi çıkmasa da ilgili mercilere veriliyor; zorunlu." },
      { sure: "Her yıl", ne: "Yıllık faaliyet harcı", kural: "Vergi değil, sabit bir bedel; her yıl ödeniyor." },
      { sure: "Nisan", ne: "İç piyasa satışı varsa", kural: "Kurumlar vergisi beyannamesi nisanda; ödeme mayıs ve ekim sonunda." },
    ],
  },

  /* [ONAYLI] countryContent · kktc · paraYolu (çerçeve ve gerekçesi orada).
     İstisna oranı yazılmadı. */
  turkiye: {
    id: "turkiye",
    heading: "Türkiye'de yaşıyorsanız vergi nerede çıkıyor?",
    accent: "vergi nerede çıkıyor?",
    lead: "Kâr şirkette kalıp şirketin işine harcandıkça KKTC'de vergi doğmuyor. Vergi, kâr size kişisel gelir olarak geçtiğinde çıkıyor.",
    duraklar: [
      { ikon: "kure", kim: "Müşteriniz", yer: "KKTC dışında", vergi: "Fatura", line: "Faturayı şirketiniz kesiyor, ödeme şirket hesabına geliyor.", ton: "notr" },
      { ikon: "sirket", kim: "Şirketiniz", yer: "Serbest Liman'da", vergi: "%0", line: "Bu işte kurumlar ve gelir vergisi yok, KDV yok.", ton: "sifir" },
      { ikon: "kisi", kim: "Siz", yer: "Türkiye'de", vergi: "Beyan", line: "Kâr payı size geçerse yıllık beyannamenizde beyan ediliyor.", ton: "beyan" },
    ],
    ayrintilar: [
      { baslik: "Gelir ağırlıkla pasifse", line: "Gelirin ağırlığı faiz, kira ya da lisans gibi pasif gelirse, dağıtılmayan kâr da ortağın geliri sayılabiliyor." },
      { baslik: "Şirket Türkiye'den yönetilirse", line: "İşlerin fiilen Türkiye'de toplanıp yönetildiği bir şirket Türkiye'de kurumlar vergisi mükellefi sayılabiliyor." },
      { baslik: "Kişiye özel görüş", line: "Kişiye özel vergi görüşü vermiyoruz; durumunuzu görüşmede konuşuyoruz." },
    ],
  },

  /* [TEYİT] KKTC 3, 4, 6 · [ONAYLI] accountingKktc · faq. Ceza tutarı yok. */
  hatalar: {
    id: "hatalar",
    heading: "Sık yapılan hatalar.",
    accent: "hatalar.",
    lead: "Şirket tarafında vergi çıkmaması, hiçbir yerde vergi çıkmayacağı anlamına gelmiyor.",
    items: [
      { icon: "kalkan", title: "Muafiyeti koşulsuz sanmak", line: "Muafiyet yalnız KKTC dışına ve Serbest Liman içine yapılan iş için geçerli." },
      { icon: "harita", title: "İç piyasa satışını ayırmamak", line: "KKTC içindeki yerel şirkete satışta gümrük, KDV ve kurumlar vergisi kuralları uygulanıyor." },
      { icon: "dosya", title: "Vergi yok diye beyan vermemek", line: "Vergi çıkmasa da bilanço ve yıllık raporlar her yıl veriliyor." },
      { icon: "kisi", title: "Kâr payını Türkiye'de beyan etmemek", line: "Türkiye'de yaşıyorsanız kâr payı yıllık beyannamenize giriyor." },
      { icon: "pusula", title: "Şirketi Türkiye'den yönetmek", line: "Fiilen Türkiye'de yönetilen şirket Türkiye'de mükellef sayılabiliyor." },
      { icon: "takvim", title: "Yıllık harcı atlamak", line: "Faaliyet harcı vergi değil, sabit bir bedel; her yıl ödeniyor." },
    ],
  },

  /* [ONAYLI] hizmetIcerik.ts · KKTC · vergi · adimlar. */
  adimlar: {
    id: "surec",
    heading: "Adım adım nasıl çalışıyoruz?",
    accent: "nasıl çalışıyoruz?",
    lead: "Dört adım; ilki kuruluştan önce.",
    items: [
      { icon: "ara", title: "Faaliyetinize bakıyoruz", line: "Kime sattığınızı, işin nereye gittiğini dinliyoruz." },
      { icon: "kalkan", title: "Muafiyeti değerlendiriyoruz", line: "Hangi gelirin muafiyete girdiğini yazıyla bildiriyoruz." },
      { icon: "defter", title: "Kayıtları buna göre kuruyoruz", line: "Muafiyetin dayanağı olan kayıt düzenini kuruyoruz." },
      { icon: "pusula", title: "Yıl içinde takip ediyoruz", line: "Müşteri ya da gelir yapınız değişirse yeniden bakıyoruz." },
    ],
  },

  ilgili: {
    id: "ilgili",
    heading: "Vergiyle birlikte yürüyen hizmetler.",
    accent: "birlikte yürüyen hizmetler.",
    items: [
      { icon: "defter", title: "Muhasebe", line: "Aylık kayıt, yıllık hesaplar ve beyanlar.", href: "/kktc/muhasebe" },
      { icon: "banka", title: "Banka ve ödeme", line: "Kurumsal hesap ve kartla tahsilat.", href: "/kktc/banka-hesabi" },
      { icon: "kurulus", title: "Şirket kuruluşu", line: "Serbest Liman başvurusu, sermaye ve tescil.", href: "/kktc" },
    ],
  },

  /* İlk dört soru [ONAYLI] hizmetIcerik · sss (istisna cümlesi yumuşatıldı);
     beş ve altı [ONAYLI] accountingKktc · faq. */
  faq: {
    id: "sss",
    heading: "Sık sorulan sorular.",
    accent: "sorulan sorular.",
    items: [
      { q: "Gerçekten hiç vergi ödemiyor muyum?", a: "KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığınız işte kurumlar ve gelir vergisi yok, şirket KDV mükellefi değil. KKTC içindeki yerel şirkete satışta normal vergi kuralları uygulanıyor. Yıllık faaliyet harcı ise vergi değil, sabit bir bedel." },
      { q: "Bu yasal mı?", a: "Muafiyet Serbest Liman ve Bölge Yasası'ndan geliyor, yasal. Şartı KKTC dışına yönelik gerçek faaliyet ve düzgün tutulan kayıtlar." },
      { q: "Kâr payı alırsam Türkiye'de vergi öder miyim?", a: "Türkiye'de yaşıyorsanız kâr payını yıllık beyannamenizle beyan ediyorsunuz; şartlar sağlanırsa bir kısmı istisna. Kişiye özel vergi görüşü vermiyoruz." },
      { q: "Gelirim faiz, kira ya da lisans geliriyse?", a: "Gelirin ağırlığı bu tür pasif gelirse, dağıtılmayan kâr da ortağın geliri sayılabiliyor. Hizmet ve ticaret gelirinde durum farklı; görüşmede birlikte bakıyoruz." },
      { q: "Vergi çıkmıyorsa her yıl bir şey vermem gerekiyor mu?", a: "Evet, zorunlu. Vergi çıkmasa da Serbest Liman şirketi her yıl bilançosunu ve yıllık raporlarını veriyor." },
      { q: "Şirket KDV beyanı veriyor mu?", a: "KKTC dışındaki ve Serbest Liman içindeki şirketlere yaptığınız işte şirket KDV mükellefi değil. KKTC içindeki yerel şirkete satışta normal vergi kuralları uygulanıyor." },
      { q: "Kârı Türkiye'ye getirirsem KKTC'de vergi çıkar mı?", a: "Kâr transferi KKTC tarafında vergisiz. Vergi mukimi olduğunuz ülkenin kişisel vergi kuralları ayrıca işliyor." },
      { q: "Ücreti ne kadar?", a: "Kapsam şirketten şirkete değiştiği için sabit fiyat yazmıyoruz; görüşmeden sonra yazılı olarak bildiriyoruz." },
    ],
  },

  closing: {
    title: "Vergi tarafını birlikte netleştirelim.",
    accent: "birlikte netleştirelim.",
    cta: { label: "İletişime geçin", href: "/iletisim" },
  },
};
