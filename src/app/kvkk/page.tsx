import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";

/* /kvkk · KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ · TASLAK (07.10.2026)
   Burak: "KVKK metnini biz yazacağız seninle. Yaz hatta onu da; sonra
   onaylatırız." Kurulum penceresinin bilgiler adımındaki cümle buraya
   bağlanıyor.

   TASLAKTIR, HUKUKÇU ONAYI BEKLİYOR. Aramaya kapalı (noindex). Onaydan önce
   netleşmesi gerekenler (docs/durum.md'de de yazılı):
     · veri sorumlusunun tam unvanı ve adresi (aşağıda iki belgede geçen iki
       tüzel kişi yazılı: Dubai ve KKTC; Türkiye'de bir tüzel kişi var mı?)
     · başvuru e-postası (belgelerdeki genel adres kullanıldı)
     · müşteri panelinin ve öteki hizmet sağlayıcıların yurt dışı aktarım
       kapsamında nasıl anılacağı
     · saklama süreleri (taslakta "mevzuatın öngördüğü süre" deniyor, rakam
       uydurulmadı)
   Metin 6698 sayılı Kanun'un 10. maddesindeki başlıkları izliyor: kim,
   hangi veri, hangi amaç, kime aktarım, toplama yöntemi ve hukuki sebep,
   haklar. */

export const metadata: Metadata = {
  title: "Kişisel verilerin korunması | Ortac Global",
  description: "Ortac Global'in kişisel verileri hangi amaçla işlediğini ve haklarınızı anlatan aydınlatma metni.",
  robots: { index: false, follow: false },
};

const BOLUM: { h: string; p?: string[]; l?: string[] }[] = [
  {
    h: "Veri sorumlusu",
    p: [
      "Bu metin, sitemiz üzerinden bize ilettiğiniz kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında nasıl işlendiğini anlatır.",
      "Verileriniz, hizmeti aldığınız ülkeye göre Ortac Accounting Services LLC (Al Saaha Offices Block B No 304, Dubai) , Ortac International Accounting & Tax Services Limited (85 Great Portland St, Londra) ya da Murat Ortaç Accountancy (Şht. Murat İlhan Sokak No:5, Kumsal, Lefkoşa, KKTC) tarafından veri sorumlusu sıfatıyla işlenir.",
    ],
  },
  {
    h: "Hangi verileri işliyoruz",
    l: [
      "Kimlik ve iletişim: ad, soyad, e-posta adresi, telefon numarası.",
      "Talep bilgisi: seçtiğiniz ülke, kuruluş seçenekleri ve bize yazdığınız mesaj.",
      "Hizmet sürecinde sizden ayrıca istenen belgeler: pasaport, adres belgesi, şirket ve ortaklık bilgileri. Bu belgeler site üzerinden değil, süreç başladıktan sonra müşteri paneli üzerinden alınır.",
      "Site kullanımı: sayfa görüntüleme ve tıklama gibi ölçüm verileri.",
    ],
  },
  {
    h: "Hangi amaçla işliyoruz",
    l: [
      "Talebinizi değerlendirmek ve sizinle iletişime geçmek.",
      "Şirket kuruluşu, muhasebe, vergi, banka ve vize süreçlerini yürütmek.",
      "Kimlik doğrulama, gerçek faydalanıcı tespiti ve kara para önleme yükümlülükleri gibi yasal zorunlulukları yerine getirmek.",
      "Hizmetlerimizi ve sitemizi geliştirmek.",
    ],
  },
  {
    h: "Hukuki sebep",
    p: [
      "Verilerinizi; bir sözleşmenin kurulması ya da ifası için gerekli olması, hukuki yükümlülüğümüzü yerine getirmemiz ve meşru menfaatimiz hukuki sebeplerine dayanarak işliyoruz. Bu sebeplerin kapsamadığı işlemler için ayrıca açık rızanızı isteriz.",
    ],
  },
  {
    h: "Kimlerle paylaşıyoruz",
    p: [
      "Verileriniz yalnızca hizmetin yürütülmesi için gerekli olduğu ölçüde paylaşılır:",
    ],
    l: [
      "Başvurunun yapıldığı resmî kurumlar ve serbest bölge otoriteleri.",
      "Hesap başvurusu yaptığınız bankalar ve ödeme kuruluşları.",
      "Hizmet aldığımız altyapı sağlayıcıları (müşteri paneli, e-posta ve barındırma hizmetleri).",
      "Yasal olarak yetkili kamu kurumları.",
    ],
  },
  {
    h: "Yurt dışına aktarım",
    p: [
      "Hizmetlerimiz Birleşik Arap Emirlikleri, Birleşik Krallık ve Kuzey Kıbrıs Türk Cumhuriyeti'nde yürütüldüğü için verileriniz bu ülkelerdeki ofislerimize, resmî kurumlara ve hizmet sağlayıcılarımıza aktarılabilir. Aktarım, Kanun'un 9. maddesindeki şartlara uygun olarak yapılır.",
    ],
  },
  {
    h: "Ne kadar süre saklıyoruz",
    p: [
      "Verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatın öngördüğü saklama süreleri boyunca saklanır; süre dolduğunda silinir, yok edilir ya da anonim hâle getirilir.",
    ],
  },
  {
    h: "Haklarınız",
    p: ["Kanun'un 11. maddesi uyarınca bize başvurarak şunları talep edebilirsiniz:"],
    l: [
      "Verilerinizin işlenip işlenmediğini öğrenmek ve işlenmişse bilgi istemek.",
      "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenmek.",
      "Yurt içinde ya da yurt dışında aktarıldığı üçüncü kişileri bilmek.",
      "Eksik ya da yanlış işlenmişse düzeltilmesini istemek.",
      "Kanun'daki şartlar çerçevesinde silinmesini ya da yok edilmesini istemek.",
      "Otomatik sistemlerle analiz sonucunda aleyhinize bir sonuç çıkmasına itiraz etmek.",
      "Kanun'a aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etmek.",
    ],
  },
  {
    h: "Başvuru",
    p: [
      "Taleplerinizi info@ortacglobal.com adresine iletebilirsiniz. Başvurunuz en geç otuz gün içinde sonuçlandırılır.",
    ],
  },
];

export default function KvkkPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb="Kişisel veriler"
          title="Kişisel verilerin korunması."
          accent="korunması."
          lead="Bize ilettiğiniz bilgileri hangi amaçla işlediğimizi ve haklarınızı bu sayfada bulursunuz."
        />
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="yasal">
              {BOLUM.map((b) => (
                <section key={b.h}>
                  <h2>{b.h}</h2>
                  {b.p?.map((p) => <p key={p}>{p}</p>)}
                  {b.l && (
                    <ul>
                      {b.l.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
    </>
  );
}
