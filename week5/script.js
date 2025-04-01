
// no variables 0-infinity dont use quotes
let a=100;
let b =parseInt("20");
console.log (a,b);

let c =a-b;
console.log(c);


// if and else. If got smt then smt will happen
let grade= 20;
if (grade>70)
{console.log("yey you got HD");}
else {console.log("oppies you just pass");}


let weather = "rain";
if(weather === "sunny") {
    console.log ("what a nice pleasent sunny weather");}
    else { console.log ("no sun tdy");}









// +addition as well as joining
// -subtract
//*muliplication
// / division





//string variables
const myName= "Jannalyn";
console.log(myName);
const myCity = "melbourne";

const msg = ` 

<h1> I live in ${myCity} </h1>
<p> hello </p>

`;

console.log (msg);


// boolen variable TRUE FALSE
let isThisSunday= false;
let isItAfternoon= true;


// objects {name:vale, name:value}
const myStudentRecord = { 
    name: "Same", 
    id: 1234,
    course : "OART1013" ,
    isLocal : false,
}

console.log (myStudentRecord)
console.log (myStudentRecord.course)

// arrays

// Instead of writing all the names
// let sName1 = "Jann" ;
// let sName2 = "Jin" ;
// let sName3= "Sarah" ;


//do this instead
// counting starts from 0
let sNames=[ "Jann", "Jin", "Sarah"] ;
console.log(sNames[0]);


// counting start from 0 so 8 will be number 3
let numbers = [2,4,6,8,10];
console.log (numbers[3]);