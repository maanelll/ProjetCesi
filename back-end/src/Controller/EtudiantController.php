<?php
  
namespace App\Controller;
  
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\UserRepository;
use App\Entity\User;
use App\Entity\Promotion;
use App\Entity\Centre;
  
/**
 * @Route("/api", name="api_")
 */
class EtudiantController extends AbstractController
{
    /**
 * @Route("/create_etudiant", name="create_etudiant", methods={"POST"})
 */
public function create(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): Response
{
    // Assurez-vous que l'utilisateur actuel est un administrateur.
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $em = $doctrine->getManager();
    $decoded = json_decode($request->getContent());
    $email = $decoded->email;
    $nom = $decoded->nom;
    $prenom = $decoded->prenom;
    $plaintextPassword = $decoded->password;
    $promotionId = $decoded->promotionId;
    $centreId = $decoded->centreId;

// Trouver la promotion à partir de son id
    $promotion = $doctrine->getRepository(Promotion::class)->find($promotionId);

    // Trouver le centre à partir de son id
    $centre = $doctrine->getRepository(Centre::class)->find($centreId);
    
    $user = new User();
    $hashedPassword = $passwordHasher->hashPassword(
        $user,
        $plaintextPassword
    );
    $user->setPassword($hashedPassword);
    $user->setEmail($email);
    $user->setNom($nom);
    $user->setPrenom($prenom);
    $user->setRoles(['ROLE_ETUDIANT']);
    $user->setPromotion($promotion); 
    $user->setCentre($centre);  
    $em->persist($user);
    $em->flush();

    return $this->json(['message' => 'Etudiant créé avec succès']);
}
/**
 * @Route("/update_etudiant/{id}", name="update_etudiant", methods={"PUT"})
 */
public function update(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher, int $id): Response
{
    // Assurez-vous que l'utilisateur actuel est un administrateur.
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $em = $doctrine->getManager();
    $user = $em->getRepository(User::class)->find($id);

    if (!$user) {
        return $this->json(['message' => 'Étudiant non trouvé'], Response::HTTP_NOT_FOUND);
    }

    $decoded = json_decode($request->getContent());
    $email = $decoded->email;
    $nom = $decoded->nom;
    $prenom = $decoded->prenom;
    $plaintextPassword = $decoded->password;
    $promotionId = $decoded->promotionId;
    $centreId = $decoded->centreId;

    // Trouver la promotion à partir de son id
    $promotion = $doctrine->getRepository(Promotion::class)->find($promotionId);

    // Trouver le centre à partir de son id
    $centre = $doctrine->getRepository(Centre::class)->find($centreId);

    $hashedPassword = $passwordHasher->hashPassword(
        $user,
        $plaintextPassword
    );

    $user->setEmail($email);
    $user->setNom($nom);
    $user->setPrenom($prenom);
    $user->setPassword($hashedPassword);
    $user->setPromotion($promotion);
    $user->setCentre($centre);

    $em->flush();

    return $this->json(['message' => 'Étudiant mis à jour avec succès']);
}
       /**
     * @Route("/delete_etudiant/{id}", name="delete_etudiant", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        // Assurez-vous que l'utilisateur actuel est un administrateur.
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em = $doctrine->getManager();
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json(['message' => 'Étudiant non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $em->remove($user);
        $em->flush();

        return $this->json(['message' => 'Étudiant supprimé avec succès']);
    }
    /**
     * @Route("/etudiants", name="etudiants", methods={"GET"})
     */
    public function index(ManagerRegistry $doctrine): Response
    {
        // Assurez-vous que l'utilisateur actuel est un administrateur.
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
      $em = $doctrine->getManager();
      $qb = $em->createQueryBuilder();
      $qb->select('u') ->from('App:User', 'u') ->where('u.roles LIKE :roles') ->setParameter('roles', '%"'."ROLE_ETUDIANT".'"%');
      $etudiants = $qb->getQuery()->getResult();

        $data = [];
        foreach ($etudiants as $etudiant) {
            $data[] = [
                'nom' => $etudiant->getNom(),
                'prenom' => $etudiant->getPrenom(),
                'centre' => $etudiant->getCentre() ? $etudiant->getCentre()->getNomCentre() : null,
                'promotion' => $etudiant->getPromotion() ? $etudiant->getPromotion()->getPromo() : null,
            ];
        
        }
        return $this->json($data);
    }
     

}
