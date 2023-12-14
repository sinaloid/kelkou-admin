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
        Schema::create('produit_images', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("url");
            $table->string("slug");
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('produit_id')->nullable();
            $table->foreign('produit_id')
                    ->references('id')
                    ->on('produits')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->unsignedBigInteger('produit_variante_id')->nullable();
            $table->foreign('produit_variante_id')
                    ->references('id')
                    ->on('produit_variantes')
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
        Schema::dropIfExists('produit_images');
    }
};
