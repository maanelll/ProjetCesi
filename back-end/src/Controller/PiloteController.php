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
use App\Entity\Centre;
/**
 * @Route("/api", name="api_")
 */
class PiloteController extends AbstractController
{/**
 * @Route("/create_pilote", name="create_pilote", methods={"POST"})
 */
    public function createPilote(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em = $doctrine->getManager();
        $decoded = json_decode($request->getContent());
        $email = $decoded->email;
        $nom = $decoded->nom;
        $prenom = $decoded->prenom;
        $plaintextPassword = $decoded->password;
        $promotionIds = $decoded->promotionIds;
        $centreId = $decoded->centreId;

        $centre = $doctrine->getRepository(Centre::class)->find($centreId);
        $promotions = $doctrine->getRepository(Promotion::class)->findBy(['id' => $promotionIds]);

        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
        $user->setPassword($hashedPassword);
        $user->setEmail($email);
        $user->setNom($nom);
        $user->setPrenom($prenom);
        $user->setRoles(['ROLE_PILOTE']);
        $user->setCentre($centre);

       foreach ($promotions as $promotion) {
    $user->addManagedPromotion($promotion);
}


        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'Pilote créé avec succès']);
    }

/**
 * @Route("/update_pilote/{id}", name="update_pilote", methods={"PUT"})
 */
public function updatePilote(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher, int $id): Response
{
    // Assurez-vous que l'utilisateur actuel est un administrateur.
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $em = $doctrine->getManager();
    $user = $em->getRepository(User::class)->find($id);

    if (!$user) {
        return $this->json(['message' => 'Pilote non trouvé'], Response::HTTP_NOT_FOUND);
    }

    $decoded = json_decode($request->getContent());
    $email = $decoded->email;
    $nom = $decoded->nom;
    $prenom = $decoded->prenom;
    $plaintextPassword = $decoded->password;
    $promotionIds = $decoded->promotionIds;
    $centreId = $decoded->centreId;

    // Trouver le centre à partir de son id
    $centre = $doctrine->getRepository(Centre::class)->find($centreId);

    // Trouver les promotions à partir de leurs ids
    $promotions = $doctrine->getRepository(Promotion::class)->findBy(['id' => $promotionIds]);

    $hashedPassword = $passwordHasher->hashPassword(
        $user,
        $plaintextPassword
    );

    $user->setEmail($email);
    $user->setNom($nom);
    $user->setPrenom($prenom);
    $user->setPassword($hashedPassword);
    $user->setCentre($centre);

    // Supprimer toutes les promotions actuelles du pilote
    foreach ($user->getManagedPromotions() as $promotion) {
        $user->removeManagedPromotion($promotion);
    }

    // Ajouter les nouvelles promotions au pilote
    foreach ($promotions as $promotion) {
        $user->addManagedPromotion($promotion);
    }
    

    $em->flush();

    return $this->json(['message' => 'Pilote mis à jour avec succès']);
}
/**
 * @Route("/delete_pilote/{id}", name="delete_pilote", methods={"DELETE"})
 */
public function deletePilote(ManagerRegistry $doctrine, int $id): Response
{
    // Assurez-vous que l'utilisateur actuel est un administrateur.
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $em = $doctrine->getManager();
    $user = $em->getRepository(User::class)->find($id);

    if (!$user) {
        return $this->json(['message' => 'Pilote non trouvé'], Response::HTTP_NOT_FOUND);
    }

    $em->remove($user);
    $em->flush();

    return $this->json(['message' => 'Pilote supprimé avec succès']);
}
/**
 * @Route("/pilotes", name="pilotes", methods={"GET"})
 */
public function getPilotes(ManagerRegistry $doctrine): Response
{
      // Assurez-vous que l'utilisateur actuel est un administrateur.
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
      $em = $doctrine->getManager();
      $qb = $em->createQueryBuilder();
      $qb->select('u') ->from('App:User', 'u') ->where('u.roles LIKE :roles') ->setParameter('roles', '%"'."ROLE_PILOTE".'"%');
      $pilotes = $qb->getQuery()->getResult();

    $pilotesData = [];
    foreach ($pilotes as $pilote) {
        $pilotesData[] = [
            'nom' => $pilote->getNom(),
            'prenom' => $pilote->getPrenom(),
            'centre' => $pilote->getCentre()->getNomCentre(),
            'promotions' => $pilote->getManagedPromotions()->map(fn($promotion) => $promotion->getPromo())->toArray(),
        ];
    }

    return $this->json($pilotesData);
}

}
