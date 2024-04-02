<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\Room;
use Doctrine\Persistence\ManagerRegistry;

class TipsController extends AbstractController
{
    // Récupérer les conseils à appliquer en fonction des données de température, d'humidité et de CO2
    #[Route('/api/rooms/{id}/tips/{temp}/{hum}/{co2}', name: 'app_tips_api')]
    public function tips(int $id, float $temp, float $hum, float $co2, ManagerRegistry $doctrine, HttpClientInterface $httpClient): Response 
    {
        $currentDateTime = new \DateTime();

        $entityManager = $doctrine->getManager();
        $roomRepository = $entityManager->getRepository('App\Entity\Room');
        $room = $roomRepository->find($id);

        // Vérifier si un tips a déjà été généré pour cette pièce il y a moins de 15 minutes 

        if ($room->getTips() != null) {
            $tips = $room->getTips();
            $lastTip = end($tips);
            $lastTipDate = new \DateTime($lastTip['date']);
            $interval = $currentDateTime->diff($lastTipDate);
            if ($interval->i < 15) {
                return $this->json($room->getTips());
            }
        }

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
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['temperature']['trop_froid'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
        } 
        
        elseif ($temp < 18 && $externalTemp > 18) // Si il fait froid dedans et chaud dehors
        {
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['temperature']['chaud_dehors_froid_dedans'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
            
        } 
        
        elseif ($temp > 26 && $externalTemp < 18) // Si il fait chaud dedans et froid dehors
        {
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['temperature']['chaud_dedans_froid_dehors'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
        } 
        
        elseif ($temp > 26 && $externalTemp > 26) // Si il fait chaud dehors et dedans
        {
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['temperature']['chaud_dehors_chaud_dedans'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
        } 
        
        elseif ($temp > 26 && ($externalTemp > 18 && $externalTemp < 26)) // Si il fait chaud dedans et acceptable dehors
        {
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['temperature']['trop_chaud'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
        }

        // ****************** Filtrer les conseils basés sur l'humidité ******************

        if ($hum < 30) // Si le taux d'humidité est inférieur à 30%
        {
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['humidite']['trop_sec'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
        } 
        
        elseif ($hum > 70) // Si le taux d'humidité est supérieur à 70%
        {
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['humidite']['trop_humide'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
        } 
    
        // ****************** Filtrer les conseils basés sur le CO2 **********************

        if ($co2 > 1000) // Si le taux de CO2 est supérieur à 1000 ppm
        {
            $tipsToApply[] = array(
                "id" => count($tipsToApply) + 1,
                "text" => $tips['co2']['risque'],
                "date" => $currentDateTime->format('Y-m-d H:i:s')
            );
        } 

        // Envoyer les conseils à appliquer à la base de données et à la vue

        $room->setTips($tipsToApply);

        $entityManager->flush();

        return $this->json($tipsToApply); // Renvoyer les conseils à appliquer au client
    }

    #[Route('/api/rooms/{id}/tips', name: 'app_tips_api_get')]
    public function getTips(int $id, ManagerRegistry $doctrine): Response 
    {
        $entityManager = $doctrine->getManager();
        $roomRepository = $entityManager->getRepository('App\Entity\Room');
        $room = $roomRepository->find($id);

        return $this->json($room->getTips());
    }

}
