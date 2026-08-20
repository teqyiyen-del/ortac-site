import { ArrowRight, MapPin } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import { COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";

/* KAPANIŞ CTA'SI ADAYI · YÖRÜNGE (.kc2a-)
   Metin üstte, altta üç ülkenin döndüğü bir sahne. Merkezde firma duruyor.
   Metin ve hedefler canlı CTA'dan (Footer.tsx · Ft2Cta) geliyor. */

/* ---------------------------------------------------------- yörünge tablosu
   TEK KURAL: HAREKET BİLGİ TAŞIR. Ne yarıçap ne periyot elle seçildi.

   YARIÇAP = KURULUŞ SÜRESİ. Her ülkenin yarıçapı `FACTS[ülke].days`'in ÜST
   sınırından türüyor (Dubai 14 · KKTC 10 · İngiltere 7 gün), en uzunu 1.0
   kabul edilip oranlanıyor. Yani en dıştaki yörünge en uzun süren kuruluş.
   Sayı burada YAZILI DEĞİL, dosyadan okunuyor: süre değişirse sahne de değişir.

   PERİYOT = KEPLER. Süreyi hem yarıçapa hem periyoda doğrudan yazsaydık üç
   disk aynı AÇISAL hızda döner, aralarındaki açı hiç değişmez ve sahne
   kilitlenmiş görünürdü. Onun yerine gerçek yörünge kuralı: T ∝ r^1.5.
   Taban 19001 ms (en iç, İngiltere); ötekiler ondan türedi:
     19001 × (10/7)^1.5 = 32.444 → 32429   (KKTC)
     19001 × (14/7)^1.5 = 53.746 → 53731   (Dubai)
   Sapma binde birin altında, yani oran korunuyor.

   NEDEN BU ÜÇ SAYI (tuzak K · periyot katsızlığı). Üçü de ASAL:
   19001 · 32429 · 53731. Asal oldukları için birbirleriyle ve brifteki on
   sürekli periyodun (1510 · 8900 · 9700 · 13711 · 16993 · 20000 · 26000 ·
   29023 · 42000 · 60000) hepsiyle aralarında asallar; listedeki üç asalın
   (13711 · 16993 · 29023) hiçbirine de eşit değiller. Kepler basamağı ayrıca
   oranları tam sayıdan uzaklaştırıyor (2,8278 · 1,7067 · 1,6569), yani
   yakın rezonansta yavaş bir "nabız" da oluşmuyor.

   BAŞLANGIÇ AÇISI. Üç disk yüklenişte üst üste binmesin diye turun farklı
   yerlerinden başlıyor; `basla` turun kesri, negatif animation-delay'e
   çevriliyor. Aynı kesir hareketsiz duruş noktasını da veriyor (aşağıda
   --kc2a-cx / --kc2a-sy), böylece hareketi kapatan ziyaretçide diskler
   merkeze yığılmıyor. */
const YORUNGE: Record<CountrySlug, { ms: number; basla: number }> = {
  dubai: { ms: 53731, basla: 0.08 },
  ingiltere: { ms: 19001, basla: 0.76 },
  kktc: { ms: 32429, basla: 0.44 },
};

/** "7-14 gün" → 14. Üst sınır, çünkü yörünge en uzun ihtimali gösteriyor. */
function gunUst(gun: string): number {
  return Number(gun.match(/(\d+)\s*-\s*(\d+)/)?.[2] ?? 1);
}

const EN_UZUN = Math.max(...COUNTRY_ORDER.map((c) => gunUst(FACTS[c].days)));

/** Yarıçap oranı · CSS'te `--kc2a-u` ile çarpılıyor. */
function oran(c: CountrySlug): number {
  return gunUst(FACTS[c].days) / EN_UZUN;
}

export default function CtaYorunge() {
  return (
    <section className="kc2a">
      <div className="container-o">
        <div className="kc2a-kart">
          {/* ---------------------------------------------------------- metin
              Canlı CTA'nın iki cümlesi aynen; yalnız aradaki <br> kalktı, iki
              cümle tek akışta. Ülke adları BU CÜMLEDE kalmak zorunda: sahne
              süs olduğu için (aria-hidden) ekran okuyucuya çıkan tek yer
              burası ve bayrak diski adı söylemiyor. */}
          <div className="kc2a-ust">
            <span className="kc2a-rozet">
              <MapPin size={14} strokeWidth={1.9} aria-hidden="true" />
              Üç ülkede de kendi ofisimiz var
            </span>

            <h2 className="kc2a-t">
              Kurulumunuzu <span className="kc2a-t-ac">bugün başlatalım.</span>
            </h2>

            <p className="kc2a-l">
              Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe. Tek ekip,
              tek muhatap, baştan sona Türkçe.
            </p>

            <div className="kc2a-btns">
              <SmartLink href="/basla" className="btn kc2a-dolu">
                Kurulumu Başlat
                <ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />
              </SmartLink>
              <SmartLink href="/iletisim" className="btn kc2a-bos">
                Ücretsiz danışmanlık
              </SmartLink>
            </div>
          </div>

          {/* ---------------------------------------------------------- sahne
              SAHNEDE HİÇ METİN YOK VE BU BİR DÜZELTME. Bir tur boyunca her
              disk kendi etiketini ("Dubai · 7-14 gün") taşıyordu; okunaklıydı
              ama üç yörünge farklı periyotta olduğu için ara ara üst üste
              biniyorlar ve 375'te en kötü kare ölçüldü: İngiltere'nin etiketi
              Dubai'nin diskini tamamen, adını yarısına kadar örtüyordu. Kâğıt
              rengi çip de kurtarmadı, yalnız hangi metnin okunmaz olduğunu
              değiştirdi. Etiket kalktı; yarıçapın neye karşılık geldiği
              zaten yukarıdaki tabloda yazılı, ekranda yazması şart değil.
              Sahne artık tamamen süs, o yüzden tek bir aria-hidden yetiyor. */}
          <div className="kc2a-sahne" aria-hidden="true">
            {COUNTRY_ORDER.map((c) => (
              <span
                key={c}
                className="kc2a-halka"
                style={{ "--kc2a-r": oran(c).toFixed(4) } as React.CSSProperties}
              />
            ))}

            <span className="kc2a-merkez">
              {/* Hedef halkası yalnızca üstüne gelince beliriyor: duruşta sahne
                  sakin bir şema, imleç gelince nişan alan bir konsol. */}
              <span className="kc2a-hedef" />
              <span className="kc2a-nabizlar">
                <span className="kc2a-nabiz" />
                <span className="kc2a-nabiz kc2a-nabiz--2" />
              </span>
              <span className="kc2a-cekirdek" />
            </span>

            {COUNTRY_ORDER.map((c) => {
              const { ms, basla } = YORUNGE[c];
              const aci = basla * 2 * Math.PI;
              return (
                <span
                  key={c}
                  className="kc2a-yor"
                  style={
                    {
                      "--kc2a-r": oran(c).toFixed(4),
                      "--kc2a-t": `${ms}ms`,
                      "--kc2a-gec": `-${Math.round(ms * basla)}ms`,
                      "--kc2a-cx": Math.cos(aci).toFixed(4),
                      "--kc2a-sy": Math.sin(aci).toFixed(4),
                    } as React.CSSProperties
                  }
                >
                  {/* TUZAK H · Flag çıplak <svg viewBox> basıyor, ölçü
                      taşımıyor. Kap sabit px + overflow:hidden; svg'ye de
                      %100 veriliyor ki bayrak diskin içine otursun. */}
                  <span className="kc2a-disk">
                    <Flag country={c} />
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
