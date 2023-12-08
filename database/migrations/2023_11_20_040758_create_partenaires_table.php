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
            
            $table->string('heure_ouverture')->nullable();
            $table->string('heure_fermeture')->nullable();

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
