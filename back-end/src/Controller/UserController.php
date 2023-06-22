<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;
use App\Entity\Promotion;
use App\Entity\Center;
use App\Entity\Role;

/**
 * @Route("/api", name="api_")
 */
class UserController extends AbstractController
{

/**
 * @Route("/api/pilot_promotions", name="pilot_promotions", methods={"GET"})
 */
public function getPilotPromotions(EntityManagerInterface $entityManager): Response
{
    $pilotPromotions = [];

    // Récupérer tous les utilisateurs ayant un rôle avec l'ID 2 (pilotes)
    $users = $entityManager->getRepository(User::class)->findBy(['role' => 2]);

    // Parcourir chaque utilisateur (pilote)
    foreach ($users as $user) {
        // Récupérer les promotions attribuées à l'utilisateur (pilote)
        $promotions = $user->getPromotions();

        // Parcourir chaque promotion et ajouter à la liste des promotions attribuées aux pilotes
        foreach ($promotions as $promotion) {
            $pilotPromotions[] = $promotion;
        }
    }

    // Retourner les promotions sous forme de réponse JSON
    return $this->json($pilotPromotions);
}

/**
 * @Route("/user/{id}", name="get_user_by_id", methods={"GET"})
 */
public function getUserById(User $user): Response
{
    $role = $user->getRole();
    $roleData = [
        'id' => $role->getId(),
        'name' => $role->getName(),
    ];

    $center = $user->getCenter();
    $centerData = $center ? ['id' => $center->getId(), 'centerName' => $center->getCenterName()] : null;

    if ($role->getName() === 'ROLE_ETUDIANT') {
        $promotion = $user->getPromotion();
        $promotionData = $promotion ? ['id' => $promotion->getId(), 'promo' => $promotion->getPromo()] : null;

        $data = [
            'id'=>$user->getId(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'email'=>$user->getEmail(),
            'password'=>$user->getPassword(),
            'promotions' => $promotionData,
            'center' => $centerData,
            'role' => $roleData,
        ];
    } else if ($role->getName() === 'ROLE_PILOTE') {
        $promotions = $user->getManagedPromotions()->map(function($promotion) {
            return ['id' => $promotion->getId(), 'promo' => $promotion->getPromo()];
        })->toArray();

        $data = [
            'id'=>$user->getId(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'email'=>$user->getEmail(),
            'password'=>$user->getPassword(),
            'promotions' => $promotions,
            'center' => $centerData,
            'role' => $roleData,
        ];
    }

    return $this->json($data);
}


/**
 * @Route("/create_user", name="create_user", methods={"POST"})
 */
public function create(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): Response
{
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $em = $doctrine->getManager();
    $decoded = json_decode($request->getContent());
    $email = $decoded->email;
    $firstName = $decoded->firstName;
    $lastName = $decoded->lastName;
    $plaintextPassword = $decoded->password;
    $roleId = $decoded->roleId;
    $promotionIds = $decoded->promotionIds; // Liste des IDs de promotions
    $centerId = $decoded->centerId;

    $role = $doctrine->getRepository(Role::class)->find($roleId);
    $promotions = $doctrine->getRepository(Promotion::class)->findBy(['id' => $promotionIds]);
    $center = $doctrine->getRepository(Center::class)->find($centerId);

    $user = new User();
    $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
    $user->setPassword($hashedPassword);
    $user->setEmail($email);
    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setRole($role);

    if ($role->getId() === 3) {
        // Si le rôle est étudiant (ID 3), on s'assure qu'il y a une seule promotion sélectionnée
        if (count($promotions) !== 1) {
            return $this->json(['message' => 'Un étudiant doit avoir une seule promotion'], Response::HTTP_BAD_REQUEST);
        }
        $user->setPromotion($promotions[0]);
    } elseif ($role->getId() === 2) {
        // Si le rôle est pilote (ID 2), on ajoute toutes les promotions sélectionnées
        foreach ($promotions as $promotion) {
            $user->addManagedPromotion($promotion);
        }
    } else {
        return $this->json(['message' => 'Rôle invalide'], Response::HTTP_BAD_REQUEST);
    }

    $user->setCenter($center);

    $em->persist($user);
    $em->flush();

    return $this->json(['message' => 'Utilisateur créé avec succès']);
}

/**
 * @Route("/update_user/{id}", name="update_user", methods={"PUT"})
 */
public function update(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher, int $id): Response
{
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $em = $doctrine->getManager();
    $user = $em->getRepository(User::class)->find($id);

    if (!$user) {
        return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
    }

    $decoded = json_decode($request->getContent());
    $email = $decoded->email;
    $firstName = $decoded->firstName;
    $lastName = $decoded->lastName;
    $plaintextPassword = $decoded->password;
    $roleId = $decoded->roleId;
    $promotionIds = $decoded->promotionIds; // Liste des IDs de promotions
    $centerId = $decoded->centerId;

    $role = $doctrine->getRepository(Role::class)->find($roleId);
    $promotions = $doctrine->getRepository(Promotion::class)->findBy(['id' => $promotionIds]);
    $center = $doctrine->getRepository(Center::class)->find($centerId);

    $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
    $user->setEmail($email);
    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setPassword($hashedPassword);
    $user->setRole($role);

    if ($role->getId() === 3) {
        // Si le rôle est étudiant (ID 3), on s'assure qu'il y a une seule promotion sélectionnée
        if (count($promotions) !== 1) {
            return $this->json(['message' => 'Un étudiant doit avoir une seule promotion'], Response::HTTP_BAD_REQUEST);
        }
        $user->setPromotion($promotions[0]);
    } elseif ($role->getId() === 2) {
        // Si le rôle est pilote (ID 2), on ajoute toutes les promotions sélectionnées
        foreach ($promotions as $promotion) {
            $user->addManagedPromotion($promotion);
        }
    } else {
        return $this->json(['message' => 'Rôle invalide'], Response::HTTP_BAD_REQUEST);
    }

    $user->setCenter($center);

    $em->flush();

    return $this->json(['message' => 'Utilisateur mis à jour avec succès']);
}


    /**
     * @Route("/delete_user/{id}", name="delete_user", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em = $doctrine->getManager();
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $em->remove($user);
        $em->flush();

        return $this->json(['message' => 'Utilisateur supprimé avec succès']);
    }

    /**
     * @Route("/users", name="users", methods={"GET"})
     */
    public function index(ManagerRegistry $doctrine): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em = $doctrine->getManager();
        $users = $em->getRepository(User::class)->findAll();

        $data = [];
        foreach ($users as $user) {
            $role = $user->getRole()->getName();

            if ($role === 'ROLE_ETUDIANT') {
                $promotion = $user->getPromotion() ? $user->getPromotion()->getPromo() : null;
                $center = $user->getCenter() ? $user->getCenter()->getCenterName() : null;

                $data[] = [
                    'id'=>$user->getId(),
                    'firstName' => $user->getFirstName(),
                    'lastName' => $user->getLastName(),
                    'promotions' => $promotion,
                    'center' => $center,
                    'role' => $role,
                ];
            } else if ($role === 'ROLE_PILOTE') {
                $promotions = $user->getManagedPromotions()->map(fn($promotion) => $promotion->getPromo())->toArray();
                $center = $user->getCenter() ? $user->getCenter()->getCenterName() : null;

                $data[] = [
                    'id'=>$user->getId(),
                    'firstName' => $user->getFirstName(),
                    'lastName' => $user->getLastName(),
                    'promotions' => $promotions,
                    'center' => $center,
                    'role' => $role,
                ];
            }
        }

        return $this->json($data);
    }

    /**
 * @Route("/loggedUser", name="api_user_me", methods={"GET"})
 */
public function me(): Response
{
    // Récupère l'utilisateur actuellement connecté
    $user = $this->getUser();

    // Si aucun utilisateur n'est connecté, renvoie une erreur
    if (!$user) {
        return $this->json([
            'message' => 'aucun utilisateur connecté'
        ], Response::HTTP_UNAUTHORIZED);
    }

    // Renvoie les informations de l'utilisateur en format JSON
    return $this->json([
        'id' => $user->getId(),
        'firstName' => $user->getFirstName(),
        'lastName' => $user->getLastName(),
      
    ]);
}

}

