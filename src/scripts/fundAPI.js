export async function GetDataFund(token) {
    let dataCache = sessionStorage.getItem('dataFund');
    if (dataCache) {
        return Promise.resolve(JSON.parse(dataCache));
    }
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
}