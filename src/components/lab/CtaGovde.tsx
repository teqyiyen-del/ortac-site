import SmartLink from "@/components/shared/SmartLink";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import { ArrowRight } from "lucide-react";

/* Üç CTA adayının ORTAK gövdesi — başlık, paragraf, iki düğme.
   Metin ve sıra canlı Ft2Cta'nın birebir aynısı. Tek kopya olması şart:
   turun sorusu "hangi çerçeve", "hangi metin" değil; gövde adaydan adaya
   kayarsa ölçülen şey de kayar.

   gtm() bilerek yok: lab sayfası analitik olay göndermez. */
export default function CtaGovde() {
  return (
    <div className="ctal-in">
      <SplitWords
        as="h2"
        text="Kurulumunuzu bugün başlatalım."
        accent="bugün başlatalım."
        base={0.06}
        className="ctal-t"
      />

      <FadeUp delay={0.26}>
        <p className="ctal-l">
          Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe.
          <br />
          Tek ekip, tek muhatap, baştan sona Türkçe.
        </p>
      </FadeUp>

      <FadeUp delay={0.34}>
        <div className="ctal-btns">
          <SmartLink href="/basla" className="btn btn-primary">
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.1} />
          </SmartLink>
          <SmartLink href="/iletisim" className="btn btn-ghost">
            Ücretsiz danışmanlık
          </SmartLink>
        </div>
      </FadeUp>
    </div>
  );
}
