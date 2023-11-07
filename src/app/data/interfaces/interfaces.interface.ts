import { Time } from "@angular/common";
import { Address } from './autofill.interface';

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

export interface EventAPIResp {
    status: boolean;
    data:   Event[];
}

export interface Event {
    id_event:    number;
    name:        string;
    user_id:     number;
    category:    string;
    description: string;
    date:        Date;
    time:        string;
    address:     string;
    longitude:   number;
    latitude:    number;
    image:       string;
    created_at:  Date;
    updated_at: Date;
    username:    string;
}

export interface IbbAPIResp {
    data:    ImgData;
    success: boolean;
    status:  number;
}

export interface ImgData {
    id:          string;
    title:       string;
    url_viewer:  string;
    url:         string;
    display_url: string;
    width:       number;
    height:      number;
    size:        number;
    time:        number;
    expiration:  number;
    image:       Image;
    thumb:       Image;
    delete_url:  string;
}

export interface Image {
    filename:  string;
    name:      string;
    mime:      string;
    extension: string;
    url:       string;
}

export interface CountApiResp {
    status: boolean;
    data:   Count[];
}

export interface Count {
    name_category: string;
    amount: number; 
}
