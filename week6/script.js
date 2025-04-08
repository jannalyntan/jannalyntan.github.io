const myButton = document.querySelector("#my-button");
console.log(myButton);
myButton.addEventListener("click", handleClick);
const topHeading = document.querySelector("h1");

function handleClick() {
  console.log("hey did you just click me?");
  topHeading.textContent = "This is my new top heading";
  topHeading.style.color = "red";
}

//console.log(topHeading);
//console.log(topHeading.textContent);

const header = document.querySelector("header");
console.log(header);
console.log(header.textContent);
//console.log(header.innerHTML);
//let course = "OART1013";
//header.innerHTML += `<h1>my course is ${course}</h1>`;

const allParas = document.querySelectorAll("p");
//console.log(allParas);
for (let i = 0; i < allParas.length; i++) {
  //console.log(allParas[i].textContent);
  allParas[i].style.border = "1px solid blue";
  allParas[i].style.backgroundColor = "beige";
}

const mySubHeading = document.querySelector("#first-subheading");
//console.log(mySubHeading);
//console.log(mySubHeading.textContent);

const allSubHeadings = document.querySelector("h2");
//console.log(allSubHeadings);
for (let i = 0; i < allSubHeadings.length; i++) {
  //console.log(allSubHeadings[i].textContent);
}
