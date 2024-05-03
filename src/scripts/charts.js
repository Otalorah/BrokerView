import Chart from "chart.js/auto";

const $htmlElement = document.documentElement;

Chart.defaults.borderColor = '#a9a9a977'


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


export function createChart(id, data) {
    const dataChart = {
        labels: data.map((element) => element.fecha_corte),
        datasets: [
            {
                label: "Saldo (COP)",
                data: data.map((element) => {
                    let str = element.saldo_actual;
                    str = str.slice(0, -4) + str.slice(-3);
                    return str;
                }),
                borderWidth: 1,
                backgroundColor: ['#00ff0066'],
                borderColor: ['#00ff00']
            },
            {
                label: "Aporte (COP)",
                data: data.map((element) => {
                    let str = element.aporte;
                    str = str.slice(0, -4) + str.slice(-3);
                    return str;
                }),
                borderWidth: 1,
                backgroundColor: ['#4488ee66'],
                borderColor: ['#4488ee']
            },
        ],
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
    };

    setColorCharts()

    new Chart(id, {
        type: "bar",
        data: dataChart,
        options: options,
    });
}