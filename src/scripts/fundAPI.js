export async function GetDataFund(token) {
    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:8000/fund", {
        method: "GET",
        headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => { return response.json() }).then(data => resolve(data)).catch(e => reject(e))
    })
}