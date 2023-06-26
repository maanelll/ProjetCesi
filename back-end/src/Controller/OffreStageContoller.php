<?php

namespace App\Controller;

use App\Entity\OffreStage;
use App\Entity\Promotion;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\OffreStageRepository;
use DateTimeImmutable;
use App\Entity\Entreprise;
use App\Entity\Localite;
use App\Entity\Competence;



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
     * @Route("/offrestage/{id?}", name="get_offrestage", methods={"GET"} )
     */
    public function getOffreStage(OffreStageRepository $repository, $id = null): JsonResponse
    {
        if ($id) {
            $offreStage = $repository->find($id);

            if (!$offreStage) {
                return new JsonResponse(['message' => 'OffreStage not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            $offer_date = $offreStage->getOffer_date();
            $entreprise = $offreStage->getEntreprise() ? $offreStage->getEntreprise()->getName() : null;
            $promotions = $offreStage->getPromotions()->map(function ($promotion) {
                return [
                    "id" => $promotion->getId(),
                    "promo" => $promotion->getPromo()
                ];
            })->toArray();

            $offer_date = $offreStage->getOffer_date();
            $competences = $offreStage->getCompetences()->map(function ($competence) {
                return [
                    'id' => $competence->getId(),
                    'comp' => $competence->getComp(),
                ];
            })->toArray();
            $localite = $offreStage->getLocalite();
            if ($localite) {
                $address = $localite->getAddress();
                $cpNumber = $localite->getCPNumber();
                $city = $localite->getCity();
                $completeAddress = $address . ', ' . $cpNumber . ' ' . $city;
            } else {
                $completeAddress = null;
            }
            $data = [
                'id' => $offreStage->getId(),
                'name' => $offreStage->getName(),
                'internship_duration' => $offreStage->getInternship_duration(),
                'compensation_basis' => $offreStage->getCompensation_basis(),
                'offer_date' => $offer_date ? $offer_date->format('Y-m-d') : null,
                'nb_places_offered' => $offreStage->getNb_places_offered(),
                'entreprise_name' => $entreprise,
                'competence' => $competences,
                'promotion' => $promotions,
                'localite' => $completeAddress

            ];

            return new JsonResponse($data);
        }

        $offreStages = $repository->findAll();

        $data = [];
        foreach ($offreStages as $offreStage) {
            $entreprise = $offreStage->getEntreprise() ? $offreStage->getEntreprise()->getName() : null;
            $promotions = $offreStage->getPromotions()->map(function ($promotion) {
                return [
                    "id" => $promotion->getId(),
                    "promo" => $promotion->getPromo()
                ];
            })->toArray();
            $offer_date = $offreStage->getOffer_date();
            $competences = $offreStage->getCompetences()->map(function ($competence) {
                return [
                    'id' => $competence->getId(),
                    'comp' => $competence->getComp(),
                ];
            })->toArray();
            $localite = $offreStage->getLocalite();
            if ($localite) {
                $address = $localite->getAddress();
                $cpNumber = $localite->getCPNumber();
                $city = $localite->getCity();
                $completeAddress = $address . ', ' . $cpNumber . ' ' . $city;
            } else {
                $completeAddress = null;
            }
            $data[] = [
                'id' => $offreStage->getId(),
                'name' => $offreStage->getName(),
                'internship_duration' => $offreStage->getInternship_duration(),
                'compensation_basis' => $offreStage->getCompensation_basis(),
                'offer_date' => $offer_date ? $offer_date->format('Y-m-d') : null,
                'nb_places_offered' => $offreStage->getNb_places_offered(),
                'entreprise_name' => $entreprise,
                'competence' => $competences,
                'promotion' => $promotions,
                'localite' => $completeAddress
            ];
        }

        return new JsonResponse($data);
    }

    /**
     * @Route ("/offrestage",name="post_offrestage", methods={"POST"} )
     */
    public function creatOffreStage(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        error_log(print_r($data, true));


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
        if (isset($data['competence'])) {
            $competenceIds = $data['competence'];
            foreach ($competenceIds as $competenceId) {
                $competence = $this->entityManager->getRepository(Competence::class)->find($competenceId);
                if ($competence) {
                    $offrestage->addCompetence($competence);
                }
            }
        }

        if (isset($data['promotion'])) {
            $promotionId = $data['promotion'];
            $promotion = $this->entityManager->getRepository(Promotion::class)->find($promotionId);
            if ($promotion) {
                $offrestage->addPromotion($promotion);
            }
        }


        if (isset($data['entreprise_id'])) {
            $entreprise = $this->entityManager->getRepository(Entreprise::class)->find($data['entreprise_id']);
            if ($entreprise) {
                $offrestage->setEntreprise($entreprise);
            } else {
                // Gérer la situation lorsque l'entreprise n'existe pas
                // Par exemple, renvoyer une réponse d'erreur ou attribuer une valeur par défaut
            }
        }
        if (isset($data['localite_id'])) {
            $localite = $this->entityManager->getRepository(Localite::class)->find($data['localite_id']);
            if ($localite) {
                $offrestage->setLocalite($localite);
            } else {
                // Handle the situation when the Localite does not exist
            }
        }

        if (isset($data['entreprise_id'])) {
            $entreprise = $this->entityManager->getRepository(Entreprise::class)->find($data['entreprise_id']);
            if ($entreprise) {
                $offrestage->setEntreprise($entreprise);
            } else {
                // Handle the situation when the Entreprise does not exist
            }
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

        if (isset($data['name'])) {
            $offrestage->setName($data['name']);
        }

        if (isset($data['internship_duration'])) {
            $offrestage->setInternship_duration($data['internship_duration']);
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

        if (isset($data['competence'])) {
            // Remove old competences first
            foreach ($offrestage->getCompetences() as $competence) {
                $competence->removeOffreStage($offrestage);
            }

            // Add new competences
            $competenceIds = $data['competence'];
            foreach ($competenceIds as $competenceId) {
                $competence = $this->entityManager->getRepository(Competence::class)->find($competenceId);
                if ($competence) {
                    $offrestage->addCompetence($competence);
                }
            }
        }

        if (isset($data['promotion'])) {
            // Remove old promotions first
            foreach ($offrestage->getPromotions() as $promotion) {
                $promotion->removeOffreStage($offrestage);
            }

            // Add new promotions
            $promotionIds = $data['promotion'];
            foreach ($promotionIds as $promotionId) {
                $promotion = $this->entityManager->getRepository(Promotion::class)->find($promotionId);
                if ($promotion) {
                    $offrestage->addPromotion($promotion);
                }
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


        return new JsonResponse(['message' => 'Les données ont été supprimées avec succès'], JsonResponse::HTTP_OK);
    }
}
