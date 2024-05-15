function verifySessionStorage() {

    const dataCacheUser = sessionStorage.getItem('data-user');
    const dataCacheBroker = sessionStorage.getItem('data-broker');
    const dataCacheFund = sessionStorage.getItem('data-fund');

    const $loader = document.querySelector('#loader-container');

    const promiseUser = dataCacheUser ? JSON.parse(dataCacheUser) : Promise.resolve(null);
    const promiseBroker = dataCacheBroker ? JSON.parse(dataCacheBroker) : Promise.resolve(null);
    const promiseFund = dataCacheFund ? JSON.parse(dataCacheFund) : Promise.resolve(null);

    const promises = [promiseUser, promiseBroker, promiseFund].filter(promise => promise !== null);

    if (promises.length > 0) {
        $loader.classList.add('disappear');
    }

    return Promise.all(promises);

}


export async function getAllData(token, urls) {

    const dataCacheUser = sessionStorage.getItem('data-user');
    if (dataCacheUser) return verifySessionStorage()

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const promises = urls.map(url => url ? fetch(url, options).then(res => res.json()) : Promise.resolve(null));
        return await Promise.all(promises)
    }
    finally {
        document.querySelector('#loader-container').classList.add('disappear');
    }
}


export function getDataSessionStorage(item) {

    const dataCache = sessionStorage.getItem(item);
    document.querySelector('#loader-container').classList.add('disappear');

    return Promise.resolve(JSON.parse(dataCache));

}