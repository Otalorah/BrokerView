import type { Broker, BrokerByYear } from "@scripts/types"
import Chart from "chart.js/auto";

const $htmlElement = document.documentElement;

Chart.defaults.borderColor = '#a9a9a977';


function setColorCharts() {

    if ($htmlElement.className == 'light') Chart.defaults.color = '#000';
    else Chart.defaults.color = '#fff';

}


function setFontChart() {

    const actualWidth = window.innerWidth;

    if (actualWidth < 613) {
        Chart.defaults.font.size = 9;
        return 12
    }
    else if (actualWidth < 472) {
        Chart.defaults.font.size = 8.4;
        return 12
    }
    return 15
}


function changeColorCharts(color: string) {
    Object.values(Chart.instances).forEach((chart) => {
        chart.options.scales.x.ticks.color = color;
        chart.options.scales.y.ticks.color = color;
        chart.legend.options.labels.color = color;
        chart.update();
    })
}


const observer = new MutationObserver((mutations) => {

    mutations.forEach(mutation => {

        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {

            if ($htmlElement.className == 'light') {
                changeColorCharts('#000');
            } else {
                changeColorCharts('#fff');
            }

        }

    });

})

observer.observe($htmlElement, { attributes: true })


function createChart(id: string, data: Broker[]) {

    const dataChart = {

        labels: data.map((element) => element.mes),

        datasets: [
            {
                label: 'inversión USDT',
                data: data.map((element) => element.inversion),
                borderWidth: 1,
                backgroundColor: '#1fe60077',
                borderColor: '#1fe600'

            },
            {
                label: 'Ganancia neta USDT',
                data: data.map((element) => element.ganancia_neta),
                borderWidth: 1,
                backgroundColor: '#ffdd0088',
                borderColor: '#ffdd00'
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                min: 0
            },
        },
        plugins: {
            color: {
                forceOverride: true
            },
            legend: {
                labels: {

                    boxWidth: 40,
                    boxHeight: 16,

                    font: {
                        size: setFontChart()
                    }

                }
            }
        },
        maintainAspectRatio: false
    };

    setColorCharts();

    new Chart(id, {
        type: "bar",
        data: dataChart,
        options: options,
    });
}


export function renderCharts(dataByYear: BrokerByYear) {

    createChart('2024', dataByYear['2024']);

    if (!dataByYear.hasOwnProperty('2023')) return

    createChart('2023', dataByYear['2023']);

}