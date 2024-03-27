<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RoomRepository;
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
}
