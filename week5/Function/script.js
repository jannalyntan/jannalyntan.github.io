let a = 10;
let b = 20;

//function
//doing so can auto help to print out the action
function addition(a, b) {
  //curly brackets are like a barrier nothing else outside is affected
  let c = a + b;
  // console.log(c);

  return c;
}

function subtract(a, b) {
  let res = a - b;
  // console.log(c);

  return res;
}

function whatIsMyGrade(marks) {
  if (marks > 80) {
    return "HD";
  } else if (marks < 40) {
    return "Fail";
  } else if ((marks = 50)) {
    return "just pass";
  }
}

{
  let marks = 50;
  let grade = whatIsMyGrade(marks);
  console.log(grade);
}

{
  let marks = 39;
  let grade = whatIsMyGrade(marks);
  console.log(grade);
}

let total = addition(a, b);
console.log(total);

total = addition(a, b);
console.log(total);
let result = subtract(12, 4);
console.log(result);
