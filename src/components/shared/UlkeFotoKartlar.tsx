/* ÜLKE FOTOĞRAF KARTLARI (10.10.2026 · css/ulke-foto.css · .ufk-).
   İş ortaklığı sayfasındaki üç ülke kartının ortak hâli; Burak beğenip başka
   yerde de kullanılmasını istedi. Kart: zeminde ülke fotoğrafı (lib/media ·
   COUNTRY_PHOTO), altta bayrak + ad + küçük çip, tek satır açıklama; tamamı
   ülke sayfasına bağlantı. Metin çağıran yerden geliyor, burada cümle yok. */
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_PHOTO } from "@/lib/media";
import type { CountrySlug } from "@/lib/brand";

export type UlkeFotoKart = { slug: CountrySlug; ad: string; cip?: string; line: string; href: string };

export default function UlkeFotoKartlar({ items, className }: { items: UlkeFotoKart[]; className?: string }) {
  return (
    <ul className={className ? `ufk ${className}` : "ufk"}>
      {items.map((u) => (
        <li key={u.slug}>
          <SmartLink href={u.href} className="ufk-k">
            <Image src={COUNTRY_PHOTO[u.slug]} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="ufk-img" />
            <span className="ufk-ok" aria-hidden="true">
              <ArrowUpRight size={18} strokeWidth={2} />
            </span>
            <span className="ufk-m">
              <span className="ufk-ust">
                <span className="ufk-bayrak">
                  <Flag country={u.slug} />
                </span>
                <b>{u.ad}</b>
                {u.cip && <span className="ufk-cip">{u.cip}</span>}
              </span>
              <span className="ufk-p">{u.line}</span>
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
