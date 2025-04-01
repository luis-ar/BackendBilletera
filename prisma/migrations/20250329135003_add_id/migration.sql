/*
  Warnings:

  - The primary key for the `transaccion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[usuarioId]` on the table `Transaccion` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `transaccion` DROP FOREIGN KEY `Transaccion_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Transaccion_usuarioId_fkey` ON `transaccion`;

-- AlterTable
ALTER TABLE `transaccion` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `usuarioId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Transaccion_usuarioId_key` ON `Transaccion`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `Transaccion` ADD CONSTRAINT `Transaccion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
