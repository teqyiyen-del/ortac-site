import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, Repeat } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SektorFotoKartlari from "@/components/shared/SektorFotoKartlari";

import Tel from "@/components/mobil/Tel";
import { cevirici } from "@/lib/i18n/cevir";
import type { Dil } from "@/lib/i18n/diller";
import { EN_PROFILES } from "@/lib/en/profiles";
/* §9 · beyaz zeminde altı sektör. Başlık "Hizmet verdiğimiz sektörler":
   soru olarak sorulduğunda ("kimler için?") liste eksik görünüyordu, sektör
   listesi olarak okununca kapalı bir küme gibi duruyor.

   25.09.2026 · KARTLAR FOTOĞRAFLI. Burak Hakkımızda'daki fotoğraflı sektör
   kartlarını görünce: "çok hoşuma gitti. Bunun aynısını ana sayfaya da
   taşıyabiliriz. Ana sayfada şu an SVG görsellerle var ya, onu siktir et,
   direkt buradakini taşı." Kartın altındaki küçük simülasyon pencereleri
   (sipariş akışı, sohbet, kira takvimi, lisans rayı, evrak listesi, kod
   ekranı) kalktı; kart artık iki sayfanın ortak bileşeni
   (components/shared/SektorFotoKartlari). Cümleler bu sayfanın kendi
   cümleleri: burada "bu sektörde ne kuruluyor", Hakkımızda'da "kurgunun
   düğümü nerede". Simülasyonların kodu git'te (bu commit'in öncesi).

   Siyah taşıma bandı hâlâ ayrı bir kapı, yedinci kart değil. */

/* `s` kartın iç sayfa adresinin slug'ı: her sektörün /sektorler/<slug>
   adresinde kendi sayfası var (25.09.2026'dan beri altısı da yayında), çünkü
   arama tarafında insanlar ülke ve sektörü birlikte arıyor ("dubaide yazılım
   şirketi kurmak"). SmartLink adresin yayında olup olmadığını lib/routes.ts'e
   soruyor; yeni bir sektör eklendiğinde yayına girene kadar sönük basılır. */
const PROFILES: { t: string; s: string; l: string }[] = [
  {
    t: "E-ticaret",
    s: "e-ticaret",
    l: "Kartla tahsilat, çoklu pazar yeri ve lojistik tek yapıda toplanır.",
  },
  {
    t: "Yazılım ve teknoloji",
    s: "yazilim-ve-teknoloji",
    l: "Abonelik ve uygulama içi satış, ödeme altyapısıyla birlikte kurulur.",
  },
  {
    t: "Danışmanlık",
    s: "danismanlik",
    l: "Yurt dışı müşteriye şirket adına sözleşme, fatura ve tahsilat.",
  },
  {
    t: "Gayrimenkul",
    s: "gayrimenkul",
    l: "Mülk şirket altında durur, kira şirket hesabına akar.",
  },
  /* Son iki sektör düzenlemeye tabi ve cümleleri de bunu saklamıyor. İkisinde
     de kurgunun kendisi değil, izin katmanı belirleyici: pricing.ts'teki
     ACTIVITY_FACTOR finansı 1.3, sağlığı 1.15 ile çarpıyor, yani süreç bizim
     tarafımızda da daha ağır. Cümleler bu yüzden "kurarız" değil "önden
     netleştiririz" diyor — lisansı veren biz değiliz, dosyayı hazırlayan biziz.
     Kartların altındaki notlar da aynı sınırı bir kez daha çiziyor. */
  {
    t: "Finans ve yatırım",
    s: "finans-ve-yatirim",
    l: "Faaliyet lisansa tabi; kapsamı ve dosyayı önden netleştiriyoruz.",
  },
  {
    t: "Sağlık ve medikal hizmetler",
    s: "saglik-ve-medikal",
    l: "Ruhsat şartları şirket kurgusunu belirler; ikisi birlikte planlanır.",
  },
];

/* `dil` (10.10.2026 · /en denemesi): bu bileşen sunucuda çalışıyor, dili
   yoldan okuyamıyor; sayfa veriyor. Varsayılan Türkçe ve Türkçe dalda `c`
   cümleyi aynen geri veriyor. Sektör sayfaları İngilizcede yok: kartlar
   şimdilik Türkçe sektör sayfasına gidiyor. */
export default function Profiles({ dil = "tr" }: { dil?: Dil } = {}) {
  const c = cevirici(dil, EN_PROFILES);
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* Vurgu son kelimede kalıyor: cümlenin taşıdığı bilgi "sektörler",
              "hizmet verdiğimiz" ise sadece ona giden yol. Eskiden vurgulanan
              "çalışıyoruz?" fiiliydi ve başlıkta fiil kalmadı. */}
          <SplitWords
            as="h2"
            text={c("Hizmet verdiğimiz sektörler.")}
            accent={c("sektörler")}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{c("Kurgu, sektöre göre değişiyor.")}</p>
          </FadeUp>
        </div>

        <SektorFotoKartlari dil={dil} items={PROFILES.map((p) => ({ slug: p.s, label: c(p.t), line: c(p.l) }))} />

        <FadeUp delay={0.42}>
          <div className="pf2-move">
            <span className="pf2-move-ic" aria-hidden="true">
              <Repeat size={22} strokeWidth={1.9} />
            </span>
            <div>
              <h3>{c("Mevcut şirketinizi Ortac'a taşıyın.")}</h3>
              <p><Tel>
                {c("Mevcut kaydınızı, beyanlarınızı ve banka hareketlerinizi inceleyip geçiş planı çıkarıyoruz. Eksik varsa önce tamamlıyoruz.")}
              </Tel></p>
            </div>
            {/* 09.10.2026 · /sirket-tasima yayında değil, düğme soluk ve tıklanmaz
                duruyordu. Sayfa açılana kadar hedef iletişim. */}
            <SmartLink href="/iletisim" className="btn btn-primary">
              {c("Şirketimi taşı")}
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
