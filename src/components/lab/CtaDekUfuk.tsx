import { ArrowRight, Plane } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import SmartLink from "@/components/shared/SmartLink";
import type { Country } from "@/lib/store";

/* KAPANIŞ CTA'SI ADAYI · UFUK (.kd3-)
   Gece bir kart, içinde yıldız alanı; kartın altında kalan ortak bir merkeze
   bağlı üç yay, üstlerinde üç bayrak diski ve yavaşça geçen bir uçak. Metin
   ve düğme hedefi canlı CTA'dan geliyor (Footer.tsx · Ft2Cta): yeni vaat
   yazılmadı, yalnız sahne yeni.

   BU TUR · ALT SAHNE SADELEŞTİ. Aday beğenildi, itiraz yalnız alt yarıya
   geldi: "alta dolgu vermişsin bişi yapmışsın ya dünya yapmaya çalışmışsın
   ona gerek yok direkt yörünge versiyonundaki gibi yapabiliriz." Gradyan
   dolgulu dünya kavisi (.kd3-kure) ve kenarına yapışan atmosfer parıltısı
   (.kd3-atmos) silindi; yerine Yörünge adayının kalıbı geldi, yani yalnız
   kenarlıkla çizilen temiz yaylar. AYNEN DURANLAR: uçağın geçişi, uzay
   teması ve yıldız paralaksı, üç bayrak diski, üst yarıdaki rozet + iki
   satır başlık + tek düğme.

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

/* Bayrak diskleri ufuk yayının üstüne AÇIYLA oturuyor, piksel koordinatla
   değil. Sebebi geometrik: yayların çapı ekran genişliğiyle ölçekleniyor
   (--kd3-d), yani sabit bir `left: %x` her genişlikte kavisin başka bir
   yerine düşerdi. Açı ise ölçekten bağımsız — disk her genişlikte çizginin
   tam üstünde duruyor. Üç açı simetrik değil (-8,4 / 0,6 / 9,2): tam simetri
   sahneyi diyagram gibi gösteriyordu, hafif kaçıklık onu süse çeviriyor. */
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
            {/* DOM sırası burada z sırası demek, hiçbir katmana z-index
                verilmedi. Sıra uzaktan yakına: iki yıldız katmanı, en soluk
                yay, kesikli yay, uçak, ufuk çizgisi ve bayraklar. */}
            <span className="kd3-yildiz kd3-yildiz-b" />
            <span className="kd3-yildiz kd3-yildiz-a" />
            <span className="kd3-yay kd3-yay-3" />
            <span className="kd3-yay kd3-yay-2" />

            {/* Uçak yaylarla EŞ MERKEZLİ bir çemberin tepesinde duruyor ve
                çember dönüyor; yani uçağın yolu gerçek bir yay ve her ekran
                genişliğinde aynı kavisi çiziyor. Merkez küre kalkınca da
                yerinde kaldı, uçak zaten küreye değil o merkeze bağlıydı.
                offset-path denenmedi: onun yol koordinatları piksel sabiti ve
                dar ekranda uçak kadrajın dışında kalıyordu. */}
            <span className="kd3-ucus">
              <span className="kd3-ucak">
                <Plane size={17} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </span>

            {/* Ufuk çizgisi aynı zamanda bayrak kollarının kabı: kaldırılan
                kürenin kutusu neyse bu yayın kutusu da o (d x d, 1px
                kenarlık), yani diskler hiç kıpırdamadan yeni kaba geçti. */}
            <span className="kd3-yay kd3-yay-1">
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
