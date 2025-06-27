# Day 01

## JS ES6 + Laravel Routing

---

### JS: let, const, arrow functions, destructuring

##### `let` and `const` keyword

- `let` keyword was introduced in ES6(2015)
- `const` keyword was introduced in ES6(2016)
  - `let` and `const` needs to be declared before using. Also not hoisted.
    `let` and `const` cannot be bind to `this` keyword.

`let` and `const` have blocked scope, therefore cannot be redeclared in the same scope.

```js
let x = 10;
{
  let x = 20;
  console.log(`${x} inside block scope`);
}
console.log(`${x} outside block scope`);
```

declare variable with `const` when you know that the value won't be changed.
`const` must be assigned

```js
const PI = 3.14;
/*
 const PI;
 PI = 3.14; this won't work.
 */
```

###### Constant Array and Object

`const` can be misleading.
It defines constant reference for the value, not constant value.

###### Can

- Change the elements of constant array
- Change the properties of constant object

###### Cannot

- Reassign a constant value
- Reassign a constant array
- Reassign a constant object

```js
const CARS = ["Saab", "Volvo", "BMW"];

CARS[0] = "Toyota";

CARS.forEach((car) => {
  console.log(car);
});

/*
this leads to error because of assignment
also you can't reassign variable with `const`

CARS = ['Toyota', 'Volvo', 'BMW'];
*/
```

#### Arrow Function

Arrow Function were introduced in ES6

- allow us to write shorter function syntax:
  ```js
  //syntax
  let functonName = (params) => {
    return console.log(params);
  };

  let greetings = (params) => {
    return console.log(params);
  };
  greetings("Hello, World");
  ```
- If the function has only one statement, you can remove bracket {} and the return keyword.
  ```js
  //syntax
  let functonName = (params) => console.log(params);

  let greetings = (params) => console.log(params);
  greetings("Hello, World");
  ```
- Without arrow function
  ```js
  //syntax
  function functionName(params) {
    return console.log(params);
  }

  function greet(params) {
    console.log(params);
  }
  greet("Hello, Earth");
  ```
- If you have one parameter, parenthesis can be removed.
  ```js
  let functonName = (params) => console.log(params);

  let hello = (params) => console.log(params);
  hello("world");
  ```

##### `this` in Arrow Functions vs Regular Functions

- In regular functions, `this` keyword refers to the object that calls the function (e.g., a button, window, etc.). It changes depending on the caller.
  - Example: when a button is clicked, `this` is the button
  - `this` depends on who calls it
- In arrow functions, `this` keyword is lexically bound — it refers to the scope where the function was defined, not the object calling it. So it does not change.
  - Example: Even when the button is clicked, 'this' might still refer to window or enclosing class/object
  - `this` is fixed to the surrounding scope.

#### JS Destructuring

##### Destructuring Assignment Syntax

- unpack object properties into variables:
  ```js
  let { firstName, lastName } = person;
  ```
- it can also unpack arrays and any other iterables:
  ```js
  let [firstName, lastName] = person;
  ```
- Object Destructuring
  ```js
  const Person = {
    firstName: "John",
    lastName: "Doe",
    age: 20,
  };

  //the order of the properties does not matter:
  let { lastName, firstName } = Person;
  ```

* NOTE: Destructuring is not destructive and does not change the original object.
* for missing properties we can set default values:
  ```js
  let { firstName, lastName, country = "Philippines" } = Person;
  ```
* Object property alias
  ```js
  let { lastName: lName, firstName: fName } = Person;
  ```
* String Destructuring - this use for unpacking string characters.
  ```js
  let str = "Hello, World";

  let [str1, str2, str3, str4, str5] = str;
  ```

##### Array Destructuring

- ```js
  const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];

  let [fruit1, fruit2] = fruits;
  ```
- Skipping array values by using two or more commas
  ```js
  let [fruit1, , , fruit2] = fruits;
  ```
- Array position values
  ```js
  let { [0]: fruit1, [1]: fruit2 } = fruits;
  ```
- The Rest property - this syntax will store all the remaining values into a new array

  ```js
  const numbers = [10, 20, 30, 40, 50];

  const [a, b, ...rest] = numbers;
  ```

- Destructuring Maps
  ```js
  const Cars = new Map([
    ["Volvo", 1950],
    ["Toyota", 2000],
    ["BMW", 2015],
  ]);

  let text = "";
  for (const [key, value] of Cars) {
    text += key + " is " + value;
  }
  ```
- Swapping JS Variables

  ```js
  let firstName = "John";
  let lastName = "Doe";

  [firstName, lastName] = [lastName, firstName];
  console.log(`${lastName} ${firstName}`);
  ```

---

### Laravel: Basic routes, view passing

##### Know these:

- /routes/web.php → defines browser-accessible routes
- /resources/views/ → holds Blade templates
- /app/Http/Controllers/ → where controller logic goes
  - use to create controller
    ```zsh
    php artisan make:controller NameController
    ```
- .env → config file for app name, DB, etc.

- inside `/routes/web.php`

  ```php
  <?php
  ...
      //plain text
      //syntax
      Route::get('uri', 'action');

      Route::get('/day01', function() {
          return 'Hello, Day 1!';
      });

      //return blade view:
      Route::get('/day01', function(){
          return view('day01');  //view() params is the blade file name.
      });
      //or you can use this instead:
      Route::view('uri', 'view');
      Route::view('/day01', 'day01');

      //you can even pass data through routes:
      //syntax
      Route::view('uri', 'view', array: data);

      Route::get('/day01', function(){
          return view('day01', ['name' => 'John Doe'])
      });
      Route::view('/day01', 'day01', ['name' => 'John Doe']);
      //the data shoule be assoc array.

      //return view using controller
      Route::get('/day01', [ControllerName::class, 'methodName']);
      Route::get('/controller/day01', [Day01Controller::class, 'index']);
  ```

- insdie your `/app/Http/Controllers/Day01Controller.php`
  ```php
  <?php
      ...
      class Day01Controller extends Controller
      {
          public function index()
              {
                  return view('day01');
                  //if returning view with data
                  //return view('day01', ['name' => 'John Doe']);
              }
      }
  ```
- in your `resources/views/day01.blade.php`
  ```php
  <div>
      <h1>Hello, Day 1</h1>
  </div>
  //if returning data from routes you can use string interpolation {{$variable}}
  @isset($name)
      <div>
          <h1>Hello, {{$name}}</h1>
      </div>
  @endisset
  ```
