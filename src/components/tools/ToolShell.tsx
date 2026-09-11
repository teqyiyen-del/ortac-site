import { ArrowRight, Info, Server } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { siblingsOf, type ToolEntry } from "@/lib/tools/catalog";

/* ------------------------------------------------ "BİZE GELMİYOR" CÜMLESİ
   11.09.2026'ya kadar kardeş şeridinin altında sabit bir cümle vardı:
   "Hepsi tarayıcınızda çalışıyor ve girdiğiniz hiçbir bilgi bize gelmiyor."
   Doğruydu, çünkü sitenin tek sunucu rotası yoktu. İngiltere isim sorgusu
   ilk sunucu rotası (app/api/araclar/isim-sorgu) ve o araç kardeş şeridine
   girdiği her sayfada — isim üretecinin, SIC bulucunun, uygunluk testinin
   sayfalarında — cümle YANLIŞ olacaktı.

   Cümle artık şeritte ne listelendiğine bakıyor: defterde `sunucu` alanı
   olan araç varsa onu adıyla anıyor ve ne yaptığını söylüyor. Elle yazılmış
   bir istisna listesi değil, çünkü bir sonraki sunucu aracını yazan kişi
   bu dosyayı açmayı unutabilir; defter girdisini yazmayı unutamaz (kabuk
   o girdiden besleniyor).

   "tamamen" kelimesi bilerek YOK: isim üreteci alan adını tarayıcıdan RDAP'e
   soruyor (lib/tools/alanadi.ts). Bize gelmiyor, ama "tamamen tarayıcıda"
   da değil. */
function yerellikCumlesi(siblings: ToolEntry[]): string {
  const disari = siblings.flatMap((s) => (s.sunucu ? [{ ad: s.title, kisa: s.sunucu.kisa }] : []));
  if (disari.length === 0) {
    return "Hepsi tarayıcınızda çalışıyor ve girdiğiniz hiçbir bilgi bize gelmiyor.";
  }
  if (disari.length === siblings.length) {
    return disari.map((s) => `${s.ad} ${s.kisa}.`).join(" ");
  }
  const adlar = disari.map((s) => s.ad).join(" ve ");
  const ne =
    disari.length === 1
      ? `o araç ${disari[0].kisa}`
      : disari.map((s) => `${s.ad} ${s.kisa}`).join("; ");
  return `${adlar} dışındakiler tarayıcınızda çalışıyor ve girdiğiniz bilgi bize gelmiyor; ${ne}.`;
}

/* Bir araç sayfasının gövdesi.
 *
 * BU TURDA İŞİ DEĞİŞTİ. Eskiden /araclar'daki altı bölümden birinin kabuğuydu
 * ve kendi <h2>'sini basıyordu. Artık her aracın kendi sayfası var, yani
 * aracın adı sayfanın <h1>'i (PageHero) — kabuk aynı başlığı ikinci kez
 * basarsa sayfada iki kez aynı cümle okunur. O yüzden burada başlık YOK.
 *
 * Geriye kabuğun asıl işi kalıyor ve o hiç değişmedi: her araç NE OLMADIĞINI
 * söylemek zorunda. Bileşenlerin insafına bırakılırsa biri unutur; kabuk
 * zorunlu kılıyor, metin de kayıt defterinden (lib/tools/catalog.ts) geliyor.
 * Gözden geçiren kişi bütün araçların sınırını tek dosyada okuyabiliyor.
 *
 * İkinci iş dolaşım: tek araçlık bir sayfanın çıkışı yoksa ziyaretçi geri
 * tuşuna mahkûm kalıyor. Alttaki şerit aynı ailenin öteki araçlarını veriyor
 * (seçim defterde, siblingsOf) ve dizine dönüş bağlantısını.
 *
 * Bilerek sunucu bileşeni: içine gelen araç istemcide çalışıyor, kabuk
 * çalışmıyor.
 */
export default function ToolShell({
  tool,
  children,
}: {
  tool: ToolEntry;
  children: React.ReactNode;
}) {
  const siblings = siblingsOf(tool.id);

  return (
    <>
      <section className="tl-sec">
        <div className="container-o">
          <div className="tl-card">{children}</div>

          <p className="tl-foot">
            <Info size={16} strokeWidth={2.1} aria-hidden="true" />
            <span>
              <b>Ne değil:</b> {tool.isNot}
            </span>
          </p>

          {/* Girdisi sunucudan geçen araçta ikinci zorunlu satır. "Ne değil"
              ile aynı gerekçe: bileşene bırakılırsa biri unutur, kabuk
              defterden basıyor. Yerel araçlarda satır yok — onların sayfasına
              yeni bir cümle eklemek bu turun işi değildi. */}
          {tool.sunucu && (
            <p className="tl-foot">
              <Server size={16} strokeWidth={2.1} aria-hidden="true" />
              <span>
                <b>Nereye gidiyor:</b> {tool.sunucu.cumle}
              </span>
            </p>
          )}
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="tl-sec" data-alt="">
          <div className="container-o">
            <div className="tl-head">
              <h2 className="h2 tl-title">
                Buradan sonra <span className="text-accent">işinize yarayanlar.</span>
              </h2>
              <p className="tl-lead">{yerellikCumlesi(siblings)}</p>
            </div>

            <ul className="tl-ix">
              {siblings.map((s) => (
                <li key={s.id} className="tl-ix-i">
                  <SmartLink href={s.href} className="tl-ix-a">
                    <span className="tl-ix-t">{s.title}</span>
                    <span className="tl-ix-m">{s.meta}</span>
                    <span className="tl-ix-go">
                      Aracı açın
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ul>

            <p className="tl-intro-n">
              <SmartLink href="/araclar" className="link-arrow">
                Bütün araçlar ve sırada bekleyenler
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
