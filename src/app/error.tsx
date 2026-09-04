"use client";

import { useEffect } from "react";

/* ============================================================================
   HATA SINIRI · beklenmeyen bir sorun
   CSS: app/css/hata.css · .hta-

   NE ZAMAN GÖRÜNÜR: bir sayfa render sırasında hata fırlatırsa Next bu dosyayı
   basıyor. 404 ile karıştırılmamalı — orada adres yok, burada adres var ama
   sayfa çizilemedi.

   ---------------------------------------------------- NEDEN NAV VE FOOTER YOK
   not-found.tsx ikisini de basıyor, bu dosya basmıyor ve bu BİLİNÇLİ bir
   ayrım. Hata sınırı, altındaki ağaç çöktüğü için devreye giriyor; kendisi de
   çöken ağaçtan bileşen çağırırsa aynı hataya ikinci kez düşme ihtimali var
   (Nav mağazayı okuyor, Footer kapanış sahnesini ve dizini basıyor — ikisi de
   bu depoda en çok bağımlılığı olan bileşenler). Kaçış yolu bu yüzden tek bir
   düğme ve tek bir bağlantı: ikisi de hiçbir şeye bağlı değil.

   Aynı sebeple bağlantı `SmartLink` değil düz `<a>`: SmartLink yayın kapısını
   (lib/routes.ts) okuyor ve bu ekranın çalışması için bir kaydın doğru
   olmasına bağlı olmamalı. Ana sayfa her hâlükârda yayında.

   `reset()` Next'in verdiği yeniden deneme kancası: bileşen ağacını yeniden
   kuruyor. Geçici bir hatada (ağ, yarış durumu) sayfayı yenilemeden düzeliyor;
   kalıcı hatada aynı ekrana dönüyor ve altındaki bağlantı devreye giriyor.

   ---------------------------------------------------------------- KAYIT
   `useEffect` içindeki `console.error` tek satır ve bilerek: bu depoda hata
   toplama servisi yok (SWAP:GTM_ID dışında ölçüm altyapısı da yok). Servis
   bağlanınca çağrının gideceği yer burası; o güne kadar hata en azından
   tarayıcı konsolunda görünür kalıyor. `digest` sunucu tarafındaki yığın izinin
   kimliği — sunucu günlüğüyle eşleştirmenin tek yolu o.
   ========================================================================= */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ortac] sayfa hatası:", error);
  }, [error]);

  return (
    <main>
      <section className="ph phg hta">
        <div className="phg-bg" data-zemin="yildiz" aria-hidden="true">
          <span className="phy-yildiz phy-yildiz-b" />
          <span className="phy-yildiz phy-yildiz-a" />
          <span className="phy-kayan phy-kayan-1" />
          <span className="phy-kayan phy-kayan-2" />
          <div className="phg-glow" />
        </div>

        <div className="container-o hta-in">
          <p className="hta-kod">Beklenmeyen hata</p>
          <h1 className="ph-title">Bu sayfa şu an açılamadı.</h1>
          <p className="ph-lead">
            Sorun sizde değil. Yeniden denemek çoğu zaman yeterli oluyor; sürerse
            ana sayfadan devam edebilir ya da bize yazabilirsiniz.
          </p>

          <div className="hta-eylem">
            <button type="button" className="btn btn-primary" onClick={() => reset()}>
              Yeniden dene
            </button>
            {/* DÜZ <a>, `next/link` DEĞİL — ve kural bilerek susturuldu.
                Link istemci tarafı gezinme yapıyor: uygulama zaten çökmüşken
                aynı istemci durumuyla başka bir rotaya geçmek hatayı yanına
                taşıma riski taşıyor. Düz bağlantı tam sayfa yüklemesi
                yaptırıyor, yani bütün istemci durumu sıfırlanıyor — hata
                sınırından çıkmanın en kesin yolu bu. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="btn btn-ghost">
              Ana sayfaya dön
            </a>
          </div>

          {/* Teknik künye. Ziyaretçiye bir şey anlatmıyor ama destek yazışmasında
              tek işe yarayan bilgi bu: sunucu günlüğündeki kaydı bulmanın
              anahtarı. `digest` yoksa satır hiç basılmıyor — boş bir künye
              "bir şey eksik" hissi verir. */}
          {error.digest && <p className="hta-adres">Hata kimliği: {error.digest}</p>}
        </div>
      </section>
    </main>
  );
}
