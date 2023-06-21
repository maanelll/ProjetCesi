<?php

namespace App\Controller;

use App\Entity\Competence;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CompetenceRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api", name="api_")
 */
class CompetenceController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/competence/{id?}", name="get_competence", methods={"GET"})
     */
    public function getCompetence(int $id = null, CompetenceRepository $repository): JsonResponse
    {
        if ($id) {
            // Fetch specific competence by ID
            $competence = $repository->find($id);

            if (!$competence) {
                throw $this->createNotFoundException(
                    'No competence found for id ' . $id
                );
            }

            $data = [
                'id' => $competence->getId(),
                'comp' => $competence->getComp(),
            ];
        } else {
            // Fetch all competences
            $competences = $repository->findAll();

            $data = [];
            foreach ($competences as $competence) {
                $data[] = [
                    'id' => $competence->getId(),
                    'comp' => $competence->getComp(),
                ];
            }
        }

        return new JsonResponse($data);
    }

    /**
     * @Route("/competence", name="create_competence", methods={"POST"})
     */
    public function createCompetence(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $competence = new Competence();
        $competence->setComp($data['comp']);

        $entityManager->persist($competence);
        $entityManager->flush();
        $newId = $competence->getId();
        return new JsonResponse(['message' => 'Data created successfully', 'id' => $newId], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/competence/{id}", name="update_competence", methods={"PATCH"})
     */
    public function updateCompetence(Request $request, Competence $competence): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $competence->setComp($data['comp']);


        $this->entityManager->persist($competence);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data updated successfully'], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/competence/{id}", name="delete_competence", methods={"DELETE"})
     */
    public function deleteCompetence(Competence $competence, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($competence);
        $entityManager->flush();

        return $this->json(['message' => 'competence deleted']);
    }
}
