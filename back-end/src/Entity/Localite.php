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
    private ?string $name = null;

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
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
}
