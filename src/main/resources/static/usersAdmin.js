let listUser = []
const csrfToken = getCsrfToken();

async function fetchServerUrl() {
    const response = await fetch(`/api/config`);
    return await response.text(); // или response.json(), если Вы вернете JSON
}

//получение токкена
function getCsrfToken() {
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    return token ? token.split('=')[1] : null;
}

// функция для вывода всех user
async function fetchCurrentUser() {
    const SERVER_URL = await fetchServerUrl();
    const response = await fetch(`${SERVER_URL}/api/admin`);
    return await response.json();
}

async function renderCurrentUser() {
    const currentUsers = await fetchCurrentUser();
    listUser.push(...currentUsers);
    render(currentUsers);
}

//добавление нового user
async function serverAddUser(obj) {
    const SERVER_URL = await fetchServerUrl();
    let response = await fetch(`${SERVER_URL}/api/admin-update`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(obj),
    })
    return await response.json()
}

//изменение user
async function serverEditUser(obj) {
    const SERVER_URL = await fetchServerUrl();
    let response = await fetch(`${SERVER_URL}/api/admin-edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(obj),
    })
    return await response.json()
}

//удаление user
async function serverDeleteUser(obj) {
    const SERVER_URL = await fetchServerUrl();
    let response = await fetch(`${SERVER_URL}/api/admin-delete`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(obj),
    })
    return await response.json()
}


function $getNewUserTR(userObj) {
    const $tr = document.createElement("tr");
    const $tdId = document.createElement("td");
    const $tdName = document.createElement("td");
    const $tdSurname = document.createElement("td");
    const $tdAge = document.createElement("td");
    const $tdEmail = document.createElement("td");
    const $tdRole = document.createElement("td");
    const $tdEdit = document.createElement("td");
    const $btnEdit = document.createElement("button");
    const $tdDelete = document.createElement("td");
    const $btnDelete = document.createElement("button");

    $btnEdit.classList.add("btn", "btn-info")
    $btnEdit.textContent = "Edit"
    $btnDelete.classList.add("btn", "btn-danger")
    $btnDelete.textContent = "Delete"


    $tdId.textContent = userObj.id;
    $tdName.textContent = userObj.name;
    $tdSurname.textContent = userObj.surname;
    $tdAge.textContent = userObj.age;
    $tdEmail.textContent = userObj.email;

    // Обработка ролей
    $tdRole.textContent = userObj.roleSet.map(role => role.role).join('  ');

    // Обработчик клика на кнопку Edit
    $btnEdit.addEventListener('click', () => {
        // Заполнение модального окна данными пользователя
        document.getElementById('modalId').value = userObj.id;
        document.getElementById('modalName').value = userObj.name;
        document.getElementById('modalSurname').value = userObj.surname;
        document.getElementById('modalAge').value = userObj.age;
        document.getElementById('modalEmail').value = userObj.email;
        document.getElementById('modalRole').value = userObj.roleSet.map(role => role.role).join(', ');

        // Открытие модального окна
        const modal = new bootstrap.Modal(document.getElementById('modal1'));
        modal.show();
    });
    // Обработчик клика на кнопку Delete
    $btnDelete.addEventListener('click', () => {

        document.getElementById('idDelete').value = userObj.id;
        document.getElementById('nameDelete').value = userObj.name;
        document.getElementById('surnameDelete').value = userObj.surname;
        document.getElementById('ageDelete').value = userObj.age;
        document.getElementById('emailDelete').value = userObj.email;
        document.getElementById('roleDelete').value = userObj.roleSet.role;

        // Открытие модального окна
        const modalDelete = new bootstrap.Modal(document.getElementById('modal'));
        modalDelete.show();
    });

    $tdEdit.append($btnEdit)
    $tdDelete.append($btnDelete)

    $tr.append($tdId, $tdName, $tdSurname, $tdAge, $tdEmail, $tdRole, $tdEdit, $tdDelete);
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

//копка добавления  Add new user
document.getElementById("add-form").addEventListener("submit", async function (event) {
    event.preventDefault()
//обработка role
    const selectElement = document.getElementById('roles');
    const selectedRoles = Array.from(selectElement.selectedOptions).map(option => ({
        // id: option.id,
        role: option.value
    }));

    let newUserObj = {
        name: document.getElementById("name2").value,
        surname: document.getElementById("surname2").value,
        age: parseInt(document.getElementById("age2").value, 10),
        email: document.getElementById("email2").value,
        passwordUser: document.getElementById("password2").value,
        roleSet: selectedRoles,
    }
    console.log(newUserObj)
    let serverDataUser = await serverAddUser(newUserObj)
    listUser.push(serverDataUser)
    render(listUser)

    const usersTabButton = document.getElementById("home-tab");
    const tab = new bootstrap.Tab(usersTabButton);
    tab.show();
    document.getElementById("add-form").reset();
})

//копка Edit
document.getElementById("editUserForm").addEventListener("submit", async function (event) {
    event.preventDefault()
//обработка role
    const selectElement = document.getElementById('modalRole');
    const selectedRoles = Array.from(selectElement.selectedOptions).map(option => ({
        role: option.value
    }));

    let newUserObj = {
        id: document.getElementById('modalId').value,
        name: document.getElementById("modalName").value,
        surname: document.getElementById("modalSurname").value,
        age: parseInt(document.getElementById("modalAge").value, 10),
        email: document.getElementById("modalEmail").value,
        passwordUser: document.getElementById("modalPassword").value,
        roleSet: selectedRoles,
    }

    let serverDataUser = await serverEditUser(newUserObj)
    const index = listUser.findIndex(user => user.id === serverDataUser.id);
    listUser[index] = serverDataUser
    render(listUser)

    // Закрытие модального окна
    const modalElement = document.getElementById('modal1');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    document.getElementById("editUserForm").reset();
})
renderCurrentUser()


//копка Delete
document.getElementById("form-Delete").addEventListener("submit", async function (event) {
    event.preventDefault()

    const UserDelete = {
        id: document.getElementById("idDelete").value
    }


    let serverDataUser = await serverDeleteUser(UserDelete)
    const index = listUser.findIndex(user => user.id === serverDataUser.id);
    listUser.splice(index, 1)
    render(listUser)

    // Закрытие модального окна
    const modalElement = document.getElementById('modal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
})
