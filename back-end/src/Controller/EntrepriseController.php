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
 * @Route("/entreprise", name="entreprise", methods={"GET"} )
 */
public function getData(EntrepriseRepository $repository): JsonResponse
{
    $data = $repository->findAll(); 

    $formattedData = [];
    foreach ($data as $item) {
        $localites = [];
        foreach ($item->getLocalites() as $localite) {
            $localites[] = [
                'id' => $localite->getId(),
                'name' => $localite->getName(),
            ];
        }

        $formattedData[] = [
            'id' => $item->getId(),
            'nom' => $item->getNom(),
            'secteur_act' => $item->getSecteurAct(),
            'localites' => $localites,
            'nb_stage_cesi' => $item->getNbStagCesi(),
        ];
    }

    return new JsonResponse($formattedData);
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

        $entreprise->setNom($data['nom']);
        $entreprise->setSecteurAct($data['secteur_act']);
        $entreprise->setNbStagCesi($data['nb_stage_cesi']);

        $localiteIds = $data['localite'];
        foreach ($localiteIds as $localiteId) {
            $localite = $this->entityManager->getRepository(Localite::class)->find($localiteId);
        
            if ($localite) {
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
    }
}