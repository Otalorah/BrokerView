function createCookieJWT(data) {
    const token = data.access_token.token;
    document.cookie = "jwt=" + token;
}

export async function CreateUser(data) {

    const bodyContent = JSON.stringify(data);

    try {

        const res = await fetch("http://127.0.0.1:8000/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })

        const data = await res.json()
        if (data.detail) {
            console.log(data)
        } else {
            createCookieJWT(data)
            window.location.href = data.redirect
        }

    } catch (e) {
        console.log(e)
    }
}
export async function LoginUser(data) {

    const bodyContent = new URLSearchParams(data).toString();

    try {
        const res = await fetch("http://127.0.0.1:8000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: bodyContent
        });

        const data = await res.json()
        if (data.detail) {
            console.log(data)
        } else {
            createCookieJWT(data)
            window.location.href = data.redirect
        }


    } catch (e) {
        console.log(e)
    }
}
export async function GetUser(token) {
    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:8000/user", {
        method: "GET",
        headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => { return response.json() }).then(data => resolve(data)).catch(e => reject(e))
    })
}
export async function GetToken(token) {
    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:8000/user/token", {
        method: "GET",
        headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => { return response.json() }).then(data => resolve(data)).catch(e => reject(e))
    })
}