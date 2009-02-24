
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

#-----------------------------------------------------------------------------
#-- user
#-----------------------------------------------------------------------------

DROP TABLE IF EXISTS `user`;


CREATE TABLE `user`
(
	`user_id` INTEGER  NOT NULL AUTO_INCREMENT COMMENT 'Book Id',
	`userEmail` VARCHAR(255)  NOT NULL COMMENT 'User Email adress',
	`userPwd` VARCHAR(255)  NOT NULL COMMENT 'User password',
	PRIMARY KEY (`user_id`)
)Type=MyISAM COMMENT='User Table';

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;
