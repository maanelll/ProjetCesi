<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230615180228 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE entreprise ADD name VARCHAR(255) NOT NULL, ADD activity_area VARCHAR(255) NOT NULL, DROP nom, DROP secteur_act, CHANGE nb_stag_cesi nb_cesi INT DEFAULT NULL');
        $this->addSql('ALTER TABLE localite ADD code_postal INT NOT NULL, ADD city VARCHAR(255) NOT NULL, CHANGE name address VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE offre_stage DROP FOREIGN KEY FK_955674F2139DF194');
        $this->addSql('DROP INDEX IDX_955674F2139DF194 ON offre_stage');
        $this->addSql('ALTER TABLE offre_stage DROP promotion_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE entreprise ADD nom VARCHAR(255) NOT NULL, ADD secteur_act VARCHAR(255) NOT NULL, DROP name, DROP activity_area, CHANGE nb_cesi nb_stag_cesi INT DEFAULT NULL');
        $this->addSql('ALTER TABLE localite ADD name VARCHAR(255) NOT NULL, DROP address, DROP code_postal, DROP city');
        $this->addSql('ALTER TABLE offre_stage ADD promotion_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE offre_stage ADD CONSTRAINT FK_955674F2139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        $this->addSql('CREATE INDEX IDX_955674F2139DF194 ON offre_stage (promotion_id)');
    }
}
