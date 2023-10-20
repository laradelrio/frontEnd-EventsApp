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