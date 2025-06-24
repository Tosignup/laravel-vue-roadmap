//notes in README.md

// Dot Notation - this is the common and readable way, used when you know the name of the property.
    const Person = {name: "Alice", age: 17};
    console.log(Person.name);

//Bracket Notation - useful when the property name is stored in a variable or contains special character
    const Prop = 'age';
    console.log(Person[Prop]);
    
//also works when keys have spaces or non-standard characters.
    const settings = {'theme-color': 'dark'};
    console.log(settings['theme-color']);

//Nested Access - access properties inside of objects within objects.
    const User = {
        profile: {
            name: 'John123',
            email: 'john123@example.com',
        }
    };
    console.log(User.profile.email);

//Optional Chaining (?.) - safely access nested properties without risking an error if part of the chain is undefined or null.
    console.log(User.settings?.theme);

//check if a property exists
    const Item = {name: 'Phone'};
    console.log('name' in Item);
    console.log(Item.hasOwnProperty('name'));