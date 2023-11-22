<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Commande;
use App\Models\User;


class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Commande::with("client","livreur")->where("is_deleted", false)->get();


        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun commande trouvée'], 404);
        }

        return response()->json(['message' => 'Commande récupérées', 'data' => $data], 200);
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
            'client' => 'required|string|max:10',
        ]);


        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $client = User::where("slug", $request->client)->where("isActive",true)->first();

        if(!$client){
            return response()->json(['message' => "Client non trouvé"], 422);
        }

        $last_id = Commande::orderBy('id', 'desc')->first();
        $last_id = $last_id ? ((int) $last_id->id + 1) : "01";

        $data = Commande::create([
            'reference' => 'KELKOU-'.date('dmY').'-COM' . $last_id,
            'montant' => $request->input('montant'),
            'statut_commande' => $request->input('statut_commande'),
            'statut_paiement' => $request->input('statut_paiement'),
            'client_id' => $client->id,
            'slug' => Str::random(8),
        ]);
        
        return response()->json(['message' => 'Commande créé avec succès', 'data' => $data], 200);

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