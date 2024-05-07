export async function getDataFund(token) {

    const dataCache = sessionStorage.getItem('dataFund');

    const $loader = document.querySelector('#loader-container');

    if (dataCache) {
        $loader.classList.add('disappear')
        return Promise.resolve(JSON.parse(dataCache));
    }
    try {
        return await new Promise((resolve, reject) => {
            fetch("https://api-brokerview.onrender.com/fund", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('dataFund', JSON.stringify(data));
                    resolve(data)
                }).catch(e => reject(e));
        })
    } finally {
        $loader.classList.add('disappear')
    }
}