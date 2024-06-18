import type { Fund } from "@scripts/types";

function getDataByProperty(data: Fund[], property: string): string[] {
    return data.map((obj => obj[property]))
}


function convertNumToString(num: number) {

    const numStr = num.toString();

    const division = numStr.length - 3;

    const firstPart = numStr.substring(0, division)
    const secondPart = numStr.substring(division)

    return firstPart + '.' + secondPart

}


function sumValues(list: string[]) {

    let result = 0;

    list.forEach(num => {
        const strNum = num.slice(0, -4) + num.slice(-3);
        result += parseInt(strNum)
    });

    return result
}


export function renderMaxValues(data: Fund[], component: HTMLElement) {

    const contributionsList = getDataByProperty(data, "aporte");
    const profitsList = getDataByProperty(data, "rendimientos");

    const totalContributions = sumValues(contributionsList);
    const totalprofits = sumValues(profitsList);

    const contributionsString = convertNumToString(totalContributions);
    const profitsString = convertNumToString(totalprofits);

    component.querySelector('#contributions').textContent = contributionsString + ' COP';
    component.querySelector('#profits').textContent = profitsString + ' COP';

}
