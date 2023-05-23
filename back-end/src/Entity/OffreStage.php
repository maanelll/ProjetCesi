<?php

namespace App\Entity;

use App\Repository\OffreStageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

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

    #[ORM\ManyToMany(targetEntity: Competence::class, mappedBy: "OffreStage")]
     private Collection $competences;
   
    #[ORM\ManyToMany(targetEntity: Promotion::class, mappedBy: "OffreStage")]
    private Collection $promotions;
    
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

    public function setDateOffre(\DateTimeInterface $date_offre): self
    {
        $this->date_offre = $date_offre;

        return $this;
    }

    public function getNbPlacesOffert(): ?int
    {
        return $this->nb_places_offert;
    }

    public function setNbPlacesOffert(int $nb_places_offert): self
    {
        $this->nb_places_offert = $nb_places_offert;

        return $this;
    }
}
