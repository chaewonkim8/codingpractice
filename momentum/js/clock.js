const clock = document.getElementById("clock")

function sayHello(){
    console.log("hello");
}

setInterval(sayHello, 500);

setTimeout(sayHello, 500);