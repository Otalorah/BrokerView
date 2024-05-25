import { sendEmail, sendCode } from "@scripts/password/passwordAPI";

export function enableSendEmail(component, cache, emailUser) {

    component.querySelector("#form-email").addEventListener("submit", (e) => {

        e.preventDefault();

        const objectEmail = {};

        if (cache) {

            objectEmail.email = cache.email;
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
        return email

    });

}


export function enableSendCode(component, cache, emailUser) {

    component.querySelector("#form-code").addEventListener("submit", (e) => {

        e.preventDefault();

        const objectCode = {};

        if (cache) objectCode.email = cache.email;
        else if (emailUser) objectCode.email = emailUser;

        const numsInputs = Object.fromEntries(new FormData(e.target));
        const code = Object.values(numsInputs).join("");
        objectCode.code = code;

        sendCode(objectCode);
    });

}