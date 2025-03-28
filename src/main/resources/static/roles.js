// вывод ролей для выбора в Add new user
async function fetchRoles() {
    const response = await fetch('http://localhost:8080/api/roles');
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
    const response = await fetch('http://localhost:8080/api/roles');
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
    const response = await fetch('http://localhost:8080/api/roles');
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