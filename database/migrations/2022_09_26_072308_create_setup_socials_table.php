<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSetupSocialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('setup_socials', function (Blueprint $table) {
            $table->id();
            
            $table->integer('order_by')->nullable();

            $table->string('name')->nullable();
            $table->string('slug')->nullable();

            $table->string('meta_tags')->nullable();
            $table->string('meta_description')->nullable();

            $table->string('status')->nullable(); // active, inactive

            $table->integer('created_by')->unsigned()->index();
            $table->date('created_date');
            $table->time('created_time');
            $table->integer('updated_by')->unsigned()->index();
            $table->date('updated_date');
            $table->time('updated_time');
            
            $table->softDeletes();
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
        Schema::dropIfExists('setup_socials');
    }
}
