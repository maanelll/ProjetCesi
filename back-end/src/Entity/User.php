<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

  #[ORM\ManyToOne(targetEntity: Role::class, inversedBy: "users")]
  #[ORM\JoinColumn(name: "role_id", referencedColumnName: "id", nullable: false)]
  private $role;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    private ?string $lastName = null;

    #[ORM\ManyToOne(targetEntity: Promotion::class, inversedBy: "students")]
    #[ORM\JoinColumn(name: "promotion_id", referencedColumnName: "id", nullable: true)]
    private ?Promotion $promotion = null;

    #[ORM\ManyToOne(targetEntity: Center::class, inversedBy: "students")]
    #[ORM\JoinColumn(name: "center_id", referencedColumnName: "id", nullable: true)]
    private ?Center $center = null;

    #[ORM\OneToMany(targetEntity: Promotion::class, mappedBy: "pilot")]
    private Collection $managedPromotions;

    public function __construct()
    {
        $this->managedPromotions = new ArrayCollection();
         $this->wishLists = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

   public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): self
    {
        $this->role = $role;

        return $this;
    }

   public function getRoles(): array
{
    return [$this->role->getName()];
}

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName= $firstName;

        return $this;
    }
     public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName= $lastName;

        return $this;
    }

    public function getPromotion(): ?Promotion
    {
        return $this->promotion;
    }

    public function setPromotion(?Promotion $promotion): self
    {
        $this->promotion = $promotion;

        return $this;
    }

        public function getCenter(): ?Center
    {
        return $this->center;
    }

    public function setCenter(?Center $center): self
    {
        $this->center = $center;

        return $this;
    }

    /**
     * @return Collection<int, Promotion>
     */
    public function getManagedPromotions(): Collection
    {
        return $this->managedPromotions;
    }

    public function addManagedPromotion(Promotion $managedPromotion): self
    {
        if (!$this->managedPromotions->contains($managedPromotion)) {
            $this->managedPromotions->add($managedPromotion);
            $managedPromotion->setPilot($this);
        }

        return $this;
    }

    public function removeManagedPromotion(Promotion $managedPromotion): self
    {
        if ($this->managedPromotions->removeElement($managedPromotion)) {
            if ($managedPromotion->getPilot() === $this) {
                $managedPromotion->setPilot(null);
            }
        }

        return $this;
    }


       /**
     * @ORM\OneToMany(targetEntity=WishList::class, mappedBy="user", orphanRemoval=true)
     */
    private $wishLists;

   /**
 * @return Collection<int, WishList>
 */
public function getWishLists(): Collection
{
    if ($this->wishLists === null) {
        $this->wishLists = new ArrayCollection();
    }
    return $this->wishLists;
}

    public function addWishList(WishList $wishList): self
    {
        if (!$this->wishLists->contains($wishList)) {
            $this->wishLists[] = $wishList;
            $wishList->setUser($this);
        }

        return $this;
    }

    public function removeWishList(WishList $wishList): self
    {
        if ($this->wishLists->removeElement($wishList)) {
            // set the owning side to null (unless already changed)
            if ($wishList->getUser() === $this) {
                $wishList->setUser(null);
            }
        }

        return $this;
    }
}
