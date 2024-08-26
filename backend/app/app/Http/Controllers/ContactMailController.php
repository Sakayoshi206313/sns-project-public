<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use SendGrid\Mail\From;
use SendGrid\Mail\Mail;
use SendGrid\Mail\Personalization;
use SendGrid\Mail\PlainTextContent;
use SendGrid\Mail\Subject;
use SendGrid\Mail\To;
use SendGrid\Mail\ReplyTo;

class ContactMailController extends Controller
{
    public function contact(ContactMailRequest $request) {

        $apiKey = getenv('SENDGRID_API_KEY');
        $from = getenv('SENDGRID_FROM');
        $from_name = getenv('SENDGRID_FROM_NAME');
        $replyTo = getenv('SENDGRID_REPLY_TO');
        $adminTo = getenv('SENDGRID_ADMIN_TO');
        $contactDate = date("Y-m-d H:i");
        $customerName = $request->get("name");
        $customerEmail = $request->get("email");
        $customerSubject = $request->get("subject");
        $customerBody = $request->get("body");

        // 顧客側
        $customer_subject = 'お問い合わせありがとうございます。';

        $customer_text = "この度は、お問い合わせ頂き誠にありがとうございます。下記の内容でお問い合わせを受け付けました。\n\n";
        $customer_text .= "お問い合わせ日時：" . $contactDate . "\n";
        $customer_text .= "氏名：" . $customerName . "\n";
        $customer_text .= "メールアドレス：" . $customerEmail . "\n\n";

        // 運営側
        $admin_subject = "お問い合わせを受け付けました";

        $admin_text = "下記の内容でお問い合わせがありました。\n\n";
        $admin_text .= "お問い合わせ日時：" . $contactDate . "\n";
        $admin_text .= "氏名：" . $customerName . "\n";
        $admin_text .= "メールアドレス：" . $customerEmail . "\n\n";
        $admin_text .= "お問い合わせ件名：" . $customerSubject . "\n\n";
        $admin_text .= "お問い合わせ内容：" . $customerBody . "\n\n";

        try {
            $sendgrid = new \SendGrid($apiKey);

            $admin_email = new Mail();
            $admin_personalization = new Personalization();
            $admin_personalization->addTo(new To($adminTo, ""));
            $admin_email->addPersonalization($admin_personalization);
            $admin_email->setFrom(new From($from, $from_name));
            $admin_email->setReplyTo(new ReplyTo($replyTo, ""));
            $admin_email->setSubject(new Subject($admin_subject));
            $admin_email->addContent(new PlainTextContent($admin_text));
            $response = $sendgrid->send($admin_email);
            if ($response->statusCode() >= 400) {
                Log::error('SendGrid Error: '. $response->statusCode() . "\n" . $response->body() . "\n");
                $ret["status"] = 500;
                return response()->json($ret);
            }

            $customer_email = new Mail();
            $customer_personalization = new Personalization();
            $customer_personalization->addTo(new To($customerEmail, $customerName));
            $customer_email->addPersonalization($customer_personalization);
            $customer_email->setFrom(new From($from, $from_name));
            $customer_email->setReplyTo(new ReplyTo($replyTo, ""));
            $customer_email->setSubject(new Subject($customer_subject));
            $customer_email->addContent(new PlainTextContent($customer_text));
            $response = $sendgrid->send($customer_email);
            if ($response->statusCode() >= 400) {
                Log::error('SendGrid Error: '. $response->statusCode() . "\n" . $response->body() . "\n");
                $ret["status"] = 500;
                return response()->json($ret);
            }
        } catch (Exception $e) {
            Log::error('Caught exception: '. $e->getMessage());
            $ret["status"] = 500;
            return response()->json($ret);
        }

        $ret["status"] = 200;
        return response()->json($ret);
    }
}
