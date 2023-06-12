<?php

namespace App\Controller;

use App\Entity\Center;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CenterRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api", name="api_")
 */
class CenterController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/centers", name="get_center", methods={"GET"})
     */
    public function getCenter(CenterRepository $repository): JsonResponse
    { 
            $center = $repository->findAll();
            $data = [];
            foreach ($center as $center) {
                $data[] = [
                    'id' => $center->getId(),
                    'center' => $center->getCenterName(),
                ];
            }
        return new JsonResponse($data);
        
    }

}
