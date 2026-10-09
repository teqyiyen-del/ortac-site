#!/usr/bin/env node
/* Alan adı aracının doğruluk denetimi: aracın cevabı, ondan BAĞIMSIZ iki kaynakla karşılaştırılıyor.
     · DNS: adın NS kaydı varsa ad kesin kayıtlı. Araç o ada "boş" dediyse YALAN.
     · whois (sistem komutu): aracın "alınmış" dediği ama NS'i olmayan adlar ve "boş" dediği
       tanınmış adlar buradan teyit ediliyor.
   Ayrıca: her kütük tarayıcıdan sorulabiliyor mu (CORS, 200 ve 404'te), ayrıştırıcı ne yapıyor.
   node scripts/alan-denetim.mjs        (ağ ister, 2-3 dakika sürer; hata bulursa 1 ile çıkar) */
import { execFile } from "node:child_process";
import { resolveNs } from "node:dns/promises";
import { promisify } from "node:util";
import { alanAdiSorgula, alanAyristir, alanBenzerleri, TUM_UZANTILAR } from "../src/lib/tools/alanadi.ts";

const calistir = promisify(execFile), bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const hata = [], uyari = [];

/* ---- 1) AYRIŞTIRICI (ağsız) */
const AYRIS = [
  ["halil.com", "halil", "com", null], ["Halil.COM", "halil", "com", null], ["  https://www.halil.com/yol?x=1 ", "halil", "com", null],
  ["halil", "halil", null, null], ["halil.co.uk", "halil", "co.uk", null], ["halil.com.tr", "halil", null, "com.tr"],
  ["halil.ae", "halil", null, "ae"], ["HALİL.com", "halil", "com", null], ["IŞIK.io", "isik", "io", null], ["INFO.com", "info", "com", null],
  ["çiçek şirketi", "cicek", null, null], ["-ha-lil-.dev", "ha-lil", "dev", null], ["halil.", "halil", null, null], [".com", "", "com", null],
  ["", "", null, null], ["😀", "", null, null], ["a".repeat(80) + ".com", "a".repeat(63), "com", null], ["www.halil.co.uk", "halil", "co.uk", null],
  ["blog.halil.com", "blog", null, "halil.com"], ["halil@x.com", "halilx", "com", null],
];
for (const [girdi, e, u, b] of AYRIS) {
  const c = alanAyristir(girdi);
  if (c.etiket !== e || c.uzanti !== u || c.bilinmeyen !== b) hata.push(`ayrıştırıcı ${JSON.stringify(girdi)} → ${JSON.stringify(c)}, beklenen ${JSON.stringify({ etiket: e, uzanti: u, bilinmeyen: b })}`);
}
for (const e of ["halil", "a".repeat(60)]) for (const x of alanBenzerleri(e)) if (!/^[a-z0-9-]{2,63}$/.test(x) || x === e) hata.push(`benzer ad bozuk: ${x}`);

/* ---- 2) GERÇEK SORGULAR */
const TANINMIS = ["google", "amazon", "microsoft", "apple", "github", "cloudflare", "stripe", "openai", "notion", "bbc", "tesco", "hsbc", "shell", "nike", "halil", "atlas", "ortac", "deniz", "istanbul", "example", "test", "www", "nic", "admin", "shop", "ai", "go", "x1", "my-shop", "123"];
const rasgele = () => "zq" + Array.from({ length: 14 }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("") + "x";
const UYDURMA = Array.from({ length: 12 }, rasgele);

async function nsVar(ad) { try { return (await resolveNs(ad)).length > 0; } catch { return false; } }
async function whois(ad) {
  try {
    const { stdout } = await calistir("whois", [ad], { timeout: 20000 });
    const m = stdout.toLowerCase();
    if (/no match for|not found|no data found|no entries found|domain not found|is available|this domain name has not been registered|no object found/.test(m)) return "yok";
    if (/registrar:|creation date|registered on|registry domain id|registrant/.test(m)) return "var";
    return "belirsiz";
  } catch { return "belirsiz"; }
}

const UC = { com: "https://rdap.verisign.com/com/v1/domain/", net: "https://rdap.verisign.com/net/v1/domain/", org: "https://rdap.publicinterestregistry.org/rdap/domain/", "co.uk": "https://rdap.nominet.uk/uk/domain/", io: "https://rdap.identitydigital.services/rdap/domain/", ai: "https://rdap.identitydigital.services/rdap/domain/", dev: "https://pubapi.registry.google/rdap/domain/", app: "https://pubapi.registry.google/rdap/domain/", xyz: "https://rdap.centralnic.com/xyz/domain/" };
async function tescilTarihi(e, u) { try { const d = await (await fetch(`${UC[u]}${e}.${u}`)).json(); return d.events?.find((x) => x.eventAction === "registration")?.eventDate ?? null; } catch { return null; } }
const say = { kayitli: 0, bos: 0, sorulamadi: 0 }, tablo = [];
async function sor(etiket, tur) {
  /* aracın kendi işlevi, aracın yaptığı gibi: dokuz uzantı birden */
  let c = await alanAdiSorgula(etiket, TUM_UZANTILAR);
  /* sorulamayanlar bir kez daha: sınır geçiciyse ikinci denemede cevap gelir */
  const tekrar = c.filter((x) => x.durum === "sorulamadi").map((x) => x.uzanti);
  if (tekrar.length) { await bekle(4000); const c2 = await alanAdiSorgula(etiket, tekrar); c = c.map((x) => c2.find((y) => y.uzanti === x.uzanti) ?? x); }
  for (const { uzanti, durum } of c) {
    const ad = `${etiket}.${uzanti}`; say[durum]++;
    const ns = await nsVar(ad);
    let w = "";
    if (durum === "bos" && ns) { w = await whois(ad); hata.push(`YALAN: araç "boş" dedi ama ${ad} DNS'te var (whois: ${w})`); }
    else if (durum === "bos" && tur === "taninmis") { w = await whois(ad); if (w === "var") hata.push(`YALAN: araç "boş" dedi, whois ${ad} kayıtlı diyor`); }
    else if (durum === "kayitli" && tur === "uydurma") { w = await whois(ad); hata.push(`uydurma ad kayıtlı çıktı: ${ad} (whois: ${w})`); }
    else if (durum === "kayitli" && !ns) {
      /* NS'siz kayıtlı ad olur (bbc.ai: 2017'de alınmış, sunucuya bağlanmamış). Sistem whois'i bazı
         uzantılarda yanlış sunucuya gidiyor, o yüzden son söz kütüğün kendi kaydındaki tescil tarihi. */
      w = await whois(ad);
      if (w !== "var") { const t = await tescilTarihi(etiket, uzanti); w = t ? `tescil ${t.slice(0, 10)}` : w; if (!t) hata.push(`YALAN OLABİLİR: araç "alınmış" dedi, ${ad} için ne whois ne tescil tarihi var`); }
    }
    if (durum === "sorulamadi") uyari.push(`sorulamadı (iki denemede): ${ad}`);
    tablo.push([ad, durum, ns ? "NS var" : "NS yok", w]);
  }
  await bekle(700);
}
for (const e of TANINMIS) await sor(e, "taninmis");
for (const e of UYDURMA) await sor(e, "uydurma");

/* ---- 3) TARAYICIDAN SORULABİLİYOR MU: her uçta, hem 200 hem 404 cevabında CORS başlığı */
const cors = [];
for (const u of TUM_UZANTILAR) for (const [e, beklenen] of [[u === "co.uk" ? "bbc" : u === "xyz" ? "abc" : "google", 200], [rasgele(), 404]]) {
  try {
    const iste = () => fetch(`${UC[u]}${e}.${u}`, { headers: { accept: "application/rdap+json", origin: "https://ortacglobal.com" } });
    const r = await iste().catch(async () => { await bekle(3000); return iste(); }); /* tek seferlik ağ kopması hata sayılmasın */
    const acao = r.headers.get("access-control-allow-origin");
    cors.push(`.${u} ${r.status} ACAO=${acao}`);
    if (r.status !== beklenen) hata.push(`uç denetimi .${u}: ${e} için ${beklenen} beklenirken ${r.status}`);
    if (acao !== "*" && acao !== "https://ortacglobal.com") hata.push(`CORS yok: .${u} ${r.status} cevabında tarayıcı okuyamaz (her sonuç "sorulamadı" olur)`);
  } catch (x) { hata.push(`uç denetimi .${u}: ${x.message}`); }
  await bekle(400);
}

/* ---- RAPOR */
const sut = (a) => a.map((x, i) => String(x).padEnd([34, 11, 7, 8][i])).join(" ");
console.log(tablo.filter((t) => t[3] || t[1] === "sorulamadi" || (t[1] === "bos" && !t[0].startsWith("zq"))).map(sut).join("\n"));
console.log(`\n${tablo.length} sorgu · alınmış ${say.kayitli} · boş ${say.bos} · sorulamadı ${say.sorulamadi}`);
console.log(`"alınmış" denenlerden NS'i olan: ${tablo.filter((t) => t[1] === "kayitli" && t[2] === "NS var").length} / ${say.kayitli}`);
console.log(cors.join("\n"));
for (const u of uyari) console.log("UYARI " + u);
for (const h of hata) console.log("HATA " + h);
console.log(hata.length ? `${hata.length} hata` : "temiz");
process.exit(hata.length ? 1 : 0);
