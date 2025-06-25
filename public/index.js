const header = document.getElementById("header");
header.innerHTML = new Date().toLocaleString();
setInterval(() => {
    header.innerHTML = new Date().toLocaleString();
}, 1000);

function deleteIndex() {
    document.getElementById("index").value = "";
}

function deleteName() {
    document.getElementById("name").value = "";
}