<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partenaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom_responsable');
            $table->string('email_responsable')->nullable();
            $table->string('telephone_responsable');
            $table->string('nom_boutique');
            $table->string('email_boutique')->nullable();
            $table->string('telephone_boutique');
            $table->string('latitude')->nullable();
            $table->string('longitute')->nullable();
            $table->string('slug');
            $table->string('image')->nullable();
            $table->longText('description')->nullable();
            $table->boolean("is_deleted")->default(false);
            
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
        Schema::dropIfExists('partenaires');
    }
};
