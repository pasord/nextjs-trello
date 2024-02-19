"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useOrganizationList } from "@clerk/nextjs"

// 空内容组件，用来执行逻辑
// 跟句地址组织id，设置当前active的组织id
// 联动所有依赖当前活跃organizationId的地方
// 在useOrganization拿到当前活跃组织的信息
export const OrgControl = () => {
    const { organizationId } = useParams()
    const { setActive } = useOrganizationList()

    // todo
    useEffect(() => {
        if (!setActive) return // 边界处理
        console.log(111, organizationId);


        setActive({
            organization: organizationId as string
        })
    }, [setActive, organizationId])

    return null
}

