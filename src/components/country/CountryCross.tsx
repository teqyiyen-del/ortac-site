import { ArrowRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* CSS'i globals.css'te değil, burada.
 *
 * Bölümün eski kuralları (.sp-cross-…) globals.css'in içinde, 4740. satır
 * civarında yaşıyordu. O dosya 20 bin satırı geçtiği ve aynı anda birden çok
 * bölüm üzerinde çalışıldığı için oraya yazmak sürekli çakışıyor. Yeni bölüm =
 * yeni dosya kuralı zaten sitede geçerli; tek fark bu dosyanın globals.css'e
 * @import satırıyla değil, doğrudan bileşenden bağlanması — bileşen nereye
 * konursa CSS'i onunla birlikte geliyor, globals.css'e hiç dokunulmuyor. */

/* Ülkeler arası geçiş — iki sayfa, tek kutu.
 *
 * Aynı kalıp iki yerde ayrı ayrı yaşıyordu: ülke sayfasının dibindeki "Diğer
 * ülkelere bakın" ve hizmet sayfasındaki "Aynı hizmet, diğer ülkelerde". İki
 * kopya bir gün ayrışır; burada birleştiler.
 *
 * NE GÖSTERMİYOR: fiyat ve süre. Eski kart ikisini de basıyordu. Müşterinin
 * itirazı: "fiyatlı ve süreli infolarla yazmak yerine biraz daha sadece
 * ülkenin bayrağına fln odaklanan bir tasarımla o sayfalara yönlendirme
 * açabiliriz." Gerekçe de teknik olarak doğru: burası bir KIYAS değil bir
 * GEÇİŞ. İki rakam koyunca kart kıyas vaat ediyor ama kıyas için gereken
 * ölçütlerin hiçbirini vermiyor — yarım bırakılmış bir tablo gibi duruyor.
 * Kıyas isteyenin yeri /ulkeler; başlığın yanındaki çıkış oraya gidiyor.
 *
 * Kartta rakam yerine ülkenin künyesi var (countryContent.tagline —
 * "Serbest bölge · IFZA" gibi): tek satır, nitelik, sayı yok. */

type Item = { country: Country; href: string };

export default function CountryCross({
  title,
  items,
  rule = false,
}: {
  title: string;
  items: Item[];
  /** hizmet sayfasında bölüm bir ayraçla açılıyor; ülke sayfasında kendi bölümü var */
  rule?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div className="ccx" data-rule={rule || undefined}>
      <div className="ccx-head">
        <h2 className="ccx-h">{title}</h2>
        {/* Kıyas burada yapılmıyor, yapıldığı yere çıkış veriliyor. */}
        <SmartLink href="/ulkeler" className="ccx-cmp">
          Üçünü yan yana karşılaştırın
          <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </SmartLink>
      </div>

      <FadeUp className="ccx-row" delay={0.1} y={18}>
        {items.map(({ country, href }) => (
          <SmartLink key={country} href={href} className="ccx-card" data-c={country}>
            <span className="ccx-flag" aria-hidden="true">
              <Flag country={country} />
            </span>
            <span className="ccx-name">{COUNTRY_LABELS[country]}</span>
            <span className="ccx-note">{COUNTRY_CONTENT[country].tagline}</span>
            <span className="ccx-go" aria-hidden="true">
              <ArrowRight size={15} strokeWidth={2.1} />
            </span>
          </SmartLink>
        ))}
      </FadeUp>
    </div>
  );
}
