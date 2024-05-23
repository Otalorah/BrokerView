import { renderLoader } from "./utils";

function verifyResponse(data) {
    if (data.detail) {

        const $error = document.querySelector('.form__error-send');
        $error.innerHTML = data.detail;
        $error.style.display = 'block';

    } else {

        const token = data.access_token.token;
        document.cookie = "jwt=" + token;;
        window.location.href = data.redirect;

    }
}


export async function createUser(data) {

    const bodyContent = JSON.stringify(data);

    try {

        renderLoader()

        const res = await fetch("https://api-brokerview.onrender.com/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })

        const data = await res.json();

        verifyResponse(data);

    } finally {
        document.querySelector('.btn').removeAttribute('id');
        document.querySelector("#loader").setAttribute("stroke", "transparent")
    }
}



export async function loginUser(data) {

    const bodyContent = new URLSearchParams(data).toString();

    try {

        renderLoader()

        const res = await fetch("https://api-brokerview.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: bodyContent
        });

        const data = await res.json()

        verifyResponse(data)

    } finally {
        document.querySelector('.btn').removeAttribute('id');
        document.querySelector("#loader").setAttribute("stroke", "transparent");
    }
}


export function GetToken(token) {

    return new Promise((resolve, reject) => {
        fetch("https://api-brokerview.onrender.com/user/token", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json()).then(data => resolve(data)).catch(e => reject(e))
    })
}