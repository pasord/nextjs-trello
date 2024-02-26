"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

// ReturnType 是接口返回的结构类型
// InputType 入参类型
import { InputType, ReturnType } from "./types"
// 入参对象包含字段和校验相关
import { CreateBoard } from "./schema"


// handler 是 server action 接口函数
const handler = async (input: InputType): Promise<ReturnType> => {
    // 权限校验，未登录
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    // const canCreate todo
    // isPro

    const { title, image } = input
    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split('|')

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board." // 走到server了，都是服务端错误
        }
    }

    // 定义返回数据 board
    let board

    // db请求
    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            }
        })
    } catch (error) {
        return {
            error: "Failed to create." // 在server了，都是服务端错误
        }
    }

    revalidatePath(`/board/${board.id}`)
    return { data: board }
}

// 创建安全请求函数，给到组件使用
export const createBoard = createSafeAction(CreateBoard, handler)