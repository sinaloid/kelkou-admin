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
            $table->string('telephone_responsable_1')->nullable();
            $table->string('telephone_responsable_2')->nullable();
            $table->string('telephone_responsable_3')->nullable();
            $table->string('nom_boutique');
            $table->string('email_boutique')->nullable();
            $table->string('telephone_boutique_1')->nullable();
            $table->string('telephone_boutique_2')->nullable();
            $table->string('telephone_boutique_3')->nullable();
            
            $table->json('jour_ouverture')->nullable();

            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('slug');
            $table->string('image')->nullable();
            $table->string('reference')->nullable();
            $table->longText('description')->nullable();
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
            
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
