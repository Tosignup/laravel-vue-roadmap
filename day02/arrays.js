//notes in README.md

//It is common to declare array using `const` keyword.
const Cars = ["Saab", "Toyota", 'Volvo'];

//Spaces and line breaks are not important. A declaration can span multiple lines:
{
    //using brackets {} to prevent block-scope error
    const Cars = [
        "Saab",
        "Toyota",
        'Volvo'
    ];
}

//You can also declare an empty array, and provide the elements afterwards.
{    
    const Cars = [];
    Cars[0] = "BMW";
    Cars[1] = "Ford";
}

//Using the JS keyword `new`
{
    const Cars = new Array("BMW", "Volvo", "Audi");
}

{
    //you can access an array elements by referring to its index number:
    const Cars = ["Saab", "Toyota", 'Volvo'];
    let car1 = Cars[0]; //car1 = Saab

    //this statement changes the value of first element in Cars
    Cars[0] = 'Ford'

    //the JS method `toString()` converts an array to a string of (comma separated) array values.
    let carStr = Cars.toString();
    //console.log(carStr);

    //in JS, you can access the full array by referring to its array name:
    //console.log(Cars); //[ 'Ford', 'Toyota', 'Volvo' ]
}


const Person = ["John", "Doe", 20];
//in this example, Person[0] return "John":
// console.log(Person[0]);

{
    const Person = {firstName: "John", lastName: "Doe", age: 20};
    //in this example, Person.firstName returns "John":
    // console.log(Person.firstName);
}