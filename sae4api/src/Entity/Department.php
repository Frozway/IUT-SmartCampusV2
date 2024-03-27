<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\DepartmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DepartmentRepository::class)]
#[ApiResource(
    operations: [
        New Get(
            normalizationContext: ['groups' => ['department:read', 'department:item:read']]
        ),
        New GetCollection(
            normalizationContext: ['groups' => ['department:read', 'department:all:read']]
        )
    ],
    normalizationContext: ['groups' => ['department:read']]
)]
class Department
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['department:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['department:read'])]
    private ?int $nbrooms = null;

    #[ORM\OneToMany(targetEntity: Room::class, mappedBy: 'department')]
    private Collection $rooms;

    public function __construct()
    {
        $this->rooms = new ArrayCollection();
    }

    #[Groups(['department:read'])]
    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(['department:read'])]
    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Room>
     */
    public function getRooms(): Collection
    {
        return $this->rooms;
    }

    #[Groups(['department:item:read'])]
    public function getRoomsDetails(): array
    {
        return $this->rooms->map(function ($room) {
            return [
                'id' => $room->getId(),
                'name' => $room->getName(),
                'floor' => $room->getFloor(),
                'acquisitionSystem' => $room->getAcquisitionSystem()->getName() ?? 'No acquisition system installed',
            ];
        })->toArray();
    }

    #[Groups(['department:all:read'])]
    public function getRoomsNames(): array
    {
        return $this->rooms->map(function ($room) {
            return $room->getName();
        })->toArray();
    }

    public function addRoom(Room $room): static
    {
        if (!$this->rooms->contains($room)) {
            $this->rooms->add($room);
            $room->setDepartment($this);
            $this->updateNbrooms();
        }

        return $this;
    }

    public function removeRoom(Room $room): static
    {
        if ($this->rooms->removeElement($room)) {
            // set the owning side to null (unless already changed)
            if ($room->getDepartment() === $this) {
                $room->setDepartment(null);
            }

            $this->updateNbrooms();
        }

        return $this;
    }

    public function getNbrooms(): ?int
    {
        $this->updateNbrooms();
        return $this->nbrooms;
    }

    public function setNbrooms(int $nbrooms): static
    {
        $this->nbrooms = $nbrooms;

        return $this;
    }

    public function updateNbrooms(): void
    {
        $this->nbrooms = $this->rooms->count();
    }
    
}
