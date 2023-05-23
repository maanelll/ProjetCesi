<?php

namespace App\Entity;

use App\Repository\CompetenceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompetenceRepository::class)]
class Competence
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $comp = null;

    #[ORM\ManyToMany(targetEntity: OffreStage::class, inversedBy: "Competence")]
    #[ORM\JoinTable(name: "OffreStage_Competence")]
    private Collection $offrestages;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getComp(): ?string
    {
        return $this->comp;
    }

    public function setComp(string $comp): self
    {
        $this->comp = $comp;

        return $this;
    }
}
