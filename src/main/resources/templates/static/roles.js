// roles.js
async function fetchRoles() {
    const response = await fetch('http://localhost:8080/api/roles');
    const roles = await response.json();
    populateSelect(roles);
}

function populateSelect(roles) {
    const selectElement = document.getElementById('roles');
    selectElement.innerHTML = ''; // Очищаем предыдущие элементы

    roles.forEach(role => {
        const option = document.createElement('option');

        option.textContent = role.role; // Устанавливаем текст роли
        option.value = role.id; // Устанавливаем значение id роли
        selectElement.appendChild(option); // Добавляем элемент option в select
    });
}

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchRoles);