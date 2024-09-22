const mainNav = document.querySelector(".navigation");
const hamButton = document.getElementById("menu");
const header = document.querySelector("header");

hamButton.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    hamButton.classList.toggle("show");
    header.classList.toggle("hide-header");
});

const currentPage = window.location.href.split('/').pop();
const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
    const linkPage = link.href.split('/').pop();
    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const coursesDiv = document.getElementById("courses");
const totalCreditsDiv = document.getElementById("totalCredits");
const allCourses = document.getElementById("all");
const wddCourses = document.getElementById("wdd");
const cseCourses = document.getElementById("cse");

displayCourses(courses);

allCourses.addEventListener("click", () => {
    displayCourses(courses);
});
wddCourses.addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject == "WDD"));
});
cseCourses.addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject == "CSE"));
});


function displayCourses(coursesFiltered) {
    coursesDiv.innerHTML = "";
    coursesFiltered.forEach(course => {
        const courseSubject = document.createElement("p");

        courseSubject.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;

        coursesDiv.appendChild(courseSubject)

        if (course.completed === true) {
            courseSubject.classList.add("completed");
        }
        else {
            courseSubject.classList.add("incomplete");
        }
    });

    const totalCredits = coursesFiltered.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    totalCreditsDiv.innerHTML = `<h3>Total Required Credits: ${totalCredits}</h3>`;
};


const currentYear = new Date().getFullYear();
console.log(currentYear);
document.getElementById("currentyear").innerText = currentYear;
document.getElementById('lastModified').innerText = document.lastModified;