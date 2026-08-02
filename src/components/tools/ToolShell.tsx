import { ArrowRight, Info } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { siblingsOf, type ToolEntry } from "@/lib/tools/catalog";

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
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="tl-sec" data-alt="">
          <div className="container-o">
            <div className="tl-head">
              <h2 className="h2 tl-title">
                Buradan sonra <span className="text-accent">işinize yarayanlar.</span>
              </h2>
              <p className="tl-lead">
                Hepsi tarayıcınızda çalışıyor ve girdiğiniz hiçbir bilgi bize gelmiyor.
              </p>
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
