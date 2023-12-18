-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Account_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `TPoint_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `parentTPId` INTEGER NOT NULL,

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

-- AddForeignKey
ALTER TABLE `CPoint` ADD CONSTRAINT `CPoint_parentTPId_fkey` FOREIGN KEY (`parentTPId`) REFERENCES `TPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CEmployee` ADD CONSTRAINT `CEmployee_cpointId_fkey` FOREIGN KEY (`cpointId`) REFERENCES `CPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CEmployee` ADD CONSTRAINT `CEmployee_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Employee`(`companyID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TEmployee` ADD CONSTRAINT `TEmployee_tpointId_fkey` FOREIGN KEY (`tpointId`) REFERENCES `TPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TEmployee` ADD CONSTRAINT `TEmployee_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Employee`(`companyID`) ON DELETE RESTRICT ON UPDATE CASCADE;
