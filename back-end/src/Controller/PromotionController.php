<?php

namespace App\Controller;

use App\Entity\Promotion;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PromotionRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api", name="api_")
 */
class PromotionController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/promotion", name="get_promotion", methods={"GET"})
     */
    public function getPromotion(PromotionRepository $repository): JsonResponse
    { {
            $promotion = $repository->findAll();

            $data = [];
            foreach ($promotion as $promotion) {
                $data[] = [
                    'id' => $promotion->getId(),
                    'promo' => $promotion->getPromo(),
                ];
            }

            return new JsonResponse($data);
        }
    }

    /**
     * @Route("/promotion", name="create_promotion", methods={"POST"})
     */
    public function createLocalite(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $promotion = new Promotion();
        $promotion->setPromo($data['promo']);

        $entityManager->persist($promotion);
        $entityManager->flush();
        return new JsonResponse(['message' => 'Data created successfully'], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/promotion/{id}", name="update_promotion, methods={"PATCH"})
     */
    public function updateLocalite(Request $request, Promotion $promotion): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $promotion->setPromo($data['promo']);


        $this->entityManager->persist($promotion);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data updated successfully'], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/promotion/{id}", name="delete_promotion", methods={"DELETE"})
     */
    public function deleteLocalite(Promotion $promotion, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($promotion);
        $entityManager->flush();

        return $this->json(['message' => 'promotion deleted']);
    }
}
