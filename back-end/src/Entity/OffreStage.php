<?php

namespace App\Entity;

use App\Repository\OffreStageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: OffreStageRepository::class)]
class OffreStage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $duree_stag = null;

    #[ORM\Column(nullable: true)]
    private ?float $base_renum = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_offre = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $nb_places_offert = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Competence::class, mappedBy: "offreStages")]
    private Collection $competences;

    #[ORM\ManyToOne(targetEntity: Promotion::class, inversedBy: 'offreStages')]
    private ?Promotion $promotion = null;

    public function __construct()
    {
        $this->competences = new ArrayCollection();
    }

    // Getters and setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDureeStag(): ?int
    {
        return $this->duree_stag;
    }

    public function setDureeStag(int $duree_stag): self
    {
        $this->duree_stag = $duree_stag;

        return $this;
    }

    public function getBaseRenum(): ?float
    {
        return $this->base_renum;
    }

    public function setBaseRenum(?float $base_renum): self
    {
        $this->base_renum = $base_renum;

        return $this;
    }

    public function getDateOffre(): ?\DateTimeInterface
    {
        return $this->date_offre;
    }

    public function setDateOffre(?\DateTimeInterface $date_offre): self
    {
        $this->date_offre = $date_offre;

        return $this;
    }

    public function getNbPlacesOffert(): ?int
    {
        return $this->nb_places_offert;
    }

    public function setNbPlacesOffert(?int $nb_places_offert): self
    {
        $this->nb_places_offert = $nb_places_offert;

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

    /**
     * @return Collection<int, Competence>
     */
    public function getCompetences(): Collection
    {
        return $this->competences;
    }

    public function addCompetence(Competence $competence): self
    {
        if (!$this->competences->contains($competence)) {
            $this->competences->add($competence);
            $competence->addOffreStage($this);
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
    public function getPromotion(): ?Promotion
    {
        return $this->promotion;
    }

    public function setPromotion(?Promotion $promotion): self
    {
        $this->promotion = $promotion;

        return $this;
    }

    // /**
    //  * @return Collection<int, Promotion>
    //  */
    // public function getPromotions(): Collection
    // {
    //     return $this->promotions;
    // }

    // public function addPromotion(Promotion $promotion): self
    // {
    //     if (!$this->promotions->contains($promotion)) {
    //         $this->promotions->add($promotion);
    //         $promotion->addOffreStage($this);
    //     }

    //     return $this;
    // }

    // public function removePromotion(Promotion $promotion): self
    // {
    //     if ($this->promotions->removeElement($promotion)) {
    //         $promotion->removeOffreStage($this);
    //     }

    //     return $this;
    // }
}
