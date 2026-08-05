import Image from "next/image";
import {
  CalendarCheck,
  FileStack,
  MapPin,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import KimK1 from "@/components/lab/KimK1";
import KimK2 from "@/components/lab/KimK2";
import KimK3 from "@/components/lab/KimK3";
import KimK4 from "@/components/lab/KimK4";
import SplitWords from "@/components/shared/SplitWords";
import { ACCOUNTING_DUBAI as C, type AccIcon } from "@/lib/accountingDubai";
import { PHOTO } from "@/lib/media";

/* ============================================================================
   /lab/muhasebe-ekip  —  "Bu işi kim yürütüyor?" bölümüne üç aday

   Müşteri: "muhasebe sayfasında ss attığım kısımı tam sevemedim ya."

   Bölümün geçmişi önemli: dört kutu da, muhasebeyle ilgili görsel de bir tur
   önce MÜŞTERİNİN KENDİ İSTEĞİYDİ ve ikisi de uygulandı. Yani sorun istekte
   değil, sonucun görünüşünde. Aşağıdaki dört madde bugünkü hâlin ölçülebilir
   kusurları; her aday bunların hangilerini kapattığını künyesinde söylüyor.

   Sayfanın en üstünde bugünkü bölüm BİREBİR duruyor (canlı sınıflarla,
   .svm- / .svs-). Karşılaştırma başka türlü dürüst olmuyor: adayları hafızadan
   hatırlanan bir ekran görüntüsüyle değil, yan yana duran gerçek bölümle
   karşılaştırmak gerekiyor. O blok canlı CSS'i OKUYOR, yazmıyor.
   ========================================================================= */

export const metadata = {
  title: "Bu işi kim yürütüyor · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

/* Canlı bölümün kopyası bu tabloyu kullanıyor; /dubai/muhasebe'deki ICON
   tablosu o dosyanın içinde kapalı, dışa açılmıyor. */
const LIVE_ICON: Partial<Record<AccIcon, LucideIcon>> = {
  stamp: Stamp,
  calendar: CalendarCheck,
  files: FileStack,
  pin: MapPin,
};

const DIAGNOSIS = [
  {
    k: "T1",
    t: "Dört eşit ses, giriş noktası yok",
    l: "Dört kutu da aynı 30 piksel ikon kabını, aynı 13,5 piksel başlığı, aynı 12,5 piksel gövdeyi, aynı kenarlığı ve aynı beyaz zemini kullanıyor. Hiçbiri birinci değil; göz soldan sağa dört kez aynı şeyi okuyor.",
  },
  {
    k: "T2",
    t: "Alt satırda ölü boşluk",
    l: "Dördüncü maddenin cümlesi 122 karakter, üçüncününki 71. Kutular satır içinde aynı boya geriliyor (height: 100%) ve içerik yukarı toplanıyor (align-content: start), yani fark kısa kutunun altında görünür bir deliğe dönüşüyor. Kenarlık deliği çiziyor.",
  },
  {
    k: "T3",
    t: "Sağ sütun ikinci bir ızgara açıyor",
    l: "Fotoğraf ve alıntı iki ayrı nesne: ikisi de kendi kenarlığında, ikisi de --r-panel yuvarlaklıkta. Bölüm dört kutu değil altı kutu; sağ taraf kendi içinde ikiye bölünmüş görünüyor.",
  },
  {
    k: "T4",
    t: "Alıntı bölümle konuşmuyor",
    l: "Alıntı Dubai'de şirket kurmanın rekabet gücü hakkında, dört kutu ise işi kimin yürüttüğü hakkında. Yan yanalar ama biri diğerini desteklemiyor; üstelik bölümdeki en küçük ve en alttaki eleman.",
  },
  {
    k: "T5",
    t: "En büyük nesne sıfır bilgi taşıyor",
    l: 'Fotoğrafın alt metni bilerek boş — canlı dosyadaki yorum "kare bir olgu iddia etmiyor" diyor. Yani bölümün en geniş tek nesnesi hiçbir iddia taşımıyor, dört iddia ise onun yarısı kadar yerde sıkışıyor.',
  },
  {
    k: "T6",
    t: "Soruya doğrudan cevap veren cümle yok",
    l: "Sayfanın diğer bölümlerinin (özet, kapsam, fiyat) bir lead satırı var; bu bölümün yok. Başlık soru soruyor, hemen altında kutu ızgarası başlıyor.",
  },
];

const CANDIDATES = [
  {
    id: "K4",
    kind: "Beyan + zemin",
    Body: KimK4,
    idea: "K2'nin zemini, K1'in hiyerarşisi. Fotoğraf yine bandın arkasında ve perdenin altında; değişen, perdenin üstünde neyin büyük yazıldığı. Bandın en büyük tipografisi artık alıntı değil ilk madde — kendi muhasebe lisansımız, 32 piksele kadar. Alıntı K1'deki yerine iniyor: beyanın dibinde, saç teli bir çizginin altında, 13,5 piksel imza.",
    kills: "T1 · T2 · T3 · T4 · T5",
    cost: "K1'in feda ettiğini feda ediyor: kalan üç madde bilinçli olarak ikinci planda. Band hâlâ koyu; sayfada bu ağırlıkta ikinci bir yer yok.",
    photo: true,
    ex: false,
  },
  {
    id: "K1",
    kind: "Ana beyan",
    Body: KimK1,
    idea: "Dört kutu eşit değil: ilk madde koyu bir panele çıkıyor ve başlığı 22 piksele büyüyor, kalan üçü sağda ince satırlar oluyor. Alıntı panelin dibine, saç teli bir çizginin altına iniyor — bugün ölü boşluk olan yer alıntının payı.",
    kills: "T1 · T2 · T3 · T4 · T5",
    cost: "Kalan üç madde bilinçli olarak ikinci plana düşüyor. Dördü de eşit görünsün deniyorsa yanlış aday. Bölüm ayrıca sayfada koyu bir blok açıyor.",
    photo: false,
    ex: false,
  },
  {
    id: "K2",
    kind: "Zemin · K4'ün önceki sürümü",
    Body: KimK2,
    idea: "Fotoğraf komşu değil zemin: kare bandın tamamının arkasına geçiyor, üstüne sabit koyu bir perde iniyor, perdenin üstünde önce alıntı sonra dört sütun duruyor. Altı kutu tek bloka iniyor.",
    kills: "T1 · T2 · T3 · T4 · T5",
    cost: "Bandın tek büyük tipografisi (28 piksel) ALINTIYA ayrılmış: bölüm “kim yürütüyor?” diye soruyor, en büyük harflerle Dubai'nin rekabet gücünden söz eden bir cümle cevap veriyor. K4 tam bu hiyerarşiyi çeviriyor; K2 karşılaştırma için duruyor.",
    photo: true,
    ex: true,
  },
  {
    id: "K3",
    kind: "Künye",
    Body: KimK3,
    idea: "Cevap bir ızgara değil bir künye: üstte konuşan taraf (ad + alıntı), altında tek bir çizgi, çizginin altında dört madde numaralanmış ince sütunlar hâlinde. Kutu, kenarlık, zemin, ikon — hiçbiri yok.",
    kills: "T1 · T2 · T3 · T4 · T5 · T6",
    cost: "Dört madde küçük punto ve gri; bugünkünden görsel olarak zayıf. Dört iddia bölümün yıldızı olsun deniyorsa yanlış aday. İkonlar gidince tarama hızından da kaybediliyor.",
    photo: false,
    ex: false,
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "5px 12px",
        borderRadius: 999,
        background: "var(--blue-100)",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--blue-900)",
      }}
    >
      {children}
    </span>
  );
}

export default function LabKimPage() {
  return (
    <main style={{ background: "var(--paper)", paddingBottom: 96 }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Bu işi kim yürütüyor · dört aday
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "64ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          Dört kutu ve muhasebe görseli bir tur önce müşterinin kendi
          isteğiydi; ikisi de uygulandı. Bu turda değişen istek değil, sunum.
          Dört maddenin bilgisi dört adayın dördünde de tam duruyor ve
          alıntının metnine dokunulmadı.
        </p>
        <p
          style={{
            marginTop: 12,
            maxWidth: "64ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          <b style={{ fontWeight: 600, color: "var(--text-900)" }}>
            Bu tur eklenen K4:
          </b>{" "}
          zemin fotoğrafı ve perde K2&apos;den geliyor, hiyerarşi K1&apos;den.
          Bandın en
          büyük tipografisi artık alıntı değil kendi muhasebe lisansımız;
          alıntı onun altına, imza konumuna iniyor. K2 silinmedi, karşılaştırma
          için eski sürüm olarak duruyor.
        </p>

        {/* ------------------------------------------------------- teşhis */}
        <section style={{ marginTop: 40 }}>
          <Badge>Teşhis · bugün ne rahatsız ediyor</Badge>
          <ol
            style={{
              display: "grid",
              gap: 12,
              marginTop: 16,
              maxWidth: "84ch",
              padding: 0,
              listStyle: "none",
            }}
          >
            {DIAGNOSIS.map((d) => (
              <li
                key={d.k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "34px minmax(0, 1fr)",
                  gap: "2px 12px",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  background: "var(--white)",
                }}
              >
                <span
                  style={{
                    gridRow: "1 / span 2",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "var(--blue-900)",
                  }}
                >
                  {d.k}
                </span>
                <b style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-900)" }}>
                  {d.t}
                </b>
                <span style={{ fontSize: 12.5, lineHeight: 1.6, color: "var(--text-600)" }}>
                  {d.l}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------- bugünkü hâl (taban)

            Canlı sınıflar (.svm- / .svs-) burada YALNIZCA OKUNUYOR: bu dosya
            svc-muhasebe.css'e tek bir satır bile yazmıyor ve /dubai/muhasebe
            bu blokta hiç değişmiyor. Kopya birebir tutulmalı, yoksa
            karşılaştırma yalan söyler. */}
        <section style={{ marginTop: 56 }}>
          <Badge>Bugün · canlıdaki hâl</Badge>
          <p
            style={{
              margin: "14px 0 0",
              maxWidth: "62ch",
              fontSize: 13,
              lineHeight: 1.6,
              color: "#8a8a8a",
            }}
          >
            Canlı markup ve canlı CSS, birebir. Adayların yüksekliği ve metin
            miktarı bununla karşılaştırıldı.
          </p>

          <div
            /* Yatay dolgu YOK ve çerçeve yalnızca üst/alt: içerik genişliği
               canlı sayfayla birebir aynı kalsın (1440'ta 1136 piksel).
               Yandan 28 piksel dolgu verilseydi ölçüm 56 piksel dar bir
               sütunda alınır ve satır sayıları yalan söylerdi. */
            style={{
              marginTop: 20,
              padding: "32px 0",
              borderTop: "1px dashed #cfcfcf",
              borderBottom: "1px dashed #cfcfcf",
            }}
          >
            <div className="sec-head">
              <h2 className="h2" style={{ color: "var(--text-900)" }}>
                {C.ortac.heading}
              </h2>
            </div>

            <div className="svm-two svm-two-even">
              <div className="svm-facts">
                {C.ortac.facts.map((f) => {
                  const Icon = LIVE_ICON[f.icon] ?? Stamp;
                  return (
                    <div className="svm-fact" key={f.title}>
                      <span className="svm-fact-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2.1} />
                      </span>
                      <b>{f.title}</b>
                      <span>{f.line}</span>
                    </div>
                  );
                })}
              </div>

              <div className="svs-side">
                <div className="svs-photo">
                  <Image
                    src={PHOTO.accounting}
                    alt=""
                    fill
                    sizes="(min-width: 900px) 560px, 100vw"
                    unoptimized
                  />
                </div>
                <figure className="svm-quote">
                  <blockquote>{C.ortac.quote.text}</blockquote>
                  <figcaption>
                    <b>{C.ortac.quote.who}</b>
                    <span>{C.ortac.quote.role}</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- adaylar */}
        {CANDIDATES.map(({ id, kind, Body, idea, kills, cost, photo, ex }) => (
          <section key={id} style={{ marginTop: 64 }} id={`aday-${id}`}>
            <Badge>
              {id} · {kind} · {photo ? "fotoğraflı" : "fotoğrafsız"}
              {ex ? " · eski sürüm" : ""}
            </Badge>
            <p
              style={{
                margin: "14px 0 6px",
                maxWidth: "68ch",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              {idea}
            </p>
            <p style={{ margin: "0 0 4px", maxWidth: "68ch", fontSize: 13, color: "#6f6f6f" }}>
              <b style={{ fontWeight: 600, color: "var(--text-900)" }}>Kapattığı teşhis:</b>{" "}
              {kills}
            </p>
            <p style={{ margin: 0, maxWidth: "68ch", fontSize: 13, lineHeight: 1.6, color: "#6f6f6f" }}>
              <b style={{ fontWeight: 600, color: "var(--text-900)" }}>Feda ettiği:</b> {cost}
            </p>

            {/* Aday kendi bölümüyle birlikte duruyor: başlık da adayın parçası,
                çünkü üç adaydan biri (K3) başlığın hemen altına gelen şeyi
                değiştiriyor. */}
            <div
              /* Dolgu ve çerçeve "bugün" bloğuyla aynı — gerekçe orada. */
              style={{
                marginTop: 20,
                padding: "32px 0",
                borderTop: "1px dashed #cfcfcf",
                borderBottom: "1px dashed #cfcfcf",
              }}
            >
              <div className="sec-head">
                <SplitWords
                  as="h2"
                  text={C.ortac.heading}
                  accent={C.ortac.accent}
                  className="h2"
                  style={{ color: "var(--text-900)" }}
                />
              </div>
              <Body />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
