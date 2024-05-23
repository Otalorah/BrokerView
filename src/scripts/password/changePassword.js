import { renderLoader } from "../utils";

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

        const data = await res.json();

        console.log(data)

    } finally {
        document.querySelector('.btn').removeAttribute('id');
        document.querySelector("#loader").setAttribute("stroke", "transparent")
    }
}
