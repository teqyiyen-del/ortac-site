"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";

/* ============================================================================
   DUBAI HERO KARTI — aday "H1": ELEME

   ---------------------------------------------------------------- MUHAKEME

   1) Bu sayfaya kim geliyor?
   Türkiye'den, "Dubai = %0 vergi" cümlesini bir yerden duymuş, henüz karar
   vermemiş biri. Satın almaya değil KARŞILAŞTIRMAYA gelmiş: aklında Dubai'nin
   yanında en az bir alternatif daha var (İngiltere, KKTC, ya da hiçbir şey
   yapmamak). Yani hero'ya gelen kişi bir müşteri değil, bir ADAY.

   2) Üç saniyede kartın ne yapmasını istiyoruz?
   Bir kart üç saniyede iki şeyden birini yapabilir: bilgi VERİR ya da bilgi
   ALIR. Bilgi vermeyi sol sütun zaten yapıyor — başlık, lead, iki güven satırı.
   Sağ tarafa ikinci bir bilgi bloğu koymak iki kez denendi ve iki kez "çok
   yazı / kalabalık" olarak geri geldi; bu bir uygulama hatası değil, kurgu
   hatasıydı. Aynı ekranda ikinci bir anlatıcı olmaz.
   O yüzden bu kart ALIYOR. Sayfanın tamamında ziyaretçiye bir şey soran tek
   yer burası; geri kalan on iki bölüm konuşuyor, bu kart dinliyor. Üç saniyede
   verdiğimiz şey bilgi değil, DAVRANIŞ: ziyaretçi ilk ekranda kendisiyle ilgili
   bir şey söylüyor ve karşılığında kendisine ait bir cevap alıyor. Katılan
   ziyaretçi okuyan ziyaretçiden çok daha derine iniyor.

   3) Hangi soruyu kapatıyor ve o soru aşağıda zaten cevaplanıyor mu?
   Sayfanın altını tek tek gezdim:
     · "Serbest bölge mi mainland mi" → CountryStructures, hero'nun HEMEN
       altındaki ilk bölüm. Kartın bunu ANLATMASI saf tekrar olurdu: bir ekran
       aşağıda zaten var.
     · "Dubai bana uygun mu" → CountryFit, on iki bölümün onuncusu. Yani sayfa,
       en çok güven kazandıran içeriği — "şu durumdaysanız Dubai size uygun
       DEĞİL, İngiltere'ye bakın" — en az insanın ulaştığı yere koymuş.
   İşte kartın işi bu boşlukta: soruyu kapatmıyor, DOĞRU SORUYU ÖNE ALIYOR.
   Aşağıdaki bölümler herkese aynı sırayla her şeyi anlatıyor; kart tek bir
   girdi alıp ziyaretçiyi kendi koluna ayırıyor. Üç cevabın ikisi "evet, Dubai,
   şu yapı" diyor, üçüncüsü açıkça "bu profilde Dubai değil" diyor. Bir Dubai
   sayfasının ilk ekranında "Dubai değil" yazması satış kaybı değil: firmanın
   üç ülkesi var, yanlış ülkeye giren müşteri zaten kaybedilmiş müşteri, ve
   ilk ekranda dürüstlük gösteren bir firmanın geri kalan iddiaları da inanılır
   hale geliyor. Bu, aşağıdaki hiçbir bölümün yapamadığı iş — çünkü hepsi
   ziyaretçinin oraya kadar inmesini bekliyor.

   Sorulan soru neden "müşteriniz nerede": firmanın kendi içeriğinde tek
   belirleyici değişken bu. countryContent.dubai.structures.rule aynen şunu
   yazıyor — "Kararı satış yaptığınız taraf veriyor". Aynı değişken bir üst
   katta da çalışıyor: fitTable'daki "Yalnızca AB'ye fatura kesen" satırı
   ok:false ve alt:"ingiltere". Yani tek bir soruyla hem yapı hem ülke kararı
   ayrışıyor. Kartta uydurulmuş bir eleme mantığı yok; sayfanın kendi mantığı
   yukarı taşınmış durumda.

   ------------------------------------------------------------------ BİÇİM
   Kart bir tab şeridi: üstte soru, ortada üç seçenek, altta yükselen cevap
   paneli. Şeridin altındaki beyaz çubuk hem seçimi işaretliyor hem de girdi
   yarısı ile çıktı yarısını ayıran çizginin ta kendisi — "senin seçimin bu
   kapıyı açtı" cümlesini tek bir öğeyle kuruyor.

   KISITLAR
   · Kart koyu (--night-2 ailesi), beyaz yalnızca aksan: kayan çubuk + aktif
     sekme + cevabın başlığı. Kartın kendisi asla beyaz değil.
   · Koyu yüzeyde alfa yok, hepsi opak hex (globals.css sonundaki gerekçe).
   · Metin altı satır: soru, alt satır, sekme şeridi, cevap başlığı, cevap
     satırı, çıkış bağlantısı.
   · STANCE_LIMITS: gün yok, fiyat yok, banka vaadi yok. Kartın verdiği tek
     şey bir yapı adı ve bir yönlendirme.
   · <768px gizli (CSS'te), telefonda hero metinle taşınıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Üç kol. Metinler countryContent.dubai'den sıkıştırıldı, uydurulmadı:
   · serbest bölge satırı → structures.options[0].line
   · mainland satırı      → structures.options[1].watch
   · İngiltere kolu       → fitTable "Yalnızca AB'ye fatura kesen" (ok:false)
   Kart burada kaynağı import etmiyor çünkü hepsi tek satıra indirilmiş
   halde; ham metinler hero'ya sığmıyor, aşağıdaki bölümlerde tam haliyle
   duruyorlar. Kartın işi zaten özet vermek, kopya çıkarmak değil. */
const BRANCHES = [
  {
    /* varsayılan: ziyaretçi hiç dokunmasa bile kart bir şey söylemiş olmalı,
       ve söyleyeceği şey istatistiksel olarak en doğru olan kol olmalı */
    tab: "Türkiye / global",
    verdict: "Serbest bölge",
    line: "Kuruluşların büyük çoğunluğu bu yapıda.",
    cta: "İkisini yan yana görün",
    /* aşağıdaki yapı bölümünün çapası (CountryStructures: id="yapi").
       "Detayı isteyen tıklayarak görsün" — kart özeti veriyor, bölüm
       karşılaştırmayı. Lab sayfasından tıklandığında da doğru yere gidiyor. */
    href: "/dubai#yapi",
  },
  {
    tab: "BAE içi",
    verdict: "Mainland",
    line: "İç pazarda serbest satış; ofis şartı ve maliyet daha yüksek.",
    cta: "İkisini yan yana görün",
    href: "/dubai#yapi",
  },
  {
    /* Kartın asıl işi burada: bir Dubai sayfasının ilk ekranında "Dubai değil"
       diyebilmek. fitTable bunu zaten söylüyor ama onuncu bölümde. */
    tab: "Yalnızca AB",
    verdict: "Dubai değil, İngiltere",
    line: "Yalnızca AB'ye fatura kesende Ltd daha az sürtünme yaratır.",
    cta: "İngiltere Ltd'ye bakın",
    href: "/ingiltere",
  },
];

export default function HeroH1() {
  const reduced = useReducedMotion() ?? false;
  const t = (v: number) => (reduced ? 0 : v);
  const [n, setN] = useState(0);
  const branch = BRANCHES[n];

  return (
    <motion.div
      className="kar"
      style={{ "--n": n } as React.CSSProperties}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
    >
      {/* Soru başlık etiketiyle (h2/h3) yazılmıyor: hero'da zaten h1 var ve
          araya atlanmış bir seviye sokmak belge planını bozuyor. Sorunun
          erişilebilirlik karşılığı aşağıdaki role="group" aria-label'ı —
          aynı cümle, doğru yerde. */}
      <div className="kar-head">
        <p className="kar-q">Müşteriniz nerede?</p>
        <p className="kar-hint">Dubai&apos;de yapıyı bu belirliyor.</p>
      </div>

      {/* role=group + aria-pressed: bu bir gezinme sekmesi değil, bir seçim.
          Sekme semantiği (tablist/tabpanel) verirsek ekran okuyucu aşağıdaki
          paneli ayrı bir sayfa bölümü sanıyor; oysa burada tek bir cevap
          alanı var ve içeriği değişiyor. */}
      <div className="kar-rail" role="group" aria-label="Müşteriniz nerede?">
        {BRANCHES.map((b, i) => (
          <button
            key={b.tab}
            type="button"
            className="kar-tab"
            aria-pressed={i === n}
            onClick={() => setN(i)}
          >
            {b.tab}
          </button>
        ))}
        <span className="kar-ind" aria-hidden="true" />
      </div>

      {/* aria-live dıştaki kapta duruyor, değişen çocukta değil: kap sabit
          kaldığı için her seçimde yeni metin okunuyor. */}
      <div className="kar-out" aria-live="polite">
        <motion.div
          /* key değişince blok yeniden kuruluyor, yani AnimatePresence'a ve
             onun "önce çıkışı bekle" gecikmesine gerek kalmıyor. Cevap anında
             yenileniyor, sadece belirmesi yumuşuyor. */
          key={n}
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: t(0.34), ease: EASE }}
        >
          <b className="kar-verdict">{branch.verdict}</b>
          <p className="kar-line">{branch.line}</p>
          {/* çıkış bağlantısı cevabın PARÇASI, o yüzden aynı blokta: kolla
              birlikte hem metni hem hedefi değişiyor, ayrı dursa iki ayrı
              hızda güncellenen tek bir cevap görünümü çıkıyordu. */}
          <SmartLink href={branch.href} className="kar-more">
            {branch.cta}
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
