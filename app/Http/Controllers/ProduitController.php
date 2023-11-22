<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Produit;
use App\Models\Partenaire;
use App\Models\Categorie;


class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Produit::with("categorie","partenaire")->where("is_deleted", false)->get();


        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun produit trouvé'], 404);
        }

        return response()->json(['message' => 'Produits récupérés', 'data' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Vérifier que les champs obligatoires sont remplis
        //dd($request->parent);
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prix' => 'required|string|max:255',
            'stock' => 'required|string|max:255',
            'disponibilite' => 'nullable|string|max:255',
            'dure_livraison' => 'nullable|string|max:255',
            'partenaire' => 'required|string|max:8',
            'categorie' => 'required|string|max:8',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'required|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $partenaire = Partenaire::where("slug", $request->partenaire)->where("is_deleted",false)->first();

        if(!$partenaire){
            return response()->json(['message' => "Partenaire non trouvé"], 422);
        }

        $categorie = Categorie::where("slug", $request->categorie)->where("is_deleted",false)->first();

        if(!$categorie){
            return response()->json(['message' => "Categorie non trouvée"], 404);
        }

        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('produits'), $imageName);

            if ($imagePath) {
                $data = Produit::create([
                    'nom' => $request->input('nom'),
                    'prix' => $request->input('prix'),
                    'stock' => $request->input('stock'),
                    'disponibilite' => $request->input('disponibilite'),
                    'dure_livraison' => $request->input('dure_livraison'),
                    'categorie_id' => $categorie->id,
                    'partenaire_id' => $partenaire->id,
                    'description' => $request->input('description'),
                    'image' => 'produits/' . $imageName,
                    'slug' => Str::random(8),
                ]);
               
                return response()->json(['message' => 'Produit créé avec succès', 'data' => $data], 200);
            }
            return response()->json(['error' => 'Échec lors de la création'], 422);
        }

        return response()->json(['error' => 'Échec lors de la création'], 422);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Produit::with("categorie","partenaire")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Produit supprimé'], 404);
        }

        return response()->json(['message' => 'Produit trouvée', 'data' => $data], 200);
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
        // Vérifier que les champs obligatoires sont remplis
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prix' => 'required|string|max:255',
            'stock' => 'required|string|max:255',
            'disponibilite' => 'nullable|string|max:255',
            'dure_livraison' => 'nullable|string|max:255',
            'categorie' => 'required|string|max:8',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'required|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        
        $categorie = Categorie::where("slug", $request->categorie)->where("is_deleted",false)->first();

        if(!$categorie){
            return response()->json(['message' => "Categorie non trouvée"], 404);
        }

        $data = Produit::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $data->update([
            'nom' => $request->input('nom'),
            'prix' => $request->input('prix'),
            'stock' => $request->input('stock'),
            'disponibilite' => $request->input('disponibilite'),
            'dure_livraison' => $request->input('dure_livraison'),
            'categorie_id' => $categorie->id,
            'description' => $request->input('description'),
        ]);

        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('produits'), $imageName);

            if ($imagePath) {
                //Storage::delete($data->image);
                File::delete(public_path($data->image));
                $data->update([
                    'image' => 'produits/' . $imageName,
                ]);

            }
        }

        return response()->json(['message' => 'Partenaire modifié avec succès', 'data' => $data], 200);

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
        $data = Produit::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Produit supprimée avec succès']);
    }
}