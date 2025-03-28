let listUser = [
    {
        id: 2,
        name: "oleg",
        surname: "smirnov",
        age: 23,
        email: "fdfdf@dfdd.ru",
        role: "ROLE_USER"
    },
    {
        id: 3,
        name: "oleg",
        surname: "smirnov",
        age: 23,
        email: "fdfdf@dfdd.ru",
        role: "ROLE_USER"
    }
]

function $getUserTR(userObj){
    const $tr = document.createElement("tr")
    const $tdid = document.createElement("td")
    const $tdname = document.createElement("td")
    const $tdsurname = document.createElement("td")
    const $tdage = document.createElement("td")
    const $tdemail = document.createElement("td")
    // const $tdpassword = document.createElement("td")
    const $tdrole = document.createElement("td")
    const $tdEdit = document.createElement("td");

    $tdid.textContent = userObj.id
    $tdname.textContent = userObj.name
    $tdsurname.textContent = userObj.surname
    $tdage.textContent = userObj.age
    $tdemail.textContent = userObj.email
    // $tdpassword.textContent = userObj.password
    $tdrole.textContent = userObj.role


    // Настраиваем кнопку Edit
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn-info";
    editButton.textContent = "Edit";
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#modal1");

    // Добавляем обработчик события на кнопку Edit
    editButton.addEventListener("click", () => {
        console.log(`Editing user: ${userObj.id}`);
    });

    // Исправлено: используем editButton вместо $editButton
    $tdEdit.appendChild(editButton);

    $tr.append($tdid, $tdname, $tdsurname, $tdage, $tdemail, $tdrole, $tdEdit);
return $tr
}

function render(arr){
    let copyArr=[...arr]

    const $userTable= document.getElementById("user-table")

    $userTable.innerHTML = ''
    for (const userObj of listUser) {
        const $newTr = $getUserTR(userObj)
        $userTable.append($newTr)
    }
}
render(listUser)

document.getElementById("add-form").addEventListener("submit",
    function (event){
    event.preventDefault()
    })


