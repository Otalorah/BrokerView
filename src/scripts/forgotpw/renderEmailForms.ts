import type { DataUser } from "@scripts/types"

function renderChangePassword(email: string, component: HTMLElement) {

    (component.querySelector("#change_password") as HTMLElement).style.display = "flex";
    (component.querySelector(".text__link") as HTMLElement).style.display = "none";
    (component.querySelector("#change_password p") as HTMLElement).textContent += " " + email;

}


export function renderFormsEmail(cache: DataUser, emailUser: string, component: HTMLElement) {

    if (cache) renderChangePassword(cache.email, component);
    else if (emailUser) {
        renderChangePassword(emailUser, component);
        component.querySelector("h1").textContent = "Verificación de correo";
    }
    else (component.querySelector("#forgot_password") as HTMLElement).style.display = "flex";

}