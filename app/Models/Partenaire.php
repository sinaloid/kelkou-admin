<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partenaire extends Model
{
    use HasFactory;

    protected $fillable = [
        "nom_responsable",
        "email_responsable",
        "nom_boutique",
        "email_boutique",
        "telephone_responsable_1",
        "telephone_responsable_2",
        "telephone_responsable_3",
        "telephone_boutique_1",
        "telephone_boutique_2",
        "telephone_boutique_3",
        "jour_ouverture",
        "latitude",
        "longitude",
        "slug",
        "image",
        "description",
        "is_deleted",
    ];

    public function produits(){
        
        return $this->hasMany(Produit::class);
    }
}
