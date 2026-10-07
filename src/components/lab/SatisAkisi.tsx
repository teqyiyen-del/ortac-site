"use client";

/* ============================================================================
   SATIŞ AKIŞI · DEMO — /lab/satis-akisi

   Müşterinin sesli brifi (13.09.2026, tamamı docs/durum.md'de):
     "önce ülke seçecek, sonra … şimdi Dubai üzerinden sadece şu an onu
      yapalım. Dubai'yi seçtikten sonra kaç tane vize istiyor, hangi paketi
      istiyor falan … bizim normal fiyatlar kısmındaki gibi düşün, sonrasında
      … kişisel bilgileri doldurma kısmı gelecek … bir sonraki aşamada teklifi
      görecek. Sonra onu onaylarlarsa [ödeme] tarafına geçecek."

   İKİ GİRİŞ, TEK PENCERE. Her yerdeki "Kurulumu Başlat" pencereyi BOŞ açıyor;
   fiyatlardaki "Hemen başla" AYNI pencereyi seçimler DOLU açıyor ve kullanıcı
   yalnızca kontrol edip devam ediyor. İki ayrı akış yazılmadı: fark yalnızca
   pencereye verilen başlangıç değeri (`onceden`).

   ------------------------------------------------------------ NEDEN <dialog>
   Pencere yerleşik <dialog> + showModal(). Odak tuzağı, Esc ile kapanma, arka
   planın erişilemez olması ve üst katman (z-index yarışı yok) tarayıcıdan
   geliyor; bir modal kütüphanesi ya da elle yazılmış odak döngüsü eklenmedi.
   Sitenin kaydırması Lenis — pencerenin kaydırılan gövdesinde
   `data-lenis-prevent` var, yoksa tekerlek olayını Lenis yutup sayfayı
   kaydırırdı.

   ------------------------------------------------------------ VERİ VE UYDURMA
   Fiyatların TAMAMI lib/pricing.ts · configure()'dan — ülke sayfasındaki fiyat
   bölümünün (CountryPricing.tsx) kullandığı fonksiyonun ta kendisi. Dosyaya
   dokunulmadı. O dosyanın kendi kaydı "SWAP:PRICING — every number is a
   placeholder; must ship with the 'temsili' disclaimer" diyor; teklifin
   altındaki ibare bu yüzden var ve SİLİNEMEZ.

   Veride KARŞILIĞI OLMAYAN üç şey uydurulmadı, ekranda SWAP olarak duruyor:
     · teklifin geçerlilik süresi
     · havale için banka hesabı bilgileri
     · kişi bilgisi alanlarının kesin listesi (müşteri "neler alacağımızı
       teyit ederiz" dedi; ad · soyad · e-posta · telefon demo için)

   ------------------------------------------------------------ DEMO SINIRI
   Ödeme adımı HİÇBİR YERE BAĞLI DEĞİL: Stripe çağrısı yok, sunucu rotası yok,
   hiçbir bilgi bir yere gönderilmiyor. Ekrandaki her girdi tarayıcının
   belleğinde ve pencere kapanınca siliniyor.

   PDF: "PDF olarak kaydet" tarayıcının yazdırma penceresini açıyor ve yazdırma
   CSS'i yalnız teklif belgesini basıyor (lab-satis.css · @media print). Demo
   için yeni bir bağımlılık eklenmedi. Gerçek akışta PDF sunucuda üretilmeli,
   çünkü aynı dosya müşteriye e-postayla da gidecek.
   ------------------------------------------------------------ 05.10.2026
   Burak (müşteri toplantısı öncesi, sesli):
     · "Paketler kısmını 3 tane seçenek olarak koyacaksın … böyle
       özelleştirme falan olmayacak." Faaliyet alanı, vize sayacı ve ek
       hizmet anahtarları kalktı; üç paket, her birinin kapsamı kartında.
       Faaliyet katsayısı hesaba girmiyor (sabit, katsayısı 1).
     · "Her aşamada … takıldığın bir konu var mı gibisinden iletişime
       geçebilecekleri bir şey; WhatsApp'tan ulaşabilmeleri için bir numara
       vereceğiz. Şimdilik butonunu koyman yeterli." Alt şeritte her adımda
       WhatsApp düğmesi; numara SWAP, düğme demoda hiçbir yere gitmiyor.
     · "Giriş iki'ye gerek yok, giriş bir olsun." Fiyatlardan dolu açılan
       ikinci giriş kalktı.
     · ALTERNATİF AKIŞ (`akis="kabul"`): "ödemeyi burada yapmayacağı bir
       yöntem olsun, çünkü kimse bu kadar kolay ödeme yapmaz dediler (Arda)
       … teklif edilsin, kabul etsin; bilgilerinizi aldık, teklifi kabul
       ettiğinizi gördük, teşekkürler; mailden resmî ödeme yerini ileteceğiz,
       panele sokacağız … Murat abi böyle de olabilir diyordu, o hâlini de
       yapıp sunmak istiyorum." Dört adım, ödeme adımı yok; teklif kabul
       edilince teşekkür ekranı ve sonraki adımlar.
   ------------------------------------------------------------ 06.10.2026
   Burak (toplantı sonrası): "kuruluma başlama işinde ödemeyi koymayacağız.
   En sondaki aşamayı da teklif diye değil özet ismiyle konumlandıracağız.
   Sonrasında 'süreci başlatalım' gibi bir buton koyacağız ve yasal tarafa
   [müşteri paneline] yönlendirip oradan devamını getirecekler; o mantığa
   geri dönüyoruz."
   Üçüncü akış (`akis="ozet"`) ve lab'daki TEK giriş artık bu: ülke, paket,
   bilgiler, ÖZET. Son düğme "Süreci başlatalım"; kişi müşteri paneline
   geçiyor, sözleşme, belgeler ve ödeme orada. Panelin adresi SWAP (elimizde
   yok); panelin marka adı sitede geçmez (tuzaklar 7). Ödemeli ve "kabul"
   akışlarının kodu duruyor, lab'dan bağlanmıyor.
   ------------------------------------------------------------ 06.10.2026 (2)
   Burak akışı gezdi: "Niye paket seçiyoruz? Paket yok … Dubai şirket
   kısmında bir fiyatlar yaptık ya, oraya benzer bir şey koyman lazım, ya da
   orayı koyman lazım direkt." `ozet` akışında:
     · 2. adım paket değil, fiyat panelinin KENDİ formu (DubaiSecimFormu):
       serbest bölge, lisans yılı, vize, VIP, yıllık muhasebe; tutar altta.
     · Fiyat panelinden gelen seçimle açılırsa (`onceden`) ülke ve seçim
       dolu, akış ikinci adımdan başlıyor. Menüden gelince baştan.
     · Bilgiler: dört alan; e-postanın altındaki açıklama ve SWAP notu
       kalktı; altına KVKK aydınlatma satırı (metnin adresi SWAP).
     · Özet: A4 görünümü kaldı ("böyle daha iyi"), "PDF olarak kaydet"
       kalktı ("hâlâ teklif gibi oluyor").
     · WhatsApp düğmesi ortada değil, ana düğmenin hemen yanında.
   Akış /basla sayfasına bağlandı (app/basla/page.tsx); hiçbir bilgi bir
   yere gönderilmiyor, panel adresi ve WhatsApp numarası hâlâ SWAP.
   ========================================================================= */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  FileText,
  Globe2,
  MessageCircle,
  Package,
  Printer,
  ShieldCheck,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
/* süre fiyat dosyasından değil ülke özetinden (teyit · Dubai kuruluş 1: 5-6 gün) */
import { FACTS } from "@/lib/brand";
import {
  configure,
  PRICING,
  TIER_INCLUDES,
  TIER_META,
  TIER_PRICE,
} from "@/lib/pricing";
import {
  COUNTRY_LABELS,
  type Activity,
  type Country,
  type Tier,
} from "@/lib/store";

/* ------------------------------------------------------------------ TİPLER */

import { DubaiSecimFormu } from "@/components/country/DubaiFiyat";
import { DUBAI_VARSAYILAN, dubaiSatirlar, dubaiToplam, type DubaiSecim } from "@/lib/dubaiFiyat";
import { KktcSecimFormu } from "@/components/country/KktcFiyat";
import { KKTC_VARSAYILAN, euro, kktcSatirlar, kktcToplam, type KktcSecim } from "@/lib/kktcFiyat";
import type { BaslaOnceden } from "@/lib/baslaSecim";
import "@/app/css/lab-satis.css";
import "@/app/css/dubai-ek.css";

type Kisi = { ad: string; soyad: string; eposta: string; telefon: string };

const ADIMLAR: { ad: string; icon: LucideIcon }[] = [
  { ad: "Ülke", icon: Globe2 },
  { ad: "Paket", icon: Package },
  { ad: "Bilgiler", icon: UserRound },
  { ad: "Teklif", icon: FileText },
  { ad: "Ödeme", icon: CreditCard },
];

const ULKELER: Country[] = ["dubai", "ingiltere", "kktc"];
/* Müşteri: "şimdi Dubai üzerinden sadece şu an onu yapalım." Öteki iki ülke
   görünüyor ama seçilemiyor; akışın üç ülkeli olacağı ilk adımda belli. */
const ACIK: Country = "dubai";
/* 07.10.2026 · özet akışında KKTC de açık (Burak: "Kıbrıs'ı da ekleyebilirsin
   … orada da benzer mantığı yapacaksın"). İngiltere'nin fiyat modeli yok. */
const OZET_ACIK: Country[] = ["dubai", "kktc"];

const TIERS: Tier[] = ["basic", "gold", "platinium"];
/* Paketler sabit: faaliyet seçilmiyor. configure() bir faaliyet istiyor;
   katsayısı 1 olan sabit bir değer veriliyor, yani tutar paketin kendi
   fiyatı (lib/pricing.ts · TIER_PRICE). */
const SABIT_FAALIYET: Activity = "danismanlik";

/** Ödemeli akış (beş adım) ya da teklif ve kabul (dört adım, ödeme yok). */
export type Akis = "odeme" | "kabul" | "ozet";

/* Paketin kartında basılan kapsam: lib/pricing.ts · TIER_INCLUDES'tan. */
function kapsam(t: Tier): string[] {
  const inc = TIER_INCLUDES[t];
  return [
    "Şirket kuruluşu ve lisans",
    ...(inc.bank ? ["Banka hesabı desteği"] : []),
    ...(inc.visas > 0 ? [`Oturum ve vize · ${inc.visas} kişi`] : []),
    ...(inc.accounting ? ["Yıllık muhasebe"] : []),
  ];
}

/* Sunum modunun örnek kişisi. Yalnız boş alanlara giriyor (ornekDoldur). */
const ORNEK_KISI = { ad: "Ahmet", soyad: "Yılmaz", eposta: "ahmet.yilmaz@ornek.com" };

/* Sitenin fiyat bölümüyle aynı biçim (CountryPricing.tsx · money). */
const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

/* Mevcut site cümlesi (home/PriceSummary.tsx · fy2-note), yeniden yazılmadı. */
const TEMSILI =
  "Tutarlar tahminîdir. Nihai teklif faaliyet, yapı ve belgelere göre netleşir; resmî harçlar ile üçüncü taraf ücretleri değişebilir.";

/* Teklif numarası: girdiden türeyen kısa bir özet. Math.random yok — aynı kişi
   aynı seçimle aynı numarayı görür, sayfa yenilense de değişmez. Gerçek akışta
   numarayı sunucu verecek (tekillik orada garanti edilir). */
function ozet(metin: string) {
  let h = 5381;
  for (let i = 0; i < metin.length; i++) h = ((h << 5) + h + metin.charCodeAt(i)) >>> 0;
  return h.toString(36).toUpperCase().padStart(6, "0").slice(-6);
}

/* ================================================================ PENCERE */

export function SatisPenceresi({
  acik,
  akis,
  sunum,
  onKapat,
  onceden,
}: {
  acik: boolean;
  akis: Akis;
  /** fiyat panelinden gelen seçim: ülke ve seçim dolu, akış 2. adımdan açılır */
  onceden?: BaslaOnceden | null;
  /** Sunum modu: adımlar arasında bilgi girmeden geçilir (bkz. ornekDoldur). */
  sunum: boolean;
  onKapat: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  /* Pencere her açılışta YENİ bir `key` ile kuruluyor (SatisAkisiDemo ·
     oturum), yani bu başlatıcılar her açılışta yeniden çalışıyor; kapatıp
     yeniden açan kişi yarım bir akışa değil başa düşüyor. */
  const [adim, setAdim] = useState(onceden ? 1 : 0);
  const [ulke, setUlke] = useState<Country | null>(onceden ? onceden.ulke : null);
  const [secim, setSecim] = useState<DubaiSecim>(onceden?.ulke === "dubai" ? onceden.dubai : DUBAI_VARSAYILAN);
  const [kktc, setKktc] = useState<KktcSecim>(onceden?.ulke === "kktc" ? onceden.kktc : KKTC_VARSAYILAN);
  const [tier, setTier] = useState<Tier | null>(null);
  const [kisi, setKisi] = useState<Kisi>({ ad: "", soyad: "", eposta: "", telefon: "" });
  const [dokundu, setDokundu] = useState(false);
  const [yontem, setYontem] = useState<"kart" | "havale" | null>(null);
  const [bitti, setBitti] = useState(false);

  /* Effect yalnız tarayıcı API'sine dokunuyor (showModal/close); React
     durumuna yazmıyor. */
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (acik && !d.open) d.showModal();
    else if (!acik && d.open) d.close();
  }, [acik]);

  const sonuc = useMemo(
    () =>
      ulke && tier
        ? configure({ country: ulke, tier, activity: SABIT_FAALIYET, visas: 0, bank: false, accounting: false })
        : null,
    [ulke, tier],
  );
  /* ödemesiz akışta son adım teklif: dört adım */
  const ozetM = akis === "ozet";
  const adimlar = ozetM
    ? [ADIMLAR[0], { ...ADIMLAR[1], ad: "Kurulum" }, ADIMLAR[2], { ...ADIMLAR[3], ad: "Özet" }]
    : akis === "kabul"
      ? ADIMLAR.slice(0, 4)
      : ADIMLAR;
  const sonAdim = adimlar.length - 1;

  const epostaGecerli = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(kisi.eposta.trim());
  const kisiTamam = kisi.ad.trim() !== "" && kisi.soyad.trim() !== "" && epostaGecerli;

  const devamOlur =
    (adim === 0 && ulke !== null) ||
    (adim === 1 && (ozetM || sonuc !== null)) ||
    (adim === 2 && kisiTamam) ||
    adim === 3;

  const bugun = useMemo(
    () => (adim >= 3 ? new Date().toLocaleDateString("tr-TR") : ""),
    [adim],
  );
  const teklifNo = useMemo(() => {
    if (adim < 3 || !ulke) return "";
    const tarih = new Date();
    const yy = String(tarih.getFullYear()).slice(-2);
    const mm = String(tarih.getMonth() + 1).padStart(2, "0");
    const kod = ozet([kisi.eposta, kisi.ad, kisi.soyad, ulke, tier, JSON.stringify(ulke === "kktc" ? kktc : secim)].join("|"));
    return `ORT-${ulke === "kktc" ? "KKTC" : "DXB"}-${yy}${mm}-${kod}`;
  }, [adim, ulke, tier, kisi, secim, kktc]);

  /* ------------------------------------------------------- SUNUM MODU
     Müşteri: "içinde rahatça dolaşabilmek için bilgi girmesem de devam
     edebileceğim bi geçiş koy, müşterime de öyle sunabileyim."

     Sunum modunda "Devam et" hiç kilitlenmiyor ve üstteki adım sekmeleri
     tıklanabilir oluyor. Hedef adımın ihtiyaç duyduğu bir değer BOŞSA örnek
     değerle dolduruluyor — yalnız boş olanlar; sunan kişinin kendi yazdığı ya
     da seçtiği hiçbir şeyin üstüne yazılmıyor. Örnek e-posta ornek.com alan
     adında: gerçek bir adrese benzemiyor, sunumda kimseye ait gibi durmuyor.

     Sunum modu yalnız lab sayfasındaki anahtardan geliyor; gerçek akışta bu
     prop olmayacak. */
  function ornekDoldur(hedef: number) {
    if (hedef >= 1 && !ulke) setUlke(ACIK);
    if (hedef >= 2 && !tier) setTier("gold");
    if (hedef >= 3) {
      setKisi((k) => ({
        ad: k.ad.trim() || ORNEK_KISI.ad,
        soyad: k.soyad.trim() || ORNEK_KISI.soyad,
        eposta: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(k.eposta.trim()) ? k.eposta : ORNEK_KISI.eposta,
        telefon: k.telefon,
      }));
    }
  }

  function ileri() {
    /* ödemesiz akış: teklif adımındaki düğme teklifi KABUL ediyor */
    if (akis !== "odeme" && adim === 3) {
      setBitti(true);
      return;
    }
    if (sunum) {
      ornekDoldur(adim + 1);
      setAdim((a) => Math.min(a + 1, sonAdim));
      return;
    }
    if (adim === 2 && !kisiTamam) {
      setDokundu(true);
      return;
    }
    if (devamOlur) setAdim((a) => Math.min(a + 1, sonAdim));
  }
  function geri() {
    setAdim((a) => Math.max(a - 1, 0));
  }
  function git(hedef: number) {
    ornekDoldur(hedef);
    setAdim(hedef);
  }

  return (
    <dialog
      ref={ref}
      className="sat-pen"
      aria-labelledby="sat-pen-baslik"
      onClose={onKapat}
      onCancel={onKapat}
    >
      <div className="sat-pen-in">
        {/* ------------------------------------------------ BAŞLIK + ADIMLAR */}
        <header className="sat-bas">
          <div className="sat-bas-ust">
            <p id="sat-pen-baslik" className="sat-bas-t">
              Kurulumu başlat
            </p>
            <button type="button" className="sat-kapat" onClick={onKapat} aria-label="Pencereyi kapat">
              <X size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          {!bitti && (
            <ol className="sat-adimlar">
              {adimlar.map((a, i) => {
                const Icon = a.icon;
                const durum = i < adim ? "gecti" : i === adim ? "simdi" : "sonra";
                const ic = (
                  <>
                    <span className="sat-adim-ic" aria-hidden="true">
                      {i < adim ? <Check size={14} strokeWidth={2.4} /> : <Icon size={14} strokeWidth={1.9} />}
                    </span>
                    <span>
                      <span className="sat-adim-no">{String(i + 1).padStart(2, "0")}</span>
                      {a.ad}
                    </span>
                  </>
                );
                return (
                  <li key={a.ad} data-durum={durum} aria-current={i === adim ? "step" : undefined}>
                    {sunum ? (
                      <button type="button" className="sat-adim-b" onClick={() => git(i)}>
                        {ic}
                      </button>
                    ) : (
                      <span className="sat-adim-b">{ic}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </header>

        {/* ------------------------------------------------------------ GÖVDE */}
        <div className="sat-govde" data-lenis-prevent="">
          {bitti ? (
            <Tamam akis={akis} yontem={yontem} teklifNo={teklifNo} eposta={kisi.eposta} />
          ) : (
            <div className="sat-adim" key={adim}>
              {/* ================================================= 1 · ÜLKE */}
              {adim === 0 && (
                <section aria-labelledby="sat-a0">
                  <h2 id="sat-a0" className="sat-soru">Şirketinizi hangi ülkede kuruyorsunuz?</h2>
                  <div className="sat-ulkeler" role="radiogroup" aria-labelledby="sat-a0">
                    {ULKELER.map((c) => {
                      const acikMi = ozetM ? OZET_ACIK.includes(c) : c === ACIK;
                      return (
                        <label key={c} className="sat-ulke" data-kapali={!acikMi || undefined}>
                          <input
                            type="radio"
                            name="sat-ulke"
                            value={c}
                            checked={ulke === c}
                            disabled={!acikMi}
                            onChange={() => setUlke(c)}
                          />
                          <span className="sat-bayrak" aria-hidden="true">
                            <Flag country={c} />
                          </span>
                          <span className="sat-ulke-t">
                            <b>{COUNTRY_LABELS[c]}</b>
                            <span>{!acikMi ? "Yakında bu akışta" : ozetM && c === "kktc" ? "Serbest Liman ve Bölge şirketi" : PRICING[c].license}</span>
                          </span>
                          <span className="sat-tik" aria-hidden="true">
                            <Check size={14} strokeWidth={2.6} />
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ================================================= 2 · PAKET
                  Üç sabit paket; özelleştirme yok (05.10.2026). Kapsam kartın
                  içinde, tutar paketin kendi fiyatı. */}
              {adim === 1 && ulke && ozetM && (
                <section aria-labelledby="sat-a1o">
                  <h2 id="sat-a1o" className="sat-soru">Kurulumunuzu seçin</h2>
                  <div className="sat-secim">
                    {ulke === "kktc" ? (
                      <KktcSecimFormu secim={kktc} onSecim={setKktc} />
                    ) : (
                      <DubaiSecimFormu secim={secim} onSecim={setSecim} />
                    )}
                  </div>
                  <p className="sat-secim-t">
                    <span>{ulke === "kktc" ? "Kuruluş ve ilk yıl tutarı" : "Tahmini tutar · KDV hariç"}</span>
                    <b>{ulke === "kktc" ? euro(kktcToplam()) : money(dubaiToplam(secim))}</b>
                  </p>
                </section>
              )}
              {adim === 1 && ulke && !ozetM && (
                <section aria-labelledby="sat-a1">
                  <h2 id="sat-a1" className="sat-soru">Paketinizi seçin</h2>
                  <div className="sat-tierler sat-uc" role="radiogroup" aria-labelledby="sat-a1">
                    {TIERS.map((t) => (
                      <label key={t} className="sat-tier sat-tier-b">
                        <input
                          type="radio"
                          name="sat-tier"
                          value={t}
                          checked={tier === t}
                          onChange={() => setTier(t)}
                        />
                        <span className="sat-tier-ad">{TIER_META[t].name}</span>
                        <span className="sat-tier-bilgi">{TIER_META[t].info}</span>
                        <span className="sat-tier-f">{money(TIER_PRICE[ulke][t])}</span>
                        <ul className="sat-tier-l">
                          {kapsam(t).map((k) => (
                            <li key={k}>
                              <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                              {k}
                            </li>
                          ))}
                        </ul>
                        <span className="sat-tik" aria-hidden="true">
                          <Check size={14} strokeWidth={2.6} />
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="sat-ozet-n">
                    {FACTS[ulke].days} · {PRICING[ulke].license}
                  </p>
                </section>
              )}

              {/* ============================================== 3 · BİLGİLER */}
              {adim === 2 && (
                <section aria-labelledby="sat-a2">
                  <h2 id="sat-a2" className="sat-soru">{ozetM ? "Süreç kimin adına başlasın?" : "Teklif kimin adına hazırlansın?"}</h2>
                  <div className="sat-form">
                    <Alan
                      etiket="Ad"
                      deger={kisi.ad}
                      onDeger={(v) => setKisi((k) => ({ ...k, ad: v }))}
                      hata={dokundu && kisi.ad.trim() === "" ? "Adınızı yazın" : ""}
                      autoComplete="given-name"
                    />
                    <Alan
                      etiket="Soyad"
                      deger={kisi.soyad}
                      onDeger={(v) => setKisi((k) => ({ ...k, soyad: v }))}
                      hata={dokundu && kisi.soyad.trim() === "" ? "Soyadınızı yazın" : ""}
                      autoComplete="family-name"
                    />
                    <Alan
                      etiket="E-posta"
                      tip="email"
                      deger={kisi.eposta}
                      onDeger={(v) => setKisi((k) => ({ ...k, eposta: v }))}
                      hata={dokundu && !epostaGecerli ? "Geçerli bir e-posta adresi yazın" : ""}
                      autoComplete="email"
                      yardim={ozetM ? undefined : "Teklif ve ödeme bilgisi bu adrese gidecek."}
                    />
                    <Alan
                      etiket="Telefon"
                      tip="tel"
                      istege
                      deger={kisi.telefon}
                      onDeger={(v) => setKisi((k) => ({ ...k, telefon: v }))}
                      autoComplete="tel"
                    />
                  </div>
                  {ozetM ? (
                    /* KVKK aydınlatma satırı; metin /kvkk'de (taslak, onay bekliyor) */
                    <p className="sat-kvkk">
                      Bilgileriniz yalnızca kuruluş sürecinizi yürütmek için kullanılır. Devam ederek{" "}
                      <a href="/kvkk" target="_blank" rel="noopener">
                        kişisel verilerin korunması metnini
                      </a>{" "}
                      okuduğunuzu kabul etmiş olursunuz.
                    </p>
                  ) : (
                    <p className="sat-swap">
                      <b>SWAP</b> Alanların kesin listesi müşteriden bekleniyor (&quot;neler alacağımızı
                      teyit ederiz&quot;). Demo için ad · soyad · e-posta · telefon.
                    </p>
                  )}
                </section>
              )}

              {/* ================================================ 4 · TEKLİF */}
              {adim === 3 && ulke && (ozetM || (tier && sonuc)) && (
                <section aria-labelledby="sat-a3">
                  <h2 id="sat-a3" className="sat-soru sat-yazdirma-yok">{ozetM ? "Kurulum özetiniz" : "Teklifiniz hazır"}</h2>

                  <div className="sat-a4-alan">
                  <A4Sayfa kisa={ozetM}>
                  <article className="sat-belge" aria-label={`${ozetM ? "Özet" : "Teklif"} ${teklifNo}`}>
                    <header className="sat-belge-bas">
                      {/* eslint-disable-next-line @next/next/no-img-element -- yazdırmada da basılması için düz img */}
                      <img src="/ortac-logo.png" alt="Ortac Global" className="sat-belge-logo" />
                      <div className="sat-belge-kunye">
                        <p className="sat-belge-tur">{ozetM ? "Kurulum özeti" : "Hizmet teklifi"}</p>
                        <p>
                          <span>{ozetM ? "Özet no" : "Teklif no"}</span> <b>{teklifNo}</b>
                        </p>
                        <p>
                          <span>Tarih</span> <b>{bugun}</b>
                        </p>
                        <p>
                          <span>Geçerlilik</span> <b className="sat-swap-i">SWAP · teyit edilecek</b>
                        </p>
                      </div>
                    </header>

                    <div className="sat-belge-taraf">
                      <div>
                        <p className="sat-belge-k">{ozetM ? "Kimin adına" : "Teklif sahibi"}</p>
                        <p className="sat-belge-ad">
                          {kisi.ad} {kisi.soyad}
                        </p>
                        <p>{kisi.eposta}</p>
                        {kisi.telefon.trim() && <p>{kisi.telefon}</p>}
                      </div>
                      <div>
                        <p className="sat-belge-k">Hizmet</p>
                        <p className="sat-belge-ad">
                          <span className="sat-belge-bayrak" aria-hidden="true">
                            <Flag country={ulke} />
                          </span>
                          {COUNTRY_LABELS[ulke]} şirket kuruluşu
                        </p>
                        <p>{ozetM && ulke === "kktc" ? "Serbest Liman ve Bölge şirketi" : PRICING[ulke].license}</p>
                      </div>
                    </div>

                    {ozetM ? (
                      <table className="sat-belge-tablo">
                        <thead>
                          <tr>
                            <th scope="col">Kalem</th>
                            <th scope="col">Tutar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(ulke === "kktc" ? kktcSatirlar() : dubaiSatirlar(secim)).map((l) => (
                            <tr key={l.ad}>
                              <td>{l.ad}</td>
                              <td>{ulke === "kktc" ? euro(l.tutar) : money(l.tutar)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th scope="row">{ulke === "kktc" ? "Toplam" : "Toplam · KDV hariç"}</th>
                            <td>{ulke === "kktc" ? euro(kktcToplam()) : money(dubaiToplam(secim))}</td>
                          </tr>
                        </tfoot>
                      </table>
                    ) : tier && sonuc ? (
                      <>
                    <div className="sat-belge-paket">
                          <p className="sat-belge-k">{TIER_META[tier].name} paketinin kapsamı</p>
                          <ul>
                            {kapsam(tier).map((k, n) => (
                              <li key={k}>
                                <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                                {n === 0 ? `${k} · ${FACTS[ulke].days}` : k}
                              </li>
                            ))}
                          </ul>
                        </div>
    
                        <table className="sat-belge-tablo">
                          <thead>
                            <tr>
                              <th scope="col">Kalem</th>
                              <th scope="col">Tutar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sonuc.lines.map((l) => (
                              <tr key={l.label}>
                                <td>{l.label}</td>
                                <td>{money(l.amount)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th scope="row">Toplam</th>
                              <td>{money(sonuc.total)}</td>
                            </tr>
                          </tfoot>
                        </table>
    
                      </>
                    ) : null}

                    <p className="sat-belge-dip">{TEMSILI}</p>
                  </article>
                  </A4Sayfa>

                  {!ozetM && (
                  <div className="sat-teklif-eylem sat-yazdirma-yok">
                    <button type="button" className="btn btn-line btn-sm" onClick={() => window.print()}>
                      <Printer size={15} strokeWidth={2} aria-hidden="true" />
                      PDF olarak kaydet
                    </button>
                  </div>
                  )}
                  </div>
                </section>
              )}

              {/* ================================================= 5 · ÖDEME */}
              {adim === 4 && sonuc && (
                <section aria-labelledby="sat-a4">
                  <h2 id="sat-a4" className="sat-soru">Nasıl ödemek istersiniz?</h2>
                  <p className="sat-toplam-satir">
                    Teklif <b>{teklifNo}</b> · toplam <b>{money(sonuc.total)}</b>
                  </p>

                  <div className="sat-yontemler" role="radiogroup" aria-labelledby="sat-a4">
                    <label className="sat-yontem">
                      <input
                        type="radio"
                        name="sat-yontem"
                        checked={yontem === "kart"}
                        onChange={() => setYontem("kart")}
                      />
                      <span className="sat-yontem-ic" aria-hidden="true">
                        <CreditCard size={20} strokeWidth={1.9} />
                      </span>
                      <span className="sat-yontem-t">
                        <b>Kredi veya banka kartı</b>
                        <span>Stripe&apos;ın güvenli ödeme sayfasında</span>
                      </span>
                      <span className="sat-tik" aria-hidden="true">
                        <Check size={14} strokeWidth={2.6} />
                      </span>
                    </label>
                    <label className="sat-yontem">
                      <input
                        type="radio"
                        name="sat-yontem"
                        checked={yontem === "havale"}
                        onChange={() => setYontem("havale")}
                      />
                      <span className="sat-yontem-ic" aria-hidden="true">
                        <Banknote size={20} strokeWidth={1.9} />
                      </span>
                      <span className="sat-yontem-t">
                        <b>Havale / EFT</b>
                        <span>Referans kodu ile, ödeme otomatik eşleşir</span>
                      </span>
                      <span className="sat-tik" aria-hidden="true">
                        <Check size={14} strokeWidth={2.6} />
                      </span>
                    </label>
                  </div>

                  {yontem === "kart" && (
                    <div className="sat-yontem-d">
                      <p>
                        <ShieldCheck size={16} strokeWidth={1.9} aria-hidden="true" />
                        Kart bilgileriniz bu sitede alınmıyor; Stripe&apos;ın ödeme sayfasına
                        yönlendirilirsiniz ve ödeme onayı e-postanıza gelir.
                      </p>
                    </div>
                  )}
                  {yontem === "havale" && (
                    <div className="sat-yontem-d">
                      <dl className="sat-havale">
                        <div>
                          <dt>Referans kodu</dt>
                          <dd className="sat-kod">{teklifNo}</dd>
                        </div>
                        <div>
                          <dt>Alıcı</dt>
                          <dd className="sat-swap-i">SWAP · banka hesabı bilgisi bekleniyor</dd>
                        </div>
                        <div>
                          <dt>IBAN</dt>
                          <dd className="sat-swap-i">SWAP · bekleniyor</dd>
                        </div>
                        <div>
                          <dt>Tutar</dt>
                          <dd>{money(sonuc.total)}</dd>
                        </div>
                      </dl>
                      <p>
                        Havale açıklamasına yalnızca referans kodunu yazın. Ödemeniz ulaştığında
                        teklifinizle eşleşir ve size e-posta gelir.
                      </p>
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------ ALT */}
        {!bitti && (
          <footer className="sat-alt">
            {adim > 0 ? (
              <button type="button" className="btn btn-line btn-sm" onClick={geri}>
                <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
                Geri
              </button>
            ) : (
              <span />
            )}

            <div className="sat-alt-sag">
            <Yardim />

            {adim < 3 && (
              <button
                type="button"
                className="btn btn-sm sat-ana"
                onClick={ileri}
                aria-disabled={(!sunum && !devamOlur) || undefined}
                data-kapali={(!sunum && !devamOlur) || undefined}
              >
                Devam et
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </button>
            )}
            {adim === 3 && (
              <button type="button" className="btn btn-sm sat-ana" onClick={ileri}>
                {ozetM ? "Süreci başlatalım" : akis === "kabul" ? "Teklifi kabul ediyorum" : "Teklifi onayla, ödemeye geç"}
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </button>
            )}
            {adim === 4 && (
              <button
                type="button"
                className="btn btn-sm sat-ana"
                onClick={() => {
                  if (yontem) setBitti(true);
                  else if (sunum) {
                    setYontem("kart");
                    setBitti(true);
                  }
                }}
                aria-disabled={(!sunum && !yontem) || undefined}
                data-kapali={(!sunum && !yontem) || undefined}
              >
                {yontem === "havale" ? "Havale bilgilerini aldım" : "Ödemeye geç"}
                <span className="sat-demo">demo</span>
              </button>
            )}
            </div>
          </footer>
        )}
      </div>
    </dialog>
  );
}

/* --------------------------------------------------------------- A4 SAYFA
   Müşteri: "örnek pdf iyi duruyor, bunu aynı şekilde aynı ölçüde önizleme
   gösteriyorsun ya orda da aynı ölçü olsun … kare gibi bişi yapmışsın."

   ÖNİZLEME PDF'İN KENDİSİ. Belge ekranda da gerçek A4 ölçüsünde kuruluyor
   (210 × 297 mm, iç kenar 14 mm — lab-satis.css · .sat-a4) ve kabına sığsın
   diye yalnızca ÖLÇEKLENİYOR. Yazdırmada ölçek kalkıyor ve aynı öğe kâğıda
   basılıyor; yani önizleme ile PDF arasında yeniden dizilen tek bir satır yok.
   Önceki hâlde belge kabın genişliğini alan bir karttı ve oranı kaba göre
   değişiyordu — "kare gibi" görünmesinin sebebi buydu.

   Ölçek ResizeObserver ile: CSS'te "kap genişliği / 210mm" bölmesi (tipli
   calc) tarayıcılarda henüz güvenilir değil. Dış kabın yüksekliği de elle
   veriliyor, çünkü transform: scale kutunun akıştaki yerini küçültmüyor. */
/* `kisa` (07.10.2026): özet akışında sayfa A4 boyuna uzamıyor, içeriği
   kadar. Burak: "A4 yapınca alt kısım çok boş kalıyor … A4'ün yarısı gibi
   düşün, kocaman A4 göstermemize gerek yok." Genişlik ve tipografi aynı. */
function A4Sayfa({ children, kisa }: { children: React.ReactNode; kisa?: boolean }) {
  const kap = useRef<HTMLDivElement>(null);
  const sayfa = useRef<HTMLDivElement>(null);
  const [olcek, setOlcek] = useState(1);
  const [yukseklik, setYukseklik] = useState<number | undefined>(undefined);

  useEffect(() => {
    const k = kap.current;
    const s = sayfa.current;
    if (!k || !s) return;
    const olc = () => {
      const o = Math.min(1, k.clientWidth / s.offsetWidth);
      setOlcek(o);
      setYukseklik(s.offsetHeight * o);
    };
    const ro = new ResizeObserver(olc);
    ro.observe(k);
    ro.observe(s);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={kap} className="sat-a4-kap" style={{ height: yukseklik }}>
      <div
        ref={sayfa}
        className="sat-a4"
        data-kisa={kisa || undefined}
        style={{ "--sat-olcek": olcek } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ ALAN */

function Alan({
  etiket,
  deger,
  onDeger,
  tip = "text",
  hata = "",
  yardim,
  istege,
  autoComplete,
}: {
  etiket: string;
  deger: string;
  onDeger: (v: string) => void;
  tip?: string;
  hata?: string;
  yardim?: string;
  istege?: boolean;
  autoComplete?: string;
}) {
  const id = `sat-alan-${etiket.toLocaleLowerCase("tr-TR").replace(/[^a-zçğıöşü]/g, "")}`;
  return (
    <div className="sat-alan" data-hata={hata ? "" : undefined}>
      <label htmlFor={id}>
        {etiket}
        {istege && <span> · isteğe bağlı</span>}
      </label>
      <input
        id={id}
        type={tip}
        value={deger}
        autoComplete={autoComplete}
        aria-invalid={hata ? true : undefined}
        aria-describedby={hata || yardim ? `${id}-not` : undefined}
        onChange={(e) => onDeger(e.target.value)}
      />
      {(hata || yardim) && (
        <p id={`${id}-not`} className="sat-alan-not">
          {hata || yardim}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- YARDIM
   Her adımın alt şeridinde ve bitiş ekranında. Burak: "her aşamada takıldığın
   bir konu var mı gibisinden iletişime geçebilecekleri bir şey … WhatsApp'tan
   ulaşabilmeleri için bir numara vereceğiz. Şimdilik butonunu koyman yeterli."
   SWAP:WHATSAPP — numara gelince `https://wa.me/<numara>` bağlantısı olacak;
   demoda düğme hiçbir yere gitmiyor. Yeşil WhatsApp'ın kendi marka rengi. */
function Yardim() {
  return (
    <button type="button" className="sat-yardim" title="Demo: numara eklenecek">
      <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
      <span>
        Takıldınız mı? <b>WhatsApp&apos;tan yazın</b>
      </span>
    </button>
  );
}

/* ----------------------------------------------------------------- TAMAM
   Ödemeli akış: "Stripe'tan ödeme yapıldıktan sonra zaten kişiye mail gidiyor
   ya, oradan sonrası Murat abilerde … hesap açıp insanları içeri çekiyoruz."
   Ödemesiz akış (05.10.2026): teklif kabul edildi; ödeme burada alınmıyor,
   resmî ödeme bilgisi ve panel daveti e-postayla gidiyor. */
function Tamam({
  akis,
  yontem,
  teklifNo,
  eposta,
}: {
  akis: Akis;
  yontem: "kart" | "havale" | null;
  teklifNo: string;
  eposta: string;
}) {
  const kabul = akis === "kabul";
  if (akis === "ozet")
    return (
      <section className="sat-tamam" aria-labelledby="sat-tamam-t">
        <span className="sat-tamam-ic" aria-hidden="true">
          <Check size={26} strokeWidth={2.4} />
        </span>
        <h2 id="sat-tamam-t" className="sat-soru">
          Süreç başladı, müşteri paneline geçiyorsunuz
        </h2>
        <p>
          Özet <b>{teklifNo}</b>. Bir kopyası <b>{eposta}</b> adresine gönderildi. Devamı müşteri panelinde.
        </p>
        <ol className="sat-sonra">
          <li>
            <span>01</span>Panelde hesabınızı açarsınız.
          </li>
          <li>
            <span>02</span>Hizmet sözleşmesini panelde onaylarsınız.
          </li>
          <li>
            <span>03</span>Kimlik ve şirket belgelerini panelden yüklersiniz.
          </li>
          <li>
            <span>04</span>Ödeme ve kuruluş adımları aynı panelden ilerler.
          </li>
        </ol>
        {/* SWAP · panelin adresi gelince bu düğme oraya giden bir bağlantı
            olacak (gerçek akışta "Süreci başlatalım" doğrudan oraya götürür). */}
        <button type="button" className="btn btn-sm sat-ana">
          Müşteri paneline geç
          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          <span className="sat-demo">demo</span>
        </button>
        <Yardim />
        <p className="sat-demo-not">Demo: hiçbir bilgi bir yere gönderilmedi, panel bağlantısı henüz bağlı değil.</p>
      </section>
    );
  return (
    <section className="sat-tamam" aria-labelledby="sat-tamam-t">
      <span className="sat-tamam-ic" aria-hidden="true">
        <Check size={26} strokeWidth={2.4} />
      </span>
      <h2 id="sat-tamam-t" className="sat-soru">
        {kabul ? "Teşekkürler, teklifinizi kabul ettiniz" : yontem === "havale" ? "Havaleniz bekleniyor" : "Ödemeniz alındı"}
      </h2>
      {kabul ? (
        <p>
          Teklif <b>{teklifNo}</b>. Bilgilerinizi aldık; teklifin bir kopyası <b>{eposta}</b> adresine
          gönderildi.
        </p>
      ) : (
        <p>
          Teklif <b>{teklifNo}</b>.{" "}
          {yontem === "havale" ? "Ödemeniz hesabımıza ulaşıp eşleştiğinde" : "Ödeme onayı"} <b>{eposta}</b>{" "}
          adresine gelecek.
        </p>
      )}
      {kabul ? (
        <ol className="sat-sonra">
          <li>
            <span>01</span>Danışmanınız sizi arar, teklifi birlikte teyit edersiniz.
          </li>
          <li>
            <span>02</span>Ödeme bilgileri size e-postayla, resmî olarak iletilir. Burada ödeme alınmaz.
          </li>
          <li>
            <span>03</span>Müşteri paneli davetiniz gelir; belgelerinizi panelden yüklersiniz.
          </li>
          <li>
            <span>04</span>Kuruluş süreci aynı panelden adım adım ilerler.
          </li>
        </ol>
      ) : (
        <ol className="sat-sonra">
          <li>
            <span>01</span>Ekibimiz size müşteri paneli davetini gönderir.
          </li>
          <li>
            <span>02</span>Kimlik ve şirket belgelerini panel üzerinden iletirsiniz.
          </li>
          <li>
            <span>03</span>Kuruluş süreci aynı panelden adım adım ilerler.
          </li>
        </ol>
      )}
      <Yardim />
      <p className="sat-demo-not">
        {kabul
          ? "Demo: hiçbir bilgi bir yere gönderilmedi."
          : "Demo: hiçbir ödeme alınmadı, hiçbir bilgi bir yere gönderilmedi."}
      </p>
    </section>
  );
}

/* ================================================================ SAHNE
   Lab sayfasındaki iki akış, tek pencere. Fark yalnız `akis`: ödemeli (beş
   adım) ya da teklif ve kabul (dört adım, ödeme yok). */
export default function SatisAkisiDemo() {
  const [acik, setAcik] = useState(false);
  const [akis, setAkis] = useState<Akis>("ozet");
  const [oturum, setOturum] = useState(0);
  /* Varsayılan AÇIK: müşteri bu sayfayı kendi müşterisine sunacak. */
  const [sunum, setSunum] = useState(true);

  function ac(a: Akis) {
    setAkis(a);
    setOturum((n) => n + 1);
    setAcik(true);
  }

  return (
    <>
      <div className="sat-sunum">
        <label className="sat-sunum-l">
          <input type="checkbox" role="switch" checked={sunum} onChange={(e) => setSunum(e.target.checked)} />
          <span className="sat-anahtar" aria-hidden="true" />
          <span>
            <b>Sunum modu</b> · bilgi girmeden adımlar arasında geçiş; üstteki adımlara tıklanabilir
          </span>
        </label>
      </div>

      {/* 06.10.2026 · tek giriş: ödemesiz, son adım "Özet", sonra panel.
          Akış A (ödeme) ve B (kabul) lab'dan kalktı; kodları duruyor. */}
      <div className="sat-girisler">
        <div className="sat-giris">
          <p className="sat-giris-k">Kurulum akışı</p>
          <p className="sat-giris-t">Ülke, paket, bilgiler, özet</p>
          <p className="sat-giris-s">
            Burada ödeme yok. Özetten sonra &quot;Süreci başlatalım&quot; ile müşteri paneline geçilir; devamı orada.
          </p>
          <button type="button" className="btn btn-sm sat-ana" onClick={() => ac("ozet")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </button>
        </div>
      </div>

      <SatisPenceresi key={oturum} acik={acik} akis={akis} sunum={sunum} onKapat={() => setAcik(false)} />
    </>
  );
}
