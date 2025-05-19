<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>メールアドレス確認のお願い</title>
</head>
<body style="font-family: sans-serif; background-color: #f9f9f9; padding: 40px;">
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
    <h2 style="color: #333;">{{ $user->name }} さん</h2>
    <p style="font-size: 16px; color: #555;">
        このたびは <strong>Virtual Sound Box</strong> にご登録いただきありがとうございます。
    </p>

    <p style="font-size: 16px; color: #555;">
        ご利用を開始するには、以下のボタンからメールアドレスの確認を完了してください。
    </p>

    <div style="margin: 30px 0; text-align: center;">
        <a href="{{ $url }}" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
            メールアドレスを確認する
        </a>
    </div>

    <p style="font-size: 14px; color: #999;">
        ※ このメールに心当たりがない場合は、破棄してください。
    </p>

    <hr style="margin: 30px 0;">
    <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; {{ date('Y') }} Virtual Sound Box. All rights reserved.
    </p>
</div>
</body>
</html>
