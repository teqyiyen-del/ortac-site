import { ArrowDown, ArrowRight, Wallet } from "lucide-react";
import { accountingMonthlyPrice, ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   /lab/hero-fiyat · MUHASEBE HERO'SUNDAKİ FİYAT ÖGESİ
   CSS: css/lab-herofiyat.css (.lhf-)

   18.09.2026 · Burak: "şu heroda aylık 350 dolar kısmı var ya onu daha sade
   yapmamız lazım ya çok kaba duruyor, bide solundaki butona göre tipide
   farklı ya biraz sırıtıyor."

   BUGÜNKÜ HÂL (canlı): butonun yanında üç satırlı çerçeveli kutu — küçük
   etiket, 20 px tutar, mavi "Fiyat kalemleri ↓". Kutu düğmeden uzun ve kendi
   tipografisi var; yan yana iki farklı nesne gibi duruyorlar.

   ÜÇ ADAY, ÜÇÜ DE AYNI VERİYİ basıyor (afterSetup · aylık muhasebe kalemi):
     F1 · SATIR       kutu yok. Butonun sağında ince dikey ayraç ve tek satır:
                      "Aylık 350 USD'den · KDV hariç". Tipografi hero'nun
                      güven satırlarıyla aynı (13,5 px).
     F2 · GÜVEN SATIRI fiyat ayrı bir nesne değil; hero'nun iki güven
                      satırının arasına üçüncü satır olarak giriyor, tutar
                      beyaz ve kalın. Ekranda yeni bir kutu açılmıyor.
     F3 · İKİNCİ DÜĞME butonla AYNI yükseklik ve aynı tipografi: ghost düğme
                      görünümünde "350 USD'den · kalemler". İki nesne artık
                      aynı ailede.

   Üçü de #fiyat'a inen bir bağlantı taşıyor (F2 hariç: orada satırın kendisi
   bağlantı değil, çünkü güven satırları tıklanmıyor).
   ========================================================================= */

const nf = new Intl.NumberFormat("tr-TR");

function tutar(): string {
  const p = accountingMonthlyPrice();
  return p ? `${nf.format(p.usd)} USD` : "";
}

/* Hero'nun karşılığı: gece zemin, solda buton. Adaylar bu bandın içinde
   gösteriliyor ki ölçü ve kontrast gerçek bağlamında görünsün. */
function Bant({ ad, children }: { ad: string; children: React.ReactNode }) {
  return (
    <section className="lhf-bant">
      <div className="container-o">
        <p className="lhf-etiket">{ad}</p>
        <h2 className="lhf-h2">
          Dubai <span>muhasebe hizmeti.</span>
        </h2>
        <p className="lhf-lead">{C.hero.lead}</p>
        {children}
      </div>
    </section>
  );
}

function GuvenSatirlari({ fiyat }: { fiyat?: boolean }) {
  return (
    <ul className="lhf-trust">
      {fiyat && (
        <li data-fiyat="">
          <Wallet size={15} strokeWidth={2} aria-hidden="true" />
          <span>
            Aylık <b>{tutar()}</b>&apos;den başlıyor, KDV hariç.
          </span>
        </li>
      )}
      <li>
        <Wallet size={15} strokeWidth={2} aria-hidden="true" />
        <span>Defter ve beyan taşerona gitmiyor.</span>
      </li>
      <li>
        <Wallet size={15} strokeWidth={2} aria-hidden="true" />
        <span>Altı kalemin altısı da fiyatıyla yazılı.</span>
      </li>
    </ul>
  );
}

/* ============================================================== F1 · SATIR */
export function HeroFiyatF1() {
  return (
    <Bant ad="F1 · Satır — kutu yok, butonun sağında ayraçlı tek satır">
      <div className="lhf-cta">
        <span className="btn btn-primary">
          Teklif isteyin
          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
        </span>
        <span className="lhf-satir">
          Aylık <b>{tutar()}</b>&apos;den · KDV hariç
          <a href="#fiyat">
            kalemler
            <ArrowDown size={12} strokeWidth={2.2} aria-hidden="true" />
          </a>
        </span>
      </div>
      <GuvenSatirlari />
    </Bant>
  );
}

/* ====================================================== F2 · GÜVEN SATIRI */
export function HeroFiyatF2() {
  return (
    <Bant ad="F2 · Güven satırı — fiyat ayrı nesne değil, üçüncü satır">
      <div className="lhf-cta">
        <span className="btn btn-primary">
          Teklif isteyin
          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
        </span>
      </div>
      <GuvenSatirlari fiyat />
    </Bant>
  );
}

/* ======================================================= F3 · İKİNCİ DÜĞME */
export function HeroFiyatF3() {
  return (
    <Bant ad="F3 · İkinci düğme — butonla aynı yükseklik ve tipografi">
      <div className="lhf-cta">
        <span className="btn btn-primary">
          Teklif isteyin
          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
        </span>
        <a href="#fiyat" className="btn btn-ghost lhf-ikinci">
          <b>{tutar()}</b>
          <span>/ay&apos;dan · kalemler</span>
        </a>
      </div>
      <GuvenSatirlari />
    </Bant>
  );
}
