const message = document.getElementById("message");
const msToDays = 86400000;
const dateToday = new Date();
const lastVisitKey = "lastVisit";

const displayVisitMessage = () => {
    const lastVisit = localStorage.getItem(lastVisitKey);
    if (!lastVisit) {
        message.innerHTML = "Welcome to Health & Wellbeing! The website that offers a range of fitness and nutrition advice. We are pleased to have you here. We hope you enjoy exploring our website. Please feel free to subscribe at the bottom of our home page or get in contact with us via phone or email.";
    } else {
        const lastVisistDate = new Date(lastVisit);
        const timeDifference = dateToday - lastVisistDate;
        const daysSinceLastVisit = Math.floor(timeDifference / msToDays);

        if (daysSinceLastVisit < 1) {
            message.innerHTML = "Welcome back! We love to see people engage with our website and appreciate your support. Please feel free to get in touch if you have any queries regarding fitness or nutrition.";
        } else {
            message.innerHTML = `Thank you so much for your continual support and engagement with our website! Your last visit was ${daysSinceLastVisit} day${daysSinceLastVisit > 1 ? "s" : ""
                } ago. We appreciate you and hope you have a wonderful time exploring Health & Wellbeing.`;
        }
    }
    localStorage.setItem(lastVisitKey, dateToday.toISOString());
};

displayVisitMessage();