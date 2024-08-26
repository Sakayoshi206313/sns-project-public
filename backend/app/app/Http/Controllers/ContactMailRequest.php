<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ContactMailRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'max:100'],
            'body' => ['required', 'max:1000'],
        ];
    }

//    // エラーメッセージをカスタムしたい場合に記載
//    public function messages()
//    {
//        return [
//            'name.required' => 'ここにエラーメッセージを記載します。',
//        ];
//    }

    // エラー時のレスポンスをJSONにする
    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'status' => 400,
            'errors' => $validator->errors(),
        ],400);

        throw new HttpResponseException($response);
    }
}
