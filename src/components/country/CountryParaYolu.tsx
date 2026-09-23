import { ArrowRight, ArrowUpRight, Building2, Globe, PiggyBank, TriangleAlert, UserRound } from "lucide-react";

import Ayrinti from "@/components/shared/Ayrinti";
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
const IKON_AD = { kure: Globe, sirket: Building2, kasa: PiggyBank, kisi: UserRound };

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
            const I = d.ikon ? IKON_AD[d.ikon] : (IKON[i] ?? Globe);
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
                {i < data.duraklar.length - 1 &&
                  (data.ayrim === i ? (
                    /* iki alternatif arasında ok değil "ya da" (ayrim) */
                    <span className="cpy-ok cpy-yada">ya da</span>
                  ) : (
                    <span className="cpy-ok" aria-hidden="true">
                      <ArrowRight size={18} strokeWidth={2} />
                    </span>
                  ))}
              </li>
            );
          })}
        </ol>

        {/* ÖRNEK ŞERİT · 23.09.2026 (İngiltere). £100 kârın üç parçası tek
            çubukta: vergi (sıcak), istisna (yeşil), beyana giren (gri).
            Genişlik = değer; toplam 100. */}
        {data.ornek && (
          <FadeUp delay={0.14}>
            <div className="cpy-ornek">
              <p className="cpy-ornek-h">{data.ornek.baslik}</p>
              <div className="cpy-ornek-bar" aria-hidden="true">
                {data.ornek.parcalar.map((p) => (
                  <span key={p.etiket} data-ton={p.ton} style={{ flexGrow: p.deger }}>
                    £{p.deger.toLocaleString("tr-TR")}
                  </span>
                ))}
              </div>
              <ul className="cpy-ornek-l">
                {data.ornek.parcalar.map((p) => (
                  <li key={p.etiket} data-ton={p.ton}>
                    <i aria-hidden="true" />
                    {p.etiket} <b>£{p.deger.toLocaleString("tr-TR")}</b>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        )}

        {/* AYRINTILAR · 23.09.2026. Şart kutuları, örneğin dipnotu, anlaşma
            notu ve kanun linkleri eskiden açıkta basılıyordu; Burak: "her yere
            not düşüyorsun." Artık kapalı kutuda. El sıkışma ikonlu anlaşma
            notu (bilgi) tamamen kalktı: aynı şeyi FAQ ve lead söylüyor. */}
        <FadeUp delay={0.2}>
          <Ayrinti>
            <ul className="cpy-uyari">
              {data.uyarilar.map((u) => (
                <li key={u.baslik} className="cpy-u">
                  <TriangleAlert size={16} strokeWidth={2.1} aria-hidden="true" />
                  <div>
                    <b>{u.baslik}</b>
                    <p>{u.line}</p>
                  </div>
                </li>
              ))}
            </ul>
            {data.ornek && <p className="cpy-ornek-n">{data.ornek.not}</p>}
            <span className="cpy-kaynak">
              {data.kaynaklar.map((k) => (
                <a key={k.href} href={k.href} target="_blank" rel="noopener noreferrer">
                  {k.label}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
            </span>
          </Ayrinti>
        </FadeUp>
      </div>
    </section>
  );
}
