const levelsJSON = "./data/memberlevels.json";

function getCurrentTimestamp() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    console.log(formattedDateTime);
    return formattedDateTime;
}

window.onload = function () {
    const timestampField = document.getElementById('timestamp');
    timestampField.value = getCurrentTimestamp();
};

async function getLevelsInfo() {
    try {
        const response = await fetch(levelsJSON);
        if (response.ok) {
            const data = await response.json();
            displayLevels(data.membershipLevels);
        } else {
            throw Error(await response.text())
        }
    } catch (error) {
        console.log(error);
    };
};

const displayLevels = (membershipLevels) => {
    membershipLevels.forEach(level => {
        const card = document.createElement("section");
        const levelName = document.createElement("h3")
        const levelButton = document.createElement("button")

        levelName.innerHTML = `${level.level} Level`;
        levelButton.innerHTML = "Learn More!";

        card.classList.add(level.levelName);
        card.appendChild(levelName);
        card.appendChild(levelButton);

        const levelCard = document.getElementById("levels");
        levelCard.appendChild(card);

        levelButton.addEventListener("click", () => {
            displayLevelDetails(level);
        })

    });
}

getLevelsInfo()

//Modal
const displayLevelDetails = (level) => {
    const membershipModal = document.getElementById("levelsInfo");

    const benefitsList = document.createElement("ul");

    level.benefits.forEach(benefit => {
        const listItem = document.createElement("li");
        listItem.innerHTML = benefit;
        benefitsList.appendChild(listItem);
    });

    membershipModal.innerHTML = `
    <button id="closeModal">X</button>
    <h2>${level.level} Level</h2>
    <h4>Cost: ${level.cost} Dollars Per Year</h4>
    <h3>Benefits:</h3>
    `;

    membershipModal.appendChild(benefitsList);

    membershipModal.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        membershipModal.close();
    });
}