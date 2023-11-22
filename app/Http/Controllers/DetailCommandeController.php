<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\DetailCommande;
use App\Models\Commande;
use App\Models\Produit;



class DetailCommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DetailCommande::with("produit","commande")->where("is_deleted", false)->get();


        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun détail trouvé'], 404);
        }

        return response()->json(['message' => 'Détail récupérées', 'data' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'quantite' => 'required|string|max:10',
            'commande' => 'required|string|max:10',
            'produit' => 'required|string|max:10',
        ]);


        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $commande = Commande::where("slug", $request->commande)->where("is_deleted",false)->first();

        if(!$commande){
            return response()->json(['message' => "Commande non trouvé"], 422);
        }

        $produit = Produit::where("slug", $request->produit)->where("is_deleted",false)->first();

        if(!$produit){
            return response()->json(['message' => "Produit non trouvé"], 422);
        }

        $prix = (float) $produit->prix;
        $quantite = (int) $request->quantite;
        $total = $prix*$quantite;
        

        $data = DetailCommande::create([
            'prix' => $prix,
            'quantite' => $quantite,
            'total' => $total,
            'commande_id' => $commande->id,
            'produit_id' => $produit->id,
            'slug' => Str::random(8),
        ]);
        
        return response()->json(['message' => 'Détail créé avec succès', 'data' => $data], 200);

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Commande::with("client","livreur")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Commande non trouvée'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Commande supprimée'], 404);
        }

        return response()->json(['message' => 'Commande trouvée', 'data' => $data], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        // Trouver la catégorie de maison à supprimer
        $data = Commande::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Commande non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Commande supprimée avec succès']);
    }
}