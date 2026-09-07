import {
  Check,
  ExternalLink,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Package,
  PackageX,
  Phone,
  Users,
} from "lucide-react";

import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { STANCE_A, STANCE_Q } from "@/lib/brand";
import { COUNTRY_CONTENT, WHO_LABEL, type Step } from "@/lib/countryContent";
import {
  CHANNELS,
  linksOf,
  mapsHref,
  officeFor,
  type ChannelKind,
} from "@/lib/offices";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* Aday YÖN — /ingiltere ve /kktc için dört bölüm.
 *
 * TEK CÜMLEYLE: iki sayfa da /dubai ile aynı bileşeni kullanıyor ama üç bölüm
 * onlarda hiç basılmıyor ve vergi bölümü ya boş ya kenarlıklı boş bir kutu
 * çıkarıyor. Bu dosya o boşlukları YAZILMIŞ VERİYLE dolduruyor; tek bir olgu,
 * oran, tutar ya da tarih uydurulmadı.
 *
 * Kaynaklar, bölüm bölüm:
 *   1 · Ofis        → src/lib/offices.ts (adres, telefon, WhatsApp, e-posta;
 *                     üçü de 18-19.08.2026'da müşteriden geldi)
 *   2 · Bölüşüm     → countryContent.steps[].who + .line
 *   3 · Vergi       → countryContent.tax.rows + .note
 *   4 · Kapsam      → countryContent.included / .excluded + tax.rows'un beyan satırı
 *
 * BURADA OLMAYAN VE UYDURULMAYAN ÜÇ ŞEY:
 *   · Yapı seçimi (CountryStructures). İngiltere ve KKTC için `structures`
 *     alanı yok; "Ltd mi LLP mi", "Serbest Liman mı LTD mi" firmanın kararı,
 *     bizim türetebileceğimiz bir şey değil.
 *   · Kuruluş sonrası kalemleri ve tutarları (lib/afterSetup.ts · Dubai'de
 *     sekiz kalem + ilk yıl toplamı). İki ülke için o veri yok. Yerine
 *     ülkenin KENDİ yayımlanmış beyan satırı basılıyor, tutarsız ve tek
 *     satır; bir tutar tablosu taklidi edilmedi.
 *   · İngiltere'nin temsilî vergi paneli. Oran ve marjinal indirim eşiği
 *     SWAP:UK_CT_RATE ile teyitsiz (countryContent.ts · ingiltere.tax.rows);
 *     teyitsiz bir oranla sürgü açmak, ziyaretçiye rakam vaat etmek olurdu.
 *     Yayımlanmış aralık zaten çerçeve ızgarasında yazılı.
 *
 * GÖRSEL DİL DEVRALINDI, İCAT EDİLMEDİ: bölüm iskeleti ve .cor ızgarası
 * CountryOrtac'tan, .txm-* sınıfları CountryTax'tan. Bu turun kendi CSS'i
 * yalnız üç kutuyu tanımlıyor (src/app/css/lab-ulke.css).
 */

/* Türkçe sayı sözcükleri. Rakamdan ek türetmek ("5'ün", "3'ü") bu dilde
   sesli uyumuna takılıyor ve şablon gibi okunuyor; adım sayısı beşi geçmediği
   için sözcük tablosu yeterli. Tablonun dışına çıkarsa rakama düşüyor. */
const ADET = ["sıfır", "Bir", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi"];
const KACI = ["hiçbiri", "biri", "ikisi", "üçü", "dördü", "beşi", "altısı", "yedisi"];
const adet = (n: number) => ADET[n] ?? String(n);
const kaci = (n: number) => KACI[n] ?? `${n} tanesi`;

/* Sütun sırası: önce ziyaretçinin kendi payı, sonra bizim, sonra otoritenin.
   Sıra bilerek böyle — "bizde" sütunu ortada durunca bölüm bir övünme
   listesi değil, bir bölüşüm tablosu gibi okunuyor. */
const SIRA: Step["who"][] = ["siz", "ortac", "otorite"];

const KANAL_IKON: Record<ChannelKind, typeof Phone> = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

/* ---------------------------------------------------------------- 1 · ofis */
function Ofis({ country }: { country: Country }) {
  const name = COUNTRY_LABELS[country];
  const c = COUNTRY_CONTENT[country];
  const o = officeFor(country);

  const bizde = c.steps.filter((s) => s.who === "ortac");
  const sizde = c.steps.filter((s) => s.who === "siz");

  /* Cümle sayılardan TÜRETİLİYOR, elle yazılmıyor. Sebebi somut: bir adımın
     sorumlusu veri dosyasında değişirse elle yazılmış "üçü" sessizce yalan
     olurdu. Aynı gerekçeyle aşağıdaki kartın başlığı da hesaplanıyor. */
  const lead =
    `Süreci uzaktan bir aracıya devretmiyoruz: ${adet(c.steps.length).toLowerCase()} ` +
    `adımın ${kaci(bizde.length)} doğrudan bizde yürüyor. ` +
    `Kuruluş bittiğinde de muhatabınız değişmiyor.`;

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* Başlık kalıbı CountryOrtac'ın kendi karar kaydından geliyor:
              "<Ülke>'de işinizi kendi ofisimizden yürütüyoruz." Orada yeni
              ülke eklenirken bu kalıba uyulması yazılı. */}
          <SplitWords
            as="h2"
            text={`${name}'de işinizi kendi ofisimizden yürütüyoruz.`}
            accent="kendi ofisimizden yürütüyoruz."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{lead}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} y={18}>
          {/* data-map: iki sütunlu yerleşimi açan anahtar. globals.css'teki
              mutlak konum kuralı yalnız `.cor-map > .omap` çocuğuna bakıyor,
              yani buradaki künye kartı akışta kalıyor ve sütunu kendi boyuyla
              dolduruyor. */}
          <div className="cor" data-map>
            <ul className="cor-list">
              <li>
                <span className="cor-ic" aria-hidden="true">
                  <MapPin size={17} strokeWidth={1.9} />
                </span>
                <span className="cor-txt">
                  <b>Kendi ofisimiz</b>
                  {[o.city, o.address].filter((x) => x.trim() !== "").join(" · ")}
                </span>
              </li>
              <li>
                <span className="cor-ic" aria-hidden="true">
                  <ListChecks size={17} strokeWidth={1.9} />
                </span>
                <span className="cor-txt">
                  <b>{`${adet(c.steps.length)} adımın ${kaci(bizde.length)} bizde`}</b>
                  {`Sizden istenen: ${sizde.map((s) => s.title).join(", ")}.`}
                </span>
              </li>
              <li>
                <span className="cor-ic" aria-hidden="true">
                  <Users size={17} strokeWidth={1.9} />
                </span>
                <span className="cor-txt">
                  {/* Dubai kartıyla birebir aynı cümle. Site genelinde
                      yayımlanmış bir iddia, ülkeye göre değişmiyor. */}
                  <b>Türkçe tek muhatap</b>
                  İsimli bir danışman, mesai içinde doğrudan erişim.
                </span>
              </li>
            </ul>

            <div className="cor-map">
              {/* OFİS KÜNYESİ — Dubai'de bu sütunda çizili harita duruyor
                  (OfficeMap, SWAP:GOOGLE_MAPS_EMBED ve çizim yalnız Dubai
                  için). İki ülke için çizim yok; uydurulmuş bir semt planı
                  koymaktansa doğrulanmış künye konuldu.
                  legal alanı ikisinde de boş (SWAP:OFFICE_INGILTERE ·
                  SWAP:OFFICE_KKTC) ve boşken hiç basılmıyor. */}
              <div className="luk-ofis">
                {/* Adres bu kartta İKİNCİ KEZ YAZILMIYOR: soldaki ilk kalem
                    zaten şehir ve açık adresi taşıyor ve iki sütun aynı
                    ekranda duruyor. Kartın işi kanallar; adres soldaki
                    iddianın kanıtı. */}
                <p className="luk-ofis-h">
                  <b>{`${name} ofisi`}</b>
                  {o.legal.trim() !== "" ? <span>{o.legal}</span> : null}
                </p>

                <ul className="luk-ofis-rows">
                  {CHANNELS.map(({ kind, label }) => {
                    const baglar = linksOf(o.contact[kind]);
                    if (baglar.length === 0) return null;
                    const Icon = KANAL_IKON[kind];
                    return (
                      <li key={kind}>
                        <div className="luk-ofis-row">
                          <span className="luk-ofis-ic" aria-hidden="true">
                            <Icon size={15} strokeWidth={1.9} />
                          </span>
                          <span className="luk-ofis-t">
                            <span className="luk-ofis-k">{label}</span>
                            {/* KKTC telefonunda iki hat var ve ikisi de
                                gerçek; linksOf ikisini birden veriyor.
                                Birini seçmek, arayanın ulaşabileceği bir
                                hattı gizlemek olurdu (lib/offices.ts). */}
                            <span className="luk-ofis-v">
                              {baglar.map((b) => (
                                <a key={b.href} href={b.href}>
                                  {b.value}
                                </a>
                              ))}
                            </span>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <a
                  className="luk-ofis-maps"
                  href={mapsHref(o)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} ofisinin adresini Google Haritalar'da açar, yeni sekmede`}
                >
                  <ExternalLink size={15} strokeWidth={1.9} aria-hidden="true" />
                  Adresi haritada aç
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 2 · bölüşüm */
function Bolusum({ country }: { country: Country }) {
  const c = COUNTRY_CONTENT[country];

  /* Boş sütun basılmıyor: "Otoritede · 0 adım" diye kenarlıklı bir kutu,
     bilgi değil delik olurdu. Izgara auto-fit olduğu için kalanlar satırı
     kendiliğinden dolduruyor. */
  const sutunlar = SIRA.map((w) => ({ w, items: c.steps.filter((s) => s.who === w) })).filter(
    (x) => x.items.length > 0,
  );

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Bu işin hangi kısmı bizde?"
            accent="hangi kısmı bizde?"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* Canlı süreç bölümünün ekseni ZAMAN (tipik süre, ray, ilerleyen
                çizgi); buranınki SORUMLU. Aynı adımlar iki kez okunmuyor,
                iki farklı soruya cevap veriyor: "ne kadar sürer" ve "kim
                yapar". Adım anlatımları (steps[].line) canlı sayfada hiç
                basılmıyor, yalnız aria-label'da duruyor. */}
            <p className="sec-lead">Sıraya göre değil, sorumluya göre. Her adımda ne olduğu yazılı.</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.24} y={18}>
          <div className="luk-bol">
            {sutunlar.map(({ w, items }) => (
              <div key={w} className="luk-bol-c" data-who={w}>
                <p className="luk-bol-h">
                  <b>{WHO_LABEL[w]}</b>
                  <span className="luk-bol-n">{`${items.length} adım`}</span>
                </p>
                <ul className="luk-bol-rows">
                  {items.map((s) => (
                    <li key={s.title}>
                      <b className="luk-bol-t">{s.title}</b>
                      <span className="luk-bol-l">{s.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- 3 · vergi */
function Vergi({ country }: { country: Country }) {
  const name = COUNTRY_LABELS[country];
  const c = COUNTRY_CONTENT[country];

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={`${name}'de vergi çerçevesi.`}
            accent="vergi çerçevesi."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Genel kural burada. Sizin durumunuz görüşmede çıkıyor.</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.24}>
          <p className="txm-cap">Yayımlanmış çerçeve</p>
          <dl className="txm-facts">
            {c.tax.rows.map((r) => (
              <div key={r.label} className="txm-fact">
                <dt>{r.label}</dt>
                <dd>
                  <b>{r.value}</b>
                  {r.note && <span>{r.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>

        {/* ASIL DÜZELTME BURASI.
            Canlı bileşende bu kutu KKTC'de basılıyor ama İÇİ BOŞ
            (CountryTax.tsx · <p className="txm-none"> boş bir gövde) ve CSS
            ona kenarlık + 20/24 dolgu veriyor, yani ekranda kenarlıklı boş
            bir kutu duruyor (docs/durum.md · B13). Cevabın metni zaten
            countryContent.kktc.tax.note içinde YAZILI: "KKTC için bu sayfada
            oran yayımlamıyoruz…". Burada o metin basılıyor.
            İngiltere'de ise kutu HİÇ çıkmıyordu: ülke ne `models`'ta ne
            `withheld`'de. Oysa notu var ve okunması gereken bir uyarı
            (Türkiye tarafındaki yükümlülük). O da basılıyor.
            Kutunun kaldığı yer değişti: canlıda ızgaranın ÜSTÜNDE duruyordu,
            burada altında. Sebep şu — notun ikisi de ızgaradaki satırların
            SINIRINI çiziyor; sınırı çizilecek şeyden önce okumak boşa
            okumak. */}
        {c.tax.note.trim() !== "" && (
          <FadeUp delay={0.3}>
            <p className="txm-none">{c.tax.note}</p>
          </FadeUp>
        )}

        <FadeUp delay={0.32}>
          <div className="txm-foot">
            <p className="txm-foot-t">
              <b>{STANCE_Q}</b> {STANCE_A}
            </p>
            <AskCta />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- 4 · kapsam */
function Kapsam({ country }: { country: Country }) {
  const c = COUNTRY_CONTENT[country];

  /* Beyan satırı ülkenin kendi vergi tablosundan okunuyor, elle yazılmıyor:
     İngiltere'de "Beyan takvimi", KKTC'de "Beyan yükümlülüğü". Satır yoksa
     şerit hiç basılmıyor; yerine bir şey uydurulmuyor. */
  const beyan = c.tax.rows.find((r) => r.label.startsWith("Beyan"));

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş fiyatı nerede bitiyor."
            accent="nerede bitiyor."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Kuruluşta yapılan işler ve fiyatın dışında kalanlar aynı ekranda; kuruluş bittikten
              sonra tekrar eden yükümlülük en altta.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.24} y={18}>
          <div className="luk-kap">
            <div className="luk-kap-p">
              <p className="luk-kap-h">
                <span className="luk-kap-ic" aria-hidden="true">
                  <Package size={18} strokeWidth={1.9} />
                </span>
                <span className="luk-kap-t">Kuruluşta yapılan işler</span>
                <span className="luk-kap-n">{`${c.included.length} kalem`}</span>
              </p>
              <ul className="luk-kap-rows">
                {c.included.map((x) => (
                  <li key={x} className="luk-kap-row">
                    <i aria-hidden="true">
                      <Check size={11} strokeWidth={3.2} />
                    </i>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              {/* Bu bölüm bir kez kurulup kaldırılmıştı ve gerekçesi hâlâ
                  geçerli: sabit bir "dahil / hariç" listesi, neyin dahil
                  olduğu seçilen pakete göre değiştiği için fiyat
                  yapılandırıcısıyla çelişebiliyor (ulke/[slug]/page.tsx'teki
                  kaldırma notu). İtiraz gizlenmiyor, aynı kutunun içinde
                  yazılıyor. "Yazılı teklif" sitenin kendi ifadesi
                  (countryContent.kktc.tax.note). */}
              <p className="luk-kap-f">
                Seçtiğiniz pakete göre bu liste değişebiliyor; kesin kapsam yazılı teklifte satır
                satır yazılıyor.
              </p>
            </div>

            <div className="luk-kap-p" data-tone="disi">
              <p className="luk-kap-h">
                <span className="luk-kap-ic" aria-hidden="true">
                  <PackageX size={18} strokeWidth={1.9} />
                </span>
                <span className="luk-kap-t">Fiyatın dışında kalanlar</span>
                <span className="luk-kap-n">{`${c.excluded.length} kalem`}</span>
              </p>
              <ul className="luk-kap-rows">
                {c.excluded.map((x) => (
                  <li key={x} className="luk-kap-row">
                    <i aria-hidden="true">
                      <Minus size={11} strokeWidth={3.2} />
                    </i>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <p className="luk-kap-f">Bu kalemler kuruluş fiyatının dışında kalır.</p>
            </div>
          </div>
        </FadeUp>

        {beyan && (
          <FadeUp delay={0.3} y={16}>
            {/* Dubai'deki "kuruluş sonrası" bölümünün karşılığı DEĞİL ve
                öyleymiş gibi de kurulmadı: orada sekiz kalem, ritim çizelgesi
                ve ilk yıl toplamı var (lib/afterSetup.ts). İki ülke için o
                veri yok. Burada yalnızca ülkenin kendi yayımlanmış beyan
                satırı duruyor, tutarsız. */}
            <div className="luk-beyan">
              <p className="luk-beyan-k">Kuruluştan sonra tekrar eden yükümlülük</p>
              <p className="luk-beyan-v">{beyan.value}</p>
              {beyan.note && <p className="luk-beyan-n">{beyan.note}</p>}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ dışarı */
export default function UlkeYon({ country }: { country: Country }) {
  return (
    <>
      <Ofis country={country} />
      <Bolusum country={country} />
      <Vergi country={country} />
      <Kapsam country={country} />
    </>
  );
}
