import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

// 定义Action函数类型
type Action<TInput, TOutput> = (input: TInput) => Promise<ActionState<TInput, TOutput>>

// 定义Action选项类型
interface UseActionOptions<TOutput> {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: string) => void;
    onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionOptions<TOutput> = {}
) => {
    // 入参字段校验错误
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined)
    // 服务端db错误
    const [error, setError] = useState<string | undefined>(undefined)
    // 服务端返回数据
    const [data, setData] = useState<TOutput | undefined>(undefined)
    // loading
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // action 执行的函数，包含服务端db调用，错误及data数据的State赋值
    const execute = useCallback(
        async (input: TInput) => {
            // 加loading，发起请求
            setIsLoading(true)

            try {
                const result = await action(input)

                if (!result) {
                    return
                }
                // 设置值和重置undefined，调用地方的组件，会根据fieldErrors 做判断
                setFieldErrors(result.fieldErrors)

                // 服务端错误
                if (result.error) {
                    setError(result.error)
                    options.onError?.(result.error)
                }
                // 服务端返回data
                if (result.data) {
                    setData(result.data)
                    options.onSuccess?.(result.data)
                }
            } finally {
                setIsLoading(false)
                options.onComplete?.()
            }
        },
        [action, options]
    )

    // 返回执行函数和其它状态变量
    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading
    }
}