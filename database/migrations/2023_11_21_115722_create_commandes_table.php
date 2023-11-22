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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->string('reference');
            $table->string('montant')->nullable();

            $table->string('statut_commande')->nullable();
            $table->string('statut_paiement')->nullable();

            $table->string('slug');
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('client_id')->nullable();
            $table->foreign('client_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

                    $table->unsignedBigInteger('livreur_id')->nullable();
                    $table->foreign('livreur_id')
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
        Schema::dropIfExists('commandes');
    }
};
