//notes in README.md

//only keeps the fruit name that are longer than 5 characters.
    const Fruits = ['apple', 'banana', 'mango', 'orange'];
    const LongFruits = Fruits.filter(fruit => fruit.length > 5);
    // console.log(LongFruits);

//picks out the people who are adults(age 18 and above);
    const People = [
        {name: "Alice", age: 17},
        {name: "Bob", age: 43},
        {name: "Carl", age: 19},
    ];
    const Adults = People.filter(person => person.age >= 18);
    console.log(Adults);

//using boolean as the filter callback removes all the falsy values.
    const MixedArr =  [0, 'hello', null, 42, undefined];
    const Falsy = MixedArr.filter(Boolean);
    console.log(Falsy);

 //keeps only items at even indices.
    const Letters = ['a', 'b', 'c', 'd'];
    const EvenIndexLetters = Letters.filter((_, index) => index % 2 === 0);
    console.log(EvenIndexLetters);