<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;


class AlertsController extends AbstractController
{
    #[Route(
        path: "api/departements/{id}/get-alerts",
        name: "api_get_alerts",
        methods: ["GET"],
    )]
    function getAlerts(int $id, RoomRepository $roomRepository, HttpClientInterface $httpClient): JsonResponse
    {
        $rooms = $roomRepository->findBy(['department' => $id]);

        $json = file_get_contents('database.json');
        $json_data = (array) json_decode($json, true);

        $alerts = array();

        foreach ($rooms as $room) {
            $dbname = $json_data[$room->getName()]['dbname'];
            
            try {
                // Effectuer une requête HTTP à votre API
                $apiResponse = $httpClient->request('GET', "https://sae34.k8s.iut-larochelle.fr/api/captures/last?limit=3", [
                    'headers' => [
                        'accept' => 'application/ld+json',
                        'dbname' => $dbname,
                        'username' => 'k1eq3',
                        'userpass' => 'wohtuh-nigzup-diwhE4',
                    ],
                ]);
                $apiData = $apiResponse->toArray();
                
                // Determiner le niveau d'alerte pour chaque valeur
                foreach ($apiData as $value) {
                    switch ($value['nom']) {
                        case 'temp':
                            if ($value['valeur'] < 18 || $value['valeur'] > 26) {
                                $alerts[$room->getName()] = 'red';
                            } else if ($value['valeur'] < 19 || $value['valeur'] > 24) {
                                $alerts[$room->getName()] = 'orange';
                            }
                            break;
                        
                        case 'hum':
                            if ($value['valeur'] < 30 || $value['valeur'] > 70) {
                                $alerts[$room->getName()] = 'red';
                            } else if ($value['valeur'] < 40 || $value['valeur'] > 60) {
                                $alerts[$room->getName()] = 'orange';
                            }
                            break;
    
                        case 'co2':
                            if ($value['valeur'] > 1000) {
                                $alerts[$room->getName()] = 'red';
                            } else if ($value['valeur'] > 600) {
                                $alerts[$room->getName()] = 'orange';
                            }
                            break;
                    }
                }
            } catch (\Exception $e) {
                
            }    
        }
 
        return new JsonResponse($alerts);
    }
}