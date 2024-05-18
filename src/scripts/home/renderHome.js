function renderComponent(id, component, text) {

    const $component = component.querySelector(`#${id}`);
    $component.textContent = text.trim();

}


function renderData(data, component, mappings) {

    for (const [key, [id, suffix]] of Object.entries(mappings)) {
        renderComponent(id, component, `${data[key]}${suffix}`);
    }

}


function renderDataBroker(data, component) {

    const mappings = {
        inversion: ["amount-broker", " USDT"],
        mes: ["month", ""],
        ganancia_neta: ["profit-broker", " USDT"],
        ganancia_bruta: ["gross-profit", " USDT"],
        porcentaje_ganancia: ["percentage", ""],
        lote: ["lote", ""],
        retiros: ["retreats", " USDT"]
    };

    renderData(data, component, mappings);

}


function renderDataFund(data, component) {

    const mappings = {
        saldo_actual: ["amount-fund", " COP"],
        fecha_corte: ["cutoff-date", ""],
        rendimientos: ["profit-fund", " COP"],
        aporte: ["contribution", " COP"],
        fecha_aporte: ["date-contribution", ""],
        saldo_anterior: ["previus-balance", " COP"]
    };

    renderData(data, component, mappings);

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
