"use client"
import UserProfilePage from '@/component/account/UserAccount'
import { useState } from 'react'

function Page() {
    const [userRole] = useState('user')

    return (
        <>
            {
                userRole === 'user'
                    ? <UserProfilePage />
                    : null
            }
        </>
    )
}

export default Page