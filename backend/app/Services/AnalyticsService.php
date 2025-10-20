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

        return self::buildAnalyticsData(
            $currentStart,
            $currentEnd,
            $ga4Current,
            $ga4Previous,
            $dbCurrent,
            $dbPrevious
        );
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

    protected static function buildAnalyticsData(
        string $startDate,
        string $endDate,
        array $ga4Current,
        array $ga4Previous,
        array $dbCurrent,
        array $dbPrevious
    ): array {
        return [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'summary' => self::buildSummary(
                $ga4Current['summary'],
                $ga4Previous['summary'],
            ),
            'articleViews' => self::buildArticleViews(
                $ga4Current['articleViews'],
                $ga4Previous['articleViews'],
            ),
            'trafficSources' => self::buildTrafficSources(
                $ga4Current['trafficSources'],
                $ga4Previous['trafficSources'],
            ),
            'deviceUsage' => self::buildDeviceUsage(
                $ga4Current['deviceUsage'],
                $ga4Previous['deviceUsage'],
            ),
        ];
    }

    protected static function buildSummary(array $current, array $previous): array
    {
        return [
            'current' => [
                'pageViews' => $current['pageViews'],
                'sessions' => $current['sessions'],
                'users' => $current['users'],
            ],
            'previous' => [
                'pageViews' => $previous['pageViews'],
                'sessions' => $previous['sessions'],
                'users' => $previous['users'],
            ],
        ];
    }

    protected static function buildArticleViews(array $current, array $previous): array
    {
        $allTitles = collect($current)->pluck('title')
            ->merge(collect($previous)->pluck('title'))
            ->unique()
            ->values();

        return $allTitles->map(function ($title) use ($current, $previous) {
            $cur = collect($current)->firstWhere('title', $title);
            $prev = collect($previous)->firstWhere('title', $title);

            return [
                'title' => $title,
                'current' => [
                    'pageViews' => $cur['pageViews'] ?? 0,
                    'activeUsers' => $cur['activeUsers'] ?? 0,
                    'events' => $cur['events'] ?? 0,
                    'avgDuration' => $cur['avgDuration'] ?? '0:00',
                    'bounceRate' => $cur['bounceRate'] ?? 0,
                ],
                'previous' => [
                    'pageViews' => $prev['pageViews'] ?? 0,
                    'activeUsers' => $prev['activeUsers'] ?? 0,
                    'events' => $prev['events'] ?? 0,
                    'avgDuration' => $prev['avgDuration'] ?? '0:00',
                    'bounceRate' => $prev['bounceRate'] ?? 0,
                ],
            ];
        })->toArray();
    }

    protected static function buildTrafficSources(array $current, array $previous): array
    {
        $allSources = collect($current)->pluck('source')
            ->merge(collect($previous)->pluck('source'))
            ->unique()
            ->values();

        return $allSources->map(function ($source) use ($current, $previous) {
            $cur = collect($current)->firstWhere('source', $source);
            $prev = collect($previous)->firstWhere('source', $source);

            return [
                'source' => $source,
                'current' => [
                    'sessions' => $cur['sessions'] ?? 0,
                ],
                'previous' => $prev ? [
                    'sessions' => $prev['sessions'] ?? 0,
                ] : null,
            ];
        })->toArray();
    }

    protected static function buildDeviceUsage(array $current, array $previous): array
    {
        $allDevices = collect($current)->pluck('device')
            ->merge(collect($previous)->pluck('device'))
            ->unique()
            ->values();

        return $allDevices->map(function ($device) use ($current, $previous) {
            $cur = collect($current)->firstWhere('device', $device);
            $prev = collect($previous)->firstWhere('device', $device);

            return [
                'device' => $device,
                'current' => [
                    'users' => $cur['users'] ?? 0,
                ],
                'previous' => $prev ? [
                    'users' => $prev['users'] ?? 0,
                ] : null,
            ];
        })->toArray();
    }
}
