<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        "nom",
        "slug",
        "image",
        "description",
        "is_deleted",
        "parent_id",
    ];

    /*public function toutesSousCategories()
    {
        return $this->enfants->map(function ($sousCategorie) {
            return collect([$sousCategorie])->merge($sousCategorie->toutesSousCategories());
        })->flatten();
    }

    

    public function scopeAvecToutesSousCategories($query)
    {
        return $query->with('enfants')->with('enfants.enfants');
    }*/
    public function toutesSousCategories()
    {
        return $this->enfants()->with('toutesSousCategories');
    }


    /*public function toutesSousCategories()
    {
        return $this->enfants->map(function ($sousCategorie) {
            return collect([$sousCategorie])->merge($sousCategorie->toutesSousCategories());
        })->flatten();
    }*/

    public function parent()
    {
        return $this->belongsTo(Categorie::class, 'parent_id');
    }

    public function enfants()
    {
        return $this->hasMany(Categorie::class, 'parent_id');
    }
}
