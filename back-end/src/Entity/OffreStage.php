<?php

namespace App\Entity;

use App\Repository\OffreStageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use App\Entity\Competence;
use App\Entity\Promotion;


#[ORM\Entity(repositoryClass: OffreStageRepository::class)]
class OffreStage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $internship_duration = null;

    #[ORM\Column(nullable: true)]
    private ?float $compensation_basis = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $offer_date = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $nb_places_offered = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Competence::class, mappedBy: "offreStages", cascade: ["remove"])]
    #[ORM\JoinTable(name: "offrestage_competence")]
    private Collection $competences;

    #[ORM\ManyToMany(targetEntity: Promotion::class, mappedBy: 'offreStages', cascade: ["remove"])]
    #[ORM\JoinTable(name: "promotion_offre_stage")]
    private Collection $promotions;

    #[ORM\ManyToOne(targetEntity: "App\Entity\Entreprise", inversedBy: "offres")]
    #[ORM\JoinColumn(nullable: false)]
    private ?Entreprise $entreprise;

    public function __construct()
    {
        $this->competences = new ArrayCollection();
        $this->promotions = new ArrayCollection();
    }

    // Getters and setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInternship_duration(): ?int
    {
        return $this->internship_duration;
    }

    public function setInternship_duration(int $internship_duration): self
    {
        $this->internship_duration = $internship_duration;

        return $this;
    }

    public function getCompensation_basis(): ?float
    {
        return $this->compensation_basis;
    }

    public function setCompensation_basis(?float $compensation_basis): self
    {
        $this->compensation_basis = $compensation_basis;

        return $this;
    }

    public function getOffer_date(): ?\DateTimeInterface
    {
        return $this->offer_date;
    }

    public function setOffer_date(?\DateTimeInterface $offer_date): self
    {
        $this->offer_date = $offer_date;

        return $this;
    }

    public function getNb_places_offered(): ?int
    {
        return $this->nb_places_offered;
    }

    public function setNb_places_offered(?int $nb_places_offered): self
    {
        $this->nb_places_offered = $nb_places_offered;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }



    public function addCompetence(Competence $competence): self
    {
        if (!$this->competences->contains($competence)) {
            $this->competences[] = $competence;
            $competence->addOffreStage($this); // Also add this offreStage to the competence's collection
        }

        return $this;
    }


    public function removeCompetence(Competence $competence): self
    {
        if ($this->competences->removeElement($competence)) {
            $competence->removeOffreStage($this);
        }

        return $this;
    }
    public function getPromotions(): Collection
    {
        return $this->promotions;
    }
    public function getCompetences(): Collection
    {
        return $this->promotions;
    }


    public function addPromotion(Promotion $promotion): self
    {
        if (!$this->promotions->contains($promotion)) {
            $this->promotions[] = $promotion;
            $promotion->addOffreStage($this); // Also add this offreStage to the promotion's collection
        }

        return $this;
    }

    public function removePromotion(Promotion $promotion): self
    {
        if ($this->promotions->contains($promotion)) {
            $this->promotions->removeElement($promotion);
            $promotion->removeOffreStage($this); // Also remove this offreStage from the promotion's collection
        }

        return $this;
    }
    public function getEntreprise(): ?Entreprise
    {
        return $this->entreprise;
    }

    public function setEntreprise(?Entreprise $entreprise): self
    {
        $this->entreprise = $entreprise;

        return $this;
    }
}
