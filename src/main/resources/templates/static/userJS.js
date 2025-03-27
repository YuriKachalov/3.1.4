alert('sdvsdvsv')
//
    const SERVER_URL = 'http://localhost:8080/api';

    async function fetchCurrentUser() {
    const response = await fetch(`${SERVER_URL}/user`);
    return await response.json();
}

    async function renderCurrentUser() {
    const currentUser = await fetchCurrentUser();
    render([currentUser]); // передаем массив с одним пользователем
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

    renderCurrentUser();
