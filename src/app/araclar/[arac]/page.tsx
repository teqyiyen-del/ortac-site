import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import ToolShell from "@/components/tools/ToolShell";
import { TOOL_VIEW } from "@/components/tools/registry";
import { PAGED_TOOLS, type PagedToolId } from "@/lib/tools/catalog";

/* ============================================================================
   ARAÇ SAYFASI — /araclar/<araç>
   ============================================================================

   NEDEN TEK DOSYA VE DİNAMİK SEGMENT

   Müşterinin kararı net: "her aracın ayrı sayfası olacak, hepsini tek bir
   sayfaya toplayıp içinde section yapma." Altı ayrı klasör açmak da bunu
   yapardı — ama o zaman her aracın adresi İKİ yerde yazılı olurdu: kayıt
   defterindeki `id` ve klasörün adı. İki yerde yazılan slug bir gün ayrışır;
   ayrıştığı gün de görünmez, çünkü app/[...yapim] yakalayıcısı yanlış adrese
   "yapım aşamasında" kartını HTTP 200 ile basıyor.

   Burada slug diye bir şey yazılmıyor. generateStaticParams() defterin
   `paged` alanını okuyor; sayfa listesi ile araç listesi aynı dizi.

   PLANLANAN ARAÇLAR BURADAN ÇIKMIYOR
   Defterde `status: "planned"` olan kalem `paged: false` alıyor, yani bu rota
   onun için hiç üretilmiyor ve adresi notFound()'a düşüyor. "Yakında" diyen
   yarım bir araç sayfası açmak, olmayan bir aracı varmış gibi göstermek olurdu;
   dizinde sönük bir kart olarak duruyorlar ve tıklanamıyorlar.

   UYGUNLUK TESTİ DE BURADAN ÇIKMIYOR
   Onun sayfası zaten yazılmıştı ve adresi sabit (/uygunluk-testi). Defterde
   `ownHref` ile duruyor, `paged: false` — yoksa aynı sayfa iki ayrı rotadan
   üretilirdi.

   SAYFANIN İSKELETİ — sitenin standart kalıbı (bkz. app/iletisim/page.tsx)
     Nav
     PageHero      kırıntı yolu + sayfanın TEK <h1>'i (aracın adı) + ne olduğu
     ToolShell     aracın kendisi + "ne değil" + aynı ailenin öteki araçları
     FinalCta
   ========================================================================= */

type Params = Promise<{ arac: string }>;

export function generateStaticParams() {
  return PAGED_TOOLS.map((t) => ({ arac: t.id }));
}

/* Kanonik mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil, göreli
   bir kanonik geliştirme sunucusunun adresine çözülürdü. */
const SITE = "https://ortacglobal.com";

/** Adres → defter kalemi. Yalnızca `paged` olanlar; başka bir şey bu rotadan
 *  açılamıyor, yani planlanan bir aracın adresi kazara sayfa üretmiyor. */
function pagedTool(arac: string) {
  return PAGED_TOOLS.find((t) => t.id === arac) ?? null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { arac } = await params;
  const t = pagedTool(arac);
  if (!t) return {};

  /* Başlığın işi burada arama sonucunda ayırt edilmek: "dubai kurumlar vergisi
     hesaplama" arayan kişi tek sayfadaki bir çapaya değil, kendi başlığı olan
     bu sayfaya iniyor. Kuyruk defterin `meta` alanı — ülke ve aracın ne yaptığı
     zaten orada yazılı, ikinci kez elle yazılmıyor. */
  const title = `${t.title} — ${t.meta} | Ortac Global`;
  const url = `${SITE}${t.href}`;

  return {
    title,
    description: t.is,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url,
      title,
      description: t.is,
    },
  };
}

export default async function ToolPage({ params }: { params: Params }) {
  const { arac } = await params;
  const tool = pagedTool(arac);
  if (!tool) notFound();

  /* Tip sistemi burada kapanıyor: `paged` olan her kalem PagedToolId, ve
     registry o birleşimin tamamını taşımak zorunda (Record<PagedToolId, …>).
     Yani bu satır hiçbir zaman undefined dönmüyor — dönseydi tsc uyarırdı. */
  const View = TOOL_VIEW[tool.id as PagedToolId];

  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb={`Araçlar · ${tool.title}`}
          title={tool.title}
          accent={tool.accent}
          lead={tool.is}
        />
        <ToolShell tool={tool}>
          <View />
        </ToolShell>
        <FinalCta />
      </main>
    </>
  );
}
