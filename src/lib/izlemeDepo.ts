/* İZLEME DEPOSU · sunucu tarafı (08.10.2026)
   Tek tablo, tek dosya (SQLite, Node'un kendi node:sqlite modülü; ek paket
   yok, Node 22.13+). Yol IZLEME_DB'den. Değişken yoksa ya da modül açılamazsa
   depo yok sayılıyor ve yazma sessizce atlanıyor: Vercel'de kalıcı disk
   olmadığı için orada bilerek kapalı.
   ponytail: tek süreç, eşzamanlı yazma kilidi yok. Site birden çok süreçle
   çalıştırılırsa WAL zaten açık; yetmezse Postgres'e taşınır. */

export type Satir = {
  zaman: number;
  oturum: string;
  ziyaretci: string;
  tur: string;
  yol: string;
  ulke: string;
  veri: string;
};

type Depo = { yaz: (s: Satir[]) => void };
let depo: Depo | null | undefined;

async function ac(): Promise<Depo | null> {
  const yol = process.env.IZLEME_DB;
  if (!yol) return null;
  try {
    /* @types/node 20'de node:sqlite tipi yok; gereken iki yöntem elle tanımlı.
       Ad değişkenden: paketleyici modülü çözmeye kalkmasın, çalışma anında Node bulsun. */
    const ad = "node:sqlite";
    const { DatabaseSync } = (await import(/* webpackIgnore: true */ ad)) as {
      DatabaseSync: new (dosya: string) => { exec(sql: string): void; prepare(sql: string): { run(...deger: unknown[]): unknown } };
    };
    const db = new DatabaseSync(yol);
    db.exec(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS olaylar (
        id INTEGER PRIMARY KEY,
        zaman INTEGER NOT NULL,
        oturum TEXT NOT NULL,
        ziyaretci TEXT NOT NULL,
        tur TEXT NOT NULL,
        yol TEXT NOT NULL,
        ulke TEXT NOT NULL DEFAULT '',
        veri TEXT NOT NULL DEFAULT '{}'
      );
      CREATE INDEX IF NOT EXISTS olaylar_zaman ON olaylar (zaman);
      CREATE INDEX IF NOT EXISTS olaylar_tur_yol ON olaylar (tur, yol, zaman);
      CREATE INDEX IF NOT EXISTS olaylar_oturum ON olaylar (oturum, zaman);
    `);
    const ekle = db.prepare("INSERT INTO olaylar (zaman, oturum, ziyaretci, tur, yol, ulke, veri) VALUES (?, ?, ?, ?, ?, ?, ?)");
    return {
      yaz(satirlar) {
        db.exec("BEGIN");
        try {
          for (const s of satirlar) ekle.run(s.zaman, s.oturum, s.ziyaretci, s.tur, s.yol, s.ulke, s.veri);
          db.exec("COMMIT");
        } catch (e) {
          db.exec("ROLLBACK");
          throw e;
        }
      },
    };
  } catch (e) {
    console.error("izleme deposu açılamadı:", e);
    return null;
  }
}

export async function izlemeYaz(satirlar: Satir[]): Promise<boolean> {
  if (depo === undefined) depo = await ac();
  if (!depo) return false;
  depo.yaz(satirlar);
  return true;
}
