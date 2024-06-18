import type { DataToken, Broker, BrokerByYear } from "@scripts/types"

export function transformDataByYear(data: Broker[]) {

    const dataByYear: BrokerByYear = { "2024": [] };
    const data2023 = [];
    const data2024 = [];

    data.forEach(element => {

        if (element.año == '2023') data2023.push(element);
        else if (element.año == '2024') data2024.push(element);

    });

    dataByYear["2024"] = data2024;

    if (data2023.length == 0) return dataByYear

    dataByYear["2023"] = data2023;

    return dataByYear

}


export function getUrlsData(data: DataToken): (string | false)[] {

    const urls: (string | false)[] = ["https://api-brokerview.onrender.com/user", false, false];

    if (data.broker) urls[1] = ("https://api-brokerview.onrender.com/broker");
    if (data.fund) urls[2] = ("https://api-brokerview.onrender.com/fund");

    return urls

}


export function renderLoader() {

    const $loaders = document.querySelectorAll(".loader");
    const $btns = document.querySelectorAll('.btn');

    $btns.forEach(btn => btn.id = "disable")

    $loaders.forEach(loader => {

        if (document.documentElement.className == "light") loader.setAttribute("stroke", "#dfdfdf");
        else loader.setAttribute("stroke", "#121212");

    })

}


export function deleteData() {

    document.cookie = "jwt=; expires=Thu, 01 Jan 2000 00:00:00 UTC;";
    document.cookie = "dataToken=; expires=Thu, 01 Jan 2000 00:00:00 UTC;";
    sessionStorage.clear();

    window.location.href = "/";

}


export function getCookieForgotpw() {

    const cookies = document.cookie;
    const cookieArray = cookies.split(';');

    for (let cookie of cookieArray) {

        cookie = cookie.trim();

        if (cookie.startsWith("forgotpw=")) return cookie.substring(9);

    }

}