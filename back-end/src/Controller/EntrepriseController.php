<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Entreprise;
use App\Entity\Localite;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\EntrepriseRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api", name="api_")
 */
class EntrepriseController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/entreprise/{id}", name="entreprise", methods={"GET"})
     */
    public function getData(EntrepriseRepository $repository, $id = null): JsonResponse
    {
        if ($id) {
            $entreprise = $repository->find($id);

            if (!$entreprise) {
                return new JsonResponse(['message' => 'Enterprise not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            $formattedData = $this->formatEnterpriseData($entreprise);
            return new JsonResponse($formattedData);
        }

        $enterprises = $repository->findAll();
        $formattedData = [];

        foreach ($enterprises as $entreprise) {
            $formattedData[] = $this->formatEnterpriseData($entreprise);
        }

        return new JsonResponse($formattedData);
    }

    private function formatEnterpriseData(Entreprise $entreprise): array
    {
        $localites = [];

        foreach ($entreprise->getLocalites() as $localite) {
            $localites[] = [
                'id' => $localite->getId(),
                'name' => $localite->getName(),
            ];
        }

        return [
            'id' => $entreprise->getId(),
            'nom' => $entreprise->getNom(),
            'secteur_act' => $entreprise->getSecteurAct(),
            'localites' => $localites,
            'nb_stage_cesi' => $entreprise->getNbStagCesi(),
        ];
    }


    /**
     * @Route("/entreprise", name="app_create_data", methods={"POST"})
     */
    public function createData(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $entreprise = new Entreprise();
        $entreprise->setNom($data['nom']);
        $entreprise->setSecteurAct($data['secteur_act']);

        $entreprise->setNbStagCesi($data['nb_stage_cesi']);
        $localiteIds = $data['localite'] ?? [];
        $localites = [];

        foreach ($localiteIds as $localiteId) {
            $localite = $this->entityManager->getRepository(Localite::class)->find($localiteId);

            if ($localite) {
                $localites[] = $localite;
            }
        }

        $entreprise->getLocalites()->clear();
        foreach ($localites as $localite) {
            $entreprise->addLocalite($localite);
        }



        $this->entityManager->persist($entreprise);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data created successfully'], JsonResponse::HTTP_CREATED);
    }
    /**
     * @Route("/entreprise/{id}", name="app_update_data", methods={"PATCH"})
     */
    public function updateData(Request $request, Entreprise $entreprise): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data["nom"])) {
            $entreprise->setNom($data['nom']);
        }
        if (isset($data["secteur_act"])) {
            $entreprise->setSecteurAct($data['secteur_act']);
        }
        if (isset($data["nb_stage_cesi"])) {
            $entreprise->setNbStagCesi($data['nb_stage_cesi']);
        }
        if (isset($data['localite'])) {
            $localiteIds = $data['localite'];
            $localites = [];

            foreach ($localiteIds as $localiteId) {
                $localite = $this->entityManager->getRepository(Localite::class)->find($localiteId);

                if ($localite) {
                    $localites[] = $localite;
                }
            }

            foreach ($localites as $localite) {
                $entreprise->addLocalite($localite);
            }
        }


        $this->entityManager->persist($entreprise);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Data updated successfully'], JsonResponse::HTTP_OK);
    }


    /**
     * @Route("/entreprise/{id}", name="app_delete_data", methods={"DELETE"})
     */
    public function deleteData(Entreprise $entreprise, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($entreprise);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Data deleted successfully'], JsonResponse::HTTP_OK);
        // }
    }
}
