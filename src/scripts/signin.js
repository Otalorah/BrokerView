import { createUser } from "@scripts/usersAPI";

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


// MediaQuery for desktop
const desktopDevice = window.innerWidth > 666;

if (desktopDevice) {
    expressions.lastname = /^[a-zA-ZÀ-ÿ]{3,} [a-zA-ZÀ-ÿ]{3,} ?$/;
    fields.lastname2 = true;
}





function validatePassword(value) {

    const $groupPassword = document.getElementById("group__password"),
        $textError = document.querySelector(".form__error");

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


function validateField(expression, input, field) {

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


const validateForm = (e) => {

    switch (e.target.name) {
        case "username":
            validateField(expressions.user, e.target, "username");
            break;
        case "name":
            validateField(expressions.name, e.target, "name");
            break;
        case "lastname":
            validateField(expressions.lastname, e.target, "lastname");
            break;
        case "lastname2":
            validateField(expressions.lastname, e.target, "lastname2");
            break;
        case "email":
            validateField(expressions.email, e.target, "email");
            break;
        case "password":
            validatePassword(e.target.value);
            validatePassword2();
            break;
        case "password2":
            validatePassword2();
            break;
    }

};


export function enableInputsForm(component) {

    const $inputs = component.querySelectorAll(".form__input");

    $inputs.forEach((input) => {
        input.addEventListener("keyup", validateForm);
        input.addEventListener("blur", validateForm);
    });

}


export function sendDataCreateUser(data) {

    const formComplete = fields.name && fields.lastname && fields.lastname2 && fields.username && fields.password && fields.password2 && fields.email;
    if (formComplete) createUser(data);

}