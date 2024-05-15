function renderDataBroker(data, component) {

    const $amount = component.querySelector('#amount-broker');
    $amount.textContent = `inversión: ${data.inversion} (USDT)`;

    const $lastCutoffDate = component.querySelector('#last-month');
    $lastCutoffDate.textContent = data.mes;

}


function renderDataFund(data, component) {

    const $amount = component.querySelector('#amount-fund');
    $amount.textContent = `Saldo: ${data.saldo_actual} (COP)`;


    const $lastCutoffDate = component.querySelector('#last-cutoff-date')
    $lastCutoffDate.textContent = data.fecha_corte
}


function setSessionStorage(items, values) {

    const dataCacheUser = sessionStorage.getItem('data-user');

    if (dataCacheUser) return

    items.forEach((item, i) => {
        sessionStorage.setItem(`data-${item}`, JSON.stringify(values[i]));
    });

}


export function setHomePage(hasBroker, hasFund, responses, component) {

    const getLastRecord = data => data[data.length - 1];

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

    const [user, broker, fund] = responses.map(response => response || []);

    if (renderBroker) {
        const lastRecordBroker = getLastRecord(broker);
        renderDataBroker(lastRecordBroker, component);
    }

    if (renderFund) {
        const lastRecordFund = getLastRecord(fund);
        renderDataFund(lastRecordFund, component);
    }

    component.querySelector("#title").textContent += user.name;
}
