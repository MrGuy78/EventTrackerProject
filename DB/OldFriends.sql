-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema oldfriendsdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `oldfriendsdb` ;

-- -----------------------------------------------------
-- Schema oldfriendsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `oldfriendsdb` DEFAULT CHARACTER SET utf8 ;
USE `oldfriendsdb` ;

-- -----------------------------------------------------
-- Table `friend`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `friend` ;

CREATE TABLE IF NOT EXISTS `friend` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `arrival_date` INT NULL,
  `depart_date` INT NULL,
  `image_url` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS FurryFriend@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'FurryFriend'@'localhost' IDENTIFIED BY 'JakeandStella';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'FurryFriend'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `friend`
-- -----------------------------------------------------
START TRANSACTION;
USE `oldfriendsdb`;
INSERT INTO `friend` (`id`, `name`, `type`, `description`, `arrival_date`, `depart_date`, `image_url`) VALUES (1, 'Kodiak', 'dog', NULL, 1986, 2000, NULL);
INSERT INTO `friend` (`id`, `name`, `type`, `description`, `arrival_date`, `depart_date`, `image_url`) VALUES (2, 'Mika', 'dog', NULL, 1997, 2011, NULL);
INSERT INTO `friend` (`id`, `name`, `type`, `description`, `arrival_date`, `depart_date`, `image_url`) VALUES (3, 'Insperado', 'horse', NULL, 1988, 2019, NULL);

COMMIT;

