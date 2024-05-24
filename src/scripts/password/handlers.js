import { sendEmail } from "@scripts/password/passwordAPI";

export function enableSendEmail(component) {

    component.querySelector("#form-email").addEventListener("submit", (e) => {

        e.preventDefault();

        const cacheEmailUser = JSON.parse(
            sessionStorage.getItem("data-user"),
        );
        const emailUser = sessionStorage.getItem("email-user");

        const objectEmail = {};


        if (cacheEmailUser) {

            objectEmail.email = cacheEmailUser.email;
            sendEmail(objectEmail);
            return

        }
        else if (emailUser) {

            objectEmail.email = emailUser;
            sendEmail(objectEmail);
            return

        }

        const email = Object.fromEntries(new FormData(e.target));
        sendEmail(email);

    });

}