/* ESKİ SİTEDEN TAŞINAN YAZILAR (09.10.2026'dan itibaren)
   Her yazı kendi dosyasında, başında kaynak ve Search Console notuyla.
   Sıra önemsiz: listeleyen her yer tarihe göre kendi sıralıyor.
   Yazı yöntemi: /Users/burak/PİKTRAM SİTE/ana-site/araclar/seo/EVRENSEL-REHBER.md
   (özet → soru başlıklı bölümler → tablo → "Ortac ne yapıyor" kutusu → SSS →
   hizmet sayfalarına metin içi bağlantı; her rakam birincil kaynaktan). */
import type { BlogPost } from "@/lib/blog";
import { POST_UK_ASGARI_UCRET } from "./ingiltereAsgariUcret";
import { POST_UK_YASAM } from "./ingiltereYasam";
import { POST_EORI } from "./eoriNumarasi";
import { POST_GELIR_VERGISI_OLMAYAN } from "./gelirVergisiOlmayanUlkeler";
import { POST_KKTC_YASAM } from "./kktcYasam";
import { POST_KKTC_VERGI } from "./kktcVergi";
import { POST_DUBAI_IS_FIKIRLERI } from "./dubaiIsFikirleri";
import { POST_DUBAI_YASAM } from "./dubaiYasam";
import { POST_KKTC_SERBEST_LIMAN } from "./kktcSerbestLiman";

export const TASINAN_YAZILAR: BlogPost[] = [POST_UK_ASGARI_UCRET, POST_UK_YASAM, POST_EORI, POST_GELIR_VERGISI_OLMAYAN, POST_KKTC_YASAM, POST_KKTC_VERGI, POST_DUBAI_IS_FIKIRLERI, POST_DUBAI_YASAM, POST_KKTC_SERBEST_LIMAN];
