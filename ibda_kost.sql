-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 04, 2024 at 04:31 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ibda_kost`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
CREATE TABLE IF NOT EXISTS `booking` (
  `booking_id` varchar(10) NOT NULL,
  `room_id` varchar(10) DEFAULT NULL,
  `outlet_id` varchar(10) DEFAULT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  `stay_duration` int DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `last_payment` date DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `room_id` (`room_id`),
  KEY `outlet_id` (`outlet_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `room_id`, `outlet_id`, `user_id`, `check_in_date`, `stay_duration`, `accepted`, `last_payment`) VALUES
('B095B812', 'RAE4C10F', 'O7B1D9E8', 'U9BDE233', '2024-12-05', 12, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE IF NOT EXISTS `maintenance` (
  `maintenance_id` varchar(10) NOT NULL,
  `outlet_id` varchar(10) DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `issue` varchar(255) DEFAULT NULL,
  `date_reported` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `resolution_date` date DEFAULT NULL,
  PRIMARY KEY (`maintenance_id`),
  KEY `outlet_id` (`outlet_id`),
  KEY `room_number` (`room_number`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `maintenance`
--

INSERT INTO `maintenance` (`maintenance_id`, `outlet_id`, `room_number`, `user_id`, `issue`, `date_reported`, `status`, `resolution_date`) VALUES
('M330B44B', NULL, NULL, 'U49BA380', 'Bangunan dinuklir', '2024-12-04', 'sent', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

DROP TABLE IF EXISTS `outlet`;
CREATE TABLE IF NOT EXISTS `outlet` (
  `outlet_id` varchar(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `spv_id` varchar(10) DEFAULT NULL,
  `motorcycle_slot` int DEFAULT NULL,
  `car_slot` int DEFAULT NULL,
  PRIMARY KEY (`outlet_id`),
  KEY `spv_id` (`spv_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `outlet`
--

INSERT INTO `outlet` (`outlet_id`, `name`, `address`, `city`, `phone`, `photo`, `spv_id`, `motorcycle_slot`, `car_slot`) VALUES
('O7B1D9E8', 'Kost Kota Jakarta', 'Jl. Mangga Dua Raya Blok A No. 1, RT 01 RW 02, Jakarta Pusat', 'Jakarta', '021-1234567', NULL, 'UAA186DB', 10, 5),
('O24E28AF', 'Kost Mega City', 'Jl. Sudirman Kav. 50, Blok B No. 10, RT 05 RW 08, Jakarta Selatan', 'Jakarta', '021-2345678', NULL, 'UC4B7D2C', 15, 8),
('OF4B26AA', 'Kost Gading Indah', 'Jl. Gading No. 11, Blok C No. 25, RT 02 RW 04, Jakarta Utara', 'Jakarta', '021-8765432', NULL, 'UE8B7799', 12, 6),
('OCD9A7E5', 'Kost Pusat Jakarta', 'Jl. Thamrin No. 45, Blok D No. 12, RT 03 RW 01, Jakarta Pusat', 'Jakarta', '021-9876543', NULL, 'U6C10BF7', 10, 5),
('O7E0CAEF', 'Kost Bogor Indah', 'Jl. Raya Bogor No. 25, Blok G No. 30, RT 01 RW 02, Bogor', 'Bogor', '0251-1234567', NULL, 'U91050BF', 8, 4),
('O87755A3', 'Kost Alam Sutera', 'Jl. Ciwaringin No. 10, Blok H No. 5, RT 02 RW 03, Bogor Barat', 'Bogor', '0251-2345678', NULL, 'UCCBDAA4', 10, 5),
('O7996485', 'Kost Tropika', 'Jl. Raya Pajajaran No. 15, Blok A No. 4, RT 03 RW 05, Bogor Timur', 'Bogor', '0251-3456789', NULL, 'UCF84271', 12, 6),
('OAF9F257', 'Kost Warung Jati', 'Jl. Warung Jati No. 30, Blok B No. 10, RT 04 RW 06, Bogor', 'Bogor', '0251-8765432', NULL, 'U379D822', 7, 3),
('O2CFB262', 'Kost Depok Raya', 'Jl. Margonda Raya No. 20, Blok D No. 5, RT 02 RW 07, Depok', 'Depok', '021-7654321', NULL, 'U7A8D038', 6, 2),
('OAFAEB77', 'Kost Margonda Suites', 'Jl. Margonda Raya No. 40, Blok E No. 8, RT 01 RW 04, Depok', 'Depok', '021-1234321', NULL, 'UFFE0487', 9, 4),
('OB5C622B', 'Kost Citayam', 'Jl. Citayam No. 10, Blok F No. 3, RT 03 RW 02, Depok', 'Depok', '021-1122334', NULL, 'UA588A1F', 10, 5),
('O78B3362', 'Kost Cisalak', 'Jl. Cisalak No. 5, Blok G No. 2, RT 04 RW 06, Depok', 'Depok', '021-9988776', NULL, 'UA89E6AE', 7, 3),
('OD482819', 'Kost Serpong Residence', 'Jl. Serpong Raya No. 10, Blok H No. 7, RT 01 RW 04, Tangerang', 'Tangerang', '021-5566778', NULL, 'U6CB03F6', 15, 8),
('O7A27AA5', 'Kost Tangerang City', 'Jl. Alamsari No. 8, Blok I No. 6, RT 02 RW 05, Tangerang Selatan', 'Tangerang', '021-6677889', NULL, 'U5B576FE', 13, 6),
('OBB08AEA', 'Kost Bintaro Jaya', 'Jl. Bintaro Jaya No. 22, Blok J No. 10, RT 03 RW 06, Tangerang Selatan', 'Tangerang', '021-2233445', NULL, 'UEADEE39', 12, 5),
('OEB4988D', 'Kost BSD 2', 'Jl. Raya BSD No. 33, Blok K No. 15, RT 04 RW 02, Tangerang', 'Tangerang', '021-9988775', NULL, 'U3B1C33C', 6, 3),
('O12DBF46', 'Kost Bekasi Baru', 'Jl. Raya Bekasi No. 5, Blok L No. 12, RT 01 RW 03, Bekasi', 'Bekasi', '021-3344556', NULL, 'UDC6C8BA', 10, 5),
('O84775B3', 'Kost Grand Bekasi', 'Jl. Bekasi Timur No. 30, Blok M No. 7, RT 02 RW 05, Bekasi', 'Bekasi', '021-2233447', NULL, 'U87AE117', 12, 6),
('O8D250C7', 'Kost Indah Permai', 'Jl. Perumahan Indah No. 50, Blok N No. 3, RT 04 RW 07, Bekasi', 'Bekasi', '021-4455669', NULL, 'U12E1056', 8, 4),
('O8876831', 'Kost Bekasi Sentral', 'Jl. Raya Bekasi Timur No. 55, Blok O No. 9, RT 01 RW 02, Bekasi', 'Bekasi', '021-8899001', NULL, 'U9CF4602', 14, 7);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `payment_id` varchar(10) NOT NULL,
  `timestamp` date DEFAULT NULL,
  `via` varchar(50) DEFAULT NULL,
  `proof` varchar(255) DEFAULT NULL,
  `water` float DEFAULT NULL,
  `wifi` float DEFAULT NULL,
  `electricity` float DEFAULT NULL,
  `spv_payroll` float DEFAULT NULL,
  `additional` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `room_id` varchar(10) NOT NULL,
  `room_number` int DEFAULT NULL,
  `type_id` varchar(10) DEFAULT NULL,
  `outlet_id` varchar(10) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `availability_status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `type_id` (`type_id`),
  KEY `outlet_id` (`outlet_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `room_number`, `type_id`, `outlet_id`, `photo`, `availability_status`) VALUES
('RAE4C10F', 1, '1', 'O7B1D9E8', 'https://placehold.co/300x300?text=Room', 1),
('R676F9D6', 2, '1', 'O7B1D9E8', 'https://placehold.co/300x300?text=Room', 1),
('R4599376', 3, '1', 'O7B1D9E8', 'https://placehold.co/300x300?text=Room', 1),
('R5BB3571', 4, '2', 'O7B1D9E8', 'https://placehold.co/300x300?text=Room', 1),
('R7D6450B', 5, '2', 'O7B1D9E8', 'https://placehold.co/300x300?text=Room', 1),
('REC5189F', 6, '2', 'O7B1D9E8', 'https://placehold.co/300x300?text=Room', 1),
('R85DCEE2', 1, '2', 'O24E28AF', 'https://placehold.co/300x300?text=Room', 1),
('RBE345DC', 2, '2', 'O24E28AF', 'https://placehold.co/300x300?text=Room', 1),
('RB9FE654', 3, '2', 'O24E28AF', 'https://placehold.co/300x300?text=Room', 1),
('R01D893D', 4, '3', 'O24E28AF', 'https://placehold.co/300x300?text=Room', 1),
('R8FC4498', 5, '3', 'O24E28AF', 'https://placehold.co/300x300?text=Room', 1),
('R91AFD43', 6, '3', 'O24E28AF', 'https://placehold.co/300x300?text=Room', 1),
('R6D092E8', 1, '3', 'OF4B26AA', 'https://placehold.co/300x300?text=Room', 1),
('R1BECCEB', 2, '3', 'OF4B26AA', 'https://placehold.co/300x300?text=Room', 1),
('RE5F5CB6', 3, '3', 'OF4B26AA', 'https://placehold.co/300x300?text=Room', 1),
('R833851C', 4, '4', 'OF4B26AA', 'https://placehold.co/300x300?text=Room', 1),
('R8C96809', 5, '4', 'OF4B26AA', 'https://placehold.co/300x300?text=Room', 1),
('R99E1960', 6, '4', 'OF4B26AA', 'https://placehold.co/300x300?text=Room', 1),
('R4781F0E', 1, '4', 'OCD9A7E5', 'https://placehold.co/300x300?text=Room', 1),
('R3536F23', 2, '4', 'OCD9A7E5', 'https://placehold.co/300x300?text=Room', 1),
('RD0637CC', 3, '4', 'OCD9A7E5', 'https://placehold.co/300x300?text=Room', 1),
('R66613E6', 4, '5', 'OCD9A7E5', 'https://placehold.co/300x300?text=Room', 1),
('RCD07284', 5, '5', 'OCD9A7E5', 'https://placehold.co/300x300?text=Room', 1),
('R844867A', 6, '5', 'OCD9A7E5', 'https://placehold.co/300x300?text=Room', 1),
('RA7C8E55', 1, '1', 'O7E0CAEF', 'https://placehold.co/300x300?text=Room', 1),
('R6EC9620', 2, '1', 'O7E0CAEF', 'https://placehold.co/300x300?text=Room', 1),
('R9A48906', 3, '1', 'O7E0CAEF', 'https://placehold.co/300x300?text=Room', 1),
('R725B95E', 4, '2', 'O7E0CAEF', 'https://placehold.co/300x300?text=Room', 1),
('R514FACB', 5, '2', 'O7E0CAEF', 'https://placehold.co/300x300?text=Room', 1),
('RDE4C898', 6, '2', 'O7E0CAEF', 'https://placehold.co/300x300?text=Room', 1),
('R4F858C9', 1, '2', 'O87755A3', 'https://placehold.co/300x300?text=Room', 1),
('R6430843', 2, '2', 'O87755A3', 'https://placehold.co/300x300?text=Room', 1),
('RB3A2F48', 3, '2', 'O87755A3', 'https://placehold.co/300x300?text=Room', 1),
('RF85BD86', 4, '3', 'O87755A3', 'https://placehold.co/300x300?text=Room', 1),
('RF63FF28', 5, '3', 'O87755A3', 'https://placehold.co/300x300?text=Room', 1),
('R841FDCC', 6, '3', 'O87755A3', 'https://placehold.co/300x300?text=Room', 1),
('R9A0B441', 1, '3', 'O7996485', 'https://placehold.co/300x300?text=Room', 1),
('RDE1076F', 2, '3', 'O7996485', 'https://placehold.co/300x300?text=Room', 1),
('RD0831F0', 3, '3', 'O7996485', 'https://placehold.co/300x300?text=Room', 1),
('RA06CD25', 4, '4', 'O7996485', 'https://placehold.co/300x300?text=Room', 1),
('R5D539EC', 5, '4', 'O7996485', 'https://placehold.co/300x300?text=Room', 1),
('RCA91C4F', 6, '4', 'O7996485', 'https://placehold.co/300x300?text=Room', 1),
('R729B472', 1, '4', 'OAF9F257', 'https://placehold.co/300x300?text=Room', 1),
('RF5CBA7F', 2, '4', 'OAF9F257', 'https://placehold.co/300x300?text=Room', 1),
('R23BBCB2', 3, '4', 'OAF9F257', 'https://placehold.co/300x300?text=Room', 1),
('RAA6C3C3', 4, '5', 'OAF9F257', 'https://placehold.co/300x300?text=Room', 1),
('R82B9799', 5, '5', 'OAF9F257', 'https://placehold.co/300x300?text=Room', 1),
('R404A647', 6, '5', 'OAF9F257', 'https://placehold.co/300x300?text=Room', 1),
('RB7C695C', 1, '1', 'O2CFB262', 'https://placehold.co/300x300?text=Room', 1),
('R6537E02', 2, '1', 'O2CFB262', 'https://placehold.co/300x300?text=Room', 1),
('R52EFC9F', 3, '1', 'O2CFB262', 'https://placehold.co/300x300?text=Room', 1),
('R644E8B4', 4, '2', 'O2CFB262', 'https://placehold.co/300x300?text=Room', 1),
('R4BCF136', 5, '2', 'O2CFB262', 'https://placehold.co/300x300?text=Room', 1),
('REF74F42', 6, '2', 'O2CFB262', 'https://placehold.co/300x300?text=Room', 1),
('RA6CBD02', 1, '2', 'OAFAEB77', 'https://placehold.co/300x300?text=Room', 1),
('RE06AB69', 2, '2', 'OAFAEB77', 'https://placehold.co/300x300?text=Room', 1),
('R96439EB', 3, '2', 'OAFAEB77', 'https://placehold.co/300x300?text=Room', 1),
('R108F12C', 4, '3', 'OAFAEB77', 'https://placehold.co/300x300?text=Room', 1),
('RB1F8D9E', 5, '3', 'OAFAEB77', 'https://placehold.co/300x300?text=Room', 1),
('R73CF761', 6, '3', 'OAFAEB77', 'https://placehold.co/300x300?text=Room', 1),
('RDE2EA65', 1, '3', 'OB5C622B', 'https://placehold.co/300x300?text=Room', 1),
('R01B189D', 2, '3', 'OB5C622B', 'https://placehold.co/300x300?text=Room', 1),
('R414316E', 3, '3', 'OB5C622B', 'https://placehold.co/300x300?text=Room', 1),
('RAF87F59', 4, '4', 'OB5C622B', 'https://placehold.co/300x300?text=Room', 1),
('RC5DA7EB', 5, '4', 'OB5C622B', 'https://placehold.co/300x300?text=Room', 1),
('R5CBFCE2', 6, '4', 'OB5C622B', 'https://placehold.co/300x300?text=Room', 1),
('R12338F5', 1, '4', 'O78B3362', 'https://placehold.co/300x300?text=Room', 1),
('R7525020', 2, '4', 'O78B3362', 'https://placehold.co/300x300?text=Room', 1),
('RB61ED4C', 3, '4', 'O78B3362', 'https://placehold.co/300x300?text=Room', 1),
('RB4AE619', 4, '5', 'O78B3362', 'https://placehold.co/300x300?text=Room', 1),
('R9AEBD19', 5, '5', 'O78B3362', 'https://placehold.co/300x300?text=Room', 1),
('R4BECAB6', 6, '5', 'O78B3362', 'https://placehold.co/300x300?text=Room', 1),
('R743EC0A', 1, '1', 'OD482819', 'https://placehold.co/300x300?text=Room', 1),
('R1772039', 2, '1', 'OD482819', 'https://placehold.co/300x300?text=Room', 1),
('RA6CC54C', 3, '1', 'OD482819', 'https://placehold.co/300x300?text=Room', 1),
('RA8417F5', 4, '2', 'OD482819', 'https://placehold.co/300x300?text=Room', 1),
('RF455C98', 5, '2', 'OD482819', 'https://placehold.co/300x300?text=Room', 1),
('R83E2B25', 6, '2', 'OD482819', 'https://placehold.co/300x300?text=Room', 1),
('R8D1E128', 1, '2', 'O7A27AA5', 'https://placehold.co/300x300?text=Room', 1),
('R5D7E5C5', 2, '2', 'O7A27AA5', 'https://placehold.co/300x300?text=Room', 1),
('R00721CA', 3, '2', 'O7A27AA5', 'https://placehold.co/300x300?text=Room', 1),
('RA030D81', 4, '3', 'O7A27AA5', 'https://placehold.co/300x300?text=Room', 1),
('R4F4BDD3', 5, '3', 'O7A27AA5', 'https://placehold.co/300x300?text=Room', 1),
('R679714A', 6, '3', 'O7A27AA5', 'https://placehold.co/300x300?text=Room', 1),
('RD96D21F', 1, '3', 'OBB08AEA', 'https://placehold.co/300x300?text=Room', 1),
('RE25EFD9', 2, '3', 'OBB08AEA', 'https://placehold.co/300x300?text=Room', 1),
('RFF2F211', 3, '3', 'OBB08AEA', 'https://placehold.co/300x300?text=Room', 1),
('R51112D8', 4, '4', 'OBB08AEA', 'https://placehold.co/300x300?text=Room', 1),
('RB8C0017', 5, '4', 'OBB08AEA', 'https://placehold.co/300x300?text=Room', 1),
('RF1AF216', 6, '4', 'OBB08AEA', 'https://placehold.co/300x300?text=Room', 1),
('RACAFD16', 1, '4', 'OEB4988D', 'https://placehold.co/300x300?text=Room', 1),
('R779F7BA', 2, '4', 'OEB4988D', 'https://placehold.co/300x300?text=Room', 1),
('R836EAFE', 3, '4', 'OEB4988D', 'https://placehold.co/300x300?text=Room', 1),
('R1E16B72', 4, '5', 'OEB4988D', 'https://placehold.co/300x300?text=Room', 1),
('RC76C6AD', 5, '5', 'OEB4988D', 'https://placehold.co/300x300?text=Room', 1),
('RBC4D327', 6, '5', 'OEB4988D', 'https://placehold.co/300x300?text=Room', 1),
('RAFE404D', 1, '1', 'O12DBF46', 'https://placehold.co/300x300?text=Room', 1),
('R953577E', 2, '1', 'O12DBF46', 'https://placehold.co/300x300?text=Room', 1),
('R3AF6AB9', 3, '1', 'O12DBF46', 'https://placehold.co/300x300?text=Room', 1),
('R264338A', 4, '2', 'O12DBF46', 'https://placehold.co/300x300?text=Room', 1),
('R8690E94', 5, '2', 'O12DBF46', 'https://placehold.co/300x300?text=Room', 1),
('RB9B453C', 6, '2', 'O12DBF46', 'https://placehold.co/300x300?text=Room', 1),
('R0DA74B5', 1, '2', 'O84775B3', 'https://placehold.co/300x300?text=Room', 1),
('RDB4D5E5', 2, '2', 'O84775B3', 'https://placehold.co/300x300?text=Room', 1),
('RE18C955', 3, '2', 'O84775B3', 'https://placehold.co/300x300?text=Room', 1),
('R7003378', 4, '3', 'O84775B3', 'https://placehold.co/300x300?text=Room', 1),
('RBA0D735', 5, '3', 'O84775B3', 'https://placehold.co/300x300?text=Room', 1),
('R741C515', 6, '3', 'O84775B3', 'https://placehold.co/300x300?text=Room', 1),
('R5B5B577', 1, '3', 'O8D250C7', 'https://placehold.co/300x300?text=Room', 1),
('R6E48D71', 2, '3', 'O8D250C7', 'https://placehold.co/300x300?text=Room', 1),
('RD8ED60C', 3, '3', 'O8D250C7', 'https://placehold.co/300x300?text=Room', 1),
('REDB300F', 4, '4', 'O8D250C7', 'https://placehold.co/300x300?text=Room', 1),
('R227D5A9', 5, '4', 'O8D250C7', 'https://placehold.co/300x300?text=Room', 1),
('R9E60107', 6, '4', 'O8D250C7', 'https://placehold.co/300x300?text=Room', 1),
('R9CE71D0', 1, '4', 'O8876831', 'https://placehold.co/300x300?text=Room', 1),
('R5C944B9', 2, '4', 'O8876831', 'https://placehold.co/300x300?text=Room', 1),
('RA762EB2', 3, '4', 'O8876831', 'https://placehold.co/300x300?text=Room', 1),
('RCB966C0', 4, '5', 'O8876831', 'https://placehold.co/300x300?text=Room', 1),
('RBB34E4A', 5, '5', 'O8876831', 'https://placehold.co/300x300?text=Room', 1),
('R5722A6B', 6, '5', 'O8876831', 'https://placehold.co/300x300?text=Room', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `transaction_id` varchar(10) NOT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `outlet_id` varchar(10) DEFAULT NULL,
  `room_id` varchar(10) DEFAULT NULL,
  `booking_id` varchar(10) DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `penalty` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `paid_at` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id` (`user_id`),
  KEY `outlet_id` (`outlet_id`),
  KEY `room_id` (`room_id`),
  KEY `booking_id` (`booking_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `user_id`, `outlet_id`, `room_id`, `booking_id`, `cost`, `penalty`, `total`, `paid_at`, `due_date`) VALUES
('T3DE8DCA', 'U9BDE233', 'O7B1D9E8', 'RAE4C10F', 'B095B812', 45000000, 0, 45000000, '2024-12-04', '2025-11-30');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `type_id` varchar(10) NOT NULL,
  `type_name` varchar(50) NOT NULL,
  `bathroom` tinyint(1) DEFAULT NULL,
  `ac` tinyint(1) DEFAULT NULL,
  `tv` tinyint(1) DEFAULT NULL,
  `wifi_speed` int DEFAULT NULL,
  `mini_pantry` tinyint(1) DEFAULT NULL,
  `dispenser` tinyint(1) DEFAULT NULL,
  `fridge` tinyint(1) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`type_id`,`type_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`, `bathroom`, `ac`, `tv`, `wifi_speed`, `mini_pantry`, `dispenser`, `fridge`, `size`, `price`) VALUES
('1', 'Luxury', 1, 1, 1, 90, 1, 1, 1, '5m x 5m', 3750000),
('2', 'Deluxe', 1, 1, 1, 60, 1, 1, 1, '5m x 4m', 3000000),
('3', 'Superior', 1, 1, 0, 40, 0, 1, 1, '4m x 4m', 2000000),
('4', 'Standard', 0, 1, 0, 20, 0, 1, 1, '3m x 3m', 1400000),
('5', 'Economic', 0, 0, 0, 10, 0, 0, 0, '2,5m x 2,5m', 750000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(10) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `outlet_id` varchar(10) DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `outlet_id` (`outlet_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `username`, `address`, `role`, `photo`, `outlet_id`, `room_number`) VALUES
('UE1EF938', 'customer@gmail.com', '$2b$12$Ct3cupHUK5kxrjR7D59rq.Utw9aO.Ci3X8R0boLwIiZTM1haXrM96', 'customer', 'BLOK', 'customer', NULL, NULL, NULL),
('U8984390', 'owner@gmail.com', '$2b$12$mGCYsW23JX0V5DLIiJIgOuX8WsVSKRVqFx.Llabs58TB3VTj6tq.e', 'owner', 'BLOK', 'owner', NULL, NULL, NULL),
('UAA186DB', 'rudisantoso@gmail.com', '$2b$12$90zFf0KyHysGewNoK6NTt.o2s9lgIyakMZSuZRVwDb9v.R5BYgU56', 'Rudi Santoso', 'Jl. Merdeka No. 12, RT 01 RW 03, Jakarta', 'spv', NULL, 'O7B1D9E8', NULL),
('UC4B7D2C', 'dinapratiwi@gmail.com', '$2b$12$G6gTu0CapoUSU1y00XnKyej8gVWb55FebsxPS9SbMzfhS0D2uowqW', 'Dina Pratiwi', 'Jl. Sudirman No. 34, RT 02 RW 01, Surabaya', 'spv', NULL, 'O24E28AF', NULL),
('UE8B7799', 'budisetiawan@gmail.com', '$2b$12$znThS/C.gxvP86T2T3cjjerMY1m4JSgw2r/kJ2dcWRbMdFJ3Zw0x6', 'Budi Setiawan', 'Jl. Raya No. 56, RT 05 RW 02, Bandung', 'spv', NULL, 'OF4B26AA', NULL),
('U6C10BF7', 'sitiaminah@gmail.com', '$2b$12$yKJh40SOYg7rxAAOsrR8huBjpNLmVHMMdZYbJR775jwe1bO398FdK', 'Siti Aminah', 'Jl. Panglima Polim No. 78, RT 03 RW 04, Medan', 'spv', NULL, 'OCD9A7E5', NULL),
('U91050BF', 'andihidayat@gmail.com', '$2b$12$xaeOikoJdADl4Hkrwpf.fupUTTE8Uy4Cyh91oJLxEZ1DSrdVnH.0u', 'Andi Hidayat', 'Jl. Dago No. 90, RT 02 RW 05, Semarang', 'spv', NULL, 'O7E0CAEF', NULL),
('UCCBDAA4', 'nurulaisyah@gmail.com', '$2b$12$AWhoNg3OophF15p9CapsPu.C/0FXwhfIssCZPT6XWatnkKPWdntV6', 'Nurul Aisyah', 'Jl. Gajah Mada No. 12, RT 01 RW 06, Makassar', 'spv', NULL, 'O87755A3', NULL),
('UCF84271', 'agusrahman@gmail.com', '$2b$12$GQ29hL1o9lO69OrazC2xJusj1AvIQ.Q0BN8vkrgHfIMomwioBNb.a', 'Agus Rahman', 'Jl. Pahlawan No. 43, RT 04 RW 07, Yogyakarta', 'spv', NULL, 'O7996485', NULL),
('U379D822', 'linamarlina@gmail.com', '$2b$12$GPP0ucygCpK0cGjIcbdYjO2/0ixGysA.NjcXPhAWEXS7o15JVg9Hu', 'Lina Marlina', 'Jl. Satrio No. 21, RT 02 RW 08, Palembang', 'spv', NULL, 'OAF9F257', NULL),
('U7A8D038', 'rizkyakbar@gmail.com', '$2b$12$.eT5df2OeuU9TrYNBVofxeFDiWn.js8OCDIRPzKQ.2oYrNkY7TFAq', 'Rizky Akbar', 'Jl. Abdul Muis No. 100, RT 01 RW 09, Bali', 'spv', NULL, 'O2CFB262', NULL),
('UFFE0487', 'mayaputri@gmail.com', '$2b$12$GA7kSnu03bB7RnVS63uUR.t6xcsEGQ8x70fOhqKV58NgDgClbDfOW', 'Maya Putri', 'Jl. Cihampelas No. 45, RT 03 RW 01, Malang', 'spv', NULL, 'OAFAEB77', NULL),
('UA588A1F', 'farhanazis@gmail.com', '$2b$12$742KFoS19P9y321KsvZlX.FM5IaJ6b83q1h.0wgad2.Z44r8s/3gK', 'Farhan Azis', 'Jl. Setiabudi No. 12, RT 02 RW 02, Tangerang', 'spv', NULL, 'OB5C622B', NULL),
('UA89E6AE', 'dewianggraini@gmail.com', '$2b$12$oCa.Zq.xx6Etoq81Qxk7bu8u6eYHX4BqLcF5JnHjJDMUXrDAQ5Ely', 'Dewi Anggraini', 'Jl. Ahmad Yani No. 67, RT 04 RW 03, Bekasi', 'spv', NULL, 'O78B3362', NULL),
('U6CB03F6', 'ekoprasetyo@gmail.com', '$2b$12$l8rtoWR3i9r4ia00J33yaesUdGrxB2V3LRLqArS5M2h9a.F7bcHK6', 'Eko Prasetyo', 'Jl. Pahlawan Revolusi No. 33, RT 01 RW 04, Bogor', 'spv', NULL, 'OD482819', NULL),
('U5B576FE', 'titihandayani@gmail.com', '$2b$12$BZW/B498LpReg8Ps40PLYekwkZFb/VSlPORV87M3eMLym06WyKLmK', 'Titi Handayani', 'Jl. Tendean No. 88, RT 05 RW 05, Depok', 'spv', NULL, 'O7A27AA5', NULL),
('UEADEE39', 'mochamadiqbal@gmail.com', '$2b$12$MI/.RdXSb6qcXQN2UryzPOm/dB0TNPTA29x9h5JKJbI2eY6nmztca', 'Mochamad Iqbal', 'Jl. Kebon Jeruk No. 20, RT 02 RW 06, Samarinda', 'spv', NULL, 'OBB08AEA', NULL),
('U3B1C33C', 'yuliaputri@gmail.com', '$2b$12$mIQ0kgyoTKGiEG0hMpMDxOyg9UbVR/QDDJj0.BXIohnlQa.S5MAOW', 'Yulia Putri', 'Jl. Pasir Kaliki No. 10, RT 01 RW 07, Pontianak', 'spv', NULL, 'OEB4988D', NULL),
('UDC6C8BA', 'zainalarifin@gmail.com', '$2b$12$TNo7G4oZtqmITn9kDXGoY.aLsFbpZtzY1J.FG0yeYz21zuP7ptmx6', 'Zainal Arifin', 'Jl. Soekarno Hatta No. 66, RT 03 RW 08, Manado', 'spv', NULL, 'O12DBF46', NULL),
('U87AE117', 'tasyaamalia@gmail.com', '$2b$12$PuVnbmgy.Y6o/mPwNsX9eOzOiLNRAZiNqMBHGZCjRe7ergm1SpDM2', 'Tasya Amalia', 'Jl. Veteran No. 43, RT 04 RW 09, Bandar Lampung', 'spv', NULL, 'O84775B3', NULL),
('U12E1056', 'iwankurniawan@gmail.com', '$2b$12$Yt908OY4874iPYk.VaFTtuaH/fA1TCJ3FSUFQRNSIuHhTFrQjUv/G', 'Iwan Kurniawan', 'Jl. Alun-Alun No. 15, RT 02 RW 10, Cirebon', 'spv', NULL, 'O8D250C7', NULL),
('U9CF4602', 'nadiasari@gmail.com', 'Nadia123', '$2b$12$xug4NxuqroWmSokiNnJsYuxW1MGE8Yf4AHavnNpPQlHHqO5Wietq2', 'Jl. Merdeka No. 78, RT 01 RW 11, Jakarta', 'spv', NULL, 'O8876831', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
