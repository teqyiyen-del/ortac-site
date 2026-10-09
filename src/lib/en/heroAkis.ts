/* kaynak: src/components/home/HeroAkis.tsx · ozet: e6ce95de */
/* Ana sayfa girişinin İngilizcesi. Anahtar Türkçe cümlenin kendisi
   (lib/i18n/cevir). "1996'dan beri" satırı kelime sırası değiştiği için
   bileşenin içinde ("Since 1996"), sözlükte değil.
   Farklar: yok; olgular aynı (30 yıl, Dubai, Londra, KKTC). */
import type { Sozluk } from "@/lib/i18n/cevir";

export const EN_HERO: Sozluk = {
  /* "We\u00A0prepare": bölünmez boşluk. Başlık kelime kelime sarılıyor; düz
     boşlukla "We" ilk cümlenin satırında kalıyordu ("changing. We"). Vurgu
     metnin içinde birebir geçmek zorunda, ikisinde de aynı karakter. */
  "İş dünyası değişiyor. Sizi geleceğe hazırlıyoruz.": "Business is changing. We\u00A0prepare you for the future.",
  "Sizi geleceğe hazırlıyoruz.": "We\u00A0prepare you for the future.",
  "30 yıllık deneyim, Dubai, Londra ve KKTC'de uluslararası uzmanlıkla.":
    "30 years of experience and international expertise in Dubai, London and Northern Cyprus.",
  "Uzmanlık alanlarımız": "Our areas of expertise",
  "Bizimle iletişime geçin": "Get in touch",
  /* bildirim akışı (temsilî) */
  "KDV beyanı gönderildi": "VAT return filed",
  "Dubai · dönem kapanışı": "Dubai · period close",
  "Tescil tamamlandı": "Registration completed",
  "Londra · Companies House": "London · Companies House",
  "Serbest Liman onayı geldi": "Free Port approval received",
  "KKTC · kuruluş": "Northern Cyprus · formation",
  "Kurumsal hesap açıldı": "Business account opened",
  "Dubai · banka dosyası": "Dubai · bank file",
  "Yıllık hesaplar teslim": "Annual accounts filed",
  "Londra · mali yıl sonu": "London · financial year end",
};
