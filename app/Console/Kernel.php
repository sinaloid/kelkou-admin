<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Produit;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();

        $schedule->call(function () {
            // Code pour vérifier les promotions et changer leur état si nécessaire
            $promotions = Produit::where('etat_promotion', 'en_attente')
                ->where('debut_promotion', '<=', now())
                ->get();
    
            foreach ($promotions as $promotion) {
                $promotion->update(['etat_promotion' => 'en_cours']);
            }

            // Code pour vérifier les promotions et changer leur état si nécessaire
            $promotions = Produit::where('etat_promotion', 'en_cours')
                ->where('fin_promotion', '<=', now())
                ->get();

            foreach ($promotions as $promotion) {
                $promotion->update(['etat_promotion' => 'terminer']);
            }

        })->everyMinute(); // Exécutez cette tâche tous les jours
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}