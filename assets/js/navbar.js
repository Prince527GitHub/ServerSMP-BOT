async function navbar(file, id, type, color) {
    // fetch the links
    const fetchNav = await fetch(file);
    const navText = await fetchNav.text();

    // get the navbar div
    const navbarID = document.getElementById(id);

    let className;
    let backgroundColor;

    // select the version of the navbar
    if (type === "light") {
        className = "navbar-light bg-light";
    }

    if (type === "normal") {
        className = "navbar-dark";
        backgroundColor = "style='background-color:#1b1930;'";
    }

    if (type === "custom-dark") {
        className = "navbar-dark";
    }

    if (type === "custom-light") {
        className = "navbar-light";
    }

    if (color) backgroundColor = "style='background-color:" + color + ";'";

    // create the navbar
    navbarID.innerHTML = `<nav class='navbar navbar-expand-lg ${className}' ${backgroundColor}><div class='container-fluid'><a class='navbar-brand' href='https://serversmp.xyz/index.html'>ServerSMP</a><button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button><div class='collapse navbar-collapse' id='navbarNavAltMarkup'><div class='navbar-nav'>${navText}</div></div></div></nav>`;
}