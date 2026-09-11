"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import type { CeviriAnahtari, SicMotor } from "@/lib/tools/sic";

/* ============================================================================
   İNGİLTERE SIC KODU BULUCU
   ============================================================================

   Kural ve veri lib/tools/sic.ts'te; burada yalnızca arayüz var. Bu ayrım
   isim üretecindekiyle aynı gerekçeli: çeviri yardımının listesine bakıp
   ekleyip çıkarmak isteyen bileşeni açmak zorunda kalmıyor.

   ---------------------------------------------------------------------------
   VERİ SONRADAN GELİYOR — `import()` ve bunun ekrandaki üç sonucu

   731 kod küçültülmüş hâlde ~52 KB, gzip ~16 KB (ölçüm ve gerekçe sic.ts'in
   başında). Düz import edilseydi registry.tsx üzerinden beş araç sayfasının
   hepsine inerdi; o yüzden bileşen ilk çizimden sonra veriyi ayrı parça
   olarak istiyor. Ekrandaki karşılıkları:

     1) Sunucuda ve ilk karede sonuç yok, yalnız yönerge var. Sorgu da boş
        olduğu için bu bir kayıp değil; ilk tuşa basılana kadar parça çoktan
        gelmiş oluyor.
     2) Parça gelmeden çipe basan kısa bir an "Kod listesi yükleniyor…"
        görüyor; sonuç parça gelince kendiliğinden çıkıyor, tekrar basmak
        gerekmiyor (sorgu durumda bekliyor).
     3) Parça yüklenemezse (bağlantı koptu, yayın arası eski sayfa) sessiz
        kalmıyor: ne olduğunu söylüyor ve Companies House'un kendi listesine
        bağlantı veriyor.

   Tipler `import type` ile geliyor; o satır derlemede tamamen siliniyor,
   yani bu dosya sic.ts'ten tek bayt taşımıyor.

   ---------------------------------------------------------------------------
   KURALLAR NEREDEN — 11.09.2026'da resmî kaynaktan açılıp okundu

   Kutudaki üç kural ve dipteki iki not, aşağıdaki sayfaların bizzat
   okunmasıyla yazıldı. Doğrulanamayan hiçbir kural (ör. kod değişikliğinin
   ücreti, süresi) yazılmadı.

     · En az bir, en fazla dört kod — Companies House blogu, 12.10.2021
       ("you can select up to 4 SIC codes") ve 28.05.2026 ("You must provide
       at least one code, and you can select up to 4…").
     · Sonradan değişir, confirmation statement ile — aynı iki yazı ("If you
       need to update your SIC code, file a confirmation statement"; erken
       verilebildiği 2021 yazısında) + gov.uk "Filing your company's
       confirmation statement" (ek bilgi bölümünde SIC kodu; "at least once
       every year"; erken verince yeni bildirim tarihi seçiliyor).
     · Yalnız kısaltılmış listedeki kodlar — gov.uk yayın sayfası: "Only use
       SIC codes on the condensed list when filing to Companies House or your
       filing may be rejected." Kısaltmanın NE olduğu ise bizim ölçümümüz
       (sic.ts: ONS'nin en ayrıntılı basamağındaki 728 kodun hepsi listede,
       listede olmayan şey alt kırılımı olan sınıfların kendi kodu, ör. 56100).
     · 99999 / 74990 uyarısı — 28.05.2026 yazısı: "Using a dormant or
       non-trading code for an active company is one of the most common
       discrepancies we see."
     · UK SIC 2026 notu — ONS'nin UK SIC 2026 sayfası (03.08.2026 güncel)
       onu istatistikte kullanılan güncel sınıflama diye tanıtıyor; Companies
       House aynı 28.05.2026 yazısının altındaki bir soruya "A future SIC
       code framework is under active discussion between Companies House and
       ONS, but no final framework has yet been agreed or implemented" diye
       cevap vermiş. gov.uk yayın sayfası bugün hâlâ SIC 2007 kısaltılmış
       listesini istiyor.

   `rates.ts`'teki `confirmed: false` sözleşmesi burada devreye girmiyor:
   araç oran ya da eşik üretmiyor, kurallar da müşteri teyidine değil resmî
   kaynağa dayanıyor ve kaynak bağlantıları kutunun içinde duruyor.

   ---------------------------------------------------------------------------
   GÖRSEL DİL — TEK SATIR YENİ CSS YOK

   Hepsi araclar.css'teki hazır sınıflar:
     arama kutusu   .tl-field .tl-label .tl-input .tl-help
     hazır çipler   .tl-hazir .tl-hazir-k .tl-hazir-b (kurumlar vergisindeki kalıp)
     özet           .tl-out .tl-out-k .tl-out-empty .tl-sub (aria-live)
     sonuç listesi  .tl-cal .tl-cal-row .tl-cal-m — takvimin çerçeveli, zebra
                    satırlı listesi. Masaüstünde kod solda sabit sütunda,
                    tanım sağda; telefonda alt alta. Sonuç bir kod LİSTESİ ve
                    bu kalıp tam olarak "sol kısa etiket, sağ uzun metin".
     kopyala        .tl-name-dbtn — isim üretecinin satır içi sessiz düğmesi.
                    .tl-copy (dolu siyah hap) satır başına basılsaydı otuz
                    satırda otuz dolu düğme olurdu; asıl eylem kodun kendisi.
     tanım + bölüm  .tl-name-d ızgarası içinde .tl-tick-t (14 px metin) ve
                    .tl-sub (13 px gri)
     kurallar       .tl-ct .tl-ct-k .tl-ct-out — KDV aracının "kayıt eşiği" kutusu
     kaynaklar      .tl-hazir satırında .tl-name-dbtn bağlantıları. Metin içi
                    bağlantı için araclar.css'te hazır bir kural yok ve
                    .link-arrow marka mavisinde (beyaz üstünde 3,99:1, küçük
                    puntoda eşiğin altında); sessiz hap ikisini de aşıyor.
     uyarı          .tl-warn (kehribar çerçeve, dört kenar eşit — şerit değil)

   <select> YOK, hareket YOK (araclar.css karar 4), renk tek taşıyıcı değil.
   ========================================================================= */

/* Sık aranan iş türleri. Tip, çipin çeviri yardımında karşılığı olan bir
   anahtar olmasını zorunlu kılıyor: listede olmayan bir kelime yazılırsa
   `satisfies` derleme hatası veriyor, yani boş sonuç veren bir çip doğamıyor.
   Seçim durum.md'deki araç listesinin örneklerinden ve Ortac'ın üç ülkede
   kurduğu şirketlerin sık faaliyetlerinden; "holding" İngiltere'de grup
   yapısı kuranlar için. */
const HAZIR = [
  "yazılım",
  "e-ticaret",
  "danışmanlık",
  "dış ticaret",
  "emlak",
  "restoran",
  "lojistik",
  "holding",
] as const satisfies readonly CeviriAnahtari[];

/* Liste ilk açılışta otuz satır. "manufacture" gibi bir kelime 200'ü aşkın
   kod döndürüyor; hepsini birden basmak hem sayfayı uzatıyor hem aradığı
   satırı gömüyor. Kalanlar düğmeyle otuzar açılıyor. */
const SAYFA = 30;

const CH_LISTE = "https://resources.companieshouse.gov.uk/sic/";

const KAYNAKLAR = [
  {
    ad: "gov.uk · SIC listesi",
    href: "https://www.gov.uk/government/publications/standard-industrial-classification-of-economic-activities-sic",
  },
  {
    ad: "Companies House · kod seçimi",
    href: "https://companieshouse.blog.gov.uk/2026/05/28/keeping-your-standard-industrial-classification-sic-code-accurate/",
  },
  {
    ad: "gov.uk · confirmation statement",
    href: "https://www.gov.uk/guidance/confirmation-statement-guidance",
  },
];

type Kopya = { kod: string; ok: boolean };

export default function SicBulucu() {
  const uid = useId();
  const [sorgu, setSorgu] = useState("");
  const [motor, setMotor] = useState<SicMotor | null>(null);
  const [hata, setHata] = useState(false);
  const [goster, setGoster] = useState(SAYFA);
  const [kopya, setKopya] = useState<Kopya | null>(null);

  /* Veri parçası ilk çizimden sonra isteniyor (gerekçe dosya başında).
     `iptal`: sayfa parça gelmeden kapanırsa durum yazılmasın. */
  useEffect(() => {
    let iptal = false;
    import("@/lib/tools/sic")
      .then((m) => {
        if (!iptal) setMotor(m.SIC);
      })
      .catch(() => {
        if (!iptal) setHata(true);
      });
    return () => {
      iptal = true;
    };
  }, []);

  /* "Kopyalandı" iki buçuk saniye duruyor, sonra düğme eski hâline dönüyor.
     Başarısızlık DURUYOR: kişi kodu elle seçecek, mesaj kaybolmamalı. */
  useEffect(() => {
    if (!kopya?.ok) return;
    const t = setTimeout(() => setKopya(null), 2500);
    return () => clearTimeout(t);
  }, [kopya]);

  const ara = (v: string) => {
    setSorgu(v);
    setGoster(SAYFA);
  };

  const kopyala = async (kod: string) => {
    try {
      await navigator.clipboard.writeText(kod);
      setKopya({ kod, ok: true });
    } catch {
      setKopya({ kod, ok: false });
    }
  };

  /* Arama her çizimde yeniden koşuyor. Ölçüldü (Node, geliştirme makinesi,
     on sorgu × 200 tekrar): ilk arama tanım dizinini kurduğu için 5,8 ms,
     sonrakiler ortalama 0,32 ms. Telefonda on katı bile tek kareye sığıyor;
     useMemo ya da önbellek bir hata kaynağı eklemekten başka iş görmezdi. */
  const sonuc = motor && sorgu.trim() ? motor.ara(sorgu) : null;
  const satirlar = sonuc?.satirlar ?? [];
  const kalan = Math.max(0, satirlar.length - goster);
  const bulunamadi = sonuc !== null && (sonuc.kip === "metin" || sonuc.kip === "kod") && satirlar.length === 0;

  return (
    <div className="tl-app">
      {/* ------------------------------------------------------------ ARAMA */}
      <div className="tl-field">
        <label className="tl-label" htmlFor={`${uid}-q`}>
          Şirketiniz ne iş yapacak?{" "}
          <span className="tl-label-x">(Türkçe, İngilizce ya da kod numarası)</span>
        </label>
        <input
          id={`${uid}-q`}
          className="tl-input"
          type="search"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="ör. yazılım, restoran, 62012"
          value={sorgu}
          onChange={(e) => ara(e.target.value)}
          aria-describedby={`${uid}-help`}
        />

        {/* Hazır iş türleri. Düğme, bağlantı değil: sayfayı değiştirmiyor,
            yalnızca kutuyu dolduruyor. Seçili olan, kutuda aynen o yazdığı
            için işaretli; kişi kendi yazdığıyla çipten geleni ayırt ediyor. */}
        <div className="tl-hazir" role="group" aria-labelledby={`${uid}-hz`}>
          <span id={`${uid}-hz`} className="tl-hazir-k">
            Sık arananlar
          </span>
          {HAZIR.map((h) => (
            <button
              key={h}
              type="button"
              className="tl-hazir-b"
              data-on={sorgu === h ? "" : undefined}
              aria-pressed={sorgu === h}
              onClick={() => ara(h)}
            >
              {h}
            </button>
          ))}
        </div>

        <p id={`${uid}-help`} className="tl-help">
          Resmî tanımlar İngilizce. Sık iş türlerini Türkçe yazdığınızda küçük bir çeviri yardımı
          onları koda eşliyor; eşlenmeyen kelimeler İngilizce tanımların içinde aranıyor.
        </p>
      </div>

      {/* ------------------------------------------------------------ ÖZET
          Kutu boşken de DOM'da (araclar.css: aria-live bölgesi sonradan
          eklenirse ekran okuyucu ilk sonucu duyurmuyor). */}
      <div className="tl-out" role="status" aria-live="polite">
        {!sorgu.trim() ? (
          <p className="tl-out-empty">
            Şirketin ne iş yapacağını yazın ya da yukarıdaki iş türlerinden birini seçin. Kodun ilk
            rakamlarını biliyorsanız onlarla da arayabilirsiniz (ör. 62).
          </p>
        ) : hata ? (
          <p className="tl-out-empty">
            Kod listesi yüklenemedi. Sayfayı yenileyip tekrar deneyin; olmazsa aşağıdaki
            bağlantıdan Companies House&apos;un kendi listesine bakabilirsiniz.
          </p>
        ) : !motor || !sonuc ? (
          <p className="tl-out-empty">Kod listesi yükleniyor…</p>
        ) : sonuc.kip === "kisa" ? (
          <p className="tl-out-empty">En az iki harf ya da kodun ilk iki rakamını yazın.</p>
        ) : sonuc.kip === "uzun" ? (
          <p className="tl-out-empty">
            İngiltere&apos;deki SIC kodu beş hanelidir; yazdığınız sayı daha uzun. Türkiye&apos;de
            kullanılan altı haneli faaliyet kodu (NACE) bu listede yer almıyor.
          </p>
        ) : bulunamadi ? (
          <>
            <span className="tl-out-k">Eşleşen kod bulunamadı</span>
            <span className="tl-sub">
              {sonuc.kip === "kod"
                ? "Yazdığınız rakamlarla başlayan bir kod listede yok."
                : `Araç, Companies House listesindeki ${motor.toplam} kodun resmî İngilizce tanımlarında ve sık iş türleri için hazırladığımız küçük bir Türkçe çeviri yardımında arıyor; her kelimeyi tanımıyor.`}
            </span>
            <span className="tl-sub">
              İşin İngilizce karşılığıyla deneyin (ör. software, restaurant, consultancy), daha
              genel bir kelime yazın ya da kodun ilk iki rakamını girin. Yine bulamazsanız
              Companies House&apos;un listesine bakın ya da bize sorun.
            </span>
          </>
        ) : (
          <>
            <span className="tl-out-k">{satirlar.length} kod bulundu</span>
            {/* Sıranın NEDEN böyle olduğu yazıyla: çeviri yardımından gelenler
                başta, resmî tanımda geçenler sonra. Eşleşen anahtarların hepsi
                yazılıyor, yarı eşleşenler de ("yazılım" → "bulut yazılım");
                63110'un listede neden durduğunu o anahtar açıklıyor. */}
            <span className="tl-sub">
              {sonuc.kip === "kod"
                ? "Kodu yazdığınız rakamlarla başlayanlar, kod sırasıyla."
                : sonuc.ceviriSayisi === 0
                  ? "Resmî İngilizce tanımında aradığınız kelimeler geçen kodlar."
                  : `${sonuc.anahtarlar.map((a) => `"${a}"`).join(", ")} için çeviri yardımıyla eşlenen ${
                      satirlar.length > sonuc.ceviriSayisi
                        ? `${sonuc.ceviriSayisi} kod başta, ardından resmî İngilizce tanımında aradığınız kelime geçen ${satirlar.length - sonuc.ceviriSayisi} kod.`
                        : "kodlar."
                    }`}
            </span>
            {sonuc.notlar.map((n) => (
              <span key={n} className="tl-sub">
                {n}
              </span>
            ))}
          </>
        )}
      </div>

      {(bulunamadi || hata) && (
        <div className="tl-actions">
          <a className="tl-ghost" href={CH_LISTE} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} strokeWidth={2.1} aria-hidden="true" />
            Companies House listesi
            <span className="sr-only"> (yeni sekmede açılır)</span>
          </a>
          {!hata && (
            <SmartLink href="/iletisim" className="tl-ghost">
              Bize sorun
            </SmartLink>
          )}
        </div>
      )}

      {/* ----------------------------------------------------------- LİSTE */}
      {satirlar.length > 0 && (
        <>
          <ul className="tl-cal" aria-label="Eşleşen SIC kodları">
            {satirlar.slice(0, goster).map((s) => {
              const bu = kopya?.kod === s.kod ? kopya : null;
              return (
                <li key={s.kod} className="tl-cal-row">
                  <div className="tl-cal-m">
                    <b>{s.kod}</b>
                    {/* Ad aria-label'da: görünen kısa fiil ("Kopyala") tek başına
                        otuz satırda otuz aynı ad olurdu. Görünen metin adın
                        içinde geçiyor (etiket-adda kuralı). */}
                    <button
                      type="button"
                      className="tl-name-dbtn"
                      onClick={() => kopyala(s.kod)}
                      aria-label={
                        bu
                          ? bu.ok
                            ? `${s.kod} kopyalandı`
                            : `${s.kod} kopyalanamadı, pano kapalı`
                          : `${s.kod} kodunu kopyala`
                      }
                    >
                      {bu?.ok ? (
                        <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                      ) : (
                        <Copy size={13} strokeWidth={2.1} aria-hidden="true" />
                      )}
                      {bu ? (bu.ok ? "Kopyalandı" : "Pano kapalı") : "Kopyala"}
                    </button>
                  </div>
                  <div className="tl-name-d">
                    <span className="tl-tick-t">{s.tanim}</span>
                    <span className="tl-sub">
                      {s.bolum.harf} · {s.bolum.ad}
                    </span>
                    {s.ozel && (
                      <span className="tl-sub">
                        Companies House&apos;a özgü kod; ONS sınıflandırmasında yok.
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {kalan > 0 && (
            <div className="tl-actions">
              <button type="button" className="tl-ghost" onClick={() => setGoster((g) => g + SAYFA)}>
                Sonraki {Math.min(SAYFA, kalan)} kodu göster
              </button>
              <span className="tl-actions-s">{kalan} kod daha var.</span>
            </div>
          )}
        </>
      )}

      {/* Kopyalama sonucunun sesli karşılığı. Görünen karşılığı satırdaki
          düğmenin kendi metni; buradaki yalnız ekran okuyucu için. */}
      <p className="sr-only" role="status" aria-live="polite">
        {kopya
          ? kopya.ok
            ? `${kopya.kod} panoya kopyalandı.`
            : `Pano kullanılamadı; ${kopya.kod} kodunu elle seçip kopyalayın.`
          : ""}
      </p>

      {sonuc?.faaliyetsizVar && (
        <p className="tl-warn">
          <b>99999 (dormant, faaliyetsiz) ve 74990 (non-trading, ticari faaliyeti olmayan)</b>{" "}
          yalnız faaliyet göstermeyen şirketler içindir. Companies House, faal bir şirketin bu
          kodlarla kayıtlı olmasını en sık gördüğü uyumsuzluklardan biri olarak sayıyor.
        </p>
      )}

      {/* --------------------------------------------------------- KURALLAR
          Kaynakları dosya başında; her cümle o sayfalardan birine dayanıyor. */}
      <div className="tl-ct">
        <span className="tl-ct-k">Şirket kuruluşunda kod seçimi · Companies House kuralları</span>
        <p className="tl-ct-out">
          <b>En az bir, en fazla dört kod.</b> Şirket birden çok faaliyet yürütecekse dördüne kadar
          kod verilebiliyor.
        </p>
        <p className="tl-ct-out">
          <b>Kod sonradan değiştirilebilir.</b> Değişiklik, her şirketin yılda en az bir kez verdiği
          confirmation statement ile bildiriliyor; beklemek istemeyen şirket bu bildirimi erken de
          verebiliyor.
        </p>
        <p className="tl-ct-out">
          <b>Yalnız bu listedeki kodlar geçerli.</b> Companies House, ONS&apos;nin tam
          sınıflandırmasının kısaltılmış bir sürümünü kullanıyor ve listede olmayan kodla yapılan
          başvurunun reddedilebileceğini yazıyor. Kısaltma kod eksiltmiyor: en ayrıntılı
          basamaktaki kodların hepsi burada, alt kırılımı olan sınıfların kendi kodu (ör. 56100)
          yok. Üstüne Companies House&apos;a özgü üç kod ekleniyor: 74990, 98000 ve 99999.
        </p>
        <div className="tl-hazir">
          <span className="tl-hazir-k">Kaynak</span>
          {KAYNAKLAR.map((k) => (
            <a
              key={k.href}
              className="tl-name-dbtn"
              href={k.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={13} strokeWidth={2.1} aria-hidden="true" />
              {k.ad}
              <span className="sr-only"> (yeni sekmede açılır)</span>
            </a>
          ))}
        </div>
      </div>

      <p className="tl-note">
        <b>n.e.c.</b> &quot;not elsewhere classified&quot;, yani başka yerde sınıflandırılmamış demek:
        faaliyet daha özel bir koda uymadığında bu kodlar seçiliyor. Bölüm adlarının Türkçesi
        TÜİK&apos;in NACE Rev.2 terimleri; kod tanımları çevrilmedi, Companies House&apos;un listesinde
        yazıldığı gibi İngilizce.
      </p>
      <p className="tl-note">
        ONS, iş yerlerini sınıflandırmada artık UK SIC 2026&apos;yı güncel sınıflandırma olarak
        gösteriyor. Companies House ise yeni bir kod çerçevesinin ONS ile görüşüldüğünü ama henüz
        kararlaştırılmadığını söylüyor ve şirket kaydında bugün hâlâ bu SIC 2007 listesini istiyor.
      </p>
    </div>
  );
}
