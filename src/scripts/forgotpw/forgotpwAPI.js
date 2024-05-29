import { renderLoader, deleteData } from "@scripts/utils";


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


function verifyResponseCode(response) {

    if (sessionStorage.getItem("email-user")) window.location.href = "/";
    else {
        const $forms = document.getElementById('forms');
        $forms.classList.remove('send');
        $forms.classList.add('password');
        document.cookie = "forgotpw=" + response.token;
    }

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
        else verifyResponseCode(response)

    } finally { removeLoader() }

}

export async function sendNewPassword(password, token) {

    const bodyContent = JSON.stringify(password);

    try {

        renderLoader();

        const res = await fetch("https://api-brokerview.onrender.com/user/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: bodyContent
        })

        const response = await res.json();
        deleteData()

    } finally { removeLoader() }

}