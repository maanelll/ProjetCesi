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
     * @Route("/localite/{id}", name="get_localites", methods={"GET"})
     */
    public function getLocalites(LocaliteRepository $repository, $id = null): JsonResponse
    {
        if ($id) {
            $localite = $repository->find($id);

            if (!$localite) {
                return new JsonResponse(['message' => 'Localite not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            $data = [
                'id' => $localite->getId(),
                'city' => $localite->getCity(),
                'code_postal' => $localite->getCpNumber(),
                'adress' => $localite->getAddress()
            ];

            return new JsonResponse($data);
        }

        $localites = $repository->findAll();

        $data = [];
        foreach ($localites as $localite) {
            $data[] = [
                'id' => $localite->getId(),
                'city' => $localite->getCity(),
                'code_postal' => $localite->getCpNumber(),
                'adress' => $localite->getAddress()
            ];
        }

        return new JsonResponse($data);
    }



    /**
     * @Route("/localite", name="create_localite", methods={"POST"})
     */
    public function createLocalite(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $localite = new Localite($entityManager);
        $localite->setCpNumber($data['code_postal']);
        $localite->setAddress($data['adress']);
        $localite->setCity($data['city']);



        $entityManager->persist($localite);
        $entityManager->flush();
        $localityId = $localite->getId(); // Get the ID of the created locality



        return new JsonResponse(['localite' => $localityId], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/localite/{id}", name="update_localite", methods={"PATCH"})
     */
    public function updateLocalite(Request $request, Localite $localite): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $localite->setCpNumber($data['code_postal']);
        $localite->setAddress($data['adress']);
        $localite->setCity($data['city']);

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
