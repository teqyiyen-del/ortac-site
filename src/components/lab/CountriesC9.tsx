"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  IdCard,
  Laptop,
  MapPin,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C9 — "kart destesi"

   FİKİR TEK CÜMLEYLE
   Üç ülke alt alta duran üç kart değil, üst üste duran tek bir deste. Öndeki
   kart tamamen açık ve okunur; arkadaki ikisi yalnızca alt kenarıyla görünüyor.
   Bir kenara basıldığında o kart desteyi delip öne geliyor, öndeki arkaya
   düşüyor. Bölüm hiç dokunulmadan da üç ülkenin varlığını, adını ve aynı iki
   ekseni gösteriyor.

   NEDEN DESTE — YER MESELESİ DEĞİL, ODAK MESELESİ
   Yer kazancı sonuç, sebep değil. Alt alta üç eşit kart koyduğunuz anda üç
   ülkeyi de aynı anda satmaya çalışmış oluyorsunuz ve ziyaretçi hiçbirini
   okumuyor; bu bölümün baştan beri şikâyeti buydu. Deste bir tanesini
   ayrıcalıklı kılıyor: bir seferde bir ülke okunuyor, diğer ikisi kaybolmadan
   kenarda bekliyor. Yan etkisi de var — kapalı yükseklik bir kart + iki şerit,
   yani canlı bölümün yarısından az.

   "KAPALIYKEN DE KIYAS HİSSİ" NEREDEN GELİYOR
   Kartın yüzündeki iki özellik ile şeritlerdeki iki bilgi AYNI İKİ EKSEN:

     1. ülkeyi ayıran tek cümle (EDGE)   — her ülkede farklı
     2. kartla tahsilat (PAY_MATRIX)     — üç ülkede de aynı soru

   Yani şerit, kartın yüzünün sıkıştırılmış hâli. Gerçek bir destede kartın
   kenarındaki etiket ne işe yarıyorsa burada da o: içeride ne yazdığını
   söylüyor. Bunun kıyas açısından somut sonucu şu — ikinci eksen üç kartta da
   aynı hizada durduğu için KKTC'nin "Yok"u, Dubai'nin ve İngiltere'nin
   "Var"ının hemen altında, hiçbir şeye tıklamadan okunuyor. Bölümün en keskin
   verisi kapalı hâlin içinde.

   Kartlar arasında geçerken bu iki eksen yer değiştirmiyor: göz aynı iki
   noktaya bakıyor, yalnızca içerik değişiyor. Kıyas dediğimiz şey zaten bu.

   DETAY: YERİNDE, VE DESTE AÇIKKEN DE ÇEVRİLEBİLİYOR
   "Detay" öndeki kartın kendi içinde açılıyor; başka sayfaya gitmek yok, üst
   üste binen bir modal yok. Açık/kapalı durumu KARTA DEĞİL DESTEYE ait: detay
   açıkken başka bir ülkeye geçilirse yeni kart da detaylı geliyor. Bu bilerek
   böyle — aynı dört satırı (Kim için · Yapı · Banka hesabı · Ödeme kuruluşu)
   ülkeden ülkeye sabit yerinde okumak, üç paneli tek tek açıp kapamaktan çok
   daha hızlı bir kıyas. Deste bir kıyas aracına dönüşüyor.

   DÜRÜST KISIT NEDEN AÇMADAN GÖRÜNÜYOR
   FACTS[c].limit öndeki kartın yüzünde, iki özelliğin hemen altında, amber
   üçgeniyle duruyor — tıklamak gerekmiyor. Üçünü birden basmıyoruz çünkü üç
   uyarı üst üste okununca hiçbiri okunmuyor; ama okunan ülkenin kısıtı her
   zaman ekranda. Kutu değil tek satır: dolgulu amber blok bu kadar kısa bir
   kartta en ağır nesne olurdu ve uyarı, kartın kendisinden yüksek sesle
   konuşurdu.

   NE KOYMADIM
   · Fiyat ve süre — bu bölümün sözleşmesi baştan beri "rakam fiyat bölümünde",
     süre taahhüdü ise STANCE_LIMITS gereği hiç verilmiyor.
   · Maliyet sıralaması — kelimeyle bile olsa (En düşük / Ortada) kartın
     yüzünde üçüncü bir eksen açıyordu; iki eksen kuralı buna değmezdi.
   · Ülke fotoğrafı — canlı bölümde sütun başına ~240 piksel yer kaplıyor ve
     hiçbir soruyu cevaplamıyor. Destede zaten üç kartın da yer bütçesi yok.
   · İstanbul — hiçbir yerde geçmiyor. KKTC'nin yakınlık argümanı yalnızca
     kendi cümlesinde.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------------- eksen 1: fark ---
   Ülke başına tek cümle. Üç kural: (1) üçünde de doğru olan bir şey yazılmaz —
   "kuruluş, banka, muhasebe" zaten başlığın altında duruyor; (2) taahhüt yok,
   Dubai'ninki "çıkabilen", "çıkar" değil; (3) tek satır, çünkü bu cümle hem
   kartın yüzünde hem de şeritte aynı hâliyle geçiyor ve şerit 56 piksel.
   İkonlar cümlenin konusunu tekrar etmiyor, onu SINIFLIYOR: kimlik (oturum),
   ekran (uzaktan), konum (yakınlık). Böylece üç ikon yan yana geldiğinde üç
   farklı soruya bakıldığı anlaşılıyor. */
const EDGE: Record<CountrySlug, { i: LucideIcon; t: string }> = {
  dubai: { i: IdCard, t: "Oturum vizesi çıkabilen tek ülke" },
  ingiltere: { i: Laptop, t: "Baştan sona uzaktan kuruluş" },
  kktc: { i: MapPin, t: "Türkiye'ye en yakın, süreç Türkçe" },
};

/* ------------------------------------------------------ PAY_MATRIX okuma ---
   Hiçbir kanal adı bu dosyada elle yazılmıyor. Sebebi bakım değil doğruluk:
   Stripe bir gün KKTC'yi açarsa ya da bir kanal listeden düşerse, buradaki
   "Var / Yok" ve altındaki isimler kendiliğinden düzeliyor. Elle yazılmış bir
   liste ise sessizce yanlışa dönerdi — ve bu bölümdeki en keskin iddia tam da
   o liste. */
function group(title: string) {
  return PAY_MATRIX.find((g) => g.title === title);
}

/** o ülkede gerçekten çalışan kanalların adları */
function worksIn(title: string, c: CountrySlug): string[] {
  return (
    group(title)
      ?.rows.filter((r) => r.cells[c] === "yes")
      .map((r) => r.name) ?? []
  );
}

/** o ülkede açıkça DESTEKLENMEYEN kanallar — "none" (ülkede hiç sunulmuyor)
    ile karıştırılmıyor; ikisi farklı cümle kuruyor */
function blockedIn(title: string, c: CountrySlug): string[] {
  return (
    group(title)
      ?.rows.filter((r) => r.cells[c] === "no")
      .map((r) => r.name) ?? []
  );
}

/* Eksen 2. Hem şeritte (tek kelime) hem kartın yüzünde (kelime + kanal adları)
   aynı fonksiyondan çıkıyor, yani ikisi asla ayrışamaz. */
function payOf(c: CountrySlug) {
  const on = worksIn("Tahsilat", c);
  if (on.length) return { ok: true, word: "Var", sub: on.join(", ") };
  return {
    ok: false,
    word: "Yok",
    sub: `${blockedIn("Tahsilat", c).join(" ve ")} desteklemiyor`,
  };
}

/* ------------------------------------------------------------- detay ------
   Dört satır, hepsi tek kaynaktan. Kartın yüzünde OLMAYAN şeyler: panel tekrar
   değil devam. Ödeme kuruluşunun "banka değildir" uyarısı ayrı bir dipnot
   olarak değil, grubun kendi hint'i olarak geliyor — metin zaten PAY_MATRIX'te
   duruyor, burada ikinci bir kopyası açılmıyor. */
function detailRows(c: CountrySlug) {
  return [
    { k: "Kim için", v: FACTS[c].forWhom, hint: undefined as string | undefined },
    { k: "Yapı", v: FACTS[c].structure, hint: undefined as string | undefined },
    {
      k: "Banka hesabı",
      v: worksIn("Banka hesabı", c).join(", ") || "Bu ülkede sunulmuyor",
      hint: group("Banka hesabı")?.hint,
    },
    {
      k: "Ödeme kuruluşu",
      v: worksIn("Ödeme kuruluşu", c).join(", ") || "Bu ülkede çalışan kanal yok",
      hint: group("Ödeme kuruluşu")?.hint,
    },
  ];
}

export default function CountriesC9() {
  /* Desteye ait iki durum, ikisi de kartlara ait değil:
     front — hangi kart üstte. Varsayılan COUNTRY_ORDER'ın ilki, yani sitenin
             geri kalanıyla aynı sıra; burada elle bir tercih yapmıyoruz.
     open  — detay açık mı. Karta değil desteye ait olması kasıtlı: ülke
             değiştirince detay kapanmıyor, aynı dört satır yeni ülkeyle
             yeniden doluyor. Kıyasın çalıştığı yer burası. */
  const [front, setFront] = useState<CountrySlug>(COUNTRY_ORDER[0]);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  /* DOM sırası = görsel sıra. CSS `order` ile de yapılabilirdi ve o zaman
     düğümler hiç yer değiştirmezdi (geçişler daha pürüzsüz olurdu), ama klavye
     ile gezen kişi kartları ekranda gördüğünden başka bir sırayla dolaşırdı.
     Diziyi çevirmek bu bedeli ödemiyor: React aynı düğümleri taşıyor, odak
     taşınan düğümle birlikte gidiyor. Arkadaki ikisinin kendi arasındaki sırası
     hiç bozulmuyor — deste karılmıyor, yalnızca bir kart yukarı çekiliyor. */
  const stack: CountrySlug[] = [front, ...COUNTRY_ORDER.filter((c) => c !== front)];

  return (
    /* id="ulkeler" bilerek yok: /lab sayfasında adaylar alt alta duruyor ve
       çapayı ikinci kez basmak çift id demek. Kazanan aday canlıya taşınırken
       hem o id'yi hem de eski bölümün #odeme-altyapisi çapasını (routes.ts onu
       canlı sayıyor) devralmak zorunda. */
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* Mekanizmayı tarif ediyor ama emir vermiyor: "şuna tıklayın"
                demek ziyaretçiye ödev vermek, "öndeki açık" demek ne olduğunu
                söylemek. İkinci cümle aynı zamanda bölümün sözünü veriyor —
                arkadakiler kaybolmadı, bir tık uzakta. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Üçü tek destede: öndeki
              açık, diğer ikisi bir tık uzakta.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="c9-wrap">
          {/* Deste. Sıralama sr-only olarak da yazılı: ekran okuyucu için
              "üstte / altta" görsel bir bilgi ve kartların kendi metninden
              çıkmıyor. */}
          <p className="sr-only">
            Üç ülke bir deste hâlinde. Şu an üstteki kart: {COUNTRY_NAME[front]}.
          </p>

          <div className="c9-deck">
            {stack.map((c, pos) => {
              const isFront = pos === 0;
              const pay = payOf(c);
              const Edge = EDGE[c].i;

              return (
                <article key={c} className="c9-card" data-pos={pos} data-open={isFront && open}>
                  {/* TEK kontrol, iki anlam. Öndeyken detayı açıp kapatıyor,
                      arkadayken kartı öne getiriyor. İki ayrı düğüm olsaydı
                      (biri şeritte, biri kartın başlığında) React karta
                      basıldığında birini söküp diğerini takardı ve odak
                      gövdeye düşerdi; aynı düğüm kaldığı için klavye kullanan
                      kişi bastığı yerde kalıyor — sadece düğmenin işi
                      değişiyor. */}
                  <button
                    type="button"
                    className="c9-head"
                    aria-expanded={isFront ? open : undefined}
                    aria-controls={isFront && open ? `c9-d-${c}` : undefined}
                    onClick={() => {
                      if (isFront) setOpen((v) => !v);
                      else setFront(c);
                    }}
                  >
                    <span className="c9-flag" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    <span className="c9-name">{COUNTRY_NAME[c]}</span>

                    {isFront ? (
                      <span className="c9-cue">
                        {open ? "Kapat" : "Detay"}
                        <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                    ) : (
                      <>
                        {/* Şeridin ortası: kartın yüzündeki birinci eksenin
                            aynısı. Dar ekranda gizleniyor (bkz. CSS) — orada
                            şeride sığan tek şey ad ve ikinci eksen. */}
                        <span className="c9-spine">{EDGE[c].t}</span>
                        {/* İkinci eksen, üç kartta da aynı hizada. Renk tek
                            başına taşımıyor: işaret + kelime birlikte. */}
                        <span className="c9-mark" data-v={pay.ok ? "yes" : "no"}>
                          {pay.ok ? (
                            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                          ) : (
                            <X size={14} strokeWidth={2.5} aria-hidden="true" />
                          )}
                          <span className="c9-mark-k">Kartla tahsilat</span>
                          <b>{pay.word}</b>
                        </span>
                        <span className="sr-only"> — bu kartı öne getir</span>
                      </>
                    )}
                  </button>

                  {/* Kartın yüzü. Yükseklik animasyonu height:auto ile, layout
                      projeksiyonu ile değil: kart 56 pikselden ~155 piksele
                      çıkıyor ve o oranda bir ölçek düzeltmesi metni gözle
                      görülür biçimde eziyor. height animasyonu düzeni
                      gerçekten yeniden akıtıyor, yani yazı her karede doğru
                      boyutta.

                      Yüz ve detay KARDEŞ, iç içe değil. İç içe olsalardı dıştaki
                      "auto" ölçümü içteki animasyon sürerken alınırdı ve kart
                      yanlış yükseklikte donardı. Ayrı olduklarında her biri
                      kendi yüksekliğini ölçüyor ve ikisi aynı anda da
                      açılabiliyor (detay açıkken başka karta geçmek). */}
                  <AnimatePresence initial={false}>
                    {isFront && (
                      <motion.div
                        key="face"
                        className="c9-face"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                      >
                        <div className="c9-face-in">
                          <ul className="c9-feats">
                            <li className="c9-feat">
                              <Edge size={17} strokeWidth={2} aria-hidden="true" />
                              <span>
                                <b>{EDGE[c].t}</b>
                              </span>
                            </li>
                            <li className="c9-feat" data-v={pay.ok ? "yes" : "no"}>
                              <CreditCard size={17} strokeWidth={2} aria-hidden="true" />
                              <span>
                                <b>Kartla tahsilat: {pay.word}</b>
                                <em>{pay.sub}</em>
                              </span>
                            </li>
                          </ul>

                          {/* Tek satır, kutusuz. Kartın yüzünde kalıyor çünkü
                              bir tık arkasına saklanan uyarı, uyarı değil. */}
                          <p className="c9-limit">
                            <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
                            {FACTS[c].limit}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {isFront && open && (
                      <motion.div
                        key="detail"
                        className="c9-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                      >
                        <div
                          className="c9-detail-in"
                          id={`c9-d-${c}`}
                          role="group"
                          aria-label={`${COUNTRY_NAME[c]} detayı`}
                        >
                          <dl className="c9-rows">
                            {detailRows(c).map((r) => (
                              <div key={r.k}>
                                <dt>{r.k}</dt>
                                <dd>
                                  {r.v}
                                  {r.hint && <span>{r.hint}</span>}
                                </dd>
                              </div>
                            ))}
                          </dl>
                          <SmartLink href={`/${c}`} className="btn btn-solid btn-sm">
                            {COUNTRY_NAME[c]}&apos;de kuruluş
                            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                          </SmartLink>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>

          {/* Bölümün tek dipnotu ve tek çıkışı aynı satırda. İkisi de bir
              satırdan uzun değil: burada tutulan her paragraf destenin
              kazandırdığı yeri geri veriyor. */}
          <div className="c9-foot">
            <p className="c9-note">
              Hesabı banka açar, onay taahhüdü vermiyoruz. Tutarlar fiyat
              bölümünde.
            </p>
            <SmartLink href="/ulkeler" className="link-arrow">
              Üç ülkeyi yan yana kıyaslayın
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
