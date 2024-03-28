<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;


class TipsController extends AbstractController
{
    #[Route('/tips', name: 'app_tips')]
    public function index(): Response
    {
        return $this->render('tips/index.html.twig', [
            'controller_name' => 'TipsController',
        ]);
    }

    #[Route('/api/rooms/tips/{id}/{temp}/{hum}/{co2}', name: 'app_tips_api')]
    public function tips(int $id, float $temp, float $hum, float $co2, HttpClientInterface $httpClient): String 
    {
        $response = $httpClient->request('GET', "https://api.openweathermap.org/data/2.5/weather?q=La%20Rochelle&units=metric&appid=bef0f873bd6633be3fbd81bedb9a02be&lang=fr");

        $externalTemp = $response->toArray()['main']['temp'];

        
    }



}
