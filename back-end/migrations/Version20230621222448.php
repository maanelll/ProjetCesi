<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230621222448 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE promotion_offre_stage (promotion_id INT NOT NULL, offre_stage_id INT NOT NULL, INDEX IDX_44A8BD28139DF194 (promotion_id), INDEX IDX_44A8BD28195A2A28 (offre_stage_id), PRIMARY KEY(promotion_id, offre_stage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE promotion_offre_stage ADD CONSTRAINT FK_44A8BD28139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE promotion_offre_stage ADD CONSTRAINT FK_44A8BD28195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offre_stage DROP FOREIGN KEY FK_955674F2139DF194');
        $this->addSql('DROP INDEX IDX_955674F2139DF194 ON offre_stage');
        $this->addSql('ALTER TABLE offre_stage ADD entreprise_id INT NOT NULL, ADD localite_id INT NOT NULL, DROP promotion_id');
        $this->addSql('ALTER TABLE offre_stage ADD CONSTRAINT FK_955674F2A4AEAFEA FOREIGN KEY (entreprise_id) REFERENCES entreprise (id)');
        $this->addSql('ALTER TABLE offre_stage ADD CONSTRAINT FK_955674F2924DD2B5 FOREIGN KEY (localite_id) REFERENCES localite (id)');
        $this->addSql('CREATE INDEX IDX_955674F2A4AEAFEA ON offre_stage (entreprise_id)');
        $this->addSql('CREATE INDEX IDX_955674F2924DD2B5 ON offre_stage (localite_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE promotion_offre_stage DROP FOREIGN KEY FK_44A8BD28139DF194');
        $this->addSql('ALTER TABLE promotion_offre_stage DROP FOREIGN KEY FK_44A8BD28195A2A28');
        $this->addSql('DROP TABLE promotion_offre_stage');
        $this->addSql('ALTER TABLE offre_stage DROP FOREIGN KEY FK_955674F2A4AEAFEA');
        $this->addSql('ALTER TABLE offre_stage DROP FOREIGN KEY FK_955674F2924DD2B5');
        $this->addSql('DROP INDEX IDX_955674F2A4AEAFEA ON offre_stage');
        $this->addSql('DROP INDEX IDX_955674F2924DD2B5 ON offre_stage');
        $this->addSql('ALTER TABLE offre_stage ADD promotion_id INT DEFAULT NULL, DROP entreprise_id, DROP localite_id');
        $this->addSql('ALTER TABLE offre_stage ADD CONSTRAINT FK_955674F2139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        $this->addSql('CREATE INDEX IDX_955674F2139DF194 ON offre_stage (promotion_id)');
    }
}
