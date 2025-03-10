-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: todo
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `goal`
--

DROP TABLE IF EXISTS `goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal` (
  `idGoal` int NOT NULL AUTO_INCREMENT,
  `nameGoal` varchar(100) DEFAULT NULL,
  `AbNameGoal` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idGoal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal`
--

LOCK TABLES `goal` WRITE;
/*!40000 ALTER TABLE `goal` DISABLE KEYS */;
/*!40000 ALTER TABLE `goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goal_has_project`
--

DROP TABLE IF EXISTS `goal_has_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal_has_project` (
  `goal_idGoal` int NOT NULL,
  `project_idProject` int NOT NULL,
  PRIMARY KEY (`goal_idGoal`,`project_idProject`),
  KEY `fk_goal_has_project_project1_idx` (`project_idProject`),
  CONSTRAINT `fk_goal_has_project_goal1` FOREIGN KEY (`goal_idGoal`) REFERENCES `goal` (`idGoal`),
  CONSTRAINT `fk_goal_has_project_project1` FOREIGN KEY (`project_idProject`) REFERENCES `project` (`idProject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal_has_project`
--

LOCK TABLES `goal_has_project` WRITE;
/*!40000 ALTER TABLE `goal_has_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `goal_has_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `idProject` int NOT NULL AUTO_INCREMENT,
  `nameProject` varchar(100) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `stateProject` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProject`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'test','2001-02-20','1 месяц','описание');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stakeholder`
--

DROP TABLE IF EXISTS `stakeholder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stakeholder` (
  `idStake` int NOT NULL AUTO_INCREMENT,
  `nameStake` varchar(100) DEFAULT NULL,
  `AbNameStake` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idStake`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stakeholder`
--

LOCK TABLES `stakeholder` WRITE;
/*!40000 ALTER TABLE `stakeholder` DISABLE KEYS */;
/*!40000 ALTER TABLE `stakeholder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stakeholder_has_project`
--

DROP TABLE IF EXISTS `stakeholder_has_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stakeholder_has_project` (
  `stakeholder_idStake` int NOT NULL,
  `project_idProject` int NOT NULL,
  PRIMARY KEY (`stakeholder_idStake`,`project_idProject`),
  KEY `fk_stakeholder_has_project_project1_idx` (`project_idProject`),
  CONSTRAINT `fk_stakeholder_has_project_project1` FOREIGN KEY (`project_idProject`) REFERENCES `project` (`idProject`),
  CONSTRAINT `fk_stakeholder_has_project_stakeholder1` FOREIGN KEY (`stakeholder_idStake`) REFERENCES `stakeholder` (`idStake`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stakeholder_has_project`
--

LOCK TABLES `stakeholder_has_project` WRITE;
/*!40000 ALTER TABLE `stakeholder_has_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `stakeholder_has_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `idTask` int NOT NULL AUTO_INCREMENT,
  `nameTask` varchar(45) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `deadLine` date DEFAULT NULL,
  `idProject` int DEFAULT NULL,
  `status` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`idTask`),
  KEY `fk_task_project1_idx` (`idProject`),
  CONSTRAINT `fk_task_project1` FOREIGN KEY (`idProject`) REFERENCES `project` (`idProject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `idUser1_idx` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'asd','asd','asd','asd'),(4,'test','ddd','ddd','ddd'),(9,'admin','alex','krav','admin'),(10,'test','test','test','test');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_project`
--

DROP TABLE IF EXISTS `user_has_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_project` (
  `user_idUser` int NOT NULL,
  `project_idProject` int NOT NULL,
  PRIMARY KEY (`user_idUser`,`project_idProject`),
  KEY `fk_user_has_project_project1_idx` (`project_idProject`),
  CONSTRAINT `fk_user_has_project_project1` FOREIGN KEY (`project_idProject`) REFERENCES `project` (`idProject`),
  CONSTRAINT `fk_user_has_project_user` FOREIGN KEY (`user_idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_project`
--

LOCK TABLES `user_has_project` WRITE;
/*!40000 ALTER TABLE `user_has_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_task`
--

DROP TABLE IF EXISTS `user_has_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_task` (
  `user_idUser` int NOT NULL,
  `task_idTask` int NOT NULL,
  PRIMARY KEY (`user_idUser`,`task_idTask`),
  KEY `index2` (`user_idUser`),
  KEY `fk_user_has_task_task1_idx` (`task_idTask`),
  CONSTRAINT `fk_user_has_task_task1` FOREIGN KEY (`task_idTask`) REFERENCES `task` (`idTask`),
  CONSTRAINT `fk_user_has_task_user1` FOREIGN KEY (`user_idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_task`
--

LOCK TABLES `user_has_task` WRITE;
/*!40000 ALTER TABLE `user_has_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-11 19:12:34
