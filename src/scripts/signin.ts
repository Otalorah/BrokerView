import { createUser } from "@scripts/usersAPI";
import type { DataUserCreate } from "@scripts/types";


const expressions = {
    user: /^[a-zA-Z0-9\_\-]{4,16} ?$/,
    name: /^[a-zA-ZÀ-ÿ]{3,}( [a-zA-ZÀ-ÿ]{3,})? ?$/,
    lastname: /^[a-zA-ZÀ-ÿ]{3,} ?$/,
    password: /^[\wÀ-ÿ\W]{6,}$/,
    characterEspecial: /[°!"#$&()=@\?¡%&\+\/\{\}\*\[\]]/,
    email: /^[a-zA-Z0-9\._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
};


const fields = {
    username: false,
    name: false,
    lastname: false,
    lastname2: false,
    password: false,
    password2: false,
    email: false,
};


const desktopDevice = window.innerWidth > 666;

if (desktopDevice) {
    expressions.lastname = /^[a-zA-ZÀ-ÿ]{3,} [a-zA-ZÀ-ÿ]{3,} ?$/;
    fields.lastname2 = true;
}


function validatePassword(value) {

    const $groupPassword = document.getElementById("group__password"),
        $textError = document.querySelector(".form__error");

    if (!($textError instanceof HTMLElement)) return

    if (expressions.password.test(value) && expressions.characterEspecial.test(value)) {

        $groupPassword.classList.remove("form__group-wrong");
        $groupPassword.classList.add("form__group-correct");
        fields["password"] = true;

        if (desktopDevice) $textError.style.opacity = "0";
        else $textError.style.display = "none";

    } else {

        $groupPassword.classList.add("form__group-wrong");
        $groupPassword.classList.remove("form__group-correct");
        fields["password"] = false;

        if (desktopDevice) $textError.style.opacity = "1";
        else $textError.style.display = "block";

    }

}


function validateField(expression: RegExp, input: HTMLInputElement, field: string) {

    const $groupInput = document.getElementById(`group__${field}`);
    const $svg = document.getElementById(`${field}_svg`);

    if (expression.test(input.value)) {

        $groupInput.classList.remove("form__group-wrong");
        $groupInput.classList.add("form__group-correct");

        $svg.setAttribute("src", "/check.svg");

        fields[field] = true;

    } else {

        $groupInput.classList.add("form__group-wrong");
        $groupInput.classList.remove("form__group-correct");

        $svg.setAttribute("src", "/error.svg");

        fields[field] = false;

    }

}


function validatePassword2() {

    const $inputPassword1 = document.getElementById("password"),
        $inputPassword2 = document.getElementById("password2"),
        $groupPassword2 = document.getElementById(`group__password2`),
        $textError2 = document.querySelectorAll(".form__error")[1];

    if (!($inputPassword1 instanceof HTMLInputElement) || !($inputPassword2 instanceof HTMLInputElement) || !($textError2 instanceof HTMLElement)) return


    if ($inputPassword1.value !== $inputPassword2.value) {

        $groupPassword2.classList.add("form__group-wrong");
        $groupPassword2.classList.remove("form__group-correct");

        if (desktopDevice) $textError2.style.opacity = "1";
        else $textError2.style.display = "block";

        fields["password2"] = false;

    } else {

        $groupPassword2.classList.remove("form__group-wrong");
        $groupPassword2.classList.add("form__group-correct");

        if (desktopDevice) $textError2.style.opacity = "0";
        else $textError2.style.display = "none";

        fields["password2"] = true;

    }

}


const enum INPUT_TYPE {
    USER_NAME = "username",
    NAME = "name",
    LASTNAME = "lastname",
    LASTNAME2 = "lastname2",
    EMAIL = "email",
    PASSWORD = "password",
    PASSWORD2 = "password2"
}


const validateForm = (e: FocusEvent | KeyboardEvent) => {

    const $input = e.target as HTMLInputElement;

    switch ($input.name) {
        case INPUT_TYPE.USER_NAME:
            validateField(expressions.user, $input, INPUT_TYPE.USER_NAME);
            break;
        case INPUT_TYPE.NAME:
            validateField(expressions.name, $input, INPUT_TYPE.NAME);
            break;
        case INPUT_TYPE.LASTNAME:
            validateField(expressions.lastname, $input, INPUT_TYPE.LASTNAME);
            break;
        case INPUT_TYPE.LASTNAME2:
            validateField(expressions.lastname, $input, INPUT_TYPE.LASTNAME2);
            break;
        case INPUT_TYPE.EMAIL:
            validateField(expressions.email, $input, INPUT_TYPE.EMAIL);
            break;
        case INPUT_TYPE.PASSWORD:
            validatePassword($input.value);
            validatePassword2();
            break;
        case INPUT_TYPE.PASSWORD2:
            validatePassword2();
            break;
    }

};


export function enableInputsForm(component: HTMLElement) {

    const $inputs = component.querySelectorAll(".form__input");

    $inputs.forEach((input) => {
        input.addEventListener("keyup", validateForm);
        input.addEventListener("blur", validateForm);
    });

}


export function sendDataCreateUser(data: DataUserCreate) {

    delete data.password2

    const formComplete = fields.name && fields.lastname && fields.lastname2 && fields.username && fields.password && fields.password2 && fields.email;

    if (formComplete) {

        if (window.innerWidth < 666) data["lastname"] = data["lastname"] + " " + data["lastname2"];

        createUser(data)

    }

}