-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 04, 2011 at 02:45 AM
-- Server version: 5.1.44
-- PHP Version: 5.3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `eme_nsted`
--

-- --------------------------------------------------------

--
-- Table structure for table `rv_dataPoints1`
--

DROP TABLE IF EXISTS `rv_dataPoints1`;
CREATE TABLE IF NOT EXISTS `rv_dataPoints1` (
  `obsId` int(11) NOT NULL,
  `obsDate` double NOT NULL,
  `rv` double NOT NULL,
  `rvUncertainty` double NOT NULL,
  `accepted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rv_observations`
--

DROP TABLE IF EXISTS `rv_observations`;
CREATE TABLE IF NOT EXISTS `rv_observations` (
  `obsId` int(11) NOT NULL AUTO_INCREMENT,
  `starName` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `reference` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `bibcodes` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`obsId`),
  UNIQUE KEY `starName` (`starName`,`reference`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=560 ;
