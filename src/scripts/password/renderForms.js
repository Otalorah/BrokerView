export function renderChangePassword(data, component) {

    component.querySelector("#change_password").style.display = "flex";
    component.querySelector(".text__link").style.display = "none";
    component.querySelector("#change_password p").textContent += " " + data;

}


export function renderForgotPassword(component) {
    component.querySelector("#forgot_password").style.display = "flex";
}