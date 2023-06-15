<?php

namespace App\Controller;

use App\Entity\Promotion;
use App\Entity\OffreStage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PromotionRepository;
use App\Repository\OffreStageRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api", name="api_")
 */
class PromotionController extends AbstractController
{
    private $entityManager;
    private $offreStageRepository;

    public function __construct(EntityManagerInterface $entityManager, OffreStageRepository $offreStageRepository)
    {
        $this->entityManager = $entityManager;
        $this->offreStageRepository = $offreStageRepository;
    }

    /**
     * @Route("/promotion", name="get_promotion", methods={"GET"})
     */
    public function getPromotion(PromotionRepository $repository): JsonResponse
    {
        $promotions = $repository->findAll();

        $data = [];
        foreach ($promotions as $promotion) {
            $data[] = [
                'id' => $promotion->getId(),
                'promo' => $promotion->getPromo(),
            ];
        }

        return new JsonResponse($data);
    }

    /**
     * @Route("/promotion", name="create_promotion", methods={"POST"})
     */
    public function createPromotion(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $promotion = new Promotion();
        $promotion->setPromo($data['promo']);

        if (isset($data['offreStageIds']) && is_array($data['offreStageIds'])) {
            foreach ($data['offreStageIds'] as $offreStageId) {
                $offreStage = $this->offreStageRepository->find($offreStageId);

                if ($offreStage) {
                    $promotion->addOffreStage($offreStage);
                } else {
                    return new JsonResponse(['message' => "OffreStage with id $offreStageId not found"], JsonResponse::HTTP_NOT_FOUND);
                }
            }
        }

        $this->entityManager->persist($promotion);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data created successfully'], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/promotion/{id}", name="update_promotion", methods={"PATCH"})
     */
    public function updatePromotion(Request $request, Promotion $promotion): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['promo'])) {
            $promotion->setPromo($data['promo']);
        }

        $this->entityManager->persist($promotion);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data updated successfully'], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/promotion/{id}", name="delete_promotion", methods={"DELETE"})
     */
    public function deletePromotion(Promotion $promotion): JsonResponse
    {
        $this->entityManager->remove($promotion);
        $this->entityManager->flush();

        return $this->json(['message' => 'Promotion deleted']);
    }
}
