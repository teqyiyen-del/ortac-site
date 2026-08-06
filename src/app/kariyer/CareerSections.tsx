"use client";

import { useState } from "react";
import { Check, Inbox, Lock, Paperclip, Send } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import {
  APPLICATION_FORM,
  APPLY_ANCHOR_ID,
  CAREERS_EMPTY,
  OPENING_TYPE_LABEL,
  SEED_BADGE,
  placeLabel,
  sortedOpenings,
} from "@/lib/careers";

/* ============================================================================
   /kariyer — SAYFANIN ETKİLEŞİMLİ GÖVDESİ
   CSS: src/app/css/kurumsal.css · ad alanı .krm-
   Veri ve metin: src/lib/careers.ts

   --------------------------------------------------------- NEDEN AYRI DOSYA
   page.tsx sunucu bileşeni kalmak ZORUNDA (`export const metadata` bir
   "use client" dosyasından verilemiyor). Aynı bölünme /iletisim'de de var ve
   gerekçesi orada uzun uzun yazılı. Burada ek bir sebep daha var: ilan
   listesi ile form AYNI DURUMU paylaşıyor — bir ilanın "başvurun" düğmesine
   basıldığında formdaki pozisyon kutucuğu o ilana geçiyor. İkisini iki ayrı
   ağaca koymak, bu bağı bir global store'a ya da adres çubuğuna taşımak
   olurdu; ikisi de bu iş için fazla.

   ---------------------------------------------- FORM NEDEN TEK EKRAN, ADIMLI DEĞİL
   Müşteri "aşamalı da olabilir" dedi, yani karar bizde. Üç ölçüme baktık:

   1. ALAN SAYISI — belirleyici olan bu. Bir pozisyon seçimi, dört metin
      alanı, bir not ve bir dosya alanı: yedi kontrol. Adımlı akış kalabalık
      formlarda (kabaca on beş alandan sonra) terk oranını düşürüyor; yedi
      alanda ise sadece iki fazladan tıklama ve iki fazladan ekran ekliyor.

   2. GÖNDERİM KAPALI — asıl gerekçe. Formun uç noktası yok. Adımlı bir akışta
      "gönderim kapalı" satırı SON adımda görünürdü: başvuran kişi adını,
      e-postasını ve notunu yazıp iki kere "İleri"ye bastıktan sonra öğrenirdi.
      Tek ekranda kapalı buton ve nedeni ilk bakışta duruyor. Emeği boşa
      harcatmamak, adım sayısından önce gelir.

   3. SİTENİN FORM DİLİ — /iletisim formu da tek ekran: görünür kutucuklar,
      alan ızgarası, kapalı buton, altında nedeni. İkinci bir form kalıbı
      açmak, aynı sitede iki ayrı öğrenme maliyeti demek.

   Ortak olan şeyler AYNEN korundu: açılır menü (<select>) YOK — pozisyon
   seçimi görünen kutucuklarla, altta gizli yerli <input type="radio"> ile.
   Ok tuşlarıyla gezinme, Enter ve ekran okuyucu duyurusu tarayıcının kendi
   radyo davranışından geliyor, taklit edilmiyor.

   ------------------------------------------------------------ HAREKET
   Bu dosyada motion kodu ve useReducedMotion YOK. Görünen tek hareket
   FadeUp'tan geliyor (Providers'taki MotionConfig reducedMotion="user"),
   yani hareket tercihi render edilen ağacı değiştirmiyor — hidrasyon farkı
   üretecek bir dal yok. Geri kalan geçişler CSS'te.

   "Bu pozisyona başvurun" düğmesi de bilerek DÜZ BİR ÇAPA: varsayılan iptal
   edilmiyor, kaydırmayı tarayıcı yapıyor (hedefin scroll-margin-top'u CSS'te).
   JavaScript kapalıyken bağlantı yine çalışıyor, sadece ön seçim olmuyor.
   ========================================================================= */

const OPEN = sortedOpenings();

/* =============================================================== 1 · İLANLAR */

function Openings({ onApply }: { onApply: (id: string) => void }) {
  if (OPEN.length === 0) {
    /* Bugün buraya düşülmüyor (liste dolu). Duruyor ki ilanlar kaldırıldığında
       sayfa boş bir <ul> basmasın. Metin lib/careers.ts'te. */
    return (
      <FadeUp>
        <div className="krm-empty">
          <span className="krm-empty-ic" aria-hidden="true">
            <Inbox size={20} strokeWidth={1.8} />
          </span>
          <p className="krm-empty-t">{CAREERS_EMPTY.title}</p>
          <p className="krm-empty-l">{CAREERS_EMPTY.line}</p>
        </div>
      </FadeUp>
    );
  }

  return (
    <ul className="krm-feed">
      {OPEN.map((o, i) => (
        <li key={o.id}>
          <FadeUp delay={i * 0.05}>
            <article className="krm-job">
              {/* Künye: ekip · çalışma biçimi · ülke. Yer tutucu işareti de
                  burada — kartı kesikli çerçeveye almıyor, sönükleştirmiyor,
                  ayrı bir uyarı paneli açmıyor. Tek kelime, rozet boyunda. */}
              <span className="krm-item-h">
                <span className="krm-item-out">{o.team}</span>
                <span className="krm-item-kind">{OPENING_TYPE_LABEL[o.type]}</span>
                <span className="krm-item-d">{placeLabel(o.place)}</span>
                {o.seed ? <span className="krm-seed">{SEED_BADGE}</span> : null}
              </span>

              <h3 className="krm-item-t">{o.title}</h3>
              <p className="krm-item-s">{o.summary}</p>

              <div className="krm-job-cols">
                <div>
                  <p className="krm-job-k">Ne yapacaksınız</p>
                  <ul className="krm-job-l">
                    {o.duties.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="krm-job-k">Aradıklarımız</p>
                  <ul className="krm-job-l">
                    {o.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Şema `applyHref`i zorunlu tuttuğu için bu bağlantı hiçbir
                  zaman boşa düşmüyor. preventDefault YOK: kaydırmayı tarayıcı
                  yapıyor, onClick yalnızca formdaki seçimi ayarlıyor. */}
              <a className="krm-apply" href={o.applyHref} onClick={() => onApply(o.id)}>
                <Send size={15} strokeWidth={2} aria-hidden="true" />
                Bu pozisyona başvurun
              </a>
            </article>
          </FadeUp>
        </li>
      ))}
    </ul>
  );
}

/* ================================================================== 2 · FORM */

type FieldKey = "pozisyon" | "ad" | "eposta" | "telefon" | "baglanti" | "not";
type Values = Record<FieldKey, string>;

const EMPTY_VALUES: Values = {
  pozisyon: "",
  ad: "",
  eposta: "",
  telefon: "",
  baglanti: "",
  not: "",
};

const REQUIRED: FieldKey[] = ["pozisyon", "ad", "eposta", "not"];

/* Kasten gevşek: amaç adresin gerçek olduğunu kanıtlamak değil, "@" unutan
   kişiyi kendi yazım hatasından kurtarmak. /iletisim ile aynı iki desen. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^(https?:\/\/)?[^\s./]+\.[^\s]{2,}$/i;

/** Cümlenin içinde geçerken etiket küçük harfle başlıyor. Türkçe kilidi şart:
 *  varsayılan küçültme "İ"yi "i̇" yapıyor. */
const lowerTr = (s: string) => s.charAt(0).toLocaleLowerCase("tr") + s.slice(1);

/* Pozisyon kutucukları: yayındaki ilanlar + açık başvuru. Liste ELLE
   yazılmıyor, careers.ts'ten türüyor — bir ilan kaldırıldığında formdaki
   kutucuk da kendiliğinden düşüyor, "olmayan pozisyona başvuru" seçeneği
   ekranda kalmıyor. */
type PosOption = { value: string; label: string; meta: string; seed: boolean };

const POS_OPTIONS: PosOption[] = [
  ...OPEN.map((o) => ({
    value: o.id,
    label: o.title,
    meta: `${placeLabel(o.place)} · ${lowerTr(OPENING_TYPE_LABEL[o.type])}`,
    seed: Boolean(o.seed),
  })),
  {
    value: APPLICATION_FORM.openValue,
    label: APPLICATION_FORM.openLabel,
    meta: APPLICATION_FORM.openMeta,
    seed: false,
  },
];

function errorOf(k: FieldKey, v: Values): string | null {
  const t = v[k].trim();
  switch (k) {
    case "pozisyon":
      return t
        ? null
        : "Bir pozisyon işaretleyin. Belirli bir ilan için başvurmuyorsanız son kutu da geçerli bir cevap.";
    case "ad":
      return t.length >= 2 ? null : "Adınızı ve soyadınızı yazın.";
    case "eposta":
      if (!t) return "E-posta adresinizi yazın.";
      return EMAIL_RE.test(t) ? null : "Adres eksik görünüyor: ornek@eposta.com gibi olmalı.";
    case "baglanti":
      if (!t) return null;
      return URL_RE.test(t) ? null : "Adres eksik görünüyor: linkedin.com/in/adiniz yeterli.";
    case "not":
      return t.length >= 10
        ? null
        : "Birkaç cümleyle bugün ne iş yaptığınızı ve neden yazdığınızı ekleyin.";
    default:
      return null; /* telefon isteğe bağlı ve biçim aranmıyor */
  }
}

function ApplicationForm({
  values,
  setValues,
}: {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}) {
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  const set = (k: FieldKey, val: string) => setValues((p) => ({ ...p, [k]: val }));
  const blur = (k: FieldKey) => setTouched((p) => ({ ...p, [k]: true }));
  /* Hata yalnızca alandan çıkıldıktan sonra görünüyor: ilk harfte kırmızıya
     dönen bir form, doldurmaya çalışan kişiyi azarlıyor demektir. */
  const shown = (k: FieldKey) => (touched[k] ? errorOf(k, values) : null);

  const missing = REQUIRED.filter((k) => errorOf(k, values) !== null).length;

  const picked = POS_OPTIONS.find((o) => o.value === values.pozisyon) ?? null;

  /* --- canlı cümle ---
     Ziyaretçi ne göndereceğini formu bitirmeden görüyor. İki hâl ayrı ayrı
     yazıldı; tek şablona sıkıştırmak Türkçeyi bozuyordu ("Açık başvuru
     pozisyonuna başvuruyorum"). Ülke adına ek getirilmiyor: "Dubai'deki"
     kalıbı ülke listesi büyüdüğünde ilk kırılacak yer. */
  let say: React.ReactNode;
  if (!picked) {
    say = <i className="krm-tok-x">Bir pozisyon işaretleyin. Cümleniz burada kurulacak.</i>;
  } else if (picked.value === APPLICATION_FORM.openValue) {
    say = (
      <>
        <b className="krm-tok">{picked.label}</b> bırakıyorum, belirli bir ilan için değil.
      </>
    );
  } else {
    say = (
      <>
        <b className="krm-tok">{picked.label}</b> pozisyonuna başvuruyorum ({picked.meta}).
      </>
    );
  }

  return (
    /* SWAP:CAREER_FORM — alanlar gerçek, gönderim değil.
       onSubmit yalnızca varsayılanı iptal ediyor (bir metin alanında Enter'a
       basılırsa sayfa yenilenmesin diye), buton devre dışı ve altında neden
       kapalı olduğu yazıyor. Sahte bir onay ekranı YOK — bir kariyer
       sayfasında o yalanın bedeli, kapalı bir butondan kat kat yüksek. */
    <form
      className="krm-form"
      noValidate
      aria-describedby="krm-form-note"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* aria-live="polite": bir ilanın "başvurun" düğmesinden gelindiğinde
          ekranda değişen tek şey bu cümle. Görmeyen kullanıcı aksi hâlde
          seçiminin karşılığını duymuyor. */}
      <p className="krm-say" aria-live="polite">
        {say}
      </p>

      {/* ============ POZİSYON — açılır menü değil, görünür kutucuklar ======
          Yerli <fieldset> + <legend>: gruplama ve grup adının duyurulması
          tarayıcıdan geliyor. role="radiogroup" ile ezilmedi — o rol legend'i
          ad olarak kullanmıyor. */}
      <fieldset
        className="krm-block"
        aria-describedby={shown("pozisyon") ? "krm-pozisyon-err" : undefined}
      >
        <legend className="krm-legend">
          Hangi pozisyon?
          <b className="krm-req" aria-hidden="true">
            *
          </b>
          <span className="sr-only"> (zorunlu)</span>
        </legend>

        <div className="krm-pos">
          {POS_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="krm-pos-o"
              data-on={values.pozisyon === o.value ? "" : undefined}
            >
              {/* Radyo görünmüyor ama DOM'da duruyor ve odaklanabiliyor. */}
              <input
                type="radio"
                name="pozisyon"
                value={o.value}
                checked={values.pozisyon === o.value}
                onChange={() => set("pozisyon", o.value)}
                onBlur={() => blur("pozisyon")}
              />
              <span className="krm-pos-b">
                <span className="krm-pos-t">
                  {o.label}
                  {o.seed ? <span className="krm-seed">{SEED_BADGE}</span> : null}
                </span>
                <span className="krm-pos-m">{o.meta}</span>
              </span>
              <span className="krm-pos-x" aria-hidden="true">
                <Check size={14} strokeWidth={2.8} />
              </span>
            </label>
          ))}
        </div>

        {shown("pozisyon") ? (
          <p className="krm-err" id="krm-pozisyon-err" role="alert">
            {shown("pozisyon")}
          </p>
        ) : null}
      </fieldset>

      {/* ===================== SİZE NASIL DÖNELİM ======================== */}
      <fieldset className="krm-block">
        <legend className="krm-legend">Size nasıl dönelim?</legend>

        <div className="krm-fields">
          <div className="krm-field" data-bad={shown("ad") ? "" : undefined}>
            <label className="krm-label" htmlFor="krm-ad">
              Ad Soyad
              <b className="krm-req" aria-hidden="true">
                *
              </b>
              <span className="sr-only"> (zorunlu)</span>
            </label>
            <input
              className="krm-input"
              id="krm-ad"
              name="ad"
              type="text"
              autoComplete="name"
              placeholder="Adınız ve soyadınız"
              value={values.ad}
              aria-required="true"
              aria-invalid={shown("ad") ? true : undefined}
              aria-describedby={shown("ad") ? "krm-ad-err" : undefined}
              onChange={(e) => set("ad", e.target.value)}
              onBlur={() => blur("ad")}
            />
            {shown("ad") ? (
              <p className="krm-err" id="krm-ad-err" role="alert">
                {shown("ad")}
              </p>
            ) : null}
          </div>

          <div className="krm-field" data-bad={shown("eposta") ? "" : undefined}>
            <label className="krm-label" htmlFor="krm-eposta">
              E-posta
              <b className="krm-req" aria-hidden="true">
                *
              </b>
              <span className="sr-only"> (zorunlu)</span>
            </label>
            <input
              className="krm-input"
              id="krm-eposta"
              name="eposta"
              type="email"
              autoComplete="email"
              placeholder="ornek@eposta.com"
              value={values.eposta}
              aria-required="true"
              aria-invalid={shown("eposta") ? true : undefined}
              aria-describedby={shown("eposta") ? "krm-eposta-err" : undefined}
              onChange={(e) => set("eposta", e.target.value)}
              onBlur={() => blur("eposta")}
            />
            {shown("eposta") ? (
              <p className="krm-err" id="krm-eposta-err" role="alert">
                {shown("eposta")}
              </p>
            ) : null}
          </div>

          <div className="krm-field">
            <label className="krm-label" htmlFor="krm-telefon">
              Telefon
              <i className="krm-optional">isteğe bağlı</i>
            </label>
            <input
              className="krm-input"
              id="krm-telefon"
              name="telefon"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+90 …"
              value={values.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              onBlur={() => blur("telefon")}
            />
          </div>

          {/* LinkedIn / portföy: özgeçmiş yüklenemediği için bugün deneyimin
              görülebildiği tek yer bu alan. type="url" — mobil klavye buna
              göre açılıyor. */}
          <div className="krm-field" data-bad={shown("baglanti") ? "" : undefined}>
            <label className="krm-label" htmlFor="krm-baglanti">
              LinkedIn veya portföy
              <i className="krm-optional">isteğe bağlı</i>
            </label>
            <input
              className="krm-input"
              id="krm-baglanti"
              name="baglanti"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="linkedin.com/in/adiniz"
              value={values.baglanti}
              aria-invalid={shown("baglanti") ? true : undefined}
              aria-describedby={shown("baglanti") ? "krm-baglanti-err" : "krm-baglanti-hint"}
              onChange={(e) => set("baglanti", e.target.value)}
              onBlur={() => blur("baglanti")}
            />
            {shown("baglanti") ? (
              <p className="krm-err" id="krm-baglanti-err" role="alert">
                {shown("baglanti")}
              </p>
            ) : (
              <p className="krm-hint" id="krm-baglanti-hint">
                Deneyiminizin göründüğü herhangi bir adres.
              </p>
            )}
          </div>

          <div className="krm-field" data-wide="" data-bad={shown("not") ? "" : undefined}>
            <label className="krm-label" htmlFor="krm-not">
              Kısa notunuz
              <b className="krm-req" aria-hidden="true">
                *
              </b>
              <span className="sr-only"> (zorunlu)</span>
            </label>
            <textarea
              className="krm-input krm-area"
              id="krm-not"
              name="not"
              rows={5}
              placeholder="Bugün ne iş yapıyorsunuz, hangi ülkede çalışabilirsiniz, bu pozisyonun neresi size uyuyor."
              value={values.not}
              aria-required="true"
              aria-invalid={shown("not") ? true : undefined}
              aria-describedby={shown("not") ? "krm-not-err" : "krm-not-hint"}
              onChange={(e) => set("not", e.target.value)}
              onBlur={() => blur("not")}
            />
            {shown("not") ? (
              <p className="krm-err" id="krm-not-err" role="alert">
                {shown("not")}
              </p>
            ) : (
              <p className="krm-hint" id="krm-not-hint">
                Özgeçmiş yüklenemediği için bugün sizi anlatan asıl alan burası.
              </p>
            )}
          </div>

          {/* SWAP:CAREER_UPLOAD — alan DEVRE DIŞI ve nedeni hemen altında.
              Çalışan bir yükleme ucu yok; tıklanabilir bir "CV yükle" düğmesi
              bırakmak, dosyasını bıraktığını sanan kişiyi yanıltmak olurdu.
              Alan gizlenmedi çünkü bir kariyer formunda beklenen ilk şey bu:
              yokluğunu açıklamak, yokluğunu saklamaktan dürüst. */}
          <div className="krm-field" data-wide="">
            <label className="krm-label" htmlFor="krm-cv">
              Özgeçmiş (CV)
              <i className="krm-optional">yükleme kapalı</i>
            </label>
            <div className="krm-file">
              <span className="krm-file-ic" aria-hidden="true">
                <Paperclip size={16} strokeWidth={2} />
              </span>
              <input
                className="krm-file-in"
                id="krm-cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                disabled
                aria-describedby="krm-cv-note"
              />
            </div>
            <p className="krm-hint" id="krm-cv-note">
              {APPLICATION_FORM.fileNote}
            </p>
          </div>
        </div>
      </fieldset>

      {/* --- gönderim: kapalı ve kapalı olduğunu söylüyor --- */}
      <div className="krm-foot">
        <button type="submit" className="krm-send" disabled>
          Başvuruyu gönder
          <Send size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <span className="krm-lock">
          <Lock size={12} strokeWidth={2.4} aria-hidden="true" />
          {APPLICATION_FORM.lockLabel}
        </span>
        {/* Sayaçta aria-live YOK ve bu bilinçli: değer yazarken değiştiği için
            canlı bölge her karakterde ekran okuyucuyu keserdi. Eksik alanın
            kendisi zaten role="alert" ile duyuruluyor. */}
        <span className="krm-left data">
          {missing === 0 ? "Zorunlu alanların hepsi dolu" : `${missing} zorunlu alan kaldı`}
        </span>
      </div>

      <p className="krm-note" id="krm-form-note">
        {APPLICATION_FORM.note}{" "}
        <SmartLink href="/iletisim">İletişim sayfası</SmartLink>
      </p>
    </form>
  );
}

/* ============================================================ SAYFA GÖVDESİ */

export default function CareerSections() {
  /* Durum burada, iki bölümün ortasında: ilan kartındaki "başvurun" düğmesi
     formdaki pozisyonu seçiyor. Kaydırma bu işe karışmıyor — onu çapa yapıyor. */
  const [values, setValues] = useState<Values>(EMPTY_VALUES);

  /* Ön seçim BAŞLANGIÇTA YOK ve bu bilinçli: hangi işe başvurulduğu, formun
     doldurulmadan önce verilmiş olamayacak tek karar. /iletisim'de ülke ve
     konu ön seçili geliyor çünkü orada yanlış varsayımın bedeli bir e-posta;
     burada bedeli yanlış pozisyona yapılmış bir başvuru. */
  const pickPosition = (id: string) => setValues((p) => ({ ...p, pozisyon: id }));

  return (
    <>
      {/* ==================================================================
          1 · AÇIK POZİSYONLAR
          ================================================================== */}
      <section className="sec-pad" id="pozisyonlar" style={{ background: "var(--white)" }}>
        <div className="container-o">
          <div className="sec-head">
            <h2 className="h2">Açık pozisyonlar</h2>
            {/* Sayfa başında uyarı paneli ya da "bunlar yazmıyor" listesi YOK:
                müşteri bu turda not düşmeyi açıkça reddetti ("ne bu not düşme
                sevdası"). Yer tutucu ayrımını kayıt başına duran küçük rozet
                taşıyor; yazılmayan alanların (maaş, yan hak, ekip büyüklüğü)
                yokluğu da kendi başına bir cevap. Gerekçe careers.ts'te. */}
            <p className="sec-lead">
              Her ilanın yanında hangi ekip, hangi ülke, hangi çalışma biçimi ve başvurunun
              nereye gideceği yazıyor.
            </p>
          </div>

          <Openings onApply={pickPosition} />
        </div>
      </section>

      {/* ==================================================================
          2 · BAŞVURU — tek ekran, yedi alan, kapalı gönderim
          scrollMarginTop: yapışkan başlık ilanın "başvurun" düğmesiyle
          gelindiğinde bölümün ilk satırını örtmesin diye (/iletisim ile
          aynı ölçü).
          ================================================================== */}
      <section
        className="sec-pad"
        id={APPLY_ANCHOR_ID}
        style={{ background: "var(--paper)", scrollMarginTop: 70 }}
      >
        <div className="container-o">
          <div className="sec-head">
            <h2 className="h2">{APPLICATION_FORM.title}</h2>
            <p className="sec-lead">{APPLICATION_FORM.lead}</p>
          </div>

          <FadeUp delay={0.08}>
            <ApplicationForm values={values} setValues={setValues} />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
