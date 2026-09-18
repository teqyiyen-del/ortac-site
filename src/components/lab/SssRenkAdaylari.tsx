"use client";

import { Fragment, useState } from "react";
import { ArrowRight, ChevronRight, CircleHelp } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import type { Faq } from "@/lib/countryContent";

/* ============================================================================
   /lab/sss-renk · SSS BLOĞUNUN RENKLERİ
   CSS: css/lab-sss-renk.css (yalnız renk; yapı canlı sınıfların kendisi)

   ---------------------------------------------------------------- TURUN SEYRİ

   1. GEÇİŞ · Burak: "sss kısmına layoutu sabit tutarak hoverdaki ve normal
      görünümdeki renklerini denesene." Üç yön sunuldu: R1 (taban kırık beyaz,
      seçili gece), R2 (taban beyaz, seçili mavi dolu), R3 (taban çizgisiz,
      seçili beyaz + mavi kontur).

   3. GEÇİŞ · Burak birleştirmeyi istedi: "m1 in mavi hoverı ile m2 nin siyah
      cevabını birleştir. m1 in mavi hoverı bizim mavi olsun ama koyu mavi
      değil." Birleşim CANLIYA ALINDI (globals.css · "SSS · RENK KARARI"), bu
      sayfanın ilk bloğu artık o canlı hâli gösteriyor. M1-M4 kayıt olarak
      duruyor; üçünün paneli açık zemin olduğu için renkleri lab CSS'inde
      açıkça yazıldı (canlı panel tabanı artık gece).

   2. GEÇİŞ · Burak iskeleti kendi seçti ve açık soruları saydı: "taban beyaz,
      hover kırık beyaz, seçili siyah düşünüyorum. işin içinde mavi de olması
      lazım ama nerde bilmiyorum. hoverda texte mi veririz, seçilide texte mi
      veririz naparız bilmiyorum. bide cevap kısmına da mı renk atsak napsak?
      ya da seçiliyi direkt mavi mi yapsak valla kafam karıştı da cevap kısmıyla
      bi uyumsuz hissettiriyor."

   Yani İSKELET ARTIK SABİT — beyaz taban, kırık beyaz hover, siyah seçili —
   ve bu turda yalnız iki soru kaldı: MAVİ NEREDE, CEVAP PANELİ NE OLACAK.
   R1-R3 bu iskelette birleştiği için sayfadan kalktı; kaydı git'te ve
   docs/durum.md'de duruyor.

   ---------------------------------------------------------------- DÖRT CEVAP

     M1 · MAVİ HOVER'DA      Mavi, ÜSTÜNE GELİNEN satırın yazısında. Kapalı
                             satır siyah yazılı, imleç değince yazı maviye
                             dönüyor: mavi bir "durum" değil, bir DAVRANIŞ
                             işareti oluyor. Panel liste ile aynı malzeme —
                             beyaz + ince çizgi.
     M2 · CEVAP DA SİYAH     "Cevap kısmıyla uyumsuz hissettiriyor" sorusuna en
                             doğrudan cevap: seçili satır siyahsa cevabı da
                             siyah yap. Seçili satır ile panel tek bir gece
                             yüzeyinin iki parçası gibi okunuyor; mavi o
                             yüzeyin içinde (künye etiketi ve ok).
     M3 · SEÇİLİ MAVİ        "Seçiliyi direkt mavi mi yapsak" sorusu. Siyah
                             yerine koyu mavi dolu satır; panel kırık beyaz
                             kalıyor. Mavi burada listenin kendisinde.
     M4 · MAVİ SADECE ÇİZGİ  En sessizi: mavi hiçbir yazıya girmiyor. Hover'da
                             yalnız kenarlık maviye dönüyor, seçili satır
                             siyah, panelin künye satırı mavi. Yazı renkleri
                             baştan sona siyah-gri.

   Dördünde de taban BEYAZ + ince çizgi, hover KIRIK BEYAZ, seçili SİYAH
   (M3 hariç — orası zaten sorunun kendisi).

   ---------------------------------------------------------------- DÜZEN SABİT

   Bu dosya canlı bloğun sınıflarını (.sss, .sss-q, .sss-panel …) olduğu gibi
   basıyor, kendi yapısını kurmuyor. Adaylar yalnızca kaba `data-renk` veriyor;
   lab-sss-renk.css de sadece renk bildiren satırları eziyor. Dolgu, ölçü,
   ızgara, yapışkanlık, punto — hiçbiri değişmiyor.

   HOVER EKRANDA GÖRÜNÜYOR: listenin İKİNCİ sorusu `data-hover` alıyor ve CSS o
   satıra hover renklerini kalıcı basıyor. Böylece seçili (1. satır), hover
   (2. satır) ve normal (kalanlar) tek karede duruyor. Gerçek :hover kuralları
   da yazılı, yani fareyle gezince davranış birebir aynı.

   KONTRAST (docs/tuzaklar.md · kontrast tuzağı):
     · beyaz / #080808 gece                    19,60:1
     · #9a9a9a / #080808 (gece panelde cevap)   6,97:1
     · #5c9eeb --blue-500 / #080808 (ok, etiket) 8,40:1
     · beyaz / #1b56a8 --blue-900 (M3 seçili)    7,14:1
     · #307fe2 --blue-700 / beyaz (hover yazısı) 3,99:1 → YALNIZ 16px/600
       yazıda kullanılmadı; M1'in hover yazısı --blue-900.
   Marka mavisi üstüne beyaz küçük punto hiçbir adayda yok.
   ========================================================================= */

function Panel({ item, i, total }: { item: Faq; i: number; total: number }) {
  return (
    <div className="sss-panel">
      <div className="sss-panel-head">
        <p className="sss-panel-ust">
          <span className="sss-panel-topic">
            <CircleHelp size={15} strokeWidth={2} aria-hidden="true" />
            Sık sorulan
          </span>
          <span className="sss-panel-say">
            {i + 1} / {total}
          </span>
        </p>
        <h3 className="sss-panel-q">{item.q}</h3>
      </div>
      <div className="sss-rule" aria-hidden="true" />
      <p className="sss-a">{item.a}</p>
    </div>
  );
}

function Blok({
  items,
  renk,
  ad,
  not,
  mavi,
}: {
  items: Faq[];
  renk: string;
  ad: string;
  not: string;
  /** maviyi nereye koyduğunu tek satırda söyleyen künye */
  mavi: string;
}) {
  const [acik, setAcik] = useState(0);
  const toplam = items.length;
  return (
    <section className="sec-pad lsr-sec" data-renk={renk}>
      <div className="container-o">
        <p className="lsr-etiket">{ad}</p>
        <p className="lsr-not">{not}</p>
        <p className="lsr-mavi">
          <span>Mavi nerede</span> {mavi}
        </p>
        <div className="sec-head">
          <SplitWords as="h2" text="Sık sorulanlar." accent="sorulanlar." className="h2" />
        </div>

        <div
          className="sss"
          data-renk={renk}
          style={{ gridTemplateRows: `repeat(${toplam}, auto) 1fr` }}
        >
          {items.map((f, i) => (
            <Fragment key={f.q}>
              <button
                type="button"
                className="sss-q"
                /* İkinci satır hover rengini kalıcı gösteriyor; seçili satır
                   zaten birinci, yani üç durum da aynı karede. */
                data-hover={i === 1 ? "" : undefined}
                data-on={acik === i || undefined}
                aria-expanded={acik === i}
                onClick={() => setAcik(i)}
              >
                <span>{f.q}</span>
                <ChevronRight className="sss-chev" size={17} strokeWidth={2.2} aria-hidden="true" />
              </button>
              {acik === i && <Panel item={f} i={i} total={toplam} />}
            </Fragment>
          ))}
        </div>

        <p className="lsr-alt">
          Üstteki satır <b>seçili</b>, ikinci satır <b>üstüne gelince</b>, kalanlar{" "}
          <b>normal</b> hâli.
        </p>

        <p className="lsr-cikis">
          <a href="/basla" className="btn btn-line">
            Ücretsiz danışmanlık
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}

/* 3. GEÇİŞ · Burak: "m1 in mavi hoverı ile m2 nin siyah cevabını birleştir.
   m1 in mavi hoverı bizim mavi olsun ama koyu mavi değil." Birleşim CANLIYA
   ALINDI; bu blok hiçbir renk ezmiyor, canlı kuralların kendisini gösteriyor. */
export function SssRenkSecildi({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="secildi"
      ad="Seçilen · canlıda"
      not="M1'in mavi hover'ı ile M2'nin siyah cevabı birleşti. Taban beyaz, hover kırık beyaz ve yazı marka mavisine dönüyor, seçili satır siyah, cevap paneli de siyah."
      mavi="Üstüne gelinen satırın yazısında (marka mavisi), seçili satırın okunda ve gece panelin künye satırında."
    />
  );
}

export function SssRenkOnceki({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="onceki"
      ad="Önceki · tur öncesi hâl"
      not="Taban kırık beyaz kutu, hover beyaza çıkıyor ve yazı maviye dönüyor, seçili satır mavi sis, panel kırık beyaz. Turun çıkış noktası; artık hiçbir yerde yaşamıyor."
      mavi="Hem hover'ın hem seçilinin yazısında ve kenarlığında — ikisi bu yüzden birbirine benziyordu."
    />
  );
}

export function SssRenkM1({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="m1"
      ad="M1 · Mavi hover'da"
      not="Taban beyaz, hover kırık beyaz ve yazı maviye dönüyor, seçili satır siyah. Panel listeyle aynı malzeme: beyaz + ince çizgi."
      mavi="Üstüne gelinen satırın yazısında, seçili satırın okunda ve panelin künye satırında."
    />
  );
}

export function SssRenkM2({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="m2"
      ad="M2 · Cevap da siyah"
      not="Taban beyaz, hover kırık beyaz (yazı siyah kalıyor), seçili satır siyah. Panel de siyah: seçili satır ile cevap tek bir yüzey gibi okunuyor."
      mavi="Gece panelin içinde — künye etiketi ve seçili satırın oku."
    />
  );
}

export function SssRenkM3({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="m3"
      ad="M3 · Seçili mavi"
      not="Taban beyaz, hover kırık beyaz, seçili satır siyah yerine koyu mavi dolu. Panel kırık beyaz kalıyor."
      mavi="Seçili satırın kendisinde; listenin en güçlü ögesi mavi."
    />
  );
}

export function SssRenkM4({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="m4"
      ad="M4 · Mavi sadece çizgide"
      not="Taban beyaz, hover kırık beyaz ve yalnız kenarlık maviye dönüyor, seçili satır siyah. Panel kırık beyaz. Hiçbir yazı maviye girmiyor."
      mavi="Hover'ın kenarlığında ve panelin künye satırında; yazılar baştan sona siyah-gri."
    />
  );
}
