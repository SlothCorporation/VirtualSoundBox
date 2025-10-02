<?php

namespace App\GraphQL\Queries;

use App\Helpers\GraphQLHelper;
use App\Models\Topic;
use App\Support\Authorize;

class TopicQuery
{
    public function topics($_, array $args)
    {
        Authorize::authorizeAdmin();

        $topic = Topic::with(['article.category', 'article.tags'])->orderBy('position')->get();

        return GraphQLHelper::toGraphQLObject($topic);
    }
}
