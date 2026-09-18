"use client";

import { Fragment, useState } from "react";
import { ArrowRight, ChevronRight, CircleHelp } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import type { Faq } from "@/lib/countryContent";

/* ============================================================================
   /lab/sss-renk · SSS BLOĞUNUN RENKLERİ
   CSS: css/lab-sss-renk.css (yalnız renk; yapı canlı sınıfların kendisi)

   18.09.2026 · Burak: "sss kısmına layoutu sabit tutarak hoverdaki ve normal
   görünümdeki renklerini denesene daha güzel yapabiliriz diye düşünüyorum."

   DÜZEN GERÇEKTEN SABİT: bu dosya canlı bloğun sınıflarını (.sss, .sss-q,
   .sss-panel …) olduğu gibi basıyor, kendi yapısını kurmuyor. Adaylar yalnızca
   kaba `data-renk` özniteliği veriyor; lab-sss-renk.css de sadece renk
   bildiren satırları geçersiz kılıyor. Dolgu, ölçü, ızgara, yapışkanlık,
   yazı tipi — hiçbiri değişmiyor, yani adaylar arasındaki tek fark renk.

   HOVER EKRANDA GÖRÜNÜYOR: bir aday ekran görüntüsüyle kıyaslanacaksa hover'ın
   da karede olması gerekiyor. Listenin İKİNCİ sorusu `data-hover` alıyor ve
   CSS o satıra hover renklerini kalıcı basıyor; altındaki küçük künye de
   hangi satırın ne gösterdiğini yazıyor. Gerçek :hover kuralları da duruyor,
   yani fareyle gezince davranış birebir aynı.

   ÜÇ YÖN
     R1 · GECE SEÇİM   Taban bugünküyle aynı (kırık beyaz kutu, ince çizgi).
                       Hover bir ton koyulaşıyor, yazı rengi değişmiyor —
                       sessiz ama hissedilen bir geri bildirim. SEÇİLİ SATIR
                       GECE: listede hangisinin açık olduğu tek bakışta belli.
     R2 · MAVİ DOLU    Taban BEYAZ: kutular bölüm zemininden yalnız ince
                       çizgiyle ayrılıyor, liste hafifliyor. Hover kırık
                       beyaza iniyor (yani dokunulan satır kâğıda oturuyor),
                       seçili satır koyu mavi dolu ve yazısı beyaz.
     R3 · TERS KAĞIT   Taban kırık beyaz ama ÇİZGİSİZ; hover mavi sis
                       (--blue-100). Seçili satır BEYAZ + mavi kontur: açık
                       olan soru kâğıttan kalkıyor, kapalılar geride kalıyor.

   KONTRAST (ölçülü, docs/tuzaklar.md'deki tuzağa göre):
     · beyaz / #080808 (R1 seçili)          19,60:1
     · beyaz / #1b56a8 --blue-900 (R2)       7,14:1
     · #1b56a8 / #e8f1fd --blue-100 (R3)     ~6,3:1
   Marka mavisi #307fe2 üstüne beyaz küçük punto (3,99:1) hiçbir adayda YOK.
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
}: {
  items: Faq[];
  renk: string;
  ad: string;
  not: string;
}) {
  const [acik, setAcik] = useState(0);
  const toplam = items.length;
  return (
    <section className="sec-pad lsr-sec">
      <div className="container-o">
        <p className="lsr-etiket">{ad}</p>
        <p className="lsr-not">{not}</p>
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

export function SssRenkBugun({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="bugun"
      ad="Bugün · canlıdaki hâli"
      not="Taban kırık beyaz kutu, hover beyaza çıkıyor ve yazı maviye dönüyor, seçili satır mavi sis. Kıyas için burada duruyor."
    />
  );
}

export function SssRenkR1({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="r1"
      ad="R1 · Gece seçim"
      not="Taban aynı; hover bir ton koyuluyor ve yazı rengi değişmiyor. Seçili satır gece zemin, beyaz yazı."
    />
  );
}

export function SssRenkR2({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="r2"
      ad="R2 · Mavi dolu"
      not="Taban beyaz, kutular yalnız ince çizgiyle duruyor. Hover kırık beyaza iniyor, seçili satır koyu mavi dolu."
    />
  );
}

export function SssRenkR3({ items }: { items: Faq[] }) {
  return (
    <Blok
      items={items}
      renk="r3"
      ad="R3 · Ters kâğıt"
      not="Taban çizgisiz kırık beyaz, hover mavi sis. Seçili satır beyaz ve mavi konturlu: açık soru kâğıttan kalkıyor."
    />
  );
}
