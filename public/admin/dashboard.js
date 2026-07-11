async function loadDashboard() {

const response = await fetch("http://127.0.0.1:8000/api/admin/dashboard", {
    headers: {
        "Authorization": "Bearer " + token,
        "Accept": "application/json"
    }
});

console.log(response.status);

const data = await response.json();

console.log(data);
}
loadDashboard();
