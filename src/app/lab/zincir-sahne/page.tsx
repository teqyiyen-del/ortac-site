import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Building2, Calculator, FileText, IdCard, Landmark, ShieldCheck } from "lucide-react";

import Logo from "@/components/shared/Logo";
import { CHAIN } from "@/lib/brand";
import { DAYANAK } from "@/lib/about";

/* /lab/zincir-sahne — dayanak bentosundaki "5 halkalı zincir" karosunun
   sahnesine üç yeni yön.

   22.09.2026 · Burak: "zincir panosu hala kötü duruyor, onun tasarımını bi
   baştan düşünüp kurgular mısın?"

   BUGÜNKÜ HÂLİN SORUNU (ekrandan): bir ilerleme çubuğu + beş nokta + beş ad.
   Genel bir "adım göstergesi" gibi okunuyor, karonun cümlesini (zincirin her
   halkası AYNI EKİPTE, dosya el DEĞİŞTİRMİYOR) anlatmıyor; "5 / 5" ve dolu
   çubuk da bir şey söylemiyor, çerçevenin yarısı boş.

   ÜÇ ADAY, ÜÇÜ DE KARONUN CÜMLESİNİN BİR YARISINI ÇİZİYOR:
     Z1 · Halkalar         "zincir" — beş halka, aralarında bakla
     Z2 · Tek ekip         "aynı ekipte" — tek merkezden beş hizmete bağ
     Z3 · Dosya yolculuğu  "el değiştirmiyor, bir sonrakine geçiyor" — dosya
                           istasyondan istasyona kayıyor

   KAROLAR CANLININ KENDİ KABUĞU (.ab-dy-k · .ab-dy-sahne · .ab-dy-t ·
   .ab-dy-s, yalnız tüketiliyor) ve canlıdaki genişlikte (752 px, 1440'ta
   altı sütunun dördü). Sahneler gece zeminde, sitenin gece kademeleriyle.

   HAREKET: Z1 ve Z2 sitenin aktarım sözleşmesiyle (css/aktarim.css: ışık
   durakları sırayla yakıyor, nesne taşınmıyor). Z3 bilerek sözleşmenin
   DIŞINDA: orada bir nesne (dosya etiketi) gerçekten taşınıyor, çünkü adayın
   bütün fikri o; kendi keyframe'i var ve adı akt* değil. Üçü de saf CSS ve
   `prefers-reduced-motion: reduce` altında hiç kurulmuyor. */

export const metadata: Metadata = {
  title: "Zincir sahnesi · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

const ZINCIR = DAYANAK.find((d) => d.kod === "zincir")!;

/* Halka ikonları CHAIN sırasıyla; zincir değişirse fazlası genel ikon alır. */
const IKON: Record<string, LucideIcon> = {
  kurulus: Building2,
  banka: Landmark,
  muhasebe: Calculator,
  uyum: ShieldCheck,
  oturum: IdCard,
};
const ik = (key: string) => IKON[key] ?? FileText;

/* ================================================================ Z1 · HALKA */
function Z1() {
  return (
    <ol className="lzs-z1 akt">
      {CHAIN.map((c, i) => {
        const I = ik(c.key);
        return (
          <li key={c.key} className="lzs-z1-h akt-durak">
            <span className="lzs-ic">
              <I size={17} strokeWidth={1.9} />
            </span>
            <b>{c.label}</b>
            {i < CHAIN.length - 1 && <span className="lzs-bakla akt-durak" />}
          </li>
        );
      })}
    </ol>
  );
}

/* ============================================================ Z2 · TEK EKİP */
/* Bağların dikey merkezleri beş satırın merkezleriyle aynı: satır 36 px, ara
   10 px, liste 220 px → 18 · 64 · 110 · 156 · 202. SVG aynı 220'lik boyda,
   viewBox da 220; yatayda esniyor (preserveAspectRatio none, çizgi kalınlığı
   ölçeklenmiyor). */
const Y = [18, 64, 110, 156, 202];
function Z2() {
  return (
    <div className="lzs-z2 akt">
      <div className="lzs-z2-mer akt-durak">
        <span className="lzs-z2-logo">
          <Logo height={15} />
        </span>
        <b>Tek ekip</b>
        <i>Türkçe, tek muhatap</i>
      </div>
      <svg viewBox="0 0 100 220" preserveAspectRatio="none" focusable="false" className="lzs-z2-bag">
        {Y.map((y, k) => (
          <path key={y} className="lzs-z2-yol akt-durak" data-k={k} d={`M0 110 C 55 110, 45 ${y}, 100 ${y}`} />
        ))}
      </svg>
      <ol className="lzs-z2-l">
        {CHAIN.map((c) => {
          const I = ik(c.key);
          return (
            <li key={c.key} className="lzs-z2-s akt-durak">
              <I size={15} strokeWidth={2} />
              {c.label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ====================================================== Z3 · DOSYA YOLCULUĞU */
/* Dosya etiketi istasyonlarla AYNI IZGARADA, birinci sütunda duruyor ve
   `translateX(k × (100% + ara))` ile kayıyor: %100 kendi genişliği, yani bir
   sütun. Sütun genişliği ne olursa olsun etiket istasyonun tam üstüne
   oturuyor. */
function Z3() {
  return (
    <div className="lzs-z3">
      <div className="lzs-z3-ray">
        <span className="lzs-z3-dosya">
          <FileText size={14} strokeWidth={2.1} />
          Dosyanız
        </span>
      </div>
      <ol className="lzs-z3-l">
        {CHAIN.map((c) => {
          const I = ik(c.key);
          return (
            <li key={c.key} className="lzs-z3-i">
              <span className="lzs-ic">
                <I size={17} strokeWidth={1.9} />
              </span>
              <b>{c.label}</b>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const ADAYLAR = [
  {
    kod: "z1",
    ad: "Z1 · Halkalar",
    not: "Beş hizmet ikonlu kutucuklarda, aralarında zincir baklası. Işık halkadan halkaya geçiyor. Karonun “zincir” kelimesinin çizimi.",
    B: Z1,
  },
  {
    kod: "z2",
    ad: "Z2 · Tek ekip",
    not: "Solda tek ekip, sağda beş hizmet, aralarında kavisli bağlar (muhasebe sayfasındaki defter görselinin dili). Işık merkezden sırayla her hizmete akıyor. “Aynı ekipte”nin çizimi.",
    B: Z2,
  },
  {
    kod: "z3",
    ad: "Z3 · Dosya yolculuğu",
    not: "“Dosyanız” etiketi istasyondan istasyona kayıyor, altındaki istasyon yanıyor. “Dosya el değiştirmiyor, bir sonrakine geçiyor”un çizimi.",
    B: Z3,
  },
];

export default function ZincirLab() {
  return (
    <main>
      <div className="lzs-kunye">
        <span>Aday · zincir sahnesi</span>
        <h1>5 halkalı zincir karosu</h1>
        <p>
          Bugünkü pano bir adım göstergesi gibi duruyor ve karonun cümlesini anlatmıyor. Üç yön,
          üçü de cümlenin bir yarısını çiziyor. Karolar canlının kabuğu ve canlıdaki genişlikte;
          hareketler birkaç saniyede bir tekrar ediyor.
        </p>
      </div>
      {ADAYLAR.map((a) => (
        <section key={a.kod} className="lzs-blok" data-aday={a.kod}>
          <div className="container-o">
            <p className="lzs-etiket">{a.ad}</p>
            <p className="lzs-not">{a.not}</p>
            <div className="lzs-karo">
              <div className="ab-dy-k">
                <div className="ab-dy-sahne" aria-hidden="true">
                  <a.B />
                </div>
                <h3 className="ab-dy-t">{ZINCIR.t}</h3>
                <p className="ab-dy-s">{ZINCIR.s}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
