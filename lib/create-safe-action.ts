import { z } from "zod"

// 创建安全的action

// FiedlErrors传入对象T，T的key做属性，值是字符串数组
export type FieldErrors<T> = {
    [K in keyof T]: string[]
}

// ActionState 是action接口最终返回的数据结构
// TInput 用户输入的字段信息
// TOutput 结果数据
export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput> // 入参字段校验错误
    error?: string | null // 服务端error，db的error
    data?: TOutput // 服务端返回数据
}

// TInput 是 返回函数入参类型，还有handler入参类型。
// <ActionState<TInput, TOutput> 是 handler返回类型，还有返回返回的返回类型
// 返回函数 是 加了一层validate
export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>, // z.Schema todo
    handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const validationResult = schema.safeParse(data)
        if (!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten() as FieldErrors<TInput> // todo flatten
            }
        }

        return handler(validationResult.data)
    }
}

// flatten 拍平