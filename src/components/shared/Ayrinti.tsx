import { ChevronDown } from "lucide-react";

/* ============================================================================
   AYRINTI · açılır kutu — .ayr · css/country-bilgi.css
   23.09.2026 · Burak: "her yere not düşüyorsun … pdf mi okuyoruz makale mi
   okuyoruz yoksa sayfada mı … ya gömeceksin açılır kapanır yerlere ya da
   blogda anlatacağız." Şartlar, istisnalar, kaynak linkleri bölümün ana
   mesajı değil; kapalı başlıyor, merak eden açıyor. Tam hâli docs'ta.
   Yerli <details>: JS yok, klavye ve ekran okuyucu kendiliğinden çalışıyor. */

export default function Ayrinti({
  baslik = "Ayrıntılar ve kaynaklar",
  children,
}: {
  baslik?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="ayr">
      <summary>
        {baslik}
        <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
      </summary>
      <div className="ayr-ic">{children}</div>
    </details>
  );
}
