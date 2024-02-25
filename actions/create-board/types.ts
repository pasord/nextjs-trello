import { z } from "zod"
// Board 模型字段类型，返回用
import { Board } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"

// 入参对象，包含zod校验
import { CreatBoard } from "./schema"

// 入参类型
export type InputType = z.infer<typeof CreatBoard> // CreateBoard 作为 TInput 输入
// ReturnType 是接口返回的结构类型, ActionState就是接口返回的对象结构
export type ReturnType = ActionState<InputType, Board> // Board 作为TOutput 服务端返回

// infer 推断 的类型结构

// type InputType = {
//     title: string;
//     image: string;
// }

// type ReturnType = {
//     fieldErrors?: FieldErrors<{
//         title: string;
//         image: string;
//     }> | undefined;
//     error?: string | null | undefined;
//     data?: {
//         id: string;
//         title: string;
//     } | undefined;
// }