"use client"

// *Client Component

import { UserButton } from "@clerk/nextjs"

const ProtectedPage = () => {

    return (
        <div>
            <UserButton
                afterSignOutUrl="/"
            />
        </div>
    )
}

export default ProtectedPage


// "use client"

// // *Client Component

// import { useAuth, useUser } from "@clerk/nextjs"

// const ProtectedPage = () => {
//     const { userId } = useAuth()
//     const { user } = useUser()

//     return (
//         <div>
//             User: {user?.firstName}
//             <br />
//             userId: {userId}
//         </div>
//     )
// }

// export default ProtectedPage



// *Server Component
// import { auth, currentUser } from "@clerk/nextjs"

// const ProtectedPage = async () => {
//     const user = await currentUser()
//     const { userId } = auth()

//     return (
//         <div>
//             User: {user?.firstName}
//             <br />
//             userId: {userId}
//         </div>
//     )
// }

// export default ProtectedPage