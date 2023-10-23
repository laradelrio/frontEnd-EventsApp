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