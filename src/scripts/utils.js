export function getCookieJWT() {

    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {

        const cookie = cookies[i].trim().split("=");

        if (cookie[0] == "jwt") {
            return cookie[1];
        }
    }
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
        return data

    }

    data["2023"] = data2023;
    data["2024"] = data2024;

    return data

}


export async function getAllData(token) {

    const dataCacheBroker = sessionStorage.getItem('dataBroker');
    const dataCacheFund = sessionStorage.getItem('dataFund');

    const $loader = document.querySelector('#loader-container');

    if (dataCacheBroker && dataCacheFund) {

        const promiseBroker = JSON.parse(dataCacheBroker);
        const promiseFund = JSON.parse(dataCacheFund);

        $loader.classList.add('disappear');

        return Promise.all([promiseBroker, promiseFund])

    }

    const urls = ["https://api-brokerview.onrender.com/broker", "https://api-brokerview.onrender.com/fund"]

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const promises = urls.map(url => fetch(url, options).then(res => res.json()))
        return await Promise.all(promises)
    }
    finally {
        $loader.classList.add('disappear');
    }
}


export function setSessionStorage(broker, fund) {

    const dataCacheBroker = sessionStorage.getItem('dataBroker');
    const dataCacheFund = sessionStorage.getItem('dataFund');

    if (dataCacheBroker && dataCacheFund) {
        return
    }

    sessionStorage.setItem("dataBroker", JSON.stringify(broker));
    sessionStorage.setItem("dataFund", JSON.stringify(fund));

}