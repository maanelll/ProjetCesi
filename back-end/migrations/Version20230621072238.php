<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230621072238 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE offre_stage ADD CONSTRAINT FK_955674F2924DD2B5 FOREIGN KEY (localite_id) REFERENCES localite (id)');
        $this->addSql('CREATE INDEX IDX_955674F2924DD2B5 ON offre_stage (localite_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE offre_stage DROP FOREIGN KEY FK_955674F2924DD2B5');
        $this->addSql('DROP INDEX IDX_955674F2924DD2B5 ON offre_stage');
    }
}
