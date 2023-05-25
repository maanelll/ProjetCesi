<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Localite;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\LocaliteRepository;
use Doctrine\ORM\EntityManagerInterface;



/**
 * @Route("/api", name="api_")
 */
class LocaliteController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/localite", name="get_localites", methods={"GET"})
     */
    public function getLocalites(LocaliteRepository $repository): JsonResponse
    { {
            $localites = $repository->findAll();

            $data = [];
            foreach ($localites as $localite) {
                $data[] = [
                    'id' => $localite->getId(),
                    'name' => $localite->getName(),
                ];
            }

            return new JsonResponse($data);
        }
    }

    /**
     * @Route("/localite", name="create_localite", methods={"POST"})
     */
    public function createLocalite(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $localite = new Localite();
        $localite->setName($data['name']);

        $entityManager->persist($localite);
        $entityManager->flush();
        return new JsonResponse(['message' => 'Data created successfully'], JsonResponse::HTTP_CREATED);
        // return new JsonResponse(['id' => $localite->getId()], 201);

    }

    /**
     * @Route("/localite/{id}", name="update_localite", methods={"PATCH"})
     */
    public function updateLocalite(Request $request, Localite $localite): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $localite->setName($data['name']);


        $this->entityManager->persist($localite);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data updated successfully'], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/localite/{id}", name="delete_localite", methods={"DELETE"})
     */
    public function deleteLocalite(Localite $localite, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($localite);
        $entityManager->flush();

        return $this->json(['message' => 'Localite deleted']);
    }
}
