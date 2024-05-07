function filterDataByCutoffDate(data, date) {
    return data.filter((obj => obj.fecha_corte == date))
}


function getCutoffDate(data) {
    return [...new Set(data.map((element) => element.fecha_corte))]
}


function renderNewRows(data) {

    const $table = document.querySelector('#table-fund');

    data.forEach(element => {

        const values = Object.values(element).slice(1);

        for (let i = 0; i < values.length; i++) {
            const $liHTML = document.createElement('li');
            const value = values[i];

            $liHTML.textContent = value;
            $table.appendChild($liHTML);
        }

    });
}


function renderOptionsSelect(data) {

    const cutOffDates = getCutoffDate(data);
    const $selectHTML = document.querySelector('#cutoff-date');

    cutOffDates.forEach(element => {
        const $optionHTML = document.createElement('option');

        $optionHTML.value = element;
        $optionHTML.textContent = element;

        $selectHTML.appendChild($optionHTML);
    });

}


export function renderTable(data) {

    const firstCutoffDate = getCutoffDate(data)[0];
    const dataFiltered = filterDataByCutoffDate(data, firstCutoffDate);

    renderOptionsSelect(data)
    renderNewRows(dataFiltered)

}


export function enableEventHandlers(data) {

    const $table = document.querySelector('#table-fund');

    document.querySelector('#cutoff-date').onchange = e => {

        // Remove childrens
        const childrens = $table.children;

        for (let i = childrens.length - 1; i >= 5; i--) {
            $table.removeChild(childrens[i]);
        }

        // Add new childrens
        const { value: date, text } = e.target.selectedOptions[0]

        const dataFiltered = filterDataByCutoffDate(data, date);

        renderNewRows(dataFiltered)

    }

}