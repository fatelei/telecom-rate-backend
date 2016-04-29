CREATE TABLE `product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) DEFAULT NULL,
  `description` VARCHAR(200) NOT NULL,
  `rate` DOUBLE DEFAULT 0.0,
  `comment_count` INT(11) DEFAULT 0,
  `purchase_count` INT(11) DEFAULT 0,
  `image_url` VARCHAR(200) DEFAULT '',
  `created_at` INT UNSIGNED DEFAULT -1,
  `updated_at` INT UNSIGNED DEFAULT -1,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT(11) NOT NULL,
  `content` VARCHAR(200) NOT NULL,
  `username` VARCHAR(200) NOT NULL,
  `created_at` INT UNSIGNED DEFAULT -1,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
