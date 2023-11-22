<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailCommande extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "is_deleted",
        "prix",
        "quantite",
        "total",
        "commande_id",
        "produit_id",
    ];
}
