<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230612094320 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE offre_stage ADD internship_duration SMALLINT NOT NULL, ADD nb_places_offered SMALLINT NOT NULL, DROP duree_stag, DROP nb_places_offert, CHANGE base_renum compensation_basis DOUBLE PRECISION DEFAULT NULL, CHANGE date_offre offer_date DATE NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE offre_stage ADD duree_stag SMALLINT NOT NULL, ADD nb_places_offert SMALLINT NOT NULL, DROP internship_duration, DROP nb_places_offered, CHANGE compensation_basis base_renum DOUBLE PRECISION DEFAULT NULL, CHANGE offer_date date_offre DATE NOT NULL');
    }
}
