const myBtn = document.querySelector("#my-btn");

const myInput = document.querySelector("#my-input");
const myDuck = document.querySelector("#my-duck");

myBtn.addEventListener("click", moveInput);

let clicked = false;

function moveInput() {
  if (!clicked) {
    myInput.style.translate = "10px 20px";
    myDuck.style.translate = "0px -200px";
    clicked = true;
  } else {
    myInput.style.translate = "0px 0px";
    myDuck.style.translate = "0px 0px";
    clicked = false;
  }
}
