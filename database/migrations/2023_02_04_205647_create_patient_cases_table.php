<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientCasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_cases', function (Blueprint $table) {
            $table->id();

            $table->softDeletes();
            
            $table->integer('patient_id')->unsigned()->index()->nullable();

            $table->string('case_number')->nullable();
            $table->integer('reffer_id')->unsigned()->index()->nullable();
            $table->integer('samplelocation_id')->unsigned()->index()->nullable();

            $table->string('discount_type')->nullable();
            $table->integer('discount')->default(0)->nullable();

            $table->string('status')->nullable();

            $table->integer('created_by')->unsigned()->index();
            $table->date('created_date'); // registration date
            $table->time('created_time'); // registration time
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
        Schema::dropIfExists('patient_cases');
    }
}
