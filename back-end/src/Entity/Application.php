<?php

namespace App\Entity;

use App\Repository\ApplicationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ApplicationRepository::class)]
class Application
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $cv = null;

    #[ORM\Column(length: 255)]
    private ?string $motivationLetter = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $status = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $submissionDate = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'applications')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id')]
    private ?User $user = null;
    #[ORM\ManyToOne(targetEntity: OffreStage::class, inversedBy: 'applications')]
    #[ORM\JoinColumn(name: 'offre_stage_id', referencedColumnName: 'id')]
    private ?OffreStage $offreStage = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCv(): ?string
    {
        return $this->cv;
    }

    public function setCv(string $cv): static
    {
        $this->cv = $cv;

        return $this;
    }

    public function getMotivationLetter(): ?string
    {
        return $this->motivationLetter;
    }

    public function setMotivationLetter(string $motivationLetter): static
    {
        $this->motivationLetter = $motivationLetter;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getSubmissionDate(): ?\DateTimeInterface
    {
        return $this->submissionDate;
    }

    public function setSubmissionDate(?\DateTimeInterface $submissionDate): static
    {
        $this->submissionDate = $submissionDate;

        return $this;
    }
    /**
     * Set the related internship offer.
     *
     * @param OffreStage $offreStage
     */
    public function setOffreStage(OffreStage $offreStage): void
    {
        $this->offreStage = $offreStage;
    }

    /**
     * Get the related internship offer.
     *
     * @return OffreStage|null
     */
    public function getOffreStage(): ?OffreStage
    {
        return $this->offreStage;
    }
    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
