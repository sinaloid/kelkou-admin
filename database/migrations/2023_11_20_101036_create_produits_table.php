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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prix')->nullable();
            $table->string('stock')->nullable();
            $table->string('image')->nullable();
            $table->string('disponibilite')->nullable();
            $table->string('dure_livraison')->nullable();
            $table->longText('description')->nullable();

            $table->string('slug');
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('partenaire_id')->nullable();
            $table->foreign('partenaire_id')
                    ->references('id')
                    ->on('partenaires')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->unsignedBigInteger('categorie_id')->nullable();
            $table->foreign('categorie_id')
                    ->references('id')
                    ->on('categories')
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
        Schema::dropIfExists('produits');
    }
};
