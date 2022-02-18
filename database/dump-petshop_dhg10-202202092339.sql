-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: petshop_dhg10
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

DROP DATABASE IF EXISTS petshop_dhg10;
CREATE DATABASE petshop_dhg10;
USE petshop_dhg10;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `po_cart_headers`
--

DROP TABLE IF EXISTS `po_cart_headers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `po_cart_headers` (
  `po_header_id` int(11) NOT NULL AUTO_INCREMENT,
  `po_number` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` double NOT NULL,
  `total_products` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_update_by` int(11) NOT NULL,
  PRIMARY KEY (`po_header_id`),
  KEY `PO_CART_HEADERS_FK` (`user_id`),
  CONSTRAINT `PO_CART_HEADERS_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `po_cart_headers`
--

LOCK TABLES `po_cart_headers` WRITE;
/*!40000 ALTER TABLE `po_cart_headers` DISABLE KEYS */;
/*!40000 ALTER TABLE `po_cart_headers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `po_cart_lines`
--

DROP TABLE IF EXISTS `po_cart_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `po_cart_lines` (
  `po_line_id` int(11) NOT NULL AUTO_INCREMENT,
  `po_header_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` double NOT NULL DEFAULT 0,
  `amount_line` double NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_update_by` int(11) NOT NULL,
  PRIMARY KEY (`po_line_id`),
  KEY `PO_CART_LINES_FK` (`po_header_id`),
  KEY `PO_CART_LINES_FK_1` (`product_id`),
  CONSTRAINT `PO_CART_LINES_FK` FOREIGN KEY (`po_header_id`) REFERENCES `po_cart_headers` (`po_header_id`),
  CONSTRAINT `PO_CART_LINES_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `po_cart_lines`
--

LOCK TABLES `po_cart_lines` WRITE;
/*!40000 ALTER TABLE `po_cart_lines` DISABLE KEYS */;
/*!40000 ALTER TABLE `po_cart_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `product_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_update_by` int(11) NOT NULL,
  PRIMARY KEY (`product_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `prodcut_name` varchar(100) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `product_category_id` int(11) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `uom_code` varchar(50) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_update_by` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `PRODUCTS_product_id_IDX` (`product_id`) USING BTREE,
  KEY `products_FK` (`product_category_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`product_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_category`
--

DROP TABLE IF EXISTS `user_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_category` (
  `user_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_update_by` int(11) NOT NULL,
  PRIMARY KEY (`user_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_category`
--

LOCK TABLES `user_category` WRITE;
/*!40000 ALTER TABLE `user_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `user_category_id` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_update_by` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `users_FK` (`user_category_id`),
  CONSTRAINT `users_FK` FOREIGN KEY (`user_category_id`) REFERENCES `user_category` (`user_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'petshop_dhg10'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-09 23:39:04
