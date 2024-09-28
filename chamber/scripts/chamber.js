const directoryJSON = "data/members.json";
const cards = document.querySelector("#cards");

const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
const toggle = document.querySelector("article");

async function getCompaniesData(directoryJSON) {
    const response = await fetch(directoryJSON);
    const data = await response.json();

    displayCompanies(data.companies);
}

getCompaniesData(directoryJSON);

const displayCompanies = (companies) => {
    cards.innerHTML = "";
    companies.forEach(company => {
        const card = document.createElement("section");
        const companyImg = document.createElement("img");
        const companyName = document.createElement("h2");
        const companyAddress = document.createElement("p");
        const companyPhone = document.createElement("p");
        const companyUrl = document.createElement("p");

        companyImg.setAttribute("src", `images/${company.image}`);
        companyImg.setAttribute("alt", company.name);
        companyImg.setAttribute("loading", "lazy");
        companyImg.setAttribute("width", "150");
        companyImg.setAttribute("height", "150")

        companyName.innerHTML = company.name;

        companyAddress.innerHTML = company.address;

        companyPhone.classList.add("phone"),
            companyPhone.innerHTML = company["phone"];

        companyUrl.innerHTML = company.website;

        card.appendChild(companyImg);
        card.appendChild(companyName);
        card.appendChild(companyAddress);
        card.appendChild(companyPhone);
        card.appendChild(companyUrl);

        cards.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    toggle.classList.add("grid");
    toggle.classList.remove("list")

    getCompaniesData(directoryJSON);
});

listButton.addEventListener("click", () => {
    toggle.classList.add("list");
    toggle.classList.remove("grid");

    getCompaniesData(directoryJSON);
});