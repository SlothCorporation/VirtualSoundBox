<?php

namespace App\Services;

use App\Services\Analytics\DbService;
use App\Services\Analytics\Ga4Service;
use Carbon\Carbon;

class AnalyticsService
{
    public static function getAnalytics(string $periodType = 'DAILY'): array
    {
        [$currentStart, $currentEnd, $previousStart, $previousEnd] = self::resolveDataRanges($periodType);
        $ga4Current = Ga4Service::fetch($currentStart, $currentEnd);
        $ga4Previous = Ga4Service::fetch($previousStart, $previousEnd);

        $dbCurrent = DbService::fetch($currentStart, $currentEnd);
        $dbPrevious = DbService::fetch($previousStart, $previousEnd);

        return [
            'startDate' => $currentStart,
            'endDate' => $currentEnd,
            'current' => $ga4Current,
            'previous' => $ga4Previous,
        ];
    }

    protected static function resolveDataRanges(string $type): array
    {
        $today = Carbon::today();

        return match ($type) {
            'DAILY' => [
                $today->toDateString(),
                $today->toDateString(),
                $today->copy()->subDay()->toDateString(),
                $today->copy()->subDay()->toDateString(),
            ],
            'WEEKLY' => [
                $today->copy()->startOfWeek()->toDateString(),
                $today->copy()->endOfWeek()->toDateString(),
                $today->copy()->subWeek()->startOfWeek()->toDateString(),
                $today->copy()->subWeek()->endOfWeek()->toDateString(),
            ],
            'MONTHLY' => [
                $today->copy()->startOfMonth()->toDateString(),
                $today->copy()->endOfMonth()->toDateString(),
                $today->copy()->subMonth()->startOfMonth()->toDateString(),
                $today->copy()->subMonth()->endOfMonth()->toDateString(),
            ],
            default => throw new \InvalidArgumentException("Invalid range type: $type"),
        };
    }
}
