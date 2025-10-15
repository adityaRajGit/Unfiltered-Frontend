import { jwtDecode } from "jwt-decode";

export interface MyTokenPayload {
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


export function decodeToken(token: string): MyTokenPayload {
    return jwtDecode<MyTokenPayload>(token);
}