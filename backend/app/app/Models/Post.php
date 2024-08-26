<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  // use HasFactory;
  const UPDATED_AT = null;  // updated_atカラムの管理を無効にする

  // プライマリキーの設定
  protected $primaryKey = 'post_id';

  protected $fillable = [
    'auth_id',
    'post_text',
  ];
}
