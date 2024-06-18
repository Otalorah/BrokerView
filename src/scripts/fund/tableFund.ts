import type { Fund } from "@scripts/types";

function filterDataByCutoffDate(data: Fund[], date: string) {
    return data.filter((obj => obj.fecha_corte == date))
}


function getCutoffDate(data: Fund[]) {
    return [...new Set(data.map((element) => element.fecha_corte))]
}


function renderNewRows(data: Fund[], component: HTMLElement) {

    const $table = component.querySelector('#table-fund');

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


function renderOptionsSelect(data: Fund[], component: HTMLElement) {

    const cutOffDates = getCutoffDate(data);
    const $selectHTML = component.querySelector('#cutoff-date');

    cutOffDates.forEach(element => {

        const $optionHTML = document.createElement('option');

        $optionHTML.value = element;
        $optionHTML.textContent = element;

        $selectHTML.appendChild($optionHTML);

    });

}


export function renderTable(data: Fund[], component: HTMLElement) {

    const firstCutoffDate = getCutoffDate(data)[0];
    const dataFiltered = filterDataByCutoffDate(data, firstCutoffDate);

    renderOptionsSelect(data, component)
    renderNewRows(dataFiltered, component)

}


export function enableEventHandlers(data: Fund[], component: HTMLElement) {

    const $table = component.querySelector('#table-fund');
    const $selectElement = component.querySelector('#cutoff-date');

    if (!($table instanceof HTMLElement) || !($selectElement instanceof HTMLSelectElement)) return

    $selectElement.onchange = e => {

        // Remove childrens
        const childrens = $table.children;

        for (let i = childrens.length - 1; i >= 5; i--) {
            $table.removeChild(childrens[i]);
        }

        const $selectElement = e.target;
        if (!($selectElement instanceof HTMLSelectElement)) return

        // Add new childrens
        const { value: date } = $selectElement.selectedOptions[0]

        const dataFiltered = filterDataByCutoffDate(data, date);

        renderNewRows(dataFiltered, component)

    }

}