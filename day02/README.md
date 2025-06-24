# Day 02

## JS Arrays & Objects + Blade Syntax

---

### JS: Arrays, map/filter, object access

##### Arrays

- Array an object type that stores data collection
- Key characteristics of JS arrays:

  - Elements - an array is a list of values, known as **elements**.
  - Ordered - array elements are ordered by index.
  - Zero indexed - the first element is at index 0, the second at index 1, and so on.
  - Dynamic size - it can grow or shrink by adding and removing elements.
  - Heterogeneous - it can store elements of different data types, [number, "string", []]

- Why use array?

  - since it can stores multiple value under single name, and you can use it to access values by to its index number.

- Creating array
  ```js
  const arrName = ['item1', item2, [], ...];
  ```
  **Note:** It is common to declare array using `const` keyword.
  ```js
  const Cars = ["Saab", "Toyota", "Volvo"];
  ```
  Spaces and line breaks are not important. A declaration can span multiple lines:
  ```js
  const Cars = ["Saab", "Toyota", "Volvo"];
  ```
  You can also declare an empty array, and provide the elements afterwards.
  ```js
  const Cars = [];
  Cars[0] = "BMW";
  Cars[1] = "Ford";
  ```
  Using the JS keyword `new`
  ```js
  {
    const Cars = new Array("BMW", "Volvo", "Audi");
  }
  ```
  **_Note:_**
  - The two declaration of array are exactly the same.
  - There is no need to use `new Array()`.
  - For simplicity, readability and execution speed , use the array literal method.
- Accessing Array Elements
  ```js
  //you can access an array elements by referring to its index number:
  const Cars = ["Saab", "Toyota", "Volvo"];
  let car1 = Cars[0]; //car1 = Saab
  ```
- Changing an Array Elements
  ```js
  //this statement changes the value of first element in Cars
  Cars[0] = "Ford";
  ```
- Converting an Array to a String
  ```js
  //the JS method `toString()` converts an array to a string of (comma separated) array values.
  Cars.toString();
  ```
- Access the full array
  ```js
  //in JS, you can access the full array by referring to its array name:
  console.log(Cars); //[ 'Ford', 'Toyota', 'Volvo' ]
  ```
- Arrays are Objects
  - in JS, the `typeof` operator returns `object` for arrays.
  - but, JS arrays are best describes as arrays.
  - Arrays use `number` to access its 'elements'.
  ```js
  const Person = ["John", "Doe", 20];
  //in this example, Person[0] return "John":
  console.log(Person[0]);
  ```
  - Objects use `names` to access its 'members'.
  ```js
  const Person = { firstName: "John", lastName: "Doe", age: 20 };
  //in this example, Person.firstName returns "John":
  console.log(Person.firstName);
  ```
- Arrays Elements can be Objects
  - JavaScript arrays can hold mixed types, including objects, functions, and even other arrays.
    ```js
    myArray[0] = Date.now;
    myArray[1] = myFunction;
    myArray[2] = myCars;
    ```

##### `map()` Method

- Powerful tool for transforming array
- It creates a new array by applying provided function to each element of the original array, without modifying the original array.
  ```js
  //syntax
  array.map(callback(currentValue, index, array), thisArg);
  ```
  - callback: a function that is called for every element in the array.
    - `currentValue`: the current element being processed.
    - index(optional): the index of the current element.
    - array(optional): the array `map()` was called on.
  - thisArg(optional): Value to use as `this` when executing the callback.
- Basic transformation
  ```js
  //convert an array of numbers to their squares:
  const numbers = [1, 2, 3, 4];
  const squares = numbers.map((num) => num * num);
  console.log(squares); //[1, 4, 9, 16]
  ```
- Extracting Properties from Objects
  ```js
  //extract names from array of objects:
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bow" },
    { id: 3, name: "Carl" },
  ];

  const names = users.map((user) => user.name);
  console.log(names);
  ```
- Using index
  ```js
  //include the index in the transformation
  const Fruits = ["mango", "banana", "apple"];
  const IndexedFruits = Fruits.map((fruit, index) => `${index + 1}: ${fruit}`);
  console.log(IndexedFruits);
  ```
- Chaining with other Methods
  ```js
  //combine map() with filter():
  const Numbers = [1, 2, 3, 4, 5];
  const EvenSquaredNumbers = Numbers.filter((num) => num % 2 === 0) //filter even numbers
    .map((num) => num * num); //square them
  console.log(EvenSquaredNumbers);
  ```
- Key points
  - `map()` does not mutate the original array.
  - It always returns a new array.
  - If no transformation needed for some elements, you can return them as-is.

##### `filter()` Method

- Method in JS
- Used to create new array containing elements from the original array that meets the specific condition.
- It doesn't modify the original array - it just returns a filtered version of it.
  ```js
  //syntax
  array.filter(callback(element, index, array), thisArg);
  ```
  - array: The original array you're working with.
  - callback: A function that's called once for each element in the array.
    - index(optional): the index of the current element.
    - array(optional): the array `filter()` was called on.
  - thisArg(optional): Value to use as `this` when executing the callback.
  - The callback should return `true` to keep the element, or `false` to skip it.
- Filtering Strings in Array
  ```js
  //only keeps the fruit name that are longer than 5 characters.
  const Fruits = ["apple", "banana", "mango", "orange"];
  const LongFruits = Fruits.filter((fruit) => fruit.length > 5);
  console.log(LongFruits);
  ```
- Filtering Objects by Property
  ```js
  //picks out the people who are adults(age 18 and above);
  const People = [
    { name: "Alice", age: 17 },
    { name: "Bob", age: 43 },
    { name: "Carl", age: 19 },
  ];
  const Adults = People.filter((person) => person.age >= 18);
  console.log(Adults);
  ```
- Removing Falsy Values
  ```js
  //using boolean as the filter callback removes all the falsy values.
  const MixedArr = [0, "hello", null, 42, undefined];
  const Falsy = MixedArr.filter(Boolean);
  console.log(Falsy);
  ```
- Filtering Based on Index
  ```js
  //keeps only items at even indices.
  const Letters = ["a", "b", "c", "d"];
  const EvenIndexLetters = Letters.filter((_, index) => index % 2 === 0);
  console.log(EvenIndexLetters);
  ```
- Key points
  - `filter()` does not mutate the original array.
  - It always returns new filtered array.
  - Commonly used to removed unwanted values, select items that meet a rule.

##### Object Access

- Accessing object property in JS can be done in a couple of flexible and powerful ways.
- Dot Notation
  ```js
  // Dot Notation - this is the common and readable way, used when you know the name of the property.
  const Person = { name: "Alice", age: 17 };
  console.log(Person.name);
  ```
- Bracket Notation
  ```js
  //Bracket Notation - useful when the property name is stored in a variable or contains special character
  const Prop = "age";
  console.log(Person[Prop]);
  //also works when keys have spaces or non-standard characters.
  const settings = { "theme-color": "dark" };
  console.log(settings["theme-color"]);
  ```
- Nested Access
  ```js
  //Nested Access - access properties inside of objects within objects.
  const User = {
    profile: {
      name: "John123",
      email: "john123@example.com",
    },
  };
  console.log(User.profile.name);
  ```
- Optional Chaining (`?.`)
  ```js
  //Optional Chaining (?.) - safely access nested properties without risking an error if part of the chain is undefined or null.
  console.log(User.settings?.theme);
  ```
- Using `in` and `hasOwnProperty()`
  ```js
  //check if a property exists
  const Item = { name: "Phone" };
  console.log("name" in Item);
  console.log(Item.hasOwnProperty("name"));
  ```

---

### Laravel: Blade loops, conditioanls

##### Blade Loop Directives

- `@foreach($items as $item)` Commonly use to loop through data:
  ```php
  <?php
      @foreach ($users as $user)
          <p>{{ $user }}</p>
      @endforeach
  ```
- You can also use:

  - `@for()` for traditional indexed loops
  - `@while()` for while loops

- `@forelse()` handles empty arrays gracefully
  - instead of using nested `@if` and `@foreach`:
  ```php
      @if (!isset($users))
          <p>No users found.</p>
      @else
          @foreach ($users as $user)
              <p>{{ $user }}</p>
          @endforeach
      @endif
  ```
  - do this instead:
  ```php
      @forelse ($users as $user)
          <p>{{ $user }}</p>
      @empty
          <p>No users found.</p>
      @endforelse
  ```

##### Blade Conditionals Directives

- Blades uses directives that mimic typical PHP conditionals:
  ```php
  @if ($user->isAdmin())
      <p>Welcome, Admin! </p>
  @elseif($user->isModerator())
      <p>Welcome, Moderator! </p>
  @else
      <p>Welcome, User! </p>
  @endif
  ```
- You can use shorthand for printing with condtions:
  ```php
  {{$user->name ?? 'Guest'}}
  ```
- `@unless()` Directives
  ```php
      @unless($user->isAdmin())
          <p>You do not have admin access.</p>
      @endunless
  ```
  - this works just like saying `if not`.
- Key points
  - `@if` checks a condition and runs the block if `true`.
  - `@elseif` adds additional condition branches after an `@if`.
  - `@else` runs when none of the previous conditions were `true`.
  - `@unless` is the opposite of `@if` - it only runs if the condition is `false`.
  - `@isset` checks if variable is set and not null.
  - `@empty` checks if variable is empty (like empty string or array).
  - **Null Coalescing Operator `??`** lets you show a default if a variable doesn't exist: `{{$user->name ?? 'Guest'}}`
