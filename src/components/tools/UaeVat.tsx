"use client";

import { useId, useState } from "react";
import {
  Coins,
  Divide,
  Info,
  Percent,
  ReceiptText,
  Scale,
  type LucideIcon,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import {
  AracKunye,
  Bant,
  Bolusum,
  Cip,
  Cipler,
  Derin,
  DerinListe,
  Dip,
  Girdi,
  GirdiSatiri,
  Hazirlar,
  Kaynak,
  Kural,
  Satir,
  Satirlar,
  Sayac,
  Tezgah,
  Yardim,
} from "@/components/tools/ToolShell";
import { COUNTRY_NAME } from "@/lib/brand";
import { ESTIMATE_NOTE, UAE_VAT, needsConfirm, ruleOf } from "@/lib/tools/rates";
import { formatAmount, formatPercent, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   BAE KDV HESAPLAYICI
   ============================================================================

   NE YAPIYOR
   Tek bir çevirim: KDV hariç tutardan KDV'li tutara ya da tersi. Belgenin
   istediği araç da tam olarak bu — "%5 KDV, dâhil/hariç hesap" (s.6).

   NEDEN İKİ YÖN BİRDEN
   Çünkü ziyaretçinin elindeki tutar bazen matrah, bazen tahsil ettiği toplam.
   Yönü yanlış anlayan bir hesap, %5'lik bir vergide %0,24'lük bir sapma
   yaratıyor ve fatura tutmuyor. Tek yönlü bir araç, kullanıcının işini yarım
   yapıp hatayı ona bırakırdı.
   (12.09.2026 notu: "%0,24" ORAN farkı, yani %5 ile toplamın içindeki KDV
   payı %4,76 arasındaki puan farkı. TUTARDAKİ sapma daha büyük: 10.500'lük
   toplamı matrah sanan kişi KDV'yi 525 yazar, doğrusu 500, yani %5 hata.
   Hesap doğru; yalnız bu cümle sapmayı küçük gösteriyordu.)

   YÖN SEÇİMİ AÇILIR MENÜ DEĞİL
   İki seçenek de ekranda görünüyor (tuzaklar.md kural 9; aynı kalıp iletişim
   sayfasında ve belge listesinde). İki şıklı bir açılır menü, seçimi görünmez
   yapıp yanlış yönde hesaplama riskini artırıyor.

   SAYILAR NEREDEN
   lib/tools/rates.ts · UAE_VAT (SWAP:TOOL_RATES). Bu dosyada oran sabiti yok.
   Kural cümlesi de yeniden yazılmıyor, countryContent.ts'ten aynen basılıyor.
   Ekrandaki türetilmiş sayılar (1,05 çarpanı, toplamın içindeki %4,76 KDV
   payı, açılırdaki örnek) da orandan HESAPLANIYOR, elle yazılmadı: oran
   değişirse hepsi kendiliğinden değişir.

   KAYIT EŞİĞİ NEDEN HESAPLANMIYOR
   Eşik kuralı ekranda yazıyor ama araç "kayıt zorunluluğunuz var" demiyor.
   Eşiğe hangi tutarların girdiği (vergiye tabi tedarik) faaliyete göre
   değişiyor; ziyaretçinin yazdığı tek bir tutardan bu çıkarılamaz. Söyleseydik
   araç bilmediği bir şeyi iddia etmiş olurdu. Aynı gerekçeyle tutarı
   375.000'e kıyaslayan bir gösterge de YOK — söylemediğimiz cümleyi resimle
   söylerdi. (Bu kararın bu turdaki bedeli aşağıda: SÜRGÜ YOK.)

   ---------------------------------------------------------------------------
   12.09.2026 · TEZGÂH DİLİNE GEÇTİ (A2 · ToolShell.tsx C bölümü)

   Bir tur önce bu araç uygunluk testinin İKİ PANELLİ kurgusundaydı: solda
   beyaz çalışma paneli, sağda gece "hesap defteri". Müşteri o kurguyu geri
   çevirdi ("tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her
   şey gibi bir şey demedimki sana amk ben") ve A2'yi seçti: doğru referans
   test değil SİTENİN KENDİ HESAPLAYICISI (CountryTax.tsx · .txm-).

   HESAP DEĞİŞMEDİ: `net / vat / gross` üç satırı, MODES, HAZIR ve parseAmount
   çağrısı bayt bayt eski dosyadan. Değişen yalnız sunum.

   YENİ SIRA
     künye      "KDV hesabı" + büyük Dubai bayrağı (panelin dışında)
     tezgâh     tek panel · kicker + sağ üstte yön çipleri
     girdi      geniş tek kutu · altında hazır tutarlar ve yardım satırı
     BANT       cevap · sayfanın tek gece yüzeyi, tek büyük değer
     bölüşüm    "KDV dâhil toplamın içinde" · KDV tutarı + tek çubuk
     satırlar   "nasıl çıktı" · girdi → KDV → sonuç
     kural      dipnot + kaynak çipi + teyit satırı
     dip        tahmin ibaresi + soru çıkışı, sonra açılır not

   ---------------------------------------------------------------------------
   A2'NİN KULLANILMAYAN PARÇALARI — üçü de "karşılığı yoksa basma" kuralından

   1) SÜRGÜ YOK. Sürgü bir sayının ÖLÇEĞİ ve ölçeğin bir üst ucu olmalı.
      KDV verisinde anlamlı bir üst sınır yok: oran her tutarda aynı, yani
      ölçekte kırılma noktası da yok. Tek aday kayıt eşiği (375.000 AED) ve
      onu sürgünün ucu yapmak, yukarıda BİLEREK YAPILMAYAN kıyası (tutar ⇄
      eşik) sürgüyle yapmak olurdu. Hazır tutarların en büyüğü (100.000) de
      sınır değil, yalnız yuvarlak bir fatura örneği — kurumlar vergisinde o
      dizinin son öğesi sürgünün ucu olabiliyor çünkü dizi kuralın kendi
      sınırlarını taşıyor (375.000 · 50.000 · 250.000), burada taşımıyor.
      Sonuç: girdi satırı iki sütun (etiket · geniş kutu), üçüncü sütun hiç
      açılmıyor.

   2) HALKA (bandın göstergesi) YOK. Kardeşinde halka efektif oranı gösteriyor
      ve tutarla değişiyor; KDV'de efektif oran her tutarda %5, yani halka hiç
      kıpırdamayan bir süs olurdu. Bandın sağ köşesi boş kalmıyor, YOK.

   3) ÜLKE PİLLERİ ve SAYAÇ YOK. Araç tek ülkeye ait (Dubai), yani
      `AracKunye`'nin `yol`u basılmıyor. Künyenin sağ ucundaki rozet/sayaç da
      yok: numaralı adımlar kalktı (yön çipleri başlık satırında, geriye tek
      girdi kalıyor), sayılacak bir şey kalmadı.

   BÖLÜŞÜM İSE VAR, ÇÜNKÜ GERÇEKTEN BÖLÜNEN BİR BÜTÜN VAR: KDV dâhil toplamın
   içinde matrah ve KDV. Payların kendisi tutardan bağımsız (%95,24 · %4,76)
   ve bu bilerek — gösterdiği şey tutar değil KURALIN KENDİSİ: toplamın
   içindeki KDV %5 değil %4,76. Bloğun büyük rakamı ise tutara bağlı (KDV'nin
   kendisi), yani blok donuk değil.
     BÜYÜK RAKAM NEDEN KDV: dâhil yönünde insanın gerçek sorusu "bu toplamın
     içinde ne kadar KDV var". Bant o yönde matrahı gösteriyor, yani KDV
     tutarı bandın söylemediği sayı. Dökümün orta satırıyla aynı sayı ama
     başka bir cümle kuruyor: döküm "matraha eklenen", bölüşüm "toplamın
     içindeki".
     LEJANT DİSKİ KOYU, RAKAM MAVİ ve bu bir tutarsızlık değil: disk çubuktaki
     PARÇAYI gösteriyor (koyu dilim = KDV), rakamın mavisi ise dilin büyük
     rakam rengi (--blue-700, 28 px+ büyük metin eşiğinde). Diski maviye
     çevirmek çubuktaki mavi dilimi (matrah) işaret ederdi, yani yanlış olurdu.

   DÖKÜM HESABIN YÖNÜNDE OKUNUYOR — bu aracın "çevirim"i. Satırlar hep aynı
   üç YER: 1) girdiğiniz tutar, 2) KDV (+ ya da −), 3) sonuç (kalın). Hariçte
   matrah → + KDV → toplam; dâhilde toplam → − KDV → matrah. Toplam satırı
   gerçekten satırların toplamı (dilin kuralı), yalnız işaret yön değiştiriyor.
   MİNİ ÇUBUKLAR TEK ÖLÇEKTE: hepsi KDV dâhil toplama oranlı, kendi aralarında
   göreli değil — dilin kuralı (küçük dilimi olduğundan büyük göstermemek).
   Ölçeğin bütünü her iki yönde de toplam, çünkü matrah da KDV de onun içinde.
   TON SÖZLÜĞÜ iki blokta da aynı: KDV koyu, cevap marka mavisi (--blue-700),
   girdi açık mavi (--blue-500). Yani bölüşümün koyu dilimi ile dökümün koyu
   çubuğu aynı sayıyı gösteriyor; renk bir süs değil eşleme.

   YÖN DEĞİŞİNCE YÖNE BAĞLI HER ŞEY BİR KEZ GİRİYOR: girdi etiketi, kutunun
   glifi, bandın künyesi ve dökümün ad/glifleri. Hepsi aynı iki sınıfı
   kullanıyor (.ta-kdv-yeni · .ta-kdv-glif, araclar-kdv.css) ve hepsi bir kez
   oynuyor. YENİ SÜREKLİ ANİMASYON YOK: sayfanın tek sürekli hareketi bandın
   ışığı (13007 ms, ortak dilden). Bana verilen 17001-19999 ms bandı
   kullanılmadı; ikinci bir ritim, iki satırlık bir hesabı müşterinin
   şikâyet ettiği "karman çorman"a geri götürürdü.
   ========================================================================= */

type Mode = "haric" | "dahil";

/* Yön çipleri. Etiket kısa ("KDV hariç"), çünkü çip tek satırlık bir pil ve
   başlık satırında duruyor; hangi tutarın kastedildiğini altındaki girdi
   etiketi tekrarlıyor ("KDV hariç tutar (AED)"). İpucu erişilebilir ada
   ekleniyor (Cip · aria-label). */
const MODES: { key: Mode; label: string; hint: string }[] = [
  { key: "haric", label: "KDV hariç", hint: "Elinizdeki rakam matrah" },
  { key: "dahil", label: "KDV dâhil", hint: "Elinizdeki rakam toplam" },
];

/* Örnek fatura tutarları, iddia değil. Kayıt eşiği (375.000) bilerek YOK:
   bu araç eşiği hesaplamıyor (dosya başı) ve eşiğin çipi, kişiye "bu tutar
   kayıt demek" diye okunabilirdi. */
const HAZIR = [1_000, 5_000, 10_000, 50_000, 100_000];

const RULE = ruleOf(UAE_VAT.rate);
const CONFIRM = needsConfirm(UAE_VAT.rate, UAE_VAT.registration);

/* ------------------------------------------------ SUNUMUN SABİTLERİ ----
   Hepsi orandan TÜRETİLİYOR; oran yazılmıyor.

   ORNEK hem yer tutucu hem açılış değeri: ikisi ayrı sayı olsaydı boş kutuda
   bir örnek, dolu kutuda başka bir örnek görülürdü. Hazır tutarların
   ortasındaki 10.000 ile aynı, yani açılışta o çip işaretli duruyor.

   ÖRNEK TUTARLA AÇILIYOR — kardeşindeki gerekçeyle (KurumlarVergisi ·
   ÖRNEK TUTARLA AÇILIYOR): kutu boş açılınca bant ilk rakam yazılana kadar
   bir tire gösteriyor ve sonucun canlı olduğu görünmüyor. Sitede emsali var,
   Dubai sayfasının vergi özeti de dolu açılıyor (CountryTax · TAX_SWAP). */
const ORNEK = "10.000";

/* Çevirim çarpanı (1 + oran). Ondalık basamak sayısı çarpanın kendisinden:
   formatAmount(…, 2) %7,5'lik bir oranda 1,075'i "1,08" diye yuvarlardı. */
const CARPAN_N = 1 + UAE_VAT.rate.value;
const CARPAN = formatAmount(CARPAN_N, (String(CARPAN_N).split(".")[1] ?? "").length);

/* KDV dâhil bir toplamın içindeki paylar: matrah 1/(1+r), KDV r/(1+r). */
const PAY_MATRAH = 1 / CARPAN_N;
const PAY_KDV = UAE_VAT.rate.value / CARPAN_N;

/* Açılırdaki örnek: yer tutucunun matrahından kurulan toplam. Örnek, iddia
   değil; sayılar orandan hesaplanıyor. */
const ORNEK_MATRAH = 10_000;
const ORNEK_TOPLAM = ORNEK_MATRAH * CARPAN_N;

/* Yön şıkkının, kutunun ve döküm satırının glifi: elinizdeki rakamın ne
   olduğu. Matrah = vergisiz para (Coins, kardeşinde de "vergiye tabi
   kazanç"ın glifi), toplam = faturanın alt satırı (ReceiptText; aracın
   menüdeki glifi Receipt, aynı aile). */
const MOD_IKON: Record<Mode, LucideIcon> = { haric: Coins, dahil: ReceiptText };

/* Dökümün iki uç satırı. Hangisinin girdi, hangisinin sonuç olduğu yöne göre. */
const UC = {
  matrah: { ad: "Matrah (KDV hariç)", Ikon: Coins },
  toplam: { ad: "Toplam (KDV dâhil)", Ikon: ReceiptText },
} as const;

export default function UaeVat() {
  const uid = useId();
  const [mode, setMode] = useState<Mode>("haric");
  const [value, setValue] = useState(ORNEK);

  const amount = parseAmount(value);
  const okunamadi = value.trim() !== "" && amount === null;
  const r = UAE_VAT.rate.value;

  /* İki yön tek yerde: hariçse matrah girilen tutar, dâhilse toplam girilen
     tutar. Aradaki fark bölme yönü — ayrı iki hesap yazmak, birini güncelleyip
     ötekini unutmanın en kısa yolu olurdu. */
  const net = amount === null ? 0 : mode === "haric" ? amount : amount / (1 + r);
  const vat = net * r;
  const gross = net + vat;

  /* ---- sunum: yukarıdaki üç sayının yöne göre okunuşu ---- */
  const cur = UAE_VAT.currency;
  const label = UAE_VAT.rate.label;
  const hesap = amount !== null;
  const haric = mode === "haric";
  const girdi = haric ? UC.matrah : UC.toplam;
  const sonuc = haric ? UC.toplam : UC.matrah;
  const sonucDeger = haric ? gross : net;
  const ornekte = value === ORNEK;
  const f2 = (n: number) => formatAmount(n, 2);
  /* Mini çubukların ortak ölçeği KDV dâhil toplam: matrah da KDV de onun
     içinde, yani iki yönde de aynı bütün. Sıfır tutar geçerli bir cevap
     (num.ts), o yüzden bölme korumalı. */
  const pay = (v: number) => (gross > 0 ? v / gross : 0);

  const GirdiIkon = girdi.Ikon;
  const SonucIkon = sonuc.Ikon;
  const KutuIkon = MOD_IKON[mode];
  const tarif = okunamadi ? `${uid}-hata` : `${uid}-yardim`;

  return (
    <>
      {/* Ülke pili YOK (tek ülkeli araç), sağ uçta rozet/sayaç YOK — gerekçe
          dosya başında. Bayrak künyede tek ve büyük; kaynak çipindeki ikinci
          küçük bayrak bu turda kalktı (kardeşiyle aynı: bir sayfada bir
          ülke bir kez gösteriliyor). */}
      <AracKunye ad="KDV hesabı" alt={`${COUNTRY_NAME.dubai} · ${cur}`} ulke="dubai" />

      <Tezgah
        kicker={
          <>
            <Info size={15} strokeWidth={2.1} aria-hidden="true" />
            Temsilî gösterim
          </>
        }
        sag={
          /* Yön, kardeşindeki dönem çiplerinin durduğu yerde: aracın İKİNCİ
             değişkeni başlık satırının sağ köşesinde, asıl girdi aşağıda tek
             başına. Grubun adı ekranda yazmıyor, çünkü hemen altındaki girdi
             etiketi seçili çipi zaten tekrarlıyor; ağaçta ise var. */
          <Cipler ad="Girdiğiniz tutar">
            {MODES.map((m) => {
              const Ikon = MOD_IKON[m.key];
              return (
                <Cip
                  key={m.key}
                  ad={`${uid}-mode`}
                  secili={m.key === mode}
                  onSec={() => setMode(m.key)}
                  ikon={<Ikon size={17} strokeWidth={1.9} />}
                  baslik={m.label}
                  ipucu={m.hint}
                />
              );
            })}
          </Cipler>
        }
      >
        {/* `surgulu` YOK: iki sütun, kutu satırın kalanını alıyor (dosya
            başı · SÜRGÜ YOK). */}
        <GirdiSatiri>
          <Girdi
            id={`${uid}-tutar`}
            no="01"
            /* Etiket yönü söylüyor: kutuya yazılan sayının ne olduğu, çip
               değişince etiketin kendisinde de okunuyor. Boşluk parantezin
               İÇİNDE (`ek`), dışarıda kalınca erişilebilir ad "tutar(AED)"
               diye bitişik okunuyor. */
            etiket={
              <span key={mode} className="ta-kdv-yeni">
                {haric ? "KDV hariç" : "KDV dâhil"} tutar
              </span>
            }
            ek={` (${cur})`}
            ikon={<KutuIkon key={mode} className="ta-kdv-glif" size={18} strokeWidth={1.9} />}
            birim={cur}
            deger={value}
            onDeger={setValue}
            hata={okunamadi}
            tarif={tarif}
            ipucu={ORNEK}
          />
        </GirdiSatiri>

        <Hazirlar
          degerler={HAZIR}
          secili={amount}
          onSec={(n) => setValue(formatAmount(n))}
          yaz={formatAmount}
        />

        <Yardim id={`${uid}-yardim`}>
          {ornekte && <b>Kutudaki tutar bir örnek. </b>}
          Binlik ayracı nokta, ondalık virgül: 10.000,50.
        </Yardim>

        {/* CEVAP. Gösterge (halka) YOK — gerekçe dosya başında. Alt cümle
            yönün ne yaptığını söylüyor ve tutar boşken de doğru: hesap
            yapılmasa da yapılacak iş o. Okunamayan girdinin gerekçesi ve
            boş kutunun daveti bölüşümün not satırında, çünkü kutunun
            açıklaması (aria-describedby) oraya bağlı. */}
        <Bant
          /* İKİ ANAHTAR AYRI ÖNEKLİ ve bu zorunlu: ikon ile künye aynı <p>'nin
             çocukları, yani React için TEK bir dizi. İlk yazımda ikisi de
             `key={mode}` taşıyordu ve konsol "Encountered two children with
             the same key, haric" diye hata verdi (ekran görüntüsünde Next
             rozeti "1 Issue"). Kardeş düğümlerin anahtarı benzersiz olmalı;
             yenilenme davranışı aynı kalıyor. */
          ikon={<SonucIkon key={`i-${mode}`} className="ta-kdv-glif" size={14} strokeWidth={1.9} />}
          kicker={
            <span key={`k-${mode}`} className="ta-kdv-yeni">
              {sonuc.ad}
            </span>
          }
          alt={haric ? <>Matraha {label} KDV ekleniyor.</> : <>KDV toplamın içinden ayrılıyor.</>}
          duyuru={
            hesap
              ? `${sonuc.ad} ${f2(sonucDeger)} ${cur}. KDV ${f2(vat)} ${cur}.`
              : "Henüz hesap yok."
          }
        >
          {hesap ? (
            <>
              <Sayac deger={sonucDeger} ondalik={2} />
              <span className="ta-bant-c">{cur}</span>
            </>
          ) : (
            <span className="ta-bant-bos">—</span>
          )}
        </Bant>

        <Bolusum
          baslik="KDV dâhil toplamın içinde"
          ustbilgi={hesap ? `${f2(gross)} ${cur} toplam üzerinden` : "rakam girilmedi"}
          kalem={{
            etiket: "KDV tutarı",
            ton: "koyu",
            bos: !hesap,
            deger: hesap ? (
              <>
                <Sayac deger={vat} ondalik={2} />
                <span className="ta-kalan-c">{cur}</span>
              </>
            ) : (
              "—"
            ),
          }}
          /* Paylar tutardan bağımsız (dosya başı): çubuk her tutarda aynı ve
             gösterdiği şey kuralın kendisi. Boş kutuda da duruyor — kural
             tutar girilmeden de geçerli. */
          paylar={[
            { oran: PAY_MATRAH, ton: "mavi" },
            { oran: PAY_KDV, ton: "koyu" },
          ]}
          not={{
            id: `${uid}-hata`,
            hata: okunamadi,
            metin: okunamadi ? (
              <>
                “{value}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik ayracı
                nokta, ondalık virgül.
              </>
            ) : !hesap ? (
              "Bir tutar yazın, dağılım burada oluşsun."
            ) : (
              <>
                Toplamın içindeki KDV payı {formatPercent(PAY_KDV, 2)}, toplamın {label} kadarı
                değil.
              </>
            ),
          }}
        />
      </Tezgah>

      {/* "Nasıl çıktı" — yalnız hesap varken. Boş hâlde tire dolu bir döküm
          basmak, dilin "karşılığı yoksa basma" kuralının aynısı; kardeşi de
          böyle davranıyor. */}
      {hesap && (
        <Satirlar>
          <Satir
            ikon={<GirdiIkon key={mode} className="ta-kdv-glif" size={15} strokeWidth={1.9} />}
            baslik={
              <span key={mode} className="ta-kdv-yeni">
                {girdi.ad}
              </span>
            }
            alt="Girdiğiniz tutar"
            oran={pay(haric ? net : gross)}
            ton="acik"
            deger={f2(haric ? net : gross)}
            birim={cur}
          />
          <Satir
            ikon={<Percent size={15} strokeWidth={1.9} />}
            baslik={`KDV ${label}`}
            alt={`${f2(net)} × ${label}`}
            oran={pay(vat)}
            /* KDV KOYU, hem burada hem bölüşümde: aynı sayı iki blokta aynı
               renkle duruyor ve göz ikisini eşleştiriyor. Kardeşinde de
               verginin dilimi koyu (KurumlarVergisi · Bolusum · paylar).
               İlk yazımda KDV maviydi ve sonuç satırı koyuydu; sonuç satırının
               çubuğu bu araçta ölçeğin TAMAMI (toplam ÷ toplam = 1) olduğu
               için ekranda 1052 px'lik dolu bir siyah bant çıkıyordu —
               dökümün en dikkat çeken öğesi, en az şey söyleyen satırdı. */
            ton="koyu"
            /* Eksi U+2212: kısa çizgi tabular rakamın yanında kısa kalıyor ve
               bir tire gibi okunuyor. */
            deger={`${haric ? "+" : "−"}${f2(vat)}`}
            birim={cur}
          />
          <Satir
            toplam
            ikon={<SonucIkon key={mode} className="ta-kdv-glif" size={15} strokeWidth={1.9} />}
            baslik={
              <span key={mode} className="ta-kdv-yeni">
                {sonuc.ad}
              </span>
            }
            alt={haric ? `${f2(net)} × ${CARPAN}` : `${f2(gross)} ÷ ${CARPAN}`}
            oran={pay(sonucDeger)}
            /* Cevabın satırı marka mavisi: dökümün varış noktası o ve bandın
               büyük rakamıyla aynı sayı. */
            ton="mavi"
            deger={<Sayac deger={sonucDeger} ondalik={2} />}
            birim={cur}
          />
        </Satirlar>
      )}

      {/* Kural kutu değil DİPNOT. Cümle countryContent'teki DOĞRULANMIŞ
          satırdan aynen (ruleOf). Kaynak çipi bu oranın sitede yayımlandığı
          Dubai vergi bölümüne gidiyor; resmî otorite adresi rates.ts ·
          UAE_VAT'ta YOK (değer depo satırı + belge s.6) ve uydurulmadı. */}
      {RULE && (
        <Kural
          ikon={<Scale size={18} strokeWidth={1.9} />}
          baslik="Uygulanan kural"
          kaynak={<Kaynak href="/dubai#vergi">Dubai vergi çerçevesi</Kaynak>}
          teyit={CONFIRM ? "Oran ve eşik mali müşavir onayından henüz geçmedi." : undefined}
        >
          {RULE.label} {RULE.value}.{RULE.note ? ` ${RULE.note}` : null}
        </Kural>
      )}

      <Dip not={ESTIMATE_NOTE}>
        <AskCta />
      </Dip>

      {/* Aracın kendi açılırı. Kabuğun "ne değil" satırı hemen altta ve iki
          liste CSS'te tek liste gibi birleşiyor. Kayıt eşiği burada YOK:
          "ne değil" aynı şeyi söylüyor (dosya başı, KAYIT EŞİĞİ). */}
      <DerinListe>
        <Derin
          ikon={<Divide size={16} strokeWidth={1.9} />}
          baslik="KDV dâhil tutardan KDV nasıl ayrılıyor"
          ipucu={`Toplamın ${label} kadarı değil; matrah = toplam ÷ ${CARPAN}.`}
        >
          <DahilNot />
        </Derin>
      </DerinListe>
    </>
  );
}

/* Açılırın gövdesi. Bütün sayılar orandan (SUNUMUN SABİTLERİ). Hesaplanan
   sayılara ek gelmiyor ("%4,76'sı" gibi): ek, sayının okunuşuna bağlı ve oran
   değişince yanlış ek basılırdı. "AED'lik" sabit bir kelimenin eki. */
function DahilNot() {
  const r = UAE_VAT.rate.value;
  const { currency: c, rate } = UAE_VAT;
  return (
    <>
      KDV dâhil {formatAmount(ORNEK_TOPLAM)} {c}&apos;lik bir toplamda KDV{" "}
      {formatAmount(ORNEK_TOPLAM * r)} değil, {formatAmount(ORNEK_MATRAH * r)} {c}. Toplamın{" "}
      {rate.label} kadarını almak matrahı değil toplamı vergilendirmek olur; doğrusu toplamı{" "}
      {CARPAN} ile bölüp matrahı bulmak. Bu yüzden toplamın içindeki KDV payı her tutarda{" "}
      {formatPercent(PAY_KDV, 2)}.
    </>
  );
}
