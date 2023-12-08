<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    protected $fillable = [
        "nom",
        "prix",
        "stock",
        "video",
        "disponibilite",
        "quantite_min",
        "dure_livraison",
        "description",
        "slug",
        "is_deleted",
        "partenaire_id",
        "categorie_id",
    ];

    public function partenaire(){

        return $this->belongsTo(Partenaire::class);
    }

    public function categorie(){

        return $this->belongsTo(Categorie::class);
    }

    public function produitImages(){

        return $this->hasMany(ProduitImage::class);
    }
}
