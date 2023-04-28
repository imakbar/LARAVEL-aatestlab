<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSampleLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sample_locations', function (Blueprint $table) {
            $table->id();

            $table->softDeletes();
            
            $table->integer('order_by')->nullable();

            $table->string('title')->nullable();
            $table->string('slug')->nullable();

            $table->string('status')->nullable();

            $table->integer('created_by')->unsigned()->index();
            $table->date('created_date');
            $table->time('created_time');
            $table->integer('updated_by')->unsigned()->index();
            $table->date('updated_date');
            $table->time('updated_time');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sample_locations');
    }
}
