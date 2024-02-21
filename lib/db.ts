import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

// 开发环境，避免重复 new PrismaClient
// because global is excluded from hot reload
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db
}