const button1 = document.querySelector("#button1");
console.log(button1);

const button2 = document.querySelector("#button2");
console.log(button2);

const button3 = document.querySelector("#button3");
console.log(button3);

const button4 = document.querySelector("#button4");
console.log(button4);

const button5 = document.querySelector("#button5");
console.log(button5);

const button6 = document.querySelector("#button6");
console.log(button6);

const button7 = document.querySelector("#button7");
console.log(button7);

const button8 = document.querySelector("#button8");
console.log(button8);

const button9 = document.querySelector("#button9");
console.log(button9);

const button10 = document.querySelector("#button10");
console.log(button10);

button1.addEventListener("click", dropCan);

function dropCan() {
  const can = document.getElementById("can");
  can.classList.remove("animate"); // reset if it was already used
  void can.offsetWidth; // trigger reflow for restart
  can.classList.add("animate");
}
