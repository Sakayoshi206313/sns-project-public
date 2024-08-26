<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        Logger('OK');
        return Like::whereNotNull('created_at')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
        'post_id' => 'required|integer|exists:posts,post_id',
        'user_id' => 'required|string|exists:users,auth_id',
        'is_like' => 'required|boolean'
      ]);

      if($validator->fails()) {
        Log::error('Validation failed: ', $validator->errors()->toArray());
        return response()->json(['error' => $validator->errors()], 400);
      }

      try {
        $like = new Like();
        $like->post_id = $request->input('post_id');
        $like->user_id = $request->input('auth_id');
        $like->is_like = $request->input('is_like');
        $like->save();
        return response()->json($like, 201);
      } catch(\Exception $e) {
        Log::error('Error creating like: ' . $e->getMessage());
        Log::error('Stack trace: ' . $e->getTraceAsString());
        return response()->json(['error' => 'Internal Server Error: ' . $e->getMessage()], 500);
      }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Like::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $like = Like::findOrFail($id);
        $like->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
      try {
        // likeテーブルから主キーidに基づいてレコードを削除
      $like = Like::findOrFail($id);
      $like->delete();

      return response()->json(['message' => 'Like deleted successfully'], 200);
      } catch(\Exception $e) {
      return response()->json(['error' => 'Failed to delete like', 'message' => $e->getMessage()], 500);
      }
    }
  }