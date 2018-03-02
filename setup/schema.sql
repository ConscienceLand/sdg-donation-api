DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `meta` varchar(255) DEFAULT NULL,
  `currency` varchar(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `assigned_in` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_address_assignement_idx` (`assigned_in`),
  CONSTRAINT `fk_address_assignement` FOREIGN KEY (`assigned_in`) REFERENCES `address_assignment` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `address_assignment`;
CREATE TABLE `address_assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address_id` int(11) NOT NULL,
  `user_id` varchar(30) NOT NULL,
  `project` varchar(45) NOT NULL,
  `start` int(11) NOT NULL,
  `end` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_address_assignment_user_idx` (`user_id`),
  KEY `fk_address_assignment_address_idx` (`address_id`),
  KEY `fk_address_assignment_project_idx` (`project`),
  CONSTRAINT `fk_address_assignment_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_address_assignment_project` FOREIGN KEY (`project`) REFERENCES `project` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_address_assignment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `deposit`;
CREATE TABLE `deposit` (
  `id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `user` varchar(30) DEFAULT NULL,
  `project` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `meta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_deposit_user_idx` (`user`),
  KEY `idx_tx_identifier` (`meta`,`currency`),
  KEY `fk_deposit_project_idx` (`project`),
  KEY `fk_deposit_address_assignment_idx` (`assignment_id`),
  CONSTRAINT `fk_deposit_address_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `address_assignment` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_deposit_project` FOREIGN KEY (`project`) REFERENCES `project` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_deposit_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `project_currency`;
CREATE TABLE `project_currency` (
  `project` varchar(45) NOT NULL,
  `currency` varchar(5) NOT NULL,
  PRIMARY KEY (`project`,`currency`),
  CONSTRAINT `fk_project_currency_project` FOREIGN KEY (`project`) REFERENCES `project` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(30) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `language` varchar(4) NOT NULL DEFAULT 'en',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
