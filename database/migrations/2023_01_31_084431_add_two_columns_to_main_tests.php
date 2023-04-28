<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTwoColumnsToMainTests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('main_tests', function (Blueprint $table) {
            $table->boolean('is_advance')->nullable()->default(0)->after('slug');
            $table->decimal('test_rate',8,2)->nullable()->default(0)->after('slug');
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
            $table->boolean('is_advance')->nullable()->default(0)->after('slug');
            $table->decimal('test_rate',8,2)->nullable()->default(0)->after('slug');
        });
    }
}
