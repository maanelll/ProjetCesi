<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230621135709 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE center (id INT AUTO_INCREMENT NOT NULL, center_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE competence (id INT AUTO_INCREMENT NOT NULL, comp VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE OffreStage_Competence (competence_id INT NOT NULL, offre_stage_id INT NOT NULL, INDEX IDX_8327FFD915761DAB (competence_id), INDEX IDX_8327FFD9195A2A28 (offre_stage_id), PRIMARY KEY(competence_id, offre_stage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE entreprise (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, activity_area VARCHAR(255) NOT NULL, nb_cesi INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE localite (id INT AUTO_INCREMENT NOT NULL, address VARCHAR(255) NOT NULL, code_postal INT NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE entreprise_localite (localite_id INT NOT NULL, entreprise_id INT NOT NULL, INDEX IDX_A707E22C924DD2B5 (localite_id), INDEX IDX_A707E22CA4AEAFEA (entreprise_id), PRIMARY KEY(localite_id, entreprise_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offre_stage (id INT AUTO_INCREMENT NOT NULL, internship_duration SMALLINT NOT NULL, compensation_basis DOUBLE PRECISION DEFAULT NULL, offer_date DATE NOT NULL, nb_places_offered SMALLINT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE promotion (id INT AUTO_INCREMENT NOT NULL, pilot_id INT DEFAULT NULL, promo VARCHAR(255) NOT NULL, INDEX IDX_C11D7DD1CE55439B (pilot_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE promotion_offre_stage (promotion_id INT NOT NULL, offre_stage_id INT NOT NULL, INDEX IDX_44A8BD28139DF194 (promotion_id), INDEX IDX_44A8BD28195A2A28 (offre_stage_id), PRIMARY KEY(promotion_id, offre_stage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, role_id INT NOT NULL, promotion_id INT DEFAULT NULL, center_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D649D60322AC (role_id), INDEX IDX_8D93D649139DF194 (promotion_id), INDEX IDX_8D93D6495932F377 (center_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE OffreStage_Competence ADD CONSTRAINT FK_8327FFD915761DAB FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE OffreStage_Competence ADD CONSTRAINT FK_8327FFD9195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE entreprise_localite ADD CONSTRAINT FK_A707E22C924DD2B5 FOREIGN KEY (localite_id) REFERENCES localite (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE entreprise_localite ADD CONSTRAINT FK_A707E22CA4AEAFEA FOREIGN KEY (entreprise_id) REFERENCES entreprise (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD1CE55439B FOREIGN KEY (pilot_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE promotion_offre_stage ADD CONSTRAINT FK_44A8BD28139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE promotion_offre_stage ADD CONSTRAINT FK_44A8BD28195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6495932F377 FOREIGN KEY (center_id) REFERENCES center (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE OffreStage_Competence DROP FOREIGN KEY FK_8327FFD915761DAB');
        $this->addSql('ALTER TABLE OffreStage_Competence DROP FOREIGN KEY FK_8327FFD9195A2A28');
        $this->addSql('ALTER TABLE entreprise_localite DROP FOREIGN KEY FK_A707E22C924DD2B5');
        $this->addSql('ALTER TABLE entreprise_localite DROP FOREIGN KEY FK_A707E22CA4AEAFEA');
        $this->addSql('ALTER TABLE promotion DROP FOREIGN KEY FK_C11D7DD1CE55439B');
        $this->addSql('ALTER TABLE promotion_offre_stage DROP FOREIGN KEY FK_44A8BD28139DF194');
        $this->addSql('ALTER TABLE promotion_offre_stage DROP FOREIGN KEY FK_44A8BD28195A2A28');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D60322AC');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649139DF194');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6495932F377');
        $this->addSql('DROP TABLE center');
        $this->addSql('DROP TABLE competence');
        $this->addSql('DROP TABLE OffreStage_Competence');
        $this->addSql('DROP TABLE entreprise');
        $this->addSql('DROP TABLE localite');
        $this->addSql('DROP TABLE entreprise_localite');
        $this->addSql('DROP TABLE offre_stage');
        $this->addSql('DROP TABLE promotion');
        $this->addSql('DROP TABLE promotion_offre_stage');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE user');
    }
}
