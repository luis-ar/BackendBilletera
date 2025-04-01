-- DropForeignKey
ALTER TABLE `transaccion` DROP FOREIGN KEY `Transaccion_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Transaccion_usuarioId_key` ON `transaccion`;

-- AddForeignKey
ALTER TABLE `Transaccion` ADD CONSTRAINT `Transaccion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
