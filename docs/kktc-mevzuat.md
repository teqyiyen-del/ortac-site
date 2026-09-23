# KKTC şirket kuruluşu mevzuatı: doğrulanmış notlar

Kontrol tarihi (tüm maddeler): **22 Eylül 2026**. Kaynaklar birincil: KKTC resmî
kurumları (rkmmd.gov.ct.tr, sliman.gov.ct.tr, vergi.gov.ct.tr, csgb.gov.ct.tr,
muhaceretdairesi.gov.ct.tr), yasa metinleri (mevzuat.mahkemeler.net,
mevzuat.gov.ct.tr) ve ödeme sağlayıcılarının kendi sayfaları.
Etiketler: **[RESMÎ]** resmî sayfada okundu · **[DOĞRULANAMADI]** resmî kaynakta yok.
Sitedeki KKTC metni (`src/lib/countryContent.ts · kktc`) yalnız [RESMÎ] maddeleri
iddia olarak kullanır; kalanı docs/teyit-listesi.md'de sorudur.

Eski site (ortacglobal.com/kibris) AI ile yazılmıştı ve müşteri "çok güvenme"
dedi; kaynak olarak KULLANILMADI, yalnız iddiaları sınandı (en altta).

---

## 1. Şirket türleri

| Tür | Özü | Kaynak |
|---|---|---|
| Limited şirket (Fasıl 113) | Özel limited: 2-50 üye. Halka açılımlı limited: en az 7 kurucu. KKTC'de ayrı bir "anonim şirket" türü YOK; KKTC'deki "limited" Türkiye'deki anlamla karıştırılmamalı (RKMMD bunu açıkça yazıyor). En az 1 direktör (halka açıkta 2) ve bir sekreter; tek direktör sekreter olamaz (md. 170-171). Kayıtlı yazıhane şart, adres 14 günde bildirilir. Yasa metninde yerli direktör şartı yok. | rkmmd.gov.ct.tr prosedür 06.11.2024 · mevzuat.mahkemeler.net/Yasalar/f_113.doc |
| Yabancı ortaklı limitedde asgari sermaye | **25.000 EUR karşılığı TL.** (YAGA'nın 2021 SSS'i hâlâ 50.000 EUR diyor, eski.) | https://rkmmd.gov.ct.tr/Portals/50/Turkce%20prosedur%2006_11_2024.pdf |
| Serbest Liman ve Bölge şirketi (26/1983 + Fasıl 113) | 2-50 hissedar, uyruk kısıtı yok. Ortakların tamamı KKTC yurttaşıysa 15.000 TL; tek bir KKTC dışı ortak (TC dahil) varsa **50.000 EUR**. Başvuru harcı 200 USD, tescil harcı 2.500 USD. Bölgeden KKTC iç piyasasına giden mal muafiyet dışında: gümrük ve KDV tam ödenir. | https://sliman.gov.ct.tr/SLBM-ŞİRKET-HAK/ŞİRKET-MÜRACATI-VE-TESCİLİ · .../VERGİ-YÜKÜMLÜLÜKLERİ-VE-MUAFİYETLER |
| Uluslararası İşletme Şirketi, UİŞ (38/2005; 27/2007 ve 48/2011 ile değişik) | Tüm faaliyeti yurt dışına yönelik, geliri yurt dışından (md. 9) → KKTC içinde satış YOK. KKTC bankasından finansman alamaz (md. 10). Ödenmiş sermaye en az 20.000 EUR (md. 5), başvuru harcı 500 EUR (md. 6). Bakanlık ön izni en geç 15 gün, sonra 2 ay içinde tescil (md. 7). Yerli temsilci (KKTC'de oturan mali müşavir ya da avukat) şart, yoksa bir direktör KKTC yurttaşı (md. 17). Ofis açarsa en az 1 KKTC yurttaşı çalıştırır, yabancı personel yerlinin en çok 3 katı. | https://mevzuat.mahkemeler.net/Yasalar/38-2005.doc |
| Şube | Ekonomi Bakanlığı onayı + Bakanlar Kurulu izni; KKTC'de oturan tebligat temsilcisi. | RKMMD prosedür md. 5 |
| Şahıs işletmesi / ticari unvan (Fasıl 116) | RKMMD KKTC kimlik kartı istiyor; yabancının bu yolla kurup kuramayacağı açık değil. [DOĞRULANAMADI] | RKMMD SSS 8-10 |

## 2. Yabancı ortak

- Yabancının şirket kurması, ortak olması, payını %49'un üstüne çıkarması, sermaye artırımı vb. için **Ekonomiden Sorumlu Bakanlık onayı**. Limited ortaklığı için Bakanlar Kurulu onayı YOK; o yalnız şube için. [RESMÎ] RKMMD prosedür md. 2(d), 5.
- Yabancı ortağın sermaye payı KKTC'de bir bankada **bloke** edilir; tescilden sonra Mukayyitlik onaylı belgeyle çözülür. [RESMÎ] RKMMD SSS 7, prosedür md. 2(c)(iv).
- **Türkiye vatandaşları yabancı sayılır.** [RESMÎ] 63/2006 Yabancıların Çalışma İzinleri Yasası tanımı ("KKTC yurttaşı veya Kıbrıs yerlisi olmayan"); Serbest Liman sayfası "KKTC harici hissedar (TC veya diğer ülkeler)"; RKMMD TC'li yatırımcıdan adli sicil istiyor.

## 3. Vergi

| Başlık | Değer | Kaynak |
|---|---|---|
| Kurumlar vergisi | **%10** (KV Yasası 41/1976 md. 23; birleşik metin 2019) | vergi.gov.ct.tr/sites/default/files/41-1976%20%281%29%2001.04.2019%20KV.doc |
| Kâr payı stopajı | **%15**; dağıtılmayan kazançtan da beyan süresinde %15. Toplam yük **%23,5** (100 → 10 + 90'ın %15'i 13,5). | Gelir Vergisi Yasası 24/1982 md. 32(1)(c), 32(2); birleşik metin 25.5.2026 |
| Yerleşik olmayan ortağın stopajı | Kesin vergi; iade/mahsup yok. TC-KKTC çifte vergilendirme anlaşmasının (49/1988) etkisi okunmadı [DOĞRULANAMADI]. | GV md. 31(7), 32 |
| KDV | Genel oran **%16**; ayrıca %0, %5, %10, %20. Yasal taban %10, Bakanlar Kurulu tüzükle %20'ye kadar çıkarabiliyor. | 2025 Yılı KDV Oranları Tüzüğü, birleşik 16.09.2026 (vergi.gov.ct.tr) |
| Serbest Liman | Bölgedeki faaliyet kazancı gelir ve kurumlar vergisinden, gümrükten muaf; iç piyasaya yönelik işlem muafiyet dışında. Kâr transferi serbest. | sliman vergi sayfası |
| UİŞ | Matrahın **%1**'i, dönemden sonra 5 ay içinde (48/2011 ile değişik md. 13). Temettüde vergi yok. Yıllık işletme harcı 5.000 EUR (md. 18). DİKKAT: ekonomi.gov.ct.tr'deki PDF 27/2007 sürümü (%2,5), ESKİ. | mevzuat.mahkemeler.net/Yasalar/38-2005.doc |

## 4. Kuruluş sırası [RESMÎ, RKMMD SSS 4 + prosedür]

1. İsim yoklaması (RKMMD, pullu form)
2. Ana sözleşme ve tüzük (Türkçe)
3. M.Ş.1-2-3 formları (Serbest Liman'da M.Ş.1 mahkeme onaylı)
4. Yabancı ortak için: pasaport sureti (TC/ABD/İngiltere/AB için noter onayı yeterli), sabıka kaydı, banka bloke yazısı, Ekonomi Bakanlığı onayı
5. Yabancı direktör için: Vergi Dairesi'nden vergi güvenilirlik belgesi
6. Sermaye harcı, tescilden önce Gelir ve Vergi Dairesi'ne
7. Tescil
Sonra: vergi kaydı (Vergi Usul Yasası 27/1977 md. 94) · işveren tescili SS2 (Sosyal Sigortalar).
Limited için resmî süre YAYIMLANMAMIŞ [DOĞRULANAMADI]; UİŞ'in yasal süreleri toplamı 10 günü aşıyor.

## 5. Banka ve ödeme

- Yabancı ortaklı şirket KKTC bankasında hesap açabiliyor (bloke zaten orada). [RESMÎ]
- Şahsen gitme zorunluluğu için KKTC'ye özgü düzenleme bulunamadı. [DOĞRULANAMADI]
- Döviz serbest (38/1997 Para ve Kambiyo Yasası). [RESMÎ]
- **Stripe** (stripe.com/global), **PayPal** (paypal.com/.../country-worldwide), **Wise** (wise.com/help/articles/2813542): listede "Cyprus" (AB üyesi güney) var, Northern Cyprus / TRNC YOK. [RESMÎ, sağlayıcı sayfası] Payoneer ülke listesi yayımlamıyor [DOĞRULANAMADI].

## 6. Oturum ve çalışma

- Şirket sahipliği otomatik izin vermez. KKTC'de oturan ve işveren olarak çalışan yabancı direktör ve ortaklar Çalışma Bakanlığı'ndan **iş kurma izni** almak zorunda (63/2006 md. 2, 5(3), 11-13). İzin 6-24 ay. [RESMÎ] csgb.gov.ct.tr/YABANCICALISMAIZNI
- İş kurma/çalışma izni olan yabancı belirli koşullarla daimi ikamete başvurabilir (51/2015). [RESMÎ]
- Yabancı başına yerli çalıştırma oranı (genel limited): [DOĞRULANAMADI]; yalnız UİŞ'te 3'e 1.

## 7. Kuruluş sonrası

- Yıllık rapor: genel kuruldan sonra 42 gün içinde Mukayyitliğe (Fasıl 113 md. 120). [RESMÎ]
- Direktör/sekreter değişikliği 14 gün içinde. [RESMÎ]
- Her genel kurulda denetçi atanır (md. 153) → tüm limitedlerde. [RESMÎ]
- Kurumlar vergisi beyannamesi **Nisan**; ödeme 31 Mayıs ve 31 Ekim. [RESMÎ] vergi.gov.ct.tr beyan takvimi 23.10.2023
- KDV beyannamesi **aylık**, izleyen ayın 15'i. [RESMÎ] KDV Yasası md. 38, 40
- UİŞ: yıllık harç 5.000 EUR (Ocak sonu), denetlenmiş hesaplar 4 ay içinde. Limited için yıllık ruhsat harcı bulunamadı.

## 8. Para

TL resmî para; döviz bulundurma, dövizle sözleşme ve yurt dışına transfer serbest, yalnız toplamlar Merkez Bankası'na bildirilir (38/1997). [RESMÎ]

---

## Eski site iddiaları

| İddia | Sonuç |
|---|---|
| Yerel şirkette kurumlar vergisi %10 | DOĞRU ama eksik: %15 stopajla toplam %23,5 |
| Serbest liman / UİŞ %0-1 | KISMEN: Serbest Liman %0 (bölge içi), UİŞ %1; iki ayrı rejim |
| Yurt dışına kâr transferi vergiden muaf | KISMEN: transfer serbest; limitedde kâr payından %15 |
| 25.000 EUR bloke hesap | DOĞRU (yabancı ortaklı limited); Serbest Liman'da 50.000 EUR |
| Bakanlar Kurulu onayı | KISMEN: limited için Ekonomi Bakanlığı; Bakanlar Kurulu şubede |
| 10 günde kuruluş | DOĞRULANAMADI |
| Limited, Anonim, şahıs işletmesi, serbest liman, UİŞ | KISMEN: "anonim" yok; şahıs işletmesi KKTC kimliği istiyor |

## Açık kalanlar
Limitedin toplam kuruluş süresi · bankada şahsen başvuru · Payoneer · TC-KKTC
çifte vergilendirme anlaşmasının stopaja etkisi · iş kurma izni tüzüğündeki
yerli çalışan oranı · KV Yasası'nın 2019 sonrası değişiklikleri.

---

# İkinci doğrulama turu · 23.09.2026 (yeni bölümler için)

## 9. Türkiye tarafı vergi (Türkiye'de yaşayan TC vatandaşı ortak)
- Yurt dışı şirketten kâr payı menkul sermaye iradı; sınırı aşarsa tamamı beyan (GVK md. 75/2-1, 86/1-d; 2026 geliri için 22.000 TL). [RESMÎ] mevzuat.gov.tr/MevzuatMetin/1.4.193.pdf · GİB MSİ rehberi 2026
- 2024'ten beri: sermayenin en az %50'sine sahip ve kâr payını beyanname tarihine kadar Türkiye'ye getiren için yarısı istisna (GVK md. 22/4). [RESMÎ]
- KKTC'de ödenen vergi mahsup (GVK md. 123; anlaşma md. 22/1-c). [RESMÎ]
- Dağıtılmayan kâr: GVK md. 75/2-2 (2007 ek) KVK md. 7 şartları birlikte oluşursa gerçek kişi ortağa da uygulanıyor: %50+ kontrol, hasılatın %25+'ı pasif gelir, vergi yükü %10'dan az, hasılat 100.000 YTL üstü. Serbest Liman kazancı muaf olduğu için vergi yükü şartı büyük ihtimalle sağlanıyor; belirleyici gelir türü. [RESMÎ]
- İş merkezi: KVK md. 3/6 "işlemlerin fiilen toplandığı ve yönetildiği merkez"; Türkiye'deyse tam mükellef (md. 3/1). Anlaşma md. 4/3 çift mukimlikte "kanuni merkez"i esas alıyor; ikisinin birlikte işleyişine GİB yorumu [DOĞRULANAMADI].
- Türkiye–KKTC Çifte Vergilendirmeyi Önleme Anlaşması: imza 22.12.1987, RG 26.12.1988/20031, uygulama 01.01.1989; kâr payında KKTC en çok %20 (≥%25 pay sahibi kurumsa %15). [RESMÎ] gib.gov.tr uluslararası mevzuat · KKTC.htm

## 10. Ödeme kanalları (sağlayıcıların kendi listeleri, 23.09.2026)
Stripe, PayPal, Wise, Amazon Seller Central, Etsy, Shopify Payments: listede "Cyprus" (güney) var, Northern Cyprus YOK. [RESMÎ] Payoneer liste yayımlamıyor [DOĞRULANAMADI].
KKTC postasının dünya bağlantısı T.C. Posta üzerinden (posta.gov.ct.tr) [RESMÎ]; "Mersin 10" ve platformların adresi Türkiye görmesi hakkında resmî açıklama yok.
Kıbrıs İktisat Bankası: yurt dışı gelen para Vakıfbank (TVBATR2A) üzerinden, TR IBAN, 12 para birimi [RESMÎ banka sayfası].

## 11. Sermaye ve bloke (Serbest Liman)
- Asgari sermaye: ortakların tamamı KKTC vatandaşıysa 15.000 TL; biri bile KKTC dışındaysa 50.000 €. [RESMÎ] sliman.gov.ct.tr şirket müracaatı
- Bloke: tescil günü yabancı ortakların payı kadar tutar için KKTC bankasından bloke yazısı; örnek 50.000 € sermaye, %50 TC ortak → 25.000 €. İki TC ortakta 50.000 €. [RESMÎ]
- Çözülme: tescil sonrası Mukayyitlik onaylı belgeyle bankaya başvurulup şirket adına çözülüyor (RKMMD SSS 7; yerel şirket için yazılmış, usul aynı). [RESMÎ]
- En az 2, en çok 50 ortak; tek kişiyle kurulamıyor. Başvuru harcı 200 USD, tescil harcı 2.500 USD. [RESMÎ]
- Onay: Serbest Liman yönetim kurulu, sonra Bakanlar Kurulu; resmî süre yok. [RESMÎ / süre DOĞRULANAMADI]
- Tasfiye: gönüllü (Fasıl 113 md. 203, 261-263); önce bilanço ve yıllık raporlar verilmiş olmalı, karar 14 günde Resmî Gazete'de. [RESMÎ, KTTO kopyası]
- Sunumdaki 25.000 € yalnız ortakların yarısı KKTC vatandaşıysa doğru; RKMMD'nin 25.000 €'su yerel (serbest liman dışı) şirket için.
