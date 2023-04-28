<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            
            $table->integer('user_id')->unsigned()->index();
            
            $table->string('model')->nullable();
            $table->integer('model_id')->unsigned()->index()->nullable();
            
            $table->integer('media_id')->unsigned()->index()->nullable();
            $table->string('name')->nullable();
            $table->string('path')->nullable();
            $table->string('extension')->nullable();
            $table->string('size')->nullable();
            $table->string('mime')->nullable();

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
        Schema::dropIfExists('attachments');
    }
}
