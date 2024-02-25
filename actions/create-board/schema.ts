import { z } from "zod"

// schema 可理解为，字段相关的对象结构

// 入参字段对象结构
export const CreatBoard = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(3, {
        message: "Title is to short."
    }),
    image: z.string({
        required_error: "Image is required",
        invalid_type_error: "Image is required"
    })
})