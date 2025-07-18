<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Log;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Book::query();

        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('author', 'like', "%{$search}%");
        }
        $books = $query->paginate(2);

        // return response()->json($books);
        return BookResource::collection($books);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     try {
    //         $validated = $request->validate([
    //             'title' => 'required|max:255',
    //             'author' => 'required|max:255',
    //             'genre' => 'nullable|max:255',
    //         ]);

    //         $book = Book::create($validated);

    //         // return response()->json(['message' => 'Book stored!'], 201);
    //         return new BookResource($book);
    //     } catch (\Exception $e) {
    //         Log::error('Error storing book: ', [$e->getMessage()]);
    //     }
    // }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|max:255',
                'author' => 'required|max:255',
                'genre' => 'nullable|max:255',
                'cover_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $path = ($request->hasFile('cover_image')) ?
                $path = $request->file('cover_image')->store('cover_images', 'public')
                :
                $path = null;


            $book = Book::create([
                'title' => $validated['title'],
                'author' => $validated['author'],
                'genre' => $validated['genre'],
                'cover_image' => $path,
            ]);

            // return response()->json(['message' => 'Book stored!'], 201);
            return new BookResource($book);
        } catch (\Exception $e) {
            Log::error('Error storing book: ', [$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|max:255',
                'author' => 'required|max:255',
                'genre' => 'nullable|max:255',
                'cover_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $path = ($request->hasFile('cover_image')) ?
                $path = $request->file('cover_image')->store('cover_images', 'public')
                :
                $path = null;
            Log::info($validated);


            $book->update([
                'title' => $validated['title'],
                'author' => $validated['author'],
                'genre' => $validated['genre'],
                'cover_image' => $path,
            ]);

            return new BookResource($book);
        } catch (\Exception $e) {
            Log::error('Error updating book: ', [$e->getMessage()]);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->noContent();
    }
}
