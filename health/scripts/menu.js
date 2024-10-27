const menuElement = document.querySelector("#navButton");
const navElement = document.querySelector("#animation");

menuElement.addEventListener("click", () => {
    navElement.classList.toggle("open");
    menuElement.classList.toggle("open");
})