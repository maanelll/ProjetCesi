<?php
  
namespace App\Controller;
  
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;
use App\Entity\Role;
  
/**
 * @Route("/api", name="api_")
 */
  
class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function index(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
          
        $em = $doctrine->getManager();
        $roleRepository = $doctrine->getRepository(Role::class); 
        $decoded = json_decode($request->getContent());
        $email = $decoded->email;
        $firstName = $decoded->firstName;
        $lastName = $decoded->lastName;
        $plaintextPassword = $decoded->password;
        $roleId = $decoded->role; 
  
        $role = $roleRepository->find($roleId);
        if (!$role) {
            throw $this->createNotFoundException('No role found with id ' . $roleId);
        }
  
        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $user->setEmail($email);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setRole($role); 
        $em->persist($user);
        $em->flush();
  
        return $this->json(['message' => 'Registered Successfully']);
    }
}
