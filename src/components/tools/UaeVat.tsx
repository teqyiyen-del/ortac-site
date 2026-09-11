"use client";

import { useId, useState } from "react";
import {
  ArrowRightLeft,
  Banknote,
  Calculator,
  Coins,
  Divide,
  Percent,
  ReceiptText,
  Scale,
  type LucideIcon,
} from "lucide-react";
import {
  Adim,
  AracDefter,
  AracIs,
  AracKart,
  BayrakDisk,
  DefterNot,
  Derin,
  DerinListe,
  Dokum,
  DokumSatir,
  Kaynak,
  Kural,
  PayCubugu,
  Sayac,
  Secenek,
  Secenekler,
  Sonuc,
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
   İki seçenek de ekranda görünüyor (sitenin bu turdaki kararı; aynı kalıp
   iletişim sayfasında ve belge listesinde). İki şıklı bir açılır menü, seçimi
   görünmez yapıp yanlış yönde hesaplama riskini artırıyor.

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
   araç bilmediği bir şeyi iddia etmiş olurdu. Aynı gerekçeyle defterde eşiğe
   göre dolan bir çubuk da YOK (araç dili turunda düşünüldü, elendi): tutarı
   375.000'e kıyaslayan bir gösterge, söylemediğimiz cümleyi resimle söylerdi.

   ---------------------------------------------------------------------------
   11.09.2026 · KURUMLAR VERGİSİ ARACIYLA AYNI KALIBA GETİRİLDİ

   Müşteri menüdeki bu kartı "yapalım" dedi; araç yazılıydı ama siteden hiç
   açılmamıştı. Gözden geçirmenin ölçütü kardeşi (KurumlarVergisi.tsx) oldu:
   aynı ailede, aynı sayfa kabuğunda iki hesaplayıcı, iki farklı olgunlukta
   duramaz. Dört fark vardı, dördü de kapandı. TEK ORAN EKLENMEDİ, tek eşik
   değişmedi; sayılar hâlâ yalnızca rates.ts · UAE_VAT.

     1) HAZIR TUTARLAR YOKTU. Kurumlar vergisinde çipler "ne yazsam" boşluğunu
        kapatmak için eklenmişti (gerekçe orada); aynı boşluk burada da vardı.
        Değerler örnek, iddia değil: yuvarlak fatura tutarları.
     2) ADIMLAR NUMARASIZDI. Kardeşi "1 · … 2 · …" diye sıralıyor; burada
        başlıklar düz yazıydı. Sıra, yönü seçmeden tutar yazan kişiye önce
        yönü gösteriyor.
     3) KURAL KUTUSU TABLONUN ALTINDAYDI ve başlığı "Kayıt eşiği" ama ilk
        satırı "KDV %5" idi. Kardeşindeki gibi seçimin altına, "Uygulanan
        kural" başlığıyla taşındı: kural hesaptan ÖNCE okunuyor.
        Kutudaki "Bu araç kayıt zorunluluğunuz olup olmadığını söylemiyor"
        cümlesi ÇIKTI: sayfa kabuğunun "Ne değil" satırı (catalog.ts · isNot)
        aynı şeyi aynı sayfada zaten söylüyor; iki kez söylenen cümle bu
        sitede ikisi birden okunmayan cümle.
     4) OKUNAMAYAN GİRDİ boş kutuyla aynı cümleyi basıyordu ("Tutarı yazın").
        "abc" ya da "-5" yazan kişi neden sonuç çıkmadığını göremiyordu.
        num.ts'in sözleşmesi aynı (okunamayan değer null), değişen yalnızca
        ekrandaki cümle. Kardeşinde de aynı düzeltme var.

   ---------------------------------------------------------------------------
   12.09.2026 · ARAÇ DİLİNE GEÇTİ (ToolShell.tsx · .ta-, sözleşme orada)

   Müşteri: "araçlarda ok gibi ama tasarımlar fena kötü … icondur,
   bayraktır, kontrasttır … uygunluk testimiz güzeldi … dinamizm ekle …
   karman çorman." HESAP DEĞİŞMEDİ: `net / vat / gross` üç satırı, MODES,
   HAZIR ve parseAmount çağrısı bayt bayt eski dosyadan. Değişen sunum:

     SOLDA  beyaz çalışma paneli — künye ("KDV hesabı · [bayrak] Dubai · AED",
            sağda dolu adım sayacı ve saç teli), iki adım (yön şıkları
            ikonlu · tutar kutusu + hazır tutarlar), dipte kural + kaynak
            (Dubai bayraklı çip) + tek satır teyit.
     SAĞDA  gece "hesap defteri" — sayarak değişen sonuç, toplamın içindeki
            matrah/KDV payı çubuğu, üç satırlık döküm, dipnot.
     ALTTA  tek açılır: "KDV dâhil tutardan KDV nasıl ayrılıyor" + kabuğun
            "ne değil"i (ikisi tek liste gibi birleşiyor).

   ESKİDEN EKRANDA OLUP ARTIK OLMAYANLAR: gri kural kutusu (.tl-ct), gri
   sonuç kutusu (.tl-out), kehribar teyit kutusu (.tl-warn, "depodaki vergi
   tablosundan alındı" diyen iç jargonlu paragraf) ve <table>. Teyit artık
   kuralın dibinde tek satır, kardeşiyle aynı cümle.

   ÖRNEK TUTARLA AÇILIYOR — kardeşindeki gerekçeyle (KurumlarVergisi ·
   ÖRNEK TUTARLA AÇILIYOR). Kutu boş açılınca defter "—" gösteriyor ve
   sonucun canlı olduğu ilk rakam yazılana kadar görünmüyordu. Açılış değeri
   yer tutucunun KENDİSİ (10.000; hazır tutarlardan biri), yardım satırı
   "Kutudaki tutar bir örnek" diyor. Hesaba dokunmuyor, yalnız ilk hâl.

   DÖKÜM HESABIN YÖNÜNDE OKUNUYOR — bu aracın "çevirim"i. Satırlar hep aynı
   üç YER: 1) girdiğiniz tutar, 2) KDV (+ ya da −), 3) sonuç (kalın). Hariçte
   matrah → + KDV → toplam; dâhilde toplam → − KDV → matrah. Yön değişince
   satırların adı ve ikonu yer değiştiriyor ve bir kez kayarak giriyor.
     NEDEN SATIRLAR KENDİSİ YER DEĞİŞTİRMİYOR (anahtarla taşınmıyor): 3.
     satırın diski aktarım zincirinin son durağı (.akt-durak). Zincir,
     bütün duraklar AYNI ANDA takıldığı için sıralı akıyor; bir durak sonradan
     takılırsa (yeniden sıralama = DOM'dan sök-tak, ya da `toplam` propunun
     satırdan satıra geçmesi) animasyonu o anda baştan başlıyor ve dalga
     sırasını kaybediyor. O yüzden satır DÜĞÜMLERİ yerinde kalıyor, yalnız
     içlerindeki metin ve glif `key={mode}` ile yenileniyor.
     AYNI SEBEPLE döküm tutar boşken de basılıyor ("—" değerlerle): boş →
     dolu geçişinde satırlar sökülüp takılsaydı durak yine kayardı. Yan
     kazancı: kutu silinip yeniden yazılırken defter zıplamıyor.

   HALKA YOK. Kardeşinde halka efektif oranı gösteriyor ve tutarla değişiyor;
   KDV'de efektif oran her tutarda %5, yani halka hiç kıpırdamayan bir süs
   olurdu. Onun yerine PAY ÇUBUĞU: KDV dâhil bir toplamın içinde matrah ve
   KDV payı. O da her tutarda aynı ve bu bilerek — gösterdiği şey tutar değil
   kuralın kendisi: toplamın içindeki KDV %5 değil %4,76. Açılırdaki not bu
   farkı örnekle anlatıyor (en sık yapılan hata toplamın %5'ini almak).
   Çubuk halkanın boş kalan yerini aktarım zincirinde de alıyor (durak 2,
   araclar-kdv.css), yani dalga girdiden sonuca kesintisiz akıyor.

   YENİ SÜREKLİ ANİMASYON YOK. Kartın iki sürekli hareketi ortak dilden
   geliyor (aktarım 11,447 s, defter ışığı 12,457 s). Bu araca özel olanların
   hepsi DURUM DEĞİŞİMİNDE bir kez oynuyor: sayan rakam, sonuçtan akan ışık,
   döküm satırlarının kayarak girişi, glif değişimi. Üçüncü bir sürekli
   ritim, iki satırlık bir hesabı "karman çorman"a geri götürürdü.
   ========================================================================= */

type Mode = "haric" | "dahil";

const MODES: { key: Mode; label: string; hint: string }[] = [
  { key: "haric", label: "Tutar KDV hariç", hint: "Elinizdeki rakam matrah" },
  { key: "dahil", label: "Tutar KDV dâhil", hint: "Elinizdeki rakam toplam" },
];

/* Örnek fatura tutarları, iddia değil. Kayıt eşiği (375.000) bilerek YOK:
   bu araç eşiği hesaplamıyor (dosya başı) ve eşiğin çipi, kişiye "bu tutar
   kayıt demek" diye okunabilirdi. */
const HAZIR = [1_000, 5_000, 10_000, 50_000, 100_000];

const RULE = ruleOf(UAE_VAT.rate);
const CONFIRM = needsConfirm(UAE_VAT.rate, UAE_VAT.registration);

/* ------------------------------------------------ SUNUMUN SABİTLERİ ----
   Hepsi orandan TÜRETİLİYOR; oran yazılmıyor.

   ORNEK hem yer tutucu hem açılış değeri (bkz. ÖRNEK TUTARLA AÇILIYOR):
   ikisi ayrı sayı olsaydı boş kutuda bir örnek, dolu kutuda başka bir örnek
   görülürdü. Hazır tutarların ortasındaki 10.000 ile aynı, yani açılışta o
   çip işaretli duruyor. */
const ORNEK = "10.000";
const ADIM = 2;

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

/* Yön şıkkının ve döküm satırının glifi: elinizdeki rakamın ne olduğu.
   Matrah = vergisiz para (Coins, kardeşinde de "vergiye tabi kazanç"ın
   glifi), toplam = faturanın alt satırı (ReceiptText; aracın menüdeki glifi
   Receipt, aynı aile). */
const MOD_IKON: Record<Mode, LucideIcon> = { haric: Coins, dahil: ReceiptText };

/* Dökümün iki uç satırı. Hangisinin girdi, hangisinin sonuç olduğu yöne göre. */
const UC = {
  matrah: { ad: "Matrah (KDV hariç)", Ikon: Coins },
  toplam: { ad: "Toplam (KDV dâhil)", Ikon: ReceiptText },
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

/* Boş döküm hücresi: görünen çizgi süs, okunan metin gerçek (tuzak G-2:
   aria-label değil, görünmez METİN). */
function Bos() {
  return (
    <>
      <span aria-hidden="true">—</span>
      <span className="sr-only">Henüz yok</span>
    </>
  );
}

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

  /* Künyedeki sayaç: dolu adım. Yönün varsayılanı var (hep dolu), tutar
     okunabiliyorsa ikinci. */
  const dolu = 1 + (hesap ? 1 : 0);

  const GirdiIkon = girdi.Ikon;
  const SonucIkon = sonuc.Ikon;

  return (
    <>
      <AracKart>
        <AracIs
          baslik="KDV hesabı"
          /* Künye kabı gitti: bayrağın hizası artık ortak kuralda
             (araclar.css · .ta-bas-s .ta-bayrak), yani `.ta-kdv-kunye`
             sarmalayıcısının yapacak bir işi kalmadı. */
          alt={
            <>
              <BayrakDisk ulke="dubai" boy="xs" />
              {COUNTRY_NAME.dubai} · {cur}
            </>
          }
          sag={
            <span className="ta-sayim" aria-hidden="true">
              <b>{pad(dolu)}</b> / {pad(ADIM)}
            </span>
          }
          ilerleme={dolu / ADIM}
        >
          <Adim no={1} ikon={<ArrowRightLeft size={18} strokeWidth={1.9} />} baslik="Girdiğiniz tutar">
            <Secenekler>
              {MODES.map((m) => {
                const Ikon = MOD_IKON[m.key];
                return (
                  <Secenek
                    key={m.key}
                    ad={`${uid}-mode`}
                    secili={m.key === mode}
                    onSec={() => setMode(m.key)}
                    disk={<Ikon size={20} strokeWidth={1.9} />}
                    baslik={m.label}
                    ipucu={m.hint}
                  />
                );
              })}
            </Secenekler>
          </Adim>

          <Adim
            no={2}
            akt
            ikon={<Banknote size={18} strokeWidth={1.9} />}
            etiketIcin={`${uid}-amount`}
            baslik={
              /* Etiket yönü söylüyor: kutuya yazılan sayının ne olduğu, şık
                 değişince etiketin kendisinde de okunuyor. Boşluk parantezli
                 kuyruğun İÇİNDE (kardeşindeki ölçüm: dışarıda kalınca ad
                 "tutar(AED)" diye bitişik okunuyordu). */
              <>
                {haric ? "KDV hariç" : "KDV dâhil"} tutar
                <span className="ta-adim-x">{` (${cur})`}</span>
              </>
            }
          >
            {/* type="number" değil: tarayıcının ok tuşları ve yerel ayrım
                işareti Türkçe binlik noktasıyla çakışıyor; inputMode mobilde
                sayı klavyesini yine açıyor. Para birimi rozeti aria-hidden,
                etiket zaten "(AED)" diyor. */}
            <div className="ta-tutar" data-hata={okunamadi ? "" : undefined}>
              <input
                id={`${uid}-amount`}
                className="ta-girdi"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder={ORNEK}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-describedby={`${uid}-help`}
                aria-invalid={okunamadi || undefined}
              />
              <span className="ta-birim" aria-hidden="true">
                {cur}
              </span>
            </div>

            {/* Düğme, bağlantı değil: yalnızca kutuyu dolduruyor. Seçili olan
                işaretli ki kişi kendi yazdığıyla çipten geleni ayırt etsin. */}
            <div className="ta-hazir">
              <span className="ta-hazir-k">Hazır tutarlar</span>
              {HAZIR.map((h) => (
                <button
                  key={h}
                  type="button"
                  className="ta-hazir-b"
                  data-on={amount === h ? "" : undefined}
                  onClick={() => setValue(formatAmount(h))}
                >
                  {formatAmount(h)}
                </button>
              ))}
            </div>

            <p id={`${uid}-help`} className="ta-yardim">
              {ornekte && <b>Kutudaki tutar bir örnek. </b>}
              Binlik ayracı nokta, ondalık virgül: 10.000,50.
            </p>
          </Adim>

          {/* Kural çalışma panelinin dibinde; cümle countryContent'teki
              DOĞRULANMIŞ satırdan aynen (ruleOf). Kaynak çipi kardeşindekiyle
              aynı yere gidiyor: bu oranın sitede yayımlandığı Dubai vergi
              bölümü. Resmî otorite adresi rates.ts · UAE_VAT'ta YOK (değer
              depo satırı + belge s.6) ve uydurulmadı. Çipteki bayrak süs. */}
          {RULE && (
            <Kural
              ikon={<Scale size={18} strokeWidth={1.9} />}
              baslik="Uygulanan kural"
              kaynak={
                <Kaynak href="/dubai#vergi">
                  <BayrakDisk ulke="dubai" boy="xs" />
                  Dubai vergi çerçevesi
                </Kaynak>
              }
              teyit={CONFIRM ? "Oran ve eşik mali müşavir onayından henüz geçmedi." : undefined}
            >
              {RULE.label} {RULE.value}.{RULE.note ? ` ${RULE.note}` : null}
            </Kural>
          )}
        </AracIs>

        <AracDefter
          ikon={<Calculator size={15} strokeWidth={1.9} />}
          baslik="Hesap defteri"
          sag={
            <>
              <BayrakDisk ulke="dubai" boy="xs" />
              {cur}
            </>
          }
        >
          <Sonuc
            etiket={haric ? "KDV dâhil toplam" : "KDV hariç matrah"}
            tetik={hesap ? `${mode}:${amount}` : okunamadi ? "hata" : "bos"}
            alt={
              !hesap ? (
                okunamadi ? (
                  <>
                    “{value}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik ayracı
                    nokta, ondalık virgül.
                  </>
                ) : (
                  "Tutarı yazın; matrah, KDV ve toplam üç satır hâlinde gösterilir."
                )
              ) : haric ? (
                <>Matraha {label} KDV ekleniyor.</>
              ) : (
                <>KDV toplamın içinden ayrılıyor.</>
              )
            }
          >
            {hesap ? (
              <>
                <Sayac deger={sonucDeger} ondalik={2} />
                <span className="ta-sonuc-b">{cur}</span>
              </>
            ) : (
              <>
                <span className="ta-sonuc-bos" aria-hidden="true">
                  —
                </span>
                <span className="sr-only">Henüz hesap yok.</span>
              </>
            )}
          </Sonuc>

          {/* Toplamın içindeki paylar. Tutardan bağımsız (dosya başı · HALKA
              YOK), o yüzden tutar boşken de duruyor. Çubuk süs; aynı iki
              pay göstergede yazılı. Kap aktarım zincirinin 2. durağı. */}
          <p className="ta-defter-k">KDV dâhil toplamın içinde</p>
          <div className="ta-dilim">
            <span className="ta-kdv-pay akt-durak">
              <PayCubugu
                parcalar={[
                  { oran: PAY_MATRAH, ton: "sonuk" },
                  { oran: PAY_KDV, ton: "mavi" },
                ]}
              />
            </span>
            <ul className="ta-dilim-e">
              <li data-ton="sonuk">
                <i aria-hidden="true" />
                Matrah · {formatPercent(PAY_MATRAH, 2)}
              </li>
              <li data-ton="mavi">
                <i aria-hidden="true" />
                KDV · {formatPercent(PAY_KDV, 2)}
              </li>
            </ul>
          </div>

          {/* Hesabın yönünde üç satır (dosya başı · DÖKÜM HESABIN YÖNÜNDE).
              Satır düğümleri sabit; yön değişince yalnız `key={mode}` taşıyan
              ad ve glif yenileniyor (.ta-kdv-yeni / .ta-kdv-glif). Sonuç
              satırının Sayac'ı anahtarsız: yön değişince eski değerden yenisine
              sayıyor. Eksi U+2212 (kardeşindeki gerekçe: kısa çizgi tabular
              rakamın yanında tire gibi okunuyor). */}
          <Dokum>
            <DokumSatir
              ikon={<GirdiIkon key={mode} className="ta-kdv-glif" size={14} strokeWidth={1.9} />}
              etiket={
                <span key={mode} className="ta-kdv-yeni">
                  {girdi.ad}
                </span>
              }
              alt="Girdiğiniz tutar"
              deger={hesap ? f2(haric ? net : gross) : <Bos />}
            />
            <DokumSatir
              ikon={<Percent size={14} strokeWidth={1.9} />}
              etiket={`KDV ${label}`}
              alt={hesap ? `${f2(net)} × ${label}` : `Matrah × ${label}`}
              deger={hesap ? `${haric ? "+" : "−"}${f2(vat)}` : <Bos />}
            />
            <DokumSatir
              toplam
              ikon={<SonucIkon key={mode} className="ta-kdv-glif" size={14} strokeWidth={1.9} />}
              etiket={
                <span key={mode} className="ta-kdv-yeni">
                  {sonuc.ad}
                </span>
              }
              alt={
                haric
                  ? `${hesap ? f2(net) : "Matrah"} × ${CARPAN}`
                  : `${hesap ? f2(gross) : "Toplam"} ÷ ${CARPAN}`
              }
              deger={hesap ? <Sayac deger={sonucDeger} ondalik={2} /> : <Bos />}
            />
          </Dokum>

          <DefterNot>{ESTIMATE_NOTE}</DefterNot>
        </AracDefter>
      </AracKart>

      {/* Aracın kendi açılırı. Kabuğun "ne değil" satırı hemen altta ve iki
          liste CSS'te tek liste gibi birleşiyor. Kayıt eşiği burada YOK:
          "ne değil" aynı şeyi söylüyor (dosya başı, 3. madde). */}
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
