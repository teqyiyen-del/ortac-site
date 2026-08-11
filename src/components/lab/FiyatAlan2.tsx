"use client";

import { ArrowRight, Info } from "lucide-react";
import CountUp from "@/components/shared/CountUp";
import SmartLink from "@/components/shared/SmartLink";
import { AfBayrak, AfCips } from "@/components/lab/FiyatAlanParca";
import { extraFor, money, type Need, type NeedKey } from "@/components/lab/fiyatKart";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS } from "@/lib/brand";

/* ============================================================================
   LAB · ADAY 2 · "ÖLÇEK" · .af2-

   İÇERİK KARARI — ASIL BİLGİ FARKIN KENDİSİ
   Bugün ekranda üç mutlak rakam var; aralarındaki ilişkiyi ziyaretçi kafadan
   çıkarıyor. Bu bölümde yapılan iş bir satın alma değil bir KIYAS, o yüzden
   çıkarma ekrana alındı:
     GELEN  ortak ölçek (üç tutar aynı eksende) + en düşük tutara olan fark
     GİDEN  kalem listesi, kalem tutarları, kapsam cümlesi, satır dipnotları,
            ikinci düğme
   Fark YENİ BİR SAYI DEĞİL: ekranda zaten duran iki tutarın çıkarması. Yeni
   bir iddia üretilmedi.

   SIRA DEĞİŞMİYOR, BİLEREK.
   Satırlar her zaman COUNTRY_ORDER sırasında (Dubai · İngiltere · KKTC).
   Ucuzdan pahalıya diziseydik her çip tıklamasında satırlar yer değiştirir,
   ziyaretçi baktığı satırı kaybederdi; ayrıca sıralamanın kendisi bir tavsiye
   gibi okunurdu. Sıralamayı çubuğun boyu zaten gösteriyor.

   ÜÇ UYARI DEĞİL BİR CÜMLE.
   Ülke başına "dürüst kısıt" satırı denenmedi: müşteri o kalıbı ana sayfanın
   ülkeler bölümünde bir kez kapattı ("ülkelerin hepsine dürüst kısıt
   yazmışsın, aşırı dikkat çekiyor"). Yerine bölüm ölçeğinde tek cümle:
   sıralamanın tutar sıralaması olduğu, tavsiye olmadığı. Cümle uydurulmadı,
   sitenin kendi duruşundan (brand.ts · STANCE_A) türetildi.

   KONTRAST — DERECELİ ZEMİN
   Zemin 180 derece #307fe2 → #1b56a8, durak 360px. Beyaz metnin 4,5:1'e
   ulaştığı yer t=0,218, yani y=78,5px. Bölümün üst dolgusu 72px ve o bantta
   yalnızca başlık var (büyük metin, 3:1). Normal punto taşıyan ilk öğe
   y=170'in altına inmiyor. Durağın altı düz #1b56a8 = 7,14:1, yani bölüm
   uzadıkça oran yalnızca iyileşiyor.
   ========================================================================= */

export default function FiyatAlan2({
  on,
  toggle,
  picked,
}: {
  on: Record<NeedKey, boolean>;
  toggle: (k: NeedKey) => void;
  picked: Need[];
}) {
  const totals = COUNTRY_ORDER.map((c) => FACTS[c].from + extraFor(picked, c));
  const max = Math.max(...totals);
  const min = Math.min(...totals);

  return (
    <section className="af2" aria-labelledby="af2-bas">
      <div className="afx-in container-o">
        <h2 id="af2-bas" className="h2 af2-bas">
          Rakamlar, ihtiyacınıza göre.
        </h2>
        <p className="af2-lead">
          Üç ülke aynı ölçekte. Kuruluşa ek olarak neye ihtiyacınız olduğunu seçin;
          hem tutarlar hem aradaki fark birlikte değişsin.
        </p>

        <div className="af2-cips">
          <AfCips aday="Aday 2 · Ölçek" on={on} toggle={toggle} />
        </div>

        <p className="sr-only" aria-live="polite">
          {COUNTRY_ORDER.map(
            (c, i) => `${COUNTRY_NAME[c]} ${totals[i]} dolar`,
          ).join(", ")}
        </p>

        <div className="af2-olcek">
          {COUNTRY_ORDER.map((c, i) => {
            const total = totals[i];
            const fark = total - min;
            /* Çubuk boyu en yüksek tutara göre. En kısa çubuk bile görünsün
               diye taban yok: üç tutarın oranı zaten 1'e 3'ten dar. */
            const w = (total / max) * 100;
            return (
              <div key={c} className="af2-satir">
                <div className="af2-ad">
                  <AfBayrak c={c} />
                  <h3>{COUNTRY_NAME[c]}</h3>
                  <span className="af2-gun">{FACTS[c].days}</span>
                </div>

                {/* Çubuk grafik: ölçüyü taşıyan tek şey genişlik, o yüzden
                    aynı bilgi rakamla da yazılı. Ekran okuyucu için çubuk
                    görünmez (aria-hidden), rakam satırın kendi metninde. */}
                <div className="af2-yol" aria-hidden="true">
                  <span className="af2-cubuk" style={{ width: `${w}%` }} />
                </div>

                <div className="af2-deger">
                  <CountUp value={total} fontSize={30} color="#ffffff" />
                  <span className="af2-fark" data-min={fark === 0}>
                    {fark === 0 ? "en düşük tutar" : `+${money(fark)} fark`}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Eksen — hem ölçeğin tabanı hem bu adayın tek sürekli hareketi. */}
          <div className="af2-eksen">
            <span className="af2-eksen-isik" aria-hidden="true" />
          </div>
          <div className="af2-eksen-alt">
            <span>
              {picked.length === 0
                ? "Kuruluş başlangıç tutarı"
                : `Kuruluş + ${picked.length} kalem`}
            </span>
            <span>ölçek sonu {money(max)}</span>
          </div>
        </div>

        <div className="af2-alt">
          <div className="af2-altsol">
            {/* Tek dürüstlük cümlesi, ülke başına değil bölüm başına. */}
            <p className="afx-not">
              <Info size={15} strokeWidth={2.1} />
              Sıralama yalnızca tutar sıralamasıdır, tavsiye değildir: hangi ülkenin
              doğru olduğu faaliyete, yapıya ve mukimliğe bağlıdır. Tutarlar
              tahminîdir; resmî harçlar ile üçüncü taraf ücretleri değişebilir.
            </p>
            <SmartLink href="/ulkeler" className="afx-cikis">
              Üç ülkeyi ölçüt ölçüt karşılaştırın
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
          <SmartLink href="/basla" className="afx-dugme">
            Kurulumu başlat
            <ArrowRight size={15} strokeWidth={2.1} />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
