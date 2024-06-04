function getDataByProperty(data, property) {
    return data.map((obj => obj[property]))
}


function convertNumToString(num) {

    const numStr = num.toString();

    const division = numStr.length - 3;

    const firstPart = numStr.substring(0, division)
    const secondPart = numStr.substring(division)

    return firstPart + '.' + secondPart

}


function sumValues(data) {

    let result = 0;

    data.forEach(num => {
        const strNum = num.slice(0, -4) + num.slice(-3);
        result += parseInt(strNum)
    });

    return result
}


export function renderMaxValues(data, component) {

    const contributionsList = getDataByProperty(data, "aporte");
    const profitsList = getDataByProperty(data, "rendimientos");

    const totalContributions = sumValues(contributionsList);
    const totalprofits = sumValues(profitsList);

    const contributionsString = convertNumToString(totalContributions);
    const profitsString = convertNumToString(totalprofits);

    component.querySelector('#contributions').textContent = contributionsString + ' COP';
    component.querySelector('#profits').textContent = profitsString + ' COP';

}
