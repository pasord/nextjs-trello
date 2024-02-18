import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPagge() {
    return (
        <OrganizationList
            hidePersonal // 隐藏个人
            afterSelectOrganizationUrl="/organization/:id" // 路由定义 :id 约定
            afterCreateOrganizationUrl="/organization/:id"
        />
    )
}