-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2022 at 09:06 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `typeFactor` varchar(100) NOT NULL,
  `uuid` varchar(200) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `paymentMethod` varchar(100) NOT NULL,
  `productDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productDetails`)),
  `total` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `user_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `name`, `typeFactor`, `uuid`, `created_at`, `paymentMethod`, `productDetails`, `total`, `description`, `user_email`) VALUES
(1, 'امیر غیبی', 'خرید', '61e2b82f-6e45-424e-980b-36125e88a3d2', '2022-08-20', 'نقدی', '[{\"id\":1,\"code\":\"g-21\",\"name\":\"موبایل LG-g21\",\"unit\":\"عدد\",\"stock\":\"1\",\"price\":12000000,\"total\":12000000}]', '12000000', 'خرید گوشی', 'admin@gmail.com'),
(2, 'تست', 'خرید', 'b3554fda-942b-47ee-9e2f-8c2fcfa7b114', '2022-08-21', 'نقدی', '[{\"id\":1,\"code\":\"g-21\",\"name\":\"موبایل LG-g21\",\"unit\":\"عدد\",\"stock\":3,\"price\":12000000,\"total\":36000000},{\"id\":2,\"code\":\"d-2\",\"name\":\"تست\",\"unit\":\"عدد\",\"stock\":\"1\",\"price\":\"30000\",\"total\":20000}]', '36020000', '12', 'admin@gmail.com'),
(3, 'حسین ابراهیمی', 'خرید', '9e81c42a-daa4-4851-987f-10edffc0b4b2', '2022-08-22', 'نقدی', '[{\"id\":1,\"code\":\"g-21\",\"name\":\"موبایل LG-g21\",\"unit\":\"عدد\",\"stock\":2,\"price\":12000000,\"total\":24000000},{\"id\":2,\"code\":\"d-2\",\"name\":\"تست\",\"unit\":\"عدد\",\"stock\":\"1\",\"price\":20000,\"total\":20000}]', '24020000', 'خرید موبایل', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `financial`
--

CREATE TABLE `financial` (
  `id` int(11) NOT NULL,
  `person_name` varchar(100) NOT NULL,
  `types` varchar(100) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `amount` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `user_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `financial`
--

INSERT INTO `financial` (`id`, `person_name`, `types`, `created_at`, `amount`, `description`, `user_email`) VALUES
(1, 'عادل پیری', 'دریافت - چک', '2022-08-20', '15400000', 'بابت بدهی', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `credit` varchar(16) NOT NULL,
  `user_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `category`, `phone`, `address`, `credit`, `user_email`) VALUES
(1, 'امیر غیبی', 'تامین کننده', '09149466991', 'ارومیه ، همافر', '123456789987456', 'admin@gmail.com'),
(3, 'حسین ابراهیمی', 'بازاریاب', '091114523', 'ارومیه', '12345', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `category` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(25) NOT NULL,
  `price` int(20) NOT NULL,
  `stock` varchar(11) NOT NULL,
  `user_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `code`, `category`, `name`, `unit`, `price`, `stock`, `user_email`) VALUES
(1, 'g-21', 'کالا', 'موبایل LG-g21', 'عدد', 12000000, '23', 'admin@gmail.com'),
(2, 'd-2', 'کالا', 'تست', 'عدد', 20000, '12', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tiket`
--

CREATE TABLE `tiket` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `user_email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tiket`
--

INSERT INTO `tiket` (`id`, `title`, `subject`, `message`, `created_at`, `user_email`) VALUES
(1, 'تست', 'پشتیبانی', 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که', '2022-08-20', 'admin@gmail.com'),
(2, 'ررر', 'فروش', 'یبلاتنملل', '2022-08-21', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `phone_number`, `address`, `postal_code`, `password`, `email`) VALUES
(1, 'یوسف', 'غیبی', '09214536991', 'ارومیه ، خیابان ابوذر ، خیابان حر ، کوچه 17  ، پلاک 21', '5717711111', 'admin', 'admin@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_user_email_fr` (`user_email`);

--
-- Indexes for table `financial`
--
ALTER TABLE `financial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `financial_user_email_fr` (`user_email`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD KEY `people_user_email_fr` (`user_email`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_user_email_fr` (`user_email`);

--
-- Indexes for table `tiket`
--
ALTER TABLE `tiket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tiket_user_email` (`user_email`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `financial`
--
ALTER TABLE `financial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tiket`
--
ALTER TABLE `tiket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_user_email_fr` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`);

--
-- Constraints for table `financial`
--
ALTER TABLE `financial`
  ADD CONSTRAINT `financial_user_email_fr` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`);

--
-- Constraints for table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `people_user_email_fr` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_user_email_fr` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`);

--
-- Constraints for table `tiket`
--
ALTER TABLE `tiket`
  ADD CONSTRAINT `tiket_user_email` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
