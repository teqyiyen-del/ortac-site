/* GEÇİCİ ÖLÇÜM SAYFASI — C12 ajanı yükseklik ölçmek için açtı, ölçüm bitince
   silinecek. Kalıcı bir rota değil. */
import CountriesC8 from "@/components/lab/CountriesC8";
import CountriesC12 from "@/components/lab/CountriesC12";
import ThreeCountries from "@/components/home/ThreeCountries";

export default function TmpC12() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div id="wrap-c8">
        <CountriesC8 />
      </div>
      <div id="wrap-c12">
        <CountriesC12 />
      </div>
      <div id="wrap-live">
        <ThreeCountries />
      </div>
    </main>
  );
}
