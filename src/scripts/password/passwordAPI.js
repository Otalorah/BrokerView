import { renderLoader, deleteData } from "../utils";


function removeLoader() {

    const $loaders = document.querySelectorAll(".loader");
    const $btns = document.querySelectorAll('.btn');

    $btns.forEach(btn => btn.removeAttribute("id"));
    $loaders.forEach(loader => loader.setAttribute("stroke", "transparent"));

}


export async function sendEmail(email) {

    const bodyContent = JSON.stringify(email);

    try {

        renderLoader();

        const res = await fetch("https://api-brokerview.onrender.com/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        });

        const response = await res.json();

        if (response.detail) document.getElementById('error-email').style.opacity = '1';
        else {
            document.getElementById('forms').classList.add('send');
            document.querySelector(".text__link").style.display = "none";
            sessionStorage.setItem("email-forgotten", JSON.parse(bodyContent).email)
        }

    } finally { removeLoader() }

}


function verifyResponseCode() {

    if (sessionStorage.getItem("email-user")) window.location.href = "/";
    else console.log("va el siguiente form")

}


export async function sendCode(dataCode) {

    const bodyContent = JSON.stringify(dataCode);

    try {

        renderLoader();

        const res = await fetch("https://api-brokerview.onrender.com/email/code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })

        const response = await res.json();

        if (response.detail) document.getElementById('error-code').style.opacity = '1';
        else verifyResponseCode()

    } finally { removeLoader() }

}