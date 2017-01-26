function fetchImageUrl() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', "https://unsplash.it/list", true)
    xhr.send()
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            const result = Object.keys(response).map(function(key) {
                return "https://unsplash.it/" + this[key]["filename"];
            }, response)
            console.log(result[3])
        }

    }
}