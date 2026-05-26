"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/NavItems";

export function PageTitle() {
    const pathname = usePathname();
    const currentItem = NAV_ITEMS.find((item) => item.href === pathname);

    return <>{currentItem?.name || "하나루프"}</>
}