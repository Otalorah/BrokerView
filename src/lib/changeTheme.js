export default function changeTheme(box_btn) {

    box_btn.addEventListener("click",
        () => {

            let theme = localStorage.getItem("theme")
            if (theme === "light") {
                box_btn.classList.remove("btnTheme__box-light")
                document.documentElement.classList.remove("light")
                theme = "black"
                localStorage.setItem("theme", theme)
                console.log(theme)
            }
            else if (theme === "black") {
                box_btn.classList.add("btnTheme__box-light")
                document.documentElement.classList.add("light")
                theme = "light"
                localStorage.setItem("theme", theme)
            }
            else { localStorage.setItem("theme", "light") }
        })
}