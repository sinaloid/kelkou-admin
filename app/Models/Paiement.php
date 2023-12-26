<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        "reference",
        "transaction_id",
        "moyen_de_paiement",
        "type_paiement",
        "etat_paiement",
        "montant",
        "date_paiement",
        "description",
        "slug",
        "is_deleted",
        "commande_id",
        "user_id",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function commande(){
        return $this->belongsTo(Commande::class);
    }
}
