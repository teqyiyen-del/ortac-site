import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN, COUNTRY_NAME, COUNTRY_ORDER } from "@/lib/brand";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* AKIŞ — kapanış CTA adayı (.kc2c-).
   Üst yarı ışık zeminde az metin, alt yarı gece sahnede işleyen hat: üç ofis,
   beş halkalı zincir (brand.ts · CHAIN) ve rayın üstünde baştan sona yürüyen
   bir kayıt. Metin ve iki hedef canlı Ft2Cta'dan; yeni vaat yok.
   Hareketin tamamı CSS'te (lab-cta2-c.css), gerekçeleri orada. */

/* CHAIN saf veri, ikon taşımıyor. Eşleme ana sayfadaki Chain ve
   /is-ortakligi ile BİREBİR aynı: aynı halka her yerde aynı simge. */
const IKON: Record<string, LucideIcon> = {
  kurulus: Building2,
  banka: Landmark,
  muhasebe: CalendarCheck,
  uyum: ShieldCheck,
  oturum: IdCard,
};

export default function CtaAkis() {
  return (
    <section className="kc2c">
      <div className="container-o">
        <div className="kc2c-kart">
          {/* ------------------------------------------------- üst · gündüz */}
          <div className="kc2c-ust">
            <div className="kc2c-soz">
              <span className="kc2c-rozet">Kuruluştan işletmeye</span>
              <h2 className="kc2c-t">
                Kurulumunuzu <span className="kc2c-vurgu">bugün başlatalım.</span>
              </h2>
              <p className="kc2c-l">Tek ekip, tek muhatap, baştan sona Türkçe.</p>
            </div>

            <div className="kc2c-btns">
              <SmartLink href="/basla" className="btn kc2c-b1">
                Kurulumu Başlat
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
              <SmartLink href="/iletisim" className="btn kc2c-b2">
                Ücretsiz danışmanlık
              </SmartLink>
            </div>
          </div>

          {/* --------------------------------------------------- alt · gece */}
          <div className="kc2c-sahne">
            <div className="kc2c-zemin" aria-hidden="true">
              <span className="kc2c-hatch" />
              <span className="kc2c-hale" />
              <span className="kc2c-diki" />
            </div>

            {/* Üç ofis akışın başı: dalga burada doğuyor (--akt-i 0 · 0,08 ·
                0,16), sonra raya geçiyor. Ülke adları ekranda çünkü firmanın
                ÜÇ ÜLKEDE DE kendi ofisi var ve sahne bunu cümle kurmadan
                söylemeli. */}
            <ul className="kc2c-ulkeler">
              {COUNTRY_ORDER.map((c, i) => (
                <li key={c} className="kc2c-ulke">
                  <span
                    className="kc2c-bayrak akt-durak"
                    style={{ "--akt-i": i * 0.08 } as React.CSSProperties}
                  >
                    <Flag country={c} />
                  </span>
                  <span className="kc2c-ulke-ad">{COUNTRY_NAME[c]}</span>
                </li>
              ))}
            </ul>

            {/* Ray + beş durak. Işık (blur'lu iz) raydan ÖNCE basılıyor ki
                çizginin altında kalsın. */}
            <div className="kc2c-yol">
              <span className="kc2c-isik" aria-hidden="true" />
              <span className="kc2c-ray" aria-hidden="true" />

              <ol className="kc2c-duraklar">
                {CHAIN.map((s, i) => {
                  const Ikon = IKON[s.key];
                  return (
                    <li
                      key={s.key}
                      className="kc2c-durak"
                      /* --akt-i durağın kendisinde değil li'de: özel değişken
                         kalıtımla diske iniyor, seçici sayısı beşe çıkmıyor. */
                      style={{ "--akt-i": i + 1 } as React.CSSProperties}
                    >
                      <span className="kc2c-nokta akt-durak" aria-hidden="true">
                        <Ikon size={19} strokeWidth={1.9} />
                      </span>
                      <span className="kc2c-ad">{s.label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
