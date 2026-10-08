import { redirect } from "next/navigation";

/* Eski adres (07.10.2026'da Murat Bey'e gönderilmiş olabilir): sorular
   /teyit/sorular'a taşındı. */
export default function TeyitKktcPage() {
  redirect("/teyit/sorular");
}
