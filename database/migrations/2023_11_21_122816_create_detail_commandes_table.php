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
        Schema::create('detail_commandes', function (Blueprint $table) {
            $table->id();
            $table->string('prix');
            $table->string('quantite');
            $table->string('total');
            $table->string('slug');
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('commande_id')->nullable();
            $table->foreign('commande_id')
                    ->references('id')
                    ->on('commandes')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

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
        Schema::dropIfExists('detail_commandes');
    }
};