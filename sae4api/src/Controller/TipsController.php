<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;


class TipsController extends AbstractController
{
    #[Route('/api/tips/{temp}/{hum}/{co2}', name: 'app_tips_api')]
    public function tips(float $temp, float $hum, float $co2, HttpClientInterface $httpClient): Response 
    {
        $response = $httpClient->request('GET', "https://api.openweathermap.org/data/2.5/weather?q=La%20Rochelle&units=metric&appid=bef0f873bd6633be3fbd81bedb9a02be&lang=fr");

        $externalTemp = $response->toArray()['main']['temp'];

        $tips = array(
            "temperature" => array(
                "trop_chaud" => "Il fait chaud, ouvrez les fenêtres et coupez le chauffage s'il est allumé.",
                "trop_froid" => "Il fait froid, envisagez d'augmenter le chauffage si possible ou couvrez-vous.",
                "chaud_dehors_froid_dedans" => "Il fait plus chaud dehors, ouvrez les fenêtres.",
                "chaud_dedans_froid_dehors" => "Pensez à baisser le chauffage, si déjà fait, ouvrez pendant quelques minutes les fenêtres.",
                "chaud_dehors_chaud_dedans" => "Baissez les volets et faites un courant d'air ou utilisez des ventilateurs.",
            ),
            "humidite" => array(
                "trop_humide" => "Utilisez un déshumidificateur",
                "trop_sec" => "Utilisez un humidificateur."
            ),
            "co2" => array(
                "risque" => "Allumez les VMC et ouvrez les portes pour aérer.",
            )
        );

        $tipsToApply = array();
    
        // ****************** Filtrer les conseils basés sur la température ******************

        if ($temp < 18 && $externalTemp < 18) // Si il fait froid dehors et dedans
        {
            $tipsToApply[] = $tips['temperature']['trop_froid']; 
        } 
        
        elseif ($temp < 18 && $externalTemp > 18) // Si il fait froid dedans et chaud dehors
        {
            $tipsToApply[] = $tips['temperature']['chaud_dehors_froid_dedans'];
        } 
        
        elseif ($temp > 26 && $externalTemp < 18) // Si il fait chaud dedans et froid dehors
        {
            $tipsToApply[] = $tips['temperature']['chaud_dedans_froid_dehors']; 
        } 
        
        elseif ($temp > 26 && $externalTemp > 26) // Si il fait chaud dehors et dedans
        {
            $tipsToApply[] = $tips['temperature']['chaud_dehors_chaud_dedans'];
        } 
        
        elseif ($temp > 26 && ($externalTemp > 18 && $externalTemp < 26)) // Si il fait chaud dedans et acceptable dehors
        {
            $tipsToApply[] = $tips['temperature']['trop_chaud'];
        }

        // ****************** Filtrer les conseils basés sur l'humidité ******************

        if ($hum < 30) // Si le taux d'humidité est inférieur à 30%
        {
            $tipsToApply[] = $tips['humidite']['trop_sec'];
        } 
        
        elseif ($hum > 70) // Si le taux d'humidité est supérieur à 70%
        {
            $tipsToApply[] = $tips['humidite']['trop_humide'];
        } 
    
        // ****************** Filtrer les conseils basés sur le CO2 **********************

        if ($co2 > 1000) // Si le taux de CO2 est supérieur à 1000 ppm
        {
            $tipsToApply[] = $tips['co2']['risque'];
        } 

        return $this->json($tipsToApply);
    
    }



}
