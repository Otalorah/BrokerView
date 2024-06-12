import type { DataArray, BrokerObject, FundObject } from "@scripts/types";

interface Data {
    [key: string]: any;
}

interface Mappings {
    [key: string]: [string, string];
}


function renderComponent(id: string, component: HTMLElement, text: string): void {

    component.querySelector<HTMLElement>(`#${id}`).textContent = text.trim();

}


function renderData(data: Data, component: HTMLElement, mappings: Mappings): void {

    for (const [key, [id, suffix]] of Object.entries(mappings)) {

        renderComponent(id, component, `${data[key]}${suffix}`);

    }

}


function createRenderFunction(mappings: Mappings) {
    return (data: Data, component: HTMLElement): void => renderData(data, component, mappings);
}


const renderDataBroker = createRenderFunction({
    inversion: ["amount-broker", " USDT"],
    mes: ["month", ""],
    ganancia_neta: ["profit-broker", " USDT"],
    porcentaje_ganancia: ["percentage", ""],
    lote: ["lote", ""],
    retiros: ["retreats", " USDT"]
});


const renderDataFund = createRenderFunction({
    saldo_actual: ["amount-fund", " COP"],
    fecha_corte: ["cutoff-date", ""],
    rendimientos: ["profit-fund", " COP"],
    aporte: ["contribution", " COP"],
    fecha_aporte: ["date-contribution", ""],
    saldo_anterior: ["previus-balance", " COP"]
});


function setSessionStorage(items: string[], values: Object[]) {

    if (sessionStorage.getItem('data-user')) return

    items.forEach((item, i) => sessionStorage.setItem(`data-${item}`, JSON.stringify(values[i])));

}


export function setHomePage(hasBroker: boolean, hasFund: boolean, responses: DataArray, component: HTMLElement) {

    const getLastRecord = (data: BrokerObject[] | FundObject[]) => data[data.length - 1];

    const items = ["user"];
    let renderBroker = false;
    let renderFund = false;

    if (hasBroker) {
        renderBroker = true;
        items.push('broker');
    }

    if (hasFund) {
        renderFund = true;
        items.push('fund');
    }

    const responsesFiltered = responses.filter((response) => response != null);
    setSessionStorage(items, responsesFiltered);

    const [user, broker, fund] = responses;

    if (broker) {
        const lastRecordBroker = getLastRecord(broker);
        renderDataBroker(lastRecordBroker, component);
    }

    if (fund) {
        const lastRecordFund = getLastRecord(fund);
        renderDataFund(lastRecordFund, component);
    }

    component.querySelector("#title").textContent += user.name;

}