AOS.init();

// Define your routes, each associated with the element ID to display:
const routes = {
    "/": "home",
    "/steps": "steps",
    // add more routes as needed
};

// Simple function to navigate to a specific route
function navigateTo(route) {
    window.history.pushState({}, "", route);
    // Display the appropriate element:
    document.getElementById(routes[window.location.pathname]).style.display = 'block';
}

// Adding form Submission
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting which reloads the page

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    fetch("/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(err => console.error(err));
});