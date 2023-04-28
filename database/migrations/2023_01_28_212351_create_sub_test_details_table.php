<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubTestDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_test_details', function (Blueprint $table) {
            $table->id();

            $table->softDeletes();
            
            $table->integer('order_by')->nullable();
            
            // $table->boolean('is_section_heading')->nullable()->default(0);
            // $table->string('section_heading')->nullable();

            $table->integer('maintest_id')->unsigned()->index()->nullable();
            $table->integer('subtest_id')->unsigned()->index()->nullable();
            $table->integer('gender_id')->unsigned()->index()->nullable();
            $table->integer('humanlifespan_id')->unsigned()->index()->nullable();
            $table->string('normal_value')->nullable();

            $table->string('default_value')->nullable();

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
        Schema::dropIfExists('sub_test_details');
    }
}
