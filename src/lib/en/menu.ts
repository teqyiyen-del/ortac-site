/* kaynak: src/components/NavIstemci.tsx · ozet: 763de5bd */
/* Menünün İngilizcesi (anahtar Türkçe yazı). Ülke adları lib/en/brand, hizmet
   adları ve kart altı satırları lib/en/services, araç adları lib/en/araclar.
   FARK: Kaynaklar panelindeki "son yazı" kartı İngilizce menüde yok (yazılar
   Türkçe); yerine blogun Türkçe olduğunu söyleyen kart (NavIstemci.tsx ·
   EN_BLOG_KART). "Panel girişi" İngilizcede "Client portal" (ürün adı yok). */
import type { Sozluk } from "@/lib/i18n/cevir";

export const EN_MENU: Sozluk = {
  Hizmetler: "Services",
  Araçlar: "Tools",
  Kaynaklar: "Resources",
  Kurumsal: "Company",
  "Ana menü": "Main menu",
  Menü: "Menu",
  Dil: "Language",
  "Panel girişi": "Client portal",
  "Kurulumu Başlat": "Get started",
  Başlat: "Start",
  "Menüyü kapat": "Close menu",
  "Menüyü aç": "Open menu",

  /* Hizmetler paneli */
  "Önce ülke": "Country first",
  "Hizmetler · önce ülke": "Services · country first",
  "(şu an bu ülkedesiniz)": "(you are on this country's page)",
  "Aşağıdaki başlıklar seçtiğiniz ülkeye göre değişiyor": "The services below change with the country you select",
  "Tüm hizmetleri gör": "See all services",
  "Hangi ülkenin uygun olduğundan emin değilseniz": "Not sure which country fits you?",
  "Üçünü yan yana görün": "Compare all three",
  "Uygunluk testi": "Eligibility test",
  "Emin değilim, bana uygun olanı bulun": "Not sure? Find what fits me",

  /* Araçlar paneli */
  "Araçların çıktısı bir ön değerlendirmedir, teklif değildir.": "Tool results are a preliminary assessment, not a quote.",
  "Tüm araçlar": "All tools",
  "Ülke karşılaştırma": "Country comparison",
  "Üç ülke yan yana": "Three countries side by side",

  /* Kaynaklar paneli */
  "Okumalık ve indirilebilir kaynaklar": "Reading and downloadable resources",
  "Konuyu açan yazılar, kaynağıyla": "Explainers with sources",
  "Ülke rehberleri": "Country guides",
  "Dubai, İngiltere, KKTC · adım adım yol": "Dubai, UK, Northern Cyprus · step by step",
  Gelişmeler: "Updates",
  "Neyin ne zaman değiştiği": "What changed and when",
  "E-kitaplar": "E-books",
  "İndirilebilir uzun içerik": "Downloadable long reads",

  /* Kurumsal paneli */
  Hakkımızda: "About us",
  "Ofis, lisans ve ekip": "Offices, licence and team",
  "İş ortaklığı": "Partnerships",
  "Danışman ve acente kanalı": "For advisers and agents",
  "Basında biz": "Press",
  "Basın kaydı ve medya iletişimi": "Press coverage and media contact",
  Kariyer: "Careers",
  "Açık pozisyonlar ve başvuru": "Open roles and applications",
  İletişim: "Contact",
  "Üç ofis, tek muhatap": "Three offices, one point of contact",
  "Üç ülkede ofis, tek muhatap": "Offices in three countries, one point of contact",
  "İletişim sayfasına gidin": "Go to the contact page",
  "İletişim: üç ülkede ofis, tek muhatap": "Contact: offices in three countries, one point of contact",
};
