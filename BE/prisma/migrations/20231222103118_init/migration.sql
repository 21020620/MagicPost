-- CreateTable
CREATE TABLE `Account` (
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Account_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `postalCode` VARCHAR(10) NOT NULL DEFAULT '10000',
    `parentCPId` INTEGER NOT NULL,

    UNIQUE INDEX `TPoint_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `CPoint_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `companyID` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `role` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Employee_email_key`(`email`),
    PRIMARY KEY (`companyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CEmployee` (
    `companyID` VARCHAR(191) NOT NULL,
    `cpointId` INTEGER NOT NULL,

    PRIMARY KEY (`companyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TEmployee` (
    `companyID` VARCHAR(191) NOT NULL,
    `tpointId` INTEGER NOT NULL,

    PRIMARY KEY (`companyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `fullName` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `customerID` VARCHAR(20) NULL,

    UNIQUE INDEX `Customer_phoneNumber_key`(`phoneNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `orderStatus` VARCHAR(50) NOT NULL,
    `itemType` BIT(1) NOT NULL,
    `cannotSend` INTEGER NOT NULL,
    `senderPhone` VARCHAR(191) NOT NULL,
    `receiverPhone` VARCHAR(191) NOT NULL,
    `senderTPId` INTEGER NOT NULL,
    `receiverTPId` INTEGER NOT NULL,
    `fee` VARCHAR(255) NOT NULL,
    `weight` FLOAT NOT NULL,
    `deliverNote` VARCHAR(255) NOT NULL,
    `feeReceived` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderAction` (
    `orderID` VARCHAR(191) NOT NULL,
    `actionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `creatorID` VARCHAR(191) NOT NULL,
    `type` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`orderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `token` VARCHAR(191) NOT NULL,
    `accountUsername` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RefreshToken_accountUsername_key`(`accountUsername`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TPoint` ADD CONSTRAINT `TPoint_parentCPId_fkey` FOREIGN KEY (`parentCPId`) REFERENCES `CPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_email_fkey` FOREIGN KEY (`email`) REFERENCES `Account`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CEmployee` ADD CONSTRAINT `CEmployee_cpointId_fkey` FOREIGN KEY (`cpointId`) REFERENCES `CPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CEmployee` ADD CONSTRAINT `CEmployee_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Employee`(`companyID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TEmployee` ADD CONSTRAINT `TEmployee_tpointId_fkey` FOREIGN KEY (`tpointId`) REFERENCES `TPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TEmployee` ADD CONSTRAINT `TEmployee_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Employee`(`companyID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_senderPhone_fkey` FOREIGN KEY (`senderPhone`) REFERENCES `Customer`(`phoneNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_receiverPhone_fkey` FOREIGN KEY (`receiverPhone`) REFERENCES `Customer`(`phoneNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_senderTPId_fkey` FOREIGN KEY (`senderTPId`) REFERENCES `TPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_receiverTPId_fkey` FOREIGN KEY (`receiverTPId`) REFERENCES `TPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderAction` ADD CONSTRAINT `OrderAction_orderID_fkey` FOREIGN KEY (`orderID`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderAction` ADD CONSTRAINT `OrderAction_creatorID_fkey` FOREIGN KEY (`creatorID`) REFERENCES `Employee`(`companyID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_accountUsername_fkey` FOREIGN KEY (`accountUsername`) REFERENCES `Account`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
