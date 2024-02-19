

import { OrgControl } from "./_components/org-control"

const OrganizationIdLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}

export default OrganizationIdLayout

// 布局：具体的组织详情模块