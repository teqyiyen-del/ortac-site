# Sektör sayfaları: düzenleyici kurumlar ve kaynaklar

Kontrol tarihi: **25 Eylül 2026**. Sektör sayfalarında (`src/lib/sectors.ts`)
adı geçen kurum ve kuralların dayanağı. Ülke olguları (vergi, tahsilat,
kuruluş) zaten `docs/bae-mevzuat.md`, `docs/ingiltere-mevzuat.md`,
`docs/kktc-mevzuat.md` ve `src/lib/countryContent.ts`'ten geliyor; burada
yalnız sektöre özgü olanlar var.
Etiketler: **[RESMÎ]** kurumun kendi sayfasında okundu · **[İKİNCİL]** resmî
metin okunmadı, haber ya da meslek kuruluşu kaynağı · **[TEYİT]** Murat Bey'e
soruldu (src/lib/teyit/veri.json).

## Finans ve yatırım

- **İngiltere:** finansal hizmet veren firmaların çoğu FCA izni ya da kaydı
  istiyor ("Most firms providing financial services need to be authorised by
  us or registered with us"). [RESMÎ] fca.org.uk/firms/authorisation
- **BAE:** Merkez Bankası (CBUAE, Federal Decree Law 14/2018), SCA (Federal Law
  4/2000), DIFC'de DFSA, ADGM'de FSRA birlikte "Supervisory Authorities".
  DFSA'nın kapsamı DIFC'de ve DIFC'den yürütülen finansal hizmetler (varlık
  yönetimi, bankacılık, menkul kıymet, fon, saklama, sigorta …). [RESMÎ]
  rulebook.centralbank.ae · dfsa.ae/about-dfsa
- **KKTC:** finansal kiralama, faktoring, finansman şirketleri ve elektronik
  ödeme KKTC Merkez Bankası tebliğleriyle düzenleniyor (Finansal Kiralama,
  Faktoring ve Finansman Şirketleri Tebliği R.G. 1 · 4.01.2021; Elektronik
  Ödeme Sistemi Hakkında Tebliğ R.G. 44 · 29.02.2024). [RESMÎ, mevzuat
  listesi] kktcmerkezbankasi.org/tr/taxonomy/term/135 · Faaliyet izninin
  ayrıntısı [TEYİT].

## Sağlık ve medikal

- **Dubai:** Dubai'deki bütün sağlık tesisleri, Dubai Healthcare City serbest
  bölgesi (DHCC) dışında, DHA lisansı istiyor; başvuru DHA'nın çevrim içi
  sistemi (Sheryan) üzerinden; ticari lisans önceden alınmak zorunda değil;
  lisans faaliyete başlamadan önce etkinleştiriliyor. DHA tesislerin ve sağlık
  çalışanlarının lisans çerçevesini yürütüyor. [RESMÎ] dha.gov.ae · New
  Healthcare Facility License · Activate Healthcare Facility License
- **İngiltere (England):** düzenlenmiş faaliyet (Health and Social Care Act
  2008, Regulated Activities Regulations 2014 Sch. 1) yürüten kişi ya da
  kuruluş CQC'ye kayıt yaptırmak zorunda, yoksa suç işlemiş oluyor; kaydı
  faaliyeti yürüten tüzel kişi yaptırıyor. [RESMÎ] cqc.org.uk · scope of
  registration · who has to register
- **KKTC:** sağlık kuruluşu ruhsatının dayanağı resmî kaynakta okunamadı.
  Sayfada yalnız sitenin genel cümlesi var ("faaliyet konusuna göre ek izin
  veya ruhsat gerekebiliyor"). [TEYİT]

## Gayrimenkul

- **Dubai:** satış ve kiralama komisyonculuğu Dubai Tapu Dairesi'ne (DLD)
  bağlı RERA'nın lisansını istiyor; lisanstaki faaliyet, çalışan uygulama
  kartı alınmadan yürütülemiyor, kart için yıllık sınav var. [RESMÎ]
  dubailand.gov.ae · Real Estate Activity License · practice card
- **Dubai:** serbest bölge şirketlerinin Dubai'de freehold mülk sahibi
  olabilmesi DLD'nin o serbest bölgeyle yaptığı düzenlemelere bağlı (Masdar
  City, ADGM, AFZA mutabakatları). [RESMÎ] dubailand.gov.ae haberleri
- **İngiltere:** 500.000 sterlin üstü konutu olan şirket her yıl ATED beyanı
  veriyor (2026-27 döneminde 500.000-1 milyon bandı £4.600). [RESMÎ]
  gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics
- **KKTC:** yabancıların taşınmaz edinmesi İçişleri Bakanlığı başvurusu ve
  Bakanlar Kurulu iznine bağlı (52/2008 Taşınmaz Mal Edinme ve Uzun Vadeli
  Kiralama (Yabancılar) Yasası). [İKİNCİL] kibrisgazetesi.com, ktimb.org ·
  Yabancı ortaklı şirketin durumu [TEYİT].

## Danışmanlık

- **BAE:** vergi temsilciliği (FTA önünde temsil) FTA siciline kayıt
  istiyor; salt muhasebe hizmeti istemiyor. [RESMÎ] docs/bae-mevzuat.md · 12
- **İngiltere:** yatırım danışmanlığı düzenlenmiş finansal faaliyet → FCA
  (yukarıda). [RESMÎ]

## E-ticaret

Hepsi ülke belgelerinde: Stripe/PayPal/Wise/Amazon/Etsy/Shopify'ın KKTC'yi
listelememesi (kktc-mevzuat · 5, 10), Shopify Payments UK'nin İngiliz banka
hesabı istemesi ve EORI (ingiltere-mevzuat · 4, 7), KDV eşikleri (bae-mevzuat
· C, ingiltere-mevzuat · 4), Serbest Liman'da iç piyasaya giden malın gümrük
ve KDV'si (kktc-mevzuat · 1).
