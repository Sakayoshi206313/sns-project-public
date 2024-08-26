<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
  //Post::all()でpostの一覧を取得してJSONを返す
  public function index()
  {
    $posts = Post::all();
    return response()->json(
      $posts,
      200
    );
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'auth_id' => 'required|string',
      'username' => 'string|nullable',
      'post_text' => 'required|string',
    ]);

    if ($validator->fails()) {
      Log::error('Validation failed: ', $validator->errors()->toArray());
      return response()->json(['error' => $validator->errors()], 400);
    }

    try {
      $post = new Post();
      $post->auth_id = $request->input('auth_id');
      $post->username = $request->input('username');
      $post->post_text = $request->input('post_text');
      $post->save();
      return response()->json($post, 201);
    } catch (\Exception $e) {
      Log::error('Error creating post: ' . $e->getMessage());
      Log::error('Stack trace: ' . $e->getTraceAsString());
      return response()->json(['error' => 'Internal Server Error: ' . $e->getMessage()], 500);
    }
  }

  public function destroy($id)
  {
    try {
      $post = Post::find($id);
      if (!$post) {
        return response()->json(['error' => 'ポストがありません'], 404);
      }
      $post->delete();
      return response()->json(['message' => 'ポストが削除されました'], 200);
    } catch (\Exception $e) {
      Log::error('Error deleting post: ' . $e->getMessage());
      return response()->json(['error' => 'Internal Server Error: ' . $e->getMessage()], 500);
    }
  }
}
