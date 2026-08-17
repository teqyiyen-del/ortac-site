import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";
import { MtHead } from "@/components/lab/MtakvimShared";
import {
  MTW_AXIS,
  MTW_MONTHS,
  MtwDoors,
  MtwNote,
  mtwConditional,
  mtwCount,
  mtwFreq,
  mtwLanes,
} from "@/components/lab/CalMTShared4";

/* ============================================================================
   MT12 · HER RİTİM KENDİ KAPISI — yüzeydeki tek nesne bir KAPI

   İki referansın ortak noktasını sonuna kadar götüren aday: zincir tek gramer
   kullanıyor (38 nesne), CountryAfter ağır olanı kapının arkasına koyuyor
   (yüzey/derinlik 7,4). Burada ikisi aynı nesnede birleşiyor — SATIR ZATEN
   KAPI. Bölümde tek bir mobilya dili var, o da kapı; ikinci bir dil yok.

   ŞUNU ÇÖZÜYOR: tabanda üç şerit ÜST ÜSTE duruyor ve 36 kutu aynı anda
   açık. Oysa kimse üç ritmi aynı anda okumuyor; insan "benim KDV'm ne
   zaman" diye bakıyor. Üç şerit üç kapı olunca aynı anda en çok 12 kutu
   görünüyor ve o 12 kutu tek bir kalemin yılı, yani hizalanacak bir şey yok.

   BOŞ KUTU KAVRAMI DA DEĞİŞİYOR: tek kalemin şeridinde boş kutu "o ay bu iş
   yok" demek ve bu artık çözülmesi gereken bir kod değil, satırın kendi
   cevabı. Lejant gerekmiyor; kapının başlığında zaten "3 ayda bir · 4 kez"
   yazıyor.

   NE KAYBOLMUYOR: üç ritmin gerekçe cümleleri ve tam ay listeleri kendi
   kapılarının içine taşındı, silinmedi. "Üç ritim tam olarak ne demek?"
   başlığı da duruyor, artık üç kapının ortak başlığı.

   RİSK, AÇIKÇA: bölüm duran hâlde hiçbir çizim göstermiyor. MT10 ve MT11'in
   yanında bu adayın sınavı "boş mu duruyor" sorusu.

   HAREKET: kapalı satırın alt kenarında çok yavaş ilerleyen tek çizgi,
   17.633s, satırlar arasında faz kaymasıyla. Saf CSS, reduce kapısı CSS'te.
   ========================================================================= */

export default function CalMT12() {
  const lanes = mtwLanes();

  return (
    <section className="mtx-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <MtHead />

        <div className="mtw-body">
          <p className="mtw-sub">{C.calendar.stripTitle}</p>
          {/* Ritim kapılarının ortak başlığı. Şeridin sorusu da, üç ritmin
              sorusu da yüzeyde kalıyor; taşınan şey yalnız cevapların yeri. */}
          <p className="mtw-subl">
            {C.calendar.rhythmTitle} Satıra dokunun, o ritmin on iki ayı açılsın.
          </p>

          <div className="mtw-doors mtw-lanes">
            {lanes.map((l, i) => {
              const on = new Set(l.months);
              const kosul = mtwConditional(l);
              return (
                <details
                  key={l.id}
                  className="mtw-door mtw-lane"
                  /* Faz yalnızca satır sırasına bağlı: sunucu ile istemci
                     aynı değeri yazıyor, hidrasyon ayrışmıyor. */
                  style={{ "--faz": `-${i * 5.9}s` } as React.CSSProperties}
                >
                  <summary>
                    <span className="mtw-door-t">
                      <b>{l.label}</b>
                      <span>
                        {mtwFreq(l)} · ilk 12 ayda {mtwCount(l)} kez
                      </span>
                    </span>
                    {kosul && <em className="mtw-tag">{kosul}</em>}
                    <span className="mtw-door-i" aria-hidden="true" />
                  </summary>

                  <div className="mtw-door-b">
                    {/* Lejant ayrı bir nesne değil, eksenin adının devamı:
                        tabandaki iki kutulu okuma anahtarı burada iki kelime.
                        Kaybolan bilgi yok, kaybolan nesne var. */}
                    <p className="mtw-lane-a">
                      {MTW_AXIS} · dolu kutu: {C.calendar.legendOn} · boş kutu:{" "}
                      {C.calendar.legendOff}
                    </p>
                    {/* Tek kalemin yılı: aynı anda en çok 12 kutu. Dolu kutu
                        bir renk kodu değil, satırın kendi cevabı. */}
                    {/* Izgara ekran okuyucuya kapalı ve cümlesi ayrı bir
                        düğümde: on iki hücreyi tek tek okutmanın karşılığı
                        "1 2 3 4 …" olurdu, dolu olanın hangisi olduğu değil. */}
                    <p className="sr-only">
                      {l.label}: {l.months.join(", ")}. aylar.
                    </p>
                    <ol className="mtw-grid" aria-hidden="true">
                      {MTW_MONTHS.map((m) => (
                        <li key={m} className="mtw-cell" data-on={on.has(m) || undefined}>
                          <span aria-hidden="true">{m}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mtw-lane-c">{l.caption}</p>
                  </div>
                </details>
              );
            })}
          </div>

          <MtwNote subject="Kutular" />
        </div>

        {/* Ritim kapıları yukarı taşındığı için burada yalnız iki kapı var. */}
        <MtwDoors rhythm={false} />
      </div>
    </section>
  );
}
