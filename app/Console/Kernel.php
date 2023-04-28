<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\Models\AppSchedule;

class Kernel extends ConsoleKernel
{
    // https://laravel.com/docs/9.x/scheduling
    // https://www.cloudways.com/blog/laravel-cron-job-scheduling/
    
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\MinutesUpdate::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->command('minutes:update')->everyMinute();
        // $schedule->command('everyfiveminutes:update')->everyFiveMinutes();
        $schedule->command('hourly:update')->everySixHours();
        // ->before(function () {
        //     // Task is about to start...
        //     $S = new AppSchedule();
        //     $S->name = 'everySixHours';
        //     $S->status = 'running';

        //     $S->start_date = date('Y-m-d');
        //     $S->start_time = date('H:i:s');
        //     $S->end_date = '';
        //     $S->end_time = '';
            
        //     $S->created_by = auth()->check()?auth()->user()->id:1;
        //     $S->save();
        // })
        // ->after(function () {
        //     // Task is complete...
        //     if(AppSchedule::where('name','everySixHours')->orderBy('id','DESC')->count() > 0){
        //         $S = AppSchedule::where('name','everySixHours')->orderBy('id','DESC')->first();
        //         $S->status = 'completed';
        //         $S->end_date = date('Y-m-d');
        //         $S->end_time = date('H:i:s');
        //         $S->update();
        //     }
        // })
        // ->onSuccess(function () {
        //     // The task succeeded...
        //     if(AppSchedule::where('name','everySixHours')->orderBy('id','DESC')->count() > 0){
        //         $S = AppSchedule::where('name','everySixHours')->orderBy('id','DESC')->first();
        //         $S->status = 'success';
        //         $S->end_date = date('Y-m-d');
        //         $S->end_time = date('H:i:s');
        //         $S->update();
        //     }
        // })
        // ->onFailure(function () {
        //     // The task failed...
        //     if(AppSchedule::where('name','everySixHours')->orderBy('id','DESC')->count() > 0){
        //         $S = AppSchedule::where('name','everySixHours')->orderBy('id','DESC')->first();
        //         $S->status = 'failed';
        //         $S->end_date = date('Y-m-d');
        //         $S->end_time = date('H:i:s');
        //         $S->update();
        //     }
        // });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
