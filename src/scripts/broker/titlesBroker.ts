import type { Broker, BrokerByYear } from "@scripts/types"

function getDataByProperty(data: Broker[], property: string): string[] {
    return data.map((obj => obj[property]))
}


function sumValues(data: string[]) {

    let result = 0;
    data.forEach(num => result += parseInt(num));
    return result

}


function renderValues2023(data: Broker[], component: HTMLElement) {

    const initialInvestment = getDataByProperty(data, "inversion")[0];
    const profitsList = getDataByProperty(data, "ganancia_neta");

    component.querySelector('#investment').textContent = initialInvestment + ' USDT';
    component.querySelector('#profits').textContent = sumValues(profitsList) + ' USDT';

}


function renderValues2024(data: Broker[], component: HTMLElement) {

    const profitsList = getDataByProperty(data, "ganancia_neta");
    const retreatsList = getDataByProperty(data, "retiros");

    const totalProfits = sumValues(profitsList);
    const totalRetreats = sumValues(retreatsList);
    const actualProfit = totalProfits - totalRetreats;

    component.querySelector('#total-profits').textContent = totalProfits + ' USDT';
    component.querySelector('#retreats').textContent = totalRetreats + ' USDT';
    component.querySelector('#profits-2024').textContent = actualProfit + ' USDT';

}


export function renderTitles(dataByYear: BrokerByYear, component: HTMLElement) {

    renderValues2024(dataByYear["2024"], component)

    if (!dataByYear.hasOwnProperty('2023')) return

    renderValues2023(dataByYear["2023"], component)

}