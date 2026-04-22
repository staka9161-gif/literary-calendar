"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTodayMMDD } from "@/lib/formatDate";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const today = getTodayMMDD();
    router.replace(`/d/${today}`);
  }, [router]);

  return null;
}
