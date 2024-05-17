function getDataByProperty(data, property) {
    return data.map((obj => obj[property]))
}


function sumValues(data) {

    let result = 0;
    data.forEach(num => result += parseInt(num));
    return result

}


function renderValues2023(data, component) {

    const initialInvestment = getDataByProperty(data, "inversion")[0];
    const profitsList = getDataByProperty(data, "ganancia_neta");

    component.querySelector('#investment').textContent = initialInvestment + ' USDT';
    component.querySelector('#profits').textContent = sumValues(profitsList) + ' USDT';

}


function renderValues2024(data, component) {

    const profitsList = getDataByProperty(data, "ganancia_neta");
    const retreatsList = getDataByProperty(data, "retiros");

    const totalProfits = sumValues(profitsList);
    const totalRetreats = sumValues(retreatsList);
    const actualProfit = totalProfits - totalRetreats;

    component.querySelector('#total-profits').textContent = totalProfits + ' USDT';
    component.querySelector('#retreats').textContent = totalRetreats + ' USDT';
    component.querySelector('#profits-2024').textContent = actualProfit + ' USDT';

}


export function renderTitles(data, component) {

    if (!data.hasOwnProperty('2023')) {

        renderValues2024(data["2024"], component)
        return
    }

    renderValues2023(data["2023"], component)
    renderValues2024(data["2024"], component)

}