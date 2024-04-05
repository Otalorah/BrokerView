function createCookie(data) {
    const token = data.token.access_token;
    document.cookie = "jwt=" + token;
}

export async function Create(data) {

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
        createCookie(data)
        window.location.href = data.redirect

    } catch (e) {
        console.log(e)
    }
}
export async function Login(data) {

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
        createCookie(data)
        window.location.href = data.redirect

    } catch (e) {
        console.log(e)
    }
}
export async function getUser(token){
    const res = await fetch("http://127.0.0.1:8000/user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    
    return data
}