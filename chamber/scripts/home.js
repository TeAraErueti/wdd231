const weatherIcon = document.getElementById("iconDiv");
const weatherText = document.getElementById("textDiv");
const forecastDiv = document.getElementById("forecast");

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-37.78&lon=175.25&units=metric&appid=2d13c0f2c18977e869ef1026588e58cb';
const url3d = 'https://api.openweathermap.org/data/2.5/forecast?lat=-37.78&lon=175.25&units=metric&appid=2d13c0f2c18977e869ef1026588e58cb';

async function weather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    };
};

async function forecast() {
    try {
        const response = await fetch(url3d);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    };
};


const displayWeather = (data) => {
    weatherIcon.innerHTML = "";
    weatherText.innerHTML = "";

    const icon = document.createElement("img");
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
    const temp = document.createElement("p");
    const weatherStatus = document.createElement("p");
    const high = document.createElement("p");
    const low = document.createElement("p");
    const humidity = document.createElement("p");
    const sunrise = document.createElement("p");
    const sunset = document.createElement("p");


    icon.setAttribute("src", iconsrc);
    icon.setAttribute("alt", desc);

    temp.innerHTML = `${data.main.temp}&deg;C`;
    weatherStatus.innerHTML = `${data.weather[0].description}`;
    high.innerHTML = `High: ${data.main.temp_max}&deg;C`;
    low.innerHTML = `Low: ${data.main.temp_min}&deg;C`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    sunrise.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
    sunset.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;

    weatherIcon.appendChild(icon);
    weatherText.appendChild(temp);
    weatherText.appendChild(weatherStatus);
    weatherText.appendChild(high);
    weatherText.appendChild(low);
    weatherText.appendChild(humidity);
    weatherText.appendChild(sunrise);
    weatherText.appendChild(sunset);

    const today = document.createElement("p");
    today.innerHTML = `Today <strong>${data.main.temp}&deg;C</strong>`
    forecastDiv.appendChild(today);
}

const displayForecast = (data) => {

    const tomorrow = document.createElement("p");
    const afterTomorrow = document.createElement("p");
    const threeDaysAfter = document.createElement("p");

    const tomorrowDate = new Date(data.list[5].dt * 1000);
    const afterTomorrowDate = new Date(data.list[15].dt * 1000);
    const threeDaysAfterDate = new Date(data.list[25].dt * 1000);

    tomorrow.innerHTML = `${tomorrowDate.toDateString()}: <strong>${data.list[3].main.temp}&deg;C</strong>`;
    afterTomorrow.innerHTML = `${afterTomorrowDate.toDateString()}: <strong>${data.list[11].main.temp}&deg;C</strong>`;
    threeDaysAfter.innerHTML = `${threeDaysAfterDate.toDateString()}: <strong>${data.list[19].main.temp}&deg;C</strong>`;

    forecastDiv.appendChild(tomorrow);
    forecastDiv.appendChild(afterTomorrow);
    forecastDiv.appendChild(threeDaysAfter);
}

weather();
forecast();

//company spotlights

const directoryJSON = "data/members.json";
const cards = document.getElementById("cards");

async function getCompaniesData(directoryJSON) {
    const response = await fetch(directoryJSON);
    const data = await response.json();

    displayCompanies(data.companies);
}

const getGoldAndSilver = (companies) => {
    return companies.filter(company => company.membership_level === 2 || company.membership_level === 3);
};

const getRandomCompanies = (companies, num) => {
    let shuffled = companies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const displayCompanies = (companies) => {

    const goldAndSilver = getGoldAndSilver(companies);
    const randomCompanies = getRandomCompanies(goldAndSilver, 3);

    randomCompanies.forEach(company => {
        const card = document.createElement("section");
        const companyImg = document.createElement("img");
        const companyName = document.createElement("h3");
        const companyPhone = document.createElement("p");
        const companyAddress = document.createElement("p");
        const companyUrl = document.createElement("p");
        const companyLevel = document.createElement("p");

        const companyImgContainer = document.createElement("div");
        companyImgContainer.classList.add("img-container");

        companyImg.setAttribute("src", `images/${company.image}`);
        companyImg.setAttribute("alt", company.name);
        companyImg.setAttribute("loading", "lazy");
        companyImg.setAttribute("width", "150");
        companyImg.setAttribute("height", "150")

        companyName.innerHTML = company.name;
        companyAddress.innerHTML = company.address;
        companyPhone.innerHTML = company["phone"];
        companyUrl.innerHTML = company.website;

        if (company.membership_level === 3) {
            companyLevel.innerHTML = `Membership: Gold`
        } else if (company.membership_level === 2) {
            companyLevel.innerHTML = `Membership: Silver`
        }


        companyImgContainer.appendChild(companyImg);
        card.appendChild(companyImgContainer);
        card.appendChild(companyName);
        card.appendChild(companyAddress);
        card.appendChild(companyPhone);
        card.appendChild(companyUrl);
        card.appendChild(companyLevel);

        cards.appendChild(card);
    });
};

getCompaniesData(directoryJSON);