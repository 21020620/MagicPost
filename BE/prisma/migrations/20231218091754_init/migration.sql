/*
  Warnings:

  - You are about to drop the column `parentTPId` on the `CPoint` table. All the data in the column will be lost.
  - Added the required column `parentCPId` to the `TPoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CPoint` DROP FOREIGN KEY `CPoint_parentTPId_fkey`;

-- AlterTable
ALTER TABLE `CPoint` DROP COLUMN `parentTPId`;

-- AlterTable
ALTER TABLE `TPoint` ADD COLUMN `parentCPId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TPoint` ADD CONSTRAINT `TPoint_parentCPId_fkey` FOREIGN KEY (`parentCPId`) REFERENCES `CPoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
