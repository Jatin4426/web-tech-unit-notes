
const courseUnits = [
    {
        title: "Unit 1: Introduction to Web Technology",
        topics: [
            "Introduction to Internet",
            "World Wide Web (WWW)",
            "Web Browsers and Web Servers",
            "HTTP and HTTPS",
            "URL and Domain Names",
            "Client-Server Architecture"
        ]
    },
    {
        title: "Unit 2: HTML and CSS",
        topics: [
            "Introduction to HTML",
            "HTML Tags and Elements",
            "HTML Forms and Tables",
            "Introduction to CSS",
            "CSS Selectors",
            "CSS Box Model"
        ]
    },
    {
        title: "Unit 3: JavaScript",
        topics: [
            "Introduction to JavaScript",
            "Variables and Data Types",
            "Operators and Expressions",
            "Functions and Events",
            "DOM Manipulation",
            "JavaScript Validation"
        ]
    },
    {
        title: "Unit 4: Web 2.0 and Web 3.0",
        topics: [
            "Introduction to Web 2.0",
            "Blogs, Wikis and Social Networking Sites",
            "AJAX and RSS",
            "Web APIs and Mashups",
            "Semantic Web",
            "Blockchain and Edge Computing"
        ]
    },
    {
        title: "Unit 5: Advanced Web Technologies",
        topics: [
            "Web 4.0",
            "Internet of Things (IoT)",
            "Cloud Computing",
            "Artificial Intelligence in Web",
            "Progressive Web Applications",
            "Web Security"
        ]
    }
];

const unitContainer = document.getElementById("unitContainer");
const searchInput = document.getElementById("searchInput");

// Get completed topics from Local Storage
let completedTopics = JSON.parse(
    localStorage.getItem("completedTopics") || "[]"
);

// Display all units
function displayUnits(filter = "") {
    unitContainer.innerHTML = "";

    courseUnits.forEach((unit, unitIndex) => {

        const filteredTopics = unit.topics.filter(topic =>
            topic.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredTopics.length === 0) return;

        const unitDiv = document.createElement("div");
        unitDiv.className = "unit";

        const title = document.createElement("div");
        title.className = "unit-title";
        title.innerHTML = `
            <span>${unit.title}</span>
            <span>+</span>
        `;

        const topicsDiv = document.createElement("div");
        topicsDiv.className = "topics";

        filteredTopics.forEach(topic => {

            const topicDiv = document.createElement("div");
            topicDiv.className = "topic";

            if (completedTopics.includes(topic)) {
                topicDiv.classList.add("completed");
            }

            const label = document.createElement("label");
            label.textContent = topic;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = completedTopics.includes(topic);

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    if (!completedTopics.includes(topic)) {
                        completedTopics.push(topic);
                    }
                    topicDiv.classList.add("completed");
                } else {
                    completedTopics = completedTopics.filter(
                        item => item !== topic
                    );
                    topicDiv.classList.remove("completed");
                }

                localStorage.setItem(
                    "completedTopics",
                    JSON.stringify(completedTopics)
                );
            });

            topicDiv.appendChild(label);
            topicDiv.appendChild(checkbox);

            topicsDiv.appendChild(topicDiv);
        });

        title.addEventListener("click", () => {
            const isOpen = topicsDiv.style.display === "block";

            topicsDiv.style.display = isOpen ? "none" : "block";
            title.lastElementChild.textContent = isOpen ? "+" : "−";
        });

        // Automatically open units when searching
        if (filter.trim() !== "") {
            topicsDiv.style.display = "block";
            title.lastElementChild.textContent = "−";
        }

        unitDiv.appendChild(title);
        unitDiv.appendChild(topicsDiv);

        unitContainer.appendChild(unitDiv);
    });

    if (unitContainer.innerHTML === "") {
        unitContainer.innerHTML =
            "<p>No matching topics found.</p>";
    }
}

// Search functionality
searchInput.addEventListener("input", event => {
    displayUnits(event.target.value);
});

// Initial display
displayUnits();
