"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  Check,
  ChevronDown,
  CircleHelp,
  Hash,
  Percent,
  Receipt,
  SearchCheck,
  Server,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_NAME, COUNTRY_ORDER, type CountrySlug } from "@/lib/brand";
import { siblingsOf, type ToolEntry, type ToolId,
  PLANNED_TOOLS,
} from "@/lib/tools/catalog";
import { formatAmount, formatPercent } from "@/lib/tools/num";

/* ============================================================================
   ARAÇ KABUĞU + ARAÇ DİLİ · ad alanı .ta- · CSS: src/app/css/araclar.css
   ============================================================================

   12.09.2026 · İKİ PANELLİ KURGU GERİ ÇEVRİLDİ, DİL "TEZGÂH"A GEÇTİ (A2)

   Müşteri: "tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her
   şey gibi bir şey demedimki sana amk ben. o biraz daha test formatına özgü
   bir tasarımdı. sen sadece biraz ona paralel git dedim."

   YANLIŞ OLAN TASARIM DEĞİL, TEK BİR FORMATIN HER ARACA ZORLANMASIYDI.
   Uygunluk testinin iki panelli kurgusu (solda beyaz çalışma paneli, sağda
   gece "defter") on bir soruluk bir testte anlamlı: cevap birikiyor, puan
   doluyor. Tek kutuya sayı yazılan bir hesaplayıcıda, bir metin
   aramasında ya da bir kayıt sorgusunda birikecek bir şey yok.

   YENİ REFERANS SİTENİN KENDİ HESAPLAYICISI (CountryTax.tsx · .txm- ·
   /dubai#vergi). Müşteri bu aracı ilk isterken zaten onu göstermişti: "bi
   seçme şeyi olsun fln, dubai şirket kuruluş sayfasındaki hesaplayıcı gibi
   fln." /lab/arac-dili'nin A2 adayı (Tezgâh) o dili araç ölçüsüne
   büyütüyordu; müşteri A2'yi seçti ("a2 ile devam et, kalan araçlara da
   uygula") ve bu dosya o dilin ORTAK HÂLİ oldu.

   DİLİN SÖZLEŞMESİ (sırasıyla, C bölümünde):
     künye satırı   aracın adı + bayrak solda, ülke pilleri sağda
     tezgâh         TEK panel · üstte kicker, sağ üstte ikinci değişkenin
                    çipleri
     girdi          geniş ve tek; altında hazır çipler ve yardım satırı
     bant           CEVAP · sayfanın TEK gece yüzeyi, tek büyük değer
     bölüşüm        bir bütünün parçaları (payı olan araçta)
     satırlar       "nasıl çıktı" dökümü · satır · mini çubuk · sağda değer
     kural + kaynak kutu değil dipnot, kaynak çipiyle
     dip + açılır   tahmin ibaresi, soru çıkışı, derinlik <details>'te
   BİR PARÇANIN KARŞILIĞI YOKSA O PARÇA BASILMIYOR. Boş bırakılan bir bant
   ya da karşılığı olmayan bir sürgü, formatı zorlamanın aynısı olurdu.

   Bu dosya üç iş yapıyor:
     A) KABUK (default export): aracın bölümü, "ne değil" satırı, SSS ve
        kardeş araçlar. Her araç sayfası bunu çağırıyor. DEĞİŞMEDİ —
        müşteri hero'ya, SSS'e, kardeş kartlarına itiraz etmedi.
     B) ORTAK PARÇALAR: disk, bayrak, sayaç, halka, kural, kaynak, açılır.
        İki dilde de çalışıyorlardı; bugün hepsini C bölümü kullanıyor.
     C) ARAÇ DİLİ (Tezgâh): müşterinin seçtiği dil. Yeni işler buradan.

   12.09.2026 · ESKİ DEFTER TAKIMI SİLİNDİ (aynı günün ikinci turu). Bir
   önceki kayıt şartı yazmıştı: "Dört aracın dördü de dile geçtiğinde B
   bölümü ve `.ta-defter` ailesi tek seferde silinecek." Şart doldu — KDV,
   SIC, isim sorgulama ve üreteç bu turda A2'ye geçti, dördü de artık
   AracKunye/Tezgah/Bant çağırıyor. Silinen on iki ihraç:
     AracKart · AracIs · Adim · Secenekler · Secenek · UlkeYolu ·
     AracDefter · Sonuc · PayCubugu · Dokum · DokumSatir · DefterNot
   Silmeden önce ölçüldü: on ikisinin de tek geçtiği yer kendi tanımıydı,
   ToolShell dışında hiçbir dosya import etmiyordu.

   NEDEN "DURSUN, ZARARI YOK" DEĞİL: müşteri iki panelli kurguyu reddetti
   ("tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her şey gibi
   bir şey demedimki sana"). Reddedilmiş bir bileşen dosyada dururken bir
   sonraki tur onu "hazır duruyor" diye kullanabilir; yasağı yazılı kural
   değil kodun yokluğu tutuyor (aynı ders tuzaklar.md kural 4'te: şerit
   yasağı yazılı olduğu hâlde dört yerde daha yaşamıştı).

   KALKAN CSS: `.ta-kart` · `.ta-is` · `.ta-bas*` · `.ta-cizgi*` · `.ta-adim*`
   · `.ta-sec*` · `.ta-ulke*` · `.ta-defter*` · `.ta-sonuc*` · `.ta-pay*` ·
   `.ta-dilim*` · `.ta-dokum*` · `.ta-dnot` ve yalnız onların çağırdığı beş
   `@keyframes` (taBayrak · taOnay · taDol · taAkis · taIsik). `taGir`
   KALDI: araclar-uretec.css onu çağırıyor. Daha önce kalkmış olanlar
   `--ta-defter-w` ve `Olcek` (İngiltere'nin bant ekseni; yerini sürgünün
   üstündeki sınır işaretleri aldı).

   NEDEN "use client"
   Sayac bir kanca kullanıyor (useState/useEffect) ve araç bileşenlerinin
   hepsi istemci bileşeni. Kabuğun istemciye inmesinin bedeli küçük: defter
   (catalog.ts) ve SmartLink zaten her sayfada menüyle birlikte iniyor.
   Sayfa dosyaları (sunucu) kabuğu düz, serileşebilen proplarla çağırıyor.
   ========================================================================= */

/* ------------------------------------------------------------ ORTAK TİPLER */

/** SSS'nin bir maddesi. İKİSİ DE DÜZ METİN: aynı dizi hem ekrandaki açılır
 *  listeyi hem sayfanın FAQPage JSON-LD'sini besliyor, yani ekrandaki soru ile
 *  yapılandırılmış verideki soru tanım gereği aynı. JSX kabul edilseydi
 *  JSON-LD'ye giden metin ekrandakinden ayrışabilirdi. */
export type SssMadde = { q: string; a: string };

/* Araç kimliği → glif. Nav.tsx'teki TOOL_ICON ile AYNI eşleme ve bu bilinçli
   bir üçüncü kopya (üçüncüsü home/ToolsResources.tsx, bugün hiçbir sayfada
   basılmıyor). Menünün eşlemesini buradan okumak menü paketine kabuğu,
   kabuğun onu Nav'dan okuması kabuğa menüyü sokardı. Deftere ikon alanı
   eklemek (catalog.ts) üçünü birleştirir; lucide'ı deftere taşımak ayrı bir
   karar olduğu için bu turda yapılmadı. */
export const ARAC_IKON: Record<ToolId, LucideIcon> = {
  "kurumlar-vergisi": Percent,
  "bae-kdv": Receipt,
  "uygunluk-testi": SlidersHorizontal,
  "isim-ureteci": Sparkles,
  "ingiltere-isim-sorgulama": SearchCheck,
  "ingiltere-sic-kodu": Hash,
};

const sifirBir = (n: number) => (Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0);

/* Oranı taşıyan özel değişken. Birimsiz: birim CSS'te veriliyor (tuzak J). */
const oranStil = (ad: string, n: number) => ({ [ad]: sifirBir(n) }) as CSSProperties;

/* ------------------------------------------------ "BİZE GELMİYOR" CÜMLESİ
   11.09.2026'ya kadar kardeş şeridinin altında sabit bir cümle vardı:
   "Hepsi tarayıcınızda çalışıyor ve girdiğiniz hiçbir bilgi bize gelmiyor."
   Doğruydu, çünkü sitenin tek sunucu rotası yoktu. İngiltere isim sorgusu
   ilk sunucu rotası (app/api/araclar/isim-sorgu) ve o araç kardeş şeridine
   girdiği her sayfada cümle YANLIŞ olacaktı.

   Cümle şeritte ne listelendiğine bakıyor: defterde `sunucu` alanı olan araç
   varsa onu adıyla anıyor ve ne yaptığını söylüyor. Elle yazılmış bir istisna
   listesi değil, çünkü bir sonraki sunucu aracını yazan kişi bu dosyayı
   açmayı unutabilir; defter girdisini yazmayı unutamaz.

   "tamamen" kelimesi bilerek YOK: isim üreteci alan adını tarayıcıdan RDAP'e
   soruyor (lib/tools/alanadi.ts). Bize gelmiyor, ama "tamamen tarayıcıda"
   da değil. */
function yerellikCumlesi(siblings: ToolEntry[]): string {
  const disari = siblings.flatMap((s) => (s.sunucu ? [{ ad: s.title, kisa: s.sunucu.kisa }] : []));
  if (disari.length === 0) {
    return "Hepsi tarayıcınızda çalışıyor ve girdiğiniz hiçbir bilgi bize gelmiyor.";
  }
  if (disari.length === siblings.length) {
    return disari.map((s) => `${s.ad} ${s.kisa}.`).join(" ");
  }
  const adlar = disari.map((s) => s.ad).join(" ve ");
  const ne =
    disari.length === 1
      ? `o araç ${disari[0].kisa}`
      : disari.map((s) => `${s.ad} ${s.kisa}`).join("; ");
  return `${adlar} dışındakiler tarayıcınızda çalışıyor ve girdiğiniz bilgi bize gelmiyor; ${ne}.`;
}

/* "Ne değil" metnini ilk cümle + kalan diye böler. İlk cümle özet satırında
   GÖRÜNÜR kalıyor (en ağır bilgi o: "Vergi beyanı ya da vergi görüşü
   değil."), kalanı açılınca. Sınır "nokta + boşluk + büyük harf": Türkçe büyük
   harfler dahil, "3/200" ya da "375.000" gibi sayıların içindeki nokta sınır
   sayılmıyor. Bölünemeyen metin tek parça kalıyor ve açılır olmuyor. */
function ilkCumle(metin: string): [string, string] {
  const m = metin.match(/^(.+?[.!?])\s+(?=[A-ZÇĞİÖŞÜ])/);
  return m ? [m[1], metin.slice(m[0].length)] : [metin, ""];
}

/* ============================================================================
   A · KABUK
   ============================================================================

   Bir araç sayfasının gövdesi: PageHero'dan sonra, FinalCta'dan önce.

     .ta-bolum    aracın bölümü (beyaz, sitenin bölüm dolgusu .sec-pad).
                  Adı .ta-sec DEĞİL: o ad seçenek kutusunun ve ilk yazımda
                  ikisi çakıştı — bölümün içindeki tutar kutusu `.ta-sec
                  input` kuralını yiyip saydam ve mutlak konumlu oldu
                  (ekran görüntüsünde kutu yoktu, ölçümde opacity 0).
       .ta-app    1120 px, uygunluk testinin kartıyla aynı ölçü
         children               aracın kendisi (yeni dilde .ta-kart)
         DerinListe (kabuğun)   "Bu araç ne değil" + varsa "nereye gidiyor"
     .ta-sss-sec  SSS · yalnız `sss` verilirse (kağıt zemin)
     .ta-kardes-sec  kardeş araçlar

   "NE DEĞİL" HÂLÂ ZORUNLU, ARTIK AÇILIR. Her araç ne olmadığını söylemek
   zorunda ve bu kabuğun işi (bileşene bırakılırsa biri unutur; metin
   defterden, catalog.ts · isNot). Değişen yalnız sunum: ilk cümle özet
   satırında görünür, kalanı tıklamayla. Müşterinin başka sayfada onayladığı
   ilke: "yüzey sade, derinlik tıklamayla".

   BAŞLIK BURADA YOK: aracın adı sayfanın <h1>'i (PageHero). Kabuk aynı
   başlığı ikinci kez basarsa sayfada iki kez aynı cümle okunur.

   JSON-LD BURADA YOK: kabuk istemci bileşeni ve yapılandırılmış veri sunucu
   sayfasında basılıyor. Sayfa `sss` dizisini hem buraya hem kendi JSON-LD'sine
   veriyor; eşitlik tek dizinin iki okuyucusu olmaktan geliyor.
   ========================================================================= */
export default function ToolShell({
  tool,
  children,
  sss,
  sssGiris,
}: {
  tool: ToolEntry;
  children: ReactNode;
  /** Açılır SSS. Verilmezse bölüm hiç basılmıyor. */
  sss?: SssMadde[];
  /** SSS başlığının altındaki tek cümle. */
  sssGiris?: string;
}) {
  const siblings = siblingsOf(tool.id);
  const [neDegilIlk, neDegilKalan] = ilkCumle(tool.isNot);
  const sssId = useId();

  return (
    <>
      <section className="sec-pad ta-bolum">
        <div className="container-o">
          <div className="ta-app">
            {children}

            {/* Kabuğun kendi derinlik satırları. Aracın kendi DerinListe'si
                hemen üstündeyse ikisi tek liste gibi birleşiyor (araclar.css ·
                .ta-derin-liste + .ta-derin-liste). */}
            <DerinListe>
              <Derin
                ikon={<Ban size={16} strokeWidth={1.9} />}
                baslik="Bu araç ne değil"
                ipucu={neDegilIlk}
              >
                {neDegilKalan || null}
              </Derin>
              {/* Girdisi sunucudan geçen araçta ikinci zorunlu satır. Kısa
                  hâli ÖZETTE görünür: gizlilik bilgisinin tıklamanın arkasında
                  kalması doğru olmazdı. */}
              {tool.sunucu && (
                <Derin
                  ikon={<Server size={16} strokeWidth={1.9} />}
                  baslik="Girdiğiniz bilgi nereye gidiyor"
                  ipucu={`Araç ${tool.sunucu.kisa}.`}
                >
                  {tool.sunucu.cumle}
                </Derin>
              )}
            </DerinListe>
          </div>
        </div>
      </section>

      {sss && sss.length > 0 && (
        <section className="ta-sss-sec" aria-labelledby={`${sssId}-h`}>
          <div className="container-o">
            <div className="ta-sss">
              <div className="ta-sss-bas">
                <h2 id={`${sssId}-h`} className="h2 ta-sss-t">
                  Sık sorulan <span className="text-accent">sorular.</span>
                </h2>
                {sssGiris && <p className="ta-sss-l">{sssGiris}</p>}
              </div>
              <DerinListe>
                {sss.map((m) => (
                  <Derin key={m.q} ikon={<CircleHelp size={16} strokeWidth={1.9} />} baslik={m.q}>
                    {m.a}
                  </Derin>
                ))}
              </DerinListe>
            </div>
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="ta-kardes-sec">
          <div className="container-o">
            <div className="ta-kardes-bas">
              <h2 className="h2 ta-kardes-t">
                Buradan sonra <span className="text-accent">işinize yarayanlar.</span>
              </h2>
              <p className="ta-kardes-l">{yerellikCumlesi(siblings)}</p>
            </div>

            <ul className="ta-kardes">
              {siblings.map((s) => {
                const Ikon = ARAC_IKON[s.id];
                return (
                  <li key={s.id} className="ta-kardes-i">
                    {/* Kartın tamamı bağlantı; SmartLink yayında olmayan adreste
                        aynı işaretlemeyi <span> basıyor, o yüzden içeride blok
                        etiketi yok. */}
                    <SmartLink href={s.href} className="ta-kardes-a">
                      <IkonDisk boy="l">
                        <Ikon size={20} strokeWidth={1.9} />
                      </IkonDisk>
                      <span className="ta-kardes-b">
                        <span className="ta-kardes-n">{s.title}</span>
                        <span className="ta-kardes-m">
                          <UlkeIzi ulke={s.country} />
                          {s.meta}
                        </span>
                      </span>
                      <span className="ta-kardes-go">
                        Aracı açın
                        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </span>
                    </SmartLink>
                  </li>
                );
              })}
            </ul>

            {/* "…ve sırada bekleyenler" kuyruğu 12.09.2026'da düştü: defter altı
                kaleme indiğinde planlanan araç kalmadı (catalog.ts · PLANNED_TOOLS
                boş). Cümle defterden türüyor, elle yazılmıyor — bir gün yeniden
                planlanan araç girerse kuyruk kendiliğinden geri geliyor. */}
            <p className="ta-kardes-alt">
              <SmartLink href="/araclar" className="link-arrow">
                {PLANNED_TOOLS.length > 0
                  ? "Bütün araçlar ve sırada bekleyenler"
                  : "Bütün araçlar"}
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

/* Kardeş kartındaki bayrak izi: tek ülkeli araçta o ülkenin bayrağı, üç
   ülkeyi birlikte gösteren araçta üçü üst üste, ülkesiz araçta hiçbir şey. */
function UlkeIzi({ ulke }: { ulke: ToolEntry["country"] }) {
  if (ulke === null) return null;
  const liste = ulke === "hepsi" ? COUNTRY_ORDER : [ulke];
  return (
    <span className="ta-izi" aria-hidden="true">
      {liste.map((c) => (
        <BayrakDisk key={c} ulke={c} boy="xs" />
      ))}
    </span>
  );
}

/* ============================================================================
   B · ORTAK PARÇALAR
   ============================================================================

   Buradaki parçaların hepsi HER İKİ DİLDE de çalışıyordu (disk, bayrak,
   sayaç, halka, kural, kaynak, açılır) ve bugün hepsini C bölümü kullanıyor.
   Eski iki panelli kurgunun kendi parçaları 12.09.2026'da silindi; hangileri
   ve neden, dosyanın başındaki kayıtta.
   ========================================================================= */

/* ------------------------------------------------------------ DİSKLER ----
   Uygunluk testinin iki disk ölçüsü burada sabit adlarla: soru diski 54,
   şık diski 44, defter diski 30, kalem diski 22. Araçlarda soru başlığı
   yok (her adım aynı ekranda), o yüzden en büyük disk 44.
     boy  xs 18 · s 28 · m 36 · l 44
     ton  acik (beyaz panel: --blue-100 zemin, --blue-900 glif, 6,26:1)
          gece (gece panel: #16304f zemin, #9cc6f5 glif, 7,52:1)

   `akt` PROPU DA SİLİNDİ (12.09.2026, defter takımıyla birlikte). Diski
   aktarım zincirinin durağı yapıyordu ve iki çağıranı vardı: Adim ile
   DokumSatir, ikisi de bu turda gitti. Prop bırakılsaydı sessiz bir tuzak
   olurdu: sırayı veren kurallar (`.ta-adim-h .ta-ikon.akt-durak`,
   `.ta-dokum-s .ta-ikon.akt-durak`) ve şefi `.ta-kart` da silindi, yani
   `akt` yazan bir sonraki araç `--akt-tur`u okuyamaz ve aktarim.css'in
   yedek periyodu 18,1 s devreye girerdi — periyot katsızlığı tuzağının
   (tuzak K) tam olarak bir kez patladığı yer. Halka durağını kendi
   yazıyor (`.ta-halka akt-durak`), şefi `.ta-tezgah`. */
export function IkonDisk({
  children,
  boy = "m",
  ton = "acik",
}: {
  children: ReactNode;
  boy?: "xs" | "s" | "m" | "l";
  ton?: "acik" | "gece";
}) {
  return (
    <span className="ta-ikon" data-boy={boy} data-ton={ton} aria-hidden="true">
      {children}
    </span>
  );
}

/* TUZAK H — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor, width/height
   YOK; kapsız bırakılırsa 300×150'ye şişiyor ve bu depoda iki sayfayı bozdu.
   Kap SABİT PİKSEL + overflow: hidden, ölçüler .ta-bayrak[data-boy]'da.

   `bicim` 12.09.2026'da eklendi. Disk (varsayılan) bayrağı 3:2'den kareye
   KIRPIYOR — künye satırının 42 px'lik büyük bayrağında kırpma göze
   batıyordu (KKTC'nin ay yıldızı diskin dışında kalıyor). "kart" biçimi
   viewBox'ın kendi oranını koruyor: 42×28 ve 21×14. Kırpma olmadığı için
   bayrak eksiksiz okunuyor; A2 adayının künyesi de bu biçimdeydi. */
export function BayrakDisk({
  ulke,
  boy = "m",
  bicim = "disk",
}: {
  ulke: CountrySlug;
  boy?: "xs" | "s" | "m" | "l";
  bicim?: "disk" | "kart";
}) {
  return (
    <span className="ta-bayrak" data-boy={boy} data-bicim={bicim} aria-hidden="true">
      <Flag country={ulke} />
    </span>
  );
}

/* ESKİ İKİ PANELLİ KURGUNUN BEŞ PARÇASI BURADAYDI, SİLİNDİ (12.09.2026):
   AracKart · AracIs · Adim · Secenekler/Secenek · UlkeYolu. Müşteri kurguyu
   reddetti ("… sağ tarafa siyah alan koy onun içinde dönsün her şey gibi bir
   şey demedimki sana"); beşinin de ToolShell dışında tek kullanıcısı yoktu.
   Ülke seçimini artık AracKunye`nin pilleri (C bölümü), tek satırlık seçimi
   Cip taşıyor. Ayrıntılı kayıt dosyanın başında. */

/* --------------------------------------------------------------- KURAL ----
   Hesabın dayandığı kuralın ÖZETİ + kaynağı, çalışma panelinin dibinde.
   Kutu değil: üstünde bir ayraç (1 px), solunda disk. Eski .tl-ct gri kutusu
   burada kalktı; kural artık bir form alanı gibi değil bir dipnot gibi
   duruyor. `teyit` verilirse kehribar üçgenle tek satır: oranların mali
   müşavir onayı beklediğini SAKLAMIYOR ama bir paragrafla da söylemiyor. */
export function Kural({
  ikon,
  baslik,
  children,
  kaynak,
  teyit,
}: {
  ikon: ReactNode;
  baslik: string;
  children: ReactNode;
  kaynak?: ReactNode;
  teyit?: ReactNode;
}) {
  return (
    <div className="ta-kural">
      <IkonDisk boy="m">{ikon}</IkonDisk>
      <div className="ta-kural-b">
        <p className="ta-kural-k">{baslik}</p>
        <p className="ta-kural-t">{children}</p>
        {(kaynak || teyit) && (
          <div className="ta-kural-alt">
            {kaynak}
            {teyit && (
              <p className="ta-teyit">
                <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" />
                <span>{teyit}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Kaynak çipi. Site dışı adres yeni sekmede ve adı bunu söylüyor (<a> rolü
   yazardan ad almayı destekliyor, tuzak G-2'deki <p>/<div> durumu değil);
   site içi adres SmartLink. */
export function Kaynak({
  href,
  children,
  dis,
}: {
  href: string;
  children: ReactNode;
  /** site dışı mı — ekran okuyucuya yeni sekme bilgisi için ad */
  dis?: string;
}) {
  if (dis) {
    return (
      <a className="ta-kaynak" href={href} target="_blank" rel="noopener noreferrer" aria-label={dis}>
        {children}
        <ArrowUpRight size={14} strokeWidth={2.1} aria-hidden="true" />
      </a>
    );
  }
  return (
    <SmartLink className="ta-kaynak" href={href}>
      {children}
      <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
    </SmartLink>
  );
}

/* GECE DEFTER (AracDefter) VE ONUN BÜYÜK RAKAMI (Sonuc) BURADAYDI, SİLİNDİ
   (12.09.2026). Sayfanın tek koyu yüzeyi artık Bant (C bölümü): yan sütun
   değil, tezgâhın içinde tek satır. Kayıt dosyanın başında. */

/* --------------------------------------------------------------- SAYAÇ ----
   Değer değişince eski değerden yenisine SAYARAK gidiyor (520 ms, yavaşlayan
   eğri). İlk basışta saymıyor: sunucu ile tarayıcı aynı sayıyı basıyor ve
   hidrasyon farkı doğmuyor; "0'dan saymaya başlayan" bir açılış ise sunucu
   HTML'inde yanlış sayı demekti.

   HAREKET KAPISI: useReducedMotion bu depoda YASAK (tuzak A, beş kez
   patladı). Tercih yalnız useEffect İÇİNDE okunuyor (HeroDubaiCards.tsx
   kalıbı); render ağacında hiçbir dal ona bakmıyor. Azaltılmış harekette ve
   GİZLİ SEKMEDE (tuzak N: rAF donuk, sayı eski değerde kalırdı) doğrudan
   son değer yazılıyor.

   ERİŞİLEBİLİRLİK: sayan rakam aria-hidden, son değer .sr-only METİN. Ara
   kareler ekran okuyucuya hiç gitmiyor. (Görünmez METİN, aria-label değil:
   rolsüz öğede aria yayımlanmıyor, tuzak G / G-2.)

   setState yalnız rAF ve zamanlayıcı geri çağrısında: efektin gövdesinde
   eşzamanlı setState yok (react-hooks · set-state-in-effect), render'da ref
   okunmuyor (react-hooks · refs). */
const SAY_MS = 520;
const yavasla = (p: number) => 1 - Math.pow(1 - p, 4);

export function Sayac({
  deger,
  ondalik = 0,
  yuzde = false,
}: {
  deger: number;
  ondalik?: number;
  /** oran (0.0225) → "%2,25" */
  yuzde?: boolean;
}) {
  const [goster, setGoster] = useState(deger);
  const son = useRef(deger);

  useEffect(() => {
    const bas = son.current;
    if (bas === deger) return;
    const anlik =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.hidden;
    if (anlik) {
      const z = window.setTimeout(() => {
        son.current = deger;
        setGoster(deger);
      }, 0);
      return () => window.clearTimeout(z);
    }
    let raf = 0;
    let t0 = -1;
    const kare = (t: number) => {
      if (t0 < 0) t0 = t;
      const p = Math.min((t - t0) / SAY_MS, 1);
      const v = p >= 1 ? deger : bas + (deger - bas) * yavasla(p);
      son.current = v;
      setGoster(v);
      if (p < 1) raf = window.requestAnimationFrame(kare);
    };
    raf = window.requestAnimationFrame(kare);
    return () => window.cancelAnimationFrame(raf);
  }, [deger]);

  const yaz = (n: number) => (yuzde ? formatPercent(n, ondalik) : formatAmount(n, ondalik));
  return (
    <>
      <span className="ta-sayac" aria-hidden="true">
        {yaz(goster)}
      </span>
      <span className="sr-only">{yaz(deger)}</span>
    </>
  );
}

/* ---------------------------------------------------------------- HALKA ---
   Oranın halkası (0..1). Uygunluk testinin ilerleme halkalarının araçtaki
   karşılığı; kurumlar vergisinde "efektif oran / üst oran". Ortasına Sayac
   ya da kısa metin konur. Halka aktarım zincirinin üçüncü durağı. */
export function Halka({ oran, children }: { oran: number; children: ReactNode }) {
  return (
    <span className="ta-halka akt-durak">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle className="ta-halka-r" cx="32" cy="32" r="28" />
        <circle className="ta-halka-d" cx="32" cy="32" r="28" style={oranStil("--ta-o", oran)} />
      </svg>
      <span className="ta-halka-m">{children}</span>
    </span>
  );
}

/* PAY ÇUBUĞU (PayCubugu) BURADAYDI, SİLİNDİ (12.09.2026): gece defterin
   içinde yaşıyordu. Bir bütünün parçalarını artık Bolusum`un tek çubuğu
   gösteriyor (C bölümü). */

/* ÖLÇEK KALKTI (12.09.2026). Bantlara bölünmüş eksen + imleç ("hangi
   rejimdesiniz") yalnız kurumlar vergisinin İngiltere dalında kullanılıyordu
   ve gece defterin içinde yaşıyordu. Yeni dilde aynı bilgiyi SÜRGÜNÜN
   ÜSTÜNDEKİ SINIR İŞARETLERİ taşıyor (C · Surgu): iki sınır kârın kendi
   ekseninde, doğrusal — eski ölçek 1:2:1 bantlarla doğrusal DEĞİLDİ ve
   bunu altındaki yazıyla telafi etmek zorundaydı. Tek kullanıcısı gittiği
   için bileşen ve `.ta-olcek*` kuralları birlikte silindi. */

/* DEFTERİN DÖKÜMÜ (Dokum · DokumSatir) VE DİPNOTU (DefterNot) BURADAYDI,
   SİLİNDİ (12.09.2026). "Nasıl çıktı" dökümünü artık Satirlar/Satir taşıyor
   (C bölümü), dipnotu Dip. Kayıt dosyanın başında. */

/* ------------------------------------------------------------- DERİNLİK ---
   "Yüzey sade, derinlik tıklamayla." Uzun notlar <details> içine iniyor:
   özet satırında disk + başlık + TEK SATIR ipucu görünür, gövde tıklamayla.
   Kapalı <details> içeriği Google'da normal indeksleniyor (app/dubai/muhasebe
   sayfasındaki kayıt), yani metin kaybolmuyor, yer değiştiriyor.

   Gövdesi olmayan satır açılır DEĞİL: boş bir <details> açılınca hiçbir şey
   göstermez ve "bozuk" okunur. O hâlde aynı görünüşte düz bir satır basılıyor.

   İki DerinListe art arda gelirse (aracın kendi satırları + kabuğun "ne
   değil"i) CSS ikisini tek liste gibi birleştiriyor. */
export function DerinListe({ children }: { children: ReactNode }) {
  return <div className="ta-derin-liste">{children}</div>;
}

export function Derin({
  ikon,
  baslik,
  ipucu,
  children,
}: {
  ikon: ReactNode;
  baslik: string;
  ipucu?: ReactNode;
  children?: ReactNode;
}) {
  const ozet = (
    <>
      <IkonDisk boy="s">{ikon}</IkonDisk>
      <span className="ta-derin-b">
        <span className="ta-derin-t">{baslik}</span>
        {ipucu && <span className="ta-derin-h">{ipucu}</span>}
      </span>
    </>
  );
  if (!children) {
    return (
      <div className="ta-derin" data-duz="">
        <div className="ta-derin-s">{ozet}</div>
      </div>
    );
  }
  return (
    <details className="ta-derin">
      <summary className="ta-derin-s">
        {ozet}
        <ChevronDown className="ta-derin-c" size={16} strokeWidth={2} aria-hidden="true" />
      </summary>
      <div className="ta-derin-g">{children}</div>
    </details>
  );
}

/* ############################################################################
   C · ARAÇ DİLİ · TEZGÂH  (A2 · 12.09.2026 · müşterinin seçtiği dil)
   ############################################################################

   Kaynak dil sitenin kendi vergi hesaplayıcısı (CountryTax.tsx · .txm-),
   araç ölçüsüne büyütülmüş hâli /lab/arac-dili · AracDili2. Buradaki
   parçalar o adayın ortak hâli; ilk kullanıcı KurumlarVergisi.tsx.

   İKİ KURAL, İKİSİ DE ÖNCEKİ TURUN HATASINDAN:
     1. BİR PARÇANIN KARŞILIĞI YOKSA KULLANILMAZ. Sürgü bir SAYININ ölçeği;
        metin araması, kayıt sorgusu ya da aday listesi taşıyamaz. Boş bant
        ya da anlamsız sürgü, formatı zorlamanın aynısı.
     2. SAYFADA TEK KOYU YÜZEY VAR: `Bant`. Yan sütun yok, ikinci gece kutu
        yok. Kontrast koyu bir PANELDEN değil, tek bir BANTTAN geliyor.

   ÖLÇÜLER (1440 px, A2'den taşındı): tezgâh dolgusu 28/34/30 · rakam kutusu
   62 px, rakam 30 px · bant dolgusu 22/28, büyük rakam clamp(28,3.4vw,40) ·
   bölüşüm çubuğu 22 px · satır ızgarası 260 / 1fr / 200, mini çubuk 14 px ·
   çip ve pil yüksekliği 42 px.

   KONTRAST (WCAG göreli parlaklık; metin eşiği 4,5 · büyük metin ve grafik 3)
     beyaz zeminde  --text-900 20,03 · --text-600 6,69 · --blue-900 7,14
                    --blue-700 3,99 → YALNIZ 28 px+ rakamda (büyük metin)
     --paper üstünde --text-600 6,14
     bant (--night-2 #111)  beyaz 18,88 · #9cc6f5 10,62 · --blue-500 6,79
                            --night-text 9,94
   A2 bir kontrast hatasını bilerek DÜZELTTİ: referansın kicker'ı --blue-700'ü
   13,5 px'te kullanıyor (3,99, eşiğin altında). Buradaki kicker --blue-900.

   HAREKET: tek sürekli hareket bandın ışığı (13007 ms, asal). Kapısı CSS'te
   @media (prefers-reduced-motion: no-preference); araclar.css'te bu bloğun
   dışında tek geçiş bile yok. `alternate` yasak (tuzak K).
   ########################################################################## */

/* ------------------------------------------------------------ KÜNYE SATIRI
   Tezgâhın ÜSTÜNDE, panelin dışında: aracın adı + bayrak solda, ülke pilleri
   sağda. Ülke seçimi BAĞLANTI, radyo değil — her ülkenin kendi adresi var
   ve seçim adresi değiştiriyor; aria-current="page" <a>'da yayımlanıyor
   (tuzak G: rolsüz <span>'de yayımlanmıyor).

   scroll={false}: ülke tezgâhın içinde değişiyor, varsayılan davranış
   sayfayı başa kaydırıp ziyaretçiyi tezgâhın dışına atardı. SmartLink değil
   düz Link, çünkü SmartLink'in tipi <a>'nın propları ve `scroll` onlardan
   biri değil; buraya gelen adresler zaten açık (lib/routes.ts).

   `yol` verilmeyen araçta (ülkesiz araç) pil listesi hiç basılmıyor. */
export function AracKunye({
  ad,
  alt,
  ulke,
  yol,
  sag,
}: {
  ad: string;
  /** ince ikinci satır — "Dubai · AED" gibi */
  alt?: ReactNode;
  /** künyenin büyük bayrağı ve `yol` varsa seçili olan */
  ulke?: CountrySlug;
  yol?: { ulke: CountrySlug; href: string }[];
  /** ülke yolu olmayan araçta sağ uca konan şey (rozet, sayaç) */
  sag?: ReactNode;
}) {
  return (
    <div className="ta-kunye">
      <p className="ta-kunye-b">
        {ulke && <BayrakDisk ulke={ulke} boy="l" bicim="kart" />}
        <span className="ta-kunye-y">
          <span className="ta-kunye-t">{ad}</span>
          {alt && <span className="ta-kunye-a">{alt}</span>}
        </span>
      </p>

      {yol && yol.length > 0 && (
        <ul className="ta-yol">
          {yol.map((s) => {
            const on = s.ulke === ulke;
            return (
              <li key={s.ulke}>
                <Link
                  href={s.href}
                  scroll={false}
                  className="ta-yol-a"
                  data-on={on ? "" : undefined}
                  aria-current={on ? "page" : undefined}
                >
                  <BayrakDisk ulke={s.ulke} boy="s" bicim="kart" />
                  {COUNTRY_NAME[s.ulke]}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {sag}
    </div>
  );
}

/* ---------------------------------------------------------------- TEZGÂH
   Aracın TEK paneli. Başlık satırı iki şey taşıyor: solda kicker (ikon +
   tek etiket, aracın ne gösterdiğini söyleyen), sağda aracın İKİNCİ
   DEĞİŞKENİ (kurumlar vergisinde dönem çipleri). İkinci değişkeni olmayan
   araçta `sag` verilmiyor ve köşe boş kalmıyor — kicker tek başına duruyor.

   Panelin içindeki blokların arası CSS'te tek tek verilmiş (margin), ortak
   bir `gap` değil: bantla bölüşüm arası (24) ile girdiyle hazır çipler arası
   (18) aynı olmamalı; A2'de ölçülen ritim bu. */
export function Tezgah({
  kicker,
  sag,
  children,
}: {
  kicker?: ReactNode;
  sag?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="ta-tezgah">
      {(kicker || sag) && (
        <div className="ta-tezgah-h">
          {kicker && <p className="ta-kicker">{kicker}</p>}
          {sag && <div className="ta-tezgah-n">{sag}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ ÇİP
   Pil biçiminde seçenek. AÇILIR KUTU YOK (tuzaklar.md kural 9): görünür çip
   + üstünde şeffaf yerli radyo; klavye ve grup davranışı tarayıcıdan.
   Radyonun adı AÇIKÇA veriliyor — etiketsiz radyo bu depoda erişilebilirlik
   ağacında "on" diye okundu (tuzak G).

   NEDEN İKİ SATIRLIK KUTU DEĞİL: eski dilin `Secenek`i (disk + başlık +
   ipucu, artık silindi) tezgâhın başlık satırına sığmıyordu; asıl girdinin
   yanında ikinci bir kutu da hangisinin asıl girdi olduğunu
   belirsizleştiriyordu (A2'de ölçülerek elendi). Çip tek satırlık bir pil,
   yani fark sunum değil YÜK. */
export function Cipler({ ad, children }: { ad: string; children: ReactNode }) {
  return (
    <div className="ta-cipler" role="group" aria-label={ad}>
      {children}
    </div>
  );
}

export function Cip({
  ad,
  secili,
  onSec,
  ikon,
  baslik,
  ipucu,
}: {
  /** radyo grubunun adı — aynı gruptaki çiplerde aynı */
  ad: string;
  secili: boolean;
  onSec: () => void;
  ikon?: ReactNode;
  baslik: string;
  ipucu?: string;
}) {
  return (
    <label className="ta-cip" data-on={secili ? "" : undefined}>
      <input
        type="radio"
        name={ad}
        checked={secili}
        onChange={onSec}
        aria-label={ipucu ? `${baslik}. ${ipucu}` : baslik}
      />
      {ikon && (
        <span className="ta-cip-i" aria-hidden="true">
          {ikon}
        </span>
      )}
      {baslik}
      <span className="ta-cip-m" aria-hidden="true">
        <Check size={12} strokeWidth={2.8} />
      </span>
    </label>
  );
}

/* ------------------------------------------------------------ GİRDİ SATIRI
   Referansın tek satırı, araç ölçüsünde: etiket · geniş kutu · (varsa) sürgü.
   `surgulu` sütun şablonunu değiştiriyor; sürgüsü olmayan araçta üçüncü
   sütun hiç açılmıyor ve kutu satırın kalanını alıyor.

   Çıplak `1fr` YOK, `minmax(0, 1fr)` (tuzak B): sürgünün doğal genişliği iz
   çekiyor ve auto minimum dar ekranda satırı taşırıyor — tax.css'te tam bu
   ölçülmüş (320 px'te 27 px yatay kayma). */
export function GirdiSatiri({ surgulu, children }: { surgulu?: boolean; children: ReactNode }) {
  return (
    <div className="ta-ctl" data-surgulu={surgulu ? "" : undefined}>
      {children}
    </div>
  );
}

/* Etiket + kutu, iki ızgara hücresi (parça değil FRAGMAN döndürüyor ki
   ızgara sütunları GirdiSatiri'nde kalsın).

   type="number" DEĞİL: tarayıcının ayrım işareti davranışı Türkçe binlik
   noktasıyla çakışıyor; inputMode="decimal" mobilde sayı klavyesi açıyor.
   `tarif` kutunun açıklamasının id'si: okunamayan girdide çağıran yer bunu
   hata satırına çevirip cümleyi hem ekranda hem ağaçta tek yerden veriyor. */
export function Girdi({
  id,
  no,
  etiket,
  ek,
  ikon,
  birim,
  deger,
  onDeger,
  hata,
  tarif,
  ipucu,
}: {
  id: string;
  /** "01" gibi sıra işareti; tek girdili araçta "burası girdi" demek */
  no?: string;
  etiket: ReactNode;
  /** etiketin sönük kuyruğu, örneğin " (AED)" */
  ek?: ReactNode;
  ikon?: ReactNode;
  birim?: ReactNode;
  deger: string;
  onDeger: (v: string) => void;
  hata?: boolean;
  tarif?: string;
  /** yazı alanının kendi ipucu metni (placeholder) */
  ipucu?: string;
}) {
  return (
    <>
      <label className="ta-etiket" htmlFor={id}>
        {no && (
          <span className="ta-no" aria-hidden="true">
            {no}
          </span>
        )}
        <span>
          {etiket}
          {/* Boşluk parantezin İÇİNDE: dışarıda metin olarak durunca
              erişilebilir ad "kazanç(AED)" diye bitişik okunuyor. */}
          {ek && <span className="ta-etiket-x">{ek}</span>}
        </span>
      </label>

      <div className="ta-kutu" data-hata={hata ? "" : undefined}>
        {ikon && (
          <span className="ta-kutu-i" aria-hidden="true">
            {ikon}
          </span>
        )}
        <input
          id={id}
          className="ta-girdi-b"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={ipucu}
          value={deger}
          onChange={(e) => onDeger(e.target.value)}
          aria-describedby={tarif}
          aria-invalid={hata || undefined}
        />
        {birim && (
          <span className="ta-birim-b" aria-hidden="true">
            {birim}
          </span>
        )}
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- SÜRGÜ
   Sayının ölçeği. YALNIZ BİR SAYI ÜZERİNDE ANLAMLI — arama kutusunun ya da
   aday listesinin sürgüsü olmaz; o araçlarda bu parça basılmıyor.

   `isaretler` ölçeğin üstündeki sınır çizgileri: aracın anlattığı kuralın
   (eşik, alt/üst sınır) ölçekte NEREDE durduğu. Sol kenar 11 px kaydırılıp
   genişlik 22 px daraltıldı çünkü başparmak 22 px ve uçlarda merkezi rayın
   ucuna değil yarım başparmak içeride duruyor; düzeltme olmadan işaret %0 ve
   %100'de iki tarafa 11 px kayıyor (A2'de ölçüldü).

   İşaretin YAZISI 560 px altında gizleniyor (CSS), çizgisi kalıyor: dar
   ekranda ölçek kısalıyor ve iki işaretin yazısı hem birbirine hem rayın
   dışına taşıyordu. Sayı kaybolmuyor — kural cümlesinde ve dökümde yazılı. */
export function Surgu({
  etiket,
  deger,
  ust,
  adim,
  onDeger,
  degerYazi,
  isaretler,
  solUc,
  sagUc,
}: {
  /** sürgünün erişilebilir adı */
  etiket: string;
  deger: number;
  ust: number;
  adim: number;
  onDeger: (n: number) => void;
  /** ekran okuyucuya okunan biçimli değer */
  degerYazi: string;
  isaretler?: { oran: number; etiket: string }[];
  solUc: ReactNode;
  sagUc: ReactNode;
}) {
  return (
    <div className="ta-surgu">
      {isaretler?.map((i) => (
        <span
          key={i.etiket}
          className="ta-esik"
          style={oranStil("--ta-x", i.oran)}
          aria-hidden="true"
        >
          <i />
          <b>{i.etiket}</b>
        </span>
      ))}
      <input
        className="ta-range"
        type="range"
        min={0}
        max={ust}
        step={adim}
        value={deger}
        onChange={(e) => onDeger(Number(e.target.value))}
        aria-label={etiket}
        aria-valuetext={degerYazi}
        style={{ "--ta-p": `${(deger / ust) * 100}%` } as CSSProperties}
      />
      <p className="ta-surgu-u">
        <span>{solUc}</span>
        <span>{sagUc}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ HAZIR ÇİPLER
   Örnek girdiler. DÜĞME, bağlantı değil: sayfayı değiştirmiyor, kutuyu
   dolduruyor. Seçili olan işaretli ki kişi kendi yazdığı sayıyla çipten
   geleni ayırt edebilsin. Değerler bir İDDİA değil (hiçbiri "tipik" demiyor),
   aracın gösterdiği aralığın uçlarını ve kırılma noktalarını taşıyorlar. */
export function Hazirlar({
  baslik = "Hazır tutarlar",
  degerler,
  secili,
  onSec,
  yaz,
}: {
  baslik?: string;
  degerler: number[];
  secili: number | null;
  onSec: (n: number) => void;
  yaz: (n: number) => string;
}) {
  return (
    <div className="ta-hazir">
      <span className="ta-hazir-k">{baslik}</span>
      {degerler.map((h) => (
        <button
          key={h}
          type="button"
          className="ta-hazir-b"
          data-on={secili === h ? "" : undefined}
          onClick={() => onSec(h)}
        >
          {yaz(h)}
        </button>
      ))}
    </div>
  );
}

/* Girdinin altındaki tek yardım satırı. */
export function Yardim({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="ta-yardim">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------- BANT
   CEVAP. Sayfadaki TEK koyu yüzey ve bir BANT: yan sütun değil, tezgâhın
   içinde tek satır. Müşterinin reddettiği şey koyu yüzeyin kendisi değil,
   her şeyin içinde döndüğü sağ panel kurgusuydu; bant o kurguyu kurmadan
   istenen kontrastı veriyor.

   role="status" KABI HEP DOM'DA: canlı bölge sonradan eklenirse ekran
   okuyucu ilk duyuruyu yutuyor.

   DUYURU MESELESİ. `duyuru` verilirse görünen blok aria-hidden oluyor ve
   duyurulan şey o tek cümle: Sayac'ın ara kareleri ve halkanın rakamı ağaca
   hiç gitmiyor. `duyuru` verilmezse (metin taşıyan bant, örneğin KKTC'nin
   karar cümlesi) blok görünür kalıyor ve metnin kendisi okunuyor — aynı
   cümleyi iki kez yazmamak için.

   `gosterge` SÜS (aria-hidden): halka, rozet gibi şeyler. `eylem` ise
   ETKİLEŞİMLİ (bağlantı, düğme) ve asla gizlenmiyor — gizlenseydi klavyeyle
   ulaşılabilen ama ağaçta adı olmayan bir hedef doğardı. */
export function Bant({
  ikon,
  kicker,
  alt,
  gosterge,
  eylem,
  duyuru,
  children,
}: {
  ikon?: ReactNode;
  kicker: ReactNode;
  /** büyük değerin altındaki tek cümle */
  alt?: ReactNode;
  gosterge?: ReactNode;
  eylem?: ReactNode;
  duyuru?: string;
  children: ReactNode;
}) {
  return (
    <div className="ta-bant" role="status" aria-live="polite">
      <span className="ta-bant-isik" aria-hidden="true" />

      <div className="ta-bant-s" aria-hidden={duyuru ? "true" : undefined}>
        <p className="ta-bant-k">
          {ikon}
          {kicker}
        </p>
        <p className="ta-bant-n">{children}</p>
        {alt && <p className="ta-bant-a">{alt}</p>}
      </div>

      {gosterge && (
        <div className="ta-bant-g" aria-hidden="true">
          {gosterge}
        </div>
      )}
      {eylem && <div className="ta-bant-e">{eylem}</div>}

      {/* Görünmez METİN, aria-label DEĞİL: rolsüz öğede aria yayımlanmıyor
          (tuzak G-2). */}
      {duyuru && <span className="sr-only">{duyuru}</span>}
    </div>
  );
}

/* --------------------------------------------------------------- BÖLÜŞÜM
   Bir bütünün parçaları: başlık satırı, tek büyük rakam ve tek çubuk.
   Referansın "Örnek dağılım" şeridi. YALNIZ PAYI OLAN ARAÇTA anlamlı —
   bölünecek bir bütün yoksa basılmıyor.

   Etiket ÜSTTE, rakam altında: ikisi satırın iki ucuna dağıtılınca 1120
   px'lik kapta aralarında 700 px boşluk kalıyor ve rakam kendi etiketinden
   kopuyordu (A2'de ölçüldü).

   `not` üç işi birden yapıyor: hesabın cümlesi, boş kutunun daveti ve
   okunamayan girdinin gerekçesi. Hata için ayrı bir kutu açmak bölüme
   dördüncü bir blok eklerdi; aynı satırın kırmızı hâli yeterli ve kutunun
   tarifi buraya bağlanıyor (Girdi · `tarif`). */
export function Bolusum({
  baslik,
  ustbilgi,
  kalem,
  paylar,
  not,
}: {
  baslik: string;
  ustbilgi?: ReactNode;
  kalem?: { etiket: string; ton: "mavi" | "koyu"; bos?: boolean; deger: ReactNode };
  paylar: { oran: number; ton: "mavi" | "koyu" }[];
  not?: { id?: string; hata?: boolean; metin: ReactNode };
}) {
  return (
    <div className="ta-serit">
      <p className="ta-serit-h">
        <span>{baslik}</span>
        {ustbilgi && <span className="ta-serit-v">{ustbilgi}</span>}
      </p>

      {kalem && (
        <p className="ta-kalan" aria-hidden="true">
          <span className="ta-kalan-k">
            <i data-ton={kalem.ton} />
            {kalem.etiket}
          </span>
          {/* Boş hâlde büyük mavi bir tire "sonuç" gibi okunuyordu; boşluğun
              kendi sönük biçimi var. */}
          <b className="ta-kalan-v" data-bos={kalem.bos ? "" : undefined}>
            {kalem.deger}
          </b>
        </p>
      )}

      <span className="ta-cubuk" aria-hidden="true">
        {paylar.map((p, i) => (
          <span key={i} className="ta-cubuk-p" data-ton={p.ton} style={oranStil("--ta-w", p.oran)} />
        ))}
      </span>

      {not && (
        <p id={not.id} className="ta-serit-e" data-hata={not.hata ? "" : undefined}>
          {not.metin}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- SATIRLAR
   "Nasıl çıktı" dökümü: satır · mini çubuk · sağda değer. Gerçek <dl>,
   çünkü satırın adı ile değeri arasındaki ilişki "terim · değer".

   MİNİ ÇUBUKLAR TEK ÖLÇEKTE: hepsi aynı bütüne (kazanç/kâr) oranlı, kendi
   aralarında göreli DEĞİL. Göreli ölçek küçük dilimi olduğundan büyük
   gösterirdi; referansın kıyas çubuklarındaki karar da bu (tax.css · .txm-mini).

   `toplam` satırı satırların toplamı olmalı — "kalan" gibi başka bir sayı
   değil. A2'de ilk yazımda toplam satırında "vergi sonrası kalan" duruyordu
   ve döküm TOPLANMIYORDU; aynı sayının iki adı vardı. */
export function Satirlar({ children }: { children: ReactNode }) {
  return <dl className="ta-satirlar">{children}</dl>;
}

export function Satir({
  ikon,
  baslik,
  alt,
  oran,
  ton = "koyu",
  deger,
  birim,
  toplam,
}: {
  ikon: ReactNode;
  baslik: ReactNode;
  alt?: ReactNode;
  oran: number;
  ton?: "acik" | "mavi" | "koyu";
  deger: ReactNode;
  birim?: ReactNode;
  toplam?: boolean;
}) {
  return (
    <div className="ta-satir" data-toplam={toplam ? "" : undefined}>
      <dt>
        <IkonDisk boy="m">{ikon}</IkonDisk>
        <span className="ta-satir-b">
          <span className="ta-satir-t">{baslik}</span>
          {alt && <span className="ta-satir-a">{alt}</span>}
        </span>
      </dt>
      <span className="ta-mini" aria-hidden="true">
        <span data-ton={ton} style={oranStil("--ta-w", oran)} />
      </span>
      <dd>
        <b>{deger}</b>
        {birim && <span className="ta-satir-c">{birim}</span>}
      </dd>
    </div>
  );
}

/* ------------------------------------------------------------------- DİP
   Kapanış: solda tahmin ibaresi, sağda soru çıkışı. Referansın .txm-foot'u. */
export function Dip({ not, children }: { not?: ReactNode; children?: ReactNode }) {
  return (
    <div className="ta-dip">
      {not && <p className="ta-dip-t">{not}</p>}
      {children}
    </div>
  );
}
