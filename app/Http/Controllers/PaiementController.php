<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Paiement;
use App\Models\User;
use App\Models\Commande;


class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Paiement::with("user","commande")->where("is_deleted", false)->get();


        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun paiement trouvé'], 404);
        }

        return response()->json(['message' => 'Paiements récupérés', 'data' => $data], 200);
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
            'user' => 'nullable|string|max:255',
            'commande' => 'nullable|string|max:255',
            'montant' => 'nullable|string|max:255',
            'transaction_id' => 'nullable|string|max:255',
            'date_paiement' => 'nullable|date|max:255',
            'moyen_de_paiement' => 'nullable|string|max:255',
            'type_paiement' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::where("reference",$request->user)->first();
        $commande = Commande::where("slug",$request->commande)->first();

        $last_id = Paiement::orderBy('id', 'desc')->first();
        $last_id = $last_id ? ((int) $last_id->id + 1) : "1";

        $data = Paiement::create([
            'reference' => "KEL-FAC-".date('Ymd').'-'. $last_id,
            'transaction_id' => $request->input('transaction_id'),
            'moyen_de_paiement' => $request->input('moyen_de_paiement'),
            'type_paiement' => $request->input('type_paiement'),
            'etat_paiement' => "en_attente",
            'montant' => $request->input('montant'),
            'date_paiement' => $request->input('date_paiement'),
            'description' => $request->input('description'),
            'commande_id' => isset($commande) ? $commande->id : null,
            'user_id' => isset($user) ? $user->id : null,
            'slug' => Str::random(8),
        ]);
        return response()->json(['message' => 'Paiement enregistré avec succès', 'data' => $data], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Paiement::with("user","commande")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Paiement non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Paiement supprimé'], 404);
        }

        return response()->json(['message' => 'Paiement trouvé', 'data' => $data], 200);
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
        $validator = Validator::make($request->all(), [
            'user' => 'nullable|string|max:255',
            'commande' => 'nullable|string|max:255',
            'montant' => 'nullable|string|max:255',
            'transaction_id' => 'nullable|string|max:255',
            'date_paiement' => 'nullable|date|max:255',
            'moyen_de_paiement' => 'nullable|string|max:255',
            'type_paiement' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $data = Paiement::where("slug",$slug)->first();
        if (!$data) {
            return response()->json(['message' => 'Paiement non trouvé'], 404);
        }

        $data->update([
            'transaction_id' => $request->input('transaction_id'),
            'moyen_de_paiement' => $request->input('moyen_de_paiement'),
            'type_paiement' => $request->input('type_paiement'),
            'etat_paiement' => $request->input('etat_paiement'),
            'montant' => $request->input('montant'),
            'date_paiement' => $request->input('date_paiement'),
            'description' => $request->input('description'),
        ]);

        return response()->json(['message' => 'Paiement modifiée avec succès', 'data' => $data], 200);

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
        $data = Paiement::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Paiement non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Paiement supprimée avec succès']);
    }
}