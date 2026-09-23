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

## 2 · Dubai Vize & Oturum · /dubai/oturum-vize · CANLI (23.09.2026)

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

## 3 · KKTC şirket kuruluşu · /kktc · CANLI (23.09.2026 · üçüncü yazım)

Metin: `src/lib/countryContent.ts · kktc`. Kaynak artık müşterinin kendi
sunumu (22.09.2026'da gönderilen beş slayt); resmî olgular
`docs/kktc-mevzuat.md`'de. Sayfa tamamen Serbest Liman şirketi üstüne.

**Sunum ile resmî kaynak arasındaki çelişkiler**
1. ~~25.000 / 50.000~~ ÇÖZÜLDÜ (Burak: "resmi kaynakta 50 ise onu kullan"). Sitede resmî kural: asgari 50.000 €, bloke yabancı ortakların payı kadar. Soru: müşterilerde ortaklardan biri KKTC vatandaşı mı oluyor (o zaman bloke 25.000 €)? Sunumdaki "KKTC vatandaşı temsilci" ortak mı?
2. Sunum "1-2 hafta içinde aktif" diyor; süreç slaytındaki adımların toplamı yaklaşık 30 iş günü (3 + 3 + 10 + 14). Sitede yalnız adım süreleri var, toplam yazmıyor. Hangisi?
3. Süreç slaytında 4. ve 5. adımın ikisi de "Serbest Liman Onayı" başlıklı; 5.'yi "Bakanlar Kurulu onayı ve tescil" diye düzelttik. Doğru mu?
4. ~~Bloke zamanı~~ Sitede resmî sıra yazıldı: bloke yazısı tescilde, tescilden sonra Mukayyitlik onaylı belgeyle çözülüyor.

**Firma adına iddialar** (`SWAP:KKTC_TEYIT`)
5. "KKTC'de kendi ofisimiz", "kuruluştan muhasebeye aynı ekip", "Türkçe tek muhatap" doğru mu? Ofis haritasının etiketinde yalnız adres var (şehir kaynakta yok). Şehir?
6. Adımlarda kimin ne yaptığı: isim sizde, belgeler Ortac'ta, başvuru (kargo) sizde, onaylar otoritede. Doğru mu?
7. Avantaj kartındaki yüzde çizimi Dubai'den geliyor ve "Nitelikli gelir / Şart ihlalinde standart oran" yazıyor; KKTC için "KKTC dışı / KKTC içi" olmalı mı?

**Fiyat** (dokunulmadı, üç pakete geçilecek · memory/durum.md)
8. Fiyat panelinde hâlâ eski temsilî KKTC fiyatları ve vize sayacı var. Üç paket gelene kadar paneli KKTC'de gizleyelim mi?

**Yeni bölümler (23.09.2026)**
10. "Türkiye'de yaşıyorsanız vergi nerede çıkıyor" bölümü genel kuralı ve kanun maddelerini yazıyor, kişiye özel görüş vermiyor. Metni bir mali müşavirinize okutmak ister misiniz?
11. Ödeme kanallarında Payoneer "başvuruda netleşiyor" yazıyor. Müşterileriniz KKTC şirketiyle Payoneer açabiliyor mu?
12. SSS: "Mersin 10 adresini bazı platformlar Türkiye olarak görebiliyor" dedik (forumlardan). Deneyiminiz?

**Kalan**
9. Kuruluş sonrası yükümlülükler bölümü (Dubai'deki fiyatlı takvim) KKTC'de yok. Faaliyet harcı, adres sözleşmesi ve muhasebe bu bölüme mi girsin?
