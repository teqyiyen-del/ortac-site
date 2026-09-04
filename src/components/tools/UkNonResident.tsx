"use client";

import { useId, useState } from "react";

/* ============================================================================
   İNGİLTERE'DEN ŞİRKET KURABİLİR MİSİNİZ? · yurt dışından kuruluş ön değerlendirmesi
   Kayıt defteri: lib/tools/catalog.ts · id "non-resident-uygunluk"
   CSS: YENİ KURAL YAZILMADI — araç .tl- ad alanının mevcut sınıflarıyla kuruldu
   (css/araclar.css). Yeni bir görsel dil icat etmemek bu depodaki temel kural.

   ---------------------------------------------------------------- NEDEN BU ARAÇ
   Kayıt defteri bu aracı "sıradaki tur için en güçlü aday" diye işaretlemişti
   ve gerekçesi kaynak dosyada yazılı: rakiplerde karşılığı yok. Engel olarak
   da "gereklilik listesi depoda yok" yazıyordu.

   O ENGEL BU TURDA ÖLÇÜLDÜ VE AŞILDI. Aracın söylediği HER SATIR, sitenin
   zaten yayımladığı bir cümleden geliyor — yani araç yeni bir iddia kurmuyor,
   var olan bilgiyi ziyaretçinin durumuna göre süzüyor. Kaynak eşlemesi:

     "Kuruluşun tamamı uzaktan tamamlanır; hiçbir aşamada gitmeniz gerekmez."
        → countryContent.ts · ingiltere (sonuç satırı)
     "Kimliğin renkli taraması, adres beyanı ve şirket adı sizden alınıyor.
      Adın Companies House kurallarına uyması ve daha önce alınmamış olması
      gerekiyor."                → countryContent.ts · ingiltere (istenenler)
     "Adres beyanı: son 3 aya ait fatura veya ikametgâh"   → aynı dosya
     "Pay dağılımı ve direktör bilgileri"                  → aynı dosya
     "Tescil ve kayıtlı adres kalemleri Dubai'nin çok altında." → aynı dosya
     "Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük;
      pratikte ödeme kuruluşu hesabıyla başlanıyor."       → aynı dosya
     "Direktör maaşı için PAYE bordro kaydı gerekiyor."    → aynı dosya
     "Ltd sahibi veya direktörü olmak size vize ya da oturum hakkı
      doğurmuyor."                                         → aynı dosya
     "Companies House ve HMRC beyanları gecikirse otomatik ceza işler."
                                                           → aynı dosya

   BU YÜZDEN ARAÇTA TEK BİR SAYI YOK. Ne oran, ne tutar, ne gün. Depodaki
   İngiltere oranı hâlâ SWAP:UK_CT_RATE ile teyitsiz; bir hesaplayıcı bugün
   yazılamaz ama bir GEREKLİLİK aracı yazılabilir, çünkü gereklilikler zaten
   yayında. İki aracı ayıran çizgi tam burası.

   -------------------------------------------------------------- KAPSAM KAPISI
   İlk soru bir eleme sorusu: araç YURT DIŞINDAN kuranlar için yazıldı.
   "İngiltere'de yaşıyorum" cevabı geldiğinde araç sonuç üretmiyor, kapsam
   dışında olduğunu söylüyor. Sebep dürüstlük: yerleşik kurucunun banka ve
   PAYE tarafı farklı işliyor ve o fark sitede yazılı DEĞİL. Yazılmamış bir
   şeyi süzmek, uydurmakla aynı kapıya çıkar.

   ---------------------------------------------------------------- ÇIKTI BİÇİMİ
   Üç blok: tek cümlelik sonuç, "sizden istenecekler" ve "bilmeniz gerekenler".
   İkinci liste HER ZAMAN aynı dört satırla açılıyor (kimlik, adres beyanı, ad,
   pay/direktör) çünkü onlar cevaplardan bağımsız; üçüncü liste tamamen
   cevaplara bağlı. Ayrım kasıtlı: ziyaretçi neyin sabit neyin kendi durumuna
   özel olduğunu görüyor.

   `role="status"` + `aria-live="polite"`: cevap değişince ekran okuyucu yeni
   sonucu okuyor. Sitedeki öteki araçların (NameForge, EntryCounter) kullandığı
   kalıbın aynısı.

   HESAP ANINDA, DÜĞME YOK. Bu depodaki bütün araçlar böyle; "Hesapla"
   düğmesi ziyaretçiye yapacak bir iş daha veriyor ve sonuç zaten her cevapta
   yeniden kurulabiliyor.
   ========================================================================= */

type Nerede = "disarida" | "ingilterede";
type Ortak = "tek" | "coklu";
type Adres = "var" | "yok";
type Tahsilat = "kart" | "havale" | "belirsiz";
type Maas = "evet" | "hayir";
type Oturum = "evet" | "hayir";

type Secenek<T> = { d: T; t: string; h: string };

const NEREDE: Secenek<Nerede>[] = [
  { d: "disarida", t: "İngiltere dışında", h: "Türkiye ya da başka bir ülke" },
  { d: "ingilterede", t: "İngiltere'de", h: "Bu araç bu durumu kapsamıyor" },
];
const ORTAK: Secenek<Ortak>[] = [
  { d: "tek", t: "Yalnız ben", h: "Tek pay sahibi ve direktör" },
  { d: "coklu", t: "Birden fazla kişi", h: "Ortaklı yapı" },
];
const ADRES: Secenek<Adres>[] = [
  { d: "yok", t: "Hayır", h: "İngiltere'de adresim yok" },
  { d: "var", t: "Evet", h: "Kullanabileceğim bir adres var" },
];
const TAHSILAT: Secenek<Tahsilat>[] = [
  { d: "kart", t: "Kartla", h: "Stripe, PayPal, pazar yeri" },
  { d: "havale", t: "Havale ve fatura", h: "Kurumsal müşteriler" },
  { d: "belirsiz", t: "Henüz belli değil", h: "Karar vermedim" },
];
const IKILI = (evet: string, hayir: string): Secenek<"evet" | "hayir">[] => [
  { d: "evet", t: "Evet", h: evet },
  { d: "hayir", t: "Hayır", h: hayir },
];

/* Cevaplardan bağımsız, HER SONUÇTA basılan liste. Dördü de countryContent'in
   İngiltere bölümünde yazılı; sıra da oradaki sıra. */
const HER_HALUKARDA = [
  "Kimliğinizin renkli taraması",
  "Adres beyanı: son 3 aya ait fatura veya ikametgâh",
  "Şirket adı adayı (Companies House kurallarına uymalı ve alınmamış olmalı)",
  "Pay dağılımı ve direktör bilgileri",
];

export default function UkNonResident() {
  const uid = useId();
  const [nerede, setNerede] = useState<Nerede>("disarida");
  const [ortak, setOrtak] = useState<Ortak>("tek");
  const [adres, setAdres] = useState<Adres>("yok");
  const [tahsilat, setTahsilat] = useState<Tahsilat>("kart");
  const [maas, setMaas] = useState<Maas>("hayir");
  const [oturum, setOturum] = useState<Oturum>("hayir");

  const kapsamDisi = nerede === "ingilterede";

  /* İSTENECEKLER · sabit dört satır + duruma bağlı ekler. */
  const istenecekler = [...HER_HALUKARDA];
  if (ortak === "coklu") {
    istenecekler.push("Her ortak için ayrı kimlik ve adres belgesi");
  }
  if (adres === "yok") {
    istenecekler.push("İngiltere'de kayıtlı adres hizmeti (tescil için zorunlu)");
  }

  /* BİLMENİZ GEREKENLER · tamamı duruma bağlı, hepsi sitede yayınlı cümleler.
     Banka satırı ilk sırada ve bu bilinçli: sitenin İngiltere için söylediği
     en keskin çekince o ("banka hesabı üç ülkenin en zoru"). */
  const uyarilar: { k: string; t: string }[] = [
    {
      k: "Banka",
      t: "Tescil kolay, banka değil. Geleneksel bankada yerleşik olmayan ortak için onay oranı düşük; pratikte ödeme kuruluşu hesabıyla başlanıyor ve faaliyet geçmişi oluştukça geleneksel bankaya başvuruluyor.",
    },
  ];
  if (tahsilat === "kart") {
    uyarilar.push({
      k: "Kartla tahsilat",
      t: "İngiltere şirketleri Stripe ve PayPal'ın çalıştığı ülkeler arasında; kart tahsilatı ana kanalınızsa bu ülke o tarafta sorun çıkarmıyor.",
    });
  }
  if (tahsilat === "belirsiz") {
    uyarilar.push({
      k: "Tahsilat kanalı",
      t: "Kanal seçimi ülke seçimini de etkiliyor. Karar vermeden önce hangi kanalın hangi ülkede açık olduğunu ülkeler sayfasındaki karşılaştırmadan görebilirsiniz.",
    });
  }
  if (maas === "evet") {
    uyarilar.push({
      k: "Direktör maaşı",
      t: "Şirketten kendinize ödeme yapacaksanız PAYE bordro kaydı gerekiyor. Bu, kuruluşun kendisinden ayrı bir kayıt.",
    });
  }
  if (oturum === "evet") {
    uyarilar.push({
      k: "Oturum ve vize",
      t: "Ltd sahibi ya da direktörü olmak size vize veya oturum hakkı doğurmuyor. Göçmenlik tamamen ayrı bir süreç ve ayrı kriterlere bağlı.",
    });
  }
  uyarilar.push({
    k: "Kuruluştan sonrası",
    t: "Companies House ve HMRC beyanları gecikirse otomatik ceza işliyor. Takvim kuruluşla başlıyor, bitmiyor.",
  });

  const grup = <T extends string>(
    ad: string,
    baslik: string,
    secenekler: Secenek<T>[],
    deger: T,
    ayarla: (v: T) => void,
  ) => (
    <fieldset className="tl-fs">
      <legend className="tl-legend">{baslik}</legend>
      <div className="tl-radios" data-cols={secenekler.length}>
        {secenekler.map((s) => (
          <label key={s.d} className="tl-radio" data-on={s.d === deger ? "" : undefined}>
            <input
              type="radio"
              name={`${uid}-${ad}`}
              checked={s.d === deger}
              onChange={() => ayarla(s.d)}
            />
            <span className="tl-radio-t">{s.t}</span>
            <span className="tl-radio-h">{s.h}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="tl-app">
      {grup("nerede", "Nerede yaşıyorsunuz?", NEREDE, nerede, setNerede)}

      {/* KAPSAM DIŞI DALINDA ÖTEKİ SORULAR HİÇ BASILMIYOR. Gri gösterip
          bırakmak "cevaplasam bir şey değişecek" beklentisi kurardı; oysa
          değişmiyor. Kapsam kapısının tamamı tek bir koşulda. */}
      {!kapsamDisi && (
        <>
          {grup("ortak", "Şirkette kaç kişi olacak?", ORTAK, ortak, setOrtak)}
          {grup("adres", "İngiltere'de kullanabileceğiniz bir adres var mı?", ADRES, adres, setAdres)}
          {grup("tahsilat", "Tahsilatı nasıl yapacaksınız?", TAHSILAT, tahsilat, setTahsilat)}
          {grup("maas", "Şirketten kendinize maaş ödeyecek misiniz?", IKILI("Bordro kurulacak", "Yalnız kâr dağıtımı"), maas, setMaas)}
          {grup("oturum", "Oturum ya da vize bekliyor musunuz?", IKILI("Evet, bekliyorum", "Hayır, yalnız şirket"), oturum, setOturum)}
        </>
      )}

      <div className="tl-out" role="status" aria-live="polite">
        {kapsamDisi ? (
          <p className="tl-out-empty">
            Bu araç <b>yurt dışından</b> İngiltere şirketi kuranlar için yazıldı. İngiltere&apos;de
            yaşıyorsanız banka ve bordro tarafı farklı işliyor; durumunuzu görüşmede
            netleştirelim.
          </p>
        ) : (
          <>
            <span className="tl-out-k">Sonuç</span>
            <strong className="tl-big">Kuruluş uzaktan tamamlanır.</strong>
            <span className="tl-sub">
              İngiltere, kuruluşun tamamı uzaktan tamamlanan tek ülke; hiçbir aşamada
              gitmeniz gerekmiyor. Zor olan kısım tescil değil, banka.
            </span>
          </>
        )}
      </div>

      {!kapsamDisi && (
        <div className="tl-cols">
          <div className="tl-col">
            <span className="tl-side">Sizden istenecekler</span>
            <p className="tl-help">
              İlk dördü herkeste aynı; kalanı verdiğiniz cevaplara göre eklendi.
            </p>
            <ul className="tl-list">
              {istenecekler.map((x) => (
                <li key={x} className="tl-item">
                  <span className="tl-tick-t">{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="tl-col tl-col-ours">
            <span className="tl-side tl-side-o">Bilmeniz gerekenler</span>
            <p className="tl-help">Hepsi bu ülkenin kendi gerçeği; sırayla okunacak.</p>
            <ul className="tl-list">
              {uyarilar.map((u) => (
                <li key={u.k} className="tl-item">
                  <span className="tl-tick-t">
                    <b>{u.k}:</b> {u.t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="tl-warn">
        Bu çıktı bir <b>ön değerlendirme</b>, uygunluk kararı değil. Companies House
        tescilini ve HMRC kaydını biz yürütüyoruz; banka başvurusunun sonucunu ise
        banka veriyor. Kişiye özel vergi görüşü bu araçtan çıkmaz.
      </p>
    </div>
  );
}
