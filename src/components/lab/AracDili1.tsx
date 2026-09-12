"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import {
  CalendarDays,
  CalendarRange,
  Coins,
  Equal,
  Globe,
  Layers,
  Scale,
  Wallet,
} from "lucide-react";
import {
  BayrakDisk,
  Derin,
  DerinListe,
  Halka,
  IkonDisk,
  Kaynak,
  Kural,
  PayCubugu,
  Sayac,
  Secenek,
  Secenekler,
  UlkeYolu,
} from "@/components/tools/ToolShell";
import { COUNTRY_NAME, COUNTRY_ORDER, type CountrySlug } from "@/lib/brand";
import { kvHref } from "@/lib/tools/catalog";
import { ESTIMATE_NOTE, UAE_CT, UK_CT, needsConfirm, ruleOf } from "@/lib/tools/rates";
import { formatAmount, parseAmount } from "@/lib/tools/num";

/* ============================================================================
   ADAY A1 · ÖLÇÜ — kurumlar vergisi (Dubai) tek sütunda
   ============================================================================

   TEZ. Bir hesaplayıcının işi tek bir sayı üretmek. O yüzden sayfa tek akış:
   ülke → dönem → tutar → SONUÇ. Sonuç sağda duran ayrı bir panelde değil,
   akışın DÖRDÜNCÜ ADIMI ve en ağır ögesi. Koyu yüzey yalnız orada ve tek bir
   BANT hâlinde; sayfanın sağında sürekli duran bir kolon yok.

   Uygunluk testine paralellik burada şu kadar: adımlar numaralı ve ikonlu,
   seçimler kart/çip, bayrak görünür, kontrast güçlü. Kopyalanan şey iki
   panelli kurgu DEĞİL, o kurgunun işaret dili.

   ÖLÇÜ (adın sebebi de bu). Sütun 758 px: uygunluk testinin soru sütunuyla
   (.uyg-ask) ve kabul edilen kartın çalışma paneliyle (.ta-is) BİREBİR aynı
   genişlik. Yani satır uzunlukları yeniden icat edilmedi; müşterinin
   beğendiği ekranda zaten çalışan ölçü alındı, yanındaki gece kolon kaldı.
   1440 px'te container-o'nun kullanılabilir 1136 px'inin %67'si dolu;
   kenarlarda kalan 189+189 px sayfa kenar boşluğu gibi okunuyor, "bir şey
   silinmiş" gibi değil — çünkü sütun ORTALANMIŞ, sola yaslı değil.

   DİSKLER 44 px ve dikey bir ray oluşturuyor (ray 1 px, disklerin arkasında).
   Adım içeriği rayın sağından, 56 px'ten başlıyor: göz yukarıdan aşağı tek
   bir hat izliyor. Kabul edilen tasarımda aynı fikir 36+12=48 px'lik bir
   girintiyle vardı; burada disk 44'e çıktı çünkü ray artık gerçekten çizili.

   DİNAMİZM ÜÇ YERDE
     · rakam sayarak değişiyor (Sayac) — bandın büyük sayısı VE dökümün iki
       satırı, yani "sonuç değişti" bir tek yerde değil üç yerde görünüyor;
     · halka ve pay çubuğu geçişle doluyor (araclar.css'in kendi kuralları);
     · bandın üstünden değer değişiminde bir kez ışık akıyor (.ad1-isik,
       React anahtarı `tetik` ile tetikleniyor, JS zamanlayıcı yok).
   Sürekli olan tek hareket aktarım zinciri: ışık tutar diskinden başlayıp
   rayı izleyerek "=" diskine, halkaya ve dökümün toplam satırına gidiyor.
   Periyot 11.317 s (asal ms, 10007-12999 bandından; katsızlık raporda).

   HESAP MANTIĞI DEĞİŞMEDİ. baeHesap aşağıda KurumlarVergisi.tsx'ten satır
   satır aynı (oradaki fonksiyon dışa açılmadığı için kopyalandı, lab dosyası
   canlı dosyaya dokunmasın diye). Oranlar, eşik, kural cümlesi ve kaynak
   çipi aynı veriden: rates.ts + countryContent. Bu bir DÜZEN denemesi.

   ÜLKE BAĞLANTILARI GERÇEK ADRESLER (kvHref). Lab'de tıklanınca sayfadan
   çıkılıyor; bilerek böyle, çünkü "içerden ülkeye göre ayrılsın ve link
   değişsin" kurgusuna dokunmamak bu turun kuralı. Lab'de basılan dal Dubai.
   ========================================================================= */

const DONEMLER = [
  { key: "yillik", label: "Yıllık", hint: "Bir mali yılın tamamı" },
  { key: "aylik", label: "Aylık", hint: "12 ile çarpılıp yıllığa çevrilir" },
] as const;
type Donem = (typeof DONEMLER)[number]["key"];

const DONEM_IKON: Record<Donem, ReactNode> = {
  yillik: <CalendarRange size={20} strokeWidth={1.9} />,
  aylik: <CalendarDays size={20} strokeWidth={1.9} />,
};

/* Hazır tutarlar ve örnek açılış değeri KurumlarVergisi.tsx'in Dubai
   satırlarıyla aynı: yıllık dizinin ortası eşiğin kendisi, aylık dizideki
   karşılığı eşiğin tam on ikide biri (375.000 / 12 = 31.250, kesirsiz). */
const HAZIR: Record<Donem, number[]> = {
  yillik: [250_000, UAE_CT.threshold.value, 500_000, 1_000_000, 2_000_000],
  aylik: [20_000, UAE_CT.threshold.value / 12, 50_000, 100_000, 200_000],
};
const ORNEK = "500.000";

const ULKE_IPUCU: Record<CountrySlug, string> = {
  dubai: `${UAE_CT.currency} · ${UAE_CT.lower.label} ve ${UAE_CT.upper.label}, iki dilim`,
  ingiltere: `${UK_CT.currency} · ${UK_CT.small.label} ile ${UK_CT.main.label} arası`,
  kktc: "Oran yayımlanmıyor",
};
const ULKE_YOLU = COUNTRY_ORDER.map((c) => ({ ulke: c, href: kvHref(c), ipucu: ULKE_IPUCU[c] }));

const BAE_KURAL = ruleOf(UAE_CT.upper);
const BAE_TEYIT = needsConfirm(UAE_CT.lower, UAE_CT.upper, UAE_CT.threshold);

const pad = (n: number) => String(n).padStart(2, "0");

/** KurumlarVergisi.tsx · baeHesap ile aynı üç satır. Eşiğe kadarki kısım her
 *  zaman düşük oranla, yalnızca AŞAN kısım yüksek oranla. */
function baeHesap(profit: number) {
  const lowerBase = Math.min(profit, UAE_CT.threshold.value);
  const upperBase = Math.max(0, profit - UAE_CT.threshold.value);
  const tax = lowerBase * UAE_CT.lower.value + upperBase * UAE_CT.upper.value;
  const effective = profit > 0 ? tax / profit : 0;
  return { lowerBase, upperBase, tax, effective };
}

/* ============================================================== GİRİŞ ==== */

export default function AracDili1() {
  const uid = useId();
  const [donem, setDonem] = useState<Donem>("yillik");
  const [value, setValue] = useState<string>(ORNEK);

  const girilen = parseAmount(value);
  const kat = donem === "aylik" ? 12 : 1;
  /* Hesabın tamamı YILLIK kazanç üzerinden; dönem yalnızca girdiyi çeviriyor. */
  const profit = girilen === null ? null : girilen * kat;
  const okunamadi = value.trim() !== "" && girilen === null;
  const ornekte = value === ORNEK;
  const cur = UAE_CT.currency;

  const r = profit === null ? null : baeHesap(profit);
  /* Dolu adım sayısı: ülke (sayfanın kendisi) ve dönem (varsayılanı var) hep
     dolu, tutar okunabiliyorsa üçüncü. */
  const dolu = 2 + (profit !== null ? 1 : 0);

  return (
    <section className="sec-pad ad1-sec">
      <div className="container-o">
        <div className="ad1-app akt">
          {/* KÜNYE — kabul edilen kartın künyesiyle aynı bilgi ve aynı hiza
              kuralı: bayrak künyenin süsü değil kendisi ("hangi ülke, hangi
              para birimi"). Sağda dolu adım sayacı. */}
          <div className="ad1-kunye">
            <p className="ad1-kunye-t">
              Kurumlar vergisi
              <span className="ad1-kunye-s">
                <BayrakDisk ulke="dubai" boy="xs" />
                {COUNTRY_NAME.dubai} · {cur}
              </span>
            </p>
            <span className="ad1-sayim" aria-hidden="true">
              <b>{pad(dolu)}</b> / 03
            </span>
          </div>
          <div className="ad1-cizgi" aria-hidden="true">
            {/* Oran birimsiz özel değişkenle; birim CSS'te (tuzak J). */}
            <span className="ad1-cizgi-i" style={{ "--ad1-w": dolu / 3 } as CSSProperties} />
          </div>

          <div className="ad1-akis">
            <Adim1
              no={1}
              ikon={<Globe size={20} strokeWidth={1.9} />}
              baslik="Ülke"
              ipucu="Ülke değişince sayfa, para birimi ve kural da değişir."
            >
              <UlkeYolu aktif="dubai" secenekler={ULKE_YOLU} />
            </Adim1>

            <Adim1
              no={2}
              ikon={<CalendarRange size={20} strokeWidth={1.9} />}
              baslik="Kazanç dönemi"
            >
              <Secenekler>
                {DONEMLER.map((d) => (
                  <Secenek
                    key={d.key}
                    ad={`${uid}-donem`}
                    secili={d.key === donem}
                    onSec={() => setDonem(d.key)}
                    disk={DONEM_IKON[d.key]}
                    baslik={d.label}
                    ipucu={d.hint}
                  />
                ))}
              </Secenekler>
            </Adim1>

            <Adim1
              no={3}
              akt
              ikon={<Coins size={20} strokeWidth={1.9} />}
              etiketIcin={`${uid}-tutar`}
              baslik={
                /* Boşluk parantezli kuyruğun İÇİNDE: dışarıda bir boşluk
                   metni olarak durunca erişilebilir ad "kazanç(AED)" diye
                   bitişik okunuyor (kabul edilen kartta ölçülmüştü). */
                <>
                  {donem === "aylik" ? "Aylık" : "Yıllık"} vergiye tabi kazanç
                  <span className="ta-adim-x">{` (${cur})`}</span>
                </>
              }
            >
              {/* type="number" değil: tarayıcının yerel ayrım işareti
                  davranışı Türkçe binlik noktasıyla çakışıyor. */}
              <div className="ta-tutar" data-hata={okunamadi ? "" : undefined}>
                <input
                  id={`${uid}-tutar`}
                  className="ta-girdi ad1-girdi"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={ORNEK}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  aria-describedby={`${uid}-yardim`}
                  aria-invalid={okunamadi || undefined}
                />
                <span className="ta-birim" aria-hidden="true">
                  {cur}
                </span>
              </div>

              <div className="ta-hazir">
                <span className="ta-hazir-k">Hazır tutarlar</span>
                {HAZIR[donem].map((h) => (
                  <button
                    key={h}
                    type="button"
                    className="ta-hazir-b"
                    data-on={girilen === h ? "" : undefined}
                    onClick={() => setValue(formatAmount(h))}
                  >
                    {formatAmount(h)}
                  </button>
                ))}
              </div>

              <p id={`${uid}-yardim`} className="ta-yardim">
                {ornekte && <b>Kutudaki tutar bir örnek. </b>}
                Ciro değil, vergiye tabi kazanç. Binlik ayracı nokta, ondalık virgül.
              </p>
            </Adim1>

            {/* DÖRDÜNCÜ ADIM = SONUÇ. Numarası yok, işareti "=" — akış bir
                işlem, sonuç da o işlemin alt satırı. Disk gece tonda: bandın
                rengini adımın kendisi haber veriyor. */}
            <Adim1
              esit
              gece
              akt
              ikon={<Equal size={20} strokeWidth={1.9} />}
              baslik="Sonuç"
              ipucu="Hesap girdiğiniz tutar değiştikçe yeniden yapılıyor."
            >
              <div className="ad1-sonuc" role="status" aria-live="polite">
                {/* TEK GECE YÜZEY: bir bant. İçinde sayı, para birimi ve
                    efektif oranın halkası; altında kazancın iki dilimi. */}
                <div className="ad1-band">
                  <span
                    key={String(r ? r.tax : okunamadi ? "hata" : "bos")}
                    className="ad1-isik"
                    aria-hidden="true"
                  />
                  <div className="ad1-band-s">
                    <span className="ad1-band-k">Hesaplanan kurumlar vergisi</span>
                    <p className="ad1-band-n">
                      {r === null ? (
                        <>
                          <span className="ad1-band-bos" aria-hidden="true">
                            —
                          </span>
                          <span className="sr-only">Henüz hesap yok.</span>
                        </>
                      ) : (
                        <>
                          <Sayac deger={r.tax} />
                          <span className="ad1-band-b">{cur}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="ad1-band-o">
                    <Halka oran={r ? r.effective / UAE_CT.upper.value : 0}>
                      <Sayac deger={r ? r.effective : 0} yuzde ondalik={2} />
                    </Halka>
                    <p className="ad1-band-ot">
                      <b>Efektif oran</b>
                      <span>
                        Üst oran {UAE_CT.upper.label}; eşiğe kadarki kısma {UAE_CT.lower.label}.
                      </span>
                    </p>
                  </div>

                  {/* Çubuk SÜS: aynı iki tutar hem göstergede hem dökümde
                      yazılı. Girdi okunamıyorsa çubuk sıfırlanıyor. */}
                  <div className="ad1-dilim">
                    <PayCubugu
                      parcalar={[
                        { oran: r && profit ? r.lowerBase / profit : 0, ton: "sonuk" },
                        { oran: r && profit ? r.upperBase / profit : 0, ton: "mavi" },
                      ]}
                    />
                    <ul className="ad1-dilim-e">
                      <li data-ton="sonuk">
                        <i aria-hidden="true" />
                        {UAE_CT.threshold.label}&apos;ye kadar · {UAE_CT.lower.label}
                      </li>
                      <li data-ton="mavi">
                        <i aria-hidden="true" />
                        Aşan kısım · {UAE_CT.upper.label}
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="ad1-cumle">
                  {profit === null ? (
                    okunamadi ? (
                      <>
                        “{value}” bir tutar olarak okunamadı. Yalnızca rakam kullanın; binlik
                        ayracı nokta, ondalık virgül.
                      </>
                    ) : (
                      "Kazancınızı yazın; eşiğin altı ve üstü ayrı hesaplanır."
                    )
                  ) : profit <= UAE_CT.threshold.value ? (
                    <>
                      Kazanç {UAE_CT.threshold.label} eşiğini aşmıyor; tamamına{" "}
                      {UAE_CT.lower.label} uygulanıyor.
                    </>
                  ) : (
                    <>
                      Oran kazancın tamamına değil, {UAE_CT.threshold.label} eşiğini aşan kısmına
                      uygulanıyor.
                    </>
                  )}
                </p>
              </div>

              {/* DÖKÜM BANDIN İÇİNDE DEĞİL ALTINDA ve AÇIK yüzeyde: bant tek
                  satırlık bir vurgu olmalı, ikinci bir gece panele dönmemeli.
                  Satırlar kabul edilen defterdekiyle aynı: matrah × oran. */}
              {r !== null && profit !== null && (
                <dl className="ad1-dokum">
                  {donem === "aylik" && girilen !== null && (
                    <Dokum1
                      ikon={<CalendarDays size={14} strokeWidth={1.9} />}
                      etiket="Yıllık kazanç"
                      alt={`Aylık ${formatAmount(girilen)} × 12`}
                      deger={formatAmount(profit)}
                    />
                  )}
                  <Dokum1
                    ikon={<Layers size={14} strokeWidth={1.9} />}
                    etiket={`${UAE_CT.threshold.label} ve altı`}
                    alt={`${formatAmount(r.lowerBase)} × ${UAE_CT.lower.label}`}
                    deger={<Sayac deger={r.lowerBase * UAE_CT.lower.value} />}
                  />
                  <Dokum1
                    ikon={<Layers size={14} strokeWidth={1.9} />}
                    etiket="Eşiği aşan kısım"
                    alt={`${formatAmount(r.upperBase)} × ${UAE_CT.upper.label}`}
                    deger={<Sayac deger={r.upperBase * UAE_CT.upper.value} />}
                  />
                  <Dokum1
                    toplam
                    ikon={<Wallet size={14} strokeWidth={1.9} />}
                    etiket="Vergi sonrası kalan"
                    alt={`${formatAmount(profit)} − ${formatAmount(r.tax)} ${cur}`}
                    deger={<Sayac deger={profit - r.tax} />}
                  />
                </dl>
              )}
            </Adim1>
          </div>

          {/* Kuralın kendisi rayın dışında: adım değil dipnot. Cümle
              countryContent'teki doğrulanmış satırdan (ruleOf), kaynak çipi
              oranın sitede yayımlandığı yere gidiyor. */}
          {BAE_KURAL && (
            <Kural
              ikon={<Scale size={18} strokeWidth={1.9} />}
              baslik="Uygulanan kural"
              kaynak={<Kaynak href="/dubai#vergi">Dubai vergi çerçevesi</Kaynak>}
              teyit={BAE_TEYIT ? "Oran ve eşik mali müşavir onayından henüz geçmedi." : undefined}
            >
              {BAE_KURAL.value}. {BAE_KURAL.note}
            </Kural>
          )}

          <p className="ad1-not">{ESTIMATE_NOTE}</p>

          <DerinListe>
            <Derin
              ikon={<CalendarDays size={16} strokeWidth={1.9} />}
              baslik="Aylık tutar nasıl çevriliyor"
              ipucu="12 ile çarpılıyor; on iki ay birbirine eşit sayılıyor."
            >
              Vergi yılın tamamındaki vergiye tabi kazanç üzerinden hesaplanıyor. Aylık
              seçildiğinde girdiğiniz tutar 12 ile çarpılıyor ve çarpım dökümün ilk satırında
              yazıyor. Aylarınız birbirinden farklıysa yıllık toplamı yazmak daha doğru sonuç
              verir.
            </Derin>
          </DerinListe>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- ADIM ----
   Rayın üstündeki bir durak. Kabul edilen kartın Adim'iyle aynı adlandırma
   kuralı: adımın içinde tek metin alanı varsa başlık <label> olup alanın adı
   oluyor, yoksa kap role="group" + aria-labelledby. (<fieldset>/<legend> bu
   tarayıcıda ağaçta adlı grup üretmiyor, uygunluk testinde ölçülmüştü.)

   `esit` numara yerine "=" basıyor, `gece` diski koyulaştırıyor, `akt`
   aktarım zincirinin ilk durağını işaretliyor. */
function Adim1({
  no,
  ikon,
  baslik,
  ipucu,
  etiketIcin,
  akt,
  esit,
  gece,
  children,
}: {
  no?: number;
  ikon: ReactNode;
  baslik: ReactNode;
  ipucu?: ReactNode;
  etiketIcin?: string;
  akt?: boolean;
  esit?: boolean;
  gece?: boolean;
  children: ReactNode;
}) {
  const id = useId();
  const tId = `${id}-t`;
  /* Boşluklar METİN, CSS aralığı değil: erişilebilir ad satır içi öğeleri
     boşluksuz birleştiriyor. Ayraç noktası süs. */
  const metin = (
    <>
      <span className="ad1-no">{esit ? "=" : pad(no ?? 0)}</span>{" "}
      <span className="ad1-ay" aria-hidden="true">
        ·
      </span>{" "}
      {baslik}
    </>
  );
  return (
    <div
      className="ad1-adim"
      data-son={esit ? "" : undefined}
      role={etiketIcin ? undefined : "group"}
      aria-labelledby={etiketIcin ? undefined : tId}
    >
      <div className="ad1-adim-h">
        <span className={gece ? "ad1-disk ad1-disk-g" : "ad1-disk"}>
          <IkonDisk boy="l" ton={gece ? "gece" : "acik"} akt={akt}>
            {ikon}
          </IkonDisk>
        </span>
        <span className="ad1-adim-b">
          {etiketIcin ? (
            <label className="ad1-adim-t" htmlFor={etiketIcin} id={tId}>
              {metin}
            </label>
          ) : (
            <span className="ad1-adim-t" id={tId}>
              {metin}
            </span>
          )}
          {ipucu && <span className="ad1-adim-p">{ipucu}</span>}
        </span>
      </div>
      <div className="ad1-adim-g">{children}</div>
    </div>
  );
}

/* Dökümün bir satırı. Gerçek <dl>: adın ve tutarın ilişkisi "terim · değer".
   Kabul edilen defterin satırıyla aynı bilgi, açık yüzeyde. */
function Dokum1({
  ikon,
  etiket,
  alt,
  deger,
  toplam,
}: {
  ikon: ReactNode;
  etiket: ReactNode;
  alt?: ReactNode;
  deger: ReactNode;
  toplam?: boolean;
}) {
  return (
    <div className="ad1-dokum-s" data-toplam={toplam ? "" : undefined}>
      <dt>
        <IkonDisk boy="s" akt={toplam}>
          {ikon}
        </IkonDisk>
        <span className="ad1-dokum-b">
          <span className="ad1-dokum-t">{etiket}</span>
          {alt && <span className="ad1-dokum-a">{alt}</span>}
        </span>
      </dt>
      <dd>{deger}</dd>
    </div>
  );
}
