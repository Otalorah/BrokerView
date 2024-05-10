import Chart from "chart.js/auto";


const $htmlElement = document.documentElement;

Chart.defaults.borderColor = '#a9a9a977';


function setColorCharts() {
    if ($htmlElement.className == 'light') {
        Chart.defaults.color = '#000'
    } else {
        Chart.defaults.color = '#fff'
    }
}


function setFontChart() {

    const actualWidth = window.innerWidth

    if (actualWidth < 613) {
        Chart.defaults.font.size = 9
        return 12
    }
    else if (actualWidth < 472) {
        Chart.defaults.font.size = 8.4
        return 12
    }
    return 15
}


function changeColorCharts(color) {
    Object.values(Chart.instances).forEach((chart) => {
        chart.options.scales.x.ticks.color = color
        chart.options.scales.y.ticks.color = color
        chart.legend.options.labels.color = color
        chart.update()
    })
}


const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if ($htmlElement.className == 'light') {
                changeColorCharts('#000')
            } else {
                changeColorCharts('#fff')
            }
        }
    });
})

observer.observe($htmlElement, { attributes: true })


function createChart(data, id) {

    const dataChart = {

        labels: data.map((element) => element.mes),

        datasets: [
            {
                label: 'inversión (USDT)',
                data: data.map((element) => element.inversion),
                borderWidth: 1,
                backgroundColor: ['#1fe60077'],
                borderColor: ['#1fe600']

            },
            {
                label: 'Ganancia neta (USDT)',
                data: data.map((element) => element.ganancia_neta),
                borderWidth: 1,
                backgroundColor: ['#ffdd0088'],
                borderColor: ['#ffdd00']
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            color: {
                forceOverride: true
            },
            legend: {
                labels: {
                    font: {
                        size: setFontChart()
                    }
                }
            }
        },
        maintainAspectRatio: false
    }

    setColorCharts()

    new Chart(id, {
        type: "bar",
        data: dataChart,
        options: options,
    });
}


export function renderCharts(data) {

    if (!data.hasOwnProperty('2023')) {
        createChart(data['2024'], '2024')
        return
    }

    createChart(data['2023'], '2023');
    createChart(data['2024'], '2024');

}