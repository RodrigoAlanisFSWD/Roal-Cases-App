export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    points?: number;
    mail_confirmed: boolean;
}

export type Tokens = {
    access_token: string;
    refresh_token: string;
}