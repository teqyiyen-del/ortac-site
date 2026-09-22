# Teyit listesi · müşteriye toplu sorulacaklar

Burak (22.09.2026): "emin olmadığın kısımları, bilgileri notuna tut, biz bunları
toplu olarak sorarız teyit etmek için."

Kural: sayfaya giren ama kaynağı müşteri ya da resmî bir kurum olmayan her cümle
buraya yazılır. Cevap gelince cümle düzeltilir ya da onaylanır, satır buradan
silinir ve kodda `[TEYİT]` etiketi `[ONAYLI]` olur. Kodda ilgili yer `SWAP:`
işaretiyle aranabilir.

Soru dili: müşteriye aynen okunabilecek, evet/hayır ya da tek cümleyle
cevaplanabilecek biçimde.

---

## 1 · Dubai Banka & Ödeme · /dubai/banka-hesabi · CANLI (22.09.2026)

Metin: `src/lib/bankaDubai.ts` · Sayfa: `src/app/dubai/banka-hesabi/page.tsx`

**Bankalar** (`SWAP:BANKA_TEYIT`)
1. Wio Business için "Dijital banka; hesap baştan sona çevrim içi yönetiliyor." doğru mu?
2. Mashreq NeoBiz için "Mashreq'in küçük ve orta ölçekli şirketlere dijital hesabı." doğru mu?
3. Emirates NBD için "BAE'nin büyük bankalarından; geleneksel kurumsal hesap." doğru mu?
4. Müşterilere en çok bu üç bankayı mı öneriyorsunuz, eklenecek ya da çıkacak banka var mı?

**Bankanın başvuruda baktığı şeyler** (`SWAP:BANKA_TEYIT`)
5. Dört başlık doğru mu, eksik var mı: faaliyet, ortaklık yapısı, paranın kaynağı, beklenen hacim?

**Ödeme ve tahsilat kanalları**
6. Stripe "sitenizde ve uygulamanızda kartla tahsilat" için mi kuruluyor?
7. Payoneer "pazaryerlerinden ve yurt dışındaki müşteriden ödeme alma" için mi?
8. PayPal "platform ve pazaryeri üzerinden tahsilat" için mi?
9. Binance hesabını müşteri için siz mi açıyorsunuz, yoksa yalnızca yönlendiriyor musunuz? Sayfada "kripto varlıkla çalışıyorsanız" diye geçiyor.
10. Kanal etiketleri (Kartla satış · Yurt dışı müşteri · Pazaryeri · Kripto varlık) doğru mu?

**Süreç**
11. 1. adım "Banka seçimi: faaliyetinize ve ortaklık yapınıza uyan banka birlikte belirleniyor." doğru mu?
12. 5. adım "Ödeme kanalları: hesap açıldıktan sonra ihtiyacınız olan tahsilat kanalları bağlanıyor." Bağlantıyı siz mi yapıyorsunuz?

**Belgeler** (`SWAP:BANKA_BELGE`)
13. Bankanın müşteriden istediklerine "beklenen işlem hacmi ve paranın kaynağına dair kısa açıklama" eklenmeli mi?
14. Süreçte sizin hazırladıklarınız doğru mu: ticari lisans ve kuruluş belgeleri, pay sahipliği tablosu, bankanın KYC formları, banka başvuru dosyası?

**SSS** (`SWAP:BANKA_SSS`)
15. "Hangi banka bana uygun?" cevabı: "Faaliyetinize, ortaklık yapınıza ve satış kanalınıza göre değişiyor; seçimi başvurudan önce birlikte yapıyoruz."
16. "Şirket kurmadan kurumsal hesap açabilir miyim?" cevabı: "Hayır. Kurumsal hesap BAE'de kurulmuş ve lisansını almış bir şirket adına açılıyor."
17. "Türkiye'ye para gönderebilir miyim?" cevabı: "Evet, kurumsal hesaptan yurt dışına transfer yapılabiliyor. Masrafı ve kuru bankanın tarifesi belirliyor."

**Görsel** (`SWAP:MARKA_RENK`)
18. Wio, Mashreq ve Emirates NBD logolarının renkleri tahminle konuldu. Resmî logo dosyaları var mı?

---

## 2 · Dubai Vize & Oturum · /dubai/oturum-vize · KAPALI TASLAK (22.09.2026)

Metin: `src/lib/vizeDubai.ts` · Sayfa: `src/app/dubai/oturum-vize/page.tsx`

Resmî kaynaktan alınanlar soru DEĞİL (u.ae · residence visa general provisions):
sponsorlu oturumun 1, 2 ya da 3 yıl geçerli olması; 180 gün kuralı; aile
üyesinin oturumunun sponsorunkini aşamaması; iptalden sonra ek süre; 18 yaş
üstü sağlık kontrolü; oturum ve Emirates ID'nin tek başvuruda yürümesi.

**Genel** (`SWAP:VIZE_TEYIT`)
1. Başvuruları ve sağlık/biyometri randevularını siz mi alıyorsunuz? Hero'da "Başvuru ve randevular bizden." yazıyor.
2. Ortak vizesinin sponsoru şirket mi? Sayfada "Sponsor: şirketiniz" yazıyor.
3. Çalışan vizesi "iş sözleşmesi ve çalışma izniyle birlikte" mi yürüyor?
4. Aile vizesini de siz mi yürütüyorsunuz, yoksa sadece bilgi mi veriyorsunuz?

**Kota** (`SWAP:VIZE_TEYIT`)
5. "Vize kotası lisans paketine VE ofis tipine bağlı; paylaşımlı masa küçük kota, fiziki ofis daha geniş kota veriyor." doğru mu?
6. "Sonradan kotayı büyütmek paket ya da ofis değişikliği demek." doğru mu? (Kuruluş sayfasında "sonradan değiştirmek yeni kuruluş demek" diye geçiyor; ikisi çelişmemeli.)
7. Ek vize "kişi başı ayrıca planlanıyor, kota sınırında birebir görüşülüyor" diye anlatıldı; fiyat yazılmadı. Böyle kalsın mı?

**Süreç**
8. Sıra doğru mu: giriş izni → sağlık kontrolü → biyometri → oturum izni → Emirates ID?
9. "BAE içindeyseniz statü değişikliği yapılıyor" cümlesi sizin uygulamanıza uyuyor mu?

**Belgeler** (`SWAP:VIZE_BELGE`)
10. Müşteriden: pasaport taraması, beyaz fonlu vesikalık, aile vizesi için onaylı tercümeli evlilik ve doğum belgeleri. Eksik var mı?
11. Süreçte: giriş izni, sağlık raporu, oturum ve Emirates ID başvurusu, çalışan vizesi için iş sözleşmesi. Doğru mu?

**SSS** (`SWAP:VIZE_SSS`)
12. "Banka imzasını da aynı ziyarette planlıyoruz." Gerçekten böyle mi yapıyorsunuz?
13. Aile vizesi cevabı: "Oturumunuz çıktıktan sonra eşiniz ve çocuklarınız için aile vizesi başvurusu yapılabiliyor."
14. Altın vize cevabı: "Şirket kurmak doğrudan altın vize vermiyor; ayrı başvuru, kendi şartları var."
15. "Vize garanti mi? Hayır, kararı BAE makamları veriyor." Uygun mu?

---

## 3 · KKTC şirket kuruluşu · /kktc · KAPALI (22.09.2026)

Metin: `src/lib/countryContent.ts · kktc` · Resmî olgular: `docs/kktc-mevzuat.md`
(kaynaklı, soru DEĞİL): %10 kurumlar vergisi + %15 stopaj · KDV %16 · TC
vatandaşı yabancı sayılıyor · yabancı ortakta Ekonomi Bakanlığı onayı ve
25.000 EUR bloke sermaye · Serbest Liman 50.000 EUR, UİŞ 20.000 EUR ve %1 ·
Stripe/PayPal/Wise listesinde KKTC yok · iş kurma izni.

**Karar soruları**
1. Vergi oranlarını sayfada yayımlayalım mı? Eskiden "KKTC'de oran yayımlamıyoruz" kararı vardı; şimdi oranlar yasa metninden yazıldı.
2. Hangi yapıları kuruyorsunuz: limited, Serbest Liman, UİŞ'in üçü de mi? Sayfa üçünü de anlatıyor.
3. KKTC aktif sattığınız bir ürün mü, yoksa gelen talebi mi karşılıyorsunuz? (Uygunluk testi A2 ile aynı soru.)

**Firma adına iddialar** (`SWAP:KKTC_TEYIT`)
4. "KKTC'de kendi ofisimiz", "kuruluştan muhasebeye aynı ekip" ve "Türkçe tek muhatap" maddeleri doğru mu? (Ofis bölümü)
5. KKTC şirketlerinin muhasebesini de siz mi tutuyorsunuz?
6. Adımlarda kimin ne yaptığı doğru mu? Yapı/ad/evrak sizde, bakanlık onayı otoritede, sermaye blokesi müşteride, ana sözleşme/tescil, vergi kaydı ve bloke çözümü Ortac'ta.
7. Sermaye blokesini müşteri kendisi mi yapıyor, siz mi yönlendiriyorsunuz? Banka için KKTC'ye gelmek şart mı? (Resmî kaynakta bulunamadı.)
8. Kuruluş toplam kaç gün sürüyor? Resmî süre yok; fiyat panelinde "5-10 iş günü" yazıyor (pricing.ts).

**Fiyat paneli** (pricing.ts'e dokunulmadı)
9. Menüde KKTC $2.400, fiyat panelinde Basic $1.800 yazıyor. Hangisi doğru?
10. Fiyat panelinde KKTC için vize seçeneği ve "Gold: kuruluş + banka + vize" var. KKTC'de vize/iş kurma izni hizmeti veriyor musunuz?
11. KKTC banka hizmet satırında "Stripe · PayPal" geçiyor (services.ts), ama ikisi de KKTC'yi desteklemiyor. Çıkaralım mı?

**Kalan**
12. Yapı kartlarındaki "kime uyuyor" örnekleri (ör. UİŞ için "uluslararası ticaret, yazılım, danışmanlık") uygun mu?
13. Uyum ve AML hizmeti KKTC'de var mı?
14. Kuruluş sonrası yükümlülükler bölümü (Dubai'deki gibi fiyatlı takvim) KKTC'de yok; fiyatlar gelince açılır. Yıllık muhasebe ve denetim fiyatlarınız?
