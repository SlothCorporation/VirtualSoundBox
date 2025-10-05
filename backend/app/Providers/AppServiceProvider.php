<?php

namespace App\Providers;

use Dotenv\Dotenv;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $envFile = match (env('APP_ENV')) {
            'local' => '.env.local',
            'staging' => '.env.staging',
            'production' => '.env.production',
            default => '.env',
        };

        if (file_exists(base_path($envFile))) {
            $dotenv = Dotenv::createImmutable(base_path(), $envFile);

            $dotenv->load();
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
