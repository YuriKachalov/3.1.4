alert('dfhgdfhvkd')

//
// let listUser = [
//     {
//         id: 1,
//         name: "gdgf",
//         surname: "dgbd",
//         age: 12,
//         email: "drg@dfvd.ru",
//         role:"dgdf"
//     }
// ]
//
// //создаем tr
// function $getNewUserTR(userOdj){
//     const $tr = document.createElement("tr")
//     const $tdId = document.createElement("td")
//     const $tdName = document.createElement("td")
//     const $tdSurname = document.createElement("td")
//     const $tdAge = document.createElement("td")
//     const $tdEmail = document.createElement("td")
//     const $tdRole = document.createElement("td")
//
//     $tdId.textContent=userOdj.id
//     $tdName.textContent=userOdj.name
//     $tdSurname.textContent=userOdj.surname
//     $tdAge.textContent=userOdj.age
//     $tdEmail.textContent=userOdj.email
//     $tdRole.textContent=userOdj.role
//
//     $tr.append($tdId, $tdName,$tdSurname, $tdAge, $tdEmail, $tdRole)
//     return $tr
// }
//
// function redner(arr){
//     let copyArr=[...arr]
//     //переменная для tbody
//     const $userTable = document.getElementById("user-table")
//     $userTable.innerHTML='' //очищаем tbody
//
//     for (const userOdj of copyArr) {
//         const $newTr = $getNewUserTR(userOdj)
//         $userTable.append($newTr)
//     }
// }
// redner(listUser)