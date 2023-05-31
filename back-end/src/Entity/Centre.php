<?php

namespace App\Entity;

use App\Repository\CentreRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: CentreRepository::class)]
class Centre
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nomCentre = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomCentre(): ?string
    {
        return $this->nomCentre;
    }
    #[ORM\OneToMany(mappedBy: 'centre', targetEntity: User::class)]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }
    public function setNomCentre(string $nomCentre): self
    {
        $this->nomCentre = $nomCentre;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setCentre($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getCentre() === $this) {
                $user->setCentre(null);
            }
        }

        return $this;
    }
}
