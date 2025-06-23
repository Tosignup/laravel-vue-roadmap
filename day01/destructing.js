//notes in README.md

//Object Destructuring
const Person = {
    firstName : 'John',
    lastName : 'Doe',
    age : 20,
};
//the order of the properties does not matter:
let {lastName, firstName} = Person;

//!Using brackets{} to avoid block-scope errors
{
    //for missing properties we can set default values:
    let {firstName, lastName, country = 'Philippines'} = Person;
}

{
    //Object property alias
    let {lastName: lName, firstName: fName} = Person;
    // console.log(lName)
}


//String Destructuring
let str = 'Hello, World';

let [str1, str2, str3, str4, str5] = str;
// console.log(str1);


//Array Destructuring
const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];

let [fruit1, fruit2] = fruits;

//Skipping array values by using two or more commas
{
    let [fruit1,,,fruit2] = fruits;
}

//Array position values
{
    let {[0]: fruit1, [1]: fruit2} = fruits;
}

/* 
The Rest property
    this syntax will store all the remaining values into a new array
*/

const numbers = [10, 20, 30, 40, 50];

const [a,b, ...rest] = numbers;

//Destructuring Maps
const Cars = new Map([
    ['Volvo', 1950],
    ['Toyota', 2000],
    ['BMW', 2015],
]);

let text = "";

for (const [key, value] of Cars) {
    text += key + ' is ' + value;
}
console.log(text);

//Swapping JS Variables
{
    let firstName = 'John';
    let lastName = 'Doe';

    [firstName, lastName] = [lastName, firstName];
    console.log(`${lastName} ${firstName}`);
}