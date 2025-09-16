<?php

namespace App\GraphQL\Mutations;

use App\Models\Topic;
use App\Support\Authorize;
use Illuminate\Support\Facades\Log;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class TopicMutation
{
    public function addTopic($_, array $args)
    {
        Authorize::authorizeAdmin();

        if (Topic::count() >= 10) {
            throw new \Exception("トピック記事は10件までしか作成できません");
        }
        Topic::create([
            'article_id' => $args['articleId'],
            'position' => Topic::max('position') + 1,
        ]);
        return true;
    }

    public function removeTopic($_, array $args)
    {
        Authorize::authorizeAdmin();

        Topic::where('id', $args['id'])->delete();
        return true;
    }

    public function reorderTopics($_, array $args)
    {
        Authorize::authorizeAdmin();

        foreach ($args['ids'] as $index => $id) {
            Topic::where('id', $id)->update(['position' => $index + 1]);
        }
        return true;
    }
}
