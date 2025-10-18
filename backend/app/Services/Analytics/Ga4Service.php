<?php

namespace App\Services\Analytics;

use Aws\SecretsManager\SecretsManagerClient;
use Google\Analytics\Data\V1beta\Client\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\RunReportRequest;
use Google\Analytics\Data\V1beta\Filter;
use Google\Analytics\Data\V1beta\FilterExpression;
use Google\Analytics\Data\V1beta\FilterExpressionList;
use Google\Analytics\Data\V1beta\Filter\StringFilter;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class Ga4Service
{
    private const SECRET_NAME_CREDENTIALS = '/analytics/ga4/service_account';
    private const SECRET_NAME_PROPERTY_ID = '/analytics/ga4/property_id';
    private const CACHE_TTL_SECONDS = 3600;

    protected static function secretsClient(): SecretsManagerClient
    {
        return new SecretsManagerClient([
            'version' => 'latest',
            'region' => env('AWS_DEFAULT_REGION', 'ap-northeast-1'),
            'credentials' => [
                'key'    => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);
    }

    protected static function getCredentials(): array
    {
        return Cache::remember(self::SECRET_NAME_CREDENTIALS, self::CACHE_TTL_SECONDS, function () {
            try {
                $client = self::secretsClient();
                $result = $client->getSecretValue([
                    'SecretId' => self::SECRET_NAME_CREDENTIALS,
                ]);
                return json_decode($result['SecretString'], true);
            } catch (\Exception $e) {
                \Log::error("Error fetching GA4 credentials: " . $e->getMessage());
                throw new \RuntimeException("Failed to retrieve GA4 credentials.");
            }
        });
    }

    protected static function getPropertyId(): string
    {
        return Cache::remember(self::SECRET_NAME_PROPERTY_ID, self::CACHE_TTL_SECONDS, function () {
            try {
                $client = self::secretsClient();
                $result = $client->getSecretValue([
                    'SecretId' => self::SECRET_NAME_PROPERTY_ID,
                ]);
                return trim($result['SecretString']);
            } catch (\Exception $e) {
                \Log::error("Error fetching GA4 property ID: " . $e->getMessage());
                throw new \RuntimeException("Failed to retrieve GA4 property ID.");
            }
        });
    }

    protected static function analyticsClient(): BetaAnalyticsDataClient
    {
        $credentials = self::getCredentials();
        $tmpPath = tempnam(sys_get_temp_dir(), 'ga4_');
        file_put_contents($tmpPath, json_encode($credentials));

        return new BetaAnalyticsDataClient([
            'credentials' => $tmpPath,
        ]);
    }

    public static function fetchSummary(string $startDate, string $endDate): array
    {
        $propertyId = self::getPropertyId();
        $client = self::analyticsClient();

        $request = (new RunReportRequest())
            ->setProperty('properties/' . $propertyId)
            ->setDateRanges([new DateRange([
                'start_date' => $startDate,
                'end_date' => $endDate,
            ])])
            ->setMetrics([
                new Metric(['name' => 'screenPageViews']),
                new Metric(['name' => 'totalUsers']),
                new Metric(['name' => 'sessions']),
            ]);

        $response = $client->runReport($request);
        $row = $response->getRows()[0] ?? null;
        
        return $row ? [
            'pageViews' => (int) $row->getMetricValues()[0]->getValue(),
            'users' => (int) $row->getMetricValues()[1]->getValue(),
            'sessions' => (int) $row->getMetricValues()[2]->getValue(),
        ] : [];
    }

    public static function fetchArticleViews(string $startDate, string $endDate): array
    {
        $propertyId = self::getPropertyId();
        $client = self::analyticsClient();

        $filterExpression = new FilterExpression([
            'filter' => new Filter([
                'field_name' => 'pagePath',
                'string_filter' => new StringFilter([
                    'match_type' => StringFilter\MatchType::BEGINS_WITH,
                    'value' => '/articles/',
                ]),
            ]),
        ]);

        $notExpression = new FilterExpression([
            'not_expression' => new FilterExpression([
                'filter' => new Filter([
                    'field_name' => 'pagePath',
                    'string_filter' => new StringFilter([
                        'match_type' => StringFilter\MatchType::BEGINS_WITH,
                        'value' => '/articles/preview/',
                    ]),
                ]),
            ]),
        ]);

        $request = (new RunReportRequest())
            ->setProperty('properties/' . $propertyId)
            ->setDateRanges([new DateRange([
                'start_date' => $startDate,
                'end_date' => $endDate,
            ])])
            ->setDimensions([new Dimension(['name' => 'pageTitle'])])
            ->setMetrics([new Metric(['name' => 'screenPageViews'])])
            ->setDimensionFilter(new FilterExpression([
                'and_group' => new FilterExpressionList([
                    'expressions' => [
                        $filterExpression,
                        $notExpression,
                    ],
                ]),
            ]));

        $response = $client->runReport($request);

        $result = [];
        foreach ($response->getRows() as $row) {
            $result[] = [
                'title' => $row->getDimensionValues()[0]->getValue(),
                'pageViews' => (int) $row->getMetricValues()[0]->getValue(),
            ];
        }

        return $result;
    }

     public static function fetchTrafficSources(string $startDate, string $endDate): array
    {
        $propertyId = self::getPropertyId();
        $client = self::analyticsClient();

        $request = (new RunReportRequest())
            ->setProperty('properties/' . $propertyId)
            ->setDateRanges([new DateRange([
                'start_date' => $startDate,
                'end_date' => $endDate,
            ])])
            ->setDimensions([new Dimension(['name' => 'sessionSource'])])
            ->setMetrics([new Metric(['name' => 'sessions'])]);

        $response = $client->runReport($request);

        $result = [];
        foreach ($response->getRows() as $row) {
            $result[] = [
                'source' => $row->getDimensionValues()[0]->getValue(),
                'sessions' => (int) $row->getMetricValues()[0]->getValue(),
            ];
        }

        return $result;
    }

    /**
     * デバイス別の利用者数取得
     */
    public static function fetchDeviceUsage(string $startDate, string $endDate): array
    {
        $propertyId = self::getPropertyId();
        $client = self::analyticsClient();

        $request = (new RunReportRequest())
            ->setProperty('properties/' . $propertyId)
            ->setDateRanges([new DateRange([
                'start_date' => $startDate,
                'end_date' => $endDate,
            ])])
            ->setDimensions([new Dimension(['name' => 'deviceCategory'])])
            ->setMetrics([new Metric(['name' => 'totalUsers'])]);

        $response = $client->runReport($request);

        $result = [];
        foreach ($response->getRows() as $row) {
            $result[] = [
                'device' => $row->getDimensionValues()[0]->getValue(),
                'users' => (int) $row->getMetricValues()[0]->getValue(),
            ];
        }

        return $result;
    }

    public static function fetch(string $startDate, string $endDate): array
    {
        $summary = self::fetchSummary($startDate, $endDate);
        $articleViews = self::fetchArticleViews($startDate, $endDate);
        $trafficSources = self::fetchTrafficSources($startDate, $endDate);
        $deviceUsage = self::fetchDeviceUsage($startDate, $endDate);

        return [
            'summary' => $summary,
            'articleViews' => $articleViews,
            'trafficSources' => $trafficSources,
            'deviceUsage' => $deviceUsage,
        ];
    }
}
