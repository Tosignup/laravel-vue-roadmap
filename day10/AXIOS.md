# All About Axios

---

### What is Axios?

- Axios is a popular, promise-based HTTP client for JS that works in both the browser and [Node.js](https://nodejs.org/docs/latest/api/).
- It simplifies making HTTP request (like GET, POST, PUT/PATCH, DELETE) and handling responses.

### Key Features of Axios

- Promise-based
  - Works seamlessly with `async/await`
- Automatic JSON parsing
  - Converts response data to JS Objects automatically
- Request/Response interceptors
  - Modify requests or responses globally (e.g. add auth tokens)
- Error Handling
  - Provides detailed error object for better debugging
- Supports Cancellation
  - Cancel in-progress requests if needed

#### Basic Usage Example

    ```ts
    import axios from 'axios';

    async function fetchUsers() {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            console.log(res.data); //Automatically parsed JSON
        } catch(error) {
            console.error('Error fetching users:, error');
        }
    }
    ```

### Why use Axios over `fetch()`?

- Axios automatically JSON parsing instead of `res.json()` by `fetch()`
- Built-in error handling, no need to check `res.ok`
- Axios has interceptors
- Request cancellation by `AbortController`

### Installation

> `npm install axios`
> or
> `yarn add axios`
> `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`

### Axios Examples for Each HTTP method

- **GET**
  ```ts
  axios.get<User[]>(`api/users`);
  ```
- **POST**
  ```ts
  axios.post<User[]>(`api/users`, {
    name: "John",
    email: "john@example.com",
  });
  ```
- **PUT**
  ```ts
  axios.put<User[]>(`api/users/1`, {
    name: "John Doe",
    email: "johndoe@example.com",
  });
  ```
- **PATCH**
  ```ts
  axios.patch<User[]>(`api/users/1`, {
    name: "John Doe Updated",
  });
  ```
- **DELETE**
  ```ts
  axios.delete<User[]>(`api/users/1`);
  ```

#### Key Concepts

- `GET` is safe and idempotent (can be called repeatedly without side effects)
- `POST` is not idempotent (calling it twice creates two resources)
- `PUT` replaces the entire resources
- `PATCH` updates only the specified fields
- `DELETE` removes the resource
