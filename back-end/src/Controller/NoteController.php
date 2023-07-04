<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Note;
use App\Entity\User;
use App\Entity\Entreprise;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

//s

/**
 * @Route("/api", name="api_")
 */

class NoteController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    /**
     * @Route("/note/{id?}", name="note_new", methods={"GET"})
     */
    public function get(Request $request, $id = null): Response
    {
        if ($id) {
            $note = $this->entityManager->getRepository(Note::class)->find($id);
            if (!$note) {
                return new Response('No note found for id ' . $id, Response::HTTP_NOT_FOUND);
            }
            // Here you can transform your note object to array or json, and return
            return $this->json([
                'id' => $note->getId(),
                'rating' => $note->getRating(),
                'userId' => $note->getUser()->getId(),
                'entrepriseId' => $note->getEntreprise()->getId()
            ]);
        } else {
            $notes = $this->entityManager->getRepository(Note::class)->findAll();
            // Here you can transform your notes objects to array or json, and return
            $notesArray = [];
            foreach ($notes as $note) {
                $notesArray[] = [
                    'id' => $note->getId(),
                    'rating' => $note->getRating(),
                    'userId' => $note->getUser()->getId(),
                    'entrepriseId' => $note->getEntreprise()->getId()

                ];
            }
            return $this->json($notesArray);
        }
    }

    /**
     * @Route("/note", name="note_post", methods={"POST"})
     */
    public function post(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['rating']) || !isset($data['userId']) || !isset($data['entrepriseId'])) {
            return new Response('Missing data', Response::HTTP_BAD_REQUEST);
        }

        $user = $this->entityManager->getRepository(User::class)->find($data['userId']);
        $entreprise = $this->entityManager->getRepository(Entreprise::class)->find($data['entrepriseId']);

        if (!$user || !$entreprise) {
            return new Response('User or Entreprise not found', Response::HTTP_NOT_FOUND);
        }

        // Recherchez une note existante pour l'utilisateur et l'entreprise
        $note = $this->entityManager->getRepository(Note::class)->findOneBy([
            'user' => $user,
            'entreprise' => $entreprise
        ]);

        // Si une note n'existe pas, créez-en une nouvelle
        if (!$note) {
            $note = new Note();
            $note->setUser($user);
            $note->setEntreprise($entreprise);
        }

        // Mettez à jour la note et enregistrez-la
        $note->setRating($data['rating']);
        $entityManager->persist($note);
        $entityManager->flush();
        // Return the updated note as JSON
        return new JsonResponse([
            'id' => $note->getId(),
            'rating' => $note->getRating(),
            'user_id' => $note->getUser()->getId(),
            'entreprise_id' => $note->getEntreprise()->getId()
        ], Response::HTTP_CREATED);
    }


    /**
     * @Route("/note/{id}", name="note_patch", methods={"PATCH"})
     */
    public function patch(Request $request, $id): Response
    {
        $note = $this->entityManager->getRepository(Note::class)->find($id);
        if (!$note) {
            return new Response('No note found for id ' . $id, Response::HTTP_NOT_FOUND);
        }

        $newRatingValue = $request->request->get('rating');
        if ($newRatingValue) {
            $note->setRating($newRatingValue);
            $this->entityManager->flush();
            return new Response('Note updated', Response::HTTP_OK);
        }
        return new Response('Error updating note', Response::HTTP_BAD_REQUEST);
    }

    /**
     * @Route("/note/entreprise/{entrepriseId}/user/{userId}", name="note_get_by_entreprise_and_user", methods={"GET"})
     */
    public function getByEntrepriseAndUser($entrepriseId, $userId): Response
    {
        $user = $this->entityManager->getRepository(User::class)->find($userId);
        $entreprise = $this->entityManager->getRepository(Entreprise::class)->find($entrepriseId);

        if (!$user || !$entreprise) {
            return new Response('User or Entreprise not found', Response::HTTP_NOT_FOUND);
        }

        $note = $this->entityManager->getRepository(Note::class)->findOneBy([
            'user' => $user,
            'entreprise' => $entreprise
        ]);

        if (!$note) {
            return new Response('No note found for this user and entreprise', Response::HTTP_NOT_FOUND);
        }

        // Here you can transform your note object to array or json, and return
        $noteData = [
            'rating' => $note->getRating(),

        ];
        return   $this->json($noteData);
    }
}
