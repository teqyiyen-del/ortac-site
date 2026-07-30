/* SWAP:STOCK_PHOTOS — example stock photography (Unsplash). Replace each URL
   with the client's own shoot; every consumer reads from this map only. */
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const PHOTO = {
  formation: U("1497366216548-37526070297c"),
  bank: U("1454165804606-c3d57bc86b40"),
  accounting: U("1450101499163-c8848c66ca85"),
  visa: U("1544620347-c4fd4a3d5957"),
  dubai: U("1512453979798-5ea266f8880c"),
} as const;

/* one per blog topic — the card media on the resources grid */
export const POST_PHOTO = {
  dubaiCost: U("1512453979798-5ea266f8880c", 900), // Dubai skyline
  ukTax: U("1529180184525-78f99adb5f4a", 900), // Westminster
  kktc: U("1507525428034-b723cf961d3e", 900), // Mediterranean coast
  corpTax: U("1554224155-6726b3ff858f", 900), // ledger and calculator
  bank: U("1601597111158-2fceff292cdc", 900), // bank hall
  visa: U("1544620347-c4fd4a3d5957", 900), // passport and boarding pass
} as const;

/* one photo per country — used behind the calculator result and on country cards */
export const COUNTRY_PHOTO: Record<"dubai" | "ingiltere" | "kktc", string> = {
  dubai: U("1512453979798-5ea266f8880c"),
  ingiltere: U("1533929736458-ca588d08c8be"), // Tower Bridge · London
  kktc: U("1507525428034-b723cf961d3e"), // Mediterranean coast — stand-in for Girne
};
