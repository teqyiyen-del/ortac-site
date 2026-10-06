#!/usr/bin/env node
/* IFZA FAALİYET ARŞİVİ · yenileme betiği (06.10.2026).
   Kaynak: IFZA'nın kendi faaliyet sayfasının (https://activities.ifza.com)
   okuduğu açık uç. Çıktı: src/lib/tools/ifza-veri.json (aracın arşivi).

   Kullanım:  node scripts/ifza-cek.mjs
   Site bu ucu ÇALIŞIRKEN çağırmıyor: liste depoda duruyor, IFZA'nın sitesi
   kapansa da araç çalışıyor. Liste değiştikçe betik elle koşulup sonuç
   commit'lenir (çekim tarihi dosyanın içinde).

   Satır biçimi (küçük dursun diye dizi):
   [kod, ad, tür (C ticari · P profesyonel), açıklama, onay kurumları[],
    onay zamanı (B lisanstan önce · A sonra · ""), özel not] */
import { writeFileSync } from "node:fs";

const UC = "https://world.ifza.com/api/utils/getBusinessActivities";
const r = await fetch(UC);
if (!r.ok) throw new Error(`IFZA ucu ${r.status}`);
const { data } = await r.json();

const duz = (s) => (s ?? "").replace(/\s+/g, " ").trim();
const satirlar = data
  .filter((x) => x.Activity_Code && x.Activity_Name)
  .map((x) => [
    duz(x.Activity_Code),
    duz(x.Activity_Name),
    x.DED_License_Type === "Professional" ? "P" : "C",
    duz(x.Description),
    [x.Approval_Entity_1, x.Approval_Entity_2].map(duz).filter(Boolean),
    x.Approval_Requirements?.startsWith("Before") ? "B" : x.Approval_Requirements?.startsWith("After") ? "A" : "",
    duz(x.Special_Notes),
  ])
  .sort((a, b) => a[0].localeCompare(b[0]));

writeFileSync(
  new URL("../src/lib/tools/ifza-veri.json", import.meta.url),
  JSON.stringify({ cekim: new Date().toISOString().slice(0, 10), kaynak: "https://activities.ifza.com", satirlar }),
);
console.log(`${satirlar.length} faaliyet yazıldı`);
