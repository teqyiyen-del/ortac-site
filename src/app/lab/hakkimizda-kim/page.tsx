import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Compass, Target, UsersRound } from "lucide-react";

import SplitWords from "@/components/shared/SplitWords";
import { OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* /lab/hakkimizda-kim — "Kim olduğumuz" + vizyon/misyon bölümüne üç aday.

   21.09.2026 · Burak, dayanak bentosu canlıya çıkınca: "bento baya güçlü oldu,
   keşke şu onun üstündeki vizyon misyon ve kim olduğumuz kısmını da adam
   edebilsek ne tatlı olur be kral."

   BUGÜNKÜ HÂLİN ÜÇ SORUNU (ekrandan):
     · Solda 4:3 bir fotoğraf, sağda başlık + lead + iki düz paragraf: sitenin
       her yerinde görülen "resim | metin" kalıbı, altındaki bentonun yanında
       sönük kalıyor.
     · Vizyon ve misyon iki eş kutu, ama metinler eş değil (88 · 170 karakter):
       vizyon kutusunun yarısı boş duruyor.
     · İKİNCİ PARAGRAF ARTIK YANLIŞ SAYIYOR: "Bunun arkasında üç somut dayanak
       var …" diyor, hemen altındaki bento BEŞ dayanak gösteriyor. Paragraf bir
       köprüydü; köprünün öbür ucu değişti. Üç adayda da bu paragraf YOK —
       bento onun söylediğini söylüyor. (Metin about.ts'te duruyor, silinmedi.)

   ÜÇ ADAYDA SABİT KALANLAR:
     · FOTOĞRAFIN YERİ. media.ts · TEAM_PHOTO bir yer tutucu (SWAP): müşteri
       kendi ekip çekimini koyacak. Fotoğrafsız bir aday o planı bozardı.
       alt="" ve dekoratif, bugünkü gibi.
     · VİZYON VE MİSYON METNİ HARFİ HARFİNE. Firmanın resmî ifadesi, yeniden
       yazılmıyor (about.ts · OPENING'deki kural).
     · Lead ve ilk paragraf aynı (OPENING.lead · OPENING.body[0]).

   DEĞİŞEN yalnız tasarım dili; üçü de son turlarda beğenilen dillerden:
     K1 · navbar ülke kartının E3'ü (yazı fotoğrafın üstünde)
     K2 · dayanak bentosu (karo, gece ve mavi yüzey)
     K3 · büyük tek cümle, alıntı gibi duran vizyon ve misyon */

export const metadata: Metadata = {
  title: "Kim olduğumuz · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

const VM: { k: "vizyon" | "misyon"; t: string; s: string; Ikon: LucideIcon }[] = [
  { k: "vizyon", t: OPENING.vision.t, s: OPENING.vision.s, Ikon: Compass },
  { k: "misyon", t: OPENING.mission.t, s: OPENING.mission.s, Ikon: Target },
];
const PARAGRAF = OPENING.body[0];

/* `unoptimized` canlıdaki gibi: Unsplash adresi next.config'te izinli bir
   görsel alanı değil, kare olduğu gibi indiriliyor (media.ts). */
function Foto({ sizes }: { sizes: string }) {
  return <Image src={TEAM_PHOTO} alt="" fill sizes={sizes} className="lkm-foto" unoptimized />;
}

/* ================================================================ K1 · AFİŞ */
/* Yazı fotoğrafın üstünde, soldan gelen bir karartmanın içinde. Müşterinin
   navbar ülke kartında seçtiği dil (E3): "görselin üstüne yazmış gibi". Perde
   bir MASKE, yüzey değil; "gece yüzeyde alfa yok" kuralı yüzey renkleri için.
   Vizyon ve misyon İKİ EŞ KUTU DEĞİL, tek panelde iki satır: satırın boyu
   metnin boyu, yani kısa vizyonun kutusu boş kalmıyor. */
function K1() {
  return (
    <div>
      <div className="lkm-afis">
        <Foto sizes="(min-width: 1200px) 1136px, 100vw" />
        <span className="lkm-perde" aria-hidden="true" />
        <div className="lkm-afis-m">
          <SplitWords
            as="h2"
            text={OPENING.heading}
            accent={OPENING.accent}
            accentColor="var(--blue-500)"
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <p className="lkm-afis-lead">{OPENING.lead}</p>
          <p className="lkm-afis-p">{PARAGRAF}</p>
        </div>
      </div>
      <div className="lkm-vm1">
        {VM.map((v) => (
          <div key={v.k} className="lkm-vm1-s">
            <span className="lkm-vm1-bas">
              <span className="lkm-ic">
                <v.Ikon size={18} strokeWidth={1.9} />
              </span>
              {v.t}
            </span>
            <p>{v.s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================== K2 · BENTO */
/* Bölümün kendisi bir bento ve altındaki dayanak bentosuyla aynı aile: 28 px
   köşe, beyaz karo, bir gece ve bir mavi yüzey. Lead fotoğrafın üstünde;
   vizyon gece karoda, misyon mavi karoda, paragraf beyaz karoda. Uzun misyon
   geniş karoya, kısa vizyon dar karoya düştüğü için ikisi de dolu duruyor. */
function K2() {
  return (
    <div>
      <div className="sec-head">
        <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="h2" />
      </div>
      <div className="lkm-b">
        <div className="lkm-b-foto">
          <Foto sizes="(min-width: 1200px) 750px, 100vw" />
          <span className="lkm-perde lkm-perde-alt" aria-hidden="true" />
          <p className="lkm-b-lead">{OPENING.lead}</p>
        </div>
        <div className="lkm-b-k lkm-b-gece">
          <span className="lkm-ic">
            <Compass size={18} strokeWidth={1.9} />
          </span>
          <span className="lkm-b-e">{OPENING.vision.t}</span>
          <p className="lkm-b-v">{OPENING.vision.s}</p>
        </div>
        <div className="lkm-b-k lkm-b-yazi">
          <span className="lkm-ic">
            <UsersRound size={18} strokeWidth={1.9} />
          </span>
          <span className="lkm-b-e">Ne yapıyoruz</span>
          <p className="lkm-b-p">{PARAGRAF}</p>
        </div>
        <div className="lkm-b-k lkm-b-mavi">
          <span className="lkm-ic">
            <Target size={18} strokeWidth={1.9} />
          </span>
          <span className="lkm-b-e">{OPENING.mission.t}</span>
          <p className="lkm-b-v">{OPENING.mission.s}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ K3 · MANİFESTO */
/* Solda tek büyük cümle (lead, 46 px), altında paragraf; sağda fotoğraf.
   Vizyon ve misyon KUTUSUZ, iki büyük alıntı: kutu olmayınca uzunluk farkı
   boşluk olarak görünmüyor. Ayırıcı çizgi yok, ayrımı boşluk taşıyor. */
function K3() {
  return (
    <div>
      <div className="lkm-man">
        <div>
          {/* Düz <h2>, SplitWords DEĞİL: kelime kelime giriş animasyonu bu
              küçük boyda (15 px, 23 px'lik kutu) görünür alana girdiği hâlde
              tetiklenmedi ve başlık görünmez kaldı (çekimde görüldü, kelime
              kutuları opacity 0). Burada başlık bir üst etiket; animasyonun
              yükünü alttaki büyük cümle taşıyor. */}
          <h2 className="lkm-man-e">
            {OPENING.heading.replace(OPENING.accent, "")}
            <span>{OPENING.accent}</span>
          </h2>
          <p className="lkm-man-lead">{OPENING.lead}</p>
          <p className="lkm-man-p">{PARAGRAF}</p>
        </div>
        <div className="lkm-man-foto">
          <Foto sizes="(min-width: 1200px) 560px, 100vw" />
        </div>
      </div>
      <div className="lkm-alinti">
        {VM.map((v) => (
          <figure key={v.k} className="lkm-alinti-k">
            <span className="lkm-tirnak" aria-hidden="true">
              “
            </span>
            <blockquote>{v.s}</blockquote>
            <figcaption>
              <span className="lkm-ic">
                <v.Ikon size={16} strokeWidth={1.9} />
              </span>
              {v.t}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const ADAYLAR = [
  {
    kod: "k1",
    ad: "K1 · Afiş",
    not: "Yazı fotoğrafın üstünde (navbar kartındaki E3 dili). Vizyon ve misyon iki eş kutu değil, tek panelde iki satır: kısa vizyonun kutusu boş kalmıyor.",
    B: K1,
  },
  {
    kod: "k2",
    ad: "K2 · Bento",
    not: "Bölümün kendisi bir bento, altındaki dayanak bentosuyla aynı aile. Lead fotoğrafın üstünde, vizyon gece karoda, misyon mavi karoda.",
    B: K2,
  },
  {
    kod: "k3",
    ad: "K3 · Manifesto",
    not: "Solda tek büyük cümle, sağda fotoğraf. Vizyon ve misyon kutusuz, iki büyük alıntı gibi.",
    B: K3,
  },
];

export default function KimLab() {
  return (
    <main>
      <div className="lkm-kunye">
        <span>Aday · kim olduğumuz</span>
        <h1>Kim olduğumuz + vizyon ve misyon</h1>
        <p>
          Üç adayda da fotoğrafın yeri duruyor (müşterinin ekip çekimi gelecek), vizyon ve misyon
          harfi harfine aynı. <b>&ldquo;Üç somut dayanak var&rdquo; paragrafı üçünde de yok:</b>{" "}
          hemen altındaki bento beş dayanak gösteriyor ve o cümle artık yanlış sayıyor.
        </p>
      </div>

      {ADAYLAR.map((a) => (
        <section key={a.kod} className="lkm-blok" data-aday={a.kod}>
          <div className="container-o">
            <p className="lkm-etiket">{a.ad}</p>
            <p className="lkm-not">{a.not}</p>
            <a.B />
          </div>
        </section>
      ))}
    </main>
  );
}
