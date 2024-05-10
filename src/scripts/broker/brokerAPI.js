export async function getDataBroker(token) {

    const dataCache = sessionStorage.getItem('dataBroker');

    const $loader = document.querySelector('#loader-container');

    if (dataCache) {
        $loader.classList.add('disappear')
        return Promise.resolve(JSON.parse(dataCache));
    }
    try {
        return await new Promise((resolve, reject) => {
            fetch("https://api-brokerview.onrender.com/broker", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('dataBroker', JSON.stringify(data));
                    resolve(data)
                }).catch(e => reject(e));
        })
    } finally {
        $loader.classList.add('disappear')
    }
}