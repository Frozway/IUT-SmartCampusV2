<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AcquisitionSystemRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AcquisitionSystemRepository::class)]
#[ApiResource(
    operations: [
        New Get(
            normalizationContext: ['groups' => ['acquisitionSystem:read', 'acquisitionSystem:item:read']]
        ),
        New GetCollection(
            normalizationContext: ['groups' => ['acquisitionSystem:read', 'acquisitionSystem:all:read']]
        )
    ],
    normalizationContext: ['groups' => ['acquisitionSystem:read']]
)]
class AcquisitionSystem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 10)]
    #[Assert\Length(min: 7, max: 10)]
    #[Groups(['acquisitionSystem:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['acquisitionSystem:read'])]
    private ?bool $isInstalled = null;

    #[ORM\OneToOne(mappedBy: 'acquisitionSystem', cascade: ['persist', 'remove'])]
    private ?Room $room = null;

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

    public function isIsInstalled(): ?bool
    {
        return $this->isInstalled;
    }

    public function setIsInstalled(bool $isInstalled): static
    {
        $this->isInstalled = $isInstalled;

        return $this;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(?Room $room): static
    {
        // unset the owning side of the relation if necessary
        if ($room === null && $this->room !== null) {
            $this->room->setAcquisitionSystem(null);
        }

        // set the owning side of the relation if necessary
        if ($room !== null && $room->getAcquisitionSystem() !== $this) {
            $room->setAcquisitionSystem($this);
        }

        $this->room = $room;

        return $this;
    }

    #[Groups(['acquisitionSystem:item:read'])]
    public function getRoomDetails(): array
    {
        if ($this->room !== null) {
            return [
                'id' => $this->room->getId(),
                'name' => $this->room->getName(),
                'floor' => $this->room->getFloor(),
                'department' => $this->room->getDepartment()->getName(),     
            ];
        }
        return [];
    }

    #[Groups(['acquisitionSystem:all:read'])]
    public function getRoomName(): string
    {
        return $this->room->getName();
    }
}
