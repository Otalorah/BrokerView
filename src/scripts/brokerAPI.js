export async function GetDataBroker(token) {
    return new Promise((resolve, reject) => {
        fetch("https://api-brokerview.onrender.com/broker", {
        method: "GET",
        headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => { return response.json() }).then(data => resolve(data)).catch(e => reject(e))
    })
}