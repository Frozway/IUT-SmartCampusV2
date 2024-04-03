<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TipRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TipRepository::class)]
#[ApiResource(
    operations: [
    ],
)
]
class Tip
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $text = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?bool $isApplied = null;

    #[ORM\ManyToOne(inversedBy: 'tips')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Room $room = null;

    public function __construct(string $text, \DateTimeInterface $date, bool $isApplied, Room $room)
    {
        $this->text = $text;
        $this->date = $date;
        $this->isApplied = $isApplied;
        $this->room = $room;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function isIsApplied(): ?bool
    {
        return $this->isApplied;
    }

    public function setIsApplied(bool $isApplied): static
    {
        $this->isApplied = $isApplied;

        return $this;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(?Room $room): static
    {
        $this->room = $room;

        return $this;
    }
}
