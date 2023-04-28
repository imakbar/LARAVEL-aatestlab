<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumns16Apr2023ToMainTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('main_tests', function (Blueprint $table) {
            $table->decimal('package_price',8,2)->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('main_tests', function (Blueprint $table) {
            $table->decimal('package_price',8,2)->nullable()->default(0);
        });
    }
}
