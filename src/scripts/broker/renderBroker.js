function enableEventHandlers(component) {

    const $tapHeaders = component.querySelectorAll('.tap-header');
    const $pages = component.querySelectorAll('.page');

    $tapHeaders.forEach((tapHeader, i) => {

        tapHeader.addEventListener('click', () => {

            $tapHeaders.forEach(header => header.classList.remove('active'));
            tapHeader.classList.add('active');

            $pages.forEach(page => page.style.display = 'none')
            $pages[i].style.display = 'block'

        })
    })

}


function renderPage2024(component) {

    // Render Li element
    const $tapHeadersContainer = component.querySelector('#tap-headers');

    const $li = document.createElement('li');
    $li.textContent = '2024';
    $li.classList.add('tap-header');
    $tapHeadersContainer.appendChild($li);

    // Render article element
    const $pagesContainer = component.querySelector('#pages');

    const $article = document.createElement('article');
    $article.classList.add('page');
    $article.id = 'page-2024';

    $pagesContainer.appendChild($article);

    // Render canvas element
    const $div = document.createElement('div');
    $div.classList.add('canvas-container');

    const $canvas = document.createElement('canvas');
    $canvas.id = '2024';

    $div.appendChild($canvas);
    $article.appendChild($div);

    enableEventHandlers(component);

}


function setElementsHTML(year, component) {

    const $header = component.querySelector('.tap-header');
    $header.classList.add('active');

    const $page = component.querySelector('.page');
    $page.style.display = 'block';

    const $canvasChart = component.querySelector('.canvas-container canvas');

    $header.textContent = year;
    $page.id = `page-${year}`;
    $canvasChart.id = year;

}


export function renderPages(data, component) {

    // If only has data from 2024
    if (!data.hasOwnProperty('2023')) {

        setElementsHTML("2024", component);
        return
    }

    setElementsHTML("2023", component);
    renderPage2024(component);

}