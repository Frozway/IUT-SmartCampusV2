<?php

namespace App\Controller;

use App\Entity\Tip;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TipsController extends AbstractController
{
    // Récupérer les conseils à appliquer en fonction des données de température, d'humidité et de CO2
    #[Route('/api/rooms/{id}/tips/{temp}/{hum}/{co2}', name: 'app_tips_api', methods: ['GET'])]
    public function tips(int $id, float $temp, float $hum, float $co2, ManagerRegistry $doctrine, HttpClientInterface $httpClient): Response
    {
        // Récupérer la date et l'heure actuelle en France
        $currentDateTime = new \DateTime();

        // Récupérer la salle correspondante à l'id
        $entityManager = $doctrine->getManager();
        $roomRepository = $entityManager->getRepository('App\Entity\Room');
        $room = $roomRepository->find($id);

        $response = $httpClient->request('GET', "https://api.openweathermap.org/data/2.5/weather?q=La%20Rochelle&units=metric&appid=bef0f873bd6633be3fbd81bedb9a02be&lang=fr");
        $externalTemp = $response->toArray()['main']['temp'];

        $lastTips = $room->getTips();
        if (!$lastTips->isEmpty()) {
            // pour chaque vérifier que le tip ne date pas de plus de deux heures sinon le supprimer
            foreach ($lastTips as $tip) {
                if ($currentDateTime->getTimestamp() - $tip->getDate()->getTimestamp() > 7200) {
                    $entityManager->remove($tip);
                }
                // vérifier si le tip est appliqué et que la température n'est plus en dehors des normes
                if ($tip->isIsApplied() && $tip->getType() === 'trop_froid' && $temp > 18) {
                    $entityManager->remove($tip);
                } elseif ($tip->isIsApplied() && $tip->getType() === 'chaud_dehors_froid_dedans' && $temp > 18) {
                    $entityManager->remove($tip);
                } elseif ($tip->isIsApplied() && $tip->getType() === 'chaud_dedans_froid_dehors' && $temp < 26) {
                    $entityManager->remove($tip);
                } elseif ($tip->isIsApplied() && $tip->getType() === 'chaud_dehors_chaud_dedans' && $temp < 26) {
                    $entityManager->remove($tip);
                } elseif ($tip->isIsApplied() && $tip->getType() === 'trop_chaud' && $temp < 26) {
                    $entityManager->remove($tip);
                }

                // vérifier si le tip est appliqué et que l'humidité n'est plus en dehors des normes
                if ($tip->isIsApplied() && $tip->getType() === 'trop_sec' && $hum > 30) {
                    $entityManager->remove($tip);
                } elseif ($tip->isIsApplied() && $tip->getType() === 'trop_humide' && $hum < 70) {
                    $entityManager->remove($tip);
                }

                // vérifier si le tip est appliqué et que le taux de CO2 n'est plus en dehors des normes
                if ($tip->isIsApplied() && $tip->getType() === 'risque' && $co2 < 1000) {
                    $entityManager->remove($tip);
                }

                // si le tip est appliqué depuis au moins 20 minutes mais qu'il est encore en dehors des normes, ajouter un attribut shouldCheck = true
                if ($tip->isIsApplied()) {
                    $timeDifference = $currentDateTime->getTimestamp() - $tip->getAppliedAt()->getTimestamp();
                    if ($timeDifference > 1200) {
                        $tip->setShouldCheck(true);
                    }
                }
            }
            // on vérifie si il n'y a pas de nouveaux tip à ajouter (il ne peut pas y avoir de doublons)
            if ($temp < 18 && $externalTemp < 18 && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'trop_froid';
                })->isEmpty()) {
                $room->addTip(new Tip("Il fait froid, envisagez d'augmenter le chauffage si possible ou couvrez-vous.", $currentDateTime, false, $room, 'trop_froid', $temp));
            } elseif ($temp < 18 && $externalTemp > 18 && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'chaud_dehors_froid_dedans';
                })->isEmpty()) {
                $room->addTip(new Tip("Il fait plus chaud dehors, ouvrez les fenêtres.", $currentDateTime, false, $room, 'chaud_dehors_froid_dedans', $temp));
            } elseif ($temp > 26 && $externalTemp < 18 && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'chaud_dedans_froid_dehors';
                })->isEmpty()) {
                $room->addTip(new Tip("Pensez à baisser le chauffage, si déjà fait, ouvrez pendant quelques minutes les fenêtres.", $currentDateTime, false, $room, 'chaud_dedans_froid_dehors', $temp));
            } elseif ($temp > 26 && $externalTemp > 26  && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'chaud_dehors_chaud_dedans';
                })->isEmpty()) {
                $room->addTip(new Tip("Baissez les volets et faites un courant d'air ou utilisez des ventilateurs.", $currentDateTime, false, $room, 'chaud_dehors_chaud_dedans', $temp));
            } elseif ($temp > 26 && ($externalTemp > 18 && $externalTemp < 26) && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'trop_chaud';
                })->isEmpty()) {
                $room->addTip(new Tip("Il fait chaud, ouvrez les fenêtres et coupez le chauffage s'il est allumé.", $currentDateTime, false, $room, 'trop_chaud', $temp));
            }

            if ($hum < 30 && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'trop_sec';
                })->isEmpty()) {
                $room->addTip(new Tip("Utilisez un humidificateur.", $currentDateTime, false, $room, 'trop_sec', $hum));
            } elseif ($hum > 70 && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'trop_humide';
                })->isEmpty()) {
                $room->addTip(new Tip("Utilisez un déshumidificateur.", $currentDateTime, false, $room, 'trop_humide', $hum));
            }

            if ($co2 > 1000 && $room->getTips()->filter(function ($tip) {
                    return $tip->getType() === 'risque';
                })->isEmpty()) {
                $room->addTip(new Tip("Allumez les VMC et ouvrez les portes pour aérer.", $currentDateTime, false, $room, 'risque', $co2));
            }


            $entityManager->flush();

            return $this->json($room->getTips()->getValues());
        }

        // Vider la collection de conseils de la salle
        $room->getTips()->clear();

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
                "trop_sec" => "Utilisez un humidificateur.",
            ),
            "co2" => array(
                "risque" => "Allumez les VMC et ouvrez les portes pour aérer.",
            ),
        );

        $tipsToApply = array();

        // ****************** Filtrer les conseils basés sur la température ******************

        if ($temp < 18 && $externalTemp < 18) // Si il fait froid dehors et dedans
        {
            $tipsToApply[] = new Tip($tips['temperature']['trop_froid'], $currentDateTime, false, $room, 'trop_froid', $temp);
        } elseif ($temp < 18 && $externalTemp > 18) // Si il fait froid dedans et chaud dehors
        {
            $tipsToApply[] = new Tip($tips['temperature']['chaud_dehors_froid_dedans'], $currentDateTime, false, $room, 'chaud_dehors_froid_dedans', $temp);
        } elseif ($temp > 26 && $externalTemp < 18) // Si il fait chaud dedans et froid dehors
        {
            $tipsToApply[] = new Tip($tips['temperature']['chaud_dedans_froid_dehors'], $currentDateTime, false, $room, 'chaud_dedans_froid_dehors', $temp);
        } elseif ($temp > 26 && $externalTemp > 26) // Si il fait chaud dehors et dedans
        {
            $tipsToApply[] = new Tip($tips['temperature']['chaud_dehors_chaud_dedans'], $currentDateTime, false, $room, 'chaud_dehors_chaud_dedans', $temp);
        } elseif ($temp > 26 && ($externalTemp > 18 && $externalTemp < 26)) // Si il fait chaud dedans et acceptable dehors
        {
            $tipsToApply[] = new Tip($tips['temperature']['trop_chaud'], $currentDateTime, false, $room, 'trop_chaud', $temp);
        }

        // ****************** Filtrer les conseils basés sur l'humidité ******************

        if ($hum < 30) // Si le taux d'humidité est inférieur à 30%
        {
            $tipsToApply[] = new Tip($tips['humidite']['trop_sec'], $currentDateTime, false, $room, 'trop_sec', $hum);
        } elseif ($hum > 70) // Si le taux d'humidité est supérieur à 70%
        {
            $tipsToApply[] = new Tip($tips['humidite']['trop_humide'], $currentDateTime, false, $room, 'trop_humide', $hum);
        }

        // ****************** Filtrer les conseils basés sur le CO2 **********************

        if ($co2 > 1000) // Si le taux de CO2 est supérieur à 1000 ppm
        {
            $tipsToApply[] = new Tip($tips['co2']['risque'], $currentDateTime, false, $room, 'risque', $co2);
        }

        // Parcourir les conseils à appliquer et les ajouter à la salle avec addTip

        foreach ($tipsToApply as $tip) {
            $room->addTip($tip);
            $entityManager->persist($tip);
        }

        $entityManager->flush();
        return $this->json($room->getTips());

    }

    #[Route('/api/rooms/{id}/tips/{tipId}/updateState/{state}', name: 'app_tips_api_update', methods: ['PUT'])]
    public function updateState(int $id, int $tipId, bool $state, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $tipRepository = $entityManager->getRepository(Tip::class);
        $tip = $tipRepository->find($tipId);

        if (!$tip || $tip->getRoom()->getId() !== $id) {
            return new Response('Conseil non trouvé', Response::HTTP_NOT_FOUND);
        }

        $tip->setIsApplied($state);
        $tip->setAppliedAt(new \DateTime());
        $tip->setShouldCheck(false);
        $entityManager->flush();

        return new Response('État du conseil mis à jour avec succès', Response::HTTP_OK);
    }
}
