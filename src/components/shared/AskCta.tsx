import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";

/* "Sorularınız mı var?" — sitedeki tek soru çıkışı.
 *
 * Bu bileşen bir kalıbı emekliye ayırmak için var. Sayfa boyunca yedi ayrı
 * yerde "mali müşavirimizle netleştiriyoruz", "mali müşavire danışın", "mali
 * müşavir görüşmesinde yazılı olarak veriyoruz" gibi cümleler vardı. İkisi
 * birden doğru değildi: firmanın öyle bir hizmet kurgusu yok, ve aynı cümlenin
 * yedi kez tekrarı ziyaretçiye "burada cevap yok" dedirtiyordu.
 *
 * Yerine tek ve dürüst bir çıkış: sorusu olan soruyor. Bağlayıcılık uyarısı
 * (bu bir tavsiye değildir) kaldığı yerde duruyor — kaldırılan şey uyarı
 * değil, olmayan bir randevuya yapılan yönlendirme.
 */

export default function AskCta({
  label = "Sorularınız mı var?",
  href = "/basla",
  tone = "line",
}: {
  label?: string;
  href?: string;
  /** line: açık zeminde kenarlıklı · solid: koyu zeminde dolu */
  tone?: "line" | "solid";
}) {
  return (
    <SmartLink href={href} className="askc" data-tone={tone}>
      <MessageCircleQuestion size={16} strokeWidth={2} aria-hidden="true" />
      {label}
      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
    </SmartLink>
  );
}
