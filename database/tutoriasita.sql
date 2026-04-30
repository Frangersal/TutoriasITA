-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-04-2026 a las 07:27:43
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tutoriasita`
--
CREATE DATABASE IF NOT EXISTS `tutoriasita` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tutoriasita`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `answers_question_id_foreign` (`question_id`),
  KEY `answers_user_id_foreign` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers_options`
--

DROP TABLE IF EXISTS `answers_options`;
CREATE TABLE IF NOT EXISTS `answers_options` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `answers_options_question_id_foreign` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=582 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `answers_options`
--

INSERT INTO `answers_options` (`id`, `name`, `question_id`, `created_at`, `updated_at`) VALUES
(9, 'Masculino', 8, NULL, NULL),
(10, 'Femenino', 8, NULL, NULL),
(12, 'Soltero', 10, NULL, NULL),
(13, 'Casado', 10, NULL, NULL),
(14, 'Sí', 11, NULL, NULL),
(15, 'No', 11, NULL, NULL),
(16, 'Casa', 17, NULL, NULL),
(17, 'Departamento', 17, NULL, NULL),
(18, 'Propia', 18, NULL, NULL),
(19, 'Rentada', 18, NULL, NULL),
(20, 'Prestada', 18, NULL, NULL),
(21, 'Sí', 22, NULL, NULL),
(22, 'No', 22, NULL, NULL),
(23, 'Sí', 28, NULL, NULL),
(24, 'No', 28, NULL, NULL),
(25, 'Femenino', 34, NULL, NULL),
(26, 'Masculino', 34, NULL, NULL),
(27, 'Primaria', 35, NULL, NULL),
(28, 'Secundaria', 35, NULL, NULL),
(29, 'Preparatoria', 35, NULL, NULL),
(30, 'Universidad', 35, NULL, NULL),
(31, 'Titulo', 35, NULL, NULL),
(32, 'Femenino', 38, NULL, NULL),
(33, 'Masculino', 38, NULL, NULL),
(34, 'Primaria', 39, NULL, NULL),
(35, 'Secundaria', 39, NULL, NULL),
(36, 'Preparatoria', 39, NULL, NULL),
(37, 'Universidad', 39, NULL, NULL),
(38, 'Titulo', 39, NULL, NULL),
(39, 'Femenino', 42, NULL, NULL),
(40, 'Masculino', 42, NULL, NULL),
(41, 'Primaria', 43, NULL, NULL),
(42, 'Secundaria', 43, NULL, NULL),
(43, 'Preparatoria', 43, NULL, NULL),
(44, 'Universidad', 43, NULL, NULL),
(45, 'Titulo', 43, NULL, NULL),
(46, 'Femenino', 46, NULL, NULL),
(47, 'Masculino', 46, NULL, NULL),
(48, 'Primaria', 47, NULL, NULL),
(49, 'Secundaria', 47, NULL, NULL),
(50, 'Preparatoria', 47, NULL, NULL),
(51, 'Universidad', 47, NULL, NULL),
(52, 'Titulo', 47, NULL, NULL),
(53, 'Femenino', 50, NULL, NULL),
(54, 'Masculino', 50, NULL, NULL),
(55, 'Primaria', 51, NULL, NULL),
(56, 'Secundaria', 51, NULL, NULL),
(57, 'Preparatoria', 51, NULL, NULL),
(58, 'Universidad', 51, NULL, NULL),
(59, 'Titulo', 51, NULL, NULL),
(60, 'Frecuente/M', 57, NULL, NULL),
(61, 'Muy frecuente/M', 57, NULL, NULL),
(62, 'Nunca', 57, NULL, NULL),
(63, 'Antes', 57, NULL, NULL),
(64, 'A veces', 57, NULL, NULL),
(65, 'Frecuente/M', 58, NULL, NULL),
(66, 'Muy frecuente/M', 58, NULL, NULL),
(67, 'Nunca', 58, NULL, NULL),
(68, 'Antes', 58, NULL, NULL),
(69, 'A veces', 58, NULL, NULL),
(70, 'Frecuente/M', 59, NULL, NULL),
(71, 'Muy frecuente/M', 59, NULL, NULL),
(72, 'Nunca', 59, NULL, NULL),
(73, 'Antes', 59, NULL, NULL),
(74, 'A veces', 59, NULL, NULL),
(75, 'Frecuente/M', 60, NULL, NULL),
(76, 'Muy frecuente/M', 60, NULL, NULL),
(77, 'Nunca', 60, NULL, NULL),
(78, 'Antes', 60, NULL, NULL),
(79, 'A veces', 60, NULL, NULL),
(80, 'Frecuente/M', 61, NULL, NULL),
(81, 'Muy frecuente/M', 61, NULL, NULL),
(82, 'Nunca', 61, NULL, NULL),
(83, 'Antes', 61, NULL, NULL),
(84, 'A veces', 61, NULL, NULL),
(85, 'Frecuente/M', 62, NULL, NULL),
(86, 'Muy frecuente/M', 62, NULL, NULL),
(87, 'Nunca', 62, NULL, NULL),
(88, 'Antes', 62, NULL, NULL),
(89, 'A veces', 62, NULL, NULL),
(90, 'Frecuente/M', 63, NULL, NULL),
(91, 'Muy frecuente/M', 63, NULL, NULL),
(92, 'Nunca', 63, NULL, NULL),
(93, 'Antes', 63, NULL, NULL),
(94, 'A veces', 63, NULL, NULL),
(95, 'Frecuente/M', 64, NULL, NULL),
(96, 'Muy frecuente/M', 64, NULL, NULL),
(97, 'Nunca', 64, NULL, NULL),
(98, 'Antes', 64, NULL, NULL),
(99, 'A veces', 64, NULL, NULL),
(100, 'Frecuente/M', 65, NULL, NULL),
(101, 'Muy frecuente/M', 65, NULL, NULL),
(102, 'Nunca', 65, NULL, NULL),
(103, 'Antes', 65, NULL, NULL),
(104, 'A veces', 65, NULL, NULL),
(105, 'Frecuente/M', 66, NULL, NULL),
(106, 'Muy frecuente/M', 66, NULL, NULL),
(107, 'Nunca', 66, NULL, NULL),
(108, 'Antes', 66, NULL, NULL),
(109, 'A veces', 66, NULL, NULL),
(110, 'Frecuente/M', 67, NULL, NULL),
(111, 'Muy frecuente/M', 67, NULL, NULL),
(112, 'Nunca', 67, NULL, NULL),
(113, 'Antes', 67, NULL, NULL),
(114, 'A veces', 67, NULL, NULL),
(115, 'Frecuente/M', 68, NULL, NULL),
(116, 'Muy frecuente/M', 68, NULL, NULL),
(117, 'Nunca', 68, NULL, NULL),
(118, 'Antes', 68, NULL, NULL),
(119, 'A veces', 68, NULL, NULL),
(120, 'Sí', 70, NULL, NULL),
(121, 'No', 70, NULL, NULL),
(122, 'Muy buena', 77, NULL, NULL),
(123, 'Buena', 77, NULL, NULL),
(124, 'Más o menos', 77, NULL, NULL),
(125, 'Mala', 77, NULL, NULL),
(126, 'Muy mala', 77, NULL, NULL),
(127, 'Muy buena', 78, NULL, NULL),
(128, 'Buena', 78, NULL, NULL),
(129, 'Más o menos', 78, NULL, NULL),
(130, 'Mala', 78, NULL, NULL),
(131, 'Muy mala', 78, NULL, NULL),
(132, 'Muy buena', 79, NULL, NULL),
(133, 'Buena', 79, NULL, NULL),
(134, 'Más o menos', 79, NULL, NULL),
(135, 'Mala', 79, NULL, NULL),
(136, 'Muy mala', 79, NULL, NULL),
(137, 'Muy buena', 80, NULL, NULL),
(138, 'Buena', 80, NULL, NULL),
(139, 'Más o menos', 80, NULL, NULL),
(140, 'Mala', 80, NULL, NULL),
(141, 'Muy mala', 80, NULL, NULL),
(142, 'Muy buena', 81, NULL, NULL),
(143, 'Buena', 81, NULL, NULL),
(144, 'Más o menos', 81, NULL, NULL),
(145, 'Mala', 81, NULL, NULL),
(146, 'Muy mala', 81, NULL, NULL),
(147, 'Muy buena', 82, NULL, NULL),
(148, 'Buena', 82, NULL, NULL),
(149, 'Más o menos', 82, NULL, NULL),
(150, 'Mala', 82, NULL, NULL),
(151, 'Muy mala', 82, NULL, NULL),
(152, 'Muy buena', 83, NULL, NULL),
(153, 'Buena', 83, NULL, NULL),
(154, 'Más o menos', 83, NULL, NULL),
(155, 'Mala', 83, NULL, NULL),
(156, 'Muy mala', 83, NULL, NULL),
(157, 'Muy buena', 84, NULL, NULL),
(158, 'Buena', 84, NULL, NULL),
(159, 'Más o menos', 84, NULL, NULL),
(160, 'Mala', 84, NULL, NULL),
(161, 'Muy mala', 84, NULL, NULL),
(162, 'Muy buena', 85, NULL, NULL),
(163, 'Buena', 85, NULL, NULL),
(164, 'Más o menos', 85, NULL, NULL),
(165, 'Mala', 85, NULL, NULL),
(166, 'Muy mala', 85, NULL, NULL),
(167, 'Muy buena', 86, NULL, NULL),
(168, 'Buena', 86, NULL, NULL),
(169, 'Más o menos', 86, NULL, NULL),
(170, 'Mala', 86, NULL, NULL),
(171, 'Muy mala', 86, NULL, NULL),
(172, 'Madre', 87, NULL, NULL),
(173, 'Padre', 87, NULL, NULL),
(174, 'Hermano', 87, NULL, NULL),
(175, 'Otro', 87, NULL, NULL),
(176, 'Madre', 89, NULL, NULL),
(177, 'Padre', 89, NULL, NULL),
(178, 'Tutor', 89, NULL, NULL),
(179, 'Otro', 89, NULL, NULL),
(180, 'Muy buena', 92, NULL, NULL),
(181, 'Buena', 92, NULL, NULL),
(182, 'Más o menos', 92, NULL, NULL),
(183, 'Mala', 92, NULL, NULL),
(184, 'Muy mala', 92, NULL, NULL),
(185, 'Muy buena', 94, NULL, NULL),
(186, 'Buena', 94, NULL, NULL),
(187, 'Más o menos', 94, NULL, NULL),
(188, 'Mala', 94, NULL, NULL),
(189, 'Muy mala', 94, NULL, NULL),
(190, 'Sí', 95, NULL, NULL),
(191, 'No', 95, NULL, NULL),
(192, 'Muy buena', 96, NULL, NULL),
(193, 'Buena', 96, NULL, NULL),
(194, 'Más o menos', 96, NULL, NULL),
(195, 'Mala', 96, NULL, NULL),
(196, 'Muy mala', 96, NULL, NULL),
(197, 'Muy buena', 97, NULL, NULL),
(198, 'Buena', 97, NULL, NULL),
(199, 'Más o menos', 97, NULL, NULL),
(200, 'Mala', 97, NULL, NULL),
(201, 'Muy mala', 97, NULL, NULL),
(202, 'No', 100, NULL, NULL),
(203, 'Poco', 100, NULL, NULL),
(204, 'Frecuente/M', 100, NULL, NULL),
(205, 'Mucho', 100, NULL, NULL),
(206, 'No', 101, NULL, NULL),
(207, 'Poco', 101, NULL, NULL),
(208, 'Frecuente/M', 101, NULL, NULL),
(209, 'Mucho', 101, NULL, NULL),
(210, 'No', 102, NULL, NULL),
(211, 'Poco', 102, NULL, NULL),
(212, 'Frecuente/M', 102, NULL, NULL),
(213, 'Mucho', 102, NULL, NULL),
(214, 'No', 103, NULL, NULL),
(215, 'Poco', 103, NULL, NULL),
(216, 'Frecuente/M', 103, NULL, NULL),
(217, 'Mucho', 103, NULL, NULL),
(218, 'No', 104, NULL, NULL),
(219, 'Poco', 104, NULL, NULL),
(220, 'Frecuente/M', 104, NULL, NULL),
(221, 'Mucho', 104, NULL, NULL),
(222, 'No', 105, NULL, NULL),
(223, 'Poco', 105, NULL, NULL),
(224, 'Frecuente/M', 105, NULL, NULL),
(225, 'Mucho', 105, NULL, NULL),
(226, 'No', 106, NULL, NULL),
(227, 'Poco', 106, NULL, NULL),
(228, 'Frecuente/M', 106, NULL, NULL),
(229, 'Mucho', 106, NULL, NULL),
(230, 'No', 107, NULL, NULL),
(231, 'Poco', 107, NULL, NULL),
(232, 'Frecuente/M', 107, NULL, NULL),
(233, 'Mucho', 107, NULL, NULL),
(234, 'No', 108, NULL, NULL),
(235, 'Poco', 108, NULL, NULL),
(236, 'Frecuente/M', 108, NULL, NULL),
(237, 'Mucho', 108, NULL, NULL),
(238, 'No', 109, NULL, NULL),
(239, 'Poco', 109, NULL, NULL),
(240, 'Frecuente/M', 109, NULL, NULL),
(241, 'Mucho', 109, NULL, NULL),
(242, 'No', 110, NULL, NULL),
(243, 'Poco', 110, NULL, NULL),
(244, 'Frecuente/M', 110, NULL, NULL),
(245, 'Mucho', 110, NULL, NULL),
(246, 'No', 111, NULL, NULL),
(247, 'Poco', 111, NULL, NULL),
(248, 'Frecuente/M', 111, NULL, NULL),
(249, 'Mucho', 111, NULL, NULL),
(250, 'No', 112, NULL, NULL),
(251, 'Poco', 112, NULL, NULL),
(252, 'Frecuente/M', 112, NULL, NULL),
(253, 'Mucho', 112, NULL, NULL),
(254, 'No', 113, NULL, NULL),
(255, 'Poco', 113, NULL, NULL),
(256, 'Frecuente/M', 113, NULL, NULL),
(257, 'Mucho', 113, NULL, NULL),
(258, 'No', 114, NULL, NULL),
(259, 'Poco', 114, NULL, NULL),
(260, 'Frecuente/M', 114, NULL, NULL),
(261, 'Mucho', 114, NULL, NULL),
(262, 'No', 115, NULL, NULL),
(263, 'Poco', 115, NULL, NULL),
(264, 'Frecuente/M', 115, NULL, NULL),
(265, 'Mucho', 115, NULL, NULL),
(266, 'No', 116, NULL, NULL),
(267, 'Poco', 116, NULL, NULL),
(268, 'Frecuente/M', 116, NULL, NULL),
(269, 'Mucho', 116, NULL, NULL),
(270, 'No', 117, NULL, NULL),
(271, 'Poco', 117, NULL, NULL),
(272, 'Frecuente/M', 117, NULL, NULL),
(273, 'Mucho', 117, NULL, NULL),
(274, 'No', 118, NULL, NULL),
(275, 'Poco', 118, NULL, NULL),
(276, 'Frecuente/M', 118, NULL, NULL),
(277, 'Mucho', 118, NULL, NULL),
(278, 'No', 119, NULL, NULL),
(279, 'Poco', 119, NULL, NULL),
(280, 'Frecuente/M', 119, NULL, NULL),
(281, 'Mucho', 119, NULL, NULL),
(282, 'No', 120, NULL, NULL),
(283, 'Poco', 120, NULL, NULL),
(284, 'Frecuente/M', 120, NULL, NULL),
(285, 'Mucho', 120, NULL, NULL),
(286, 'No', 121, NULL, NULL),
(287, 'Poco', 121, NULL, NULL),
(288, 'Frecuente/M', 121, NULL, NULL),
(289, 'Mucho', 121, NULL, NULL),
(290, 'No', 122, NULL, NULL),
(291, 'Poco', 122, NULL, NULL),
(292, 'Frecuente/M', 122, NULL, NULL),
(293, 'Mucho', 122, NULL, NULL),
(294, 'No', 123, NULL, NULL),
(295, 'Poco', 123, NULL, NULL),
(296, 'Frecuente/M', 123, NULL, NULL),
(297, 'Mucho', 123, NULL, NULL),
(298, 'No', 124, NULL, NULL),
(299, 'Poco', 124, NULL, NULL),
(300, 'Frecuente/M', 124, NULL, NULL),
(301, 'Mucho', 124, NULL, NULL),
(302, 'No', 125, NULL, NULL),
(303, 'Poco', 125, NULL, NULL),
(304, 'Frecuente/M', 125, NULL, NULL),
(305, 'Mucho', 125, NULL, NULL),
(306, 'Sí', 126, NULL, NULL),
(307, 'No', 126, NULL, NULL),
(308, 'Muy malo', 128, NULL, NULL),
(309, 'Malo', 128, NULL, NULL),
(310, 'Regular', 128, NULL, NULL),
(311, 'Bueno', 128, NULL, NULL),
(312, 'Muy bueno', 128, NULL, NULL),
(313, 'Sí', 138, NULL, NULL),
(314, 'No', 138, NULL, NULL),
(315, 'Sí', 149, NULL, NULL),
(316, 'No', 149, NULL, NULL),
(317, 'Sí', 150, NULL, NULL),
(318, 'No', 150, NULL, NULL),
(323, 'Sí', 153, NULL, NULL),
(324, 'No', 153, NULL, NULL),
(325, 'Sí', 154, NULL, NULL),
(326, 'No', 154, NULL, NULL),
(327, 'Sí', 155, NULL, NULL),
(328, 'No', 155, NULL, NULL),
(329, 'Sí', 156, NULL, NULL),
(330, 'No', 156, NULL, NULL),
(331, 'Sí', 157, NULL, NULL),
(332, 'No', 157, NULL, NULL),
(333, 'Sí', 158, NULL, NULL),
(334, 'No', 158, NULL, NULL),
(335, 'Sí', 159, NULL, NULL),
(336, 'No', 159, NULL, NULL),
(337, 'Sí', 160, NULL, NULL),
(338, 'No', 160, NULL, NULL),
(339, 'Sí', 161, NULL, NULL),
(340, 'No', 161, NULL, NULL),
(341, 'Sí', 162, NULL, NULL),
(342, 'No', 162, NULL, NULL),
(343, 'Sí', 163, NULL, NULL),
(344, 'No', 163, NULL, NULL),
(345, 'Sí', 164, NULL, NULL),
(346, 'No', 164, NULL, NULL),
(347, 'Sí', 165, NULL, NULL),
(348, 'No', 165, NULL, NULL),
(349, 'Sí', 166, NULL, NULL),
(350, 'No', 166, NULL, NULL),
(351, 'Sí', 167, NULL, NULL),
(352, 'No', 167, NULL, NULL),
(353, 'Sí', 168, NULL, NULL),
(354, 'No', 168, NULL, NULL),
(355, 'Sí', 169, NULL, NULL),
(356, 'No', 169, NULL, NULL),
(357, 'Sí', 170, NULL, NULL),
(358, 'No', 170, NULL, NULL),
(359, 'Sí', 171, NULL, NULL),
(360, 'No', 171, NULL, NULL),
(361, 'Sí', 172, NULL, NULL),
(362, 'No', 172, NULL, NULL),
(363, 'Sí', 173, NULL, NULL),
(364, 'No', 173, NULL, NULL),
(365, 'Sí', 174, NULL, NULL),
(366, 'No', 174, NULL, NULL),
(367, 'Sí', 175, NULL, NULL),
(368, 'No', 175, NULL, NULL),
(369, 'Sí', 176, NULL, NULL),
(370, 'No', 176, NULL, NULL),
(371, 'Sí', 177, NULL, NULL),
(372, 'No', 177, NULL, NULL),
(373, 'Sí', 178, NULL, NULL),
(374, 'No', 178, NULL, NULL),
(375, 'Sí', 179, NULL, NULL),
(376, 'No', 179, NULL, NULL),
(377, 'Sí', 180, NULL, NULL),
(378, 'No', 180, NULL, NULL),
(379, 'Sí', 181, NULL, NULL),
(380, 'No', 181, NULL, NULL),
(381, 'Sí', 182, NULL, NULL),
(382, 'No', 182, NULL, NULL),
(383, 'Sí', 183, NULL, NULL),
(384, 'No', 183, NULL, NULL),
(385, 'Sí', 184, NULL, NULL),
(386, 'No', 184, NULL, NULL),
(387, 'Sí', 185, NULL, NULL),
(388, 'No', 185, NULL, NULL),
(389, 'Sí', 186, NULL, NULL),
(390, 'No', 186, NULL, NULL),
(391, 'Sí', 187, NULL, NULL),
(392, 'No', 187, NULL, NULL),
(393, 'Sí', 188, NULL, NULL),
(394, 'No', 188, NULL, NULL),
(395, 'Sí', 189, NULL, NULL),
(396, 'No', 189, NULL, NULL),
(397, 'Sí', 190, NULL, NULL),
(398, 'No', 190, NULL, NULL),
(399, 'Sí', 191, NULL, NULL),
(400, 'No', 191, NULL, NULL),
(401, 'Sí', 192, NULL, NULL),
(402, 'No', 192, NULL, NULL),
(407, 'Sí', 195, NULL, NULL),
(408, 'No', 195, NULL, NULL),
(409, 'Sí', 196, NULL, NULL),
(410, 'No', 196, NULL, NULL),
(411, 'Sí', 197, NULL, NULL),
(412, 'No', 197, NULL, NULL),
(413, 'Sí', 198, NULL, NULL),
(414, 'No', 198, NULL, NULL),
(415, 'Sí', 199, NULL, NULL),
(416, 'No', 199, NULL, NULL),
(417, 'Sí', 200, NULL, NULL),
(418, 'No', 200, NULL, NULL),
(419, 'Sí', 201, NULL, NULL),
(420, 'No', 201, NULL, NULL),
(421, 'Sí', 202, NULL, NULL),
(422, 'No', 202, NULL, NULL),
(423, 'Sí', 203, NULL, NULL),
(424, 'No', 203, NULL, NULL),
(425, 'Sí', 204, NULL, NULL),
(426, 'No', 204, NULL, NULL),
(427, 'Sí', 205, NULL, NULL),
(428, 'No', 205, NULL, NULL),
(429, 'Sí', 206, NULL, NULL),
(430, 'No', 206, NULL, NULL),
(431, 'Sí', 207, NULL, NULL),
(432, 'No', 207, NULL, NULL),
(433, 'Sí', 208, NULL, NULL),
(434, 'No', 208, NULL, NULL),
(435, 'No, consideras que tu opinión sea buena y que la de los demás no tenga por qué serlo siempre.', 209, NULL, NULL),
(436, 'Sí, pero sólo ante las decisiones que consideras demasiado importantes como para actuar precipitadamente. ', 209, NULL, NULL),
(437, 'Sí, siempre que puedes consultas con los demás. Te equivocas con frecuencia y quieres hacer las cosas bien.', 209, NULL, NULL),
(438, 'Depende de la decisión. Sueles tener claro lo que vas a hacer, pero consideras las posibilidades que te ofrecen los demas.', 209, NULL, NULL),
(439, 'No le das importancia, te comportas con naturalidad y si alguien te lo comenta haces alguna broma al respecto.', 210, NULL, NULL),
(440, 'Te da mucha vergüenza. Procuras situarte en algún lugar discreto y pasar desapercibido. ', 210, NULL, NULL),
(441, 'Te sientes incómodo pero tratas de no pensar en ello, te enteras en la reunión y das alguna excusa por tu error.', 210, NULL, NULL),
(442, 'No te importa nada en absoluto, aunque no lleves la ropa adecuada tienes estil y sabes llevar bien cualquier cosa.', 210, NULL, NULL),
(443, 'Admiras el estilo de tu acompañante, al final compras un par de prendas necesarias por muy simples en cuanto a forma y color.', 211, NULL, NULL),
(444, 'No estás dispuesto a que te gane, decides comprar varias prendas muy modernas y bastante caras.', 211, NULL, NULL),
(445, 'Asmiras su estilo pero eres muy consciente del tuyo, compras la ropa que mejor te sienta y que necesitas, y pasan un rato ameno probándolos cosas diferentes. ', 211, NULL, NULL),
(446, 'A su lado te sientes bastante poca cosa, te quita las ganas de probarte nada y mucho menos de comprar. Pones una excusa y te marchas.', 211, NULL, NULL),
(447, 'No crees que tengas mucho que contar, tu trabajo es muy corriente, tus amigos normalesi y aficiones también. Prefieres que esta persona te cuente su vida.', 212, NULL, NULL),
(448, 'Tu trabajo te gusta y aunque sea corriente, siempre lo enfocas desde una perspectiva interesante, tus aficiones son tu pasión y disfrutas hablando de ellas, tambien hablas de tus proyectos futuros. ', 212, NULL, NULL),
(449, 'Hablas en lineas generales de tu tabajo y de tus aficiones, sobre todo hablas de tus amigos y de lo más interesante de sus vidas', 212, NULL, NULL),
(450, 'Más que tu trabajo actual, hablas de tus proyectos y de tus objetivos, y de lo que vas a hacer para logrados, de lo buenas que son tus amistades y lo poco usual de tus aficiones. Te gusta hablar de ti.', 212, NULL, NULL),
(451, 'Paras la explicación y requieres que se empiece de nuevo, si tu no lo entiendes habrá muchas gente que tampoco lo haga.', 213, NULL, NULL),
(452, 'Si hay más gente que pregunte tú también lo haces, si no, buscas en un aparte al ponente para que te aclare las dudas.', 213, NULL, NULL),
(453, 'Te da mucha vergüenza preguntar y demostrar así que no entiendes. Más tarde preguntarás a algún amigo o intentarás informante por tu cuenta.', 213, NULL, NULL),
(454, 'Tomas nota de lo que no entiendes para preguntarlo al finalizar la charla, si sigues con dudas perdirás información complementaria para prepararte mejor.', 213, NULL, NULL),
(455, 'Satisfactoria, tratas de buscar el lado positivo de las cosas y nunca te faltan proyectos y objetivos que perseguir.', 214, NULL, NULL),
(456, 'Horrible, no obstante, sabes que las cosas están mal y que tienes que aguantar lo que sea. Estás muy agradecido por tener trabajo.', 214, NULL, NULL),
(457, 'No te prpeocupa especialmente el tema, tienes un montón de proyectos más importantes y con tu valía los alcanzarás.', 214, NULL, NULL),
(458, 'Has logrado que no te afecte, consideras más importante tu vida personal y privada y eso es por lo que luchas.', 214, NULL, NULL),
(459, 'Prefieres no pensarlo, el dia ha sido duro pero para ti no es algo nuevo, solo pides poder dormir bien y que mañana sea un día más tranquilo.', 215, NULL, NULL),
(460, 'Se lo cuentas a todo el mundo, te gusta que se te reconozca cuando haces las cosas bien y exiges en cada que te mimen por haberte esforzado tanto.', 215, NULL, NULL),
(461, 'Esás muy satisgecho y decides darte un capricho, darte un baño de espuma y ver una buena película, o comparte un regalito que hace tiempo querías.', 215, NULL, NULL),
(462, 'Te preocupa que se te haya olvidado algo o haber hecho algo mal por la prisa, repasas mentalmente las actividades y al día siguiente esperas no tener queja de nadie.', 215, NULL, NULL),
(463, 'No te planteas ser voluntario, hay mil personas más capacitadas que tú para la demostración y no se te da bien hablaren público.', 216, NULL, NULL),
(464, 'Te presentas voluntario, puede ser una experiencia interesante y si sales elegido puedes hacer una presentación innovadora.', 216, NULL, NULL),
(465, 'No te presentas, serías capaz de hacerla bien pero crees que hay gente mejor preparada y más original que tú.', 216, NULL, NULL),
(466, 'Te presentas y estás casi seguro de que te elegirán, haces buenos proyectos y darás una buena imagen de la empresa.', 216, NULL, NULL),
(467, 'La buena suerte puede tocarle a todo el mundo, yo me considero una persona afortunada a la que la vida le sonríe.', 217, NULL, NULL),
(468, 'Para tener buena suerte hay que trabajar duro, sólo los muy afortunados la tienen sin apenas esfuerzo.', 217, NULL, NULL),
(469, 'Yo no tengo suerte, tanto los premios como las cosas especia les sólo les pasan a los demás.', 217, NULL, NULL),
(470, 'La suerte respecto a los premios es una cuestión de probabilidad, y respecto a las cosas de la vida, siempre depende de cómo se perciban.', 217, NULL, NULL),
(471, 'Te interesa conocerlos no sólo para pasar un buen rato en la reunión sino porque puede ser una forma de iniciar una amistad. ', 218, NULL, NULL),
(472, 'Esperas causarles una buena impresión y decir cosas que les puedan interesar. ', 218, NULL, NULL),
(473, 'Te gustaría llevarles a tu terreno en la conversación para así poder hablar de los temas que más te interesan.', 218, NULL, NULL),
(474, 'Antes de iniciar una conversación escuchas lo que dicen, y es peras para hablar a que lo hagan de temas que tú conozcas.', 218, NULL, NULL),
(475, 'Con frecuencia', 219, NULL, NULL),
(476, 'De vez en cuando', 219, NULL, NULL),
(477, 'Casi nunca', 219, NULL, NULL),
(478, 'Nunca', 219, NULL, NULL),
(479, 'Con frecuencia', 220, NULL, NULL),
(480, 'De vez en cuando', 220, NULL, NULL),
(481, 'Casi nunca', 220, NULL, NULL),
(482, 'Nunca', 220, NULL, NULL),
(483, 'Con frecuencia', 221, NULL, NULL),
(484, 'De vez en cuando', 221, NULL, NULL),
(485, 'Casi nunca', 221, NULL, NULL),
(486, 'Nunca', 221, NULL, NULL),
(487, 'Con frecuencia', 222, NULL, NULL),
(488, 'De vez en cuando', 222, NULL, NULL),
(489, 'Casi nunca', 222, NULL, NULL),
(490, 'Nunca', 222, NULL, NULL),
(491, 'Con frecuencia', 223, NULL, NULL),
(492, 'De vez en cuando', 223, NULL, NULL),
(493, 'Casi nunca', 223, NULL, NULL),
(494, 'Nunca', 223, NULL, NULL),
(495, 'Con frecuencia', 224, NULL, NULL),
(496, 'De vez en cuando', 224, NULL, NULL),
(497, 'Casi nunca', 224, NULL, NULL),
(498, 'Nunca', 224, NULL, NULL),
(499, 'Con frecuencia', 225, NULL, NULL),
(500, 'De vez en cuando', 225, NULL, NULL),
(501, 'Casi nunca', 225, NULL, NULL),
(502, 'Nunca', 225, NULL, NULL),
(503, 'Con frecuencia', 226, NULL, NULL),
(504, 'De vez en cuando', 226, NULL, NULL),
(505, 'Casi nunca', 226, NULL, NULL),
(506, 'Nunca', 226, NULL, NULL),
(507, 'Con frecuencia', 227, NULL, NULL),
(508, 'De vez en cuando', 227, NULL, NULL),
(509, 'Casi nunca', 227, NULL, NULL),
(510, 'Nunca', 227, NULL, NULL),
(511, 'Siempre', 228, NULL, NULL),
(512, 'Casi siempre', 228, NULL, NULL),
(513, 'A veces ', 228, NULL, NULL),
(514, 'Casi nunca', 228, NULL, NULL),
(515, 'Nunca', 228, NULL, NULL),
(516, 'Siempre', 229, NULL, NULL),
(517, 'Casi siempre', 229, NULL, NULL),
(518, 'A veces ', 229, NULL, NULL),
(519, 'Casi nunca', 229, NULL, NULL),
(520, 'Nunca', 229, NULL, NULL),
(521, 'Siempre', 230, NULL, NULL),
(522, 'Casi siempre', 230, NULL, NULL),
(523, 'A veces ', 230, NULL, NULL),
(524, 'Casi nunca', 230, NULL, NULL),
(525, 'Nunca', 230, NULL, NULL),
(526, 'Siempre', 231, NULL, NULL),
(527, 'Casi siempre', 231, NULL, NULL),
(528, 'A veces ', 231, NULL, NULL),
(529, 'Casi nunca', 231, NULL, NULL),
(530, 'Nunca', 231, NULL, NULL),
(531, 'Siempre', 232, NULL, NULL),
(532, 'Casi siempre', 232, NULL, NULL),
(533, 'A veces ', 232, NULL, NULL),
(534, 'Casi nunca', 232, NULL, NULL),
(535, 'Nunca', 232, NULL, NULL),
(536, 'Siempre', 233, NULL, NULL),
(537, 'Casi siempre', 233, NULL, NULL),
(538, 'A veces ', 233, NULL, NULL),
(539, 'Casi nunca', 233, NULL, NULL),
(540, 'Nunca', 233, NULL, NULL),
(541, 'Siempre', 234, NULL, NULL),
(542, 'Casi siempre', 234, NULL, NULL),
(543, 'A veces ', 234, NULL, NULL),
(544, 'Casi nunca', 234, NULL, NULL),
(545, 'Nunca', 234, NULL, NULL),
(546, 'Siempre', 235, NULL, NULL),
(547, 'Casi siempre', 235, NULL, NULL),
(548, 'A veces ', 235, NULL, NULL),
(549, 'Casi nunca', 235, NULL, NULL),
(550, 'Nunca', 235, NULL, NULL),
(551, 'Siempre', 236, NULL, NULL),
(552, 'Casi siempre', 236, NULL, NULL),
(553, 'A veces ', 236, NULL, NULL),
(554, 'Casi nunca', 236, NULL, NULL),
(555, 'Nunca', 236, NULL, NULL),
(556, 'Siempre', 237, NULL, NULL),
(557, 'Casi siempre', 237, NULL, NULL),
(558, 'A veces ', 237, NULL, NULL),
(559, 'Casi nunca', 237, NULL, NULL),
(560, 'Nunca', 237, NULL, NULL),
(561, 'Siempre', 238, NULL, NULL),
(562, 'Casi siempre', 238, NULL, NULL),
(563, 'A veces ', 238, NULL, NULL),
(564, 'Casi nunca', 238, NULL, NULL),
(565, 'Nunca', 238, NULL, NULL),
(566, 'Casi siempre', 239, NULL, NULL),
(567, 'A veces ', 239, NULL, NULL),
(568, 'Casi nunca', 239, NULL, NULL),
(569, 'Nunca', 239, NULL, NULL),
(570, 'Casi siempre', 240, NULL, NULL),
(571, 'A veces ', 240, NULL, NULL),
(572, 'Casi nunca', 240, NULL, NULL),
(573, 'Nunca', 240, NULL, NULL),
(574, 'Casi siempre', 241, NULL, NULL),
(575, 'A veces ', 241, NULL, NULL),
(576, 'Casi nunca', 241, NULL, NULL),
(577, 'Nunca', 241, NULL, NULL),
(578, 'Casi siempre', 242, NULL, NULL),
(579, 'A veces ', 242, NULL, NULL),
(580, 'Casi nunca', 242, NULL, NULL),
(581, 'Nunca', 242, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers_types`
--

DROP TABLE IF EXISTS `answers_types`;
CREATE TABLE IF NOT EXISTS `answers_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=554 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `answers_types`
--

INSERT INTO `answers_types` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(100, 'text default 100', 'Respuesta libre de 128 caracteres', NULL, NULL),
(101, 'text 101', 'Respuesta libre de 10 caracteres', NULL, NULL),
(102, 'text 102', 'Respuesta libre de 25 caracteres', NULL, NULL),
(105, 'text 105', 'Respuesta libre de 50 caracteres', NULL, NULL),
(110, 'text 110', 'Respuesta libre de 100 caracteres', NULL, NULL),
(120, 'text 120', 'Respuesta libre de 250 caracteres', NULL, NULL),
(150, 'text 150', 'Respuesta libre de 500 caracteres', NULL, NULL),
(200, 'text default optional 200', 'Respuesta libre opcional de 128 caracteres', NULL, NULL),
(201, 'text optional 201', 'Respuesta libre opcional de 10 caracteres', NULL, NULL),
(202, 'text optional 202', 'Respuesta libre opcional de 25 caracteres', NULL, NULL),
(205, 'text optional 205', 'Respuesta libre opcional de 50 caracteres', NULL, NULL),
(210, 'text optional 210', 'Respuesta libre opcional de 100 caracteres', NULL, NULL),
(220, 'text optional 220', 'Respuesta libre opcional de 250 caracteres', NULL, NULL),
(250, 'text optional 250', 'Respuesta libre opcional de 500 caracteres', NULL, NULL),
(300, 'multiple choice 300', 'Opcion multiple', NULL, NULL),
(350, 'multiple choice optional 350', 'Opcion multiple opcional', NULL, NULL),
(501, 'Int 501', 'Numero entero de 16 caracteres', NULL, NULL),
(502, 'Decimal 502', 'Numero decimal de 16 caracteres con 2 decimales', NULL, NULL),
(503, 'Date 503', 'Fecha', NULL, NULL),
(504, 'Hour 504', 'Hora', NULL, NULL),
(505, 'Date Time 505', 'Fecha y hora', NULL, NULL),
(506, 'Image 506', 'Imagen', NULL, NULL),
(507, 'audio 507', 'Audio', NULL, NULL),
(508, 'video 508', 'Video', NULL, NULL),
(553, 'Date 553', 'Fecha opcional', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forms`
--

DROP TABLE IF EXISTS `forms`;
CREATE TABLE IF NOT EXISTS `forms` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forms_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `forms`
--

INSERT INTO `forms` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Formato de entrevista', 'Formulario sobre Formato de entrevista', NULL, NULL),
(2, 'Formulario Hermanos', 'Formulario sobre tus hermanos, ordénalos de mayor a menor incluyéndote, si no tiene tantos hermanos solo llene los que tenga y baje a dar clic en \'Enviar respuestas\'', NULL, NULL),
(3, 'Economía familiar ', 'Formulario sobre la Economía familiar ', NULL, NULL),
(4, 'Realización de estudios ', 'Formulario sobre Realización de estudios ', NULL, NULL),
(5, 'Desajustes psicofisiológicos ', 'Formulario sobre Desajustes psicofisiológicos ', NULL, NULL),
(6, 'Áreas de Integración padres ', 'Formulario sobre las Áreas de Integración padres ', NULL, NULL),
(7, 'Áreas de Integración hermanos ', 'Formulario sobre las Áreas de Integración con hermanos ', NULL, NULL),
(8, 'Áreas de Integración familiares ', 'Formulario sobre Áreas de Integración familiares ', NULL, NULL),
(9, 'Área social ', 'Formulario sobre Área social ', NULL, NULL),
(10, 'Características personales (madurez y equilibrio) ', 'Formulario sobre Características personales (madurez y equilibrio) ', NULL, NULL),
(11, 'Área psicopedagógica ', 'Formulario sobre Área psicopedagógica ', NULL, NULL),
(12, 'Plan de vida y carrera ', 'Formulario sobre Plan de vida y carrera ', NULL, NULL),
(13, 'Características personales de... ', 'Formulario sobre Características personales de.. ', NULL, NULL),
(14, 'Encuesta para organización del estudio ', ' Instrucciones. La presente encuesta está formada por tres breves cuestionarios, en los cuales puedes indicar los problemas referentes a organización, técnicas y motivación en el estudio, que quizá perjudican tu rendimiento académico. Si contestas todas las preguntas con sinceridad y reflexión podrás identificar mucho de tus actuales defectos al estudiar. <br> Cada cuestionario contiene veinte preguntas, a las que se contestara con sí o no,  No hay respuestas \"Correctas\" o \"Incorrectas\", ya que la contestación adecuada es tu juicio sincero sobre tu modo de actuar y tus actitudes personales, respecto al estudio. Responde tan rápido como puedas, Pero sin caer en el descuido, y no dediques demasiado tiempo en una sola pregunta. No omitas ninguna de ellas', NULL, NULL),
(15, 'Encuesta sobre técnicas de estudio ', 'Instrucciones. La presente encuesta está formada por tres breves cuestionarios, en los cuales puedes indicar los problemas referentes a organización, técnicas y motivación en el estudio, que quizá perjudican tu rendimiento académico. Si contestas todas las preguntas con sinceridad y reflexión podrás identificar mucho de tus actuales defectos al estudiar. <br> Cada cuestionario contiene veinte preguntas, a las que se contestara con sí o no,  No hay respuestas \"Correctas\" o \"Incorrectas\", ya que la contestación adecuada es tu juicio sincero sobre tu modo de actuar y tus actitudes personales, respecto al estudio. Responde tan rápido como puedas, Pero sin caer en el descuido, y no dediques demasiado tiempo en una sola pregunta. No omitas ninguna de ellas', NULL, NULL),
(16, 'Encuesta sobre motivación para el estudio ', 'Instrucciones. La presente encuesta está formada por tres breves cuestionarios, en los cuales puedes indicar los problemas referentes a organización, técnicas y motivación en el estudio, que quizá perjudican tu rendimiento académico. Si contestas todas las preguntas con sinceridad y reflexión podrás identificar mucho de tus actuales defectos al estudiar. <br> Cada cuestionario contiene veinte preguntas, a las que se contestara con sí o no,  No hay respuestas \"Correctas\" o \"Incorrectas\", ya que la contestación adecuada es tu juicio sincero sobre tu modo de actuar y tus actitudes personales, respecto al estudio. Responde tan rápido como puedas, Pero sin caer en el descuido, y no dediques demasiado tiempo en una sola pregunta. No omitas ninguna de ellas', NULL, NULL),
(17, 'Test de autoestima ', 'Instrucciones: Realiza el siguiente test para evaluar y comprobar tu nivel de autoestima. Contesta con la mayo sinceridad posible a cada una de las siguientes preguntas eliguiente la respuesta que mas identifique con tu forma de pensar o de actuar. ', NULL, NULL),
(18, 'Test de asertividad ', 'Formulario sobre Test de asertividad ', NULL, NULL),
(19, 'Evaluación de la acción tutorial', 'Formulario sobre la Evaluación de la acción tutorial', NULL, NULL),
(20, 'Datos médicos ', 'Formulario sobre datos médicos  ', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `form_users`
--

DROP TABLE IF EXISTS `form_users`;
CREATE TABLE IF NOT EXISTS `form_users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_users_form_id_foreign` (`form_id`),
  KEY `form_users_user_id_foreign` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `majors`
--

DROP TABLE IF EXISTS `majors`;
CREATE TABLE IF NOT EXISTS `majors` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `initials` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `majors_name_unique` (`name`),
  UNIQUE KEY `majors_initials_unique` (`initials`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `majors`
--

INSERT INTO `majors` (`id`, `name`, `initials`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Arquitectura', 'ARQ', 'Carrera de Arquitectura', NULL, NULL),
(2, 'Contador Público', 'CP', 'Carrera de Contador Público', NULL, NULL),
(3, 'Ingeniería Bioquímica', 'IBQ', 'Carrera de Ingeniería Bioquímica', NULL, NULL),
(4, 'Ingeniería Electromecánica', 'IEM', 'Carrera de Ingeniería Electromecánica', NULL, NULL),
(5, 'Ingeniería en Ciencia de Datos', 'ICD', 'Carrera de Ingeniería en Ciencia de Datos', NULL, NULL),
(6, 'Ingeniería en Gestión Empresarial', 'IGE', 'Carrera de Ingeniería en Gestión Empresarial', NULL, NULL),
(7, 'Ingeniería en Sistemas Computacionales', 'ISC', 'Carrera de Ingeniería en Sistemas Computacionales', NULL, NULL),
(8, 'Licenciatura en Administración', 'LA', 'Carrera de Licenciatura en Administración', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '0001_01_01_000003_create_roles_table', 1),
(5, '0001_01_01_000004_add_role_id_to_users_table', 1),
(6, '0001_01_01_000005_create_majors_table', 1),
(7, '0001_01_01_000006_add_major_id_to_users_table', 1),
(8, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1),
(9, '2025_11_26_012707_create_forms_table', 1),
(10, '2025_11_26_024949_create_answers_types_table', 1),
(11, '2025_11_26_032302_create_questions_table', 1),
(12, '2025_11_26_035409_create_form_users_table', 1),
(13, '2025_11_26_040038_create_answers_options_table', 1),
(14, '2025_11_26_041447_create_answers_table', 1),
(15, '2025_11_26_043445_create_tutors_table', 1),
(16, '2025_11_26_043728_create_pupils_table', 1),
(17, '2025_11_26_043953_create_reunions_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pupils`
--

DROP TABLE IF EXISTS `pupils`;
CREATE TABLE IF NOT EXISTS `pupils` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `coment` text COLLATE utf8mb4_unicode_ci,
  `user_id` bigint UNSIGNED NOT NULL,
  `tutor_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pupils_user_id_foreign` (`user_id`),
  KEY `pupils_tutor_id_foreign` (`tutor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pupils`
--

INSERT INTO `pupils` (`id`, `coment`, `user_id`, `tutor_id`, `created_at`, `updated_at`) VALUES
(1, 'Student User', 3, 1, NULL, NULL),
(2, 'Ringo Star', 5, 2, NULL, NULL),
(3, 'Akane Tendo', 6, 2, NULL, NULL),
(4, 'Luis Miguel', 7, 2, NULL, NULL),
(5, 'Mon Laferte', 8, 2, NULL, NULL),
(6, 'Juan Gabriel', 10, 3, NULL, NULL),
(7, 'Stacy Campos', 11, 3, NULL, NULL),
(8, 'Eliza Diaz', 12, 3, NULL, NULL),
(9, 'Luisito Comunista', 13, 3, NULL, NULL),
(10, 'Randy Orton', 15, 4, NULL, NULL),
(11, 'Liv Morgan', 16, 4, NULL, NULL),
(12, 'David Bowie', 17, 4, NULL, NULL),
(13, 'Sarah Luebbert', 18, 4, NULL, NULL),
(14, 'Mary Jane', 20, 5, NULL, NULL),
(15, 'Gio Reynoso', 21, 5, NULL, NULL),
(16, 'Sol Villanueva', 22, 5, NULL, NULL),
(17, 'Gregoria Granados', 23, 5, NULL, NULL),
(18, 'Invader Lum', 25, 6, NULL, NULL),
(19, 'Ranma Saotome', 26, 6, NULL, NULL),
(20, 'Bruno Diaz', 27, 6, NULL, NULL),
(21, 'Padme Amidala', 28, 6, NULL, NULL),
(22, 'Andrea Castro', 30, 7, NULL, NULL),
(23, 'Guillermo Ochoa', 31, 7, NULL, NULL),
(24, 'Rodolfo El Xenomorfo', 32, 7, NULL, NULL),
(25, 'Peter Parker', 33, 7, NULL, NULL),
(26, 'Francisco Salinas', 35, 8, NULL, NULL),
(27, 'Alina Salinas', 36, 8, NULL, NULL),
(28, 'Linus Torvalds', 37, 8, NULL, NULL),
(29, 'Gabe Newell', 38, 8, NULL, NULL),
(30, 'Harry Potter', 40, 9, NULL, NULL),
(31, 'Dr. Who', 41, 9, NULL, NULL),
(32, 'Saul Goodman', 42, 9, NULL, NULL),
(33, 'Sydney Sweeney', 43, 9, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `form_id` bigint UNSIGNED NOT NULL,
  `answer_type_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questions_form_id_foreign` (`form_id`),
  KEY `questions_answer_type_id_foreign` (`answer_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`id`, `name`, `form_id`, `answer_type_id`, `created_at`, `updated_at`) VALUES
(1, 'Nombre completo', 1, 100, NULL, NULL),
(4, 'Estatura (metros)', 1, 502, NULL, NULL),
(5, 'Peso (kilos)', 1, 502, NULL, NULL),
(7, 'Fecha de Nacimiento', 1, 503, NULL, NULL),
(8, 'Sexo', 1, 300, NULL, NULL),
(9, 'Edad', 1, 501, NULL, NULL),
(10, 'Estado Civil', 1, 300, NULL, NULL),
(11, 'Trabaja', 1, 300, NULL, NULL),
(12, 'Lugar de Nacimiento', 1, 100, NULL, NULL),
(13, 'Domicilio Actual', 1, 100, NULL, NULL),
(14, 'Teléfono', 1, 501, NULL, NULL),
(15, 'Código Postal', 1, 501, NULL, NULL),
(16, 'E-Mail', 1, 100, NULL, NULL),
(17, 'Tipo de vivienda', 1, 300, NULL, NULL),
(18, 'La casa o departamento donde vives es', 1, 300, NULL, NULL),
(19, 'Numero de personas con las que vives (Parentesco)', 1, 501, NULL, NULL),
(20, 'Nombre del Padre', 1, 100, NULL, NULL),
(21, 'Edad (Padre)', 1, 501, NULL, NULL),
(22, 'Trabaja (Padre)', 1, 300, NULL, NULL),
(23, 'Tipo de Trabajo (Padre)', 1, 100, NULL, NULL),
(24, 'Domicilio (Padre)', 1, 100, NULL, NULL),
(25, 'Teléfono (Padre)', 1, 501, NULL, NULL),
(26, 'Nombre de la Madre', 1, 100, NULL, NULL),
(27, 'Edad (Madre)', 1, 501, NULL, NULL),
(28, 'Trabaja (Madre)', 1, 300, NULL, NULL),
(29, 'Tipo de Trabajo (Madre)', 1, 100, NULL, NULL),
(30, 'Domicilio (Madre)', 1, 100, NULL, NULL),
(31, 'Teléfono (Madre)', 1, 501, NULL, NULL),
(32, 'Nombre (1ro en Nacer)', 2, 200, NULL, NULL),
(33, 'Fecha de Nacimiento (1ro en Nacer)', 2, 553, NULL, NULL),
(34, 'Sexo (1ro en Nacer)', 2, 350, NULL, NULL),
(35, 'Estudios (1ro en Nacer)', 2, 350, NULL, NULL),
(36, 'Nombre (2do en Nacer)', 2, 200, NULL, NULL),
(37, 'Fecha de Nacimiento (2do en Nacer)', 2, 553, NULL, NULL),
(38, 'Sexo (2do en Nacer)', 2, 350, NULL, NULL),
(39, 'Estudios (2do en Nacer)', 2, 350, NULL, NULL),
(40, 'Nombre (3ro en Nacer)', 2, 200, NULL, NULL),
(41, 'Fecha de Nacimiento (3ro en Nacer)', 2, 553, NULL, NULL),
(42, 'Sexo (3ro en Nacer)', 2, 350, NULL, NULL),
(43, 'Estudios (3ro en Nacer)', 2, 350, NULL, NULL),
(44, 'Nombre (4to en Nacer)', 2, 200, NULL, NULL),
(45, 'Fecha de Nacimiento (4t en Nacer)', 2, 553, NULL, NULL),
(46, 'Sexo (4to en Nacer)', 2, 350, NULL, NULL),
(47, 'Estudios (4to en Nacer)', 2, 350, NULL, NULL),
(48, 'Nombre (5to en Nacer)', 2, 200, NULL, NULL),
(49, 'Fecha de Nacimiento (5to en Nacer)', 2, 553, NULL, NULL),
(50, 'Sexo (5to en Nacer)', 2, 350, NULL, NULL),
(51, 'Estudios (5to en Nacer)', 2, 350, NULL, NULL),
(52, '¿A cuánto ascienden los ingresos mensuales de tu familia?', 3, 502, NULL, NULL),
(53, 'En caso de ser económicamente independiente ¿a cuánto asciende tu ingreso?', 3, 502, NULL, NULL),
(54, 'Primaria', 4, 100, NULL, NULL),
(55, 'Secundaria', 4, 100, NULL, NULL),
(56, 'Bachillerato', 4, 100, NULL, NULL),
(57, 'Estudios Superiores', 4, 100, NULL, NULL),
(58, 'Manos y/o pies hinchados', 5, 300, NULL, NULL),
(59, 'Dolores en el vientre', 5, 300, NULL, NULL),
(60, 'Dolores de cabeza y/o vómitos', 5, 300, NULL, NULL),
(61, 'Pérdida del equilibrio', 5, 300, NULL, NULL),
(62, 'Fatiga y agotamiento', 5, 300, NULL, NULL),
(63, 'Pérdida de vista u oído', 5, 300, NULL, NULL),
(64, 'Dificultades para dormir', 5, 300, NULL, NULL),
(65, 'Pesadillas o terrores nocturnos a que:', 5, 300, NULL, NULL),
(66, 'Incontinencia (orina, heces)', 5, 300, NULL, NULL),
(67, 'Tartamudeos al explicarse', 5, 300, NULL, NULL),
(68, 'Miedos intensos ante cosas', 5, 300, NULL, NULL),
(69, '¿Cómo es la relación con tu familia?', 6, 100, NULL, NULL),
(70, '¿Existen dificultades?', 6, 300, NULL, NULL),
(71, '¿De qué tipo?', 6, 200, NULL, NULL),
(72, '¿Qué actitud tienes con tu familia?', 6, 100, NULL, NULL),
(73, '¿Cómo te relacionas con tu Padre?', 6, 100, NULL, NULL),
(74, '¿Qué actitud tienes hacia tu Padre?', 6, 100, NULL, NULL),
(75, '¿Cómo te relacionas con tu Madre?', 6, 100, NULL, NULL),
(76, '¿Qué actitud tienes hacia tu Madre?', 6, 100, NULL, NULL),
(77, 'Relación (Herman@ 1)', 7, 350, NULL, NULL),
(78, 'Actitud (Herman@ 1)', 7, 350, NULL, NULL),
(79, 'Relación (Herman@ 2)', 7, 350, NULL, NULL),
(80, 'Actitud (Herman@ 2)', 7, 350, NULL, NULL),
(81, 'Relación (Herman@ 3)', 7, 350, NULL, NULL),
(82, 'Actitud (Herman@ 3)', 7, 350, NULL, NULL),
(83, 'Relación (Herman@ 4)', 7, 350, NULL, NULL),
(84, 'Actitud (Herman@ 4)', 7, 350, NULL, NULL),
(85, 'Relación (Herman@ 5)', 7, 350, NULL, NULL),
(86, 'Actitud (Herman@ 5)', 7, 350, NULL, NULL),
(87, '¿Con quién te sientes más ligado afectivamente?', 8, 300, NULL, NULL),
(88, 'Especificar por qué', 8, 100, NULL, NULL),
(89, '¿Quién se ocupa más directamente de tu educación?', 8, 300, NULL, NULL),
(90, '¿Quién ha influido más en tu decisión para estudiar esta carrera?', 8, 100, NULL, NULL),
(91, 'Consideras importante facilitar algún otro dato sobre tu ambiente familiar', 8, 100, NULL, NULL),
(92, '¿Cómo es tu relación con los compañeros?', 9, 300, NULL, NULL),
(93, '¿Por qué?', 9, 100, NULL, NULL),
(94, '¿Cómo es tu relación con tus amigos?', 9, 300, NULL, NULL),
(95, '¿Tienes pareja?', 9, 300, NULL, NULL),
(96, '¿Cómo es tu relación con tu pareja?', 9, 350, NULL, NULL),
(97, '¿Cómo es tu relación con las autoridades académicas?', 9, 300, NULL, NULL),
(98, '¿Qué haces en tu tiempo libre?', 9, 100, NULL, NULL),
(99, '¿Cuál es tu actividad recreativa?', 9, 100, NULL, NULL),
(100, 'Puntual', 10, 300, NULL, NULL),
(101, 'Tímido/a', 10, 300, NULL, NULL),
(102, 'Alegre', 10, 300, NULL, NULL),
(103, 'Agresivo/a', 10, 300, NULL, NULL),
(104, 'Abierto/a a las ideas de otros', 10, 300, NULL, NULL),
(105, 'Reflexivo/a', 10, 300, NULL, NULL),
(106, 'Constante', 10, 300, NULL, NULL),
(107, 'Optimista', 10, 300, NULL, NULL),
(108, 'Impulsivo/a', 10, 300, NULL, NULL),
(109, 'Silencioso/a', 10, 300, NULL, NULL),
(110, 'Generoso/a', 10, 300, NULL, NULL),
(111, 'Inquieto/a', 10, 300, NULL, NULL),
(112, 'Cambios de humor ', 10, 300, NULL, NULL),
(113, 'Dominante', 10, 300, NULL, NULL),
(114, 'Egoísta', 10, 300, NULL, NULL),
(115, 'Sumiso/a', 10, 300, NULL, NULL),
(116, 'Confiado/a en si mismo/a', 10, 300, NULL, NULL),
(117, 'Imaginativo/a', 10, 300, NULL, NULL),
(118, 'Con iniciativa propia', 10, 300, NULL, NULL),
(119, 'Sociable', 10, 300, NULL, NULL),
(120, 'Responsable', 10, 300, NULL, NULL),
(121, 'Perseverante', 10, 300, NULL, NULL),
(122, 'Motivado/a', 10, 300, NULL, NULL),
(123, 'Activo/a', 10, 300, NULL, NULL),
(124, 'Independiente', 10, 300, NULL, NULL),
(125, '¿Cómo te gustaría ser?', 11, 100, NULL, NULL),
(126, '¿Recibes ayuda en tu casa para la realización de tareas escolares?', 11, 300, NULL, NULL),
(127, '¿Qué problemas personales intervienen en tus estudios?', 11, 100, NULL, NULL),
(128, '¿Cuál es tu rendimiento escolar?', 11, 300, NULL, NULL),
(129, 'Menciona las asignaturas que cursas en el semestre actual.', 11, 100, NULL, NULL),
(130, '¿Cuál es tu asignatura preferida? ¿Por qué?', 11, 100, NULL, NULL),
(131, '¿Cuál es la asignatura en la que sobresales? ¿Por qué?', 11, 100, NULL, NULL),
(132, '¿Qué asignatura te desagrada? ¿Por qué?', 11, 100, NULL, NULL),
(133, '¿Cuál es tu asignatura con más bajo promedio del semestre anterior? ¿Por qué?', 11, 100, NULL, NULL),
(134, '¿Por qué vienes al Tecnológico?', 11, 100, NULL, NULL),
(135, '¿Para qué vienes al Tecnológico?', 11, 100, NULL, NULL),
(136, '¿Qué te motiva para venir al Tecnológico?', 11, 100, NULL, NULL),
(137, '¿Cuál es tu promedio general del ciclo anterior?', 11, 502, NULL, NULL),
(138, '¿Tienes asignaturas reprobadas?', 11, 300, NULL, NULL),
(139, '¿Cuales?', 11, 200, NULL, NULL),
(140, '¿Cuáles son tus planes inmediatos?', 12, 100, NULL, NULL),
(141, '¿Cuáles son tus metas en la vida?', 12, 100, NULL, NULL),
(143, 'Yo soy...', 13, 100, NULL, NULL),
(144, 'Mi carácter es...', 13, 100, NULL, NULL),
(145, 'A mí me gusta que...', 13, 100, NULL, NULL),
(146, 'Yo aspiro en la vida...', 13, 100, NULL, NULL),
(147, 'Yo tengo miedo que...', 13, 100, NULL, NULL),
(148, 'Pero pienso que podré lograr...', 13, 100, NULL, NULL),
(149, '¿Sueles dejar para el último la preparación de tus trabajos?', 14, 300, NULL, NULL),
(150, '¿Crees que el sueño o el cansancio te impidan estudiar eficazmente en muchas ocasiones?', 14, 300, NULL, NULL),
(153, '¿Es frecuente que no termines tu tarea a tiempo?', 14, 300, NULL, NULL),
(154, '¿Tienes a emprear tiempo en leer revistas, ver televisión o charlar cuando debieras dedicarlos a estudiar?', 14, 300, NULL, NULL),
(155, 'Tus actividades sociales o deportivas. ¿Te llevan a descuidar, a menudo, tus tareas escolares?', 14, 300, NULL, NULL),
(156, '¿Sueles dejar pasar un dia o más antes de repasarlos apuntes tomados en clase?', 14, 300, NULL, NULL),
(157, '¿Sueles dedicar tu tiempo libre entre las 4:00 de la tarde y las 9:00 de la noche a otras actividades que no sean estudiar?', 14, 300, NULL, NULL),
(158, '¿Descubres algunas veces de pronto, que debes entregar una tarea antes de lo que creías?', 14, 300, NULL, NULL),
(159, '¿Te retrasas, con frecuencia, en una asignatura debido a que tienes que estudiar otra?', 14, 300, NULL, NULL),
(160, '¿Te parece que tu rendimiento es muy bajo, en relación con el tiempo que dedicas al estudio?', 14, 300, NULL, NULL),
(161, '¿Está situado tu escritorio directamente en frente a una ventana, puerta u otra fuente de distracción?', 14, 300, NULL, NULL),
(162, '¿Sueles tener fotografía, trofeos o recuerdos sobre tu mesa de cómodo?', 14, 300, NULL, NULL),
(163, '¿Sueles estudiar recostado en la cama o arrellanado en un asiento cómodo?', 14, 300, NULL, NULL),
(164, '¿Produce resplandor la lámpara que utilizas al estudiar?', 14, 300, NULL, NULL),
(165, 'Tu mesa de estudio ¿está tan desordenada y llena de objetos, que no dispones de sitio suficiente para estudiar con eficacia?', 14, 300, NULL, NULL),
(166, '¿Sueles interrumpir tu estudio, por personas que vienen a visitarte?', 14, 300, NULL, NULL),
(167, '¿Estudias, con frecuencia, mientras tienes puesta la televisión y/o la radio?', 14, 300, NULL, NULL),
(168, 'En el lugar donde estudias, ¿se pueden ver con facilidad revistas, fotos de jóvenes o materiales pertenecientes a tu afición?', 14, 300, NULL, NULL),
(169, '¿Con frecuencia, interrumpen tu estudio, actividades o ruidos que provienen del exterior?', 14, 300, NULL, NULL),
(170, '¿Sueles hacerse lento tu estudio debido a que no tienes a la mano los libros y los materiales necesarios?', 14, 300, NULL, NULL),
(171, '¿Tiendes a comenzar la lectura de un libro de texto sin hojear previamente los subtítulos y las ilustraciones?', 15, 300, NULL, NULL),
(172, '¿Te saltas por lo general las figuras, gráficas y tablas cuando estudias un tema?', 15, 300, NULL, NULL),
(173, '¿Suele serte difícil seleccionar los puntos de los temas de estudio?', 15, 300, NULL, NULL),
(174, '¿Te sorprendes con cierta frecuencia, pensando en algo que no tiene nada que ver con lo que estudias?', 15, 300, NULL, NULL),
(175, '¿Sueles tener dificultad en entender tus apuntes de clase cuando tratas de repasarlos, después de cierto tiempo?', 15, 300, NULL, NULL),
(176, 'Al tomar notas, ¿te sueles quedar atrás con frecuencia debido a que no puedes escribir con suficiente rapidez?', 15, 300, NULL, NULL),
(177, 'Poco después de comenzar un curso, ¿sueles encontrarte con tus apuntes formando un \"revoltijo\"?', 15, 300, NULL, NULL),
(178, '¿Tomas normalmente tus apuntes tratando de escribir las palabras exactas del docente?', 15, 300, NULL, NULL),
(179, 'Cuando tomas notas de un libro, ¿tienes la costumbre de copiar el material necesario, palabra por Palabra?', 15, 300, NULL, NULL),
(180, '¿Te es difícil preparar un temario de una evaluación formulas un resumen de este?', 15, 300, NULL, NULL),
(181, '¿Tienes problemas para organizar los datos o el contenido de un evaluación?', 15, 300, NULL, NULL),
(182, '¿Al repasar el temario de una evaluación formulas un resumen de este?', 15, 300, NULL, NULL),
(183, '¿Te preparas a veces para una evaluación memorizando fórmulas, definiciones o reglas que no entiendes con claridad?', 15, 300, NULL, NULL),
(184, '¿Te resulta difícil decidir qué estudiar y cómo estudiarlo cuando preparas un evaluación?', 15, 300, NULL, NULL),
(185, '¿Sueles tener dificultades para organizar, en un orden lógico, las asignaturas que debes estudiar por temas?', 15, 300, NULL, NULL),
(186, 'Al preparar evaluación, ¿sueles estudiar toda la asignatura, en el último momento?', 15, 300, NULL, NULL),
(187, '¿Sueles entregar tus exámenes sin revisarlos detenidamente, para ver si tienen algún error cometido por descuido?', 15, 300, NULL, NULL),
(188, '¿Te es posible con frecuencia terminar una evaluación de exposición de un tema en el tiempo prescrito?', 15, 300, NULL, NULL),
(189, '¿Sueles perder puntos en exámenes con preguntas de \"Verdadero - Falso, debido a que no lees determinante?', 15, 300, NULL, NULL),
(190, '¿Empleas normalmente mucho tiempo en contestar la primera mitad de la prueba y tienes que apresurarte en la segunda?', 15, 300, NULL, NULL),
(191, 'Después de los primeros días o semanas del curso, ¿tiendes a perder interés por el estudio?', 16, 300, NULL, NULL),
(192, '¿Crees que en general, basta estudiar lo necesario para obtener un \"aprobado\" en las asignaturas.', 16, 300, NULL, NULL),
(195, '¿Te sientes frecuentemente confuso o indeciso sobre cuáles deben ser tus metas formativas y profesionales?', 16, 300, NULL, NULL),
(196, '¿Sueles pensar que no vale la pena el tiempo y el esfuerzo que son necesarios para lograr una educación universitaria? ', 16, 300, NULL, NULL),
(197, '¿Crees que es más importante divertirte y disfrutar de la vida, que estudiar?', 16, 300, NULL, NULL),
(198, '¿Sueles pasar el tiempo de clase en divagaciones o soñando despierto en lugar de atender al docente?', 16, 300, NULL, NULL),
(199, '¿Te sientes habitualmente incapaz de concentrarte en tus estudios debido a que estas inquieto, aburrido o de mal humor?', 16, 300, NULL, NULL),
(200, '¿Piensas con frecuencia que las asignaturas que estudias tienen poco valor practico para ti?', 16, 300, NULL, NULL),
(201, '¿Sientes, frecuentes deseos de abandonar la escuela y conseguir un trabajo?', 16, 300, NULL, NULL),
(202, '¿Sueles tener la sensación de lo que se enseña en los centros docentes no te prepara para afrontar los problemas de la vida adulta?', 16, 300, NULL, NULL),
(203, '¿Sueles dedicarte a modo casual, según el estado de ánimo en que te encuentres?', 16, 300, NULL, NULL),
(204, '¿Te horroriza estudiar libros de textos porque son insípidos y aburridos?', 16, 300, NULL, NULL),
(205, '¿Esperas normalmente a que te fijen la fecha de un evaluación para comenzar a estudiar los textos o repasar tus apuntes de clases?', 16, 300, NULL, NULL),
(206, '¿Sueles pensar que los exámenes son pruebas penosas de las que no se puede escapar y respecto a las cuales lo que debe hacerse es sobrevivir, del modo que sea?', 16, 300, NULL, NULL),
(207, '¿Sientes con frecuencia que tus docentes no comprenden las necesidades de los estudiantes?', 16, 300, NULL, NULL),
(208, '¿Tienes normalmente la sensación de que tus docentes exigen demasiadas horas de estudio fuera de clase?', 16, 300, NULL, NULL),
(209, '¿Dudas por lo general, en pedir ayuda a tus docentes en tareas que te son difíciles?', 16, 300, NULL, NULL),
(210, '¿Sueles pensar que tus docentes no tienen contacto con los temas y sucesos de actualidad?', 16, 300, NULL, NULL),
(211, '¿Te sientes reacio, por lo general, a hablar con tus docentes de tus proyectos futuros, de estudio o profesionales?', 16, 300, NULL, NULL),
(212, '¿Criticas con frecuencia a tus docentes cuando charlas con tus compañeros?', 16, 300, NULL, NULL),
(213, 'A la hora de tomar decisiones en tu vida, como proponer cosas nuevas en el trabajo, iniciar alguna actividad de ocio, o elegir un color nuevo para pintar tu casa, ¿sueles buscar la aprobación o el apoyo de las personas que te rodean?', 17, 300, NULL, NULL),
(214, 'Imagina que estás en una reunión social o familiar importante; adviertes que 110 vas vestido para la ocasión y que desentonas con los demás, ¿cómo te comportas?', 17, 300, NULL, NULL),
(215, 'Tienes muchas ganas de irte a comprar ropa y le pides a algún amigo que te acompañe. Esta persona es más alta y más atractiva que tú, y todo lo que se prueba le queda mucho mejor que a ti.', 17, 300, NULL, NULL),
(216, 'Un día conoces a alguien nuevo y muy interesante, estas charlando animadamente y llega el momento de hablar de ti, ¿cuál de las siguientes opciones mejor se ajusta a lo que cuentas?', 17, 300, NULL, NULL),
(217, 'En tu lugar de trabajo o de estudios, se está explicando algo que es completamente nuevo para ti. Llega un momento en que te das cuenta que no has entendido casi nada ¿qué haces?', 17, 300, NULL, NULL),
(218, 'Tener un trabajo bien remunerado y que nos guste es algo difícil de conseguir, si tuvieras que valorar tu empleo o situación laboral, ¿cómo la definirías?', 17, 300, NULL, NULL),
(219, 'Has tenido un día duro, has trabajado con más ahínco para finalizar una tarea en la oficina, has hecho toda las gestiones que tenías pendientes, has resuelto un par de problemas doméstivos y encima le has hecho un favor a un amigo. ¿Qué haces al llegar a ', 17, 300, NULL, NULL),
(220, 'En tu trabajo están buscando a una persona que represente a la empresa en un consurso del ramo. Piden una persona que cumplia unos requisitos, entre ellos, explicar bien vuestro trabajo y que haga una demostración práctica del mismo.', 17, 300, NULL, NULL),
(221, '¿Con cuál de las siguientes frases sobre la buena fortuna estás más de acuerdo?', 17, 300, NULL, NULL),
(222, 'En una fiesta en la que no conoces a nadie excepto a los anfitriones, te presentan a un grupo de personas de aspecto interesante. ¿Cuál es tu actitud?', 17, 300, NULL, NULL),
(223, 'En una reunión dificil, con un ambiente caldeado, soy capaz de hablar de confianza.', 18, 300, NULL, NULL),
(224, 'Si no estoy segura de una cosa, puedo pedir ayuda fácilmente.', 18, 300, NULL, NULL),
(225, 'Si alguna persona es injusta y agresiva, puedo controlar la situación con confianza.', 18, 300, NULL, NULL),
(226, 'Si alguna persona se muestra irónica conmigo o con otras, puedo responder sin agresividad.', 18, 300, NULL, NULL),
(227, 'Si creo que se está abusando de mi, soy capaz de denunciarlo sin alterarme.', 18, 300, NULL, NULL),
(228, 'Si alguna persona me pide permiso para hacer algo que no me gusta, por ejemplo, fumar, puedo decirle que no sin sentirme culpable.', 18, 300, NULL, NULL),
(229, 'Si alguna persona pide mi opinión sobre alguna cosa me siento bien dádosela, aunque no concuerde con la de los demás.', 18, 300, NULL, NULL),
(230, 'Puedo conectar fácil y efectivamente con personas que considero importantes.', 18, 300, NULL, NULL),
(231, 'Cuando encuentro defectos en una tienda o restaurante, soy capaz de exponerlos sin atacar a las otras personas y sin sentirme mal.', 18, 300, NULL, NULL),
(232, 'Tengo toda la información necesaria sobre el programa de tutoría de mi plantel.', 19, 300, NULL, NULL),
(233, 'Tengo todas las facilidades en mi departamento para ejercer el programa de tutoria.', 19, 300, NULL, NULL),
(234, 'Si no entiendo algún problema de mis tutorados lo canalizo a la instancia correspondient fácilmente.', 19, 300, NULL, NULL),
(235, 'Tengo a la mano los instrumentos necesarios para identificar las necesidades de tutoría de mis tutorados.', 19, 300, NULL, NULL),
(236, 'La programación de asignaturas en la carrera de mis tutorados les permite asistir a las actividades de apoyo y/o cursos de mejora programados.', 19, 300, NULL, NULL),
(237, 'Tengo buena comunicación y relaciones interpersonales con mis tutorados.', 19, 300, NULL, NULL),
(238, 'Tengo buena comunicación con la coordinación de tutoría.', 19, 300, NULL, NULL),
(239, 'El tiempo que tengo para preparar mis actividades tutoriales es suficiente.', 19, 300, NULL, NULL),
(240, 'El espacio donde llevo a cabo la actividad tutorial es agradable y poseetodos los requerimientos necesarios.', 19, 300, NULL, NULL),
(241, 'He recibido la capacitación necesaria para ejercer la tutoría.', 19, 300, NULL, NULL),
(242, 'En mi plantel existe la actualización permanente en cuanto al programa de tuotoría.', 19, 300, NULL, NULL),
(243, 'Comentarios.', 19, 100, NULL, NULL),
(244, '¿Tienes o has tenido alguna deficiencia sensorial o funcional que te obligue a llevar aparatos o controlar tu actividad física, forma de vida? (vista, oído, movimiento, lenguaje, etc. ) ¿Cuál? ', 20, 100, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reunions`
--

DROP TABLE IF EXISTS `reunions`;
CREATE TABLE IF NOT EXISTS `reunions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pupil_id` bigint UNSIGNED NOT NULL,
  `tutor_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reunions_pupil_id_foreign` (`pupil_id`),
  KEY `reunions_tutor_id_foreign` (`tutor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2026-04-30 13:14:42', '2026-04-30 13:14:42'),
(2, 'tutor', '2026-04-30 13:14:42', '2026-04-30 13:14:42'),
(3, 'student', '2026-04-30 13:14:42', '2026-04-30 13:14:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutors`
--

DROP TABLE IF EXISTS `tutors`;
CREATE TABLE IF NOT EXISTS `tutors` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tutors_user_id_foreign` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tutors`
--

INSERT INTO `tutors` (`id`, `description`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Tutor User', 2, NULL, NULL),
(2, 'Arqui Juve', 4, NULL, NULL),
(3, 'Peña Nieto', 9, NULL, NULL),
(4, 'Paula Castro', 14, NULL, NULL),
(5, 'Gerardo Dominguez', 19, NULL, NULL),
(6, 'Obi Wan Kenobi', 24, NULL, NULL),
(7, 'Henry Martin', 29, NULL, NULL),
(8, 'Alan Turing', 34, NULL, NULL),
(9, 'Sid Meier', 39, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `control_number` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role_id` bigint UNSIGNED NOT NULL DEFAULT '3',
  `major_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_control_number_unique` (`control_number`),
  KEY `users_role_id_foreign` (`role_id`),
  KEY `users_major_id_foreign` (`major_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `control_number`, `picture`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`, `role_id`, `major_id`) VALUES
(1, 'Admin User', '1111111', NULL, 'admin@user.com', NULL, '$2y$12$gpniwLgxE3uhqrTDlVc6tOw6xZDqaUlYR6soTewkCSdJnkArxCxWe', NULL, NULL, NULL, NULL, '2026-04-30 13:14:42', '2026-04-30 13:14:42', 1, 7),
(2, 'Tutor User', '2222222', NULL, 'tutor@user.com', NULL, '$2y$12$pjYqY06zW5Z67e/Ls1B1oejytMZNE5d.uBXJ/JT.RZd/LRBn/3bWG', NULL, NULL, NULL, NULL, '2026-04-30 13:14:42', '2026-04-30 13:14:42', 2, 7),
(3, 'Student User', '3333333', NULL, 'Student@user.com', NULL, '$2y$12$ktVakQ9vC.CCeZjipAF2eeQAiVb4cUw4TVu8GR0sDSUg7HeFC92Oy', NULL, NULL, NULL, NULL, '2026-04-30 13:14:43', '2026-04-30 13:14:43', 2, 7),
(4, 'Arqui Juve', '2618882', NULL, 'juve@user.com', NULL, '$2y$12$3mkKKQ1UbRTObzNN0wU0Te9MwNr/7nTXDhtFugfVnNDb5jyDOZKXS', NULL, NULL, NULL, NULL, '2026-04-30 13:14:43', '2026-04-30 13:14:43', 2, 1),
(5, 'Ringo Star', '2623680', NULL, 'ringo@user.com', NULL, '$2y$12$kWVNEF8ckKkc1dcWVpfJzeVdv9NpceQTA2i8ggxGn4OadkAcTCi66', NULL, NULL, NULL, NULL, '2026-04-30 13:14:43', '2026-04-30 13:14:43', 3, 1),
(6, 'Akane Tendo', '2614966', NULL, 'akane@user.com', NULL, '$2y$12$G5.MkkuUySnZ/01Uts1Jxeyy0xjOesFlt7xKXzTSMCbtxG7SciCMa', NULL, NULL, NULL, NULL, '2026-04-30 13:14:43', '2026-04-30 13:14:43', 3, 1),
(7, 'Luis Miguel', '2627419', NULL, 'luis@user.com', NULL, '$2y$12$Qw5PkEoHdc8mX6jbEXI0b.d94mNMfbD.hLpPL1LE7pzRBZ2WfTpM6', NULL, NULL, NULL, NULL, '2026-04-30 13:14:44', '2026-04-30 13:14:44', 3, 1),
(8, 'Mon Laferte', '2646313', NULL, 'mon@user.com', NULL, '$2y$12$A5iyfhRDlRj039Ql/EEQw..cyUVwwey9mzSCuHOXpy4z1pVykpCua', NULL, NULL, NULL, NULL, '2026-04-30 13:14:44', '2026-04-30 13:14:44', 3, 1),
(9, 'Peña Nieto', '2641364', NULL, 'nieto@user.com', NULL, '$2y$12$1h.h9D1kmVPI3ABXynpf0uRMoTOiyY0avCkjAOquToe4QLLzqY77O', NULL, NULL, NULL, NULL, '2026-04-30 13:14:44', '2026-04-30 13:14:44', 2, 2),
(10, 'Juan Gabriel', '2617779', NULL, 'juan@user.com', NULL, '$2y$12$HESBW61yE/DeyVMcdwzf3.IbBeDK6C.pV036zhf9myqRBcV9fN9KS', NULL, NULL, NULL, NULL, '2026-04-30 13:14:44', '2026-04-30 13:14:44', 3, 2),
(11, 'Stacy Campos', '2632009', NULL, 'stacy@user.com', NULL, '$2y$12$qD1HLaqjjYng36y2kDhbUenmFJIwZitOTUiIMs.3aGqrPzn7yV3Si', NULL, NULL, NULL, NULL, '2026-04-30 13:14:45', '2026-04-30 13:14:45', 3, 2),
(12, 'Eliza Diaz', '2681370', NULL, 'eliza@user.com', NULL, '$2y$12$oY0QoCwk.j3O.s5H79HLuO2eFUcvSg1i4CEf4HuQnlShENF1lUlqK', NULL, NULL, NULL, NULL, '2026-04-30 13:14:45', '2026-04-30 13:14:45', 3, 2),
(13, 'Luisito Comunista', '2624628', NULL, 'luisito@user.com', NULL, '$2y$12$9DIlp2GY.CftT.s6xWhKMuQU4NQ3m2MVjDM1jb/Hfp3I5fne1O9Ey', NULL, NULL, NULL, NULL, '2026-04-30 13:14:45', '2026-04-30 13:14:45', 3, 2),
(14, 'Paula Castro', '2682937', NULL, 'paula@user.com', NULL, '$2y$12$YffGSNv6pwnrVVLWMUfFeurDW9G4SlYhZf.TguJSwKU8AH29yU/E2', NULL, NULL, NULL, NULL, '2026-04-30 13:14:45', '2026-04-30 13:14:45', 2, 3),
(15, 'Randy Orton', '2685577', NULL, 'randy@user.com', NULL, '$2y$12$T6H3yYkYg5GEB/m85/s3e.zXuTw.ym9NZgkFxQWVUKaDdZXxLS2Zu', NULL, NULL, NULL, NULL, '2026-04-30 13:14:45', '2026-04-30 13:14:45', 3, 3),
(16, 'Liv Morgan', '2672522', NULL, 'liv@user.com', NULL, '$2y$12$y8YsG24zqwSgnFabGYCvwOrFeqjYkROGzWbjVFPRzgIlN/FKFBaDS', NULL, NULL, NULL, NULL, '2026-04-30 13:14:46', '2026-04-30 13:14:46', 3, 3),
(17, 'David Bowie', '2676047', NULL, 'david@user.com', NULL, '$2y$12$azRDq7NkPWZOqj4/ufb9Q.HguzIPYlkleWmhQeeCaKkNFvkvR0XDq', NULL, NULL, NULL, NULL, '2026-04-30 13:14:46', '2026-04-30 13:14:46', 3, 3),
(18, 'Sarah Luebbert', '2634294', NULL, 'sara@user.com', NULL, '$2y$12$rU0uTm9WdfjRI/o11hugA.6Q.0DQaX0vhWCR3MLaDFxw2YyLKLQjm', NULL, NULL, NULL, NULL, '2026-04-30 13:14:46', '2026-04-30 13:14:46', 3, 3),
(19, 'Gerardo Dominguez', '2634481', NULL, 'gerardo@user.com', NULL, '$2y$12$bU/QWaol175NBPcgLTo/1.zrLz0fPMakXfzG7xXcHmAE7aXCTFet2', NULL, NULL, NULL, NULL, '2026-04-30 13:14:46', '2026-04-30 13:14:46', 2, 4),
(20, 'Mary Jane', '2633609', NULL, 'mary@user.com', NULL, '$2y$12$FKn3gGqm.MVsKr3MeHPsSOUPcGk2xtKS28djgZB8VqYv8brXW8eVy', NULL, NULL, NULL, NULL, '2026-04-30 13:14:47', '2026-04-30 13:14:47', 3, 4),
(21, 'Gio Reynoso', '2629474', NULL, 'gio@user.com', NULL, '$2y$12$63RWHKxWM7nyurkI5QeOHehsXY2vqVTULud2kZTOUeH3FwDur4MBe', NULL, NULL, NULL, NULL, '2026-04-30 13:14:47', '2026-04-30 13:14:47', 3, 4),
(22, 'Sol Villanueva', '2629615', NULL, 'sol@user.com', NULL, '$2y$12$aEKHNhxQmEZdb1iqRCEdxOQ1vmVyNI8uTxVznSUTvG41WQVdpJGT6', NULL, NULL, NULL, NULL, '2026-04-30 13:14:47', '2026-04-30 13:14:47', 3, 4),
(23, 'Gregoria Granados', '2678301', NULL, 'gregoria@user.com', NULL, '$2y$12$jzpMDBWAhcHatblByxqVr.lrYrEZX3c8d0xVRXSIgOspKPjWvQ6Ka', NULL, NULL, NULL, NULL, '2026-04-30 13:14:47', '2026-04-30 13:14:47', 3, 4),
(24, 'Obi Wan Kenobi', '2673942', NULL, 'obi@user.com', NULL, '$2y$12$szo4x5N17tYyxJ.lfT58zeI81.tPjI6oyjz4Dd28UdKeSlnLQi2Iq', NULL, NULL, NULL, NULL, '2026-04-30 13:14:48', '2026-04-30 13:14:48', 2, 5),
(25, 'Invader Lum', '2660873', NULL, 'lum@user.com', NULL, '$2y$12$WpeWU/V7VeYAVL1SF0A2WeAGSSQqPc6FuzWlVwxir0pswCowVVdw.', NULL, NULL, NULL, NULL, '2026-04-30 13:14:48', '2026-04-30 13:14:48', 3, 5),
(26, 'Ranma Saotome', '2647734', NULL, 'ranma@user.com', NULL, '$2y$12$WKoXqtPGGSPswf7zh3Kew.gXEHM4GVW0mG71k4xUhZutJY9zWzoVS', NULL, NULL, NULL, NULL, '2026-04-30 13:14:48', '2026-04-30 13:14:48', 3, 5),
(27, 'Bruno Diaz', '2659552', NULL, 'bruno@user.com', NULL, '$2y$12$h7VDyOD9Bt2/wvMdRbwe6ePM8ZERQNxh5Jd1jWltFVFPPfCpj7H/C', NULL, NULL, NULL, NULL, '2026-04-30 13:14:48', '2026-04-30 13:14:48', 3, 5),
(28, 'Padme Amidala', '2621076', NULL, 'paula2@user.com', NULL, '$2y$12$u67rP.V0VZYftNlkt6irTu6RjfxK6Q0Pcef0C7CfrvGwp6LfYr4aW', NULL, NULL, NULL, NULL, '2026-04-30 13:14:48', '2026-04-30 13:14:48', 3, 5),
(29, 'Henry Martin', '2681719', NULL, 'henry@user.com', NULL, '$2y$12$wpCl6aX1XWAUs.lbb6PZUeZlPdeQMdGZRxisPPd21Epa/e.JbpG46', NULL, NULL, NULL, NULL, '2026-04-30 13:14:49', '2026-04-30 13:14:49', 2, 6),
(30, 'Andrea Castro', '2675875', NULL, 'andrea@user.com', NULL, '$2y$12$Jzm5MTN2hW9G2sLitxyy3OB5lVuc5gQpReecHeYn9mrcH2T3J8WhK', NULL, NULL, NULL, NULL, '2026-04-30 13:14:49', '2026-04-30 13:14:49', 3, 6),
(31, 'Guillermo Ochoa', '2646504', NULL, 'ochoa@user.com', NULL, '$2y$12$TnecQaCJhoRa5ZvON7gmlecgsiR.RojSUHPFvVo/KxZ.CBJm/6742', NULL, NULL, NULL, NULL, '2026-04-30 13:14:49', '2026-04-30 13:14:49', 3, 6),
(32, 'Rodolfo El Xenomorfo', '2617860', NULL, 'rodolfo@user.com', NULL, '$2y$12$wi96aAvpXaca/qbgILW/COnD0a.A5N83DjZoOU87IrwUzifKGdSb2', NULL, NULL, NULL, NULL, '2026-04-30 13:14:49', '2026-04-30 13:14:49', 3, 6),
(33, 'Peter Parker', '2627132', NULL, 'peter@user.com', NULL, '$2y$12$S60pEzaCbRPinOAKLTc7jO01g1ck78yJvlQRanpKnFDWAfgpEPDGm', NULL, NULL, NULL, NULL, '2026-04-30 13:14:50', '2026-04-30 13:14:50', 3, 6),
(34, 'Alan Turing', '2673690', NULL, 'alan@user.com', NULL, '$2y$12$v53m5xPxSzLy0ktycILU/ur8mUu6FzemzUgciQWC6KADewL4OEvQG', NULL, NULL, NULL, NULL, '2026-04-30 13:14:50', '2026-04-30 13:14:50', 2, 7),
(35, 'Francisco Salinas', '2695514', NULL, 'francisco@user.com', NULL, '$2y$12$XvWlrS2F5A.IrGt2iaFyNunQKsrfR/nXGdz/5ijawA0Iv0hqx7fAu', NULL, NULL, NULL, NULL, '2026-04-30 13:14:50', '2026-04-30 13:14:50', 3, 7),
(36, 'Alina Salinas', '2669233', NULL, 'alina@user.com', NULL, '$2y$12$h.Jsmo/9YyXTApo6xTahT.mwOgrqe2NC33W2.opf86Mze1ABosAGG', NULL, NULL, NULL, NULL, '2026-04-30 13:14:50', '2026-04-30 13:14:50', 3, 7),
(37, 'Linus Torvalds', '2626077', NULL, 'linus@user.com', NULL, '$2y$12$sMA7egzGF9zzPlKNK1ULC.yVKHOxHa2NWkDKcNKMH8V/E6nhk8YWC', NULL, NULL, NULL, NULL, '2026-04-30 13:14:51', '2026-04-30 13:14:51', 3, 7),
(38, 'Gabe Newell', '2620253', NULL, 'steam@user.com', NULL, '$2y$12$zoJCseEHdbPmzDvBt2hHj.VtaK1K3SIYZZMitm12OGp1/Xlz5/oPm', NULL, NULL, NULL, NULL, '2026-04-30 13:14:51', '2026-04-30 13:14:51', 3, 7),
(39, 'Sid Meier', '2687352', NULL, 'sid@user.com', NULL, '$2y$12$10EONYNi8W53D8NLKdFtJOCioJtZGd7dYJATcN2RQB.Qzs5ASUIDG', NULL, NULL, NULL, NULL, '2026-04-30 13:14:51', '2026-04-30 13:14:51', 2, 8),
(40, 'Harry Potter', '2614404', NULL, 'harry@user.com', NULL, '$2y$12$.Y6VlqD0BsSB/iB.tChNrupu3.Hf1FjlyIBohrlyM/2xIwj9fO1.2', NULL, NULL, NULL, NULL, '2026-04-30 13:14:51', '2026-04-30 13:14:51', 3, 8),
(41, 'Dr. Who', '2683429', NULL, 'who@user.com', NULL, '$2y$12$atSkMdqfJvERTiJRWYOBSu4xYoDAUPwHTpLRocNlMVa/yLCmUbceS', NULL, NULL, NULL, NULL, '2026-04-30 13:14:51', '2026-04-30 13:14:51', 3, 8),
(42, 'Saul Goodman', '2646371', NULL, 'saul@user.com', NULL, '$2y$12$yBudyVBUjS.tnhAOoLCpaegWkd0FYFCxQjK07lr29CY5A/3YLS53W', NULL, NULL, NULL, NULL, '2026-04-30 13:14:52', '2026-04-30 13:14:52', 3, 8),
(43, 'Sydney Sweeney', '2652955', NULL, 'sydney@user.com', NULL, '$2y$12$K5u7bXmtJ3XbFuIyZHI/RuqDYT4AdD3aL7rfazxPUnqzLeJA6k5sy', NULL, NULL, NULL, NULL, '2026-04-30 13:14:52', '2026-04-30 13:14:52', 3, 8),
(44, 'Test User', NULL, NULL, 'test@example.com', '2026-04-30 13:14:52', '$2y$12$K1tBXnjN7VYD9Phq4HRXduolzACowZTejpdrRlqxf2poPCVomD.NS', NULL, NULL, NULL, NULL, '2026-04-30 13:14:52', '2026-04-30 13:14:52', 3, 7);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `answers_options`
--
ALTER TABLE `answers_options`
  ADD CONSTRAINT `answers_options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `form_users`
--
ALTER TABLE `form_users`
  ADD CONSTRAINT `form_users_form_id_foreign` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `form_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pupils`
--
ALTER TABLE `pupils`
  ADD CONSTRAINT `pupils_tutor_id_foreign` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pupils_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_answer_type_id_foreign` FOREIGN KEY (`answer_type_id`) REFERENCES `answers_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `questions_form_id_foreign` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reunions`
--
ALTER TABLE `reunions`
  ADD CONSTRAINT `reunions_pupil_id_foreign` FOREIGN KEY (`pupil_id`) REFERENCES `pupils` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reunions_tutor_id_foreign` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tutors`
--
ALTER TABLE `tutors`
  ADD CONSTRAINT `tutors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_major_id_foreign` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
