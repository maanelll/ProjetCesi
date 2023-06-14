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
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;



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
                'city' => $localite->getCity(),
                'code_postal' => $localite->getCpNumber(),
                'adress' => $localite->getAddress()
            ];
        }

        return [
            'id' => $entreprise->getId(),
            'name' => $entreprise->getName(),
            'activity_area' => $entreprise->getActivity_area(),
            'localities' => $localites,
            'nb_cesi' => $entreprise->getNb_cesi(),
        ];
    }


    /**
     * @Route("/entreprise", name="app_create_data", methods={"POST"})
     */
    public function createData(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $entreprise = new Entreprise();
        $entreprise->setName($data['name']);
        $entreprise->setActivity_area($data['activity_area']);

        $entreprise->setNb_cesi($data['nb_cesi']);
        $localiteIds = $data['localities'] ?? [];
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
     * @Route("/entreprise/{id}", name="update_entreprise", methods={"PUT"})
     */
    public function update(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $em = $doctrine->getManager();
        $entreprise = $em->getRepository(Entreprise::class)->find($id);

        if (!$entreprise) {
            return $this->json(['message' => 'Entreprise non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $decoded = json_decode($request->getContent());
        $name = $decoded->name;
        $activity_area = $decoded->activity_area;
        $nb_cesi = $decoded->nb_cesi;

        $entreprise->setName($name);
        $entreprise->setActivity_area($activity_area);
        $entreprise->setNb_cesi($nb_cesi);

        // Remove all old localites from the entreprise
        foreach ($entreprise->getLocalites() as $oldLocalite) {
            $entreprise->removeLocalite($oldLocalite);
        }

        $em->flush();  // Persist changes to the database here

        // Add the new localites
        foreach ($decoded->localities as $localiteId) {
            $localite = $em->getRepository(Localite::class)->find($localiteId);

            if ($localite) {
                $entreprise->addLocalite($localite);
            }
        }

        $em->flush();  // And here, to save new localites

        return $this->json(['message' => 'Entreprise mise à jour avec succès']);
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
