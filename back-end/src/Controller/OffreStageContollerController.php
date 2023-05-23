<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class OffreStageContollerController extends AbstractController
{
    #[Route('/offre/stage/contoller', name: 'app_offre_stage_contoller')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/OffreStageContollerController.php',
        ]);
    }
}
