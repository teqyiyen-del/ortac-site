import { MtHead } from "@/components/lab/MtakvimShared";
import {
  MTW_AXIS,
  MtwDoors,
  MtwNote,
  mtwAlt,
  mtwConditional,
  mtwCount,
  mtwFreq,
  mtwIsEvery,
  mtwLanes,
} from "@/components/lab/CalMTShared4";

/* ============================================================================
   MT10 · TEK RAY — yüzeydeki tek nesne bir ÇİZİM

   Referans: ana sayfadaki zincir. Ölçüm neden iyi olduğunu söylüyor: 38 nesne,
   7 tipografik ton, TEK üst düzey blok ve tek gramer. Beş satırın beşi aynı
   ekseni paylaşıyor, o yüzden ikinci satırı okumak yeni bir şey öğrenmiyor.

   Zincir'den alınan üç kural:
     1) TEK EKSEN, HERKES ONA DİZİLİ. Üç kalem üç ayrı şerit değil; tek rayın
        üstünde üç satır. Taban 12 sütunlu bir matris çiziyor ve ziyaretçiden
        üç satırı gözüyle hizalamasını istiyor.
     2) EKSENİN ADI VAR VE GERÇEK NOKTAYA ÇAPALI. Zincir "Kuruluş anı / 1 yıl /
        süresiz devam ediyor" diyor. Burada "Lisans / 6. ay / 12. ay" ve rayın
        adı yanında: "lisanstan sonra kaçıncı ay". Tabandaki adsız 1-12 dizisi
        mart-nisan sanılıyordu.
     3) LEJANT YOK, ÇÜNKÜ ÇİZİM KELİMESİNİ YANINDA TAŞIYOR. Zincir'de "Yılda 12
        kez" yazısı ile tırtık sayısı TEK diziden çıkıyor. Burada da sağdaki
        "her ay · 12 kez" ile raydaki işaret sayısı aynı months dizisinden.
        Tabanın "iş var / o kalem doğmuyor" lejantı bir sözlüktü; sözlük gerekiyorsa
        çizim kendini anlatmıyor demektir.

   NESNE İNDİRİMİ: 36 kutunun 19'u boştu, yani ekranın yarısı "burada bir şey
   yok" demek için duruyordu. Boşluğun görsel karşılığı zaten hiçbir şey
   çizmemek. Her-ay-olan kalem de 12 ayrı kutu değil, 12 çentikli TEK çubuk
   (çentikler maske, boya değil — Chain'in kuralı: işaretin yeri animasyon
   boyunca kaymasın).

   HAREKET: rayın üstünden geçen tek ışık, 13.417s. Yalnız SÜREN kalemde var;
   biten kalem duruyor ve durması bir bilgi (zincirin kuralı: hareket eden
   satır = bitmeyen iş). Saf CSS, reduce kapısı CSS'te.
   ========================================================================= */

export default function CalMT10() {
  const lanes = mtwLanes();

  return (
    <section className="mtx-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <MtHead />

        <div className="mtw-body">
          <p className="mtw-sub">{/* rayın kendi adı: yüzeydeki tek nesnenin başlığı */}
            İlk 12 ayda iş hangi aylarda çıkıyor?
          </p>

          <div className="mtw-rail">
            {/* Çizimin kelimeye çevrilmiş hâli. `role="img"` + aria-label
                RAYIN TAMAMINA konsaydı satırların adı, sıklığı ve koşul
                etiketi de erişilebilirlik ağacından düşerdi — bu depoda görsel
                olarak gizlenen metnin ağaca hiç çıkmadığı üç vaka var, tersi de
                aynı derecede kolay. Çizim aria-hidden, cümle ayrı bir düğüm.
                Kap overflow taşımıyor, o yüzden .sr-only dışarı kaçamaz. */}
            <p className="sr-only">{mtwAlt(lanes)}</p>

            {/* Eksen bir kez çiziliyor ve üç satır onu paylaşıyor. Üç etiketin
                üçü de rayın gerçek bir noktasına çapalı; havada duran kelime
                yok. Ad da yanında: eksenin ne saydığı yazılı. */}
            <div className="mtw-axis" aria-hidden="true">
              <span className="mtw-axis-n">{MTW_AXIS}</span>
              <span className="mtw-axis-l">
                <i style={{ "--x": "0%" } as React.CSSProperties}>Lisans</i>
                <i style={{ "--x": "50%" } as React.CSSProperties}>6. ay</i>
                <i style={{ "--x": "100%" } as React.CSSProperties}>12. ay</i>
              </span>
            </div>

            <ol className="mtw-rows">
              {lanes.map((l) => {
                const every = mtwIsEvery(l);
                const kosul = mtwConditional(l);
                return (
                  <li key={l.id} className="mtw-row" data-kind={every ? "surer" : "biter"}>
                    <span className="mtw-row-k">
                      <b>{l.label}</b>
                      {kosul && <em className="mtw-tag">{kosul}</em>}
                    </span>

                    {/* Çizim ekran okuyucuya kapalı: rayın tamamı zaten
                        aria-label ile bir cümle olarak okunuyor. */}
                    <span className="mtw-track" aria-hidden="true">
                      {every ? (
                        /* 12 çentikli TEK çubuk. Çentik aralığı months
                           uzunluğundan geliyor; 12 ayrı düğüm yok. */
                        <span
                          className="mtw-bar"
                          style={{ "--n": l.months.length } as React.CSSProperties}
                        />
                      ) : (
                        l.months.map((m) => (
                          <span
                            key={m}
                            className="mtw-dot"
                            style={{ "--x": `${((m - 0.5) / 12) * 100}%` } as React.CSSProperties}
                          />
                        ))
                      )}
                    </span>

                    {/* Rakam ile çizim aynı diziden: ikisi çelişemez. */}
                    <span className="mtw-row-c">
                      {mtwFreq(l)} · {mtwCount(l)} kez
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <MtwNote subject="Ray" />
        </div>

        <MtwDoors />
      </div>
    </section>
  );
}
