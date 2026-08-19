<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ortac sitesi · önce bunu oku

**YENİ BİR OTURUMDAYSAN İLK İŞ: `docs/durum.md`.** Bugün ne canlıda, hangi tur
karar bekliyor, müşteriden ne bekleniyor — hepsi orada ve her tur güncelleniyor.
Sohbet geçmişi kaybolsa bile iş orada kaldığı yerden devam eder. İkinci kaynak
`git log`: commit mesajları uzun ve gerekçeli, "ne yapıldı ve neden" onlarda.

Sonra **`docs/tuzaklar.md`** dosyasını oku. İçinde:

- değişmez kurallar (fiyat dosyasına dokunma, uydurma firma bilgisi yasak, "bölge"
  değil "ülke", uzun tire yasağı ve diğerleri),
- bu depoda gerçekten patlamış on altı teknik tuzak (`useReducedMotion` hidratasyonu,
  çıplak `1fr`, kaçan `.sr-only`, şişen `Flag`, periyot katsızlığı …),
- bilinen kontrast tuzağı,
- ve **doğrulama derinliğinin iki kademesi** var.

Son madde özellikle önemli: site tasarım tabanı atma aşamasında, bir bölüm birkaç tur
içinde tamamen değişebiliyor. Deneme aşamasındaki işlerde `tsc` + `lint` + `css-check` +
rota kontrolü yeterli; tam ölçüm yalnızca onaylanmış canlı işlerde yapılır.

Kod yorumları Türkçe ve **karar kaydı** niteliğinde: ne yapıldı, neden, hangi alternatif
neden elendi, hangi sayı ölçüldü. Mevcut dosyaların yorum yoğunluğunu sürdür.
