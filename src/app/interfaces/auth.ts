export interface LoginParams {
    username: string;
    password: string;
}

export interface RegisterParams {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface Account {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    accountNumber: string;
    [rest:string]:any
}