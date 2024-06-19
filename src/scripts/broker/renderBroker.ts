import { renderTitles } from "@scripts/broker/titlesBroker";
import type { BrokerByYear } from "@scripts/types"

function enableEventHandlers(component: HTMLElement) {

    const $tapHeaders = component.querySelectorAll('.tap-header');
    const $pages = component.querySelectorAll('.page') as NodeListOf<HTMLElement>;

    $tapHeaders.forEach((tapHeader, i) => {

        tapHeader.addEventListener('click', () => {

            $tapHeaders.forEach(header => header.classList.remove('active'));
            tapHeader.classList.add('active');

            $pages.forEach(page => page.style.display = 'none')
            $pages[i].style.display = 'block'

        })

    })

}


function renderDivsTitle(position: number) {

    const positions = {
        1: { text: "Ganancia total", id: "total-profits" },
        2: { text: "Retiros", id: "retreats" },
        3: { text: "Ganancia restante", id: "profits-2024" }
    };

    const config = positions[position];

    const $divTitle = document.createElement("div");
    $divTitle.classList.add("div-2024");
    const $h3Title = document.createElement("h3");
    const $pTitle = document.createElement("p");

    $h3Title.textContent = config.text;
    $pTitle.id = config.id;

    $divTitle.appendChild($h3Title);
    $divTitle.appendChild($pTitle);

    return $divTitle;
}


function renderPage2024(component: HTMLElement) {

    // Render Li element
    const $tapHeadersContainer = component.querySelector('#tap-headers');
    const $li = document.createElement('li');
    $li.textContent = '2024';
    $li.classList.add('tap-header');
    $tapHeadersContainer.appendChild($li);

    // Render article element
    const $pagesContainer = component.querySelector('#pages');
    const $page = document.createElement('article');
    $page.classList.add('page');
    $page.id = 'page-2024';
    $pagesContainer.appendChild($page);

    // Render canvas element
    const $figure = document.createElement('figure');
    $figure.classList.add('canvas-container');
    const $canvas = document.createElement('canvas');
    $canvas.id = '2024';
    $figure.appendChild($canvas);
    $page.appendChild($figure);

    // Render title summary
    const $h2 = document.createElement('h2');
    $h2.textContent = "Resumen del año";
    $h2.classList.add('summary-title');
    $page.appendChild($h2)

    // Render titles container
    const $divTitles = document.createElement('div');
    $divTitles.classList.add("titles-broker-data");

    for (let i = 1; i <= 3; i++) {
        const $div = renderDivsTitle(i);
        $divTitles.appendChild($div);
    }

    $page.appendChild($divTitles);

    enableEventHandlers(component);

}


function setElementsHTML(year: string, component: HTMLElement) {

    const $header = component.querySelector('.tap-header');
    $header.classList.add('active');

    const $page = component.querySelector('.page') as HTMLElement;
    $page.style.display = 'block';

    const $canvasChart = component.querySelector('.canvas-container canvas');

    $header.textContent = year;
    $page.id = `page-${year}`;
    $canvasChart.id = year;


    const $h3FirstTitle = component.querySelector("#first-title h3"),
        $pFirstTitle = component.querySelector("#first-title p"),
        $h3SecondTitle = component.querySelector("#second-title h3"),
        $pSecondTitle = component.querySelector("#second-title p");

    let firstTitleText: string, firstTitleId: string, secondTitleText: string, secondTitleId: string;

    if (year === "2023") {

        firstTitleText = "Inversión inicial";
        firstTitleId = "investment";
        secondTitleText = "Total rendimientos";
        secondTitleId = "profits";

    } else {

        firstTitleText = "Ganancia Total";
        firstTitleId = "total-profits";
        secondTitleText = "Retiros";
        secondTitleId = "retreats";

        component.querySelector('.titles-broker-data').appendChild(renderDivsTitle(3));

    }

    $h3FirstTitle.textContent = firstTitleText;
    $pFirstTitle.id = firstTitleId;
    $h3SecondTitle.textContent = secondTitleText;
    $pSecondTitle.id = secondTitleId;

}


export function renderPages(dataByYear: BrokerByYear, component: HTMLElement) {

    if (!dataByYear.hasOwnProperty('2023')) {
        setElementsHTML("2024", component);
        renderTitles(dataByYear, component);
        return
    }

    renderPage2024(component);
    setElementsHTML("2023", component);
    renderTitles(dataByYear, component);

}