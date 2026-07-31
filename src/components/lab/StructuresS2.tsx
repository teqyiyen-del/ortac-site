"use client";

/* ============================================================================
   ADAY S2 — "TEK SORU"

   NEDEN BU TASARIM
   Bu bölüm Dubai sayfasında hero'dan hemen sonra geliyor. Ziyaretçi henüz
   ülkeyi tanımıyor; "serbest bölge" ile "mainland" onun için iki teknik terim.
   Şu anki kıyas tablosu tam da bu yüzden erken: tablo, iki şeyi zaten tanıyan
   birinin aracı. Tanımayan biri tabloya bakınca karşılaştırma yapmıyor, dört
   satır metin okuyor ve sayfayı kaydırıyor.

   O yüzden burada kıyas YOK. Bir soru var.

   Ziyaretçinin cevabını bildiği tek şey kendi işi: kime satıyor. Bölüm de tam
   onu soruyor — "Müşteriniz nerede?" — ve iki cevabı iki dal olarak önüne
   koyuyor. Cevabını seçtiği anda o dal açılıyor ve yalnızca kendi yapısını
   okuyor. Diğer dal kapanmıyor, silinmiyor, küçültülmüyor: hemen altında,
   aynı sakinlikte duruyor. Kıyas ortadan kalkmadı, seçimin karşı tarafına
   geçti. Merak eden bir tık ötede.

   KARAR KURALI NEREDE
   Dipnot değil, bölümün mekaniğinin kendisi. data.rule cümlesi başlığın
   sağındaki mavi kutuda tam metniyle duruyor (en tepe, h2 hizasında); hemen
   altındaki kart ise o cümleyi çalışır hâle getiriyor: soru = kuralın sorusu,
   iki dal = kuralın iki koşulu, dalın adı = kuralın sonucu. Yani kural bir
   kez yazılı, bir kez de fiziksel olarak orada. Ziyaretçi kuralı okumadan da
   kartı kullanarak öğreniyor.

   ÇİZİM NE SÖYLÜYOR
   Her dalın başında bir şema var ve iki şema birbirinin aynı — TEK bir şey
   değişiyor: müşteri düğümünün BAE çerçevesinin içinde mi dışında mı durduğu.
   Sorunun cevabı bu, o yüzden çizimde de tek değişken bu. Dışarı satışta
   çerçevenin sağ kenarında bir boşluk açılıyor (satışın geçtiği kapı), içeri
   satışta çerçeve tek parça kalıyor. Şema yapıyı değil SORUYU resmediyor;
   yapıyı anlatmak açılan panelin işi. Süs yok: bir kutu, bir ok, bir düğüm.

   DÜRÜSTLÜK NOKTASI (watch) NASIL KORUNUYOR
   Her seçeneğin "Dikkat edin" metni, o dal açıldığı anda uygunluk listesiyle
   YAN YANA, amber kutuda görünüyor. İkinci bir "detayları göster" katmanının
   arkasında değil: bir yapıyı kendine yakıştıran biri, o yapının kısıtını
   aynı ekranda görüyor. Gizlenmiş değil; sadece henüz hiçbir şey seçmemiş
   birinin önüne konmuyor, çünkü orada kimseye faydası yok.

   TAŞINIRKEN DİKKAT (bu aday kazanırsa)
   1. section'a bilerek id verilmedi. Canlı bileşende id="yapi" var ve
      ülke sayfasındaki çapa oradan çalışıyor; aday bileşenler karşılaştırma
      sayfasında yan yana duracağı için üçü aynı id'yi taşıyamaz. Kazanan
      canlıya girerken id="yapi" geri konmalı.
   2. BRANCHES dizisi options dizisiyle aynı sıraya bağlı (0 = serbest bölge,
      1 = mainland). Bileşen zaten yalnızca Dubai'de kullanılıyor (structures
      başka ülkede tanımlı değil), yani bu veriye ait bir varsayım değil,
      bileşene ait bir sunum kararı. Sıra değişirse burası da değişmeli.
   ========================================================================= */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Building2,
  Check,
  Globe,
  ListChecks,
  Plus,
  Store,
  TriangleAlert,
} from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent } from "@/lib/countryContent";

/* projedeki tek yumuşama eğrisi (--ease-out-quint'in JS karşılığı) */
const EASE = [0.22, 1, 0.36, 1] as const;

/* Soruya verilebilecek iki cevap. Metin data.rule cümlesinin iki koşulundan
   geliyor ama oradan ayrıştırılmıyor: bir cümleyi parçalayıp buton etiketi
   üretmek, cümle tek kelime değişince sessizce bozulan bir şey olurdu. Sabit
   yazmak yanlış yazamaz, olsa olsa eskir — ve eskirse gözle görülür.

   Icon alanı şemadaki müşteri düğümünün glifiyle bilerek aynı: dünya = BAE
   dışı, dükkân = BAE içi. Aynı şey iki yerde aynı işaretle anılıyor, ziyaretçi
   çizim ile yazıyı eşleştirmek için çaba harcamıyor.

   outside alanı hem çizimi hem cümleyi sürüyor: müşteri düğümü çerçevenin
   dışında mı içinde mi duracak. */
const BRANCHES: { when: string; Icon: typeof Globe; outside: boolean }[] = [
  { when: "Müşteriniz BAE dışında", Icon: Globe, outside: true },
  { when: "Müşteriniz BAE içinde", Icon: Store, outside: false },
];

/* ---- şema ----
   Çizim dili .gv2-* sınıflarından ödünç (ProSchema ve canlı yapı bölümüyle
   aynı kalem): sadece geometri, tek mavi, içine yerleştirilmiş lucide
   glifleri. Yeni bir görsel dil açmıyoruz.

   İki dal TEK bir bileşenden çıkıyor. Bu bir kod tasarrufu değil, iddianın
   kendisi: iki resim arasındaki fark tek bir değişkense, o iki resmi tek bir
   fonksiyonun iki çağrısı olarak yazmak doğrusu. Böylece ileride biri
   "sadece bu tarafa bir kutu daha ekleyelim" dediğinde aynanın kırıldığı
   anında görülüyor. */
const VB = "0 0 104 56";

/* BAE'nin dış hattı: x 1.2–76, y 2–54, köşe yarıçapı 12.
   Sağ kenarın üst ucundan başlayıp saat yönünün TERSİNE dönen TEK bir yol;
   ayrı köşe parçaları yok ki iki sürüm aynı hattı harfi harfine paylaşsın.
   RING sağ kenarı çizmiyor — sağ kenar iki sürümün ayrıldığı tek yer.

   Köşe yarıçapı 16 değil 12: sağ kenarın düz kısmı ne kadar uzunsa kapı için
   o kadar yer kalıyor. 16'da düz kenar 20 birim, ok başı 7,6 birimini
   yiyordu ve geriye kapı olarak okunmayan iki ince çentik kalıyordu. */
const RING =
  "A12 12 0 0 0 64 2 H13.2 A12 12 0 0 0 1.2 14 V42 A12 12 0 0 0 13.2 54 H64 A12 12 0 0 0 76 42";
/* içeri satış: sağ kenar tek parça. Z, (76,42)'den (76,14)'e düz iniyor. */
const FRAME_SHUT = `M76 14 ${RING} Z`;
/* dışarı satış: aynı hat, sağ kenarda 19–37 arası boşluk. Bu boşluk süs değil,
   satışın geçtiği kapı — ok tam oradan çıkıyor. Yol açık kaldığı için ÇİZGİ
   kesiliyor ama DOLGU kesilmiyor: tarayıcı dolguyu hesaplarken açık yolu
   (76,37)→(76,19) düz çizgisiyle kapatıyor, yani eksik olan tam da o kenar.
   Sonuç: iki çizimin zemini birebir aynı, yalnız hattında bir kapı var. */
const FRAME_OPEN = `M76 19 V14 ${RING} V37`;

/** ok başı — gv2 dilindeki ArrowR ile aynı, bu viewBox'a göre ölçeklenmiş */
function Arrow({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y - 3.8} L${x + 5.8} ${y} L${x} ${y + 3.8} Z`}
      className="gv2-ah-b"
    />
  );
}

/**
 * Sorunun resmi. Çerçeve = BAE, kutu = şirketiniz, daire = müşteriniz.
 * Şirket her iki durumda da aynı yerde: değişen tek şey müşterinin nerede
 * durduğu — ki sorunun tamamı bu.
 */
function Fig({ outside }: { outside: boolean }) {
  /* tek değişken: müşteri düğümünün yatay yeri ve ona giden okun boyu.
     92 çerçevenin (sağ kenar x=76) dışında, 58 içinde. */
  const cx = outside ? 92 : 58;
  const arm = outside ? 75 : 41;
  const Node = outside ? Globe : Store;

  return (
    <svg viewBox={VB} className="ssor-fig" focusable="false" aria-hidden="true">
      <path d={outside ? FRAME_OPEN : FRAME_SHUT} className="ssor-frame" />
      {/* Çerçevenin ne olduğu yazıyla söyleniyor. Hero'dan hemen sonraki bir
          bölümde "bu dikdörtgen neydi" sorusunu ziyaretçiye bırakamayız. */}
      <text x="13" y="12" className="ssor-lbl">
        BAE
      </text>

      {/* şirket kutusu ve müşteri düğümü aynı yatay bantta (merkez y=28) ve o
          bant çerçevenin düz sağ kenarının tam ortası — kapı da orada. */}
      <rect x="7" y="17" width="23" height="22" rx="8" className="gv2-box-b" />
      <Building2
        x={11.5}
        y={21}
        width={14}
        height={14}
        strokeWidth={2.1}
        className="gv2-ic-b"
      />

      <path d={`M31 28 H${arm}`} className="gv2-line-b ssor-flow" />
      <Arrow x={arm} y={28} />

      <circle cx={cx} cy={28} r={11} className="gv2-box-b" />
      <Node
        x={cx - 6}
        y={22}
        width={12}
        height={12}
        strokeWidth={2.1}
        className="gv2-ic-b"
      />
    </svg>
  );
}

export default function StructuresS2({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* Hiçbir dal seçili başlamıyor. Varsayılan bir seçim koymak, ziyaretçi
     soruyu okumadan ona bir yapı önermek olurdu; üstelik bölümün tek iddiası
     "önce siz cevaplayın". Seçili dala tekrar tıklamak seçimi kaldırıyor —
     yani soruya geri dönmek mümkün, bölüm ilk hâline kapanabiliyor. */
  const [picked, setPicked] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const baseId = useId();
  const qId = `${baseId}-q`;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* Üst blok canlı bölümdeki düzeni koruyor: başlık solda, karar kuralı
            sağda. Müşteri girişi beğendi, oraya dokunulmadı. Fark, kuralın
            altındaki "koşul → sonuç" eşlemesinin buradan çıkmış olması: o
            eşleme artık bir liste değil, aşağıdaki kartın kendisi. */}
        <div className="ssor-top">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text={data.title}
              accent="serbest bölge mi, mainland mi?"
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">{data.lead}</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.26}>
            <aside className="ssor-rule">
              <span className="ssor-rule-k">Karar kuralı</span>
              <p className="ssor-rule-t">{data.rule}</p>
            </aside>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <div className="ssor-card">
            <div className="ssor-q">
              <span className="ssor-q-k">Tek soru</span>
              <h3 id={qId} className="ssor-q-t">
                Müşteriniz nerede?
              </h3>
              <p className="ssor-q-h">
                Cevabınızı seçin; yalnızca sizin yolunuzu açalım. Diğeri
                kapanmıyor, aşağıda duruyor.
              </p>
            </div>

            <div className="ssor-tree" role="group" aria-labelledby={qId}>
              {data.options.map((o, idx) => {
                const b = BRANCHES[idx];
                const on = picked === idx;
                const panelId = `${baseId}-${idx}`;
                return (
                  <div key={o.name} className="ssor-br" data-on={on || undefined}>
                    <button
                      type="button"
                      className="ssor-hd"
                      aria-expanded={on}
                      aria-controls={on ? panelId : undefined}
                      onClick={() => setPicked(on ? null : idx)}
                    >
                      {/* dal düğümü + omurgadan gelen kol. Boş bir span, çünkü
                          konumu başlığın ortasına bağlı: başlık büyüyüp
                          küçüldükçe düğüm de onunla birlikte kayıyor. */}
                      <span className="ssor-arm" aria-hidden="true" />

                      <Fig outside={b?.outside ?? idx === 0} />

                      <span className="ssor-hd-t">
                        {/* önce CEVAP (ziyaretçinin kendisi hakkında bildiği
                            şey), sonra SONUÇ (yapının adı). Sıra bilinçli:
                            kural bu yönde okunuyor. */}
                        <span className="ssor-ans">
                          {b ? (
                            <b.Icon size={14} strokeWidth={2.3} aria-hidden="true" />
                          ) : null}
                          {b?.when}
                        </span>
                        <span className="ssor-name">{o.name}</span>
                      </span>

                      {/* Tanım cümlesi ismin altında değil, ızgarada ayrı bir
                          hücrede. Geniş ekranda fark yok (ismin hemen altında
                          duruyor) ama dar ekranda satırın tamamına yayılabiliyor:
                          şema + isim + düğme üçlüsü 390px'te metne 170px
                          bırakıyor ve bu cümle orada altı satıra kırılıyordu. */}
                      <span className="ssor-line">{o.line}</span>

                      <span className="ssor-go">
                        {on ? (
                          <Check size={14} strokeWidth={3} aria-hidden="true" />
                        ) : (
                          <Plus size={14} strokeWidth={2.6} aria-hidden="true" />
                        )}
                        <span className="ssor-go-l">
                          {on ? "Yolunuz bu" : "Bu benim"}
                        </span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          key="panel"
                          id={panelId}
                          className="ssor-panel"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.42, ease: EASE }}
                        >
                          <div className="ssor-pin">
                            <div>
                              <span className="ssor-plb">
                                <ListChecks
                                  size={14}
                                  strokeWidth={2.2}
                                  aria-hidden="true"
                                />
                                Bunu yapıyorsanız
                              </span>
                              <ul className="ssor-fit">
                                {o.fit.map((f) => (
                                  <li key={f}>
                                    <Check
                                      size={13}
                                      strokeWidth={3.2}
                                      aria-hidden="true"
                                    />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Uyarı listenin ARKASINDA değil, YANINDA. Bir
                                yapıyı kendine yakıştıran kişi, kısıtını aynı
                                ekranda görüyor. */}
                            <div className="ssor-watch">
                              <span className="ssor-wk">
                                <TriangleAlert
                                  size={14}
                                  strokeWidth={2.3}
                                  aria-hidden="true"
                                />
                                Dikkat edin
                              </span>
                              <p className="ssor-wt">{o.watch}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
