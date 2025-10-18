<?php

namespace App\GraphQL\Queries;

use App\Helpers\GraphQLHelper;
use App\Services\AnalyticsService;

class AnalyticsQuery
{
    protected AnalyticsService $analyticsService;

    public function __construct(AnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    public function analytics($_, array $args): ?array
    {
        $analytics = AnalyticsService::getAnalytics($args['period']);

        return GraphQLHelper::toGraphQLObject($analytics);
    }
}
