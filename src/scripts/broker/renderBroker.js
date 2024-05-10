function enableEventHandlers() {

    const $tapHeaders = document.querySelectorAll('.tap-header');
    const $pages = document.querySelectorAll('.tap-page');

    $tapHeaders.forEach((tapHeader, i) => {

        tapHeader.addEventListener('click', () => {

            $tapHeaders.forEach(header => header.classList.remove('active'));
            tapHeader.classList.add('active');

            $pages.forEach(page => page.style.display = 'none')
            $pages[i].style.display = 'block'

        })
    })

}


function setElementsHTML(year) {

    const $header = document.querySelector('.tap-header');
    $header.classList.add('active');

    const $page = document.querySelector('.tap-page');
    $page.style.display = 'block';

    const $canvasChart = document.querySelector('.canvas-container canvas');


    $header.textContent = year;
    $page.id = `page-${year}`;
    $canvasChart.id = year;

}


function renderCanvasChart() {

    const $article = document.querySelector('#page-2024');

    const $div = document.createElement('div');
    $div.classList.add('canvas-container');

    const $canvas = document.createElement('canvas');
    $canvas.id = '2024';

    $div.appendChild($canvas);
    $article.appendChild($div);
}


function renderPagesHTML() {

    const $tapHeadersContainer = document.querySelector('#tap-pages');

    const $article = document.createElement('article');
    $article.classList.add('tap-page');
    $article.id = 'page-2024';

    $tapHeadersContainer.appendChild($article);


}


function renderLiElement() {


    const $tapHeadersContainer = document.querySelector('#tap-headers');

    const $li = document.createElement('li');
    $li.textContent = '2024';
    $li.classList.add('tap-header');
    $tapHeadersContainer.appendChild($li);

}


function renderPages(data) {

    // If only has data from 2024
    if (!data.hasOwnProperty('2023')) {

        setElementsHTML("2024")
        return
    }

    setElementsHTML("2023")

    renderLiElement();
    renderPagesHTML();
    renderCanvasChart();

    enableEventHandlers();

}


export function transformDataByYear(dataList) {

    const data = {};
    const data2023 = [];
    const data2024 = [];

    dataList.forEach(element => {

        if (element.año == '2023') {
            data2023.push(element);
        }
        else if (element.año == '2024') {
            data2024.push(element);
        }

    });

    if (data2023.length == 0) {

        data["2024"] = data2024;
        renderPages(data);
        return data

    }

    data["2023"] = data2023;
    data["2024"] = data2024;

    renderPages(data);

    return data

}


