<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ContactResolver
{
    public function __invoke($_, array $args)
    {
        $input = $args['input'];
        $webhookUrl = env('SLACK_WEBHOOK_URL');

        if (!$webhookUrl) {
            throw new \Exception('Slack webhook URL is not configured.');
        }

        try {
            Http::post($webhookUrl, [
                'text' => "📩 新しいお問い合わせ\n\n"
                        . "👤 名前: {$input['name']}\n"
                        . "✉️ メール: {$input['email']}\n"
                        . "💬 内容:\n{$input['message']}",
            ]);

            return [
                'success' => true,
                'message' => 'お問い合わせを送信しました。'
            ];
        } catch (\Exception $e) {
            Log::error('Slack通知の送信に失敗しました: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => 'お問い合わせの送信に失敗しました。'
            ];
        }
    }
}
