<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
  use HasFactory;

  // テーブル名の設定
  protected $table = 'users';
  // タイムスタンプを無効にする
  public $timestamps = false;
  // プライマリキーの設定
  protected $primaryKey = 'user_id';
  // 自動インクリメントを有効にする
  public $incrementing = true;
  // プライマリキーのデータ型を指定
  protected $keyType = 'int';
  // マスアサインメント可能な属性
  protected $fillable = [
    'auth_id',
    'username',
    'email',
    'locale',
    'gender',
    'profile',
    'birthday',
    'imageicon_data',
  ];
}


//テーブルのプライマリキーとして user_id を使用するように設定されていない
//このため、Eloquentがデフォルトで id 列を期待してしまい、エラーが発生