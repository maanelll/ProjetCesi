<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\OffreStage;
use App\Entity\WishList;
use App\Repository\UserRepository;
use App\Repository\OffreStageRepository;
use App\Repository\WishListRepository;
use Symfony\Component\HttpFoundation\JsonResponse;


/**
 * @Route("/api", name="api_")
 */
class WishListController extends AbstractController
{
    /**
     * @Route("/add_offer/{userId}/{offreStageId}", name="add_to_wishlist", methods={"POST"})
     */
    public function addToWishlist($userId, $offreStageId, UserRepository $userRepository, OffreStageRepository $offreStageRepository, EntityManagerInterface $entityManager)
    {
        $user = $userRepository->find($userId);
        $role = $user->getRole();
        $offreStage = $offreStageRepository->find($offreStageId);

        if (!$user || $role->getName() !== 'ROLE_ETUDIANT') {
            throw $this->createNotFoundException('No student found');
        }

        if (!$offreStage) {
            throw $this->createNotFoundException('No stage found');
        }

        $wishList = new WishList();
        $wishList->setUser($user);
        $wishList->setOffreStage($offreStage);

        $entityManager->persist($wishList);
        $entityManager->flush();

        return new JsonResponse("succes");
    }

    /**
     * @Route("/remove_offer/{id}", name="remove_from_wishlist", methods={"DELETE"})
     */
    public function removeFromWishlist($id, WishListRepository $wishListRepository, EntityManagerInterface $entityManager)
    {
        $wishList = $wishListRepository->find($id);

        if (!$wishList) {
            throw $this->createNotFoundException('No wishlist entry found');
        }

        $entityManager->remove($wishList);
        $entityManager->flush();

        return new JsonResponse("succes");
    }

    /**
     * @Route("/wishlist/{userId}", name="wishlist_index", methods={"GET"})
     */
    public function showWishlist(int $userId, UserRepository $userRepository, WishListRepository $wishListRepository): JsonResponse
    {
        $user = $userRepository->find($userId);
        $role = $user->getRole();

        if (!$user || $role->getName() !== 'ROLE_ETUDIANT') {
            throw $this->createNotFoundException('No student found');
        }

        $wishlist = $wishListRepository->findBy(['user' => $user]);

        $offreStages = [];
        foreach ($wishlist as $wish) {
            $offreStage = $wish->getOffreStage();

            $offer_date = $offreStage->getOffer_date();
            $entreprise = $offreStage->getEntreprise() ? $offreStage->getEntreprise()->getName() : null;
            $promotions = $offreStage->getPromotions()->map(fn ($promotion) => $promotion->getPromo())->toArray();
            $offer_date = $offreStage->getOffer_date();
            $competences = $offreStage->getCompetences()->map(fn ($competence) => $competence->getComp())->toArray();
            $localite = $offreStage->getLocalite();
            if ($localite) {
                $address = $localite->getAddress();
                $cpNumber = $localite->getCPNumber();
                $city = $localite->getCity();
                $completeAddress = $address . ', ' . $cpNumber . ' ' . $city;
            } else {
                $completeAddress = null;
            }

            $offreStages[] = [
                'id' => $wish->getId(),
                'offreStage_id' => $offreStage->getId(),
                'name' => $offreStage->getName(),
                'internship_duration' => $offreStage->getInternship_duration(),
                'compensation_basis' => $offreStage->getCompensation_basis(),
                'offer_date' => $offer_date ? $offer_date->format('Y-m-d') : null,
                'nb_places_offered' => $offreStage->getNb_places_offered(),
                'entreprise_name' => $entreprise,
                'competences' => $competences,
                'promotions' => $promotions,
                'localite' => $completeAddress,
            ];
        }

        return new JsonResponse($offreStages);
    }
}
