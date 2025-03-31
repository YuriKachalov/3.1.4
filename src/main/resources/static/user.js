const SERVER_URL = window.location.origin;

async function fetchCurrentUser() {
    const response = await fetch(`${SERVER_URL}/api/user`);
    return await response.json();
}

async function renderCurrentUser() {
    const currentUser = await fetchCurrentUser();
    const userRole = currentUser.roleSet.map(role => role.role).join(', '); // Получаем роли пользователя
    showAdminLink(userRole); // Передаем роли в функцию показа ссылки
    render([currentUser]); // передаем массив с одним пользователем
}

function showAdminLink(userRole) {
    const adminItem = document.getElementById('admin-item');
    if (userRole.includes('ROLE_ADMIN')) { // Проверяем, есть ли роль Admin
        adminItem.style.display = 'list-item'; // Показываем элемент
    } else {
        adminItem.style.display = 'none'; // Скрываем элемент
    }
}

function $getNewUserTR(userObj) {
    const $tr = document.createElement("tr");
    const $tdId = document.createElement("td");
    const $tdName = document.createElement("td");
    const $tdSurname = document.createElement("td");
    const $tdAge = document.createElement("td");
    const $tdEmail = document.createElement("td");
    const $tdRole = document.createElement("td");

    $tdId.textContent = userObj.id;
    $tdName.textContent = userObj.name;
    $tdSurname.textContent = userObj.surname;
    $tdAge.textContent = userObj.age;
    $tdEmail.textContent = userObj.email;

    // Обработка ролей
    $tdRole.textContent = userObj.roleSet.map(role => role.role).join(', ');
    $tr.append($tdId, $tdName, $tdSurname, $tdAge, $tdEmail, $tdRole);
    return $tr;
}

function render(arr) {
    const $userTable = document.getElementById("user-table");
    // очищаем tbody
    $userTable.innerHTML = '';

    for (const userObj of arr) {
        const $newTr = $getNewUserTR(userObj);
        $userTable.append($newTr);
    }
}

// Вызов функции при загрузке страницы
renderCurrentUser();