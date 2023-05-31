<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230530123342 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE offrestage_promotion DROP FOREIGN KEY FK_8534984F139DF194');
        $this->addSql('ALTER TABLE offrestage_promotion DROP FOREIGN KEY FK_8534984F195A2A28');
        $this->addSql('DROP TABLE offrestage_promotion');
        $this->addSql('DROP TABLE test');
        $this->addSql('ALTER TABLE offre_stage ADD promotion_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE offre_stage ADD CONSTRAINT FK_955674F2139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        $this->addSql('CREATE INDEX IDX_955674F2139DF194 ON offre_stage (promotion_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE offrestage_promotion (promotion_id INT NOT NULL, offre_stage_id INT NOT NULL, INDEX IDX_8534984F139DF194 (promotion_id), INDEX IDX_8534984F195A2A28 (offre_stage_id), PRIMARY KEY(promotion_id, offre_stage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE test (id INT AUTO_INCREMENT NOT NULL, test1 VARCHAR(222) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE offrestage_promotion ADD CONSTRAINT FK_8534984F139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offrestage_promotion ADD CONSTRAINT FK_8534984F195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offre_stage DROP FOREIGN KEY FK_955674F2139DF194');
        $this->addSql('DROP INDEX IDX_955674F2139DF194 ON offre_stage');
        $this->addSql('ALTER TABLE offre_stage DROP promotion_id');
    }
}
