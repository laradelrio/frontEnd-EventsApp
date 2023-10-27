import { Time } from "@angular/common";

export interface Register{
    username: string,
    email: string,
    password: string,
    passwordConfirmed: string,
}

export interface Form {
    name: string, 
    label: string,
    type: string,
}

export interface ApiResp {
    status: boolean;
    message: string;
}

export interface JWT {
    status?: boolean;
    message?: string;
    type?: string;
    data?: Data;
}

export interface Data{
    token: string
}

export interface DecodedToken{
    iat: number;
    id_user: number; 
}

export interface UserData{
    data: {
        email: string;
        image?: Blob;
        username: string;
    };
    status: boolean;
}
export interface Modal{
    name: string;
    title: string;
    msg: string;
    confirmBtnName: string;
}

export interface Event{
    name: string;
    userId: number;
    category: string,
    description: string;
    date: string;
    time: string;
    location:string;
}

