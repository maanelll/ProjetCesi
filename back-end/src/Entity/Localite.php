<?php

namespace App\Entity;

use App\Repository\LocaliteRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;


#[ORM\Entity(repositoryClass: LocaliteRepository::class)]
class Localite
{
    private EntityManagerInterface $entityManager;

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


    public function __construct(EntityManagerInterface $entityManager)

    {
        $this->entityManager = $entityManager;

        $this->entreprises = new ArrayCollection();
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
        if ($this->entreprises->isEmpty()) {
            // Supprime la localité de la base de données
            $this->deleteFromDatabase();
        }

        return $this;
    }
    private function deleteFromDatabase(): void
    {
        $this->entityManager->remove($this);
        $this->entityManager->flush();
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
}
