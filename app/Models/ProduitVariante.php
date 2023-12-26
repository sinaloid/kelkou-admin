<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduitVariante extends Model
{
    use HasFactory;

    protected $fillable = [
        "nom",
        "prix",
        "stock",
        "video",
        "variante",
        "reference",
        "disponibilite",
        "quantite_min",
        "dure_livraison",
        "prix_promotion",
        "description",
        "slug",
        "is_deleted",
        "produit_id",
    ];

    public function produitImages(){

        return $this->hasMany(ProduitImage::class);
    }
}
