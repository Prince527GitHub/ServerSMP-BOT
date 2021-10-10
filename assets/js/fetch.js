async function fetchUrl(url) {
    return await fetch(url).then(async(response) => {
        return await response.json();
    });
}