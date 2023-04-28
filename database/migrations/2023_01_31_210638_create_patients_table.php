<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();

            $table->softDeletes();
            
            $table->timestamp('reg_date_time')->nullable(); // registration date time
            $table->date('reg_date')->nullable(); // registration date
            $table->time('reg_time')->nullable(); // registration time
            
            $table->string('patient_number')->nullable();
            $table->string('name')->nullable();
            $table->integer('age')->nullable();
            $table->integer('gender_id')->unsigned()->index()->nullable();
            $table->string('mobile')->nullable();
            $table->string('address')->nullable();
            $table->integer('reffer_id')->unsigned()->index()->nullable();

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
        Schema::dropIfExists('patients');
    }
}
