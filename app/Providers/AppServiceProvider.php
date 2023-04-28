<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        // appSmtp();
        // appTwilio();
        
        // date_default_timezone_set(dateDefaultTimezoneSet());
        // dd(Config::get('twilio'));
        // dd(Config::get('mail'));
    }
}
