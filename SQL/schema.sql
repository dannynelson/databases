DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `objectId` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `text` VARCHAR(160) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `roomname` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`objectId`)
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`objectId`,`username`,`text`,`createdAt`,`updatedAt`,`roomname`) VALUES
-- ('','','','','','');

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
