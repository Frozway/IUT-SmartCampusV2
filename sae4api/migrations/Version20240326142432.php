<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240326142432 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE acquisition_system (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(10) NOT NULL, is_installed TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE department (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE room (id INT AUTO_INCREMENT NOT NULL, acquisition_system_id INT DEFAULT NULL, department_id INT NOT NULL, name VARCHAR(15) NOT NULL, floor INT NOT NULL, UNIQUE INDEX UNIQ_729F519B331785FF (acquisition_system_id), INDEX IDX_729F519BAE80F5DF (department_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE room ADD CONSTRAINT FK_729F519B331785FF FOREIGN KEY (acquisition_system_id) REFERENCES acquisition_system (id)');
        $this->addSql('ALTER TABLE room ADD CONSTRAINT FK_729F519BAE80F5DF FOREIGN KEY (department_id) REFERENCES department (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE room DROP FOREIGN KEY FK_729F519B331785FF');
        $this->addSql('ALTER TABLE room DROP FOREIGN KEY FK_729F519BAE80F5DF');
        $this->addSql('DROP TABLE acquisition_system');
        $this->addSql('DROP TABLE department');
        $this->addSql('DROP TABLE room');
    }
}
