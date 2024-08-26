<?php

return [

  /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

  //すべてのルートを対象にする
  'paths' => ['api/*', 'sanctum/csrf-cookie'],

  'allowed_methods' => ['*'],

  //通信を許可する送信元オリジンを指定し、送信元のオリジンがこれに該当するようであれば、クロスオリジンであってもブラウザは通信を許可する
  'allowed_origins' => ['http://localhost:3000', 'http://localhost:8000'],

  'allowed_origins_patterns' => [],

  //許可するHTTPリクエストのメソッドを指定する
  'allowed_headers' => ['*'],

  'exposed_headers' => [],

  'max_age' => 0,

  'supports_credentials' => false,

];


//CORSでは通信の可否がレスポンスヘッダで決まる
//ブラウザからのリクエストにも数種類あり、それらもレスポンスヘッダにより通信の可否が決まってしまうということ
//要するにバックエンドのレスポンスヘッダ(このファイル？)の設定でCORS通信の可否が決まるということ