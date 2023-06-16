<?php

namespace App\Entity;

use App\Repository\EntrepriseRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Localite;

#[ORM\Entity(repositoryClass: EntrepriseRepository::class)]
class Entreprise
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(length: 255)]
    private ?string $name = null;
    #[ORM\Column(length: 255)]
    private ?string $activity_area = null;
    #[ORM\ManyToMany(targetEntity: Localite::class, mappedBy: "entreprises", cascade: ['remove'])]
    private Collection $localites;
    #[ORM\OneToMany(targetEntity: "App\Entity\OffreStage", mappedBy: "entreprise")]
    private Collection $offres;
    public function __construct()
    {
        $this->localites = new ArrayCollection();
        $this->offres = new ArrayCollection();
    }
    #[ORM\Column(nullable: true)]
    private ?int $nb_cesi = null;
    /**
     * @return Collection|OffreStage[]
     */
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getName(): ?string
    {
        return $this->name;
    }
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }
    public function getActivity_area(): ?string
    {
        return $this->activity_area;
    }
    public function setActivity_area(string $activity_area): self
    {
        $this->activity_area = $activity_area;
        return $this;
    }
    public function addLocalite(Localite $localite): self
    {
        if (!$this->localites->contains($localite)) {
            $this->localites[] = $localite;
            $localite->addEntreprise($this);
        }
        return $this;
    }
    public function removeLocalite(Localite $localite): self
    {
        if ($this->localites->removeElement($localite)) {
            $localite->removeEntreprise($this);
        }
        return $this;
    }
    public function getLocalites(): Collection
    {
        return $this->localites;
    }
    public function getNb_cesi(): ?int
    {
        return $this->nb_cesi;
    }
    public function setNb_cesi(?int $nb_cesi): self
    {
        $this->nb_cesi = $nb_cesi;
        return $this;
    }
    public function getOffres(): Collection
    {
        return $this->offres;
    }

    public function addOffre(OffreStage $offre): self
    {
        if (!$this->offres->contains($offre)) {
            $this->offres[] = $offre;
            $offre->setEntreprise($this);
        }

        return $this;
    }

    public function removeOffre(OffreStage $offre): self
    {
        if ($this->offres->removeElement($offre)) {
            // set the owning side to null (unless already changed)
            if ($offre->getEntreprise() === $this) {
                $offre->setEntreprise(null);
            }
        }

        return $this;
    }
}
