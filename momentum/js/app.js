const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("#login-form input");
const greeting = document.getElementById("greeting")

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username"

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    loginForm.classList.add(HIDDEN_CLASSNAME);
    paintGreetings(username);
}

loginForm.addEventListener("submit", onLoginSubmit);

function paintGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSNAME)
    greeting.innerText = `Hello ${username}`
    //show the greetings
}

const savedUsername = localStorage.getItem("username")

if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME)
    loginForm.addEventListener("submit", onLoginSubmit)
    //show the form
} else {
    paintGreetings(savedUsername);
}