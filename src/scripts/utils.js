export function getCookieJWT() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim().split("=");

        if (cookie[0] == "jwt") {
            return cookie[1];
        }
    }
}