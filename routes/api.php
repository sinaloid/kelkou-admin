<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\PartenaireController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ProduitVarianteController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\DetailCommandeController;
use App\Http\Controllers\PaiementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/register', [AuthController::class,'register']);
    Route::post('/login', [AuthController::class,'login']);
    Route::post('/editPassword', [AuthController::class,'editPassword']);
    //Route::post('/generateOTP', [OTPController::class,'generateOTP']);
    //Route::post('/verifyOTP', [OTPController::class,'verifyOTP']);
    Route::post('/statusChanger', [AuthController::class,'statusChanger']);
    //Route::post('/editPasswordOTP', [OTPController::class,'generateOTPForPasswordEdit']);

    Route::get('/public/categories', [CategorieController::class,'index']);
    Route::get('/public/categories/{slug}', [CategorieController::class,'show']);
    Route::get('/public/partenaires', [PartenaireController::class,'index']);
    Route::get('/public/partenaires/{slug}', [PartenaireController::class,'show']);
    Route::get('/public/produits', [ProduitController::class,'index']);
    Route::get('/public/produits/{slug}', [ProduitController::class,'show']);

    Route::middleware(['auth:api'])->group(function () {
        Route::get('/users/auth', [AuthController::class,'userAuth']);
        Route::post('/users/update', [AuthController::class,'update']);
        Route::post('/users/update/{slug}', [AuthController::class,'updateUser']);
        Route::post('/users/changePassword', [AuthController::class,'changePassword']);
        Route::post('/users/get', [AuthController::class,'userBy']);
        Route::post('/users/disable', [AuthController::class,'disable']);
        Route::post('/users/role', [AuthController::class,'role']);
        Route::get('/users/{type}', [AuthController::class,'index']);

        Route::post('/promotions', [ProduitController::class,'promotion']);
        Route::get('/promotions', [ProduitController::class,'allPromotion']);
        Route::delete('/promotions/{type}', [ProduitController::class,'destroyPromotion']);

        Route::resources([
            'categories' => CategorieController::class,
            'partenaires' => PartenaireController::class,
            'produits' => ProduitController::class,
            'produitVariantes' => ProduitVarianteController::class,
            'commandes' => CommandeController::class,
            'detailCommandes' => DetailCommandeController::class,
            'paiements' => PaiementController::class,
        ]);
    });
});

