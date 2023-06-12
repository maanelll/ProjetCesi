<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230609103337 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649463CD7C3');
        $this->addSql('CREATE TABLE center (id INT AUTO_INCREMENT NOT NULL, center_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP TABLE centre');
        $this->addSql('ALTER TABLE promotion DROP FOREIGN KEY FK_C11D7DD1F510AAE9');
        $this->addSql('DROP INDEX IDX_C11D7DD1F510AAE9 ON promotion');
        $this->addSql('ALTER TABLE promotion CHANGE pilote_id pilot_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD1CE55439B FOREIGN KEY (pilot_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_C11D7DD1CE55439B ON promotion (pilot_id)');
        $this->addSql('DROP INDEX IDX_8D93D649463CD7C3 ON user');
        $this->addSql('ALTER TABLE user ADD first_name VARCHAR(255) NOT NULL, ADD last_name VARCHAR(255) NOT NULL, DROP nom, DROP prenom, CHANGE centre_id center_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6495932F377 FOREIGN KEY (center_id) REFERENCES center (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6495932F377 ON user (center_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6495932F377');
        $this->addSql('CREATE TABLE centre (id INT AUTO_INCREMENT NOT NULL, nom_centre VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE center');
        $this->addSql('ALTER TABLE promotion DROP FOREIGN KEY FK_C11D7DD1CE55439B');
        $this->addSql('DROP INDEX IDX_C11D7DD1CE55439B ON promotion');
        $this->addSql('ALTER TABLE promotion CHANGE pilot_id pilote_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD1F510AAE9 FOREIGN KEY (pilote_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_C11D7DD1F510AAE9 ON promotion (pilote_id)');
        $this->addSql('DROP INDEX IDX_8D93D6495932F377 ON user');
        $this->addSql('ALTER TABLE user ADD nom VARCHAR(255) NOT NULL, ADD prenom VARCHAR(255) NOT NULL, DROP first_name, DROP last_name, CHANGE center_id centre_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649463CD7C3 FOREIGN KEY (centre_id) REFERENCES centre (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649463CD7C3 ON user (centre_id)');
    }
}
