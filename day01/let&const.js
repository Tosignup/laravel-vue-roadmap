//notes in README.md

{
//!this won't work
// console.log(x);
let x = 15;
}

let x = 10;

{
let x = 20;
 console.log(`${x} inside block scope`);
}
console.log(`${x} outside block scope`);

{
const PI = 3.14;
//!X = 100; this won't work.
}

const CARS = ['Saab', 'Volvo', 'BMW'];

CARS[0] = 'Toyota';

CARS.forEach(car => {
    console.log(car);
})

/*
CARS = ['Toyota', 'Volvo', 'BMW'];
*/