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