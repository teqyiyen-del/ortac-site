"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/* 24.09.2026 · GÖRÜNÜRLÜĞÜ KELİME DEĞİL SARMALAYICI İZLİYOR.
   Önceden her kelime kendi whileInView'ını taşıyordu. Ama kelime ilk karede
   y 110% aşağıda, overflow: hidden bir maskenin İÇİNDE; tarayıcının kesişim
   gözlemcisi kırpılmış öğeyi görmüyor ve kelimenin maskede kalan payı alt
   dolgu (0,12em) ile 110% arasındaki yuvarlama farkı kadar (~0,01em). O pay
   bazen sıfıra yuvarlanıyor ve kelime HİÇ açılmıyor: mobil taramada ana
   sayfanın "Kuruluşta nasıl çalışıyoruz." başlığında ilk iki kelime görünmez
   kaldı, yalnız "çalışıyoruz." açıldı (390 px, ölçüldü: opacity 0).
   Artık gözlemci dönüşümsüz dış span'de; kelimeler varyantla (gizli → açık)
   onu izliyor. Süre, yumuşama ve kelime başı gecikme aynı. */
const KELIME = {
  gizli: { y: "110%", opacity: 0 },
  acik: (gecikme: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_QUINT, delay: gecikme },
  }),
};

type Props = {
  text: string;
  accent?: string; // substring of text rendered in .text-accent, split per word
  accentColor?: string; // overrides .text-accent color (e.g. blue-600 on navy)
  base?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2";
  /* Sayfa içi çapa hedefi. Başlığın kendisine id verilebilsin diye eklendi
     (/iletisim · formun üstündeki "Üç ofisin iletişim bilgileri" düğmesi ofis
     başlığına iniyor). İSTEĞE BAĞLI ve varsayılanı yok: verilmezse <Tag> hiç
     id özniteliği basmıyor, mevcut çağrıların hiçbiri etkilenmiyor. */
  id?: string;
  /** İLK EKRAN (hero): aynı kelime animasyonu saf CSS'le, JavaScript'i beklemiyor */
  ilk?: boolean;
};

/* Kelimelerin kabı: normalde görünürlüğü izleyen motion span, ilk ekranda
   düz span (animasyon kelimelerde, CSS'te). */
function Kap({ ilk, children }: { ilk: boolean; children: React.ReactNode }) {
  if (ilk) return <span aria-hidden="true">{children}</span>;
  return (
    <motion.span
      aria-hidden="true"
      initial="gizli"
      whileInView="acik"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {children}
    </motion.span>
  );
}

/** H1/H2 only — splits on spaces, per-word clip wrapper, y 110% → 0,
 *  0.6s ease-out-quint, delay base + index * 0.045 (spec contract). */
export default function SplitWords({
  text,
  accent,
  accentColor,
  base = 0,
  className,
  style,
  as: Tag = "h2",
  id,
  ilk = false,
}: Props) {
  const words = text.split(" ");
  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd = accentStart >= 0 && accent ? accentStart + accent.length : -1;

  /* character offset of each word within the source string (no mutable closure) */
  const items = words.map((word, index) => {
    const start = words
      .slice(0, index)
      .reduce((sum, w) => sum + w.length + 1, 0);
    const isAccent = accentStart >= 0 && start >= accentStart && start < accentEnd;
    return { word, index, isAccent };
  });

  return (
    <Tag className={className} style={style} id={id}>
      <span className="sr-only">{text}</span>
      {/* İLK EKRAN KİPİ (25.09.2026): hero başlığı JavaScript yüklenene kadar
          görünmez bekliyordu. `ilk` verilince aynı kelime animasyonu (y 110% →
          0, 0.6 s, aynı eğri, kelime başı 0.045 s) CSS'le ilk boyamada
          başlıyor (globals · .sw-ilk). Maske ve pay aynen. */}
      <Kap ilk={ilk}>
        {items.map(({ word, index, isAccent }) => (
          <Fragment key={index}>
            {/* 18.09.2026 · HARFLERİN ÜSTÜ KESİLİYORDU. Burak: "bazı yazıların
                ö harfi, ü harfinin noktaları falan kesiliyor, özellikle
                başlıktakiler."

                Sebep ölçüldü: bu sarmalayıcı `overflow: hidden` ile bir maske
                ve kutusunun yüksekliği SATIR YÜKSEKLİĞİ kadar. Başlıklarda
                satır yüksekliği 1,06 (46 px'te 48,76 px), Poppins'in doğal
                içerik alanı ise ~1,4em (64,4 px): glifler kutunun 7,8 px
                üstüne taşıyor ve maske onları kesiyordu. Altta zaten 0,12em
                pay vardı, üstte hiç yoktu.

                ÜSTE 0,25em PAY EKLENDİ, negatif kenar boşluğu onu geri
                alıyor: sayfa düzeni değişmiyor.

                ALT PAYA VE `initial: 110%`E DOKUNULMADI, ve bu bilerek.
                Maske aşağıdan açılıyor; alt payı büyütmek kelimenin başlangıç
                noktasını da (110%) büyütmeyi gerektiriyor, yoksa ilk karede
                kelimenin tepesi görünüyor. Denendi: 140%'e çıkarılınca
                whileInView hiç tetiklenmedi ve BÜTÜN başlıklar görünmez kaldı
                (ölçüldü: motion span opacity 0). Üstteki pay o zinciri hiç
                etkilemiyor, çünkü kelime yukarıdan değil aşağıdan giriyor. */}
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                paddingTop: "0.25em",
                marginTop: "-0.25em",
                paddingBottom: "0.12em",
                marginBottom: "-0.12em",
              }}
            >
              {ilk ? (
                <span
                  className={isAccent && !accentColor ? "text-accent sw-ilk" : "sw-ilk"}
                  style={{
                    display: "inline-block",
                    color: isAccent && accentColor ? accentColor : undefined,
                    animationDelay: `${base + index * 0.045}s`,
                  }}
                >
                  {word}
                </span>
              ) : (
                <motion.span
                  className={isAccent && !accentColor ? "text-accent" : undefined}
                  style={{
                    display: "inline-block",
                    willChange: "transform",
                    color: isAccent && accentColor ? accentColor : undefined,
                  }}
                  variants={KELIME}
                  custom={base + index * 0.045}
                >
                  {word}
                </motion.span>
              )}
            </span>{" "}
          </Fragment>
        ))}
      </Kap>
    </Tag>
  );
}
