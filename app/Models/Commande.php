<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        "reference",
        "montant",
        "statut_commande",
        "statut_paiement",
        "slug",
        "is_deleted",
        "client_id",
        "livreur_id"
    ];

    public function client () {

        return $this->belongsTo(User::class);
    }

    public function livreur () {

        return $this->belongsTo(User::class);
    }
}
