<?php

namespace App\Http\Controllers\Api\PostTemplates;

use App\Http\Controllers\Controller;
use App\Models\PostTemplate;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CreateController extends Controller
{
    public const DEFAULT_TEMPLATE_NAME = '新しいテンプレート';
    public const DEFAULT_TEMPLATE_TYPE = 'music';
    public const DEFAULT_TEMPLATE_CONTENT = <<<EOT
🎤{{number}}:{{music}}/{{artist}}🎶

{{liveTitle}}
{{liveUrl}} @YouTubeより
EOT;

    public function __invoke(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $template = PostTemplate::create([
            'uuid' => Str::uuid(),
            'user_uuid' => $user->uuid,
            'name' => self::DEFAULT_TEMPLATE_NAME,
            'type' => self::DEFAULT_TEMPLATE_TYPE,
            'content' => self::DEFAULT_TEMPLATE_CONTENT,
        ]);

        return response()->json([
            'message' => 'テンプレートが作成されました。',
            'template' => $template,
        ]);
    }
}
