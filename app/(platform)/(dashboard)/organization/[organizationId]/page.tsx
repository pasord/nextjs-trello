import { OrganizationSwitcher, auth } from "@clerk/nextjs"

const OrganizationIdPage = () => {
    const { orgId } = auth()
    return (
        <div>
            OrganizationId: {orgId}
            {/* <OrganizationSwitcher
                hidePersonal
            /> */}
        </div>
    )
}

export default OrganizationIdPage