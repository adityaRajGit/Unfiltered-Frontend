"use client";
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { googleLogin, googleSignup } from "@/store/userSlice";
import { LoadingSpinnerWithOverlay } from "./global/Loading";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

export const GoogleSignUp = ({ role }: { role: string }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);


    const handleLoginSuccess = async (response: CredentialResponse) => {
        setLoading(true)
        const idToken = response.credential;
        const data = {
            idToken,
            role
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response2 = await dispatch(googleSignup(data as any) as any);
        if (response2?.error) {
            toast.error(response2.error.message)
            setLoading(false)
        } else {
            setLoading(false)
            toast.success("User Logged in Successfully")
            router.push('/')
        }
    };

    if (loading) {
        return (
            <LoadingSpinnerWithOverlay />
        )
    }

    return (
        <>
            <div className="w-full h-auto flex items-center justify-center mt-7">
                <div className="w-[80%]">
                    <GoogleOAuthProvider clientId={googleClientId}>
                        <div className="w-full h-10 bg-gray-300">
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                text="continue_with"
                            />
                        </div>
                    </GoogleOAuthProvider>
                </div>
            </div>
        </>
    );
};

export const GoogleSignIn = ({ role }: { role: string }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    const handleLoginSuccess = async (response: CredentialResponse) => {
        setLoading(true)
        const idToken = response.credential;
        const data = {
            idToken,
            role
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response2 = await dispatch(googleLogin(data as any) as any);
        if (response2?.error) {
            toast.error(response2.error.message);
            setLoading(false);
        } else {
            setLoading(false);
            toast.success('User Logged in Successfully!');
            router.push('/');
        }
    };

    if (loading) {
        return (
            <LoadingSpinnerWithOverlay />
        )
    }

    return (
        <>
            <div className="w-full h-auto flex items-center justify-center mt-7">
                <div className="w-[80%]">
                    <GoogleOAuthProvider clientId={googleClientId}>
                        <div className="w-full h-10 bg-gray-300">
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                text="signin_with"
                            />
                        </div>
                    </GoogleOAuthProvider>
                </div>
            </div>
        </>
    );
};