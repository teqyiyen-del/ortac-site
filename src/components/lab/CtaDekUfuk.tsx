import { ArrowRight, Plane } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { Country } from "@/lib/store";

/* KAPANIŞ CTA'SI ADAYI · UFUK (.kd3-)
   Ekranın altından yükselen dünya kavisi, üstünde üç bayrak diski, tepesinde
   yavaşça geçen bir uçak. Metin ve düğme hedefi canlı CTA'dan geliyor
   (Footer.tsx · Ft2Cta): yeni vaat yazılmadı, yalnız sahne yeni.

   SAHNE HİÇBİR ŞEY ANLATMIYOR — VE BU BİLEREK BÖYLE.
   Bir önceki tur üç adayla reddedildi; üçü de hareketle bilgi taşıyordu
   (yörünge yarıçapı kuruluş süresine bağlıydı, zincir halkaları iş akışını
   anlatıyordu). Müşterinin sözü: "bişi anlatmasın ztn her boku anlattık ya."
   Bu yüzden burada hiçbir ölçü bir veriden türemiyor: yarıçaplar, açılar ve
   periyotlar yalnız kompozisyon ve teknik kısıt (asallık) için seçildi.
   Sahnede etiket, rakam ve künye metni de yok; ekrandaki bütün metin rozet +
   iki satır başlık + tek düğme.

   Sahnenin tamamı aria-hidden: içinde okunacak bir bilgi yok, ekran
   okuyucuya yalnız gürültü olurdu. */

/* Bayrak diskleri kürenin kenarına AÇIYLA oturuyor, piksel koordinatla değil.
   Sebebi geometrik: küre çapı ekran genişliğiyle ölçekleniyor (--kd3-d), yani
   sabit bir `left: %x` her genişlikte kavisin başka bir yerine düşerdi. Açı
   ise ölçekten bağımsız — disk her genişlikte kavisin tam üstünde duruyor.
   Üç açı simetrik değil (-8,4 / 0,6 / 9,2): tam simetri sahneyi diyagram gibi
   gösteriyordu, hafif kaçıklık onu süse çeviriyor. */
const DISKLER: { ulke: Country; aci: string }[] = [
  { ulke: "ingiltere", aci: "-8.4deg" },
  { ulke: "dubai", aci: "0.6deg" },
  { ulke: "kktc", aci: "9.2deg" },
];

export default function CtaDekUfuk() {
  return (
    <section className="kd3">
      <div className="container-o">
        <div className="kd3-kart">
          <div className="kd3-sahne" aria-hidden="true">
            {/* Uzak yıldız katmanı önce: DOM sırası burada z sırası demek,
                hiçbir katmana z-index verilmedi. */}
            <span className="kd3-yildiz kd3-yildiz-b" />
            <span className="kd3-yildiz kd3-yildiz-a" />
            <span className="kd3-yay kd3-yay-2" />
            <span className="kd3-yay kd3-yay-1" />
            <span className="kd3-atmos" />

            {/* Uçak küreyle EŞ MERKEZLİ bir çemberin tepesinde duruyor ve
                çember dönüyor; yani uçağın yolu gerçek bir yay ve her ekran
                genişliğinde aynı kavisi çiziyor. offset-path denenmedi: onun
                yol koordinatları piksel sabiti ve dar ekranda uçak kadrajın
                dışında kalıyordu. */}
            <span className="kd3-ucus">
              <span className="kd3-ucak">
                <Plane size={17} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </span>

            <span className="kd3-kure">
              {DISKLER.map(({ ulke, aci }) => (
                <span
                  key={ulke}
                  className="kd3-kol"
                  style={{ "--a": aci } as React.CSSProperties}
                >
                  {/* Kap SABİT px + overflow:hidden (tuzak H): Flag çıplak
                      <svg viewBox="0 0 60 40"> basıyor, width/height
                      taşımıyor ve serbest bırakılırsa 300x150'ye şişiyor. */}
                  <span className="kd3-bayrak">
                    <Flag country={ulke} />
                  </span>
                </span>
              ))}
            </span>
          </div>

          <div className="kd3-ust">
            <span className="kd3-rozet">
              <span className="kd3-nokta" />
              Tek ekip, tek muhatap
            </span>

            {/* Başlık ve düğme hedefi canlı CTA'nın kendisi. Canlıdaki
                paragraf BİLEREK GELMEDİ: bu turun sözleşmesi ekranda rozet +
                iki satır başlık + tek düğmeden fazlasını istemiyor. */}
            <h2 className="kd3-t">
              Kurulumunuzu <span className="kd3-vurgu">bugün başlatalım.</span>
            </h2>

            <div className="kd3-eylem">
              <SmartLink href="/basla" className="btn btn-primary">
                Kurulumu Başlat
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
