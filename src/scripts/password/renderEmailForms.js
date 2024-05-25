function renderChangePassword(data, component) {

    component.querySelector("#change_password").style.display = "flex";
    component.querySelector(".text__link").style.display = "none";
    component.querySelector("#change_password p").textContent += " " + data;

}


export function renderFormsEmail(cache, emailUser, component) {

    if (cache) renderChangePassword(cache.email, component);
    else if (emailUser) renderChangePassword(emailUser, component);
    else component.querySelector("#forgot_password").style.display = "flex";

}