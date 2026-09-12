import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import ToolShell from "@/components/tools/ToolShell";
import { TOOL_VIEW } from "@/components/tools/registry";
import { PAGED_TOOLS, type PagedToolId } from "@/lib/tools/catalog";
import { SITE } from "@/lib/routes";

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

   KURUMLAR VERGİSİ DE ARTIK BURADAN ÇIKMIYOR (11.09.2026 · araç dili turu)
   Ülke başına üç adrese ayrıldı: app/araclar/kurumlar-vergisi/[ulke].
   Statik `kurumlar-vergisi` klasörü bu dinamik segmentten önce eşleşiyor,
   yani eski adres bu dosyaya hiç gelmezdi; ama generateStaticParams'tan da
   düşmesi gerekiyordu, yoksa aynı araç iki rotadan üretilmeye çalışılırdı.
   Düşüşü elle yazılmadı: defterde `ownHref` taşıyor, `paged` false, yani
   PAGED_TOOLS onu zaten vermiyor.

   SAYFANIN İSKELETİ — sitenin standart kalıbı (bkz. app/iletisim/page.tsx)
     Nav
     PageHero      kırıntı yolu + sayfanın TEK <h1>'i (aracın adı) + ne olduğu
     ToolShell     aracın kendisi + "ne değil" + aynı ailenin öteki araçları
     FinalCta
   ToolShell 11.09.2026'da yeni araç diline geçti (iki panelli kart dili,
   açılır "ne değil", ikonlu kardeş kartları).

   BU ROTANIN DÖRT ARACI DA AYNI TURDA O DİLE GEÇTİ (bütünlük denetimi turu).
   Buradaki yorum bir tur boyunca "henüz geçmedi; kökleri `.tl-app`" diyordu
   ve artık yanlıştı: ölçüldü, dört aracın dördü de `.ta-` ad alanında,
   `.tl-app` sınıfı hiçbir araç bileşeninde geçmiyor. (`.tl-` dili yalnız
   dolaşıma kapalı `/araclar` dizininde ve `/lab/muhasebe`'de yaşıyor.)
   Yanlış kalmış bir karar kaydı, hiç kayıt olmamasından daha zararlı —
   bir sonraki tur onu okuyup var olmayan bir işi yapmaya kalkar.

   BAŞLIK SONUNDAKİ NOKTA VE `accent` (bütünlük denetimi turu)
   ÖLÇÜLDÜ, on altı canlı sayfanın <h1>'i çekilerek: on beşi nokta ile biten
   bir cümle, biri soru işaretiyle biten bir cümle (/hakkimizda · "Ortac
   Global kimdir?", durum.md'de zaten ayrı bir açık madde). Yani kural
   "başlık bitmiş bir cümledir". Bu rotanın dört araç sayfası ise hiç
   noktalama taşımıyordu — sekiz araç sayfasının dördü bir ucu açık etiket
   basıyor, dördü cümle kuruyordu.
   Nokta burada ekleniyor, defterde (catalog.ts) DEĞİL — aynı `title` alanı
   menüde, kardeş kartlarında ve kırıntı yolunda da basılıyor ve oralarda
   cümle değil etiket olarak duruyor, yani noktasız doğru.

   `accent` da noktalanmak ZORUNDA: PageHero vurguyu `title.endsWith(accent)`
   ile buluyor, eşleşmezse mavi kuyruğu SESSİZCE hiç basmıyor (bu depoda bir
   kez yaşandı, durum.md · hero başlığı turu). Ölçüldü: dört sayfanın
   dördünde de vurgu basılıyor.
   ========================================================================= */

type Params = Promise<{ arac: string }>;

export function generateStaticParams() {
  return PAGED_TOOLS.map((t) => ({ arac: t.id }));
}

/* Kanonik mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil, göreli
   bir kanonik geliştirme sunucusunun adresine çözülürdü. Kök adres
   11.09.2026'dan beri lib/routes.ts · SITE'tan (site haritasıyla tek kaynak). */

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
      /* "website", "article" DEĞİL (bütünlük denetimi turu). Bu dört sayfa
         `article` basıyordu, kurumlar vergisinin üç ülke sayfası `website`;
         aynı ailenin sekiz sayfası paylaşımda iki ayrı tür bildiriyordu.
         Doğrusu `website`: araç bir yazı değil, tarihi ve yazarı olan bir
         içerik hiç değil. Kurumlar vergisi sayfasının yorumu bu farkı
         "bir önceki turun kararı ve bu turun dosyası değil" diye kayda
         geçirmişti; bu tur o dosya da kapsamda olduğu için kapandı. */
      type: "website",
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
        {/* Kırıntı noktasız: orada başlık bir cümle değil, yolun son halkası
            ("Araçlar · BAE KDV hesaplayıcı"). Nokta yalnız <h1>'de. */}
        <PageHero
          crumb={`Araçlar · ${tool.title}`}
          title={`${tool.title}.`}
          accent={`${tool.accent}.`}
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
