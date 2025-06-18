import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
    userId: {
        name: string;
        email: string;
        _id: string;
        phone: string;
        username: string;
        profile_pic: string;
    };
    iat: number;
    role: string;
}


export function decodeToken(token: string): MyTokenPayload {
    return jwtDecode<MyTokenPayload>(token);
}