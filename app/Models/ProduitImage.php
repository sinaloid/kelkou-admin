<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduitImage extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "url",
        "slug",
        "is_deleted",
        "produit_id",
        "produit_variante_id"
    ];
}
