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
        "variante",
        "dure_livraison",
        "description",
        "type_promotion",
        "etat_promotion",
        "debut_promotion",
        "fin_promotion",
        "prix_promotion",
        "reference",
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

    public function produitVariantes(){

        return $this->hasMany(ProduitVariante::class);
    }
}
