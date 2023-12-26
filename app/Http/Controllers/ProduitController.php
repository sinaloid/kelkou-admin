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
use App\Models\ProduitImage;
use App\Models\ProduitVariante;


class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Produit::with("categorie","partenaire","produitImages")->where("is_deleted", false)->get();


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
            'quantite_min' => 'nullable|string|max:255',
            'partenaire' => 'required|string|max:8',
            'categorie' => 'required|string|max:8',
            //'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'video' => 'nullable|mimetypes:video/avi,video/mpeg,video/mp4,video/quicktime|max:102400',
            'variante' => 'required|string|max:1000',
            'description' => 'nullable|string|max:1000',
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

        $data = Produit::create([
            'reference' => "KEL-PRO-".date('YmdHis'),
            'nom' => $request->input('nom'),
            'prix' => $request->input('prix'),
            'stock' => $request->input('stock'),
            'disponibilite' => $request->input('disponibilite'),
            'dure_livraison' => $request->input('dure_livraison'),
            'quantite_min' => $request->input('quantite_min'),
            'variante' => $request->input('variante'),
            'categorie_id' => $categorie->id,
            'partenaire_id' => $partenaire->id,
            'description' => $request->input('description'),
            //'image' => 'produits/' . $imageName,
            'slug' => Str::random(8),
        ]);
        
        if ($request->hasFile('files')) {
            $files = $request["files"];
           // dd($files);
            foreach($files as $file){
               // dd($file);
                // Générer un nom aléatoire pour l'image
                $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();

                // Enregistrer l'image dans le dossier public/images
                $filePath = $file->move(public_path('produits'), $fileName);

                if ($filePath) {
                    // Créer la nouvelle catégorie de média
                    $doc = ProduitImage::create([
                        'name' => $fileName,
                        'url' => 'produits/' . $fileName,
                        'slug' => Str::random(8),
                        'produit_id' => $data->id,
                    ]);
                    
                }
            }
            //return response()->json(['message' => 'Fichiers ajoutés avec succès'], 200);
            
        }

        if ($request->hasFile('video')) {

            $videoName = Str::random(10) . '.' . $request->video->getClientOriginalExtension();

            $videoPath = $request->video->move(public_path('videos'), $videoName);
            //dd($request->video->getMimeType());
            if ($videoPath) {
                $data->update([
                    
                    'video' => 'videos/' . $videoName,
                ]);

            }
        }

        return response()->json(['message' => 'Produit créé avec succès', 'data' => $data], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Produit::with("categorie","partenaire","produitVariantes","produitVariantes.produitImages", "produitImages")->where("slug",$slug)->first();

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
            'quantite_min' => 'nullable|string|max:255',
            'categorie' => 'required|string|max:8',
            //'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'video' => 'nullable|mimetypes:video/avi,video/mpeg,video/mp4,video/quicktime|max:102400',
            'description' => 'required|string|max:1000',
            'variante' => 'nullable|string|max:1000',
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
            'variante' => $request->input('variante'),
            'categorie_id' => $categorie->id,
            'description' => $request->input('description'),
        ]);

        
        if ($request->hasFile('files')) {
            $files = $request["files"];
           // dd($files);
            foreach($files as $file){
               // dd($file);
                // Générer un nom aléatoire pour l'image
                $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();

                // Enregistrer l'image dans le dossier public/images
                $filePath = $file->move(public_path('produits'), $fileName);

                if ($filePath) {
                    // Créer la nouvelle catégorie de média
                    $doc = ProduitImage::create([
                        'name' => $fileName,
                        'url' => 'produits/' . $fileName,
                        'slug' => Str::random(8),
                        'produit_id' => $data->id,
                    ]);
                    
                }
            }
            return response()->json(['message' => 'Fichiers ajoutés avec succès'], 200);
            
        }
        if ($request->hasFile('video')) {
            // Générer un nom aléatoire pour l'image
            $videoName = Str::random(10) . '.' . $request->video->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $videoPath = $request->video->move(public_path('videos'), $videoName);

            if ($videoPath) {
                //Storage::delete($data->image);
                File::delete(public_path($data->video));
                $data->update([
                    
                    'video' => 'videos/' . $videoName,
                ]);

            }
        }

        return response()->json(['message' => 'Produit modifié avec succès', 'data' => $data], 200);

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

    public function allPromotion (){

        $data = Produit::with("categorie","partenaire","produitImages")->where([
            "is_deleted" => false,
            "etat_promotion" => "en_cours"
        ])->get();


        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun produit trouvé'], 404);
        }

        return response()->json(['message' => 'Produits récupérés', 'data' => $data], 200);

   }

    public function promotion (Request $request){
         // Vérifier que les champs obligatoires sont remplis
         $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:255',
            'prix_promotion' => 'required|string|max:255',
            'debut_promotion' => 'required|date|after_or_equal:today|max:255',
            'fin_promotion' => 'required|date|after:debut_promotion|max:255',
            'type_promotion' => 'required|string|max:255',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }


        $data = Produit::where("slug", $request->slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        //dd($request->all());

        $data->update([
            'type_promotion' => $request->input('type_promotion'),
            'prix_promotion' => $request->input('prix_promotion'),
            'debut_promotion' => $request->input('debut_promotion'),
            'fin_promotion' => $request->input('fin_promotion'),
            'etat_promotion' => "en_attente",
        ]);



        foreach($request->variantes as $variante){
            $item = ProduitVariante::where([
                "slug" => $variante['slug'],
                "produit_id" => $data->id,
            ])->first();

            if($item){
                $item->update([
                    'prix_promotion' => $variante['prix_promotion'],
                ]);
            }
        }
        return response()->json(['message' => 'Promotion modifiée avec succès', 'data' => $data], 200);

    }
    public function destroyPromotion ($slug){

       $data = Produit::where("slug", $slug)->where("is_deleted",false)->first();

       if (!$data) {
           return response()->json(['message' => 'Produit non trouvé'], 404);
       }

       //dd($request->all());

       $data->update([
           'type_promotion' => null,
           'prix_promotion' => null,
           'debut_promotion' => null,
           'fin_promotion' => null,
           'etat_promotion' => "pas_de_promotion",
       ]);

       $variantes = ProduitVariante::where(["produit_id" => $data->id])->get();

       foreach($variantes as $variante){
            $variante->update([
                'prix_promotion' => null,
            ]);
       }
       return response()->json(['message' => 'Promotion modifiée avec succès', 'data' => $data], 200);

   }
}