<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function index(): Response
    {
        return $this->render('login/index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    #[Route('/api/login', name: 'app_login_api', methods: ['POST'])]
    public function login(Request $request): Response
    {
        // Récupérer les données JSON envoyées depuis le frontend
        $data = json_decode($request->getContent(), true);

        // Vérifier les informations d'identification (exemple très basique)
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if ($username === 'admin' && $password === 'password') {
            // Si les informations d'identification sont correctes, renvoyer une réponse JSON avec un statut 200
            return $this->json(['success' => true]);
        }

        // Si les informations d'identification sont incorrectes, renvoyer une réponse JSON avec un statut 401 (non autorisé)
        return $this->json(['error' => 'Identifiant ou mot de passe incorrect'], 401);
    }
}


