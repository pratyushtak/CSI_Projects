async function getData() {
    try {
        const result = await fetchData();
        console.log(result);
    } catch (error) {
        console.log("Error:", error);
    }
}

getData();
