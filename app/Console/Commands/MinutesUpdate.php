<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Test;

use App\Http\Controllers\Backend\MessagesController;
use App\Http\Controllers\Backend\ChatMessagesController;

class MinutesUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'minutes:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch received number every minute from twilio';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // For queue jobs
        // /usr/local/bin/php /home/dlfsybczuq38/public_html/auth.caleyems.com/artisan queue:work --max-time=300
        // *****
        // /usr/local/bin/php /home/dlfsybczuq38/public_html/sms.azulvision.com/project/artisan minutes:update >> /dev/null

        // $MessagesController = new MessagesController();
        $ChatMessagesController = new ChatMessagesController();
        // $MessagesController->findNewContactInTwilio();
        // $ChatMessagesController->migratePersonsData();
        $ChatMessagesController->filterByPeriodOfTime();
        $ChatMessagesController->migratePersons();
    }
}
