const mainNav = document.querySelector(".navigation");
const hamButton = document.getElementById("menu");
const header = document.querySelector("header");

hamButton.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    hamButton.classList.toggle("show");
    header.classList.toggle("hide-header");
});

const currentYear = new Date().getFullYear();
console.log(currentYear);
document.getElementById("currentyear").innerText = currentYear;
document.getElementById('lastModified').innerText = document.lastModified;