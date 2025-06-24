//notes in README.md

//convert an array of numbers to their squares:
    const numbers = [1, 2, 3, 4];
    const squares = numbers.map(num => num * num);
    // console.log(squares); //[1, 4, 9, 16]


//Extract names from array of objects:
    const users = [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bow"},
    {id: 3, name: "Carl"},
    ];

    const names = users.map(user => user.name);
    // console.log(names);


//include the index in the transformation
    const Fruits = ['mango', 'banana', 'apple'];
    const indexedFruits = Fruits.map((fruit, index) => `${index + 1}: ${fruit}`);
    // console.log(indexedFruits);


 //combine map() with filter():
    const Numbers = [1,2,3,4,5];
    const EvenSquaredNumbers = Numbers.filter(num => num % 2 === 0) //filter even numbers
    .map(num => num * num); //square them
    // console.log(EvenSquaredNumbers);