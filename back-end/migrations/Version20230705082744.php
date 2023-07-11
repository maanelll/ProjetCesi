<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230705082744 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE application (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, offre_stage_id INT DEFAULT NULL, cv VARCHAR(255) NOT NULL, motivation_letter VARCHAR(255) NOT NULL, status VARCHAR(255) DEFAULT NULL, submission_date DATETIME DEFAULT NULL, INDEX IDX_A45BDDC1A76ED395 (user_id), INDEX IDX_A45BDDC1195A2A28 (offre_stage_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE application ADD CONSTRAINT FK_A45BDDC1A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE application ADD CONSTRAINT FK_A45BDDC1195A2A28 FOREIGN KEY (offre_stage_id) REFERENCES offre_stage (id)');
        $this->addSql('ALTER TABLE promotion DROP FOREIGN KEY FK_C11D7DD1CE55439B');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD1CE55439BCE55439B FOREIGN KEY (pilot_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE wish_list DROP FOREIGN KEY FK_5B8739BDA76ED395');
        $this->addSql('ALTER TABLE wish_list ADD CONSTRAINT FK_5B8739BDA76ED395A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE application DROP FOREIGN KEY FK_A45BDDC1A76ED395');
        $this->addSql('ALTER TABLE application DROP FOREIGN KEY FK_A45BDDC1195A2A28');
        $this->addSql('DROP TABLE application');
        $this->addSql('ALTER TABLE promotion DROP FOREIGN KEY FK_C11D7DD1CE55439BCE55439B');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD1CE55439B FOREIGN KEY (pilot_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE wish_list DROP FOREIGN KEY FK_5B8739BDA76ED395A76ED395');
        $this->addSql('ALTER TABLE wish_list ADD CONSTRAINT FK_5B8739BDA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }
}
