<?php

namespace App\Controller;

use App\Entity\Competence;
use App\Entity\OffreStage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\OffreStageRepository;
use DateTimeImmutable;


/**
 * @Route("/api", name="api_")
 */
class OffreStageContoller extends AbstractController
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
                'internship_duration' => $offreStage->getInternship_duration(),
                'compensation_basis' => $offreStage->getCompensation_basis(),
                'offer_date' => $offreStage->getOffer_date()->format('Y-m-d'),
                'nb_places_offered' => $offreStage->getNb_places_offered(),
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

        if (isset($data['name'])) {
            $offrestage->setName($data['name']);
        }

        if (isset($data['internship_duration'])) {
            $offrestage->setInternship_duration((int)$data['internship_duration']);
        }

        if (isset($data['compensation_basis'])) {
            $offrestage->setCompensation_basis($data['compensation_basis']);
        }

        if (isset($data['offer_date'])) {
            $offrestage->setOffer_date(DateTimeImmutable::createFromFormat('Y-m-d', $data['offer_date']));
        }

        if (isset($data['nb_places_offered'])) {
            $offrestage->setNb_places_offered($data['nb_places_offered']);
        }

        $entityManager->persist($offrestage);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Data created successfully'], JsonResponse::HTTP_CREATED);
    }
    /**
     * @Route("/offrestage/{id}", name="app_update_data", methods={"PATCH"})
     */
    public function updateData(Request $request, OffreStage $offrestage): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $offrestage->setName($data['name']);
        $offrestage->setInternship_duration($data['internship_duration']);
        $offrestage->setCompensation_basis($data['compensation_basis']);
        $offrestage->setOffer_date(DateTimeImmutable::createFromFormat('Y-m-d', $data['offer_date']));
        $offrestage->setNb_places_offered($data['nb_places_offered']);

        $competenceIds = $data['competence'];
        // $promortionIds = $data['promotion'];

        foreach ($competenceIds as $competenceId) {
            $competence = $this->entityManager->getRepository(Competence::class)->find($competenceId);
            if ($competence) {
                $offrestage->addCompetence($competence);
            }
        }

        $this->entityManager->persist($offrestage);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data updated successfully'], JsonResponse::HTTP_OK);
    }
    /**
     * @Route("/offrestage/{id}", name="app_delete_data", methods={"DELETE"})
     */
    public function deleteData(OffreStage $offrestage, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($offrestage);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Data deleted successfully'], JsonResponse::HTTP_OK);
    }
}
