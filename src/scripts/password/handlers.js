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

    });

}


function enableWriteInInputs(component) {

    const inputs = component.querySelectorAll('.code-input');

    inputs.forEach((input, index) => {

        input.addEventListener('input', (e) => {

            const nextInput = inputs[index + 1];

            if (e.target.value.length === 1 && nextInput) {
                nextInput.focus();
            }

        });

        input.addEventListener('keydown', (e) => {

            const prevInput = inputs[index - 1];

            if (e.key === 'Backspace' && input.value.length === 0 && prevInput) {
                prevInput.focus();
            }

        });

    });

}


export function enableSendCode(component) {

    enableWriteInInputs(component);

    component.querySelector("#form-code").addEventListener("submit", (e) => {

        e.preventDefault();

        const cache = JSON.parse(sessionStorage.getItem("data-user"));
        const emailUser = sessionStorage.getItem("email-user");

        const objectCode = {};

        if (cache) objectCode.email = cache.email;
        else if (emailUser) objectCode.email = emailUser;

        const numsInputs = Object.fromEntries(new FormData(e.target));
        const code = Object.values(numsInputs).join("");
        objectCode.code = code;

        sendCode(objectCode);
        console.log(objectCode);

    });

}