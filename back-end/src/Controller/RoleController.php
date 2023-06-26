<?php

namespace App\Controller;

use App\Entity\Role;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\RoleRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api", name="api_")
 */
class RoleController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/roles", name="get_roles", methods={"GET"})
     */
public function getRoles(RoleRepository $repository): JsonResponse
{ 
    $roles = $repository->findAllExceptId(1);
    $data = [];
    foreach ($roles as $role) {
        $data[] = [
            'id' => $role->getId(),
            'role' => $role->getName(),
        ];
    }
    return new JsonResponse($data);
}


}
