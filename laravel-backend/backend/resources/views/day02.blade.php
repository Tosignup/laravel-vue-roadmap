<div>
    @if (!isset($users))
        <p>No users</p>
    @else
        @foreach ($users as $user)
            <p>{{ $user }}</p>
        @endforeach
    @endif

    {{-- @forelse ($users as $user)
        <p>{{ $user }}</p>
    @empty
        <p>No users</p>
    @endforelse --}}

</div>
