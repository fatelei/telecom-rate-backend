CREATE TABLE IF NOT EXISTS product (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) DEFAULT NULL,
  `description` VARCHAR(200) NOT NULL,
  `rate` DOUBLE DEFAULT 0.0,
  `comment_count` INT(11) DEFAULT 0,
  `purchase_count` INT(11) DEFAULT 0,
  `image_url` VARCHAR(200) DEFAULT '',
  `created_at` INT UNSIGNED DEFAULT 0,
  `updated_at` INT UNSIGNED DEFAULT 0,
  `type` TINYINT DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS comment (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT(11) NOT NULL,
  `content` VARCHAR(200) NOT NULL,
  `username` VARCHAR(200) NOT NULL,
  `created_at` INT UNSIGNED DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS product_rate (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT(11) NOT NULL,
  `rate_total` DOUBLE DEFAULT 0.0,
  `rate_count` INT(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;