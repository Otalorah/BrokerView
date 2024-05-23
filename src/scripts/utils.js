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
        return data

    }

    data["2023"] = data2023;
    data["2024"] = data2024;

    return data

}


export function getUrlsData(data) {

    const urls = ["https://api-brokerview.onrender.com/user", false, false];

    if (data.broker) {
        urls[1] = ("https://api-brokerview.onrender.com/broker");
    }
    if (data.fund) {
        urls[2] = ("https://api-brokerview.onrender.com/fund");
    }

    return urls

}


export function renderLoader() {
    const $loader = document.querySelector("#loader");
    document.querySelector('.btn').id = 'disable';

    if (document.documentElement.className == "light") {
        $loader.setAttribute("stroke", "#dfdfdf");
    } else {
        $loader.setAttribute("stroke", "#121212");
    }
}