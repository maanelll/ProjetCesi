<?php

namespace App\Entity;

use App\Repository\PromotionRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\OffreStage;


#[ORM\Entity(repositoryClass: PromotionRepository::class)]
class Promotion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $promo = null;

    #[ORM\ManyToMany(targetEntity: OffreStage::class, inversedBy: "promotions")]
    private Collection $offreStages;

    #[ORM\ManyToOne(inversedBy: 'managedPromotions', targetEntity: User::class)]
    #[ORM\JoinColumn(name: "pilot_id", referencedColumnName: "id", nullable: true)]
    #[ORM\JoinColumn(nullable: true, onDelete: "SET NULL")]
    private ?User $pilot = null;

    public function __construct()
    {
        $this->offreStages = new ArrayCollection();
    }

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

    /**
     * @return Collection|OffreStage[]
     */
    public function getOffreStages(): Collection
    {
        return $this->offreStages;
    }

    public function addOffreStage(OffreStage $offreStage): self
    {
        if (!$this->offreStages->contains($offreStage)) {
            $this->offreStages[] = $offreStage;
            $offreStage->addPromotion($this);
        }

        return $this;
    }

    public function removeOffreStage(OffreStage $offreStage): self
    {
        if ($this->offreStages->removeElement($offreStage)) {
            $offreStage->removePromotion($this);
        }

        return $this;
    }

    public function getPilot(): ?User
    {
        return $this->pilot;
    }

    public function setPilot(?User $pilot): self
    {
        $this->pilot = $pilot;
        return $this;
    }
}
