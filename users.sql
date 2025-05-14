-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2025 at 03:51 PM
-- Server version: 11.7.2-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement_tbl`
--

CREATE TABLE `announcement_tbl` (
  `announcement_id` int(11) NOT NULL,
  `announcement_title` varchar(100) NOT NULL,
  `announcement_description` text NOT NULL,
  `announcement_start_date` datetime NOT NULL,
  `announcement_end_date` datetime NOT NULL,
  `is_archived` tinyint(1) DEFAULT 0,
  `views` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement_tbl`
--

INSERT INTO `announcement_tbl` (`announcement_id`, `announcement_title`, `announcement_description`, `announcement_start_date`, `announcement_end_date`, `is_archived`, `views`) VALUES
(6, 'sample1', 'sample1', '2025-05-06 16:00:00', '2025-05-09 15:59:59', 1, 15),
(7, 'sample', 'sample sample hello, hi pansinin mo na ako please, what if umiyak ako dito emee huhuhu. Sige na please huwag nang mainis hahahahaha', '2025-05-13 16:00:00', '2025-05-14 15:59:59', 1, 0),
(8, 'Exam', 'Exam', '2025-04-13 16:00:00', '2025-04-28 15:59:59', 1, 0),
(9, 'Exam', 'exam', '2025-04-14 16:00:00', '2025-04-28 15:59:59', 1, 0),
(10, 'Exam', 'Exam', '2025-04-13 16:00:00', '2025-04-28 15:59:59', 1, 0),
(11, 'Exam', 'exam', '2025-04-16 16:00:00', '2025-05-05 15:59:59', 1, 0),
(12, 'testhwhw', 'test', '2025-04-10 16:00:00', '2025-05-05 15:59:59', 1, 0),
(13, 'test', 'testt', '2025-04-28 16:00:00', '2025-05-05 15:59:59', 1, 0),
(14, 'orayt', 'orayt orayt', '2025-05-01 16:00:00', '2025-05-05 15:59:59', 1, 0),
(15, 'test', 'test', '2025-05-06 16:00:00', '2025-05-08 15:59:59', 1, 35),
(16, 'd', 'd', '2025-05-05 16:00:00', '2025-05-06 15:59:59', 1, 0),
(17, 'Exam', 'May 20-24', '2025-05-19 16:00:00', '2025-05-24 15:59:59', 0, 24),
(18, 'Miguel\'s Birthday', 'May pa foods sa bahay nila', '2025-08-31 16:00:00', '2025-09-01 15:59:59', 0, 2),
(19, 'Faner\'s Birthday', 'Pa foods kuma', '2025-05-06 16:00:00', '2025-05-07 15:59:59', 1, 0),
(20, 'testing', 'testing', '2025-05-10 16:00:00', '2025-05-11 15:59:59', 1, 1),
(21, 's', 's', '2025-05-07 16:00:00', '2025-05-08 15:59:59', 1, 0),
(22, 'presentation', 'system defense', '2025-05-13 16:00:00', '2025-05-15 15:59:59', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add user add', 7, 'add_useradd'),
(26, 'Can change user add', 7, 'change_useradd'),
(27, 'Can delete user add', 7, 'delete_useradd'),
(28, 'Can view user add', 7, 'view_useradd'),
(29, 'Can add announcements', 8, 'add_announcements'),
(30, 'Can change announcements', 8, 'change_announcements'),
(31, 'Can delete announcements', 8, 'delete_announcements'),
(32, 'Can view announcements', 8, 'view_announcements'),
(33, 'Can add room', 9, 'add_room'),
(34, 'Can change room', 9, 'change_room'),
(35, 'Can delete room', 9, 'delete_room'),
(36, 'Can view room', 9, 'view_room'),
(37, 'Can add blacklisted token', 10, 'add_blacklistedtoken'),
(38, 'Can change blacklisted token', 10, 'change_blacklistedtoken'),
(39, 'Can delete blacklisted token', 10, 'delete_blacklistedtoken'),
(40, 'Can view blacklisted token', 10, 'view_blacklistedtoken'),
(41, 'Can add outstanding token', 11, 'add_outstandingtoken'),
(42, 'Can change outstanding token', 11, 'change_outstandingtoken'),
(43, 'Can delete outstanding token', 11, 'delete_outstandingtoken'),
(44, 'Can view outstanding token', 11, 'view_outstandingtoken'),
(45, 'Can add feedback', 12, 'add_feedback'),
(46, 'Can change feedback', 12, 'change_feedback'),
(47, 'Can delete feedback', 12, 'delete_feedback'),
(48, 'Can view feedback', 12, 'view_feedback'),
(49, 'Can add question', 13, 'add_question'),
(50, 'Can change question', 13, 'change_question'),
(51, 'Can delete question', 13, 'delete_question'),
(52, 'Can view question', 13, 'view_question'),
(53, 'Can add feedback response', 14, 'add_feedbackresponse'),
(54, 'Can change feedback response', 14, 'change_feedbackresponse'),
(55, 'Can delete feedback response', 14, 'delete_feedbackresponse'),
(56, 'Can view feedback response', 14, 'view_feedbackresponse');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$870000$icR37K36wFS2iXTsLVzUoH$Mo+w0gGfSKQ+BtnM2uzyBiYDLqZQAQUZKpLJluoIp5A=', NULL, 1, 'kurt', '', '', 'kurt@gmail.com', 1, 1, '2025-03-22 05:24:40.179748');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(10, 'token_blacklist', 'blacklistedtoken'),
(11, 'token_blacklist', 'outstandingtoken'),
(8, 'users', 'announcements'),
(12, 'users', 'feedback'),
(14, 'users', 'feedbackresponse'),
(13, 'users', 'question'),
(9, 'users', 'room'),
(7, 'users', 'useradd');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-03-22 05:04:01.608649'),
(2, 'auth', '0001_initial', '2025-03-22 05:04:01.766365'),
(3, 'admin', '0001_initial', '2025-03-22 05:04:01.801390'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-03-22 05:04:01.807246'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-03-22 05:04:01.817621'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-03-22 05:04:01.854785'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-03-22 05:04:01.871970'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-03-22 05:04:01.884680'),
(9, 'auth', '0004_alter_user_username_opts', '2025-03-22 05:04:01.893584'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-03-22 05:04:01.916286'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-03-22 05:04:01.921171'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-03-22 05:04:01.934386'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-03-22 05:04:01.946742'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-03-22 05:04:01.958143'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-03-22 05:04:01.970975'),
(16, 'auth', '0011_update_proxy_permissions', '2025-03-22 05:04:01.978444'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-03-22 05:04:01.989880'),
(18, 'sessions', '0001_initial', '2025-03-22 05:04:02.001997'),
(19, 'users', '0001_initial', '2025-03-22 05:04:02.007997'),
(20, 'users', '0002_useradd_delete_user', '2025-03-22 05:04:02.017325'),
(21, 'users', '0003_remove_useradd_user_level_useradd_role', '2025-03-22 05:04:02.040783'),
(22, 'users', '0004_rename_role_useradd_user_level', '2025-03-22 05:04:02.047458'),
(23, 'users', '0005_alter_useradd_options', '2025-03-22 05:04:02.049838'),
(24, 'users', '0006_alter_useradd_table', '2025-03-22 05:04:02.053229'),
(25, 'users', '0007_announcements', '2025-03-30 10:00:36.597934'),
(26, 'users', '0008_room', '2025-04-17 17:04:42.713218'),
(27, 'users', '0009_alter_room_table', '2025-04-17 17:36:25.714058'),
(28, 'token_blacklist', '0001_initial', '2025-04-28 00:22:05.878419'),
(29, 'token_blacklist', '0002_outstandingtoken_jti_hex', '2025-04-28 00:22:05.884141'),
(30, 'token_blacklist', '0003_auto_20171017_2007', '2025-04-28 00:22:05.892244'),
(31, 'token_blacklist', '0004_auto_20171017_2013', '2025-04-28 00:22:05.908459'),
(32, 'token_blacklist', '0005_remove_outstandingtoken_jti', '2025-04-28 00:22:05.914737'),
(33, 'token_blacklist', '0006_auto_20171017_2113', '2025-04-28 00:22:05.923732'),
(34, 'token_blacklist', '0007_auto_20171017_2214', '2025-04-28 00:22:06.378096'),
(35, 'token_blacklist', '0008_migrate_to_bigautofield', '2025-04-28 00:22:06.520202'),
(36, 'token_blacklist', '0010_fix_migrate_to_bigautofield', '2025-04-28 00:22:06.524701'),
(37, 'token_blacklist', '0011_linearizes_history', '2025-04-28 00:22:06.525930'),
(38, 'token_blacklist', '0012_alter_outstandingtoken_user', '2025-04-28 00:22:06.529693'),
(39, 'users', '0010_feedback', '2025-05-04 11:32:53.510684'),
(40, 'users', '0011_delete_feedback', '2025-05-04 11:33:54.453813'),
(41, 'users', '0012_feedback', '2025-05-04 11:38:11.382996'),
(42, 'users', '0013_question_rename_clarity_feedback_clarity_rating_and_more', '2025-05-04 12:08:53.631653'),
(43, 'users', '0014_remove_feedback_clarity_question_and_more', '2025-05-04 12:29:01.406774'),
(44, 'users', '0015_feedback_clarity_question_feedback_ease_question_and_more', '2025-05-04 12:58:46.164958'),
(45, 'users', '0016_alter_feedback_clarity_rating_and_more', '2025-05-04 17:38:04.984779'),
(46, 'users', '0017_remove_feedback_clarity_question_and_more', '2025-05-13 11:56:36.763102'),
(47, 'users', '0018_feedback_clarity_question_feedback_clarity_rating_and_more', '2025-05-13 12:23:25.442243'),
(48, 'users', '0019_remove_feedback_clarity_question_and_more', '2025-05-13 12:51:07.240910'),
(49, 'users', '0020_remove_question_key', '2025-05-14 02:10:50.665430');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback_response_tbl`
--

CREATE TABLE `feedback_response_tbl` (
  `id` bigint(20) NOT NULL,
  `rating` varchar(20) NOT NULL,
  `feedback_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_response_tbl`
--

INSERT INTO `feedback_response_tbl` (`id`, `rating`, `feedback_id`, `question_id`) VALUES
(1, 'excellent', 1, 1),
(2, 'excellent', 1, 2),
(3, 'excellent', 1, 3),
(4, 'excellent', 2, 1),
(5, 'excellent', 2, 2),
(6, 'excellent', 2, 3),
(7, 'needs improvement', 3, 1),
(8, 'needs improvement', 3, 2),
(9, 'needs improvement', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `feedback_tbl`
--

CREATE TABLE `feedback_tbl` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_tbl`
--

INSERT INTO `feedback_tbl` (`id`, `name`, `role`, `created_at`) VALUES
(1, 'sample', 'student', '2025-05-14 02:18:49.645383'),
(2, 'Christelle', 'student', '2025-05-14 05:56:38.137865'),
(3, 'Hahah', 'student', '2025-05-14 06:41:42.867040');

-- --------------------------------------------------------

--
-- Table structure for table `navigation_tbl`
--

CREATE TABLE `navigation_tbl` (
  `room_id` int(100) NOT NULL,
  `room_number` varchar(50) NOT NULL,
  `room_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `navigation_tbl`
--

INSERT INTO `navigation_tbl` (`room_id`, `room_number`, `room_name`) VALUES
(1, '1BLII-01', '1BLII-01'),
(2, '1BLII-02', '1BLII-02'),
(3, '2BLII-01', '2BLII-01'),
(4, '2BLII-02', '2BLII-02'),
(5, '2MPB-02', '2MPB-02'),
(6, '2MPB-01', '2MPB-01'),
(7, 'GRADE 7', 'GRADE 7 CLASSROOM'),
(8, 'SPECIAL SCIENCE BUILDING', 'SPECIAL SCIENCE BUILDING'),
(9, 'HOME ECONOMICS', 'HOME ECONOMICS BUILDING'),
(10, 'PRINCIPAL\'S OFFICE', 'PRINCIPAL\'S OFFICE'),
(11, 'ROOM 101', 'ROOM 101'),
(12, 'ROOM 102', 'ROOM 102'),
(13, 'ROOM 103', 'ROOM 103'),
(14, 'PSIP-101', 'PSIP-101'),
(15, 'PSIP-102', 'PSIP-102'),
(16, 'CANTEEN2', 'CANTEEN2'),
(17, '2BL-01', '2BL-01'),
(18, '2BL-02', '2BL-02'),
(19, '2BL-03', '2BL-03'),
(20, 'CANTEEN1', 'CANTEEN1'),
(21, 'IBL-03', 'IBL-03'),
(22, 'IBL-01', 'IBL-01'),
(23, 'MSB-01', 'MSB-01'),
(24, 'CLINIC', 'CLINIC'),
(25, 'STAGE', 'STAGE'),
(26, 'ROOM 201', 'ROOM 201'),
(27, 'ROOM 202', 'ROOM 202'),
(28, 'ROOM 203', 'ROOM 203'),
(29, 'ROOM 301', 'ROOM 301'),
(30, 'ROOM 302', 'ROOM 302'),
(31, 'ROOM 303', 'ROOM 303'),
(32, 'COMPUTER ROOM', 'COMPUTER ROOM');

-- --------------------------------------------------------

--
-- Table structure for table `question_tbl`
--

CREATE TABLE `question_tbl` (
  `id` int(11) NOT NULL,
  `text` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_tbl`
--

INSERT INTO `question_tbl` (`id`, `text`) VALUES
(1, '1. How would you rate the clarity and accessibility of content (e.g., tips, events, announcements)?'),
(2, '2. How would you rate the ease of finding information (e.g., assistance, maps, directions)?'),
(3, '3. How would you rate your overall experience?'),
(4, 'sample');

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint(20) NOT NULL,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint(20) NOT NULL,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `jti` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_account_tbl`
--

CREATE TABLE `user_account_tbl` (
  `account_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(128) NOT NULL,
  `user_level` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account_tbl`
--

INSERT INTO `user_account_tbl` (`account_id`, `username`, `password`, `user_level`) VALUES
(1, 'kasten', 'pbkdf2_sha256$870000$ajv5cbbhtjv6VUugBAf7p0$HBZdO5E/wun9ySNxtM6oO01kRQbsCt5fEVsB+Ci16wU=', 'admin'),
(24, 'elijah', 'pbkdf2_sha256$870000$NWadmw250UjSYIVqNTJLOl$ePLV2S6al1Kg1j2730cq5nKeFFCNmsmXiIX/paz7LrM=', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement_tbl`
--
ALTER TABLE `announcement_tbl`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `feedback_response_tbl`
--
ALTER TABLE `feedback_response_tbl`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `feedback_response_tbl_feedback_id_question_id_b235b9ba_uniq` (`feedback_id`,`question_id`),
  ADD KEY `feedback_re_feedbac_295ab9_idx` (`feedback_id`,`question_id`),
  ADD KEY `question` (`question_id`);

--
-- Indexes for table `feedback_tbl`
--
ALTER TABLE `feedback_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navigation_tbl`
--
ALTER TABLE `navigation_tbl`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `question_tbl`
--
ALTER TABLE `question_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_id` (`token_id`);

--
-- Indexes for table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  ADD KEY `token_blacklist_outs_user_id_83bc629a_fk_user_acco` (`user_id`);

--
-- Indexes for table `user_account_tbl`
--
ALTER TABLE `user_account_tbl`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement_tbl`
--
ALTER TABLE `announcement_tbl`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `feedback_response_tbl`
--
ALTER TABLE `feedback_response_tbl`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `feedback_tbl`
--
ALTER TABLE `feedback_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `navigation_tbl`
--
ALTER TABLE `navigation_tbl`
  MODIFY `room_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `question_tbl`
--
ALTER TABLE `question_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_account_tbl`
--
ALTER TABLE `user_account_tbl`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `feedback_response_tbl`
--
ALTER TABLE `feedback_response_tbl`
  ADD CONSTRAINT `feedback` FOREIGN KEY (`feedback_id`) REFERENCES `feedback_tbl` (`id`),
  ADD CONSTRAINT `question` FOREIGN KEY (`question_id`) REFERENCES `question_tbl` (`id`);

--
-- Constraints for table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`);

--
-- Constraints for table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_user_acco` FOREIGN KEY (`user_id`) REFERENCES `user_account_tbl` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
