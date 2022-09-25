import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private TOKEN_KEY: string = 'QWERTY___AUTH_TOKEN';
    private TOKEN_VALUE: string = null;

    constructor() { }

    get TOKEN() {
        let token = this.TOKEN_VALUE;
        if (!token) {
            token = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
            if (token) {
                this.TOKEN_VALUE = token;
            }
        }
        return token;
    }

    login(token: string) {
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
        this.TOKEN_VALUE = token;
    }

    logout() {
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(null));
        this.TOKEN_VALUE = null;
    }
}