import {
  ArrowRight,
  FileSpreadsheet,
  Hash,
  Percent,
  SearchCheck,
  Sparkles,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import { NAV_TOOLS } from "@/lib/tools/catalog";
import type { ToolId } from "@/lib/tools/catalog";

/* ============================================================================
   /lab/nav-araclar · NAVBAR'DAKİ ARAÇLAR PANELİ
   CSS: css/lab-nav-arac.css (.lna-)

   18.09.2026 · Burak: "navbardaki araçları sunuş şeklimiz pek okey değil onu
   tam olarak beğenemiyorum aşırı karışık duruyor ve her şey çorba gibi bir
   arada. kimisi 2 satır, kimisi 1 satır fln öyle bi dengesizlikte var amk."

   ÖLÇÜLEN SORUN (bugünkü panel, 1440px):
     · yedi kart 4x2 ızgarada, sekizinci göz boş kalıyor;
     · başlıkların üçü iki satır ("Dubai kurumlar vergisi hesaplayıcı",
       "İngiltere kurumlar vergisi hesaplayıcı", "İngiltere şirket ismi
       sorgulama"), dördü tek satır;
     · künyelerin ikisi iki satır, beşi tek satır;
     · yani sekiz kartın hiçbiri aynı yükseklikte değil ve ızgara tırtıklı.
   İki satıra çıkan başlıkların HEPSİNDE ilk kelime ülke adı: dengesizliğin
   kaynağı araç adları değil, her ada tekrar tekrar yazılan ülke.

   ÜÇ YÖN — üçü de AYNI YEDİ ARACI basıyor, kayıt defterinden (catalog.ts):
     N1 · ÜLKEYE GÖRE   Ülke adı satırdan çıkıp SÜTUN BAŞLIĞINA taşınıyor:
                        Dubai (2), İngiltere (3), üç ülke için (2). Araç adları
                        kısalıyor ve hepsi tek satıra iniyor. "Çorba" dağılıyor
                        çünkü ziyaretçi önce ülkesini buluyor.
     N2 · MİNİK KUTU    Satır yüksekliği sabit ve tek satır — ama ayıran şey
                        çizgi DEĞİL, her satırın kendi kutusu. Burak: "n2 deki
                        gibi daha minik yapma fikri güzel fakat tasarımlarında
                        uyması için yine box içine alman lazım onları. araya
                        çizgi atarak ayırma yani o bize uymuyor." İki sütun,
                        her kutuda ikon + ad + künye aynı hizada.
     N3 · HİZALI KART   Bugünkü kart dili duruyor, düzeltilen üç şey: ülke adı
                        başlıktan çıkıp küçük bir çipe geçiyor, künye tek
                        satıra kırpılıyor, kartlar eşit yükseklikte. Boş sekizinci
                        göze "Tüm araçlar" giriyor.

   Panel çerçevesi (.lna-panel) canlı panelin ölçüleriyle: aynı genişlik, aynı
   dolgu, aynı etek. Adaylar o çerçevenin İÇİNDE kıyaslanıyor.
   ========================================================================= */

const IKON: Record<string, LucideIcon> = {
  "kurumlar-vergisi-dubai": Percent,
  "kurumlar-vergisi-ingiltere": Percent,
  "bae-kdv": FileSpreadsheet,
  "uygunluk-testi": SlidersHorizontal,
  "isim-ureteci": Sparkles,
  "ingiltere-isim-sorgulama": SearchCheck,
  "ingiltere-sic-kodu": Hash,
};

type Arac = {
  id: ToolId;
  href: string;
  tamAd: string;
  kisaAd: string;
  kunye: string;
  kisaKunye: string;
  Ikon: LucideIcon;
};

/** "Dubai kurumlar vergisi hesaplayıcı" → "Kurumlar vergisi hesaplayıcı".
 *  Ülke adı sütun başlığına ya da çipe taşındığı için addan düşüyor; baş harf
 *  büyütülüyor ki satır cümle gibi başlasın. */
function adiKisalt(ad: string): string {
  const k = ad.replace(/^(Dubai|BAE|İngiltere|KKTC)\s+/, "");
  return k === ad ? ad : k.charAt(0).toLocaleUpperCase("tr-TR") + k.slice(1);
}

/** "Dubai · 375.000 AED'ye kadar %0" → "375.000 AED'ye kadar %0" */
const kunyeKisalt = (m: string) => m.replace(/^(Dubai|BAE|İngiltere|KKTC|Üç ülke(\s+için)?)\s*·\s*/, "");

const ARACLAR: Arac[] = NAV_TOOLS.map((t) => ({
  id: t.id,
  href: t.href,
  tamAd: t.title,
  kisaAd: adiKisalt(t.title),
  kunye: t.meta,
  kisaKunye: kunyeKisalt(t.meta),
  Ikon: IKON[t.id] ?? SlidersHorizontal,
}));

const bul = (id: string) => ARACLAR.find((a) => a.id === id)!;

/* Gruplar kayıt defterindeki `country` alanından okunabilirdi; burada elle
   yazılı olmalarının tek sebebi SIRA: her sütunda önce hesaplayıcı, sonra
   karar aracı. catalog.ts o sırayı ülke içinde tutmuyor. */
const GRUPLAR: { ad: string; ulke?: "dubai" | "ingiltere"; ids: string[] }[] = [
  { ad: "Dubai", ulke: "dubai", ids: ["kurumlar-vergisi-dubai", "bae-kdv"] },
  {
    ad: "İngiltere",
    ulke: "ingiltere",
    ids: ["kurumlar-vergisi-ingiltere", "ingiltere-isim-sorgulama", "ingiltere-sic-kodu"],
  },
  { ad: "Üç ülke için", ids: ["uygunluk-testi", "isim-ureteci"] },
];

/** Canlı panelin çerçevesi: aynı genişlik, aynı dolgu, aynı etek. */
function Panel({ ad, not, children }: { ad: string; not: string; children: React.ReactNode }) {
  return (
    <section className="lna-blok">
      <div className="container-o">
        <p className="lna-etiket">{ad}</p>
        <p className="lna-not">{not}</p>
        <div className="lna-panel">
          {children}
          <div className="lna-foot">
            <span className="lna-foot-q">
              Araçların çıktısı bir ön değerlendirmedir, teklif değildir.
            </span>
            <span className="lna-foot-a">
              <span className="lna-foot-l">Ülke karşılaştırma</span>
              <span className="lna-foot-l" data-strong="">
                Tüm araçlar
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================== N1 · ÜLKEYE GÖRE SÜTUN */
export function NavAracN1() {
  return (
    <Panel
      ad="N1 · Ülkeye göre üç sütun"
      not="Ülke adı satırdan çıkıp sütun başlığına taşındı; yedi ad da tek satıra indi. Ziyaretçi önce ülkesini buluyor, sonra aracı."
    >
      <div className="lna-ulke">
        {GRUPLAR.map((g) => (
          <div key={g.ad} className="lna-ulke-kol">
            <p className="lna-ulke-bas">
              {g.ulke ? (
                <span className="lna-bayrak" aria-hidden="true">
                  <Flag country={g.ulke} />
                </span>
              ) : null}
              {g.ad}
            </p>
            <ul className="lna-ulke-list">
              {g.ids.map((id) => {
                const a = bul(id);
                return (
                  <li key={id}>
                    <span className="lna-ic" aria-hidden="true">
                      <a.Ikon size={15} strokeWidth={2} />
                    </span>
                    <span>
                      <b>{a.kisaAd}</b>
                      <i>{a.kisaKunye}</i>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ========================================================= N2 · DÜZ LİSTE */
export function NavAracN2() {
  return (
    <Panel
      ad="N2 · Minik kutu, iki sütun"
      not="Satırlar minik ve tek satır ama ayıran şey çizgi değil, her satırın kendi kutusu — sitenin kart dilinden çıkmıyor. Kutu yüksekliği sabit, yani tırtık imkânsız."
    >
      <ul className="lna-duz">
        {ARACLAR.map((a) => (
          <li key={a.id}>
            <span className="lna-ic" aria-hidden="true">
              <a.Ikon size={15} strokeWidth={2} />
            </span>
            <b>{a.tamAd}</b>
            <i>{a.kisaKunye}</i>
          </li>
        ))}
        {/* Yedi araç iki sütunda 4+3 diziliyor; sekizinci kutu panelin çıkışı
            oluyor, böylece ızgarada delik kalmıyor (N3'teki kararla aynı). */}
        <li data-cikis="">
          <span className="lna-ic" aria-hidden="true">
            <ArrowRight size={15} strokeWidth={2} />
          </span>
          <b>Tüm araçlar</b>
          <i>{ARACLAR.length} araç, her biri kendi sayfasında</i>
        </li>
      </ul>
    </Panel>
  );
}

/* ====================================================== N3 · HİZALI KART */
export function NavAracN3() {
  return (
    <Panel
      ad="N3 · Bugünkü kart, hizalanmış"
      not="Kart dili duruyor. Ülke adı başlıktan çıkıp çipe geçti, künye tek satıra kırpıldı, kartlar eşit yükseklikte; boş sekizinci göze çıkış girdi."
    >
      <div className="lna-kart">
        {ARACLAR.map((a) => {
          const ulke = /^Dubai|^BAE/.test(a.tamAd)
            ? "Dubai"
            : /^İngiltere/.test(a.tamAd)
              ? "İngiltere"
              : "Üç ülke";
          return (
            <span key={a.id} className="lna-kart-k">
              <span className="lna-ic" aria-hidden="true">
                <a.Ikon size={15} strokeWidth={2} />
              </span>
              <span className="lna-kart-cip">{ulke}</span>
              <b>{a.kisaAd}</b>
              <i>{a.kisaKunye}</i>
            </span>
          );
        })}
        <span className="lna-kart-k" data-cikis="">
          <span className="lna-ic" aria-hidden="true">
            <ArrowRight size={15} strokeWidth={2} />
          </span>
          <span className="lna-kart-cip">Hepsi</span>
          <b>Tüm araçlar</b>
          <i>{ARACLAR.length} araç, her biri kendi sayfasında</i>
        </span>
      </div>
    </Panel>
  );
}
