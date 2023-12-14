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
        Schema::create('produit_variantes', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prix')->nullable();
            $table->string('stock')->nullable();
            $table->string('video')->nullable();
            $table->json('variante')->nullable();
            $table->string('disponibilite')->nullable();
            $table->string('quantite_min')->nullable();
            $table->string('dure_livraison')->nullable();
            $table->longText('description')->nullable();
            $table->string('prix_promotion')->nullable();
            
            $table->string('slug');
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('produit_id')->nullable();
            $table->foreign('produit_id')
                    ->references('id')
                    ->on('produits')
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
        Schema::dropIfExists('produit_variantes');
    }
};
