<?php

namespace App\Controller;

use App\Entity\OffreStage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\OffreStageRepository;
use Doctrine\ORM\Mapping\Entity;
use DateTimeImmutable;


/**
 * @Route("/api", name="api_")
 */
class OffreStageContollerController extends AbstractController
{
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/offrestage", name="get_offrestage", methods={"GET"} )
     */
    public function getOffreStage(OffreStageRepository $repository): JsonResponse
    {
        $data = $repository->findAll();
        $responseData = [];
        foreach ($data as $offreStage) {
            $responseData[] = [
                'id' => $offreStage->getId(),
                'name' => $offreStage->getName(),
                'duree_stag' => $offreStage->getDureeStag(),
                'base_renum' => $offreStage->getBaseRenum(),
                'date_offre' => $offreStage->getDateOffre()->format('Y-m-d'),
                'nb_places_offert' => $offreStage->getNbPlacesOffert(),
            ];
        }
        return new JsonResponse($responseData);
    }
    /**
     * @Route ("/offrestage",name="post_offrestage", methods={"POST"} )
     */
    public function creatOffreStage(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $offrestage = new OffreStage();
        $offrestage->setName($data['name']);
        $offrestage->setDureeStag($data['duree_stag']);
        $offrestage->setBaseRenum($data['base_renum']);
        $offrestage->setDateOffre(DateTimeImmutable::createFromFormat('Y-m-d', $data['date_offre']));
        $offrestage->setNbPlacesOffert($data['nb_places_offert']);

        $entityManager->persist($offrestage);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Data created successfully'], JsonResponse::HTTP_CREATED);
    }
}
