"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
// import { Separator } from "@radix-ui/react-separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion } from "@/components/ui/accordion"

import { NavItem, Organization } from "./nav-item"

// 定义组件props类型
interface SidebarProps {
    storageKey?: string
}

export const Sidebar = ({
    storageKey = "t-sidebar-state" // 默认,与mobile-sidebar不同
}: SidebarProps) => {
    // 储存sidebar展开收起的状态, Mobile组件也用到
    // expanded: {'abcs': true}
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    )

    // 获取当前的组织（clerk文档）
    const {
        organization: activeOrganization,
        isLoaded: isLoadedOrg
    } = useOrganization()

    // 获取组织列表（clerk文档）
    const {
        userMemberships,
        isLoaded: isLoadedList
    } = useOrganizationList({
        userMemberships: {
            infinite: true // 全部todo
        }
    })

    // 初始化手风琴所需要数据, 返回元素为true的key的数组
    const defaultAccordionValue: string[] = Object.keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key)
            }
            return acc
        }, [])

    // 开启手风琴
    const onExpand = (id: string) => {
        setExpanded((curr) => {
            return {
                ...curr, // 当前最新的
                [id]: !expanded[id] // 去反，如果存在进行覆盖，不存在进行添加
            }
        })
    }

    // 骨架屏区域，还未loaded或正在loading 
    if (!isLoadedOrg || !isLoadedList || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                </div>
            </>
        )
    }

    // 主区域
    return (
        <>
            {/* 标题 */}
            <div className=" font-medium text-xs flex items-center mb-1">
                <span className=" pl-4">
                    Workspaces
                </span>
                <Button
                    asChild
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto" // 右对齐
                >
                    <Link href="/select-org">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            {/* 手风琴 */}
            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className=" space-y-2"
            >
                {/* list渲染 */}
                {userMemberships.data.map(({ organization }) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    )
}