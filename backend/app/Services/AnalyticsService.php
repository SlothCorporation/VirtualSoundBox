<?php

namespace App\Services;

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
                $today->copy()->subDays(6)->toDateString(),
                $today->toDateString(),
                $today->copy()->subDays(13)->toDateString(),
                $today->copy()->subDays(7)->toDateString(),
            ],
            'WEEKLY' => [
                $today->copy()->subWeeks(7)->startOfWeek()->toDateString(),
                $today->endOfWeek()->toDateString(),
                $today->copy()->subWeeks(15)->startOfWeek()->toDateString(),
                $today->copy()->subWeeks(8)->endOfWeek()->toDateString(),
            ],
            'MONTHLY' => [
                $today->copy()->subMonths(5)->startOfMonth()->toDateString(),
                $today->endOfMonth()->toDateString(),
                $today->copy()->subMonths(11)->startOfMonth()->toDateString(),
                $today->copy()->subMonths(6)->endOfMonth()->toDateString(),
            ],
            default => throw new \InvalidArgumentException("Invalid range type: $type"),
        };
    }
}
