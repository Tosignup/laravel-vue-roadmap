# Day 04

## Async/Await + API Routes

---

### Fetch API

- It provides a modern way to make network request (like GET, POST) in JS.
- It was also a replacement from **XMLHttpRequest**: unlike `XMLHttpRequest`, which uses callbacks,
- It's promised-based and allows you to easily retrieve or send data without refreshing the page.
- It's integrated with features of the modern web such as service workers and Cross-Origin Resource Sharing (CORS)
  ```js
  //syntax
  fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(err));
  ```
- Basic GET request: Fetches data from JSON API

  ```js
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error("Error:", err));
  ```

  - **What's happening**:
    - `fetch()` sends GET request.
    - `res.json()` parses the JSON body.
    - catch and log potential network errors.

- POST request with JSON Body: Sends data to a server

  ```js
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Hello",
      body: "World",
      userID: 1,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  ```

  - **What's happening**:
    - Sends a POST request.
    - Sets headers to let the server know you're sending JSON.
    - `body` holds the payload in a stringified JSON format.

- Updating with PUT
  ```js
  fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      title: "Updated Title",
      body: "Updated Body",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  ```
  - **Use case:** Replaces the content of the entire resource with new data.
- Deleting a Resource

  ```js
  fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      console.log("Post Deleted");
    }
  });
  ```

  - **Why this matters:** It's how you clean up entries on the server.

#### async/await

- These keywords make asynchronous code look and behave more like synchronous code - making it easier to read and maintain
- `async` marks a function as asynchronous, `await` pauses it execution until a promise resolves.
  ```js
  //syntax
  async function getData() {
    //process the request
      const response = awat fetch('https://api.example.com/data');
    //parse the response
      const data = await response.json();
      console.log(data);
  }
  ```
- Example:

  ```js
  async function getUser() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const user = await res.json();
      console.log(user);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }

  getUser();
  ```

  - **Why use async/await:**
    - Makes the code easier to follow.
    - Handles asynchronous logic in a top-down, readable way.

---

### Route::apiResource, JSON responses

#### Route::apiResource Basics

- in Laravel 10 up, in api.php needs to be installed separately:
  ```zsh
      php artisan install:api
  ```

```php
//web.php - Route File
use app\Http\Controller\Api\UserController;

Route::apiResource('users', UserController::class);
```

- This single line sets up these routes:
  - `GET /users` -> `index()`
  - `Get /users/{id}` -> `show()`
    - `POST /users` -> `store()`
    - `PUT/PATCH /users/{id}` -> `update()`
    - `DELETE /users/{id}` -> `destroy()`
- Unlike `Route::resource`, it skips `create` and `edit` because they're typically for HTML form - not needed in an API.

#### JSON Responses

- Your controller methods just return data using Laravel's response helpers:
  ```php
  public function index()
  {
      $users = User::all();
      return response()->json($users);
  }
  ```
- Or, for better control and status codes:
  ```php
  return response()->json(['message' => 'Created!'], 201);
  ```
- Laravel automatically converts collections and models into JSON, so even this works:

  ```php
  return User::findOrFail($id);
  ```

- **TIP: Use API Resource Classes(Optional but Clean)**

  - Want customized JSON structure? Create a resource:

  ```zsh
      php artisan make:resource UserResource
  ```

  - In `UserResource.php`

  ```php
      public function toArray($request)
      {
          return [
              'id' => $this->id,
              'username' => $this->name,
              'registered_at' => $this->created_at->toDateString(),
            ];
      }
  ```

  - Then use it in your controller:
    ```php
    return UserResource::collection(User::all());
    ```
