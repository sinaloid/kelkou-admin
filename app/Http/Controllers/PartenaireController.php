<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Partenaire;


class PartenaireController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Partenaire::where("is_deleted", false)->get();


        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun partenaire trouvée'], 404);
        }

        return response()->json(['message' => 'Partenaires récupérées', 'data' => $data], 200);
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
            'nom_responsable' => 'required|string|max:255',
            'email_responsable' => 'nullable|string|email|max:255',
            'telephone_responsable' => 'required|integer|digits:8|starts_with:5,6,7,01,02,03,05,06,07',
            'nom_boutique' => 'required|string|max:255',
            'email_boutique' => 'nullable|string|email|max:255',
            'telephone_boutique' => 'required|integer|digits:8|starts_with:5,6,7,01,02,03,05,06,07',
            'latitude' => 'nullable|string|max:255',
            'longitute' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string|max:1000',
        ]);
       
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('partenaires'), $imageName);

            if ($imagePath) {
                $data = Partenaire::create([
                    'nom_responsable' => $request->input('nom_responsable'),
                    'email_responsable' => $request->input('email_responsable'),
                    'telephone_responsable' => $request->input('telephone_responsable'),
                    'nom_boutique' => $request->input('nom_boutique'),
                    'email_boutique' => $request->input('email_boutique'),
                    'telephone_boutique' => $request->input('telephone_boutique'),
                    'latitude' => $request->input('latitude'),
                    'longitute' => $request->input('longitute'),
                    'description' => $request->input('description'),
                    'image' => 'partenaires/' . $imageName,
                    'slug' => Str::random(8),
                ]);
               
                return response()->json(['message' => 'Partenaire créé avec succès', 'data' => $data], 200);
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
        $data = Partenaire::with("produits","produits.categorie")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Partenaire non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Partenaire supprimé'], 404);
        }

        return response()->json(['message' => 'Partenaire trouvée', 'data' => $data], 200);
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
            'nom_responsable' => 'required|string|max:255',
            'email_responsable' => 'nullable|string|email|max:255',
            'telephone_responsable' => 'required|integer|digits:8|starts_with:5,6,7,01,02,03,05,06,07',
            'nom_boutique' => 'required|string|max:255',
            'email_boutique' => 'nullable|string|email|max:255',
            'telephone_boutique' => 'required|integer|digits:8|starts_with:5,6,7,01,02,03,05,06,07',
            'latitude' => 'nullable|string|max:255',
            'longitute' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $data = Partenaire::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Partenaire non trouvée'], 404);
        }

        $data->update([
            'nom_responsable' => $request->input('nom_responsable'),
            'email_responsable' => $request->input('email_responsable'),
            'telephone_responsable' => $request->input('telephone_responsable'),
            'nom_boutique' => $request->input('nom_boutique'),
            'email_boutique' => $request->input('email_boutique'),
            'telephone_boutique' => $request->input('telephone_boutique'),
            'latitude' => $request->input('latitude'),
            'longitute' => $request->input('longitute'),
            'description' => $request->input('description'),
        ]);

        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('partenaires'), $imageName);

            if ($imagePath) {
                //Storage::delete($data->image);
                File::delete(public_path($data->image));
                $data->update([
                    'image' => 'partenaires/' . $imageName,
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
        $data = Partenaire::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Partenaire non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Partenaire supprimée avec succès']);
    }
}