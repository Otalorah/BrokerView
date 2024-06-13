import { sendEmail, sendCode } from "@scripts/forgotpw/forgotpwAPI";
import type { DataUser, EmailUser, CodeUser } from "@scripts/types"

export function enableSendEmail(cache: DataUser, emailUser: string, component: HTMLElement) {

    component.querySelector("#form-email").addEventListener("submit", (e) => {

        e.preventDefault();

        const objectEmail: EmailUser = { email: "" };

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


        const $form = e.target;
        if (!($form instanceof HTMLFormElement)) return

        const email: unknown = Object.fromEntries(new FormData($form));
        sendEmail(email as EmailUser);

    });

};


function enableWriteCode(component: HTMLElement) {

    const inputs = component.querySelectorAll('.code-input');

    inputs.forEach((input, index) => {

        if (!(input instanceof HTMLInputElement)) return

        input.addEventListener('input', (e) => {

            const nextInput = inputs[index + 1];
            const $input = e.target;

            if (!($input instanceof HTMLInputElement) || !(nextInput instanceof HTMLInputElement)) return

            if ($input.value.length === 1 && nextInput) nextInput.focus();

        });

        input.addEventListener('keydown', (e: KeyboardEvent) => {

            const prevInput = inputs[index - 1];

            if (!(prevInput instanceof HTMLInputElement)) return

            if (e.key === 'Backspace' && input.value.length === 0 && prevInput) prevInput.focus();

        });

    });

};


export function enableSendCode(component: HTMLElement) {

    enableWriteCode(component);

    component.querySelector("#form-code").addEventListener("submit", (e) => {

        e.preventDefault();

        const cache = JSON.parse(sessionStorage.getItem("data-user"));
        const emailUser = sessionStorage.getItem("email-forgotten");

        const objectCode: CodeUser = { email: "", code: "" };

        if (cache) objectCode.email = cache.email;
        else if (emailUser) objectCode.email = emailUser;

        const $form = e.target;

        if (!($form instanceof HTMLFormElement)) return

        const numsInputs = Object.fromEntries(new FormData($form));
        const code = Object.values(numsInputs).join("");
        objectCode.code = code;

        sendCode(objectCode);

    });

};