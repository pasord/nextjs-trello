"use client"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    // 从store里返回需要的方法和属性
    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)
    const isOpen = useMobileSidebar((state) => state.isOpen)

    // 初始挂载
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // 地址变化副作用
    useEffect(() => {
        onClose() // onClose也得传进来，才能用吧
    }, [pathname, onClose])

    // 还没挂载返回null
    if (!isMounted) {
        return null
    }

    return (
        <>
            {/* 控制打开/隐藏的按钮 */}
            <Button
                onClick={onOpen}
                className="block md:hidden mr-2"
                variant="ghost"
                size="sm"
            >
                <Menu className="h-4 w-4" />
            </Button>
            {/* 抽屉 */}
            <Sheet
                open={isOpen}
                onOpenChange={onClose}
            >
                <SheetContent>
                    <Sidebar
                        storageKey="t-sidebar-mobile-state"
                    />
                </SheetContent>
            </Sheet>
        </>
    )
}