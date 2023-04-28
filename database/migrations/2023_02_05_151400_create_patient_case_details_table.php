<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientCaseDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_case_details', function (Blueprint $table) {
            $table->id();

            // $table->softDeletes();
            
            $table->integer('order_by')->nullable();
            
            $table->integer('patient_id')->unsigned()->index()->nullable();
            $table->integer('patientcase_id')->unsigned()->index()->nullable();
            $table->integer('maintest_id')->unsigned()->index()->nullable();
            $table->integer('subtest_id')->unsigned()->index()->nullable();

            $table->string('reporting_time')->nullable();
            $table->string('result_value')->nullable();
            $table->dateTime('report_given_date')->nullable();

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
        Schema::dropIfExists('patient_case_details');
    }
}
