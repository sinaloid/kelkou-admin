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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->string("reference");
            $table->string("transaction_id")->nullable();
            $table->string("moyen_de_paiement")->nullable();
            $table->string("type_paiement")->nullable();
            $table->string("etat_paiement")->nullable();
            $table->string("montant")->nullable();
            $table->text("description")->nullable();
            $table->date("date_paiement")->nullable();

            $table->string("slug");
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('commande_id')->nullable();
            $table->foreign('commande_id')
                    ->references('id')
                    ->on('commandes')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->unsignedBigInteger('partenaire_id')->nullable();
            $table->foreign('partenaire_id')
                    ->references('id')
                    ->on('partenaires')
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
        Schema::dropIfExists('paiements');
    }
};
