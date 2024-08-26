<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
  public function index()
  {
    //usersの一覧を取得する
    $users = User::all();
    //取得したusersの一覧を返却する
    return response()->json(
      $users,
      200
    );
  }

  public function store(Request $request)
  {
    //バリデーションルールを作成（auth_idが必須で文字列で一意であること）
    $request->validate([
      'auth_id' => 'required|string',
      'username' => 'string|nullable',
      'email' => 'required|email',
      'locale' => 'string|nullable',
      'birthday' => 'date|nullable'
    ]);

    //バリデーションに合格したデータを用いてユーザーを作成
    $user = User::create([
      'auth_id' => $request->auth_id,
      'username' => $request->username,
      'email' => $request->email,
      'locale' => $request->locale,
      'birthday' => $request->birthday
    ]);

    //ユーザー情報を返す
    return response()->json(['message' => 'Data saved successfully', 'user' => $user], 201);
  }

  public function update(Request $request)
{
    // auth_idを必須に変更
    $validator = Validator::make($request->all(), [
        'auth_id' => 'required|string',
        'username' => 'string|nullable',
        'locale' => 'string|nullable',
        'gender' => 'string|nullable',
        'profile' => 'string|nullable',
        'birthday' => 'string|nullable',
        'imageicon_data' => 'string|nullable', 
    ]);

    if ($validator->fails()) {
        Log::error('Validation failed: ', $validator->errors()->toArray());
        return response()->json(['error' => $validator->errors()], 400);
    }

    try {
        // auth_idでユーザーを検索
        $user = User::where('auth_id', $request->input('auth_id'))->first();

        // ユーザーが存在しない場合
        if (!$user) {
            Log::error('User not found with auth_id: ' . $request->input('auth_id'));
            return response()->json(['error' => 'User not found'], 404);
        }

        // ユーザーが存在する場合は更新
        $user->username = $request->input('username');
        $user->locale = $request->input('locale');
        $user->gender = $request->input('gender');
        $user->profile = $request->input('profile');
        $user->birthday = $request->input('birthday');
        $user->imageicon_data = $request->input('imageicon_data');

        // 画像データが存在する場合は保存
        if ($request->hasFile('imageicon_data')) {
          $imageicon_data = $request->file('imageicon_data');
          // ファイルを保存する処理（publicディレクトリに保存）
          $path = $imageicon_data->store('public/storage');
          $user->imageicon_data = $path;
      }
        $user->save();

        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    } catch (\Exception $e) {
        Log::error('Error updating user: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to update user'], 500);
    }
}
}