import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
    public static DB_API_ENDPOINT: string = 'http://localhost:8080/api';
    public static TitleOfSite: string = "Events";

    constructor() {}
}