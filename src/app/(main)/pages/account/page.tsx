"use client"
import TherapistProfile from '@/component/account/TherapistAccount';
import UserProfilePage from '@/component/account/UserAccount'
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading';
import { decodeToken } from '@/utils/decodeToken';
import { TOKEN } from '@/utils/enum';
import { useEffect, useState } from 'react'

interface User {
    userId: {
        name: string;
        email: string;
        _id: string;
        phone: string;
        username: string;
        profile_image: string;
        role: string
    };
    iat: number;
    role: string;
}

function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN) : null;

    useEffect(() => {
        if (storedToken !== null) {
            const decodedToken = decodeToken(storedToken as string);
            if (decodedToken?.userId) {
                setUser(decodedToken);
            }
        }
        setLoading(false);
    }, [storedToken])

    if (loading) {
        return (
            <LoadingSpinnerWithOverlay />
        )
    }

    return (
        <>
            {
                user?.userId?.role === 'user' || user?.userId?.role === 'employee'
                    ? <UserProfilePage />
                    : <TherapistProfile />
            }
        </>
    )
}

export default Page