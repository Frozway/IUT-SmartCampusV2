<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
#[ApiResource(
    operations:[
        New Get(),
        New GetCollection()
    ],
        normalizationContext: ['groups' => ['room:read']],
)]
class Room
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['room:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 15)]
    #[Groups(['room:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['room:read'])]
    private ?int $floor = null;

    #[ORM\OneToOne(inversedBy: 'room', cascade: ['persist', 'remove'])]
    #[Groups(['room:read'])]
    private ?AcquisitionSystem $acquisitionSystem = null;

    #[ORM\ManyToOne(inversedBy: 'rooms')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['room:read'])]
    private ?Department $department = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['room:read'])]
    private ?string $dbname = null;

    #[ORM\OneToMany(targetEntity: Tip::class, mappedBy: 'room', orphanRemoval: true)]
    private Collection $tips;

    public function __construct()
    {
        $this->tips = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getFloor(): ?int
    {
        return $this->floor;
    }

    public function setFloor(int $floor): static
    {
        $this->floor = $floor;

        return $this;
    }

    public function getAcquisitionSystem(): ?AcquisitionSystem
    {
        return $this->acquisitionSystem;
    }

    public function setAcquisitionSystem(?AcquisitionSystem $acquisitionSystem): static
    {
        $this->acquisitionSystem = $acquisitionSystem;

        return $this;
    }

    public function getDepartment(): ?Department
    {
        return $this->department;
    }

    public function setDepartment(?Department $department): static
    {
        $this->department = $department;

        return $this;
    }

    public function getDbname(): ?string
    {
        return $this->dbname;
    }

    public function setDbname(string $dbname): static
    {
        $this->dbname = $dbname;

        return $this;
    }

    /**
     * @return Collection<int, Tip>
     */
    public function getTips(): Collection
    {
        return $this->tips;
    }

    public function addTip(Tip $tip): static
    {
        if (!$this->tips->contains($tip)) {
            $this->tips->add($tip);
            $tip->setRoom($this);
        }

        return $this;
    }

    public function removeTip(Tip $tip): static
    {
        if ($this->tips->removeElement($tip)) {
            // set the owning side to null (unless already changed)
            if ($tip->getRoom() === $this) {
                $tip->setRoom(null);
            }
        }

        return $this;
    }
}
