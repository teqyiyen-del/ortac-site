import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";
import { MtHead } from "@/components/lab/MtakvimShared";
import { MtwNote, mtwAlt, mtwLanes } from "@/components/lab/CalMTShared4";
import {
  MtyAxis,
  MtyCount,
  MtyDoors,
  MtyKey,
  MtyRecords,
  MtyTrack,
  mtyFacts,
  mtyPeakText,
  mtyPeakX,
  mtySplitText,
} from "@/components/lab/CalMTShared5";

/* ============================================================================
   MT16 · ÜÇ KAYIT YAN YANA — MT14'ün aynısı, ilk perde sütunlaşıyor

   Müşteri: "mt14 güzel ama üstteki 3 tane şeyi yan yana koyalım."

   MT14'TEN TEK FARK bu: kuruluşta açılan üç kayıt alt alta satır değil,
   kartın içinde üç sütun. Kalan her şey birebir MT14 — gece kart, iki perde,
   12/12 cevabı, tepe ayı kesen kılavuz, aynı kapılar. Kıyas tek değişkenli
   olsun diye ikinci bir fikir eklenmedi.

   MÜŞTERİNİN ÖNCEKİ İSTEĞİ KORUNUYOR: kayıtlar hâlâ "siyah kısmın içinde" ve
   akışta yılın ÖNÜNDE — canlıdaki "en üstte başlıyor" hissi duruyor. Yan yana
   koymak sırayı değiştirmiyor, yalnız o ilk perdenin yüksekliğini düşürüyor.

   ÜÇ ÖLÇÜLEN BEDEL. Ölçüm sabit genişlikli aynı-kaynak iframe içinde
   yapıldı (tuzak L); taşma gerçek scrollTo(9999,0) ile okundu (tuzak D).

   1) SÜTUN GENİŞLİĞİ. 1440px'te kap 1200'de doyuyor, .mty-card iç genişliği
      1080px, üç sütun 360'ar px ve metne 342 / 323 / 341px kalıyor. MT14'te
      aynı başlıklara 1024px düşüyordu, yani sütun MT14'ün üçte biri.
      BAŞLIKLAR YİNE DE SARMIYOR ama ancak satır başı iki kademeye ayrıldığı
      için: numara ile artı üst satıra çıktı, başlık alt satırda sütunun
      TAMAMINI kullanıyor. Ölçülen sayılar:
        · en uzun başlık ("Kurumlar vergisi kaydı ve TRN") 14px/600 = 209px,
        · iki kademeli başla o başlığa 323px (1440) → 226px (900) kalıyor,
          üç başlık da 900'e kadar tek satır,
        · YATAY baş denendi ve elendi: numara 15 + iki 12px boşluk + 18px
          artı = 57px götürüyor; başlığa 266px (1440) → 169px (900) kalıyor
          ve orta başlık 1024px'ten itibaren sarıyor, 900'de iki başlık
          birden sarıyor.
      Alternatif "artıyı sil" elendi: kapı olduğunu söyleyen tek işaret o.

   2) KART UZAMASI. Üç kayıt aynı ızgara satırında, o yüzden açılan gövdeler
      alt alta EKLENMİYOR, yan yana geliyor. 1440px'te (kart kapalıyken
      MT14 701px, MT16 631px — yan yana yerleşim kapalı hâlde zaten 70px
      kısaltıyor):
        · tek kayıt açık   MT14 +84px (785) · MT16 +147..168px (778..799)
        · üçü birden açık  MT14 +253px (954) · MT16 +168px (799)
      1024px'te üçü açık MT14 954 · MT16 841. 900px'te MT14 985 · MT16 872.
      Yani yan yana TEK açılışta pahalı (dar sütunda aynı metin daha çok
      satıra dağılıyor), ÜÇ açılışta belirgin ucuz; mutlak yükseklik "tam
      olarak bir kayıt açık" hâli dışında her durumda MT14'ün altında.
      SATIR ZIPLAMASI: aşağıdaki ray kartın uzadığı kadar iniyor (ölçülen
      fark 0-1px), ama KOMŞU SÜTUNLAR OYNAMIYOR — üç başlığın left/top
      değerleri kapalı, biri açık ve ikisi açık hâlde birebir aynı çıktı.

   3) DAR EKRAN. Eşik 900px; altında üçü MT14'ün alt alta satırlarına
      dönüyor ve ölçüm MT14 ile BİREBİR aynı çıkıyor (899/768/640/520/375'te
      kayıt bloğu 138px, kart yüksekliği aynı; 320'de ikisinde de başlıklar
      iki satıra sarıyor). Hiçbir genişlikte yatay taşma yok (scrollX = 0).
      Eşik zorlanmadı, çünkü ölçüldü: yan yana bırakılsaydı gövde metni
      satır başına 31 karakter (899) → 25 (860-768) → 16 (640) → 13 (520) →
      8 karakter (375 ve 320) oluyor, başlıklar 835px'ten itibaren sarmaya
      başlıyor ve 320'de sütuna 39-58px metin kalıyor. 320-768 arası üç
      sütun okunur bir ölçü değil.

   YAN ETKİ (bedel değil, kazanç): MT14'te gövde kartın tamamına yayılıyor
   ve satır başına 75-125 karakter düşüyor, yani rahat okuma ölçüsünün
   üstünde. Sütunda 38-48 karaktere (1440-1280) iniyor; 1024-900 arasında
   31-38'e düşüyor ki bu sefer alt sınıra yaklaşıyor.

   HAREKET: MT14 ile aynı ışık, 16.993s (asal ms; 11.987 · 19.441 · 23.099 ve
   dördüncü turun 13.417 · 21.283 · 17.633 değerleriyle aralarında asal).
   ========================================================================= */

export default function CalMT16() {
  const lanes = mtwLanes();
  const f = mtyFacts(lanes);

  return (
    <section className="mtx-sec" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <MtHead />

        <div className="mtw-body">
          <div className="mty-card">
            {/* PERDE 1 — kuruluşta bir kez. MT14'ten tek fark: lay="sutun". */}
            <p className="mty-act">{C.why.title}</p>
            <MtyRecords tone="night" lay="sutun" />

            {/* PERDE 2 — sonra her yıl. MT14 ile birebir. */}
            <div className="mty-act2">
              <div className="mty-hd">
                <p className="mty-q">{C.calendar.stripTitle}</p>
                <p className="mty-a">
                  {f.busy}
                  <span className="mty-aden">/ {f.load.length} ay</span>
                </p>
                <p className="mty-al">
                  İş çıkmayan ay yok. Toplam <b>{f.total} iş</b>: {mtySplitText(f)};{" "}
                  {mtyPeakText(f)}.
                </p>
              </div>

              <div
                className="mty-rail"
                data-peak=""
                style={
                  { "--mty-dur": "16.993s", "--pk": mtyPeakX(f) } as React.CSSProperties
                }
              >
                {/* Çizim aria-hidden; cümle ayrı bir düğüm (tuzak G). */}
                <p className="sr-only">{mtwAlt(lanes)}</p>

                <MtyAxis />

                <ol className="mty-rows">
                  {lanes.map((l) => (
                    <li key={l.id}>
                      <div className="mty-key-row">
                        <MtyKey lane={l} />
                        <MtyTrack months={l.months} />
                        <MtyCount n={l.months.length} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <MtwNote subject="Kart" />
        </div>

        <MtyDoors />
      </div>
    </section>
  );
}
