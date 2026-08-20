import "@/app/css/lab-hikili-a.css";

import AboutIkiliKare from "@/components/lab/AboutIkiliKare";

/* GEÇİCİ ÖLÇÜM ROTASI · tur bitmeden SİLİNİYOR.
   Aday henüz /lab/hakkimizda-serit'e bağlanmadı (bağlamayı üst ajan yapacak)
   ve CSS globals.css'in @import bloğuna girmedi; ölçüm yapabilmek için CSS
   burada doğrudan import ediliyor. */
export default function HiaOlcumPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <AboutIkiliKare />
    </main>
  );
}
