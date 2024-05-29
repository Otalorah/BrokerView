import { renderLoader } from "./utils";

function verifyResponse(response) {

    if (response.detail) {

        const $error = document.querySelector('.form__error-send');
        $error.textContent = response.detail;
        $error.style.display = 'block';

    } else {

        const token = response.access_token.token;
        document.cookie = "jwt=" + token;
        window.location.href = response.redirect;

    }
}


function setEmailUser(data, response) {

    if (response.detail) return
    else sessionStorage.setItem("email-user", JSON.parse(data).email)

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

        const response = await res.json();

        setEmailUser(bodyContent, response)
        verifyResponse(response);

    } finally {
        document.querySelector('.btn').removeAttribute('id');
        document.querySelector(".loader").setAttribute("stroke", "transparent")
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
        document.querySelector(".loader").setAttribute("stroke", "transparent");
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