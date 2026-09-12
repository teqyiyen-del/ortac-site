import type { Metadata } from "next";

import AracDili1 from "@/components/lab/AracDili1";
import AracDili2 from "@/components/lab/AracDili2";
import AracDili3 from "@/components/lab/AracDili3";

/* /lab/arac-dili — ARAÇ SAYFASI DÜZENİNE ÜÇ YÖN
 *
 * Müşteri: "tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her şey
 * gibi bir şey demedimki sana amk ben. o biraz daha test formatına özgü bir
 * tasarımdı. sen sadece biraz ona paralel git dedim."
 *
 * Bir önceki tur uygunluk testinin İKİ PANELLİ kurgusunu (solda beyaz çalışma
 * paneli, sağda gece defter) altı aracın altısına birden uyguladı. Yanlış olan
 * tasarımın kendisi değil, TEK BİR FORMATIN BÜTÜN ARAÇLARA ZORLANMASIYDI:
 * defter paneli on bir soruluk bir testte anlamlı (cevaplar birikiyor), tek
 * kutuya sayı yazılan bir hesaplayıcıda değil.
 *
 * Bu tur önce TEK ARAÇTA (kurumlar vergisi · Dubai) üç yön deniyor; müşteri
 * birini seçince kalan beş araca o uygulanacak. Üçünün de ortak kuralı:
 *   · zorunlu gece yan sütun YOK,
 *   · ikon, bayrak ve kontrast VAR (müşterinin istediği buydu),
 *   · derinlik açılırda (yüzey sade),
 *   · hesap mantığı ve ülke başına ayrı adres kurgusu DEĞİŞMİYOR.
 */

export const metadata: Metadata = {
  title: "Araç sayfası düzeni · üç yön | Ortac Global",
  robots: { index: false, follow: false },
};

const ADAYLAR = [
  {
    ad: "A1",
    baslik: "Ölçü",
    not: "Tek sütun. Sonuç formun içinde, tek koyu satırda; yan panel yok.",
    Bolum: AracDili1,
  },
  {
    ad: "A2",
    baslik: "Tezgâh",
    not: "Sitenin ülke sayfasındaki vergi hesaplayıcısının (.txm-) dili araç sayfasına büyütülerek taşındı.",
    Bolum: AracDili2,
  },
  {
    ad: "A3",
    baslik: "Kart",
    not: "Sitenin kendi kart dili: hesap bir kartın içinde, sonuç kartın başında.",
    Bolum: AracDili3,
  },
];

export default function AracDiliLab() {
  return (
    <main>
      {ADAYLAR.map(({ ad, baslik, not, Bolum }) => (
        <div key={ad}>
          <div className="container-o" style={{ paddingTop: 56, paddingBottom: 8 }}>
            {/* Künye satır içi stille: bu sayfa üç ajanın dosyasını birden
                basıyor ve künye için yeni bir sınıf açmak css-check tabanını
                onların işine karışacak şekilde oynatırdı. */}
            <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue-900)" }}>
              {ad} · {baslik}
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--text-600)", maxWidth: "72ch" }}>{not}</p>
          </div>
          <Bolum />
        </div>
      ))}
    </main>
  );
}
