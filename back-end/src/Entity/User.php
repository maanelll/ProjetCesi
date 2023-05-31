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

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\ManyToOne(targetEntity: Promotion::class, inversedBy: "students")]
    #[ORM\JoinColumn(name: "promotion_id", referencedColumnName: "id", nullable: true)]
    private ?Promotion $promotion = null;

    #[ORM\ManyToOne(targetEntity: Centre::class, inversedBy: "students")]
    #[ORM\JoinColumn(name: "centre_id", referencedColumnName: "id", nullable: true)]
    private ?Centre $centre = null;

    #[ORM\OneToMany(targetEntity: Promotion::class, mappedBy: "pilote")]
    private Collection $managedPromotions;

    public function __construct()
    {
        $this->managedPromotions = new ArrayCollection();
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

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        
       return $this->roles;
     }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
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

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }
     public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

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

        public function getCentre(): ?Centre
    {
        return $this->centre;
    }

    public function setCentre(?Centre $centre): self
    {
        $this->centre = $centre;

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
            $managedPromotion->setPilote($this);
        }

        return $this;
    }

    public function removeManagedPromotion(Promotion $managedPromotion): self
    {
        if ($this->managedPromotions->removeElement($managedPromotion)) {
            if ($managedPromotion->getPilote() === $this) {
                $managedPromotion->setPilote(null);
            }
        }

        return $this;
    }
}
