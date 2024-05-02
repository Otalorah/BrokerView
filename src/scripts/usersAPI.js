function createCookieJWT(data) {
    const token = data.access_token.token;
    document.cookie = "jwt=" + token;
}

export async function CreateUser(data) {

    const bodyContent = JSON.stringify(data);

    try {

        document.querySelector('.btn').id = 'disable';

        const res = await fetch("https://api-brokerview.onrender.com/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })

        const data = await res.json()

        if (data.detail) {

            document.querySelector('.form__error-send').style.display = 'block'

        } else {

            createCookieJWT(data)
            window.location.href = data.redirect

        }

    } catch (e) {
        console.log(e)
    } finally {
        document.querySelector('.btn').removeAttribute('id');
    }
}



export async function LoginUser(data) {

    const bodyContent = new URLSearchParams(data).toString();

    try {

        document.querySelector('.btn').id = 'disable';

        const res = await fetch("https://api-brokerview.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: bodyContent
        });

        const data = await res.json()

        if (data.detail) {

            const $error = document.querySelector('.form__error-send');
            $error.innerHTML = data.detail;
            $error.style.display = 'block';

        } else {

            createCookieJWT(data)
            window.location.href = data.redirect

        }

    } catch (e) {
        console.log(e)
    } finally {
        document.querySelector('.btn').removeAttribute('id');
    }
}



export async function GetDataUser(token) {

    let dataCache = sessionStorage.getItem('dataUser');

    if (dataCache) {
        return Promise.resolve(JSON.parse(dataCache));
    }

    return await new Promise((resolve, reject) => {

        fetch("https://api-brokerview.onrender.com/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => {
                sessionStorage.setItem('dataUser', JSON.stringify(data));
                resolve(data)
            }).catch(e => reject(e));
    })
}



export async function GetToken(token) {

    return new Promise((resolve, reject) => {
        fetch("https://api-brokerview.onrender.com/user/token", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => { return response.json() }).then(data => resolve(data)).catch(e => reject(e))
    })
}