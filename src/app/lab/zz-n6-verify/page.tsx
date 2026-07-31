import NavN6 from "@/components/lab/NavN6";

export default function Page() {
  return (
    <main style={{ minHeight: "300vh", background: "var(--night)" }}>
      <div style={{ transform: "translateZ(0)" }}>
        <NavN6 />
      </div>
      <div style={{ height: 900 }} />
      <div style={{ background: "var(--white)", height: 1200 }} />
    </main>
  );
}
