/* ============================================================================
   KKTC · KURUMSAL DANIŞMANLIK — sayfanın bütün metni
   Sayfa: app/kktc/kurumsal-danismanlik/page.tsx
   Gövde: components/services/KurumsalSayfa.tsx · Biçim: lib/kurumsalDubai.ts
   (KurumsalVeri; sayfanın gerekçesi de o dosyanın başında)

   09.10.2026 · İLK YAZIM. Sayfa o güne kadar genel şablonun boş hâliydi ve
   yayında değildi (lib/routes.ts · STATIC_LIVE'a bu turda girdi).

   KKTC'de sitenin anlattığı yapı SERBEST LİMAN VE BÖLGE ŞİRKETİ (26/1983 +
   Şirketler Yasası Fasıl 113). Banka adı YAZILMIYOR (teyit · KKTC 20).

   ------------------------------------------------------------ KAYNAK DÜZENİ
     [DOC]    docs/kktc-mevzuat.md (resmî kaynaklardan, tarihleri orada):
              2-50 ortak, uyruk kısıtı yok (md. 1, 11); en az bir direktör ve
              bir sekreter, tek direktör sekreter olamaz (Fasıl 113 md.
              170-171); kayıtlı yazıhane şart, adres 14 günde bildirilir;
              direktör ve sekreter değişikliği 14 gün; yıllık rapor genel
              kuruldan sonra 42 gün (md. 120); her genel kurulda denetçi
              (md. 153); yabancı ortağın payı kadar bloke, tescilden sonra
              çözülür; gönüllü tasfiye, önce bilanço ve yıllık raporlar,
              karar 14 günde Resmî Gazete'de (md. 203, 261-263).
     [TEYİT]  docs/teyit-cevaplar-1.md (Murat Bey, 27.09.2026): Türkiye
              vatandaşı yabancı sayılır ve bloke pay oranında (KKTC 13);
              satış kuralı ve iç piyasa (KKTC 2, 3); banka adı yok (20).
     [ONAYLI] accountingKktc.ts: şirket pasif olsa da yıllık hesaplar
              hazırlanıyor ve beyanlar veriliyor.

   BİLEREK YUMUŞATILANLAR:
     · ŞİRKET KAPATMAYI ORTAC'IN YÜRÜTÜP YÜRÜTMEDİĞİ BİLİNMİYOR (tekrar
       soruldu · KKTC 55, cevap yok). Sayfa tasfiyenin KURALINI anlatıyor,
       "biz yürütüyoruz" demiyor; kapsamda "tasfiye sürecinin planlanması".
     · Sonradan ortak girişi ve sermaye artırımında hangi makamın onayının
       gerektiği yazılmadı: belgedeki Bakanlık onayı yerel şirket usulünde
       geçiyor, Serbest Liman için teyitli değil. Sayfa "izin gerekiyorsa
       başvurudan önce söylüyoruz" diyor.
     · Yıllık beyanın ayı yazılmadı (Nisan yerel şirket takvimi; Serbest
       Liman şirketinde her yıl neyin verildiği tekrar soruldu · KKTC 19).
     · Harç, sermaye tutarı ve süre sayfada yok: fiyat yazmıyoruz; tutarlar
       ülke sayfasında (/kktc).
     · KKTC'de bu hizmetin kapsamı Murat Bey'in teyidini bekliyor
       (docs/teslim/bilgi-ve-murat.md · madde 15).
   ========================================================================= */

import { KURUMSAL_DALLAR, type KurumsalVeri } from "@/lib/kurumsalDubai";

const CTA = { label: "İletişime geçin", href: "/iletisim" };

export const KURUMSAL_KKTC: KurumsalVeri = {
  ulke: "KKTC",
  slug: "kktc",

  hero: {
    crumb: "KKTC · Kurumsal Danışmanlık",
    title: "KKTC'de kurumsal danışmanlık.",
    accent: "kurumsal danışmanlık.",
    lead: "Serbest Liman ve Bölge şirketinde ortak, direktör ve adres değişiklikleri tescile bağlı. Bildirimleri, yıllık raporu ve şirket kayıtlarını kuruluşu yapan ekip takip ediyor.",
    cta: CTA,
    trust: [
      { icon: "takvim", line: "Direktör ve adres değişikliği 14 gün içinde bildiriliyor." },
      { icon: "dunya", line: "Dubai, İngiltere ve KKTC'de kendi ofisimiz var." },
    ],
  },

  /* ----------------------------------------------------- 1 · NE ZAMAN GEREKİR */
  durum: {
    id: "ne-zaman",
    heading: "Ne zaman gerekir?",
    accent: "gerekir?",
    lead: "Şirketin tescildeki kaydına dokunan her iş. En sık karşılaştığımız altı durum:",
    items: [
      { icon: "yonetici", title: "Direktör ya da sekreter değişiyor", line: "Değişiklik 14 gün içinde Şirketler Mukayyitliği'ne bildiriliyor." },
      { icon: "ortak", title: "Ortak giriyor ya da çıkıyor", line: "Şirket en az iki ortakla duruyor; yabancı ortakta bloke şartına yeniden bakılıyor." },
      { icon: "sermaye", title: "Sermaye artırılacak", line: "Karar alınıp tescil ettiriliyor; izin gerekiyorsa başvurudan önce söylüyoruz." },
      { icon: "adres", title: "Kayıtlı adres değişiyor", line: "Şirketin kayıtlı yazıhanesi olmak zorunda; yeni adres 14 gün içinde bildiriliyor." },
      { icon: "dunya", title: "İkinci bir ülke düşünüyorsunuz", line: "Üç ülkede ofisimiz var; hangisinin işinize uyduğuna birlikte bakıyoruz." },
      { icon: "kapat", title: "Şirketi kapatmak istiyorsunuz", line: "Kapanış gönüllü tasfiyeyle oluyor; önce bilanço ve yıllık raporlar verilmiş olmalı." },
    ],
  },

  /* ------------------------------------------------------------ 2 · YAPI */
  yapi: {
    id: "yapi",
    heading: "Yapıyı işinize göre kuruyoruz.",
    accent: "işinize göre kuruyoruz.",
    lead: "Çoğu iş için tek şirket yeterli. İkinci bir ülke, işiniz gerçekten gerektiriyorsa ekleniyor.",
    agac: { ust: "Siz ve ortaklarınız", dallar: KURUMSAL_DALLAR },
    items: [
      { icon: "ortak", title: "Ortak, direktör ve sekreter", line: "En az iki ortak; uyruk kısıtı yok. En az bir direktör ve ayrı bir sekreter gerekiyor." },
      { icon: "sermaye", ton: "yesil", title: "Sermaye ve bloke", line: "Yabancı ortağın payı kadar tutar bankada bloke ediliyor; tescilden sonra çözülüyor." },
      { icon: "uyari", ton: "amber", title: "Vergi ayrı değerlendirilir", line: "Muafiyet Serbest Liman'daki faaliyet için; iç piyasaya satışta genel kurallar geçerli." },
    ],
  },

  /* ---------------------------------------------------------- 3 · KAPSAM */
  kapsam: {
    id: "kapsam",
    heading: "Neleri üstleniyoruz?",
    accent: "üstleniyoruz?",
    lead: "Üç başlıkta topluyoruz: yapının planı, değişiklik bildirimleri ve yıllık kayıtlar.",
    gruplar: [
      { icon: "yapi", title: "Yapı ve planlama", maddeler: ["Ortak, direktör ve sekreter yapısı", "Sermaye ve bloke planı", "Uluslararası iş yapılandırması", "Çok ülkeli yapı değerlendirmesi"] },
      { icon: "devir", title: "Değişiklik bildirimleri", maddeler: ["Direktör ve sekreter değişikliği", "Ortak değişikliği ve pay devri", "Sermaye artırımı", "Kayıtlı adres değişikliği"] },
      { icon: "takvim", title: "Yıllık kayıtlar", maddeler: ["Yıllık rapor takibi", "Genel kurul ve denetçi ataması", "Karar metinlerinin hazırlanması", "Tasfiye sürecinin planlanması"] },
    ],
    haric: {
      title: "Kapsam dışında",
      maddeler: ["Resmî harçlar teklifte ayrı satır", "Banka hesabı kararı bankaya ait", "Hukuki temsil ve dava takibi"],
    },
  },

  /* ------------------------------------------------------ 4 · DEĞİŞİKLİK */
  degisiklik: {
    id: "degisiklik",
    heading: "Bir değişiklik nasıl kayda geçiyor?",
    accent: "nasıl kayda geçiyor?",
    lead: "Üç durak: şirketin kararı, resmî başvuru ve tescil.",
    akis: [
      { ad: "Karar", alt: "Şirket karar alıyor" },
      { ad: "Başvuru", alt: "Belgeler veriliyor" },
      { ad: "Tescil", alt: "Kayıt güncelleniyor" },
    ],
    items: [
      { icon: "yonetici", title: "Direktör ve sekreter", line: "Atama ve ayrılma Şirketler Mukayyitliği'ne bildiriliyor.", tag: "14 gün" },
      { icon: "adres", title: "Kayıtlı adres", line: "Şirketin kayıtlı yazıhanesi değişince yeni adres bildiriliyor.", tag: "14 gün" },
      { icon: "ortak", title: "Ortak değişikliği", line: "Yeni ortağın belgeleri hazırlanıyor; yabancı ortakta bloke payı oranında doğuyor.", tag: "Bloke şartı", ton: "amber" },
      { icon: "onay", title: "Denetçi ataması", line: "Her genel kurulda denetçi atanıyor; bütün limited şirketler için geçerli.", tag: "Her yıl" },
      { icon: "kayit", title: "Yıllık rapor", line: "Genel kuruldan sonra Şirketler Mukayyitliği'ne veriliyor.", tag: "42 gün" },
      { icon: "kapat", title: "Gönüllü tasfiye", line: "Tasfiye kararı 14 gün içinde Resmî Gazete'de ilan ediliyor.", tag: "Önce raporlar", ton: "amber" },
    ],
  },

  /* ---------------------------------------------------------- 5 · TAKVİM */
  takvim: {
    id: "takvim",
    heading: "Şirketin bir yılı.",
    accent: "bir yılı.",
    lead: "Şirket pasif olsa da bu işler sürüyor; tarihleri sizin yerinize biz izliyoruz.",
    orta: "12 ay",
    kalemler: [
      { ay: 6, ad: "Genel kurul ve denetçi", zaman: "Her yıl", line: "Her genel kurulda denetçi atanıyor; kararlar kayda geçiriliyor." },
      { ay: 8, ad: "Yıllık rapor", zaman: "Genel kuruldan sonra 42 gün", line: "Rapor genel kuruldan sonra Şirketler Mukayyitliği'ne veriliyor." },
      { ay: 12, ad: "Yıllık hesaplar ve beyanlar", zaman: "Her yıl", line: "Şirket pasif olsa da yıllık hesaplar hazırlanıyor ve beyanlar veriliyor." },
      { ad: "Direktör, sekreter ve adres", zaman: "Değişiklikten sonra 14 gün", line: "Değişiklik olduğunda ayrıca bildiriliyor; yıl sonu beklenmiyor.", ton: "amber" },
      { ad: "Ortak ve sermaye", zaman: "Değişiklik olunca", line: "Yabancı ortak girişinde bloke şartına yeniden bakılıyor.", ton: "amber" },
    ],
  },

  /* ---------------------------------------------------------- 6 · ADIMLAR */
  adimlar: {
    id: "nasil",
    heading: "Nasıl çalışıyoruz?",
    accent: "çalışıyoruz?",
    lead: "Beş adım. Tescil kararını resmî makam veriyor; hazırlık ve takip bizde.",
    items: [
      { icon: "ara", title: "Durumu dinliyoruz", line: "Şirketin bugünkü kaydı, neyin değişeceği ve neden." },
      { icon: "yapi", title: "Gereken işlemi belirliyoruz", line: "Hangi bildirim gerekiyor, izin isteniyor mu, süre ne zaman başlıyor." },
      { icon: "dosya", title: "Karar ve belgeleri hazırlıyoruz", line: "Karar metni ve başvuru belgeleri tek listede; imza için sizi davet ediyoruz." },
      { icon: "onay", title: "Başvuruyu yürütüyoruz", line: "Resmî makamla yazışma bizde; sonucu makam belirliyor." },
      { icon: "kayit", title: "Kayıtları güncelliyoruz", line: "Yeni şirket belgeleri size teslim ediliyor; şirket kayıtları da güncelleniyor." },
    ],
  },

  /* ----------------------------------------------------------- 7 · İLGİLİ */
  ilgili: {
    id: "ilgili",
    heading: "Bağlı olduğu hizmetler.",
    accent: "hizmetler.",
    lead: "Yapıdaki bir değişiklik çoğu zaman muhasebeye, vergiye ve bankaya da dokunuyor.",
    items: [
      { icon: "kurulus", title: "Şirket kuruluşu", line: "Serbest Liman şirketi, sermaye ve tescil.", href: "/kktc" },
      { icon: "muhasebe", title: "Muhasebe", line: "Aylık kayıt, yıllık hesap ve beyanlar.", href: "/kktc/muhasebe" },
      { icon: "vergi", title: "Vergi danışmanlığı", line: "Beyannameler ve vergi yapısı.", href: "/kktc/vergi" },
      { icon: "uyum", title: "AML ve uyum", line: "Gerçek faydalanıcı ve uyum kayıtları.", href: "/kktc/aml-uyum" },
    ],
  },

  /* -------------------------------------------------------------- 8 · SSS
     Kapanış cevabı countryContent.ts · kktc · faq'taki onaylı cümle. */
  faq: {
    id: "sss",
    heading: "Sık sorulanlar.",
    accent: "sorulanlar.",
    items: [
      { q: "Kurumsal danışmanlık neyi kapsıyor?", a: "Serbest Liman şirketinin kuruluştan sonraki yapısal işlerini: direktör, sekreter ve ortak değişiklikleri, kayıtlı adres, genel kurul ve denetçi ataması, yıllık rapor ve karar metinleri." },
      { q: "Şirket tek ortakla devam edebilir mi?", a: "Hayır. Serbest Liman şirketi en az iki, en çok elli ortakla kuruluyor; ortakların ve direktörlerin uyruğu kısıtlı değil." },
      { q: "Türkiye vatandaşı ortak yabancı sayılıyor mu?", a: "Evet. KKTC yurttaşı olmayan her ortak yabancı sayılıyor. Yabancı ortağın payı kadar tutar bankada bloke ediliyor ve tescilden sonra çözülüyor." },
      { q: "Direktör ya da adres değişince ne yapmak gerekiyor?", a: "Değişikliği 14 gün içinde Şirketler Mukayyitliği'ne bildirmek. Karar metnini ve bildirimi biz hazırlıyoruz." },
      { q: "Her yıl neler veriliyor?", a: "Her genel kurulda denetçi atanıyor ve genel kuruldan sonra 42 gün içinde yıllık rapor veriliyor. Şirket pasif olsa da yıllık hesaplar hazırlanıyor ve beyanlar veriliyor." },
      { q: "Şirket nasıl kapatılır?", a: "Gönüllü tasfiyeyle. Önce tüm bilanço ve yıllık raporların verilmiş olması gerekiyor; tasfiye kararı Resmî Gazete'de ilan ediliyor." },
      { q: "Şirket kurmak vergi avantajı sağlar mı?", a: "Kendiliğinden hayır. Muafiyet Serbest Liman'daki faaliyetin kazancı için; kârı vergi mukimi olduğunuz ülkeye getirdiğinizde o ülkenin kuralları geçerli." },
      { q: "Ücreti ne kadar?", a: "Kapsam işleme göre değiştiği için sabit fiyat yazmıyoruz. Görüşmeden sonra, resmî harçlar ayrı satırda olacak şekilde teklif veriyoruz." },
    ],
  },

  closing: {
    title: "Şirketinizin yapısını birlikte gözden geçirelim.",
    accent: "birlikte gözden geçirelim.",
    cta: CTA,
  },
};
