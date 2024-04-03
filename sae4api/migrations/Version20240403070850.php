<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240403070850 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE tip (id INT AUTO_INCREMENT NOT NULL, room_id INT NOT NULL, text LONGTEXT NOT NULL, date DATE NOT NULL, is_applied TINYINT(1) NOT NULL, INDEX IDX_4883B84C54177093 (room_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE tip ADD CONSTRAINT FK_4883B84C54177093 FOREIGN KEY (room_id) REFERENCES room (id)');
        $this->addSql('ALTER TABLE room DROP tips');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tip DROP FOREIGN KEY FK_4883B84C54177093');
        $this->addSql('DROP TABLE tip');
        $this->addSql('ALTER TABLE room ADD tips JSON DEFAULT NULL COMMENT \'(DC2Type:json)\'');
    }
}
