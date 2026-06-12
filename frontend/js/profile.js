const user = JSON.parse(

localStorage.getItem(

"user"

)

);

if(!user){

window.location.href=

"login.html";

}

document.getElementById(

"name"

).value=user.name;

document.getElementById(

"email"

).value=user.email;

document.getElementById(

"logoutBtn"

).addEventListener(

"click",

()=>{

localStorage.removeItem(

"token"

);

localStorage.removeItem(

"user"

);

window.location.href=

"login.html";

}

);