<?php

namespace App\Controller;

use App\Entity\Application;
use App\Repository\ApplicationRepository;
use App\Repository\OffreStageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="api_")
 */
class ApplicationController extends AbstractController
{
    #[Route('/api/application/all', name: 'api_application_all', methods: ['GET'])]
    public function all(ApplicationRepository $applicationRepository): JsonResponse
    {
        $applications = $applicationRepository->findAll();

        $formattedApplications = [];
        foreach ($applications as $application) {
            $formattedApplications[] = [
                'id' => $application->getId(),
                'cv' => $application->getCv(),
                'motivation_letter' => $application->getMotivationLetter(),
                'status' => $application->getStatus(),
                'submission_date' => $application->getSubmissionDate() ? $application->getSubmissionDate()->format('Y-m-d') : null,
                'user_id' => $application->getUser() ? $application->getUser()->getId() : null,
                'offre_stage_id' => $application->getOffreStage() ? $application->getOffreStage()->getId() : null,
            ];
        }

        return new JsonResponse($formattedApplications);
    }

    #[Route('/api/application/user/{userId}', name: 'api_application_index', methods: ['GET'])]
    public function index(int $userId, UserRepository $userRepository, ApplicationRepository $applicationRepository): JsonResponse
    {
        $user = $userRepository->find($userId);
        $role = $user->getRole();

        if (!$user || $role->getName() !== 'ROLE_ETUDIANT') {
            throw $this->createNotFoundException('No student found');
        }

        $applications = $applicationRepository->findBy(['user' => $user]);

        $formattedApplications = [];
        foreach ($applications as $application) {
            $formattedApplications[] = [
                'id' => $application->getId(),
                'cv' => $application->getCv(),
                'motivation_letter' => $application->getMotivationLetter(),
                'status' => $application->getStatus(),
                'submission_date' => $application->getSubmissionDate() ? $application->getSubmissionDate()->format('Y-m-d') : null,
                'offre_stage' => $application->getOffreStage() ? $application->getOffreStage()->getId() : null,
            ];
        }

        return new JsonResponse($formattedApplications);
    }

    #[Route('/api/application/create', name: 'api_application_create', methods: ['POST'])]
    public function create(Request $request, UserRepository $userRepository, OffreStageRepository $offreStageRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $userId = $data['user_id'];
        $user = $userRepository->find($userId);

        if (!$user || $user->getRole()->getName() !== 'ROLE_ETUDIANT') {
            throw $this->createNotFoundException('No student found');
        }

        $offreStageId = $data['offreStage_id'];
        $offreStage = $offreStageRepository->find($offreStageId);

        if (!$offreStage) {
            throw $this->createNotFoundException('No offre stage found');
        }

        $application = new Application();
        $application->setCv($data['cv']);
        $application->setMotivationLetter($data['motivation_letter']);
        $application->setStatus($data['status']);
        $application->setSubmissionDate(new \DateTime());
        $application->setUser($user);
        $application->setOffreStage($offreStage);

        $entityManager->persist($application);
        $entityManager->flush();

        return new JsonResponse("success");
    }

    #[Route('/api/application/update/{id}', name: 'api_application_update', methods: ['PATCH'])]
    public function update(int $id, Request $request, ApplicationRepository $applicationRepository, OffreStageRepository $offreStageRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $application = $applicationRepository->find($id);

        if (!$application) {
            throw $this->createNotFoundException('No application found');
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['cv'])) {
            $application->setCv($data['cv']);
        }

        if (isset($data['motivation_letter'])) {
            $application->setMotivationLetter($data['motivation_letter']);
        }

        if (isset($data['status'])) {
            $application->setStatus($data['status']);
        }

        if (isset($data['offreStage_id'])) {
            $offreStageId = $data['offreStage_id'];
            $offreStage = $offreStageRepository->find($offreStageId);

            if (!$offreStage) {
                throw $this->createNotFoundException('No offre stage found');
            }

            $application->setOffreStage($offreStage);
        }

        $entityManager->flush();

        return new JsonResponse("success");
    }

    #[Route('/api/application/delete/{id}/{offreStageId}', name: 'api_application_delete', methods: ['DELETE'])]
    public function delete(int $id, int $offreStageId, ApplicationRepository $applicationRepository, OffreStageRepository $offreStageRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $application = $applicationRepository->find($id);

        if (!$application) {
            throw $this->createNotFoundException('No application found');
        }

        $offreStage = $offreStageRepository->find($offreStageId);

        if (!$offreStage) {
            throw $this->createNotFoundException('No offre stage found');
        }

        if ($application->getOffreStage() !== $offreStage) {
            throw $this->createNotFoundException('The application does not belong to the specified offre stage');
        }

        $entityManager->remove($application);
        $entityManager->flush();

        return new JsonResponse("success");
    }
}
