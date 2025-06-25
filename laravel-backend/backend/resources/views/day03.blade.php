<style>
    form {
        width: 400px;
        display: flex;
        flex-direction: column;
        margin: 40px auto;
        border: 1px solid black;
        padding: 20px;
        gap: 10px;
    }

    input {
        padding: 8px;
        margin-bottom: 5px;
    }

    button {
        padding: 10px;
    }
</style>
<div>
    @if (session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif
    <form action="/day03" method="POST">
        <h2>Register</h2>
        @csrf
        <label for="name">Name</label>
        <input name="name" type="text" required>
        <label for="email">Email</label>
        <input name="email" type="email" required>

        <label for="password">Password</label>
        <input name="password" type="password" required>
        <button type="submit">Submit</button>
        @if ($errors->any())
            <ul style="color: red;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        @endif
    </form>
</div>
