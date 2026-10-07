import type { Metadata } from "next";
import BlogIndexPage from "@/app/blog/page";
import { TEAM_PHOTO } from "@/lib/media";
import "@/app/css/lab-foto-baslik.css";

/* LAB · /lab/foto-baslik (07.10.2026). Kısa siyah sayfa başlığının
   fotoğraflı örneği, gerçek blog sayfasında. Başlığın kendisi canlıdaki;
   yalnız zemini fotoğraf (css/lab-foto-baslik.css). İkinci örnek:
   /lab/foto-baslik/araclar. */
export const metadata: Metadata = { title: "Fotoğraflı başlık · blog | Ortac Global" };

export default function LabFotoBaslik() {
  return (
    <div className="fb-sayfa" style={{ "--fb-foto": `url(${TEAM_PHOTO})` } as React.CSSProperties}>
      <BlogIndexPage />
    </div>
  );
}
