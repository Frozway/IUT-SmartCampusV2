<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\Room;
use App\Entity\Tip;
use Doctrine\Persistence\ManagerRegistry;

class TipsController extends AbstractController
{
    // Récupérer les conseils à appliquer en fonction des données de température, d'humidité et de CO2
    #[Route('/api/rooms/{id}/tips/{temp}/{hum}/{co2}', name: 'app_tips_api')]
    public function tips(int $id, float $temp, float $hum, float $co2, ManagerRegistry $doctrine, HttpClientInterface $httpClient): Response 
    {
        // Récupérer la date et l'heure actuelle en France
        $currentDateTime = new \DateTime('now', new \DateTimeZone('Europe/Paris'));

        // Récupérer la salle correspondante à l'id
        $entityManager = $doctrine->getManager();
        $roomRepository = $entityManager->getRepository('App\Entity\Room');
        $room = $roomRepository->find($id);

        // Si la collection de conseils de la salle n'est pas vide, retourner les conseils
        if (!$room->getTips()->isEmpty())
        {
            $lastTip = $room->getTips()->last();
            $lastTipDate = $lastTip->getDate();
            $interval = $currentDateTime->diff($lastTipDate);
            if ($interval->i < 15) {
                return $this->json($room->getTips());
            }
        }
        else
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
                    "trop_humide" => "Utilisez un déshumidificateur.",
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
                $tipsToApply[] = new Tip($tips['temperature']['trop_froid'], $currentDateTime, false, $room);
            } 
            
            elseif ($temp < 18 && $externalTemp > 18) // Si il fait froid dedans et chaud dehors
            {
                $tipsToApply[] = new Tip($tips['temperature']['chaud_dehors_froid_dedans'], $currentDateTime, false, $room);            
            } 
            
            elseif ($temp > 26 && $externalTemp < 18) // Si il fait chaud dedans et froid dehors
            {
                $tipsToApply[] = new Tip($tips['temperature']['chaud_dedans_froid_dehors'], $currentDateTime, false, $room);
            } 
            
            elseif ($temp > 26 && $externalTemp > 26) // Si il fait chaud dehors et dedans
            {
                $tipsToApply[] = new Tip($tips['temperature']['chaud_dehors_chaud_dedans'], $currentDateTime, false, $room);
            } 
            
            elseif ($temp > 26 && ($externalTemp > 18 && $externalTemp < 26)) // Si il fait chaud dedans et acceptable dehors
            {
                $tipsToApply[] = new Tip($tips['temperature']['trop_chaud'], $currentDateTime, false, $room);
            }

            // ****************** Filtrer les conseils basés sur l'humidité ******************

            if ($hum < 30) // Si le taux d'humidité est inférieur à 30%
            {
                $tipsToApply[] = new Tip($tips['humidite']['trop_sec'], $currentDateTime, false, $room);
            } 
            
            elseif ($hum > 70) // Si le taux d'humidité est supérieur à 70%
            {
                $tipsToApply[] = new Tip($tips['humidite']['trop_humide'], $currentDateTime, false, $room);
            } 
        
            // ****************** Filtrer les conseils basés sur le CO2 **********************

            if ($co2 > 1000) // Si le taux de CO2 est supérieur à 1000 ppm
            {
                $tipsToApply[] = new Tip($tips['co2']['risque'], $currentDateTime, false, $room);
            } 

            // Parcourir les conseils à appliquer et les ajouter à la salle avec addTip

            foreach ($tipsToApply as $tip) {
                $room->addTip($tip);
                $entityManager->persist($tip);
            }

            $entityManager->flush();
        }

        return $this->json($room->getTips());
    }

    #[Route('/api/rooms/{id}/tips/updateState/{state}', name: 'app_tips_api_update')]
    public function updateState(int $id, bool $state, ManagerRegistry $doctrine): Response 
    {
        $entityManager = $doctrine->getManager();
        $roomRepository = $entityManager->getRepository('App\Entity\Room');
        $room = $roomRepository->find($id);

        $room->setTipApplied($state);

        $entityManager->flush();

        return $this->json($room->isTipApplied());
    }
}
