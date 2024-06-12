export type DataToken = {
    sub: string
    broker: boolean
    fund: boolean
    user_sheet: string
    exp: number
}

export type DataUser = {
    email: string
    lastname: string
    name: string
    username: string
}

export type BrokerObject = {
    año: string
    mes: string
    lote: string
    retiros?: string
    comision: string
    inversion: string
    ganancia_neta: string
    ganancia_bruta?: string
    porcentaje_ganancia: string
}

export type FundObject = {
    aporte: string
    fecha_aport: string
    fecha_corte: string
    rendimientos: string
    saldo_actual: string
    saldo_anterior: string
}

export type DataArray = [DataUser, BrokerObject[]?, FundObject[]?]