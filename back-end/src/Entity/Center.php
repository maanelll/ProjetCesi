<?php

namespace App\Entity;

use App\Repository\CenterRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: CenterRepository::class)]
class Center
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $centerName = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getcenterName(): ?string
    {
        return $this->centerName;
    }
    #[ORM\OneToMany(mappedBy: 'center', targetEntity: User::class)]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }
    public function setcenterName(string $centerName): self
    {
        $this->centerName = $centerName;

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
            $user->setCenter($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getCenter() === $this) {
                $user->setCenter(null);
            }
        }

        return $this;
    }
}
