/* GEÇİCİ ÖLÇÜM SAYFASI — yükseklikleri karşılaştırdıktan sonra silinecek. */
import CountriesC7 from "@/components/lab/CountriesC7";
import CountriesC11 from "@/components/lab/CountriesC11";

export default function Tmp() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div id="wrap-c7">
        <CountriesC7 />
      </div>
      <div id="wrap-c11">
        <CountriesC11 />
      </div>
    </main>
  );
}
