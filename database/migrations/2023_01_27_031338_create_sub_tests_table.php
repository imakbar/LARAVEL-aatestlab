<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_tests', function (Blueprint $table) {
            $table->id();

            $table->softDeletes();
            
            $table->integer('order_by')->nullable();

            $table->boolean('is_advance')->default(0)->nullable();
            $table->integer('maintest_id')->unsigned()->index();
            $table->string('test_code')->nullable();
            $table->string('test_name')->nullable();
            $table->decimal('test_rate',8,2)->nullable();
            $table->string('test_unit')->nullable();
            $table->text('test_detail')->nullable();
            $table->integer('reporting_time')->nullable();
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
        Schema::dropIfExists('sub_tests');
    }
}
