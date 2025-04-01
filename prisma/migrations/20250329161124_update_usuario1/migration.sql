/*
  Warnings:

  - Added the required column `receptorId` to the `Transaccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaccion` ADD COLUMN `receptorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;
