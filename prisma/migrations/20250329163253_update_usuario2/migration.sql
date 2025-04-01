/*
  Warnings:

  - Added the required column `userSend` to the `Transaccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaccion` ADD COLUMN `userSend` VARCHAR(191) NOT NULL;
