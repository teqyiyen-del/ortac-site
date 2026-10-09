"use client";

/* KURULUM AKIŞI · SAYFANIN ÜSTÜNDE AÇILAN KATMAN (07.10.2026)
   Burak: "Kurulumu Başlat'a basınca ayrı bir sayfa açılıyor (/basla); ona
   gerek yok, olduğu yerin üstünde açılabilir. Ama kaç kişi tıkladı takip
   etmek istiyorsak link değişebilir, hashtag olarak koyabiliriz; tıklanınca
   bir yere geçiş yapıldı hissi."

   NE YAPIYOR. Kök düzende bir kez duruyor. Sitedeki /basla'ya giden HER
   bağlantıyı (menü, girişler, fiyat paneli, kapanış) tek yerden yakalıyor:
   sayfa değişmiyor, pencere bulunulan sayfanın üstünde açılıyor ve adres
   `#basla` oluyor. Bağlantıların kendisine dokunulmadı; JavaScript yoksa ya
   da bağlantı yeni sekmede açılırsa /basla sayfası eskisi gibi çalışıyor.

   ADRES VE ÖLÇÜM. Açılınca `#basla` geçmişe ekleniyor (geri tuşu pencereyi
   kapatıyor, `…/dubai#basla` paylaşılırsa pencere açık geliyor) ve
   `basla_open` olayı gönderiliyor: hangi sayfadan, seçim dolu mu.
   Fiyat panelinden gelen seçim bağlantının sorgusundan okunuyor
   (lib/dubaiFiyat.ts · dubaiSecimOku), pencere ikinci adımdan açılıyor.

   AĞIRLIK. Pencerenin kodu (akış, form, stiller) ilk açılışta ayrı parça
   olarak iniyor; her sayfaya yalnız bu küçük dinleyici giriyor. */

import { useEffect, useRef, useState, type ComponentType } from "react";
import { baslaOku, baslaSayfadan, type BaslaOnceden } from "@/lib/baslaSecim";
import { gtm } from "@/lib/gtm";

const HASH = "#basla";

type PencereProps = {
  acik: boolean;
  akis: "ozet";
  sunum: boolean;
  onceden?: BaslaOnceden | null;
  onKapat: () => void;
};

export default function BaslaKatmani() {
  const [Pencere, setPencere] = useState<ComponentType<PencereProps> | null>(null);
  const [acik, setAcik] = useState(false);
  const [oturum, setOturum] = useState(0);
  const [onceden, setOnceden] = useState<BaslaOnceden | null>(null);
  /* pencereyi biz mi açtık (geçmişe kayıt ekledik mi): kapatırken geri mi
     gidilecek, yoksa yalnız hash mi silinecek */
  const ekledik = useRef(false);

  useEffect(() => {
    const yukle = () =>
      import("@/components/lab/SatisAkisi").then((m) => setPencere(() => m.SatisPenceresi as ComponentType<PencereProps>));

    const ac = (secim: BaslaOnceden | null, kaynak: string) => {
      setOnceden(secim);
      setOturum((n) => n + 1);
      setAcik(true);
      void yukle();
      gtm("basla_open", { page: window.location.pathname, placement: kaynak, secili: secim ? "evet" : "hayir" });
    };

    const tikla = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      /* 10.10.2026 · /en denemesi: pencere Türkçe; İngilizce sayfadaki düğme
         `data-tam-sayfa` taşıyor ve pencere açılmadan /basla sayfasına gidiyor */
      if (a.dataset.tamSayfa !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/basla") return;
      /* /basla sayfasının kendisindeyken karışma: orada pencere zaten açık */
      if (window.location.pathname === "/basla") return;
      e.preventDefault();
      e.stopPropagation();
      const q = Object.fromEntries(url.searchParams.entries());
      window.history.pushState(null, "", HASH);
      ekledik.current = true;
      /* seçim adreste yoksa: ülke sayfasındaysak o ülke, varsayılan seçimle
         (menüdeki düğme hariç: o her sayfada aynı, baştan başlatır) */
      const menu = !!a.closest("header, nav");
      ac(baslaOku(q) ?? (menu ? null : baslaSayfadan(window.location.pathname)), menu ? "menu" : "sayfa");
    };

    const hash = () => {
      if (window.location.hash === HASH) {
        if (window.location.pathname !== "/basla") ac(null, "adres");
      } else {
        ekledik.current = false;
        setAcik(false);
      }
    };

    /* yakalama aşamasında: Next'in bağlantı işleyicisinden önce */
    document.addEventListener("click", tikla, true);
    window.addEventListener("popstate", hash);
    window.addEventListener("hashchange", hash);
    if (window.location.hash === HASH && window.location.pathname !== "/basla") ac(null, "adres");
    return () => {
      document.removeEventListener("click", tikla, true);
      window.removeEventListener("popstate", hash);
      window.removeEventListener("hashchange", hash);
    };
  }, []);

  if (!Pencere) return null;
  return (
    <Pencere
      key={oturum}
      acik={acik}
      akis="ozet"
      sunum={false}
      onceden={onceden}
      onKapat={() => {
        setAcik(false);
        if (window.location.hash !== HASH) return;
        if (ekledik.current) {
          ekledik.current = false;
          window.history.back();
        } else {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }}
    />
  );
}
