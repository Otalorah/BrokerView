import { renderLoader } from "@scripts/utils";
import type { CorrectAPI, ErrorAPI, DataUserCreate } from "@scripts/types";


function isError(response: ErrorAPI | CorrectAPI): response is ErrorAPI {
    return (response as ErrorAPI).detail !== undefined
}


function verifyResponse(response: ErrorAPI | CorrectAPI) {

    if (isError(response)) {

        const $error = document.querySelector('.form__error-send');

        if ($error instanceof HTMLElement) {
            $error.textContent = response.detail;
            $error.style.display = 'block';
        }


    } else {

        const token = response.access_token.token;
        document.cookie = "jwt=" + token;
        window.location.href = response.redirect;

    }
}


function setEmailUser(data: string, response: ErrorAPI | CorrectAPI) {

    if (isError(response)) return
    sessionStorage.setItem("email-user", JSON.parse(data).email)

}


export async function createUser(data: DataUserCreate) {

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

        const response: ErrorAPI | CorrectAPI = await res.json();

        setEmailUser(bodyContent, response);
        verifyResponse(response);

    } finally {
        document.querySelector('.btn').removeAttribute('id');
        document.querySelector(".loader").setAttribute("stroke", "transparent")
    }
}



export async function loginUser(data: any) {

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

        const data: ErrorAPI | CorrectAPI = await res.json();

        verifyResponse(data);

    } finally {
        document.querySelector('.btn').removeAttribute('id');
        document.querySelector(".loader").setAttribute("stroke", "transparent");
    }

}


export function GetToken(token: string) {

    return fetch("https://api-brokerview.onrender.com/user/token", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
    .then(data => data)
    .catch(e => console.log(e))
    
}