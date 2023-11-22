<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Categorie;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$data = Categorie::where("is_deleted", false)->get();
        //$data = Categorie::with('enfants')->whereNull('parent_id')->get();
        //$data = Categorie::avecToutesSousCategories()->whereNull('parent_id')->get();
        $data = Categorie::with('toutesSousCategories')->whereNull('parent_id')->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune catégorie trouvée'], 404);
        }

        return response()->json(['message' => 'Catégories récupérées', 'data' => $data], 200);
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
            'parent' => 'nullable|string|max:8',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $parent = Categorie::where("slug",$request->parent)->first();
        
        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('categories'), $imageName);

            if ($imagePath) {
                $data = Categorie::create([
                    'nom' => $request->input('nom'),
                    'description' => $request->input('description'),
                    'image' => 'categories/' . $imageName,
                    'parent_id' => isset($parent) ? $parent->id : null,
                    'is_deleted' => false,
                    'slug' => Str::random(8),
                ]);

                return response()->json(['message' => 'Catégorie créée avec succès', 'data' => $data], 200);
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
        $data = Categorie::where("slug",$slug)->with('toutesSousCategories')->first();

        if (!$data) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Catégorie supprimée'], 404);
        }

        return response()->json(['message' => 'Catégorie trouvée', 'data' => $data], 200);
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
            'parent' => 'nullable|string|max:8',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $data = Categorie::where("slug", $slug)->where("is_deleted",false)->first();
        $parent = Categorie::where("slug", $request->parent)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $data->update([
            'nom' => $request->input('nom'),
            'description' => $request->input('description'),
        ]);

        if($parent){
            $data->update([
                'parent_id' => $parent->id,
            ]);
        }

        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('categories'), $imageName);

            if ($imagePath) {
                //Storage::delete($data->image);
                File::delete(public_path($data->image));
                $data->update([
                    'image' => 'categories/' . $imageName,
                ]);

            }
        }

        return response()->json(['message' => 'Catégorie modifiée avec succès', 'data' => $data], 200);

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
        $data = Categorie::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Catégorie supprimée avec succès']);
    }
}