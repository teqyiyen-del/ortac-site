/* KURUMSAL SAYFA GİRİŞİ (10.10.2026).
   Burak: "hizmet sayfalarının giriş mantığını kurumsal sayfalara uygula":
   solda yazı, sağda görsel. Hakkımızda, kariyer, iletişim, basında biz ve
   kaynaklar tam ekran koyu fotoğraflı kompakt başlıkla (PageHero) açılıyordu;
   şimdi hizmet sayfalarının ve iş ortaklığının girişiyle aynı kalıp
   (shared/FotoGiris · .dhr-). Bu sarmalayıcı yalnız rozetlerin ikonunu ve
   kalın parçasını kuruyor; metin çağıran sayfadan geliyor ve hepsi teyitli
   olgu (yıl, ofisler, sayfanın kendi içeriği). */
import FotoGiris from "@/components/shared/FotoGiris";

export type KurumsalRozet = { icon: React.ReactNode; b: string; s?: string };

export default function KurumsalGiris({
  crumb,
  title,
  accent,
  lead,
  foto,
  belge,
  rozetler,
  dugmeler,
}: {
  crumb: string;
  title: string;
  accent?: string;
  lead: string;
  foto: string;
  belge: { ad: string; cip: string };
  rozetler: KurumsalRozet[];
  dugmeler?: React.ReactNode;
}) {
  return (
    <FotoGiris
      iz={crumb}
      baslik={title}
      vurgu={accent}
      lead={lead}
      foto={foto}
      belge={belge}
      dugmeler={dugmeler}
      rozetler={rozetler.map((r) => ({
        icon: r.icon,
        metin: (
          <>
            <b>{r.b}</b>
            {r.s}
          </>
        ),
      }))}
    />
  );
}
