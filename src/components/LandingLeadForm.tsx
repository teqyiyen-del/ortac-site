"use client";

import { useId, useState } from "react";
import { Send } from "lucide-react";

import { formGonder, FORM_SONUC_METNI, type FormSonuc } from "@/lib/formGonder";
/* ============================================================================
   KISA TEKLİF FORMU — reklam iniş sayfalarının son bölümü (#teklif)
   İlk kullanan: /lp/dubai-sirket-kurulusu

   15.09.2026 · marketing listesi, madde 19'un son adımı ("… > FAQ > form").
   Alanlar marketing'in madde 2'de saydıkları: "Ad Soyad, WhatsApp, şirket
   durumu gibi birkaç bilgiyle lead alalım." İki alan + tek seçim + not.

   GENEL BİLEŞEN, SAYFAYA ÖZGÜ SEÇİM. İlk hâli muhasebe iniş sayfasına
   yazılmıştı (components/services/AccountingLeadForm); Burak: "reklam sayfası
   işini aslında direkt şirket kuruluş sayfası için denemeyi düşünüyorlar."
   Sayfa kuruluşa döndü, form da sayfa bağımsız oldu: seçim sorusu ve
   seçenekleri çağıran sayfadan geliyor, alanlar sabit.

   SWAP:LEAD_FORM — ALANLAR GERÇEK, GÖNDERİM DEĞİL. İletişim sayfasının
   formuyla aynı durum (SWAP:CONTACT_FORM): başvurunun nereye düşeceği
   (e-posta adresi, CRM) marketing listesinin 1, 2 ve 18. maddesi ve üçü de
   Murat Ortaç'ın onayında açık. Buton devre dışı ve yanında kapalı olduğu
   yazıyor; sahte "teşekkürler" ekranı YOK. Uç bağlandığında değişecek üç
   yer: butonun disabled'ı, onSubmit'in gövdesi, kilit satırı.

   WHATSAPP ALANI type="tel" + inputMode="tel": telefonda rakam klavyesi
   açılıyor. Biçim zorlanmıyor (ülke kodu herkeste farklı). */

export type LeadSecenek = { id: string; etiket: string };

export default function LandingLeadForm({
  soru,
  secenekler,
  notIpucu,
}: {
  soru: string;
  secenekler: LeadSecenek[];
  notIpucu: string;
}) {
  const kok = useId();
  const [ad, setAd] = useState("");
  const [tel, setTel] = useState("");
  const [secim, setSecim] = useState("");
  const eksik = [ad.trim(), tel.trim(), secim].filter((v) => !v).length;
  /* 09.10.2026 · gönderim açıldı (lib/formGonder, app/api/form). Sunucu
     gönderemezse ziyaretçinin e-posta uygulamasında hazır ileti açılıyor. */
  const [not, setNot] = useState("");
  const [sonuc, setSonuc] = useState<FormSonuc | "gidiyor" | null>(null);

  return (
    <form
      className="lp-form"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (eksik > 0 || sonuc === "gidiyor") return;
        setSonuc("gidiyor");
        const r = await formGonder({
          tur: "reklam",
          konu: "Dubai şirket kuruluşu · teklif isteği",
          alanlar: [
            ["Ad Soyad", ad],
            ["WhatsApp", tel],
            [soru, secenekler.find((d) => d.id === secim)?.etiket ?? secim],
            ["Not", not],
          ],
          yedekEposta: "dubai@ortacglobal.com",
        });
        setSonuc(r);
      }}
    >
      <div className="lp-form-ikili">
        <label className="lp-alan">
          <span>Ad Soyad</span>
          <input
            type="text"
            name="ad"
            autoComplete="name"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            required
          />
        </label>
        <label className="lp-alan">
          <span>WhatsApp numarası</span>
          <input
            type="tel"
            name="whatsapp"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+90 5xx xxx xx xx"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
          />
        </label>
      </div>

      <fieldset className="lp-soru">
        <legend>{soru}</legend>
        <div className="lp-sec">
          {secenekler.map((d) => (
            <label key={d.id}>
              <input
                type="radio"
                name={`${kok}-secim`}
                value={d.id}
                checked={secim === d.id}
                onChange={() => setSecim(d.id)}
              />
              <span>{d.etiket}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="lp-alan">
        <span>
          Not <i>(isteğe bağlı)</i>
        </span>
        <textarea name="not" rows={3} placeholder={notIpucu} value={not} onChange={(e) => setNot(e.target.value)} />
      </label>

      <div className="lp-form-alt">
        <button type="submit" className="btn btn-primary" disabled={eksik > 0 || sonuc === "gidiyor"}>
          {sonuc === "gidiyor" ? "Gönderiliyor" : "Teklif isteyin"}
          <Send size={15} strokeWidth={2} aria-hidden="true" />
        </button>
        <span className="lp-eksik data" role="status">
          {sonuc === "gonderildi" || sonuc === "eposta"
            ? FORM_SONUC_METNI[sonuc]
            : eksik === 0
              ? "Alanların hepsi dolu"
              : `${eksik} alan kaldı`}
        </span>
      </div>
    </form>
  );
}
