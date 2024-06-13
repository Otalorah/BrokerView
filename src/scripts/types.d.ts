export interface DataToken {
    sub: string
    broker: boolean
    fund: boolean
    user_sheet: string
    exp: number
}


export interface DataUser {
    email: string
    lastname: string
    name: string
    username: string
}


export interface DataUserCreate extends DataUser {
    password: string
    password2: string
    lastname2: string
}


export interface Broker {
    año: string;
    mes: string;
    lote: string;
    retiros?: string;
    comision: string;
    inversion: string;
    ganancia_neta: string;
    ganancia_bruta?: string;
    porcentaje_ganancia: string
}


export interface Fund {
    aporte: string;
    fecha_corte: string;
    fecha_aporte: string;
    saldo_anterior: string;
    rendimientos: string;
    saldo_actual: string;
}


export type DataArray = [DataUser, Broker[]?, Fund[]?]


export class Convert {
    public static toBroker(json: string): Broker[] {
        return JSON.parse(json);
    }

    public static brokerToJson(value: Broker[]): string {
        return JSON.stringify(value);
    }
    public static toFund(json: string): Fund[] {
        return JSON.parse(json);
    }

    public static fundToJson(value: Fund[]): string {
        return JSON.stringify(value);
    }
}


export interface Mappings {
    [key: string]: [string, string];
}


export interface ErrorAPI {
    detail: string
}


export type AccessToken = { token: string, token_type: "bearer" }


export interface CorrectAPI {
    redirect: string
    access_token: AccessToken
}


export interface EmailUser {
    email: string
}


export interface CodeUser extends EmailUser {
    code: string
}