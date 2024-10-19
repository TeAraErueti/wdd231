const message = document.getElementById("message");
const msToDays = 86400000;
const dateToday = new Date();
const lastVisitKey = "lastVisit";

const displayVisitMessage = () => {
  const lastVisit = localStorage.getItem(lastVisitKey);
  if (!lastVisit) {
    message.innerHTML = "Welcome! Let us know if you have any questions";
  } else {
    const lastVisistDate = new Date(lastVisit);
    const timeDifference = dateToday - lastVisistDate;
    const daysSinceLastVisit = Math.floor(timeDifference / msToDays);

    if (daysSinceLastVisit < 1) {
      message.innerHTML = "Back so soon! Awesome!";
    } else {
      message.innerHTML = `You last visited ${daysSinceLastVisit} day${
        daysSinceLastVisit > 1 ? "s" : ""
      } ago.`;
    }
  }
  localStorage.setItem(lastVisitKey, dateToday.toISOString());
};

displayVisitMessage();