"use client";
import { fbPageView } from "@/lib/PixelHelpers";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function usePageTracking() {
    const pathname = usePathname();

    useEffect(() => {
        fbPageView()
    }, [pathname]);
}
