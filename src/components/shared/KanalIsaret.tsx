import { BRANDS, type BrandKey, type WordmarkPart } from "@/lib/brands";

/* ============================================================================
   KANAL İŞARETİ · ödeme kanalının KARE işareti (uygulama simgesi gibi)
   Kullanan: /dubai/banka-hesabi (ödeme sahnesi) ve ülke sayfalarındaki
   ödeme sahnesi (country/CountryOdeme · sahne).

   Sahnede tam logo değil: yanındaki kutular zaten tam logoyu basıyor,
   sahnede de basılınca aynı şey iki kez görünüyordu (Burak: "solda bir daha
   var sağda bir daha var … sadece ikonlarını kullansak … kare kare").
   Geometri lib/brands.ts'ten, yeni çizim yok: Stripe, PayPal, Wise ve
   Revolut'un simge yolu (kendi renginde), Payoneer'in renkli halkası ve
   Binance'in elması (ikisi Wordmark.renkli'nin parçaları).
   23.09.2026'da banka sayfasından buraya taşındı; Wise ve Revolut eklendi
   (Wise'ın simgesi koyu yeşil #163300: açık yeşil #9FE870 beyaz karoda
   okunmuyor, markanın kendi koyu tonu). */

const ISARET: Partial<Record<BrandKey, { viewBox: string; parts: readonly WordmarkPart[] }>> = {
  stripe: { viewBox: "0 0 24 24", parts: [{ d: BRANDS.stripe.path, fill: "#635BFF" }] },
  paypal: { viewBox: "0 0 24 24", parts: [{ d: BRANDS.paypal.path, fill: "#003087" }] },
  wise: { viewBox: "0 0 24 24", parts: [{ d: BRANDS.wise.path, fill: "#163300" }] },
  revolut: { viewBox: "0 0 24 24", parts: [{ d: BRANDS.revolut.path, fill: "#191C1F" }] },
  payoneer: { viewBox: "0 0 22.22 21.95", parts: (BRANDS.payoneer.wordmark.renkli ?? []).slice(1) },
  binance: { viewBox: "-0.2 -0.2 26.7 27.2", parts: (BRANDS.binance.wordmark.renkli ?? []).slice(0, 1) },
};

export function hasKanalIsaret(brand: BrandKey) {
  return brand in ISARET;
}

export default function KanalIsaret({ brand, size = 22 }: { brand: BrandKey; size?: number }) {
  const ik = ISARET[brand];
  if (!ik) return null;
  return (
    <svg viewBox={ik.viewBox} width={size} height={size} focusable="false" aria-hidden="true">
      {ik.parts.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill} />
      ))}
    </svg>
  );
}
