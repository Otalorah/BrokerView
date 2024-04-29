export async function GetDataFund(token) {
    return await new Promise((resolve, reject) => {
        fetch("https://api-brokerview.onrender.com/fund", {
        method: "GET",
        headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json()).then(data => resolve(data)).catch(e => reject(e))
    })
}