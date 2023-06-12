<?php

namespace App\Entity;

use App\Repository\PromotionRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: PromotionRepository::class)]
class Promotion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

     #[ORM\Column(length: 255)]
    private ?string $promo = null;

    #[ORM\OneToMany(mappedBy: 'promotion',targetEntity : User::class)]
    private Collection $students;
    

    #[ORM\ManyToOne(inversedBy:'managedPromotions',targetEntity: User::class)]
    #[ORM\JoinColumn(name:"pilot_id", referencedColumnName:"id", nullable: true)]
    private ?User $pilot = null;

    public function __construct()
    {
        $this->students = new ArrayCollection();
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

    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(User $student): self
    {
        if (!$this->students->contains($student)) {
            $this->students[] = $student;
            $student->setPromotion($this);
        }
        return $this;
    }

    public function removeStudent(User $student): self
    {
        if ($this->students->removeElement($student)) {
            if ($student->getPromotion() === $this) {
                $student->setPromotion(null);
            }
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
