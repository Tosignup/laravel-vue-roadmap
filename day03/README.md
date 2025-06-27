# Day 03

## DOM Manipulation + Laravel Forms

---

### DOM Manipulation

##### HTML DOM (Document Object Model)

- With HTML DOM, JS can access and change all the elements of an HTML Document.
- When a web page is loaded, the browser create a Document Object Model of the page.
- With the object model, JS gets all the power it needs to create dynamic HTML:
  - Can change all the HTML elements in the page.
  - Can change all the HTML attributes in the page.
  - Can change all the CSS styles in the page.
  - Can add/remove existing HTML elements and attributes.
  - Can react to all existing HTML events in the page.
  - Can create new HTML in the pages.
- The **DOM (Document Object Model)** is a W3C standard that defines how programs can access and manipulate a document's content, structure, and styles. It includes three parts:
  - Core DOM - for all document types
  - XML DOM - for XML documents
  - HTML DOM - for HTML documents
- The **HTML DOM** is standard object model and programming interface for HTML. It defines:
  - The HTML element as **objects**
  - The **properties** of all HTML elements
  - The **methods** to access all HTML elements
  - The **events** for all HTML elements
- In other words: **The HTML DOM is standard for how to get, change, add, or delete HTML elements.**
- HTML DOM methods are **actions** you can perform (on HTML Elements).
  - `getElementById()` - The most common way to access an HTML element is to use the `id` of the element.
- HTML DOM properties **values** (of HTML Elements) that you can set or change.
  - `innerHTML` - property is useful for getting or replacing the content of HTML elements.
  - `innerHTML` - property can be used to get or change any HTML element, including `<html>` and `<body>`.
- Accessing Elements - Grab elements from the HTML so you can work with them. You can target ID, class, tag Or CSS Selector

  ```js
  //find an element by id
  document.getElementById("id");
  //find all element by class name
  document.getElemetsByClassName("className");
  //find element by CSS selector
  document.querySelector("#id"); //first match
  document.querySelectorAll(".name"); //match all
  //find element by tag
  document.getElementsByTagName("div");
  ```

- Changing Content - Modify the text or inner HTML of an element.

  ```js
  element.textContent = "New Text";
  element.innerHTML = "<strong?>Bold Text</strong>";
  ```

- Styling Elements - Directly apply styles to HTML element via JS.

  ```js
  element.style.color = "red";
  ```

- Changing Attributes - Read, update, or remove HTML attributes (like `href`, `src`, etc.).

  ```js
  element.setAttribute("href", "https://example.com");
  element.getAttribute("href");
  element.removeAttribute("target");
  ```

- Creating and Appending Elements - Dynamically add new elements to the page.

  ```js
  const newDiv = document.createElement("div");
  parent.appendChild(newDiv);
  ```

- Removing Elements - Delete elements from the DOM

  ```js
  element.remove();
  ```

- Event Listeners - React to user actions like clicks, mouse movement, or key presses.

  ```js
  button.addEventListener("click", (a, b) => a + b);
  ```

- Form Handling - Attach a listener to the form so you can handle the submission.

  ```js
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    nameValue.textContent = nameInput.value;
  });
  ```

- Validate User Input - You can manually check that values meet certain requirements.

  ```js
  if (nameValue.trim() === "") {
    alert("Please enter your name.");
  }
  ```

- Submit Data via `fetch`

  ```js
  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nameValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
    });
  ```

---

### Laravel: Form creation and POST logic

- Inside you web.php - Route file

  ```php
  //this route will bring you to login form
  //alternative to Route::get() if you're only passing view to it.
  Route::view('/day03', 'day03');

  //this route will handle the POST request method
  Route::post('/day03', [Day03Controller::class, 'store']);
  ```

- Inside your day03.blade.php - View file

  ```php
  <div>
      // this will display request feedback
      @if (session('success'))
          <p style="color: green;">{{ session('success') }}</p>
      @endif
      //inside you action attributes, it's either uri or named routes
      //method attribute should be same with your route request method
      <form action="/day03" method="POST">
          //it is mandatory to include @csrf token
          //csrf is protection against cross-site request forgery
          @csrf
          <h2>Register</h2>
          <label for="name">Name</label>
          <input name="name" type="text" required>
          <label for="email">Email</label>
          <input name="email" type="email" required>

          <label for="password">Password</label>
          <input name="password" type="password" required>
          <button type="submit">Submit</button>

          // this will display error feedback
          @if ($errors->any())
              <ul style="color: red;">
                  @foreach ($errors->all() as $error)
                      <li>{{ $error }}</li>
                  @endforeach
              </ul>
          @endif
      </form>
  </div>

  ```

- Inside you Day03Controller.php - Controller file

  ```php
    //if you use Route::get(); you need to provide the method for passing the view file.
    public function store(Request $request)
    {
      //validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:7'
        ]);
      // storing validated data to database
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
      //redirection with feedback message
        return redirect()->back()->with('success', 'User Added!');
    }

  ```

- When storing data in your database make sure you already setup the data model
  ```zsh
  php artisan make:model Name
  //Make sure your User model has the name field fillable:
  ```
