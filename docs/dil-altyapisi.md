# Dil altyapısı · yol haritası

Başlangıç: 09.10.2026. Burak'ın tarifi: yavaş kurulsun, Türkçe taraf bozulmasın; iki dil
sağlam bağlı olsun, Türkçe tarafta değişen her şey İngilizce tarafta da güncellensin;
dile göre metin ve tasarım farkı olabilir.

## Bugün olan (yayında hiçbir şey değişmedi)

- `src/lib/i18n/diller.ts`: dil listesi (tr, en), varsayılan tr.
- `src/lib/i18n/adresler.ts`: Türkçe adres ile yeni İngilizce adres eşlemesi
  (`/dubai/muhasebe` → `/en/dubai/accounting`, `/ingiltere` → `/en/uk`,
  `/kktc` → `/en/northern-cyprus`). Adres adları ÖNERİ, Burak onaylayınca kesinleşir.
- `src/lib/en/`: İngilizce metin dosyalarının yeri. Henüz boş.
- `scripts/ceviri-durum.mjs`: her İngilizce dosya, çevrildiği Türkçe dosyanın özetini
  taşıyor; Türkçe dosya değişince betik o İngilizce dosyayı "eskidi" diye listeliyor.
- `/en/...` hâlâ Türkçe karşılığına geçici (307) yönleniyor (`next.config.ts`).

## Bağ kuralı (her tur)

Türkçe bir içerik dosyası (`src/lib/*.ts` metin modülleri, `src/lib/blogYazilar/*`)
değişince tur sonunda `node scripts/ceviri-durum.mjs` çalışır. "ESKİDİ" çıkan her
İngilizce dosya aynı turda güncellenir ve `--isaretle` ile özet yenilenir. İngilizce
metin birebir çeviri olmak zorunda değil; ama fiyat, süre, kural gibi her olgu aynı olur.

## Sıra (her adım ayrı tur, her biri tek başına geri alınabilir)

1. **Ortak parçalar.** Menü, alt bilgi, düğme ve form etiketleri bugün bileşenlerin
   içinde Türkçe yazılı. Bunlar `src/lib/i18n/sozluk.ts` gibi tek bir sözlüğe çekilir;
   bileşenler `dil` alır. Türkçe çıktı birebir aynı kalmalı (ekran görüntüsü kıyası).
2. **Rota.** `src/app/en/` altında İngilizce sayfalar; aynı bileşenler, `src/lib/en/`
   verisiyle. `<html lang>` İngilizce ağaçta `en`. `next.config.ts`'teki `/en/:rest*`
   yönlendirmesi, açılan her sayfa için daraltılır.
3. **İlk sayfalar.** Sıra önerisi: ana sayfa, Dubai, İngiltere, KKTC, iletişim; sonra
   hizmet sayfaları; en son blog (yazı yazı, hepsi çevrilmek zorunda değil).
4. **Bağlantı.** Her çift sayfada `hreflang` (tr, en, x-default) ve dil seçici
   (`karsiAdres`). İngilizce sayfalar site haritasına girer. Eski sitenin `/en/...`
   adresleri yeni İngilizce adreslere kalıcı (301) yönlenir.
5. **Dile göre fark.** İngilizce tarafta "Türkçe süreç" anlatılmaz; para birimi,
   örnekler, Türkiye'ye özgü vergi bölümleri (kâr payı beyanı gibi) İngilizce okura göre
   yeniden yazılır ya da çıkar. Farklar o İngilizce dosyanın başına not edilir.

## Burak'tan beklenen kararlar

- İngilizce adres adları (yukarıdaki öneri): `uk`, `northern-cyprus`, `accounting`, `tax`,
  `bank-account`, `visa`, `corporate-advisory`, `aml-compliance`, `about`, `contact`.
- "Çeviri takibi admin panelinde olsun" demiştin: hangi panel? Bugünkü takip betikle.
- İngilizce tarafın hedefi kim: Türkiye dışındaki Türkler mi, yabancı girişimciler mi?
  Metnin tonu ve hangi bölümlerin kalacağı buna göre değişir.
