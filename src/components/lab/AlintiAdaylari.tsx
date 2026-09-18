import { Quote } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   /lab/muhasebe-alinti · ALINTI + KÜNYE BANDININ ZEMİNİ
   CSS: css/lab-alinti.css (.lal-)

   18.09.2026 · Burak: "şu alıntı kısmı siyah ya şuan, aslında iyi de çok
   küçük bir alan olduğu için siyah biraz fazla sırıtıyor. ya sıralamada biraz
   aşağı alalım ya da kırık beyaz fln kullanıyoz ya bazı yerlerde öyle
   yapabiliriz. hepsini deneyelim."

   Bandın İÇİ değişmiyor: solda alıntı + künye satırı, sağda imza kutusu
   (canlıdaki hâl, accountingDubai.ts · expert). Denenen tek şey ZEMİN ve
   BANDIN YÜKSEKLİĞİ:

     A1 · KIRIK BEYAZ   --paper zemin, kutu beyaz ve çerçeveli. Siyah hiç yok.
     A2 · BEYAZ + ÇİZGİ zemin sayfanın kendi beyazı; bandı üst/alt 1 px çizgi
                        ayırıyor, kutu --paper. En sessiz hâl.
     A3 · GECE, GENİŞ   bugünkü gece bant ama dikey boşluk ~1,6 katı ve alıntı
                        bir punto büyük: siyah "şerit" değil "bölüm" oluyor.

   SIRA ÖNERİSİ ayrı bir şey ve sayfanın sonunda diyagramla duruyor: zemin
   ne olursa olsun bandı aşağı almak mümkün ve tek satırlık iş.

   KONTRAST (WCAG formülüyle ölçüldü):
     A1  --paper (#f5f5f5) üstünde alıntı --text-900 18,1:1 · künye
         --text-600 6,13:1 · kutu beyaz zeminde --text-900 19,3:1
     A2  beyaz üstünde aynı değerlerin bir tık üstü
     A3  gece (#080808) üstünde beyaz 19,9:1 (bugünkü bandın değerleri) */

function Alinti({ buyuk = false }: { buyuk?: boolean }) {
  const q = C.ortac.quote;
  return (
    <figure className="lal-alinti" data-buyuk={buyuk ? "" : undefined}>
      <Quote size={30} strokeWidth={1.6} aria-hidden="true" />
      <blockquote>{q.text}</blockquote>
      <figcaption>
        <b>{q.who}</b>
        <span>{q.role}</span>
      </figcaption>
    </figure>
  );
}

function Kutu() {
  const e = C.expert;
  return (
    <aside className="lal-kutu" aria-labelledby="lal-kutu-ad">
      <div className="lal-kutu-bas">
        <span className="lal-kutu-foto" aria-hidden="true">
          {e.initials}
        </span>
        <div>
          <p className="lal-kutu-ust">{e.heading}</p>
          <p id="lal-kutu-ad" className="lal-kutu-ad">
            {e.name}
          </p>
          <p className="lal-kutu-sifat">{e.credentials.join(" · ")}</p>
        </div>
      </div>
      <dl className="lal-kutu-sayi">
        {e.stats.map((st) => (
          <div key={st.t}>
            <dt>{st.t}</dt>
            <dd className="data">{st.n}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function Bant({ tur }: { tur: "a1" | "a2" | "a3" }) {
  return (
    <section className="lal-bant" data-tur={tur}>
      <div className="container-o lal-in">
        <FadeUp>
          <Alinti buyuk={tur === "a3"} />
        </FadeUp>
        <FadeUp delay={0.12}>
          <Kutu />
        </FadeUp>
      </div>
    </section>
  );
}

export function AlintiA1() {
  return <Bant tur="a1" />;
}

export function AlintiA2() {
  return <Bant tur="a2" />;
}

export function AlintiA3() {
  return <Bant tur="a3" />;
}

/* --------------------------------------------------------------- SIRA
   Zeminden bağımsız öneri: bandı sayfanın ortasından aşağı almak. Solda
   bugünkü sıra, sağda öneri; değişen iki satır işaretli. Bölüm adları
   /dubai/muhasebe'nin çapaları. */
const BUGUN = [
  "Hero",
  "Artılarımız",
  "Alıntı + künye",
  "Ne yapıyoruz",
  "Sizden gelen / size dönen",
  "Hangi ayda ne çıkıyor",
  "Düzenli muhasebenin karşılığı",
  "Muhasebeci değiştirme",
  "Hangi hizmetler gerekiyor",
  "Fiyat",
  "Sık sorulanlar",
];

const ONERI = [
  "Hero",
  "Artılarımız",
  "Ne yapıyoruz",
  "Sizden gelen / size dönen",
  "Hangi ayda ne çıkıyor",
  "Düzenli muhasebenin karşılığı",
  "Alıntı + künye",
  "Muhasebeci değiştirme",
  "Hangi hizmetler gerekiyor",
  "Fiyat",
  "Sık sorulanlar",
];

export function AlintiSira() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o lal-sira">
        <div>
          <p className="lal-sira-h">Bugünkü sıra</p>
          <ol>
            {BUGUN.map((b) => (
              <li key={b} data-vurgu={b === "Alıntı + künye" ? "" : undefined}>
                {b}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="lal-sira-h">Öneri · bant aşağıda</p>
          <ol>
            {ONERI.map((b) => (
              <li key={b} data-vurgu={b === "Alıntı + künye" ? "" : undefined}>
                {b}
              </li>
            ))}
          </ol>
        </div>
        <p className="lal-sira-not">
          Bant, &quot;düzenli muhasebenin karşılığı&quot; ile &quot;muhasebeci değiştirme&quot; arasına
          iniyor: ziyaretçi işin ne olduğunu okuduktan sonra kimin yaptığına bakıyor. Sayfadaki yeri
          tek satırlık değişiklik; zemin kararından bağımsız.
        </p>
      </div>
    </section>
  );
}
