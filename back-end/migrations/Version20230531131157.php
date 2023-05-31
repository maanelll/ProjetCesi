<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230531131157 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE centre (id INT AUTO_INCREMENT NOT NULL, nom_centre VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE offrestage_promotion DROP FOREIGN KEY FK_8534984F139DF194');
        $this->addSql('ALTER TABLE offrestage_promotion DROP FOREIGN KEY FK_8534984F195A2A28');
        $this->addSql('DROP TABLE offrestage_promotion');
        $this->addSql('DROP TABLE test');
        $this->addSql('ALTER TABLE offre_stage ADD promotion_id INT DEFAULT NULL, ADD name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE offre_stage ADD CONSTRAINT FK_955674F2139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        $this->addSql('CREATE INDEX IDX_955674F2139DF194 ON offre_stage (promotion_id)');
        $this->addSql('ALTER TABLE promotion ADD pilote_id INT DEFAULT NULL, CHANGE promo promo VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD1F510AAE9 FOREIGN KEY (pilote_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_C11D7DD1F510AAE9 ON promotion (pilote_id)');
        $this->addSql('ALTER TABLE user ADD promotion_id INT DEFAULT NULL, ADD centre_id INT DEFAULT NULL, ADD prenom VARCHAR(255) NOT NULL, CHANGE username nom VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649463CD7C3 FOREIGN KEY (centre_id) REFERENCES centre (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649139DF194 ON user (promotion_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649463CD7C3 ON user (centre_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649463CD7C3');
        $this->addSql('CREATE TABLE offrestage_promotion (promotion_id INT NOT NULL, offre_stage_id INT NOT NULL, INDEX IDX_8534984F139DF194 (promotion_id), INDEX IDX_8534984F195A2A28 (offre_stage_id), PRIMARY KEY(promotion_id, offre_stage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE test (id INT AUTO_INCREMENT NOT NULL, test1 VARCHAR(222) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE offrestage_promotion ADD CONSTRAINT FK_8534984F139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offrestage_promotion ADD CONSTRAINT FK_8534984F195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE centre');
        $this->addSql('ALTER TABLE offre_stage DROP FOREIGN KEY FK_955674F2139DF194');
        $this->addSql('DROP INDEX IDX_955674F2139DF194 ON offre_stage');
        $this->addSql('ALTER TABLE offre_stage DROP promotion_id, DROP name');
        $this->addSql('ALTER TABLE promotion DROP FOREIGN KEY FK_C11D7DD1F510AAE9');
        $this->addSql('DROP INDEX IDX_C11D7DD1F510AAE9 ON promotion');
        $this->addSql('ALTER TABLE promotion DROP pilote_id, CHANGE promo promo VARCHAR(100) NOT NULL');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649139DF194');
        $this->addSql('DROP INDEX IDX_8D93D649139DF194 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649463CD7C3 ON user');
        $this->addSql('ALTER TABLE user ADD username VARCHAR(255) NOT NULL, DROP promotion_id, DROP centre_id, DROP nom, DROP prenom');
    }
}
