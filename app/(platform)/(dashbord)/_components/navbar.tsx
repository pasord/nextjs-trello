import { Plus } from "lucide-react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
            {/* MobileSidebar todo */}
            {/* left part */}
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                {/* breakpoints */}
                <Button variant="primary" size="sm" className="hidden md:block rounded-sm  h-auto py-1.5 px-2">
                    Create
                </Button>
                <Button variant="primary" size="sm" className="block md:hidden rounded-sm">
                    <Plus />
                </Button>
            </div>
            {/* right part */}
            <div className="ml-auto flex items-center gap-x-2">
                {/* from clerk */}
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/organization/:id" // 去组织详情页
                    afterLeaveOrganizationUrl="/select-org" // 去组织选择页
                    afterSelectOrganizationUrl="/organization/:id" // 去组织详情页
                    appearance={{ // 调试下ui
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }
                    }}
                />
                {/* from clerk */}
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30
                            }
                        }
                    }}
                />
            </div>
        </nav>
    )
}