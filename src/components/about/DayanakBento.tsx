import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  FileCheck2,
  FileText,
  IdCard,
  Landmark,
  RefreshCw,
} from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandChip } from "@/components/shared/BrandMark";
import Logo from "@/components/shared/Logo";
import { CHAIN, COUNTRY_NAME, type CountrySlug } from "@/lib/brand";
import {
  BASIS,
  DAYANAK,
  DAYANAK_IMZA,
  DAYANAK_ORTAK_DURUM,
  type DayanakKod,
} from "@/lib/about";

/* ============================================================================
   NEYE DAYANARAK ÇALIŞIYORUZ · BENTO                (hakkımızda · 1B)
   Veri: lib/about.ts · DAYANAK · Biçim: css/hakkimizda.css · 1B (.ab-dy-)

   21.09.2026 · /lab/hakkimizda-levha'nın dördüncü geçişinden N2 CANLIDA.
   Müşteri: "n2 okey ama 5 halkalı zincir boxuna ikna olamadım … başlık ve
   açıklamanın altında çok boşluk kalmış. Bide hepsinde uzun açıklamalar
   varken bundaki kısa kalmış, düzeltirsen bundan olur." İki düzeltme de
   canlıya geçerken yapıldı (cümle about.ts'te, ölçü hakkimizda.css'te).

   N2'NİN DİLİ: ÖNCE EKRAN, SONRA YAZI. Her karonun üstünde kırık beyaz bir
   çerçevenin içinde bir "sahne" duruyor — ürünün kendisine benzeyen küçük bir
   ekran (takip panosu, harita kesiti, belge). Başlık ve cümle onun altında.
   Ana sayfadaki bentoyla (TrustLayer.tsx) aynı aile: orada da karoların içi
   diyagram değil ekran, ve içleri gerçek içerikle dolu.

   SAHNELER DEKOR, BİLGİ DEĞİL: hepsi aria-hidden. Karonun iddiası başlıkta ve
   cümlede, ikisi de gerçek metin. Ekran okuyucu "5 halkalı zincir. Kuruluştan
   oturum ve vizeye kadar …" diye okuyor; panonun beş satırını ikinci kez
   duymuyor.

   SAHNELERİN İÇİ GERÇEK VERİ, UYDURMA DEĞİL:
     zincir  → CHAIN'in label alanı; solda bizim işaretimiz
     ofis    → COUNTRY_NAME ve bayraklar (CountryPicker · Flag)
     geçmiş  → dosya türleri 30 yıl kartının CÜMLESİNDEN ayrıştırılıyor
     ortak   → IFZA'nın ve bizim gerçek işaretimiz (BrandChip · Logo)
     lisans  → belgenin gövdesi GRİ SATIR (bir belgenin biçimi, içeriği değil):
               numara, tarih, kurum adı basılmıyor; imza çizgisi gerçek bir
               imza değil. Ad ve sıfat lisans kartının kendi cümlesinden.

   SUNUCU BİLEŞENİ. Giriş hareketi FadeUp'ta (istemci). Sahnelerde tek
   sürekli hareket zincir sahnesindeki ışık akışı (22.09.2026) ve o saf CSS
   (aktarım sözleşmesi): JS yok, useReducedMotion render ağacına hiç girmiyor
   (tuzak A), hareket azaltma tercihinde hiç kurulmuyor. */

/* ---------------------------------------------------------------- VERİLER */

/* 30 yıl kartının cümlesinden: "Kuruluş, lisans yenileme, muhasebe, beyan ve
   banka dosyası; hepsi …" → noktalı virgüle kadar olan kısım, virgül ve "ve"
   ile bölünüyor. Elle ikinci bir liste yazılsaydı cümle değiştiği gün pano
   eski listeyi basardı. İkon dizisi sırayla eşleşiyor; liste uzarsa fazlası
   genel belge ikonunu alıyor, patlamıyor. */
const GECMIS = BASIS.cards.find((c) => c.icon === "history");
const DOSYALAR = (GECMIS?.s ?? "")
  .split(";")[0]
  .split(/, | ve /)
  .map((d) => d.trim())
  .filter(Boolean)
  .map((d) => d.charAt(0).toLocaleUpperCase("tr") + d.slice(1));
const DOSYA_IKON: LucideIcon[] = [FileText, RefreshCw, Calculator, FileCheck2, Landmark];

/* Harita kesitindeki konumlar enlem-boylam DEĞİL (kesit bir harita değil,
   olmayan bir hassasiyet iddia etmiyor) ama keyfî de değil: batıdan doğuya,
   kuzeyden güneye. Ana sayfadaki kürenin işaretleri de aynı mantıkla dizili
   (shared/Authority.tsx). */
const KONUM: { c: CountrySlug; x: number; y: number }[] = [
  { c: "ingiltere", x: 24, y: 30 },
  { c: "kktc", x: 52, y: 56 },
  { c: "dubai", x: 76, y: 80 },
];

/* ---------------------------------------------------------------- SAHNELER */

/** Tek ekip: solda bizim işaretimiz, sağda beş halka, aralarında kavisli
 *  bağlar. Karonun cümlesinin çizimi: zincirin her halkası AYNI EKİPTE.
 *
 *  22.09.2026 · /lab/zincir-sahne'nin Z2'si. Bir gün önceki takip panosu
 *  (çubuk + beş nokta + beş ad) Burak'a göre "hala kötü duruyordu": genel bir
 *  adım göstergesi gibi okunuyor ve cümleyi anlatmıyordu. Burak Z2'yi seçti
 *  ("iş görür o") ve sol kartı sadeleştirdi: "solda sadece ortac logosu olsa
 *  … tek ekip bile yazmayabilir." Yazı YOK: karonun başlığı ve cümlesi zaten
 *  "aynı ekipte" diyor, kartta üçüncü kez söylenmiyor.
 *
 *  Dil muhasebe sayfasındaki defter görselinin (tek kaynaktan kavisli bağlar)
 *  aynısı. Bağların dikey merkezleri beş satırın merkezleriyle aynı: satır
 *  36, ara 10; merkezler aşağıda CHAIN.length'ten hesaplanıyor.
 *
 *  HAREKET aktarım sözleşmesiyle (css/aktarim.css): ışık merkezden sırayla
 *  her halkaya akıyor. Saf CSS, sunucu bileşeni kalıyor, reduce altında yok.
 *  Durak sırası ve renkler hakkimizda.css · 1B · HAREKET'te. */
/* 23.09.2026 · zincir dört halka ("Uyum" çıktı, brand.ts · CHAIN). Bağlar
   artık CHAIN.length'ten türüyor: satır 36, ara 10 → merkezler 18 + 46k,
   liste boyu 46n − 10 (dört halkada 174), bağların buluştuğu yer tam orta.
   CSS'teki kutu boyu (hakkimizda.css · .ab-dy-ekip 174) aynı hesaptan. */
const LISTE_H = CHAIN.length * 46 - 10;
const BAG_Y = CHAIN.map((_, k) => 18 + k * 46);
const HALKA_IKON: Record<string, LucideIcon> = {
  kurulus: Building2,
  banka: Landmark,
  muhasebe: Calculator,
  oturum: IdCard,
};

function SahneZincir() {
  return (
    <div className="ab-dy-ekip akt">
      <div className="ab-dy-ekip-mer akt-durak">
        <Logo height={20} />
      </div>
      <svg viewBox={`0 0 100 ${LISTE_H}`} preserveAspectRatio="none" focusable="false" className="ab-dy-ekip-bag">
        {BAG_Y.map((y, k) => (
          <path key={y} className="ab-dy-ekip-yol akt-durak" data-k={k} d={`M0 ${LISTE_H / 2} C 55 ${LISTE_H / 2}, 45 ${y}, 100 ${y}`} />
        ))}
      </svg>
      <ol className="ab-dy-ekip-l">
        {CHAIN.map((c) => {
          const I = HALKA_IKON[c.key] ?? FileText;
          return (
            <li key={c.key} className="ab-dy-ekip-s akt-durak">
              <I size={15} strokeWidth={2} />
              {c.label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Harita kesiti: noktalı zemin, üç konum hapı, aralarından geçen tek rota.
 *  Haplar ana sayfadaki kürenin haplarıyla aynı dilde. */
function SahneOfis() {
  return (
    <div className="ab-dy-harita">
      <span className="ab-dy-harita-tag">Ofislerimiz</span>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <path d="M24 30 C 34 34, 42 50, 52 56 S 68 74, 76 80" />
      </svg>
      {KONUM.map((k) => (
        <span key={k.c} className="ab-dy-pin" style={{ left: `${k.x}%`, top: `${k.y}%` }}>
          <span className="ab-dy-pin-b">
            <Flag country={k.c} />
          </span>
          {COUNTRY_NAME[k.c]}
        </span>
      ))}
    </div>
  );
}

/** "Tek çatı": üstte bizim işaretimiz, altında cümlenin saydığı dosya türleri. */
function SahneGecmis() {
  return (
    <div className="ab-dy-cati">
      <div className="ab-dy-cati-bas">
        <Logo height={14} />
        <span>Tek çatı</span>
      </div>
      <ul className="ab-dy-cati-l">
        {DOSYALAR.map((d, i) => {
          const Ikon = DOSYA_IKON[i] ?? FileText;
          return (
            <li key={d}>
              <Ikon size={14} strokeWidth={2} />
              {d}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Ortaklık kartı + doğrudan başvuru akışı. Akış ana sayfadaki "Eksik dosya →
 *  Devralındı" çiftinin dili; arada üçüncü bir düğüm YOK — "bir aracı
 *  üzerinden değil, doğrudan". */
function SahneOrtak() {
  return (
    <div className="ab-dy-ortak">
      <div className="ab-dy-ortak-kart">
        <BrandChip brand="ifza" withName={false} size={34} />
        <span className="ab-dy-durum">
          <Check size={12} strokeWidth={3} />
          {DAYANAK_ORTAK_DURUM}
        </span>
      </div>
      <div className="ab-dy-akis">
        <span className="ab-dy-dugum ab-dy-dugum-biz">
          <span className="ab-dy-dugum-m">
            <Logo height={13} />
          </span>
          Başvuru
        </span>
        <span className="ab-dy-ok">
          <span />
          <ArrowRight size={14} strokeWidth={2.2} />
        </span>
        <span className="ab-dy-dugum ab-dy-dugum-ok">
          <span className="ab-dy-dugum-m">
            <BrandChip brand="ifza" withName={false} size={20} />
          </span>
          Serbest bölge
        </span>
      </div>
    </div>
  );
}

/** İmzalı hizmet belgesi. Gövde gri satır; imza çizgisi soyutlama. */
function SahneLisans() {
  return (
    <div className="ab-dy-blg">
      <div className="ab-dy-blg-bas">
        <span className="ab-dy-blg-ic">
          <FileText size={14} strokeWidth={2} />
        </span>
        <b>Hizmet belgesi</b>
        <span className="ab-dy-durum">
          <Check size={12} strokeWidth={3} />
          İmzalı
        </span>
      </div>
      <span className="ab-dy-cizgi" />
      <span className="ab-dy-cizgi" />
      <span className="ab-dy-cizgi ab-dy-cizgi-k" />
      <div className="ab-dy-blg-imza">
        <svg viewBox="0 0 120 30" focusable="false">
          <path d="M4 22 C 18 2, 26 27, 38 13 S 58 0, 66 17 S 84 25, 94 9 L 116 9" />
        </svg>
        <span className="ab-dy-blg-rule" />
        <b>{DAYANAK_IMZA.ad}</b>
        <i>{DAYANAK_IMZA.sifat}</i>
      </div>
    </div>
  );
}

const SAHNE: Record<DayanakKod, () => React.ReactElement> = {
  zincir: SahneZincir,
  ofis: SahneOfis,
  gecmis: SahneGecmis,
  ortak: SahneOrtak,
  lisans: SahneLisans,
};

/* ------------------------------------------------------------------- IZGARA */

/* <ul> > <li> > FadeUp: <ul> yalnız <li> kabul ediyor; FadeUp'ın <div>'i
   karonun kendisi ve <li>'nin içinde. Giriş gecikmesi levhanınkiyle aynı
   adım (0,05 s). */
export default function DayanakBento() {
  return (
    <ul className="ab-dy">
      {DAYANAK.map((k, i) => {
        const Sahne = SAHNE[k.kod];
        return (
          <li key={k.kod} data-kod={k.kod}>
            <FadeUp className="ab-dy-k" delay={0.08 + i * 0.05}>
              <div className="ab-dy-sahne" aria-hidden="true">
                <Sahne />
              </div>
              <h3 className="ab-dy-t">{k.t}</h3>
              <p className="ab-dy-s">{k.s}</p>
            </FadeUp>
          </li>
        );
      })}
    </ul>
  );
}
