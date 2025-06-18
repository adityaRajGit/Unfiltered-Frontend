"use client";
import React from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { googleLogin, googleSignup } from "@/store/userSlice";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

export const GoogleSignUp = ({ role }: { role: string }) => {
    const router = useRouter();
    const dispatch = useDispatch()


    const handleLoginSuccess = async (response: CredentialResponse) => {
        const idToken = response.credential;
        const data = {
            idToken,
            role
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response2 = await dispatch(googleSignup(data as any) as any);
        if (response2?.error) {
            toast.error(response2.error.message)
        } else {
            toast.success("User Logged in Successfully")
            router.push('/')
        }
    };

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

    const handleLoginSuccess = async (response: CredentialResponse) => {
        const idToken = response.credential;
        const data = {
            idToken,
            role
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response2 = await dispatch(googleLogin(data as any) as any);
        if (response2?.error) {
            toast.error(response2.error.message);
        } else {
            toast.success('Account created successfully!');
            router.push('/');
        }
    };

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