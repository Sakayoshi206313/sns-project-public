<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;

class Like extends Model
{
    use HasFactory;

    protected $primaryKey = 'like_id';

    protected $fillable = [
        // 複数代入の脆弱性対策
        // 複数代入によって書き換えられたくないカラムは書かない
        'post_id', 
        'user_id', 
        'is_like', 
    ];


    public static function updateData($params){

        $res = Like::update($params);
        return $res;
    }

    public function post(){
        return $this->belongsTo(Post::class, 'post_id');
    }
}