let massMark=parseFloat(prompt("Enter Weight Of Mark(Unit Kg)"));
let heightMark=parseFloat(prompt("Enter Height Of Mark(Unit Meter)"));
let massJohn=parseFloat(prompt("Enter Weight Of John(Unit Kg)"));
let heightJohn=parseFloat(prompt("Enter Height Of John(Unit Meter)"));

let BMIMark = massMark / (heightMark * heightMark);
let BMIJohn = massJohn / (heightJohn * heightJohn);

console.log("BMI of Mark:" + BMIMark);
console.log("BMI of John:" + BMIJohn);

let markHigherBMI = BMIMark > BMIJohn;

if (markHigherBMI) {
    console.log("Mark has a higher BMI than John.");
} else {
    console.log("John has a higher BMI than Mark.");
}