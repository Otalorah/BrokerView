export function renderDataBroker(data, component) {

    const $amount = component.querySelector('#amount-broker');
    $amount.textContent = `inversión: ${data.inversion} (USDT)`;

    const $lastCutoffDate = component.querySelector('#last-month');
    $lastCutoffDate.textContent = data.mes;

}


export function renderDataFund(data, component) {

    const $amount = component.querySelector('#amount-fund');
    $amount.textContent = `Saldo: ${data.saldo_actual} (COP)`;


    const $lastCutoffDate = component.querySelector('#last-cutoff-date')
    $lastCutoffDate.textContent = data.fecha_corte
}