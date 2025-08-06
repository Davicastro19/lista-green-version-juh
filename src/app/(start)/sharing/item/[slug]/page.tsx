/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingSpinner from "@/components/loadin";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NegocioPage() {
    const router = useRouter()
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
        router.push(`/home/negocios/${params.slug as string}'`)
    }
  }, [params]);

  return<div className="flex justify-center items-center h-screen bg-white">
  <LoadingSpinner />
</div>
}
