<?php

namespace App\Http\Controllers\Api\PostTemplates;

use App\Models\PostTemplate;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class CreateController extends Controller
{
    const defaultTemplateName = '新しいテンプレート';
    const defaultTemplateType = 'music';
    const defaultTemplateContent = <<<EOT
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
            'name' => self::defaultTemplateName,
            'type' => self::defaultTemplateType,
            'content' => self::defaultTemplateContent,
        ]);

        return response()->json([
            'message' => 'テンプレートが作成されました。',
            'template' => $template
        ]);
    }
}
