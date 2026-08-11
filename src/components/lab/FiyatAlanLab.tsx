"use client";

import { useState } from "react";
import FiyatAlan1 from "@/components/lab/FiyatAlan1";
import FiyatAlan2 from "@/components/lab/FiyatAlan2";
import FiyatAlan3 from "@/components/lab/FiyatAlan3";
import { NEEDS, type NeedKey } from "@/components/lab/fiyatKart";

/* ============================================================================
   LAB · MAVİ BÖLÜM TURU — SÜRÜCÜ

   DURUM TEK, KONTROL ÜÇ.
   Geçen turda (MaviKartLab) seçici üç adayın ÜSTÜNDE tek bir satırdı. Bu turda
   değerlendirilen şey kartın yüzeyi değil BÖLÜMÜN TAMAMI, o yüzden çip satırı
   her adayın kendi zemininin içine girdi: çipin mavinin üstünde nasıl durduğu
   da adayın bir parçası ve dışarı alınsaydı üç aday da eksik görünürdü.

   Durum yine de tek yerde: bir adayda basılan çip üçünü birden çeviriyor.
   Müşteri aynı kalemi üç kez açmıyor ve üç tasarımın aynı duruma nasıl tepki
   verdiğini aynı anda görüyor.

   ADAYLAR SAF SUNUM: kendi durumları yok, seçili kalemleri prop olarak
   alıyorlar. Bir aday seçilip canlıya taşındığında taşınacak şey yalnızca
   bölümün kendisi oluyor.

   Künyeler (n1 · n2 · n3) sunucuda basılıp prop olarak geliyor: lab sayfasının
   düzyazısı sayfada kalsın, bu dosya yalnızca durumu taşısın.
   ========================================================================= */

export default function FiyatAlanLab({
  n1,
  n2,
  n3,
}: {
  n1: React.ReactNode;
  n2: React.ReactNode;
  n3: React.ReactNode;
}) {
  const [on, setOn] = useState<Record<NeedKey, boolean>>({
    banka: false,
    muhasebe: false,
    vize: false,
  });

  const toggle = (k: NeedKey) => setOn((s) => ({ ...s, [k]: !s[k] }));
  const picked = NEEDS.filter((n) => on[n.key]);

  return (
    <>
      {n1}
      <FiyatAlan1 on={on} toggle={toggle} picked={picked} />
      {n2}
      <FiyatAlan2 on={on} toggle={toggle} picked={picked} />
      {n3}
      <FiyatAlan3 on={on} toggle={toggle} picked={picked} />
    </>
  );
}
