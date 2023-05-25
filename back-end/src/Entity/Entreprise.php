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
    private ?string $Nom = null;

    #[ORM\Column(length: 255)]
    private ?string $Secteur_Act = null;

    #[ORM\ManyToMany(targetEntity: Localite::class, mappedBy: "entreprises")]
    private Collection $list_localites;


    public function __construct()
    {
        $this->list_localites = new ArrayCollection();
    }


    #[ORM\Column(nullable: true)]
    private ?int $nb_stag_Cesi = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->Nom;
    }


    public function setNom(string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function getSecteurAct(): ?string
    {
        return $this->Secteur_Act;
    }

    public function setSecteurAct(string $Secteur_Act): self
    {
        $this->Secteur_Act = $Secteur_Act;

        return $this;
    }

    public function addLocalite(Localite $localite): self
    {
        if (!$this->list_localites->contains($localite)) {
            $this->list_localites[] = $localite;
            $localite->addEntreprise($this);
        }

        return $this;
    }

    public function removeLocalite(Localite $localite): self
    {
        if ($this->list_localites->removeElement($localite)) {
            $localite->getEntreprises()->removeElement($this);
        }

        return $this;
    }

    public function getLocalites(): Collection
    {
        return $this->list_localites;
    }
    public function getNbStagCesi(): ?int
    {
        return $this->nb_stag_Cesi;
    }

    public function setNbStagCesi(?int $nb_stag_Cesi): self
    {
        $this->nb_stag_Cesi = $nb_stag_Cesi;

        return $this;
    }
    public function setLocalites(Collection $localites): self
    {
        $this->list_localites = $localites;
        return $this;
    }
}
