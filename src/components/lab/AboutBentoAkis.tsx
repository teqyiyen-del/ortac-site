import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN } from "@/lib/brand";
import { BASIS, FOR_WHOM, SUMMARY, WHERE } from "@/lib/about";
import { ABOUT_ICON, SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 4 · "AKIŞ"
   Biçim: src/app/css/lab-hb4.css (ad alanı .hb4-)

   ------------------------------------------------------------------- FİKİR
   Bento dört ayrı kart değil, TEK BİR MAKİNE. Dört karo aynı enerji
   geçişinin dört durağı: ışık ülkelerden çıkıyor, zincirin beş halkasından
   geçiyor, altı sektöre yayılıyor ve dayanaklara varıyor. Karolar arasında
   çizgi yok; onları birbirine bağlayan şey SIRA — ışığın hangi karoda ne
   zaman göründüğü.

   ----------------------------------------------------- NEDEN ANLATMIYOR
   Müşterinin teşhisi: "sayfanın az aşağısına kayınca üç ülkede çalışıyoruz
   diyip detaylı bilgi vermişiz ya o yüzden tekrar bentoda verince biraz
   garip oluyor."

   Bu adayda o tekrar YAPISAL OLARAK imkânsız: bloğun taşıdığı görünür metin
   dört rakamdan ibaret ve rakamların etiketi bile yok. Sayfanın aşağısındaki
   hiçbir cümle burada bir kez daha okunmuyor, çünkü burada okunacak cümle
   yok. Ziyaretçi bir şey öğrenmiyor; sayfanın neyle ilgili olduğunu
   GÖRÜYOR ve devamı zaten aşağıda duruyor.

   Rakamlar silinmedi ama etiketsiz: bir plaka numarası gibi köşede
   duruyorlar. Ne saydıklarını yanındaki nesneler söylüyor (üç bayrak, beş
   halka, altı sektör işareti, dört mühür). Sayı elle yazılmıyor, dizinin
   uzunluğu — bir ülke eklendiğinde köşedeki rakam kendiliğinden değişiyor.

   ----------------------------------------- ANA SAYFA BENTOSUNDAN NE ALDI
   Geometriyi ve tonu: altı sütun, eşit olmayan hücreler (2 · 4 / 4 · 2), iki
   koyu iki açık. Almadığı şey ANATOMİ: oradaki karo "işaret → başlık → satır
   → pano → dipnot" diye kurulu ve bu adayda başlık da satır da dipnot da yok.
   İskelet duruyor, içine anlatı değil biçim giriyor.

   Koyu karolar köşegende (sol üst, sağ alt): ızgara tek bir düz levha gibi
   okunmuyor ve göz ışığın izlediği Z yolunu ton üzerinden de takip ediyor.

   ------------------------------------------------------------------ HAREKET
   İki katman, ve ikisi de bilerek farklı ritimde:

     · SÜREKLİ — zincir rayında bir parıltı hiç durmadan soldan sağa geçiyor
       (10,3 s). Ekran hiçbir an ölü değil.
     · OLAY — 11,3 saniyede bir bütün bentoyu kat eden bir aktarım dalgası.
       Bu dalga aktarim.css kalıbı (.akt / .akt-durak); mekanizmanın tek satırı
       burada ya da lab-hb4.css'te yazılmadı, yalnızca DEĞER verildi.

   Önceki turda bir sahne 34 saniyede bir dönüyordu ve müşteri "görmemiştim
   bile" dedi. 11,3 saniye o hatanın üç katı sıklığında; üstelik sürekli
   katman sayesinde dalgayı beklerken de ekranda bir şey oluyor.

   -------------------------------------------------------------- ERİŞİM
   Görünür metin dört rakam olduğu için karoların adı aria-label ile
   veriliyor ve o adlar da UYDURULMUYOR: about.ts · SUMMARY etiketleri ile
   BASIS.heading. Ekran okuyucu "3 ülke", "5 halkalı zincir", "6 sektör" ve
   "Neye dayanarak çalışıyoruz" duyuyor; ekranda yalnızca rakam görünüyor.

   Karoların içindeki işaretler aria-hidden: bayrak, halka ve ikon birer
   süs değil ama taşıdıkları bilgi karonun adında zaten var, iki kez
   okunmalarının anlamı yok.
   ========================================================================= */

/* Etiketler about.ts'ten okunuyor, burada yazılmıyor. Bu satırların çıktısı
   yalnızca aria-label'a gidiyor; ekranda hiçbiri görünmüyor. */
const AD = Object.fromEntries(SUMMARY.map((s) => [s.k, s.label]));

export default function AboutBentoAkis() {
  const nUlke = WHERE.countries.length;
  const nHalka = CHAIN.length;
  const nSektor = FOR_WHOM.sectors.length;
  const nDayanak = BASIS.cards.length;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* `akt` KABIN üstünde: aktarim kalıbı turu kabın hover'ında
            duraklatıyor, tek tek durakların değil. Değişkenler de burada;
            duraklar onları miras alıyor (bkz. lab-hb4.css · HAREKET). */}
        <div className="hb4 akt">
          {/* ===================================== 1 · ÜLKE (koyu, dar) */}
          <FadeUp className="hb4-w hb4-w-dar" y={18} delay={0.06}>
            <article className="hb4-t hb4-t-dark" aria-label={`${nUlke} ${AD.where}`}>
              <b className="hb4-no">{nUlke}</b>
              <div className="hb4-ulke" aria-hidden="true">
                {WHERE.countries.map((c) => (
                  /* BAYRAK TUZAĞI: `Flag` width/height taşımayan çıplak bir
                     <svg viewBox="0 0 60 40"> döndürüyor; kabı ölçülmezse
                     300 × 150'ye açılıyor ve bu sayfa bir kez tam bu yüzden
                     çöktü. .hb4-disk sabit piksel, dört satırı da şart. */
                  <span key={c.slug} className="hb4-disk akt-durak">
                    <Flag country={c.slug} />
                  </span>
                ))}
              </div>
            </article>
          </FadeUp>

          {/* ==================================== 2 · ZİNCİR (açık, geniş)
              Rayın geniş karoda olmasının sebebi içerik değil HAREKET: dalga
              en uzun yolu burada alıyor ve bentonun ritmini bu karo kuruyor. */}
          <FadeUp className="hb4-w hb4-w-genis" y={18} delay={0.12}>
            <article className="hb4-t" aria-label={`${nHalka} ${AD.chain}`}>
              <b className="hb4-no">{nHalka}</b>
              <div className="hb4-ray" aria-hidden="true">
                <span className="hb4-hat akt-durak" />
                {/* Sürekli katman. Aktarım dalgasından bağımsız ve ondan
                    ayrı bir periyotta: ikisi senkron olsaydı tek bir nabız
                    gibi okunurdu. */}
                <span className="hb4-glint" />
                <span className="hb4-dugumler">
                  {CHAIN.map((s) => (
                    <span key={s.key} className="hb4-dugum akt-durak" />
                  ))}
                </span>
              </div>
            </article>
          </FadeUp>

          {/* =================================== 3 · SEKTÖR (açık, geniş) */}
          <FadeUp className="hb4-w hb4-w-genis" y={18} delay={0.18}>
            <article className="hb4-t" aria-label={`${nSektor} ${AD.sectors}`}>
              <b className="hb4-no">{nSektor}</b>
              {/* İkonlar sayfanın sektör bölümündekilerle AYNI glif. Aynı
                  sektörün iki blokta iki farklı işaretle çıkması, ziyaretçinin
                  kurduğu görsel eşlemeyi bozar. */}
              <div className="hb4-sekt" aria-hidden="true">
                {FOR_WHOM.sectors.map((s) => {
                  const Icon = SECTOR_ICON[s.slug];
                  return (
                    <span key={s.slug} className="hb4-kuyu akt-durak">
                      {Icon ? <Icon size={19} strokeWidth={1.7} /> : null}
                    </span>
                  );
                })}
              </div>
            </article>
          </FadeUp>

          {/* ==================================== 4 · DAYANAK (koyu, dar) */}
          <FadeUp className="hb4-w hb4-w-dar" y={18} delay={0.24}>
            <article className="hb4-t hb4-t-dark" aria-label={BASIS.heading}>
              <b className="hb4-no">{nDayanak}</b>
              <div className="hb4-muhur" aria-hidden="true">
                {BASIS.cards.map((c) => {
                  const Icon = ABOUT_ICON[c.icon];
                  return (
                    <span key={c.t} className="hb4-mim akt-durak">
                      {Icon ? <Icon size={17} strokeWidth={1.7} /> : null}
                    </span>
                  );
                })}
              </div>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
