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


function validatePassword(value, input) {

    if (expressions.password.test(value) && expressions.characterEspecial.test(value)) {

        input.parentNode.classList.remove("wrong");
        input.parentNode.classList.add("correct");
        fields["password"] = true;

    } else {

        input.parentNode.classList.remove("correct");
        input.parentNode.classList.add("wrong");
        fields["password"] = false;

    }

}


function validatePassword2(component) {

    const $inputs = component.querySelectorAll(".input_password");
    const $parentInputConfirm = $inputs[1].parentNode;

    if ($inputs[0].value === $inputs[1].value) {
        $parentInputConfirm.classList.add("correct");
        $parentInputConfirm.classList.remove("wrong");

        fields["password2"] = true;
    } else {
        $parentInputConfirm.classList.add("wrong");
        $parentInputConfirm.classList.remove("correct");

        fields["password2"] = false;
    }
}


function validateForm(e, input, component) {

    if (e.target.name == "pw") validatePassword(e.target.value, input);
    validatePassword2(component);

};


function enableSendPassword(component) {

    component.querySelector("#form-password").addEventListener("submit", (e) => {

        e.preventDefault();

        const newPassword = Object.fromEntries(new FormData(e.target)).pw;

        const token = getCookieForgotpw();

        if (fields.password && fields.password2) sendNewPassword({ password: newPassword }, token);

    });

}


export function verifyInputsPassword(component) {

    const $inputs = component.querySelectorAll(".input_password");

    $inputs.forEach((input) => {
        input.addEventListener("keyup", (e) => { validateForm(e, input, component) });
        input.addEventListener("blur", (e) => { validateForm(e, input, component) });
    });

    enableSendPassword(component);

}