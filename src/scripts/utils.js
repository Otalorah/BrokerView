export function getCookieJWT() {

    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {

        const cookie = cookies[i].trim().split("=");

        if (cookie[0] == "jwt") {
            return cookie[1];
        }
    }
}


export function transformDataByYear(dataList) {

    const data = {};
    const data2023 = [];
    const data2024 = [];

    dataList.forEach(element => {

        if (element.año == '2023') {
            data2023.push(element);
        }
        else if (element.año == '2024') {
            data2024.push(element);
        }

    });

    if (data2023.length == 0) {

        data["2024"] = data2024;
        renderPages(data);
        return data

    }

    data["2023"] = data2023;
    data["2024"] = data2024;


    return data

}