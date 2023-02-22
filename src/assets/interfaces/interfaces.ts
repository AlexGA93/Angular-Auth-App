export interface loginPayload {
    email       : string;
    password    : string;
}

/**
 * authentication will send back a boolean status with two possibillities:
 * 1 - JWT
 * 2 - {id, name, email }
 */
export interface AuthResponse {
    ok_status   : boolean;
    token?      : string;
    id?         : string;
    name?       : string;
    email?      : string;
}

export interface registerPayload {
    name        : string;
    email       : string;
    password    : string;
    password2   : string;
}

export interface User {
    uid     : string;
    name    : string;
    email   : string;
}