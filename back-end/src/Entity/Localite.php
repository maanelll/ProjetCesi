<?php

namespace App\Entity;

use App\Repository\LocaliteRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: LocaliteRepository::class)]
class Localite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column]
    private ?int $code_postal = null;

    #[ORM\Column(length: 255)]
    private ?string $city = null;

    #[ORM\ManyToMany(targetEntity: Entreprise::class, inversedBy: "localites")]
    #[ORM\JoinTable(name: "entreprise_localite")]
    private Collection $entreprises;

    #[ORM\OneToMany(targetEntity: "App\Entity\OffreStage", mappedBy: "Localite")]
    private Collection $offresL;

    public function __construct()
    {
        $this->entreprises = new ArrayCollection();
        $this->offresL = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEntreprises(): Collection
    {
        return $this->entreprises;
    }

    public function addEntreprise(Entreprise $entreprise): self
    {
        if (!$this->entreprises->contains($entreprise)) {
            $this->entreprises[] = $entreprise;
            $entreprise->addLocalite($this);
        }

        return $this;
    }

    public function removeEntreprise(Entreprise $entreprise): self
    {
        if ($this->entreprises->removeElement($entreprise)) {
            $entreprise->removeLocalite($this);
        }

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCpNumber(): ?string
    {
        return $this->code_postal;
    }

    public function setCpNumber(string $cpNumber): self
    {
        $this->code_postal = $cpNumber;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }
    public function getOffres(): Collection
    {
        return $this->offresL;
    }
    public function addOffre(OffreStage $offre): self
    {
        if (!$this->offresL->contains($offre)) {
            $this->offresL[] = $offre;
            $offre->setLocalite($this);
        }

        return $this;
    }

    public function removeOffre(OffreStage $offreL): self
    {
        if ($this->offresL->removeElement($offreL)) {
            // set the owning side to null (unless already changed)
            if ($offreL->getLocalite() === $this) {
                $offreL->setLocalite(null);
            }
        }

        return $this;
    }
}
