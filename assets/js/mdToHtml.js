function mdToHtml(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(text => {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(text);
            callback.innerHTML = html;
        });
}