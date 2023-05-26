<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230525075803 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE competence (id INT AUTO_INCREMENT NOT NULL, comp VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE OffreStage_Competence (competence_id INT NOT NULL, offre_stage_id INT NOT NULL, INDEX IDX_8327FFD915761DAB (competence_id), INDEX IDX_8327FFD9195A2A28 (offre_stage_id), PRIMARY KEY(competence_id, offre_stage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offre_stage (id INT AUTO_INCREMENT NOT NULL, duree_stag SMALLINT NOT NULL, base_renum DOUBLE PRECISION DEFAULT NULL, date_offre DATE NOT NULL, nb_places_offert SMALLINT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE promotion (id INT AUTO_INCREMENT NOT NULL, promo VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE OffreStage_Promotion (promotion_id INT NOT NULL, offre_stage_id INT NOT NULL, INDEX IDX_8534984F139DF194 (promotion_id), INDEX IDX_8534984F195A2A28 (offre_stage_id), PRIMARY KEY(promotion_id, offre_stage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE OffreStage_Competence ADD CONSTRAINT FK_8327FFD915761DAB FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE OffreStage_Competence ADD CONSTRAINT FK_8327FFD9195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE OffreStage_Promotion ADD CONSTRAINT FK_8534984F139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE OffreStage_Promotion ADD CONSTRAINT FK_8534984F195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE test');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE test (id INT AUTO_INCREMENT NOT NULL, test1 VARCHAR(222) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE OffreStage_Competence DROP FOREIGN KEY FK_8327FFD915761DAB');
        $this->addSql('ALTER TABLE OffreStage_Competence DROP FOREIGN KEY FK_8327FFD9195A2A28');
        $this->addSql('ALTER TABLE OffreStage_Promotion DROP FOREIGN KEY FK_8534984F139DF194');
        $this->addSql('ALTER TABLE OffreStage_Promotion DROP FOREIGN KEY FK_8534984F195A2A28');
        $this->addSql('DROP TABLE competence');
        $this->addSql('DROP TABLE OffreStage_Competence');
        $this->addSql('DROP TABLE offre_stage');
        $this->addSql('DROP TABLE promotion');
        $this->addSql('DROP TABLE OffreStage_Promotion');
    }
}
