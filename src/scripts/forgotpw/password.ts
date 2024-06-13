import { getCookieForgotpw } from "@scripts/utils";
import { sendNewPassword } from "@scripts/forgotpw/forgotpwAPI";

const fields = {
    password: false,
    password2: false
};

const expressions = {
    password: /^[\wÀ-ÿ\W]{6,}$/,
    characterEspecial: /[°!"#$&()=@\?¡%&\+\/\{\}\*\[\]]/
};


function validatePassword(value: string, input: HTMLInputElement) {

    if (!(input.parentNode instanceof HTMLElement)) return

    if (expressions.password.test(value) && expressions.characterEspecial.test(value)) {

        input.parentNode.classList.remove("wrong");
        input.parentNode.classList.add("correct");
        fields["password"] = true;

    } else {

        input.parentNode.classList.remove("correct");
        input.parentNode.classList.add("wrong");
        fields["password"] = false;

    }

};


function validatePassword2(component: HTMLElement) {

    const $inputs = component.querySelectorAll(".input_password");
    const $parentInputConfirm = $inputs[1].parentNode;

    if (!($parentInputConfirm instanceof HTMLElement) || !($inputs[0] instanceof HTMLInputElement) || !($inputs[1] instanceof HTMLInputElement)) return

    if ($inputs[0].value === $inputs[1].value) {
        $parentInputConfirm.classList.add("correct");
        $parentInputConfirm.classList.remove("wrong");

        fields["password2"] = true;
    } else {
        $parentInputConfirm.classList.add("wrong");
        $parentInputConfirm.classList.remove("correct");

        fields["password2"] = false;
    }
};


function validateForm(e: FocusEvent | KeyboardEvent, component: HTMLElement) {

    const $input = e.target;
    if (!($input instanceof HTMLInputElement)) return

    if ($input.name == "pw") validatePassword($input.value, $input);
    validatePassword2(component);

};


function enableSendPassword(component: HTMLElement) {

    component.querySelector("#form-password").addEventListener("submit", (e) => {

        e.preventDefault();
        const $form = e.target;

        if (!($form instanceof HTMLFormElement)) return

        const newPassword = Object.fromEntries(new FormData($form)).pw;

        const token = getCookieForgotpw();

        if (fields.password && fields.password2) sendNewPassword({ password: newPassword.toString() }, token);

    });

};


export function verifyInputsPassword(component: HTMLElement) {

    const $inputs = component.querySelectorAll(".input_password");

    $inputs.forEach((input) => {
        input.addEventListener("keyup", (e: KeyboardEvent) => { validateForm(e, component) });
        input.addEventListener("blur", (e: FocusEvent) => { validateForm(e, component) });
    });

    enableSendPassword(component);

};