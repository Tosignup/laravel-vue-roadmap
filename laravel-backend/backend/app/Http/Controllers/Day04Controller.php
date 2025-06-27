<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;

class Day04Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();

        // return response()->json(['message' => 'Post Retrieved: ', 'post' => $posts], 201);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required',
                'body' => 'required',
            ]);

            Post::create([
                'title' => $validated['title'],
                'body' => $validated['body'],
            ]);


            return response()->json(['message' => 'Created!'], 201);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::find($id);
        if (!$post) {
            abort(404, 'Post not found');
        }

        return response()->json(['message' => 'Post found!', 'post' => $post]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|min:5',
                'body' => 'required',
            ]);

            $post->update(
                [
                    'title' => $validated['title'],
                    'body' => $validated['body'],
                ]
            );
            return response()->json(['message' => 'Post updated!', 'post' => $post], 201);
        } catch (\Exception $exception) {
            return response()->json(['message' => 'Something went wrong: ', [$exception->getMessage()]], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(['message' => 'Post deleted!']);
    }
}
