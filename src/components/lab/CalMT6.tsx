import { RHYTHM_LABEL } from "@/lib/afterSetup";
import { ACCOUNTING_DUBAI as C, accountingItems, yearLanes } from "@/lib/accountingDubai";
import { MtHead, MtTaxFold, MtWhyFold, mtCaption } from "@/components/lab/MtakvimShared";

/* ============================================================================
   MT6 · SİZDE HANGİSİ DOĞUYOR — eksen zaman değil, geçerlilik

   HANGİ VARSAYIMI KIRIYOR: reddedilen üçü de "ziyaretçi takvimi öğrenmeye
   geldi" diye varsaydı ve üçü de aynı soruya (ne zaman) üç ayrı cevap verdi.
   Ziyaretçinin gerçek sorusu bu değil. Fiyat bölümünün kendi cümlesi bunu
   zaten söylüyor: "Rozet, kalemin herkeste doğup doğmadığını söylüyor."
   Yani asıl merak edilen şey "hangi ay", "BENDE DOĞAR MI".

   EKSEN VERİDEN GELİYOR, İCAT EDİLMEDİ: afterSetup.ts'teki her kalemin
   `inclusion` alanı var ve bu sayfaya ait altı kalem tam ikiye bölünüyor —
   üçü "ornekte" (şirket aktifse doğuyor), üçü "gerekli-ise" (yalnızca şartı
   oluşursa). Bölüm bu ayrımı ekrana koyuyor, sayılar da elle yazılmıyor,
   listelerin uzunluğundan geliyor.

   BU AYRIM İKİ KUTU DOLDURMUYOR, ON SEKİZ BOŞ KUTUYU SİLİYOR: bugünkü matriste
   boş kutular "bu ay bu kalem yok" demek için duruyor. Ama bir ziyaretçi için
   asıl "yok" başka bir yerde — KDV kaydı olmayan şirkette o satırın hiçbir ayı
   yok. Matris bunu söyleyemiyor, bu ayrım tek satırda söylüyor.

   ZAMAN SİLİNMİYOR, SATIRIN ÖZELLİĞİ OLUYOR: her satırın sağında ritmi yazılı
   (RHYTHM_LABEL — ekrandaki ritim adlarının tek kaynağı, fiyat bölümü de aynı
   haritayı kullanıyor). Ay listeleri açılır blokta duruyor.

   NEYİ FEDA EDİYOR: yılın sırası. Hangi kalemin hangi ay çıktığı yüzeyde hiç
   yok; "önce şu, sonra bu" hissi de yok. Buna karşılık bölüm iki kalem
   kazanıyor (KDV kaydı ve bağımsız denetim) — ikisi de bu sayfanın fiyat
   listesinde duruyor ama bugünkü takvim şeridinde hiç geçmiyor.
   ========================================================================= */

export default function CalMT6() {
  const items = accountingItems();
  /* Ay listesi yalnızca şeritte geçen (yani tekrar eden) kalemlerde var. */
  const laneMonths = new Map(yearLanes().map((l) => [l.id, l.months]));

  const sure = items.filter((i) => i.inclusion === "ornekte");
  const maybe = items.filter((i) => i.inclusion !== "ornekte");

  const groups = [
    {
      id: "kesin",
      title: "Şirket aktifse doğuyor",
      /* İddia değil tarif: üçünün de kendi `line` cümlesi zorunluluğu
         söylüyor (yasal zorunluluk · yasal süresi içinde · her mali yıl
         sonunda). Cümlelerin tamamı aşağıdaki açılır blokta. */
      rows: sure,
    },
    {
      id: "kosullu",
      title: "Yalnızca şartı oluşursa",
      /* INCLUSION_LABEL["gerekli-ise"].long ile aynı iddia: "yalnızca şartlar
         oluşursa doğar". */
      rows: maybe,
    },
  ];

  return (
    <section id="mt6" className="mtx-sec">
      <div className="container-o">
        {/* BAŞLIK DA DEĞİŞİYOR — alternatifin fikri bu. Bölüm "hangi ay ne
            oluyor" diye sorduğu sürece ziyaretçi ay aramaya devam eder ve
            ekranda ay olmadığı için bölüm eksik görünür. Soru değişince cevap
            da yerine oturuyor. Giriş cümlesi de kapalı: altındaki cümle onun
            yerini alıyor ("üç ritim" değil, altı kalem). */}
        <MtHead
          heading="Sizde hangi kalem doğuyor, hangi sıklıkta?"
          accent="hangi kalem doğuyor"
          lead={false}
        />

        <div className="mtx-body">
          {/* Sayılar listelerden geliyor: kalem eklenirse cümle de değişir.
              "Ne zaman başlıyor" sorusunun cevabı da burada: tek seferlik
              kalemler kuruluşta doğuyor, gerekçesi açılır blokta. */}
          <p className="mt6-say">
            {/* Giriş cümlesinin ilk yarısı KAYBOLMUYOR, buraya taşınıyor:
                "ne zaman başlıyor" sorusunun cevabı o cümle. */}
            {C.calendar.lead.split(".")[0]}. Muhasebe tarafında {items.length} kalem
            var: {sure.length} tanesi şirket aktif olduğu sürece doğuyor,{" "}
            {maybe.length} tanesi yalnızca şartı oluşursa.
          </p>

          <div className="mt6-groups">
            {groups.map((g) => (
              <div className="mt6-group" key={g.id}>
                <h3 className="mt6-gh">
                  {g.title}
                  <span className="mt6-gn">{g.rows.length} kalem</span>
                </h3>
                <ul className="mt6-rows">
                  {g.rows.map((it) => (
                    <li key={it.id}>
                      <span className="mt6-name">{it.title}</span>
                      <span className="mt6-freq">{RHYTHM_LABEL[it.rhythm]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Listede ay yok, ritim var — şerh de onu niteliyor. */}
          <p className="mtx-note">
            {mtCaption("Ritim etiketleri", "işin hangi sıklıkta çıktığını")}
          </p>

          <div className="mtx-folds">
            <MtWhyFold />

            {/* TEK KAPI, İKİ SORU BİRDEN: kalemin neden doğduğu ve hangi
                aylara denk geldiği. Ayrı iki blok olsalardı ikisi de aynı altı
                kalemi baştan sayardı — aynı listeyi iki kez okutmak, bugünkü
                bölümün şikâyet edilen hâlinin küçük bir kopyası olurdu.

                Ay listesi yalnızca TEKRAR EDEN kalemlerde basılıyor: tek
                seferlik kalemlerin months dizisi [1] ve bu "1. ayda" demek
                değil, "kuruluşta" demek — sayı olarak basılırsa yanıltır. */}
            <details className="mtx-fold">
              <summary>
                Hangi kalem neden doğuyor, hangi aylara denk geliyor?
                <span className="mtx-x" aria-hidden="true" />
              </summary>
              <ul className="mtx-caps">
                {items.map((it) => {
                  const months = laneMonths.get(it.id);
                  return (
                    <li key={it.id}>
                      <b>{it.title}</b> — {it.line}
                      {it.note && ` ${it.note}`}
                      {months &&
                        months.length < 12 &&
                        ` (${months.join(", ")}. aylar)`}
                    </li>
                  );
                })}
              </ul>
            </details>

            <MtTaxFold />
          </div>
        </div>
      </div>
    </section>
  );
}
