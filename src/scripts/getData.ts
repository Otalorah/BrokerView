function verifySessionStorage() {

    const dataCacheUser = sessionStorage.getItem('data-user');
    const dataCacheBroker = sessionStorage.getItem('data-broker');
    const dataCacheFund = sessionStorage.getItem('data-fund');

    const promiseUser = dataCacheUser ? JSON.parse(dataCacheUser) : Promise.resolve(null);
    const promiseBroker = dataCacheBroker ? JSON.parse(dataCacheBroker) : Promise.resolve(null);
    const promiseFund = dataCacheFund ? JSON.parse(dataCacheFund) : Promise.resolve(null);

    const promises = [promiseUser, promiseBroker, promiseFund].filter(promise => promise !== null);

    if (promises.length > 0) document.querySelector('#loader-container').classList.add('disappear');

    return Promise.all(promises);

}


export function getAllData(token: string, urls: (string | false)[]) {

    if (sessionStorage.getItem('data-user')) return verifySessionStorage()

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const promises = urls.map(url => url ? fetch(url, options).then(res => res.json()) : Promise.resolve(null));
        return Promise.all(promises)
    }
    finally { document.querySelector('#loader-container').classList.add('disappear'); }
}


export function getDataSessionStorage(item: string) {

    const dataCache = sessionStorage.getItem(item);
    document.querySelector('#loader-container').classList.add('disappear');

    return Promise.resolve(JSON.parse(dataCache));

}