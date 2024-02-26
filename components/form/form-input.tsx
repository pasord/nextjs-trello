"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils" // 处理动态样式
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { FormErrors } from "./form-errors"

interface FormInputProps {
    id: string // id就是input对应的某个字段
    label?: string
    type?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    errors?: Record<string, string[] | undefined>
    className?: string
    defaultValue?: string
    onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue = "",
    onBlur
}, ref) => {
    const { pending } = useFormStatus()

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-xs font-semibold text-neutral-700"
                    >
                        {label}
                    </Label>
                ) : null}
                <Input
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    ref={ref}
                    required={required}
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    disabled={pending || disabled}
                    className={cn(
                        "text-sm px-2 py-1 h-7",
                        className
                    )}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
})

FormInput.displayName = "FormInput"

// aria-describedby
// 它与元素的id一起使用，除了标签之外，还可以为表单字段添加更多的信息。aria-describedby ，可以用来为一个字段提供所需格式的例子，例如日期，或者为一个表单字段添加错误信息。

