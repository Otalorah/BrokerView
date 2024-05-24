import { renderLoader } from "../utils";


function verifyResponse(response) {

    if (response.detail) document.getElementById('error').style.opacity = '1';
    else console.log(response);

}


export async function sendEmail(email) {

    const bodyContent = JSON.stringify(email)

    try {

        renderLoader()

        const res = await fetch("https://api-brokerview.onrender.com/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })

        const response = await res.json();

        verifyResponse(response)

    } finally {
        document.querySelector('.btn').removeAttribute('id');
        document.querySelector("#loader").setAttribute("stroke", "transparent")
    }
}
