"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useOrganizationList } from "@clerk/nextjs"

// 空内容组件，用来执行逻辑
// 跟句地址组织id，设置当前active的组织id
export const OrgControl = () => {
    const params = useParams()
    const { setActive } = useOrganizationList()

    // todo
    useEffect(() => {
        if (!setActive) return // 边界处理

        // setActive({
        //     organization: params.organizationId as string
        // })
    }, [setActive, params.organizationId])

    return null
}

