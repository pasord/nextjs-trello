import { XCircle } from "lucide-react";

// errors 是字符串数组
interface FormErrorsProps {
    id: string
    errors?: Record<string, string[] | undefined>
}

export const FormErrors = ({
    id, // id就是input对应的某个字段
    errors
}: FormErrorsProps) => {
    // 不需要展示errors
    if (!errors) {
        return null
    }

    return (
        <div
            id={`${id}-error`}
            aria-live="polite"
            className="mt-2 text-xs text-rose-500"
        >
            {errors?.[id]?.map((error: string) => (
                <div
                    key={error}
                    className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
                >
                    <XCircle className="h-4 w-4 mr-2" />
                    {error}
                </div>
            ))}
        </div>
    )
}

// aria-live 属性表示该区块内的内容是实时的，内容的详细变化都会报读。
// aria-live=”polite” 更新内容应当在适当时刻报读，比如在用户停止输入时。


