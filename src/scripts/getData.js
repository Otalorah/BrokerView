export async function getAllData(token) {

    const dataCacheUser = sessionStorage.getItem('dataUser');
    const dataCacheBroker = sessionStorage.getItem('dataBroker');
    const dataCacheFund = sessionStorage.getItem('dataFund');

    const $loader = document.querySelector('#loader-container');

    if (dataCacheUser) {

        const promiseUser = JSON.parse(dataCacheUser);
        const promiseBroker = JSON.parse(dataCacheBroker);
        const promiseFund = JSON.parse(dataCacheFund);

        $loader.classList.add('disappear');

        return Promise.all([promiseUser, promiseBroker, promiseFund])

    }

    const urls = ["https://api-brokerview.onrender.com/user", "https://api-brokerview.onrender.com/broker", "https://api-brokerview.onrender.com/fund"];

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


export function setSessionStorage(user, broker, fund) {

    const dataCacheUser = sessionStorage.getItem('dataUser');

    if (dataCacheUser) {
        return
    }

    sessionStorage.setItem("dataUser", JSON.stringify(user));
    sessionStorage.setItem("dataBroker", JSON.stringify(broker));
    sessionStorage.setItem("dataFund", JSON.stringify(fund));

}


export function getDataSessionStorage(item) {

    const dataCache = sessionStorage.getItem(item);
    document.querySelector('#loader-container').classList.add('disappear');

    return Promise.resolve(JSON.parse(dataCache));

}