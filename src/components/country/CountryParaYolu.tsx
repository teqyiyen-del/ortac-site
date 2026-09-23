import { ArrowRight, ArrowUpRight, Building2, Globe, Handshake, TriangleAlert, UserRound } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { ParaYolu } from "@/lib/countryContent";

/* ============================================================================
   TÜRKİYE'DE YAŞIYORSANIZ VERGİ NEREDE ÇIKIYOR — .cpy- · css/country-bilgi.css
   Veri: countryContent.ts · <ülke>.paraYolu (şimdilik yalnız KKTC).

   23.09.2026 · Talep araştırmasının 1. sorusu ("Türkiye'de yaşıyorsam kazancım
   Türkiye'de vergilenir mi?") ve rakiplerin en büyük boşluğu. Burak "dubaideki
   kısma mı benzicek başka şekilde mi" diye sordu: BAŞKA. Dubai'deki MoneyHome
   parayı Türkiye'ye getirmenin yollarını (fatura / kâr payı / maaş) anlatıyor;
   bu bölüm verginin NEREDE doğduğunu. Üç durak soldan sağa: müşteri → şirket
   (%0) → siz (beyan). Altında iki şart kutusu (dağıtılmayan kâr, yönetim
   yeri), anlaşma bilgisi ve iki kanun bağlantısı. Kişiye özel görüş yok. */

const IKON = [Globe, Building2, UserRound];

export default function CountryParaYolu({ data }: { data: ParaYolu }) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={data.title} accent={data.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        <ol className="cpy">
          {data.duraklar.map((d, i) => {
            const I = IKON[i] ?? Globe;
            return (
              <li key={d.kim} className="cpy-li">
                <FadeUp className="cpy-f" delay={0.1 + i * 0.08}>
                  <div className="cpy-k" data-ton={d.ton}>
                  <span className="cpy-bas">
                    <span className="cpy-ic" aria-hidden="true">
                      <I size={18} strokeWidth={1.9} />
                    </span>
                    <span>
                      <span className="cpy-kim">{d.kim}</span>
                      <b className="cpy-yer">{d.baslik}</b>
                    </span>
                  </span>
                  <span className="cpy-vergi">{d.vergi}</span>
                  <p className="cpy-not">{d.not}</p>
                  </div>
                </FadeUp>
                {i < data.duraklar.length - 1 && (
                  <span className="cpy-ok" aria-hidden="true">
                    <ArrowRight size={18} strokeWidth={2} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <ul className="cpy-uyari">
          {data.uyarilar.map((u, i) => (
            <li key={u.baslik}>
              <FadeUp className="cpy-u" delay={0.12 + i * 0.06}>
                <TriangleAlert size={17} strokeWidth={2.1} aria-hidden="true" />
                <div>
                  <b>{u.baslik}</b>
                  <p>{u.line}</p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>

        <FadeUp delay={0.2}>
          <div className="cpy-alt">
            <p className="cpy-bilgi">
              <Handshake size={17} strokeWidth={2} aria-hidden="true" />
              {data.bilgi}
            </p>
            <span className="cpy-kaynak">
              {data.kaynaklar.map((k) => (
                <a key={k.href} href={k.href} target="_blank" rel="noopener noreferrer">
                  {k.label}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
