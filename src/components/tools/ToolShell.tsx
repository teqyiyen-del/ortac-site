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
import { siblingsOf, type ToolEntry, type ToolId } from "@/lib/tools/catalog";
import { formatAmount, formatPercent } from "@/lib/tools/num";

/* ============================================================================
   ARAÇ KABUĞU + ARAÇ DİLİ · ad alanı .ta- · CSS: src/app/css/araclar.css
   ============================================================================

   11.09.2026 · ARAÇ DİLİ TURU. Müşteri: "araçlarda ok gibi ama tasarımlar
   fena kötü kral biraz icondur, bayraktır, kontrasttır bir şeyler ekle.
   mesela ülke uygunluk testimiz bence güzeldi onu beğeniyordum kral …
   bide biraz daha dinamizm ekle şunlara karman çorman amk hepsi."

   REFERANS UYGUNLUK TESTİ (FitTest.tsx · fittest.css). Neden beğenildiğine
   dair bu turun cevabı — ekranda görülerek, iki dosya okunarak:
     1. TEK KOMPOZİSYON. İki panelli tek kart: solda beyaz çalışma alanı,
        sağda gece "defter". Göz nereye yazacağını ve sonucun nerede
        biriktiğini ilk bakışta ayırıyor; araçlarda form ile sonuç aynı gri
        kutu ağırlığındaydı.
     2. HER ŞEYİN BİR İŞARETİ VAR. Sorunun ikon diski, şıkların harf/ikon
        diski, defter satırlarının diskleri, ülkelerin bayrağı. Metin azalıyor
        çünkü işaret okunuyor.
     3. KÜNYE + SAYAÇ + SAÇ TELİ. "İşiniz · Bölüm 1/4 … 01 / 11" satırı ve
        altındaki ilerleme çizgisi, nerede olduğunu cümle kurmadan söylüyor.
     4. SONUÇ CANLI VE GÖRÜNÜR. Cevap verildikçe gece panelde çubuklar doluyor;
        araçlarda sonuç zaten canlıydı ama tek gri kutuda düz metin olarak
        değişiyordu, yani canlı olduğu görünmüyordu.
     5. YÜZEY SADE. Karar kayıtları, gerekçeler, uyarılar ekrana dökülmüyor;
        araçların altında üç-dört paragraf not vardı ("karman çorman").

   Bu dosya o beş kararın ARAÇLARA UYARLANMIŞ ORTAK HÂLİ. İki iş yapıyor:
     A) KABUK (default export): aracın bölümü, "ne değil" satırı, SSS ve
        kardeş araçlar. Her araç sayfası bunu çağırıyor.
     B) ARAÇ DİLİ (named export): iki panelli kartın parçaları. Araç
        bileşenleri bunları içeri alıp kendi durumlarıyla dolduruyor.
   Sözleşmenin tamamı ana oturuma dönen raporda ("ARAÇ DİLİ SÖZLEŞMESİ");
   özeti her parçanın başında.

   NEDEN "use client"
   B'deki Sayac bir kanca kullanıyor (useState/useEffect) ve araç
   bileşenlerinin hepsi istemci bileşeni. Parçaları ayrı bir dosyaya bölmek
   bu turun dosya listesinin dışındaydı. Kabuğun istemciye inmesinin bedeli
   küçük: defter (catalog.ts) ve SmartLink zaten her sayfada menüyle birlikte
   iniyor; eklenen tek şey birkaç fonksiyon. Sayfa dosyaları (sunucu) kabuğu
   düz, serileşebilen proplarla çağırıyor: `tool` bir nesne, `sss` dizge
   dizisi, `children` sunucuda çizilmiş düğüm.

   ALTI ARACIN ALTISI DA BU DİLDE (bütünlük denetimi turu · güncelleme).
   Bu yorum bir tur boyunca "KDV, SIC, isim sorgulama ve isim üreteci bu
   turda yeni dile geçmedi; kökleri hâlâ `.tl-app`" diyordu ve artık
   yanlıştı — dördü de aynı turda, ayrı ajanlarla taşındı. Ölçüldü: araç
   bileşenlerinin hiçbirinde `.tl-` sınıfı geçmiyor; o dil yalnız dolaşıma
   kapalı `/araclar` dizininde ve `/lab/muhasebe`'de yaşıyor (araclar.css'te
   164 `.tl-` kuralı duruyor ve dizin açılana kadar gerekli).

   BÜTÜNLÜK DENETİMİNİN ÖLÇTÜĞÜ (sekiz araç sayfası · 1440 px): kart 1120 px
   ve 758+360 sütun, köşe 28, beyaz panel dolgusu 36/36/32, gece panel
   26/22/22, künye 15/700, sayaç 16, adımlar arası 22, adım no ve başlığı
   15/700, sonuç sayısı 42/700, sonuç etiketi 11,5, açılır başlığı 16,
   kardeş kartı adı 15,5, bölüm dolgusu 112/112 — SEKİZİNDE DE BİREBİR AYNI.
   İkon diskleri de: xs 18 · s 28 · m 36 · l 44; glif adım başlığında 18,
   kardeş kartında 20, açılır özetinde 16, döküm satırında 14. Beş araç
   sayfasında sayılan 71 `.ta-ikon` glifinin 71'inde de hesaplanan
   `stroke-width` 1,9 px (site geneli %13'te kalıyor, durum.md · B12).
   Yani iskelet tutarlı; raporlanan farklar iskelette değil, aracın kendi
   doldurduğu yerlerde.
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

            <p className="ta-kardes-alt">
              <SmartLink href="/araclar" className="link-arrow">
                Bütün araçlar ve sırada bekleyenler
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
   B · ARAÇ DİLİ — parçalar
   ============================================================================ */

/* ------------------------------------------------------------ DİSKLER ----
   Uygunluk testinin iki disk ölçüsü burada sabit adlarla: soru diski 54,
   şık diski 44, defter diski 30, kalem diski 22. Araçlarda soru başlığı
   yok (her adım aynı ekranda), o yüzden en büyük disk 44.
     boy  xs 18 · s 28 · m 36 · l 44
     ton  acik (beyaz panel: --blue-100 zemin, --blue-900 glif, 6,26:1)
          gece (gece panel: #16304f zemin, #9cc6f5 glif, 7,52:1) */
export function IkonDisk({
  children,
  boy = "m",
  ton = "acik",
  akt,
}: {
  children: ReactNode;
  boy?: "xs" | "s" | "m" | "l";
  ton?: "acik" | "gece";
  /** aktarım zincirinin durağı mı (sırası CSS'te, .ta-kart kuralında) */
  akt?: boolean;
}) {
  return (
    <span className={akt ? "ta-ikon akt-durak" : "ta-ikon"} data-boy={boy} data-ton={ton} aria-hidden="true">
      {children}
    </span>
  );
}

/* TUZAK H — <Flag> çıplak <svg viewBox="0 0 60 40"> basıyor, width/height
   YOK; kapsız bırakılırsa 300×150'ye şişiyor ve bu depoda iki sayfayı bozdu.
   Kap SABİT PİKSEL + overflow: hidden, ölçüler .ta-bayrak[data-boy]'da. */
export function BayrakDisk({ ulke, boy = "m" }: { ulke: CountrySlug; boy?: "xs" | "s" | "m" | "l" }) {
  return (
    <span className="ta-bayrak" data-boy={boy} aria-hidden="true">
      <Flag country={ulke} />
    </span>
  );
}

/* ------------------------------------------------------------- KART ----
   İki panelli kart. `.akt` sınıfı aktarım kalıbının kabı (css/aktarim.css):
   fare kartın üstündeyken tur duruyor. Zincirin cümlesi araclar.css ·
   HAREKET bloğunda ("girdiğiniz tutar → defter → oran → sonuç"). */
export function AracKart({ children }: { children: ReactNode }) {
  return <div className="ta-kart akt">{children}</div>;
}

/* -------------------------------------------------------- ÇALIŞMA PANELİ
   Beyaz panel. Başında uygunluk testinin künye satırının karşılığı:
   solda aracın adı + ince alt künye ("Dubai · AED"), sağda araç ne verirse
   (sayaç, rozet). Altında saç teli ilerleme çizgisi — `ilerleme` 0..1,
   verilmezse çizgi basılmıyor. Çizgi SÜS (aria-hidden): ilerlemenin anlamını
   aracın kendi metni taşıyor. */
export function AracIs({
  baslik,
  alt,
  sag,
  ilerleme,
  children,
}: {
  baslik: string;
  alt?: ReactNode;
  sag?: ReactNode;
  ilerleme?: number;
  children: ReactNode;
}) {
  return (
    <div className="ta-is">
      <div className="ta-bas">
        <p className="ta-bas-t">
          {baslik}
          {alt && <span className="ta-bas-s">{alt}</span>}
        </p>
        {sag && <div className="ta-bas-n">{sag}</div>}
      </div>
      {ilerleme !== undefined && (
        <div className="ta-cizgi" aria-hidden="true">
          <span className="ta-cizgi-i" style={oranStil("--ta-w", ilerleme)} />
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- ADIM ----
   Çalışma panelinin bir adımı: ikon diski + "1 · Ülke" başlığı + tek satır
   ipucu, altında içerik.

   ADLANDIRMA İKİ YOLDAN. Adımın içinde tek bir metin alanı varsa
   (`etiketIcin` o alanın id'si) başlık <label> olarak basılıyor ve alanın adı
   oluyor. Yoksa kap role="group" + aria-labelledby: uygunluk testinde
   ölçülmüştü, <fieldset> + <legend> bu tarayıcıda ağaçta adlı bir grup
   üretmiyor (FitTest.tsx · Ask).

   `akt`: diski aktarım zincirinin ilk durağı yapar ("girdi"). Bir kartta
   yalnız bir adımda verilir. */
export function Adim({
  no,
  ikon,
  baslik,
  ipucu,
  etiketIcin,
  akt,
  children,
}: {
  no: number;
  ikon: ReactNode;
  baslik: ReactNode;
  ipucu?: ReactNode;
  etiketIcin?: string;
  akt?: boolean;
  children: ReactNode;
}) {
  const id = useId();
  const tId = `${id}-t`;
  /* Boşluklar METİN, CSS aralığı değil: erişilebilir ad satır içi
     öğeleri boşluksuz birleştiriyor ve ilk yazımda ad "3Aylık vergiye tabi
     kâr" diye okundu (tarayıcıda ölçüldü). Nokta süs, aria-hidden. */
  const metin = (
    <>
      <span className="ta-adim-no">{no}</span>{" "}
      <span className="ta-adim-ay" aria-hidden="true">
        ·
      </span>{" "}
      {baslik}
    </>
  );
  return (
    <div
      className="ta-adim"
      role={etiketIcin ? undefined : "group"}
      aria-labelledby={etiketIcin ? undefined : tId}
    >
      <div className="ta-adim-h">
        <IkonDisk boy="m" akt={akt}>
          {ikon}
        </IkonDisk>
        <span className="ta-adim-b">
          {etiketIcin ? (
            <label className="ta-adim-t" htmlFor={etiketIcin} id={tId}>
              {metin}
            </label>
          ) : (
            <span className="ta-adim-t" id={tId}>
              {metin}
            </span>
          )}
          {ipucu && <span className="ta-adim-p">{ipucu}</span>}
        </span>
      </div>
      <div className="ta-adim-g">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------ SEÇENEK ----
   Uygunluk testinin şıkkı (.uyg-opt) araç ölçüsünde: disk + başlık + ipucu +
   sağda onay diski. AÇILIR KUTU YOK (tuzaklar.md kural 9): yerli radyo
   kutunun üstünde şeffaf duruyor, klavye ve grup davranışı tarayıcıdan.
   Radyonun adı AÇIKÇA veriliyor: etiketsiz radyo bu depoda ağaçta "on" diye
   okundu (tuzak G). */
export function Secenekler({ children, sutun = 2 }: { children: ReactNode; sutun?: 2 | 3 }) {
  return (
    <div className="ta-secler" data-sutun={sutun}>
      {children}
    </div>
  );
}

export function Secenek({
  ad,
  secili,
  onSec,
  disk,
  baslik,
  ipucu,
}: {
  /** radyo grubunun adı — aynı gruptaki seçeneklerde aynı */
  ad: string;
  secili: boolean;
  onSec: () => void;
  /** diskin içi: ikon ya da tek harf */
  disk: ReactNode;
  baslik: string;
  ipucu?: string;
}) {
  return (
    <label className="ta-sec" data-on={secili ? "" : undefined}>
      <input
        type="radio"
        name={ad}
        checked={secili}
        onChange={onSec}
        aria-label={ipucu ? `${baslik}. ${ipucu}` : baslik}
      />
      <span className="ta-sec-d" aria-hidden="true">
        {disk}
      </span>
      <span className="ta-sec-b">
        <span className="ta-sec-t">{baslik}</span>
        {ipucu && <span className="ta-sec-h">{ipucu}</span>}
      </span>
      <span className="ta-sec-m" aria-hidden="true">
        <Check size={13} strokeWidth={2.8} />
      </span>
    </label>
  );
}

/* ---------------------------------------------------------- ÜLKE YOLU ----
   Ülke seçimi BAĞLANTI, radyo değil: her ülkenin kendi adresi var (kurumlar
   vergisi · app/araclar/kurumlar-vergisi/[ulke]) ve seçim adresi
   değiştiriyor. Görünüş seçenekle aynı aile (disk yerine bayrak).

   aria-current="page" <a>'da yayımlanıyor — rolsüz <span>'de yayımlanmadığı
   bu depoda ölçülmüştü (tuzak G).

   scroll={false}: ülke kartın içinde değişiyor; varsayılan davranış sayfayı
   başa kaydırıp ziyaretçiyi kartın dışına atardı. SmartLink yerine düz Link
   çünkü SmartLink'in tipi <a>'nın propları ve `scroll` onlardan biri değil;
   buraya gelen adresler zaten açık (lib/routes.ts · kurumlar vergisi
   döngüsü). */
export function UlkeYolu({
  aktif,
  secenekler,
}: {
  aktif: CountrySlug;
  secenekler: { ulke: CountrySlug; href: string; ipucu?: string }[];
}) {
  return (
    <ul className="ta-ulkeler">
      {secenekler.map((s) => {
        const on = s.ulke === aktif;
        return (
          <li key={s.ulke} className="ta-ulkeler-i">
            <Link
              href={s.href}
              scroll={false}
              className="ta-ulke"
              data-on={on ? "" : undefined}
              aria-current={on ? "page" : undefined}
            >
              <BayrakDisk ulke={s.ulke} boy="l" />
              <span className="ta-ulke-b">
                <span className="ta-ulke-t">{COUNTRY_NAME[s.ulke]}</span>
                {s.ipucu && <span className="ta-ulke-h">{s.ipucu}</span>}
              </span>
              <span className="ta-sec-m" aria-hidden="true">
                <Check size={13} strokeWidth={2.8} />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

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

/* ---------------------------------------------------------- GECE DEFTER ---
   Sağdaki gece panel: başlık satırı (disk + ad + sağda künye) ve altında
   araç ne verirse. Disk aktarım zincirinin ikinci durağı. */
export function AracDefter({
  ikon,
  baslik,
  sag,
  children,
}: {
  ikon: ReactNode;
  baslik: string;
  sag?: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside className="ta-defter" aria-label={baslik}>
      <p className="ta-defter-h">
        <span className="ta-ikon akt-durak ta-defter-i" data-boy="s" data-ton="gece" aria-hidden="true">
          {ikon}
        </span>
        <span className="ta-defter-t">{baslik}</span>
        {sag && <span className="ta-defter-s">{sag}</span>}
      </p>
      {children}
    </aside>
  );
}

/* --------------------------------------------------------------- SONUÇ ----
   Defterin büyük rakamı. role="status" + aria-live KAP HEP DOM'DA: canlı
   bölge sonradan eklenirse ekran okuyucu ilk duyuruyu yutuyor (eski .tl-out
   ile aynı gerekçe). İçinde Sayac varsa sayan rakam aria-hidden, son değer
   görünmez metin olarak okunuyor; yani ara kareler duyurulmuyor.

   `tetik`: değiştiğinde bir kez oynayan ışık (.ta-sonuc-isik). Anahtar
   değişince React düğümü söküp takıyor, CSS animasyonu baştan oynuyor —
   JS'te zamanlayıcı yok. Girişten sonuca akan aktarımın "şimdi" hâli bu;
   sürekli olanı aktarım zinciri. */
export function Sonuc({
  etiket,
  tetik,
  alt,
  children,
}: {
  etiket: string;
  tetik: string | number;
  alt?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="ta-sonuc" role="status" aria-live="polite">
      <span key={String(tetik)} className="ta-sonuc-isik" aria-hidden="true" />
      <span className="ta-sonuc-k">{etiket}</span>
      <p className="ta-sonuc-n">{children}</p>
      {alt && <p className="ta-sonuc-a">{alt}</p>}
    </div>
  );
}

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

/* ---------------------------------------------------------- PAY ÇUBUĞU ----
   Bir bütünün parçaları, yan yana (payların toplamı 1). Kurumlar vergisinde
   kazancın %0'lık ve %9'luk dilimleri. Çubuk SÜS: aynı bilgiyi yanındaki
   gösterge metni taşıyor. Genişlik değişince kayarak doluyor, ilk basışta
   soldan açılıyor (CSS). */
export function PayCubugu({
  parcalar,
}: {
  parcalar: { oran: number; ton: "sonuk" | "mavi" }[];
}) {
  return (
    <span className="ta-pay" aria-hidden="true">
      {parcalar.map((p, i) => (
        <span key={i} className="ta-pay-p" data-ton={p.ton} style={oranStil("--ta-w", p.oran)} />
      ))}
    </span>
  );
}

/* --------------------------------------------------------------- ÖLÇEK ----
   Bantlara bölünmüş bir eksen ve üstünde bir imleç: "hangi rejimdesiniz".
   Kurumlar vergisinde İngiltere'nin üç bandı (küçük kâr · marjinal indirim ·
   ana oran). Bant genişlikleri `pay` (göreli, fr), imleç 0..1. Eksen ve imleç
   SÜS; bantların adı ve aralığı gerçek metin (altındaki liste), hangi bantta
   olunduğunu da sonucun cümlesi yazıyor. Izgara sütunları minmax(0, …fr),
   çıplak fr yok (tuzak B). */
export function Olcek({
  bantlar,
  imlec,
  aktif,
}: {
  bantlar: { pay: number; ust: string; alt: string }[];
  imlec: number | null;
  aktif: number | null;
}) {
  const sablon = { gridTemplateColumns: bantlar.map((b) => `minmax(0, ${b.pay}fr)`).join(" ") };
  return (
    <div className="ta-olcek">
      <span className="ta-olcek-ray" style={sablon} aria-hidden="true">
        {bantlar.map((b, i) => (
          <span key={b.ust} className="ta-olcek-b" data-on={aktif === i ? "" : undefined} />
        ))}
        {imlec !== null && <span className="ta-olcek-i" style={oranStil("--ta-x", imlec)} />}
      </span>
      <ul className="ta-olcek-e" style={sablon}>
        {bantlar.map((b, i) => (
          <li key={b.ust} data-on={aktif === i ? "" : undefined}>
            <b>{b.ust}</b>
            <span>{b.alt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- DÖKÜM ----
   Defterin satırları: disk + ad + alt satır (hesap) + sağda tutar. Gerçek
   <dl>: satırın adı ile tutarı arasındaki ilişki "terim · değer". `toplam`
   satırı kalın ve üstünde ayraç; diski aktarım zincirinin son durağı. */
export function Dokum({ children }: { children: ReactNode }) {
  return <dl className="ta-dokum">{children}</dl>;
}

export function DokumSatir({
  ikon,
  etiket,
  alt,
  deger,
  toplam,
  yigin,
}: {
  ikon: ReactNode;
  etiket: ReactNode;
  alt?: ReactNode;
  deger: ReactNode;
  toplam?: boolean;
  /** değer uzun bir METİNSE (tutar değil) adın altına iner; yan yana
   *  dururken 300 px'lik panelde adı iki satıra kırıyordu (KKTC · beyan) */
  yigin?: boolean;
}) {
  return (
    <div
      className="ta-dokum-s"
      data-toplam={toplam ? "" : undefined}
      data-yigin={yigin ? "" : undefined}
    >
      <dt>
        <IkonDisk boy="s" ton="gece" akt={toplam}>
          {ikon}
        </IkonDisk>
        <span className="ta-dokum-b">
          <span className="ta-dokum-t">{etiket}</span>
          {alt && <span className="ta-dokum-a">{alt}</span>}
        </span>
      </dt>
      <dd>{deger}</dd>
    </div>
  );
}

/* Defterin dipnotu: tek satır, küçük. `uyari` kehribar glif alıyor (renk tek
   taşıyıcı değil, cümlenin kendisi uyarıyı söylüyor). */
export function DefterNot({ uyari, children }: { uyari?: boolean; children: ReactNode }) {
  return (
    <p className="ta-dnot" data-uyari={uyari ? "" : undefined}>
      {uyari && <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}

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
