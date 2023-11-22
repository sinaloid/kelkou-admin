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
        "telephone_responsable",
        "nom_boutique",
        "email_boutique",
        "telephone_boutique",
        "latitude",
        "longitute",
        "slug",
        "image",
        "description",
        "is_deleted",
    ];

    public function produits(){
        
        return $this->hasMany(Produit::class);
    }
}
