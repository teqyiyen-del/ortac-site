import ServicePage, { generateMetadata as meta } from "@/app/ulke/[slug]/[hizmet]/page";
import { pagedServicesFor } from "@/lib/services";

/* URL mimarisi SABİT (brief §5): hizmet sayfası ülkenin altında yaşıyor.
   Gövde tek yerde duruyor; burası yalnızca dubai slug'ını sabitliyor. */
type Params = Promise<{ hizmet: string }>;

const withSlug = async (params: Params) => {
  const { hizmet } = await params;
  return { slug: "dubai", hizmet };
};

/* 25.09.2026 · KENDİ SAYFASI OLAN HİZMETLER BURADAN ÜRETİLMİYOR.
   /dubai/muhasebe, /dubai/banka-hesabi ve /dubai/oturum-vize'nin kendi
   klasörleri var (src/app/dubai/<hizmet>/page.tsx). Bu şablon da aynı üç
   adresi generateStaticParams'tan üretince üretim derlemesinde iki sayfa
   aynı HTML dosyasına yazılıyor ve ŞABLON KAZANIYORDU: canlıda bu üç adres
   gerçek sayfa yerine eski genel hizmet şablonunu gösteriyordu. Geliştirme
   sunucusunda statik klasör öncelikli olduğu için görünmüyordu; optimizasyon
   turunda üretim derlemesinin ekran görüntüsünde yakalandı. Yeni bir hizmete
   kendi sayfası yazılınca slug'ı aşağıdaki listeye eklenir. */
const KENDI_SAYFASI = new Set(["muhasebe", "banka-hesabi", "oturum-vize"]);

export function generateStaticParams() {
  return pagedServicesFor("dubai")
    .filter((s) => !KENDI_SAYFASI.has(s.slug))
    .map((s) => ({ hizmet: s.slug }));
}

export const generateMetadata = ({ params }: { params: Params }) =>
  meta({ params: withSlug(params) });

export default function Page({ params }: { params: Params }) {
  return ServicePage({ params: withSlug(params) });
}
