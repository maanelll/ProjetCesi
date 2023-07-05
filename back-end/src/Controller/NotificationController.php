<?php

namespace App\Controller;

use App\Entity\Notification;
use App\Repository\ApplicationRepository;
use App\Repository\NotificationRepository;
use App\Repository\UserRepository;
use DateTime;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="api_")
 */
class NotificationController extends AbstractController
{
    #[Route('/notification/all', name: 'api_notification_all', methods: ['GET'])]
    public function all(NotificationRepository $notificationRepository): JsonResponse
    {
        $notifications = $notificationRepository->findAll();

        $formattedNotifications = [];
        foreach ($notifications as $notification) {
            $formattedNotifications[] = [
                'id' => $notification->getId(),
                'title' => $notification->getTitle(),
                'message' => $notification->getMessage(),
                'status' => $notification->getStatus(),
                'notification_date' => $notification->getNotificationDate() ? $notification->getNotificationDate()->format('d-m-Y') : null,
                'user_id' => $notification->getUser() ? $notification->getUser()->getId() : null,
                'application_id' => $notification->getApplication() ? $notification->getApplication()->getId() : null,
            ];
        }

        return new JsonResponse($formattedNotifications);
    }

    #[Route('/api/notification/user/{userId}', name: 'api_notification_user', methods: ['GET'])]
    public function getByUser(int $userId, UserRepository $userRepository, NotificationRepository $notificationRepository): JsonResponse
    {
        $user = $userRepository->find($userId);

        if (!$user) {
            throw $this->createNotFoundException('No user found');
        }

        $notifications = $notificationRepository->findBy(['user' => $user]);

        $formattedNotifications = [];
        foreach ($notifications as $notification) {
            $formattedNotifications[] = [
                'id' => $notification->getId(),
                'title' => $notification->getTitle(),
                'message' => $notification->getMessage(),
                'status' => $notification->getStatus(),
                'notification_date' => $notification->getNotificationDate() ? $notification->getNotificationDate()->format('Y-m-d') : null,
            ];
        }

        return new JsonResponse($formattedNotifications);
    }

    #[Route('/api/notification/create', name: 'api_notification_create', methods: ['POST'])]
    public function create(Request $request, UserRepository $userRepository, ApplicationRepository $applicationRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $notification = new Notification();
        $notification->setTitle($data['title']);
        $notification->setMessage($data['message']);
        $notification->setStatus($data['status']);
        $notificationDate = DateTimeImmutable::createFromFormat('d-m-Y', $data['notification_date']);
        $notification->setNotificationDate($notificationDate);

        // Find the User entity by user_id
        $userId = $data['user_id'];
        $user = $userRepository->find($userId);

        if (!$user) {
            throw $this->createNotFoundException('No user found');
        }

        $notification->setUser($user);

        // Find the Application entity by application_id
        $applicationId = $data['application_id'];
        $application = $applicationRepository->find($applicationId);

        if (!$application) {
            throw $this->createNotFoundException('No application found');
        }

        $notification->setApplication($application);

        $entityManager->persist($notification);
        $entityManager->flush();

        return new JsonResponse("success");
    }

    #[Route('/notification/update/{id}', name: 'api_notification_update', methods: ['PATCH'])]
    public function update(int $id, Request $request, NotificationRepository $notificationRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $notification = $notificationRepository->find($id);

        if (!$notification) {
            throw $this->createNotFoundException('No notification found');
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['title'])) {
            $notification->setTitle($data['title']);
        }

        if (isset($data['message'])) {
            $notification->setMessage($data['message']);
        }

        if (isset($data['status'])) {
            $notification->setStatus($data['status']);
        }
        if (isset($data['notification_date'])) {
            $notificationDate = DateTime::createFromFormat('Y/m/d', $data['notification_date']);
            if ($notificationDate instanceof DateTimeInterface) {
                $notification->setNotificationDate($notificationDate);
            } else {
                throw new InvalidArgumentException('Invalid notification date format');
            }
        }

        // Update other properties as needed

        // Find the User entity by user_id (if applicable)
        if (isset($data['user_id'])) {
            $userRepository = $entityManager->getRepository(User::class);
            $userId = $data['user_id'];
            $user = $userRepository->find($userId);

            if (!$user) {
                throw $this->createNotFoundException('No user found');
            }

            $notification->setUser($user);
        }

        // Find the Application entity by application_id (if applicable)
        if (isset($data['application_id'])) {
            $applicationRepository = $entityManager->getRepository(Application::class);
            $applicationId = $data['application_id'];
            $application = $applicationRepository->find($applicationId);

            if (!$application) {
                throw $this->createNotFoundException('No application found');
            }

            $notification->setApplication($application);
        }

        $entityManager->flush();

        return new JsonResponse('success');
    }

    #[Route('/notification/delete/{id}', name: 'api_notification_delete', methods: ['DELETE'])]
    public function delete(int $id, NotificationRepository $notificationRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $notification = $notificationRepository->find($id);

        if (!$notification) {
            throw $this->createNotFoundException('No notification found');
        }

        $entityManager->remove($notification);
        $entityManager->flush();

        return new JsonResponse('success');
    }
}
