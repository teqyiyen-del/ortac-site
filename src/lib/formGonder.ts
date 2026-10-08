/* FORM GÖNDERİMİ · istemci tarafı (09.10.2026 · teslim öncesi tur)

   Sitedeki formlar bu tek işlevi çağırıyor. Önce sunucu ucunu dener
   (app/api/form): anahtar tanımlıysa ileti oradan gider. Uç "anahtar yok"
   derse ya da ağ hatası olursa form YİNE İŞE YARAR: ziyaretçinin e-posta
   uygulamasında, alanları yazılmış ve ilgili ofise adreslenmiş bir ileti
   açılır; göndermek için tek dokunuş kalır.

   Dönen değer formun ne söyleyeceğini belirler:
     "gonderildi" · sunucu iletti, "Talebiniz bize ulaştı."
     "eposta"     · e-posta uygulaması açıldı, "İletiniz hazır, göndermeniz yeterli." */

export type FormSonuc = "gonderildi" | "eposta";
export type FormAlan = [etiket: string, deger: string];

export async function formGonder({
  tur,
  konu,
  alanlar,
  yedekEposta,
  tuzak = "",
  epostaAc = true,
}: {
  tur: "iletisim" | "kariyer" | "ortaklik" | "reklam" | "kurulum";
  konu: string;
  alanlar: FormAlan[];
  /** sunucu gönderemezse iletinin adresleneceği ofis e-postası */
  yedekEposta: string;
  /** görünmez tuzak kutusunun değeri (insan boş bırakır) */
  tuzak?: string;
  /** false: sunucu gönderemezse e-posta uygulaması AÇILMAZ, yalnız "eposta"
   *  döner; çağıran kendi düğmelerini gösterir (kurulum akışının son ekranı) */
  epostaAc?: boolean;
}): Promise<FormSonuc> {
  const dolu = alanlar.filter(([, v]) => v.trim() !== "");
  try {
    const r = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tur, konu, alanlar: dolu, tuzak }),
    });
    if (r.ok) return "gonderildi";
  } catch {
    /* ağ hatası: aşağıdaki e-posta yoluna düş */
  }
  if (epostaAc) window.location.href = epostaBaglantisi(yedekEposta, konu, dolu);
  return "eposta";
}

/** Alanları yazılmış bir e-posta bağlantısı (mailto). */
export function epostaBaglantisi(adres: string, konu: string, alanlar: FormAlan[]): string {
  const govde = alanlar
    .filter(([, v]) => v.trim() !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${adres}?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(govde)}`;
}

/** Formun altındaki durum cümlesi; dört formda aynı. */
export const FORM_SONUC_METNI: Record<FormSonuc, string> = {
  gonderildi: "Talebiniz bize ulaştı. En kısa sürede dönüş yapacağız.",
  eposta: "E-posta uygulamanızda iletiniz hazırlandı; göndermeniz yeterli. Açılmadıysa aşağıdaki ofis bilgilerinden bize ulaşabilirsiniz.",
};
