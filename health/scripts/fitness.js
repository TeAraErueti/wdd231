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
    weatherStatus.innerHTML = `${data.weather[0].description.toUpperCase()}`;
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
    today.innerHTML = `Today: <strong>${data.main.temp} &deg;C</strong>`
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


//fitness cards

const directoryJSON = "data/exercise.json";
const cards = document.querySelector("#cards");

const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
const toggle = document.querySelector("article");

async function getExerciseData(directoryJSON) {
    const response = await fetch(directoryJSON);
    const data = await response.json();

    displayExercises(data.exercises);
}

getExerciseData(directoryJSON);

const displayExercises = (exercises) => {
    cards.innerHTML = "";
    exercises.forEach(exercise => {
        const card = document.createElement("section");
        const exerciseImg = document.createElement("img");
        const exerciseName = document.createElement("h2");
        const exerciseButton = document.createElement("button");

        exerciseImg.setAttribute("src", `images/${exercise.image}`);
        exerciseImg.setAttribute("alt", exercise.name);
        exerciseImg.setAttribute("loading", "lazy");
        exerciseImg.setAttribute("width", "150");
        exerciseImg.setAttribute("height", "150");

        exerciseName.innerHTML = exercise.exercise;
        exerciseButton.innerHTML = "...";

        card.appendChild(exerciseImg);
        card.appendChild(exerciseName);
        card.appendChild(exerciseButton);

        const cards = document.getElementById("cards")
        cards.appendChild(card);

        exerciseButton.addEventListener("click", () => {
            displayExerciseInfo(inform);
        })
    });
}

gridButton.addEventListener("click", () => {
    toggle.classList.add("grid");
    toggle.classList.remove("list")

    getExerciseData(directoryJSON);
});

listButton.addEventListener("click", () => {
    toggle.classList.add("list");
    toggle.classList.remove("grid");

    getExerciseData(directoryJSON);
});


//Modal - to display exercise information and URL
const displayExerciseInfo = (exercise) => {
    const exerciseModal = document.getElementById("cards");

    const exerciseInfo = document.createElement("ul");

    exercise.info.forEach(instruction => {
        const listItem = document.createElement("li");
        listItem.innerHTML = instruction;
        exerciseInfo.appendChild(listItem);
    });

    exerciseModal.innerHTML = `
    <button id="closeModal">X</button>
    <h2>${exercise.name}</h2>
    <h4>Instructions: ${exercise.instruction}</h4>
    <h3>URL:${exercise.website}</h3>
    `;

    exerciseModal.appendChild(exerciseInfo);

    exerciseModal.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        exerciseModal.close();
    });
}