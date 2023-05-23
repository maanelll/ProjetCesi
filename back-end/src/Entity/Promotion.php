<?php

namespace App\Entity;

use App\Repository\PromotionRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: PromotionRepository::class)]
class Promotion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $promo = null;

    #[ORM\ManyToMany(targetEntity: OffreStage::class, inversedBy: "Promotion")]
    #[ORM\JoinTable(name: "OffreStage_Promotion")]
    private Collection $offrestages;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPromo(): ?string
    {
        return $this->promo;
    }

    public function setPromo(string $promo): self
    {
        $this->promo = $promo;

        return $this;
    }
}
