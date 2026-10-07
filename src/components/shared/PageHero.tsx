"use client";

import SmartLink from "@/components/shared/SmartLink";
import {
  ArrowRight,
  ChevronRight,
  Info,
  Landmark,
  MapPin,
  type LucideIcon,
  BadgeCheck,
  Check,
  MonitorSmartphone,
  Percent,
  Timer,
  Wallet,
  Receipt,
  Fingerprint,
  ShieldCheck,
  FileCheck,
  Globe,
  Layers,
  Handshake,
} from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { FACTS, type CountrySlug } from "@/lib/brand";
import { gtm } from "@/lib/gtm";
import FotoGiris, { type FotoRozet } from "@/components/shared/FotoGiris";
import { BASLIK_FOTO, BASLIK_FOTO_VARSAYILAN, COUNTRY_PHOTO, HIZMET_FOTO } from "@/lib/media";
import { usePathname } from "next/navigation";
import { DUBAI_BASLANGIC, money } from "@/lib/dubaiFiyat";


/* ============================================================
   The scene — one 560x440 vector per country, drawn not shot.
   Same story everywhere: the licence card up top, the three
   things that hang off it below, the city it happens in behind.

   Dubai artık bunu kullanmıyor: o sayfada denenen yeni kart
   HeroDubaiCards.tsx'te. Sahne İngiltere ve KKTC'de aynen duruyor,
   çünkü yeni kart yalnızca Dubai'de deneniyor — oturursa diğer iki
   ülkeye de geçecek, o zamana kadar burası tek satır değişmiyor.
   ========================================================== */

/* card 104,44 → 456,188 · chips y 232..312 · horizon 352 · ground 440 */


/* ---- Dubai: the Khalifa cluster, the sail, the low harbour blocks ---- */



/* ============================================================
   PageHero — compact by default, a two column hero when the
   page tells it which country it is about.

   ÜÇÜNCÜ BİR DAL VAR: `art`. Ülkeye bağlı olmayan bir sayfa da iki sütunlu
   hero isteyebiliyor (ilk örneği /dubai/muhasebe) ama ülke dalındaki hiçbir
   şeyi kullanamıyor: güven satırları FACTS[country]'den, "Fiyatları Gör"
   çapası ülke sayfasının fiyat bölümünden, sağdaki kart da kuruluştan
   geliyor. O yüzden `country` genişletilmedi, yanına opt-in bir prop kondu.
   Ayrıntı propun kendi belgesinde.

   BU TURDA O DALA CTA VE GÜVEN SATIRI GELDİ (`cta` · `trust`). Müşteri:
   "muhasebe herosuna da dubai sayfasındaki gibi buton ve altına 2 tane öne
   çıkan şey koysana iconla."

   Dalın CTA'sız açılmasının gerekçesi ülke dalının verisine bağlı olmasıydı
   ("ikisi de FACTS[country] okuyor"); bağımlılık ortadan KALDIRILARAK
   karşılandı, kopyalanarak değil. İki yeni prop da içeriği ÇAĞIRAN SAYFADAN
   alıyor: adres, etiket, ikon ve iki cümle /dubai/muhasebe'nin kendi içerik
   dosyasında (lib/accountingDubai.ts · hero.cta, hero.trust). PageHero
   burada tek bir kelime ya da adres tutmuyor, yalnızca diziyor — ülke dalı
   FACTS'i okumaya bugünkü hâliyle devam ediyor.

   Görsel dil bilerek AYNI: aynı .phx-cta / .phx-trust sınıfları, aynı FadeUp
   gecikmeleri (0.34 · 0.42), aynı ikon ölçüsü. Yeni tek bir CSS kuralı
   yazılmadı — "dubai sayfasındaki gibi" istenen şey zaten tanımlıydı.
   ========================================================== */

export default function PageHero({
  crumb,
  title,
  accent,
  lead,
  country,
  bayrak,
  art,
  cta,
  price,
  trust,
  rozetler,
  belge,
}: {
  crumb: string;
  title: string;
  accent?: string;
  lead: string;
  /** verildiğinde başlık iki sütunlu hero'ya döner ve ülkeye ait sahne çizilir */
  country?: CountrySlug;
  /**
   * Kırıntı satırının başına konan küçük ülke bayrağı. `country` İLE AYNI ŞEY
   * DEĞİL ve bilerek ayrı: `country` verilince hero kompakt daldan çıkıp iki
   * sütunlu ülke hero'suna sapıyor (sahne, FACTS satırları, iki buton) ve
   * araç sayfası için o yanlış dal. Bu prop yalnızca KOMPAKT dalda okunuyor,
   * var olan iki dala dokunmuyor — `art` propunun belgesindeki kalıbın aynısı.
   *
   * 19.09.2026 · Burak: "tamam evet ben bayrağın işin içine girmesini
   * istiyorum ama burada ve bu şekilde değil." Bayrak araç gövdesindeki künye
   * satırındaydı ve orada ikinci bir başlıkla birlikte duruyordu; künye
   * kalkınca bayrağın yeri hero'nun kırıntı satırı oldu — sayfanın "burası
   * neresi" satırı zaten orası.
   */
  bayrak?: CountrySlug;
  /**
   * Hero'nun sağ sütununa konacak sahne. VERİLMEZSE HİÇBİR ŞEY DEĞİŞMİYOR —
   * bu prop yalnızca yeni bir dal AÇIYOR, var olan iki dala dokunmuyor:
   *
   *   country var            → bugünkü ülke hero'su (bu prop hiç okunmuyor)
   *   country yok, art yok   → bugünkü kompakt başlık bloğu, BİREBİR aynı
   *   country yok, art var   → iki sütunlu hero: solda kırıntı + h1 + giriş,
   *                            sağda verilen sahne
   *
   * Bu ayrım şart, çünkü PageHero sitedeki on dört sayfanın girişi ve
   * propsuz her çağrının çıktısı değişmemeli.
   *
   * SAHNE KENDİ KABINI TAŞIYOR. Buradan bir sarmalayıcı basılmıyor: sahnenin
   * paneli, kenarlığı, telefonda gizlenmesi ve ölçüsü onu veren sayfanın
   * kendi CSS'inde duruyor (ilk örnek: .svma-wrap · svc-muhasebe.css). Aksi
   * hâlde her yeni sahne için buraya bir ölçü kuralı daha girerdi.
   *
   * Üçüncü dal ülke dalının hiçbir parçasını KOPYALAMIYOR. Aynı görünen
   * CTA ve güven satırları ayrı iki propla geliyor (aşağıda) ve içeriklerini
   * ülke verisinden değil çağıran sayfadan alıyorlar.
   */
  art?: React.ReactNode;
  /**
   * Hero'nun tek eylem çağrısı. YALNIZCA `art` DALINDA OKUNUYOR — `country`
   * verilen çağrılarda hiç bakılmıyor, o dalın kendi iki butonu duruyor.
   * Verilmezse buton hiç basılmıyor, yani bugünkü art çağrıları etkilenmiyor.
   *
   * ADRESİ SAYFA SEÇİYOR ve CANLI OLDUĞUNU DOĞRULAMAK DA SAYFANIN İŞİ:
   * SmartLink kapalı bir adresi sönük <span> basar (lib/routes.ts · isLive)
   * ve hero'nun tek butonunun tıklanamaz çıkması burada sessizce olur.
   * İlk çağıran /dubai/muhasebe ve /basla'yı geçiyor — sitenin ana eylemi,
   * ülke hero'sunun birincil butonuyla aynı hedef.
   *
   * TEK BUTON, bilerek: ülke hero'sundaki ikinci buton ("Fiyatları Gör",
   * #fiyat) buraya alınmadı. Muhasebe sayfasında hero'nun hemen altındaki
   * #ozet künyesi zaten #fiyat'a inen bir satır taşıyor; ikinci bir buton
   * aynı çapayı iki kez basardı.
   */
  cta?: { label: string; href: string };
  /** FOTO GİRİŞ · sağdaki üç rozetin metni. Verilmezse `trust` satırları
   *  rozet olur. Tek başına verilirse (art ve country yokken) kompakt başlık
   *  yerine foto girişi açar: genel hizmet şablonu böyle kullanıyor. */
  rozetler?: string[];
  /** FOTO GİRİŞ · belge kartının adı ve çipi. Verilmezse kırıntıdan türer
   *  ("Dubai · Muhasebe" → ad "Muhasebe", çip "Dubai"). */
  belge?: { ad: string; cip: string };
  /**
   * Butonun YANINDAKİ fiyat kutusu. YALNIZCA `art` DALINDA OKUNUYOR ve
   * verilmezse hiçbir şey basılmıyor — bugünkü art çağrıları etkilenmiyor.
   *
   * 15.09.2026 · ilk çağıran /dubai/muhasebe (marketing listesi · madde 5:
   * "kullanıcı aşağı kadar inmeden fiyat konusunda fikir sahibi olsun").
   * Güven satırına yazılmadı: o blok 13,5 px gri ve dibe çıpalı, yani fiyat
   * orada "görünür" olmazdı. Butonla aynı satırda, butonla aynı yükseklikte
   * duruyor; ziyaretçi eylem ile bedeli aynı bakışta görüyor.
   *
   * KUTUNUN KENDİSİ BİR ÇAPA (`href`, sayfa içi). Tıklayınca fiyat listesine
   * iniyor — ülke hero'sundaki "Fiyatları Gör" düğmesinin işi, tutarı da
   * göstererek. Lenis kaydırmayı devraldığı için tıklama ülke dalındaki
   * onPriceClick ile aynı yoldan gidiyor.
   *
   * `amount`'taki "{usd}" gibi yer tutucuları çağıran sayfa dolduruyor; burada
   * yalnızca hazır metin basılıyor.
   */
  price?: { label: string; amount: string; href: string };
  /**
   * CTA'nın altındaki öne çıkan satırlar. YALNIZCA `art` DALINDA OKUNUYOR.
   *
   * İKON NEDEN NODE, AD DEĞİL: bu bileşen istemci bileşeni, çağıran sayfalar
   * sunucu bileşeni. Bir lucide bileşenini (fonksiyon referansı) prop olarak
   * geçirmek sınırı geçemez; hazır bir React düğümü geçer (sunucuda çizilip
   * öyle gelir — `art` propu da tam olarak böyle çalışıyor). İkinci bir
   * "ikon adı → bileşen" kaydı da böylece açılmıyor: sayfa zaten kendi
   * eşlemesine sahip.
   *
   * Ölçü/renk buradan dayatılmıyor; .phx-trust svg kuralı rengi ve hizayı
   * veriyor, çağıran sayfa ülke hero'sundaki ölçüyü kullanıyor (15 · 2).
   */
  trust?: { icon: React.ReactNode; line: string }[];
  /**
   * Hero'nun siyah zemini.
   *
   * VARSAYILAN ARTIK "yildiz" — VE BU BÜTÜN SAYFALARI KAPSIYOR.
   * Müşteri denemeyi önce ana sayfada onayladı ("arkayı yıldızlama işi
   * hoşuma gitti beğendim ben"), sonra şirket kuruluşu sayfasında gördü ve
   * turu kapattı: "şu herolarda yıldızlı muhabbeti tüm sayfalara
   * taşıyabilirsin okeyiz biz ona." PageHero basan on dokuz sayfanın hepsi
   * artık gökyüzü zeminiyle açılıyor ve hiçbir çağrının propu geçmesine
   * gerek yok — /ulke/[slug]'daki açık `backdrop="yildiz"` da bu turda
   * kaldırıldı, çünkü varsayılanı tekrar etmek "burada bir istisna var"
   * diye okunuyordu.
   *
   * "grid" KAÇIŞ KAPISI OLARAK DURUYOR, SİLİNMEDİ: ızgara zemini bir tur
   * boyunca canlıydı ve geri istenirse tek kelimeyle dönülüyor. Kuralları
   * css/pagehero-grid.css'te ölçülmüş hâliyle bekliyor.
   *
   * "plain" ikinci kaçış kapısı: bir sayfada zemin içerikle çakışırsa tek
   * kelimeyle tamamen kapatılabilsin. Bugün hiçbir çağrı geçmiyor.
   *
   * IZGARA SİLİNMEDİ, KAPANDI. Izgara kipinde .phg-grid `display: none`;
   * `opacity: 0` DEĞİL, çünkü display'i kapatılan öge animasyon da
   * çalıştırmıyor. Görünmez ama dönen bir ızgara 60 s'lik periyodunu
   * getAnimations listesinde tutar ve tuzak K'nın asallık taramasını
   * kirletirdi. Glow İKİ KİPTE DE AÇIK: müşterinin itirazı ızgarayaydı
   * ("grid çok teknoloji şirketi gibi kalabilir"), ışığa değil — ana sayfa
   * hero'sunda da glow (hscBreathe) aynen kalmıştı.
   *
   * Stiller: yıldız src/app/css/pagehero-yildiz.css (.phy-), ızgara
   * src/app/css/pagehero-grid.css (.phg-). Kalibrasyon TEK BİR SAYFAYA değil
   * SAYFA TİPİNE bağlı ve bu artık her iki zeminde de geçerli: kompakt hero
   * (country ve art yok) 416-504px, split hero (.ph-split) 818px ve split
   * olanın sağında kart var. İki tipin değerleri o dosyalarda ayrı
   * bloklarda, ölçülmüş gerekçeleriyle duruyor — buradaki üç dönüş yolundan
   * hangisinin .ph-split bastığı oradaki ayrımın tek girdisi.
   */
}) {
  const lenis = useLenis();
  const yol = usePathname() ?? "";

  /* Katman saf CSS: her karede JS yok, sunucuda da aynı biçimde basılıyor
     (rastgelelik yok, hidrasyon farkı yok). Sıra önemli — ızgara altta,
     glow onun üstünde; ikisi de içerikten önce, .phg z-index'iyle arkada. */
  /* `.phg` sınıfı İKİ KİPTE DE basılıyor: .phg-bg'nin maskesini, kırpmasını
     ve glow'un bütün ölçülerini taşıyan --phg-* değişkenleri orada. Yıldız
     kipinde yalnız çocuklar değişiyor, kap değil — o yüzden kapı `=== "grid"`
     değil `!== "plain"`.

     KATMAN SIRASI · gök en altta, glow onun üstünde, ikisi de içerikten önce.
     Kayan yıldızlar metnin ARKASINDAN geçiyor (.phg-bg z-index 0), yani
     okunurluğa dokunmuyorlar — kapanış CTA'sında kabul edilmiş davranış.

     Sıra `-b` sonra `-a`: uzak katman altta. Ölçüler ve periyotlar
     css/pagehero-yildiz.css'te. */

  const [head, tail] = accent && title.endsWith(accent)
    ? [title.slice(0, -accent.length), accent]
    : [title, ""];

  const crumbNav = (
    <nav className="ph-crumb" aria-label="Konum">
      <SmartLink href="/">Ana sayfa</SmartLink>
      <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
      <span className="ph-crumb-son">
        {/* Bayrak yalnız kompakt dalda anlamlı ve yalnız `bayrak` verilirse
            basılıyor. Kabı SABİT PİKSEL: <Flag> çıplak viewBox basıyor ve
            kapsız bırakılırsa 300x150'ye şişiyor (tuzaklar.md · tuzak H). */}
        {bayrak && (
          <span className="ph-bayrak" aria-hidden="true">
            <Flag country={bayrak} />
          </span>
        )}
        {crumb}
      </span>
    </nav>
  );

  /* default: the compact header every other inner page already uses */
  if (!country && !art && !rozetler) {
    /* 07.10.2026 · ZEMİN FOTOĞRAF. Başlığın boyutu, yazısı ve boşlukları
       aynı; siyah zeminin (ve yıldızlı katmanın) yerine sayfa türünün
       fotoğrafı ve üstünde soldan sağa açılan perde geldi (globals.css ·
       .ph-foto). Fotoğraf adresin başına göre seçiliyor (lib/media.ts ·
       BASLIK_FOTO). Karar yolu orada. */
    const foto = BASLIK_FOTO.find((b) => b.on.some((o) => yol === o || yol.startsWith(`${o}/`)))?.foto ?? BASLIK_FOTO_VARSAYILAN;
    return (
      <section className="ph ph-foto" style={{ "--ph-foto": `url(${foto})` } as React.CSSProperties}>
        <div className="container-o">
          {crumbNav}
          <h1 className="ph-title">
            {head}
            {tail && <span>{tail}</span>}
          </h1>
          <p className="ph-lead">{lead}</p>
        </div>
      </section>
    );
  }

  /* ====================================================== FOTO GİRİŞ
     07.10.2026 · ÜLKE VE HİZMET SAYFALARININ GİRİŞİ DEĞİŞTİ. Siyah zeminli
     iki sütunlu giriş (solda yazı, sağda sahne kartı) yerine Dubai'de
     seçilen foto giriş (shared/FotoGiris.tsx; karar yolu orada ve
     docs/durum.md'de). Burak: "bunu böyle seçtiysen şimdi git diğer
     sayfalara da yap … siyah olan hero'lar var ya, onları al çek buna."
     Sayfalar eskisi gibi PageHero çağırıyor; `art` olarak geçilen sahne
     kartları artık BASILMIYOR (prop yalnız "bu sayfa iki sütunlu" demek).
     Eski iki dal (ülkesiz split · ülke, siyah zemin ve sahne kartları)
     silindi; git geçmişinde duruyor (07.10.2026 öncesi).

     Ülke rozetleri teyitli olgulardan: Dubai (teklif PDF'i, teyit · Dubai
     kuruluş 1 ve 3), İngiltere (FACTS.days; countryContent · "tamamı
     dijital"; yapı), KKTC (teyit · KKTC 12 "TL hesap", Serbest Liman,
     FACTS.forWhom). Hizmet sayfalarında rozetler sayfanın kendi güven
     satırları ya da kapsam maddeleri. */
  {
    const ic = (I: LucideIcon) => <I size={18} strokeWidth={2} />;
    const ULKE: Record<CountrySlug, { belge: { ad: string; cip: string }; rozetler: FotoRozet[] }> = {
      dubai: {
        belge: { ad: "Ticaret lisansı", cip: "Serbest bölge" },
        rozetler: [
          { icon: ic(BadgeCheck), metin: <><b>%100</b> yabancı sahiplik</> },
          { icon: ic(Timer), metin: <><b>5-6 günde</b> kuruluş</> },
          { icon: ic(Percent), ton: "amber", metin: <>375.000 AED&apos;ye kadar <b>%0</b></> },
        ],
      },
      ingiltere: {
        belge: { ad: "Kuruluş belgesi", cip: "Limited" },
        rozetler: [
          { icon: ic(Timer), metin: <><b>3-7 günde</b> kuruluş</> },
          { icon: ic(MonitorSmartphone), metin: <>Tamamı <b>dijital</b></> },
          { icon: ic(Landmark), metin: <><b>Companies House</b> tescili</> },
        ],
      },
      /* KKTC teklif belgesi (07.10.2026): KKTC dışı müşteriden kazançta
         kurumlar vergisi %0 (madde 4), 30-40 iş günü (madde 2) */
      kktc: {
        belge: { ad: "Tescil belgesi", cip: "Serbest Liman ve Bölge" },
        rozetler: [
          { icon: ic(Percent), ton: "amber", metin: <>KKTC dışı kazançta <b>%0</b></> },
          { icon: ic(Timer), metin: <><b>30-40 iş gününde</b> kuruluş</> },
          { icon: ic(Wallet), metin: <><b>TL hesap</b> açılabiliyor</> },
        ],
      },
    };
    const kaydir = (hedef: string) => (e: React.MouseEvent) => {
      const target = document.getElementById(hedef.replace(/^#/, ""));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.1 });
      else target.scrollIntoView({ behavior: "smooth" });
    };

    if (country) {
      const u = ULKE[country];
      return (
        <FotoGiris
          iz={crumb}
          baslik={title}
          vurgu={accent}
          lead={lead}
          foto={COUNTRY_PHOTO[country]}
          belge={u.belge}
          rozetler={u.rozetler}
          fiyat={
            country === "dubai" ? (
              <>
                <b>{money(DUBAI_BASLANGIC)}</b>&apos;den başlayan fiyatlarla
              </>
            ) : undefined
          }
          dugmeler={
            <>
              <SmartLink
                href="/basla"
                className="dhr-btn dhr-btn-mavi"
                onClick={() => gtm("cta_start_click", { placement: "page_hero", country })}
              >
                Hemen Başla
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
              <a
                href="#fiyat"
                className="dhr-btn dhr-btn-cizgi"
                onClick={(e) => {
                  gtm("cta_pricing_click", { placement: "page_hero", country });
                  kaydir("#fiyat")(e);
                }}
              >
                Fiyatları Gör
              </a>
            </>
          }
          guven={[
            { icon: <MapPin size={15} strokeWidth={2} aria-hidden="true" />, line: "Kendi ofisimizden, Türkçe yürütülür." },
            { icon: <Info size={15} strokeWidth={2} aria-hidden="true" />, line: FACTS[country].limit },
          ]}
        />
      );
    }

    /* hizmet sayfası: kırıntı "Dubai · Muhasebe" biçiminde */
    const parca = crumb.split(" · ");
    const ulkeAdi = parca[0] ?? "";
    const fotoUlke: CountrySlug = /ngiltere/.test(ulkeAdi) ? "ingiltere" : /KKTC/.test(ulkeAdi) ? "kktc" : "dubai";
    /* fotoğraf: hizmetin kendi karesi (lib/media.ts · HIZMET_FOTO; kırıntının
       son parçasında aranıyor), yoksa ülkenin fotoğrafı */
    const hizmetFoto = HIZMET_FOTO.find((h) => h.ara.test(parca.slice(1).join(" ")))?.foto;
    /* Rozet ikonu: sayfanın güven satırları kendi ikonuyla geliyor; yalnız
       metin olarak gelen rozetlerde (genel hizmet şablonu) ikon metindeki
       konuya göre seçiliyor. Hepsine onay işareti koymak ilk hâliydi;
       Burak: "ikisine de tik atmışsın … onlara da ikon koy, mantıklı olsun." */
    const rozetIkon = (m: string): LucideIcon =>
      /KDV/i.test(m) ? Receipt
      : /vergi|beyan/i.test(m) ? Percent
      : /faydalanıcı|UBO|PSC/i.test(m) ? Fingerprint
      : /AML|uyum|mevzuat/i.test(m) ? ShieldCheck
      : /goAML|kayıt/i.test(m) ? FileCheck
      : /pazar/i.test(m) ? Globe
      : /yapılandırma|yapı/i.test(m) ? Layers
      : /danışman|plan/i.test(m) ? Handshake
      : /Companies House/i.test(m) ? Landmark
      : Check;
    return (
      <FotoGiris
        iz={crumb}
        baslik={title}
        /* vurgu verilmemişse ilk kelimeden ("Dubai'de") sonrası mavi */
        vurgu={accent ?? title.replace(/^\S+\s+/, "")}
        lead={lead}
        foto={hizmetFoto ?? COUNTRY_PHOTO[fotoUlke]}
        belge={belge ?? { ad: parca[parca.length - 1] ?? crumb, cip: parca.length > 1 ? ulkeAdi : "Ortac" }}
        rozetler={
          rozetler
            ? rozetler.slice(0, 3).map((m) => ({ icon: ic(rozetIkon(m)), metin: m.replace(/\.$/, "") }))
            : (trust ?? []).slice(0, 3).map((t) => ({ icon: t.icon, metin: t.line.replace(/\.$/, "") }))
        }
        dugmeler={
          cta ? (
            <>
              <SmartLink
                href={cta.href}
                className="dhr-btn dhr-btn-mavi"
                onClick={() => gtm("cta_start_click", { placement: "page_hero", page: crumb })}
              >
                {cta.label}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
              {price && (
                <a
                  href={price.href}
                  className="dhr-btn dhr-btn-cizgi"
                  onClick={(e) => {
                    gtm("cta_pricing_click", { placement: "page_hero", page: crumb });
                    kaydir(price.href)(e);
                  }}
                >
                  <b>{price.amount}</b>
                  {price.label}
                </a>
              )}
            </>
          ) : undefined
        }
        /* rozetler ayrıca verilmişse güven satırları solda da durur; rozet
           olarak kullanıldıysa ikinci kez basılmaz */
        guven={rozetler ? trust : undefined}
      />
    );
  }
}
