import SmartLink from "@/components/shared/SmartLink";
import { formatDate } from "@/lib/blog";
import { sortedPress } from "@/lib/press";
import type { Country } from "@/lib/store";

/* ADAY T2 (.gc2-) — TÜR: SOSYAL KANIT
 *
 * ==========================================================================
 * BU ARALIĞA VERDİĞİ İŞ
 *
 * Hero bittiğinde konuşan taraf değişiyor. Sayfanın geri kalanı boyunca
 * Dubai'yi anlatan biziz; bu aralıkta bir kez BAŞKASI konuşuyor ve söylediği
 * şeyin doğruluğu bize bağlı değil. Aralığın işi tam olarak bu: ülkeye dair
 * ikinci bir ağız, ondan sonra sayfa kendi sesine dönüyor.
 *
 * Müşterinin yönü "tamamen konudan apayrı düşünerek" diyordu; bu aday onu
 * kelimenin tam anlamıyla uyguluyor — bölüm ülkeyi TANITMIYOR, ülke hakkında
 * yazılmış bir haberi gösteriyor.
 *
 * ==========================================================================
 * UYDURMA REFERANS YOK — TEK KAYNAK press.ts
 *
 * Manşet, yayın adı ve tarih lib/press.ts'ten OLDUĞU GİBİ geliyor. O
 * dosyadaki sekiz kaydın sekizi de tek tek çağrılıp 200 döndüğü ve gövdesinde
 * firmanın adı geçtiği doğrulanmış (dosya başındaki "NASIL DOĞRULANDI"
 * notu). Buraya elle bir cümle, bir müşteri sözü ya da bir rakam YAZILMADI.
 *
 * SEÇİM KURALI: en yeni kayıt (sortedPress()[0]). Elle bir id seçilseydi
 * liste güncellendiğinde bu bölüm sessizce eskirdi. Şerit ise bütün
 * kayıtların yayın adlarını taşıyor. Bugün sekiz kaydın sekizi de ayrı bir
 * yayın, yani şeritte sekiz ad çıkıyor; yine de Set'ten geçiyor, çünkü aynı
 * ajans metni birkaç yayında çıkabiliyor (press.ts, "ÖZETLER" notu) ve aynı
 * yayın iki kayıtla listeye girdiğinde adı iki kez basmak sayıyı şişirmiş
 * gibi görünürdü.
 *
 * ÖZET METNİ BASILMIYOR, YALNIZCA MANŞET. Özetler üçüncü tarafın kendi spot
 * metni; bir aralıkta iki cümle alıntı yapmak bu bölümü bir haber kutusuna
 * çevirirdi. Manşet + yayın + tarih, kaynağına giden bir kapıyla birlikte
 * yeterli.
 *
 * ==========================================================================
 * ÜLKE KAPSAMI — DÜRÜST SINIR
 *
 * press.ts ülkeye göre bölünmüş değil ve sekiz kaydın sekizi de Dubai'yi
 * anlatıyor. Bu yüzden bölüm YALNIZCA Dubai'de basılıyor; İngiltere ve
 * KKTC'de null dönüyor. Dubai haberini o iki sayfada göstermek, ülkeye ait
 * olmayan bir kanıtı ülkenin girişine koymak olurdu.
 *
 * ==========================================================================
 * HAREKET
 *
 * Ekranda tek bir şey var → politika "olabildiğince fazla" tarafında, ama
 * bölüm bir nefes yeri olduğu için hareket TEK: yayın adlarının üzerinden
 * geçen bir okuma ışığı (11 s, sonsuz). Şerit boyunca soldan sağa ilerliyor
 * ve her ada sırayla değiyor. Manşet hiç kıpırdamıyor — hareket eden şey
 * kanıtın kendisi değil, kanıtın kaç yerden geldiği.
 */

export default function GecisT2Basin({ country }: { country: Country; name: string }) {
  /* Bkz. "ÜLKE KAPSAMI": kayıtların hepsi Dubai'yi anlatıyor. */
  if (country !== "dubai") return null;

  const items = sortedPress();
  const lead = items[0];
  if (!lead) return null;

  /* Yayın adları, tekrarsız ve yeniden eskiye. Sekiz kayıt → altı ad. */
  const outlets = [...new Set(items.map((p) => p.outlet))];

  return (
    <section className="gc2">
      <div className="container-o">
        <div className="gc2-in">
          <p className="gc2-kicker">Basında</p>

          {/* Manşet haberin KENDİ başlığı; tırnak bunu söylüyor. */}
          <blockquote className="gc2-quote">
            <p className="gc2-head">{lead.title}</p>
            <footer className="gc2-src">
              <cite className="gc2-outlet">{lead.outlet}</cite>
              <span className="gc2-dot" aria-hidden="true" />
              <span className="gc2-date">{formatDate(lead.publishedAt)}</span>
            </footer>
          </blockquote>

          {/* Şerit bir iddia taşımıyor: yalnızca adlar. "Bizim hakkımızda
              yazdılar" cümlesi burada YOK, çünkü kayıtların bir kısmı firmayı
              haberin içinde uzman görüşü olarak anıyor — abartmamak için
              cümle değil, kapı veriliyor. */}
          <ul className="gc2-strip" aria-label="Kayıtların bulunduğu yayınlar">
            {outlets.map((o, i) => (
              <li key={o} className="gc2-o" style={{ "--i": i } as React.CSSProperties}>
                {o}
              </li>
            ))}
          </ul>

          <SmartLink href="/basinda-biz" className="gc2-more">
            Basın kayıtlarının tamamı
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
