function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 1000);
    });
}

fetchData()
    .then(result => console.log(result))
    .catch(error => console.log("Error:", error));
