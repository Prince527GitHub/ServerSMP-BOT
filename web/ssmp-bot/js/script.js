const loading = document.getElementById("loading");
const body = document.getElementById("body");
const root = document.querySelector(":root");

root.style.setProperty("--color", `#${((1<<24)*Math.random()|[0]).toString(16)}`);

window.onload = () => setTimeout(() => {
    loading.classList.add("disabled");
    body.classList.remove("disabled")
}, 1550);

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile
            .Windows());
    }
};

if (isMobile.any()) window.location.href = 'https://serversmp-api.herokuapp.com/bot';