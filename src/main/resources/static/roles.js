async function fetchServerUrl() {
    const response = await fetch('/api/config');
    return await response.text(); // или response.json(), если Вы вернете JSON
}

// вывод ролей для выбора в Add new user
async function fetchRoles() {
    const SERVER_URL = await fetchServerUrl();
    const response = await fetch(SERVER_URL + '/api/roles');
    const roles = await response.json();
    populateSelect(roles);
}

function populateSelect(roles) {
    const selectElement = document.getElementById('roles');
    selectElement.innerHTML = '';

    roles.forEach(role => {
        const option = document.createElement('option');

        option.textContent = role.role;
        selectElement.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', fetchRoles);

// вывод ролей для выбора в Edit
async function fetchRolesEdit() {
    const SERVER_URL = await fetchServerUrl();
    const response = await fetch(SERVER_URL + '/api/roles');
    const roles = await response.json();
    populateSelectEdit(roles);
}

function populateSelectEdit(roles) {
    const selectElement = document.getElementById('modalRole');
    selectElement.innerHTML = '';

    roles.forEach(role => {
        const option = document.createElement('option');

        option.textContent = role.role;
        selectElement.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', fetchRolesEdit);

// вывод ролей для Delete
async function fetchRolesDelete() {
    const SERVER_URL = await fetchServerUrl();
    const response = await fetch(SERVER_URL + '/api/roles');
    const roles = await response.json();
    populateSelectDelete(roles);
}

function populateSelectDelete(roles) {
    const selectElement = document.getElementById('roleDelete');
    selectElement.innerHTML = '';

    roles.forEach(role => {
        const option = document.createElement('option');

        option.textContent = role.role;
        selectElement.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', fetchRolesDelete);